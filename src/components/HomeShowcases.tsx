import React, { useEffect, useRef, useState } from 'react';
import { useSite } from '../context/SiteContext';
import { projects, type Project } from '../data/projects';
import { productsData, type Product } from '../data/products';
import { ArrowUpLeft, Monitor, Boxes, ShoppingBag, ImageOff } from 'lucide-react';

type Item={key:string;title:string;titleEn:string;image?:string;route:string;externalUrl?:string;status?:string;kind:'project'|'product'};
const authentic=(src?:string)=>src&&src.startsWith('https://nmolabs-cdn.b-cdn.net/NmoLabs-official-website/')?src:undefined;
const ProjectThumbnail=({src,title}:{src?:string;title:string})=>{const [failed,setFailed]=useState(false);return src&&!failed?<img src={src} alt={`صورة مشروع ${title}`} className="w-full h-full object-cover object-top group-hover:scale-[1.035] transition-transform duration-700" loading="lazy" decoding="async" onError={()=>setFailed(true)}/>:<div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#101f3f] via-[#152f58] to-[#124e73] px-4 text-center"><Monitor size={32} className="text-sky-300"/><span className="text-white font-bold text-lg leading-snug">{title}</span><span className="text-sky-200 text-xs">NmoLabs</span></div>};
const asProject=(p:Project):Item=>({key:'project-'+p.slug,title:p.titleAr,titleEn:p.titleEn,image:authentic(p.coverImage),route:'work/'+p.slug,status:p.status,kind:'project'});
const asProduct=(p:Product):Item=>({key:'product-'+p.slug,title:p.titleAr,titleEn:p.titleEn,image:authentic(p.coverVisual)||p.screenshots?.find(x=>!!authentic(x)),route:'products/'+p.slug,status:p.status,kind:'product'});
const unique=(items:Item[])=>items.filter((v,i,a)=>a.findIndex(z=>z.title===v.title)===i);
const websites=unique(projects.filter(p=>p.category==='corporate'&&p.status!=='needs_documentation'&&!!authentic(p.coverImage)).map(asProject));
const stores=unique(projects.filter(p=>p.category==='ecommerce'&&p.status!=='needs_documentation'&&!!authentic(p.coverImage)).map(asProject));
// Systems shown once per actual product. Do not merge overlapping Project/Product records.
// The smart seller is listed once; branch/e-commerce are delivery channels, not extra cards.
const coverRoot='https://nmolabs-cdn.b-cdn.net/NmoLabs-official-website/pages/card-covers/';
const fromCatalog=(slug:string,overrideImage?:string):Item|undefined=>{
 const p=productsData.find(product=>product.slug===slug);
 return p?{...asProduct(p),image:overrideImage||authentic(p.coverVisual)||p.screenshots?.find(x=>!!authentic(x))}:undefined;
};
const curatedProducts=[
 fromCatalog('nbos',coverRoot+'nmo-nbos-login.webp'),
 fromCatalog('nmo-erp',coverRoot+'nmo-erp-login.webp'),
 fromCatalog('nucleus',coverRoot+'nmo-nucleus-login.webp'),
 fromCatalog('smart-seller-ecommerce'),
 fromCatalog('ads-intelligence'),
 fromCatalog('nomu-trader'),
 fromCatalog('growth-ambassador'),
].filter((item):item is Item=>Boolean(item));
const otherSystems:Item[]=[
 {key:'system-tflow',title:'TFlow — المساعد المالي التشغيلي',titleEn:'TFlow — Operations & Finance',image:coverRoot+'nmo-tflow-login.webp',route:'',externalUrl:'https://tflow.nmolabs.com',kind:'product'},
 {key:'system-netgate',title:'بوابة الشبكات — النظام الإداري',titleEn:'Network Gateway Business System',image:coverRoot+'nmo-netgate-login.webp',route:'',externalUrl:'https://netgate.nmolabs.com',kind:'product'}
];
const systems=[...curatedProducts,...otherSystems];
const statusLabel=(status?:string,en=false)=>{
 if(status==='planning'||status==='coming_soon')return en?'Planned':'قيد التخطيط';
 if(status==='in_progress'||status==='prototype')return en?'In development':'قيد التطوير';
 return '';
};
const MarqueeSection=({items,title,titleEn,desc,descEn,route,direction,icon:Icon}:{items:Item[];title:string;titleEn:string;desc:string;descEn:string;route:string;direction:'left'|'right';icon:React.ComponentType<{size?:number;className?:string}>})=>{
 const {config,updateConfig}=useSite();const en=config.language==='en';
 const trackRef=useRef<HTMLDivElement>(null);
 const positionRef=useRef(0);
 const draggingRef=useRef(false);
 const movedRef=useRef(false);
 const pointerXRef=useRef(0);
 const hoveringRef=useRef(false);
 useEffect(()=>{
   const track=trackRef.current;
   if(!track)return;
   const media=window.matchMedia('(prefers-reduced-motion: reduce)');
   let frame=0,last=0;
   const tick=(now:number)=>{
     const delta=last?Math.min(50,now-last):0;last=now;
     const half=track.scrollWidth/2;
     if(half>0){
       if(!draggingRef.current&&!hoveringRef.current&&!media.matches)
         positionRef.current+=(direction==='right'?-1:1)*half*delta/(window.innerWidth<640?43000:55000);
       positionRef.current=((positionRef.current%half)+half)%half;
       track.style.transform='translate3d('+(-positionRef.current)+'px,0,0)';
     }
     frame=requestAnimationFrame(tick);
   };
   frame=requestAnimationFrame(tick);
   return ()=>cancelAnimationFrame(frame);
 },[direction,items]);
 const onPointerDown=(event:React.PointerEvent<HTMLDivElement>)=>{
   if(event.pointerType==='mouse'&&event.button!==0)return;
   draggingRef.current=true;movedRef.current=false;pointerXRef.current=event.clientX;
   event.currentTarget.setPointerCapture(event.pointerId);
 };
 const onPointerMove=(event:React.PointerEvent<HTMLDivElement>)=>{
   if(!draggingRef.current)return;
   const dx=event.clientX-pointerXRef.current;
   pointerXRef.current=event.clientX;
   if(Math.abs(dx)>3)movedRef.current=true;
   positionRef.current-=dx;
 };
 const onPointerEnd=(event:React.PointerEvent<HTMLDivElement>)=>{
   draggingRef.current=false;
   if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
 };
 if(!items.length)return null;
 const go=(path:string,externalUrl?:string)=>{if(externalUrl){window.open(externalUrl,'_blank','noopener,noreferrer');return;}if(!path)return;updateConfig({currentRoute:path});window.scrollTo({top:0,behavior:'smooth'});};
 const cards=(clone:boolean)=>items.map(item=><button key={item.key+(clone?'-clone':'')} type="button" tabIndex={clone?-1:0} aria-hidden={clone?'true':undefined} onClick={event=>{if(movedRef.current){event.preventDefault();event.stopPropagation();movedRef.current=false;return;}go(item.route,item.externalUrl);}}
 className="nmo-showcase-card group text-start shrink-0 w-[240px] sm:w-[290px] lg:w-[335px] rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 hover:border-[var(--color-primary)] hover:shadow-xl transition duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">
  <div className="relative h-[145px] sm:h-[175px] lg:h-[194px] overflow-hidden bg-[var(--surface-primary)]">
   <ProjectThumbnail src={item.image} title={en?item.titleEn:item.title}/>
   {statusLabel(item.status,en)&&<span className="absolute top-2 end-2 text-xs rounded-full px-2 py-1 bg-black/75 text-white">{statusLabel(item.status,en)}</span>}
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
       <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">{en?descEn:desc}</p></div></div>
    <button onClick={()=>go(route)} className="text-[var(--color-primary)] font-semibold text-xs sm:text-sm whitespace-nowrap flex gap-1 items-center">{en?'View all':'عرض الكل'}<ArrowUpLeft size={16}/></button>
  </div>
  <div className="nmo-marquee-viewport overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y select-none" dir="ltr" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onPointerEnter={()=>{hoveringRef.current=true;}} onPointerLeave={()=>{hoveringRef.current=false;}}>
    <div ref={trackRef} className="nmo-marquee-track">
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
   .nmo-marquee-track{display:flex;width:max-content;will-change:transform}
   .nmo-marquee-set{display:flex;gap:16px;padding-inline-end:16px;flex-shrink:0}
   .nmo-marquee-viewport{-webkit-mask-image:linear-gradient(to right,transparent,black 5%,black 95%,transparent);mask-image:linear-gradient(to right,transparent,black 5%,black 95%,transparent)}
   .nmo-marquee-viewport{scrollbar-width:none}\n   .nmo-marquee-viewport::-webkit-scrollbar{display:none}\n   @media(prefers-reduced-motion:reduce){.nmo-marquee-viewport{-webkit-mask-image:none;mask-image:none}}
  `}</style>
 </div>;
};
