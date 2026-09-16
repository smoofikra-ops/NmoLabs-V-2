import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react';
import { NATIONAL_DAY_96_CONFIG } from '../../config/nationalDay96';
import { NationalDay96Motif } from './NationalDayElements';

/**
 * Saudi National Day 96 — Continuous Scroll-Linked Background Storytelling System
 *
 * Evolving background visual narrative behind NmoLabs content:
 * 0.00 - 0.15 : Hero Atmosphere (Heritage emerald aura + sculptural 96 orbital lines)
 * 0.15 - 0.30 : Systems Story (Technological grid, precision architecture, diamond nodes)
 * 0.30 - 0.45 : Ecommerce Story (Ascending commercial curves, emerald & gold growth paths)
 * 0.45 - 0.60 : Websites & Platforms (Cultural digital depth, layered subtle Sadu geometry)
 * 0.60 - 0.72 : Performance Marketing (Dynamic precision signal rays, growth trajectories)
 * 0.72 - 0.84 : Social Content (Expressive interaction waves, cultural resonance)
 * 0.84 - 0.92 : Project Journey (Continuous national trajectory path connecting the stages)
 * 0.92 - 1.00 : Growth Partner / Final (Harmonious celebratory convergence with "عزّنا بطبعنا")
 */
export const NationalDayBackgroundStory: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth spring progress for fluid, jitter-free transformation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    restDelta: 0.001,
  });

  // Dynamic Opacities & Transforms across scroll lifecycle
  // 1. Hero Motif
  const heroMotifOpacity = useTransform(smoothProgress, [0, 0.12, 0.2], [0.85, 0.4, 0]);
  const heroMotifScale = useTransform(
    smoothProgress,
    [0, 0.15],
    shouldReduceMotion ? [1, 1] : [1, 1.15]
  );
  const heroMotifY = useTransform(
    smoothProgress,
    [0, 0.15],
    shouldReduceMotion ? [0, 0] : [0, 60]
  );

  // 2. Systems Tech Grid (around 0.12 to 0.32)
  const systemsOpacity = useTransform(smoothProgress, [0.08, 0.16, 0.28, 0.34], [0, 0.7, 0.7, 0]);
  const systemsY = useTransform(smoothProgress, [0.1, 0.3], shouldReduceMotion ? [0, 0] : [-20, 20]);

  // 3. Ecommerce Growth Flow (around 0.28 to 0.46)
  const ecommerceOpacity = useTransform(smoothProgress, [0.26, 0.33, 0.44, 0.5], [0, 0.65, 0.65, 0]);
  const ecommerceScale = useTransform(smoothProgress, [0.28, 0.48], shouldReduceMotion ? [1, 1] : [0.95, 1.05]);

  // 4. Websites Cultural Depth (around 0.42 to 0.60)
  const websitesOpacity = useTransform(smoothProgress, [0.42, 0.49, 0.58, 0.64], [0, 0.6, 0.6, 0]);

  // 5. Performance Signals (around 0.58 to 0.74)
  const performanceOpacity = useTransform(smoothProgress, [0.56, 0.63, 0.72, 0.78], [0, 0.7, 0.7, 0]);
  const signalSweep = useTransform(smoothProgress, [0.58, 0.74], ['0%', '100%']);

  // 6. Social Vitality (around 0.70 to 0.84)
  const socialOpacity = useTransform(smoothProgress, [0.7, 0.76, 0.83, 0.88], [0, 0.65, 0.65, 0]);

  // 7. Project Journey Connected Ribbon (around 0.80 to 0.92)
  const journeyOpacity = useTransform(smoothProgress, [0.8, 0.85, 0.91, 0.94], [0, 0.7, 0.7, 0]);

  // 8. Final Culmination & Celebratory Aura (around 0.88 to 1.0)
  const finalAuraOpacity = useTransform(smoothProgress, [0.86, 0.93, 1], [0, 0.8, 1]);
  const finalMotifScale = useTransform(smoothProgress, [0.88, 1], shouldReduceMotion ? [1, 1] : [0.9, 1.02]);

  // Global ambient gradient rotation/position shift
  const ambientRotation = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 90]
  );

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-[0]"
      aria-hidden="true"
    >
      {/* 1. Global Soft Ambient National Day Gradient Field (Preserves high-contrast white breathing space) */}
      <motion.div
        style={{ rotate: ambientRotation }}
        className="absolute -inset-[30%] origin-center opacity-30 dark:opacity-40 transition-opacity duration-700"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_rgba(11,87,56,0.14),_transparent_65%)]" />
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(197,160,89,0.08),_transparent_60%)]" />
      </motion.div>

      {/* 2. Hero Stage Decorative Aura & Dimensional 96 Motif */}
      <motion.div
        style={{
          opacity: heroMotifOpacity,
          scale: heroMotifScale,
          y: heroMotifY,
        }}
        className="absolute top-[8%] sm:top-[12%] right-[5%] sm:right-[10%] lg:right-[15%] w-48 sm:w-72 lg:w-96 aspect-square opacity-70 flex items-center justify-center pointer-events-none"
      >
        <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/15 rounded-full blur-3xl scale-95" />
        <NationalDay96Motif size={isMobile ? 130 : 220} glow={!isMobile} />
      </motion.div>

      {/* 3. Systems Story: Precision Architectural Tech Grid */}
      <motion.div
        style={{ opacity: systemsOpacity, y: systemsY }}
        className="absolute inset-x-0 top-[20%] h-[40vh] max-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <svg
          className="w-full max-w-6xl h-full opacity-25 dark:opacity-35"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sys-grid-grad" x1="0" y1="0" x2="1200" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0B5738" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Hexagonal & Diamond Tech Coordinates */}
          <path
            d="M50,200 L200,80 L350,200 L200,320 Z M400,200 L550,80 L700,200 L550,320 Z M750,200 L900,80 L1050,200 L900,320 Z"
            stroke="url(#sys-grid-grad)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          {/* Connecting Data Bus Lines */}
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#008444" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="200" cy="80" r="4" fill="#C5A059" />
          <circle cx="550" cy="80" r="4" fill="#10B981" />
          <circle cx="900" cy="80" r="4" fill="#C5A059" />
        </svg>
      </motion.div>

      {/* 4. Ecommerce Story: Flowing Commercial Expansion Curves */}
      <motion.div
        style={{ opacity: ecommerceOpacity, scale: ecommerceScale }}
        className="absolute inset-x-0 top-[35%] h-[45vh] flex items-center justify-center overflow-hidden"
      >
        <svg
          className="w-full max-w-7xl h-full opacity-20 dark:opacity-30"
          viewBox="0 0 1400 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-50,400 C250,350 400,120 700,250 C1000,380 1150,150 1450,180"
            stroke="#008444"
            strokeWidth={isMobile ? "1.5" : "3"}
            strokeLinecap="round"
          />
          <path
            d="M-50,440 C280,390 430,160 730,290 C1030,420 1180,190 1450,220"
            stroke="#C5A059"
            strokeWidth={isMobile ? "1" : "2"}
            strokeDasharray="8 8"
          />
        </svg>
      </motion.div>

      {/* 5. Websites & Platforms: Layered Digital Geometric Watermark */}
      <motion.div
        style={{ opacity: websitesOpacity }}
        className="absolute left-[5%] lg:left-[12%] top-[48%] w-80 lg:w-[460px] aspect-square pointer-events-none"
      >
        <div className="absolute inset-0 bg-radial-glow opacity-30 dark:opacity-20 blur-3xl" />
        <svg className="w-full h-full opacity-15 dark:opacity-25" viewBox="0 0 300 300" fill="none">
          <rect x="30" y="30" width="240" height="240" rx="36" stroke="#0B5738" strokeWidth="1.5" />
          <rect x="60" y="60" width="180" height="180" rx="24" stroke="#C5A059" strokeWidth="1" strokeDasharray="6 4" />
          <circle cx="150" cy="150" r="45" stroke="#10B981" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* 6. Performance Marketing: Restrained Animated Trajectory Traces */}
      <motion.div
        style={{ opacity: performanceOpacity }}
        className="absolute inset-x-0 top-[60%] h-[35vh] flex items-center justify-center overflow-hidden"
      >
        <svg className="w-full max-w-5xl h-full opacity-30 dark:opacity-40" viewBox="0 0 1000 300" fill="none">
          <path
            d="M50,260 L250,200 L450,230 L650,110 L850,130 L950,40"
            stroke="#008444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Rising Indicator Node */}
          <circle cx="950" cy="40" r="6" fill="#C5A059" />
          <circle cx="950" cy="40" r="12" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      </motion.div>

      {/* 7. Project Journey: Seamless Connecting National Path */}
      <motion.div
        style={{ opacity: journeyOpacity }}
        className="absolute inset-x-0 top-[75%] h-[40vh] flex items-center justify-center overflow-hidden"
      >
        <svg className="w-full max-w-6xl h-full opacity-25 dark:opacity-35" viewBox="0 0 1200 300" fill="none">
          <path
            d="M0,150 Q300,50 600,150 T1200,150"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="4 8"
          />
          <path
            d="M0,150 Q300,250 600,150 T1200,150"
            stroke="#C5A059"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
        </svg>
      </motion.div>

      {/* 8. Growth Partner / Final Vision: Culmination of National Day 96 & "عزّنا بطبعنا" */}
      <motion.div
        style={{
          opacity: finalAuraOpacity,
          scale: finalMotifScale,
        }}
        className="absolute bottom-[3%] sm:bottom-[6%] inset-x-0 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Harmonious Radial Backlight */}
        <div className="w-72 sm:w-96 lg:w-[500px] aspect-square rounded-full bg-gradient-to-tr from-emerald-600/15 via-amber-500/10 to-transparent blur-3xl" />
        
        {/* Delicate Final 96 Motif framing the partner section */}
        <div className="opacity-40 dark:opacity-50 -mt-40">
          <NationalDay96Motif size={isMobile ? 120 : 180} glow={false} />
        </div>
      </motion.div>
    </div>
  );
};
