import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

interface AnimateProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
  className?: string;
}

const animations: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }
};

export function Animate({ 
  children, 
  animation = 'fadeIn', 
  delay = 0, 
  duration = 0.5,
  className 
}: AnimateProps) {
  return (
    <motion.div
      variants={animations[animation]}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimateList({ 
  children, 
  staggerDelay = 0.1,
  className 
}: { 
  children: ReactNode; 
  staggerDelay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className={className}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimateListItem({ 
  children,
  className 
}: { 
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}