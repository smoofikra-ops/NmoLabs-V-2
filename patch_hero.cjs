const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Improve the display of the image inside the card
const cardContent = `<div className="absolute inset-0 flex flex-col items-center justify-start bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden group">
            {/* Top Bar for Mockup */}
            <div className="w-full h-10 border-b border-[var(--border-default)] bg-[var(--surface-secondary)] flex items-center px-4 gap-2 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* Background Image Container */}
            <div className="relative w-full flex-grow overflow-hidden bg-[var(--surface-secondary)]">
               <img 
                 src={SHOWCASE_ITEMS[activeIndex].image} 
                 alt={SHOWCASE_ITEMS[activeIndex].label}
                 loading={activeIndex === 0 ? "eager" : "lazy"}
                 decoding="async"
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-110 ease-linear"
               />
               {/* Overlay to ensure text readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-[var(--surface-primary)]/40 to-transparent" />
               <div className="absolute inset-0 bg-black/20" />
               
               {/* Content */}
               <div className="absolute inset-0 z-10 flex flex-col items-center justify-end p-8 text-center">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-4 text-white shadow-lg">
                    {React.createElement(SHOWCASE_ITEMS[activeIndex].icon, {
                      size: 40,
                      strokeWidth: 1.5,
                      style: { color: 'white' },
                    })}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 text-shadow-sm px-4 py-1 rounded-full">
                    {SHOWCASE_ITEMS[activeIndex].label}
                  </h3>
                  <div className="w-16 h-1.5 rounded-full mx-auto mt-2" style={{ backgroundColor: SHOWCASE_ITEMS[activeIndex].color }} />
               </div>
            </div>`;

code = code.replace(
  /<div className="absolute inset-0 flex flex-col items-center justify-center bg-\[var\(--surface-primary\)\] border border-\[var\(--border-default\)\] rounded-3xl shadow-\[var\(--shadow-hover\)\] overflow-hidden glass".*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/motion\.div>/s,
  cardContent + '\n          </motion.div>'
);

// We should also replace the motion.div wrapper opening tag
code = code.replace(
  /<motion\.div\s*key=\{activeIndex\}\s*initial=\{\{ opacity: 0, scale: 0\.8, y: 20 \}\}\s*animate=\{\{ opacity: 1, scale: 1, y: 0 \}\}\s*exit=\{\{ opacity: 0, scale: 0\.8, y: -20 \}\}\s*transition=\{\{ duration: 0\.5, ease: "easeOut" \}\}\s*className="absolute inset-0 flex flex-col items-center justify-center bg-\[var\(--surface-primary\)\] border border-\[var\(--border-default\)\] rounded-3xl shadow-\[var\(--shadow-hover\)\] overflow-hidden glass"\s*>/s,
  `<motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >`
);

// Add hovered state to the component
code = code.replace(
  'const [activeIndex, setActiveIndex] = useState(0);',
  'const [activeIndex, setActiveIndex] = useState(0);\n  const [hovered, setHovered] = useState(false);'
);

// Pause interval on hover
code = code.replace(
  '  useEffect(() => {\n    const interval = setInterval(() => {\n      setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);\n    }, 3000);\n    return () => clearInterval(interval);\n  }, []);',
  '  useEffect(() => {\n    if (hovered) return;\n    const interval = setInterval(() => {\n      setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);\n    }, 4000);\n    return () => clearInterval(interval);\n  }, [hovered]);'
);

fs.writeFileSync('src/components/Hero.tsx', code);
