import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Maximize2, 
  Grid, 
  Sun, 
  Moon, 
  Layers, 
  FileArchive, 
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  FileImage
} from 'lucide-react';

type PreviewMode = 'transparent' | 'white' | 'dark' | 'light';

export const BrandAssetsPage: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const [previewBg, setPreviewBg] = useState<PreviewMode>('transparent');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const officialPrimaryPng = '/brand-files/nmolabs-logo-primary.png';
  const officialZipPackage = '/brand-files/NmoLabs-Brand-Assets.zip';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(id);
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  const handleDownloadNotify = (name: string) => {
    setDownloadSuccess(name);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  // Canonical Brand Colors directly grounded in NmoLabs Design System & Tokens
  const brandColors = [
    {
      id: 'primary-blue',
      nameAr: 'الأزرق الأساسي',
      nameEn: 'Primary Brand Blue',
      hexLight: '#0F62FE',
      hexDark: '#4589FF',
      rgbLight: '15, 98, 254',
      rgbDark: '69, 137, 255',
      cmyk: '80, 50, 0, 0',
      descriptionAr: 'اللون الرئيسي للعلامة التجارية؛ يعكس الطاقة الرقمية، الاحترافية، والابتكار التقني.',
      descriptionEn: 'Main corporate identity color representing digital energy, precision engineering, and tech innovation.',
      role: 'Primary Action & Focal Points'
    },
    {
      id: 'secondary-cyan',
      nameAr: 'السماوي العميق',
      nameEn: 'Deep Tech Cyan',
      hexLight: '#0072C3',
      hexDark: '#33B1FF',
      rgbLight: '0, 114, 195',
      rgbDark: '51, 177, 255',
      cmyk: '85, 40, 0, 5',
      descriptionAr: 'لون المسارات التفاعلية والتدرجات البصرية، يبرز الحداثة والمرونة التقنية.',
      descriptionEn: 'Secondary interactive tone used in gradients, elevated badges, and tech accents.',
      role: 'Secondary Accents & Flow'
    },
    {
      id: 'accent-emerald',
      nameAr: 'الأخضر النمائي',
      nameEn: 'Growth Emerald',
      hexLight: '#10B981',
      hexDark: '#22D3A0',
      rgbLight: '16, 185, 129',
      rgbDark: '34, 211, 160',
      cmyk: '75, 0, 60, 0',
      descriptionAr: 'لون مؤشرات النمو ومضاعفة الأداء، يعبر عن النجاح المستدام والأثر المالي.',
      descriptionEn: 'Represents growth velocity, positive business KPIs, and verified project outcomes.',
      role: 'Growth & Success Highlights'
    },
    {
      id: 'deep-dark',
      nameAr: 'الداكن الهندسي',
      nameEn: 'Architectural Dark',
      hexLight: '#070B14',
      hexDark: '#0E1626',
      rgbLight: '7, 11, 20',
      rgbDark: '14, 22, 38',
      cmyk: '85, 75, 55, 75',
      descriptionAr: 'الخلفية الهندسية العميقة التي تمنح الأسطح الرقمية التباين العالي والفخامة.',
      descriptionEn: 'Deep architectural base delivering ultra-high contrast and dimensional presence.',
      role: 'Surface Foundation & Contrast'
    },
    {
      id: 'surface-light',
      nameAr: 'الأبيض النقي والسطح الفاتح',
      nameEn: 'Clean Surface Light',
      hexLight: '#F8FAFC',
      hexDark: '#FFFFFF',
      rgbLight: '248, 250, 252',
      rgbDark: '255, 255, 255',
      cmyk: '2, 1, 0, 0',
      descriptionAr: 'الأسطح النقية الفاتحة لتطبيقات الويب والمطبوعات الرسمية.',
      descriptionEn: 'Clean, crisp neutral for bright application interfaces and print documentation.',
      role: 'Light Mode & Print Backdrops'
    }
  ];

  // Correct Usage Rules
  const correctRules = [
    {
      titleAr: 'الحفاظ على أبعاد الشعار الأصلية',
      titleEn: 'Maintain Original Proportions',
      descAr: 'احرص دائماً على تكبير أو تصغير الشعار بنسبة 1:1 المتوازنة دون مطّه أو ضغطه.',
      descEn: 'Scale the logo proportionally at all times without altering the aspect ratio.'
    },
    {
      titleAr: 'توفير المساحة الآمنة المحيطة',
      titleEn: 'Maintain Recommended Clear Space',
      descAr: 'اترك مساحة فراغ كافية حول الشعار لعزله عن النصوص والعناصر الصاخبة.',
      descEn: 'Ensure adequate unobstructed breathing room around all sides of the mark.'
    },
    {
      titleAr: 'استخدام التباين العالي للخلفية',
      titleEn: 'Ensure Sufficient Background Contrast',
      descAr: 'ضع الشعار فوق خلفيات داكنة أو فاتحة تبرز تفاصيله وألوانه الأصلية بوضوح تام.',
      descEn: 'Place the logo on clean dark or light surfaces that ensure maximum visual clarity.'
    },
    {
      titleAr: 'الاعتماد على الملفات الرسمية المعتمدة',
      titleEn: 'Use Official Master Assets',
      descAr: 'استخدم دائماً ملفات الـ PNG الشفافة الأصلية المتاحة للتحميل من هذا المركز.',
      descEn: 'Always source brand assets directly from this official asset center.'
    }
  ];

  // Incorrect Usage Rules with Visual Demos
  const incorrectRules = [
    {
      id: 'stretch',
      titleAr: 'لا تمدد أو تضغط الشعار',
      titleEn: 'Do Not Stretch or Squash',
      descAr: 'تغيير أبعاد العرض أو الارتفاع يشوه هوية الشعار وهندسته.',
      descEn: 'Distorting width or height undermines the logo geometry.',
      style: 'scale-x-140 scale-y-75'
    },
    {
      id: 'rotate',
      titleAr: 'لا تقم بتدوير الشعار',
      titleEn: 'Do Not Rotate',
      descAr: 'يجب أن يظل الشعار أفقياً ومستوياً تماماً على خط القاعدة.',
      descEn: 'The logo must always remain horizontal and level.',
      style: 'rotate-12'
    },
    {
      id: 'recolor',
      titleAr: 'لا تغيّر ألوان الشعار عشوائياً',
      titleEn: 'Do Not Arbitrarily Recolor',
      descAr: 'التلاعب بالتدرجات اللونية الأصلية يفقد الشعار هويته الرسمية.',
      descEn: 'Unauthorized hue shifts break brand consistency.',
      style: 'hue-rotate-90 saturate-200'
    },
    {
      id: 'glow',
      titleAr: 'لا تضف ظلالاً أو توهجاً غير معتمد',
      titleEn: 'Do Not Add Heavy Effects',
      descAr: 'تجنب إضافة فلاتر النيون أو التوهجات المفرطة على الشعار.',
      descEn: 'Avoid unapproved outer glow, bevels, or excessive drop shadows.',
      style: 'drop-shadow-[0_0_15px_#ff0055]'
    }
  ];

  return (
    <div className="pt-28 pb-24 min-h-screen text-[var(--text-primary)]">
      {/* Background Decorators */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow opacity-30 pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-8">
          <button 
            onClick={() => { updateConfig({ currentRoute: 'home' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            {isEn ? 'Home' : 'الرئيسية'}
          </button>
          <ChevronRight className={`w-3.5 h-3.5 ${isEn ? '' : 'rotate-180'}`} />
          <span className="text-[var(--text-primary)] font-medium">
            {isEn ? 'Official Brand Identity' : 'الهوية الرسمية'}
          </span>
        </div>

        {/* ======================================================== */}
        {/* SECTION 01 — HERO */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] text-[var(--color-primary)] text-xs font-semibold mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>{isEn ? 'Official Brand Assets Center' : 'مركز الهوية البصرية الرسمية المعتمدة'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-5 text-[var(--text-primary)] leading-tight">
            {isEn ? 'NmoLabs Official Brand Identity' : 'الهوية الرسمية لنمو لابز'}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl mx-auto">
            {isEn 
              ? 'Official logos, colors, and approved visual assets for digital and print use.'
              : 'الشعارات والألوان والأصول البصرية المعتمدة لنمو لابز، جاهزة للاستخدام الرقمي والطباعة.'}
          </p>

          {/* Quick ZIP Package Action */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href={officialZipPackage} 
              download="NmoLabs-Brand-Assets.zip"
              onClick={() => handleDownloadNotify('ZIP Package')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileArchive className="w-4 h-4" />
              <span>{isEn ? 'Download Brand Assets Package (ZIP)' : 'تحميل حزمة الهوية الكاملة (ZIP)'}</span>
            </a>

            <a 
              href="#logo-preview"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] font-semibold text-sm hover:border-[var(--color-primary)] transition-all duration-200"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{isEn ? 'Explore Logo Assets' : 'استعراض الشعار والألوان'}</span>
            </a>
          </div>

          {/* Notification Toast */}
          <AnimatePresence>
            {downloadSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? `Downloading ${downloadSuccess}...` : `جارٍ تحميل ${downloadSuccess}...`}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* SECTION 02 & 03 — PRIMARY LOGO & PREVIEW ENVIRONMENTS */}
        {/* ======================================================== */}
        <section id="logo-preview" className="mb-20 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-[var(--border-default)]">
            <div>
              <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
                {isEn ? 'Primary Asset' : 'الأصل الأساسي'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                {isEn ? 'Official Logo' : 'الشعار الرسمي'}
              </h2>
            </div>

            {/* Background Selector Controls */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-default)] self-start md:self-auto">
              <span className="text-xs text-[var(--text-muted)] px-2 font-medium hidden sm:inline">
                {isEn ? 'Preview On:' : 'معاينة الخلفية:'}
              </span>
              <button
                onClick={() => setPreviewBg('transparent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  previewBg === 'transparent'
                    ? 'bg-[var(--surface-primary)] text-[var(--color-primary)] shadow-sm border border-[var(--interactive-border)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title={isEn ? 'Transparent Grid' : 'شبكة الشفافية'}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{isEn ? 'Transparent' : 'شفاف'}</span>
              </button>
              <button
                onClick={() => setPreviewBg('dark')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  previewBg === 'dark'
                    ? 'bg-[var(--surface-primary)] text-[var(--color-primary)] shadow-sm border border-[var(--interactive-border)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title={isEn ? 'Dark Background' : 'خلفية داكنة'}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>{isEn ? 'Dark' : 'داكن'}</span>
              </button>
              <button
                onClick={() => setPreviewBg('white')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  previewBg === 'white'
                    ? 'bg-[var(--surface-primary)] text-[var(--color-primary)] shadow-sm border border-[var(--interactive-border)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title={isEn ? 'Solid White' : 'خلفية بيضاء'}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>{isEn ? 'White' : 'أبيض'}</span>
              </button>
              <button
                onClick={() => setPreviewBg('light')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  previewBg === 'light'
                    ? 'bg-[var(--surface-primary)] text-[var(--color-primary)] shadow-sm border border-[var(--interactive-border)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                title={isEn ? 'Light Neutral' : 'سطح رمادي فاتح'}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isEn ? 'Neutral' : 'حيادي'}</span>
              </button>
            </div>
          </div>

          {/* Main Logo Display Box */}
          <div className="rounded-3xl border border-[var(--border-default)] overflow-hidden bg-[var(--surface-primary)] shadow-md transition-all duration-300">
            {/* Logo Canvas */}
            <div 
              className={`relative w-full h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center p-8 sm:p-12 md:p-16 transition-colors duration-300 ${
                previewBg === 'transparent'
                  ? 'bg-transparent-checkerboard'
                  : previewBg === 'dark'
                  ? 'bg-[#0E1626]'
                  : previewBg === 'white'
                  ? 'bg-white'
                  : 'bg-[#F8FAFC]'
              }`}
              style={
                previewBg === 'transparent'
                  ? {
                      backgroundImage: `
                        linear-gradient(45deg, rgba(125, 125, 125, 0.12) 25%, transparent 25%), 
                        linear-gradient(-45deg, rgba(125, 125, 125, 0.12) 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, rgba(125, 125, 125, 0.12) 75%), 
                        linear-gradient(-45deg, transparent 75%, rgba(125, 125, 125, 0.12) 75%)
                      `,
                      backgroundSize: '24px 24px',
                      backgroundPosition: '0 0, 0 12px, 12px -12px, -12px 0px'
                    }
                  : {}
              }
            >
              <img 
                src={officialPrimaryPng} 
                alt={isEn ? "NmoLabs Official Master Logo" : "شعار نمو لابز الرسمي المعتمد"}
                className="max-h-full max-w-full object-contain filter select-none transition-transform duration-300 hover:scale-105"
                style={{ maxHeight: '82%', maxWidth: '82%' }}
                loading="eager"
              />
            </div>

            {/* Bottom Meta & Action Bar */}
            <div className="p-5 sm:p-6 bg-[var(--surface-secondary)] border-t border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[var(--surface-primary)] border border-[var(--border-default)] font-mono text-[var(--text-secondary)]">
                  2750 × 2750 px
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[var(--surface-primary)] border border-[var(--border-default)] font-mono text-[var(--text-secondary)]">
                  PNG · RGBA 32-bit
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {isEn ? 'Alpha Transparency Verified' : 'شفافية حقيقية معتمدة'}
                </span>
              </div>

              {/* Download Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={officialPrimaryPng}
                  download="nmolabs-logo-primary.png"
                  onClick={() => handleDownloadNotify('PNG')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Download PNG (High-Res)' : 'تحميل PNG عالي الدقة'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 04 — DOWNLOAD & ASSET CARDS */}
        {/* ======================================================== */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
              {isEn ? 'Approved Variants' : 'النسخ المعتمدة'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {isEn ? 'Asset Catalog & Specifications' : 'دليل الأصول المعتمدة والمواصفات'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {isEn 
                ? 'Only verified official master files are provided. No artificial recolors or low-quality traces.'
                : 'يتم توفير الملفات الأصلية المعتمدة فقط؛ بدون أي تلوين اصطناعي أو إعادة رسم غير رسمية.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Master Primary Logo */}
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-5 flex flex-col justify-between shadow-sm hover:border-[var(--interactive-border)] transition-all">
              <div>
                <div 
                  className="h-44 rounded-xl border border-[var(--border-default)] mb-4 flex items-center justify-center p-6"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(125, 125, 125, 0.1) 25%, transparent 25%), 
                      linear-gradient(-45deg, rgba(125, 125, 125, 0.1) 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, rgba(125, 125, 125, 0.1) 75%), 
                      linear-gradient(-45deg, transparent 75%, rgba(125, 125, 125, 0.1) 75%)
                    `,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                  }}
                >
                  <img 
                    src={officialPrimaryPng} 
                    alt={isEn ? "NmoLabs Primary Logo" : "شعار نمو لابز الأساسي"} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {isEn ? 'Primary Official Logo' : 'الشعار الأساسي المعتمد'}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold">
                    PNG (Master)
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {isEn 
                    ? 'Full master resolution lockup with symbol and typography on transparent background.'
                    : 'النسخة الماستر الكاملة برمز الشعار واسم العلامة بخلفية شفافة فائقة الدقة.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">2750 × 2750 px</span>
                <a
                  href={officialPrimaryPng}
                  download="nmolabs-logo-primary.png"
                  onClick={() => handleDownloadNotify('Primary PNG')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-xs font-semibold transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Download PNG' : 'تحميل PNG'}</span>
                </a>
              </div>
            </div>

            {/* Card 2: Dark Surface Presentation */}
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-5 flex flex-col justify-between shadow-sm hover:border-[var(--interactive-border)] transition-all">
              <div>
                <div className="h-44 rounded-xl bg-[#0E1626] border border-white/10 mb-4 flex items-center justify-center p-6">
                  <img 
                    src={officialPrimaryPng} 
                    alt={isEn ? "NmoLabs on Dark Surface" : "شعار نمو لابز على سطح داكن"} 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {isEn ? 'Dark Backdrop Lockup' : 'الاستخدام فوق السطح الداكن'}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-bold">
                    High-Contrast
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {isEn 
                    ? 'Optimal presentation for dark interfaces, presentations, and digital dashboards.'
                    : 'الاستخدام الأمثل لواجهات الوضع الليلي، العروض التقديمية واللوحات التقنية.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">32-bit RGBA</span>
                <a
                  href={officialPrimaryPng}
                  download="nmolabs-logo-dark-use.png"
                  onClick={() => handleDownloadNotify('PNG for Dark Surface')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-xs font-semibold transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Download PNG' : 'تحميل PNG'}</span>
                </a>
              </div>
            </div>

            {/* Card 3: Complete Brand Package */}
            <div className="rounded-2xl border border-[var(--interactive-border)] bg-[var(--surface-primary)] p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="h-44 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-default)] mb-4 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-2">
                    <FileArchive className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-[var(--text-primary)]">NmoLabs-Brand-Assets.zip</span>
                  <span className="text-[10px] text-[var(--text-muted)] mt-0.5 font-mono">5.86 MB · Static Asset</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {isEn ? 'Complete Asset Bundle' : 'الحزمة الكاملة للأصول'}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                    ZIP Archive
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                  {isEn 
                    ? 'Includes master high-resolution PNGs and official usage guide README.'
                    : 'تتضمن الملفات الأصلية فائقة الدقة ودليل الاستخدام الرسمي README.'}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">ZIP Package</span>
                <a
                  href={officialZipPackage}
                  download="NmoLabs-Brand-Assets.zip"
                  onClick={() => handleDownloadNotify('Complete ZIP Package')}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Download ZIP' : 'تحميل الحزمة'}</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 05 — OFFICIAL COLOR PALETTE */}
        {/* ======================================================== */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
              {isEn ? 'Identity Tokens' : 'الألوان المعتمدة'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {isEn ? 'Official Brand Color Palette' : 'لوحة ألوان الهوية الرسمية'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {isEn 
                ? 'Canonical color tokens derived from the official design system. Click any hex code to copy.'
                : 'قيم الألوان المعتمدة المستخرجة من نظام التصميم الرسمي. انقر على أي كود لنسخه مباشرة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {brandColors.map((color) => {
              const hexValue = config.theme === 'dark' ? color.hexDark : color.hexLight;
              const rgbValue = config.theme === 'dark' ? color.rgbDark : color.rgbLight;
              const isCopied = copiedColor === color.id;

              return (
                <div 
                  key={color.id}
                  className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:border-[var(--interactive-border)] transition-all group"
                >
                  <div>
                    {/* Swatch */}
                    <div 
                      className="h-28 rounded-xl border border-black/10 dark:border-white/10 mb-4 shadow-inner relative overflow-hidden flex items-end p-3 transition-transform duration-200 group-hover:scale-[1.01]"
                      style={{ backgroundColor: hexValue }}
                    >
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/40 text-white backdrop-blur-sm">
                        {color.role}
                      </span>
                    </div>

                    {/* Color Info */}
                    <h3 className="font-bold text-base text-[var(--text-primary)] mb-1">
                      {isEn ? color.nameEn : color.nameAr}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                      {isEn ? color.descriptionEn : color.descriptionAr}
                    </p>
                  </div>

                  {/* Values & Copy Action */}
                  <div className="space-y-2 pt-3 border-t border-[var(--border-default)]">
                    {/* HEX */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-muted)] font-semibold">HEX:</span>
                      <button
                        onClick={() => handleCopy(hexValue, color.id)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-secondary)] hover:bg-[var(--interactive-border)] font-mono text-[var(--text-primary)] font-bold transition-colors"
                        title={isEn ? "Click to copy HEX" : "انقر لنسخ كود HEX"}
                      >
                        <span>{hexValue}</span>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                        )}
                      </button>
                    </div>

                    {/* RGB */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-muted)] font-semibold">RGB:</span>
                      <span className="font-mono text-[var(--text-secondary)]">{rgbValue}</span>
                    </div>

                    {/* Copy confirmation label */}
                    <div className="h-4 flex items-center justify-end">
                      <AnimatePresence>
                        {isCopied && (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-[10px] font-bold text-emerald-500"
                          >
                            {isEn ? 'Copied to clipboard!' : 'تم النسخ إلى الحافظة!'}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 06 — RECOMMENDED CLEAR SPACE */}
        {/* ======================================================== */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
              {isEn ? 'Clear Space Standard' : 'المساحة الآمنة الموصى بها'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {isEn ? 'Recommended Clear Space' : 'المساحة الآمنة الموصى بها للشعار'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl">
              {isEn 
                ? 'To ensure visual integrity and maximum impact, maintain an unobstructed safety boundary around all edges of the logo equal to the proportional margin (X).'
                : 'لضمان أقصى درجات الوضوح والظهور البصري، يجب ترك مساحة فارغة آمنة تحيط بالشعار من جميع الاتجاهات تعادل الهامش النسبي (X) لعزله عن بقية العناصر.'}
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Visual Diagram */}
              <div className="lg:col-span-7 flex items-center justify-center">
                <div className="relative p-8 sm:p-12 border-2 border-dashed border-[var(--color-primary)]/40 rounded-2xl bg-[var(--surface-secondary)]/50">
                  {/* Dimension markers */}
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[var(--color-primary)] bg-[var(--surface-primary)] px-2 py-0.5 rounded border border-[var(--color-primary)]/30">
                    Margin (X)
                  </span>
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-[var(--color-primary)] bg-[var(--surface-primary)] px-2 py-0.5 rounded border border-[var(--color-primary)]/30">
                    Margin (X)
                  </span>
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[var(--color-primary)] bg-[var(--surface-primary)] px-2 py-0.5 rounded border border-[var(--color-primary)]/30">
                    (X)
                  </span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-[var(--color-primary)] bg-[var(--surface-primary)] px-2 py-0.5 rounded border border-[var(--color-primary)]/30">
                    (X)
                  </span>

                  <div className="w-48 sm:w-64 h-48 sm:h-64 flex items-center justify-center bg-[var(--surface-primary)] rounded-xl border border-[var(--border-default)] p-6 shadow-inner">
                    <img 
                      src={officialPrimaryPng} 
                      alt="NmoLabs Clear Space Reference"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Explanatory points */}
              <div className="lg:col-span-5 space-y-4 text-sm">
                <div className="p-4 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-default)]">
                  <h4 className="font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>{isEn ? 'Proportional Breathing Room' : 'فراغ نسبي مرن'}</span>
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {isEn 
                      ? 'The safety margin scales proportionally with the size of the logo in all digital and print layouts.'
                      : 'تتدرج المساحة الآمنة طردياً مع مقاس الشعار المستخدم في كافة التصاميم الرقمية والمطبوعة.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-default)]">
                  <h4 className="font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>{isEn ? 'No Competing Elements' : 'منع التداخل البصري'}</span>
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {isEn 
                      ? 'No typography, secondary logos, badges, or heavy graphic lines should intrude within the clear space area.'
                      : 'يُحظر وضع نصوص أو شعارات أخرى أو خطوط هندسية قاطعة داخل نطاق المساحة الآمنة.'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 07 & 08 — CORRECT & INCORRECT USAGE */}
        {/* ======================================================== */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
              {isEn ? 'Usage Guidelines' : 'إرشادات الاستخدام'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {isEn ? 'Approved & Prohibited Usage' : 'الاستخدام الصحيح والممارسات الخاطئة'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              {isEn 
                ? 'Follow these rules to maintain the authority and prestige of the NmoLabs brand.'
                : 'اتبع هذه التوجيهات للحفاظ على هيبة ومكانة وهوية نمو لابز الرسمية.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Correct Usage Column */}
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-lg mb-6 pb-3 border-b border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
                <span>{isEn ? 'Correct Usage (Recommended)' : 'الاستخدام الصحيح (المعتمد)'}</span>
              </div>

              <div className="space-y-4">
                {correctRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--border-default)] shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] mb-0.5">
                        {isEn ? rule.titleEn : rule.titleAr}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[var(--text-secondary)] leading-relaxed">
                        {isEn ? rule.descEn : rule.descAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incorrect Usage Column */}
            <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-lg mb-6 pb-3 border-b border-rose-500/20">
                <XCircle className="w-5 h-5" />
                <span>{isEn ? 'Incorrect Usage (Prohibited)' : 'استخدامات غير صحيحة (ممنوعة)'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {incorrectRules.map((rule) => (
                  <div key={rule.id} className="bg-[var(--surface-primary)] p-4 rounded-xl border border-[var(--border-default)] shadow-xs flex flex-col justify-between">
                    {/* Distorted Preview Box */}
                    <div className="h-28 rounded-lg bg-[var(--surface-secondary)] border border-rose-500/20 mb-3 flex items-center justify-center p-3 overflow-hidden relative">
                      <span className="absolute top-1.5 right-1.5 z-10 w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ✕
                      </span>
                      <img 
                        src={officialPrimaryPng} 
                        alt="Prohibited Usage Example"
                        className={`max-h-full max-w-full object-contain pointer-events-none transition-all ${rule.style}`}
                      />
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1 flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                        <span>✕</span>
                        <span>{isEn ? rule.titleEn : rule.titleAr}</span>
                      </h4>
                      <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                        {isEn ? rule.descEn : rule.descAr}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 09 — FILE FORMATS GUIDE */}
        {/* ======================================================== */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-1">
              {isEn ? 'Formats Guidance' : 'دليل الصيغ'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {isEn ? 'Choose the Right File Format' : 'اختر الصيغة المناسبة لاستخدامك'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PNG Guide */}
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-sm">
                  PNG
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {isEn ? 'PNG (Raster with Transparency)' : 'PNG (صيغة نقطية بخلفية شفافة)'}
                  </h3>
                  <span className="text-xs text-emerald-500 font-semibold">{isEn ? 'Available for Download' : 'متوفر للتحميل المباشر'}</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  <span>{isEn ? 'Best for digital presentations (PowerPoint, Keynote, Google Slides)' : 'مثالي للعروض التقديمية وملفات الشركات'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  <span>{isEn ? 'Social media posts, headers, and video watermarks' : 'منشورات منصات التواصل الاجتماعي وبطاقات الفيديو'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                  <span>{isEn ? 'Standard web pages, email signatures, and documents' : 'صفحات الويب، التواقيع البريدية والمستندات'}</span>
                </li>
              </ul>
            </div>

            {/* SVG Guide */}
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-sm">
                  SVG
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--text-primary)]">
                    {isEn ? 'SVG (Scalable Vector Graphics)' : 'SVG (صيغة شعاعية غير محدودة الدقة)'}
                  </h3>
                  <span className="text-xs text-[var(--text-muted)] font-medium">{isEn ? 'Master Vector Standard' : 'المعيار المتجهي للتطبيقات'}</span>
                </div>
              </div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{isEn ? 'Infinite scaling without pixelation or quality loss' : 'تكبير لا نهائي دون فقدان الدقة أو ظهور بكسلة'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{isEn ? 'Direct integration into UI code, web apps, and native apps' : 'دمج مباشر في واجهات برمجة التطبيقات والمواقع'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{isEn ? 'Large format printing, signage, and merchandise' : 'الطباعة الإعلانية الكبيرة، اللوحات والمنتجات'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 10 — BRAND ASSET PACKAGE BANNER */}
        {/* ======================================================== */}
        <section className="rounded-3xl border border-[var(--interactive-border)] bg-gradient-to-br from-[var(--surface-primary)] via-[var(--surface-secondary)] to-[var(--surface-primary)] p-8 sm:p-12 shadow-lg relative overflow-hidden text-center sm:text-start">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[var(--color-primary)]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider block mb-2">
                {isEn ? 'All-in-One Download' : 'تحميل الحزمة الرسمية المجمعة'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-3">
                {isEn ? 'NmoLabs Official Brand Package' : 'حزمة أصول هوية نمو لابز الكاملة'}
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {isEn 
                  ? 'Get the master transparent PNGs in high resolution along with documentation in a clean static ZIP archive.'
                  : 'احصل على الملفات الماستر الأصلية عالية الدقة وإرشادات الاستخدام المعتمدة في ملف ZIP مضغوط وجاهز.'}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={officialZipPackage}
                download="NmoLabs-Brand-Assets.zip"
                onClick={() => handleDownloadNotify('ZIP Package')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold shadow-xl hover:bg-[var(--color-primary-hover)] hover:scale-105 transition-all active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>{isEn ? 'Download ZIP Package (5.8 MB)' : 'تحميل حزمة الهوية (5.8 ميجابايت)'}</span>
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
