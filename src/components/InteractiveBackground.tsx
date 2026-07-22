import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';

const darkBackgrounds = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop', // Dark abstract tech
  'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2940&auto=format&fit=crop', // Circuit board / dark blue
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop', // Earth from space / network
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2940&auto=format&fit=crop', // Matrix / digital code
];

const lightBackgrounds = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop', // Light abstract waves
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=2929&auto=format&fit=crop', // Soft light gradient
  'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2874&auto=format&fit=crop', // Light rain on glass
  'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2874&auto=format&fit=crop', // Light abstract art
];

export const InteractiveBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { config } = useSite();
  const [currentBg, setCurrentBg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const backgrounds = config.theme === 'dark' ? darkBackgrounds : lightBackgrounds;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use a spring to make the scroll transition smooth
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isMobile) return;
    return smoothProgress.on("change", (latest) => {
      // Divide the page into chunks based on the number of backgrounds
      const index = Math.min(
        Math.floor(latest * backgrounds.length),
        backgrounds.length - 1
      );
      if (index !== currentBg) {
        setCurrentBg(index);
      }
    });
  }, [smoothProgress, currentBg, isMobile, backgrounds.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Base background color */}
      <div 
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: 'var(--surface-primary)' }}
      />

      {!isMobile && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: config.theme === 'dark' ? 0.2 : 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img 
              src={backgrounds[currentBg]} 
              alt="Background" 
              className={`w-full h-full object-cover ${config.theme === 'light' ? 'mix-blend-multiply' : ''}`}
              loading="lazy"
            />
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Gradient overlay for better text readability */}
      <div className={`absolute inset-0 bg-gradient-to-b from-[var(--surface-primary)] via-transparent to-[var(--surface-primary)] ${config.theme === 'dark' ? 'opacity-80' : 'opacity-90'}`} />
    </div>
  );
};
