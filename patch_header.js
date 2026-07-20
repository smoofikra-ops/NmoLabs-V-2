import fs from 'fs';
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /triggerBookingModal\('طلب مشروع'\)/g,
  `{ updateConfig({ currentRoute: 'start-project' }); window.scrollTo(0, 0); }`
);

// We also need to change the main header button, which uses `handleAction('start-project')` ? Let's see what the desktop button uses.
