const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

const oldGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(isEn ? service.pricing.itemsEn || service.pricing.items : service.pricing.items)!.map((item, i) => (
                    <div key={i} className="bg-[var(--surface-primary)] border border-[var(--border-default)] p-5 rounded-2xl flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-bold text-[var(--text-primary)]">{item.label}</h4>
                        <span className="font-bold text-[var(--color-primary)] whitespace-nowrap">{item.value}</span>
                      </div>
                      {item.desc && <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>}
                    </div>
                  ))}
                </div>`;

const newGrid = `<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {(isEn ? service.pricing.itemsEn || service.pricing.items : service.pricing.items)!.map((item, i) => (
                    <div key={i} className="group bg-[var(--surface-primary)] border border-[var(--border-default)] hover:border-[var(--color-primary)] p-6 md:p-8 rounded-3xl flex flex-col gap-4 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 relative z-10">
                        <h4 className="font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">{item.label}</h4>
                        <span className="font-bold text-lg text-[var(--color-primary)] whitespace-nowrap bg-[var(--surface-secondary)] px-4 py-1.5 rounded-full border border-[var(--border-default)]">{item.value}</span>
                      </div>
                      {item.desc && <p className="text-[var(--text-muted)] leading-relaxed relative z-10">{item.desc}</p>}
                    </div>
                  ))}
                </div>`;

code = code.replace(oldGrid, newGrid);

fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
