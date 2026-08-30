const fs = require('fs');
const path = 'src/components/Footer.tsx';
let content = fs.readFileSync(path, 'utf8');

content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;

content = content.replace(
  /window\.open\(`https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}`, '_blank'\);/g,
  "window.open(getWhatsAppUrl(config.contactNumber), '_blank');"
);

fs.writeFileSync(path, content);
console.log('Footer updated successfully');
