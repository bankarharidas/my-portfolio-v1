import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaClock, FaTag, FaPen } from 'react-icons/fa';
import { getAllBlogs } from '../lib/blogService';
import type { BlogPost } from '../types/blog';

const LatestBlogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs()
      .then(data => setBlogs(data.slice(0, 3))) // latest 3
      .finally(() => setLoading(false));
  }, []);

  // Don't render the section at all if no blogs
  if (!loading && blogs.length === 0) return null;

  return (
    <section id="latest-blogs" className="latest-blogs-section">
      {/* Section Header */}
      <motion.div
        className="latest-blogs-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="latest-blogs-label">
          <FaPen size={11} />
          LATEST POSTS
        </div>
        <h2 className="latest-blogs-title">From the Blog</h2>
        <p className="latest-blogs-subtitle">
          Thoughts, tutorials and insights on web development & tech.
        </p>
      </motion.div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="latest-blogs-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="lb-skeleton" />
          ))}
        </div>
      )}

      {/* Blog Cards */}
      {!loading && (
        <div className="latest-blogs-grid">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.id}
              className="lb-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -8 }}
            >
              {/* Cover Image */}
              {blog.coverImage ? (
                <div className="lb-card-image-wrapper">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="lb-card-image"
                    onError={e => (e.currentTarget.parentElement!.style.display = 'none')}
                  />
                </div>
              ) : (
                <div className="lb-card-image-placeholder">
                  <FaPen size={28} style={{ opacity: 0.15 }} />
                </div>
              )}

              {/* Body */}
              <div className="lb-card-body">
                {/* Tags */}
                {blog.tags.length > 0 && (
                  <div className="lb-card-tags">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="lb-card-tag">
                        <FaTag size={8} /> {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="lb-card-title">{blog.title}</h3>

                {/* Excerpt */}
                <p className="lb-card-excerpt">{blog.excerpt}</p>

                {/* Footer */}
                <div className="lb-card-footer">
                  <span className="lb-card-meta">
                    <FaClock size={10} />
                    {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                    <span className="lb-card-dot">·</span>
                    {blog.readTime} min
                  </span>
                  <Link to={`/blog/${blog.slug}`} className="lb-card-read-btn">
                    Read <FaArrowRight size={10} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* View All Button */}
      {!loading && blogs.length > 0 && (
        <motion.div
          className="latest-blogs-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/blog" className="lb-view-all-btn">
            View all posts <FaArrowRight size={13} />
          </Link>
        </motion.div>
      )}
    </section>
  );
};

export default LatestBlogs;
