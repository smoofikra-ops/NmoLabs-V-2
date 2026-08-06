const fs = require('fs');
let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');
code = code.replace(/<circle cx="50%" cy="50%" r="42\.5%" fill="none"/g, '<circle cx="50%" cy="50%" r="35.3%" fill="none"');
fs.writeFileSync('src/components/AboutPage.tsx', code);
