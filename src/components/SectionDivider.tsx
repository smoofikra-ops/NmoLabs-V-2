import React from 'react';
import { motion } from 'motion/react';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative w-full py-2.5 sm:py-4 overflow-hidden pointer-events-none select-none flex items-center justify-center ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-6xl px-5 sm:px-8 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--section-divider)] to-transparent" />
        <div className="absolute inset-x-[18%] h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/28 to-transparent" />
        <motion.div
          className="absolute h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-[var(--color-primary)]/75 to-transparent blur-[0.4px]"
          initial={{ x: '-170%', opacity: 0 }}
          animate={{ x: ['-170%', '170%'], opacity: [0, .85, .85, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_10px_rgba(15,98,254,.45)] ring-[3px] ring-[var(--surface-primary)]" />
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
