import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

const skillCategoryConfig = {
  languages: {
    title: "Languages",
    emoji: "🧑‍💻",
    color: "#64ffda",
  },
  frameworksAndLibraries: {
    title: "Frameworks & Libraries",
    emoji: "⚡",
    color: "#e94560",
  },
  toolsAndPlatforms: {
    title: "Tools & Platforms",
    emoji: "🛠️",
    color: "#7c3aed",
  },
  coreCompetencies: {
    title: "Core Competencies",
    emoji: "🎯",
    color: "#f59e0b",
  },
};

const SkillIcon = ({ skill, index, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      delay: index * 0.06,
      type: "spring",
      stiffness: 200,
      damping: 15,
    }}
    whileHover={{ scale: 1.12, y: -6 }}
    className="flex flex-col items-center gap-3 p-4 rounded-xl cursor-default group"
    style={{
      background: 'var(--color-card)',
      border: `1px solid var(--color-border)`,
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.boxShadow = `0 8px 30px ${color}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <span
      className="text-3xl sm:text-4xl"
      style={{ color }}
    >
      {skill.icon}
    </span>
    <span
      className="text-xs font-semibold text-center leading-tight font-mono"
      style={{ color: 'var(--color-text-muted)' }}
    >
      {skill.name}
    </span>
  </motion.div>
);

const CompetencyBadge = ({ name, index, color }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    whileHover={{ scale: 1.05, x: 6 }}
    className="flex items-center gap-3 px-5 py-3 rounded-xl"
    style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
    }}
  >
    <motion.span
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      className="text-base"
      style={{ color }}
    >
      ▹
    </motion.span>
    <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
      {name}
    </span>
  </motion.div>
);

const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages");

  const tabs = Object.keys(skillCategoryConfig).filter(k => k !== 'coreCompetencies');

  return (
    <section
      id="skills"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionTitle number="02" title="Skills & Tools" subtitle="Technologies I work with every day" />

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {tabs.map((tab) => {
            const cfg = skillCategoryConfig[tab];
            const isActive = activeTab === tab;
            return (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold font-mono transition-all duration-200"
                style={{
                  background: isActive ? cfg.color : 'transparent',
                  color: isActive ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  border: `1.5px solid ${isActive ? cfg.color : 'var(--color-border)'}`,
                }}
              >
                <span>{cfg.emoji}</span>
                {cfg.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-16"
        >
          {skills[activeTab].map((skill, i) => (
            <SkillIcon
              key={skill.name}
              skill={skill}
              index={i}
              color={skillCategoryConfig[activeTab].color}
            />
          ))}
        </motion.div>

        {/* Core Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-xl font-bold font-mono mb-6 flex items-center gap-2"
            style={{ color: 'var(--color-text)' }}
          >
            <span>🎯</span> Core Competencies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.coreCompetencies.map((name, i) => (
              <CompetencyBadge
                key={name}
                name={name}
                index={i}
                color={skillCategoryConfig.coreCompetencies.color}
              />
            ))}
          </div>
        </motion.div>

        {/* Tech orbit visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <div className="relative w-64 h-64">
            {/* Center */}
            <div
              className="absolute inset-0 m-auto w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--color-card)',
                border: '2px solid var(--color-accent)',
                boxShadow: '0 0 30px rgba(100,255,218,0.15)',
                width: '64px', height: '64px',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="text-xs font-bold font-mono" style={{ color: 'var(--color-accent)' }}>
                HB
              </span>
            </div>

            {/* Orbiting skills */}
            {['React', 'Node', 'MongoDB', 'Java', 'Git', 'Cloud'].map((label, i) => {
              const angle = (i / 6) * Math.PI * 2;
              const radius = 100;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={label}
                  animate={{
                    x: [
                      Math.cos(angle) * radius,
                      Math.cos(angle + 0.3) * radius,
                      Math.cos(angle) * radius,
                    ],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle + 0.3) * radius,
                      Math.sin(angle) * radius,
                    ],
                  }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    width: '44px', height: '44px',
                    top: `calc(50% + ${y}px - 22px)`,
                    left: `calc(50% + ${x}px - 22px)`,
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    fontFamily: 'monospace',
                  }}
                >
                  {label}
                </motion.div>
              );
            })}

            {/* Orbit ring */}
            <div
              className="absolute"
              style={{
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '220px', height: '220px',
                borderRadius: '50%',
                border: '1px dashed rgba(100,255,218,0.1)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
