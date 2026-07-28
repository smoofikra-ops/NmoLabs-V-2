const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(/<\/div><\/div><\/motion\.header>/g, "</div></div></div></motion.header>");

fs.writeFileSync('src/components/Header.tsx', code);
