import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion } from 'motion/react';
import { ExternalLink, Building2 } from 'lucide-react';
import { InteractiveStatsCard } from "./InteractiveStatsCard";

interface PartnerCardProps {
  partner: any;
  isEn: boolean;
  isLight: boolean;
  onClick: () => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, isEn, isLight, onClick }) => {
  const [currentSrc, setCurrentSrc] = useState<string>(partner.imageUrl || '');
  const [hasFailedOnce, setHasFailedOnce] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const partnerName = isEn ? (partner.nameEn || partner.name) : partner.name;
  const partnerTypes = (isEn && partner.typesEn && partner.typesEn.length > 0) ? partner.typesEn : partner.types;
  const partnerDescription = isEn ? (partner.descriptionEn || partner.description) : partner.description;
  const brandColor = partner.color || '#de9336';

  const handleImgError = () => {
    if (!hasFailedOnce && currentSrc) {
      setHasFailedOnce(true);
      // Try local fallback if CDN was used, or CDN if local was used
      if (partner.id === '1') setCurrentSrc(currentSrc.includes('cloudinary') ? '/partners/1.png' : 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245696/%D8%A7%D9%84%D9%81%D9%83%D8%B1%D8%A9_%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D8%B1%D8%A9_fi5pw6.jpg');
      else if (partner.id === '3') setCurrentSrc(currentSrc.includes('cloudinary') ? '/partners/3.png' : 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245697/%D9%86%D8%AE%D9%84%D8%AA%D9%8A%D9%86_%D9%88%D8%A7%D9%8A_%D9%81%D8%A7%D9%8A_2_lz530o.jpg');
      else if (partner.id === '4') setCurrentSrc(currentSrc.includes('cloudinary') ? '/partners/4.png' : 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245696/%D8%AB%D9%84%D8%AB_%D8%A7%D9%84%D9%8A%D9%88%D9%85_fkd0yu.jpg');
      else if (partner.id === 'partner_1778961537430') setCurrentSrc(currentSrc.includes('cloudinary') ? '/partners/regine.png' : 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245697/%D9%85%D9%86%D8%A7%D8%AF%D9%8A%D9%84_%D8%B1%D9%8A%D8%AC%D9%8A%D9%86_nj67xq.jpg');
      else setImgError(true);
    } else {
      setImgError(true);
    }
  };

  // Get initials or short name for monogram fallback
  const initials = partnerName ? partnerName.trim().slice(0, 2) : 'NL';

  return (
    <div 
      className="mx-3 sm:mx-4 lg:mx-6 relative group/partner flex flex-col items-center justify-center cursor-pointer w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-3xl shrink-0"
      style={{ '--partner-color': brandColor } as React.CSSProperties}
    >
      {/* Tooltip */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/partner:opacity-100 transition-all duration-300 pointer-events-none z-50 transform group-hover/partner:-translate-y-2 w-max max-w-[260px] flex flex-col items-center gap-1">
        <div className="bg-[var(--surface-primary)]/95 backdrop-blur text-[var(--text-primary)] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border border-[var(--border-default)] shadow-lg text-center break-words">
          {partnerName}
        </div>
        {partnerTypes && partnerTypes.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-center">
            {partnerTypes.map((type: string) => (
              <span key={type} className="text-[10px] bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-0.5 rounded-full whitespace-nowrap">
                {type}
              </span>
            ))}
          </div>
        )}
        {partnerDescription && (
          <div className="text-[11px] bg-[var(--surface-secondary)]/95 text-[var(--text-secondary)] px-3 py-1.5 rounded-lg text-center leading-relaxed mt-1 max-w-full whitespace-normal shadow-md">
            {partnerDescription}
          </div>
        )}
      </div>

      {/* Logo Container */}
      <div
        onClick={onClick}
        className="w-full h-full rounded-3xl flex items-center justify-center transition-all duration-300 group-hover/partner:scale-105 overflow-hidden relative border p-3 sm:p-4 bg-white/90 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/10 hover:border-[var(--partner-color)] shadow-sm hover:shadow-md dark:shadow-none"
      >
        {/* Subtle hover background highlight */}
        <div 
          className="absolute inset-0 opacity-0 group-hover/partner:opacity-10 transition-opacity duration-300 pointer-events-none rounded-3xl"
          style={{ backgroundColor: brandColor }}
        />
        
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {currentSrc && !imgError ? (
            <div className="w-full h-full flex items-center justify-center p-1.5 rounded-2xl bg-white dark:bg-white/95 shadow-2xs">
              <img 
                src={currentSrc} 
                alt={partnerName} 
                loading="eager"
                decoding="async"
                onError={handleImgError}
                className="w-full h-full object-contain pointer-events-none transition-transform duration-300 group-hover/partner:scale-105" 
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-2 w-full h-full">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-1.5 text-white font-bold text-sm sm:text-base shadow-sm"
                style={{ backgroundColor: brandColor }}
              >
                {initials}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] text-center px-1 break-words line-clamp-2 leading-tight">
                {partnerName}
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  const isLight = config.theme === 'light';

  if (!config.sections.testimonials) return null;

  const basePartners = (config.partners || []).filter(p => !p.isHidden).sort((a, b) => (a.order || 0) - (b.order || 0));

  const handlePartnerClick = (partner: any) => {
    if (partner.linkUrl) {
      const currentClicks = config.partnerClicks || [];
      updateConfig({ partnerClicks: [...currentClicks, { partnerId: partner.id, timestamp: Date.now() }] });
      window.open(partner.linkUrl, '_blank');
    }
  };

  const testimonialsTitle = isEn
    ? (config.testimonialsTitleEn || (/[ا-ي]/.test(config.testimonialsTitle || '') ? 'Stores & Brands That Grew With Us' : config.testimonialsTitle) || 'Stores & Brands That Grew With Us')
    : (config.testimonialsTitle || 'متاجر وشركات كبرت معنا');

  const testimonialsSubtitle = isEn
    ? (config.testimonialsSubtitleEn || (/[ا-ي]/.test(config.testimonialsSubtitle || '') ? 'Success partners with whom we achieved qualitative leaps in conversion, systems, and sales.' : config.testimonialsSubtitle) || 'Success partners with whom we achieved qualitative leaps in conversion, systems, and sales.')
    : (config.testimonialsSubtitle || 'شركاء النجاح الذين حققنا معهم قفزات نوعية في هندسة الأنظمة والتحويل والمبيعات.');

  return (
    <section className="py-10 md:py-16 relative overflow-hidden bg-[color:var(--glass-bg)] bg-dots-pattern" id="testimonials">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface-primary)] opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--text-primary)]"
        >
          {testimonialsTitle}
        </motion.h2>
        <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-3xl mx-auto leading-relaxed">{testimonialsSubtitle}</p>
      </div>

      {/* Infinite Marquee */}
      <div className="relative w-full flex overflow-x-hidden py-4 z-10 group" dir="ltr">
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[var(--surface-primary)] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[var(--surface-primary)] to-transparent z-20 pointer-events-none" />
        
        <div 
          className="flex group-hover:[animation-play-state:paused] whitespace-nowrap items-center shrink-0 w-max"
          style={{ 
            animation: `marquee ${config.testimonialsSpeed || 70}s linear infinite`,
            willChange: 'transform'
          }}
        >
          {[...basePartners, ...basePartners, ...basePartners].map((partner, i) => (
            <PartnerCard 
              key={`m1-${partner.id}-${i}`}
              partner={partner}
              isEn={isEn}
              isLight={isLight}
              onClick={() => handlePartnerClick(partner)}
            />
          ))}
        </div>
        
        <div 
          className="flex group-hover:[animation-play-state:paused] whitespace-nowrap items-center shrink-0 w-max" 
          aria-hidden="true"
          style={{ 
            animation: `marquee ${config.testimonialsSpeed || 70}s linear infinite`,
            willChange: 'transform'
          }}
        >
          {[...basePartners, ...basePartners, ...basePartners].map((partner, i) => (
            <PartnerCard 
              key={`m2-${partner.id}-${i}`}
              partner={partner}
              isEn={isEn}
              isLight={isLight}
              onClick={() => handlePartnerClick(partner)}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 md:mt-16 relative z-10">
         <InteractiveStatsCard />
      </div>
    </section>
  );
};
