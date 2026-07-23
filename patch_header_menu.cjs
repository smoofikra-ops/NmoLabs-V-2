const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldMenuStr = "className={`fixed top-4 bottom-4 w-[85%] max-w-[320px] bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-2xl z-[70] lg:hidden flex flex-col p-6 overflow-y-auto rounded-3xl ${config.language === 'en' ? 'left-4' : 'right-4'}`}";
const newMenuStr = "className={`fixed top-0 bottom-0 w-[85%] max-w-[320px] bg-[var(--surface-primary)] border-[var(--border-default)] shadow-2xl z-[70] lg:hidden flex flex-col p-6 overflow-y-auto ${config.language === 'en' ? 'left-0 border-r rounded-r-3xl' : 'right-0 border-l rounded-l-3xl'}`}";

code = code.replace(oldMenuStr, newMenuStr);

const oldInitial = "initial={{ x: config.language === 'en' ? '-120%' : '120%' }}";
const oldExit = "exit={{ x: config.language === 'en' ? '-120%' : '120%' }}";

code = code.replace(oldInitial, "initial={{ x: config.language === 'en' ? '-100%' : '100%' }}");
code = code.replace(oldExit, "exit={{ x: config.language === 'en' ? '-100%' : '100%' }}");

fs.writeFileSync('src/components/Header.tsx', code);
