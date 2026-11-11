import React from 'react';
import { useSite } from '../context/SiteContext';
import { ShoppingCart, Globe2, Blocks, ArrowUpLeft } from 'lucide-react';
const cards = [
  { slug:'ecommerce', ar:'المتاجر الإلكترونية', en:'E-commerce Stores',desc:'إنشاء المتاجر على سلة وزد، تطوير المتاجر القائمة، وتجهيزها للنمو.',descEn:'Launch, improve, and grow online stores.',Icon:ShoppingCart },
  { slug:'websites', ar:'المواقع والصفحات التعريفية',en:'Websites & Landing Pages',desc:'مواقع الشركات والمؤسسات، الصفحات التعريفية وصفحات الهبوط.',descEn:'Corporate websites, business profiles, and landing pages.',Icon:Globe2 },
  { slug:'software', ar:'الأنظمة والتطبيقات',en:'Apps & Business Systems',desc:'تطبيقات الجوال، الأنظمة المحاسبية وERP وCRM وحلول الأعمال المخصصة.',descEn:'Mobile apps, ERP, CRM and tailored software.',Icon:Blocks },
];
export const HomeServices = () => {
  const {config,updateConfig}=useSite(); const en=config.language==='en';
  return <section id="home-services" className="relative z-10 py-14 md:py-20 px-5" aria-labelledby="home-services-title">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-9">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">{en?'Our Services':'خدماتنا'}</p>
        <h2 id="home-services-title" className="text-[clamp(1.35rem,3.3vw,2.35rem)] lg:whitespace-nowrap font-black text-[var(--text-primary)] mb-4">{en?'Choose the right solution':'كل ما يحتاجه مشروعك الرقمي'}</h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto">{en?'Choose a category to explore packages or request tailored services.':'ثلاثة مسارات واضحة: اختر خدمتك واستعرض الباقات أو خصص طلبك حسب احتياجك.'}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3 md:gap-5">
        {cards.map(({slug,ar,en:enTitle,desc,descEn,Icon})=><button key={slug} onClick={()=>{updateConfig({currentRoute:'services/'+slug});window.scrollTo(0,0);}} className="text-start group p-5 sm:p-6 lg:p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 backdrop-blur-xl hover:border-[var(--color-primary)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] transition-all shadow-md min-h-[195px] md:min-h-[215px] flex flex-col">
          <span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--color-primary)]/12 border border-[var(--color-primary)]/20 text-[var(--color-primary)] mb-4 group-hover:scale-105 transition-transform"><Icon size={28}/></span>
          <h3 className="text-[clamp(1rem,1.8vw,1.22rem)] font-bold text-[var(--text-primary)] mb-2 leading-snug">{en?enTitle:ar}</h3>
          <p className="text-[var(--text-muted)] text-[13px] sm:text-sm leading-relaxed flex-1">{en?descEn:desc}</p>
          <span className="mt-5 flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm">{en?'Explore services':'استعرض الخدمات والباقات'} <ArrowUpLeft size={16}/></span>
        </button>)}
      </div>
    </div>
  </section>;
};
