const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldHeader = '<div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-default)]">';
const newHeader = '<div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-default)] shrink-0">';

code = code.replace(oldHeader, newHeader);

const oldListContainer = '<div className="flex flex-col gap-1.5 flex-1">';
const newListContainer = '<div className="flex flex-col gap-2 flex-1 justify-center overflow-y-auto">';

code = code.replace(oldListContainer, newListContainer);

const oldNavItem = 'className="text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface-secondary)] py-3.5 px-4 rounded-xl w-full font-bold transition-all text-base flex items-center gap-3 border border-transparent min-h-[44px]"';
const newNavItem = 'className="text-right rtl:text-right ltr:text-left text-[var(--text-secondary)] hover:text-[var(--color-primary)] bg-[var(--surface-primary)] hover:bg-[var(--surface-secondary)] py-3 px-4 rounded-xl w-full font-bold transition-all duration-300 text-sm sm:text-base flex items-center gap-3 border border-[var(--border-default)] shadow-sm hover:shadow-md hover:-translate-y-0.5 min-h-[44px]"';

code = code.replace(oldNavItem, newNavItem);

const oldFooter = '<div className="mt-8 pt-8 border-t border-[var(--border-default)] flex flex-col gap-4">';
const newFooter = '<div className="mt-6 pt-6 border-t border-[var(--border-default)] flex flex-col gap-3 shrink-0">';

code = code.replace(oldFooter, newFooter);

fs.writeFileSync('src/components/Header.tsx', code);
