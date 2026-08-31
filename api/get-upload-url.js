// api/get-upload-url.js
// Vercel Serverless Function — generates S3 pre-signed URLs safely server-side
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

// KEY FIX: requestChecksumCalculation = "WHEN_REQUIRED"
// This stops AWS SDK v3 from injecting x-amz-checksum-crc32 into the
// pre-signed URL's SignedHeaders, which causes 403 when the browser
// XHR doesn't send that header.
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

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

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    // Build a unique S3 key
    const ext = fileName.split('.').pop() || 'jpg';
    const uniqueKey = `blog-covers/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueKey,
      ContentType: fileType,
    });

    // Pre-signed URL valid for 5 minutes
    // SignedHeaders will only contain "host" — no checksum header
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

    // Public URL after upload completes
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    console.log('[get-upload-url] Generated key:', uniqueKey);
    return res.status(200).json({ signedUrl, publicUrl, key: uniqueKey });
  } catch (error) {
    console.error('[get-upload-url] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate upload URL' });
  }
}
