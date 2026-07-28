const fs = require('fs');

let headerCode = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldStart = `<motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
    >`;

const newStart = `<motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Announcement Bar */}
      <div className="bg-[var(--surface-primary)] border-b border-[var(--border-default)] px-4 py-1.5 flex items-center justify-between text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
        <div className="flex items-center gap-3 shrink-0" dir="ltr">
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
        </div>

        <div className="overflow-hidden whitespace-nowrap flex-1 ml-4 lg:ml-8 relative">
           <div className={isEn ? "inline-block animate-marquee" : "inline-block animate-marquee-rtl"}>
             {isEn 
               ? "Welcome to NmoLabs! We are a growth partner, not just a marketing agency. ✨ New innovative products coming soon. 🚀 (Website and tools are under continuous development)."
               : "مرحباً بك في نمو لابز! نحن شريك نمو ولسنا مجرد شركة تسويق. ✨ منتجات مبتكرة قريباً. 🚀 (الموقع والأدوات قيد التطوير والابتكار المستمر)."}
           </div>
        </div>
      </div>

      <div className="px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-[var(--surface-primary)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.05)] border border-[var(--border-default)]/60 rounded-2xl px-4 md:px-6 py-3 transition-colors backdrop-blur-xl">`;

headerCode = headerCode.replace(oldStart, newStart);

const oldButtonsRight = `{config.showThemeToggle && (
              <button onClick={toggleTheme} className="p-2 rounded-xl border border-transparent text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--interactive-border-hover)] focus:border-[var(--interactive-border-active)] transition-all cursor-pointer">
                {config.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button 
              onClick={handleToggleLanguage}
              className="p-2 rounded-xl border border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--interactive-border-hover)] focus:border-[var(--interactive-border-active)] transition-all font-english text-sm font-medium flex items-center gap-1 cursor-pointer"
            >
              <Globe size={18} />
              {config.language === 'en' ? 'عربي' : 'EN'}
            </button>`;

headerCode = headerCode.replace(oldButtonsRight, "");

const oldEndHeader = `</div>
    </motion.header>`;

const newEndHeader = `</div>
      </div>
    </motion.header>`;

headerCode = headerCode.replace(oldEndHeader, newEndHeader);

fs.writeFileSync('src/components/Header.tsx', headerCode);

