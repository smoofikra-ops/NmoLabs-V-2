const fs = require('fs');
let code = fs.readFileSync('src/data/products.ts', 'utf8');

const visuals = {
  'ecommerce-management': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
  'smart-hr': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
  'ai-support-bot': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'smart-menu': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
  'media-buyer-dashboard': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  'nomu-trader': 'https://images.unsplash.com/photo-1586528116311-ad8ed7c50800?auto=format&fit=crop&q=80&w=1200',
  'accounting-systems': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200'
};

for (const [slug, url] of Object.entries(visuals)) {
  const searchStr = `slug: '${slug}',`;
  const replaceStr = `slug: '${slug}',\n    coverVisual: '${url}',`;
  code = code.replace(searchStr, replaceStr);
}

fs.writeFileSync('src/data/products.ts', code);
