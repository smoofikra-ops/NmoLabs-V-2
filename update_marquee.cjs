const fs = require('fs');

let headerCode = fs.readFileSync('src/components/Header.tsx', 'utf8');

headerCode = headerCode.replace(
  /"Welcome to NmoLabs! We are a growth partner, not just a marketing agency. ✨ New innovative products coming soon. 🚀 \(Website and tools are under continuous development\)."/g,
  '"Welcome to NmoLabs! We are different from any other agency; we are your growth partner, not just a marketing company. ✨ We innovate exceptional ideas and solutions for your success. Stay tuned for our new innovative products and tools coming soon! 🚀 (Please note that the website and tools are currently under continuous development and innovation)."'
);

headerCode = headerCode.replace(
  /"مرحباً بك في نمو لابز! نحن شريك نمو ولسنا مجرد شركة تسويق. ✨ منتجات مبتكرة قريباً. 🚀 \(الموقع والأدوات قيد التطوير والابتكار المستمر\)."/g,
  '"مرحباً بك في نمو لابز! نختلف عن أي شركة أخرى، فنحن شريك نمو لك ولسنا مجرد شركة تسويقية. ✨ نبتكر أفكاراً وحلولاً استثنائية لنجاحك. ترقبوا الإعلان عن منتجاتنا وأدواتنا الجديدة المبتكرة قريباً! 🚀 (يرجى العلم أن الموقع والأدوات حالياً قيد التطوير والابتكار المستمر لتلبية تطلعاتكم)."'
);

fs.writeFileSync('src/components/Header.tsx', headerCode);
