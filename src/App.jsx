import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Portfolio components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExploreGrid from "./components/ExploreGrid";
import RecentLists from "./components/RecentLists";
import Footer from "./components/Footer";

// Original sections kept for routing if needed
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

// Lazy loaded route components
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const BlogList = lazy(() => import("./pages/blog/BlogList"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const BlogEditor = lazy(() => import("./pages/admin/BlogEditor"));

const LoadingFallback = () => (
  <div className="min-h-screen flex justify-center items-center py-20 bg-bg-primary">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

// Public Layout with Navbar and Footer
import { Outlet } from "react-router-dom";

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen w-full bg-bg-primary">
    <Navbar />
    <main className="flex-grow pt-[80px] w-full">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// Portfolio Homepage
const Portfolio = () => (
  <>
    <Hero />
    <ExploreGrid />
    <RecentLists />
    
    <div id="skills"><Skills /></div>
    <div id="experience"><Experience /></div>
    <div id="contact"><Contact /></div>
  </>
);

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes with shared layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/new"
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute>
              <BlogEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
