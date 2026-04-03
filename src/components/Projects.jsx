import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { projects } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

const CategoryBadge = ({ category, color }) => (
  <span
    className="text-xs font-bold font-mono px-3 py-1 rounded-full"
    style={{
      background: `${color}20`,
      color,
      border: `1px solid ${color}40`,
    }}
  >
    {category}
  </span>
);

const ProjectCard = ({ project, index }) => {
  const colors = ["#64ffda", "#e94560", "#7c3aed"];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 20px 60px ${color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      {/* Top color bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Card body */}
      <div className="p-7 flex flex-col flex-grow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                style={{ background: `${color}15`, color }}
              >
                {project.icon}
              </div>
              <CategoryBadge category={project.category} color={color} />
            </div>
            <h3
              className="text-xl font-bold font-display"
              style={{ color: 'var(--color-text)' }}
            >
              {project.title}
            </h3>
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
              {project.date}
            </p>
          </div>
          <div className="flex gap-3 ml-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
            >
              <FaGithub size={16} />
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
            >
              <FaExternalLinkAlt size={13} />
            </a>
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-6 flex-grow">
          {project.description.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              <span style={{ color, marginTop: '3px', flexShrink: 0 }}>▹</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-md"
              style={{
                background: 'var(--color-bg)',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--color-border)' }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionTitle
          number="03"
          title="Featured Projects"
          subtitle="Things I've built that I'm proud of"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Want to see more?
          </p>
          <motion.a
            href="https://github.com/bankarharidas"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold font-mono"
            style={{
              border: '1.5px solid var(--color-accent)',
              color: 'var(--color-accent)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-bg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-accent)'; }}
          >
            <FaGithub size={16} />
            View All on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
