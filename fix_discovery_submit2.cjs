const fs = require('fs');
let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

code = code.replace(
  /const waPhone = '966500000000'; \/\/ Replace with actual company WA number if needed, using generic or what was there/,
  `let waPhone = config.contactNumber.replace(/[^0-9]/g, '');\n    if (waPhone.startsWith('05')) waPhone = '966' + waPhone.substring(1);`
);

fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
