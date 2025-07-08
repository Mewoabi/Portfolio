import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ScrollToTop from '../components/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-dark-background dark:text-dark-foreground">
      <Navigation />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-16 pb-24"
      >
        <Outlet />
      </motion.main>
      <footer className="py-8 border-t dark:border-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Mewoabi Dore. All rights reserved.
          </p>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}