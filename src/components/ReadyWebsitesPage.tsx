import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { getWhatsAppUrl } from '../lib/utils';
import { ArrowLeft, ArrowUpLeft, Check, Globe2, LayoutTemplate, MonitorSmartphone, Rocket, SearchCheck, SlidersHorizontal, TrendingUp, Zap, ShieldCheck, MessageCircle, Eye } from 'lucide-react';

const DEMO_URL = 'https://rent.nmolabs.com/ar';
const process = [
  { title: 'اختر الموقع', desc: 'تصفح المواقع الجاهزة وشاهد التصميم والصفحات وتجربة الجوال قبل اتخاذ القرار.' },
  { title: 'أرسل بيانات شركتك', desc: 'شاركنا اسم الشركة والشعار ونبذة النشاط والخدمات والصور ووسائل التواصل.' },
  { title: 'نخصص الموقع لك', desc: 'نعدل الهوية والألوان والمحتوى والقطاعات والخدمات ونماذج الطلب بما يتناسب مع شركتك.' },
  { title: 'نربط الدومين ونطلق', desc: 'نراجع الموقع معك ثم نربط الدومين والاستضافة ونجهزه للإطلاق واستقبال العملاء.' }
];
const traditionalSteps = [
  'تحديد الهوية البصرية والتصميم','تصميم الواجهات وتجربة المستخدم','البرمجة وتجهيز الصفحات',
  'كتابة وتنظيم المحتوى','تحسين نسخة الجوال والكمبيوتر','تجهيز الخدمات ونماذج التواصل',
  'الدومين والاستضافة','تهيئة SEO وربط أدوات Google','التحليلات والتحويلات والاختبارات النهائية'
];
const websiteFeatures = [
  'موقع احترافي كامل قابل للتخصيص','تعديل اسم الشركة والشعار والألوان',
  'تعديل النصوص والصور وبيانات التواصل','صفحات الخدمات والقطاعات',
  'تصميم متوافق مع الجوال والتابلت والكمبيوتر','نماذج التواصل وطلب عرض السعر',
  'ربط الاتصال وواتساب','تهيئة أساسية لمحركات البحث SEO',
  'تجهيز وربط الدومين','إنشاء وتجهيز حسابات التواصل الاجتماعي الأساسية',
  'مراجعة الموقع قبل الإطلاق','تسليم الموقع جاهزًا للنشر'
];
const launchExtras = [
  'إعداد Google Analytics وSearch Console وTag Manager',
  'ربط أدوات Google بالموقع وإعداد تتبع التحويلات',
  'تتبع نماذج التواصل والنقر على أرقام الاتصال',
  'إعداد Pixels للمنصات الإعلانية المطلوبة',
  'تجهيز الموقع للحملات وإعداد الحملات وإطلاقها',
  'متابعة الحملات وتحسينها لمدة شهر',
  'إدارة الموقع وتحديث البيانات والمعلومات لمدة شهر',
  'النشر في حسابات التواصل الاجتماعي لمدة شهر',
  'متابعة الأداء والتحويلات ودعم فني خلال فترة المتابعة'
];
const sectors = ['المقاولات','التشغيل والصيانة','تأجير الأيدي العاملة','الخدمات اللوجستية','الشركات الصناعية','العقارات','الخدمات المهنية','الشركات التقنية','التجارة والخدمات','الشركات الناشئة'];
const benefits = [
  { icon: Eye, title: 'تعرف النتيجة قبل أن تدفع', desc: 'شاهد الموقع الفعلي وصفحاته وتجربة التصفح بدل الاعتماد على تصور أولي.' },
  { icon: Zap, title: 'إطلاق أسرع', desc: 'العمل الأساسي منجز مسبقًا؛ نركز على تخصيصه وإطلاقه لنشاطك.' },
  { icon: MonitorSmartphone, title: 'متوافق مع جميع الأجهزة', desc: 'تجربة مصممة للجوال والتابلت والكمبيوتر.' },
  { icon: SearchCheck, title: 'أساس قوي للظهور', desc: 'بنية صفحات ومحتوى قابلة للتحسين لمحركات البحث وأدوات القياس.' },
  { icon: SlidersHorizontal, title: 'تخصيص حقيقي', desc: 'اسم الشركة، الشعار، الألوان، الخدمات، الصور، الأقسام والدومين.' },
  { icon: TrendingUp, title: 'قابل للتطوير', desc: 'يمكن إضافة تحليلات Google وتتبع التحويلات والحملات عند الحاجة.' }
];
const faqs = [
  {q:'هل الموقع الجاهز أفضل من إنشاء موقع من الصفر؟',a:'يعتمد على احتياجات الشركة. إذا كنت تحتاج أنظمة ووظائف خاصة جدًا فقد يكون التطوير المخصص أنسب. أما المواقع التعريفية والخدمية المعتادة فيمكن إطلاقها بسرعة أكبر باستخدام موقع جاهز قابل للتخصيص.'},
  {q:'هل يمكن تعديل الموقع بالكامل؟',a:'نعم، يمكن تخصيص اسم الشركة والشعار والألوان والنصوص والصور والخدمات وبيانات التواصل والأقسام والدومين وروابط الحسابات الاجتماعية وفق نطاق الباقة.'},
  {q:'هل يمكن ربط الموقع بـ Google والإعلانات؟',a:'نعم، تتضمن باقة الإطلاق المتكامل أدوات القياس والتحليل وتتبع التحويلات وتجهيز الحملات ومتابعتها خلال الشهر الأول.'},
  {q:'هل تشمل الباقة ميزانية الإعلانات المدفوعة؟',a:'لا. تكاليف الإنفاق الإعلاني غير مشمولة في سعر باقة الإطلاق المتكامل.'}
];

