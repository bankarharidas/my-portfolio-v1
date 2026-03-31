import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ number, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-3">
        {number && (
          <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
            {number}.
          </span>
        )}
        <h2
          className="text-3xl sm:text-4xl font-black font-display"
          style={{ color: 'var(--color-text)' }}
        >
          {title}
        </h2>
        <div className="h-px flex-1 max-w-[200px] ml-4" style={{ background: 'var(--color-border)' }} />
      </div>
      {subtitle && (
        <p className="text-sm font-medium mt-2 ml-12" style={{ color: 'var(--color-text-muted)' }}>
          {subtitle}
        </p>
      )}
      <div className="section-line mt-4 ml-0" />
    </motion.div>
  );
};

export default SectionTitle;
