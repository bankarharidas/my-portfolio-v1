// api/get-upload-url.js
// Vercel Serverless Function — runs on Node.js server (secrets are safe here)
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export default async function handler(req, res) {
  // Allow CORS from your Vercel domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    // Create a unique key to avoid collisions
    const ext = fileName.split('.').pop();
    const uniqueKey = `blog-covers/${randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: uniqueKey,
      ContentType: fileType,
      // No checksum — avoids SignedHeaders mismatch with browser XHR
    });

    // Generate a pre-signed URL valid for 5 minutes
    const signedUrl = await getSignedUrl(s3, command, {
      expiresIn: 300,
      unhoistableHeaders: new Set(['x-amz-checksum-crc32']),
    });

    // The public URL where the image will be accessible after upload
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

    return res.status(200).json({ signedUrl, publicUrl, key: uniqueKey });
  } catch (error) {
    console.error('[get-upload-url] Error:', error);
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
}
