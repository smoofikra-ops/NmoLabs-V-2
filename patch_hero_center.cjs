const fs = require('fs');
let code = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Replace the video background part
const oldBgVideo = `<video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-[0.25] pointer-events-none"
      >
        <source src="https://b.top4top.io/m_37896jjzf1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-brand)] via-transparent to-[var(--surface-brand)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.1] pointer-events-none" />`;

const newBgVideo = `{config.heroVideoUrl ? (
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
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-brand)]/80 via-[var(--surface-brand)]/40 to-[var(--surface-brand)] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.1] pointer-events-none" />`;

code = code.replace(oldBgVideo, newBgVideo);

// Replace grid with centered flex
const oldGrid = `<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">`;
const newGrid = `<div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center justify-center text-center mt-10 lg:mt-0">`;
code = code.replace(oldGrid, newGrid);

// Update motion.div to center items
const oldMotionDiv = `className="rtl:text-right ltr:text-left flex flex-col items-start w-full max-w-full overflow-hidden"`;
const newMotionDiv = `className="flex flex-col items-center text-center w-full max-w-full overflow-hidden"`;
code = code.replace(oldMotionDiv, newMotionDiv);

const oldDynamicTypewriterContainer = `flex items-center w-full break-words overflow-wrap-anywhere"`;
const newDynamicTypewriterContainer = `flex items-center justify-center w-full break-words overflow-wrap-anywhere"`;
code = code.replace(oldDynamicTypewriterContainer, newDynamicTypewriterContainer);

const oldSubtitle = `font-medium max-w-lg w-full break-words"`;
const newSubtitle = `font-medium max-w-2xl w-full break-words mx-auto"`;
code = code.replace(oldSubtitle, newSubtitle);

const oldButtons = `<div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">`;
const newButtons = `<div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">`;
code = code.replace(oldButtons, newButtons);

// Remove Visual Content completely since it is now the background
const visualContentRegex = /{\/\* Visual Content \*\/}[\s\S]*?<\/motion\.div>/g;
code = code.replace(visualContentRegex, '');

fs.writeFileSync('src/components/Hero.tsx', code);
