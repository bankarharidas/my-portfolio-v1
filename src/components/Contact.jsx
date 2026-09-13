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
  
  const baseClass = `w-full bg-transparent border-none border-b focus:outline-none text-text-primary text-base py-2 transition-colors rounded-none ${
    focused ? "border-accent" : "border-border-color"
  }`;

  return (
    <div className="mb-6">
      <label
        className={`block text-xs font-bold tracking-widest uppercase mb-2 transition-colors is-family-monospace ${
          focused ? "text-accent" : "text-text-muted"
        }`}
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
          className={`${baseClass} resize-y min-h-[100px]`}
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
          className={baseClass}
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
    <section id="contact" className="w-full px-6 md:px-12 lg:px-24 py-4 md:py-8">
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold is-family-secondary is-italic text-text-primary">
          Contact
        </h2>
        <div className="flex-1 h-px bg-border-color" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* LEFT: editorial copy + contact rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-text-primary mb-8 font-medium">
            Got a project? A collaboration? Or just want to say hi?{" "}
            <span className="text-accent">Let's make something great.</span>
          </p>

          <div className="border-t border-border-color">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("mailto") ? "_self" : "_blank"}
                rel="noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between py-4 border-b border-border-color hover:bg-bg-secondary transition-colors group px-4 -mx-4 rounded-md"
              >
                <div className="flex items-center gap-4">
                  <span className="text-text-muted flex items-center gap-2">
                    {method.icon}
                  </span>
                  <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {method.label}
                  </span>
                </div>
                <span className="text-text-muted group-hover:text-accent transition-colors transform group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-bg-secondary p-8 rounded-md border border-border-color"
          >
            <h3 className="text-2xl font-bold is-family-secondary is-italic text-text-primary mb-6">
              Send a Message
            </h3>

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
              className="w-full bg-accent text-white font-bold tracking-wider uppercase text-sm py-4 mt-4 transition-opacity hover:opacity-90 flex items-center justify-center gap-2 rounded-none"
            >
              Send Message →
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
