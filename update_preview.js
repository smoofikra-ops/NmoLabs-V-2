import fs from 'fs';
let code = fs.readFileSync('src/components/WorkPreview.tsx', 'utf8');

code = code.replace(
  /              onClick=\{\(\) => \{\n                updateConfig\(\{ currentRoute: `work\/\$\{project\.slug\}` \}\);\n                window\.scrollTo\(\{top: 0, behavior: 'smooth'\}\);\n              \}\}/g,
  `              onClick={() => {
                if(project.status !== 'needs_documentation') {
                  updateConfig({ currentRoute: \`work/\${project.slug}\` });
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }
              }}`
);
fs.writeFileSync('src/components/WorkPreview.tsx', code);
