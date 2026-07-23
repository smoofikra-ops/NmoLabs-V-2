const fs = require('fs');
let code = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const oldHandleSave = `  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (config.partners) {
        const { savePartnersToFirestore } = await import('../lib/partners');
        await savePartnersToFirestore(config.partners);
      }`;

const newHandleSave = `  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (config.partners) {
        // Compress any existing oversized images before saving
        let needsUpdate = false;
        const compressedPartners = await Promise.all(config.partners.map(async (partner) => {
          if (partner.imageUrl && partner.imageUrl.length > 500000 && partner.imageUrl.startsWith('data:image')) {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;
                if (width > height) {
                  if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                  }
                } else {
                  if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                  }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/webp', 0.8);
                needsUpdate = true;
                resolve({ ...partner, imageUrl: dataUrl });
              };
              img.onerror = () => resolve(partner);
              img.src = partner.imageUrl;
            });
          }
          return partner;
        }));
        
        if (needsUpdate) {
          updateConfig({ partners: compressedPartners });
        }

        const { savePartnersToFirestore } = await import('../lib/partners');
        await savePartnersToFirestore(compressedPartners);
      }`;

code = code.replace(oldHandleSave, newHandleSave);
fs.writeFileSync('src/components/AdminPanel.tsx', code);
