const fs = require('fs');
const path = 'src/components/DiscoveryPortal.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
content = `import { getWhatsAppUrl } from "../lib/utils";\n` + content;

// Replace waUrl lines
content = content.replace(
  /const waUrl = `https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}\?text=\${encodeURIComponent\(msg\)}`;/,
  'const waUrl = getWhatsAppUrl(config.contactNumber, msg);'
);

content = content.replace(
  /const waUrl = `https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}\?text=\${encodeURIComponent\(fullWaMessage\)}`;/,
  'const waUrl = getWhatsAppUrl(config.contactNumber, fullWaMessage);'
);

fs.writeFileSync(path, content);
console.log('DiscoveryPortal updated successfully');
