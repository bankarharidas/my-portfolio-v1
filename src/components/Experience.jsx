import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

const orgColors = {
  "Adobe": "#e94560",
  "ProAzure Solution pvt.ltd (Remote)": "#64ffda",
  "Computer Society of India, CU Student Branch": "#7c3aed",
};

const getColor = (org) => orgColors[org] || "#64ffda";

const Experience = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = experience[activeIdx];
  const color = getColor(active.organization);

  return (
    <section
      id="experience"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionTitle
          number="04"
          title="Experience"
          subtitle="Where I've worked and contributed"
        />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tab List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-56 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-1"
          >
            {experience.map((exp, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIdx(i)}
                whileHover={{ x: 4 }}
                className="flex-shrink-0 text-left px-5 py-4 rounded-lg text-sm font-medium transition-all duration-200 relative"
                style={{
                  background: activeIdx === i ? `${getColor(exp.organization)}15` : 'transparent',
                  color: activeIdx === i ? getColor(exp.organization) : 'var(--color-text-muted)',
                  borderLeft: activeIdx === i ? `3px solid ${getColor(exp.organization)}` : '3px solid transparent',
                  fontWeight: activeIdx === i ? 700 : 400,
                }}
              >
                <span className="text-xs font-mono block mb-0.5" style={{ opacity: 0.6 }}>
                  {exp.duration.split(" ")[0]} {exp.duration.includes("2025") ? "2025" : exp.duration.includes("2026") ? "2026" : ""}
                </span>
                <span className="truncate block">{exp.organization.split(" (")[0]}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Content Panel */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl p-8"
                style={{
                  background: 'var(--color-card)',
                  border: `1px solid ${color}30`,
                  boxShadow: `0 8px 40px ${color}10`,
                }}
              >
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
                    <div>
                      <h3
                        className="text-2xl font-black font-display"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {active.role}
                      </h3>
                      <p
                        className="text-base font-semibold mt-1"
                        style={{ color }}
                      >
                        @ {active.organization}
                      </p>
                    </div>

                    {/* Incoming badge */}
                    {active.duration === "Incoming 2026" && (
                      <motion.span
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xs font-bold font-mono px-3 py-1.5 rounded-full"
                        style={{
                          background: `${color}20`,
                          color,
                          border: `1px solid ${color}50`,
                        }}
                      >
                        🎉 Incoming
                      </motion.span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-px w-4" style={{ background: color }} />
                    <span
                      className="text-sm font-mono"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {active.duration}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <ul className="space-y-4">
                  {active.points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-1.5 flex-shrink-0" style={{ color }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                          <circle cx="4" cy="4" r="4" />
                        </svg>
                      </span>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {point}
                      </p>
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom decoration */}
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    />
                    <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
                      Experience {activeIdx + 1} of {experience.length}
                    </span>
                    <div className="flex gap-2 ml-auto">
                      <button
                        onClick={() => setActiveIdx(Math.max(0, activeIdx - 1))}
                        disabled={activeIdx === 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
                        style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                      >
                        ←
                      </button>
                      <button
                        onClick={() => setActiveIdx(Math.min(experience.length - 1, activeIdx + 1))}
                        disabled={activeIdx === experience.length - 1}
                        className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
                        style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-4 mt-12"
        >
          {[
            { label: "Companies", value: "2+", color: "#64ffda" },
            { label: "Workshops Organized", value: "5+", color: "#e94560" },
            { label: "Roles Held", value: "3", color: "#7c3aed" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-xl"
              style={{
                background: 'var(--color-card)',
                border: `1px solid ${stat.color}20`,
              }}
            >
              <div
                className="text-3xl font-black font-mono mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
