const fs = require('fs');
let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

code = code.replace(
  "let result = { success: false, submission_id: '', row_number: null, message: '' };",
  "let result: any = { success: false, submission_id: '', row_number: null, message: '' };"
);

fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
