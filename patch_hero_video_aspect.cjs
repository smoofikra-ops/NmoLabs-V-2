const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const oldVideo = `{config.heroVideoUrl ? (
            <div className="relative w-full w-full aspect-[4/5] sm:aspect-video md:aspect-video lg:aspect-square xl:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[var(--border-default)]/50 bg-[var(--surface-secondary)]/40 backdrop-blur-xl group cursor-pointer p-2 sm:p-3">
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[var(--surface-primary)]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ) : (`

const newVideo = `{config.heroVideoUrl ? (
            <div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-video rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[var(--border-default)]/50 bg-[var(--surface-secondary)]/40 backdrop-blur-xl group cursor-pointer p-2 sm:p-3">
              <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-[var(--surface-primary)]">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ) : (`

code = code.replace(oldVideo, newVideo);
fs.writeFileSync('src/components/Hero.tsx', code);
