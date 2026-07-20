import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Project } from '../data/projects';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface Props {
  project: Project;
  isEn: boolean;
  updateConfig: any;
  getGridClass: (size: string | undefined) => string;
}

export const WorkGridCard: React.FC<Props> = ({ project, isEn, updateConfig, getGridClass }) => {
  const [isHoverable, setIsHoverable] = useState(true);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsHoverable(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsHoverable(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const bgX = useMotionValue(50);
  const bgY = useMotionValue(50);
  
  const springX = useSpring(bgX, { stiffness: 100, damping: 30 });
  const springY = useSpring(bgY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement | HTMLButtonElement>) => {
    if (!isHoverable) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    bgX.set(x);
    bgY.set(y);
  };

  const handleMouseLeave = () => {
    if (!isHoverable) return;
    bgX.set(50);
    bgY.set(50);
  };

  const hasDetails = project.status !== 'needs_documentation';
  
  const cardContent = (
    <>
      <motion.div 
        className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-30 mix-blend-screen pointer-events-none"
        style={{
          background: isHoverable 
            ? `radial-gradient(circle at ${springX}% ${springY}%, ${project.brandColor || '#333'} 0%, transparent 50%)`
            : `radial-gradient(circle at 50% 50%, ${project.brandColor || '#333'} 0%, transparent 70%)`
        }}
      />
      
      {project.coverImage ? (
        <motion.img 
          src={project.coverImage} 
          alt={isEn ? project.titleEn : project.titleAr}
          variants={isHoverable ? { hover: { scale: 1.05 } } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.div 
            variants={isHoverable ? { hover: { scale: 1.05, rotate: 1 } } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-[80%] h-[80%] border border-white/10 rounded-xl flex items-center justify-center bg-[#111] shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-6 border-b border-white/10 flex items-center px-3 gap-1.5 bg-white/5">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <div className="text-4xl font-black text-white/20 mt-6">
              {isEn ? project.titleEn.charAt(0) : project.titleAr.charAt(0)}
            </div>
          </motion.div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-6 flex flex-col justify-end pointer-events-none">
        <motion.div 
          variants={isHoverable ? { hover: { y: 0 } } : {}}
          initial={isHoverable ? { y: 16 } : { y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-sm font-bold text-white/70 mb-2 flex items-center gap-2">
            {project.year && <span className="text-[var(--color-primary)] animate-pulse">{project.year}</span>}
            <span>{isEn ? project.sectorEn : project.sectorAr}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            {isEn ? project.titleEn : project.titleAr}
          </h3>
          <motion.p 
            variants={isHoverable ? { hover: { opacity: 1, height: 'auto' } } : {}}
            initial={isHoverable ? { opacity: 0, height: 0 } : { opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="text-sm text-white/60 line-clamp-2 overflow-hidden mb-4"
          >
            {isEn ? project.summaryEn : project.summaryAr}
          </motion.p>
          
          <div className="pointer-events-auto">
            {project.projectUrl ? (
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/10 transition-colors"
                aria-label={isEn ? `Visit project ${project.titleEn}` : `زيارة مشروع ${project.titleAr}`}
              >
                {isEn ? 'Visit Project' : 'زيارة المشروع'}
                <ExternalLink size={14} />
              </a>
            ) : hasDetails ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  updateConfig({ currentRoute: `work/${project.slug}` });
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] px-4 py-2 rounded-lg transition-colors cursor-pointer"
                aria-label={isEn ? `View case study for ${project.titleEn}` : `عرض دراسة الحالة لمشروع ${project.titleAr}`}
              >
                {isEn ? 'View Case Study' : 'عرض دراسة الحالة'}
                {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
              </button>
            ) : (
              <span className="inline-block text-xs font-bold text-white/40 px-4 py-2 rounded-lg border border-white/5 bg-white/5 cursor-not-allowed">
                {isEn ? 'Details Coming Soon' : 'التفاصيل قريباً'}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );

  const containerClasses = `group relative rounded-3xl overflow-hidden bg-black border border-white/10 cursor-pointer hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] transition-colors ${getGridClass(project.cardSize)}`;

  if (hasDetails && !project.projectUrl) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        whileHover={isHoverable ? "hover" : ""}
        onMouseMove={handleMouseMove as any}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          updateConfig({ currentRoute: `work/${project.slug}` });
          window.scrollTo({top: 0, behavior: 'smooth'});
        }}
        className={containerClasses + " text-left"}
        aria-label={isEn ? `View case study for ${project.titleEn}` : `عرض دراسة الحالة لمشروع ${project.titleAr}`}
      >
        {cardContent}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      whileHover={isHoverable ? "hover" : ""}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave}
      className={containerClasses + " focus-within:ring-2 focus-within:ring-[var(--color-primary)]"}
    >
      {cardContent}
    </motion.div>
  );
};
