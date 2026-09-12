import React from "react";
import { Link } from "react-router-dom";

const ExploreGrid = () => {
  const categories = [
    {
      id: "blogs",
      title: "Blogs",
      desc: "In-depth essays on web development, React, and architecture.",
      tag: "Long-form",
      count: 12,
      path: "/blog",
    },
    {
      id: "projects",
      title: "Projects",
      desc: "Open-source tools, websites, and fun UI experiments.",
      tag: "Open Source",
      count: 8,
      path: "/projects",
    },
    {
      id: "experience",
      title: "Experience",
      desc: "My professional journey and the places I've worked.",
      tag: "Career",
      count: 3,
      path: "/#experience",
    },
  ];

  return (
    <div className="container my-12">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold is-family-secondary is-italic">
          Explore Work & Writings
        </h2>
        <p className="text-text-muted mt-1">
          Everything I build, write, and share.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.path}
            className="box flex flex-col h-full hover:-translate-y-1 hover:border-accent group transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[0.7rem] uppercase tracking-wider font-bold text-text-primary opacity-70 bg-black/5 dark:bg-white/10 px-2 py-1 rounded">
                {cat.tag}
              </span>
              <span className="text-sm font-bold text-accent is-family-monospace">
                {cat.count}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
              {cat.title}
            </h3>
            
            <p className="text-sm text-text-muted flex-grow mb-4 leading-relaxed">
              {cat.desc}
            </p>
            
            <div className="flex justify-between items-center pt-2 border-t border-dashed border-border-light text-text-primary font-semibold text-sm group-hover:text-accent transition-colors">
              <span>View {cat.title.toLowerCase()}</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ExploreGrid;
