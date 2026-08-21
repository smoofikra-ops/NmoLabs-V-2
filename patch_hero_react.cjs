const fs = require('fs');

const heroPath = 'src/components/Hero.tsx';
let content = fs.readFileSync(heroPath, 'utf8');

// We need to add `const [activeVideoIndex, setActiveVideoIndex] = useState(0);`
// right after `const { config, updateConfig } = useSite();`

const targetHook = `const { config, updateConfig } = useSite();`;
const replacementHook = `const { config, updateConfig } = useSite();\n  const [activeVideoIndex, setActiveVideoIndex] = useState(0);`;

if (!content.includes('setActiveVideoIndex')) {
  content = content.replace(targetHook, replacementHook);
}

const targetVideoBlock2 = `{config.heroVideoUrl ? (
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

const replacementVideoBlock2 = `{config.heroVideoUrl ? (
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
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
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
                 const nextIndex = (index + 1) % 2;
                 setActiveVideoIndex(nextIndex);
                 const nextVideo = e.currentTarget.parentElement.children[nextIndex];
                 if (nextVideo) {
                   nextVideo.currentTime = 0;
                   nextVideo.play().catch(console.error);
                 }
              }}
              className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 \${
                activeVideoIndex === index ? 'opacity-20 dark:opacity-[0.25]' : 'opacity-0'
              }\`}
            />
          ))}
        </div>
      )}`;

if (content.includes(targetVideoBlock2)) {
  content = content.replace(targetVideoBlock2, replacementVideoBlock2);
  fs.writeFileSync(heroPath, content);
  console.log("Successfully updated to React state-based toggle.");
} else {
  console.error("Target video block not found.");
}
