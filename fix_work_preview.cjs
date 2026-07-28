const fs = require('fs');
let code = fs.readFileSync('src/components/WorkPreview.tsx', 'utf8');

code = code.replace(
  /grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8/g,
  "grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
);

fs.writeFileSync('src/components/WorkPreview.tsx', code);
