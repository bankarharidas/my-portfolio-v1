import React from "react";
import { Routes, Route } from "react-router-dom";
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
import ProjectsPage from "./pages/ProjectsPage";

// Blog pages
import BlogList from "./pages/blog/BlogList";
import BlogPost from "./pages/blog/BlogPost";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogEditor from "./pages/admin/BlogEditor";

// Portfolio Homepage
const Portfolio = () => (
  <div className="App flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pt-[80px]">
      <Hero />
      <ExploreGrid />
      <RecentLists />
      
      <div id="skills"><Skills /></div>
      <div id="experience"><Experience /></div>
      <div id="contact"><Contact /></div>
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Portfolio */}
          <Route path="/" element={<Portfolio />} />
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Public Blog */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
