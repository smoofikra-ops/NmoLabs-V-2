import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  ShoppingBag, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp,
  Sparkles,
  Layers
} from 'lucide-react';
import { PinnedStoryScene } from './PinnedStoryScene';
import { STORY_ASSETS } from './storyAssets';

const STORES = [
  {
    id: 'rejeen',
    slug: 'regine',
    nameAr: 'ريجين — Rejeen',
    nameEn: 'Rejeen',
    domain: 'regine-sa.com',
    url: 'https://regine-sa.com/',
    sectorAr: 'العناية والتجميل الفاخر',
    sectorEn: 'Beauty & Skincare',
    highlightAr: 'تصميم تجربة مستخدم تركز على سرعة التحويل والشراء بنقرة واحدة.',
    highlightEn: 'Conversion-optimized UX with frictionless 1-click checkout flow.',
    color: '#D97706',
    coverImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=900',
    tags: ['متجر متكامل', 'بوابات دفع فورية', 'تجربة جوال فائقة']
  },
  {
    id: 'thalathat-alyawm',
    slug: 'thulth-al-youm',
    nameAr: 'ثلاثة اليوم',
    nameEn: 'Thalathat Alyawm',
    domain: 'thulthalyawm.com',
    url: '',
    sectorAr: 'المفروشات ومنتجات النوم والراحة',
    sectorEn: 'Luxury Home & Sleep Comfort',
    highlightAr: 'عرض مرئي أنيق يبرز جودة الخامات وتفاصيل المنتجات بدقة.',
    highlightEn: 'High-end visual showcase emphasizing fabrics, craftsmanship & comfort.',
    color: '#3B82F6',
    coverImage: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=900',
    tags: ['كتالوج ديناميكي', 'فلترة متقدمة', 'عروض مجمعة']
  },
  {
    id: 'muscat-potato',
    slug: 'muscat-potato',
    nameAr: 'بطاطس مسقط',
    nameEn: 'Muscat Potato',
    domain: 'muscatpotato.com',
    url: '',
    sectorAr: 'الأغذية والمنتجات الاستهلاكية المبتكرة',
    sectorEn: 'Food & Gourmet Snacks',
    highlightAr: 'متجر سريع مصمم للشراء المتكرر وإدارة العروض والكميات.',
    highlightEn: 'Ultra-fast cart flow built for repeat orders and volume promotions.',
    color: '#EF4444',
    coverImage: 'https://images.unsplash.com/photo-1518015878880-555b542a4a18?auto=format&fit=crop&q=80&w=900',
    tags: ['طلبات سريعة', 'إدارة المخزون', 'تتبع الشحنات']
  },
  {
    id: 'istikana-tea',
    slug: 'rawafid-al-janoub',
    nameAr: 'شاي استكانة',
    nameEn: 'Istikana Tea',
    domain: 'istikanatea.com',
    url: '',
    sectorAr: 'الشاي المختص والمنتجات الغذائية',
    sectorEn: 'Specialty Tea & Beverages',
    highlightAr: 'هوية بصرية دافئة وتجربة تصفح سلسة لأصناف الشاي الفاخر.',
    highlightEn: 'Warm brand storytelling and seamless navigation for premium tea collections.',
    color: '#10B981',
    coverImage: 'https://images.unsplash.com/photo-1576092762791-dd9e2220c476?auto=format&fit=crop&q=80&w=900',
    tags: ['اشتراكات دورية', 'باقات هدايا', 'تقييمات موثقة']
  },
  {
    id: 'future-gate-networks',
    slug: 'network-gate',
    nameAr: 'بوابة المستقبل للشبكات',
    nameEn: 'Future Gate Networks',
    domain: 'futuregate-net.com',
    url: '',
    sectorAr: 'الشبكات والراوترات والأجهزة التقنية',
    sectorEn: 'Networking, 5G Routers & Tech',
    highlightAr: 'متجر إلكتروني للمواصفات الفنية المتقدمة والمقارنة بين الأجهزة.',
    highlightEn: 'Spec-driven technical catalog with smart hardware comparison.',
    color: '#6366F1',
    coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=900',
    tags: ['مواصفات تقنية', 'ضمان وصيانة', 'دعم B2B و B2C']
  }
];

export const StoryEcommerce: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  return (
    <PinnedStoryScene
      id="story-ecommerce"
      bgUrl={STORY_ASSETS.STORY_03_ECOMMERCE}
      badge={{
        icon: ShoppingBag,
        textAr: 'STORY 03 • المتاجر الإلكترونية والتجارة الرقمية',
        textEn: 'STORY 03 • E-Commerce & Digital Retail'
      }}
      titleAr="متاجر إلكترونية مصممة للتحويل ومضاعفة المبيعات"
      titleEn="High-Converting E-Commerce Flagships"
      subtitleAr="نبني تجارب تسوق سلسة وسريعة تجمع بين الهوية الفريدة ومعدلات الشراء العالية."
      subtitleEn="We engineer lightning-fast shopping experiences optimized for maximum checkout conversion."
      itemCount={STORES.length + 1}
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
            {STORES.map((store, index) => (
              <StoreStoryCard
                key={store.id}
                store={store}
                index={index}
                totalItems={STORES.length + 1}
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
                  <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2 font-mono">
                    Portfolio
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                    {isEn ? 'View All E-Commerce Work' : 'استكشف كافة المتاجر'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-[260px] leading-relaxed mb-6 font-medium">
                    {isEn 
                      ? 'Browse full store case studies, UI/UX designs, and revenue optimization results.'
                      : 'تصفح دراسات الحالة الكاملة، تصاميم واجهات المتاجر، ونتائج تحسين معدلات الشراء.'}
                  </p>

                  <button
                    className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-[var(--color-primary)]/90 transition-colors"
                  >
                    <span>{isEn ? 'Explore All Stores' : 'عرض كافة المتاجر'}</span>
                    {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                  </button>
                </div>

                <div className="w-full pt-4 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isEn ? 'Conversion Science & Speed' : 'هندسة تحويل وسرعة قياسية'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PinnedStoryScene>
  );
};

interface StoreCardProps {
  store: typeof STORES[0];
  index: number;
  totalItems: number;
  activeProgress: any;
  isEn: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
}

const StoreStoryCard: React.FC<StoreCardProps> = ({
  store,
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
            src={store.coverImage} 
            alt={isEn ? store.nameEn : store.nameAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-transparent to-black/30" />
          
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/10 font-mono">
            {store.domain}
          </div>

          <div className="absolute bottom-3 right-3 rtl:right-3 rtl:left-auto px-2.5 py-1 rounded-md bg-[var(--surface-primary)]/95 text-[var(--color-primary)] text-xs font-bold border border-[var(--border-default)]">
            {isEn ? store.sectorEn : store.sectorAr}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
              {isEn ? store.nameEn : store.nameAr}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-normal">
              {isEn ? store.highlightEn : store.highlightAr}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {store.tags.map((tag, tIdx) => (
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
              <span>{isEn ? 'Live Case Study' : 'مشروع نشط'}</span>
            </span>

            <span className="text-[var(--color-primary)] font-bold flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
              <span>{isEn ? 'View Store' : 'تفاصيل المشروع'}</span>
              {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
