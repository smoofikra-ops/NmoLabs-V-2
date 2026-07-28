const fs = require('fs');
let code = fs.readFileSync('src/components/WorkPreview.tsx', 'utf8');

code = code.replace(
  /<h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-\[var\(--color-primary\)\] transition-colors">/g,
  '<h3 className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-primary)] to-[var(--color-secondary)] mb-2 transition-colors">'
);

fs.writeFileSync('src/components/WorkPreview.tsx', code);
