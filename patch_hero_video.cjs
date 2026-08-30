const fs = require('fs');
const path = 'src/components/Hero.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace opacity-40 dark:opacity-50
content = content.replace(
  'className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 pointer-events-none"',
  'className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-85 pointer-events-none"'
);

// Replace opacity-20 dark:opacity-[0.25]
content = content.replace(
  "activeVideoIndex === index ? 'opacity-20 dark:opacity-[0.25]' : 'opacity-0'",
  "activeVideoIndex === index ? 'opacity-70 dark:opacity-80' : 'opacity-0'"
);

// Replace overlay
content = content.replace(
  '<div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-brand)]/80 via-[var(--surface-brand)]/40 to-[var(--surface-brand)] pointer-events-none" />',
  '<div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-brand)]/35 via-transparent to-[var(--surface-brand)]/65 pointer-events-none" />'
);

// Replace grid pattern opacity
content = content.replace(
  '<div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.1] pointer-events-none" />',
  '<div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04] pointer-events-none" />'
);

fs.writeFileSync(path, content);
console.log('Hero.tsx updated with clear, crisp video settings.');
