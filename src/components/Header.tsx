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
    { nameAr: 'ماذا نبني؟', nameEn: 'What We Build', act: 'whatToBuild' },
    { nameAr: 'خدماتنا', nameEn: 'Services', act: 'services' },
    { nameAr: 'أعمالنا', nameEn: 'Work', route: 'work' },
    { nameAr: 'منتجاتنا', nameEn: 'Products', route: 'products' },
    { nameAr: 'مختبر الابتكارات', nameEn: 'Innovation Labs', route: 'innovation-lab' },
    { nameAr: 'كيف نعمل؟', nameEn: 'Workflow', act: 'workflow' },
    { nameAr: 'المدونة', nameEn: 'Blog', act: 'blog' },
    { nameAr: 'تواصل معنا', nameEn: 'Contact', act: 'contact' },
  ];

  const handleNavClick = (item: any, idx: number) => {
    setActiveNav(idx);
    setIsMobileMenuOpen(false);
    if (item.route) {
      updateConfig({ currentRoute: item.route });
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else {
      handleScroll(item.act);
    }
  };

  const handleScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    if (config.currentRoute && config.currentRoute !== 'home') {
      updateConfig({ currentRoute: 'home' });
      setTimeout(() => {
        if(id === 'hero') window.scrollTo({top: 0, behavior: 'smooth'});
        else if(id === 'contact' && config.contactNumber) {
          window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');
        } else {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    if(id === 'hero') window.scrollTo({top: 0, behavior: 'smooth'});
    else if(id === 'contact' && config.contactNumber) {
      window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTheme = () => {
    const newTheme = config.theme === 'dark' ? 'light' : 'dark';
    updateConfig({ theme: newTheme });
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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--surface-primary)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-default)]/60 rounded-2xl px-4 md:px-6 py-3 transition-colors backdrop-blur-xl">
        <button 
          className="lg:hidden text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label={isEn ? "Open main menu" : "فتح القائمة الرئيسية"}
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('hero')}>
          <img src={config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="hidden lg:block object-contain drop-shadow-[0_0_15px_rgba(79,142,247,0.3)]" style={{ height: `${config.desktopLogoHeight || 44}px` }} />
          <img src={config.mobileLogoUrl || config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="block lg:hidden object-contain drop-shadow-[0_0_15px_rgba(79,142,247,0.3)]" style={{ height: `${config.mobileLogoHeight || 40}px` }} />
        </div>
        <nav className="hidden lg:flex items-center gap-1 relative border border-[var(--interactive-border-hover)] p-1 rounded-2xl" onMouseLeave={() => setHoveredNav(null)}>
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
                className={`relative px-4 py-2 text-sm font-medium transition-colors z-10 border border-transparent rounded-xl flex items-center justify-center gap-1.5 ${hasLiquid ? 'text-[var(--text-primary)] border-[var(--interactive-border-active)]' : 'text-[var(--text-secondary)] hover:border-[var(--interactive-border-hover)]'}`}
              >
                {hasLiquid && (
                  <motion.div
                    layoutId="nav-liquid-indicator"
                    className="absolute inset-0 bg-[var(--liquid-indicator-bg)] border border-[var(--liquid-indicator-border)] rounded-xl -z-10 shadow-[var(--interactive-glow)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {hasLiquid && <Bookmark size={14} className="shrink-0" />}
                {isEn ? item.nameEn : item.nameAr}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 border-l border-[var(--border-default)] pl-4 ml-2">
            {config.showThemeToggle && (
              <button onClick={toggleTheme} className="p-2 rounded-xl border border-transparent text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--interactive-border-hover)] focus:border-[var(--interactive-border-active)] transition-all cursor-pointer">
                {config.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button 
              onClick={handleToggleLanguage}
              className="p-2 rounded-xl border border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--interactive-border-hover)] focus:border-[var(--interactive-border-active)] transition-all font-english text-sm font-medium flex items-center gap-1 cursor-pointer"
            >
              <Globe size={18} />
              {config.language === 'en' ? 'عربي' : 'EN'}
            </button>
          </div>
          <button 
            onClick={() => { updateConfig({ currentRoute: 'start-project' }); window.scrollTo(0,0); }}
            className="hidden sm:block px-6 py-2.5 rounded-xl font-bold text-sm text-white hover:opacity-90 transition-all shadow-md hover:shadow-lg cursor-pointer border border-[var(--color-secondary)]/50"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {config.language === 'en' ? 'Start Project' : 'ابدأ مشروعك'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[var(--surface-secondary)] backdrop-blur-md z-[60] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: config.language === 'en' ? '-120%' : '120%' }}
              animate={{ x: 0 }}
              exit={{ x: config.language === 'en' ? '-120%' : '120%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-4 bottom-4 w-[85%] max-w-[320px] bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-2xl z-[70] lg:hidden flex flex-col p-6 overflow-y-auto rounded-3xl ${config.language === 'en' ? 'left-4' : 'right-4'}`}
              dir={config.language === 'en' ? 'ltr' : 'rtl'}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-default)]">
                <div className="flex items-center gap-2">
                  <img src={config.mobileLogoUrl || config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="object-contain drop-shadow-[0_0_15px_rgba(79,142,247,0.3)]" style={{ height: `${config.mobileLogoHeight || 40}px` }} />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all bg-[var(--surface-secondary)] rounded-full"
                  aria-label={isEn ? "Close menu" : "إغلاق القائمة"}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                {mainNavItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavClick(item, idx)}
                    className="text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-secondary)] py-3 px-3.5 rounded-xl w-full font-bold transition-all text-sm flex items-center gap-3 border border-transparent"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                    <span className="truncate">{isEn ? item.nameEn : item.nameAr}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--border-default)] flex flex-col gap-4">
                <div className="flex items-center justify-center gap-4">
                  {config.showThemeToggle && (
                    <button onClick={toggleTheme} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-3.5 bg-[var(--surface-secondary)] rounded-xl flex-1 flex justify-center cursor-pointer">
                      {config.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                  )}
                  <button 
                    onClick={handleToggleLanguage}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors font-english text-sm font-bold flex items-center justify-center gap-2 p-3.5 bg-[var(--surface-secondary)] rounded-xl flex-1 cursor-pointer"
                  >
                    <Globe size={18} />
                    {config.language === 'en' ? 'عربي' : 'English'}
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    { updateConfig({ currentRoute: 'start-project' }); window.scrollTo(0, 0); }
                  }}
                  className="w-full py-4 rounded-xl font-bold text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer shadow-lg relative overflow-hidden group"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span className="relative z-10">{config.language === 'en' ? 'Start Project' : 'ابدأ مشروعك'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
