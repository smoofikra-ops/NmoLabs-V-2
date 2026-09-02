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
      className="min-h-[80svh] py-12 lg:py-24 flex items-center relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}>
          
          {/* Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <span className="text-4xl sm:text-5xl font-black text-[var(--color-primary)]/40">0{index + 1}</span>
                <div className="h-[1px] flex-grow bg-[var(--border-default)]" />
                {project.year && (
                  <span className="px-3.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--color-primary)] text-xs sm:text-sm font-bold">
                    {project.year}
                  </span>
                )}
                <span className="px-3.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] text-xs sm:text-sm font-bold">
                  {isEn ? project.sectorEn : project.sectorAr}
                </span>
              </div>
              
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight">
                {isEn ? project.titleEn : project.titleAr}
              </h3>
              
              <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-8 font-light">
                {isEn ? project.summaryEn : project.summaryAr}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.services.slice(0, 4).map((srv, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-muted)] text-xs sm:text-sm">
                    {srv}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    if (project.projectUrl) {
                      window.open(project.projectUrl, '_blank');
                    } else {
                      updateConfig({ currentRoute: `work/${project.slug}` });
                      window.scrollTo({top: 0, behavior: 'smooth'});
                    }
                  }}
                  className="px-7 py-3.5 rounded-full font-bold text-white transition-all bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isEn ? 'Explore Project' : 'استكشف المشروع'}
                  {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
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
              className="card-depth-3 aspect-[4/3] rounded-[2rem] overflow-hidden border border-[var(--border-default)] relative group cursor-pointer bg-[var(--surface-secondary)]"
              onClick={() => {
                if (project.projectUrl) {
                  window.open(project.projectUrl, '_blank');
                } else {
                  updateConfig({ currentRoute: `work/${project.slug}` });
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }
              }}
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-3xl" style={{ backgroundColor: project.brandColor }} />
              {project.coverImage ? (
                <img 
                  src={project.coverImage} 
                  alt={isEn ? project.titleEn : project.titleAr} 
                  referrerPolicy="no-referrer"
                  className="relative z-10 w-full h-full object-cover object-top group-hover:object-bottom transition-all duration-[8000ms] ease-in-out" 
                />
              ) : (
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                   <div className="w-32 h-32 rounded-3xl blur-[40px] absolute opacity-30" style={{ backgroundColor: project.brandColor }} />
                   <div className="text-[var(--text-muted)] font-black text-8xl relative z-10 group-hover:scale-110 transition-transform duration-700">
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
    <div className="bg-[var(--surface-primary)] min-h-screen text-[var(--text-primary)] transition-colors duration-300">
      <Helmet>
        <title>{isEn ? 'Our Work | NmoLabs' : 'أعمالنا | NmoLabs'}</title>
      </Helmet>

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 opacity-15 transition-colors duration-1000 ease-in-out pointer-events-none mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 60%)`,
          transform: `translateY(${scrollProgress * 100}px)`
        }}
      />
      
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-bold text-[var(--color-primary)] mb-6">
              <span>{isEn ? 'Selected Portfolio' : 'أعمال ومشاريع مختارة'}</span>
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight text-[var(--text-primary)]">
              {isEn ? (
                <>Our <span className="text-[var(--color-primary)]">Work</span></>
              ) : (
                <>أعمال<span className="text-[var(--color-primary)]">نا</span></>
              )}
            </h1>
            <p className="text-lg md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
              {isEn 
                ? 'We build digital experiences and enterprise systems that drive verified business growth.' 
                : 'نصمم ونبني تجارب رقمية ومنظومات برمجية تقود النمو المستدام.'}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex justify-center text-[var(--text-muted)] animate-bounce"
          >
            <ArrowDown size={28} />
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
      <div className="py-24 relative z-10 bg-[var(--surface-secondary)]/50 border-t border-[var(--border-default)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'More Projects' : 'مشاريع إضافية'}
            </h2>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[var(--color-primary)] text-white shadow-md'
                      : 'bg-[var(--surface-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--interactive-border)]'
                  }`}
                >
                  {isEn ? cat.en : cat.ar}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 auto-rows-[minmax(180px,auto)] sm:auto-rows-[minmax(250px,auto)]"
          >
            <AnimatePresence mode="popLayout">
              {filteredOtherProjects.map((project) => (
                <WorkGridCard key={project.id} project={project} isEn={isEn} updateConfig={updateConfig} getGridClass={getGridClass} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredOtherProjects.length === 0 && (
            <div className="text-center py-12 lg:py-24 text-[var(--text-muted)]">
              {isEn ? 'No projects found in this category.' : 'لا توجد مشاريع في هذا التصنيف حالياً.'}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
