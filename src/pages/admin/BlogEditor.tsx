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
  FaUpload,
} from 'react-icons/fa';
import { createBlog, getBlogById, updateBlog } from '../../lib/blogService';
import { uploadImage, buildBlogCoverPath } from '../../lib/awsStorageService';
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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadProgress(0);

    try {
      const path = buildBlogCoverPath(file);
      const url = await uploadImage(file, path, (pct) => setUploadProgress(pct));
      setCoverImage(url);
      showToast('✅ Image uploaded to AWS S3!');
    } catch (err) {
      console.error('[BlogEditor] Image upload failed:', err);
      setUploadError('❌ Upload failed. Check your AWS setup and try again.');
    } finally {
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
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

  const inputClass = "w-full bg-transparent border-none border-b border-border-color focus:border-accent focus:outline-none text-text-primary text-base py-2 transition-colors rounded-none placeholder:text-text-muted/40";
  const labelClass = "block text-xs font-bold tracking-widest uppercase mb-1 text-text-muted is-family-monospace";

  return (
    <div className="container py-8 md:py-12 max-w-7xl mx-auto">
      {/* Toast */}
      {toast && (
        <motion.div
          className="fixed top-4 right-4 bg-accent text-white px-6 py-3 font-bold text-sm tracking-wide z-50 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {toast}
        </motion.div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-border-color pb-6">
        <div className="flex items-center gap-4">
          <motion.button
            className="w-10 h-10 flex items-center justify-center border border-border-color text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-colors"
            onClick={() => navigate('/admin')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Back to Dashboard"
          >
            <FaArrowLeft size={14} />
          </motion.button>
          <h1 className="text-2xl md:text-3xl font-bold is-family-secondary text-text-primary">
            {isEditing ? '✏️ Edit Post' : '✍️ New Post'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 border border-border-color text-text-primary font-bold text-sm uppercase tracking-wider hover:bg-bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSave('draft')}
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            id="save-draft-btn"
          >
            <FaSave size={12} /> Save Draft
          </motion.button>
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-bold text-sm uppercase tracking-wider transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSave('published')}
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            id="publish-btn"
          >
            <FaGlobe size={12} /> {saving ? 'Publishing...' : 'Publish'}
          </motion.button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Left — Metadata */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <div>
            <label className={labelClass}>Post Title *</label>
            <input
              id="post-title"
              className={inputClass}
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Enter a catchy title..."
            />
          </div>

          <div>
            <label className={labelClass}>URL Slug</label>
            <div className="flex items-center">
              <span className="text-text-muted is-family-monospace text-sm mr-1">/blog/</span>
              <input
                id="post-slug"
                className={`${inputClass} is-family-monospace text-sm`}
                value={slug}
                onChange={e => setSlug(e.target.value)}
                placeholder="auto-generated"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Cover Image</label>

            {/* File upload button → uploads to AWS S3 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="cover-image-file"
              onChange={handleImageFileChange}
            />
            <motion.button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border-color text-text-primary font-bold text-xs uppercase tracking-wider hover:bg-bg-secondary transition-colors mb-3"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadProgress !== null}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <FaUpload size={12} />
              {uploadProgress !== null
                ? `Uploading… ${uploadProgress}%`
                : 'Upload Image to AWS S3'}
            </motion.button>

            {/* Progress bar */}
            {uploadProgress !== null && (
              <div className="h-1 rounded-full bg-bg-secondary mb-3 overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }} 
                />
              </div>
            )}

            {/* Upload error */}
            {uploadError && (
              <p className="text-red-500 text-xs font-bold mb-3">{uploadError}</p>
            )}

            {/* Manual URL fallback */}
            <input
              id="cover-image"
              className={inputClass}
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              placeholder="Or paste an image URL here…"
            />

            {coverImage && (
              <div className="mt-4 border border-border-color p-1 bg-bg-secondary">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-auto object-cover max-h-[150px]"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              id="post-tags"
              className={inputClass}
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="React, TypeScript, Web Dev"
            />
            {tagsInput && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tagsInput.split(',').filter(t => t.trim()).map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-bg-secondary border border-border-color text-text-muted">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className={labelClass}>Excerpt / Summary</label>
            <textarea
              id="post-excerpt"
              className={`${inputClass} resize-y min-h-[80px]`}
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="Short description of the post (used in blog list)..."
              rows={3}
            />
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center p-4 bg-bg-secondary border border-border-color mt-4">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold is-family-secondary text-text-primary leading-none mb-1">{wordCount}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">Words</span>
            </div>
            <div className="w-px h-8 bg-border-color" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold is-family-secondary text-text-primary leading-none mb-1">{readTime} min</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">Read Time</span>
            </div>
            <div className="w-px h-8 bg-border-color" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold is-family-secondary text-text-primary leading-none mb-1">{content.length}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-muted">Chars</span>
            </div>
          </div>
        </div>

        {/* Right — Editor */}
        <div className="flex-1 flex flex-col border border-border-color bg-bg-secondary min-h-[600px] shadow-sm w-full">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-3 border-b border-border-color bg-bg-primary flex-wrap">
            <div className="flex items-center gap-1 mr-4">
              {toolbarActions.map((action) => (
                <motion.button
                  key={action.label}
                  className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-accent hover:bg-bg-secondary rounded-sm transition-colors"
                  onClick={action.action}
                  title={action.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                >
                  {action.icon}
                </motion.button>
              ))}
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <button
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  tab === 'write' ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
                }`}
                onClick={() => setTab('write')}
              >
                Write
              </button>
              <button
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  tab === 'preview' ? 'bg-accent text-white' : 'text-text-muted hover:text-text-primary'
                }`}
                onClick={() => setTab('preview')}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Write Area */}
          {tab === 'write' ? (
            <textarea
              ref={textareaRef}
              id="post-content"
              className="flex-1 p-6 bg-transparent border-none focus:outline-none text-text-primary resize-none is-family-monospace text-sm leading-relaxed"
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
            <div className="flex-1 p-6 overflow-y-auto">
              {content ? (
                <div
                  className="blog-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-text-muted text-sm font-medium uppercase tracking-wider">
                    Nothing to preview yet. Start writing!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
