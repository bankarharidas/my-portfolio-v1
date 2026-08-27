import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolioData";

const CATEGORIES = ["All", "Blockchain", "IoT & AI", "Full Stack", "Web Dev", "AI / ML", "Tool"];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const idx = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--color-card)",
        border: `1px solid ${hovered ? "var(--color-accent)" : "var(--color-border)"}`,
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, transform 0.2s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        overflow: "hidden",
      }}
    >
      {/* Image / Placeholder */}
      <div
        style={{
          height: "140px",
          background: project.image
            ? `url(${project.image}) center/cover no-repeat`
            : "var(--color-card-high)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {!project.image && (
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id={`g${idx}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FF3B00" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#g${idx})`} />
          </svg>
        )}
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(28,27,27,0.85))",
          }}
        />
        {/* Index + Category */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "14px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
            }}
          >
            [{idx}]
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.58rem",
              fontWeight: 700,
              color: "var(--color-text-muted)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "1px solid var(--color-border)",
              padding: "2px 8px",
              background: "rgba(28,27,27,0.75)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.15rem 1.25rem", display: "flex", flexDirection: "column", flex: 1, gap: "0.75rem" }}>
        {/* Title */}
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.02rem",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.82rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.65,
            flex: 1,
          }}
        >
          {Array.isArray(project.description)
            ? project.description.slice(0, 2).map((d, i) => <p key={i} style={{ margin: "0 0 0.3rem" }}>{d}</p>)
            : project.description}
        </div>

        {/* Tech chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "3px 7px",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                borderRadius: 0,
                background: "transparent",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid var(--color-border)",
            paddingTop: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.62rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {project.date}
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              style={{
                color: "var(--color-text-muted)",
                transition: "color 0.15s",
                display: "flex",
                alignItems: "center",
                padding: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <FaGithub size={15} />
            </a>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Live"
              style={{
                color: "var(--color-text-muted)",
                transition: "color 0.15s",
                display: "flex",
                alignItems: "center",
                padding: "4px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <FaExternalLinkAlt size={12} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 md:py-32"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            003
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 0.9,
              color: "var(--color-text)",
              margin: "0 0 1rem",
              letterSpacing: "0.02em",
            }}
          >
            Projects
          </h2>
          <div
            style={{
              width: "120px",
              height: "4px",
              background: "var(--color-accent)",
            }}
          />
        </motion.div>

        {/* ── Filter Tabs (scrollable on mobile) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.45rem 1rem",
                  minHeight: "36px",
                  borderRadius: 0,
                  border: `1px solid ${isActive ? "var(--color-accent)" : "var(--color-border)"}`,
                  background: isActive ? "var(--color-accent)" : "transparent",
                  color: isActive ? "var(--color-bg)" : "var(--color-text-muted)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* ── Grid with zero horizontal blowout ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "1.5px",
              background: "var(--color-border)",
              border: "1px solid var(--color-border)",
            }}
          >
            {filtered.map((project, i) => (
              <div key={project.title} style={{ background: "var(--color-bg-secondary)" }}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── GitHub CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center"
        >
          <div className="hidden sm:block h-px flex-1" style={{ background: "var(--color-border)" }} />
          <a
            href="https://github.com/bankarharidas"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.75rem 1.75rem",
              minHeight: "44px",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              borderRadius: 0,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            <FaGithub size={14} /> View All on GitHub →
          </a>
          <div className="hidden sm:block h-px flex-1" style={{ background: "var(--color-border)" }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
