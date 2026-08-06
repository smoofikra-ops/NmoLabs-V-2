const fs = require('fs');
let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

// Replace the style inline math with explicit top/left
code = code.replace(
  /style=\{\{\s*transform: `translate[^`]+`,\s*left: `calc[^`]+`,\s*top: `calc[^`]+`\s*\}\}/g,
  `style={{
    left: node.id === 'services' || node.id === 'work' ? '85%' : '15%',
    top: node.id === 'services' || node.id === 'innovation' ? '15%' : '85%',
    transform: 'translate(-50%, -50%)'
  }}`
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
