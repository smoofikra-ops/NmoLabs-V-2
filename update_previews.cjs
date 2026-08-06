const fs = require('fs');

function updateWork() {
  let code = fs.readFileSync('src/components/WorkPreview.tsx', 'utf8');
  code = code.replace(
    /className="group relative rounded-3xl/g, 
    'className={`group relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-500 aspect-[4/5] sm:aspect-square md:aspect-[4/5] flex flex-col justify-end ${idx === 2 ? \'col-span-2 lg:col-span-1 aspect-[2/1] sm:aspect-square\' : \'\'}`}'
  );
  // Remove the old className string
  code = code.replace(/ className="group relative rounded-3xl overflow-hidden bg-\[#111\] border border-white\/10 cursor-pointer hover:border-white\/30 transition-all duration-500 aspect-\[4\/5\] flex flex-col justify-end"/, '');
  fs.writeFileSync('src/components/WorkPreview.tsx', code);
}

function updateProducts() {
  let code = fs.readFileSync('src/components/ProductsPreview.tsx', 'utf8');
  // It already has: className={`... flex flex-col h-full ${idx === 2 ? 'col-span-2' : ''}`}
  // Let's refine it to look like a premium bento box.
  code = code.replace(
    /className=\{\`group relative rounded-3xl p-4 sm:p-8 bg-\[#111\] border border-white\/10 hover:border-white\/30 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col h-full \$\{idx === 2 \? 'col-span-2' : ''\}\`\}/g,
    'className={`group relative rounded-3xl p-4 sm:p-8 bg-[#111] border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col h-full ${idx === 0 ? \'col-span-2 lg:col-span-1 min-h-[220px]\' : \'col-span-1 min-h-[200px]\'}`}'
  );
  fs.writeFileSync('src/components/ProductsPreview.tsx', code);
}

updateWork();
updateProducts();
