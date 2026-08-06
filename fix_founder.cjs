const fs = require('fs');

let code = fs.readFileSync('src/components/FounderPage.tsx', 'utf8');

code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">/g,
  '<div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">'
);

code = code.replace(
  /className="bg-\[var\(--surface-primary\)\] border border-\[var\(--border-default\)\] rounded-3xl cursor-pointer hover:border-\[var\(--color-primary\)\] transition-all group overflow-hidden flex flex-col h-full"/g,
  "className={`bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl cursor-pointer hover:border-[var(--color-primary)] transition-all group overflow-hidden flex flex-col h-full ${idx === 0 ? 'col-span-2 md:col-span-1' : 'col-span-1'}`}"
);

// Reduce padding in those cards for mobile
code = code.replace(
  /<div className="p-6 sm:p-8 flex-1 flex flex-col">/g,
  '<div className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col">'
);

// Reduce text sizes for those cards for mobile
code = code.replace(
  /<h3 className="text-xl font-black mb-3/g,
  '<h3 className="text-base sm:text-lg md:text-xl font-black mb-2 sm:mb-3'
);
code = code.replace(
  /text-sm leading-relaxed mb-6/g,
  'text-xs sm:text-sm leading-relaxed mb-3 sm:mb-6'
);

// And we can reduce the height of the image on mobile if it's not the first item
code = code.replace(
  /<div className="h-48 relative overflow-hidden">/g,
  '<div className={`relative overflow-hidden ${idx === 0 ? "h-48" : "h-32 sm:h-48"}`}>'
);

fs.writeFileSync('src/components/FounderPage.tsx', code);
