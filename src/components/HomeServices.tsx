import React from 'react';
import { useSite } from '../context/SiteContext';
import { ShoppingCart, Globe2, Blocks, ArrowUpLeft } from 'lucide-react';
const cards = [
  { slug:'ecommerce',image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80', ar:'المتاجر الإلكترونية', en:'E-commerce Stores',desc:'إنشاء المتاجر على سلة وزد، تطوير المتاجر القائمة، وتجهيزها للنمو.',descEn:'Launch, improve, and grow online stores.',Icon:ShoppingCart },
  { slug:'websites',image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80', ar:'المواقع والصفحات التعريفية',en:'Websites & Landing Pages',desc:'مواقع الشركات والمؤسسات، الصفحات التعريفية وصفحات الهبوط.',descEn:'Corporate websites, business profiles, and landing pages.',Icon:Globe2 },
  { slug:'software',image:'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80', ar:'الأنظمة والتطبيقات',en:'Apps & Business Systems',desc:'تطبيقات الجوال، الأنظمة المحاسبية وERP وCRM وحلول الأعمال المخصصة.',descEn:'Mobile apps, ERP, CRM and tailored software.',Icon:Blocks },
];
export const HomeServices = () => {
  const {config,updateConfig}=useSite(); const en=config.language==='en';
  return <section id="home-services" className="relative z-10 pt-10 pb-5 md:pt-14 md:pb-8 px-5" aria-labelledby="home-services-title">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-5 md:mb-9">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">{en?'Our Services':'خدماتنا'}</p>
        <h2 id="home-services-title" className="text-[clamp(1.35rem,3.3vw,2.35rem)] lg:whitespace-nowrap font-black text-[var(--text-primary)] mb-4">{en?'Choose the right solution':'كل ما يحتاجه مشروعك الرقمي'}</h2>
        <p className="text-white bg-[#112543]/95 border border-white/15 px-4 py-2 rounded-xl backdrop-blur text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{en?'Choose a category to explore packages or request tailored services.':'ثلاثة مسارات واضحة: اختر خدمتك واستعرض الباقات أو خصص طلبك حسب احتياجك.'}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">
        {cards.map(({slug,ar,en:enTitle,desc,descEn,image,Icon})=><button key={slug} onClick={()=>{updateConfig({currentRoute:'services/'+slug});window.scrollTo(0,0);}} className="text-center md:text-start group p-2 sm:p-4 lg:p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 backdrop-blur-xl hover:border-[var(--color-primary)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] transition-all shadow-md min-w-0 min-h-[158px] sm:min-h-[240px] md:min-h-[320px] flex flex-col items-center md:items-stretch">
          <div className="relative -mx-2 sm:-mx-4 lg:-mx-6 -mt-2 sm:-mt-4 lg:-mt-6 w-[calc(100%+1rem)] sm:w-[calc(100%+2rem)] lg:w-[calc(100%+3rem)] h-14 sm:h-24 md:h-32 overflow-hidden rounded-t-xl md:rounded-t-2xl mb-2 md:mb-4 bg-[#10223b]"><img src={image} alt="" aria-hidden="true" loading="lazy" onError={e=>{e.currentTarget.style.display="none";}} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"/><div className="absolute inset-0 bg-gradient-to-t from-[#0f213d]/90 via-transparent to-transparent" /></div><span className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg md:rounded-xl bg-[var(--color-primary)]/12 border border-[var(--color-primary)]/20 text-[var(--color-primary)] mb-2 md:mb-4 group-hover:scale-105 transition-transform"><Icon className="w-4 h-4 sm:w-7 sm:h-7"/></span>
          <h3 className="text-[11px] leading-[1.35] sm:text-base lg:text-xl font-bold text-[var(--text-primary)] mb-1 md:mb-2 break-words">{en?enTitle:ar}</h3>
          <p className="hidden sm:block text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed flex-1">{en?descEn:desc}</p>
          <span className="mt-auto pt-2 sm:mt-5 flex items-center justify-center md:justify-start gap-1 sm:gap-2 text-[var(--color-primary)] font-semibold text-[10px] sm:text-sm"><span className="hidden sm:inline">{en?'Explore services':'استعرض الخدمات والباقات'}</span><span className="sm:hidden">{en?'Details':'التفاصيل'}</span> <ArrowUpLeft size={14}/></span>
        </button>)}
      </div>
    </div>
  </section>;
};
