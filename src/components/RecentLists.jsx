import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../lib/blogService";

const RecentLists = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs()
      .then(blogs => {
        // Get the 4 most recent blogs
        setRecentBlogs(blogs.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  const recentProjects = [
    { date: "AI/ML", title: "HAR.ai - Human Activity Recognition", link: "https://github.com/bankarharidas" },
    { date: "Web", title: "Apna College Web Dev", link: "https://github.com/bankarharidas/apna-college-web-dev" },
    { date: "AI/ML", title: "Handwritten Digit Recognition AI", link: "https://github.com/bankarharidas/Handwritten-Digit-Recognition-AI" },
    { date: "Tool", title: "YT Download", link: "https://github.com/bankarharidas/Yt-dowload" },
  ];

  return (
    <section className="container py-16 md:py-24 border-t border-border-color">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Recent Blogs */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold is-family-secondary is-italic text-text-primary whitespace-nowrap">
              Recent Blogs
            </h2>
            <div className="flex-1 h-px bg-border-color" />
            <Link to="/blog" className="text-sm font-normal hover:text-accent transition-colors whitespace-nowrap">
              Full archive ➔
            </Link>
          </div>
          <p className="text-text-muted mb-6 text-sm">Long-form essays I have written recently.</p>
          
          <ul className="space-y-4">
            {loading ? (
              <li className="text-text-muted">Loading posts...</li>
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((post) => (
                <li key={post.id} className="flex items-baseline overflow-hidden w-full">
                  <span className="hidden sm:inline text-text-muted is-family-monospace mr-4 flex-shrink-0 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="flex-1 min-w-0 overflow-hidden text-ellipsis hover:text-accent transition-colors font-medium text-lg leading-snug"
                    title={post.title}
                  >
                    {post.title}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-text-muted italic">No posts published yet.</li>
            )}
          </ul>
        </div>

        {/* Recent Projects */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold is-family-secondary is-italic text-text-primary whitespace-nowrap">
              Recent Projects
            </h2>
            <div className="flex-1 h-px bg-border-color" />
            <Link to="/projects" className="text-sm font-normal hover:text-accent transition-colors whitespace-nowrap">
              All projects ➔
            </Link>
          </div>
          <p className="text-text-muted mb-6 text-sm">Side projects I have built and maintain in the open.</p>
          
          <ul className="space-y-4">
            {recentProjects.map((project, i) => (
              <li key={i} className="flex items-baseline overflow-hidden w-full">
                <span className="text-text-muted is-family-monospace mr-4 flex-shrink-0 w-16 text-left text-sm">
                  {project.date}
                </span>
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-0 overflow-hidden text-ellipsis hover:text-accent transition-colors font-medium text-lg leading-snug"
                  title={project.title}
                >
                  {project.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default RecentLists;
