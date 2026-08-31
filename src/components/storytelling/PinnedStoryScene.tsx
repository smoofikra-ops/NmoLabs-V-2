import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

interface PinnedStorySceneProps {
  id: string;
  bgUrl: string;
  badge?: {
    icon?: React.ElementType;
    textAr: string;
    textEn: string;
  };
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  itemCount: number;
  isEn?: boolean;
  scrollMultiplier?: number; // default 2.6 (controls scroll distance)
  children: (helpers: {
    scrollYProgress: any;
    trackX: any;
    trackRef: React.RefObject<HTMLDivElement>;
    isReducedMotion: boolean;
    activeProgress: any;
  }) => React.ReactNode;
  footerContent?: React.ReactNode;
}

export const PinnedStoryScene: React.FC<PinnedStorySceneProps> = ({
  id,
  bgUrl,
  badge,
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  itemCount,
  isEn = false,
  scrollMultiplier = 2.6,
  children,
  footerContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [maxScrollDistance, setMaxScrollDistance] = useState<number>(1200);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Calculate actual pixel translation based on track and container width
  useEffect(() => {
    const updateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Provide generous padding so the last CTA card is centered and fully visible
        const padding = Math.min(viewportWidth * 0.15, 160);
        const distance = Math.max(0, trackWidth - viewportWidth + padding);
        setMaxScrollDistance(distance > 0 ? distance : (itemCount * 360));
      }
    };

    updateDistance();
    window.addEventListener('resize', updateDistance);
    const observer = new ResizeObserver(updateDistance);
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateDistance);
      observer.disconnect();
    };
  }, [itemCount]);

  // Directional translation: In RTL flex-row starts at right, so moving track to right (+px) reveals items on the left
  // In LTR flex-row starts at left, so moving track to left (-px) reveals items on the right
  const targetOffset = isEn ? -maxScrollDistance : maxScrollDistance;

  const trackX = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    shouldReduceMotion ? [0, 0] : [0, targetOffset]
  );

  // Background subtle choreography
  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5]);
  const bgScale = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    shouldReduceMotion ? [1, 1, 1] : [1.04, 1.0, 1.04]
  );

  // Header subtle entrance and sticky lock
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0.85, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], shouldReduceMotion ? [0, 0] : [8, 0]);

  // Indicator progress (0 to 1)
  const activeProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, itemCount - 1]);

  return (
    <section
      ref={containerRef}
      id={id}
      style={{
        // Height controls the scroll duration while remaining sticky
        height: `${Math.max(200, Math.round(scrollMultiplier * 100))}vh`
      }}
      className="relative border-b border-[var(--border-default)] transition-colors duration-300"
    >
      {/* Sticky Viewport Scene */}
      <div className="sticky top-0 h-[100svh] min-h-[640px] max-h-[1080px] w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 lg:py-10 z-10">
        {/* Background Image Layer */}
        <motion.div
          style={{
            opacity: bgOpacity,
            scale: bgScale,
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

          {/* Light Mode Layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-primary)]/88 via-[var(--surface-primary)]/75 to-[var(--surface-primary)]/92 dark:opacity-0 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[var(--surface-primary)]/40 to-[var(--surface-primary)]/80 dark:opacity-0 transition-opacity duration-300" />
          
          {/* Dark Mode Layer */}
          <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-gradient-to-b from-[#070B14]/90 via-[#070B14]/75 to-[#070B14]/94 transition-opacity duration-300" />
          <div className="absolute inset-0 opacity-0 dark:opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#070B14]/40 to-[#070B14]/85 transition-opacity duration-300" />

          {/* Subtle grid accent */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
        </motion.div>

        {/* Top Header Layer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-16 sm:pt-14 md:pt-16">
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center max-w-3xl mx-auto"
          >
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-2.5 shadow-sm">
                {badge.icon && <badge.icon className="w-3.5 h-3.5" />}
                <span>{isEn ? badge.textEn : badge.textAr}</span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-2">
              {isEn ? titleEn : titleAr}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-medium max-w-2xl mx-auto line-clamp-2">
              {isEn ? subtitleEn : subtitleAr}
            </p>
          </motion.div>
        </div>

        {/* Center Horizontal Story Track */}
        <div className="w-full relative z-20 overflow-hidden my-auto py-2">
          {children({
            scrollYProgress,
            trackX,
            trackRef,
            isReducedMotion: !!shouldReduceMotion,
            activeProgress
          })}
        </div>

        {/* Bottom Interactive Progress & Indicators */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pb-2 flex flex-col items-center gap-2">
          {footerContent ? (
            footerContent
          ) : (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-primary)]/80 backdrop-blur-md border border-[var(--border-default)] text-[11px] text-[var(--text-muted)] font-medium shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span>{isEn ? 'Scroll to explore journey' : 'مرر للاستكشاف عبر القصة'}</span>
              <div className="w-16 h-1 bg-[var(--surface-secondary)] rounded-full overflow-hidden ml-2 rtl:ml-0 rtl:mr-2">
                <motion.div 
                  className="h-full bg-[var(--color-primary)] rounded-full"
                  style={{ 
                    width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) 
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
