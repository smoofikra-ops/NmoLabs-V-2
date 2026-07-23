const fs = require('fs');

let footerCode = fs.readFileSync('src/components/Footer.tsx', 'utf8');
footerCode = footerCode.replace(
  "window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');",
  "let num = config.contactNumber.replace(/[^0-9]/g, ''); if(num.startsWith('05')) num = '966' + num.substring(1); window.open(`https://wa.me/${num}`, '_blank');"
);
fs.writeFileSync('src/components/Footer.tsx', footerCode);
