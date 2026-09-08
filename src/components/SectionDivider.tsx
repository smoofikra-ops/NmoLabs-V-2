import React from 'react';
import { motion } from 'motion/react';

interface SectionDividerProps {
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '' }) => {
  return (
    <div 
      className={`relative w-full py-4 sm:py-6 overflow-hidden pointer-events-none select-none flex items-center justify-center ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <div className="relative w-full max-w-5xl px-6 flex items-center justify-center">
        {/* Subtle base gradient line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent opacity-70 dark:opacity-40" />
        
        {/* Inner colored accent track */}
        <div className="absolute inset-x-12 sm:inset-x-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-primary)]/35 to-transparent" />

        {/* Traveling light shimmer animation */}
        <motion.div
          className="absolute h-[1px] w-24 sm:w-36 bg-gradient-to-r from-transparent via-white/80 dark:via-blue-300/80 to-transparent blur-[0.5px]"
          initial={{ x: '-150%', opacity: 0 }}
          animate={{ 
            x: ['-150%', '150%'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            repeatDelay: 1.2
          }}
        />

        {/* Center glowing crystal node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)] ring-2 ring-[var(--surface-primary)] dark:ring-[#070b14]" />
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