const Surface: React.FC<{children:React.ReactNode,className?:string}> = ({children,className=''}) => (
  <div className={`rounded-[28px] border border-[var(--border-default)] bg-[var(--surface-primary)]/80 backdrop-blur-xl ${className}`}>{children}</div>
);

export const ReadyWebsitesPage: React.FC = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  const contactUrl = getWhatsAppUrl(config.contactNumber, 'مرحبًا NmoLabs، أرغب في تخصيص الموقع الجاهز المعروض على rent.nmolabs.com لشركتي. أرجو تزويدي بالتفاصيل والخطوات.');
  const openPreview = () => window.open(DEMO_URL, '_blank', 'noopener,noreferrer');
  const whatsapp = (packageName?: string) => window.open(packageName ? getWhatsAppUrl(config.contactNumber, `مرحبًا NmoLabs، أرغب في باقة ${packageName} للمواقع الجاهزة، وأريد بدء التخصيص.`) : contactUrl, '_blank', 'noopener,noreferrer');
  const enter = { initial: {opacity:0,y:18}, whileInView:{opacity:1,y:0}, viewport:{once:true,amount:0.13}, transition:{duration:0.55} };
  return (
    <main dir="rtl" className="relative z-10 min-h-screen pt-28 sm:pt-36 pb-24 text-[var(--text-primary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.header {...enter} className="mx-auto max-w-4xl text-center mb-14 sm:mb-20">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-secondary)]/40 bg-[var(--surface-primary)]/75 px-4 py-2 text-xs sm:text-sm font-bold text-[var(--color-secondary)]"><LayoutTemplate size={16}/> {isEn ? 'Ready-Made Business Websites' : 'مواقع جاهزة للشركات والمؤسسات'}</span>
          <h1 className="text-3xl leading-[1.3] sm:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            {isEn ? 'Launch a professional website for your business — faster.' : 'إنشاء موقع احترافي لشركتك أصبح أسهل وأسرع'}
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-8 sm:text-lg text-[var(--text-secondary)] mb-5">هل تبحث عن <strong className="text-[var(--text-primary)]">إنشاء موقع إلكتروني احترافي لشركتك</strong> دون رحلة طويلة من التصميم والبرمجة وكتابة المحتوى والمراجعات؟ مع المواقع الجاهزة من NmoLabs تختار موقعًا مبنيًا مسبقًا، ثم نخصصه باسم شركتك وهويتها وخدماتها ليكون جاهزًا للإطلاق خلال وقت أقصر.</p>
          <p className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-8">شاهد الموقع أولًا، اختر ما يناسب نشاطك، ثم اترك لنا مهمة التجهيز والإطلاق.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-4 text-white font-bold hover:brightness-110 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"><Eye size={19}/> شاهد الموقع الآن <ArrowUpLeft size={17}/></a>
            <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 rounded-full bg-[var(--surface-primary)]/85 px-7 py-4 border border-[var(--border-default)] font-bold hover:border-[var(--color-primary)] transition-colors"><MessageCircle size={19}/> اطلب تخصيص الموقع لشركتك</a>
          </div>
        </motion.header>

        <motion.section {...enter} aria-labelledby="ready-preview-title" className="mb-20 sm:mb-28">
          <Surface className="overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-7 sm:p-10 lg:p-12 flex flex-col items-start justify-center">
                <span className="text-xs font-bold tracking-wider text-[var(--color-secondary)] mb-3">نموذج جاهز للمعاينة</span>
                <h2 id="ready-preview-title" className="text-2xl sm:text-3xl font-black mb-5">شاهد الموقع الفعلي قبل الشراء</h2>
                <p className="text-[var(--text-secondary)] leading-8 mb-6">لا تعتمد على الصور أو التصاميم الأولية. افتح الموقع الحالي واطّلع على الواجهة الرئيسية وصفحات الخدمات وتجربة الجوال ونماذج التواصل، ثم تخيّله بشعارك واسم شركتك.</p>
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-[var(--color-primary)] hover:underline" dir="ltr">rent.nmolabs.com/ar <ArrowUpLeft size={18}/></a>
              </div>
              <div className="min-h-[280px] sm:min-h-[360px] bg-gradient-to-br from-[#0b2754] via-[#0a1733] to-[#06101c] p-7 sm:p-10 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 15% 30%, #67d9fd 0 2px, transparent 3px), radial-gradient(circle at 74% 48%, #fff 0 1px, transparent 2px)',backgroundSize:'80px 100px'}} aria-hidden="true"/>
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/25 bg-white/5 shadow-2xl backdrop-blur-lg">
                  <div className="flex items-center gap-1.5 border-b border-white/15 px-4 py-3"><span className="h-2.5 w-2.5 rounded-full bg-rose-400"/><span className="h-2.5 w-2.5 rounded-full bg-amber-400"/><span className="h-2.5 w-2.5 rounded-full bg-emerald-400"/><span className="mr-3 text-[11px] text-white/75" dir="ltr">rent.nmolabs.com/ar</span></div>
                  <div className="p-7 sm:p-10 text-center"><Globe2 className="mx-auto mb-4 text-cyan-300" size={58} strokeWidth={1.3}/><h3 className="mb-3 text-xl font-bold text-white">موقع شركتك القادم</h3><p className="text-white/75 text-sm leading-7 mb-5">موقع جاهز للتخصيص بهويتك ومحتواك وخدماتك</p><button onClick={openPreview} className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300">فتح المعاينة الفعلية</button></div>
                </div>
              </div>
            </div>
          </Surface>
        </motion.section>

        <motion.section {...enter} className="mb-20 sm:mb-28" aria-labelledby="why-not-from-scratch">
          <div className="mx-auto max-w-3xl text-center mb-10"><h2 id="why-not-from-scratch" className="text-2xl sm:text-4xl font-black mb-4">لماذا إنشاء موقع من الصفر قد يستغرق وقتًا أطول؟</h2><p className="text-[var(--text-secondary)] leading-8">إنشاء موقع من البداية غالبًا يمر بمراحل متتابعة، وكل مرحلة قد تحتاج مراجعات وتعديلات إضافية.</p></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{traditionalSteps.map(s=><Surface key={s} className="p-4 sm:p-5 flex items-center gap-3"><Check size={18} className="shrink-0 text-[var(--color-secondary)]"/><span className="font-semibold text-sm">{s}</span></Surface>)}</div>
          <p className="text-center text-lg font-bold mt-8">لهذا نوفر موقعًا تم بناؤه مسبقًا — بدلاً من البدء من صفحة بيضاء.</p>
        </motion.section>

        <motion.section {...enter} className="mb-20 sm:mb-28" aria-labelledby="how-it-works">
          <div className="text-center mb-10"><h2 id="how-it-works" className="text-2xl sm:text-4xl font-black mb-4">كيف تعمل خدمة المواقع الجاهزة؟</h2><p className="text-[var(--text-secondary)]">أربع خطوات واضحة من المعاينة إلى الإطلاق.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{process.map((p,i)=><Surface key={p.title} className="p-6 sm:p-7"><span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)]/15 text-[var(--color-primary)] font-black">{String(i+1).padStart(2,'0')}</span><h3 className="font-bold text-xl mb-3">{p.title}</h3><p className="text-sm leading-7 text-[var(--text-secondary)]">{p.desc}</p></Surface>)}</div>
        </motion.section>

        <motion.section {...enter} className="mb-20 sm:mb-28" aria-labelledby="for-who">
          <div className="text-center mb-10"><h2 id="for-who" className="text-2xl sm:text-4xl font-black mb-4">لمن تناسب المواقع الجاهزة؟</h2><p className="text-[var(--text-secondary)] max-w-3xl mx-auto leading-8">مناسبة للشركات والمؤسسات التي تحتاج موقعًا تعريفيًا أو خدميًا احترافيًا، واضح الصفحات، متوافقًا مع الجوال وقابلًا للتطوير والتسويق.</p></div>
          <div className="flex flex-wrap justify-center gap-3">{sectors.map(s=><span key={s} className="rounded-full border border-[var(--border-default)] bg-[var(--surface-primary)]/80 px-5 py-3 text-sm font-semibold">{s}</span>)}</div>
        </motion.section>

        <motion.section {...enter} className="mb-20 sm:mb-28" aria-labelledby="packages-title">
          <div className="text-center mb-10"><span className="text-sm font-bold text-[var(--color-secondary)]">باقات واضحة</span><h2 id="packages-title" className="text-2xl sm:text-4xl font-black mt-2 mb-4">اختر الباقة المناسبة لشركتك</h2><p className="text-[var(--text-secondary)]">الأسعار بالريال السعودي، قبل ضريبة القيمة المضافة.</p></div>
          <div className="grid lg:grid-cols-2 gap-5 max-w-6xl mx-auto items-stretch">
            <Surface className="p-6 sm:p-9 flex flex-col">
              <div className="mb-6"><h3 className="text-2xl font-black mb-3">الموقع الاحترافي الجاهز</h3><p className="text-[var(--text-secondary)] text-sm leading-7">لمن يريد موقع شركة احترافيًا ويخطط لإدارة التسويق بنفسه.</p></div>
              <div className="mb-6 flex items-baseline gap-2"><strong className="text-4xl sm:text-5xl font-black" dir="ltr">3,500</strong><span className="font-semibold">ريال</span><span className="text-xs text-[var(--text-muted)]">قبل الضريبة</span></div>
              <ul className="space-y-3 mb-8 flex-1">{websiteFeatures.map(s=><li key={s} className="flex items-start gap-2.5 text-sm leading-6"><Check size={17} className="text-[var(--color-accent)] mt-1 shrink-0"/>{s}</li>)}</ul>
              <button onClick={()=>whatsapp('الموقع الاحترافي الجاهز — 3,500 ريال')} className="w-full rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] px-6 py-4 font-bold hover:border-[var(--color-primary)] transition-colors">اطلب هذه الباقة</button>
            </Surface>
            <Surface className="p-6 sm:p-9 flex flex-col border-[var(--color-primary)]/50">
              <div className="mb-6"><span className="inline-flex mb-3 rounded-full bg-[var(--color-primary)]/15 px-3 py-1 text-xs font-bold text-[var(--color-primary)]">حضور رقمي متكامل</span><h3 className="text-2xl font-black mb-3">الإطلاق الرقمي المتكامل</h3><p className="text-[var(--text-secondary)] text-sm leading-7">للشركات التي تريد إطلاق الموقع وأدوات القياس والتسويق في مسار واحد.</p></div>
              <div className="mb-6 flex items-baseline gap-2"><strong className="text-4xl sm:text-5xl font-black" dir="ltr">6,500</strong><span className="font-semibold">ريال</span><span className="text-xs text-[var(--text-muted)]">قبل الضريبة</span></div>
              <p className="text-sm font-bold mb-4">تشمل جميع خدمات الباقة الأولى، بالإضافة إلى:</p>
              <ul className="space-y-3 mb-6 flex-1">{launchExtras.map(s=><li key={s} className="flex items-start gap-2.5 text-sm leading-6"><Check size={17} className="text-[var(--color-accent)] mt-1 shrink-0"/>{s}</li>)}</ul>
              <p className="text-xs leading-6 text-[var(--text-muted)] mb-7 border-t border-[var(--border-default)] pt-4">ميزانية الإعلانات المدفوعة غير مشمولة في قيمة الباقة.</p>
              <button onClick={()=>whatsapp('الإطلاق الرقمي المتكامل — 6,500 ريال')} className="w-full rounded-full bg-[var(--color-primary)] px-6 py-4 font-bold text-white hover:brightness-110 transition-all">اطلب الباقة المتكاملة</button>
            </Surface>
          </div>
        </motion.section>

        <motion.section {...enter} className="mb-20 sm:mb-28" aria-labelledby="benefits-title">
          <div className="mx-auto max-w-3xl text-center mb-10"><h2 id="benefits-title" className="text-2xl sm:text-4xl font-black mb-4">ليس مجرد موقع… بل بداية حضور رقمي متكامل</h2><p className="text-[var(--text-secondary)] leading-8">بعد إطلاق موقعك يمكنك فهم مصادر الزيارات، طلبات التواصل، النقرات على الاتصال، وأداء الحملات والصفحات عبر أدوات القياس والتسويق.</p></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{benefits.map(b=>{const Icon=b.icon;return <Surface key={b.title} className="p-6"><Icon className="mb-4 text-[var(--color-secondary)]" size={27}/><h3 className="text-xl font-bold mb-3">{b.title}</h3><p className="text-[var(--text-secondary)] text-sm leading-7">{b.desc}</p></Surface>})}</div>
        </motion.section>

        <motion.section {...enter} className="mb-20 sm:mb-28" aria-labelledby="faq-title">
          <div className="text-center mb-10"><h2 id="faq-title" className="text-2xl sm:text-4xl font-black mb-4">الأسئلة الشائعة عن المواقع الجاهزة</h2></div>
          <div className="max-w-4xl mx-auto space-y-3">{faqs.map(f=><details key={f.q} className="group rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)]/80 px-5 sm:px-7 py-5 backdrop-blur-lg"><summary className="cursor-pointer font-bold text-base sm:text-lg leading-7">{f.q}</summary><p className="pt-4 text-sm sm:text-base leading-8 text-[var(--text-secondary)]">{f.a}</p></details>)}</div>
        </motion.section>

        <motion.section {...enter} className="text-center">
          <Surface className="relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 pointer-events-none"/>
            <div className="relative z-10"><Rocket size={36} className="mx-auto text-[var(--color-secondary)] mb-5"/><h2 className="text-2xl sm:text-4xl font-black mb-5">اختر موقعك الآن، وشاهده قبل أن تشتريه</h2><p className="mx-auto max-w-2xl text-[var(--text-secondary)] leading-8 mb-8">موقع احترافي، وقت تنفيذ أسرع، وخطوات أقل للوصول إلى عملائك. شاهد الموقع الجاهز الآن ثم اطلب تخصيصه بهويتك وخدماتك.</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"><a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 rounded-full bg-[var(--color-primary)] text-white px-7 py-4 font-bold"><Eye size={19}/>شاهد الموقع الآن <ArrowUpLeft size={18}/></a><a href={contactUrl} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] px-7 py-4 font-bold"><MessageCircle size={18}/>اطلب تخصيص الموقع لشركتك</a></div>
            </div>
          </Surface>
        </motion.section>
      </div>
    </main>
  );
};
