const fs = require('fs');
let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

// I will overwrite the whole file using fs.writeFileSync instead, so I can just prepare the content.
