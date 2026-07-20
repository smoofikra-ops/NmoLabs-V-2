import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { projects } from '../data/projects';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const WorkPreview = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const previewProjects = projects.filter(p => p.featured).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#050505] relative overflow-hidden" id="work">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)] to-transparent blur-[120px] rounded-full mix-blend-screen" />
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-12 sm:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
              {isEn ? 'Work built to perform, evolve and grow' : 'مشاريع بنيناها لتعمل، تتطور وتنمو'}
            </h2>
            <p className="text-base sm:text-xl text-white/60">
              {isEn ? 'From ecommerce stores to platforms and systems, we build digital solutions designed around the goals of each project.' : 'من المتاجر الإلكترونية إلى الأنظمة والمنصات، نبني حلولًا رقمية مصممة حول أهداف كل مشروع.'}
            </p>
          </div>
          <button 
            onClick={() => {
              updateConfig({ currentRoute: 'work' });
              window.scrollTo({top: 0, behavior: 'smooth'});
            }}
            className="group flex items-center gap-3 text-white font-bold hover:text-[var(--color-primary)] transition-colors whitespace-nowrap bg-white/5 px-6 py-3 rounded-full border border-white/10 hover:bg-white/10 w-full sm:w-auto justify-center"
          >
            {isEn ? 'Explore All Work' : 'استكشف جميع أعمالنا'}
            {isEn ? <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform shrink-0" /> : <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform shrink-0" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {previewProjects.map((project, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={project.id}
              onClick={() => {
                if(project.status !== 'needs_documentation') {
                  updateConfig({ currentRoute: `work/${project.slug}` });
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }
              }}
              className="group relative rounded-3xl overflow-hidden bg-[#111] border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-500 aspect-[4/5] flex flex-col justify-end"
            >
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen"
                style={{ background: project.backgroundGradient || `radial-gradient(circle at top, ${project.brandColor} 0%, transparent 70%)` }}
              />
              
              {project.coverImage ? (
                <img 
                  src={project.coverImage} 
                  alt={isEn ? project.titleEn : project.titleAr}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100">
                  <div className="w-48 h-48 rounded-full blur-[80px]" style={{ backgroundColor: project.brandColor || 'var(--color-primary)' }} />
                  <div className="absolute font-black text-white/20 text-6xl">{isEn ? project.titleEn.charAt(0) : project.titleAr.charAt(0)}</div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300" />
              
              <div className="relative z-10 p-5 sm:p-8 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  {project.year && (
                    <span className="text-xs font-bold text-[var(--color-primary)] px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md animate-pulse">
                      {project.year}
                    </span>
                  )}
                  <span className="text-xs font-bold text-white px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                    {isEn ? project.sectorEn : project.sectorAr}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {isEn ? project.titleEn : project.titleAr}
                </h3>
                <p className="text-white/70 line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:h-0 group-hover:h-auto text-sm sm:text-base">
                  {isEn ? project.summaryEn : project.summaryAr}
                </p>
              </div>

              <div className="absolute top-6 left-6 md:right-6 md:left-auto w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-10">
                {isEn ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
