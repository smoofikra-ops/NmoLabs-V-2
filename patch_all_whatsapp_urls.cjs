const fs = require('fs');

// 1. Header.tsx
{
  const path = 'src/components/Header.tsx';
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('getWhatsAppUrl')) {
    content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;
  }
  content = content.replace(
    /window\.open\(`https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}`, '_blank'\);/g,
    "window.open(getWhatsAppUrl(config.contactNumber), '_blank');"
  );
  fs.writeFileSync(path, content);
  console.log('Header.tsx updated');
}

// 2. AboutPage.tsx
{
  const path = 'src/components/AboutPage.tsx';
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('getWhatsAppUrl')) {
    content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;
  }
  content = content.replace(
    /window\.open\(`https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}`, '_blank'\);/g,
    "window.open(getWhatsAppUrl(config.contactNumber), '_blank');"
  );
  fs.writeFileSync(path, content);
  console.log('AboutPage.tsx updated');
}

// 3. WhyChooseUs.tsx
{
  const path = 'src/components/WhyChooseUs.tsx';
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('getWhatsAppUrl')) {
    content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;
  }
  content = content.replace(
    /window\.open\(`https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}`, '_blank'\);/g,
    "window.open(getWhatsAppUrl(config.contactNumber), '_blank');"
  );
  fs.writeFileSync(path, content);
  console.log('WhyChooseUs.tsx updated');
}

// 4. StartProjectPage.tsx
{
  const path = 'src/components/StartProjectPage.tsx';
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('getWhatsAppUrl')) {
    content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;
  }
  content = content.replace(
    /let num = config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\);\s*window\.open\(`https:\/\/wa\.me\/\${num}\?text=\${encodeURIComponent\(text\)}`, '_blank'\);/,
    "window.open(getWhatsAppUrl(config.contactNumber, text), '_blank');"
  );
  fs.writeFileSync(path, content);
  console.log('StartProjectPage.tsx updated');
}

// 5. ToolsGrid.tsx
{
  const path = 'src/components/ToolsGrid.tsx';
  let content = fs.readFileSync(path, 'utf8');
  if (!content.includes('getWhatsAppUrl')) {
    content = `import { getWhatsAppUrl } from '../lib/utils';\n` + content;
  }
  content = content.replace(
    /href={config\.contactNumber \? `https:\/\/wa\.me\/\${config\.contactNumber\.replace\(\/\[\^0-9\]\/g, ''\)}` : '#contact'}/g,
    "href={config.contactNumber ? getWhatsAppUrl(config.contactNumber) : '#contact'}"
  );
  fs.writeFileSync(path, content);
  console.log('ToolsGrid.tsx updated');
}

// 6. AdminPanel.tsx placeholder
{
  const path = 'src/components/AdminPanel.tsx';
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/placeholder="966500804990"/g, 'placeholder="0500804990"');
  fs.writeFileSync(path, content);
  console.log('AdminPanel.tsx updated');
}
