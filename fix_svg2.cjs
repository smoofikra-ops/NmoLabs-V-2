const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');
code = code.replace(/<circle cx="50%" cy="50%" r="40%" fill="none" stroke="var\(--border-default\)" strokeWidth="1" strokeDasharray="4 4" opacity="0\.3" \/>/g, '<circle cx="50%" cy="50%" r="42.5%" fill="none" stroke="var(--border-default)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />');
fs.writeFileSync('src/components/AboutPage.tsx', code);
