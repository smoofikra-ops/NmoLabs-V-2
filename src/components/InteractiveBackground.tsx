import React from 'react';
import { useSite } from '../context/SiteContext';

export const InteractiveBackground: React.FC = () => {
  const { config } = useSite();
  const isDark = config.theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: isDark ? '#05070D' : '#EEF3F8' }}
      />

      {/* Clean ambient sky: no dashboard/screens, no rotating photo set */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: isDark
            ? [
                'radial-gradient(circle at 12% 18%, rgba(255,255,255,0.72) 0 1px, transparent 1.4px)',
                'radial-gradient(circle at 72% 26%, rgba(120,169,255,0.58) 0 1px, transparent 1.5px)',
                'radial-gradient(circle at 34% 72%, rgba(255,255,255,0.44) 0 1px, transparent 1.4px)',
                'radial-gradient(circle at 88% 78%, rgba(69,137,255,0.42) 0 1px, transparent 1.5px)'
              ].join(',')
            : [
                'radial-gradient(circle at 18% 20%, rgba(15,98,254,0.16) 0 1px, transparent 1.5px)',
                'radial-gradient(circle at 78% 24%, rgba(51,177,255,0.13) 0 1px, transparent 1.5px)',
                'radial-gradient(circle at 42% 76%, rgba(15,23,42,0.08) 0 1px, transparent 1.5px)'
              ].join(','),
          backgroundSize: isDark
            ? '180px 180px, 260px 260px, 320px 320px, 420px 420px'
            : '240px 240px, 320px 320px, 400px 400px'
        }}
      />

      {/* Subtle earth / horizon cue */}
      <div
        className="absolute -right-[22vw] -bottom-[38vw] w-[86vw] h-[86vw] min-w-[560px] min-h-[560px] rounded-full transition-opacity duration-500"
        style={{
          opacity: isDark ? 0.42 : 0.16,
          background: isDark
            ? 'radial-gradient(circle at 36% 28%, rgba(69,137,255,0.20), rgba(4,12,28,0.96) 56%, #02040A 72%)'
            : 'radial-gradient(circle at 36% 28%, rgba(51,177,255,0.18), rgba(226,236,248,0.92) 58%, rgba(210,223,238,0.98) 74%)',
          border: isDark ? '1px solid rgba(120,169,255,0.22)' : '1px solid rgba(15,98,254,0.10)',
          boxShadow: isDark
            ? '0 0 120px rgba(15,98,254,0.12), inset 24px 18px 80px rgba(69,137,255,0.08)'
            : '0 0 100px rgba(15,98,254,0.06), inset 18px 14px 70px rgba(255,255,255,0.55)'
        }}
      />

      <div
        className="absolute -right-[13vw] -bottom-[29vw] w-[68vw] h-[68vw] min-w-[460px] min-h-[460px] rounded-full border"
        style={{
          opacity: isDark ? 0.16 : 0.10,
          borderColor: isDark ? 'rgba(120,169,255,0.28)' : 'rgba(15,98,254,0.20)',
          transform: 'rotate(-12deg) scaleY(0.34)'
        }}
      />

      {/* Readability field keeps text dominant in both themes */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(5,7,13,0.24) 0%, rgba(5,7,13,0.56) 100%)'
            : 'linear-gradient(180deg, rgba(238,243,248,0.22) 0%, rgba(238,243,248,0.68) 100%)'
        }}
      />
    </div>
  );
};
