const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

const frontOld = `<div className="absolute inset-0 [backface-visibility:hidden] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-[60px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20 z-0" style={{ backgroundColor: colorHex }} />`;

const frontNew = `<div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-[60px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20 z-0" style={{ backgroundColor: colorHex }} />`;

code = code.replace(frontOld, frontNew);
fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
