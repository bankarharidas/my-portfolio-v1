import React from "react";
import { experience, education } from "../data/portfolioData";

const ExperienceRow = ({ exp }) => {
  return (
    <div className="py-6 border-b border-border-color hover:bg-bg-secondary transition-colors group px-4 -mx-4 rounded-md">
      <div className="flex flex-col md:flex-row md:justify-between mb-2">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
          {exp.role}
        </h3>
        <span className="text-sm text-text-muted is-family-monospace mt-1 md:mt-0">
          {exp.duration}
        </span>
      </div>
      <p className="text-base font-semibold text-text-primary mb-3">
        {exp.organization}
      </p>
      <ul className="space-y-2 text-text-muted text-base">
        {exp.points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-accent flex-shrink-0 mt-1">▹</span>
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EducationRow = ({ edu }) => {
  return (
    <div className="py-6 border-b border-border-color hover:bg-bg-secondary transition-colors group px-4 -mx-4 rounded-md flex flex-col md:flex-row md:items-start md:justify-between">
      <div className="flex-1 mb-2 md:mb-0">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
          {edu.degree}
        </h3>
        <p className="text-base text-text-primary mt-1">
          {edu.institution}
        </p>
      </div>
      <div className="text-left md:text-right flex flex-col">
        <span className="text-sm text-text-muted is-family-monospace">
          {edu.duration}
        </span>
        <span className="text-sm font-bold text-accent mt-1">
          {edu.score}
        </span>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="container py-16 md:py-24">
      {/* Experience */}
      <div className="mb-16">
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold is-family-secondary is-italic text-text-primary">
            Experience
          </h2>
          <div className="flex-1 h-px bg-border-color" />
        </div>
        
        <div className="border-t border-border-color">
          {experience.map((exp, i) => (
            <ExperienceRow key={i} exp={exp} />
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold is-family-secondary is-italic text-text-primary">
            Education
          </h2>
          <div className="flex-1 h-px bg-border-color" />
        </div>

        <div className="border-t border-border-color">
          {education.map((edu, i) => (
            <EducationRow key={i} edu={edu} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
