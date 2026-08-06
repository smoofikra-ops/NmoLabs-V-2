const fs = require('fs');

let code = `
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { servicesList } from '../data/services';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export const Services: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!config.sections.services) return null;

  const techServices = servicesList.filter(s => ['ecommerce-setup', 'ui-ux'].includes(s.id));
  const marketingServices = servicesList.filter(s => ['ads-management', 'social-media', 'seo', 'copywriting'].includes(s.id));

  const groups = [
    {
      id: 'tech',
      title: isEn ? 'Development & Design' : 'التطوير والتصميم',
      desc: isEn ? 'Build a solid digital foundation.' : 'بناء أساس رقمي متين.',
      items: techServices
    },
    {
      id: 'marketing',
      title: isEn ? 'Marketing & Growth' : 'التسويق والنمو',
      desc: isEn ? 'Scale your audience and sales.' : 'توسيع نطاق المبيعات والجمهور.',
      items: marketingServices
    }
  ];

  return (
    <section className="py-10 sm:py-16 md:py-24 relative z-10 bg-[var(--surface-primary)] border-y border-[var(--border-default)]" id="services" ref={sectionRef}>
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[var(--surface-secondary)] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10 lg:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-[var(--border-default)] text-xs font-bold uppercase mb-4 text-[var(--color-primary)] tracking-widest"
          >
            {isEn ? 'Our Expertise' : 'حلول نمو ذكية'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-5xl font-black mb-4 tracking-tight text-[var(--text-primary)]"
          >
            {isEn ? 'Services built to scale' : 'خدمات تُبنى لتتوسع'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto font-light leading-relaxed"
          >
            {isEn 
              ? 'We group our capabilities to provide end-to-end support for your digital products.'
              : 'نجمع خبراتنا لتقديم دعم متكامل ومستدام لمنتجاتك ومشاريعك الرقمية.'}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {groups.map((group, gIdx) => (
            <motion.div 
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gIdx * 0.1 }}
              className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-6 sm:p-8"
            >
              <div className="mb-6 pb-6 border-b border-[var(--border-default)]">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">{group.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{group.desc}</p>
              </div>
              
              <div className="space-y-4">
                {group.items.map((service) => {
                  const isExpanded = expandedId === service.id;
                  return (
                    <div 
                      key={service.id}
                      className="bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-2xl overflow-hidden transition-all duration-300"
                    >
                      <button 
                        onClick={() => setExpandedId(isExpanded ? null : service.id)}
                        className="w-full text-left flex items-center gap-4 p-4 hover:bg-[var(--surface-tertiary)] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--color-primary)] flex items-center justify-center shrink-0">
                          {React.cloneElement(service.icon as React.ReactElement, { size: 18 })}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm sm:text-base text-[var(--text-primary)]">
                            {isEn ? service.titleEn : service.title}
                          </h4>
                        </div>
                        <div className="text-[var(--text-muted)] shrink-0">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>
                      
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 pt-0">
                              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 pl-14">
                                {isEn ? service.descEn || service.desc : service.desc}
                              </p>
                              <div className="pl-14">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateConfig({ currentRoute: \`services/\${service.id}\` });
                                  }}
                                  className="text-[11px] font-bold text-white bg-[var(--color-primary)] hover:bg-blue-600 px-4 py-2 rounded-full transition-colors flex items-center gap-1 w-fit"
                                >
                                  {isEn ? 'View Details' : 'عرض التفاصيل'}
                                  {isEn ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`
fs.writeFileSync('src/components/Services.tsx', code);
