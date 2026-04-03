import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEye, FaFileAlt, FaCheckCircle, FaClock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { getAllBlogsAdmin, deleteBlog } from '../../lib/blogService';
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
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div>
            <h1 className="admin-header-title">
              ✍️ Blog Admin
            </h1>
            <p className="admin-header-email">{user?.email}</p>
          </div>
          <div className="admin-header-actions">
            <motion.button
              className="admin-btn-primary"
              onClick={() => navigate('/admin/new')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              id="new-post-btn"
            >
              <FaPlus size={13} /> New Post
            </motion.button>
            <motion.button
              className="admin-btn-ghost"
              onClick={handleLogout}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <FaSignOutAlt size={13} /> Logout
            </motion.button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stats">
          {[
            { label: 'Total Posts', value: blogs.length, icon: <FaFileAlt />, color: '#6366f1' },
            { label: 'Published', value: published, icon: <FaCheckCircle />, color: '#10b981' },
            { label: 'Drafts', value: drafts, icon: <FaClock />, color: '#f59e0b' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="admin-stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="admin-stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div>
                <div className="admin-stat-value">{stat.value}</div>
                <div className="admin-stat-label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blog List */}
        <div className="admin-section">
          <h2 className="admin-section-title">All Posts</h2>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-spinner" />
              <p>Loading posts...</p>
            </div>
          ) : blogs.length === 0 ? (
            <motion.div
              className="admin-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <FaFileAlt size={40} style={{ opacity: 0.2, marginBottom: 16 }} />
              <p>No blog posts yet.</p>
              <button
                className="admin-btn-primary"
                onClick={() => navigate('/admin/new')}
              >
                <FaPlus size={12} /> Write your first post
              </button>
            </motion.div>
          ) : (
            <div className="admin-blog-list">
              <AnimatePresence>
                {blogs.map((blog, i) => (
                  <motion.div
                    key={blog.id}
                    className="admin-blog-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="admin-blog-item-left">
                      <span
                        className="admin-status-badge"
                        data-status={blog.status}
                      >
                        {blog.status === 'published' ? '● Published' : '○ Draft'}
                      </span>
                      <div className="admin-blog-item-title">{blog.title}</div>
                      <div className="admin-blog-item-meta">
                        {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                        {' · '}
                        {blog.readTime} min read
                        {blog.tags.length > 0 && (
                          <> · {blog.tags.slice(0, 3).join(', ')}</>
                        )}
                      </div>
                    </div>
                    <div className="admin-blog-item-actions">
                      {blog.status === 'published' && (
                        <motion.a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-icon-btn"
                          title="View post"
                          whileHover={{ scale: 1.15 }}
                        >
                          <FaEye size={14} />
                        </motion.a>
                      )}
                      <motion.button
                        className="admin-icon-btn"
                        title="Edit post"
                        onClick={() => navigate(`/admin/edit/${blog.id}`)}
                        whileHover={{ scale: 1.15 }}
                      >
                        <FaEdit size={14} />
                      </motion.button>
                      {confirmDelete === blog.id ? (
                        <div className="admin-delete-confirm">
                          <span>Delete?</span>
                          <button
                            className="admin-delete-yes"
                            onClick={() => handleDelete(blog.id)}
                            disabled={deletingId === blog.id}
                          >
                            {deletingId === blog.id ? '...' : 'Yes'}
                          </button>
                          <button
                            className="admin-delete-no"
                            onClick={() => setConfirmDelete(null)}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          className="admin-icon-btn admin-icon-btn-danger"
                          title="Delete post"
                          onClick={() => setConfirmDelete(blog.id)}
                          whileHover={{ scale: 1.15 }}
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
