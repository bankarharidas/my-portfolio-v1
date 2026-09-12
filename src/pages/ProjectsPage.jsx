import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[80px]">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
