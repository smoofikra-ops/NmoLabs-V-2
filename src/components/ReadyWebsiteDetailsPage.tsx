import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpLeft, ArrowRight, CheckCircle2, ExternalLink, Globe2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { findReadyWebsite } from '../data/readyWebsites';
import { getWhatsAppUrl } from '../lib/utils';

export const ReadyWebsiteDetailsPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { config, updateConfig } = useSite();
  const site = findReadyWebsite(slug);
  if (!site) return <main className="min-h-screen pt-36 text-center text-[var(--text-primary)]"><h1 className="text-3xl font-bold">الموقع غير موجود</h1><button onClick={() => updateConfig({ currentRoute: 'ready-websites' })} className="mt-8 underline">جميع المواقع الجاهزة</button></main>;
  const isEn = config.language === 'en';
  const name = isEn ? site.nameEn : site.nameAr;
  const title = isEn ? `${site.nameEn} | Ready-Made Website | NmoLabs` : `تصميم ${site.nameAr} | موقع جاهز قابل للتخصيص | نمو لابز`;
  const description = isEn ? site.descriptionEn : site.descriptionAr;
  const canonical = `https://www.nmolabs.com/ready-websites/${site.slug}`;
  const contactUrl = getWhatsAppUrl(config.contactNumber, `مرحبًا نمو لابز، أرغب في الاستفسار عن تخصيص موقع ${site.nameAr} (المعاينة: ${site.previewUrl}).`);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
    inLanguage: isEn ? 'en' : 'ar',
    isPartOf: { '@type': 'WebSite', name: 'NmoLabs', url: 'https://www.nmolabs.com' },
    about: { '@type': 'Service', name: site.nameAr, serviceType: 'Website development and customization', provider: { '@type': 'Organization', name: 'NmoLabs' } }
  };
  return <main className="relative z-10 min-h-screen pt-28 sm:pt-36 pb-24 text-[var(--text-primary)]" dir={isEn ? 'ltr' : 'rtl'}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <link rel="canonical" href={canonical} />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <button onClick={() => updateConfig({ currentRoute: 'ready-websites' })} className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] font-bold mb-8 hover:underline"><ArrowRight size={18}/>{isEn ? 'All ready-made websites' : 'جميع المواقع الجاهزة'}</button>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-primary)]/80 text-sm mb-6"><Globe2 size={16}/>{isEn ? site.sectorEn : site.sectorAr}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">{name}</h1>
          <p className="text-xl text-[var(--color-secondary)] font-bold mb-5">{isEn ? site.taglineEn : site.taglineAr}</p>
          <p className="text-[var(--text-secondary)] leading-9 mb-8">{description}</p>
          <div className="flex flex-wrap gap-3">
            <a href={site.previewUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--color-primary)] text-white font-bold px-7 py-4 inline-flex items-center gap-2">{isEn ? 'Live preview' : 'معاينة الموقع الفعلي'}<ExternalLink size={17}/></a>
            <a href={contactUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] font-bold px-7 py-4">{isEn ? 'Request customization' : 'اطلب تخصيص الموقع'}</a>
          </div>
        </div>
        <div className="rounded-[2rem] border border-[var(--border-default)] bg-[var(--surface-primary)]/75 overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--border-default)]"><span className="h-2.5 w-2.5 rounded-full bg-rose-400"/><span className="h-2.5 w-2.5 rounded-full bg-amber-400"/><span className="h-2.5 w-2.5 rounded-full bg-emerald-400"/><span className="text-xs truncate text-[var(--text-secondary)] ml-3" dir="ltr">{site.previewUrl.replace('https://','')}</span></div>
          {site.screenshotUrl ? <img src={site.screenshotUrl} alt={`معاينة واجهة ${site.nameAr}`} className="w-full aspect-[16/10] object-cover object-top" loading="lazy"/> : <div className="aspect-[16/10] flex flex-col items-center justify-center gap-5 p-8 text-center bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)]"><Globe2 size={64} className="text-[var(--color-secondary)]"/><p className="text-xl font-bold">{name}</p><p className="text-sm text-[var(--text-secondary)]">{isEn ? 'Open the live website to view its current design' : 'افتح الموقع الفعلي لمشاهدة أحدث تصميم'}</p><a className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold" href={site.previewUrl} target="_blank" rel="noopener noreferrer">{isEn ? 'Open website' : 'فتح الموقع'}<ArrowUpLeft size={17}/></a></div>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <section className="rounded-[2rem] bg-[var(--surface-primary)]/80 border border-[var(--border-default)] p-7 sm:p-9"><h2 className="text-2xl font-black mb-6">{isEn ? 'Who is it for?' : 'لمن يناسب هذا الموقع؟'}</h2><ul className="space-y-4">{site.audienceAr.map(item => <li className="flex items-start gap-3" key={item}><CheckCircle2 size={20} className="shrink-0 text-[var(--color-secondary)] mt-1"/>{item}</li>)}</ul></section>
        <section className="rounded-[2rem] bg-[var(--surface-primary)]/80 border border-[var(--border-default)] p-7 sm:p-9"><h2 className="text-2xl font-black mb-6">{isEn ? 'Key advantages' : 'مميزات النموذج'}</h2><ul className="space-y-4">{site.benefitsAr.map(item => <li className="flex items-start gap-3" key={item}><CheckCircle2 size={20} className="shrink-0 text-[var(--color-secondary)] mt-1"/>{item}</li>)}</ul></section>
      </div>
      <section className="rounded-[2rem] border border-[var(--border-default)] bg-[var(--surface-primary)]/80 p-7 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-black mb-4">{isEn ? 'See packages and next steps' : 'التسعير وخطوات إطلاق موقعك'}</h2>
        <p className="text-[var(--text-secondary)] leading-8 max-w-3xl mx-auto mb-7">{isEn ? 'Review the general business website packages and discuss a tailored quotation for commerce or publishing functionality.' : 'راجع باقات المواقع التعريفية في الصفحة الرئيسية. المتاجر والمنصات المتخصصة تُسعّر بعد تحديد الوظائف والتكاملات المطلوبة، ولا يُفترض شمولها تلقائيًا في الباقات العامة.'}</p>
        <button onClick={() => updateConfig({ currentRoute: 'ready-websites' })} className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] text-white px-8 py-4 font-bold">{isEn ? 'Explore website packages' : 'استعرض الباقات والمواقع'}<ArrowUpLeft size={18}/></button>
      </section>
    </div>
  </main>;
};
