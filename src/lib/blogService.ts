import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { BlogPost, CreateBlogPost, UpdateBlogPost } from '../types/blog';

const COLLECTION = 'blogs';

// Calculate reading time (avg 200 words/min)
const calcReadTime = (content: string): number => {
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
};

// Convert Firestore doc to BlogPost
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromFirestore = (id: string, data: any): BlogPost => ({
  id,
  title: data.title,
  slug: data.slug,
  content: data.content,
  excerpt: data.excerpt,
  coverImage: data.coverImage || '',
  tags: data.tags || [],
  status: data.status,
  createdAt: data.createdAt?.toDate() || new Date(),
  updatedAt: data.updatedAt?.toDate() || new Date(),
  readTime: data.readTime || 1,
});

// Get all published blogs (public)
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const q = query(
    collection(db, COLLECTION),
    where('status', '==', 'published'),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => fromFirestore(d.id, d.data()));
};

// Get all blogs (admin)
export const getAllBlogsAdmin = async (): Promise<BlogPost[]> => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => fromFirestore(d.id, d.data()));
};

// Get single blog by slug (public)
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const q = query(collection(db, COLLECTION), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return fromFirestore(d.id, d.data());
};

// Get single blog by ID (admin)
export const getBlogById = async (id: string): Promise<BlogPost | null> => {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return fromFirestore(snap.id, snap.data());
};

// Create new blog
export const createBlog = async (data: CreateBlogPost): Promise<string> => {
  const now = Timestamp.now();
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    readTime: calcReadTime(data.content),
    createdAt: now,
    updatedAt: now,
  });
  return docRef.id;
};

// Update blog
export const updateBlog = async (id: string, data: UpdateBlogPost): Promise<void> => {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, {
    ...data,
    readTime: data.content ? calcReadTime(data.content) : undefined,
    updatedAt: Timestamp.now(),
  });
};

// Delete blog
export const deleteBlog = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id));
};
