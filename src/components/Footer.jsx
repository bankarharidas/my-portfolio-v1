import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 relative"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-3xl font-black font-mono text-gradient"
          >
            &lt;HB /&gt;
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { icon: <FaGithub size={20} />, href: personalInfo.github, color: '#e2e8f0' },
              { icon: <FaLinkedin size={20} />, href: personalInfo.linkedin, color: '#0ea5e9' },
              { icon: <FaEnvelope size={20} />, href: `mailto:${personalInfo.email}`, color: '#64ffda' },
            ].map(({ icon, href, color }, i) => (
              <motion.a
                key={i}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noreferrer"
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{ color: 'var(--color-text-muted)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
              >
                {icon}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-sm font-mono text-center flex items-center gap-2"
            style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
          >
            Built with{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: '#e94560', display: 'inline-flex' }}
            >
              <FaHeart size={12} />
            </motion.span>
            {" "}by Haridas Bankar © {year}
          </p>

          <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}>
            React · Vite · TailwindCSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
