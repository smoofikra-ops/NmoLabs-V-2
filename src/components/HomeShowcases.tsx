import React from 'react';
import { useSite } from '../context/SiteContext';
import { projects, type Project } from '../data/projects';
import { productsData, type Product } from '../data/products';
import { ArrowUpLeft, Monitor, Boxes, ShoppingBag, ImageOff } from 'lucide-react';

type Item={key:string;title:string;titleEn:string;image?:string;route:string;status?:string;kind:'project'|'product'};
const authentic=(src?:string)=>src&&src.startsWith('https://nmolabs-cdn.b-cdn.net/NmoLabs-official-website/')?src:undefined;
const asProject=(p:Project):Item=>({key:'project-'+p.slug,title:p.titleAr,titleEn:p.titleEn,image:authentic(p.coverImage),route:'work/'+p.slug,status:p.status,kind:'project'});
const asProduct=(p:Product):Item=>({key:'product-'+p.slug,title:p.titleAr,titleEn:p.titleEn,image:authentic(p.coverVisual)||p.screenshots?.find(x=>!!authentic(x)),route:'products/'+p.slug,status:p.status,kind:'product'});
const unique=(items:Item[])=>items.filter((v,i,a)=>a.findIndex(z=>z.title===v.title)===i);
const websites=unique(projects.filter(p=>p.category==='corporate'&&p.status!=='needs_documentation'&&!!authentic(p.coverImage)).map(asProject));
const stores=unique(projects.filter(p=>p.category==='ecommerce'&&p.status!=='needs_documentation'&&!!authentic(p.coverImage)).map(asProject));
const systems=unique([
 ...projects.filter(p=>p.category==='systems'&&p.status!=='needs_documentation'&&!!authentic(p.coverImage)).map(asProject),
 ...productsData.filter(p=>!['on_demand'].includes(p.status)).map(asProduct)
]);
const statusLabel=(status?:string,en=false)=>{
 if(status==='planning'||status==='coming_soon')return en?'Planned':'قيد التخطيط';
 if(status==='in_progress'||status==='prototype')return en?'In development':'قيد التطوير';
 return '';
};
const MarqueeSection=({items,title,titleEn,desc,descEn,route,direction,icon:Icon}:{items:Item[];title:string;titleEn:string;desc:string;descEn:string;route:string;direction:'left'|'right';icon:React.ComponentType<{size?:number;className?:string}>})=>{
 const {config,updateConfig}=useSite();const en=config.language==='en';
 if(!items.length)return null;
 const go=(path:string)=>{updateConfig({currentRoute:path});window.scrollTo({top:0,behavior:'smooth'});};
 const cards=(clone:boolean)=>items.map(item=><button key={item.key+(clone?'-clone':'')} type="button" tabIndex={clone?-1:0} aria-hidden={clone?'true':undefined} onClick={()=>go(item.route)}
 className="nmo-showcase-card group text-start shrink-0 w-[240px] sm:w-[290px] lg:w-[335px] rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 hover:border-[var(--color-primary)] hover:shadow-xl transition duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">
  <div className="relative h-[145px] sm:h-[175px] lg:h-[194px] overflow-hidden bg-[var(--surface-primary)]">
   {item.image?<img src={item.image} alt={en?`Preview: ${item.titleEn}`:`صورة مشروع ${item.title}`} className="w-full h-full object-cover object-top group-hover:scale-[1.035] transition-transform duration-700" loading="lazy" decoding="async" onError={e=>{e.currentTarget.style.display='none';}}/>:
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-tertiary)]"><ImageOff size={30} className="text-[var(--text-muted)]"/><span className="text-xs text-[var(--text-muted)]">{en?'Preview pending':'صورة الواجهة قيد الإضافة'}</span></div>}
   {statusLabel(item.status,en)&&<span className="absolute top-2 end-2 text-[10px] rounded-full px-2 py-1 bg-black/75 text-white">{statusLabel(item.status,en)}</span>}
  </div>
  <div className="px-4 py-3 flex items-center justify-between gap-3">
   <span className="font-semibold text-sm text-[var(--text-primary)] truncate">{en?item.titleEn:item.title}</span>
   <ArrowUpLeft size={17} className="text-[var(--color-primary)] shrink-0 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
  </div>
 </button>);
 return <section className="relative py-8 sm:py-11" aria-label={en?titleEn:title}>
  <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-between gap-3 mb-5">
    <div className="flex items-center gap-3 min-w-0"><span className="shrink-0 rounded-xl p-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)]"><Icon size={21}/></span>
      <div className="min-w-0"><h2 className="font-black text-[clamp(1.05rem,2.3vw,1.75rem)] lg:whitespace-nowrap leading-snug text-[var(--text-primary)]">{en?titleEn:title}</h2>
       <p className="text-xs sm:text-sm text-[var(--text-muted)]">{en?descEn:desc}</p></div></div>
    <button onClick={()=>go(route)} className="text-[var(--color-primary)] font-semibold text-xs sm:text-sm whitespace-nowrap flex gap-1 items-center">{en?'View all':'عرض الكل'}<ArrowUpLeft size={16}/></button>
  </div>
  <div className="nmo-marquee-viewport overflow-hidden" dir="ltr">
    <div className={`nmo-marquee-track ${direction==='right'?'nmo-marquee-reverse':''}`}>
      <div className="nmo-marquee-set" dir="rtl">{cards(false)}</div><div className="nmo-marquee-set" aria-hidden="true" dir="rtl">{cards(true)}</div>
    </div>
  </div>
 </section>;
};
export const HomeShowcases=()=>{
 const {config}=useSite(); const en=config.language==='en';
 return <div id="home-showcases" className="relative z-10 py-7 sm:py-12">
  <div className="max-w-7xl mx-auto px-5 mb-4">
   <p className="font-semibold text-sm text-[var(--color-primary)] mb-2">{en?'Our Work':'أعمالنا'}</p>
   <h2 className="text-[clamp(1.45rem,3.5vw,2.45rem)] font-black text-[var(--text-primary)] lg:whitespace-nowrap">{en?'Real projects, practical solutions':'أعمال رقمية نفّذناها لعملائنا'}</h2>
  </div>
  <MarqueeSection items={websites} title="مواقع تعكس هوية أعمالك" titleEn="Websites built for real businesses" desc="نماذج من مواقع الشركات والمؤسسات" descEn="Corporate projects and business websites" direction="left" route="work" icon={Monitor}/>
  <MarqueeSection items={systems} title="أنظمة ذكية لتنظيم أعمالك" titleEn="Business systems that work smarter" desc="حلولنا الرقمية وتجارب المنتجات، بحالتها الحالية" descEn="Business systems and product concepts with status labels" direction="right" route="products" icon={Boxes}/>
  <MarqueeSection items={stores} title="متاجر إلكترونية صممناها وطوّرناها" titleEn="Online stores we built and improved" desc="نماذج من أعمالنا في التجارة الإلكترونية" descEn="E-commerce projects from our portfolio" direction="left" route="work" icon={ShoppingBag}/>
  <style>{`
   .nmo-marquee-track{display:flex;width:max-content;animation:nmo-marquee 55s linear infinite;will-change:transform}
   .nmo-marquee-set{display:flex;gap:16px;padding-inline-end:16px;flex-shrink:0}
   .nmo-marquee-reverse{animation-direction:reverse}
   .nmo-marquee-viewport:hover .nmo-marquee-track,.nmo-marquee-viewport:focus-within .nmo-marquee-track{animation-play-state:paused}
   @keyframes nmo-marquee{to{transform:translateX(-50%)}}
   .nmo-marquee-viewport{-webkit-mask-image:linear-gradient(to right,transparent,black 5%,black 95%,transparent);mask-image:linear-gradient(to right,transparent,black 5%,black 95%,transparent)}
   @media(max-width:640px){.nmo-marquee-track{animation-duration:43s}}
   @media(prefers-reduced-motion:reduce){.nmo-marquee-viewport{overflow-x:auto!important;-webkit-mask-image:none;mask-image:none}.nmo-marquee-track{animation:none!important}.nmo-marquee-set[aria-hidden=true]{display:none}}
  `}</style>
 </div>;
};
