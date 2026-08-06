const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

code = code.replace(
  /left: node\.id === 'services' \? '85%' : node\.id === 'work' \? '85%' : '15%',/g,
  `left: node.id === 'services' ? '80%' : node.id === 'work' ? '80%' : '20%',`
);
code = code.replace(
  /top: node\.id === 'services' \? '15%' : node\.id === 'innovation' \? '15%' : '85%'/g,
  `top: node.id === 'services' ? '20%' : node.id === 'innovation' ? '20%' : '80%'`
);

code = code.replace(
  /hoveredPath === 'services' \? "85%" : \n                  hoveredPath === 'work' \? "85%" : \n                  hoveredPath === 'products' \? "15%" : \n                  hoveredPath === 'innovation' \? "15%" : "50%"/g,
  `hoveredPath === 'services' ? "80%" : \n                  hoveredPath === 'work' ? "80%" : \n                  hoveredPath === 'products' ? "20%" : \n                  hoveredPath === 'innovation' ? "20%" : "50%"`
);

code = code.replace(
  /hoveredPath === 'services' \? "15%" : \n                  hoveredPath === 'work' \? "85%" : \n                  hoveredPath === 'products' \? "85%" : \n                  hoveredPath === 'innovation' \? "15%" : "50%"/g,
  `hoveredPath === 'services' ? "20%" : \n                  hoveredPath === 'work' ? "80%" : \n                  hoveredPath === 'products' ? "80%" : \n                  hoveredPath === 'innovation' ? "20%" : "50%"`
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
