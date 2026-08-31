import React from 'react';
import { motion, useTransform } from 'motion/react';

interface CinematicCardWrapperProps {
  index: number;
  totalItems: number;
  activeProgress: any;
  isReducedMotion: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const CinematicCardWrapper: React.FC<CinematicCardWrapperProps> = ({
  index,
  totalItems,
  activeProgress,
  isReducedMotion,
  children,
  className = '',
  onClick
}) => {
  // Mobile vs desktop spacing thresholds
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const yOffset = isMobile ? 150 : 200;

  // Progress mapping for 3-layer vertical progression:
  // [index - 1.2, index - 1, index, index + 1, index + 1.2]
  // index - 1: Next Card preview (emerging from bottom, y = +yOffset, opacity = 0.35, scale = 0.91)
  // index: Active Card (center, y = 0, opacity = 1.0, scale = 1.0)
  // index + 1: Previous Card (fading to top, y = -yOffset, opacity = 0.35, scale = 0.91)
  
  const y = useTransform(
    activeProgress,
    [index - 1.2, index - 1, index, index + 1, index + 1.2],
    isReducedMotion
      ? [0, 0, 0, 0, 0]
      : [yOffset * 1.3, yOffset, 0, -yOffset, -yOffset * 1.3]
  );

  // Subtle lateral drift (alternating between cards for organic depth)
  const lateralOffset = (index % 2 === 0 ? 1 : -1) * (isMobile ? 0 : 8);
  const x = useTransform(
    activeProgress,
    [index - 1, index, index + 1],
    isReducedMotion ? [0, 0, 0] : [lateralOffset, 0, -lateralOffset]
  );

  const scale = useTransform(
    activeProgress,
    [index - 1.2, index - 1, index, index + 1, index + 1.2],
    isReducedMotion
      ? [1, 1, 1, 1, 1]
      : [0.86, 0.91, 1.0, 0.91, 0.86]
  );

  const opacity = useTransform(
    activeProgress,
    [index - 1.3, index - 1, index - 0.2, index, index + 0.2, index + 1, index + 1.3],
    isReducedMotion
      ? [0, 1, 1, 1, 1, 1, 0]
      : [0, 0.38, 0.95, 1, 0.95, 0.38, 0]
  );

  const zIndex = useTransform(
    activeProgress,
    [index - 0.5, index, index + 0.5],
    [10, 30, 10]
  );

  const pointerEvents = useTransform(
    activeProgress,
    [index - 0.45, index, index + 0.45],
    ['none', 'auto', 'none']
  );

  return (
    <motion.div
      style={{
        y,
        x,
        scale,
        opacity,
        zIndex,
        pointerEvents: pointerEvents as any,
      }}
      onClick={onClick}
      className={`absolute inset-x-0 mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-3xl will-change-transform transform-gpu transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface CinematicStageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const CinematicStageContainer: React.FC<CinematicStageContainerProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative w-full max-w-4xl mx-auto h-[480px] sm:h-[520px] md:h-[540px] lg:h-[560px] flex items-center justify-center overflow-hidden px-3 sm:px-6 py-2 ${className}`}>
      {/* Top stage subtle fade mask */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[var(--surface-primary)] via-[var(--surface-primary)]/70 to-transparent pointer-events-none z-25 opacity-40 dark:opacity-60" />
      
      {/* Cards stack */}
      <div className="relative w-full h-full flex items-center justify-center">
        {children}
      </div>

      {/* Bottom stage subtle fade mask */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[var(--surface-primary)] via-[var(--surface-primary)]/70 to-transparent pointer-events-none z-25 opacity-40 dark:opacity-60" />
    </div>
  );
};
