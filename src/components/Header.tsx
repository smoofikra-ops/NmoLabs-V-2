import { getWhatsAppUrl } from '../lib/utils';
import React, { useEffect, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Moon, Sun, Menu, X, Bookmark } from 'lucide-react';
import { triggerBookingModal } from './BookingModal';
import siteLogo from '../assets/images/site-logo.png';


export const Header = () => {
  const { config, updateConfig } = useSite();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState<number>(0);

  const isEn = config.language === 'en';
  const mainNavItems = [
    { nameAr: 'الرئيسية', nameEn: 'Home', act: 'hero' },
    { nameAr: 'من نحن', nameEn: 'About Us', route: 'about' },
    { nameAr: 'ماذا نبني؟', nameEn: 'What We Build', act: 'story-solutions' },
    { nameAr: 'خدماتنا', nameEn: 'Services', route: 'services' },
    { nameAr: 'أعمالنا', nameEn: 'Work', route: 'work' },
    { nameAr: 'منتجاتنا', nameEn: 'Products', route: 'products' },
    { nameAr: 'مختبر الابتكارات', nameEn: 'Innovation Labs', route: 'innovation-lab' },
    { nameAr: 'كيف نعمل؟', nameEn: 'Workflow', route: 'about' },
    { nameAr: 'المدونة', nameEn: 'Blog', route: 'blog' },
    { nameAr: 'تواصل معنا', nameEn: 'Contact', act: 'contact' },
  ];

  const handleNavClick = (item: any, idx: number) => {
    setActiveNav(idx);
    setIsMobileMenuOpen(false);
    if (item.route) {
      updateConfig({ currentRoute: item.route });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleScroll(item.act);
    }
  };

  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    if (config.currentRoute && config.currentRoute !== 'home') {
      updateConfig({ currentRoute: 'home' });
      setTimeout(() => {
        if (id === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (id === 'contact') {
          const el = document.getElementById('contact') || document.getElementById('footer');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else if (config.contactNumber) window.open(getWhatsAppUrl(config.contactNumber), '_blank');
        } else {
          const target = document.getElementById(id) || (id === 'story-solutions' ? document.getElementById('whatToBuild') : null);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return;
    }

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'contact') {
      const el = document.getElementById('contact') || document.getElementById('footer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (config.contactNumber) window.open(getWhatsAppUrl(config.contactNumber), '_blank');
    } else {
      const target = document.getElementById(id) || (id === 'story-solutions' ? document.getElementById('whatToBuild') : null);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    const newTheme = config.theme === 'dark' ? 'light' : 'dark';
    updateConfig({ theme: newTheme });
    localStorage.setItem('nmo_user_theme', newTheme);
  };

  // Removed theme useEffect as it is now in SiteProvider

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-active');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-active');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-active');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const isEn = config.language === 'en';
    document.documentElement.dir = isEn ? 'ltr' : 'rtl';
    document.documentElement.lang = isEn ? 'en' : 'ar';
  }, [config.language]);

  const handleToggleLanguage = () => {
    updateConfig({ language: config.language === 'en' ? 'ar' : 'en' });
  };

  return (
    <>
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Announcement Bar */}
      <div className="bg-[var(--surface-primary)]/95 backdrop-blur-md border-b border-[var(--border-default)] px-4 py-1.5 flex items-center justify-between text-xs sm:text-sm text-[var(--text-secondary)] font-medium pointer-events-auto shadow-sm">
        <div className="overflow-hidden whitespace-nowrap flex-1 ml-4 lg:ml-8 relative">
           <div className={isEn ? "inline-block animate-marquee" : "inline-block animate-marquee-rtl"}>
             {isEn 
               ? "Welcome to NmoLabs! We are different from any other agency; we are your growth partner, not just a marketing company. ✨ We innovate exceptional ideas and solutions for your success. Stay tuned for our new innovative products and tools coming soon! 🚀 (Please note that the website and tools are currently under continuous development and innovation)."
               : "مرحباً بك في نمو لابز! نختلف عن أي شركة أخرى، فنحن شريك نمو لك ولسنا مجرد شركة تسويقية. ✨ نبتكر أفكاراً وحلولاً استثنائية لنجاحك. ترقبوا الإعلان عن منتجاتنا وأدواتنا الجديدة المبتكرة قريباً! 🚀 (يرجى العلم أن الموقع والأدوات حالياً قيد التطوير والابتكار المستمر لتلبية تطلعاتكم)."}
           </div>
        </div>
      </div>

      <div className="px-4 md:px-6 py-2.5 pointer-events-auto">
        <div className="w-full lg:w-fit mx-auto flex items-center justify-between lg:justify-center gap-3 lg:gap-8 bg-[var(--surface-primary)]/90 dark:bg-[var(--surface-primary)]/85 shadow-[var(--card-shadow-2)] border border-[var(--border-default)] rounded-full px-4 md:px-6 py-2 transition-all backdrop-blur-xl">
        <button 
          className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors p-2 rounded-xl hover:bg-[var(--surface-secondary)]"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label={isEn ? "Open main menu" : "فتح القائمة الرئيسية"}
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 gap-2 cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => handleScroll('hero')}>
          <img src={config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="hidden lg:block object-contain drop-shadow-sm" style={{ height: `${config.desktopLogoHeight || 36}px` }} />
          <img src={config.mobileLogoUrl || config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="block lg:hidden object-contain drop-shadow-sm" style={{ height: `${config.mobileLogoHeight || 28}px` }} />
        </div>

        <nav className="hidden lg:flex items-center gap-1 relative bg-[var(--surface-secondary)]/60 border border-[var(--border-default)] p-1 rounded-full" onMouseLeave={() => setHoveredNav(null)}>
          {mainNavItems.map((item, idx) => {
            const isHovered = hoveredNav === idx;
            const isActive = activeNav === idx;
            const hasLiquid = isHovered || (isActive && hoveredNav === null);
            return (
              <button 
                key={idx}
                onClick={() => handleNavClick(item, idx)}
                onMouseEnter={() => setHoveredNav(idx)}
                onFocus={() => setHoveredNav(idx)}
                className={`relative px-4 py-1.5 text-xs font-bold transition-all z-10 rounded-full flex items-center justify-center gap-1.5 ${hasLiquid ? 'text-[var(--color-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {hasLiquid && (
                  <motion.div
                    layoutId="nav-liquid-indicator"
                    className="absolute inset-0 bg-[var(--surface-primary)] border border-[var(--interactive-border)] rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                {isEn ? item.nameEn : item.nameAr}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 sm:gap-3 sm:mr-2 sm:border-r rtl:sm:border-r-0 rtl:sm:border-l border-[var(--border-default)] sm:pr-3 rtl:sm:pr-0 rtl:sm:pl-3">
            <button 
              onClick={handleToggleLanguage}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-secondary)] rounded-full transition-colors cursor-pointer"
              aria-label={isEn ? "Toggle Language" : "تغيير اللغة"}
            >
               <Globe size={18} />
            </button>
            {config.showThemeToggle && (
              <button 
                onClick={toggleTheme} 
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-secondary)] rounded-full transition-colors cursor-pointer" 
                aria-label={isEn ? "Toggle Theme" : "تغيير المظهر"}
              >
                {config.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>
          
          <button 
            onClick={() => { updateConfig({ currentRoute: 'kyc' }); window.scrollTo(0,0); }}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full font-bold text-xs text-white transition-all shadow-[0_4px_14px_rgba(15,98,254,0.35)] hover:shadow-[0_6px_20px_rgba(15,98,254,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {config.language === 'en' ? 'Start Project' : 'ابدأ مشروعك'}
          </button>
        </div>
      </div>
    </div>
  </motion.header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: config.language === 'en' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: config.language === 'en' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 w-[85%] max-w-[320px] h-[100dvh] bg-[var(--surface-primary)] border-[var(--border-default)] shadow-2xl z-[70] lg:hidden flex flex-col p-6 overflow-y-auto overscroll-none touch-pan-y ${config.language === 'en' ? 'left-0 border-r rounded-r-3xl' : 'right-0 border-l rounded-l-3xl'}`}
              dir={config.language === 'en' ? 'ltr' : 'rtl'}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-default)] shrink-0">
                <div className="flex items-center gap-2">
                  <img src={config.mobileLogoUrl || config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="object-contain drop-shadow-sm" style={{ height: `${config.mobileLogoHeight || 28}px` }} />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all bg-[var(--surface-secondary)] rounded-full"
                  aria-label={isEn ? "Close menu" : "إغلاق القائمة"}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-2 flex-1 justify-start overflow-y-auto">
                {mainNavItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item, idx)}
                    className="text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] py-3 px-4 rounded-xl w-full font-bold transition-all duration-200 text-sm flex items-center gap-3 border border-[var(--border-default)] shadow-sm min-h-[44px]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                    <span className="truncate">{isEn ? item.nameEn : item.nameAr}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-default)] flex flex-col gap-3 shrink-0">
                <div className="flex items-center justify-center gap-3">
                  {config.showThemeToggle && (
                    <button onClick={toggleTheme} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-3 bg-[var(--surface-secondary)] rounded-xl flex-1 flex justify-center cursor-pointer border border-[var(--border-default)]">
                      {config.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  )}
                  <button 
                    onClick={handleToggleLanguage}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-english text-sm font-bold flex items-center justify-center gap-2 p-3 bg-[var(--surface-secondary)] rounded-xl flex-1 cursor-pointer border border-[var(--border-default)]"
                  >
                    <Globe size={18} />
                    {config.language === 'en' ? 'عربي' : 'English'}
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    updateConfig({ currentRoute: 'kyc' }); 
                    window.scrollTo(0, 0);
                  }}
                  className="w-full py-3.5 rounded-xl font-bold text-white transition-transform active:scale-95 cursor-pointer shadow-[0_4px_14px_rgba(15,98,254,0.4)] text-sm flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span>{config.language === 'en' ? 'Start Project' : 'ابدأ مشروعك'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
