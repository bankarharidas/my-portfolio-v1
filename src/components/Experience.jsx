import React, { useState } from "react";
import { motion } from "framer-motion";
import { experience, education } from "../data/portfolioData";

const ExperienceRow = ({ exp, index, isHovered, onHover }) => {
  const idx = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: "2.5rem",
        padding: "2rem 0",
        borderBottom: "1px solid var(--color-border)",
        position: "relative",
        transition: "background 0.2s",
        background: isHovered ? "var(--color-card)" : "transparent",
      }}
    >
      {/* Red left accent on hover */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: "var(--color-accent)",
          transform: isHovered ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 0.2s ease",
        }}
      />

      {/* Left: index + date */}
      <div style={{ paddingLeft: isHovered ? "1.25rem" : "0", transition: "padding 0.2s" }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: "0.4rem",
          }}
        >
          [{idx}]
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.62rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.05em",
            lineHeight: 1.5,
          }}
        >
          {exp.duration}
        </span>
      </div>

      {/* Right: content */}
      <div>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--color-text)",
            margin: "0 0 0.25rem",
          }}
        >
          {exp.role}
        </h3>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "var(--color-accent)",
            margin: "0 0 1rem",
          }}
        >
          {exp.organization}
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {exp.points.map((point, i) => (
            <li
              key={i}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.85rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.35rem" }}>▹</span>
              {point}
            </li>
          ))}
        </ul>
        {exp.duration === "Incoming 2026" && (
          <span
            style={{
              display: "inline-block",
              marginTop: "0.75rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 10px",
              border: "1px solid var(--color-accent)",
              color: "var(--color-accent)",
              borderRadius: 0,
            }}
          >
            Incoming
          </span>
        )}
      </div>
    </motion.div>
  );
};

const EducationRow = ({ edu, index }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr 120px",
        gap: "2rem",
        padding: "1.25rem 0",
        borderBottom: "1px solid var(--color-border)",
        background: hov ? "var(--color-card)" : "transparent",
        transition: "background 0.15s",
        alignItems: "center",
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
        {edu.duration}
      </span>
      <div>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 600,
            color: "var(--color-text)",
            margin: "0 0 0.2rem",
          }}
        >
          {edu.degree}
        </p>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.78rem",
            color: "var(--color-text-muted)",
            margin: 0,
          }}
        >
          {edu.institution}
        </p>
      </div>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--color-accent)",
          textAlign: "right",
        }}
      >
        {edu.score}
      </span>
    </motion.div>
  );
};

const Experience = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section
      id="experience"
      style={{ background: "var(--color-bg)", padding: "6rem 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Experience Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            005
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 400,
              lineHeight: 0.9,
              color: "var(--color-text)",
              margin: "0 0 1rem",
              letterSpacing: "0.02em",
            }}
          >
            Experience
          </h2>
          <div style={{ width: "120px", height: "4px", background: "var(--color-accent)" }} />
        </motion.div>

        {/* Top border for entries */}
        <div style={{ borderTop: "1px solid var(--color-border)" }}>
          {experience.map((exp, i) => (
            <ExperienceRow
              key={i}
              exp={exp}
              index={i}
              isHovered={hoveredIdx === i}
              onHover={(val) => setHoveredIdx(val === false ? null : i)}
            />
          ))}
        </div>

        {/* ── Education Sub-section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginTop: "4rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              Education
            </h3>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)" }}>
            {education.map((edu, i) => (
              <EducationRow key={i} edu={edu} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
