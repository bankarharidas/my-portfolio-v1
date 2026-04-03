# Admin Blog System for Portfolio

## Overview

Add a full **Admin Panel** to the portfolio website that lets you write and publish blog posts directly in the browser — no code pushing required. Blogs will be stored in **Firebase Firestore** (free, real-time database), with **Firebase Authentication** for admin login security. The entire new code will be written in **TypeScript**.

## Architecture

```
Portfolio Website (React + Vite)
├── Public Blog Page   → /blog        (anyone can read)
├── Admin Login Page   → /admin/login (password protected)
└── Admin Dashboard    → /admin       (write/edit/delete blogs)
         │
         ▼
   Firebase Firestore  (stores blogs in the cloud)
   Firebase Auth       (secures the admin panel)
```

> [!IMPORTANT]
> **Firebase is the backend** — it's Google's free cloud database. Blogs you post in the admin panel instantly appear on the public blog page. No server needed, no code pushing required.

---

## Proposed Changes

### 1. Dependencies & Config

#### [MODIFY] [package.json](file:///c:/Users/Haridas%20Bankar/Antigravity%20Project/portfolio/package.json)
- Add `firebase`, `react-router-dom`, `react-quill` (rich text editor), `@types/node`
- Add TypeScript support: `typescript`, `@types/react`, `@types/react-dom`

#### [NEW] `tsconfig.json` — TypeScript configuration
#### [NEW] `tsconfig.node.json` — TypeScript config for Vite

#### [MODIFY] [vite.config.js](file:///c:/Users/Haridas%20Bankar/Antigravity%20Project/portfolio/vite.config.js)
- Rename to `vite.config.ts`, add TypeScript plugin support

---

### 2. Firebase Setup

#### [NEW] `src/lib/firebase.ts`
- Initialize Firebase app, Auth, and Firestore
- Export `db`, `auth` instances

#### [NEW] `src/lib/blogService.ts`
- `getAllBlogs()` — fetch all published blogs
- `getBlogById(id)` — fetch single blog
- `createBlog(data)` — create new blog post
- `updateBlog(id, data)` — update existing blog
- `deleteBlog(id)` — delete a blog

---

### 3. Auth Context (TypeScript)

#### [NEW] `src/context/AuthContext.tsx`
- Wraps Firebase Auth
- Provides `user`, `login(email, password)`, `logout()` to all components
- Exports `useAuth()` hook

---

### 4. Route Protection

#### [NEW] `src/components/ProtectedRoute.tsx`
- Checks if admin is logged in
- Redirects to `/admin/login` if not authenticated

---

### 5. Admin Pages (TypeScript)

#### [NEW] `src/pages/admin/AdminLogin.tsx`
- Glassmorphism login card with email + password fields
- Firebase Auth sign-in
- Redirects to `/admin` on success

#### [NEW] `src/pages/admin/AdminDashboard.tsx`
- Lists all blog posts with Edit / Delete actions
- "New Post" button → opens editor
- Stats: total posts, published count

#### [NEW] `src/pages/admin/BlogEditor.tsx`
- Rich text editor (React Quill) for blog content
- Fields: Title, Slug, Cover Image URL, Tags, Content
- Save as Draft / Publish buttons
- Live character/word count

---

### 6. Public Blog Pages

#### [NEW] `src/pages/blog/BlogList.tsx`
- Public page at `/blog`
- Shows all published blogs as cards
- Search + filter by tag

#### [NEW] `src/pages/blog/BlogPost.tsx`
- Public page at `/blog/:slug`
- Renders full blog content (HTML from rich text editor)
- Shows author, date, tags, reading time

---

### 7. App Routing

#### [MODIFY] [App.jsx → App.tsx](file:///c:/Users/Haridas%20Bankar/Antigravity%20Project/portfolio/src/App.jsx)
- Add `react-router-dom` with routes:
  - `/` → existing portfolio homepage
  - `/blog` → public blog list
  - `/blog/:slug` → individual blog post
  - `/admin/login` → admin login
  - `/admin` → protected admin dashboard (requires auth)
  - `/admin/new` → create blog editor
  - `/admin/edit/:id` → edit blog editor

---

### 8. Navbar Update

#### [MODIFY] [Navbar.jsx](file:///c:/Users/Haridas%20Bankar/Antigravity%20Project/portfolio/src/components/Navbar.jsx)
- Add "Blog" link to the navigation menu

---

## Security

| Feature | How |
|---|---|
| Admin login | Firebase Auth (email + password) |
| Blog write/delete | Firestore Security Rules allow writes only to authenticated users |
| Public reads | Anyone can read published blogs |
| Session persistence | Firebase handles JWT tokens automatically |
| No hardcoded passwords | Credentials stored in Firebase, never in source code |

> [!WARNING]
> You will need to create a **free Firebase project** and add the config keys to a `.env` file. I will guide you through this step-by-step.

---

## Open Questions

> [!IMPORTANT]
> **Do you have a Firebase account?**  
> If not, I'll guide you to create a free one at https://firebase.google.com. It only takes 2 minutes.

> [!IMPORTANT]
> **Admin credentials**: What email/password do you want to use for the admin login? I'll set it up in Firebase Auth for you.

---

## Verification Plan

### Automated
- `npm run build` passes with no TypeScript errors

### Manual
1. Visit `/blog` — see blog list page
2. Visit `/admin/login` — login form appears
3. Login with admin credentials → redirected to dashboard
4. Create a new blog post → appears on `/blog` instantly
5. Try visiting `/admin` without login → redirected to login page (security test)
6. Logout → session cleared
