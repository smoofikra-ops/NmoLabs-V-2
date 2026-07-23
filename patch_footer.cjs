const fs = require('fs');
let code = fs.readFileSync('src/components/Footer.tsx', 'utf8');

// Reduce gaps: change gap-12 to gap-6 md:gap-8 lg:gap-10
code = code.replace(/className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"/g, 'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"');

// Center logo and about us text
code = code.replace(/<div className="flex items-center gap-2 cursor-pointer"/g, '<div className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer"');
code = code.replace(/<p className="text-\[var\(--text-muted\)\] text-sm leading-relaxed">/g, '<p className="text-[var(--text-muted)] text-sm leading-relaxed text-center lg:text-start">');
code = code.replace(/<div className="flex gap-4 flex-wrap">/g, '<div className="flex gap-4 flex-wrap justify-center lg:justify-start">');

fs.writeFileSync('src/components/Footer.tsx', code);
