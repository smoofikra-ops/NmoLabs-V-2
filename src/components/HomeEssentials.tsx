import React from 'react';
import { useSite } from '../context/SiteContext';
import { ArrowUpLeft, ArrowLeft, SearchCheck, ClipboardList, PenTool, CheckCircle2, BookOpen } from 'lucide-react';
export const HomeEssentials=()=>{
 const {config,updateConfig}=useSite(); const en=config.language==='en';
 const steps=en?[['Discover','Understand your needs'],['Plan','Define the scope'],['Build','Design and develop'],['Deliver','Test and hand over']]:[['نفهم احتياجك','نحدد المشكلة والأهداف'],['نخطط','نوضح النطاق والمخرجات'],['ننفّذ','نصمم ونطوّر الحل'],['نختبر ونسلّم','نتأكد من جاهزية المشروع']];
 const faqs=en?[['Can I request only specific services?','Yes. Select only the services you need and request a custom quote.'],['Do you develop existing websites and stores?','Yes. We work on new and existing digital products.'],['Are advertising budgets included?','No. Media spend is separate from management fees.'],['How are software projects priced?','After we review the scope and technical requirements.']]:[['هل أقدر أطلب خدمات محددة فقط؟','نعم. اختر الخدمات التي تحتاجها وأرسل طلب عرض سعر مخصص.'],['هل تطورون متجرًا أو موقعًا قائمًا؟','نعم. نقدم خدمات الإنشاء والتطوير بحسب حالة المشروع.'],['هل ميزانية الإعلانات مشمولة في باقات النمو؟','لا، ميزانية الإنفاق على المنصات منفصلة عن أتعاب إدارة الحملات.'],['كيف يتم تسعير الأنظمة والتطبيقات؟','بعد دراسة المتطلبات ونطاق العمل والتكاملات اللازمة.']];
 return <div className="relative z-10">
  <section className="px-5 py-8 md:py-10" id="how-we-work"><div className="max-w-6xl mx-auto">
   <h2 className="text-[clamp(1.3rem,3vw,2rem)] lg:whitespace-nowrap font-black text-[var(--text-primary)] text-center mb-7">{en?'How we work':'كيف نعمل؟'}</h2>
   <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-5" dir={en?"ltr":"rtl"}>{steps.map(([title,detail],i)=>{const Icon=[SearchCheck,ClipboardList,PenTool,CheckCircle2][i];return <div key={title} className="relative min-w-0"><div className="h-full min-h-[116px] sm:min-h-[152px] md:min-h-[175px] rounded-xl md:rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/95 backdrop-blur-md px-1 py-3 sm:p-4 md:p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:border-[var(--color-primary)]/60 transition-all shadow-sm"><div className="relative w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-2 rounded-xl bg-[#183b68] text-sky-200 border border-blue-300/20 flex items-center justify-center"><Icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 motion-safe:group-hover:scale-110 transition-transform"/></div><span className="text-[10px] text-[var(--text-secondary)] font-bold mb-1">{String(i+1).padStart(2,'0')}</span><h3 className="font-extrabold text-[var(--text-primary)] text-[10px] leading-[1.4] sm:text-sm md:text-lg">{title}</h3><p className="hidden sm:block text-[var(--text-secondary)] text-xs md:text-base mt-2 leading-relaxed">{detail}</p></div>{i<steps.length-1&&<span aria-hidden="true" className="absolute z-20 -left-2 sm:-left-3 md:-left-4 top-9 sm:top-12 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-[#0d284c] border border-sky-400/50 text-sky-200 flex items-center justify-center"><ArrowLeft className="w-2.5 h-2.5 sm:w-4 sm:h-4 animate-pulse"/></span>}</div>;})}</div>
  </div></section>
  <section className="px-5 py-8 md:py-10" id="home-faq"><div className="max-w-4xl mx-auto">
   <h2 className="text-3xl font-black text-[var(--text-primary)] text-center mb-9">{en?'Frequently asked questions':'الأسئلة الشائعة'}</h2>
   <div className="space-y-3">{faqs.map(([question,answer])=><details key={question} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5"><summary className="cursor-pointer text-[var(--text-primary)] font-semibold">{question}</summary><p className="text-[var(--text-secondary)] leading-relaxed mt-4 text-base">{answer}</p></details>)}</div>
  </div></section>
  <section className="px-5 py-8 md:py-10" id="home-insights"><div className="max-w-6xl mx-auto text-center">
   <BookOpen className="mx-auto text-[var(--color-primary)] mb-3" size={30}/>
   <h2 className="text-3xl font-black text-[var(--text-primary)] mb-3">{en?'Insights & knowledge':'مدونة نمو لابز'}</h2>
   <p className="text-[var(--text-primary)] inline-block bg-[var(--surface-primary)]/90 border border-[var(--border-default)] rounded-xl px-4 py-2 mb-6">{en?'Explore practical guides on software, online commerce, and digital growth.':'أدلة عملية عن التجارة الإلكترونية وتطوير الأنظمة ونمو الأعمال.'}</p>
   <button onClick={()=>{updateConfig({currentRoute:'blog'});window.scrollTo(0,0);}} className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold">{en?'Read the articles':'استعرض جميع المقالات'}<ArrowUpLeft size={17}/></button>
  </div></section>
  <section className="px-5 py-8 md:py-10"><div className="max-w-5xl mx-auto border border-[var(--border-default)] rounded-3xl bg-[var(--surface-secondary)]/80 backdrop-blur p-7 md:p-10 text-center">
   <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-3">{en?'Ready to start?':'جاهز نبدأ مشروعك؟'}</h2>
   <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-6">{en?'Explore our services or request an initial consultation.':'اختر الخدمة المناسبة أو اطلب استشارة أولية لمناقشة احتياجك.'}</p>
   <button onClick={()=>{updateConfig({currentRoute:'services'});window.scrollTo(0,0);}} className="bg-[var(--color-primary)] px-6 py-3 rounded-xl font-bold text-white">{en?'Explore services':'استعرض خدماتنا'}</button>
  </div></section>
 </div>;
};
