const fs = require('fs');
let code = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');

const oldProviderMatch = /export const SiteProvider[\s\S]*?\};\n/;

const newProvider = `export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { config, updateConfig } = useSite();
  React.useEffect(() => {
    if (config.theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }, [config.theme]);

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\\/+/, '') || 'home';
      updateConfig({ currentRoute: path });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  React.useEffect(() => {
    if (config.currentRoute) {
      const targetUrl = config.currentRoute === 'home' ? '/' : \`/\${config.currentRoute}\`;
      if (window.location.pathname !== targetUrl) {
        window.history.pushState(null, '', targetUrl);
      }
    }
  }, [config.currentRoute]);

  return <>{children}</>;
};
`;

code = code.replace(oldProviderMatch, newProvider);

fs.writeFileSync('src/context/SiteContext.tsx', code);
