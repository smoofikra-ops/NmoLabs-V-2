import React from 'react';
import { SearchCheck, ChartNoAxesCombined, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useSite } from '../context/SiteContext';

// Hero owns the single modal instance; this is an additional discoverable entry point.
export const HomeAuditCTA=()=>{
 const {config}=useSite();
 const en=config.language==='en';
 return <section id="smart-audit" className="relative z-10 px-4 sm:px-6 py-6 md:py-9" aria-label={en?'Free website audit':'فحص موقعك مجانًا'}>
  <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border border-sky-300/25 bg-gradient-to-l from-[#091e3c] via-[#0d3452] to-[#102c48] px-4 sm:px-8 py-6 sm:py-8 shadow-xl">
   <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
    <div className="flex items-start gap-3 sm:gap-4 min-w-0">
     <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/10 text-sky-200 flex items-center justify-center"><SearchCheck size={26}/></div>
     <div className="min-w-0"><p className="text-xs font-bold text-sky-200 mb-1">{en?'FREE PUBLIC WEBSITE SCAN':'فحص مجاني — بدون تسجيل'}</p><h2 className="text-xl sm:text-2xl font-black text-white leading-snug">{en?'How ready is your website?':'كم تقييم موقعك من 100؟'}</h2><p className="text-sm sm:text-base text-slate-200 mt-2 leading-relaxed">{en?'Check performance, search readiness, accessibility, and technical practices using verified PageSpeed data.':'اعرف سرعة موقعك وتجهيزه للظهور في Google ووضوحه للعملاء، بتقرير سهل تفهمه وتقدر تحفظه.'}</p></div>
    </div>
    <button type="button" onClick={()=>window.dispatchEvent(new Event('nmolabs-open-audit'))} className="shrink-0 inline-flex justify-center items-center gap-2 min-h-12 rounded-xl bg-[#66C2B3] hover:bg-[#7bd3c4] px-6 py-3 text-[#072535] font-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">{en?'Start free scan':'افحص موقعي الآن'}<ChevronLeft size={18}/></button>
   </div>
   <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-sky-100"><span className="inline-flex items-center gap-1"><ShieldCheck size={15}/> {en?'No account access':'ما يحتاج صلاحيات'}</span><span className="inline-flex items-center gap-1"><ChartNoAxesCombined size={15}/> {en?'Clear scores and notes':'درجات واضحة وملاحظات مختصرة'}</span></div>
  </div>
 </section>;
};
