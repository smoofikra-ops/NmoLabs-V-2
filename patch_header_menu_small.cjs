const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldListContainer = '<div className="flex flex-col gap-2 flex-1 justify-center overflow-y-auto">';
const newListContainer = '<div className="flex flex-col gap-1.5 flex-1 justify-center overflow-y-auto">';
code = code.replace(oldListContainer, newListContainer);

const oldNavItem = 'className="text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] py-3 px-4 rounded-xl w-full font-bold transition-all duration-300 text-sm sm:text-base flex items-center gap-3 border border-[var(--border-default)] shadow-sm hover:shadow-md hover:-translate-y-0.5 min-h-[44px]"';
const newNavItem = 'className="text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] py-2.5 px-3.5 rounded-xl w-full font-bold transition-all duration-300 text-sm flex items-center gap-3 border border-[var(--border-default)] shadow-sm hover:shadow-md hover:-translate-y-0.5 min-h-[40px]"';
code = code.replace(oldNavItem, newNavItem);

const oldFooter = '<div className="mt-6 pt-6 border-t border-[var(--border-default)] flex flex-col gap-3 shrink-0">';
const newFooter = '<div className="mt-4 pt-4 border-t border-[var(--border-default)] flex flex-col gap-2.5 shrink-0">';
code = code.replace(oldFooter, newFooter);

const oldThemeBtn = 'p-3.5 bg-[var(--surface-secondary)]';
const newThemeBtn = 'p-3 bg-[var(--surface-secondary)]';
code = code.replace(/p-3\.5 bg-\[var\(--surface-secondary\)\]/g, newThemeBtn);

const oldBtn = 'py-4 rounded-xl font-bold text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer shadow-lg relative overflow-hidden group';
const newBtn = 'py-3.5 rounded-xl font-bold text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer shadow-lg relative overflow-hidden group text-sm';
code = code.replace(oldBtn, newBtn);

fs.writeFileSync('src/components/Header.tsx', code);
