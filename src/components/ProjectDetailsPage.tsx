import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { projects } from '../data/projects';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';

interface Props {
  slug: string;
}

export const ProjectDetailsPage = ({ slug }: Props) => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const project = projects.find(p => p.slug === slug);
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Project Not Found</h1>
        <button 
          onClick={() => updateConfig({ currentRoute: 'work' })}
          className="text-[var(--color-primary)] font-bold flex items-center gap-2"
        >
          {isEn ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          {isEn ? 'Back to Work' : 'العودة إلى أعمالنا'}
        </button>
      </div>
    );
  }

  const isDarkTheme = project.textTheme === 'dark';
  const textColor = isDarkTheme ? 'text-gray-900' : 'text-white';
  const textMuted = isDarkTheme ? 'text-gray-600' : 'text-white/70';

  return (
    <article className="min-h-screen bg-[var(--surface-primary)]">
      <Helmet>
        <title>{isEn ? `${project.titleEn} | NmoLabs` : `${project.titleAr} | NmoLabs`}</title>
        <meta name="description" content={isEn ? project.summaryEn : project.summaryAr} />
      </Helmet>

      {/* Dynamic Header Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0a0a0a]">
        <div 
          className="absolute inset-0 opacity-60 transition-colors duration-1000"
          style={{ background: project.backgroundGradient || `radial-gradient(circle at center, ${project.brandColor || '#333'} 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={() => updateConfig({ currentRoute: 'work' })}
            className={`font-bold flex items-center gap-2 mb-12 transition-colors w-fit ${textColor} hover:opacity-70`}
          >
            {isEn ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            {isEn ? 'Back to Work' : 'العودة إلى أعمالنا'}
          </button>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="flex-1 w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20 ${textColor} text-sm font-bold bg-white/10`}>
                    {isEn ? project.sectorEn : project.sectorAr}
                  </span>
                  {project.status === 'in_progress' && (
                    <span className="px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-bold backdrop-blur-sm">
                      {isEn ? 'In Progress' : 'قيد التطوير'}
                    </span>
                  )}
                </div>

                <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black ${textColor} mb-8 tracking-tight leading-[1.1]`}>
                  {isEn ? project.titleEn : project.titleAr}
                </h1>

                <p className={`text-xl md:text-2xl ${textMuted} leading-relaxed max-w-2xl`}>
                  {isEn ? project.summaryEn : project.summaryAr}
                </p>
              </motion.div>
            </div>

            <div className="flex-1 w-full max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="aspect-video w-full rounded-3xl overflow-hidden bg-black/20 backdrop-blur-xl border border-white/10 relative shadow-2xl"
              >
                {project.coverImage ? (
                  <img 
                    src={project.coverImage} 
                    alt={isEn ? project.titleEn : project.titleAr}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full blur-[80px]" style={{ backgroundColor: project.brandColor || 'var(--color-primary)' }} />
                    <div className="relative z-10 w-24 h-24 rounded-full border border-white/20 flex items-center justify-center text-3xl font-bold text-white/50 backdrop-blur-md">
                      {isEn ? project.titleEn.charAt(0) : project.titleAr.charAt(0)}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        {/* Project Meta Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-[var(--border-default)] mb-16">
          <div>
            <h4 className="text-sm font-bold text-[var(--text-muted)] mb-4">{isEn ? 'Services' : 'الخدمات'}</h4>
            <ul className="space-y-2">
              {project.services.map((service, idx) => (
                <li key={idx} className="text-[var(--text-primary)] font-bold">{service}</li>
              ))}
            </ul>
          </div>
          {project.technologies && project.technologies.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-[var(--text-muted)] mb-4">{isEn ? 'Technologies' : 'التقنيات'}</h4>
              <ul className="space-y-2">
                {project.technologies.map((tech, idx) => (
                  <li key={idx} className="text-[var(--text-primary)] font-bold">{tech}</li>
                ))}
              </ul>
            </div>
          )}
          {project.projectUrl && (
            <div>
              <h4 className="text-sm font-bold text-[var(--text-muted)] mb-4">{isEn ? 'Live URL' : 'رابط المشروع'}</h4>
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-[var(--text-primary)] px-5 py-2.5 rounded-full font-bold hover:bg-[var(--text-secondary)] transition-colors text-sm"
              >
                {isEn ? 'Visit Website' : 'زيارة الموقع'}
                <ExternalLink size={16} />
              </a>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-20 text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-32">
          {(project.descriptionAr || project.descriptionEn) && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Overview' : 'نظرة عامة'}</h2>
              <p>{isEn ? project.descriptionEn : project.descriptionAr}</p>
            </section>
          )}

          {(project.challengeAr || project.challengeEn) && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'The Challenge' : 'التحدي'}</h2>
              <p>{isEn ? project.challengeEn : project.challengeAr}</p>
            </section>
          )}

          {(project.solutionAr || project.solutionEn) && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Our Solution' : 'الحل'}</h2>
              <p>{isEn ? project.solutionEn : project.solutionAr}</p>
            </section>
          )}

          {project.resultsAvailable && project.results && project.results.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Results' : 'النتائج'}</h2>
              <ul className="space-y-4">
                {project.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-default)]">
                    <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--surface-primary)] flex items-center justify-center font-bold shrink-0 mt-1">
                      {idx + 1}
                    </div>
                    <span className="text-[var(--text-primary)] font-medium">{result}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <div className="bg-[var(--text-primary)] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ background: project.backgroundGradient || `radial-gradient(circle at center, ${project.brandColor} 0%, transparent 70%)` }} />
          <h3 className="text-3xl md:text-5xl font-black text-[var(--surface-primary)] mb-6 relative z-10">
            {isEn ? 'Have a similar project?' : 'لديك مشروع مشابه؟'}
          </h3>
          <p className="text-xl text-[var(--surface-primary)]/80 mb-10 relative z-10">
            {isEn ? 'Let\'s build your next experience.' : 'دعنا نبني تجربتك القادمة.'}
          </p>
          <button 
            onClick={() => triggerBookingModal(isEn ? 'Request Project' : 'طلب مشروع')}
            className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 relative z-10 shadow-xl"
            style={{ backgroundColor: 'var(--surface-primary)', color: 'var(--text-primary)' }}
          >
            {isEn ? 'Start Your Project' : 'ابدأ مشروعك'}
          </button>
        </div>
      </div>

      {/* Next/Prev Navigation */}
      <div className="border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          {prevProject ? (
            <button 
              onClick={() => updateConfig({ currentRoute: `work/${prevProject.slug}` })}
              className="text-left group flex flex-col items-start"
            >
              <span className="text-[var(--text-muted)] text-sm font-bold mb-3 flex items-center gap-2">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                {isEn ? 'Previous Project' : 'المشروع السابق'}
              </span>
              <span className="text-2xl md:text-3xl font-black text-[var(--text-primary)] transition-colors" style={{ color: prevProject.brandColor }}>
                {isEn ? prevProject.titleEn : prevProject.titleAr}
              </span>
            </button>
          ) : <div />}
          
          {nextProject ? (
            <button 
              onClick={() => updateConfig({ currentRoute: `work/${nextProject.slug}` })}
              className="text-right group flex flex-col items-end md:ml-auto"
            >
              <span className="text-[var(--text-muted)] text-sm font-bold mb-3 flex items-center gap-2">
                {isEn ? 'Next Project' : 'المشروع التالي'}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-2xl md:text-3xl font-black text-[var(--text-primary)] transition-colors" style={{ color: nextProject.brandColor }}>
                {isEn ? nextProject.titleEn : nextProject.titleAr}
              </span>
            </button>
          ) : <div />}
        </div>
      </div>
    </article>
  );
};
