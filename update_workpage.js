const fs = require('fs');
let code = fs.readFileSync('src/components/WorkPage.tsx', 'utf8');

const regex = /<motion\.div\s*initial={{ opacity: 0, scale: 0\.95 }}[\s\S]*?<\/motion\.div>/g;

const newCode = code.replace(regex, `<WorkGridCard key={project.id} project={project} isEn={isEn} updateConfig={updateConfig} getGridClass={getGridClass} />`);

fs.writeFileSync('src/components/WorkPage.tsx', newCode);
console.log('done');
