import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaCode, FaHeart } from "react-icons/fa";
import { personalInfo, education } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

const About = () => {
  const highlights = [
    { icon: <FaCode />, label: "Full Stack Developer", color: "#64ffda" },
    { icon: <FaGraduationCap />, label: "B.E. Computer Science", color: "#7c3aed" },
    { icon: <FaMapMarkerAlt />, label: "Pune, India", color: "#e94560" },
    { icon: <FaHeart />, label: "Open to Opportunities", color: "#f59e0b" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      {/* Decorative element */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--color-border)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'var(--color-border)' }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionTitle number="01" title="About Me" subtitle="Get to know the person behind the code" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text + Highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Hello! I'm{" "}
              <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>Haridas Bankar</span>
              {" "}— a driven{" "}
              <span className="font-semibold" style={{ color: 'var(--color-text)' }}>Full Stack Developer</span>{" "}
              with a strong foundation in computer science and a knack for crafting efficient, user-centric applications.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--color-text-muted)' }}
            >
              My journey into tech is fueled by a desire to learn, innovate, and contribute to projects that make a real difference. I've won hackathons, interned at top companies, and built projects spanning blockchain, IoT, AI, and full-stack web.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed mb-10"
              style={{ color: 'var(--color-text-muted)' }}
            >
              I'm particularly excited about creating seamless digital experiences that sit at the intersection of{" "}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>design</span>
              ,{" "}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>engineering</span>
              , and{" "}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>innovation</span>.
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 4 }}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{
                    background: 'var(--color-card)',
                    border: `1px solid ${item.color}22`,
                    boxShadow: `0 4px 20px ${item.color}10`,
                  }}
                >
                  <span style={{ color: item.color, fontSize: '1.1rem' }}>{item.icon}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Education & Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Avatar Placeholder with animated rings */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                {/* Outer rotating ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px dashed rgba(100, 255, 218, 0.3)`,
                    transform: 'scale(1.2)',
                  }}
                />
                {/* Inner pulsing ring */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: `2px solid rgba(100, 255, 218, 0.15)`,
                    transform: 'scale(1.1)',
                  }}
                />
                {/* Avatar circle */}
                <div
                  className="w-44 h-44 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100,255,218,0.15) 0%, rgba(124,58,237,0.15) 100%)',
                    border: '2px solid rgba(100, 255, 218, 0.3)',
                    boxShadow: '0 0 40px rgba(100, 255, 218, 0.15)',
                  }}
                >
                  <span className="text-6xl font-black text-gradient font-display">HB</span>
                </div>

                {/* Orbit dot */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute"
                  style={{
                    top: '50%', left: '50%',
                    transformOrigin: '0 0',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: 'var(--color-accent)',
                      boxShadow: '0 0 12px var(--color-accent)',
                      transform: 'translate(80px, -80px)',
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3
                className="text-lg font-bold font-mono mb-6 flex items-center gap-2"
                style={{ color: 'var(--color-text)' }}
              >
                <FaGraduationCap style={{ color: 'var(--color-accent)' }} />
                Education History
              </h3>

              <div className="space-y-4 relative">
                {/* Timeline line */}
                <div
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ background: 'var(--color-border)' }}
                />

                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ x: 4 }}
                    className="ml-10 p-5 rounded-xl relative"
                    style={{
                      background: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-[2.3rem] top-5 w-3 h-3 rounded-full border-2"
                      style={{
                        background: i === 0 ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-accent)',
                        boxShadow: i === 0 ? '0 0 8px var(--color-accent)' : 'none',
                      }}
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1">
                      <h4
                        className="text-sm font-bold"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {edu.institution}
                      </h4>
                      <span
                        className="text-xs font-mono"
                        style={{ color: 'var(--color-accent)', whiteSpace: 'nowrap' }}
                      >
                        {edu.score}
                      </span>
                    </div>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-accent)', opacity: 0.8 }}>
                      {edu.degree}
                    </p>
                    <p className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>
                      {edu.duration}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
