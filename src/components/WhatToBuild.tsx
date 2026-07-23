import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { Globe, ShoppingBag, Smartphone, Database, LineChart, FileText, Blocks, Bot } from 'lucide-react';
import { triggerBookingModal } from './BookingModal';

const BUILD_OPTIONS = [
  { id: 'website', title: 'موقع إلكتروني احترافي', desc: 'يعبر عن هويتك ويجذب العملاء', icon: Globe, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
  { id: 'landing', title: 'صفحة تعريفية Landing Page', desc: 'لإطلاق الحملات الإعلانية والمنتجات', icon: FileText, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
  { id: 'store', title: 'متجر إلكتروني', desc: 'متجر متكامل جاهز للبيع', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80' },
  { id: 'catalog', title: 'كتالوج رقمي', desc: 'استعراض تفاعلي لمنتجاتك وخدماتك', icon: Blocks, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80' },
  { id: 'app', title: 'تطبيق مخصص', desc: 'تطبيق جوال مبتكر لعملائك', icon: Smartphone, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80' },
  { id: 'system', title: 'نظام إداري أو محاسبي', desc: 'لإدارة عملياتك وموظفيك', icon: Database, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
  { id: 'erp_crm', title: 'نظام ERP أو CRM', desc: 'إدارة متكاملة للموارد والعملاء', icon: LineChart, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
  { id: 'ai', title: 'حل مخصص بالذكاء الاصطناعي', desc: 'أتمتة وتحليل متقدم للبيانات', icon: Bot, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80' },
];

export const WhatToBuild = () => {
  const { config } = useSite();

  if (config.sections.whatToBuild === false) return null;

  return (
    <section className="py-16 sm:py-24 relative" id="whatToBuild">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full max-h-[600px] bg-[var(--color-primary)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-[var(--text-primary)]">وش ودك نبني لك؟</h2>
          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            اختار الحل اللي تحتاجه، وإحنا نضبطك ونحوله لمشروع رقمي متكامل.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {BUILD_OPTIONS.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => triggerBookingModal(option.title)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-500 hover:-translate-y-2  glass-card min-h-[220px]"
            >
              {/* Background Image that appears on hover */}
              <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 bg-cover bg-center transition-all duration-700 scale-110 group-hover:scale-100"
                style={{ backgroundImage: `url(${option.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-[var(--surface-primary)]/90 to-[var(--surface-primary)]/80 z-10 transition-opacity duration-500 group-hover:opacity-90" />
              
              <div className="relative z-20 p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-secondary)]/80 backdrop-blur-md flex items-center justify-center mb-4 border border-[var(--border-default)] group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/10 transition-all duration-300 shadow-sm">
                    {React.createElement(option.icon, {
                      size: 24,
                      className: "text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300"
                    })}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-2 text-sm md:text-lg leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] line-clamp-2">
                    {option.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-tertiary)] flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-[var(--text-primary)] transition-all duration-300 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={config.language === 'en' ? '' : 'rotate-180'}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
