import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { getWhatsAppUrl } from '../lib/utils';
import { packageReferenceV13 } from '../data/packageReferenceV13';
import { ShoppingCart, Globe2, Blocks, CheckCircle2, ArrowRight, ArrowLeft, MessageCircle, ChevronDown } from 'lucide-react';
type Kind='ecommerce'|'websites'|'software';
type Mode='new'|'existing';
const basicStore=['فتح وتهيئة متجر سلة أو زد','المساعدة في توثيق المتجر','تخصيص القالب والهوية','تصميم البنر الرئيسي وبنرين فرعيين','إعداد الأقسام والصفحات والسياسات','رفع حتى 30 منتجًا من بيانات العميل','تهيئة الدفع والشحن وتابي وتمارا حسب الأهلية','إنشاء وربط حسابات التواصل الاجتماعي','اختبار المتجر وتسليمه — جولتا تعديل'];
const basicStoreExisting=['فحص وتحليل المتجر الحالي','تحسين الواجهة وتجربة الجوال','تحديث البنرات والألوان','تنظيم الأقسام والصفحات والسياسات','تنظيم حتى 50 منتجًا قائمًا','فحص الدفع والشحن وتحسين رحلة الشراء','تحسين SEO الأساسي واختبار المتجر'];
const basicWebsite=['إنشاء موقع تعريفي حتى 5 صفحات','واجهة متجاوبة مع هوية الشركة','بنر رئيسي وبنران داخليان','تنسيق المحتوى المقدم من العميل','ربط واتساب والاتصال ونموذج التواصل والخريطة','تهيئة SEO الأساسية والدومين والاستضافة وSSL','اختبار النشر والتسليم — جولتا تعديل'];
const existingWebsite=['تدقيق الموقع القائم','تحسين التصميم والجوال وتجربة المستخدم','تحديث حتى 5 صفحات وبنراتها','تحسين المحتوى والقوائم وأزرار التواصل','معالجة الأخطاء البسيطة والأداء وSEO الأساسي','الاختبار والتسليم'];
const growth=['إنشاء أو تهيئة الحسابات الإعلانية حسب المنصات المناسبة','تهيئة GA4 وGTM وSearch Console','تهيئة Google Ads Conversions وMeta وTikTok وSnapchat Pixels وفق الإمكانات','اختبار تتبع التحويلات والأحداث الأساسية','إعداد المواد الإعلانية الأولية ضمن النطاق','إطلاق وإدارة الحملات على منصتين مختارتين لمدة 30 يومًا','تقرير أداء في نهاية الشهر — ميزانية الإعلانات منفصلة'];
const groupItems:Record<'ecommerce'|'websites',Record<Mode,[string,string[]][]>>={ecommerce:{new:[['تأسيس المتجر',['فتح حساب سلة أو زد','تهيئة النشاط والتوثيق','ضبط إعدادات المتجر']],['التصميم',['تخصيص القالب','تصميم البنرات','تحسين الجوال']],['المنتجات والمحتوى',['إنشاء التصنيفات','رفع المنتجات','كتابة الأوصاف وتحسين الصور','السياسات والصفحات']],['الدفع والتكاملات',['تهيئة الدفع والشحن','المساعدة في إعداد تابي','المساعدة في إعداد تمارا','ربط التطبيقات']],['التواصل',['إنشاء حسابات التواصل','ربط الواتساب والتواصل']],['التسويق',['الحسابات الإعلانية','GA4 وGTM وSearch Console','البكسلات وتتبع التحويلات','إطلاق وإدارة الحملات','تحسين SEO']]],existing:[['التصميم',['إعادة تصميم الواجهة','البنرات','تحسين تجربة المستخدم']],['المنتجات',['تنظيم المنتجات','تحسين الأوصاف والصور','تصنيفات وصفحات المتجر']],['التجهيز التقني',['الدفع والشحن','تابي وتمارا','الربط بين التطبيقات','نقل المتجر']],['التسويق',['SEO','أدوات Google والتتبع','البكسلات','الحملات الإعلانية']],['التشخيص',['تحليل المتجر والاستشارة المجانية']]]},websites:{new:[['التأسيس',['الموقع والدومين والاستضافة','إعداد البريد وSSL']],['الواجهات',['تصميم الواجهة والبنرات','التوافق مع الجوال']],['المحتوى',['الصفحات والنصوص','صفحة هبوط أو صفحة تعريفية','الترجمة واللغات']],['التفاعل',['واتساب واتصال وخريطة','نماذج التواصل وطلب عرض سعر']],['التقنية',['تحسين الأداء','SEO','التحليلات والبكسلات']],['التسويق',['إعداد حسابات الإعلانات','إدارة الحملات']]],existing:[['التصميم',['تطوير الواجهة','تحسين الجوال','البنرات']],['المحتوى',['تحديث الصفحات','كتابة المحتوى','إضافة صفحات أو لغات']],['التقنية',['الأخطاء والأداء','الاستضافة والحماية','SEO']],['التحليلات',['GA4 وGTM وSearch Console','البكسلات والتتبع']],['التسويق',['الحسابات والحملات الإعلانية']],['التشخيص',['تحليل الموقع والاستشارة المجانية']]]}};
const software=['تطبيقات Android وiOS','نظام محاسبة وفوترة','نظام ERP','نظام CRM','إدارة المخزون والمستودعات','نقاط البيع POS','الموارد البشرية والرواتب','إدارة المشاريع والمهام','تطبيق ويب ولوحة إدارة','الحجوزات والمواعيد','التوصيل والعمليات الميدانية','الأتمتة والذكاء الاصطناعي','API وتكامل الأنظمة','لوحات البيانات والتقارير','الصيانة وتطوير الأنظمة','برمجيات SaaS سحابية'];
export const ServicesPortal=({kind}:{kind:Kind})=>{
 const {config,updateConfig}=useSite(); const en=config.language==='en';
 const [mode,setMode]=useState<Mode>('new');const [checked,setChecked]=useState<string[]>([]);const [note,setNote]=useState('');const [name,setName]=useState('');const [phone,setPhone]=useState('');const [city,setCity]=useState('');const [formError,setFormError]=useState('');const [expanded,setExpanded]=useState<string[]>([]);
 const title=kind==='ecommerce'?'المتاجر الإلكترونية':kind==='websites'?'المواقع والصفحات التعريفية':'التطبيقات والبرامج والأنظمة الذكية';
 const base=kind==='ecommerce'?(mode==='new'?basicStore:basicStoreExisting):(mode==='new'?basicWebsite:existingWebsite);
 const references=kind==='software'?[]:packageReferenceV13[kind][mode];
 const packs=[{title:mode==='new'?'باقة الإطلاق الأساسية':'باقة التطوير الأساسية',features:base},{title:mode==='new'?'باقة الإطلاق والنمو':'باقة التطوير والنمو',features:growth}];
 const sar=(n:number)=>new Intl.NumberFormat('ar-SA',{maximumFractionDigits:0}).format(n);
 const approvedGrowth=kind==='ecommerce'&&mode==='new';
 const groups:[string,string[]][]=kind==='software'?[['نوع النظام أو التطبيق',software]]:groupItems[kind][mode];
 const toggle=(x:string)=>setChecked(old=>old.includes(x)?old.filter(t=>t!==x):[...old,x]);
 const send=(label:string,selected:string[])=>{
  const cleanName=name.trim(),cleanPhone=phone.replace(/[\s()-]/g,''),cleanCity=city.trim();
  if(!cleanName||!cleanCity||!/^((\\+|00)\\d{8,15}|0\\d{8,12})$/.test(cleanPhone)){
   setFormError('يرجى إدخال الاسم والمدينة ورقم جوال صحيح قبل إرسال الطلب.');
   document.getElementById('rfq-heading')?.scrollIntoView({behavior:'smooth',block:'start'});
   return;
  }
  setFormError('');
  // This identifier travels with the WhatsApp request for manual entry into NBOS.
  // It is not a server-issued NBOS record or proof of receipt.
  const date=new Date();
  const stamp=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('');
  const reference='NML-RFQ-'+stamp+'-'+crypto.randomUUID().slice(0,8).toUpperCase();
  const details=[
   'طلب عرض سعر — NmoLabs | KYC مبدئي',
   'الرقم المرجعي: '+reference,
   'تاريخ الطلب: '+date.toLocaleString('ar-SA',{timeZone:'Asia/Riyadh'}),
   'القسم: '+title,
   'نوع الطلب: '+label,
   kind==='software'?'نظام مخصص':'حالة المشروع: '+(mode==='new'?'مشروع جديد':'مشروع قائم'),
   'اسم العميل: '+cleanName,
   'رقم الجوال: '+cleanPhone,
   'المدينة: '+cleanCity,
   'الخدمات المطلوبة:',
   ...(selected.length?selected.map((item,i)=>(i+1)+'. '+item):['استشارة أولية']),
   'ملاحظات: '+(note.trim()||'لا يوجد'),
   'الحالة: طلب جديد — يحتاج مراجعة وإدخال الرقم المرجعي في NBOS'
  ].join('\\n');
  window.open(getWhatsAppUrl(config.contactNumber,details),'_blank','noopener,noreferrer');
 };
 const goToRequest=()=>{
  setFormError('');
  document.getElementById('rfq-heading')?.scrollIntoView({behavior:'smooth',block:'start'});
 };
 return <main className="relative z-10 min-h-screen px-5 pt-36 pb-24">
  <div className="max-w-6xl mx-auto">
   <button onClick={()=>updateConfig({currentRoute:'services'})} className="text-[var(--color-primary)] flex items-center gap-2 mb-8"><ArrowRight size={18}/> العودة إلى الخدمات</button>
   <h1 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-4">{title}</h1>
   <p className="text-[var(--text-muted)] leading-relaxed max-w-3xl mb-10">{kind==='software'?'نطوّر برمجيات وأدوات أعمال حسب متطلباتك. صف احتياجك ليقوم فريقنا بدراسة الحل وإعداد عرض مخصص.':'اختر مشروعًا جديدًا أو قائمًا، ثم قارن الخدمات والباقات أو خصص طلبك. الأسعار غير المعتمدة موضحة بوصفها أسعارًا مرجعية قبل الضريبة.'}</p>
   {kind!=='software'&&<div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="نوع المشروع">
      {(['new','existing'] as Mode[]).map(m=><button key={m} onClick={()=>{setMode(m);setChecked([]);}} aria-pressed={mode===m} className={`px-6 py-3 rounded-xl border font-bold transition-colors ${mode===m?'bg-[var(--color-primary)] text-white':'bg-[var(--surface-secondary)] text-[var(--text-primary)] border-[var(--border-default)]'}`}>{m==='new'?'إنشاء مشروع جديد':'تطوير مشروع قائم'}</button>)}
    </div>}
   <div className="grid lg:grid-cols-3 gap-5 mb-12">
    {kind!=='software'?packs.map((p,i)=><article key={p.title} className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/85 backdrop-blur p-6 flex flex-col">
      <h2 className="font-bold text-xl text-[var(--text-primary)] mb-2">{p.title}</h2>
      {i===1&&<p className="text-sm text-[var(--text-secondary)] mb-4 font-medium">تشمل جميع خدمات {mode==='new'?'باقة الإطلاق الأساسية':'باقة التطوير الأساسية'}، بالإضافة إلى الخدمات التالية:</p>}
      <ul className="space-y-3 flex-1">{p.features.map((f,j)=><li key={j} className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]"><CheckCircle2 size={16} className="shrink-0 text-[var(--color-primary)] mt-1"/>{f}</li>)}</ul>
      <div className="mt-6 rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-4">
        <span className="text-xs text-[var(--text-muted)] block mb-1">{approvedGrowth&&i===1?'سعر الباقة قبل الضريبة':'سعر مرجعي مقترح من الكتالوج — قبل الضريبة'}</span>
        <strong className="text-2xl font-black text-[var(--color-primary)]">{sar(references[i].amount)} <span className="text-base">ر.س</span></strong>
        {approvedGrowth&&i===1?<div className="mt-3 border-t border-[var(--border-default)] pt-3 text-sm text-[var(--text-secondary)]"><p>ضريبة القيمة المضافة 15%: 600 ر.س</p><p className="font-bold mt-1 text-[var(--text-primary)]">الإجمالي شامل الضريبة: 4,600 ر.س</p><p className="text-xs mt-2">الميزانية الإعلانية غير مشمولة. لا يُعرض سعر مشطوب حتى تُراجع أسعار الخدمات الفردية.</p></div>:<p className="text-[11px] text-[var(--text-muted)] mt-2 leading-relaxed">غير معتمد للبيع النهائي؛ يحتاج مراجعة نطاق الباقة V1.3.</p>}
      </div>
      <button onClick={()=>send(p.title+' — '+(approvedGrowth&&i===1?'السعر المعتمد ':'سعر مرجعي غير معتمد ')+sar(references[i].amount)+' ريال قبل الضريبة',i===1?[...base,...growth]:p.features)} className="mt-7 bg-[var(--color-primary)] text-white rounded-xl p-3 font-semibold">اطلب عرض السعر النهائي</button>
     </article>):<article className="lg:col-span-2 rounded-3xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-7"><h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">تطوير حلول برمجية حسب الطلب</h2><p className="text-[var(--text-muted)] leading-8">تطبيقات الجوال، المحاسبة وERP وCRM وإدارة المخزون ولوحات البيانات والأتمتة. كل مشروع يخضع لتحديد نطاق المتطلبات والصلاحيات والتكاملات والجدول الزمني قبل عرض السعر.</p><p className="mt-4 text-[var(--color-primary)]">عرض سعر مخصص — بدون باقات ثابتة</p></article>}
    <article className="rounded-3xl border border-[var(--color-primary)]/40 bg-[var(--surface-secondary)]/85 backdrop-blur p-6 flex flex-col">
      <h2 className="font-bold text-xl text-[var(--text-primary)] mb-2">{kind==='software'?'صف نظامك أو تطبيقك':'خصص خدماتك'}</h2>
      <p className="text-[var(--text-muted)] text-sm mb-4">اختر ما تحتاجه فقط. لا تظهر أسعار الخدمات المنفردة، ويراجع الفريق الطلب لإعداد عرض سعر.</p>
      <div className="space-y-3 flex-1">
       {groups.map(([heading,items])=><div key={heading} className="border border-[var(--border-default)] rounded-xl overflow-hidden">
          <button onClick={()=>setExpanded(old=>old.includes(heading)?old.filter(v=>v!==heading):[...old,heading])} className="w-full flex justify-between items-center p-3 text-[var(--text-primary)] font-semibold text-sm"><span>{heading}</span><ChevronDown size={17}/></button>
          {(expanded.includes(heading)||kind==='software')&&<div className="px-3 pb-3 space-y-2">{items.map(item=><label key={item} className="flex gap-2 text-sm text-[var(--text-secondary)] cursor-pointer"><input type="checkbox" checked={checked.includes(item)} onChange={()=>toggle(item)} className="accent-blue-600"/>{item}</label>)}</div>}
       </div>)}
      </div>
      <div className="mt-5 border-t border-[var(--border-default)] pt-4">
       <p className="text-sm text-[var(--text-secondary)] mb-3" aria-live="polite">تم اختيار {checked.length} خدمة</p>
       <button type="button" onClick={goToRequest} disabled={!checked.length} className="w-full bg-[var(--color-primary)] text-white rounded-xl px-4 py-3 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"><MessageCircle size={18}/> اطلب عرض السعر الآن</button>
      </div>
     </article>
   </div>
   <section className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-secondary)]/90 p-6 md:p-9 max-w-3xl mx-auto" aria-labelledby="rfq-heading">
    <h2 id="rfq-heading" className="text-2xl font-bold text-[var(--text-primary)] mb-3">أرسل طلبك أو اطلب استشارة مجانية</h2>
    <p className="text-[var(--text-muted)] mb-6 text-sm">عدد الخدمات المحددة: {checked.length}. أدخل الاسم والجوال والمدينة، ثم أرسل الطلب إلى واتساب. سيُرفق رقم مرجعي لسهولة تسجيله في NBOS، ولا يُنشأ سجل في النظام تلقائيًا.</p>
    <div className="grid sm:grid-cols-3 gap-4 mb-4">
      <label className="text-sm text-[var(--text-primary)]">الاسم *<input required autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="اسم العميل" className="mt-2 w-full border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 rounded-xl"/></label>
      <label className="text-sm text-[var(--text-primary)]">رقم الجوال *<input required type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="05xxxxxxxx" inputMode="tel" className="mt-2 w-full border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 rounded-xl"/></label>
      <label className="text-sm text-[var(--text-primary)]">المدينة *<input required autoComplete="address-level2" value={city} onChange={e=>setCity(e.target.value)} placeholder="الرياض" className="mt-2 w-full border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 rounded-xl"/></label>
    </div>
    <label className="block text-sm text-[var(--text-primary)] mb-5">تفاصيل إضافية<textarea value={note} onChange={e=>setNote(e.target.value)} rows={3} placeholder="صف احتياجك أو رابط المشروع الحالي" className="mt-2 w-full border border-[var(--border-default)] bg-[var(--surface-primary)] p-3 rounded-xl"/></label>
    {formError&&<p role="alert" className="text-red-500 text-sm mb-4">{formError}</p>}
    <div className="flex flex-wrap gap-3">
      <button onClick={()=>send('خدمات مخصصة',checked)} disabled={!checked.length&&!note.trim()} className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl disabled:opacity-50">اطلب عرض السعر عبر واتساب</button>
      <button onClick={()=>send('استشارة أولية مجانية',checked)} className="border border-[var(--border-default)] text-[var(--text-primary)] px-6 py-3 rounded-xl flex items-center gap-2"><MessageCircle size={17}/> استشارة مجانية</button>
    </div>
   </section>
  </div>
 </main>;
};
