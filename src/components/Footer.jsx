import React from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";

const NAV = ["About", "Skills", "Projects", "Experience", "Contact"];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Row 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* Logo */}
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 400,
              color: "var(--color-text)",
              letterSpacing: "0.05em",
            }}
          >
            HB
            <span style={{ color: "var(--color-accent)" }}>.</span>
          </span>

          {/* Nav links */}
          <nav style={{ display: "flex", gap: "1.75rem", flexWrap: "wrap" }}>
            {NAV.map((item) => (
              <Link
                key={item}
                to={item.toLowerCase()}
                smooth
                duration={600}
                offset={-80}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                  transition: "color 0.15s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              style={{ color: "var(--color-text-muted)", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <FaGithub size={16} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              style={{ color: "var(--color-text-muted)", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              style={{ color: "var(--color-text-muted)", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              <FaEnvelope size={15} />
            </a>
          </div>
        </div>

        {/* Row 2: copyright */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "1rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "var(--color-text-muted)",
              opacity: 0.6,
              margin: 0,
            }}
          >
            Designed &amp; Built by Haridas Bankar — React · Vite · Framer Motion · © {year}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
