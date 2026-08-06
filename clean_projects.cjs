const fs = require('fs');

let code = fs.readFileSync('src/data/projects.ts', 'utf8');

// Remove duplicate coverImages. A simple way: find any project block with two coverImages and remove the first one.
// Better: just regex for two coverImages back to back
code = code.replace(/coverImage: '[^']+',\n\s*coverImage: '[^']+',/g, (match) => {
  return match.split('\n')[1]; // keep the second one
});

fs.writeFileSync('src/data/projects.ts', code);
