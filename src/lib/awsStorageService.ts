/**
 * awsStorageService.ts
 *
 * Drop-in replacement for storageService.ts using AWS S3.
 *
 * How it works:
 *  1. Frontend calls our Vercel serverless function (/api/get-upload-url)
 *  2. Serverless function returns a pre-signed S3 URL (valid 5 min)
 *  3. Frontend uploads the file directly to S3 using that URL
 *  4. The public image URL is stored in Firestore (not Firebase Storage)
 */

/**
 * Upload an image to AWS S3 via a pre-signed URL.
 *
 * @param file        - The File object to upload (e.g. from <input type="file">)
 * @param onProgress  - Optional callback receiving upload progress (0-100)
 * @returns           - The public S3 URL of the uploaded image
 */
export const uploadImage = async (
  file: File,
  _path?: string, // kept for API compatibility with old storageService
  onProgress?: (percent: number) => void
): Promise<string> => {
  // Step 1: Request a pre-signed URL from your Vercel serverless function
  const response = await fetch('/api/get-upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Failed to get upload URL: ${err.error}`);
  }

  const { signedUrl, publicUrl } = await response.json();

  // Step 2: Upload the file directly to S3 using the pre-signed URL
  await uploadWithProgress(file, signedUrl, onProgress);

  // Step 3: Return the public S3 URL to store in Firestore
  return publicUrl;
};

/**
 * Internal helper — uploads a file to a pre-signed S3 URL with progress tracking.
 */
const uploadWithProgress = (
  file: File,
  signedUrl: string,
  onProgress?: (percent: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`S3 upload failed with status: ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('S3 upload network error'));
    });

    // PUT directly to the S3 pre-signed URL
    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};

/**
 * Get the public URL for an existing S3 object by its key.
 *
 * @param key - The S3 object key e.g. "blog-covers/uuid-my-photo.jpg"
 * @returns   - The public S3 URL
 */
export const getImageURL = (key: string): string => {
  const bucket = import.meta.env.VITE_AWS_S3_BUCKET_NAME;
  const region = import.meta.env.VITE_AWS_REGION;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

/**
 * Delete an image from S3.
 * NOTE: Deletion requires a separate serverless endpoint for security.
 * For now, this logs a warning. Implement /api/delete-image if needed.
 *
 * @param key - The S3 object key
 */
export const deleteImage = async (key: string): Promise<void> => {
  console.warn(
    '[awsStorageService] deleteImage: implement /api/delete-image serverless function to delete:',
    key
  );
};

/**
 * Build a unique storage path (kept for API compatibility — not used in S3 flow).
 * The serverless function generates the unique key automatically.
 */
export const buildBlogCoverPath = (file: File): string => {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `blog-covers/${timestamp}_${safeName}`;
};
