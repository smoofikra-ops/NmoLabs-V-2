const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Add state
code = code.replace(
  'const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);',
  'const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [hoveredNav, setHoveredNav] = useState<number | null>(null);\n  const [activeNav, setActiveNav] = useState<number>(0);'
);

// Update nav click to set active nav
code = code.replace(
  'const handleNavClick = (item: any) => {',
  'const handleNavClick = (item: any, idx: number) => {\n    setActiveNav(idx);'
);

code = code.replace(
  'onClick={() => handleNavClick(item)}',
  'onClick={() => handleNavClick(item, idx)}'
);

// Replace nav container
const navReplacement = `<nav className="hidden lg:flex items-center gap-1 relative" onMouseLeave={() => setHoveredNav(null)}>
          {mainNavItems.map((item, idx) => {
            const isHovered = hoveredNav === idx;
            const isActive = activeNav === idx;
            return (
              <button 
                key={idx}
                onClick={() => handleNavClick(item, idx)}
                onMouseEnter={() => setHoveredNav(idx)}
                onFocus={() => setHoveredNav(idx)}
                className={\`relative px-4 py-2 text-sm font-medium transition-colors z-10 \${(isActive || isHovered) ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}\`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navigation-liquid-active"
                    className="absolute inset-0 bg-[var(--surface-secondary)]/50 border border-[var(--border-default)] rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="navigation-liquid-hover"
                    className="absolute inset-0 bg-[var(--surface-secondary)]/30 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {isEn ? item.nameEn : item.nameAr}
              </button>
            );
          })}
        </nav>`;

code = code.replace(
  /<nav className="hidden lg:flex items-center gap-6">.*?<\/nav>/s,
  navReplacement
);

// Mobile Nav updates (simpler)
// Find mobile nav
const mobileNavMatch = code.match(/<div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-\[60vh\]">.*?<\/div>/s);
if (mobileNavMatch) {
  const mobileNavReplacement = `<div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[60vh]">
              {mainNavItems.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleNavClick(item, idx)}
                  className={\`flex items-center justify-between p-3 rounded-xl transition-colors \${activeNav === idx ? 'bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--color-primary)]' : 'hover:bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}\`}
                >
                  <span className="font-medium text-sm">{isEn ? item.nameEn : item.nameAr}</span>
                </button>
              ))}
            </div>`;
  code = code.replace(mobileNavMatch[0], mobileNavReplacement);
}

// Ensure header styling has outer glow/shadow and border
code = code.replace(
  'bg-[var(--surface-primary)]/80 shadow-sm border border-[var(--border-default)] rounded-2xl',
  'bg-[var(--surface-primary)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-default)]/60 rounded-2xl'
);


fs.writeFileSync('src/components/Header.tsx', code);
