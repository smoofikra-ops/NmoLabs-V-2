import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  ShoppingBag, 
  ExternalLink, 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp
} from 'lucide-react';
import { StorySceneContainer } from './StorySceneContainer';
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
    <StorySceneContainer
      id="story-ecommerce"
      bgUrl={STORY_ASSETS.STORY_03_ECOMMERCE}
      isEn={isEn}
    >
      {({ scrollYProgress, headerOpacity, headerY, isReducedMotion }) => (
        <>
          {/* Story Header */}
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>STORY 03 • {isEn ? 'E-Commerce Engineering' : 'إنشاء وتطوير المتاجر'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
              {isEn ? 'E-Commerce Stores Built for High Conversion' : 'إنشاء وتطوير المتاجر الإلكترونية'}
            </h2>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium">
              {isEn ? 'Real stores engineered for conversion, speed, and frictionless shopping.' : 'بدل أن نخبرك، نشاركك نماذج من المتاجر التي عملنا عليها.'}
            </p>
          </motion.div>

          {/* Scroll Sequenced Stores Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORES.map((store, index) => {
              const startRange = 0.1 + (index * 0.08);
              const endRange = Math.min(0.28 + (index * 0.08), 0.85);
              const xInitial = isReducedMotion ? 0 : (index % 2 === 0 ? 30 : -30);

              return (
                <StoreShowcaseCard
                  key={store.id}
                  store={store}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  startRange={startRange}
                  endRange={endRange}
                  xInitial={xInitial}
                  isEn={isEn}
                  isReducedMotion={isReducedMotion}
                  onSelect={() => {
                    if (store.slug) {
                      updateConfig({ currentRoute: `work/${store.slug}` });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      updateConfig({ currentRoute: 'work' });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
              );
            })}

            {/* CTA Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)]/88 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  {isEn ? 'Ready to Launch Your Store?' : 'جاهز لإطلاق متجرك القادم؟'}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {isEn 
                    ? 'We design, develop, integrate payment gateways, and optimize your store for maximum sales.'
                    : 'نصمم، نطور، نربط بوابات الدفع، ونهيئ متجرك لتحقيق أعلى عائد ومبيعات متزايدة.'
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
                <span>{isEn ? 'Explore E-Commerce Projects' : 'استكشف مشاريع التجارة الإلكترونية'}</span>
                {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
            </motion.div>
          </div>
        </>
      )}
    </StorySceneContainer>
  );
};

interface StoreCardProps {
  store: typeof STORES[0];
  index: number;
  scrollYProgress: any;
  startRange: number;
  endRange: number;
  xInitial: number;
  isEn: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
}

const StoreShowcaseCard: React.FC<StoreCardProps> = ({
  store,
  index,
  scrollYProgress,
  startRange,
  endRange,
  xInitial,
  isEn,
  isReducedMotion,
  onSelect
}) => {
  const opacity = useTransform(
    scrollYProgress,
    [startRange, endRange, 0.88, 0.98],
    [0, 1, 1, 0.2]
  );
  const y = useTransform(
    scrollYProgress,
    [startRange, endRange],
    isReducedMotion ? [0, 0] : [24, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [startRange, endRange],
    isReducedMotion ? [0, 0] : [xInitial, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [startRange, endRange],
    isReducedMotion ? [1, 1] : [0.95, 1]
  );

  return (
    <motion.div
      style={{ opacity, y, x, scale }}
      onClick={onSelect}
      className="group relative rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)]/90 backdrop-blur-md hover:border-[var(--color-primary)]/40 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
          <img 
            src={store.coverImage} 
            alt={store.nameAr}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-transparent to-black/20" />
          
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-xs">
              {store.domain}
            </span>
            <span className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center text-xs">
              0{index + 1}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 left-3">
            <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-md bg-[var(--surface-primary)]/90 backdrop-blur-sm text-[var(--color-primary)] border border-[var(--border-default)] shadow-xs">
              {isEn ? store.sectorEn : store.sectorAr}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center justify-between">
            <span>{isEn ? store.nameEn : store.nameAr}</span>
            {store.url && (
              <a 
                href={store.url} 
                target="_blank" 
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--text-muted)] hover:text-[var(--color-primary)] transition-colors p-1"
                title={store.domain}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
            {isEn ? store.highlightEn : store.highlightAr}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {store.tags.map((tag) => (
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
        <span>{isEn ? 'View Store Case' : 'استعراض تفاصيل المتجر'}</span>
        {isEn ? <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />}
      </div>
    </motion.div>
  );
};

