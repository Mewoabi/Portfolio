import { lazy } from 'react';
// import { Helmet } from 'react-helmet';
import SEO from '../components/SEO';
import { SectionDivider } from '../components/ui/SectionDivider';

// Import all page components
const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));

export default function HomePage() {
  return (
    <>
      <SEO
        title="Mewoabi Dore - Portfolio"
        description="Full Stack Developer and UI/UX Designer specializing in creating exceptional digital experiences with modern web technologies."
        keywords="full stack development, UI/UX design, web development, React, TypeScript, portfolio"
      />
      
      {/* Home Section */}
      <section id="home">
        <Home />
      </section>

      {/* Divider between Home and About */}
      <SectionDivider variant="gradient" />

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Divider between About and Projects */}
      <SectionDivider variant="dots" />

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Divider between Projects and Contact */}
      <SectionDivider variant="gradient" />

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}