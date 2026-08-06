const fs = require('fs');

let code = fs.readFileSync('src/components/ToolsGrid.tsx', 'utf8');

// The second grid is currently grid-cols-1 on mobile. Let's make it a horizontal scroll container or mixed.
code = code.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">/g,
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">'
);
// Make the cards horizontal flow on mobile? Or just make them flex? 
// No, a simple grid-cols-2 on mobile is too tight for text maybe? Or maybe Bento layout.
// Let's change it to:
code = code.replace(
  /<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">/g,
  '<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">'
);

// Reduce padding and text size for ToolsGrid
code = code.replace(
  /className="p-8 h-full"/g,
  'className="p-5 sm:p-8 h-full flex flex-col justify-between"'
);
code = code.replace(
  /<h4 className="text-xl font-bold mb-3/g,
  '<h4 className="text-sm sm:text-xl font-bold mb-2 sm:mb-3'
);
code = code.replace(
  /text-\[var\(--text-muted\)\] leading-relaxed/g,
  'text-[var(--text-muted)] text-xs sm:text-base leading-relaxed'
);
code = code.replace(
  /w-12 h-12 rounded-xl/g,
  'w-10 h-10 sm:w-12 sm:h-12 rounded-xl'
);
code = code.replace(
  /py-24 md:py-32/g,
  'py-12 md:py-32'
);

fs.writeFileSync('src/components/ToolsGrid.tsx', code);
