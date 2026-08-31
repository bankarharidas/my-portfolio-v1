/**
 * storageService.ts
 *
 * ⚠️  Firebase Storage has been replaced by AWS S3.
 * This file re-exports from awsStorageService.ts so any existing
 * imports (e.g. `import { uploadImage } from './storageService'`)
 * continue to work without changes.
 *
 * Prefer importing from awsStorageService directly in new code.
 */
export {
  uploadImage,
  getImageURL,
  deleteImage,
  buildBlogCoverPath,
} from './awsStorageService';
