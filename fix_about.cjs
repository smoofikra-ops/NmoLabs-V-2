const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

// Update center hub text to have nice AnimatePresence
const centerHubReplacement = `
              {/* Center Hub */}
              <div className="absolute z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--surface-primary)] border-2 border-[var(--color-primary)] flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(79,142,247,0.3)] transition-all duration-300 overflow-hidden">
                <span className="font-black text-[10px] sm:text-sm tracking-widest font-english text-[var(--text-primary)]">NMOLABS</span>
                <div className="h-4 flex items-center justify-center mt-1 w-full">
                  <AnimatePresence mode="wait">
                    <motion.span 
                      key={hoveredPath || 'ecosystem'}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="text-[9px] sm:text-[10px] text-[var(--color-primary)] font-bold uppercase tracking-wider block"
                    >
                      {hoveredPath ? hoveredPath : (isEn ? 'Ecosystem' : 'المنظومة')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] animate-ping opacity-20 pointer-events-none" />
              </div>
`;

code = code.replace(
  /\{\/\* Center Hub \*\/\}.*?<\/div>/s,
  centerHubReplacement.trim()
);

fs.writeFileSync('src/components/AboutPage.tsx', code);
