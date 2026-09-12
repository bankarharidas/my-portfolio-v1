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

  const inputClass = "w-full bg-transparent border-none border-b border-border-color focus:border-accent focus:outline-none text-text-primary text-base py-2 transition-colors rounded-none placeholder:text-text-muted/40 pl-8";
  const labelClass = "block text-xs font-bold tracking-widest uppercase mb-1 text-text-muted is-family-monospace";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md bg-bg-secondary border border-border-color p-8 md:p-10 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
            <FaLock size={20} />
          </div>
          <h1 className="text-2xl font-bold is-family-secondary text-text-primary mb-2">Admin Portal</h1>
          <p className="text-text-muted text-sm font-medium">
            Sign in to manage your blog posts
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div>
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={inputClass}
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <FaLock className="absolute left-0 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inputClass}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-2 transition-colors"
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
              className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold p-3 text-center uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ⚠ {error}
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-bold text-sm uppercase tracking-wider py-4 mt-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        <p className="text-center text-xs text-text-muted font-bold tracking-wider uppercase mt-8 opacity-50">
          🔒 Secured with Firebase
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
