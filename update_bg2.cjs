const fs = require('fs');

let code = fs.readFileSync('src/components/InteractiveBackground.tsx', 'utf8');

code = code.replace(
  /animate=\{\{ opacity: config\.theme === 'dark' \? 0\.2 : 0\.15, scale: 1 \}\}/g,
  "animate={{ opacity: config.theme === 'dark' ? 0.2 : 0.15, scale: 1.05 }}"
);

code = code.replace(
  /transition=\{\{ duration: 1\.2, ease: 'easeInOut' \}\}/g,
  "transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' } }}"
);

fs.writeFileSync('src/components/InteractiveBackground.tsx', code);
