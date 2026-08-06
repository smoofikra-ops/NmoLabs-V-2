const fs = require('fs');
let code = fs.readFileSync('src/components/InteractiveBackground.tsx', 'utf8');

// Allow mobile to have animated background
code = code.replace(/if \(isMobile\) return;/g, '');
code = code.replace(/\{\!isMobile && \(/g, '{true && (');

fs.writeFileSync('src/components/InteractiveBackground.tsx', code);
