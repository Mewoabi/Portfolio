import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';
import { Animate } from './ui/Animate';

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  // { href: '/blog', label: 'Blog' }, // Blog is moved to the last position
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Create ref to track manual navigation
  const lastClickedSection = useRef<string | null>(null);
  const clickTimeoutRef = useRef<number | null>(null);

  // Check if currently on home page
  const isHomePage = location.pathname === '/';
  
  // Scroll offset to ensure headings are visible (height of navbar + extra padding)
  const scrollOffset = 80; // Adjust this value based on your navbar height and desired padding

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      
      // Only check active section on home page
      if (isHomePage) {
        // If we recently clicked a section link, prioritize that selection
        if (lastClickedSection.current) {
          return;
        }
        
        // Special case for contact section - check if we're close to bottom of page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
          setActiveSection('contact');
          return;
        }
        
        // For other sections, find which one is most prominently in view
        const sections = ['home', 'about', 'projects', 'contact'];
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const element = document.getElementById(section);
          
          if (element) {
            const rect = element.getBoundingClientRect();
            // If this section is visible in the top portion of the screen
            if (rect.top <= scrollOffset + 50) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clear any lingering timeout
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [isHomePage, scrollOffset]);

  // Apply scroll padding to the document
  useEffect(() => {
    // Add scroll padding to ensure headings are visible under fixed header
    document.documentElement.style.scrollPaddingTop = `${scrollOffset}px`;
    
    return () => {
      // Clean up when component unmounts
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, [scrollOffset]);

  // Handle direct scrolling to a section
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Get element position with offset
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - scrollOffset;
      
      // Smooth scroll to the target section with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Immediately set active section and remember it was clicked
      setActiveSection(sectionId);
      lastClickedSection.current = sectionId;
      
      // Clear the clicked section reference after scrolling completes
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
      }
      
      clickTimeoutRef.current = window.setTimeout(() => {
        lastClickedSection.current = null;
      }, 1000); // Keep click priority for 1 second
    }
  };

  // Smooth scroll function with navigation handling
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If it's a section link
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      
      // If already on home page, just scroll to section
      if (isHomePage) {
        // Close mobile menu if open
        const wasMenuOpen = isMenuOpen;
        setIsMenuOpen(false);
        
        // Add a small delay for mobile menu to close before scrolling
        if (wasMenuOpen) {
          setTimeout(() => {
            scrollToSection(targetId);
          }, 300); // Wait for menu animation to complete
        } else {
          scrollToSection(targetId);
        }
      } else {
        // Navigate to home page with section hash
        navigate('/', { state: { scrollToId: targetId } });
      }
    } else {
      // For regular page navigation (like blog)
      navigate(href);
    }
  };

  // Determine if a nav item is active
  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      return isHomePage && sectionId === activeSection;
    }
    return location.pathname === href;
  };

  // Effect to handle scrolling to section after navigation
  useEffect(() => {
    if (isHomePage && location.state && location.state.scrollToId) {
      // Use a small timeout to ensure the page has rendered
      setTimeout(() => {
        scrollToSection(location.state.scrollToId);
      }, 100);
      
      // Clear the state to avoid scrolling on refresh
      window.history.replaceState(null, '');
    }
  }, [isHomePage, location.state]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm'
          : 'bg-white/0 dark:bg-gray-900/0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Animate animation="slideInLeft">
            <a 
              href="#home" 
              onClick={(e) => handleNavigation(e, '#home')}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              MD
            </a>
          </Animate>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Animate animation="fadeIn" className="flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href)}
                  className={`transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun size={20} className="transition-transform hover:rotate-12" />
                ) : (
                  <Moon size={20} className="transition-transform hover:-rotate-12" />
                )}
              </Button>
            </Animate>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={20} className="transition-transform hover:rotate-12" />
              ) : (
                <Moon size={20} className="transition-transform hover:-rotate-12" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavigation(e, item.href)}
                    className={`text-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 dark:text-primary-400 font-medium'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}