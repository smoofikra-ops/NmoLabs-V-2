const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /<div className="px-4 md:px-6 py-4">/g,
  '<div className="px-4 md:px-6 py-3">'
);

fs.writeFileSync('src/components/Header.tsx', code);
