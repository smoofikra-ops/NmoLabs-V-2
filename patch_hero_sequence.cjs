const fs = require('fs');

const heroPath = 'src/components/Hero.tsx';
let content = fs.readFileSync(heroPath, 'utf8');

const targetVideoBlock = `{config.heroVideoUrl ? (
        <video
          autoPlay
          loop={config.heroVideoLoop !== false}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 pointer-events-none"
          src={config.heroVideoUrl}
          poster={config.heroVideoPoster}
        />
      ) : (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-[0.25] pointer-events-none"
        >
          <source src="https://b.top4top.io/m_37896jjzf1.mp4" type="video/mp4" />
        </video>
      )}`;

const replacementVideoBlock = `      {config.heroVideoUrl ? (
        <video
          autoPlay
          loop={config.heroVideoLoop !== false}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-50 pointer-events-none"
          src={config.heroVideoUrl}
          poster={config.heroVideoPoster}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-[var(--surface-brand)]">
          {[
            "https://nmolabs-cdn.b-cdn.net/NmoLabs-official-website/assets/videos/%D8%A7hero-vid1.mp4",
            "https://nmolabs-cdn.b-cdn.net/NmoLabs-official-website/assets/videos/hero-vid2.mp4"
          ].map((src, index) => (
            <video
              key={src}
              src={src}
              autoPlay={index === 0}
              muted
              playsInline
              preload="auto"
              onEnded={(e) => {
                 const videosCount = 2;
                 const nextIndex = (index + 1) % videosCount;
                 const parent = e.currentTarget.parentElement;
                 if (parent) {
                   const nextVideo = parent.children[nextIndex];
                   if (nextVideo) {
                     nextVideo.style.opacity = '1';
                     e.currentTarget.style.opacity = '0';
                     nextVideo.currentTime = 0;
                     nextVideo.play().catch(console.error);
                   }
                 }
              }}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ opacity: index === 0 ? 1 : 0, mixBlendMode: 'screen' }}
            />
          ))}
        </div>
      )}`;

if (content.includes(targetVideoBlock)) {
  content = content.replace(targetVideoBlock, replacementVideoBlock.trim());
  fs.writeFileSync(heroPath, content);
  console.log("Successfully updated video loop.");
} else {
  console.error("Target video block not found.");
}
