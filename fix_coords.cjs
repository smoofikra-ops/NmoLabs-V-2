const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

// Fix left
code = code.replace(
  /left: node\.id === 'services' \? '80%' : node\.id === 'work' \? '80%' : '20%',/g,
  `left: node.id === 'services' ? '75%' : node.id === 'work' ? '75%' : '25%',`
);
// Fix top
code = code.replace(
  /top: node\.id === 'services' \? '20%' : node\.id === 'innovation' \? '20%' : '80%'/g,
  `top: node.id === 'services' ? '25%' : node.id === 'innovation' ? '25%' : '75%'`
);

// Fix SVG x2
code = code.replace(
  /hoveredPath === 'services' \? "80%" : \n\s*hoveredPath === 'work' \? "80%" : \n\s*hoveredPath === 'products' \? "20%" : \n\s*hoveredPath === 'innovation' \? "20%" : "50%"/g,
  `hoveredPath === 'services' ? "75%" : 
                  hoveredPath === 'work' ? "75%" : 
                  hoveredPath === 'products' ? "25%" : 
                  hoveredPath === 'innovation' ? "25%" : "50%"`
);

// Fix SVG y2
code = code.replace(
  /hoveredPath === 'services' \? "20%" : \n\s*hoveredPath === 'work' \? "80%" : \n\s*hoveredPath === 'products' \? "80%" : \n\s*hoveredPath === 'innovation' \? "20%" : "50%"/g,
  `hoveredPath === 'services' ? "25%" : 
                  hoveredPath === 'work' ? "75%" : 
                  hoveredPath === 'products' ? "75%" : 
                  hoveredPath === 'innovation' ? "25%" : "50%"`
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
