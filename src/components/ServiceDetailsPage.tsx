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


const FlipPackageCard = ({ pkg, isEn, colorHex }: { pkg: any, isEn: boolean, colorHex: string, key?: any }) => {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div 
        className="relative w-full h-[280px] sm:h-[320px] rounded-3xl cursor-pointer group [perspective:1000px]"
        onClick={() => setFlipped(!flipped)}
      >
        <motion.div 
          className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
          animate={{ rotateY: flipped ? 180 : 0 }}
        >
          {/* Front */}
          <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
             <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-[60px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20 z-0" style={{ backgroundColor: colorHex }} />
             
             <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
               <div className="w-16 h-16 mb-6 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-default)] text-[var(--color-primary)] flex items-center justify-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:rotate-6 shadow-sm">
                 <CheckCircle2 size={32} />
               </div>
               <h3 className="text-xl sm:text-2xl font-black text-center text-[var(--text-primary)] leading-snug mb-2">
                 {isEn ? pkg.titleEn || pkg.title : pkg.title}
               </h3>
             </div>
             
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity z-10">
               <span className="text-xs sm:text-sm font-bold tracking-widest uppercase bg-[var(--surface-primary)] px-4 py-2 rounded-full border border-[var(--border-default)] shadow-sm">{isEn ? 'Click for Details' : 'انقر للتفاصيل'}</span>
             </div>
          </div>

          {/* Back */}
          <div 
            className="absolute inset-0 [backface-visibility:hidden] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-6 overflow-y-auto custom-scrollbar flex flex-col"
            style={{ transform: 'rotateY(180deg)' }}
          >
             <h4 className="text-lg font-bold mb-4 pb-3 border-b border-[var(--border-default)] sticky top-0 bg-[var(--surface-secondary)] z-10" style={{ color: colorHex }}>
               {isEn ? 'Package Details' : 'تفاصيل الباقة'}
             </h4>
             <ul className="space-y-4 flex-1">
               {(isEn ? pkg.detailsEn || pkg.details : pkg.details)?.map((item: any, idx: number) => (
                 <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                   <div className="w-2 h-2 mt-1.5 rounded-full shrink-0" style={{ backgroundColor: colorHex }} />
                   <div>
                     <strong className="text-[var(--text-primary)] block mb-1">{item.title}</strong>
                     <p className="leading-relaxed font-light">{item.desc}</p>
                   </div>
                 </li>
               ))}
             </ul>
             <div className="mt-4 pt-4 border-t border-[var(--border-default)]">
               <button className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1" style={{ backgroundColor: colorHex }} onClick={(e) => { e.stopPropagation(); triggerBookingModal(); }}>
                  {isEn ? 'Request Package' : 'طلب الباقة'}
                  {isEn ? <ArrowUpRight size={18} /> : <ArrowUpRight size={18} className="rotate-0" />}
               </button>
             </div>
          </div>
        </motion.div>
      </div>
      
      {/* Price shown separately below the card */}
      <div className="text-center px-4 py-3 bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl mt-2 mx-auto w-11/12">
        <span className="text-[var(--text-muted)] text-sm block mb-1">{isEn ? 'Price' : 'السعر'}</span>
        <strong className="text-[var(--color-primary)] text-lg font-bold">{isEn ? pkg.priceEn || pkg.price || 'Contact us' : pkg.price || 'تواصل معنا للتسعير'}</strong>
      </div>
    </div>
  );
};

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
    <article className="min-h-screen bg-[var(--surface-primary)] pt-28 pb-12 lg:pt-32 lg:pb-24">
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
          {service.image && (
            <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 relative border border-[var(--border-default)]">
              <img src={service.image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)]/80 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-16 h-16 md:w-20 md:h-20 bg-[var(--surface-primary)] backdrop-blur-md rounded-2xl flex items-center justify-center text-[var(--color-primary)] border border-[var(--border-default)] shadow-xl z-10">
                {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
              </div>
            </div>
          )}

          {!service.image && (
            <div className="flex items-center gap-4 mb-6 text-[var(--color-primary)]">
              {service.icon}
            </div>
          )}

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {service.packages ? service.packages.map((pkg: any, i: number) => (
                <FlipPackageCard key={i} pkg={pkg} isEn={isEn} colorHex="var(--color-primary)" />
              )) : deliverables.map((item, i) => (
                <FlipPackageCard key={i} pkg={{ title: item, price: 'تواصل معنا', details: [{ title: 'تفاصيل الباقة', desc: 'تواصل معنا للحصول على تفاصيل هذه الباقة.' }] }} isEn={isEn} colorHex="var(--color-primary)" />
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

        {service.pricing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-16">
            <div className="p-8 md:p-10 bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-10 blur-[50px] rounded-full pointer-events-none" />
              <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)] flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
                 {isEn ? service.pricing.titleEn || service.pricing.title : service.pricing.title}
              </h2>
              <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                {isEn ? service.pricing.descEn || service.pricing.desc : service.pricing.desc}
              </p>
              
              {((isEn ? service.pricing.itemsEn : service.pricing.items) || []).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {(isEn ? service.pricing.itemsEn || service.pricing.items : service.pricing.items)!.map((item, i) => (
                    <div key={i} className="group bg-[var(--surface-primary)] border border-[var(--border-default)] hover:border-[var(--color-primary)] p-6 md:p-8 rounded-3xl flex flex-col gap-4 transition-all duration-300 hover:shadow-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 relative z-10">
                        <h4 className="font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">{item.label}</h4>
                        <span className="font-bold text-lg text-[var(--color-primary)] whitespace-nowrap bg-[var(--surface-secondary)] px-4 py-1.5 rounded-full border border-[var(--border-default)]">{item.value}</span>
                      </div>
                      {item.desc && <p className="text-[var(--text-muted)] leading-relaxed relative z-10">{item.desc}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Integrated Packages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-[var(--text-primary)] flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] shadow-[0_0_8px_var(--color-primary)]" />
               {isEn ? 'Integrated Packages' : 'باقات متكاملة'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {servicesList.filter(s => ['ads-management', 'social-media', 'ui-ux', 'copywriting'].includes(s.id) && s.id !== service.id).map((s, i) => (
                <div key={i} className="group relative p-6 sm:p-8 rounded-3xl bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:border-[var(--color-primary)]/50 transition-all duration-500 hover:shadow-xl flex flex-col overflow-hidden min-h-[220px] cursor-pointer" onClick={() => { updateConfig({ currentRoute: 'services/' + s.id }); }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-primary)] pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-0 blur-[40px] rounded-full pointer-events-none transition-opacity group-hover:opacity-10 z-0" />
                  
                  <div className="flex items-start justify-between mb-6 z-10">
                    <div className="p-4 rounded-2xl transition-all duration-500 bg-[var(--surface-primary)] shadow-sm border border-[var(--border-default)] text-[var(--color-primary)] group-hover:text-[var(--text-primary)] group-hover:bg-[var(--color-primary)] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3">
                      {s.icon}
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-xl md:text-2xl text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 z-10 mb-4">{isEn ? s.titleEn : s.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-6 line-clamp-2 relative z-10 font-light">{isEn ? s.descEn : s.desc}</p>
                  
                  <div className="mt-auto z-10">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--border-default)] group-hover:via-[var(--color-primary)] to-transparent mb-4 transition-colors duration-500"></div>
                    <button className="flex items-center gap-2 text-[var(--color-primary)] group-hover:text-[var(--text-primary)] font-bold hover:gap-3 transition-all duration-300">
                      {isEn ? 'View Details' : 'تفاصيل أكثر'}
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </motion.div>
        
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
