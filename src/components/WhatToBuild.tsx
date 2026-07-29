import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { Globe, ShoppingBag, Smartphone, Database, LineChart, FileText, Blocks, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import { triggerBookingModal } from './BookingModal';

const BUILD_OPTIONS = [
  { id: 'website', title: 'موقع إلكتروني احترافي', titleEn: 'Professional Website', desc: 'يعبر عن هويتك ويجذب العملاء', descEn: 'Reflects your identity and attracts customers', icon: Globe, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { id: 'landing', title: 'صفحة تعريفية Landing Page', titleEn: 'Landing Page', desc: 'لإطلاق الحملات الإعلانية والمنتجات', descEn: 'For launching ad campaigns and products', icon: FileText, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { id: 'store', title: 'متجر إلكتروني', titleEn: 'E-Commerce Store', desc: 'متجر متكامل جاهز للبيع', descEn: 'Full-featured ready-to-sell store', icon: ShoppingBag, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { id: 'catalog', title: 'كتالوج رقمي', titleEn: 'Digital Catalog', desc: 'استعراض تفاعلي لمنتجاتك وخدماتك', descEn: 'Interactive showcase of your products & services', icon: Blocks, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80' },
  { id: 'app', title: 'تطبيق مخصص', titleEn: 'Custom Mobile App', desc: 'تطبيق جوال مبتكر لعملائك', descEn: 'Innovative mobile app for your clients', icon: Smartphone, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
  { id: 'system', title: 'نظام إداري أو محاسبي', titleEn: 'Admin / Accounting System', desc: 'لإدارة عملياتك وموظفيك', descEn: 'Manage operations and employees', icon: Database, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { id: 'erp_crm', title: 'نظام ERP أو CRM', titleEn: 'ERP / CRM System', desc: 'إدارة متكاملة للموارد والعملاء', descEn: 'Integrated resource & customer management', icon: LineChart, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { id: 'ai', title: 'حل مخصص بالذكاء الاصطناعي', titleEn: 'Custom AI Solution', desc: 'أتمتة وتحليل متقدم للبيانات', descEn: 'Advanced automation and data analytics', icon: Bot, image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80' },
];

export const WhatToBuild = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  const isRtl = !isEn;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

  const total = BUILD_OPTIONS.length;

  const nextSlide = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  React.useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minDistance = 40;
    if (Math.abs(distance) > minDistance) {
      if (distance > 0) {
        isRtl ? nextSlide() : nextSlide();
      } else {
        isRtl ? prevSlide() : prevSlide();
      }
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  if (config.sections.whatToBuild === false) return null;

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden" id="whatToBuild">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full max-h-[500px] bg-[var(--color-primary)]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs sm:text-sm font-semibold mb-3">
            {isEn ? 'Custom Solutions' : 'حلول رقمية متكاملة'}
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-[var(--text-primary)]">
            {isEn ? 'What would you like us to build for you?' : 'وش ودك نبني لك؟'}
          </h2>
          <p className="text-sm sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-light">
            {isEn ? 'Choose the solution you need, and we will turn it into a complete digital project.' : 'اختار الحل اللي تحتاجه، وإحنا نضبطك ونحوله لمشروع رقمي متكامل.'}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative w-full max-w-5xl mx-auto py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-40 pointer-events-none px-1 sm:px-4">
            <button
              onClick={isRtl ? nextSlide : prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-[var(--text-primary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] flex items-center justify-center transition-all duration-300 shadow-lg pointer-events-auto hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Previous slide"
            >
              {isRtl ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </button>
            <button
              onClick={isRtl ? prevSlide : nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-[var(--text-primary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] flex items-center justify-center transition-all duration-300 shadow-lg pointer-events-auto hover:scale-110 active:scale-95 cursor-pointer"
              aria-label="Next slide"
            >
              {isRtl ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </button>
          </div>

          {/* Cards Track */}
          <div 
            className="overflow-hidden px-2 sm:px-4 py-8 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex items-center justify-center min-h-[330px] sm:min-h-[380px] relative">
              {BUILD_OPTIONS.map((option, index) => {
                let offset = index - activeIndex;
                if (offset < -total / 2) offset += total;
                if (offset > total / 2) offset -= total;

                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={option.id}
                    initial={false}
                    animate={{
                      x: offset * (isRtl ? -270 : 270),
                      scale: isCenter ? 1.08 : Math.abs(offset) === 1 ? 0.86 : 0.72,
                      opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.2,
                      zIndex: isCenter ? 30 : 30 - Math.abs(offset) * 10,
                      rotateY: offset * (isRtl ? 8 : -8),
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIndex(index);
                      } else {
                        triggerBookingModal(isEn ? option.titleEn || option.title : option.title);
                      }
                    }}
                    className={`absolute w-[250px] xs:w-[280px] sm:w-[320px] md:w-[340px] rounded-3xl cursor-pointer group transition-all duration-500 overflow-hidden border ${
                      isCenter
                        ? 'border-[var(--color-primary)] shadow-[0_12px_40px_rgba(79,142,247,0.3)] bg-[var(--surface-secondary)]'
                        : 'border-[var(--border-default)] bg-[var(--surface-secondary)]/80 hover:border-[var(--color-primary)]/50'
                    }`}
                  >
                    {/* Background Image that zooms on center */}
                    <div 
                      className={`absolute inset-0 z-0 bg-cover bg-center transition-all duration-700 ${
                        isCenter ? 'opacity-40 scale-110 group-hover:scale-115' : 'opacity-15 scale-100'
                      }`}
                      style={{ backgroundImage: `url(${option.image})` }}
                    />
                    <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                      isCenter 
                        ? 'bg-gradient-to-t from-[var(--surface-primary)] via-[var(--surface-primary)]/85 to-[var(--surface-primary)]/40' 
                        : 'bg-[var(--surface-primary)]/85'
                    }`} />

                    {/* Card Content */}
                    <div className="relative z-20 p-5 sm:p-8 flex flex-col justify-between h-[290px] sm:h-[340px]">
                      <div>
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 border transition-all duration-500 shadow-md ${
                          isCenter
                            ? 'bg-[var(--color-primary)] text-[var(--text-primary)] border-[var(--color-primary)] scale-110'
                            : 'bg-[var(--surface-tertiary)] text-[var(--color-primary)] border-[var(--border-default)]'
                        }`}>
                          {React.createElement(option.icon, {
                            size: 26,
                            className: "transition-transform duration-300 group-hover:scale-110"
                          })}
                        </div>
                        <h3 className={`font-bold mb-2 sm:mb-3 text-base sm:text-xl md:text-2xl leading-tight transition-colors ${
                          isCenter ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                        }`}>
                          {isEn ? option.titleEn || option.title : option.title}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-3 transition-colors ${
                          isCenter ? 'text-[var(--text-muted)] font-normal' : 'text-[var(--text-muted)]/70 font-light'
                        }`}>
                          {isEn ? option.descEn || option.desc : option.desc}
                        </p>
                      </div>

                      <div className="mt-3 sm:mt-4 flex items-center justify-between border-t border-[var(--border-default)]/60 pt-3 sm:pt-4">
                        <span className={`text-xs font-bold transition-opacity ${
                          isCenter ? 'text-[var(--color-primary)] opacity-100' : 'text-[var(--text-muted)] opacity-60'
                        }`}>
                          {isEn ? (isCenter ? 'Tap to request' : 'View') : (isCenter ? 'انقر للطلب' : 'استعراض')}
                        </span>
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                          isCenter
                            ? 'bg-[var(--color-primary)] text-[var(--text-primary)] scale-105 shadow-[0_0_15px_var(--color-primary)]'
                            : 'bg-[var(--surface-tertiary)] text-[var(--text-muted)]'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isRtl ? 'rotate-180' : ''}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
            {BUILD_OPTIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? 'w-8 h-2.5 bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]'
                    : 'w-2.5 h-2.5 bg-[var(--border-default)] hover:bg-[var(--text-muted)]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

