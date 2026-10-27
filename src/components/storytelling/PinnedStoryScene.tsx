import React, { useRef } from 'react';
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
  scrollMultiplier?: number;
  children: (helpers: {
    scrollYProgress: any;
    isReducedMotion: boolean;
    activeProgress: any;
  }) => React.ReactNode;
  footerContent?: React.ReactNode;
}

export const PinnedStoryScene: React.FC<PinnedStorySceneProps> = ({
  id,
  bgUrl: _bgUrl,
  badge,
  titleAr,
  titleEn,
  subtitleAr,
  subtitleEn,
  itemCount,
  isEn = false,
  scrollMultiplier = 2.7,
  children,
  footerContent
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [0.85, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], shouldReduceMotion ? [0, 0] : [8, 0]);

  const activeProgress = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    [0, Math.max(0, itemCount - 1)]
  );

  return (
    <section
      ref={containerRef}
      id={id}
      style={{ height: `${Math.max(200, Math.round(scrollMultiplier * 100))}vh` }}
      className="relative border-b border-[var(--border-default)] transition-colors duration-300"
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] max-h-[1080px] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 lg:py-8 z-10">
        {/* Clean story canvas: no section photography or screen imagery */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--page-background)' }} />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(circle at 50% 10%, rgba(15,98,254,0.07), transparent 38%), radial-gradient(circle at 12% 76%, rgba(51,177,255,0.04), transparent 32%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pt-16 sm:pt-14 md:pt-14">
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center max-w-3xl mx-auto"
          >
            {badge && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-2 shadow-sm">
                {badge.icon && <badge.icon className="w-3.5 h-3.5" />}
                <span>{isEn ? badge.textEn : badge.textAr}</span>
              </div>
            )}

            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-1.5">
              {isEn ? titleEn : titleAr}
            </h2>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium max-w-2xl mx-auto line-clamp-2">
              {isEn ? subtitleEn : subtitleAr}
            </p>
          </motion.div>
        </div>

        <div className="w-full relative z-20 overflow-visible my-auto py-1">
          {children({
            scrollYProgress,
            isReducedMotion: !!shouldReduceMotion,
            activeProgress
          })}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 pb-3 flex flex-col items-center gap-2">
          {footerContent ? (
            footerContent
          ) : (
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--surface-primary)]/85 backdrop-blur-md border border-[var(--border-default)] text-[11px] text-[var(--text-muted)] font-medium shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-pulse" />
              <span>{isEn ? 'Scroll down to progress deeper' : 'مرر للأسفل للتقدم في القصة'}</span>
              <div className="w-20 h-1 bg-[var(--surface-secondary)] rounded-full overflow-hidden ml-2 rtl:ml-0 rtl:mr-2">
                <motion.div
                  className="h-full bg-[var(--color-primary)] rounded-full"
                  style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
