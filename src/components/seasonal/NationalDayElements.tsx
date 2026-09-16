import React from 'react';
import { motion } from 'motion/react';
import { NATIONAL_DAY_96_CONFIG } from '../../config/nationalDay96';

/**
 * Modern Sculptural 96 Vector Motif
 * Crafted with precision curves and geometric lines inspired by the official
 * National Day 96 aesthetic: balanced, dimensional, and technological.
 */
export const NationalDay96Motif: React.FC<{
  className?: string;
  size?: number;
  glow?: boolean;
  color?: string;
}> = ({ className = '', size = 120, glow = true, color }) => {
  const primaryColor = color || NATIONAL_DAY_96_CONFIG.colors.saudiGreen;
  const accentColor = NATIONAL_DAY_96_CONFIG.colors.saduGold;
  const emerald = NATIONAL_DAY_96_CONFIG.colors.emeraldGrowth;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none pointer-events-none transform-gpu ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="nd96-grad-primary" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={emerald} />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={accentColor} />
        </linearGradient>

        <linearGradient id="nd96-grad-accent" x1="180" y1="20" x2="20" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="60%" stopColor={emerald} />
          <stop offset="100%" stopColor="#0B5738" />
        </linearGradient>

        {glow && (
          <filter id="nd96-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Decorative Geometric Outer Ring with Cultural Notch Accents */}
      <circle
        cx="100"
        cy="100"
        r="88"
        stroke="url(#nd96-grad-accent)"
        strokeWidth="1.5"
        strokeDasharray="4 8"
        opacity="0.35"
      />

      {/* Outer Orbiting Architectural Diamond Points */}
      <g opacity="0.6">
        <polygon points="100,6 104,14 100,22 96,14" fill={accentColor} />
        <polygon points="100,178 104,186 100,194 96,186" fill={accentColor} />
        <polygon points="6,100 14,104 22,100 14,96" fill={emerald} />
        <polygon points="178,100 186,104 194,100 186,96" fill={emerald} />
      </g>

      {/* Stylized Sculptural "9" */}
      <g filter={glow ? 'url(#nd96-glow)' : undefined}>
        {/* Head of the 9 */}
        <circle
          cx="68"
          cy="74"
          r="30"
          stroke="url(#nd96-grad-primary)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Descending stem and tail of 9 */}
        <path
          d="M98 74 C98 105 88 135 55 145"
          stroke="url(#nd96-grad-primary)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>

      {/* Stylized Interlocking Sculptural "6" */}
      <g filter={glow ? 'url(#nd96-glow)' : undefined}>
        {/* Ascending stem of 6 */}
        <path
          d="M102 126 C102 95 112 65 145 55"
          stroke="url(#nd96-grad-accent)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Bowl of 6 */}
        <circle
          cx="132"
          cy="126"
          r="30"
          stroke="url(#nd96-grad-accent)"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </g>

      {/* Central Intersecting Geometric Core */}
      <circle cx="100" cy="100" r="4" fill="#FFFFFF" opacity="0.9" />
      <polygon
        points="100,90 108,100 100,110 92,100"
        fill="url(#nd96-grad-accent)"
        opacity="0.7"
      />
    </svg>
  );
};

/**
 * Traditional Geometric Sadu Ribbon Pattern
 * Clean SVG pattern with controlled opacity, maintaining pure white breathing space.
 */
export const SaduGeometricRibbon: React.FC<{
  className?: string;
  horizontal?: boolean;
}> = ({ className = '', horizontal = true }) => {
  return (
    <div
      className={`overflow-hidden pointer-events-none select-none opacity-20 dark:opacity-30 ${className}`}
      aria-hidden="true"
    >
      <svg
        width={horizontal ? '100%' : '24'}
        height={horizontal ? '24' : '100%'}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <pattern
          id="sadu-pattern"
          width="40"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          {/* Diamond Motif */}
          <polygon
            points="20,2 38,12 20,22 2,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <polygon
            points="20,6 30,12 20,18 10,12"
            fill="currentColor"
            opacity="0.25"
          />
          <circle cx="20" cy="12" r="2" fill="currentColor" />
          <line x1="0" y1="12" x2="2" y2="12" stroke="currentColor" strokeWidth="1" />
          <line x1="38" y1="12" x2="40" y2="12" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#sadu-pattern)" />
      </svg>
    </div>
  );
};

/**
 * Seasonal Campaign Header & Hero Badge
 * Distinctively establishes: NmoLabs × اليوم الوطني السعودي 96 with "عزّنا بطبعنا"
 */
export const NationalDayCampaignBadge: React.FC<{
  isEn?: boolean;
  variant?: 'hero' | 'compact' | 'footer';
  className?: string;
}> = ({ isEn = false, variant = 'hero', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/20 dark:bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 text-[11px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-xs ${className}`}
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400"></span>
        </span>
        <span className="font-mono font-black text-emerald-700 dark:text-emerald-300">96</span>
        <span className="text-[var(--text-muted)] opacity-60">|</span>
        <span>{isEn ? NATIONAL_DAY_96_CONFIG.sloganEn : NATIONAL_DAY_96_CONFIG.sloganAr}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center flex-wrap justify-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-xl border border-emerald-600/25 dark:border-emerald-500/30 bg-white/80 dark:bg-black/60 shadow-[0_4px_20px_-2px_rgba(11,87,56,0.15)] dark:shadow-[0_4px_24px_-2px_rgba(0,132,68,0.25)] transition-all hover:border-emerald-600/45 text-xs sm:text-sm font-bold ${className}`}
    >
      {/* Brand Collab Indicator */}
      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-200 font-extrabold">
        <span className="text-base sm:text-lg">🇸🇦</span>
        <span className="tracking-tight">{isEn ? 'NmoLabs' : 'نمو لابز'}</span>
        <span className="text-[var(--text-muted)] text-[10px] font-normal">×</span>
        <span className="text-emerald-700 dark:text-emerald-300">
          {isEn ? 'Saudi National Day' : 'اليوم الوطني السعودي'}
        </span>
        <span className="px-1.5 py-0.5 rounded-md bg-emerald-600/15 dark:bg-emerald-400/20 text-emerald-800 dark:text-emerald-200 text-[11px] font-black font-mono">
          96
        </span>
      </div>

      <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-emerald-500/60" />

      {/* Official Slogan: عزّنا بطبعنا */}
      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-200 font-black">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="tracking-wide text-xs sm:text-sm">
          {isEn ? NATIONAL_DAY_96_CONFIG.sloganEn : NATIONAL_DAY_96_CONFIG.sloganAr}
        </span>
      </div>
    </motion.div>
  );
};
