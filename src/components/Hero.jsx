import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-scroll";

// ─── Typewriter ──────────────────────────────────────────────────────────────
// Reused from original; plugged into new brutalist role line
const Typewriter = ({ texts, speed = 90, pause = 2200 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (isPausing) return;
    if (subIndex === texts[index].length + 1 && !reverse) {
      setIsPausing(true);
      setTimeout(() => { setReverse(true); setIsPausing(false); }, pause);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const t = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setDisplayedText(texts[index].substring(0, subIndex));
    }, reverse ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [subIndex, index, reverse, texts, speed, pause, isPausing]);

  return (
    <>
      {displayedText}
      <span className="hero-brut-role-cursor">|</span>
    </>
  );
};

// ─── Animated counter ────────────────────────────────────────────────────────
const Counter = ({ target, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let s = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      s += step;
      if (s >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(s));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ─── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { isDark } = useTheme();

  const stats = [
    { label: "Projects Built", value: 10, suffix: "+" },
    { label: "Hackathons", value: 15, suffix: "+" },
    { label: "SIH Winner", value: 1, suffix: "st" },
    { label: "Internships", value: 2, suffix: "" },
  ];

  // Staggered entrance — one strong sequence, nothing decorative after
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };
  const ruleAnim = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 } },
  };

  return (
    <section id="hero" className="hero-brut">

      {/* ── Left Rail ─────────────────────────────────────────── */}
      <aside className="hero-brut-rail" aria-hidden="true">
        <span className="hero-brut-rail-index">HB — 2025</span>
        <div className="hero-brut-rail-line" />
        <div className="hero-brut-rail-socials">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href={`mailto:${personalInfo.email}`} aria-label="Email">
            <FaEnvelope size={16} />
          </a>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────── */}
      <motion.div
        className="hero-brut-main"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Overline */}
        <motion.div className="hero-brut-overline" variants={item}>
          <div className="hero-brut-overline-rule" />
          <span className="hero-brut-overline-text">Portfolio 2025</span>
          <span className="hero-brut-overline-number">001</span>
        </motion.div>

        {/* Greeting */}
        <motion.p className="hero-brut-greeting" variants={item}>
          Hi there, I'm
        </motion.p>

        {/* NAME — the editorial anchor */}
        <motion.h1 className="hero-brut-name" variants={item}>
          Haridas
          <span className="hero-brut-name-accent">Bankar</span>
        </motion.h1>

        {/* Thick rule — THE brutalist signature */}
        <motion.div className="hero-brut-rule" variants={ruleAnim} />

        {/* Role / Typewriter */}
        <motion.div className="hero-brut-role" variants={item}>
          I&nbsp;
          <Typewriter
            texts={[
              "Build Digital Experiences.",
              "Craft Full-Stack Apps.",
              "Solve Real-World Problems.",
              "Love Clean Code.",
              "Innovate with Tech.",
            ]}
          />
        </motion.div>

        {/* Bio */}
        <motion.p className="hero-brut-bio" variants={item}>
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons — square, no rounded corners */}
        <motion.div className="hero-brut-ctas" variants={item}>
          <Link to="projects" smooth duration={600} offset={-100}>
            <button className="hero-brut-btn-primary">
              View My Work <span aria-hidden="true">→</span>
            </button>
          </Link>
          <a
            href={personalInfo.resumeLink}
            target="_blank"
            rel="noreferrer"
            className="hero-brut-btn-ghost"
          >
            <FaDownload size={13} /> Resume
          </a>
        </motion.div>
      </motion.div>

      {/* ── Stats Strip ───────────────────────────────────────── */}
      <motion.div
        className="hero-brut-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="hero-brut-stat">
            <div className="hero-brut-stat-value">
              <Counter target={stat.value} suffix={stat.suffix} duration={2} />
            </div>
            <div className="hero-brut-stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────── */}
      <Link to="about" smooth duration={600} offset={-100}>
        <div className="hero-brut-scroll" role="button" aria-label="Scroll to About">
          <span className="hero-brut-scroll-word">SCROLL</span>
          <span className="hero-brut-scroll-line" />
        </div>
      </Link>
    </section>
  );
};

export default Hero;
