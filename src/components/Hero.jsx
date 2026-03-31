import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaChevronDown, FaDownload } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-scroll";

// Typing effect component
const Typewriter = ({ texts, speed = 100, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;

    if (subIndex === texts[index].length + 1 && !reverse) {
      setIsPausing(true);
      setTimeout(() => {
        setReverse(true);
        setIsPausing(false);
      }, pause);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setDisplayedText(texts[index].substring(0, subIndex));
    }, reverse ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, speed, pause, isPausing]);

  return (
    <span style={{ color: 'var(--color-accent)' }}>
      {displayedText}
      <span className="cursor-blink" style={{ color: 'var(--color-accent)' }}>|</span>
    </span>
  );
};

// Animated counter
const Counter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) { setStarted(true); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
};

const Hero = () => {
  const { isDark } = useTheme();

  const stats = [
    { label: "Projects Built", value: 10, suffix: "+" },
    { label: "Hackathons", value: 15, suffix: "+" },
    { label: "SIH Winner", value: 1, suffix: "st" },
    { label: "Internships", value: 2, suffix: "" },
  ];

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)', paddingTop: '80px' }}
    >
      {/* Animated Gradient Blobs */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full blur-[120px]"
        style={{ background: isDark ? 'rgba(100, 255, 218, 0.08)' : 'rgba(14, 165, 233, 0.12)' }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.4, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-[30rem] h-[30rem] rounded-full blur-[140px]"
        style={{ background: isDark ? 'rgba(233, 69, 96, 0.08)' : 'rgba(233, 69, 96, 0.07)' }}
      />
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 80, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px]"
        style={{ background: isDark ? 'rgba(124, 58, 237, 0.06)' : 'rgba(124, 58, 237, 0.05)' }}
      />

      {/* Grid bg */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px flex-1 max-w-[60px]" style={{ background: 'var(--color-accent)' }} />
            <span
              className="text-sm font-mono tracking-[0.3em] uppercase font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              Portfolio 2025
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl font-mono mb-3"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Hi there, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl font-black mb-4 leading-none"
            style={{ color: 'var(--color-text)' }}
          >
            Haridas{" "}
            <span className="text-gradient">Bankar</span>
            <span style={{ color: 'var(--color-accent)' }}>.</span>
          </motion.h1>

          {/* Dynamic Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 h-16 sm:h-20"
          >
            <span style={{ color: 'var(--color-text-muted)' }}>I </span>
            <Typewriter
              texts={[
                "build digital experiences.",
                "craft full-stack apps.",
                "solve real-world problems.",
                "love clean code.",
                "innovate with tech.",
              ]}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl text-base sm:text-lg mb-10 leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Link to="projects" smooth={true} duration={600} offset={-100}>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
            <motion.a
              href={personalInfo.resumeLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="btn-outline flex items-center gap-2"
            >
              <FaDownload size={14} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 mb-16"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-mono"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 5 }} className="group-hover:text-white transition-colors">
                <FaGithub size={24} />
              </motion.div>
              <span className="hidden sm:block group-hover:underline" style={{ color: 'var(--color-text-muted)' }}>GitHub</span>
            </a>
            <div className="h-px w-8" style={{ background: 'var(--color-border)' }} />
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-sm font-mono"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: -5 }} style={{ color: 'var(--color-text-muted)' }}>
                <FaLinkedin size={24} />
              </motion.div>
              <span className="hidden sm:block group-hover:underline" style={{ color: 'var(--color-text-muted)' }}>LinkedIn</span>
            </a>
            <div className="h-px w-8" style={{ background: 'var(--color-border)' }} />
            <a
              href={`mailto:${personalInfo.email}`}
              className="group flex items-center gap-2 text-sm font-mono"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>📧</motion.div>
              <span className="hidden sm:block" style={{ color: 'var(--color-accent)', fontSize: '0.85rem' }}>
                {personalInfo.email}
              </span>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="glass rounded-xl p-5 text-center"
                style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)' }}
              >
                <div
                  className="text-3xl font-black font-mono mb-1"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} duration={2} />
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Down */}
      <Link to="about" smooth={true} duration={600} offset={-100}>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center gap-1"
          style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}
          whileHover={{ opacity: 0.8 }}
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <FaChevronDown size={16} />
        </motion.div>
      </Link>
    </section>
  );
};

export default Hero;
