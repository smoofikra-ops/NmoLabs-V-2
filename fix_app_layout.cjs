const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Hide Header and Footer if currentRoute === 'kyc'
code = code.replace(
  /<Header \/>/g,
  "{config.currentRoute !== 'kyc' && <Header />}"
);
code = code.replace(
  /<Footer \/>/g,
  "{config.currentRoute !== 'kyc' && <Footer />}"
);

fs.writeFileSync('src/App.tsx', code);
