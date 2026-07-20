const fs = require('fs');
let code = fs.readFileSync('src/components/Solutions.tsx', 'utf8');

if (!code.includes("import { Code }")) {
  code = code.replace("import { ChevronDown } from 'lucide-react';", "import { ChevronDown, Code } from 'lucide-react';");
}

const logosReplacement = `<div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-6 relative">
              <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
              <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 w-full max-w-[400px]">
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[var(--surface-tertiary)] hover:border-blue-500/50 transition-all shadow-lg transform hover:-translate-y-1 w-[110px]">
                  <img src={sallaLogo} alt="Salla" className="w-16 h-16 object-contain opacity-80" />
                  <span className="text-sm font-bold text-[var(--text-muted)]">سلة</span>
                </div>
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[var(--surface-tertiary)] hover:border-purple-500/50 transition-all shadow-lg transform hover:-translate-y-1 w-[110px]">
                  <img src={zidLogo} alt="Zid" className="w-16 h-16 object-contain opacity-80" />
                  <span className="text-sm font-bold text-[var(--text-muted)]">زد</span>
                </div>
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:bg-[var(--surface-tertiary)] hover:border-[var(--color-primary)]/50 transition-all shadow-lg transform hover:-translate-y-1 w-[110px]">
                  <div className="w-16 h-16 flex items-center justify-center text-[var(--text-muted)] opacity-80">
                    <Code size={48} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-bold text-[var(--text-muted)] text-center">متاجر خاصة</span>
                </div>
              </div>
            </div>`;

code = code.replace(
  /<div className="w-full md:w-1\/3 flex flex-col items-center justify-center gap-6 relative">.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/motion\.div>/s,
  logosReplacement + '\n          </div>\n        </motion.div>'
);

fs.writeFileSync('src/components/Solutions.tsx', code);
