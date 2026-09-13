import React from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolioData";

const ChipGroup = ({ label, items, isLast }) => (
  <div style={{ marginBottom: isLast ? "0" : "2rem" }}>
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
        display: "block",
        marginBottom: "0.75rem",
      }}
    >
      {label}
    </span>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
      {items.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.66rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "0.4rem 0.8rem",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
            borderRadius: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            cursor: "default",
            transition: "all 0.15s",
            background: "transparent",
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
          <span style={{ fontSize: "0.95rem", lineHeight: 1 }}>{skill.icon}</span>
          {skill.name}
        </motion.div>
      ))}
    </div>
  </div>
);

const Skills = () => (
  <section id="skills" className="w-full px-6 md:px-12 lg:px-24 py-4 md:py-4">
    <div className="flex items-center gap-6 mb-8">
      <h2 className="text-3xl md:text-4xl font-bold is-family-secondary is-italic text-text-primary">
        Skills
      </h2>
      <div className="flex-1 h-px bg-border-color" />
    </div>

    {/* ── Two-column layout (responsive via CSS class) ── */}
    <div className="skills-grid-responsive grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* LEFT: tech chips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
          <ChipGroup label="Languages" items={skills.languages} />
          <ChipGroup label="Frameworks & Libraries" items={skills.frameworksAndLibraries} />
          <ChipGroup label="Tools & Platforms" items={skills.toolsAndPlatforms} isLast={true} />
        </motion.div>

        {/* RIGHT: competencies + quote */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Core Competencies */}
          <div
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              padding: "1.75rem",
              borderRadius: 0,
              marginBottom: "0",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                display: "block",
                marginBottom: "1.25rem",
              }}
            >
              Core Competencies
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {skills.coreCompetencies.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.5rem 0",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    style={{
                      width: "3px",
                      height: "1rem",
                      background: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: "var(--color-text)",
                    }}
                  >
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Editorial quote block */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{
              border: "1px solid var(--color-border)",
              borderLeft: "4px solid var(--color-accent)",
              padding: "1.5rem",
              background: "var(--color-card)",
            }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "var(--color-text)",
                letterSpacing: "0.05em",
                lineHeight: 1.2,
                margin: "0 0 0.5rem",
              }}
            >
              Full Stack
              <span style={{ color: "var(--color-accent)" }}> ·</span> Web Dev
              <span style={{ color: "var(--color-accent)" }}> ·</span> AI/ML
            </p>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
              }}
            >
              Primary Domains
            </span>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );

export default Skills;
