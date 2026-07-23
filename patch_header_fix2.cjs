const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(/<\/div>\s*<\/div>\s*<AnimatePresence>/g, '</div>\n      </div>\n    </motion.header>\n      <AnimatePresence>');

fs.writeFileSync('src/components/Header.tsx', code);
