import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";

const contactMethods = [
  {
    label: "Email",
    value: "bankarhari02@gmail.com",
    href: `mailto:bankarhari02@gmail.com`,
    icon: <FaEnvelope size={16} />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/bankarharidas",
    href: "https://linkedin.com/in/bankarharidas",
    icon: <FaLinkedin size={16} />,
  },
  {
    label: "GitHub",
    value: "github.com/bankarharidas",
    href: "https://github.com/bankarharidas",
    icon: <FaGithub size={16} />,
  },
];

const UnderlineField = ({ label, name, type = "text", value, onChange, isTextarea }) => {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "var(--color-accent)" : "var(--color-border)"}`,
    outline: "none",
    color: "var(--color-text)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.92rem",
    padding: "0.6rem 0",
    transition: "border-color 0.2s",
    borderRadius: 0,
    resize: isTextarea ? "vertical" : undefined,
    minHeight: isTextarea ? "100px" : undefined,
  };

  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: focused ? "var(--color-accent)" : "var(--color-text-muted)",
          display: "block",
          marginBottom: "0.4rem",
          transition: "color 0.2s",
        }}
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={4}
          style={baseStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          style={baseStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact from " + form.name)}&body=${encodeURIComponent(form.message)}`;
  };

  return (
    <section
      id="contact"
      style={{ background: "var(--color-bg-secondary)", padding: "6rem 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: "3.5rem" }}
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
            007
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
            Let's Talk
          </h2>
          <div style={{ width: "120px", height: "4px", background: "var(--color-accent)" }} />
        </motion.div>

        {/* ── Two column layout ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="contact-grid-responsive"
        >
          {/* LEFT: editorial copy + contact rows */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.35rem",
                fontWeight: 500,
                color: "var(--color-text)",
                lineHeight: 1.5,
                marginBottom: "3rem",
              }}
            >
              Got a project? A collaboration? Or just want to say hi?{" "}
              <span style={{ color: "var(--color-accent)" }}>Let's make something great.</span>
            </p>

            {/* Contact method rows */}
            <div style={{ borderTop: "1px solid var(--color-border)" }}>
              {contactMethods.map((method, i) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 0",
                    borderBottom: "1px solid var(--color-border)",
                    textDecoration: "none",
                    transition: "background 0.15s",
                    gap: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--color-card)";
                    e.currentTarget.querySelector(".arrow-icon").style.color = "var(--color-accent)";
                    e.currentTarget.querySelector(".arrow-icon").style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.querySelector(".arrow-icon").style.color = "var(--color-text-muted)";
                    e.currentTarget.querySelector(".arrow-icon").style.transform = "translateX(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        minWidth: "70px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      {method.icon} {method.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "var(--color-text)",
                      }}
                    >
                      {method.value}
                    </span>
                  </div>
                  <span
                    className="arrow-icon"
                    style={{
                      color: "var(--color-text-muted)",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "1rem",
                      transition: "color 0.15s, transform 0.15s",
                    }}
                  >
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                padding: "2.5rem",
                borderRadius: 0,
              }}
            >
              <h4
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "var(--color-text)",
                  letterSpacing: "0.05em",
                  margin: "0 0 1.75rem",
                }}
              >
                Send a Message
              </h4>

              <UnderlineField
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <UnderlineField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              <UnderlineField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
              <UnderlineField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                isTextarea
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "var(--color-accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 0,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "opacity 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Send Message →
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
