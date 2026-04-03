// Blog post type definitions
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  readTime: number; // in minutes
}

export interface CreateBlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface UpdateBlogPost extends Partial<CreateBlogPost> {
  updatedAt?: Date;
}
