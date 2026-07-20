import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  `      ) : config.currentRoute === 'products' ? (`,
  `      ) : config.currentRoute === 'start-project' ? (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div></div>}>
          <StartProjectPage />
        </Suspense>
      ) : config.currentRoute === 'products' ? (`
);

fs.writeFileSync('src/App.tsx', code);
