const fs = require('fs');
let code = fs.readFileSync('src/components/WhyChooseUs.tsx', 'utf8');

code = code.replace(
  /<div className="space-y-6 mb-10">/g,
  '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">'
);
code = code.replace(
  /className="flex items-start gap-4 p-4 rounded-2xl bg-\[var\(--surface-primary\)\]\/20 border border-\[var\(--border-default\)\] hover:border-\[var\(--color-primary\)\]\/30 transition-all duration-300 transform hover:scale-\[1\.03\] hover:-translate-y-1 hover:shadow-\[0_10px_30px_rgba\(79,142,247,0\.1\)\] group cursor-default"/g,
  'className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl bg-[var(--surface-primary)]/20 border border-[var(--border-default)] hover:border-[var(--color-primary)]/30 transition-all duration-300 group cursor-default h-full"'
);

// also fix some padding to compress spacing
code = code.replace(/py-32/g, 'py-16 md:py-32');
code = code.replace(/gap-16/g, 'gap-10 lg:gap-16');

fs.writeFileSync('src/components/WhyChooseUs.tsx', code);
