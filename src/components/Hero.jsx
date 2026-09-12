import React from "react";


const Hero = () => {
  return (
    <div className="container mt-28 mb-12">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-7/12 pt-4">
          <section>
            <h1 className="text-4xl md:text-5xl font-bold is-family-secondary is-italic mb-2">
              Hey, I am Haridas
            </h1>
            <h3 className="text-xl md:text-2xl has-text-primary is-family-secondary is-italic mb-6 leading-relaxed">
              engineering, web development, and design. always building.
            </h3>
            
            <div className="text-base text-text-muted space-y-4 mb-8">
              <p>
                I am a software engineer and web developer passionate about building clean, performant, and beautiful applications.
                Currently, I am working on creating modern web experiences and solving complex UI challenges.
              </p>
              <p>
                Previously, I've built various side projects, exploring modern frameworks like React, Node.js, and integrating AI into daily workflows.
              </p>
              <p>
                I keep diving deep into engineering details and share my learnings through blogs, code snippets, and social platforms, breaking down web fundamentals and architecture.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                href="mailto:bankarhari02@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-secondary border border-border-color text-text-primary text-sm font-semibold hover:border-accent hover:text-accent hover:-translate-y-0.5 shadow-sm transition-all"
              >
                Email
              </a>
              <a 
                href="https://linkedin.com/in/bankarharidas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-secondary border border-border-color text-text-primary text-sm font-semibold hover:border-accent hover:text-accent hover:-translate-y-0.5 shadow-sm transition-all"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/bankarharidas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-bg-secondary border border-border-color text-text-primary text-sm font-semibold hover:border-accent hover:text-accent hover:-translate-y-0.5 shadow-sm transition-all"
              >
                GitHub
              </a>
            </div>
          </section>
        </div>
        
        <div className="w-full md:w-5/12 flex justify-center md:justify-end">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-lg border border-border-color">
            <img 
              alt="Haridas Bankar" 
              src="https://avatars.githubusercontent.com/u/1?v=4" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400';
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
