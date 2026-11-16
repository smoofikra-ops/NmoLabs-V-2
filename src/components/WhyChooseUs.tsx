import React from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, Shield, Rocket, ArrowLeft, CheckCircle2, TrendingUp } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/utils';
import { useSite } from '../context/SiteContext';

const advantages = [
  {title:'تقنية تخدم أهدافك',desc:'نبني الحل المناسب لاحتياج مشروعك، بدون تعقيد أو إضافات غير ضرورية.', Icon:Brain},
  {title:'خدمات مترابطة',desc:'الموقع والمتجر والأنظمة والتسويق ضمن رحلة عمل واضحة.', Icon:Zap},
  {title:'أداء وموثوقية',desc:'نراجع الجودة والأداء والأمان قبل التسليم.', Icon:Shield},
  {title:'تطوير مستمر',desc:'نقيس النتائج ونتابع فرص التحسين بعد الإطلاق.', Icon:TrendingUp}
];
const advantagesEn = [
  {title:'Purpose-built technology',desc:'Solutions designed around your business goals.',Icon:Brain},
  {title:'Connected services',desc:'Websites, stores, systems and marketing in one journey.',Icon:Zap},
  {title:'Quality and reliability',desc:'Performance, security and usability are reviewed.',Icon:Shield},
  {title:'Continuous improvement',desc:'We measure outcomes and identify opportunities.',Icon:TrendingUp}
];
const highlights=[
  {ar:'تحليل ذكي',en:'Smart analysis',Icon:Brain},
  {ar:'أداء محسّن',en:'Better performance',Icon:Rocket},
  {ar:'نمو مستدام',en:'Sustainable growth',Icon:TrendingUp},
  {ar:'حماية وشراكة',en:'Security & partnership',Icon:Shield}
];

export const WhyChooseUs=()=>{
 const {config}=useSite();
 const en=config.language==='en';
 return <section id="why-us" className="relative z-10 px-4 sm:px-6 py-10 md:py-16 overflow-hidden" aria-labelledby="why-title">
  <div className="max-w-7xl mx-auto">
   <div className="text-center mb-5 md:mb-10">
    <span className="inline-flex px-4 py-1.5 rounded-full border border-white/15 bg-[#10223b] text-white text-sm font-semibold">{en?'Why us?':'ليش تختارنا؟'}</span>
    <h2 id="why-title" className="mt-4 text-[clamp(1.4rem,4vw,2.7rem)] font-black text-[var(--text-primary)]">{en?'Why choose NmoLabs?':'ليش تختار نمو لابس؟'}</h2>
    <p className="mt-3 max-w-3xl mx-auto text-white text-sm sm:text-base md:text-lg leading-relaxed rounded-xl bg-[#10223b]/95 border border-white/15 px-4 py-3">
     {en?'We combine practical technology and clear execution to help your business grow.':'نجمع التقنية والتنفيذ والمتابعة في مكان واحد، عشان يتطور مشروعك بخطوات واضحة.'}
    </p>
   </div>
   <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 lg:gap-7 items-stretch">
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
     {(en?advantagesEn:advantages).map(({title,desc,Icon},i)=><motion.article key={title} initial={false} whileHover={{y:-3}} className="min-w-0 rounded-2xl bg-[var(--surface-secondary)]/95 border border-[var(--border-default)] p-3 sm:p-5 shadow-lg">
      <div className="w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-[#153963] border border-blue-300/20 text-sky-200 mb-2 sm:mb-3"><Icon className="w-5 h-5 sm:w-7 sm:h-7"/></div>
      <h3 className="font-bold text-[var(--text-primary)] text-[13px] sm:text-lg leading-snug">{title}</h3>
      <p className="mt-2 text-[var(--text-secondary)] text-xs sm:text-sm md:text-base leading-relaxed">{desc}</p>
     </motion.article>)}
    </div>
    <div className="rounded-2xl bg-[#0d203b]/95 border border-sky-300/20 px-3 py-5 sm:p-7 flex flex-col justify-center">
     <h3 className="text-white text-center font-bold text-base sm:text-xl mb-4">{en?'The value we deliver':'قيم نطبقها في كل مشروع'}</h3>
     <div className="grid grid-cols-2 gap-3">
      {highlights.map(({ar,en:enTitle,Icon})=><div key={ar} className="rounded-xl border border-white/15 bg-white/10 min-h-[86px] sm:min-h-[110px] px-2 py-3 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/15 transition-colors">
       <Icon className="text-sky-200 w-6 h-6 sm:w-8 sm:h-8"/>
       <span className="text-white text-xs sm:text-base font-bold">{en?enTitle:ar}</span>
      </div>)}
     </div>
     <button onClick={()=>config.contactNumber?window.open(getWhatsAppUrl(config.contactNumber),'_blank','noopener,noreferrer'):document.getElementById('footer')?.scrollIntoView({behavior:'smooth'})} className="mt-5 w-full sm:w-auto self-center px-5 py-3 rounded-xl bg-[var(--color-primary)] text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2 hover:brightness-110 transition">
      {en?'Free consultation':'اطلب استشارة مجانية'} <ArrowLeft size={18}/>
     </button>
    </div>
   </div>
  </div>
 </section>;
};
