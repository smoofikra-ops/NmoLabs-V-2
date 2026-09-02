import { getWhatsAppUrl } from '../lib/utils';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { UserRound, FlaskConical } from 'lucide-react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSite, SocialLink } from '../context/SiteContext';
import siteLogo from '../assets/images/site-logo.png';

const getSocialSvg = (icon: string) => {
  switch (icon) {
    case 'Instagram': 
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E1306C]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
    case 'Twitter': 
    case 'X':
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.03z"/></svg>;
    case 'TikTok': 
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-white drop-shadow-[1px_1px_0_#00f2fe]"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>;
    case 'Snapchat': 
      return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-[#FFFC00] drop-shadow-sm"><path d="M22.54 16.42c-.08-.14-1.3-1.07-2.39-1.63-.48-.25-1.03-.49-1.57-.7 0-.02 0-.04 0-.05.15-.36.43-1.02.58-1.54.19-.65.23-.92.23-1 0-.15-.05-.28-.2-.36-.18-.1-.4-.1-.58 0-.17.09-.27.24-.3.41-.05.27-.22.84-.36 1.15a13.9 13.9 0 0 1-1.05-1.42c-.41-.5-1.28-1.43-2.14-2.11-.84-.66-1.58-.87-2.03-.87-.45 0-1.19.21-2.03.87-.86.68-1.73 1.61-2.14 2.11-.38.48-.74.96-1.05 1.42-.14-.31-.31-.88-.36-1.15-.03-.17-.13-.32-.3-.41-.18-.1-.4-.1-.58 0-.15.08-.2.21-.2.36 0 .08.04.35.23 1 .15.52.43 1.18.58 1.54 0 .01 0 .03 0 .05-.54.21-1.09.45-1.57.7-1.09.56-2.31 1.49-2.39 1.63-.09.15-.15.34-.13.51.02.17.11.33.25.43.27.18 1.19.5 2.15.54.2 0 .42-.02.66-.08.28 1.1.72 1.68.96 1.95.27.31.62.48 1.05.51h.14c.26 0 .5-.05.74-.15.34-.14.73-.39 1.19-.65.48-.27 1.02-.57 1.62-.57.6 0 1.14.3 1.62.57.46.26.85.51 1.19.65.24.1.48.15.74.15h.14c.43-.03.78-.2 1.05-.51.24-.27.68-.85.96-1.95.24.06.46.08.66.08.96-.04 1.88-.36 2.15-.54.14-.1.23-.26.25-.43.02-.17-.04-.36-.13-.51z"/></svg>;
    case 'Ghost': return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 10h.01"/><path d="M15 10h.01"/><path d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"/></svg>;
    case 'Facebook': return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1877F2]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
    case 'Linkedin': return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0A66C2]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
    default: return <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/></svg>;
  }
};

