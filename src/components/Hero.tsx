import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowLeft, Monitor, ShoppingBag, Smartphone, Database, LineChart, BrainCircuit, Bot } from 'lucide-react';
import { triggerBookingModal } from './BookingModal';

const TYPEWRITER_PHRASES = [
  "نبني لك موقع يبيّن قوة بزنسك.",
  "نطلق متجرك جاهز للبيع ويكبر معاك.",
  "نبرمج لك نظام يحل لك كل مشاكل الشغل.",
  "نصمم برنامج محاسبي على مقاس عملياتك.",
  "نبني أنظمة ERP وCRM تضبط لك الإدارة.",
  "نحوّل الكتالوجات العادية لتجارب رقمية رهيبة.",
  "نطوّر تطبيقات مخصصة لفكرتك.",
  "نربط شغلك بالأتمتة والذكاء الاصطناعي.",
  "نحوّل فكرتك لمنتج رقمي حقيقي يشوف النور."
];

const SHOWCASE_ITEMS = [
  { id: 'web', icon: Monitor, label: 'موقع إلكتروني', color: 'var(--color-primary)', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { id: 'store', icon: ShoppingBag, label: 'Online Shop', color: 'var(--color-secondary)', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { id: 'market', icon: ShoppingBag, label: 'سوق إلكتروني', color: 'var(--color-accent)', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80' },
  { id: 'app', icon: Smartphone, label: 'تطبيق مخصص', color: 'var(--color-purple)', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
  { id: 'erp', icon: Database, label: 'نظام إداري ERP', color: 'var(--color-primary)', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
  { id: 'crm', icon: LineChart, label: 'نظام عملاء CRM', color: 'var(--color-secondary)', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { id: 'ai', icon: Bot, label: 'ذكاء اصطناعي', color: 'var(--color-accent)', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80' },
];

const DynamicTypewriter = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentPhrase) {
      // Pause at the end of typing
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      setTypingSpeed(60);
    } else {
      // Typing or deleting
      timer = setTimeout(() => {
        setDisplayedText((prev) => 
          isDeleting ? prev.slice(0, -1) : currentPhrase.slice(0, prev.length + 1)
        );
        setTypingSpeed(isDeleting ? 30 : 60);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <span className="inline">
      {displayedText}
      <span className="inline-block w-[3px] bg-[var(--color-primary)] h-[1.1em] align-middle animate-pulse mx-1 shrink-0 rounded-full" />
    </span>
  );
};

const InteractiveShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hovered]);

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto hidden lg:flex items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 via-[var(--color-secondary)]/10 to-transparent rounded-full blur-3xl scale-90" />
      
      {/* Central Hub */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Top Bar for Mockup */}
            <div className="absolute top-0 left-0 right-0 h-10 border-b border-[var(--border-default)] bg-[var(--surface-secondary)]/50 backdrop-blur-md flex items-center px-4 gap-2 z-20 rounded-t-2xl">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center p-8 mt-12 text-center h-full">
              {React.createElement(SHOWCASE_ITEMS[activeIndex].icon, {
                size: 64,
                strokeWidth: 1.5,
                style: { color: SHOWCASE_ITEMS[activeIndex].color },
                className: "mb-6 drop-shadow-lg"
              })}
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 bg-[var(--surface-primary)]/50 backdrop-blur-sm px-4 py-1 rounded-full">
                {SHOWCASE_ITEMS[activeIndex].label}
              </h3>
              <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ backgroundColor: SHOWCASE_ITEMS[activeIndex].color }} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Hero = () => {
  const { config, updateConfig } = useSite();

  if (!config.sections.hero) return null;

  const isEn = config.language === 'en';

  return (
    <section className="relative min-h-auto py-16 sm:py-20 md:py-24 lg:min-h-screen flex items-center overflow-hidden bg-[var(--surface-brand)]" id="hero">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-[0.25] pointer-events-none"
      >
        <source src="https://b.top4top.io/m_37896jjzf1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-brand)] via-transparent to-[var(--surface-brand)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.1] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0, x: isEn ? -20 : 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.7 }}
           className="rtl:text-right ltr:text-left flex flex-col items-start w-full max-w-full overflow-hidden"
           dir={isEn ? 'ltr' : 'rtl'}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs sm:text-sm font-medium mb-5 text-[var(--color-primary)] shrink-0 max-w-full">
            <Sparkles size={14} className="shrink-0" />
            <span className="font-bold truncate">{isEn ? 'Tech solutions tailored for your business' : 'حلول تقنية مصممة لأعمالك'}</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[62px] font-black mb-4 sm:mb-6 leading-tight tracking-tight text-[var(--text-primary)] break-words w-full overflow-wrap-anywhere">
            {config.heroTitle}
          </h1>
          
          <div className="text-base sm:text-xl md:text-2xl text-[var(--color-primary)] mb-4 font-bold min-h-[3rem] sm:min-h-[4rem] flex items-center w-full break-words overflow-wrap-anywhere">
            <DynamicTypewriter />
          </div>

          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] mb-6 sm:mb-8 leading-relaxed font-medium max-w-lg w-full break-words">
            {config.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <button
              onClick={() => { updateConfig({ currentRoute: 'start-project' }); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span>{config.heroButtonText}</span>
              <ArrowLeft size={18} className={isEn ? 'rotate-180 shrink-0' : 'shrink-0'} />
            </button>
            
            <button
              onClick={() => triggerBookingModal('استشارة مجانية')}
              className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-base text-[var(--text-secondary)] bg-[var(--surface-primary)] border border-[var(--border-default)] transition-all hover:bg-[var(--surface-secondary)] cursor-pointer"
            >
              {isEn ? 'Book a Free Consultation' : 'احجز استشارة مجانية'}
            </button>
          </div>

          <div className="mt-6 sm:mt-8 flex items-center gap-3 text-xs sm:text-sm text-[var(--text-muted)] font-medium bg-[var(--surface-secondary)] px-4 py-2.5 rounded-xl max-w-full">
            <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
            <span className="truncate">{isEn ? 'Full team for design, development, systems, and growth.' : 'فريق متكامل للتصميم، التطوير، الأنظمة والنمو.'}</span>
          </div>
        </motion.div>

        {/* Visual Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-full overflow-hidden"
        >
          <InteractiveShowcase />
        </motion.div>
        
      </div>
    </section>
  );
};

