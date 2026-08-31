import React from 'react';
import { motion, useTransform } from 'motion/react';

interface DepthFocusCardWrapperProps {
  index: number;
  totalItems: number;
  activeProgress: any;
  isReducedMotion: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Websites & Digital Platforms Depth / Focus Transition:
 * Preview: Behind / deeper in Z-axis (scale: 0.82, y: +60px, opacity: 0.35, blur: 2px, zIndex: 10)
 * Incoming: Scales UP toward viewer + moves into sharp central focus (scale: 1.0, y: 0, opacity: 1.0, zIndex: 30)
 * Outgoing: Recedes slightly backward and floats subtly upward (scale: 0.92, y: -70px, opacity: 0, zIndex: 10)
 * Reversible: Scroll Up reverses depth layering cleanly.
 */
export const DepthFocusCardWrapper: React.FC<DepthFocusCardWrapperProps> = ({
  index,
  totalItems,
  activeProgress,
  isReducedMotion,
  children,
  className = '',
  onClick
}) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const yPreview = isMobile ? 45 : 70;
  const yExit = isMobile ? -50 : -80;

  // Y trajectory (subtle vertical shift as depth changes)
  const y = useTransform(
    activeProgress,
    [index - 1.2, index - 1, index, index + 1, index + 1.2],
    isReducedMotion
      ? [0, 0, 0, 0, 0]
      : [yPreview * 1.2, yPreview, 0, yExit, yExit * 1.2]
  );

  // Scale (strong optical depth transition)
  const scale = useTransform(
    activeProgress,
    [index - 1.2, index - 1, index, index + 1, index + 1.2],
    isReducedMotion
      ? [1, 1, 1, 1, 1]
      : [0.78, 0.84, 1.0, 0.91, 0.85]
  );

  // Opacity
  const opacity = useTransform(
    activeProgress,
    [index - 1.3, index - 1, index - 0.2, index, index + 0.2, index + 1, index + 1.25],
    isReducedMotion
      ? [0, 1, 1, 1, 1, 1, 0]
      : [0, 0.38, 0.95, 1, 0.95, 0.30, 0]
  );

  // Z-Index for layered canvas feel
  const zIndex = useTransform(
    activeProgress,
    [index - 0.5, index, index + 0.5],
    [10, 30, 10]
  );

  // Pointer Events
  const pointerEvents = useTransform(
    activeProgress,
    [index - 0.45, index, index + 0.45],
    ['none', 'auto', 'none']
  );

  return (
    <motion.div
      style={{
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
