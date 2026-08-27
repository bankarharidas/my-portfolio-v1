import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaSun, FaMoon, FaPen } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "About", to: "about" },
  { name: "Skills", to: "skills" },
  { name: "Projects", to: "projects" },
  { name: "Experience", to: "experience" },
  { name: "Contact", to: "contact" },
];

/* ─── Logo Mark ─── */
const LogoMark = () => (
  <motion.div
    whileHover={{ scale: 1.07 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 420, damping: 22 }}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "1px",
      lineHeight: 1,
      userSelect: "none",
    }}
  >
    {/* SVG gradient definition — injected inline so it works in any context */}
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="hb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#FF3B00" />
          <stop offset="55%"  stopColor="#FF7A2F" />
          <stop offset="100%" stopColor="#FFB347" />
        </linearGradient>
      </defs>
    </svg>

    {/* < bracket */}
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "rgba(255,91,0,0.45)",
        letterSpacing: "-0.04em",
      }}
    >
      {"<"}
    </span>

    {/* HB wordmark */}
    <span
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "1.65rem",
        fontWeight: 400,
        letterSpacing: "0.06em",
        background: "linear-gradient(135deg, #FF3B00 0%, #FF7A2F 55%, #FFB347 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        /* Ensures gradient renders on Safari + Chrome */
        display: "inline-block",
      }}
    >
      HB
    </span>

    {/* /> bracket */}
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "1.1rem",
        fontWeight: 700,
        color: "rgba(255,91,0,0.45)",
        letterSpacing: "-0.04em",
      }}
    >
      {"/>"}
    </span>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        background: 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid var(--color-border)` : 'none',
        boxShadow: 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex justify-between items-center">
        {/* Logo — scrolls to #hero on home, navigates to / elsewhere */}
        {isHomePage ? (
          <Link to="hero" smooth duration={500} offset={-80} className="cursor-pointer">
            <LogoMark />
          </Link>
        ) : (
          <RouterLink to="/" className="cursor-pointer">
            <LogoMark />
          </RouterLink>
        )}

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1 h-full">
          {isHomePage && navLinks.map((link, i) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-80}
              className="relative cursor-pointer px-4 py-2 text-sm font-medium rounded-lg group"
              style={{
                color: activeSection === link.to ? 'var(--color-accent)' : 'var(--color-text-muted)',
                transition: 'color 0.2s ease',
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-center gap-1"
              >
                <span className="font-mono text-xs" style={{ color: 'var(--color-accent)', opacity: 0.5 }}>
                  0{i + 1}.
                </span>
                {link.name}
              </motion.span>
              {/* Hover underline */}
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ background: 'var(--color-accent)' }}
              />
              {/* Active indicator */}
              {activeSection === link.to && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4"
                  style={{ background: 'var(--color-accent)' }}
                />
              )}
            </Link>
          ))}

          {/* Blog Link */}
          <RouterLink
            to="/blog"
            className="relative cursor-pointer px-4 py-2 text-sm font-medium rounded-lg group flex items-center gap-1.5"
            style={{
              color: location.pathname.startsWith('/blog') ? 'var(--color-accent)' : 'var(--color-text-muted)',
              transition: 'color 0.2s ease',
            }}
          >
            <FaPen size={11} />
            Blog
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              style={{ background: 'var(--color-accent)' }}
            />
            {location.pathname.startsWith('/blog') && (
              <motion.span
                layoutId="navIndicatorBlog"
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full mx-4"
                style={{ background: 'var(--color-accent)' }}
              />
            )}
          </RouterLink>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mx-2 w-10 h-10 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-text-muted)',
            }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaSun size={16} style={{ color: '#f59e0b' }} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaMoon size={16} style={{ color: '#6366f1' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Resume Button */}
          <motion.a
            href={personalInfo.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 px-5 py-2 text-sm font-bold font-mono rounded-lg"
            style={{
              border: '1.5px solid var(--color-accent)',
              color: 'var(--color-accent)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--color-accent)';
              e.target.style.color = 'var(--color-bg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--color-accent)';
            }}
          >
            RESUME
          </motion.a>
        </div>

        {/* Mobile Right Controls */}
        <div className="md:hidden flex items-center gap-2.5">
          <motion.button
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
            aria-label="Toggle theme"
          >
            {isDark ? <FaSun size={15} style={{ color: '#f59e0b' }} /> : <FaMoon size={15} style={{ color: '#6366f1' }} />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              background: isDark ? 'rgba(19,19,19,0.98)' : 'rgba(245,240,232,0.98)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: `1px solid var(--color-border)`,
              boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            }}
          >
            <div className="flex flex-col items-center px-6 py-6 space-y-3">
              {isHomePage && navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  className="w-full text-center"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold rounded-lg w-full cursor-pointer touch-target"
                    style={{
                      color: activeSection === link.to ? 'var(--color-accent)' : 'var(--color-text)',
                      background: activeSection === link.to ? 'rgba(255,59,0,0.08)' : 'transparent',
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>0{i + 1}.</span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              {/* Mobile Blog Link */}
              <motion.div
                className="w-full text-center"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <RouterLink
                  to="/blog"
                  className="flex items-center justify-center gap-2 py-3 px-4 text-base font-semibold rounded-lg w-full touch-target"
                  style={{
                    color: location.pathname.startsWith('/blog') ? 'var(--color-accent)' : 'var(--color-text)',
                    background: location.pathname.startsWith('/blog') ? 'rgba(255,59,0,0.08)' : 'transparent',
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <FaPen size={12} style={{ color: 'var(--color-accent)' }} />
                  Blog
                </RouterLink>
              </motion.div>
              <motion.a
                href={personalInfo.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                className="w-full max-w-xs text-center py-3 px-6 mt-2 text-sm font-bold font-mono rounded-lg flex items-center justify-center touch-target"
                style={{
                  border: '1.5px solid var(--color-accent)',
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                }}
                onClick={() => setIsOpen(false)}
              >
                RESUME →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
