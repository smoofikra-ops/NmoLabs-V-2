import React from 'react';
import { useSite } from '../context/SiteContext';
import { ArrowUpLeft, CircleHelp, ClipboardList, PenTool, Code2, CheckCircle2, BookOpen } from 'lucide-react';
export const HomeEssentials=()=>{
 const {config,updateConfig}=useSite(); const en=config.language==='en';
 const steps=en?[['Discover','Understand your needs'],['Plan','Define the scope'],['Build','Design and develop'],['Deliver','Test and hand over']]:[['نفهم احتياجك','نحدد المشكلة والأهداف'],['نخطط','نوضح النطاق والمخرجات'],['ننّفذ','نصمم ونطوّر الحل'],['نختبر ونسلّم','نتأكد من جاهزية المشروع']];
 const faqs=en?[['Can I request only specific services?','Yes. Select only the services you need and request a custom quote.'],['Do you develop existing websites and stores?','Yes. We work on new and existing digital products.'],['Are advertising budgets included?','No. Media spend is separate from management fees.'],['How are software projects priced?','After we review the scope and technical requirements.']]:[['هل أقدر أطلب خدمات محددة فقط؟','نعم. اختر الخدمات التي تحتاجها وأرسل طلب عرض سعر مخصص.'],['هل تطورون متجرًا أو موقعًا قائمًا؟','نعم. نقدم خدمات الإنشاء والتطوير بحسب حالة المشروع.'],['هل ميزانية الإعلانات مشمولة في باقات النمو؟','لا، ميزانية الإنفاق على المنصات منفصلة عن أتعاب إدارة الحملات.'],['كيف يتم تسعير الأنظمة والتطبيقات؟','بعد دراسة المتطلبات ونطاق العمل والتكاملات اللازمة.']];
 return <div className="relative z-10">
  <section className="px-5 py-8 md:py-10" id="how-we-work"><div className="max-w-6xl mx-auto">
   <h2 className="text-[clamp(1.3rem,3vw,2rem)] lg:whitespace-nowrap font-black text-[var(--text-primary)] text-center mb-7">{en?'How we work':'كيف نعمل؟'}</h2>
   <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{steps.map(([title,detail],i)=><div key={title} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 backdrop-blur-md p-4 sm:p-5 min-h-[134px] hover:-translate-y-1 hover:border-[var(--color-primary)]/50 transition-all shadow-sm"><span className="text-[var(--color-primary)] font-black text-xl">{String(i+1).padStart(2,'0')}</span><h3 className="font-bold text-[var(--text-primary)] mt-2 mb-1">{title}</h3><p className="text-[var(--text-secondary)] text-base leading-relaxed">{detail}</p></div>)}</div>
  </div></section>
  <section className="px-5 py-8 md:py-10" id="home-faq"><div className="max-w-4xl mx-auto">
   <h2 className="text-3xl font-black text-[var(--text-primary)] text-center mb-9">{en?'Frequently asked questions':'الأسئلة الشائعة'}</h2>
   <div className="space-y-3">{faqs.map(([question,answer])=><details key={question} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5"><summary className="cursor-pointer text-[var(--text-primary)] font-semibold">{question}</summary><p className="text-[var(--text-secondary)] leading-relaxed mt-4 text-base">{answer}</p></details>)}</div>
  </div></section>
  <section className="px-5 py-8 md:py-10" id="home-insights"><div className="max-w-6xl mx-auto text-center">
   <BookOpen className="mx-auto text-[var(--color-primary)] mb-3" size={30}/>
   <h2 className="text-3xl font-black text-[var(--text-primary)] mb-3">{en?'Insights & knowledge':'مدونة نمو لابز'}</h2>
   <p className="text-[var(--text-secondary)] mb-6">{en?'Explore practical guides on software, online commerce, and digital growth.':'أدلة عملية عن التجارة الإلكترونية وتطوير الأنظمة ونمو الأعمال.'}</p>
   <button onClick={()=>{updateConfig({currentRoute:'blog'});window.scrollTo(0,0);}} className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold">{en?'Read the articles':'استعرض جميع المقالات'}<ArrowUpLeft size={17}/></button>
  </div></section>
  <section className="px-5 py-8 md:py-10"><div className="max-w-5xl mx-auto border border-[var(--border-default)] rounded-3xl bg-[var(--surface-secondary)]/80 backdrop-blur p-7 md:p-10 text-center">
   <h2 className="text-2xl md:text-3xl font-black text-[var(--text-primary)] mb-3">{en?'Ready to start?':'جاهز نبدأ مشروعك؟'}</h2>
   <p className="text-[var(--text-secondary)] mb-6">{en?'Explore our services or request an initial consultation.':'اختر الخدمة المناسبة أو اطلب استشارة أولية لمناقشة احتياجك.'}</p>
   <button onClick={()=>{updateConfig({currentRoute:'services'});window.scrollTo(0,0);}} className="bg-[var(--color-primary)] px-6 py-3 rounded-xl font-bold text-white">{en?'Explore services':'استعرض خدماتنا'}</button>
  </div></section>
 </div>;
};
