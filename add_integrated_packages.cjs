const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

const targetStr = `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 md:p-12 bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl text-center shadow-lg relative overflow-hidden">`;

const integratedPackages = `
        {/* Integrated Packages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)] flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
               {isEn ? 'Integrated Packages' : 'باقات متكاملة'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {servicesList.filter(s => ['ads-management', 'social-media', 'ui-ux', 'copywriting'].includes(s.id) && s.id !== service.id).map((s, i) => (
                <div key={i} className="group relative p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-xl flex flex-col overflow-hidden min-h-[220px] cursor-pointer" onClick={() => { updateConfig({ currentRoute: 'services/' + s.id }); }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-6 z-10">
                    <div className="p-4 rounded-2xl transition-all duration-500 bg-white/5 shadow-sm border border-white/5 text-[var(--color-primary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--color-primary)] group-hover:shadow-[0_0_20px_var(--color-primary)] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3">
                      {s.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl md:text-2xl text-white group-hover:text-[var(--color-primary)] transition-colors duration-300 z-10 mb-4">{isEn ? s.titleEn : s.title}</h3>
                  <p className="text-white/50 text-sm mb-6 line-clamp-2 relative z-10">{isEn ? s.descEn : s.desc}</p>
                  
                  <div className="mt-auto z-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 group-hover:via-[var(--color-primary)] to-transparent mb-4 transition-colors duration-500"></div>
                    <button className="flex items-center gap-2 text-[var(--color-primary)] group-hover:text-white font-bold hover:gap-3 transition-all duration-300">
                      {isEn ? 'View Details' : 'تفاصيل أكثر'}
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </motion.div>
        
        `;

if (!code.includes('Integrated Packages')) {
  code = code.replace(targetStr, integratedPackages + targetStr);
  fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
}
