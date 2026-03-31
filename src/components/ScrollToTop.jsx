import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0);
      setVisible(scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          id="scroll-to-top"
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: 'var(--color-card)',
            border: '2px solid var(--color-accent)',
            color: 'var(--color-accent)',
            boxShadow: '0 4px 20px rgba(100, 255, 218, 0.2)',
          }}
          aria-label="Scroll to top"
        >
          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 48 48"
          >
            <circle
              cx="24" cy="24" r="21"
              fill="none"
              stroke="rgba(100, 255, 218, 0.15)"
              strokeWidth="2"
            />
            <circle
              cx="24" cy="24" r="21"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 21}`}
              strokeDashoffset={`${2 * Math.PI * 21 * (1 - scrollProgress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s ease' }}
            />
          </svg>
          <FaArrowUp size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;