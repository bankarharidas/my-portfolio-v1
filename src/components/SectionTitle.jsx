import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ number, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-10 sm:mb-16"
    >
      <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
        {number && (
          <span className="font-mono text-xs sm:text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
            {number}.
          </span>
        )}
        <h2
          className="text-2xl sm:text-4xl font-black font-display"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </h2>
        <div className="h-px flex-1 max-w-[60px] sm:max-w-[200px] ml-2 sm:ml-4" style={{ background: 'var(--color-border)' }} />
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm font-medium mt-1 sm:mt-2 ml-0 sm:ml-8" style={{ color: 'var(--color-text-muted)' }}>
          {subtitle}
        </p>
      )}
      <div className="section-line mt-3 sm:mt-4 ml-0" />
    </motion.div>
  );
};

export default SectionTitle;
