import React from 'react';
import { useSite } from '../../context/SiteContext';
import { 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  Monitor, 
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { PinnedStoryScene } from './PinnedStoryScene';
import { STORY_ASSETS } from './storyAssets';
import { CinematicStageContainer, CinematicCardWrapper } from './VerticalCinematicStage';

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
  const totalCount = WEBSITES.length + 1;

  return (
    <PinnedStoryScene
      id="story-websites"
      bgUrl={STORY_ASSETS.STORY_04_WEBSITES}
      badge={{
        icon: Globe,
        textAr: 'STORY 04 • المواقع والمنصات الرقمية',
        textEn: 'STORY 04 • Websites & Digital Platforms'
      }}
      titleAr="مواقع ومنصات رقمية تُمثل حضورك القيادي"
      titleEn="Enterprise Websites & Corporate Platforms"
      subtitleAr="نُصمم بوابات مؤسسية فائقة السرعة، متوافقة مع محركات البحث، وتعكس هوية علامتك باحترافية."
      subtitleEn="We engineer ultra-fast, SEO-optimized digital platforms that position your brand as an industry authority."
      itemCount={totalCount}
      isEn={isEn}
      scrollMultiplier={2.6}
    >
      {({ activeProgress, isReducedMotion }) => (
        <CinematicStageContainer>
          {WEBSITES.map((site, index) => (
            <CinematicCardWrapper
              key={site.id}
              index={index}
              totalItems={totalCount}
              activeProgress={activeProgress}
              isReducedMotion={isReducedMotion}
              onClick={() => {
                updateConfig({ currentRoute: 'work' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="card-depth-2 w-full rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/95 backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer flex flex-col sm:flex-row overflow-hidden group">
                
                {/* Visual Cover Header */}
                <div className="relative w-full sm:w-2/5 h-36 sm:h-auto min-h-[140px] overflow-hidden bg-[var(--surface-secondary)] shrink-0">
                  <img 
                    src={site.coverImage} 
                    alt={isEn ? site.titleEn : site.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-transparent to-transparent rtl:sm:bg-gradient-to-l" />
                  
                  <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold border border-white/15 font-mono">
                    {site.domain}
                  </div>

                  <div className="absolute bottom-3 right-3 rtl:right-3 rtl:left-auto px-2.5 py-0.5 rounded-md bg-[var(--surface-primary)]/95 text-[var(--color-primary)] text-[11px] font-bold border border-[var(--border-default)]">
                    {isEn ? site.sectorEn : site.sectorAr}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] font-mono">
                        0{index + 1} / 0{totalCount}
                      </span>
                      <span className="flex items-center gap-1 text-[var(--color-primary)] font-semibold text-xs">
                        <Sparkles className="w-3 h-3" />
                        <span>{isEn ? 'Live Platform' : 'منصة نشطة'}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--color-primary)] transition-colors">
                      {isEn ? site.titleEn : site.titleAr}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3 font-normal line-clamp-2">
                      {isEn ? site.highlightEn : site.highlightAr}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {site.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border-default)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Monitor className="w-3.5 h-3.5 text-blue-500" />
                      <span>{isEn ? 'Engineered for Performance' : 'سرعة وأداء واستقرار'}</span>
                    </span>

                    <span className="text-[var(--color-primary)] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      <span>{isEn ? 'View Platform Details' : 'تفاصيل المنصة'}</span>
                      {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>
              </div>
            </CinematicCardWrapper>
          ))}

          {/* Final CTA Card */}
          <CinematicCardWrapper
            index={WEBSITES.length}
            totalItems={totalCount}
            activeProgress={activeProgress}
            isReducedMotion={isReducedMotion}
            onClick={() => {
              updateConfig({ currentRoute: 'work' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-depth-3 w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed border-blue-500/50 hover:border-blue-500 bg-[var(--surface-primary)]/95 backdrop-blur-xl flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="my-auto py-2 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1 font-mono">
                  Websites & Portals
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                  {isEn ? 'View All Platforms & Websites' : 'استكشف كافة المواقع'}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed mb-5 font-medium">
                  {isEn 
                    ? 'Explore enterprise websites, corporate portals, and brand architectures built for digital authority.'
                    : 'استعرض بوابات الشركات، المنصات التعريفية، والمشاريع الرقمية المنفذة بدقة هندسية عالية.'}
                </p>

                <button
                  className="px-6 py-2.5 sm:py-3 rounded-full bg-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'Explore All Portals' : 'عرض كافة المنصات'}</span>
                  {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                </button>
              </div>

              <div className="w-full pt-3 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                <span>{isEn ? 'High-Performance & SEO Authority' : 'هندسة معتمدة لتصدر نتائج البحث'}</span>
              </div>
            </div>
          </CinematicCardWrapper>
        </CinematicStageContainer>
      )}
    </PinnedStoryScene>
  );
};
