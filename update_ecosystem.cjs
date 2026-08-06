const fs = require('fs');

let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

// Find the whole Ecosystem section
const ecosystemStart = '{/* SECTION 4: NMOLABS ECOSYSTEM';
const ecosystemRegex = /\{\/\* SECTION 4: NMOLABS ECOSYSTEM.*?<\/section>/s;

const newEcosystem = `
      {/* SECTION 4: NMOLABS ECOSYSTEM (منظومة NmoLabs) */}
      <section id="about-ecosystem" className="py-12 lg:py-24 border-b border-[var(--border-default)]/30 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'NmoLabs Ecosystem: Four Cohesive Paths' : 'منظومة NmoLabs: أربع مسارات تعمل معاً'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto">
              {isEn ? 'Our pathways feed into one central hub to catalyze true growth.' : 'تتكامل مساراتنا التقنية والتجريبية لتشكل منظومة متناغمة تصنع حلول الغد.'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Interactive Ecosystem Map */}
            <div className="w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[500px] aspect-square mx-auto relative flex items-center justify-center">
              
              {/* Center Hub */}
              <div className="absolute z-20 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[var(--surface-primary)] border-2 border-[var(--color-primary)] flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(79,142,247,0.3)] transition-all duration-300">
                <span className="font-black text-[10px] sm:text-sm tracking-widest font-english text-[var(--text-primary)]">NMOLABS</span>
                <span className="text-[8px] sm:text-[10px] text-[var(--color-primary)] font-bold mt-1">
                  {hoveredPath ? (isEn ? hoveredPath : hoveredPath) : (isEn ? 'Ecosystem' : 'المنظومة')}
                </span>
                <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] animate-ping opacity-20 pointer-events-none" />
              </div>

              {/* Orbital rings */}
              <div className="absolute inset-4 sm:inset-6 rounded-full border border-[var(--border-default)]/30 pointer-events-none" />
              <div className="absolute inset-12 sm:inset-16 rounded-full border border-[var(--border-default)]/10 pointer-events-none" />

              {/* Path Nodes */}
              {[
                { id: 'services', angle: -45, title: isEn ? 'Services' : 'الخدمات', icon: <Layers size={16} />, color: 'text-blue-500', bg: 'bg-blue-500' },
                { id: 'work', angle: 45, title: isEn ? 'Work' : 'الأعمال', icon: <Briefcase size={16} />, color: 'text-emerald-500', bg: 'bg-emerald-500' },
                { id: 'products', angle: 135, title: isEn ? 'Products' : 'المنتجات', icon: <ShoppingBag size={16} />, color: 'text-purple-500', bg: 'bg-purple-500' },
                { id: 'innovation', angle: -135, title: isEn ? 'Lab' : 'المختبر', icon: <Cpu size={16} />, color: 'text-amber-500', bg: 'bg-amber-500' }
              ].map((node) => {
                const isActive = hoveredPath === node.id || (!hoveredPath && node.id === 'services');
                
                // Position calculations (Trigonometry for circle positioning)
                // Use a smaller radius for mobile, larger for desktop
                const radius = '40%';
                const rad = (node.angle * Math.PI) / 180;
                
                return (
                  <button
                    key={node.id}
                    onClick={() => setHoveredPath(node.id)}
                    className={\`absolute z-30 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 \${isActive ? 'scale-110' : 'scale-95 opacity-70 hover:opacity-100'}\`}
                    style={{
                      transform: \`translate(calc(cos(\${rad}rad) * 100px), calc(sin(\${rad}rad) * 100px))\`, // fallback
                      left: \`calc(50% + cos(\${rad}rad) * \${radius} - 28px)\`,
                      top: \`calc(50% + sin(\${rad}rad) * \${radius} - 28px)\`
                    }}
                  >
                    <div className={\`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors border \${isActive ? \`\${node.bg}/10 border-\${node.bg.split('-')[1]}-500 \${node.color}\` : 'bg-[var(--surface-secondary)] border-[var(--border-default)] text-[var(--text-muted)]'}\`}>
                      {node.icon}
                    </div>
                    <span className={\`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full \${isActive ? \`\${node.bg}/20 \${node.color}\` : 'bg-[var(--surface-secondary)] text-[var(--text-muted)]'}\`}>
                      {node.title}
                    </span>
                  </button>
                );
              })}

              {/* Connecting Lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="var(--border-default)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                
                {/* Active line drawing based on selection */}
                <line x1="50%" y1="50%" x2={
                  hoveredPath === 'services' ? "80%" : 
                  hoveredPath === 'work' ? "80%" : 
                  hoveredPath === 'products' ? "20%" : 
                  hoveredPath === 'innovation' ? "20%" : "50%"
                } y2={
                  hoveredPath === 'services' ? "20%" : 
                  hoveredPath === 'work' ? "80%" : 
                  hoveredPath === 'products' ? "80%" : 
                  hoveredPath === 'innovation' ? "20%" : "50%"
                } stroke="var(--color-primary)" strokeWidth="2" opacity={hoveredPath ? 0.8 : 0} className="transition-all duration-500 ease-in-out" />
              </svg>

            </div>

            {/* Active Content Panel */}
            <div className="flex-1 w-full max-w-lg mx-auto lg:mx-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredPath || 'default'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 relative overflow-hidden"
                >
                  {(!hoveredPath || hoveredPath === 'services') && (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                        <Layers size={20} />
                      </div>
                      <h3 className="text-xl font-black text-[var(--text-primary)] mb-3">{isEn ? 'Services' : 'الخدمات'}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                        {isEn ? 'Digital services executed with deep operational understanding. From setup to marketing.' : 'تطوير وتنفيذ الخدمات المباشرة يكشف لنا الاحتياجات والمشاكل الحقيقية التي تواجه المتاجر.'}
                      </p>
                      <button onClick={() => navigateToRoute('services')} className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                        {isEn ? 'View Services' : 'استكشف الخدمات'} {isEn ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                      </button>
                    </>
                  )}

                  {hoveredPath === 'work' && (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                        <Briefcase size={20} />
                      </div>
                      <h3 className="text-xl font-black text-[var(--text-primary)] mb-3">{isEn ? 'Work' : 'الأعمال'}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                        {isEn ? 'Digital projects built by NmoLabs that drive tangible business results and scaling.' : 'مشاريع وتجارب رقمية بنيناها مع عملائنا لتحقيق نمو ملموس ونتائج قابلة للقياس.'}
                      </p>
                      <button onClick={() => navigateToRoute('work')} className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1">
                        {isEn ? 'View Work' : 'استكشف الأعمال'} {isEn ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                      </button>
                    </>
                  )}

                  {hoveredPath === 'products' && (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                        <ShoppingBag size={20} />
                      </div>
                      <h3 className="text-xl font-black text-[var(--text-primary)] mb-3">{isEn ? 'Products' : 'المنتجات'}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                        {isEn ? 'Proprietary platforms owned or engineered by us to solve specific market gaps.' : 'نحوّل المشاكل إلى أنظمة ومُنتجات جاهزة لتوفير الجهد البشري والتقني في السوق.'}
                      </p>
                      <button onClick={() => navigateToRoute('products')} className="text-xs font-bold text-purple-500 hover:underline flex items-center gap-1">
                        {isEn ? 'Explore Products' : 'اكتشف المنتجات'} {isEn ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                      </button>
                    </>
                  )}

                  {hoveredPath === 'innovation' && (
                    <>
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                        <Cpu size={20} />
                      </div>
                      <h3 className="text-xl font-black text-[var(--text-primary)] mb-3">{isEn ? 'Innovation Lab' : 'مختبر الابتكارات'}</h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                        {isEn ? 'Pioneering experiments testing the edge of AI, automation, and advanced software models.' : 'يعمل كمظلة لصياغة تجارب الغد وأتمتة نماذج العمل المتقدمة عبر الذكاء الاصطناعي.'}
                      </p>
                      <button onClick={() => navigateToRoute('innovation-lab')} className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1">
                        {isEn ? 'Enter the Lab' : 'دخول المختبر'} {isEn ? <ArrowRight size={12} /> : <ArrowLeft size={12} />}
                      </button>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </section>
`;

code = code.replace(ecosystemRegex, newEcosystem);
fs.writeFileSync('src/components/AboutPage.tsx', code);
