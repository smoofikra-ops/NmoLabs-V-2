import React, { useRef } from 'react';
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
  bgUrl: _bgUrl,
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0.0, 0.08], [0.85, 1]);
  const headerYIntepolated = useTransform(
    scrollYProgress,
    [0.0, 0.08],
    shouldReduceMotion ? [0, 0] : [12, 0]
  );

  return (
    <section
      ref={containerRef}
      id={id}
      className={`relative py-24 sm:py-28 lg:py-32 overflow-hidden border-b border-[var(--border-default)] transition-colors duration-300 ${className}`}
    >
      {/* Clean story canvas: intentionally no photographic section backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 nmolabs-story-scrim" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at 50% 16%, rgba(15,98,254,0.07), transparent 42%), radial-gradient(circle at 86% 70%, rgba(51,177,255,0.04), transparent 34%)'
          }}
        />
      </div>

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
