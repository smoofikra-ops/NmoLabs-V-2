const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

code = code.replace(
  'className="w-full max-w-full overflow-hidden"',
  'className="w-full max-w-full overflow-hidden order-first lg:order-last mt-8 lg:mt-0"'
);

fs.writeFileSync('src/components/Hero.tsx', code);