export const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { config, updateConfig } = useSite();
  const currentYear = new Date().getFullYear();
  const isEn = config.language === 'en';

  const clickCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleNmoLabsClick = () => {
    if (clickCountRef.current === 0) {
      clickCountRef.current = 1;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
        timerRef.current = null;
      }, 2000);
    } else {
      clickCountRef.current += 1;
      if (clickCountRef.current >= 5) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        clickCountRef.current = 0;
        window.dispatchEvent(new CustomEvent('nmolabs:open-admin-access'));
      }
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleScroll = (id: string) => {
    if (id === 'contact' && config.contactNumber) {
      window.open(getWhatsAppUrl(config.contactNumber), '_blank');
      return;
    }
    if (config.currentRoute && config.currentRoute !== 'home') {
      updateConfig({ currentRoute: 'home' });
      setTimeout(() => {
        if(id === 'hero') window.scrollTo({top: 0, behavior: 'smooth'});
        else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    if(id === 'hero') window.scrollTo({top: 0, behavior: 'smooth'});
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const companyLinks = [
    { nameAr: 'من نحن', nameEn: 'About Us', route: 'about' },
    { nameAr: 'خدماتنا', nameEn: 'Services', route: 'services' },
    { nameAr: 'أعمالنا والمشاريع', nameEn: 'Our Works', route: 'work' },
    { nameAr: 'مختبر الابتكارات', nameEn: 'Innovation Lab', route: 'innovation-lab' },
    { nameAr: 'المؤسس والرئيس التنفيذي', nameEn: 'Founder & CEO', route: 'founder' },
  ];

  const productLinks = [
    { nameAr: 'المنتجات الذكية', nameEn: 'Products', route: 'products' },
    { nameAr: 'المدونة التقنية', nameEn: 'Blog & Articles', route: 'blog' },
    { nameAr: 'الأسئلة الشائعة', nameEn: 'FAQ', route: 'faq' },
    { nameAr: 'سياسة الخصوصية', nameEn: 'Privacy Policy', route: 'privacy' },
    { nameAr: 'شروط الاستخدام', nameEn: 'Terms of Use', route: 'terms' },
  ];

  return (
    <footer id="contact" className="border-t border-[var(--border-default)] pt-14 md:pt-20 pb-10 relative z-20 bg-[var(--surface-primary)] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
          
          {/* Logo and About Us */}
          <div className="space-y-5 flex flex-col items-center lg:items-start text-center lg:text-start">
            <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onClick={() => handleScroll('hero')}>
              <img src={config.desktopLogoUrl || siteLogo} alt="NMOLABS Logo" className="h-14 md:h-16 object-contain drop-shadow-sm" />
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm">
              {config.footerDescription || (isEn 
                ? "NmoLabs is your dedicated technology growth partner, engineering bespoke enterprise software, digital systems, and AI-powered growth engines."
                : "نمو لابز هو شريكك التقني للنمو المتسارع، نصمم ونبني منظومات برمجية ذكية، حلولاً تقنية متقدمة، وأدوات رقمية تسهم في تعظيم أثر أعمالك.")}
            </p>
            <div className="flex gap-2.5 flex-wrap justify-center lg:justify-start pt-2">
              {config.socialLinks?.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  title={link.name} 
                  className="w-9 h-9 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent hover:shadow-md transition-all duration-200"
                >
                  {getSocialSvg(link.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="relative" onMouseLeave={() => setHoveredLink(null)}>
            <button onClick={() => toggleSection('company')} className="w-full flex md:hidden items-center justify-between cursor-pointer focus:outline-none border-b border-[var(--border-default)] pb-3 mb-4">
              <h4 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider">
                {isEn ? 'Company & Solutions' : 'الشركة والحلول'}
              </h4>
              <span className="text-[var(--color-primary)] font-bold text-lg">
                {openSection === 'company' ? '-' : '+'}
              </span>
            </button>
            <div className="hidden md:block mb-5 text-right rtl:text-right ltr:text-left">
              <h4 className="text-[var(--text-primary)] font-bold text-base uppercase tracking-wider">
                {isEn ? 'Company & Solutions' : 'الشركة والحلول'}
              </h4>
            </div>
            <div className={`flex-col gap-1.5 relative z-10 md:flex ${openSection === 'company' ? 'flex' : 'hidden'}`}>
              {companyLinks.map((link, idx) => {
                const id = 'company-link-' + idx;
                const isHovered = hoveredLink === id;
                return (
                  <button 
                    key={idx}
                    onMouseEnter={() => setHoveredLink(id)}
                    onClick={() => {
                      if (link.route) {
                        updateConfig({ currentRoute: link.route });
                        window.scrollTo(0, 0);
                      }
                    }} 
                    className={`relative flex items-center gap-2 w-fit text-right rtl:text-right ltr:text-left px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${isHovered ? 'text-[var(--color-primary)] bg-[var(--surface-secondary)] border border-[var(--interactive-border)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]/40 shrink-0" />
                    {isEn ? link.nameEn : link.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products & Policies */}
          <div className="relative" onMouseLeave={() => setHoveredLink(null)}>
            <button onClick={() => toggleSection('products')} className="w-full flex md:hidden items-center justify-between cursor-pointer focus:outline-none border-b border-[var(--border-default)] pb-3 mb-4">
              <h4 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider">
                {isEn ? 'Systems & Policies' : 'الأنظمة والسياسات'}
              </h4>
              <span className="text-[var(--color-primary)] font-bold text-lg">
                {openSection === 'products' ? '-' : '+'}
              </span>
            </button>
            <div className="hidden md:block mb-5 text-right rtl:text-right ltr:text-left">
              <h4 className="text-[var(--text-primary)] font-bold text-base uppercase tracking-wider">
                {isEn ? 'Systems & Policies' : 'الأنظمة والسياسات'}
              </h4>
            </div>
            <div className={`flex-col gap-1.5 relative z-10 md:flex ${openSection === 'products' ? 'flex' : 'hidden'}`}>
              {productLinks.map((link, idx) => {
                const id = 'product-link-' + idx;
                const isHovered = hoveredLink === id;
                return (
                  <button 
                    key={idx}
                    onMouseEnter={() => setHoveredLink(id)}
                    onClick={() => {
                      updateConfig({ currentRoute: link.route });
                      window.scrollTo(0, 0);
                    }}
                    className={`relative flex items-center gap-2 w-fit text-right rtl:text-right ltr:text-left px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${isHovered ? 'text-[var(--color-primary)] bg-[var(--surface-secondary)] border border-[var(--interactive-border)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/50 shrink-0" />
                    {isEn ? link.nameEn : link.nameAr}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="relative">
            <button onClick={() => toggleSection('contact')} className="w-full flex md:hidden items-center justify-between cursor-pointer focus:outline-none border-b border-[var(--border-default)] pb-3 mb-4">
              <h4 className="text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider">
                {isEn ? 'Contact & Headquarters' : 'التواصل والمقر'}
              </h4>
              <span className="text-[var(--color-primary)] font-bold text-lg">
                {openSection === 'contact' ? '-' : '+'}
              </span>
            </button>
            <div className="hidden md:block mb-5 text-right rtl:text-right ltr:text-left">
              <h4 className="text-[var(--text-primary)] font-bold text-base uppercase tracking-wider">
                {isEn ? 'Contact & Headquarters' : 'التواصل والمقر'}
              </h4>
            </div>
            <ul className={`space-y-2.5 text-xs text-[var(--text-secondary)] font-medium md:block ${openSection === 'contact' ? 'block' : 'hidden'}`}>
              <li className="flex items-center gap-3 px-3.5 py-2.5 bg-[var(--surface-secondary)]/70 border border-[var(--border-default)] rounded-xl transition-all hover:border-[var(--interactive-border)]">
                <MapPin size={16} className="text-[var(--color-primary)] shrink-0" />
                <span>{isEn ? 'Riyadh, Kingdom of Saudi Arabia' : 'المملكة العربية السعودية، الرياض'}</span>
              </li>
              {config.contactNumber && (
                <li 
                  onClick={() => window.open(getWhatsAppUrl(config.contactNumber), '_blank')}
                  className="flex items-center gap-3 px-3.5 py-2.5 bg-[var(--surface-secondary)]/70 border border-[var(--border-default)] rounded-xl transition-all hover:border-[var(--interactive-border)] cursor-pointer hover:bg-[var(--surface-secondary)]"
                >
                  <Phone size={16} className="text-[var(--color-accent)] shrink-0" />
                  <span dir="ltr" className="font-english font-bold">{config.contactNumber}</span>
                </li>
              )}
              <li 
                onClick={() => window.location.href = 'mailto:hello@nmolabs.com'}
                className="flex items-center gap-3 px-3.5 py-2.5 bg-[var(--surface-secondary)]/70 border border-[var(--border-default)] rounded-xl transition-all hover:border-[var(--interactive-border)] cursor-pointer hover:bg-[var(--surface-secondary)]"
              >
                <Mail size={16} className="text-[var(--color-primary)] shrink-0" />
                <span dir="ltr" className="font-english font-bold">hello@nmolabs.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Footnote */}
        <div className="pt-6 border-t border-[var(--border-default)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-medium">
          <p>© {currentYear} {isEn ? 'NmoLabs. All rights reserved.' : 'نمو لابز. جميع الحقوق محفوظة.'}</p>
          <div className="flex items-center gap-2">
            <span>{isEn ? 'Built with precision by' : 'صُنع بشغف وابتكار في'}</span>
            <span 
              onClick={handleNmoLabsClick}
              className="text-[var(--text-primary)] font-black tracking-widest font-english text-xs bg-[var(--surface-secondary)] px-2.5 py-1 rounded-md border border-[var(--border-default)] select-none touch-manipulation cursor-pointer"
            >
              NMOLABS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
