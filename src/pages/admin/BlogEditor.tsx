import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaSave,
  FaGlobe,
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaCode,
  FaLink,
  FaImage,
} from 'react-icons/fa';
import { createBlog, getBlogById, updateBlog } from '../../lib/blogService';
import type { CreateBlogPost } from '../../types/blog';

type Tab = 'write' | 'preview';

const generateSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [tab, setTab] = useState<Tab>('write');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && id) {
      getBlogById(id).then(blog => {
        if (blog) {
          setTitle(blog.title);
          setSlug(blog.slug);
          setContent(blog.content);
          setExcerpt(blog.excerpt);
          setCoverImage(blog.coverImage);
          setTagsInput(blog.tags.join(', '));
        }
      });
    }
  }, [id, isEditing]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) setSlug(generateSlug(val));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSave = async (status: 'draft' | 'published') => {
    if (!title.trim() || !content.trim()) {
      showToast('⚠ Title and content are required.');
      return;
    }
    setSaving(true);
    try {
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const data: CreateBlogPost = {
        title: title.trim(),
        slug: slug || generateSlug(title),
        content,
        excerpt: excerpt || content.replace(/<[^>]*>/g, '').slice(0, 160) + '...',
        coverImage,
        tags,
        status,
      };

      if (isEditing && id) {
        await updateBlog(id, data);
        showToast(`✅ Post ${status === 'published' ? 'published' : 'saved as draft'}!`);
      } else {
        await createBlog(data);
        showToast(`✅ Post ${status === 'published' ? 'published' : 'saved as draft'}!`);
        setTimeout(() => navigate('/admin'), 1200);
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Error saving post. Try again.');
    } finally {
      setSaving(false);
    }
  };

  // Toolbar formatting helpers
  const insertFormat = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    const newContent =
      content.slice(0, start) + before + selected + after + content.slice(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 0);
  };

  const toolbarActions = [
    { icon: <FaBold />, label: 'Bold', action: () => insertFormat('<strong>', '</strong>') },
    { icon: <FaItalic />, label: 'Italic', action: () => insertFormat('<em>', '</em>') },
    { icon: <FaHeading />, label: 'Heading', action: () => insertFormat('<h2>', '</h2>') },
    { icon: <FaQuoteRight />, label: 'Quote', action: () => insertFormat('<blockquote>', '</blockquote>') },
    { icon: <FaCode />, label: 'Code', action: () => insertFormat('<code>', '</code>') },
    { icon: <FaListUl />, label: 'Unordered List', action: () => insertFormat('<ul>\n  <li>', '</li>\n</ul>') },
    { icon: <FaListOl />, label: 'Ordered List', action: () => insertFormat('<ol>\n  <li>', '</li>\n</ol>') },
    { icon: <FaLink />, label: 'Link', action: () => insertFormat('<a href="URL">', '</a>') },
    { icon: <FaImage />, label: 'Image', action: () => insertFormat('<img src="URL" alt="', '" />') },
  ];

  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="editor-page">
      {/* Toast */}
      {toast && (
        <motion.div
          className="editor-toast"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {toast}
        </motion.div>
      )}

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <motion.button
              className="admin-btn-ghost"
              onClick={() => navigate('/admin')}
              whileHover={{ scale: 1.04 }}
            >
              <FaArrowLeft size={13} /> Dashboard
            </motion.button>
            <h1 className="admin-header-title" style={{ marginLeft: 16 }}>
              {isEditing ? '✏️ Edit Post' : '✍️ New Post'}
            </h1>
          </div>
          <div className="admin-header-actions">
            <motion.button
              className="admin-btn-ghost"
              onClick={() => handleSave('draft')}
              disabled={saving}
              whileHover={{ scale: 1.04 }}
              id="save-draft-btn"
            >
              <FaSave size={13} /> Save Draft
            </motion.button>
            <motion.button
              className="admin-btn-primary"
              onClick={() => handleSave('published')}
              disabled={saving}
              whileHover={{ scale: 1.04 }}
              id="publish-btn"
            >
              <FaGlobe size={13} /> {saving ? 'Publishing...' : 'Publish'}
            </motion.button>
          </div>
        </div>
      </header>

      <div className="editor-content">
        {/* Left — Metadata */}
        <div className="editor-sidebar">
          <div className="editor-field">
            <label className="editor-label">Post Title *</label>
            <input
              id="post-title"
              className="editor-input"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Enter a catchy title..."
            />
          </div>

          <div className="editor-field">
            <label className="editor-label">URL Slug</label>
            <div className="editor-slug-wrapper">
              <span className="editor-slug-prefix">/blog/</span>
              <input
                id="post-slug"
                className="editor-input editor-slug-input"
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="auto-generated"
              />
            </div>
          </div>

          <div className="editor-field">
            <label className="editor-label">Cover Image URL</label>
            <input
              id="cover-image"
              className="editor-input"
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="https://..."
            />
            {coverImage && (
              <img
                src={coverImage}
                alt="Cover preview"
                className="editor-cover-preview"
                onError={e => (e.currentTarget.style.display = 'none')}
              />
            )}
          </div>

          <div className="editor-field">
            <label className="editor-label">Tags (comma separated)</label>
            <input
              id="post-tags"
              className="editor-input"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="React, TypeScript, Web Dev"
            />
            {tagsInput && (
              <div className="editor-tags-preview">
                {tagsInput.split(',').filter(t => t.trim()).map((tag, i) => (
                  <span key={i} className="editor-tag">{tag.trim()}</span>
                ))}
              </div>
            )}
          </div>

          <div className="editor-field">
            <label className="editor-label">Excerpt / Summary</label>
            <textarea
              id="post-excerpt"
              className="editor-input"
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Short description of the post (used in blog list)..."
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* Stats */}
          <div className="editor-stats">
            <div className="editor-stat">
              <span className="editor-stat-value">{wordCount}</span>
              <span className="editor-stat-label">Words</span>
            </div>
            <div className="editor-stat">
              <span className="editor-stat-value">{readTime} min</span>
              <span className="editor-stat-label">Read Time</span>
            </div>
            <div className="editor-stat">
              <span className="editor-stat-value">{content.length}</span>
              <span className="editor-stat-label">Chars</span>
            </div>
          </div>
        </div>

        {/* Right — Editor */}
        <div className="editor-main">
          {/* Toolbar */}
          <div className="editor-toolbar">
            {toolbarActions.map((action) => (
              <motion.button
                key={action.label}
                className="editor-toolbar-btn"
                onClick={action.action}
                title={action.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
              >
                {action.icon}
              </motion.button>
            ))}
            <div className="editor-toolbar-divider" />
            <button
              className={`editor-tab-btn ${tab === 'write' ? 'active' : ''}`}
              onClick={() => setTab('write')}
            >
              Write
            </button>
            <button
              className={`editor-tab-btn ${tab === 'preview' ? 'active' : ''}`}
              onClick={() => setTab('preview')}
            >
              Preview
            </button>
          </div>

          {/* Write Area */}
          {tab === 'write' ? (
            <textarea
              ref={textareaRef}
              id="post-content"
              className="editor-textarea"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your blog post here... You can use HTML tags for formatting.

Example:
<h2>Section Title</h2>
<p>Your paragraph text here...</p>
<strong>Bold text</strong>
<em>Italic text</em>
<ul>
  <li>List item</li>
</ul>
<blockquote>A great quote</blockquote>
<code>inline code</code>"
            />
          ) : (
            <div className="editor-preview">
              {content ? (
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <p className="editor-preview-empty">
                  Nothing to preview yet. Start writing!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
