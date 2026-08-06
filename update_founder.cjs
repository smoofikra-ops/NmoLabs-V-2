const fs = require('fs');

let code = fs.readFileSync('src/components/FounderPage.tsx', 'utf8');

const regex = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6">.*?<\/section>/s;

const newSection = `
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', icon: Briefcase, route: 'work', titleEn: 'Our Work', titleAr: 'أعمالنا', descEn: 'Client projects executed and developed by NmoLabs.', descAr: 'مشاريع عملاء نفذتها وطورتها NmoLabs.' },
              { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', icon: Code2, route: 'products', titleEn: 'Our Products', titleAr: 'منتجاتنا', descEn: 'Solutions, platforms, and systems developed by NmoLabs.', descAr: 'حلول ومنصات وأنظمة تطورها NmoLabs.' },
              { image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80', icon: Zap, route: 'innovation-lab', titleEn: 'Innovation Labs', titleAr: 'مختبر الابتكارات', descEn: 'Experiments, ideas, and prototypes under research and testing.', descAr: 'تجارب وأفكار ونماذج أولية قيد البحث والاختبار.' }
            ].map((card, idx) => (
              <div 
                key={idx}
                onClick={() => { updateConfig({ currentRoute: card.route as any }); window.scrollTo(0,0); }}
                className="bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl cursor-pointer hover:border-[var(--color-primary)] transition-all group overflow-hidden flex flex-col h-full"
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 group-hover:opacity-10 transition-opacity z-10" />
                  <img src={card.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt={isEn ? card.titleEn : card.titleAr} />
                  <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg border border-white/20 group-hover:bg-[var(--color-primary)] transition-colors">
                    <card.icon size={20} />
                  </div>
                </div>
                
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black mb-3 text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">{isEn ? card.titleEn : card.titleAr}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 flex-1">
                    {isEn ? card.descEn : card.descAr}
                  </p>
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm group-hover:text-[var(--color-primary)] transition-colors mt-auto">
                    {isEn ? 'Explore' : 'استكشف'}
                    <ArrowRight size={16} className={\`transition-transform \${isEn ? 'group-hover:translate-x-1' : 'rotate-180 group-hover:-translate-x-1'}\`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
`;

code = code.replace(regex, newSection);
fs.writeFileSync('src/components/FounderPage.tsx', code);
