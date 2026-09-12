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
    <div className="min-h-screen bg-bg-primary pt-24">
      {/* Shared Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Back to Home button */}
          <motion.button
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-bold tracking-wider text-xs uppercase mb-8 transition-colors"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ x: -4 }}
          >
            <FaArrowLeft size={12} /> Back to Home
          </motion.button>
          
          <div>
            <span className="inline-block bg-accent/10 text-accent font-bold tracking-widest text-xs px-3 py-1 mb-4 uppercase">MY BLOG</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold is-family-secondary mb-4 text-text-primary">Thoughts & Articles</h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Insights on web development, tech & everything in between.
          </p>

          {/* Admin-only: New Post button */}
          {user && (
            <motion.button
              className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 text-xs font-bold uppercase tracking-widest mt-6 transition-opacity hover:opacity-90"
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

      <div className="max-w-4xl mx-auto px-4 pb-24">
        {/* Search & Filter */}
        <motion.div
          className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
            <input
              id="blog-search"
              type="text"
              className="w-full bg-transparent border-none border-b border-border-color focus:border-accent focus:outline-none text-sm text-text-primary py-2 pl-8 transition-colors placeholder:text-text-muted/40"
              placeholder="Search articles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className={`px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase border transition-colors ${selectedTag === '' ? 'bg-accent text-white border-accent' : 'border-border-color text-text-muted hover:border-accent hover:text-accent'}`}
              onClick={() => setSelectedTag('')}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase border transition-colors ${selectedTag === tag ? 'bg-accent text-white border-accent' : 'border-border-color text-text-muted hover:border-accent hover:text-accent'}`}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <motion.div
            className="text-center py-20 text-text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No posts found. {search ? 'Try a different search.' : 'Check back soon!'}</p>
          </motion.div>
        )}

        {/* Blog Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((blog, i) => (
              <motion.article
                key={blog.id}
                className="group border border-border-color bg-bg-secondary flex flex-col h-full overflow-hidden hover:border-accent/50 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                {blog.coverImage && (
                  <div className="w-full h-48 overflow-hidden bg-bg-primary">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      onError={e => (e.currentTarget.parentElement!.style.display = 'none')}
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  {blog.tags.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {blog.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-accent">
                          <FaTag size={9} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-xl font-bold is-family-secondary mb-2 group-hover:text-accent transition-colors text-text-primary">{blog.title}</h2>
                  <p className="text-sm text-text-muted mb-6 flex-1 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-color/50 text-xs font-bold tracking-wider text-text-muted uppercase">
                    <span className="flex items-center gap-1.5">
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
                      className="flex items-center gap-1.5 text-text-primary hover:text-accent transition-colors"
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
