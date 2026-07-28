const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const search = `<div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--surface-primary)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-default)]/60 rounded-2xl px-4 md:px-6 py-3 transition-colors backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--surface-primary)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-default)]/60 rounded-2xl px-4 md:px-6 py-3 transition-colors backdrop-blur-xl">`;

const replace = `<div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--surface-primary)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-default)]/60 rounded-2xl px-4 md:px-6 py-3 transition-colors backdrop-blur-xl">`;

code = code.replace(search, replace);

fs.writeFileSync('src/components/Header.tsx', code);
