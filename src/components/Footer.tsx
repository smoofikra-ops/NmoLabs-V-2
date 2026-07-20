import React, { useState } from 'react';
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

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleScroll = (id: string) => {
    if (id === 'contact' && config.contactNumber) {
      window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');
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
    { nameAr: 'المؤسس والرئيس التنفيذي', nameEn: 'Founder & CEO', route: 'founder' },
    { nameAr: 'أعمالنا', nameEn: 'Our Works', route: 'work' },
    { nameAr: 'مختبر الابتكارات', nameEn: 'Innovation Lab', route: 'innovation-lab' },
    { nameAr: 'تواصل معنا', nameEn: 'Contact Us', act: 'contact' },
  ];

  return (
    <footer className="border-t border-[var(--border-default)] pt-12 md:pt-20 pb-8 relative z-20 bg-[var(--surface-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo and About Us */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('hero')}>
              <img src={siteLogo} alt="NMOLABS Logo" className="h-12 object-contain drop-shadow-[0_0_15px_rgba(79,142,247,0.3)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden text-2xl font-english font-black text-[var(--text-primary)] tracking-wider">
                NMOLABS<span className="text-[var(--color-primary)]">.</span>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {config.footerDescription}
            </p>
            <div className="flex gap-4 flex-wrap">
              {config.socialLinks?.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" title={link.name} className="w-10 h-10 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--color-primary)] hover:text-[var(--text-primary)] hover:border-transparent transition-all duration-300">
                  {getSocialSvg(link.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links (الشركة) */}
          <div className="relative transition-colors" onMouseLeave={() => setHoveredLink(null)}>
            <button onClick={() => toggleSection('company')} className="w-full flex items-center justify-between cursor-pointer focus:outline-none border-b border-[var(--border-default)] pb-4 mb-4">
              <h4 className="text-[var(--text-primary)] font-bold mb-0 text-sm uppercase tracking-wider">
                {isEn ? 'Company' : 'الشركة'}
              </h4>
              <span className="text-[var(--color-primary)] font-bold text-lg">
                {openSection === 'company' ? '-' : '+'}
              </span>
            </button>
            <div className={`flex-col gap-1 relative z-10 mt-4 ${openSection === 'company' ? 'flex' : 'hidden'}`}>
              {companyLinks.map((link, idx) => {
                const id = 'company-link-' + idx;
                const isHovered = hoveredLink === id;
                return (
                  <button 
                    key={idx}
                    onMouseEnter={() => setHoveredLink(id)}
                    onClick={() => link.route ? (() => {updateConfig({currentRoute: link.route}); window.scrollTo(0,0)})() : handleScroll(link.act!)} 
                    className={`relative flex items-center gap-2 w-full text-right rtl:text-right ltr:text-left p-3 mb-2 border rounded-xl text-sm transition-colors ${isHovered ? 'text-[var(--text-primary)] border-[var(--color-primary)]' : 'text-[var(--text-muted)] border-[var(--border-default)] hover:border-[var(--interactive-border-hover)]'}`}
                  >
                    {isHovered && (
                       <motion.div
                         layoutId="footer-liquid-indicator-1"
                         className="absolute inset-0 bg-[var(--liquid-indicator-bg)] border border-[var(--liquid-indicator-border)] shadow-[var(--interactive-glow)] rounded-xl -z-10"
                         transition={{ type: "spring", stiffness: 400, damping: 30 }}
                       />
                    )}
                    {isEn ? link.nameEn : link.nameAr}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Policies */}
          <div className="relative transition-colors" onMouseLeave={() => setHoveredLink(null)}>
            <button onClick={() => toggleSection('policies')} className="w-full flex items-center justify-between cursor-pointer focus:outline-none border-b border-[var(--border-default)] pb-4 mb-4">
              <h4 className="text-[var(--text-primary)] font-bold mb-0 text-sm uppercase tracking-wider">السياسات</h4>
              <span className="text-[var(--color-primary)] font-bold text-lg">
                {openSection === 'policies' ? '-' : '+'}
              </span>
            </button>
            <div className={`flex-col gap-1 relative z-10 mt-4 ${openSection === 'policies' ? 'flex' : 'hidden'}`}>
              {[
                { name: 'سياسة الخصوصية', route: 'privacy' },
                { name: 'شروط الاستخدام', route: 'terms' },
                { name: 'سياسة ملفات الارتباط', route: 'cookies' },
                { name: 'إخلاء المسؤولية', route: 'disclaimer' },
              ].map((link, idx) => {
                const id = 'policy-' + idx;
                const isHovered = hoveredLink === id;
                return (
                  <button 
                    key={idx}
                    onMouseEnter={() => setHoveredLink(id)}
                    onClick={() => { updateConfig({ currentRoute: link.route }); window.scrollTo(0, 0); }}
                    className={`relative w-full text-right p-3 mb-2 border rounded-xl text-sm transition-colors ${isHovered ? 'text-[var(--text-primary)] border-[var(--color-primary)]' : 'text-[var(--text-muted)] border-[var(--border-default)] hover:border-[var(--interactive-border-hover)]'}`}
                  >
                    {isHovered && (
                       <motion.div
                         layoutId="footer-liquid-indicator-2"
                         className="absolute inset-0 bg-[var(--liquid-indicator-bg)] border border-[var(--liquid-indicator-border)] shadow-[var(--interactive-glow)] rounded-xl -z-10"
                         transition={{ type: "spring", stiffness: 400, damping: 30 }}
                       />
                    )}
                    {link.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div className="relative transition-colors">
            <button onClick={() => toggleSection('contact')} className="w-full flex items-center justify-between cursor-pointer focus:outline-none border-b border-[var(--border-default)] pb-4 mb-4">
              <h4 className="text-[var(--text-primary)] font-bold mb-0 text-sm uppercase tracking-wider">التواصل</h4>
              <span className="text-[var(--color-primary)] font-bold text-lg">
                {openSection === 'contact' ? '-' : '+'}
              </span>
            </button>
            <ul className={`space-y-4 text-sm text-[var(--text-muted)] mt-6 ${openSection === 'contact' ? 'block' : 'hidden'}`}>
              <li className="flex items-start gap-3 p-3 mb-2 border border-[var(--border-default)] rounded-xl transition-colors hover:border-[var(--interactive-border-hover)]">
                <MapPin size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span dir="ltr" className="text-right w-full">المملكة العربية السعودية، الرياض</span>
              </li>
              <li className="flex items-center gap-3 p-3 mb-2 border border-[var(--border-default)] rounded-xl transition-colors hover:border-[var(--interactive-border-hover)]">
                <Phone size={18} className="text-[var(--color-primary)] shrink-0" />
                <span dir="ltr" className="font-english">{config.contactNumber}</span>
              </li>
              <li className="flex items-center gap-3 p-3 mb-2 border border-[var(--border-default)] rounded-xl transition-colors hover:border-[var(--interactive-border-hover)]">
                <Mail size={18} className="text-[var(--color-primary)] shrink-0" />
                <span dir="ltr" className="font-english">hello@nmolabs.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[var(--border-default)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {currentYear} نمو لابز. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>صُنع بشغف في</span>
            <span className="text-[var(--text-primary)] font-black text-xs font-english tracking-widest">NMOLABS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
