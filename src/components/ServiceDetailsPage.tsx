import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { triggerBookingModal } from './BookingModal';
import { servicesList } from '../data/services';
import { generateServiceSchema, siteMetadata } from '../lib/schemas';

interface Props {
  slug: string;
}

export const ServiceDetailsPage = ({ slug }: Props) => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const service = servicesList.find(s => s.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Service Not Found</h1>
        <button 
          onClick={() => updateConfig({ currentRoute: 'home' })}
          className="text-[var(--color-primary)] font-bold flex items-center gap-2"
        >
          {isEn ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          {isEn ? 'Back to Home' : 'العودة للرئيسية'}
        </button>
      </div>
    );
  }

  const title = isEn ? service.titleEn : service.title;
  const desc = isEn ? service.descEn : service.desc;
  const deliverables = isEn ? service.deliverablesEn : service.deliverables;

  // Use dynamic SEO metadata from the service, or fallback to default title/desc
  const seoTitle = service.seo?.title || `${title} | ${siteMetadata.siteName}`;
  const seoDesc = service.seo?.description || desc;
  const ogTitle = service.seo?.ogTitle || seoTitle;
  const ogDesc = service.seo?.ogDescription || seoDesc;
  const canonicalUrl = `${siteMetadata.url}/services/${slug}`;

  // Generate Service Schema without pricing/guarantees using the strict generator
  const serviceSchema = generateServiceSchema(title, desc, `/services/${slug}`);

  return (
    <article className="min-h-screen bg-[var(--surface-primary)] pt-32 pb-24 lg:pt-40 lg:pb-32">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteMetadata.siteName} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        
        <meta name="robots" content="index, follow" />

        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <button 
          onClick={() => updateConfig({ currentRoute: 'home' })}
          className={`font-bold flex items-center gap-2 mb-12 transition-colors w-fit text-[var(--text-primary)] hover:opacity-70`}
        >
          {isEn ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
          {isEn ? 'Back to Home' : 'العودة للرئيسية'}
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="flex items-center gap-4 mb-6 text-[var(--color-primary)]">
            {service.icon}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tight leading-[1.1]">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-muted)] leading-relaxed font-light">
            {desc}
          </p>
        </motion.div>

        {deliverables && deliverables.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)] flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
               {isEn ? 'What we deliver' : 'ماذا نقدم في هذه الخدمة؟'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-[var(--text-primary)] bg-[var(--surface-secondary)] border border-[var(--border-default)] p-4 rounded-xl shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)] shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {service.journey && service.journey.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
             <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)] flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[var(--color-secondary)] shadow-[0_0_8px_var(--color-secondary)]" />
               {isEn ? 'Our Approach' : 'منهجية العمل'}
            </h2>
            <div className="space-y-6">
              {service.journey.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--surface-secondary)] border border-[var(--color-secondary)] text-[var(--text-primary)] flex items-center justify-center font-bold text-sm z-10 shrink-0">
                      {i + 1}
                    </div>
                    {i < service.journey!.length - 1 && <div className="w-px h-full bg-[var(--border-default)] my-2"></div>}
                  </div>
                  <div className="pb-6 pt-1">
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{step.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 md:p-12 bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl text-center shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
           <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">{isEn ? 'Ready to Start?' : 'مستعد للبدء؟'}</h3>
           <p className="text-[var(--text-muted)] mb-8 text-lg max-w-2xl mx-auto">
             {isEn ? 'Let us help you achieve sustainable growth with tailored solutions.' : 'دعنا نساعدك في تحقيق نمو مستدام من خلال حلول مصممة خصيصاً لاحتياجاتك.'}
           </p>
           <button 
              className="mx-auto flex items-center justify-center gap-2 text-[var(--text-primary)] font-bold py-4 px-10 rounded-xl transition-all shadow-[0_0_15px_rgba(79,142,247,0.3)] hover:shadow-[0_0_25px_rgba(79,142,247,0.5)] transform hover:scale-105"
              style={{ backgroundColor: config.primaryColor }}
              onClick={() => updateConfig({ currentRoute: 'start-project' })}
            >
              {isEn ? 'Start Your Project' : 'ابدأ مشروعك'}
              <ArrowUpRight size={20} />
            </button>
        </motion.div>
      </div>
    </article>
  );
};
