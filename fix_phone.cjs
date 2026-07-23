const fs = require('fs');

// Update SiteContext
let contextCode = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');
contextCode = contextCode.replace("contactNumber: '+966500804990'", "contactNumber: '0500804990'");
fs.writeFileSync('src/context/SiteContext.tsx', contextCode);

// Update Header.tsx whatsapp link
let headerCode = fs.readFileSync('src/components/Header.tsx', 'utf8');
headerCode = headerCode.replace(
  "window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');",
  "let num = config.contactNumber.replace(/[^0-9]/g, ''); if(num.startsWith('05')) num = '966' + num.substring(1); window.open(`https://wa.me/${num}`, '_blank');"
);
fs.writeFileSync('src/components/Header.tsx', headerCode);

// Update StartProjectPage.tsx whatsapp link
let startProjectCode = fs.readFileSync('src/components/StartProjectPage.tsx', 'utf8');
startProjectCode = startProjectCode.replace(
  "const num = config.contactNumber?.replace(/[^0-9]/g, '') || '966500000000';",
  "let num = config.contactNumber?.replace(/[^0-9]/g, '') || '966500000000'; if(num.startsWith('05')) num = '966' + num.substring(1);"
);
fs.writeFileSync('src/components/StartProjectPage.tsx', startProjectCode);

