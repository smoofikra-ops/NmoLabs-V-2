const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

// 1. Remove buttons from Announcement bar
const announcementButtons = `<div className="flex items-center gap-3 shrink-0" dir="ltr">
          <button 
            onClick={handleToggleLanguage}
            className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            aria-label={isEn ? "Toggle Language" : "تغيير اللغة"}
          >
             <Globe size={16} />
          </button>
          {config.showThemeToggle && (
            <button 
              onClick={toggleTheme} 
              className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors cursor-pointer" 
              aria-label={isEn ? "Toggle Theme" : "تغيير المظهر"}
            >
              {config.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
        </div>`;
code = code.replace(announcementButtons, '');

// 2. Add them next to Start Project button
const newButtons = `<div className="hidden sm:flex items-center gap-4 mr-4 border-r border-[var(--border-default)] pr-4">
            <button 
              onClick={handleToggleLanguage}
              className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
              aria-label={isEn ? "Toggle Language" : "تغيير اللغة"}
            >
               <Globe size={20} />
            </button>
            {config.showThemeToggle && (
              <button 
                onClick={toggleTheme} 
                className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer" 
                aria-label={isEn ? "Toggle Theme" : "تغيير المظهر"}
              >
                {config.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>
          `;

code = code.replace('<div className="flex items-center gap-4">', '<div className="flex items-center gap-4">' + newButtons);

fs.writeFileSync('src/components/Header.tsx', code);
