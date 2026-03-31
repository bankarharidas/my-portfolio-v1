import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";
import { personalInfo } from "../data/portfolioData";
import SectionTitle from "./SectionTitle";

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.875rem 1.125rem',
    borderRadius: '0.75rem',
    border: `1.5px solid ${focused === field ? 'var(--color-accent)' : 'var(--color-border)'}`,
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === field ? '0 0 0 3px rgba(100,255,218,0.1)' : 'none',
  });

  const contactLinks = [
    {
      icon: <FaEnvelope size={20} />,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "#64ffda",
    },
    {
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
      value: "bankarharidas",
      href: personalInfo.linkedin,
      color: "#0ea5e9",
    },
    {
      icon: <FaGithub size={20} />,
      label: "GitHub",
      value: "bankarharidas",
      href: personalInfo.github,
      color: "#e94560",
    },
  ];

  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--color-border)' }} />

      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(100, 255, 218, 0.04)' }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionTitle
          number="05"
          title="Get In Touch"
          subtitle="What's next? Let's connect!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="text-2xl font-black font-display mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Let's work together
            </h3>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'var(--color-text-muted)' }}
            >
              I'm currently looking for new opportunities and my inbox is always open.
              Whether you have a question, a project idea, or just want to say hi —
              I'll try my best to get back to you!
            </p>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: 'var(--color-text-muted)' }}
            >
              I'm especially interested in{" "}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>full-stack roles</span>
              ,{" "}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>product internships</span>
              , and exciting{" "}
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>open source collaborations</span>.
            </p>

            {/* Contact Links */}
            <div className="space-y-4">
              {contactLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 p-4 rounded-xl group"
                  style={{
                    background: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = link.color;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${link.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${link.color}15`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs font-mono mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {link.label}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {link.value}
                    </p>
                  </div>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: link.color }}>
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form
              className="rounded-2xl p-8"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}`;
              }}
            >
              <h4
                className="text-lg font-bold mb-6 flex items-center gap-2"
                style={{ color: 'var(--color-text)' }}
              >
                <span style={{ color: 'var(--color-accent)' }}>📬</span>
                Send a Message
              </h4>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    style={inputStyle('name')}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    style={inputStyle('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    required
                    rows={5}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold font-mono"
                  style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-bg)',
                    boxShadow: '0 8px 24px rgba(100, 255, 218, 0.25)',
                  }}
                >
                  <FaPaperPlane size={14} />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
