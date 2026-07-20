import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { experimentsData, Experiment } from '../data/experiments';
import { ArrowRight, ArrowLeft, ArrowUpRight, AlertTriangle, Lightbulb, GitCommit, Target, RefreshCw, Beaker, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';

export const ExperimentDetailsPage = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  
  // Extract slug from route "innovation-lab/slug"
  const slug = config.currentRoute.split('/')[1];
  const experiment = experimentsData.find(e => e.slug === slug);
  const expIndex = experimentsData.findIndex(e => e.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!experiment) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">{isEn ? 'Experiment Not Found' : 'التجربة غير موجودة'}</h1>
        <button onClick={() => updateConfig({ currentRoute: 'innovation-lab' })} className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20">
          {isEn ? 'Back to Lab' : 'العودة للمختبر'}
        </button>
      </div>
    );
  }

  const prevExp = expIndex > 0 ? experimentsData[expIndex - 1] : null;
  const nextExp = expIndex < experimentsData.length - 1 ? experimentsData[expIndex + 1] : null;

  const categories = {
    'all': { ar: 'الكل', en: 'All' },
    'ai': { ar: 'الذكاء الاصطناعي', en: 'Artificial Intelligence' },
    'ecommerce': { ar: 'التجارة الإلكترونية', en: 'Ecommerce' },
    'marketing': { ar: 'التسويق والنمو', en: 'Marketing & Growth' },
    'automation': { ar: 'الأتمتة', en: 'Automation' },
    'ux': { ar: 'تجربة المستخدم', en: 'User Experience' },
    'business': { ar: 'إدارة الأعمال', en: 'Business Operations' },
    'trade': { ar: 'التجارة والاستيراد', en: 'Trade & Import' },
    'research': { ar: 'الأبحاث المستقبلية', en: 'Future Research' }
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
    <div className="bg-[#030303] min-h-screen text-white relative font-sans">
      <Helmet>
        <title>{isEn ? `${experiment.titleEn} | NmoLabs Innovation Labs` : `${experiment.titleAr} | مختبر ابتكارات NmoLabs`}</title>
        <meta name="description" content={isEn ? experiment.summaryEn : experiment.summaryAr} />
      </Helmet>

      {/* Dynamic Header Glow */}
      <div 
        className="absolute top-0 left-0 right-0 h-[50vh] opacity-30 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${experiment.brandColor || '#333'} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={() => updateConfig({ currentRoute: 'innovation-lab' })}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors font-mono text-sm"
        >
          {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          {isEn ? 'Back to Lab' : 'العودة إلى المختبر'}
        </button>

        {/* Warning Box */}
        <div className="mb-12 p-4 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-start gap-3">
          <AlertTriangle className="text-orange-400 mt-1 shrink-0" size={20} />
          <p className="text-sm text-orange-200/80 leading-relaxed">
            {isEn 
              ? 'This is a research experiment or prototype by NmoLabs and may not represent a currently available product or service.' 
              : 'هذه تجربة بحثية أو نموذج أولي من NmoLabs، وليست بالضرورة منتجًا جاهزًا أو خدمة متاحة حاليًا.'}
          </p>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/20 bg-white/5 text-white/70">
              {categories[experiment.category as keyof typeof categories]?.[isEn ? 'en' : 'ar']}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold border border-white/20 bg-white/10" style={{ color: experiment.brandColor || '#fff', borderColor: `${experiment.brandColor}40` }}>
              {getStatusText(experiment.status)}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
            {isEn ? experiment.titleEn : experiment.titleAr}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed">
            {isEn ? experiment.summaryEn : experiment.summaryAr}
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-12 mb-20">
          
          {/* Problem */}
          {(experiment.problemAr || experiment.problemEn) && (
            <section className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
              <div className="flex items-center gap-3 mb-4 text-red-400">
                <Target size={24} />
                <h2 className="text-2xl font-bold">{isEn ? 'The Problem' : 'المشكلة'}</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                {isEn ? experiment.problemEn : experiment.problemAr}
              </p>
            </section>
          )}

          {/* Hypothesis */}
          {(experiment.hypothesisAr || experiment.hypothesisEn) && (
            <section className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10">
              <div className="flex items-center gap-3 mb-4" style={{ color: experiment.brandColor || '#3b82f6' }}>
                <Lightbulb size={24} />
                <h2 className="text-2xl font-bold">{isEn ? 'Hypothesis' : 'الفرضية'}</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                {isEn ? experiment.hypothesisEn : experiment.hypothesisAr}
              </p>
            </section>
          )}

          {/* Target Audience */}
          {((experiment.targetAudienceAr?.length || 0) > 0 || (experiment.targetAudienceEn?.length || 0) > 0) && (
            <section>
              <h2 className="text-xl font-bold mb-4 text-white/80">{isEn ? 'Target Audience' : 'الفئة المستهدفة'}</h2>
              <div className="flex flex-wrap gap-2">
                {(isEn ? experiment.targetAudienceEn : experiment.targetAudienceAr)?.map((aud, i) => (
                  <span key={i} className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-sm">
                    {aud}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Learnings */}
          {((experiment.learningsAr?.length || 0) > 0 || (experiment.learningsEn?.length || 0) > 0) && (
            <section className="p-8 rounded-3xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <CheckCircle size={24} />
                <h2 className="text-2xl font-bold">{isEn ? 'What we learned' : 'ما الذي تعلمناه؟'}</h2>
              </div>
              <ul className="space-y-3">
                {(isEn ? experiment.learningsEn : experiment.learningsAr)?.map((learn, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span>{learn}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Current & Next */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(experiment.currentStageAr || experiment.currentStageEn) && (
              <div className="p-6 rounded-2xl bg-[#111] border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-2">{isEn ? 'CURRENT STAGE' : 'المرحلة الحالية'}</div>
                <div className="text-white/90">{isEn ? experiment.currentStageEn : experiment.currentStageAr}</div>
              </div>
            )}
            {(experiment.nextStepAr || experiment.nextStepEn) && (
              <div className="p-6 rounded-2xl bg-[#111] border border-white/10">
                <div className="text-xs font-mono text-white/40 mb-2">{isEn ? 'NEXT STEP' : 'الخطوة التالية'}</div>
                <div className="text-white/90">{isEn ? experiment.nextStepEn : experiment.nextStepAr}</div>
              </div>
            )}
          </div>

          {/* Related Product */}
          {experiment.relatedProductSlug && (
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#111] to-[#1a1a1a] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm font-bold text-white/50 mb-1">{isEn ? 'Promoted to Product' : 'تحولت إلى منتج'}</div>
                <h3 className="text-2xl font-bold">
                  {experiment.relatedProductSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>
              </div>
              <button 
                onClick={() => { updateConfig({ currentRoute: 'products' }); window.scrollTo(0,0); }}
                className="px-6 py-3 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-white/90 shrink-0"
              >
                {isEn ? 'View Product' : 'عرض المنتج'}
                <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center py-16 border-t border-b border-white/10 mb-20">
          <h2 className="text-2xl font-bold mb-4">{isEn ? 'Have a similar challenge?' : 'تواجه تحديًا مشابهًا؟'}</h2>
          <button 
            onClick={() => triggerBookingModal(isEn ? 'Shared Challenge from Experiment' : 'تحدي مشارك من صفحة التجربة')}
            className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-colors"
          >
            {isEn ? 'Share your challenge' : 'شاركنا تحديك'}
          </button>
        </div>

        {/* Prev / Next Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {prevExp ? (
            <button 
              onClick={() => updateConfig({ currentRoute: `innovation-lab/${prevExp.slug}` })}
              className="flex-1 p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 text-right md:text-left group flex items-center gap-4 transition-all"
            >
              <ArrowRight size={24} className={`text-white/30 group-hover:text-white ${isEn ? 'rotate-180 order-first' : 'order-last'}`} />
              <div className="flex-1">
                <div className="text-xs text-white/40 mb-1">{isEn ? 'PREVIOUS' : 'السابق'}</div>
                <div className="font-bold text-white/90 group-hover:text-white truncate">{isEn ? prevExp.titleEn : prevExp.titleAr}</div>
              </div>
            </button>
          ) : <div className="flex-1" />}
          
          {nextExp ? (
            <button 
              onClick={() => updateConfig({ currentRoute: `innovation-lab/${nextExp.slug}` })}
              className={`flex-1 p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 text-left md:text-right group flex items-center gap-4 transition-all ${isEn ? '' : 'flex-row-reverse'}`}
            >
              <div className="flex-1 text-right">
                <div className="text-xs text-white/40 mb-1">{isEn ? 'NEXT' : 'التالي'}</div>
                <div className="font-bold text-white/90 group-hover:text-white truncate">{isEn ? nextExp.titleEn : nextExp.titleAr}</div>
              </div>
              <ArrowRight size={24} className="text-white/30 group-hover:text-white" />
            </button>
          ) : <div className="flex-1" />}
        </div>

      </div>
    </div>
  );
};
