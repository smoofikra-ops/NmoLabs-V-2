const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

const oldIntegrated = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
            </div>`;

const newIntegrated = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {servicesList.filter(s => ['ads-management', 'social-media', 'ui-ux', 'copywriting'].includes(s.id) && s.id !== service.id).map((s, i) => (
                <div key={i} className="group relative p-6 sm:p-8 rounded-3xl bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-xl flex flex-col overflow-hidden min-h-[220px] cursor-pointer" onClick={() => { updateConfig({ currentRoute: 'services/' + s.id }); }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-primary)] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-0 blur-[40px] rounded-full pointer-events-none transition-opacity group-hover:opacity-10 z-0" />
                  
                  <div className="flex items-start justify-between mb-6 z-10">
                    <div className="p-4 rounded-2xl transition-all duration-500 bg-[var(--surface-primary)] shadow-sm border border-[var(--border-default)] text-[var(--color-primary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--color-primary)] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3">
                      {s.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl md:text-2xl text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 z-10 mb-4">{isEn ? s.titleEn : s.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-6 line-clamp-2 relative z-10 font-light">{isEn ? s.descEn : s.desc}</p>
                  
                  <div className="mt-auto z-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-default)] group-hover:via-[var(--color-primary)] to-transparent mb-4 transition-colors duration-500"></div>
                    <button className="flex items-center gap-2 text-[var(--color-primary)] group-hover:text-[var(--text-primary)] font-bold hover:gap-3 transition-all duration-300">
                      {isEn ? 'View Details' : 'تفاصيل أكثر'}
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>`;

code = code.replace(oldIntegrated, newIntegrated);
fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
