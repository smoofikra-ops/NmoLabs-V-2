const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<BookingModal \/>/g,
  "{config.currentRoute !== 'kyc' && <BookingModal />}"
);
code = code.replace(
  /<WhatsAppWidget \/>/g,
  "{config.currentRoute !== 'kyc' && <WhatsAppWidget />}"
);

fs.writeFileSync('src/App.tsx', code);
