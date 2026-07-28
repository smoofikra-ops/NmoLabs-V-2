const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

// Update Top Padding
code = code.replace(
  /<article className="min-h-screen bg-\[var\(--surface-primary\)\] pt-32 pb-24 lg:pt-40 lg:pb-32">/g,
  '<article className="min-h-screen bg-[var(--surface-primary)] pt-28 pb-12 lg:pt-32 lg:pb-24">'
);

// Replace deliverables section
const oldGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[var(--text-primary)] bg-[var(--surface-secondary)] border border-[var(--border-default)] p-4 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>`;

const newGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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

code = code.replace(oldGrid, newGrid);

fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
