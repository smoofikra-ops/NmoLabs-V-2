import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  Globe, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  Monitor, 
  Shield, 
  Sparkles,
  Layers,
  CheckCircle
} from 'lucide-react';

const WEBSITES = [
  {
    id: 'eventlive',
    slug: 'eventlive',
    titleAr: 'EventLive KSA — إيفنت لايف',
    titleEn: 'EventLive KSA',
    domain: 'eventliveksa.com',
    url: 'https://eventliveksa.com',
    sectorAr: 'الإنتاج الإعلامي وتغطية الفعاليات والمؤتمرات',
    sectorEn: 'Media Production & Event Coverage',
    highlightAr: 'تصميم بصري سينمائي يركز على استعراض الفيديو، معرض التغطيات الحية، وتسهيل حجز الخدمات.',
    highlightEn: 'Cinematic visual experience showcasing live streaming, event archives, and quick booking.',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=900',
    tags: ['عرض بصري غامر', 'تجاوب فائق', 'بث وميديا']
  },
  {
    id: 'al-mithali',
    slug: 'almethali',
    titleAr: 'المثالي للدعاية والإعلان',
    titleEn: 'Al-Mithali Advertising',
    domain: 'almethaliadv.com',
    url: 'https://almethaliadv.com',
    sectorAr: 'الدعاية والإعلان والطباعة الرقمية والمعارض',
    sectorEn: 'Advertising, Print & Booth Fabrication',
    highlightAr: 'تقسيم هيكلي شامل للخدمات، طلب عروض الأسعار، ومعرض منظم للمشاريع المنفذة.',
    highlightEn: 'Structured service catalog, instant RFQ workflow, and high-res portfolio showcase.',
    coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=900',
    tags: ['معرض أعمال', 'طلب تسعير فوري', 'تصنيفات تفصيلية']
  },
  {
    id: 'rayat-najd-fences',
    slug: 'rayat-najd',
    titleAr: 'شبوك رايات نجد',
    titleEn: 'Rayat Najd Fences',
    domain: 'rayatnajd-fences.com',
    url: '',
    sectorAr: 'توريد وتنفيذ الشبوك والأسوار الأمنية والمزارع',
    sectorEn: 'Security Fencing & Farm Boundaries',
    highlightAr: 'موقع تعريفي يبرز المواصفات الهندسية، المشاريع المنجزة، وحاسبة التقدير التقديرية.',
    highlightEn: 'Spec-heavy corporate portal showing completed installations and quote estimators.',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=900',
    tags: ['مشاريع هندسية', 'كتالوج المواصفات', 'تواصل مباشر']
  },
  {
    id: 'rayat-najd-afforestation',
    slug: 'rayatnajd',
    titleAr: 'رايات نجد للتشجير والاستدامة',
    titleEn: 'Rayat Najd Afforestation & Sustainability',
    domain: 'rayatnajd.com',
    url: 'https://rayatnajd.com',
    sectorAr: 'المشاريع البيئية، المشاتل، ومبادرات التشجير',
    sectorEn: 'Environmental, Nurseries & Sustainability',
    highlightAr: 'بوابة مؤسسية متكاملة تضم مركز المعرفة، المقالات المتخصصة، واستعراض المبادرات الوطنية.',
    highlightEn: 'Corporate knowledge hub, sustainability initiatives showcase, and enterprise credibility.',
    coverImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=900',
    tags: ['مركز المعرفة', 'تحسين محركات البحث', 'استدامة وبيئة']
  },
  {
    id: 'rawafid-al-janoub',
    slug: 'rawafid-al-janoub',
    titleAr: 'روافد الجنوب',
    titleEn: 'Rawafid Al Janoub',
    domain: 'rawafidaljanoub.com',
    url: '',
    sectorAr: 'المجموعات التجارية والمنتجات الغذائية المتنوعة',
    sectorEn: 'Commercial Holding & FMCG',
    highlightAr: 'واجهة تعريفية وترويجية لخطوط الإنتاج والتوزيع والعلامات التجارية التابعة.',
    highlightEn: 'Brand portfolio portal showcasing product lines, logistics and brand assets.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900',
    tags: ['بوابة مؤسسية', 'تعدد العلامات', 'شراكات وتوزيع']
  }
];

