import React from 'react';
import { useSite } from '../context/SiteContext';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

import { InteractiveStatsCard } from "./InteractiveStatsCard";

export const Testimonials = () => {
  const { config, updateConfig } = useSite();

  if (!config.sections.testimonials) return null;

  const basePartners = (config.partners || []).filter(p => !p.isHidden).sort((a, b) => (a.order || 0) - (b.order || 0));
  const partnersLoop = Array.from({ length: 20 }, () => basePartners).flat();

  const getPartnerStyle = () => {
    const effect = config.testimonialsEffect || 'glow';
    if (effect === 'glass') {
      return {
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
      };
    }
    if (effect === 'minimal') {
      return {
        backgroundColor: 'transparent',
        border: 'none',
      };
    }
    // glow fallback
    return {
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '2px solid rgba(255,255,255,0.1)',
      animation: 'border-pulse-glow 3s infinite alternate',
      animationPlayState: 'running'
    };
  };

  const renderPartner = (partner: any, keyPrefix: string, index: number) => (
    <div 
      key={`${keyPrefix}-${partner.id}-${index}`}
      className="mx-4 lg:mx-8 relative group/partner flex flex-col items-center justify-center cursor-pointer w-32 h-32 md:w-40 md:h-40 rounded-3xl"
      style={{ '--partner-color': partner.color || config.primaryColor } as React.CSSProperties}
    >
            {/* Tooltip */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/partner:opacity-100 transition-all duration-300 pointer-events-none z-50 transform group-hover/partner:-translate-y-2 w-max max-w-[250px] flex flex-col items-center gap-1">
        <div className="bg-[var(--surface-primary)]/90 backdrop-blur text-[var(--text-primary)] px-4 py-2 rounded-xl text-sm font-bold border border-[var(--border-default)] shadow-[0_0_15px_var(--partner-color)] text-center break-words">
          {partner.name}
        </div>
        {partner.types && partner.types.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-center">
            {partner.types.map((type: string) => (
              <span key={type} className="text-[10px] bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-0.5 rounded-full whitespace-nowrap">
                {type}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Logo Container */}
      <div
        onClick={() => {
          if (partner.linkUrl) {
            const currentClicks = config.partnerClicks || [];
            updateConfig({ partnerClicks: [...currentClicks, { partnerId: partner.id, timestamp: Date.now() }] });
            window.open(partner.linkUrl, '_blank');
          }
        }}
        className="w-full h-full rounded-3xl flex items-center justify-center transition-all duration-300 group-hover/partner:scale-110 overflow-hidden relative"
        style={getPartnerStyle() as any}
        onMouseEnter={(e) => { 
          if(config.testimonialsEffect === 'glow' || !config.testimonialsEffect) e.currentTarget.style.animationPlayState = 'paused'; 
        }}
        onMouseLeave={(e) => { 
          if(config.testimonialsEffect === 'glow' || !config.testimonialsEffect) e.currentTarget.style.animationPlayState = 'running'; 
        }}
      >
        {/* Background glow to make black logos prominent */}
        {(!config.testimonialsEffect || config.testimonialsEffect === 'glow') && (
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-110 pointer-events-none opacity-50"></div>
        )}
        
        <div className="relative z-10 w-full h-full p-4 flex items-center justify-center">
          {partner.imageUrl ? (
            <img src={partner.imageUrl} alt={partner.name} loading="lazy" className="w-full h-full object-contain transition-transform duration-300 pointer-events-none drop-shadow-md" />
          ) : (
            <h4 className="text-lg md:text-xl font-bold text-[var(--text-primary)] uppercase drop-shadow-md text-center px-2 break-words leading-tight w-full">{partner.name}</h4>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 relative overflow-hidden bg-[color:var(--glass-bg)] bg-dots-pattern" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface-primary)] opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 text-[var(--text-primary)]"
        >
          {config.testimonialsTitle || 'متاجر كبرت معنا'}
        </motion.h2>
        <p className="text-xl text-[var(--text-muted)]">{config.testimonialsSubtitle || 'شركاء النجاح اللي حققنا معهم قفزات نوعية في التحويل والمبيعات.'}</p>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full flex overflow-x-hidden py-20 z-10 group" dir="ltr">
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[var(--surface-primary)] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[var(--surface-primary)] to-transparent z-20 pointer-events-none" />
        
        <div 
          className="flex group-hover:[animation-play-state:paused] whitespace-nowrap items-center shrink-0 w-max"
          style={{ animation: `marquee ${config.testimonialsSpeed || 80}s linear infinite` }}
        >
          {[...basePartners, ...basePartners, ...basePartners, ...basePartners, ...basePartners].map((partner, i) => renderPartner(partner, 'marquee1', i))}
        </div>
        
        <div 
          className="flex group-hover:[animation-play-state:paused] whitespace-nowrap items-center shrink-0 w-max" aria-hidden="true"
          style={{ animation: `marquee ${config.testimonialsSpeed || 80}s linear infinite` }}
        >
          {[...basePartners, ...basePartners, ...basePartners, ...basePartners, ...basePartners].map((partner, i) => renderPartner(partner, 'marquee2', i))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 relative z-10">
         <InteractiveStatsCard />
      </div>
    </section>
  );
};
