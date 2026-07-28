const fs = require('fs');
let code = fs.readFileSync('src/data/services.tsx', 'utf8');

if (!code.includes('import ecommerceImage')) {
  code = code.replace(
    "import { StrictServiceSeoData } from '../lib/schemas';",
    "import { StrictServiceSeoData } from '../lib/schemas';\nimport ecommerceImage from '../assets/images/regenerated_image_1784996549587.jpg';\nimport socialMediaImage from '../assets/images/regenerated_image_1784996544010.png';"
  );
}

code = code.replace(
  /id: 'ecommerce-setup',([\s\S]*?)image: '.*?',/g,
  "id: 'ecommerce-setup',$1image: ecommerceImage,"
);

code = code.replace(
  /id: 'social-media',([\s\S]*?)image: '.*?',/g,
  "id: 'social-media',$1image: socialMediaImage,"
);

fs.writeFileSync('src/data/services.tsx', code);
