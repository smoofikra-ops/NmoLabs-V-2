const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// The end of motion.header looks like:
//         </div>
//       </div>
//       </div>
//     </motion.header>
// Or something messed up. Let's just fix it with a regex.
code = code.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/motion\.header>/g, "</div></div></div></motion.header>");
code = code.replace(/<\/div>\s*<\/div>\s*<\/motion\.header>/g, "</div></div></div></motion.header>");
fs.writeFileSync('src/components/Header.tsx', code);
