const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Add motion and useState
if (!code.includes("import { motion }")) {
  code = code.replace("import React from 'react';", "import React, { useState } from 'react';\nimport { motion } from 'motion/react';\nimport { UserRound, FlaskConical } from 'lucide-react';");
}

code = code.replace(
  'export const Footer = () => {',
  'export const Footer = () => {\n  const [hoveredLink, setHoveredLink] = useState<string | null>(null);'
);

const aboutUsReplacement = `<div className="space-y-6 bg-[var(--surface-secondary)]/50 border border-[var(--border-default)] p-6 rounded-3xl relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <img src={siteLogo} alt="NmoLabs Logo" className="w-10 h-10 object-contain rounded-xl" />
              <div className="font-bold text-xl tracking-wide font-english text-[var(--text-primary)]">
                NMOLABS<span className="text-[var(--color-primary)]">.</span>
              </div>
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {config.footerDescription}
            </p>
            
            <div className="pt-4 border-t border-[var(--border-default)]/50">
               <button 
                  onClick={() => { updateConfig({ currentRoute: 'founder' }); window.scrollTo(0, 0); }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[var(--surface-primary)] border border-transparent hover:border-[var(--border-default)] transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                    <UserRound size={16} />
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--color-primary)]">المؤسس والرئيس التنفيذي</span>
                </button>
            </div>

            <div className="flex gap-2 flex-wrap pt-2">
              {config.socialLinks?.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" title={link.name} className="w-9 h-9 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all duration-300">
                  {getSocialSvg(link.icon)}
                </a>
              ))}
            </div>
          </div>`;

code = code.replace(
  /<div className="space-y-6">.*?<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Quick Links \*\/\}/s,
  aboutUsReplacement + '\n\n          {/* Quick Links */}'
);

const quickLinksReplacement = `<div className="bg-[var(--surface-secondary)]/30 border border-[var(--border-default)] p-6 rounded-3xl relative backdrop-blur-sm" onMouseLeave={() => setHoveredLink(null)}>
            <h4 className="text-[var(--text-primary)] font-bold mb-4 text-sm uppercase tracking-wider">استكشف</h4>
            <div className="flex flex-col gap-1 relative z-10">
              {[
                { name: 'الرئيسية', act: 'hero' },
                { name: 'خدماتنا', act: 'services' },
                { name: 'أعمالنا', route: 'work' },
                { name: 'المدونة', act: 'blog' },
                { name: 'مختبر الابتكارات', route: 'innovation-lab', icon: <FlaskConical size={14}/> },
              ].map((link, idx) => {
                const id = 'link-' + idx;
                const isHovered = hoveredLink === id;
                return (
                  <button 
                    key={idx}
                    onMouseEnter={() => setHoveredLink(id)}
                    onClick={() => link.route ? (() => {updateConfig({currentRoute: link.route}); window.scrollTo(0,0)})() : handleScroll(link.act!)} 
                    className={\`relative flex items-center gap-2 w-full text-right p-2.5 rounded-xl text-sm transition-colors \${isHovered ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}\`}
                  >
                    {isHovered && (
                       <motion.div
                         layoutId="footer-liquid-indicator-1"
                         className="absolute inset-0 bg-[var(--surface-primary)] shadow-sm border border-[var(--border-default)]/50 rounded-xl -z-10"
                         transition={{ type: "spring", stiffness: 400, damping: 30 }}
                       />
                    )}
                    {link.icon && <span className={\`\${isHovered ? 'text-[var(--color-primary)]' : 'text-inherit'}\`}>{link.icon}</span>}
                    {link.name}
                  </button>
                )
              })}
            </div>
          </div>`;

code = code.replace(
  /<div>\s*<h4 className="text-\[var\(--text-primary\)\] font-bold mb-6 text-lg">روابط سريعة<\/h4>.*?<\/div>\s*\{\/\* Policies \*\/\}/s,
  quickLinksReplacement + '\n\n          {/* Policies */}'
);

const policiesReplacement = `<div className="bg-[var(--surface-secondary)]/30 border border-[var(--border-default)] p-6 rounded-3xl relative backdrop-blur-sm" onMouseLeave={() => setHoveredLink(null)}>
            <h4 className="text-[var(--text-primary)] font-bold mb-4 text-sm uppercase tracking-wider">السياسات</h4>
            <div className="flex flex-col gap-1 relative z-10">
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
                    className={\`relative w-full text-right p-2.5 rounded-xl text-sm transition-colors \${isHovered ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}\`}
                  >
                    {isHovered && (
                       <motion.div
                         layoutId="footer-liquid-indicator-2"
                         className="absolute inset-0 bg-[var(--surface-primary)] shadow-sm border border-[var(--border-default)]/50 rounded-xl -z-10"
                         transition={{ type: "spring", stiffness: 400, damping: 30 }}
                       />
                    )}
                    {link.name}
                  </button>
                )
              })}
            </div>
          </div>`;

code = code.replace(
  /<div>\s*<h4 className="text-\[var\(--text-primary\)\] font-bold mb-6 text-lg">السياسات<\/h4>.*?<\/div>\s*\{\/\* Contact Info \*\/\}/s,
  policiesReplacement + '\n\n          {/* Contact Info */}'
);

const contactReplacement = `<div className="bg-[var(--surface-secondary)]/30 border border-[var(--border-default)] p-6 rounded-3xl relative backdrop-blur-sm">
            <h4 className="text-[var(--text-primary)] font-bold mb-4 text-sm uppercase tracking-wider">التواصل</h4>
            <ul className="space-y-4 text-sm text-[var(--text-muted)] mt-2">
              <li className="flex items-start gap-3 p-2">
                <MapPin size={18} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span dir="ltr" className="text-right w-full">المملكة العربية السعودية، الرياض</span>
              </li>
              <li className="flex items-center gap-3 p-2">
                <Phone size={18} className="text-[var(--color-primary)] shrink-0" />
                <span dir="ltr" className="font-english">{config.contactNumber}</span>
              </li>
              <li className="flex items-center gap-3 p-2">
                <Mail size={18} className="text-[var(--color-primary)] shrink-0" />
                <span dir="ltr" className="font-english">hello@nmolabs.com</span>
              </li>
            </ul>
          </div>`;

code = code.replace(
  /<div>\s*<h4 className="text-\[var\(--text-primary\)\] font-bold mb-6 text-lg">التواصل<\/h4>.*?<\/div>\s*<\/div>\s*\{\/\* Copyright \*\/\}/s,
  contactReplacement + '\n        </div>\n\n        {/* Copyright */}'
);

fs.writeFileSync('src/components/Footer.tsx', code);
