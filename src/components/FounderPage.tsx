import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { founderData } from '../data/founder';
import { Quote, ArrowRight, ArrowLeft, Target, Briefcase, Zap, Building2, Terminal, Code2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';

export const FounderPage = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const d = founderData;

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="bg-[var(--surface-primary)] font-sans text-[var(--text-primary)]">
      <Helmet>
        <title>{isEn ? d.seo.titleEn : d.seo.titleAr}</title>
        <meta name="description" content={isEn ? d.seo.descriptionEn : d.seo.descriptionAr} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": isEn ? d.nameEn : d.nameAr,
            "jobTitle": isEn ? d.titleEn : d.titleAr,
            "worksFor": {
              "@type": "Organization",
              "name": isEn ? d.companyEn : d.companyAr
            },
            "founder": {
              "@type": "Organization",
              "name": isEn ? d.companyEn : d.companyAr
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[75svh] max-h-[900px] flex items-center pt-32 pb-16 overflow-hidden bg-[var(--surface-brand)]">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Mobile Image (shows first on mobile) */}
          <div className="lg:hidden w-full flex justify-center mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-transparent z-0" />
              {d.portrait ? (
                <img src={d.portrait} alt={isEn ? d.portraitAltEn : d.portraitAltAr} className="w-full h-full object-cover relative z-10" loading="eager" />
              ) : (
                <span className="text-4xl md:text-5xl font-black text-[var(--color-primary)] opacity-50 relative z-10">AA</span>
              )}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: isEn ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-bold mb-6 text-[var(--color-primary)] tracking-widest uppercase">
              {isEn ? 'Leadership at NmoLabs' : 'القيادة في NmoLabs'}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight leading-tight">
              {isEn ? d.nameEn : d.nameAr}
            </h1>
            
            <div className="inline-block px-4 py-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded-xl mb-8">
              <span className="text-lg md:text-xl font-bold text-[var(--color-primary)]">
                {isEn ? d.titleEn : d.titleAr} <span className="opacity-60">|</span> {isEn ? d.companyEn : d.companyAr}
              </span>
            </div>

            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-lg font-medium">
              {isEn ? d.shortBioEn : d.shortBioAr}
            </p>
          </motion.div>

          {/* Desktop Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-end relative"
          >
            {/* Accent Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-primary)]/10 blur-[100px] rounded-full" />
            
            <div className="relative w-80 h-96 xl:w-96 xl:h-[28rem] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[var(--surface-secondary)] to-transparent z-10" />
              
              {d.portrait ? (
                <img 
                  src={d.portrait} 
                  alt={isEn ? d.portraitAltEn : d.portraitAltAr} 
                  className="w-full h-full object-cover object-top relative z-0" 
                  loading="eager"
                />
              ) : (
                <div className="flex flex-col items-center justify-center relative z-10">
                  <Terminal size={64} className="text-[var(--text-muted)] opacity-30 mb-4" />
                  <span className="text-6xl font-black text-[var(--color-primary)] opacity-20 tracking-tighter">AA</span>
                  {/* Real image to be uploaded later */}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <Building2 size={16} className="text-[var(--color-primary)]" />
            </div>
            <h2 className="text-2xl font-bold">{isEn ? 'About the Founder' : 'عن المؤسس'}</h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed">
            {(isEn ? d.fullBioEn : d.fullBioAr).split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Quote Section */}
      <section className="py-20 bg-[var(--surface-secondary)] border-y border-[var(--border-default)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,var(--color-primary)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-widest mb-12">
            {isEn ? 'The Vision Driving NmoLabs' : 'الرؤية التي تقود NmoLabs'}
          </h2>
          
          <div className="relative inline-block">
            <Quote size={80} className="absolute -top-10 -start-10 text-[var(--color-primary)] opacity-10 -scale-x-100" />
            <p className="text-2xl md:text-4xl font-black text-[var(--text-primary)] leading-tight max-w-4xl mx-auto relative z-10">
              {isEn ? d.visionQuoteEn : d.visionQuoteAr}
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-16 text-center">
            {isEn ? 'How He Leads Project Building?' : 'كيف يقود بناء المشاريع؟'}
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative">
            {/* Desktop Line */}
            <div className="hidden md:block absolute top-6 start-0 end-0 h-px bg-[var(--border-default)]" />
            
            {[
              { en: '1. Understanding the Business', ar: '1. فهم النشاط', descEn: 'Understanding the project nature, market, and customer before thinking about design or tech.', descAr: 'فهم طبيعة المشروع والسوق والعميل قبل التفكير في التصميم أو التقنية.' },
              { en: '2. Defining the Problem', ar: '2. تحديد المشكلة', descEn: 'Identifying the real problem the website, system, or product must solve.', descAr: 'تحديد المشكلة الحقيقية التي يجب أن يعالجها الموقع أو النظام أو المنتج.' },
              { en: '3. Building the Concept', ar: '3. بناء التصور', descEn: 'Transforming requirements into a clear experience, structure, and executable features.', descAr: 'تحويل المتطلبات إلى تجربة واضحة وهيكل ووظائف قابلة للتنفيذ.' },
              { en: '4. Phased Execution', ar: '4. التنفيذ المتدرج', descEn: 'Building the solution in phases, testing each before moving to the next.', descAr: 'بناء الحل على مراحل، واختبار كل مرحلة قبل الانتقال إلى التالية.' },
              { en: '5. Measurement & Optimization', ar: '5. القياس والتحسين', descEn: 'Tracking usage, performance, and results, continually improving the solution.', descAr: 'متابعة الاستخدام والأداء والنتائج وتحسين الحل باستمرار.' },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-row md:flex-col items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-[var(--surface-primary)] border-2 border-[var(--color-primary)] text-[var(--color-primary)] flex items-center justify-center font-bold text-lg shrink-0 relative z-10 shadow-sm">
                  {idx + 1}
                </div>
                <div className="md:pt-4 flex-1">
                  <h3 className="text-xl font-bold mb-2">{isEn ? step.en.split('. ')[1] : step.ar.split('. ')[1]}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{isEn ? step.descEn : step.descAr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-[var(--surface-secondary)] border-y border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-10">
            {isEn ? 'Areas Led & Developed within NmoLabs' : 'مجالات يقودها ويطورها داخل NmoLabs'}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {(isEn ? d.focusAreasEn : d.focusAreasAr).map((area, idx) => (
              <span key={idx} className="px-4 py-2 bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-full text-sm font-medium text-[var(--text-secondary)] shadow-sm hover:border-[var(--color-primary)]/50 transition-colors">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-16 text-center">
            {isEn ? 'Continuous Building & Development Journey' : 'رحلة بناء وتطوير مستمرة'}
          </h2>
          
          <div className="space-y-12">
            {(isEn ? d.journeyStagesEn : d.journeyStagesAr).map((stage, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative pl-8 pr-0 rtl:pr-8 rtl:pl-0 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[var(--border-default)]"
              >
                <div className="absolute top-0 -start-[9px] w-4 h-4 rounded-full bg-[var(--surface-primary)] border-2 border-[var(--color-primary)]" />
                <span className="text-sm font-bold text-[var(--color-primary)] mb-2 block tracking-wider uppercase">
                  {stage.title}
                </span>
                <h3 className="text-2xl font-bold mb-3">{stage.subtitle}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From Vision to Execution */}
      <section className="py-20 bg-[var(--surface-brand)] border-y border-[var(--border-default)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black mb-4">
              {isEn ? 'From Vision to Execution' : 'من الرؤية إلى التنفيذ'}
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              {isEn 
                ? 'The founder leads NmoLabs\' direction in developing projects across various sectors, while the work is executed, managed, and documented under the NmoLabs brand.' 
                : 'يقود المؤسس توجه NmoLabs في تطوير مشاريع عبر قطاعات مختلفة، بينما تُنفذ الأعمال وتُدار وتُوثق تحت اسم NmoLabs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, route: 'workPreview', titleEn: 'Our Work', titleAr: 'أعمالنا', descEn: 'Client projects executed and developed by NmoLabs.', descAr: 'مشاريع عملاء نفذتها وطورتها NmoLabs.' },
              { icon: Code2, route: 'productsPreview', titleEn: 'Our Products', titleAr: 'منتجاتنا', descEn: 'Solutions, platforms, and systems developed by NmoLabs.', descAr: 'حلول ومنصات وأنظمة تطورها NmoLabs.' },
              { icon: Zap, route: 'innovation-lab', titleEn: 'Innovation Labs', titleAr: 'مختبر الابتكارات', descEn: 'Experiments, ideas, and prototypes under research and testing.', descAr: 'تجارب وأفكار ونماذج أولية قيد البحث والاختبار.' }
            ].map((card, idx) => (
              <div 
                key={idx}
                onClick={() => { updateConfig({ currentRoute: card.route as any }); window.scrollTo(0,0); }}
                className="bg-[var(--surface-primary)] border border-[var(--border-default)] p-8 rounded-2xl cursor-pointer hover:border-[var(--color-primary)] hover:shadow-lg transition-all group"
              >
                <card.icon size={40} className="text-[var(--text-muted)] mb-6 group-hover:text-[var(--color-primary)] transition-colors" />
                <h3 className="text-xl font-bold mb-3">{isEn ? card.titleEn : card.titleAr}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                  {isEn ? card.descEn : card.descAr}
                </p>
                <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm">
                  {isEn ? 'Explore' : 'استكشف'}
                  <ArrowRight size={16} className={isEn ? '' : 'rotate-180'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-16">
            <Target size={24} className="text-[var(--color-primary)]" />
            <h2 className="text-3xl font-black">{isEn ? 'Guiding Principles' : 'مبادئ تقود العمل'}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {(isEn ? d.principlesEn : d.principlesAr).map((principle, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] mt-2.5 shrink-0" />
                <p className="text-lg font-medium">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Letter from Founder */}
      <section className="py-20 bg-[var(--surface-secondary)] border-y border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl p-10 md:p-16 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 start-0 w-32 h-32 bg-[var(--color-primary)]/5 blur-3xl rounded-full" />
            
            <h2 className="text-xl font-bold mb-8 text-[var(--text-muted)]">
              {isEn ? 'A Message from the Founder' : 'رسالة من المؤسس'}
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-primary)] leading-relaxed font-medium">
              {(isEn ? d.messageEn : d.messageAr).split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6">{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-[var(--border-default)] flex flex-col items-start">
              <span className="font-bold text-xl mb-1">{isEn ? d.nameEn : d.nameAr}</span>
              <span className="text-[var(--text-muted)] text-sm block mb-1">{isEn ? d.titleEn : d.titleAr}</span>
              <span className="text-[var(--color-primary)] font-bold">{isEn ? d.companyEn : d.companyAr}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-6">
            {isEn ? 'Let\'s Build the Next Step Together' : 'لنبنِ الخطوة القادمة معًا'}
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-10">
            {isEn 
              ? 'If you are looking for a partner who understands the project from a technical, commercial, and marketing perspective, start your conversation with the NmoLabs team.' 
              : 'إذا كنت تبحث عن شريك يفهم المشروع من الناحية التقنية والتجارية والتسويقية، ابدأ محادثتك مع فريق NmoLabs.'}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => triggerBookingModal('طلب مشروع')}
              className="px-8 py-4 rounded-full font-bold text-white bg-[var(--color-primary)] hover:bg-blue-600 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              {isEn ? 'Start Your Project' : 'ابدأ مشروعك'}
            </button>
            <button 
              onClick={() => { updateConfig({ currentRoute: 'workPreview' }); window.scrollTo(0,0); }}
              className="px-8 py-4 rounded-full font-bold text-[var(--text-primary)] bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-tertiary)] transition-colors w-full sm:w-auto"
            >
              {isEn ? 'Explore Our Work' : 'استكشف أعمالنا'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
