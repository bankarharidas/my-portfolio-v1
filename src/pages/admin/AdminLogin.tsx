import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Animated background blobs */}
      <div className="admin-blob admin-blob-1" />
      <div className="admin-blob admin-blob-2" />

      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div className="admin-login-logo">
          <div className="admin-login-logo-icon">
            <FaLock size={22} />
          </div>
          <h1 className="admin-login-title">Admin Portal</h1>
          <p className="admin-login-subtitle">
            Sign in to manage your blog posts
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          {/* Email */}
          <div className="admin-input-group">
            <label className="admin-input-label">Email Address</label>
            <div className="admin-input-wrapper">
              <FaEnvelope className="admin-input-icon" size={14} />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="admin-input"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div className="admin-input-group">
            <label className="admin-input-label">Password</label>
            <div className="admin-input-wrapper">
              <FaLock className="admin-input-icon" size={14} />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="admin-input"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-eye-btn"
                onClick={() => setShowPass(!showPass)}
                tabIndex={-1}
              >
                {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              className="admin-error"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              ⚠ {error}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            className="admin-login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="admin-btn-loading">
                <span className="admin-spinner-sm" /> Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <p className="admin-login-footer">
          🔒 Secured with Firebase Authentication
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
