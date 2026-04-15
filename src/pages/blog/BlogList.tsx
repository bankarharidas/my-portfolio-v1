import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaClock, FaTag, FaArrowRight, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { getAllBlogs } from '../../lib/blogService';
import type { BlogPost } from '../../types/blog';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  const allTags = Array.from(new Set(blogs.flatMap(b => b.tags)));

  const filtered = blogs.filter(b => {
    const matchSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = !selectedTag || b.tags.includes(selectedTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="blog-page">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="blog-hero">
        <motion.div
          className="blog-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Back to Home button */}
          <motion.button
            className="blog-back-home"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ x: -4 }}
          >
            <FaArrowLeft size={12} /> Back to Home
          </motion.button>

          <span className="blog-hero-label">MY BLOG</span>
          <h1 className="blog-hero-title">Thoughts & Articles</h1>
          <p className="blog-hero-subtitle">
            Insights on web development, tech & everything in between.
          </p>

          {/* Admin-only: New Post button */}
          {user && (
            <motion.button
              className="blog-new-post-btn"
              onClick={() => navigate('/admin/new')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <FaPlus size={12} /> New Post
            </motion.button>
          )}
        </motion.div>
      </section>

      <div className="blog-container">
        {/* Search & Filter */}
        <motion.div
          className="blog-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="blog-search-wrapper">
            <FaSearch className="blog-search-icon" size={14} />
            <input
              id="blog-search"
              type="text"
              className="blog-search"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="blog-tags-filter">
            <button
              className={`blog-tag-pill ${selectedTag === '' ? 'active' : ''}`}
              onClick={() => setSelectedTag('')}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`blog-tag-pill ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="blog-loading">
            <div className="admin-spinner" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <motion.div
            className="blog-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No posts found. {search ? 'Try a different search.' : 'Check back soon!'}</p>
          </motion.div>
        )}

        {/* Blog Cards */}
        {!loading && (
          <div className="blog-grid">
            {filtered.map((blog, i) => (
              <motion.article
                key={blog.id}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
              >
                {blog.coverImage && (
                  <div className="blog-card-image-wrapper">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="blog-card-image"
                      onError={e => (e.currentTarget.parentElement!.style.display = 'none')}
                    />
                  </div>
                )}
                <div className="blog-card-body">
                  {blog.tags.length > 0 && (
                    <div className="blog-card-tags">
                      {blog.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="blog-card-tag">
                          <FaTag size={9} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="blog-card-title">{blog.title}</h2>
                  <p className="blog-card-excerpt">{blog.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-meta">
                      <FaClock size={11} />
                      {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                      {' · '}
                      {blog.readTime} min read
                    </span>
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="blog-card-read-more"
                    >
                      Read more <FaArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
