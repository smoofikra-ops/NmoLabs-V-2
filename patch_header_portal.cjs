const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// The return statement starts with:
// return (
//    <motion.header ...
const oldReturn = '  return (\n    <motion.header';
const newReturn = '  return (\n    <>\n    <motion.header';

code = code.replace(oldReturn, newReturn);

const oldClose = `        </div>
      </div>
      <AnimatePresence>`;

const newClose = `        </div>
      </div>
    </motion.header>
    <AnimatePresence>`;

code = code.replace(oldClose, newClose);

const oldFinalClose = `        )}
      </AnimatePresence>
    </motion.header>
  );
};`;

const newFinalClose = `        )}
      </AnimatePresence>
    </>
  );
};`;

code = code.replace(oldFinalClose, newFinalClose);

fs.writeFileSync('src/components/Header.tsx', code);
