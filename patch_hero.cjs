const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const newVisual = `
          {config.heroVideoUrl ? (
            <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-default)] group cursor-pointer">
              <video 
                src={config.heroVideoUrl} 
                poster={config.heroVideoPoster}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                autoPlay={config.heroVideoLoop !== false}
                loop={config.heroVideoLoop !== false}
                muted
                playsInline
                controls
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          ) : (
            <InteractiveShowcase />
          )}
`;

code = code.replace(/<InteractiveShowcase \/>/, newVisual);

fs.writeFileSync('src/components/Hero.tsx', code);
