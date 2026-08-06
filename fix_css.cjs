const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

code = code.replace(
  /transform: \`translate\(calc\(cos\(\$\{rad\}rad\) \* 100px\), calc\(sin\(\$\{rad\}rad\) \* 100px\)\)\`, \/\/ fallback\s*left: \`calc\(50% \+ cos\(\$\{rad\}rad\) \* \$\{radius\} - 28px\)\`,\s*top: \`calc\(50% \+ sin\(\$\{rad\}rad\) \* \$\{radius\} - 28px\)\`/g,
  `transform: 'translate(-50%, -50%)',
                      left: node.id === 'services' ? '85%' : node.id === 'work' ? '85%' : '15%',
                      top: node.id === 'services' ? '15%' : node.id === 'innovation' ? '15%' : '85%'`
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
