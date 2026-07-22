import React, { useState, useRef, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { servicesList } from '../data/services';

export const Services = () => {
  const { config, updateConfig } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 1024);
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 0]);

  if (!config.sections.services) return null;

  return (
    <section className="py-16 sm:py-24 md:py-32 relative z-10 bg-radial-glow" id="services" ref={sectionRef}>
      {/* Dark gradient fade from top */}
      <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[var(--surface-primary)] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[var(--color-primary)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-[var(--border-default)] text-sm font-medium mb-6 text-[var(--text-muted)]"
          >
            حلول نمو ذكية
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight text-[var(--text-primary)]"
          >
            خدمات التسويق المتكاملة
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-3xl mx-auto font-light"
          >
            حلول تسويق احترافية لبناء حضور رقمي قوي وتحقيق نمو حقيقي ومستدام.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {servicesList.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                style={{ y: isLargeScreen ? (index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3) : 0 }}
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="hover:-translate-y-2 transition-all duration-500 rounded-3xl overflow-hidden group relative flex flex-col h-full shadow-md border border-[var(--border-default)] hover:border-[var(--color-primary)] hover:shadow-[inset_0_4px_15px_rgba(0,0,0,1),0_0_20px_rgba(79,142,247,0.3)] bg-[var(--surface-secondary)] cursor-pointer"
                  onClick={() => updateConfig({ currentRoute: `services/${service.id}` })}
                >
                  {/* Hover Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0" />
                  
                  {/* Animated Border Top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out opacity-0 group-hover:opacity-100 z-20" />
                  
                  {service.image && (
                    <>
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-all duration-700 group-hover:blur-sm group-hover:scale-105 opacity-60 group-hover:opacity-40" 
                        />
                      </div>
                      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--surface-secondary)] via-[var(--surface-secondary)]/80 to-[var(--surface-secondary)]/60 pointer-events-none" />
                    </>
                  )}
                  
                  <div className="p-4 sm:p-8 relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-8">
                      <div 
                        className="p-4 rounded-2xl transition-all duration-500 bg-[var(--surface-tertiary)] shadow-sm border border-[var(--border-default)] text-[var(--color-primary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--color-primary)] group-hover:shadow-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3"
                      >
                        {service.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-2xl font-bold mb-3 text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">{service.title}</h3>
                    <p className="text-[var(--text-muted)] leading-relaxed text-xs sm:text-sm lg:text-base font-light mb-8 flex-1 line-clamp-4">
                      {service.desc}
                    </p>

                    {/* Section Divider with animation */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-default)] group-hover:via-[var(--color-primary)] to-transparent mb-6 transition-colors duration-500"></div>

                    <button 
                      className="flex items-center gap-2 text-[var(--color-primary)] group-hover:text-[var(--text-primary)] font-bold mt-auto hover:gap-3 transition-all duration-300"
                    >
                      تفاصيل أكثر
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};
