const fs = require('fs');
let code = fs.readFileSync('src/components/WhatToBuild.tsx', 'utf8');

const mapping = {
  "image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80' },",
  "image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },",
  "image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80' },",
  "image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1481481600451-24ce8fc40e53?w=800&q=80' },",
  "image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80' },",
  "image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80' },",
  // ERP CRM (the second 1551288049)
  "image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80' },": "image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80' },"
};

for (const [key, value] of Object.entries(mapping)) {
  code = code.replace(key, value);
}

// Special replace for ERP CRM since it had the same image as landing initially
code = code.replace(
  "{ id: 'erp_crm', title: 'نظام ERP أو CRM', titleEn: 'ERP / CRM System', desc: 'إدارة متكاملة للموارد والعملاء', descEn: 'Integrated resource & customer management', icon: LineChart, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },",
  "{ id: 'erp_crm', title: 'نظام ERP أو CRM', titleEn: 'ERP / CRM System', desc: 'إدارة متكاملة للموارد والعملاء', descEn: 'Integrated resource & customer management', icon: LineChart, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },"
);

fs.writeFileSync('src/components/WhatToBuild.tsx', code);
