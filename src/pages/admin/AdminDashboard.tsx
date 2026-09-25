import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEye, FaFileAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { getAllBlogsAdmin, deleteBlog } from '../../lib/blogService';
import { deleteImage } from '../../lib/awsStorageService';
import type { BlogPost } from '../../types/blog';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogsAdmin();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const blogToDelete = blogs.find(b => b.id === id);
      if (blogToDelete?.coverImage) {
        try {
          const urlObj = new URL(blogToDelete.coverImage);
          if (urlObj.hostname.includes('amazonaws.com')) {
            const key = decodeURIComponent(urlObj.pathname.substring(1));
            await deleteImage(key);
          }
        } catch (e) {
          console.error('Error deleting image:', e);
        }
      }

      await deleteBlog(id);
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const published = blogs.filter(b => b.status === 'published').length;
  const drafts = blogs.filter(b => b.status === 'draft').length;

  return (
    <div className="container py-16 md:py-24 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border-color pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold is-family-secondary text-text-primary mb-2">
            ✍️ Blog Admin
          </h1>
          <p className="text-text-muted text-sm font-medium is-family-monospace">{user?.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90 rounded-none"
            onClick={() => navigate('/admin/new')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            id="new-post-btn"
          >
            <FaPlus size={12} /> New Post
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 border border-border-color text-text-primary font-bold text-sm uppercase tracking-wider hover:bg-bg-secondary transition-colors rounded-none"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaSignOutAlt size={12} /> Logout
          </motion.button>
        </div>
      </header>

      <div className="space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Total Posts', value: blogs.length, icon: <FaFileAlt />, color: 'text-blue-500' },
            { label: 'Published', value: published, icon: <FaCheckCircle />, color: 'text-green-500' },
            { label: 'Drafts', value: drafts, icon: <FaClock />, color: 'text-yellow-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-bg-secondary border border-border-color p-6 flex items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`text-3xl ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold is-family-secondary text-text-primary leading-none mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-text-muted">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog List */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold is-family-secondary text-text-primary">All Posts</h2>
            <div className="flex-1 h-px bg-border-color" />
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-text-muted gap-4 border border-border-color bg-bg-secondary">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium uppercase tracking-wider">Loading posts...</p>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div
              className="py-16 flex flex-col items-center justify-center text-center border border-border-color bg-bg-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaFileAlt size={40} className="text-text-muted opacity-30 mb-4" />
              <p className="text-text-primary font-medium mb-6">No blog posts yet.</p>
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90"
                onClick={() => navigate('/admin/new')}
              >
                <FaPlus size={12} /> Write your first post
              </button>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {blogs.map((blog, i) => (
                  <motion.div
                    key={blog.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 sm:p-6 bg-bg-secondary border border-border-color group hover:border-accent transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
                            blog.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                          }`}
                        >
                          {blog.status === 'published' ? '● Published' : '○ Draft'}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-text-primary truncate mb-1">{blog.title}</div>
                      <div className="text-sm text-text-muted is-family-monospace flex items-center flex-wrap gap-2">
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="opacity-50">·</span>
                        <span>{blog.readTime} min read</span>
                        {blog.tags.length > 0 && (
                          <>
                            <span className="opacity-50">·</span>
                            <span className="truncate max-w-[200px]">{blog.tags.join(', ')}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      {blog.status === 'published' && (
                        <motion.a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-color text-text-muted hover:text-accent hover:border-accent transition-colors"
                          title="View post"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEye size={14} />
                        </motion.a>
                      )}
                      <motion.button
                        className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-color text-text-muted hover:text-accent hover:border-accent transition-colors"
                        title="Edit post"
                        onClick={() => navigate(`/admin/edit/${blog.id}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaEdit size={14} />
                      </motion.button>
                      
                      {confirmDelete === blog.id ? (
                        <div className="flex items-center gap-2 bg-bg-primary border border-red-500/30 p-1">
                          <span className="text-xs font-bold text-red-500 px-2">Delete?</span>
                          <button
                            className="w-8 h-8 bg-red-500 text-white flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors"
                            onClick={() => handleDelete(blog.id)}
                            disabled={deletingId === blog.id}
                          >
                            {deletingId === blog.id ? '...' : 'Yes'}
                          </button>
                          <button
                            className="w-8 h-8 bg-border-color text-text-primary flex items-center justify-center text-xs font-bold hover:bg-bg-secondary transition-colors"
                            onClick={() => setConfirmDelete(null)}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          className="w-10 h-10 flex items-center justify-center bg-bg-primary border border-border-color text-text-muted hover:text-red-500 hover:border-red-500/50 transition-colors"
                          title="Delete post"
                          onClick={() => setConfirmDelete(blog.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrash size={14} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
