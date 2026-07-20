const fs = require('fs');
let code = fs.readFileSync('src/components/WorkGridCard.tsx', 'utf8');

// Replace motion.div with motion.button or motion.a
// Add buttons
code = code.replace(/<motion\.div\n      initial=\{\{ opacity/g, `<motion.div
      initial={{ opacity`);

// actually, let's just rewrite WorkGridCard.tsx completely using fs.writeFileSync
