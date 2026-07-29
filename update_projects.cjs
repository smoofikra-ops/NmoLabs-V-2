const fs = require('fs');
let code = fs.readFileSync('src/data/projects.ts', 'utf8');

const visuals = {
  'regine': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',
  'endeve': 'https://images.unsplash.com/photo-1550009158-9ebf6d173c36?auto=format&fit=crop&q=80&w=1200',
  'safqatkom-care': 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200',
  'reflow': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  'hessa-tissues': 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=1200',
  'poly-market': 'https://images.unsplash.com/photo-1580913428706-c311e67898b3?auto=format&fit=crop&q=80&w=1200',
  'ulevel': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
  'nuqoush': 'https://images.unsplash.com/photo-1542744094-24638ea0bc40?auto=format&fit=crop&q=80&w=1200',
  'dembo': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
  'general-electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1200',
  'rare-idea': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
  'nakhlatain': 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200',
  'thulth-al-youm': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200',
  'al-mithali': 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=1200',
  'eventlive-ksa': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1200',
  'nomu-trader': 'https://images.unsplash.com/photo-1586528116311-ad8ed7c50800?auto=format&fit=crop&q=80&w=1200',
  'rawafid-al-janoub': 'https://images.unsplash.com/photo-1576092762791-dd9e2220c476?auto=format&fit=crop&q=80&w=1200'
};

for (const [slug, url] of Object.entries(visuals)) {
  const searchStr = `slug: '${slug}',`;
  const replaceStr = `slug: '${slug}',\n    coverImage: '${url}',`;
  code = code.replace(searchStr, replaceStr);
}

fs.writeFileSync('src/data/projects.ts', code);
