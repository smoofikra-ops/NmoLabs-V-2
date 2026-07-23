const fs = require('fs');
let code = fs.readFileSync('src/components/Solutions.tsx', 'utf8');

const regex = /\{\/\* Navigator of Growth Section \*\/\}[\s\S]*?(?=<\/section>)/;

const newSection = `{/* Navigator of Growth Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl border border-[var(--color-primary)]/30 bg-[var(--surface-primary)]/60 relative overflow-hidden group shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_0_30px_rgba(79,142,247,0.15)] backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-[10px] font-bold mb-4 text-blue-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              قريباً - أداة جديدة
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black mb-4 text-[var(--text-primary)] text-shadow-sm drop-shadow-[0_2px_10px_rgba(79,142,247,0.3)]">
              سفير النمو <span className="text-[var(--color-primary)] block mt-1 text-sm sm:text-base font-bold">Ambassador of Growth</span>
            </h3>
            
            <div className="text-[var(--text-muted)] leading-relaxed space-y-2 mb-6 text-xs sm:text-sm">
              <p>
                <TypewriterText text='نعمل حالياً على إطلاق أداة "سفير النمو" قريباً للمتاجر الإلكترونية... الأداة ستكون متاحة على منصات (زد وسلة) لجميع التجار.' delay={300} speed={40} />
              </p>
              <p className="text-[var(--text-secondary)]">
                <TypewriterText text="صُممت هذه الأداة خصيصاً لحل مشكلة ارتفاع تكاليف الاستحواذ للعملاء." delay={3000} speed={40} />
              </p>
            </div>
            
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold text-sm shadow-lg hover:shadow-[0_0_20px_rgba(79,142,247,0.4)] transition-all transform hover:-translate-y-1">
              أخبرني عند الإطلاق
            </button>
          </div>
        </motion.div>
      </div>
`;

code = code.replace(regex, newSection);
fs.writeFileSync('src/components/Solutions.tsx', code);
