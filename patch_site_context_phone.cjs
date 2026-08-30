const fs = require('fs');
const path = 'src/context/SiteContext.tsx';
let content = fs.readFileSync(path, 'utf8');

// Update defaultConfig contactNumber
content = content.replace(/contactNumber:\s*['"][^'"]*['"]/, "contactNumber: '0500804990'");

// Update getInitialConfig to migrate old contact numbers
const targetPattern = `      return {
        ...defaultConfig,
        ...parsed,`;

const replacementPattern = `      let resolvedContactNumber = parsed.contactNumber || defaultConfig.contactNumber;
      if (!resolvedContactNumber || resolvedContactNumber.includes('545698905')) {
        resolvedContactNumber = '0500804990';
      }

      return {
        ...defaultConfig,
        ...parsed,
        contactNumber: resolvedContactNumber,`;

if (content.includes(targetPattern)) {
  content = content.replace(targetPattern, replacementPattern);
  fs.writeFileSync(path, content);
  console.log('SiteContext successfully updated with migrated contactNumber!');
} else {
  console.error('Target pattern not found in SiteContext');
}
