const fs = require('fs');
let code = fs.readFileSync('src/data/services.tsx', 'utf8');

code = code.replace(/image: ecommerceImage,/g, "image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',");
code = code.replace(/image: 'https:\/\/images.unsplash.com\/photo-1460925895917[^']*',/g, "image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',");
code = code.replace(/image: socialMediaImage,/g, "image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',");
code = code.replace(/image: 'https:\/\/images.unsplash.com\/photo-1572177812156[^']*',/g, "image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&q=80&w=1200',");
code = code.replace(/image: 'https:\/\/images.unsplash.com\/photo-1455390582262[^']*',/g, "image: 'https://images.unsplash.com/photo-1488190211105-8b0e74b8638c?auto=format&fit=crop&q=80&w=1200',");
code = code.replace(/image: 'https:\/\/images.unsplash.com\/photo-1561070791[^']*',/g, "image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',");

fs.writeFileSync('src/data/services.tsx', code);
