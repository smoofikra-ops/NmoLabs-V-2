const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
if(!code.includes('const DiscoveryPortal = lazy')) {
  code = code.replace(
    /const StartProjectPage = lazy/g,
    "const DiscoveryPortal = lazy(() => import('./components/DiscoveryPortal').then(module => ({ default: module.DiscoveryPortal })));\nconst StartProjectPage = lazy"
  );
  fs.writeFileSync('src/App.tsx', code);
}
