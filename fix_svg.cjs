const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

code = code.replace(
  /hoveredPath === 'services' \? "80%" : \n                  hoveredPath === 'work' \? "80%" : \n                  hoveredPath === 'products' \? "20%" : \n                  hoveredPath === 'innovation' \? "20%" : "50%"/g,
  `hoveredPath === 'services' ? "85%" : 
                  hoveredPath === 'work' ? "85%" : 
                  hoveredPath === 'products' ? "15%" : 
                  hoveredPath === 'innovation' ? "15%" : "50%"`
);

code = code.replace(
  /hoveredPath === 'services' \? "20%" : \n                  hoveredPath === 'work' \? "80%" : \n                  hoveredPath === 'products' \? "80%" : \n                  hoveredPath === 'innovation' \? "20%" : "50%"/g,
  `hoveredPath === 'services' ? "15%" : 
                  hoveredPath === 'work' ? "85%" : 
                  hoveredPath === 'products' ? "85%" : 
                  hoveredPath === 'innovation' ? "15%" : "50%"`
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
