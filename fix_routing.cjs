const fs = require('fs');
let code = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');

// modify getInitialConfig to read URL
code = code.replace(
  /const getInitialConfig = \(\) => \{/,
  `const getInitialConfig = () => {
  let initialRoute = 'home';
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.replace(/^\\/+/, '');
    if (path) {
      initialRoute = path;
    }
  }`
);

// find where currentRoute is set to 'home' in getInitialConfig when there's saved config
code = code.replace(
  /currentRoute: 'home',/g,
  `currentRoute: initialRoute,`
);

// modify return at the end of getInitialConfig
code = code.replace(
  /return \{ \.\.\.defaultConfig, theme: \(savedUserTheme as 'light' | 'dark'\) \|\| defaultConfig\.theme \};/,
  `return { ...defaultConfig, currentRoute: initialRoute, theme: (savedUserTheme as 'light' | 'dark') || defaultConfig.theme };`
);

// modify SiteProvider to pushState
const oldProvider = `export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config = useSite(state => state.config);
  React.useEffect(() => {
    if (config.theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }, [config.theme]);
  return <>{children}</>;
};`;

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
};`;

code = code.replace(oldProvider, newProvider);

fs.writeFileSync('src/context/SiteContext.tsx', code);
