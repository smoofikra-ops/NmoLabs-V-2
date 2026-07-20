import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { productsData, Product } from '../data/products';
import { ArrowRight, ArrowLeft, ExternalLink, Lightbulb, UserCheck, Layers, PenTool, Code, CheckCircle, Rocket, RefreshCw } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';

export const ProductsPage = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredProducts = productsData.filter(p => p.featured).sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
  const otherProducts = productsData.filter(p => !p.featured);

  const [activeProductColor, setActiveProductColor] = useState<string>('var(--color-primary)');

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'on_demand': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'planning': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'prototype': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'coming_soon': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  const getStatusText = (status: string, isEn: boolean) => {
    switch(status) {
      case 'available': return isEn ? 'Available' : 'متاح';
      case 'on_demand': return isEn ? 'On Demand' : 'متاح حسب الطلب';
      case 'in_progress': return isEn ? 'In Progress' : 'قيد التطوير';
      case 'planning': return isEn ? 'Planning' : 'قيد التخطيط';
      case 'prototype': return isEn ? 'Prototype' : 'نموذج أولي';
      case 'coming_soon': return isEn ? 'Coming Soon' : 'قريباً';
      default: return '';
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white relative">
      <Helmet>
        <title>{isEn ? 'Products | NmoLabs' : 'المنتجات | NmoLabs'}</title>
        <meta name="description" content={isEn ? 'We design and build intelligent technology products that help businesses sell, operate, analyze, and grow more efficiently.' : 'نصمم ونبني منتجات تقنية ذكية تساعد الشركات على البيع، الإدارة، التحليل والنمو بكفاءة أعلى.'} />
      </Helmet>

      {/* Dynamic Background Element */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none transition-colors duration-1000 mix-blend-screen z-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${activeProductColor} 0%, transparent 60%)` }}
      />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative min-h-[650px] max-h-[980px] h-[100svh] flex flex-col justify-center overflow-hidden z-10 pt-20">
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          {/* Abstract Tech Visuals */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] rounded-full border border-white/5 border-dashed absolute"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] rounded-full border border-[var(--color-primary)]/10 absolute"
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 text-[var(--color-primary)] text-sm font-bold tracking-widest uppercase">
              {isEn ? 'NmoLabs Products' : 'منتجات وتقنيات من NmoLabs'}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
          >
            {isEn ? 'We Turn Ideas Into Working Products' : 'نحوّل الأفكار إلى منتجات تعمل'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {isEn ? 'We design and build intelligent technology products that help businesses sell, operate, analyze, and grow more efficiently.' : 'نصمم ونبني منتجات تقنية ذكية تساعد الشركات على البيع، الإدارة، التحليل والنمو بكفاءة أعلى.'}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => {
                document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[var(--surface-primary)] bg-[var(--text-primary)] hover:bg-[var(--color-primary)] transition-all shadow-lg shadow-white/5"
            >
              {isEn ? 'Explore Products' : 'استكشف المنتجات'}
            </button>
            <button 
              onClick={() => triggerBookingModal(isEn ? 'Talk to Us about Products' : 'تحدث معنا حول المنتجات')}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
            >
              {isEn ? 'Talk to Us' : 'تحدث معنا'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <div id="featured-products" className="relative z-10 flex flex-col gap-32 py-32">
        {featuredProducts.map((product, index) => (
          <FeaturedProductSection 
            key={product.id} 
            product={product} 
            index={index} 
            isEn={isEn} 
            updateConfig={updateConfig}
            onInView={(color) => setActiveProductColor(color)}
            getStatusStyle={getStatusStyle}
            getStatusText={getStatusText}
          />
        ))}
      </div>

      {/* Other Products Grid */}
      <section className="py-32 relative z-10 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6">{isEn ? 'More Solutions' : 'حلول إضافية'}</h2>
            <p className="text-xl text-white/60 max-w-2xl">
              {isEn ? 'Discover our other internal tools and on-demand systems designed for specialized operations.' : 'اكتشف أدواتنا الداخلية وأنظمتنا المخصصة المصممة للعمليات المتخصصة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherProducts.map((product, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={product.id}
                onClick={() => {
                  updateConfig({ currentRoute: `products/${product.slug}` });
                }}
                className="group relative rounded-3xl p-8 bg-[#111] border border-white/10 hover:border-white/30 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundColor: product.brandColor }} />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(product.status)}`}>
                    {getStatusText(product.status, isEn)}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors group-hover:bg-white/10">
                    {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
                  </div>
                </div>

                <div className="relative z-10 flex-grow">
                  <h3 className="text-2xl font-black mb-4 group-hover:text-transparent group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, #fff, ${product.brandColor})` }}>
                    {isEn ? product.titleEn : product.titleAr}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    {isEn ? product.summaryEn : product.summaryAr}
                  </p>
                </div>
                
                <div className="relative z-10 pt-6 border-t border-white/10 mt-auto">
                  <span className="text-sm font-bold text-white/40">{isEn ? product.category : product.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Journey Timeline */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black mb-6">{isEn ? 'From Idea to Working Product' : 'من الفكرة إلى منتج يعمل'}</h2>
            <div className="w-24 h-1 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Horizontal line for desktop, vertical for mobile */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-white/10" />
            <div className="lg:hidden absolute left-[28px] top-0 bottom-0 w-[2px] bg-white/10" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative">
              {[
                { icon: Lightbulb, titleEn: 'Discovery', titleAr: 'اكتشاف المشكلة' },
                { icon: UserCheck, titleEn: 'User Research', titleAr: 'دراسة المستخدمين' },
                { icon: Layers, titleEn: 'Solution Design', titleAr: 'تصميم الحل' },
                { icon: PenTool, titleEn: 'Prototyping', titleAr: 'بناء النموذج الأولي' },
                { icon: Code, titleEn: 'Development', titleAr: 'التطوير والربط' },
                { icon: CheckCircle, titleEn: 'Testing', titleAr: 'الاختبار' },
                { icon: Rocket, titleEn: 'Launch', titleAr: 'الإطلاق' },
                { icon: RefreshCw, titleEn: 'Iteration', titleAr: 'التحسين المستمر' },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-row lg:flex-col items-center lg:items-start gap-6 lg:gap-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#111] border-2 border-[var(--color-primary)]/50 flex items-center justify-center text-[var(--color-primary)] shadow-lg shadow-black shrink-0 relative lg:mx-auto">
                    <step.icon size={24} />
                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-[var(--color-primary)] text-black text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="lg:text-center">
                    <h4 className="font-bold text-lg text-white mb-2">{isEn ? step.titleEn : step.titleAr}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why NmoLabs Products */}
      <section className="py-32 relative z-10 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8">{isEn ? 'Not off-the-shelf tools for everyone' : 'ليست أدوات جاهزة للجميع'}</h2>
          <p className="text-xl md:text-2xl text-white/60 mb-16 leading-relaxed">
            {isEn ? 'We build our products around real problems we face with companies and stores, then transform them into practical, scalable solutions.' : 'نبني منتجاتنا حول مشكلات حقيقية نواجهها مع الشركات والمتاجر، ثم نحولها إلى حلول عملية قابلة للتطوير.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left" dir={isEn ? 'ltr' : 'rtl'}>
            {[
              { en: 'Built around real problems.', ar: 'مبنية حول مشكلات حقيقية.' },
              { en: 'Customizable.', ar: 'قابلة للتخصيص.' },
              { en: 'Supports Arabic language.', ar: 'تدعم اللغة العربية.' },
              { en: 'Tailored for Saudi & Gulf market.', ar: 'تراعي السوق السعودي والخليجي.' },
              { en: 'Integrable with other systems.', ar: 'قابلة للتكامل مع الأنظمة الأخرى.' },
              { en: 'Designed for growth and scale.', ar: 'مصممة للنمو والتوسع.' },
              { en: 'Backed by operational & marketing expertise.', ar: 'مدعومة بخبرة تشغيلية وتسويقية.' }
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-[#111] p-6 rounded-2xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  <CheckCircle size={16} />
                </div>
                <span className="font-bold text-lg">{isEn ? point.en : point.ar}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[var(--color-primary)]/5 opacity-50 blur-3xl" />
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10 text-white">
              {isEn ? 'Have a problem worth a product?' : 'هل لديك مشكلة تستحق منتجاً؟'}
            </h2>
            <p className="text-xl text-white/60 mb-12 relative z-10 max-w-2xl mx-auto">
              {isEn ? 'Your next idea could be a full system, platform, or tech product. We help you turn it from a concept into a working solution.' : 'قد تكون فكرتك القادمة نظاماً أو منصة أو منتجاً تقنياً متكاملاً. نساعدك على تحويلها من تصور أولي إلى حل يعمل.'}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button 
                onClick={() => triggerBookingModal(isEn ? 'Discuss your idea' : 'ناقش فكرتك')}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-[var(--surface-primary)] bg-[var(--color-primary)] hover:opacity-90 transition-all shadow-lg shadow-[var(--color-primary)]/20"
              >
                {isEn ? 'Discuss your idea with us' : 'ناقش فكرتك معنا'}
              </button>
              <button 
                onClick={() => {
                  updateConfig({ currentRoute: 'work' });
                  window.scrollTo({top: 0, behavior: 'smooth'});
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all"
              >
                {isEn ? 'Explore Our Work' : 'استكشف أعمالنا'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeaturedProductSection = ({ product, index, isEn, updateConfig, onInView, getStatusStyle, getStatusText }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(product.brandColor);
    }
  }, [isInView, product.brandColor, onInView]);

  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="min-h-[80svh] flex items-center relative z-10 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
          
          <div className="flex-1 w-full">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl font-black text-white/10">0{index + 1}</span>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border backdrop-blur-sm ${getStatusStyle(product.status)}`}>
                {getStatusText(product.status, isEn)}
              </span>
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold backdrop-blur-sm">
                {product.category}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
              {isEn ? product.titleEn : product.titleAr}
            </h2>

            <p className="text-xl md:text-2xl text-white/60 mb-8 leading-relaxed">
              {isEn ? product.summaryEn : product.summaryAr}
            </p>

            <div className="space-y-6 mb-12">
              <div>
                <h4 className="text-sm font-bold text-white/40 mb-3 uppercase tracking-wider">{isEn ? 'Core Problem' : 'المشكلة الأساسية'}</h4>
                <p className="text-lg font-medium text-white/80">{isEn ? product.problemsEn[0] : product.problemsAr[0]}</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white/40 mb-3 uppercase tracking-wider">{isEn ? 'Main Benefit' : 'الفائدة الرئيسية'}</h4>
                <p className="text-lg font-medium text-[var(--color-primary)]" style={{ color: product.brandColor }}>
                  {isEn ? product.benefitsEn[0] : product.benefitsAr[0]}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  updateConfig({ currentRoute: `products/${product.slug}` });
                }}
                className="px-8 py-4 rounded-full font-bold text-black transition-transform active:scale-95 text-center shadow-lg shadow-white/5"
                style={{ backgroundColor: 'white' }}
              >
                {isEn ? 'Explore Product' : 'استكشف المنتج'}
              </button>
              {product.demoAvailable && (
                <button 
                  onClick={() => triggerBookingModal(isEn ? `Request Demo: ${product.titleEn}` : `طلب عرض: ${product.titleAr}`)}
                  className="px-8 py-4 rounded-full font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-center"
                >
                  {isEn ? 'Request Demo' : 'طلب عرض توضيحي'}
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            <div 
              className="aspect-square md:aspect-[4/3] rounded-[2rem] p-1 border border-white/10 relative overflow-hidden group cursor-pointer shadow-2xl"
              onClick={() => {
                updateConfig({ currentRoute: `products/${product.slug}` });
              }}
            >
              <div className="absolute inset-0 bg-[#0a0a0a] rounded-[2rem]" />
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-3xl" style={{ backgroundColor: product.brandColor }} />
              
              {/* Abstract Mockup Area */}
              <div className="absolute inset-4 rounded-[1.5rem] bg-[#111] border border-white/5 overflow-hidden flex flex-col">
                <div className="h-12 border-b border-white/5 flex items-center px-6 gap-2 bg-white/5 backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                  <div className="w-3 h-3 rounded-full bg-white/10" />
                </div>
                <div className="flex-grow p-8 flex items-center justify-center relative">
                  <div className="w-32 h-32 rounded-3xl blur-[40px] absolute" style={{ backgroundColor: product.brandColor }} />
                  <div className="text-white/20 font-black text-6xl md:text-8xl relative z-10 group-hover:scale-110 transition-transform duration-700">
                    {isEn ? product.shortNameEn.charAt(0) : product.shortNameAr.charAt(0)}
                  </div>
                  <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/5 text-xs text-white/40 border border-white/5">
                    {isEn ? 'Concept Interface' : 'تصور مبدئي للواجهة'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
