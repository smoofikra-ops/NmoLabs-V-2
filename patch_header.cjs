const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Change mobile logo height default from 40 to 32, and for desktop 44 to 40
code = code.replace(/config.desktopLogoHeight \|\| 44/g, 'config.desktopLogoHeight || 40');
code = code.replace(/config.mobileLogoHeight \|\| 40/g, 'config.mobileLogoHeight || 30');

// Center logo on mobile Header
code = code.replace(/<div className="flex items-center gap-2 cursor-pointer"/g, '<div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 gap-2 cursor-pointer"');

fs.writeFileSync('src/components/Header.tsx', code);
