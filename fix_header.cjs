const fs = require('fs');

let headerCode = fs.readFileSync('src/components/Header.tsx', 'utf8');

const emptyDiv = `<div className="hidden sm:flex items-center gap-3 border-l border-[var(--border-default)] pl-4 ml-2">
            
          </div>`;
headerCode = headerCode.replace(emptyDiv, "");

fs.writeFileSync('src/components/Header.tsx', headerCode);

