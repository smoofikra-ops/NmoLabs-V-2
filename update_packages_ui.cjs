const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailsPage.tsx', 'utf8');

const flipCardDefinition = `
const FlipPackageCard = ({ pkg, isEn, colorHex }: { pkg: any, isEn: boolean, colorHex: string }) => {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative w-full h-[280px] sm:h-[320px] rounded-3xl cursor-pointer group [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div 
          className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
          animate={{ rotateY: flipped ? 180 : 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-[60px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20 z-0" style={{ backgroundColor: colorHex }} />
             
             <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
               <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-default)] text-[var(--color-primary)] flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-6 shadow-sm">
                 <CheckCircle2 size={32} />
               </div>
               <h3 className="text-xl sm:text-2xl font-black text-center text-[var(--text-primary)] leading-snug mb-2">
                 {isEn ? pkg.titleEn || pkg.title : pkg.title}
               </h3>
             </div>
             
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity z-10">
               <span className="text-xs sm:text-sm font-bold tracking-widest uppercase bg-[var(--surface-primary)] px-4 py-2 rounded-full border border-[var(--border-default)] shadow-sm">{isEn ? 'Click for Details' : 'انقر للتفاصيل'}</span>
             </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 [backface-visibility:hidden] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-6 overflow-y-auto custom-scrollbar flex flex-col"
            style={{ transform: 'rotateY(180deg)' }}
          >
             <h4 className="text-lg font-bold mb-4 pb-3 border-b border-[var(--border-default)] sticky top-0 bg-[var(--surface-secondary)] z-10" style={{ color: colorHex }}>
               {isEn ? 'Package Details' : 'تفاصيل الباقة'}
             </h4>
             <ul className="space-y-4 flex-1">
               {(isEn ? pkg.detailsEn || pkg.details : pkg.details)?.map((item: any, idx: number) => (
                 <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                   <div className="w-2 h-2 mt-1.5 rounded-full shrink-0" style={{ backgroundColor: colorHex }} />
                   <div>
                     <strong className="text-[var(--text-primary)] block mb-1">{item.title}</strong>
                     <p className="leading-relaxed font-light">{item.desc}</p>
                   </div>
                 </li>
               ))}
             </ul>
             <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
               <button className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1" style={{ backgroundColor: colorHex }} onClick={(e) => { e.stopPropagation(); triggerBookingModal(); }}>
                  {isEn ? 'Request Package' : 'طلب الباقة'}
                  {isEn ? <ArrowUpRight size={18} /> : <ArrowUpRight size={18} className="rotate-0" />}
               </button>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Price shown separately below the card */}
      <div className="text-center px-4 py-3 bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl mt-2 mx-auto w-11/12">
        <span className="text-[var(--text-muted)] text-sm block mb-1">{isEn ? 'Price' : 'السعر'}</span>
        <strong className="text-[var(--color-primary)] text-lg font-bold">{isEn ? pkg.priceEn || pkg.price || 'Contact us' : pkg.price || 'تواصل معنا للتسعير'}</strong>
      </div>
    </div>
  );
};
`;

const oldGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

const newGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {service.packages ? service.packages.map((pkg: any, i: number) => (
                <FlipPackageCard key={i} pkg={pkg} isEn={isEn} colorHex="var(--color-primary)" />
              )) : deliverables.map((item, i) => (
                <FlipPackageCard key={i} pkg={{ title: item, price: 'تواصل معنا', details: [{ title: 'تفاصيل الباقة', desc: 'تواصل معنا للحصول على تفاصيل هذه الباقة.' }] }} isEn={isEn} colorHex="var(--color-primary)" />
              ))}
            </div>`;

if (!code.includes('FlipPackageCard')) {
  code = code.replace(oldGrid, newGrid);
  code = code.replace("export const ServiceDetailsPage = ({ slug }: Props) => {", flipCardDefinition + "\nexport const ServiceDetailsPage = ({ slug }: Props) => {");
  fs.writeFileSync('src/components/ServiceDetailsPage.tsx', code);
}
