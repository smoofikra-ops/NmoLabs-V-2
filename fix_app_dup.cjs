const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /\) : config.currentRoute === 'kyc' \? \([\s\S]*?<StartProjectPage \/>\n\s*<\/Suspense>/,
  ")"
);

fs.writeFileSync('src/App.tsx', code);
