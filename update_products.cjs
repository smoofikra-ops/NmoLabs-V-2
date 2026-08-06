const fs = require('fs');

let code = fs.readFileSync('src/data/products.ts', 'utf8');

// For any product without coverVisual, let's add one.
code = code.replace(
  /brandColor: '#ff2a2a',/g, 
  "brandColor: '#ff2a2a',\n    coverVisual: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',"
);

code = code.replace(
  /brandColor: '#ff6b00',/g, 
  "brandColor: '#ff6b00',\n    coverVisual: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',"
);

code = code.replace(
  /brandColor: '#00a3ff',/g, 
  "brandColor: '#00a3ff',\n    coverVisual: 'https://images.unsplash.com/photo-1542744094-24638ea0bc40?auto=format&fit=crop&q=80&w=1200',"
);

code = code.replace(
  /brandColor: '#4f8ef7',/g, 
  "brandColor: '#4f8ef7',\n    coverVisual: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200',"
);

fs.writeFileSync('src/data/products.ts', code);
