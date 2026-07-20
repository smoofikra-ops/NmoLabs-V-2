import { WorkGridCard } from './WorkGridCard';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { projects, Project } from '../data/projects';
import { ArrowLeft, ArrowRight, ArrowDown, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// Extracted component for Featured Project to handle its own in-view state
interface FeaturedProjectProps {
  project: Project;
  index: number;
  isEn: boolean;
  onInView: (id: string) => void;
  updateConfig: any;
}

const FeaturedProjectSection: React.FC<FeaturedProjectProps> = ({ 
  project, 
  index, 
  isEn, 
  onInView,
  updateConfig
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(project.id);
    }
  }, [isInView, project.id, onInView]);

  const isEven = index % 2 === 0;

  return (
    <section 
      ref={ref}
      id={`featured-${project.id}`}
      className="min-h-[80svh] py-24 flex items-center relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16`}>
          
          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-white/20">0{index + 1}</span>
                <div className="h-[1px] flex-grow bg-white/20" />
                {project.year && (
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[var(--color-primary)] text-sm font-bold backdrop-blur-sm animate-pulse">
                    {project.year}
                  </span>
                )}
                <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold backdrop-blur-sm">
                  {isEn ? project.sectorEn : project.sectorAr}
                </span>
              </div>
              
              <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
                {isEn ? project.titleEn : project.titleAr}
              </h3>
              
              <p className="text-xl text-white/70 leading-relaxed mb-8">
                {isEn ? project.summaryEn : project.summaryAr}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {project.services.slice(0, 4).map((srv, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-white/5 text-white/80 text-sm">
                    {srv}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    updateConfig({ currentRoute: `work/${project.slug}` });
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                  className="px-8 py-4 rounded-full font-bold text-white transition-all bg-white/10 hover:bg-white/20 border border-white/20 hover:scale-105 flex items-center gap-2"
                >
                  {isEn ? 'Explore Project' : 'استكشف المشروع'}
                  {isEn ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 relative group shadow-2xl cursor-pointer bg-[#111]"
              onClick={() => {
                updateConfig({ currentRoute: `work/${project.slug}` });
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-3xl" style={{ backgroundColor: project.brandColor }} />
              {project.coverImage ? (
                <img src={project.coverImage} alt={isEn ? project.titleEn : project.titleAr} className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                   <div className="w-32 h-32 rounded-3xl blur-[40px] absolute" style={{ backgroundColor: project.brandColor }} />
                   <div className="text-white/20 font-black text-8xl relative z-10 group-hover:scale-110 transition-transform duration-700">
                     {isEn ? project.titleEn.charAt(0) : project.titleAr.charAt(0)}
                   </div>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export const WorkPage = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  
  const featuredProjects = projects.filter(p => p.featured).sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
  const otherProjects = projects.filter(p => !p.featured);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeColor, setActiveColor] = useState<string>('var(--color-primary)');
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  const categories = [
    { id: 'all', ar: 'الكل', en: 'All Projects' },
    { id: 'ecommerce', ar: 'متاجر إلكترونية', en: 'E-commerce' },
    { id: 'corporate', ar: 'مواقع شركات', en: 'Corporate' },
    { id: 'systems', ar: 'أنظمة متخصصة', en: 'Systems' },
    { id: 'marketing', ar: 'صفحات هبوط', en: 'Landing Pages' }
  ];

  const filteredOtherProjects = activeCategory === 'all' 
    ? otherProjects 
    : otherProjects.filter(p => p.category === activeCategory);

  const getGridClass = (size?: string) => {
    switch (size) {
      case 'large': return 'col-span-1 md:col-span-2 lg:col-span-2 aspect-square md:aspect-[2/1] lg:aspect-[2/1]';
      case 'wide': return 'col-span-1 md:col-span-2 lg:col-span-2 aspect-square md:aspect-[2/1] lg:aspect-[2/1]';
      case 'compact': return 'col-span-1 aspect-square';
      case 'standard':
      default: return 'col-span-1 aspect-square';
    }
  };

  const handleInView = (projectId: string) => {
    const project = featuredProjects.find(p => p.id === projectId);
    if (project && project.brandColor) {
      setActiveColor(project.brandColor);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-[var(--text-primary)]">
      <Helmet>
        <title>{isEn ? 'Our Work | NmoLabs' : 'أعمالنا | NmoLabs'}</title>
      </Helmet>

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 opacity-20 transition-colors duration-1000 ease-in-out pointer-events-none mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 60%)`,
          transform: `translateY(${scrollProgress * 100}px)`
        }}
      />
      
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tight text-white">
              {isEn ? (
                <>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Work</span></>
              ) : (
                <>أعمال<span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-white/50">نا</span></>
              )}
            </h1>
            <p className="text-xl md:text-3xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              {isEn 
                ? 'We build digital experiences that drive growth. Explore our selected case studies.' 
                : 'نبني تجارب رقمية تقود النمو. استكشف مجموعة من أبرز مشاريعنا.'}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex justify-center text-white/30 animate-bounce"
          >
            <ArrowDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects (Dynamic Museum Style) */}
      <div className="relative">
        {featuredProjects.map((project, index) => (
          <FeaturedProjectSection 
            key={project.id} 
            project={project} 
            index={index} 
            isEn={isEn} 
            onInView={handleInView} 
            updateConfig={updateConfig}
          />
        ))}
      </div>

      {/* Other Projects Grid */}
      <div className="py-32 relative z-10 bg-black/40 border-t border-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              {isEn ? 'More Projects' : 'مشاريع إضافية'}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-white text-black scale-105 shadow-lg'
                      : 'bg-[#111] text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {isEn ? cat.en : cat.ar}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(250px,auto)]"
          >
            <AnimatePresence mode="popLayout">
              {filteredOtherProjects.map((project) => (
                <WorkGridCard key={project.id} project={project} isEn={isEn} updateConfig={updateConfig} getGridClass={getGridClass} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredOtherProjects.length === 0 && (
            <div className="text-center py-24 text-[var(--text-muted)]">
              {isEn ? 'No projects found in this category.' : 'لا توجد مشاريع في هذا التصنيف حالياً.'}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
