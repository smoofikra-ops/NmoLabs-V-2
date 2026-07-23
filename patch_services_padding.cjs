const fs = require('fs');
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

code = code.replace(/className="py-16 sm:py-24 md:py-32 relative z-10 bg-radial-glow"/g, 'className="py-12 sm:py-16 relative z-10 bg-radial-glow"');

fs.writeFileSync('src/components/Services.tsx', code);
