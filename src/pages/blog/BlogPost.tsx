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
      <div className="blog-post-loading">
        <div className="admin-spinner" />
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div className="blog-post-notfound">
        <h2>404 — Post Not Found</h2>
        <p>This post doesn't exist or has been removed.</p>
        <Link to="/blog" className="admin-btn-primary">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="blog-post-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Image */}
      {blog.coverImage && (
        <div className="blog-post-cover">
          <img src={blog.coverImage} alt={blog.title} />
          <div className="blog-post-cover-overlay" />
        </div>
      )}

      <div className="blog-post-container">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/blog" className="blog-post-back">
            <FaArrowLeft size={13} /> All Articles
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          className="blog-post-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Tags */}
          {blog.tags.length > 0 && (
            <div className="blog-post-tags">
              {blog.tags.map(tag => (
                <span key={tag} className="blog-card-tag">
                  <FaTag size={9} /> {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="blog-post-title">{blog.title}</h1>
          <p className="blog-post-excerpt">{blog.excerpt}</p>

          {/* Meta */}
          <div className="blog-post-meta">
            <span>
              <FaCalendar size={12} />
              {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="blog-post-meta-dot">·</span>
            <span>
              <FaClock size={12} />
              {blog.readTime} min read
            </span>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="blog-post-divider" />

        {/* Content */}
        <motion.div
          className="blog-content blog-post-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Footer */}
        <div className="blog-post-footer">
          <Link to="/blog" className="blog-post-back">
            <FaArrowLeft size={13} /> More Articles
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
