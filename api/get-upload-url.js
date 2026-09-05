// api/get-upload-url.js
// Vercel Serverless Function — generates S3 pre-signed URLs safely server-side
// Features: In-memory rate limiting + Redis (Upstash) caching

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

// ─── Redis Client (Upstash) ───────────────────────────────────────────────────
// Lazy-initialise so the function still boots if Redis env vars are missing
let redis = null;
async function getRedis() {
  if (redis) return redis;
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null; // Redis not configured — skip caching
  }
  const { Redis } = await import('@upstash/redis');
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  return redis;
}

// Cache TTL slightly less than the pre-signed URL expiry (5 min = 300s → cache 4 min)
const CACHE_TTL_SEC = 240;

// ─── In-memory Rate Limiter ───────────────────────────────────────────────────
const ipMap = new Map();
const RATE_LIMIT = 10;      // max requests per window
const WINDOW_MS  = 60_000;  // 1 minute window

function isRateLimited(ip) {
  const now   = Date.now();
  const entry = ipMap.get(ip) ?? { count: 0, start: now };

  // Reset window if expired
  if (now - entry.start > WINDOW_MS) {
    ipMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  entry.count++;
  ipMap.set(ip, entry);
  return false;
}

// ─── S3 Client ───────────────────────────────────────────────────────────────
// KEY FIX: requestChecksumCalculation = "WHEN_REQUIRED"
// This stops AWS SDK v3 from injecting x-amz-checksum-crc32 into the
// pre-signed URL's SignedHeaders, which causes 403 when the browser
// XHR doesn't send that header.
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// ─── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers so your Vercel frontend can call this function
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate Limiting ──────────────────────────────────────────────────────────
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    console.warn('[get-upload-url] Rate limited IP:', ip);
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' });
  }

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    // ── Redis Cache Lookup ─────────────────────────────────────────────────
    const cacheKey = `upload-url:${fileName}:${fileType}`;
    const db = await getRedis();

    if (db) {
      const cached = await db.get(cacheKey);
      if (cached) {
        console.log('[get-upload-url] Cache HIT for key:', cacheKey);
        return res.status(200).json({ ...cached, fromCache: true });
      }
    }

    // ── Generate Pre-signed URL ────────────────────────────────────────────
    const ext       = fileName.split('.').pop() || 'jpg';
    const uniqueKey = `blog-covers/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket:      BUCKET_NAME,
      Key:         uniqueKey,
      ContentType: fileType,
    });

    // Pre-signed URL valid for 5 minutes
    // SignedHeaders will only contain "host" — no checksum header
    const signedUrl  = await getSignedUrl(s3, command, { expiresIn: 300 });

    // Public URL after upload completes
    const publicUrl  = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    const payload = { signedUrl, publicUrl, key: uniqueKey };

    // ── Store in Redis Cache ───────────────────────────────────────────────
    if (db) {
      await db.set(cacheKey, payload, { ex: CACHE_TTL_SEC });
      console.log('[get-upload-url] Cache SET for key:', cacheKey);
    }

    console.log('[get-upload-url] Generated key:', uniqueKey);
    return res.status(200).json({ ...payload, fromCache: false });

  } catch (error) {
    console.error('[get-upload-url] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate upload URL' });
  }
}
