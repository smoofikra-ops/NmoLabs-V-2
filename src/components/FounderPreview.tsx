import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { founderData } from '../data/founder';
import { ArrowRight, User } from 'lucide-react';

export const FounderPreview = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  const d = founderData;

  return (
    <section className="py-16 sm:py-20 bg-[var(--surface-primary)] border-t border-[var(--border-default)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 md:p-12 rounded-3xl shadow-sm">
          
          {/* Portrait */}
          <div className="relative w-32 h-32 shrink-0 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] flex items-center justify-center overflow-hidden">
            {d.portrait ? (
              <img src={d.portrait} alt={isEn ? d.portraitAltEn : d.portraitAltAr} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <span className="text-3xl font-black text-[var(--color-primary)] opacity-50">AA</span>
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-start">
            <h3 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
              {isEn ? d.nameEn : d.nameAr}
            </h3>
            <span className="text-[var(--text-muted)] font-medium block mb-4">
              {isEn ? d.titleEn : d.titleAr}
            </span>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              {isEn ? d.shortBioEn : d.shortBioAr}
            </p>
            
            <button
              onClick={() => { updateConfig({ currentRoute: 'founder' }); window.scrollTo(0,0); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border border-[var(--border-default)] bg-[var(--surface-primary)] hover:bg-[var(--surface-tertiary)] hover:border-[var(--color-primary)]/50 transition-colors text-[var(--text-primary)] w-full sm:w-auto justify-center"
            >
              <User size={16} className="text-[var(--color-primary)]" />
              {isEn ? 'Meet the Founder' : 'تعرف على المؤسس'}
              <ArrowRight size={16} className={isEn ? '' : 'rotate-180'} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
