import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaClock, FaTag, FaCalendar } from 'react-icons/fa';
import { getBlogBySlug } from '../../lib/blogService';
import type { BlogPost } from '../../types/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug)
      .then(data => {
        if (!data) setNotFound(true);
        else setBlog(data);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center py-20 bg-bg-primary">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-bg-primary">
        <h2 className="text-3xl font-bold is-family-secondary mb-4 text-text-primary">404 — Post Not Found</h2>
        <p className="text-text-muted mb-8">This post doesn't exist or has been removed.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-90">
          <FaArrowLeft size={12} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-bg-primary pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="w-full max-w-5xl mx-auto h-[40vh] min-h-[300px] mb-12 relative overflow-hidden bg-bg-secondary">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover grayscale opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-bold tracking-wider text-xs uppercase mb-12 transition-colors">
            <FaArrowLeft size={13} /> All Articles
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-accent">
                  <FaTag size={9} /> {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold is-family-secondary mb-6 leading-tight text-text-primary">{blog.title}</h1>
          <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto">{blog.excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold tracking-wider text-text-muted uppercase">
            <span className="flex items-center gap-2">
              <FaCalendar size={12} />
              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-2">
              <FaClock size={12} />
              {blog.readTime} min read
            </span>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="w-24 h-1 bg-accent mx-auto mb-16" />

        {/* Content */}
        <motion.div
          className="prose dark:prose-invert max-w-none prose-p:text-text-muted prose-p:leading-relaxed prose-headings:is-family-secondary prose-headings:font-bold prose-headings:text-text-primary prose-a:text-accent hover:prose-a:opacity-80 prose-img:grayscale prose-img:opacity-90 prose-img:mx-auto prose-strong:text-text-primary prose-blockquote:border-l-accent prose-blockquote:text-text-muted prose-blockquote:italic prose-li:text-text-muted prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border-color text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-bold tracking-wider text-xs uppercase transition-colors">
            <FaArrowLeft size={13} /> More Articles
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
