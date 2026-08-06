const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('src/components');

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf8');
  let changed = false;

  // py-16 sm:py-24 md:py-32 -> py-10 sm:py-16 md:py-24
  if (code.includes('py-16 sm:py-24 md:py-32')) {
    code = code.replace(/py-16 sm:py-24 md:py-32/g, 'py-10 sm:py-16 md:py-24');
    changed = true;
  }
  
  if (code.includes('py-16 md:py-24')) {
    code = code.replace(/py-16 md:py-24/g, 'py-10 md:py-20');
    changed = true;
  }

  if (code.includes('py-24 md:py-32')) {
    code = code.replace(/py-24 md:py-32/g, 'py-12 md:py-24');
    changed = true;
  }
  
  if (code.includes('py-20 md:py-32')) {
    code = code.replace(/py-20 md:py-32/g, 'py-12 md:py-24');
    changed = true;
  }

  if (code.includes('py-24 border-b')) {
    code = code.replace(/py-24 border-b/g, 'py-12 lg:py-24 border-b');
    changed = true;
  }
  
  if (code.includes('py-24')) {
    code = code.replace(/py-24/g, 'py-12 lg:py-24');
    changed = true;
  }

  // Also reduce mb-20 to mb-12 sm:mb-20
  if (code.includes('mb-20')) {
    code = code.replace(/mb-20/g, 'mb-10 lg:mb-20');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, code);
  }
});

