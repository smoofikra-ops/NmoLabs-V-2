const fs = require('fs');

let code = fs.readFileSync('src/data/projects.ts', 'utf8');

// The objects seem to have coverImage defined multiple times.
// Let's use a regex to fix it.
// Wait, the regex is tricky because we want to remove the *second* coverImage or *all but last*.
// Since they are just strings, let's just parse the file and re-write it? No, it's TS with TS types.
// We can find instances where `coverImage: '...'` appears more than once in a `{ ... }` block.
// A simpler way: split by `{` and `}`, then within each block, if there are multiple `coverImage:`, keep only the first one.

let inObject = false;
let objectParts = [];
let buffer = '';

let result = code.split(/(?=\{)|(?<=\})/).map(part => {
  if (part.startsWith('{')) {
    // Check if it has multiple coverImage
    let lines = part.split('\n');
    let seenCover = false;
    let newLines = lines.filter(line => {
      if (line.includes('coverImage:')) {
        if (seenCover) return false;
        seenCover = true;
      }
      return true;
    });
    return newLines.join('\n');
  }
  return part;
});

fs.writeFileSync('src/data/projects.ts', result.join(''));
