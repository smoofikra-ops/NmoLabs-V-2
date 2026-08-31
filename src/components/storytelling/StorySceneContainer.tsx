import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface StorySceneContainerProps {
  id: string;
  bgUrl: string;
  storyBadge?: {
    number: string;
    titleEn: string;
    titleAr: string;
    icon?: React.ElementType;
  };
  children: (progress: {
    scrollYProgress: any;
    headerOpacity: any;
    headerY: any;
    isReducedMotion: boolean;
  }) => React.ReactNode;
  className?: string;
  isEn?: boolean;
}

export const StorySceneContainer: React.FC<StorySceneContainerProps> = ({
  id,
  bgUrl,
  storyBadge,
  children,
  className = '',
  isEn = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Background smooth choreography
  const bgOpacityBugFree = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.85, 1.0],
    [0.4, 1, 1, 0.4]
  );

  const bgScale = useTransform(
    scrollYProgress,
    [0.0, 0.5, 1.0],
    shouldReduceMotion ? [1, 1, 1] : [1.03, 1.0, 1.03]
  );

  const bgY = useTransform(
    scrollYProgress,
    [0.0, 1.0],
    shouldReduceMotion ? ['0%', '0%'] : ['-2%', '2%']
  );

  // Safe header animation that guarantees visibility
  const headerOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0.85, 1]);
  const headerYIntepolated = useTransform(
    scrollYProgress,
    [0.0, 0.08],
    shouldReduceMotion ? [0, 0] : [12, 0]
  );

  // Intelligent prefetch of next images
  useEffect(() => {
    const img = new Image();
    img.src = bgUrl;
  }, [bgUrl]);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative py-24 sm:py-28 lg:py-32 overflow-hidden border-b border-[var(--border-default)] transition-colors duration-300 ${className}`}
    >
      {/* Background Image Layer with Cinematic Depth */}
      <motion.div
        style={{
          opacity: bgOpacityBugFree,
          scale: bgScale,
          y: bgY,
        }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <img
          src={bgUrl}
          alt=""
          role="presentation"
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center transform-gpu will-change-transform"
        />

        {/* Localized Readability Glass/Gradients (Light-First & Dark-Compatible) */}
        {/* Light Mode Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-primary)]/85 via-[var(--surface-primary)]/75 to-[var(--surface-primary)]/90 dark:opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[var(--surface-primary)]/40 to-[var(--surface-primary)]/80 dark:opacity-0 transition-opacity duration-300" />
        
        {/* Dark Mode Layer */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-gradient-to-b from-[#0a0f1d]/90 via-[#0a0f1d]/75 to-[#0a0f1d]/92 transition-opacity duration-300" />
        <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0f1d]/40 to-[#0a0f1d]/85 transition-opacity duration-300" />

        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      </motion.div>

      {/* Foreground Content with Protected Z-Index */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children({
          scrollYProgress,
          headerOpacity,
          headerY: headerYIntepolated,
          isReducedMotion: !!shouldReduceMotion,
        })}
      </div>
    </section>
  );
};
