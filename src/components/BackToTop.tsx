import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { config } = useSite();
  const isEn = config.language === 'en';
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~400px (past hero)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-6 z-[80] group"
        >
          <button
            onClick={scrollToTop}
            aria-label={isEn ? 'Back to Top' : 'العودة للأعلى'}
            title={isEn ? 'Back to Top' : 'العودة للأعلى'}
            className="w-12 h-12 rounded-full bg-[var(--surface-primary)]/90 hover:bg-[var(--surface-primary)] text-[var(--text-primary)] hover:text-[var(--color-primary)] border border-[var(--border-default)] hover:border-[var(--interactive-border)] shadow-lg hover:shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
