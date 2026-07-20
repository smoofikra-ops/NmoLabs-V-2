import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useInView } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { experimentsData, Experiment } from '../data/experiments';
import { ArrowRight, ArrowLeft, ArrowDown, ExternalLink, Lightbulb, Beaker, GitCommit, Search, RefreshCw, Box, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { InnovationPreview } from './InnovationPreview';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';

export const InnovationLabPage = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeColor, setActiveColor] = useState<string>('#333');
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  const categories = [
    { id: 'all', ar: 'الكل', en: 'All' },
    { id: 'ai', ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
    { id: 'ecommerce', ar: 'التجارة الإلكترونية', en: 'Ecommerce' },
    { id: 'marketing', ar: 'التسويق والنمو', en: 'Marketing & Growth' },
    { id: 'automation', ar: 'الأتمتة', en: 'Automation' },
    { id: 'ux', ar: 'تجربة المستخدم', en: 'User Experience' },
    { id: 'business', ar: 'إدارة الأعمال', en: 'Business Operations' },
    { id: 'trade', ar: 'التجارة والاستيراد', en: 'Trade & Import' },
    { id: 'research', ar: 'الأبحاث المستقبلية', en: 'Future Research' }
  ];

  const featuredExperiments = experimentsData.filter(e => e.featured).sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99)).slice(0, 4);
  const otherExperiments = experimentsData.filter(e => !featuredExperiments.find(f => f.id === e.id));

  const filteredOtherExperiments = activeCategory === 'all' 
    ? otherExperiments 
    : otherExperiments.filter(e => e.category === activeCategory);

  const handleInView = (id: string) => {
    const exp = featuredExperiments.find(e => e.id === id);
    if (exp && exp.brandColor) {
      setActiveColor(exp.brandColor);
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'early_idea': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      case 'research': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'prototype': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'testing': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'on_hold': return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
      case 'promoted': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'discontinued': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-white bg-white/10 border-white/20';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'early_idea': return isEn ? 'Early Idea' : 'فكرة أولية';
      case 'research': return isEn ? 'Research' : 'تحت البحث';
      case 'prototype': return isEn ? 'Prototype' : 'نموذج أولي';
      case 'testing': return isEn ? 'Testing' : 'قيد الاختبار';
      case 'on_hold': return isEn ? 'On Hold' : 'مجمد مؤقتًا';
      case 'promoted': return isEn ? 'Promoted to Product' : 'انتقل إلى منتج';
      case 'discontinued': return isEn ? 'Discontinued' : 'تم إيقاف التجربة';
      default: return '';
    }
  };

  return (
    <div className="bg-[#030303] min-h-screen text-white relative overflow-hidden font-sans">
      <Helmet>
        <title>{isEn ? 'NmoLabs Innovation Labs | AI Experiments and Future Digital Solutions' : 'مختبر ابتكارات NmoLabs | تجارب الذكاء الاصطناعي والحلول المستقبلية'}</title>
        <meta name="description" content={isEn ? 'Explore NmoLabs experiments and applied research across artificial intelligence, ecommerce, automation, growth, and future digital solutions.' : 'استكشف تجارب وأبحاث NmoLabs في الذكاء الاصطناعي والتجارة الإلكترونية والأتمتة والتسويق الذكي والحلول الرقمية المستقبلية.'} />
      </Helmet>

      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 opacity-30 transition-colors duration-1000 ease-in-out pointer-events-none mix-blend-screen z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeColor} 0%, transparent 60%)`,
          transform: `translateY(${scrollProgress * 50}px)`
        }}
      />
      {/* Grid Pattern / Grain */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-[100svh] min-h-[650px] max-h-[980px] flex flex-col justify-center pt-20 z-10 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.05, 1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/10"
          />
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-white/10"
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex">
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-mono tracking-widest uppercase flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              NmoLabs Innovation Labs
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
          >
            {isEn ? 'Experimenting Today With What May Transform Tomorrow' : 'نجرب اليوم ما قد يغيّر العمل غدًا'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {isEn ? 'A space for research, experimentation, and prototyping, where we turn problems and opportunities into ideas that can be tested and developed.' : 'مساحة للبحث والتجربة وبناء النماذج الأولية، نحول فيها المشكلات والفرص إلى أفكار قابلة للاختبار والتطوير.'}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => {
                document.getElementById('experiments')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-black bg-white hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              {isEn ? 'Explore Experiments' : 'استكشف التجارب'}
            </button>
            <button 
              onClick={() => {
                document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-[#111] hover:bg-[#222] border border-white/10 transition-all"
            >
              {isEn ? 'Share a Challenge' : 'شاركنا تحديًا'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* From Idea to Product Process */}
      <section className="py-24 relative z-10 bg-[#080808] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">{isEn ? 'From Idea to Product' : 'من الفكرة إلى المنتج'}</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              {isEn ? 'The Innovation Labs is the pre-product stage. Here we research the problem, build the hypothesis, design the prototype, and test feasibility.' : 'مختبر الابتكارات هو المرحلة التي تسبق المنتج. هنا نبحث المشكلة، نبني الفرضية، نصمم النموذج الأولي، ونختبر إمكانية تحويل الفكرة إلى حل حقيقي.'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 lg:gap-2 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[1px] bg-white/10 -translate-y-1/2" />
            
            {[
              { num: '1', ar: 'مشكلة أو فرصة', en: 'Problem/Opportunity', icon: Search },
              { num: '2', ar: 'بحث واستكشاف', en: 'Research', icon: Lightbulb },
              { num: '3', ar: 'فرضية', en: 'Hypothesis', icon: GitCommit },
              { num: '4', ar: 'نموذج أولي', en: 'Prototype', icon: Box },
              { num: '5', ar: 'اختبار', en: 'Testing', icon: Beaker },
              { num: '6', ar: 'قرار مصيري', en: 'Decision', icon: RefreshCw },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-row lg:flex-col items-center gap-4 bg-[#111] lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-white/5">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 shadow-lg">
                  <step.icon size={20} />
                </div>
                <div className="lg:text-center flex-1">
                  <div className="text-xs font-mono text-white/30 mb-1">STEP 0{step.num}</div>
                  <h4 className="font-bold text-sm lg:text-base text-white/80">{isEn ? step.en : step.ar}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 text-center max-w-lg mx-auto">
            <h5 className="font-bold text-white/80 mb-3">{isEn ? 'Stage 6 Decisions:' : 'قرارات المرحلة السادسة:'}</h5>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">{isEn ? 'Develop to Product' : 'تطويرها إلى منتج'}</span>
              <span className="text-xs px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20">{isEn ? 'Modify Idea' : 'تعديل الفكرة'}</span>
              <span className="text-xs px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full border border-gray-500/20">{isEn ? 'Keep for Future' : 'الاحتفاظ بها للبحث'}</span>
              <span className="text-xs px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20">{isEn ? 'Stop Experiment' : 'إيقاف التجربة'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiments */}
      <div id="experiments" className="relative z-10 pt-20">
        {featuredExperiments.map((exp, index) => (
          <FeaturedExperiment 
            key={exp.id} 
            exp={exp} 
            index={index} 
            isEn={isEn} 
            onInView={handleInView} 
            updateConfig={updateConfig}
            getStatusStyle={getStatusStyle}
            getStatusText={getStatusText}
          />
        ))}
      </div>

      {/* Experimental Grid - Other Experiments */}
      <section className="py-24 relative z-10 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <h2 className="text-3xl font-black">{isEn ? 'More Experiments' : 'تجارب إضافية'}</h2>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-white text-black'
                      : 'bg-[#111] text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  {isEn ? cat.en : cat.ar}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]">
            <AnimatePresence mode="popLayout">
              {filteredOtherExperiments.map((exp, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={exp.id}
                  onClick={() => {
                    updateConfig({ currentRoute: `innovation-lab/${exp.slug}` });
                    window.scrollTo({top: 0, behavior: 'smooth'});
                  }}
                  className={`group relative rounded-3xl p-6 md:p-8 bg-[#0a0a0a] border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col ${
                    idx % 4 === 0 || idx % 4 === 3 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: exp.brandColor }} />
                  
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(exp.status)}`}>
                      {getStatusText(exp.status)}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 group-hover:text-white transition-all group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <div className="relative z-10 flex-grow">
                    <div className="text-xs text-white/40 mb-2 font-mono uppercase">
                      {categories.find(c => c.id === exp.category)?.[isEn ? 'en' : 'ar']}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(45deg, #fff, ${exp.brandColor || '#aaa'})` }}>
                      {isEn ? exp.titleEn : exp.titleAr}
                    </h3>
                    <p className="text-sm text-white/50 line-clamp-2 md:line-clamp-3">
                      {isEn ? exp.hypothesisEn : exp.hypothesisAr}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredOtherExperiments.length === 0 && (
            <div className="text-center py-20 text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-3xl">
              {isEn ? 'NO EXPERIMENTS FOUND IN THIS CATEGORY' : 'لا توجد تجارب في هذا التصنيف حالياً'}
            </div>
          )}
        </div>
      </section>

      {/* Lab Principles */}
      <section className="py-24 bg-[#080808] relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-12 text-center">{isEn ? 'How do we work in the Lab?' : 'كيف نعمل داخل المختبر؟'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { en: 'We start with the problem, not the technology.', ar: 'نبدأ بالمشكلة لا بالتقنية.' },
              { en: 'We test before we scale.', ar: 'نختبر قبل أن نتوسع.' },
              { en: 'We do not assume every idea deserves to be a product.', ar: 'لا نفترض أن كل فكرة تستحق أن تصبح منتجًا.' },
              { en: 'We learn from data and users.', ar: 'نتعلم من البيانات والمستخدمين.' },
              { en: 'We build small, fast prototypes.', ar: 'نبني نماذج صغيرة وسريعة.' },
              { en: 'We stop what proves unviable.', ar: 'نوقف ما لا يثبت جدواه.' },
              { en: 'We develop what creates real value.', ar: 'نطوّر ما يحقق قيمة حقيقية.' },
              { en: 'We respect privacy and security from day one.', ar: 'نحترم الخصوصية والأمان من البداية.' }
            ].map((principle, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 bg-[#111] rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-white/20" />
                <span className="text-white/80 font-medium">{isEn ? principle.en : principle.ar}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InnovationPreview />

      {/* From Lab to Products */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111] opacity-50 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl font-black mb-16">{isEn ? 'Some experiments become products' : 'بعض التجارب تتحول إلى منتجات'}</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 flex-wrap">
            <LabToProduct ar="تجربة الإحالة الفيروسية" en="Viral Referral Loop" prodAr="سفير النمو" prodEn="Growth Ambassador" />
            <div className="hidden md:block w-8 h-[1px] bg-white/20" />
            <LabToProduct ar="البائع الذكي متعدد القنوات" en="Omnichannel Smart Seller" prodAr="منظومة البائع الذكي" prodEn="Smart Seller System" />
            <div className="hidden md:block w-8 h-[1px] bg-white/20" />
            <LabToProduct ar="تنبؤ تأخر الشحنات" en="Shipment Delay Prediction" prodAr="نمو تاجر" prodEn="Nomu Trader" />
          </div>
        </div>
      </section>

      {/* Share a Challenge */}
      <section id="challenge" className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0ibm9uZSIvPgo8Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 mb-10 text-center">
              <h2 className="text-3xl font-black mb-4">{isEn ? 'Best ideas start with a real problem' : 'أفضل الأفكار تبدأ من مشكلة حقيقية'}</h2>
              <p className="text-white/60">
                {isEn 
                  ? 'If you have a recurring problem in your store or company and haven\'t found a suitable solution, share it with us. It might become the basis for a new experiment or product in the NmoLabs Lab.' 
                  : 'إذا كانت لديك مشكلة متكررة داخل متجرك أو شركتك ولم تجد لها حلًا مناسبًا، شاركها معنا. قد تصبح أساسًا لتجربة أو منتج جديد داخل مختبر NmoLabs.'}
              </p>
            </div>

            <form className="relative z-10 space-y-6" onSubmit={(e) => { e.preventDefault(); triggerBookingModal(isEn ? 'Shared Challenge' : 'تحدي مشارك من المختبر'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/50 mb-2">{isEn ? 'Name' : 'الاسم'}</label>
                  <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
                </div>
                <div>
                  <label className="block text-sm text-white/50 mb-2">{isEn ? 'Company / Business' : 'الشركة أو النشاط'}</label>
                  <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">{isEn ? 'Email or Phone' : 'البريد أو رقم التواصل'}</label>
                <input type="text" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">{isEn ? 'Describe the problem' : 'وصف المشكلة'}</label>
                <textarea rows={3} className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 resize-none" />
              </div>
              <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-colors">
                {isEn ? 'Share Challenge' : 'شارك التحدي'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const LabToProduct = ({ ar, en, prodAr, prodEn }: { ar: string, en: string, prodAr: string, prodEn: string }) => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-mono">
        {isEn ? en : ar}
      </div>
      <div className="w-[1px] h-6 bg-white/20" />
      <div className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-bold">
        {isEn ? prodEn : prodAr}
      </div>
    </div>
  );
};

const FeaturedExperiment = ({ exp, index, isEn, onInView, updateConfig, getStatusStyle, getStatusText }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(exp.id);
    }
  }, [isInView, exp.id, onInView]);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="min-h-[80svh] flex items-center py-24 relative z-10 border-b border-white/5 last:border-b-0">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
          
          {/* Content */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="font-mono text-white/30 text-2xl font-bold">0{index + 1}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(exp.status)}`}>
                {getStatusText(exp.status)}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              {isEn ? exp.titleEn : exp.titleAr}
            </h2>
            
            <p className="text-xl text-white/60 mb-8 leading-relaxed">
              {isEn ? exp.summaryEn : exp.summaryAr}
            </p>

            <div className="space-y-6 mb-10 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2">{isEn ? 'The Problem' : 'المشكلة'}</span>
                <p className="text-sm text-white/80">{isEn ? exp.problemEn : exp.problemAr}</p>
              </div>
              <div className="h-[1px] bg-white/10" />
              <div>
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest block mb-2" style={{ color: exp.brandColor }}>{isEn ? 'Hypothesis' : 'الفرضية'}</span>
                <p className="text-sm text-white/80">{isEn ? exp.hypothesisEn : exp.hypothesisAr}</p>
              </div>
            </div>

            <button 
              onClick={() => {
                updateConfig({ currentRoute: `innovation-lab/${exp.slug}` });
                window.scrollTo({top: 0, behavior: 'smooth'});
              }}
              className="px-8 py-3 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all flex items-center gap-3 w-fit"
            >
              {isEn ? 'Explore Experiment' : 'استكشف التجربة'}
              <ArrowRight size={16} className={isEn ? '' : 'rotate-180'} />
            </button>
          </div>

          {/* Abstract Visual Prototype */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square md:aspect-[4/3] rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-4 relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 blur-[100px]" style={{ backgroundColor: exp.brandColor }} />
              
              <div className="absolute top-4 left-4 right-4 h-8 flex items-center gap-2 px-4 bg-white/5 border border-white/10 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
              </div>

              <div className="w-full h-full pt-12 flex flex-col items-center justify-center relative z-10">
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center bg-[#111] border border-white/10 shadow-2xl mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-50 rounded-3xl" style={{ from: exp.brandColor, to: 'transparent' }} />
                  <span className="text-4xl font-black text-white/30">{exp.prototypeType?.toUpperCase() || 'CONCEPT'}</span>
                </div>
                
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/40">
                  {isEn ? 'Concept Prototype' : 'تصور أولي للتجربة'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
