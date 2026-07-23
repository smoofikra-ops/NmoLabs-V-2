const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldMenuStr = "className={`fixed top-0 bottom-0 w-[85%] max-w-[320px] bg-[var(--surface-primary)] border-[var(--border-default)] shadow-2xl z-[70] lg:hidden flex flex-col p-6 overflow-y-auto ${config.language === 'en' ? 'left-0 border-r rounded-r-3xl' : 'right-0 border-l rounded-l-3xl'}`}";
const newMenuStr = "className={`fixed top-0 w-[85%] max-w-[320px] h-[100dvh] bg-[var(--surface-primary)] border-[var(--border-default)] shadow-2xl z-[70] lg:hidden flex flex-col p-6 overflow-y-auto overscroll-none touch-pan-y ${config.language === 'en' ? 'left-0 border-r rounded-r-3xl' : 'right-0 border-l rounded-l-3xl'}`}";

code = code.replace(oldMenuStr, newMenuStr);

const oldNavItem = "className=\"text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-secondary)] py-3 px-3.5 rounded-xl w-full font-bold transition-all text-sm flex items-center gap-3 border border-transparent\"";
const newNavItem = "className=\"text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-secondary)] py-3.5 px-4 rounded-xl w-full font-bold transition-all text-base flex items-center gap-3 border border-transparent min-h-[44px]\"";

code = code.replace(oldNavItem, newNavItem);

fs.writeFileSync('src/components/Header.tsx', code);
