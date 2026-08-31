import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  Globe, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  Monitor,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { PinnedStoryScene } from './PinnedStoryScene';
import { STORY_ASSETS } from './storyAssets';

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
    color: '#0F62FE',
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
    color: '#06B6D4',
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
    color: '#10B981',
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
    color: '#8B5CF6',
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
    color: '#EC4899',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900',
    tags: ['بوابة مؤسسية', 'تعدد العلامات', 'شراكات وتوزيع']
  }
];

export const StoryWebsites: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  return (
    <PinnedStoryScene
      id="story-websites"
      bgUrl={STORY_ASSETS.STORY_04_WEBSITES}
      badge={{
        icon: Globe,
        textAr: 'STORY 04 • المواقع والمنصات المؤسسية',
        textEn: 'STORY 04 • Corporate Websites & Platforms'
      }}
      titleAr="مواقع تعريفية وبوابات أعمال ترفع مصداقية علامتك"
      titleEn="Enterprise Portals & Brand Flagships"
      subtitleAr="نصمم واجهات رقمية متقدمة تبرز قوة شركتك، تصنع الثقة، وتولد عملاء نوعيين."
      subtitleEn="We create cutting-edge corporate experiences that build authority and generate qualified leads."
      itemCount={WEBSITES.length + 1}
      isEn={isEn}
      scrollMultiplier={2.5}
    >
      {({ trackX, trackRef, activeProgress, isReducedMotion }) => (
        <div className="w-full px-4 sm:px-8">
          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="flex flex-row flex-nowrap items-stretch gap-4 sm:gap-6 will-change-transform py-3"
          >
            {WEBSITES.map((site, index) => (
              <WebsiteStoryCard
                key={site.id}
                website={site}
                index={index}
                totalItems={WEBSITES.length + 1}
                activeProgress={activeProgress}
                isEn={isEn}
                isReducedMotion={isReducedMotion}
                onSelect={() => {
                  updateConfig({ currentRoute: 'work' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}

            {/* Final CTA Card */}
            <div className="w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 flex">
              <div
                onClick={() => {
                  updateConfig({ currentRoute: 'work' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card-depth-2 w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-primary)]/40 hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/90 backdrop-blur-md flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-md hover:shadow-xl relative overflow-hidden"
              >
                <div className="my-auto py-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                    <Monitor className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 font-mono">
                    Platforms
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                    {isEn ? 'Explore All Websites' : 'استكشف كافة المواقع'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-[260px] leading-relaxed mb-6 font-medium">
                    {isEn 
                      ? 'View our full portfolio of enterprise portals, web apps, and digital platforms.'
                      : 'استعرض سجل مشاريع البوابات المؤسسية، المنصات التفاعلية، وتجارب الويب المتقدمة.'}
                  </p>

                  <button
                    className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-[var(--color-primary)]/90 transition-colors"
                  >
                    <span>{isEn ? 'View All Platforms' : 'عرض كافة البوابات'}</span>
                    {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                  </button>
                </div>

                <div className="w-full pt-4 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                  <span>{isEn ? 'Enterprise SEO & Performance' : 'سرعة وأداء متوافق مع SEO'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PinnedStoryScene>
  );
};

interface WebsiteCardProps {
  website: typeof WEBSITES[0];
  index: number;
  totalItems: number;
  activeProgress: any;
  isEn: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
}

const WebsiteStoryCard: React.FC<WebsiteCardProps> = ({
  website,
  index,
  totalItems,
  activeProgress,
  isEn,
  isReducedMotion,
  onSelect
}) => {
  const cardScale = useTransform(
    activeProgress,
    [index - 1.2, index, index + 1.2],
    isReducedMotion ? [1, 1, 1] : [0.95, 1.02, 0.95]
  );

  const cardOpacity = useTransform(
    activeProgress,
    [index - 1.8, index - 0.2, index, index + 0.2, index + 1.8],
    [0.7, 0.95, 1, 0.95, 0.7]
  );

  return (
    <motion.div
      style={{
        scale: cardScale,
        opacity: cardOpacity
      }}
      onClick={onSelect}
      className="w-[85vw] sm:w-[340px] md:w-[360px] lg:w-[380px] shrink-0 flex"
    >
      <div className="card-depth-2 w-full rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/92 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between group overflow-hidden">
        
        {/* Cover Media Header */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[var(--surface-secondary)]">
          <img 
            src={website.coverImage} 
            alt={isEn ? website.titleEn : website.titleAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-transparent to-black/30" />
          
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/10 font-mono">
            {website.domain}
          </div>

          <div className="absolute bottom-3 right-3 rtl:right-3 rtl:left-auto px-2.5 py-1 rounded-md bg-[var(--surface-primary)]/95 text-[var(--color-primary)] text-xs font-bold border border-[var(--border-default)]">
            {isEn ? website.sectorEn : website.sectorAr}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {isEn ? website.titleEn : website.titleAr}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-normal">
              {isEn ? website.highlightEn : website.highlightAr}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {website.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx}
                  className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border-default)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
            <span className="flex items-center gap-1 text-[var(--color-primary)] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Live Platform' : 'بوابة نشطة'}</span>
            </span>

            <span className="text-[var(--color-primary)] font-bold flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
              <span>{isEn ? 'View Website' : 'تفاصيل المنصة'}</span>
              {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
