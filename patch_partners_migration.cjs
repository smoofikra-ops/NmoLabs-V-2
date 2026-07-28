const fs = require('fs');
let code = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');

const oldCode = `        customSections: parsed.customSections || [],
        partners: parsed.partners || defaultConfig.partners,`;

const newCode = `        customSections: parsed.customSections || [],
        partners: (parsed.partners || defaultConfig.partners).map((p: Partner) => {
          // Replace base64 or salla CDN urls with local public folder urls if they match the initial ones
          if (p.id === '1' && (p.imageUrl.includes('salla.sa') || p.imageUrl.startsWith('data:'))) p.imageUrl = '/partners/1.png';
          if (p.id === '3' && (p.imageUrl.includes('salla.sa') || p.imageUrl.startsWith('data:'))) p.imageUrl = '/partners/3.png';
          if (p.id === '4' && (p.imageUrl.includes('salla.sa') || p.imageUrl.startsWith('data:'))) p.imageUrl = '/partners/4.png';
          if (p.id === 'partner_1778961537430' && (p.imageUrl.includes('zid.store') || p.imageUrl.startsWith('data:'))) p.imageUrl = '/partners/regine.png';
          return p;
        }),`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('src/context/SiteContext.tsx', code);
