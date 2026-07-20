const fs = require('fs');
let code = fs.readFileSync('src/components/FAQ.tsx', 'utf8');

// replace category buttons
const categoryButtonsReplacement = `className={\`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 \${
                activeCategory === idx 
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]'
                  : 'bg-[var(--surface-secondary)] border border-[var(--border-default)] shadow-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-primary)] hover:border-[var(--color-primary)]/50'
              }\`}`;

code = code.replace(
  /className={`px-6 py-2\.5 rounded-full text-sm font-bold transition-all duration-300 \$\{[^}]+\}`}/,
  categoryButtonsReplacement
);

// replace FAQ items
const faqItemReplacement = `className={\`transition-all duration-300 rounded-2xl overflow-hidden \${isOpen ? 'bg-[var(--surface-secondary)]/80 border border-[var(--color-primary)] shadow-[0_0_20px_rgba(79,142,247,0.15)]' : 'bg-[var(--surface-secondary)]/40 backdrop-blur-sm border border-[var(--border-default)] shadow-sm hover:bg-[var(--surface-secondary)]/80 hover:border-[var(--border-strong)]'}\`}
                  >
                    <button 
                      className="w-full text-right p-5 md:p-6 text-lg font-bold flex items-center justify-between text-[var(--text-primary)] group"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className={\`pl-4 leading-relaxed transition-colors \${isOpen ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'}\`}>{faq.q}</span>
                      <div 
                        className={\`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border \${isOpen ? 'bg-[var(--color-primary)] text-white border-transparent' : 'bg-[var(--surface-primary)] border-[var(--border-default)] text-[var(--text-muted)] group-hover:border-[var(--color-primary)] group-hover:text-[var(--color-primary)]'}\`}
                      >
                        <Plus size={20} className={\`transition-transform duration-300 \${isOpen ? 'rotate-45' : 'rotate-0'}\`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="p-5 md:p-6 pt-0 text-[var(--text-secondary)] leading-relaxed font-light border-t border-[var(--border-default)]/50 mx-5 md:mx-6 mt-2">`;

code = code.replace(
  /className={`transition-all duration-300 rounded-2xl overflow-hidden hover:-translate-y-1 \$\{[^}]+\}`}\s*>\s*<button \s*className="w-full text-right p-6 text-lg md:text-xl font-bold flex items-center justify-between text-\[var\(--text-primary\)\]"\s*onClick=\{[^\}]+\}\s*>\s*<span className="pl-4 leading-relaxed">\{faq\.q\}<\/span>\s*<div \s*className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 \$\{[^}]+\}`}\s*>\s*\{isOpen \? <Minus size=\{20\} \/> : <Plus size=\{20\} \/>\}\s*<\/div>\s*<\/button>\s*<AnimatePresence>\s*\{isOpen && \(\s*<motion\.div \s*initial=\{\{ opacity: 0, height: 0 \}\}\s*animate=\{\{ opacity: 1, height: 'auto' \}\}\s*exit=\{\{ opacity: 0, height: 0 \}\}\s*>\s*<div className="p-6 pt-0 text-\[var\(--text-muted\)\] leading-relaxed font-light border-t border-\[var\(--border-default\)\] mx-6 mt-2">/s,
  faqItemReplacement
);

// We need to fix the title color which was text-white
code = code.replace(
  'className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight"',
  'className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-[var(--text-primary)] leading-tight"'
);

fs.writeFileSync('src/components/FAQ.tsx', code);
