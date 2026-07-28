const fs = require('fs');
let code = fs.readFileSync('src/components/WorkGridCard.tsx', 'utf8');

// Title styling
code = code.replace(
  /<h3 className="text-xl md:text-2xl font-bold text-white mb-2">/g,
  '<h3 className="text-base sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-primary)] to-[var(--color-secondary)] mb-1 sm:mb-2 line-clamp-2">'
);

// Mobile padding & spacing to avoid cramming
code = code.replace(
  /<div className="absolute inset-0 bg-gradient-to-t from-black\/95 via-black\/50 to-transparent p-6 flex flex-col justify-end pointer-events-none">/g,
  '<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 sm:p-6 flex flex-col justify-end pointer-events-none">'
);

// Ensure container classes adapt well if any
fs.writeFileSync('src/components/WorkGridCard.tsx', code);
