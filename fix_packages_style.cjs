const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

const oldGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {deliverables.map((item, i) => (
                <div key={i} className="group relative p-6 rounded-3xl bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all duration-500 hover:shadow-xl flex flex-col items-center text-center overflow-hidden min-h-[180px] justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-14 h-14 mb-4 rounded-2xl bg-[var(--surface-tertiary)] border border-[var(--border-default)] text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-3 shadow-sm z-10">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 z-10">{item}</h3>
                </div>
              ))}
            </div>`;

const newGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {deliverables.map((item, i) => (
                <div key={i} className="group relative p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-xl flex flex-col overflow-hidden min-h-[220px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-start justify-between mb-6 z-10">
                    <div className="p-4 rounded-2xl transition-all duration-500 bg-white/5 shadow-sm border border-white/5 text-[var(--color-primary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--color-primary)] group-hover:shadow-[0_0_20px_var(--color-primary)] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3">
                      <CheckCircle2 size={28} />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl md:text-2xl text-white group-hover:text-[var(--color-primary)] transition-colors duration-300 z-10 mb-4">{item}</h3>
                  
                  <div className="mt-auto z-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 group-hover:via-[var(--color-primary)] to-transparent mb-4 transition-colors duration-500"></div>
                    <button className="flex items-center gap-2 text-[var(--color-primary)] group-hover:text-white font-bold hover:gap-3 transition-all duration-300 cursor-pointer" onClick={() => { triggerBookingModal(); }}>
                      {isEn ? 'Request Package' : 'طلب الباقة'}
                      {isEn ? <ArrowUpRight size={18} /> : <ArrowUpRight size={18} className="rotate-0" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>`;

code = code.replace(oldGrid, newGrid);
fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
