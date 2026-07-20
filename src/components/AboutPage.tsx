import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { companyData } from '../data/company';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ShoppingBag, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  ChevronDown, 
  Check, 
  CheckCircle, 
  Compass, 
  Shield, 
  Workflow, 
  Target, 
  ArrowUpRight, 
  User, 
  Code,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { triggerBookingModal } from './BookingModal';

export const AboutPage: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  // Navigation utilities
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navigateToRoute = (route: string) => {
    updateConfig({ currentRoute: route });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    if (config.contactNumber) {
      window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  // Icon mapping helper
  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-blue-500" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-emerald-500" />;
      case 'Layers': return <Layers className="w-6 h-6 text-purple-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-rose-500" />;
      default: return <Sparkles className="w-6 h-6 text-blue-500" />;
    }
  };

  // Dynamic values based on selected language
  const title = isEn ? companyData.seo.titleEn : companyData.seo.titleAr;
  const description = isEn ? companyData.seo.descriptionEn : companyData.seo.descriptionAr;

  // Active state for interactive how-we-work step preview
  const [activeStep, setActiveStep] = useState<number>(0);

  // Active state for ecosystem paths
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div id="about-page-container" className="pt-28 pb-12 overflow-x-hidden text-[var(--text-primary)]">
      
      {/* SECTION 0: HERO (Corporate and professional, max-height 900px, 78svh min-height) */}
      <section 
        id="about-hero" 
        className="relative flex items-center justify-center px-6 overflow-hidden border-b border-[var(--border-default)]/30"
        style={{ minHeight: '78svh', maxHeight: '900px' }}
      >
        {/* Ambient Subtle Glow & Grid Backdrops */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-right rtl:text-right ltr:text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-bold text-[var(--color-primary)]"
            >
              <Sparkles size={14} />
              <span>{isEn ? 'About NmoLabs' : 'عن NmoLabs'}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-[var(--text-primary)]"
            >
              {isEn ? companyData.shortDescriptionAr : 'نبني ما يحتاجه العمل فعلاً'}
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400 font-sans font-medium text-xl md:text-2xl lg:text-3xl tracking-wide">
                {isEn ? companyData.shortDescriptionEn : companyData.shortDescriptionAr}
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl"
            >
              {isEn ? companyData.shortDescriptionEn : companyData.shortDescriptionAr}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button 
                onClick={() => navigateToRoute('work')}
                className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-95 shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {isEn ? 'Explore Our Work' : 'استكشف أعمالنا'}
                {isEn ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              </button>
              <button 
                onClick={() => triggerBookingModal('عن نولابز')}
                className="px-6 py-3 rounded-full font-bold text-sm bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--surface-tertiary)] transition-all cursor-pointer"
              >
                {isEn ? 'Start a Project' : 'ابدأ مشروعك'}
              </button>
            </motion.div>
          </div>

          {/* Hero visual representation: Glass panels, connected nodes, modular, ambient glow, grid */}
          <div className="lg:col-span-5 hidden lg:block relative h-[420px]">
            <div className="absolute inset-0 flex items-center justify-center">
              
              {/* Outer Glow Circle */}
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-blue-500/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-emerald-500/10 animate-[spin_60s_linear_infinite]" />

              {/* Connected Modules Grid */}
              <div className="relative grid grid-cols-2 gap-4 w-full max-w-[360px] z-10">
                
                {/* Node 1: Tech */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[var(--surface-secondary)]/60 backdrop-blur-md border border-[var(--border-default)] p-5 rounded-2xl flex flex-col justify-between h-40 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-blue-500/5 rounded-full blur-xl" />
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Technology' : 'التقنية'}</h3>
                    <p className="text-[var(--text-muted)] text-[10px] mt-1">{isEn ? 'Custom scalable infrastructure' : 'بنية تحتية مخصصة وقابلة للتوسع'}</p>
                  </div>
                </motion.div>

                {/* Node 2: Business */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[var(--surface-secondary)]/60 backdrop-blur-md border border-[var(--border-default)] p-5 rounded-2xl flex flex-col justify-between h-40 shadow-lg relative overflow-hidden mt-6"
                >
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl" />
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <Target size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Business' : 'الأعمال'}</h3>
                    <p className="text-[var(--text-muted)] text-[10px] mt-1">{isEn ? 'Strategic alignment & models' : 'مواءمة استراتيجية ونماذج ربحية'}</p>
                  </div>
                </motion.div>

                {/* Node 3: Marketing */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[var(--surface-secondary)]/60 backdrop-blur-md border border-[var(--border-default)] p-5 rounded-2xl flex flex-col justify-between h-40 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-rose-500/5 rounded-full blur-xl" />
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Marketing' : 'التسويق'}</h3>
                    <p className="text-[var(--text-muted)] text-[10px] mt-1">{isEn ? 'Growth, SEO & acquisition' : 'النمو والانتشار وجلب العملاء'}</p>
                  </div>
                </motion.div>

                {/* Node 4: UX & Products */}
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[var(--surface-secondary)]/60 backdrop-blur-md border border-[var(--border-default)] p-5 rounded-2xl flex flex-col justify-between h-40 shadow-lg relative overflow-hidden mt-6"
                >
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-purple-500/5 rounded-full blur-xl" />
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Products & UX' : 'المنتجات وتجربة العميل'}</h3>
                    <p className="text-[var(--text-muted)] text-[10px] mt-1">{isEn ? 'Fluid, conversion-focused flow' : 'مسار شراء سلس ومثالي للتحويل'}</p>
                  </div>
                </motion.div>
                
              </div>

              {/* Minimal connecting nodes lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[var(--border-default)] opacity-40" xmlns="http://www.w3.org/2000/svg">
                <line x1="20%" y1="50%" x2="80%" y2="50%" strokeDasharray="4 4" />
                <line x1="50%" y1="20%" x2="50%" y2="80%" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: WHO IS NMOLABS (من هي NmoLabs؟) */}
      <section id="about-who-we-are" className="py-24 border-b border-[var(--border-default)]/30 bg-[var(--surface-secondary)]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Text */}
            <div className="lg:col-span-7 space-y-6 text-right rtl:text-right ltr:text-left">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              <h2 className="text-2xl md:text-4xl font-black leading-tight text-[var(--text-primary)]">
                {isEn ? companyData.positioningEn : companyData.positioningAr}
              </h2>
              
              <div className="space-y-4 text-base text-[var(--text-muted)] leading-relaxed">
                {isEn ? (
                  companyData.fullDescriptionEn.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  companyData.fullDescriptionAr.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                )}
              </div>
            </div>

            {/* Right side: Schematic Diagram representing Integration */}
            <div className="lg:col-span-5 bg-[var(--surface-secondary)]/30 border border-[var(--border-default)] rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm min-h-[350px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-[var(--color-primary)] tracking-widest uppercase">
                  {isEn ? 'The Integration Formula' : 'معادلة التكامل الرقمي'}
                </span>
                <p className="text-sm text-[var(--text-muted)]">
                  {isEn ? 'We combine four pillars into one unified growth system:' : 'نجمع 4 ركائز حيوية في منظومة نمو واحدة:'}
                </p>
              </div>

              {/* Vertical list of integration elements */}
              <div className="space-y-4 my-6">
                {[
                  { titleAr: 'فهم الأعمال والنشاط', titleEn: 'Business & Operation Analysis', color: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-500' },
                  { titleAr: 'برمجة وبناء الأنظمة المخصصة', titleEn: 'Custom Software Development', color: 'border-blue-500/20 bg-blue-500/5 text-blue-500' },
                  { titleAr: 'تحسين تجربة العميل والتحويل', titleEn: 'UX & Conversion Optimization', color: 'border-purple-500/20 bg-purple-500/5 text-purple-500' },
                  { titleAr: 'التسويق وجلب العملاء والنمو', titleEn: 'Growth & Digital Acquisition', color: 'border-rose-500/20 bg-rose-500/5 text-rose-500' }
                ].map((pill, idx) => (
                  <div key={idx} className={`border ${pill.color} rounded-xl px-4 py-3 flex items-center justify-between text-sm font-semibold shadow-sm`}>
                    <span>{isEn ? pill.titleEn : pill.titleAr}</span>
                    <span className="text-xs opacity-75 font-english">0{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--border-default)]/60 pt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{isEn ? 'Result: True Digital Leverage' : 'النتيجة: أثر حقيقي ونمو مستمر'}</span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75" />
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT WE BUILD (ما الذي نبنيه؟) */}
      <section id="about-what-we-build" className="py-24 border-b border-[var(--border-default)]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'We Transform Needs into Integrated Digital Solutions' : 'نحوّل الاحتياج إلى حل رقمي متكامل'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'Five key pathways designed to serve different stages and needs of your digital operations.' : 'خمسة مسارات مدروسة تخدم مختلف مراحل أعمالك وتضمن تكاملها الرقمي.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {companyData.businessAreas.map((area, idx) => (
              <motion.div
                key={area.id}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[var(--color-primary)]/40 transition-all duration-300 relative group"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--surface-tertiary)] flex items-center justify-center shadow-inner">
                    {getAreaIcon(area.icon)}
                  </div>
                  <h3 className="font-black text-base text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {isEn ? area.titleEn : area.titleAr}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {isEn ? area.descEn : area.descAr}
                  </p>
                </div>

                <div className="pt-6">
                  {area.linkRoute ? (
                    <button 
                      onClick={() => navigateToRoute(area.linkRoute!)}
                      className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isEn ? 'View More' : 'عرض المزيد'}</span>
                      {isEn ? <ArrowUpRight size={14} /> : <ArrowUpRight size={14} className="scale-x-[-1]" />}
                    </button>
                  ) : area.linkAct ? (
                    <button 
                      onClick={() => handleScrollToSection(area.linkAct!)}
                      className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isEn ? 'Explore Section' : 'استكشف القسم'}</span>
                      {isEn ? <ArrowUpRight size={14} /> : <ArrowUpRight size={14} className="scale-x-[-1]" />}
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW WE DIFFER (كيف نختلف؟) */}
      <section id="about-how-we-differ" className="py-24 border-b border-[var(--border-default)]/30 bg-[var(--surface-secondary)]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header / Intro */}
            <div className="lg:col-span-4 space-y-6 text-right rtl:text-right ltr:text-left">
              <div className="w-12 h-1 bg-rose-500 rounded-full" />
              <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
                {isEn ? 'More Than Just Service Execution' : 'أكثر من تنفيذ خدمة'}
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                {isEn ? 'We do not view a website or application as a standalone order. We build with its operational role, user conversion flow, and technical longevity in mind.' : 'نحن لا نتعامل مع الموقع أو المتجر أو النظام كطلب منفصل، بل نبحث عن دوره داخل المشروع وكيف يمكن أن يدعم المبيعات والتشغيل وتجربة العميل والنمو.'}
              </p>
            </div>

            {/* Comparison Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Traditional approach */}
              <div className="bg-[var(--surface-secondary)]/50 border border-[var(--border-default)] rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-2 h-full bg-gray-400/30" />
                <h3 className="font-black text-lg text-gray-500 mb-6 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                  {isEn ? 'The Traditional Approach' : 'النهج التقليدي'}
                </h3>
                
                <ul className="space-y-4">
                  {[
                    { labelAr: 'استلام الطلب حرفياً دون مواءمته تجارياً', labelEn: 'Receiving the order literally without commercial vetting' },
                    { labelAr: 'تنفيذ التصميم بالاعتماد على قوالب جاهزة مكررة', labelEn: 'Executing visual design with repeated rigid templates' },
                    { labelAr: 'تسليم ملفات أو منصة خام دون تدريب أو ضبط تشغيلي', labelEn: 'Delivering raw files with no operational onboarding' },
                    { labelAr: 'انتهاء العلاقة والمسؤولية بمجرد تسليم المفاتيح', labelEn: 'The relationship and support ends upon project hand-off' }
                  ].map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm text-[var(--text-muted)] items-start">
                      <span className="font-bold text-gray-400 mt-1 shrink-0">✕</span>
                      <span>{isEn ? item.labelEn : item.labelAr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* NmoLabs approach */}
              <div className="bg-[var(--surface-secondary)] border border-emerald-500/20 shadow-sm rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-emerald-400" />
                <h3 className="font-black text-lg text-emerald-500 mb-6 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  {isEn ? 'NmoLabs Approach' : 'نهج NmoLabs'}
                </h3>

                <ul className="space-y-4">
                  {[
                    { labelAr: 'فهم وتحليل النشاط وتحديد الهدف الحقيقي للمشروع', labelEn: 'Understanding business constraints & concrete goals' },
                    { labelAr: 'تحليل المشكلة لتصميم تجربة عميل مثالية', labelEn: 'Analyzing pain points to map frictionless user experiences' },
                    { labelAr: 'تصميم وبناء حل مخصص مرن وقابل للتطوير والنمو', labelEn: 'Designing a flexible, highly customized system architecture' },
                    { labelAr: 'اختبار دقيق لضمان الأداء والسرعة والجوال', labelEn: 'Rigorous testing of workflows, responsive visual fidelity & speed' },
                    { labelAr: 'متابعة قياس النتائج والتحسين لزيادة التحويل والمبيعات', labelEn: 'Tracking post-launch analytical goals to enhance conversions' },
                    { labelAr: 'تطوير مستمر وشراكة دائمة للمساندة في التوسع', labelEn: 'Continuous partnership and support to help you scale' }
                  ].map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm text-[var(--text-primary)] items-start">
                      <span className="font-bold text-emerald-500 mt-1 shrink-0">✓</span>
                      <span>{isEn ? item.labelEn : item.labelAr}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: NMOLABS ECOSYSTEM (منظومة NmoLabs) */}
      <section id="about-ecosystem" className="py-24 border-b border-[var(--border-default)]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'NmoLabs Ecosystem: Four Cohesive Paths' : 'منظومة NmoLabs: أربع مسارات تعمل معاً'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'Our pathways feed into one central hub to catalyze true growth.' : 'تتكامل مساراتنا التقنية والتجريبية لتشكل منظومة متناغمة تصنع حلول الغد.'}
            </p>
          </div>

          {/* Connected Diagram for desktop, clean stacked layout for mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Desktop Visual Layout (4 Connected Orbiting Cards around Center) */}
            <div className="lg:col-span-8 relative min-h-auto lg:min-h-[450px] flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
              
              {/* Central Hub representing NmoLabs (Visible mainly on Desktop, hidden on mobile for clean stacked look or kept at top) */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[var(--surface-primary)] border border-[var(--color-primary)]/40 flex flex-col items-center justify-center text-center shadow-lg relative z-20 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 mb-4 lg:mb-0">
                <span className="font-black text-xs sm:text-sm tracking-widest font-english text-[var(--text-primary)]">NMOLABS</span>
                <span className="text-[9px] sm:text-[10px] text-[var(--color-primary)] font-bold mt-1">{isEn ? 'Ecosystem' : 'المنظومة'}</span>
                
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border border-[var(--color-primary)]/25 animate-ping pointer-events-none" />
              </div>

              {/* Grid for mobile, Absolute for desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full lg:w-auto lg:block">

                {/* Path 1: Services (الخدمات) */}
                <motion.div 
                  onHoverStart={() => setHoveredPath('services')}
                  onHoverEnd={() => setHoveredPath(null)}
                  className="relative lg:absolute lg:top-8 lg:left-8 bg-[var(--surface-secondary)] border border-[var(--border-default)] p-4 sm:p-5 rounded-2xl w-full lg:w-48 shadow-md z-10 hover:border-blue-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <Layers size={14} />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Services' : 'الخدمات'}</h4>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                    {isEn ? 'Solutions we execute based on client needs.' : 'حلول ننفذها وفق احتياج العملاء.'}
                  </p>
                  <button onClick={() => handleScrollToSection('services')} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>{isEn ? 'View Services' : 'الخدمات'}</span>
                    {isEn ? <ArrowRight size={10} className="shrink-0" /> : <ArrowLeft size={10} className="shrink-0" />}
                  </button>
                </motion.div>

                {/* Path 2: Work (الأعمال) */}
                <motion.div 
                  onHoverStart={() => setHoveredPath('work')}
                  onHoverEnd={() => setHoveredPath(null)}
                  className="relative lg:absolute lg:top-8 lg:right-8 bg-[var(--surface-secondary)] border border-[var(--border-default)] p-4 sm:p-5 rounded-2xl w-full lg:w-48 shadow-md z-10 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <Briefcase size={14} />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Work' : 'الأعمال'}</h4>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                    {isEn ? 'Digital projects built by NmoLabs.' : 'مشاريع وتجارب رقمية بنتها NmoLabs.'}
                  </p>
                  <button onClick={() => navigateToRoute('work')} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>{isEn ? 'View Works' : 'أعمالنا'}</span>
                    {isEn ? <ArrowRight size={10} className="shrink-0" /> : <ArrowLeft size={10} className="shrink-0" />}
                  </button>
                </motion.div>

                {/* Path 3: Products (المنتجات) */}
                <motion.div 
                  onHoverStart={() => setHoveredPath('products')}
                  onHoverEnd={() => setHoveredPath(null)}
                  className="relative lg:absolute lg:bottom-8 lg:left-8 bg-[var(--surface-secondary)] border border-[var(--border-default)] p-4 sm:p-5 rounded-2xl w-full lg:w-48 shadow-md z-10 hover:border-purple-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                      <ShoppingBag size={14} />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Products' : 'المنتجات'}</h4>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                    {isEn ? 'Proprietary platforms owned or engineered by us.' : 'حلول وأنظمة تملكها أو تطورها NmoLabs.'}
                  </p>
                  <button onClick={() => navigateToRoute('products')} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>{isEn ? 'View Products' : 'منتجاتنا'}</span>
                    {isEn ? <ArrowRight size={10} className="shrink-0" /> : <ArrowLeft size={10} className="shrink-0" />}
                  </button>
                </motion.div>

                {/* Path 4: Innovation Lab (مختبر الابتكارات) */}
                <motion.div 
                  onHoverStart={() => setHoveredPath('innovation')}
                  onHoverEnd={() => setHoveredPath(null)}
                  className="relative lg:absolute lg:bottom-8 lg:right-8 bg-[var(--surface-secondary)] border border-[var(--border-default)] p-4 sm:p-5 rounded-2xl w-full lg:w-48 shadow-md z-10 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                      <Cpu size={14} />
                    </div>
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? 'Innovation Labs' : 'مختبر الابتكارات'}</h4>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-3">
                    {isEn ? 'Pioneering future-oriented AI experiments.' : 'أفكار وتجارب ونماذج أولية لاختبار حلول المستقبل.'}
                  </p>
                  <button onClick={() => navigateToRoute('innovation-lab')} className="text-[10px] font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer">
                    <span>{isEn ? 'Explore Lab' : 'مختبر الابتكارات'}</span>
                    {isEn ? <ArrowRight size={10} className="shrink-0" /> : <ArrowLeft size={10} className="shrink-0" />}
                  </button>
                </motion.div>
              </div>

              {/* Radial connector lines SVG (Desktop only) */}
              <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none stroke-[var(--border-default)] opacity-40" xmlns="http://www.w3.org/2000/svg">
                <line x1="15%" y1="15%" x2="50%" y2="50%" strokeDasharray="3 3" className={hoveredPath === 'services' ? 'stroke-blue-500 stroke-2' : ''} />
                <line x1="85%" y1="15%" x2="50%" y2="50%" strokeDasharray="3 3" className={hoveredPath === 'work' ? 'stroke-emerald-500 stroke-2' : ''} />
                <line x1="15%" y1="85%" x2="50%" y2="50%" strokeDasharray="3 3" className={hoveredPath === 'products' ? 'stroke-purple-500 stroke-2' : ''} />
                <line x1="85%" y1="85%" x2="50%" y2="50%" strokeDasharray="3 3" className={hoveredPath === 'innovation' ? 'stroke-amber-500 stroke-2' : ''} />
              </svg>

            </div>

            {/* Explanatory summary columns */}
            <div className="lg:col-span-4 bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-8 space-y-6">
              <span className="text-xs font-bold text-[var(--color-primary)] tracking-wider block uppercase">
                {isEn ? 'Ecosystem Synergy' : 'تكامل المنظومة الكلية'}
              </span>
              <h3 className="font-black text-xl text-[var(--text-primary)]">
                {isEn ? 'How the paths feed into each other:' : 'كيف تدعم المسارات بعضها بعضاً؟'}
              </h3>
              
              <ul className="space-y-4 text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-[var(--color-primary)] font-bold">1.</span>
                  <span>{isEn ? 'Daily service execution gives us insight into real operational bottlenecks.' : 'تطوير الخدمات المباشرة يكشف لنا الاحتياجات والمشاكل الحقيقية التي تواجه المتاجر والشركات.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-primary)] font-bold">2.</span>
                  <span>{isEn ? 'We transform those insights into proprietary software and growth products.' : 'نحوّل تلك المشاكل إلى أنظمة ومُنتجات جاهزة لتوفير الجهد البشري والتقني.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--color-primary)] font-bold">3.</span>
                  <span>{isEn ? 'The Innovation Lab keeps us tested on the edge of AI and advanced software.' : 'مختبر الابتكار يعمل كمظلة لصياغة تجارب الغد وأتمتة نماذج العمل المتقدمة.'}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: VISION AND MISSION (الرؤية والرسالة) */}
      <section id="about-vision-mission" className="py-24 border-b border-[var(--border-default)]/30 bg-[var(--surface-secondary)]/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
              <Compass size={24} />
            </div>
            
            <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] mb-4">
              {isEn ? 'Our Vision' : 'رؤيتنا'}
            </h3>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              {isEn ? companyData.visionEn : companyData.visionAr}
            </p>
          </div>

          {/* Mission card */}
          <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">
              <Target size={24} />
            </div>

            <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] mb-4">
              {isEn ? 'Our Mission' : 'رسالتنا'}
            </h3>
            <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
              {isEn ? companyData.missionEn : companyData.missionAr}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 6: VALUES (قيم تحكم طريقة عملنا) */}
      <section id="about-values" className="py-24 border-b border-[var(--border-default)]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'Values That Govern Our Work' : 'قيم تحكم طريقة عملنا'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'Underlying principles that steer every design, line of code, and communication decision we make.' : 'ثوابت وقناعات مهنية لا نتنازل عنها تصنع جودة العمل وتضمن راحة الشركاء.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.values.map((val, idx) => (
              <div 
                key={val.id} 
                className="bg-[var(--surface-secondary)]/50 border border-[var(--border-default)] rounded-2xl p-6 hover:bg-[var(--surface-secondary)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="font-english font-bold text-xs text-[var(--color-primary)] opacity-60">
                    / 0{idx + 1}
                  </div>
                  <h3 className="font-black text-base text-[var(--text-primary)]">
                    {isEn ? val.titleEn : val.titleAr}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                    {isEn ? val.descEn : val.descAr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WORKFLOW (كيف نعمل؟) - Interactive quiet timeline */}
      <section id="about-workflow" className="py-24 border-b border-[var(--border-default)]/30 bg-[var(--surface-secondary)]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'From Idea to Operating Solution' : 'من الفكرة إلى حل يعمل'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'A structured seven-step cycle engineered to eliminate guesswork and align with project scope.' : 'منهجية من سبع خطوات واضحة تضمن دقة المسار وخلو الإطلاق من العقبات.'}
            </p>
          </div>

          {/* Desktop view: Staggered Timeline blocks with active state click options */}
          <div className="hidden lg:grid grid-cols-7 gap-4 relative mb-12">
            
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[var(--border-default)] -translate-y-1/2 -z-10" />

            {companyData.workProcess.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(idx)}
                  className={`text-right px-4 py-6 rounded-2xl border transition-all duration-300 relative z-10 cursor-pointer ${isActive ? 'bg-[var(--surface-primary)] border-[var(--color-primary)] shadow-md' : 'bg-[var(--surface-secondary)]/60 border-[var(--border-default)] hover:border-gray-400'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold font-english px-2 py-0.5 rounded-full ${isActive ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-400/10 text-gray-400'}`}>
                      {step.step}
                    </span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />}
                  </div>
                  <h4 className={`font-black text-sm ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                    {isEn ? step.titleEn : step.titleAr}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Active Step Content description card for desktop */}
          <div className="hidden lg:block bg-[var(--surface-secondary)] border border-[var(--border-default)] p-8 rounded-3xl max-w-3xl mx-auto text-center shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <span className="text-xs font-bold text-[var(--color-primary)] font-english">
                  {isEn ? `STAGE 0${activeStep + 1} OF 07` : `المرحلة 0${activeStep + 1} من 07`}
                </span>
                <h3 className="font-black text-xl text-[var(--text-primary)]">
                  {isEn ? companyData.workProcess[activeStep].titleEn : companyData.workProcess[activeStep].titleAr}
                </h3>
                <p className="text-base text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto">
                  {isEn ? companyData.workProcess[activeStep].descEn : companyData.workProcess[activeStep].descAr}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile view: Simple Vertical List */}
          <div className="lg:hidden space-y-4">
            {companyData.workProcess.map((step) => (
              <div 
                key={step.step} 
                className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--surface-tertiary)] flex items-center justify-center shrink-0 font-english font-bold text-sm text-[var(--color-primary)]">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-sm text-[var(--text-primary)]">
                    {isEn ? step.titleEn : step.titleAr}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {isEn ? step.descEn : step.descAr}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 8: SECTORS (القطاعات التي عملنا معها) */}
      <section id="about-sectors" className="py-24 border-b border-[var(--border-default)]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'Experience Across Diverse Sectors' : 'خبرة عبر قطاعات متنوعة'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'We deploy tailored platforms fitted exactly to sector-specific constraints.' : 'قمنا بدراسة وبناء حلول ذكية لخدمة أعمال وقطاعات متنوعة.'}
            </p>
          </div>

          {/* Grid of tags */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {companyData.sectors.map((sector, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-[var(--surface-secondary)]/60 border border-[var(--border-default)] rounded-xl px-4 py-2.5 text-xs md:text-sm font-semibold hover:border-blue-500/40 hover:bg-[var(--surface-secondary)] transition-all cursor-default shadow-sm text-[var(--text-primary)]"
              >
                {isEn ? sector.nameEn : sector.nameAr}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: EVOLUTION (نبذة عن تطور NmoLabs) */}
      <section id="about-evolution" className="py-24 border-b border-[var(--border-default)]/30 bg-[var(--surface-secondary)]/15">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Context info */}
            <div className="lg:col-span-5 space-y-6 text-right rtl:text-right ltr:text-left">
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
              <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
                {isEn ? 'From Service Delivery to Product Engineering' : 'من تنفيذ المشاريع إلى بناء المنتجات'}
              </h2>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                {isEn ? 'Our journey started from directly operating stores, tracking performance, and consulting, which evolved naturally into building robust automated products.' : 'بدأت خبرة NmoLabs من العمل المباشر على التجارة الإلكترونية والمواقع والتسويق وتجربة العملاء، ثم تطورت إلى بناء الأنظمة المخصصة والمنصات والمنتجات التقنية.'}
              </p>
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                {isEn ? 'This evolution allows us to build with empathy and direct knowledge of the real-world friction businesses encounter.' : 'هذا التطور مكّن الشركة من الجمع بين فهم التحديات اليومية للمشاريع وبين القدرة على تصميم حلول رقمية تعالجها بشكل عملي.'}
              </p>

              <div className="pt-4">
                <button 
                  onClick={() => navigateToRoute('founder')}
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:bg-[var(--surface-tertiary)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <User size={14} />
                  <span>{isEn ? 'Learn about the Founder & CEO' : 'تعرف على المؤسس والرئيس التنفيذي'}</span>
                </button>
              </div>
            </div>

            {/* General Timeline list (without unconfirmed dates) */}
            <div className="lg:col-span-7 relative border-r rtl:border-r ltr:border-l border-[var(--border-default)] pr-6 pl-6 space-y-8">
              {companyData.journeyStages.map((stage, idx) => (
                <div key={idx} className="relative group">
                  
                  {/* Indicator dot */}
                  <div className="absolute top-1 right-[-31px] rtl:right-[-31px] ltr:left-[-31px] w-2.5 h-2.5 rounded-full bg-[var(--border-default)] group-hover:bg-[var(--color-primary)] transition-colors border-2 border-[var(--surface-primary)]" />
                  
                  <div className="space-y-1">
                    <h4 className="font-black text-sm text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {isEn ? stage.titleEn : stage.titleAr}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {isEn ? stage.descEn : stage.descAr}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: TEAM AND COLLABORATION (الفريق وطريقة التعاون) */}
      <section id="about-team" className="py-24 border-b border-[var(--border-default)]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'Expertise Integrating as Project Needs' : 'خبرات تتكامل حسب احتياج المشروع'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'We assemble focused technical and design teams custom-fitted to your project scope.' : 'تعمل NmoLabs من خلال خبرات متخصصة في التصميم والتطوير والتجارة الإلكترونية والتسويق والمحتوى وتجربة المستخدم وإدارة المشاريع، ويتم تشكيل نطاق العمل والفريق المناسب وفق طبيعة كل مشروع.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {[
              { roleAr: 'الاستراتيجية وتحليل الأعمال', roleEn: 'Strategy & Analysis' },
              { roleAr: 'إدارة المشاريع والتسليم', roleEn: 'Project Management' },
              { roleAr: 'تصميم واجهات تجربة العميل UI/UX', roleEn: 'UI/UX Craft' },
              { roleAr: 'تطوير واجهات المستخدم السريعة', roleEn: 'Frontend Engineering' },
              { roleAr: 'تطوير البنية الخلفية والأنظمة', roleEn: 'Backend & Custom Systems' },
              { roleAr: 'تهيئة وربط متاجر السلة وزد', roleEn: 'E-commerce Ops' },
              { roleAr: 'التسويق وجلب العملاء والنمو', roleEn: 'Growth & Marketing' },
              { roleAr: 'صناعة المحتوى وتهيئة SEO', roleEn: 'SEO & Copywriting' },
              { roleAr: 'تحليل سلوك المستخدم والبيانات', roleEn: 'Analytics & UX Auditing' },
              { roleAr: 'أتمتة الأعمال وحلول الذكاء الاصطناعي', roleEn: 'AI & Automations' }
            ].map((role, idx) => (
              <div 
                key={idx} 
                className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-5 rounded-2xl text-center flex flex-col items-center justify-center gap-3 shadow-inner group hover:border-[var(--color-primary)]/30 transition-all"
              >
                {/* Abstract Vector Icon / Avatar representing Role */}
                <div className="w-10 h-10 rounded-full bg-[var(--surface-tertiary)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--color-primary)] group-hover:bg-blue-500/5 transition-all">
                  <span className="text-xs font-bold font-english">0{idx + 1}</span>
                </div>
                <h4 className="font-bold text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
                  {isEn ? role.roleEn : role.roleAr}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: TRUST LINKS (روابط الثقة) */}
      <section id="about-trust-links" className="py-24 border-b border-[var(--border-default)]/30 bg-[var(--surface-secondary)]/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)]">
              {isEn ? 'Discover NmoLabs Through What We Build' : 'اكتشف NmoLabs من خلال ما نبنيه'}
            </h2>
            <p className="text-base text-[var(--text-muted)]">
              {isEn ? 'Explore our systems, previous projects, custom tools and experimental labs.' : 'الروابط التي تترجم خبراتنا العملية وتثبت دقة وجودة مخرجاتنا التقنية.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                titleAr: 'أعمالنا ومشاريعنا',
                titleEn: 'Our Works & Projects',
                descAr: 'مشاريع متميزة وتجارب رقمية متكاملة عبر قطاعات متنوعة.',
                descEn: 'Featured client projects and digital systems built by our labs.',
                icon: <Briefcase className="w-6 h-6 text-blue-500" />,
                route: 'work'
              },
              {
                titleAr: 'خدماتنا الاستراتيجية',
                titleEn: 'Our Core Services',
                descAr: 'حلول مخصصة نضبط بها مبيعاتك وتواجدك الرقمي بدقة.',
                descEn: 'Tailored implementations designed to scale your operations.',
                icon: <Layers className="w-6 h-6 text-emerald-500" />,
                act: 'services'
              },
              {
                titleAr: 'منتجاتنا التقنية',
                titleEn: 'Proprietary Products',
                descAr: 'أنظمة وأدوات مرنة صممناها لتختصر الوقت وتصنع أثراً.',
                descEn: 'Proprietary platforms owned or custom developed by NmoLabs.',
                icon: <ShoppingBag className="w-6 h-6 text-purple-500" />,
                route: 'products'
              },
              {
                titleAr: 'مختبر الابتكارات',
                titleEn: 'Innovation Lab',
                descAr: 'تجارب وأبحاث الذكاء الاصطناعي وصياغة أدوات المستقبل.',
                descEn: 'Where future-oriented AI experiments are formulated and tested.',
                icon: <Cpu className="w-6 h-6 text-amber-500" />,
                route: 'innovation-lab'
              }
            ].map((linkCard, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 rounded-2xl shadow-sm hover:shadow-md flex flex-col justify-between hover:border-[var(--color-primary)]/30 transition-all relative group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-[var(--surface-tertiary)] flex items-center justify-center shadow-inner">
                    {linkCard.icon}
                  </div>
                  <h3 className="font-black text-base text-[var(--text-primary)]">
                    {isEn ? linkCard.titleEn : linkCard.titleAr}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {isEn ? linkCard.descEn : linkCard.descAr}
                  </p>
                </div>

                <div className="pt-6">
                  {linkCard.route ? (
                    <button 
                      onClick={() => navigateToRoute(linkCard.route!)}
                      className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>{isEn ? 'Explore Link' : 'اكتشف الرابط'}</span>
                      {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    </button>
                  ) : linkCard.act ? (
                    <button 
                      onClick={() => handleScrollToSection(linkCard.act!)}
                      className="text-xs font-bold text-[var(--color-primary)] flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>{isEn ? 'Explore Section' : 'استكشف القسم'}</span>
                      {isEn ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12: CTA (الدعوة الختامية) */}
      <section id="about-cta" className="py-20 relative overflow-hidden">
        
        {/* Subtle grid and ambient backdrop */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-tight">
              {isEn ? 'Do Not Start with Technology, Start with Outcomes' : 'لا تبدأ بالتقنية، ابدأ بما تريد تحقيقه'}
            </h2>
            <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
              {isEn ? 'Share your strategic hurdles or desired business goals, and let us help architect the correct digital leverage before writing a single line of code.' : 'شاركنا هدفك أو التحدي الذي تواجهه، وسنساعدك على تحديد الحل الرقمي المناسب قبل البدء في التنفيذ.'}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={() => triggerBookingModal('عن نولابز - دعوة ختامية')}
              className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:opacity-95 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isEn ? 'Start a Project' : 'ابدأ مشروعك'}
            </button>
            <button 
              onClick={handleContactClick}
              className="px-6 py-3 rounded-full font-bold text-sm bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--surface-tertiary)] transition-all cursor-pointer"
            >
              {isEn ? 'Contact Us' : 'تواصل معنا'}
            </button>
            <button 
              onClick={() => navigateToRoute('work')}
              className="px-6 py-3 rounded-full font-bold text-sm text-[var(--color-primary)] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isEn ? 'Explore Our Work' : 'استكشف أعمالنا'}</span>
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
