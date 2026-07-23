const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

code = code.replace(
  "updateConfig({ partners: compressedPartners });",
  "updateConfig({ partners: compressedPartners as any });"
);

code = code.replace(
  "await savePartnersToFirestore(compressedPartners);",
  "await savePartnersToFirestore(compressedPartners as any);"
);

fs.writeFileSync('src/components/AdminPanel.tsx', code);
