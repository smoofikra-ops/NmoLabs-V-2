import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { productsData } from '../data/products';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';

interface Props {
  slug: string;
}

export const ProductDetailsPage = ({ slug }: Props) => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const product = productsData.find(p => p.slug === slug);
  const currentIndex = productsData.findIndex(p => p.slug === slug);
  const nextProduct = currentIndex < productsData.length - 1 ? productsData[currentIndex + 1] : null;
  const prevProduct = currentIndex > 0 ? productsData[currentIndex - 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#050505]">
        <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
        <button 
          onClick={() => updateConfig({ currentRoute: 'products' })}
          className="text-[var(--color-primary)] font-bold flex items-center gap-2"
        >
          {isEn ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          {isEn ? 'Back to Products' : 'العودة إلى المنتجات'}
        </button>
      </div>
    );
  }

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
    <article className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>{isEn ? `${product.titleEn} | NmoLabs Products` : `${product.titleAr} | منتجات NmoLabs`}</title>
        <meta name="description" content={isEn ? product.summaryEn : product.summaryAr} />
      </Helmet>

      {/* Dynamic Header Section */}
      <div className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#050505] border-b border-white/5">
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen z-0"
          style={{ background: `radial-gradient(circle at 50% 0%, ${product.brandColor} 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20 mix-blend-overlay z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <button 
            onClick={() => updateConfig({ currentRoute: 'products' })}
            className="font-bold flex items-center gap-2 mb-12 transition-colors w-fit text-white/60 hover:text-white"
          >
            {isEn ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            {isEn ? 'Back to Products' : 'العودة إلى المنتجات'}
          </button>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            <div className="flex-1 w-full">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold backdrop-blur-sm">
                    {product.category}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold border border-white/20 bg-[#111]">
                    {getStatusText(product.status, isEn)}
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]">
                  {isEn ? product.titleEn : product.titleAr}
                </h1>

                <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mb-12">
                  {isEn ? product.summaryEn : product.summaryAr}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {product.demoAvailable && (
                    <button 
                      onClick={() => triggerBookingModal(isEn ? `Request Demo: ${product.titleEn}` : `طلب عرض: ${product.titleAr}`)}
                      className="px-8 py-4 rounded-full font-bold text-black transition-transform active:scale-95 text-center shadow-lg shadow-white/5"
                      style={{ backgroundColor: 'white' }}
                    >
                      {isEn ? 'Request Demo' : 'طلب عرض توضيحي'}
                    </button>
                  )}
                  <button 
                    onClick={() => triggerBookingModal(isEn ? `Inquire about ${product.titleEn}` : `استفسار حول ${product.titleAr}`)}
                    className="px-8 py-4 rounded-full font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all text-center"
                  >
                    {isEn ? 'Contact Us' : 'تواصل معنا'}
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="flex-1 w-full max-w-2xl hidden lg:block">
              {/* Abstract Hero Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="aspect-square w-full rounded-[2.5rem] bg-[#111] border border-white/10 relative shadow-2xl p-6 overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 opacity-30 blur-[80px]" style={{ backgroundColor: product.brandColor }} />
                
                <div className="h-10 border-b border-white/10 flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="flex-grow flex flex-col gap-4 relative z-10">
                  <div className="h-32 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 font-black text-6xl">
                    {isEn ? product.shortNameEn.charAt(0) : product.shortNameAr.charAt(0)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 flex-grow">
                    <div className="rounded-2xl bg-white/5 border border-white/10" />
                    <div className="rounded-2xl bg-white/5 border border-white/10" />
                  </div>
                </div>
                <div className="absolute bottom-6 right-6 px-4 py-2 rounded-full bg-white/5 text-xs text-white/40 border border-white/5 z-10">
                  {isEn ? 'Concept Interface' : 'تصور مبدئي للواجهة'}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        {/* Content Sections */}
        <div className="space-y-20 text-lg md:text-xl text-white/70 leading-relaxed mb-32">
          
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">{isEn ? 'Overview' : 'نظرة عامة'}</h2>
            <p>{isEn ? product.descriptionEn : product.descriptionAr}</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">{isEn ? 'The Problem' : 'المشكلة التي نعالجها'}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(isEn ? product.problemsEn : product.problemsAr).map((problem, idx) => (
                <li key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-[#111] border border-white/5 text-base">
                  <div className="mt-1 text-red-400 shrink-0">
                    <ChevronRight size={18} />
                  </div>
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">{isEn ? 'Core Benefits' : 'الفوائد الأساسية'}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(isEn ? product.benefitsEn : product.benefitsAr).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3 p-5 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 text-base">
                  <div className="mt-1 text-[var(--color-primary)] shrink-0" style={{ color: product.brandColor }}>
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">{isEn ? 'Key Features' : 'الخصائص'}</h2>
            <div className="flex flex-wrap gap-3">
              {(isEn ? product.featuresEn : product.featuresAr).map((feature, idx) => (
                <span key={idx} className="px-5 py-3 rounded-full bg-[#111] border border-white/10 text-white font-medium text-base">
                  {feature}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">{isEn ? 'Target Audience' : 'الفئة المستهدفة'}</h2>
            <div className="flex flex-wrap gap-3">
              {(isEn ? product.targetAudienceEn : product.targetAudienceAr).map((audience, idx) => (
                <span key={idx} className="px-5 py-3 rounded-xl bg-white/5 border border-white/5 text-white/80 text-base">
                  {audience}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-6">{isEn ? 'Use Cases' : 'سيناريوهات الاستخدام'}</h2>
            <ul className="space-y-4">
              {(isEn ? product.useCasesEn : product.useCasesAr).map((useCase, idx) => (
                <li key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-[#111] border border-white/5 text-base">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-yellow-500" />
                  </div>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 mb-24">
        <div className="bg-[#111] border border-white/10 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 blur-3xl" style={{ backgroundColor: product.brandColor }} />
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
            {isEn ? 'Ready to upgrade your system?' : 'مستعد لتطوير نظامك؟'}
          </h3>
          <p className="text-xl text-white/60 mb-10 relative z-10 max-w-2xl mx-auto">
            {isEn ? `Contact us to discuss how ${product.titleEn} fits into your workflow.` : `تواصل معنا لمناقشة كيف يمكن لـ ${product.titleAr} أن يتناسب مع عملك.`}
          </p>
          <button 
            onClick={() => triggerBookingModal(isEn ? `Inquire about ${product.titleEn}` : `طلب ${product.titleAr}`)}
            className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 relative z-10 shadow-xl"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            {isEn ? 'Talk to us' : 'تحدث معنا'}
          </button>
        </div>
      </div>

      {/* Next/Prev Navigation */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          {prevProduct ? (
            <button 
              onClick={() => updateConfig({ currentRoute: `products/${prevProduct.slug}` })}
              className="text-left group flex flex-col items-start"
            >
              <span className="text-white/40 text-sm font-bold mb-3 flex items-center gap-2">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                {isEn ? 'Previous Product' : 'المنتج السابق'}
              </span>
              <span className="text-2xl md:text-3xl font-black text-white transition-colors group-hover:text-transparent group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #fff, ${prevProduct.brandColor})` }}>
                {isEn ? prevProduct.titleEn : prevProduct.titleAr}
              </span>
            </button>
          ) : <div />}
          
          {nextProduct ? (
            <button 
              onClick={() => updateConfig({ currentRoute: `products/${nextProduct.slug}` })}
              className="text-right group flex flex-col items-end md:ml-auto"
            >
              <span className="text-white/40 text-sm font-bold mb-3 flex items-center gap-2">
                {isEn ? 'Next Product' : 'المنتج التالي'}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-2xl md:text-3xl font-black text-white transition-colors group-hover:text-transparent group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(to left, #fff, ${nextProduct.brandColor})` }}>
                {isEn ? nextProduct.titleEn : nextProduct.titleAr}
              </span>
            </button>
          ) : <div />}
        </div>
      </div>
    </article>
  );
};
