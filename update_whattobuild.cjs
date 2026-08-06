const fs = require('fs');
let code = `
import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { Globe, ShoppingBag, Smartphone, Database, LineChart, FileText, Blocks, Bot, ArrowRight, ArrowLeft } from 'lucide-react';
import { triggerBookingModal } from './BookingModal';

const BUILD_OPTIONS = [
  { id: 'store', title: 'متجر إلكتروني', titleEn: 'E-Commerce Store', desc: 'متجر متكامل جاهز للبيع', descEn: 'Full-featured ready-to-sell store', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80' },
  { id: 'app', title: 'تطبيق مخصص', titleEn: 'Custom Mobile App', desc: 'تطبيق جوال مبتكر لعملائك', descEn: 'Innovative mobile app for your clients', icon: Smartphone, image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80' },
  { id: 'ai', title: 'حل بالذكاء الاصطناعي', titleEn: 'Custom AI Solution', desc: 'أتمتة وتحليل متقدم للبيانات', descEn: 'Advanced automation and data analytics', icon: Bot, image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80' },
  { id: 'erp_crm', title: 'نظام إداري ERP', titleEn: 'ERP / CRM System', desc: 'إدارة متكاملة للموارد والعملاء', descEn: 'Integrated resource & customer management', icon: LineChart, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { id: 'website', title: 'موقع احترافي', titleEn: 'Professional Website', desc: 'يعبر عن هويتك ويجذب العملاء', descEn: 'Reflects your identity and attracts customers', icon: Globe, image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80' },
];

export const WhatToBuild = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  const isRtl = !isEn;

  return (
    <section className="py-10 sm:py-16 md:py-24 relative overflow-hidden bg-[var(--surface-primary)] border-t border-[var(--border-default)]">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--color-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-default)] text-xs font-bold uppercase mb-4 text-[var(--color-primary)] bg-[var(--surface-secondary)]"
          >
            {isEn ? 'Discover Opportunities' : 'اكتشف فرص النمو'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-[var(--text-primary)]"
          >
            {isEn ? 'What are you looking to build?' : 'ماذا تفكر أن تبني؟'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed"
          >
            {isEn 
              ? 'Select the type of project you want to start, and let us handle the technical execution from concept to launch.' 
              : 'اختر نوع المشروع الذي ترغب في إطلاقه، ودعنا نتولى التنفيذ التقني من الفكرة وحتى الإطلاق.'}
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[240px]">
          {BUILD_OPTIONS.map((option, idx) => {
            let gridClass = 'col-span-1 row-span-1';
            
            // Dynamic Bento Layout
            if (idx === 0) gridClass = 'col-span-2 row-span-2'; // E-commerce (Large Feature)
            if (idx === 1) gridClass = 'col-span-2 md:col-span-1 row-span-1'; // App
            if (idx === 2) gridClass = 'col-span-1 md:col-span-1 row-span-1 lg:row-span-2'; // AI
            if (idx === 3) gridClass = 'col-span-1 md:col-span-2 lg:col-span-1 row-span-1'; // ERP
            if (idx === 4) gridClass = 'col-span-2 md:col-span-1 lg:col-span-2 row-span-1'; // Website

            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => triggerBookingModal(isEn ? option.titleEn : option.title)}
                className={\`group relative rounded-3xl overflow-hidden cursor-pointer \${gridClass}\`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={option.image} 
                    alt={isEn ? option.titleEn : option.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-6 lg:p-8 hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center mb-4 sm:mb-auto group-hover:bg-[var(--color-primary)] group-hover:border-[var(--color-primary)] transition-colors duration-300">
                    {React.createElement(option.icon, { size: idx === 0 ? 24 : 20 })}
                  </div>
                  
                  <div>
                    <h3 className={\`font-black text-white mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text \${idx === 0 ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-xl'}\`} style={{ backgroundImage: 'linear-gradient(to right, #fff, var(--color-primary))' }}>
                      {isEn ? option.titleEn : option.title}
                    </h3>
                    <p className={\`text-white/60 font-light line-clamp-2 \${idx === 0 ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}\`}>
                      {isEn ? option.descEn : option.desc}
                    </p>
                  </div>
                  
                  {/* Action Arrow (only visible on hover for desktop, always on for mobile if we wanted, but hover is fine) */}
                  <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                    {isEn ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
`
fs.writeFileSync('src/components/WhatToBuild.tsx', code);
