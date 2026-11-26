import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSite } from '../context/SiteContext';
import { X, Search, Gauge, ShieldCheck, Eye, Sparkles, ChartNoAxesCombined, ChevronDown, ChevronUp, Download, MessageCircle, ArrowUpLeft, Monitor, Smartphone, Info, CircleAlert, CheckCircle2, RefreshCw, FileText } from 'lucide-react';

type ScanResult={success:boolean;url:string;checkedAt:string;strategy:'mobile'|'desktop';source:string;categories:Record<string,number|null>;issues:{id:string;title:string;summary:string;score:number;url:string}[];fieldDataAvailable:boolean;fieldMetricCount:number};
type AuditModalProps={open:boolean;onClose:()=>void;initialUrl?:string};
const reportSections=[
 {key:'performance',title:'سرعة الموقع وأداؤه',en:'Performance',desc:'هل موقعك يفتح بسرعة؟ وهل العميل يقدر يتصفح بدون انتظار طويل؟',icon:Gauge},
 {key:'seo',title:'تجهيز موقعك للظهور في Google',en:'SEO',desc:'هل صفحة موقعك فيها أساسيات تساعد محركات البحث تفهمها وتعرضها؟ الدرجة ما تعني عدد زوارك أو ترتيبك الفعلي.',icon:Search},
 {key:'accessibility',title:'وضوح الموقع وسهولة استخدامه',en:'Accessibility',desc:'هل النصوص والأزرار واضحة وسهلة الاستخدام، بما فيها لذوي الاحتياجات المختلفة؟ هذا مو تقييم كامل لتجربة الشراء.',icon:Eye},
 {key:'best-practices',title:'سلامة إعدادات الموقع',en:'Best practices',desc:'هل صفحة موقعك تتبع ممارسات تقنية سليمة تساعد على تقديم تجربة موثوقة؟',icon:ShieldCheck},
] as const;
const unknownSections=[
 {title:'تجربة العميل ورحلة الشراء',desc:'تقييم الأقسام والسلة والدفع يحتاج فحص صفحات إضافية وتجربة عملية.'},
 {title:'ظهور نشاطك الفعلي في البحث',desc:'عدد الزيارات والظهور والنقرات يتطلب ربط بيانات Search Console بإذن صاحب الحساب.'},
 {title:'مقارنة المنافسين',desc:'نحتاج تحديد منافسين حقيقيين وفحصهم بنفس المعايير قبل إعطاء نسبة مقارنة.'},
 {title:'أسعار المنتجات',desc:'ما نقدر نحكم أن السعر مرتفع أو منخفض بدون مطابقة منتجات منافسة فعلية.'},
 {title:'حسابات التواصل الاجتماعي',desc:'يمكن مراجعة الحسابات العامة لاحقًا؛ معدل الوصول الحقيقي يحتاج بيانات الحساب.'},
];
function scoreLabel(n:number){if(n>=90)return 'ممتاز، وضعك متقدم';if(n>=75)return 'وضعك زين، وباقي لمسات';if(n>=60)return 'جيد، وعندك فرص للتحسين';if(n>=40)return 'يحتاج شوية اهتمام';return 'خلّنا نرتّب الأساسيات أول';}
function scoreColor(n:number){return n>=90?'#16a779':n>=75?'#4ca98e':n>=60?'#db9c3a':n>=40?'#da793e':'#ce5555';}
function canonical(raw:string){const v=raw.trim();return /^https?:\/\//i.test(v)?v:'https://'+v;}
function usePrintStyle(active:boolean){
 useEffect(()=>{if(!active)return;const style=document.createElement('style');style.dataset.auditPrint='true';style.textContent=`@media print{body *{visibility:hidden!important}#nmo-audit-report,#nmo-audit-report *{visibility:visible!important}#nmo-audit-report{position:absolute!important;inset:0 auto auto 0!important;width:100%!important;color:#111!important;background:#fff!important;padding:22px!important;overflow:visible!important}#nmo-audit-report .nmo-no-print{display:none!important}#nmo-audit-report [data-print-card]{break-inside:avoid;background:white!important;color:#111!important;border:1px solid #ddd!important}#nmo-audit-report p,#nmo-audit-report h3,#nmo-audit-report h2,#nmo-audit-report span{color:#111!important}#nmo-audit-report details{break-inside:avoid}#nmo-audit-report details>div{display:block!important}@page{size:A4;margin:12mm}}`;document.head.appendChild(style);return()=>style.remove()},[active]);
}
export function SmartAuditModal({open,onClose,initialUrl=''}:AuditModalProps){
 const [url,setUrl]=useState(initialUrl);
 const [strategy,setStrategy]=useState<'mobile'|'desktop'>('mobile');
 const [result,setResult]=useState<ScanResult|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [openKeys,setOpenKeys]=useState<string[]>([]);
 const [showUnknown,setShowUnknown]=useState(false);
 const [clientName,setClientName]=useState('');
 const [phone,setPhone]=useState('');
 const [reportId,setReportId]=useState('');
 usePrintStyle(open&&!!result);
 useEffect(()=>{if(open){document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';}}},[open]);
 const scores=useMemo(()=>reportSections.map(s=>({...s,score:result?.categories[s.key]??null})),[result]);
 const known=scores.filter(s=>s.score!==null);
 // This is only a PageSpeed technical page index, NOT a digital-business or market score.
 const overall=known.length===4?Math.round(known.reduce((sum,s)=>sum+(s.score||0),0)/4):null;
 const scoreSummary=overall===null?'بعض بيانات الفحص ما اكتملت؛ راجع الأقسام المتاحة.':overall>=75?'نتائج الفحص التقني جيدة، وفيه أشياء تقدر تطورها أكثر.':'فيه فرص واضحة لتحسين الصفحة، خصوصًا الأقسام اللي درجتها أقل.';
 const run=async()=>{if(busy)return;let parsed:URL;try{parsed=new URL(canonical(url));if(!['http:','https:'].includes(parsed.protocol)||!parsed.hostname.includes('.'))throw Error('invalid');}catch{setError('اكتب رابط موقع صحيح، مثل https://example.com');return;}
 setBusy(true);setError('');setResult(null);setOpenKeys([]);
 try{const response=await fetch('/api/public-audit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:parsed.href,strategy})});const data=await response.json();if(!response.ok||!data.success)throw Error(data.message||'تعذر الفحص');setResult(data);setReportId('NMO-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,7).toUpperCase());}catch(e:any){setError(e?.message||'ما قدرنا نفحص الرابط، جرب مرة ثانية.');}finally{setBusy(false);}};
 const toggle=(key:string)=>setOpenKeys(keys=>keys.includes(key)?keys.filter(x=>x!==key):[...keys,key]);
 const whatsappMessage=()=>['السلام عليكم، أبغى أراجع نتيجة فحص موقعي مع نمو لابز.','رقم التقرير: '+reportId,'رابط الموقع: '+result?.url,'نوع الفحص: '+(result?.strategy==='mobile'?'الجوال':'الكمبيوتر'),overall===null?'':'درجة الفحص التقني: '+overall+'/100',clientName?'الاسم: '+clientName:'',phone?'الجوال: '+phone:'','عندي نسخة PDF من التقرير وأقدر أرفقها هنا.'].filter(Boolean).join('\n');
 const {config}=useSite();
 const openWhatsapp=()=>{const number=String(config.contactNumber||'').replace(/\D/g,'');if(!number)return;const waNumber=number.startsWith('0')?'966'+number.slice(1):number;window.open('https://wa.me/'+waNumber+'?text='+encodeURIComponent(whatsappMessage()),'_blank','noopener,noreferrer')};
 if(!open)return null;
 return createPortal(<div className="fixed inset-0 z-[1001] bg-[#061024]/90 backdrop-blur-md p-2 sm:p-5 flex items-center justify-center" dir="rtl" role="dialog" aria-modal="true" aria-label="فحص نشاطك الرقمي">
  <div className="w-full max-w-5xl h-[min(96dvh,900px)] flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0b1731] text-white border border-sky-300/20 shadow-2xl">
   <div className="flex shrink-0 items-center justify-between gap-3 px-4 sm:px-7 py-3 sm:py-4 border-b border-white/10 bg-[#102143]">
    <div className="min-w-0"><p className="text-sky-300 text-xs font-bold tracking-wider">NMOLABS SMART AUDIT</p><h2 className="font-black text-base sm:text-xl">افحص متجرك أو موقع نشاطك</h2></div>
    <button type="button" onClick={onClose} aria-label="إغلاق" className="rounded-xl p-2 bg-white/10 hover:bg-white/20"><X size={22}/></button>
   </div>
   <div className="overflow-y-auto flex-1 px-3 sm:px-7 py-5 sm:py-7">
    {!result&&<div className="max-w-3xl mx-auto space-y-5">
      <div className="text-center space-y-2"><div className="w-12 h-12 rounded-xl bg-sky-500/15 mx-auto flex items-center justify-center text-sky-300"><Gauge size={27}/></div><h3 className="text-xl sm:text-2xl font-black">خلّنا نشوف موقعك كيف ماشي</h3><p className="text-slate-300 text-sm sm:text-base">فحص مجاني من Google يوضح أداء موقعك وسهولة استخدامه وتجهيزه لمحركات البحث. ما يحتاج تسجيل أو صلاحيات.</p></div>
      <label className="block space-y-2"><span className="font-bold text-sm">رابط متجرك أو موقعك</span><input autoFocus type="url" dir="ltr" autoComplete="url" value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')void run()}} placeholder="https://yourstore.com" className="w-full rounded-xl bg-[#142747] border border-white/20 text-white placeholder-slate-400 px-4 py-4 outline-none focus:border-sky-400"/></label>
      <div className="grid grid-cols-2 gap-2"><button type="button" onClick={()=>setStrategy('mobile')} className={`rounded-xl border py-3 flex items-center justify-center gap-2 font-bold text-sm ${strategy==='mobile'?'bg-sky-500 text-white border-sky-400':'border-white/20 text-slate-200'}`}><Smartphone size={17}/>الجوال</button><button type="button" onClick={()=>setStrategy('desktop')} className={`rounded-xl border py-3 flex items-center justify-center gap-2 font-bold text-sm ${strategy==='desktop'?'bg-sky-500 text-white border-sky-400':'border-white/20 text-slate-200'}`}><Monitor size={17}/>الكمبيوتر</button></div>
      {error&&<p role="alert" className="rounded-xl bg-red-500/10 border border-red-300/30 p-3 text-red-200 text-sm">{error}</p>}
      <button disabled={busy} type="button" onClick={()=>void run()} className="w-full rounded-xl py-4 bg-[#0288A6] hover:bg-[#037998] disabled:opacity-60 font-black text-lg flex items-center justify-center gap-2">{busy?<RefreshCw size={21} className="animate-spin"/>:<Search size={21}/>} {busy?'جاري فحص الصفحة…':'ابدأ الفحص المجاني'}</button>
      <p className="text-xs text-slate-400 text-center leading-relaxed">يفحص النظام الصفحة العامة فقط. نتائج السرعة قد تختلف من وقت لآخر، ولا يتضمن الفحص مبيعاتك أو زياراتك الخاصة أو ترتيبك بين المنافسين.</p>
      <div className="border border-white/10 rounded-xl p-4 text-sm text-slate-300 flex gap-3"><Info className="shrink-0 text-sky-300" size={19}/><p>تبغى فحص أعمق للمتجر وحساباتك؟ بعد التقرير تقدر تطلبه من فريق نمو لابز، ويكون بأي صلاحيات إضافية موافقتك منفصلة وواضحة.</p></div>
    </div>}
    {result&&<div id="nmo-audit-report" className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"><div><p className="text-sky-300 text-xs font-bold">تقرير فحص الصفحة العامة</p><h3 className="text-lg sm:text-2xl font-black mt-1">وش وضع موقعك حاليًا؟</h3><p className="text-slate-300 text-xs sm:text-sm break-all mt-2" dir="ltr">{result.url}</p></div><div className="text-xs text-slate-300 space-y-1 sm:text-left"><p>رقم التقرير: {reportId}</p><p>{new Date(result.checkedAt).toLocaleString('ar-SA')}</p><p>{result.strategy==='mobile'?'فحص الجوال':'فحص الكمبيوتر'}</p></div></div>
      <div data-print-card className="rounded-2xl bg-[#12294b] border border-sky-300/20 p-4 sm:p-6 flex items-center gap-4">
       <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full border-[9px] flex flex-col items-center justify-center" style={{borderColor:overall===null?'#718096':scoreColor(overall)}}><strong className="text-3xl sm:text-4xl">{overall===null?'—':overall}</strong><span className="text-xs text-slate-200">من 100</span></div>
       <div className="min-w-0"><p className="text-xs text-sky-300 mb-1">النتيجة العامة للفحص التقني</p><h3 className="font-bold text-lg sm:text-xl mb-2">{overall===null?'نتيجة جزئية':scoreLabel(overall)}</h3><p className="text-sm text-slate-200 leading-relaxed">{scoreSummary}</p><p className="text-xs text-slate-400 mt-2">هذا متوسط فئات Google PageSpeed الأربع، وليس تقييمًا شاملًا لاحترافية النشاط أو مركزه في السوق.</p></div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2"><h3 className="font-black text-lg">تفاصيل درجات موقعك</h3><button className="nmo-no-print text-sm text-sky-300 underline" type="button" onClick={()=>setOpenKeys(openKeys.length===reportSections.length?[]:reportSections.map(x=>x.key))}>{openKeys.length===reportSections.length?'إخفاء التفاصيل':'عرض كل التفاصيل'}</button></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
       {scores.map(s=><article data-print-card key={s.key} className="rounded-xl bg-[#132747] border border-white/10 p-4">
        <div className="flex gap-2 justify-between items-center"><div className="flex gap-2 items-center"><s.icon size={19} className="text-sky-300"/><h4 className="text-sm sm:text-base font-bold">{s.title}</h4></div><span className="font-black text-lg shrink-0" style={{color:s.score===null?'#cbd5e1':scoreColor(s.score)}}>{s.score===null?'—':s.score+'/100'}</span></div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-3"><div className="h-full rounded-full transition-all" style={{width:(s.score??0)+'%',backgroundColor:s.score===null?'#64748b':scoreColor(s.score)}}/></div>
        <p className="text-slate-300 text-xs mt-2">{s.score===null?'ما توفرت بيانات كافية':scoreLabel(s.score)}</p>
        <button className="nmo-no-print w-full flex justify-between items-center text-sky-300 text-xs font-semibold mt-3" type="button" onClick={()=>toggle(s.key)}><span>تبغى تعرف أكثر؟</span>{openKeys.includes(s.key)?<ChevronUp size={16}/>:<ChevronDown size={16}/>}</button>
        {openKeys.includes(s.key)&&<div className="pt-3 mt-2 border-t border-white/10 text-slate-200 text-sm leading-relaxed">{s.desc}</div>}
       </article>)}
      </div>
      <section className="space-y-3"><h3 className="text-lg font-black">وش الأشياء اللي تحتاج اهتمام؟</h3>
       {result.issues.length?result.issues.map((issue,i)=><details key={issue.id} data-print-card className="group bg-[#132747] border border-white/10 rounded-xl p-4"><summary className="cursor-pointer list-none flex justify-between items-center gap-3"><span className="flex items-center gap-2 font-bold text-sm"><CircleAlert size={18} className="text-amber-300 shrink-0"/>{issue.title}</span><ChevronDown size={18} className="shrink-0 group-open:rotate-180 transition-transform"/></summary><p className="text-sm text-slate-300 mt-3 leading-relaxed">{issue.summary}</p><p className="text-xs text-slate-400 mt-2">المصدر: Google Lighthouse — فحص الصفحة المُدخلة</p></details>):<div className="bg-[#132747] border border-white/10 rounded-xl p-4 flex gap-2 items-center text-sm text-slate-200"><CheckCircle2 className="text-emerald-300 shrink-0"/>ما ظهرت ملاحظات من القائمة المختصرة لهذا الفحص. هذا ما يعني أن الموقع خالٍ من كل المشاكل.</div>}
      </section>
      <section className="rounded-xl bg-[#10213d] border border-white/15 p-4">
       <button type="button" className="nmo-no-print flex items-center justify-between w-full font-bold text-sm" onClick={()=>setShowUnknown(!showUnknown)}><span>وش الجوانب اللي تحتاج فحص أعمق؟</span>{showUnknown?<ChevronUp size={18}/>:<ChevronDown size={18}/>}</button>
       {showUnknown&&<div className="space-y-3 mt-4">{unknownSections.map(x=><div key={x.title} className="border-t border-white/10 pt-3"><strong className="text-sm">{x.title} — ما تم فحصه</strong><p className="text-xs text-slate-300 mt-1">{x.desc}</p></div>)}</div>}
       <p className="text-xs text-slate-400 mt-2">ما نعطي درجة أو ترتيب للمنافسين أو الأسعار أو الزيارات بدون بيانات موثوقة.</p>
      </section>
      <section data-print-card className="rounded-xl bg-[#153352] border border-sky-300/25 p-4 sm:p-6 space-y-4">
       <h3 className="font-black text-lg">تبغى تطوّر موقعك؟ خلّنا نكمل من هنا</h3><p className="text-sm text-slate-200">حمّل التقرير وشاركنا رقمه على واتساب. نراجع الملاحظات معك ونحدد وش يحتاج نشاطك، بدون ما تعيد الفحص من البداية.</p>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 nmo-no-print"><label className="space-y-1 text-xs text-slate-200"><span>اسمك (اختياري)</span><input value={clientName} onChange={e=>setClientName(e.target.value)} className="w-full bg-[#0b1b35] rounded-lg border border-white/20 p-3 text-white" placeholder="الاسم"/></label><label className="space-y-1 text-xs text-slate-200"><span>رقم جوالك (اختياري)</span><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full bg-[#0b1b35] rounded-lg border border-white/20 p-3 text-white" placeholder="05xxxxxxxx" dir="ltr"/></label></div>
       <div className="nmo-no-print flex flex-col sm:flex-row gap-2"><button type="button" onClick={()=>{setOpenKeys(reportSections.map(x=>x.key));setShowUnknown(true);setTimeout(()=>window.print(),120)}} className="flex-1 rounded-xl px-4 py-3 bg-white text-[#10213c] font-bold flex items-center justify-center gap-2"><Download size={18}/>حفظ التقرير PDF</button><button type="button" disabled={!config.contactNumber} onClick={openWhatsapp} className="flex-1 rounded-xl px-4 py-3 bg-[#159c75] disabled:opacity-50 font-bold flex items-center justify-center gap-2"><MessageCircle size={18}/>أرسل التقرير لنمو لابز</button></div>
       <p className="text-xs text-slate-300">واتساب يفتح برسالة جاهزة فيها رقم التقرير والنتيجة. لإرسال PDF نفسه، أرفقه يدويًا في المحادثة بعد حفظه. التقرير لا يُحفظ تلقائيًا في أنظمة نمو لابز.</p>
       <a className="text-sm text-sky-300 underline break-all" href={config.contactNumber?'https://wa.me/'+String(config.contactNumber).replace(/\D/g,'').replace(/^0/,'966'):undefined}>واتساب نمو لابز: {config.contactNumber||'متاح عبر الموقع'}</a>
      </section>
      <p className="text-xs text-slate-400 text-center">البيانات من Google PageSpeed Insights وقت الفحص. المؤشرات التقنية تمثل الصفحة المختبرة فقط، وليست ضمانًا للظهور أو المبيعات.</p>
      <div className="nmo-no-print flex flex-col sm:flex-row gap-2"><button type="button" onClick={()=>{setResult(null);setError('')}} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold flex items-center justify-center gap-2"><RefreshCw size={16}/>فحص موقع آخر</button><button type="button" onClick={onClose} className="rounded-xl border border-white/20 px-5 py-3 text-sm">إغلاق</button></div>
    </div>}
   </div>
  </div>
 </div>,document.body);
}
