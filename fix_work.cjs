const fs = require('fs');

let code = fs.readFileSync('src/components/WorkPreview.tsx', 'utf8');

code = code.replace(
  /className=\{`group relative rounded-3xl overflow-hidden bg-\[#111\] border border-white\/10 cursor-pointer hover:border-white\/30 transition-all duration-500 aspect-\[4\/5\] sm:aspect-square md:aspect-\[4\/5\] flex flex-col justify-end \$\{idx === 2 \? 'col-span-2 lg:col-span-1 aspect-\[2\/1\] sm:aspect-square' : ''\}`\} overflow-hidden bg-\[#111\] border border-white\/10 cursor-pointer hover:border-white\/30 transition-all duration-500 aspect-\[4\/5\] flex flex-col justify-end"/g,
  "className={`group relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-500 aspect-[4/5] sm:aspect-square md:aspect-[4/5] flex flex-col justify-end ${idx === 2 ? 'col-span-2 lg:col-span-1 aspect-[2/1] sm:aspect-square' : ''}`}"
);

fs.writeFileSync('src/components/WorkPreview.tsx', code);
