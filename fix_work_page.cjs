const fs = require('fs');
let code = fs.readFileSync('src/components/WorkPage.tsx', 'utf8');

// Update Grid
code = code.replace(
  /grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-\[minmax\(250px,auto\)\]/g,
  "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 auto-rows-[minmax(180px,auto)] sm:auto-rows-[minmax(250px,auto)]"
);

// Update Page Title
code = code.replace(
  /className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight text-white"/g,
  'className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white"' // Actually, I will replace the spans inside
);

code = code.replace(
  /<span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white\/50">Work<\/span>/g,
  '<span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-primary)] to-[var(--color-secondary)]">Work</span>'
);

code = code.replace(
  /<span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-white\/50">نا<\/span>/g,
  '<span className="text-transparent bg-clip-text bg-gradient-to-l from-white via-[var(--color-primary)] to-[var(--color-secondary)]">نا</span>'
);

fs.writeFileSync('src/components/WorkPage.tsx', code);
