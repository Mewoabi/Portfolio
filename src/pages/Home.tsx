import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Animate, AnimateList, AnimateListItem } from '../components/ui/Animate';
import { GlassyBlob } from '../components/ui/GlassyBackground';
import AnimatedPatternBackground from '../components/backgrounds/AnimatedPatternBackground';
import SEO from '../components/SEO';
import profileImage from '../assets/profile_backgroundless.png';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/mewoabi',
    icon: Github
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mewoabi-dore-5248b1278/',
    icon: Linkedin
  },
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/mewoabi_dore',
  //   icon: Twitter
  // }
];

const highlights = [
  { number: '5+', label: 'Years Experience' },
  { number: '20+', label: 'Projects Completed' },
  { number: '15+', label: 'Happy Clients' }
];

const letterAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const textAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function Home() {
  const headingText = "Mewoabi Nguefack Dore";
  
  // Function to handle smooth scrolling to a section
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Add offset to account for fixed header
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEO
        title="Home"
        description="Full Stack Developer and UI/UX Designer specializing in creating exceptional digital experiences with modern web technologies."
        keywords="full stack development, UI/UX design, web development, React, TypeScript, portfolio, mewoabi dore"  
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Animated Pattern Background */}
          <AnimatedPatternBackground 
            nodeCount={60}
            maxDistance={120}
            speed={0.3}
            className="opacity-40"
          />

          {/* Glassy blob decorations */}
          <GlassyBlob 
            variant="primary" 
            size="large" 
            position="top-right" 
            className="animate-gradient opacity-30"
          />
          <GlassyBlob 
            variant="secondary" 
            size="medium" 
            position="bottom-left"
            className="animate-pulse duration-[15s] opacity-30"
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
              {/* Text Content - First on mobile, but left side on desktop */}
              <div className="order-2 md:order-1 w-full md:w-3/5 text-center md:text-left md:mt-5">
                <Animate animation="slideUp">
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold mb-6 overflow-hidden leading-tight md:leading-tight py-2"
                    variants={textAnimation}
                    initial="hidden"
                    animate="visible"
                  >
                    {headingText.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        variants={letterAnimation}
                        className="inline-block"
                      >
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </motion.h1>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                    I create exceptional digital experiences that combine powerful functionality
                    with stunning design
                  </p>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4">
                    <Button 
                      size="lg"
                      onClick={() => scrollToSection('contact')}
                      className="backdrop-blur-sm bg-primary-500/90 hover:bg-primary-600/90"
                    >
                      Get in touch <ArrowRight className="ml-2" size={20} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => scrollToSection('projects')}
                      className="backdrop-blur-sm bg-white/10 border-primary-400/50 hover:bg-white/20"
                    >
                      View my work
                    </Button>
                  </div>
                </Animate>

                {/* Social Links */}
                <AnimateList className="flex mt-12 justify-center md:justify-start items-center gap-6">
                  {socialLinks.map((social) => (
                    <AnimateListItem key={social.name}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                        aria-label={social.name}
                      >
                        <social.icon size={24} />
                      </a>
                    </AnimateListItem>
                  ))}
                </AnimateList>
              </div>

              {/* Profile Image with Animation - Second on mobile, but right side on desktop */}
              <Animate animation="slideInRight" className="order-1 md:order-2 w-full md:w-2/5 md:self-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative"
                >
                  <div className="relative z-10 mx-auto w-64 md:w-full max-w-sm">
                    <img 
                      src={profileImage} 
                      alt="Mewoabi Dore" 
                      className="w-full h-auto object-contain"
                    />
                    
                    {/* Subtle glow effect behind the image */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-primary-400/10 to-transparent rounded-full blur-xl -z-10"></div>
                  </div>
                </motion.div>
              </Animate>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <Animate animation="slideUp" delay={1}>
              <div className="w-6 h-10 border-2 border-gray-400 rounded-full p-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce mx-auto" />
              </div>
            </Animate>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 bg-gray-200/70 dark:bg-gray-900/70 backdrop-blur-sm relative overflow-hidden">
          {/* Glassy blob decorations */}
          <GlassyBlob 
            variant="info" 
            size="medium" 
            position="top-left" 
          />

          <div className="container mx-auto px-4 relative z-10">
            <AnimateList className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {highlights.map((highlight) => (
                <AnimateListItem key={highlight.label}>
                  <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 rounded-lg p-6 shadow-lg">
                    <div className="text-center">
                      <motion.h2 
                        className="text-4xl font-bold text-primary-500 mb-2"
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        {highlight.number}
                      </motion.h2>
                      <p className="text-gray-600 dark:text-gray-400">{highlight.label}</p>
                    </div>
                  </div>
                </AnimateListItem>
              ))}
            </AnimateList>
          </div>
        </section>
      </div>
    </>
  );
}
