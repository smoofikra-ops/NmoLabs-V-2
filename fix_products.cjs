const fs = require('fs');

let code = fs.readFileSync('src/components/ProductsPreview.tsx', 'utf8');

code = code.replace(
  /className="bg-\[var\(--surface-secondary\)\] border border-\[var\(--border-default\)\] rounded-3xl overflow-hidden hover:border-\[var\(--color-primary\)\] transition-all group"/g,
  "className={`bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden hover:border-[var(--color-primary)] transition-all group flex flex-col ${idx === 2 ? 'col-span-2' : 'col-span-1'}`}"
);

// also fix image container to handle dynamic heights better
code = code.replace(
  /<div className="aspect-\[16\/10\] relative overflow-hidden bg-\[var\(--surface-tertiary\)\]">/g,
  '<div className="aspect-[16/10] sm:aspect-video relative overflow-hidden bg-[var(--surface-tertiary)]">'
);

fs.writeFileSync('src/components/ProductsPreview.tsx', code);
