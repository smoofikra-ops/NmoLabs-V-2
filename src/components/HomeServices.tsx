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
      <div className="text-center mb-9">
        <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">{en?'Our Services':'خدماتنا'}</p>
        <h2 id="home-services-title" className="text-[clamp(1.35rem,3.3vw,2.35rem)] lg:whitespace-nowrap font-black text-[var(--text-primary)] mb-4">{en?'Choose the right solution':'كل ما يحتاجه مشروعك الرقمي'}</h2>
        <p className="text-[var(--text-primary)] bg-[var(--surface-primary)]/90 border border-[var(--border-default)] px-4 py-2 rounded-xl backdrop-blur text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{en?'Choose a category to explore packages or request tailored services.':'ثلاثة مسارات واضحة: اختر خدمتك واستعرض الباقات أو خصص طلبك حسب احتياجك.'}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3 md:gap-5">
        {cards.map(({slug,ar,en:enTitle,desc,descEn,image,Icon})=><button key={slug} onClick={()=>{updateConfig({currentRoute:'services/'+slug});window.scrollTo(0,0);}} className="text-start group p-4 sm:p-5 lg:p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 backdrop-blur-xl hover:border-[var(--color-primary)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,.2)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] transition-all shadow-md min-h-[290px] md:min-h-[320px] flex flex-col">
          <div className="relative -mx-4 sm:-mx-5 lg:-mx-6 -mt-4 sm:-mt-5 lg:-mt-6 h-28 sm:h-32 overflow-hidden rounded-t-2xl mb-4 bg-[#10223b]"><img src={image} alt="" aria-hidden="true" loading="lazy" onError={e=>{e.currentTarget.style.display="none";}} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"/><div className="absolute inset-0 bg-gradient-to-t from-[#0f213d]/90 via-transparent to-transparent" /></div><span className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--color-primary)]/12 border border-[var(--color-primary)]/20 text-[var(--color-primary)] mb-4 group-hover:scale-105 transition-transform"><Icon size={28}/></span>
          <h3 className="text-[clamp(1rem,1.8vw,1.22rem)] font-bold text-[var(--text-primary)] mb-2 leading-snug">{en?enTitle:ar}</h3>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed flex-1">{en?descEn:desc}</p>
          <span className="mt-5 flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm">{en?'Explore services':'استعرض الخدمات والباقات'} <ArrowUpLeft size={16}/></span>
        </button>)}
      </div>
    </div>
  </section>;
};
