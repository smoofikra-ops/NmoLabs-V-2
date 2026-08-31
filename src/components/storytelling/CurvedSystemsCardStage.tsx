import React from 'react';
import { motion, useTransform } from 'motion/react';

interface CurvedSystemsCardWrapperProps {
  index: number;
  totalItems: number;
  activeProgress: any;
  isReducedMotion: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Systems & Digital Solutions Curved Card Transition:
 * Preview: LOWER-LEFT (x: -120px to -140px, y: +110px to +140px, scale: 0.88, opacity: 0.32)
 * Incoming Curve: LOWER-LEFT ↗ CENTER
 * Active: CENTER (x: 0, y: 0, scale: 1.0, opacity: 1.0, zIndex: 30)
 * Outgoing: CENTER → RIGHT / UPPER-RIGHT (x: +130px to +160px, y: -90px to -110px, scale: 0.90, opacity: 0)
 * Reversible: Scroll Up seamlessly reverses the exact curved path.
 */
export const CurvedSystemsCardWrapper: React.FC<CurvedSystemsCardWrapperProps> = ({
  index,
  totalItems,
  activeProgress,
  isReducedMotion,
  children,
  className = '',
  onClick
}) => {
  // Mobile responsive trajectory adjustments
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  
  const previewX = isMobile ? -65 : -130;
  const previewY = isMobile ? 110 : 140;
  const exitX = isMobile ? 75 : 150;
  const exitY = isMobile ? -80 : -100;

  // X trajectory:
  // [index - 1.2, index - 1, index, index + 1, index + 1.2]
  const x = useTransform(
    activeProgress,
    [index - 1.25, index - 1, index, index + 1, index + 1.25],
    isReducedMotion
      ? [0, 0, 0, 0, 0]
      : [previewX * 1.25, previewX, 0, exitX, exitX * 1.25]
  );

  // Y trajectory:
  const y = useTransform(
    activeProgress,
    [index - 1.25, index - 1, index, index + 1, index + 1.25],
    isReducedMotion
      ? [0, 0, 0, 0, 0]
      : [previewY * 1.2, previewY, 0, exitY, exitY * 1.2]
  );

  // Scale:
  const scale = useTransform(
    activeProgress,
    [index - 1.2, index - 1, index, index + 1, index + 1.2],
    isReducedMotion
      ? [1, 1, 1, 1, 1]
      : [0.84, 0.89, 1.0, 0.90, 0.85]
  );

  // Opacity:
  const opacity = useTransform(
    activeProgress,
    [index - 1.3, index - 1, index - 0.2, index, index + 0.2, index + 1, index + 1.25],
    isReducedMotion
      ? [0, 1, 1, 1, 1, 1, 0]
      : [0, 0.32, 0.95, 1, 0.95, 0.30, 0]
  );

  // Z-Index:
  const zIndex = useTransform(
    activeProgress,
    [index - 0.5, index, index + 0.5],
    [10, 30, 10]
  );

  // Pointer Events:
  const pointerEvents = useTransform(
    activeProgress,
    [index - 0.45, index, index + 0.45],
    ['none', 'auto', 'none']
  );

  return (
    <motion.div
      style={{
        x,
        y,
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