export const StoryWebsites: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);

  return (
    <section 
      ref={containerRef} 
      id="story-websites" 
      className="relative py-20 lg:py-28 overflow-hidden bg-[var(--surface-primary)] border-b border-[var(--border-default)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Header */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>STORY 03 • {isEn ? 'Platforms & Websites' : 'المواقع والمنصات التعريفية'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
            {isEn ? 'Websites & Digital Platforms that Build Trust' : 'إنشاء وتطوير المواقع والمنصات الرقمية'}
          </h2>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] font-medium">
            {isEn ? 'High-impact corporate portals and platforms that reflect credibility and brand authority.' : 'واجهات تعريفية ومنصات مصممة لبناء الثقة وعكس قوة أعمالك أمام العملاء والشركاء.'}
          </p>
        </motion.div>

        {/* Scroll Sequenced Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WEBSITES.map((site, index) => {
            const startRange = 0.1 + (index * 0.1);
            const endRange = Math.min(0.3 + (index * 0.1), 0.9);
            const xInitial = index % 2 === 0 ? 30 : -30;

            return (
              <WebsiteCard
                key={site.id}
                site={site}
                index={index}
                scrollYProgress={scrollYProgress}
                startRange={startRange}
                endRange={endRange}
                xInitial={xInitial}
                isEn={isEn}
                onSelect={() => {
                  if (site.slug) {
                    updateConfig({ currentRoute: `work/${site.slug}` });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    updateConfig({ currentRoute: 'work' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            );
          })}

          {/* 6th Slot CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[var(--border-default)] bg-gradient-to-br from-[var(--surface-secondary)] to-[var(--surface-tertiary)] p-6 sm:p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                {isEn ? 'Explore All Selected Works' : 'شاهد كافة الأعمال المنفذة'}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                {isEn 
                  ? 'Browse our complete catalog of corporate websites, apps, and bespoke platforms.'
                  : 'تصفح قائمة المشاريع الكاملة والحلول الرقمية التي بنيناها لعملائنا في مختلف القطاعات.'
                }
              </p>
            </div>

            <button
              onClick={() => {
                updateConfig({ currentRoute: 'work' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-95 shadow-md transition-opacity"
            >
              <span>{isEn ? 'View Our Work' : 'شاهد أعمالنا'}</span>
              {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

interface WebsiteCardProps {
  site: typeof WEBSITES[0];
  index: number;
  scrollYProgress: any;
  startRange: number;
  endRange: number;
  xInitial: number;
  isEn: boolean;
  onSelect: () => void;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({
  site,
  index,
  scrollYProgress,
  startRange,
  endRange,
  xInitial,
  isEn,
  onSelect
}) => {
  const opacity = useTransform(scrollYProgress, [startRange, endRange], [0, 1]);
  const y = useTransform(scrollYProgress, [startRange, endRange], [24, 0]);
  const x = useTransform(scrollYProgress, [startRange, endRange], [xInitial, 0]);
  const scale = useTransform(scrollYProgress, [startRange, endRange], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, y, x, scale }}
      onClick={onSelect}
      className="group relative rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img 
            src={site.coverImage} 
            alt={site.titleAr}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-transparent to-black/20" />
          
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-xs">
              {site.domain}
            </span>
            <span className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center text-xs">
              0{index + 1}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 left-3">
            <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-md bg-[var(--surface-primary)]/90 backdrop-blur-sm text-[var(--color-primary)] border border-[var(--border-default)] shadow-xs">
              {isEn ? site.sectorEn : site.sectorAr}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center justify-between">
            <span>{isEn ? site.titleEn : site.titleAr}</span>
            {site.url && (
              <a 
                href={site.url} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors p-1"
                title={site.domain}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
            {isEn ? site.highlightEn : site.highlightAr}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {site.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 sm:px-6 py-3 border-t border-[var(--border-default)]/60 bg-[var(--surface-secondary)]/50 flex items-center justify-between text-xs font-bold text-[var(--color-primary)]">
        <span>{isEn ? 'View Platform Case' : 'استعراض تفاصيل الموقع'}</span>
        {isEn ? <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />}
      </div>
    </motion.div>
  );
};
