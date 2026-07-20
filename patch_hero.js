import fs from 'fs';
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

code = code.replace(
  `onClick={() => triggerBookingModal('طلب مشروع')}`,
  `onClick={() => { updateConfig({ currentRoute: 'start-project' }); window.scrollTo(0, 0); }}`
);

fs.writeFileSync('src/components/Hero.tsx', code);
