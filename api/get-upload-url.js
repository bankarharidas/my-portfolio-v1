// api/get-upload-url.js
// Vercel Serverless Function — generates S3 pre-signed URLs safely server-side
// Protection: In-memory Rate Limiting (10 requests/minute per IP)

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

// ─── In-Memory Rate Limiter ──────────────────────────────────────────────────
// Tracks requests per IP in a Map (10 requests per 60 seconds)
const ipMap = new Map();
const RATE_LIMIT = 10;      // max 10 requests
const WINDOW_MS  = 60_000;  // 1 minute rolling window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipMap.get(ip) ?? { count: 0, start: now };

  // Reset counter when time window expires
  if (now - entry.start > WINDOW_MS) {
    ipMap.set(ip, { count: 1, start: now });
    return false;
  }

  // Block if limit exceeded
  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  ipMap.set(ip, entry);
  return false;
}

// Periodically clean up old IP entries to keep memory bounded
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipMap.entries()) {
    if (now - entry.start > WINDOW_MS) {
      ipMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ─── S3 Client ───────────────────────────────────────────────────────────────
// KEY FIX: requestChecksumCalculation = "WHEN_REQUIRED"
// Prevents AWS SDK v3 from injecting x-amz-checksum-crc32 into pre-signed URL headers,
// which avoids 403 Forbidden errors during browser direct uploads.
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
  // CORS & Cache-Control headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── In-Memory Rate Limit Check ─────────────────────────────────────────────
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    console.warn('[get-upload-url] Rate limited IP:', ip);
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before uploading again.' });
  }

  try {
    const { fileName, fileType } = req.body || {};

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    // Generate unique S3 key for each upload (prevents overwriting files)
    const ext = fileName.split('.').pop() || 'jpg';
    const uniqueKey = `blog-covers/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket:      BUCKET_NAME,
      Key:         uniqueKey,
      ContentType: fileType,
    });

    // Pre-signed URL valid for 5 minutes (300 seconds)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    console.log('[get-upload-url] Successfully generated pre-signed URL for key:', uniqueKey);
    return res.status(200).json({ signedUrl, publicUrl, key: uniqueKey });

  } catch (error) {
    console.error('[get-upload-url] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate upload URL' });
  }
}
