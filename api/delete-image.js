// api/delete-image.js
// Vercel Serverless Function — deletes S3 objects safely server-side

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

export default async function handler(req, res) {
  // CORS & Cache-Control headers
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
    const { key } = req.body || {};

    if (!key) {
      return res.status(400).json({ error: 'Image key is required' });
    }

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);

    console.log('[delete-image] Successfully deleted key:', key);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('[delete-image] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to delete image' });
  }
}
