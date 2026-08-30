const fs = require('fs');
const path = 'src/components/WhatsAppWidget.tsx';
let content = fs.readFileSync(path, 'utf8');

content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;

content = content.replace(
  /const phoneNumber = config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\);\s*const encodedMessage = encodeURIComponent\(message\);\s*window\.open\(`https:\/\/wa\.me\/\${phoneNumber}\?text=\${encodedMessage}`, '_blank'\);/,
  "window.open(getWhatsAppUrl(config.contactNumber, message), '_blank');"
);

fs.writeFileSync(path, content);
console.log('WhatsAppWidget updated successfully');
