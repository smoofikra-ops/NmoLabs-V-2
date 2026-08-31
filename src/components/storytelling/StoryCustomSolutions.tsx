import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  Cpu, 
  Layers, 
  Database, 
  Bot, 
  BarChart3, 
  Award, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  Code2,
  CheckCircle2
} from 'lucide-react';
import { PinnedStoryScene } from './PinnedStoryScene';
import { STORY_ASSETS } from './storyAssets';

const PRODUCTS = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    nameAr: 'النواة الرقمية — Nucleus',
    badge: 'Core Engine',
    descAr: 'المنظومة المركزية لربط العمليات وقواعد البيانات والتكاملات البرمجية.',
    descEn: 'Central core engine connecting processes, databases, and enterprise APIs.',
    specs: ['معمارية مفتوحة', 'معالجة فورية', 'تشفير عالي'],
    icon: Cpu,
    color: '#0F62FE',
    lightBg: 'bg-blue-50/90 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800/50',
    accentDot: 'bg-blue-500',
  },
  {
    id: 'nbos',
    name: 'NBOS',
    nameAr: 'نظام التشغيل — NBOS',
    badge: 'Business OS',
    descAr: 'نظام تشغيل الأعمال السحابي لإدارة المشاريع وفرق العمل ومؤشرات الأداء.',
    descEn: 'Cloud business operating system for project tracking and team execution.',
    specs: ['إدارة المهام', 'سير عمل مؤتمت', 'لوحات تحكم'],
    icon: Layers,
    color: '#06B6D4',
    lightBg: 'bg-cyan-50/90 dark:bg-cyan-950/30',
    borderColor: 'border-cyan-200 dark:border-cyan-800/50',
    accentDot: 'bg-cyan-500',
  },
  {
    id: 'nmo-erp',
    name: 'NMO ERP',
    nameAr: 'نظام الموارد — NMO ERP',
    badge: 'Enterprise ERP',
    descAr: 'تخطيط الموارد، المخزون، الحسابات، والفوترة الإلكترونية المعتمدة (ZATCA).',
    descEn: 'Enterprise resource planning, inventory, accounting, and certified e-invoicing.',
    specs: ['ربط ZATCA معتمد', 'إدارة سلاسل الإمداد', 'مزامنة فورية'],
    icon: Database,
    color: '#10B981',
    lightBg: 'bg-emerald-50/90 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    accentDot: 'bg-emerald-500',
  },
  {
    id: 'smart-seller',
    name: 'Smart Seller',
    nameAr: 'البائع الذكي — Smart Seller',
    badge: 'Sales Automation',
    descAr: 'وكيل بيع ذكي ومؤتمت لمساعدة العملاء، اقتراح السلات، وإتمام الطلبات.',
    descEn: 'Automated AI sales agent assisting buyers and closing transactions 24/7.',
    specs: ['محادثات ذكية', 'اقتراح منتجات مخصص', 'ربط سلات الشراء'],
    icon: Bot,
    color: '#8B5CF6',
    lightBg: 'bg-purple-50/90 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800/50',
    accentDot: 'bg-purple-500',
  },
  {
    id: 'store-intelligence',
    name: 'Store Intelligence',
    nameAr: 'ذكاء المتاجر — Store Intelligence',
    badge: 'Data & Analytics',
    descAr: 'تحليل سلوك الزوار، نقاط التسرب في مسار الشراء، وفرص النمو الفورية.',
    descEn: 'Visitor behavior diagnostics, checkout leak detection, and growth triggers.',
    specs: ['تتبع مسار العميل', 'تحليل معدل التحويل', 'تنبيهات فورية'],
    icon: BarChart3,
    color: '#F59E0B',
    lightBg: 'bg-amber-50/90 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    accentDot: 'bg-amber-500',
  },
  {
    id: 'ambassador-of-growth',
    name: 'Ambassador of Growth',
    nameAr: 'سفير النمو — Ambassador of Growth',
    badge: 'Loyalty & Affiliates',
    descAr: 'إدارة شبكات التسويق بالعمولة، سفراء العلامة، وحوافز المبيعات المؤتمتة.',
    descEn: 'Growth affiliate networks, brand ambassadors, and automated commission payouts.',
    specs: ['تتبع الإحالات', 'لوحة للمسوقين', 'حساب عمولات آلي'],
    icon: Award,
    color: '#EC4899',
    lightBg: 'bg-pink-50/90 dark:bg-pink-950/30',
    borderColor: 'border-pink-200 dark:border-pink-800/50',
    accentDot: 'bg-pink-500',
  },
  {
    id: 'ai-center',
    name: 'AI Center',
    nameAr: 'مركز الذكاء الاصطناعي — AI Center',
    badge: 'GenAI & Automation',
    descAr: 'محرك نماذج الذكاء الاصطناعي التوليدي والتحليلي المخصص لقطاع أعمالك.',
    descEn: 'Custom generative & predictive AI engine tailored to your business domain.',
    specs: ['توليد محتوى ذكي', 'أتمتة العمليات المعقدة', 'نماذج مخصصة'],
    icon: Sparkles,
    color: '#6366F1',
    lightBg: 'bg-indigo-50/90 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800/50',
    accentDot: 'bg-indigo-500',
  }
];

export const StoryCustomSolutions: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  return (
    <PinnedStoryScene
      id="story-solutions"
      bgUrl={STORY_ASSETS.STORY_02_SYSTEMS}
      badge={{
        icon: Code2,
        textAr: 'STORY 02 • الأنظمة والحلول الرقمية',
        textEn: 'STORY 02 • Custom Digital Solutions'
      }}
      titleAr="الأنظمة والتطبيقات والحلول الرقمية المخصصة"
      titleEn="Custom Systems, Apps & Digital Solutions"
      subtitleAr="نبني المنظومات البرمجية التي تمنح أعمالك الكفاءة والمرونة للنمو المستدام."
      subtitleEn="We engineer the exact software architectures that empower scalable business efficiency."
      itemCount={PRODUCTS.length + 1}
      isEn={isEn}
      scrollMultiplier={2.8}
    >
      {({ trackX, trackRef, activeProgress, isReducedMotion }) => (
        <div className="w-full px-4 sm:px-8">
          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="flex flex-row flex-nowrap items-stretch gap-4 sm:gap-6 will-change-transform py-3"
          >
            {PRODUCTS.map((prod, index) => {
              const Icon = prod.icon;
              return (
                <SystemStoryCard
                  key={prod.id}
                  product={prod}
                  icon={Icon}
                  index={index}
                  totalItems={PRODUCTS.length + 1}
                  activeProgress={activeProgress}
                  isEn={isEn}
                  isReducedMotion={isReducedMotion}
                  onSelect={() => {
                    updateConfig({ currentRoute: 'products' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              );
            })}

            {/* Final 8th CTA Card */}
            <div className="w-[85vw] sm:w-[360px] md:w-[380px] lg:w-[400px] shrink-0 flex">
              <div
                onClick={() => {
                  updateConfig({ currentRoute: 'products' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card-depth-2 w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-primary)]/40 hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/90 backdrop-blur-md flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-md hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="my-auto py-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-4 shadow-lg shadow-[var(--color-primary)]/30 group-hover:scale-110 transition-transform">
                    <Zap className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2 font-mono">
                    NmoLabs Suite
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                    {isEn ? 'Explore All Products' : 'اكتشف المزيد من الحلول'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-[260px] leading-relaxed mb-6 font-medium">
                    {isEn 
                      ? 'Discover complete technical specifications, demos, and enterprise deployment options.'
                      : 'استكشف المواصفات الفنية الكاملة، النماذج التجريبية، وخيارات التكامل المخصصة.'}
                  </p>

                  <button
                    className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-[var(--color-primary)]/90 transition-colors"
                  >
                    <span>{isEn ? 'View Products Hub' : 'استعراض منصة المنتجات'}</span>
                    {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                  </button>
                </div>

                <div className="w-full pt-4 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isEn ? 'Ready for API Integration' : 'جاهزة للربط الفوري والتخصيص'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PinnedStoryScene>
  );
};

interface SystemCardProps {
  product: typeof PRODUCTS[0];
  icon: React.ElementType;
  index: number;
  totalItems: number;
  activeProgress: any;
  isEn: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
}

const SystemStoryCard: React.FC<SystemCardProps> = ({
  product,
  icon: Icon,
  index,
  totalItems,
  activeProgress,
  isEn,
  isReducedMotion,
  onSelect
}) => {
  // Compute relative progress for active card emphasis
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
      <div className="card-depth-2 w-full p-5 sm:p-7 rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/92 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between group relative overflow-hidden">
        
        {/* Subtle Ambient Color Glow */}
        <div 
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" 
          style={{ backgroundColor: product.color }}
        />

        <div>
          {/* Card Top: Number & Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${product.color}18`, color: product.color }}
            >
              <Icon className="w-6 h-6" strokeWidth={1.75} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] font-mono">
                0{index + 1}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]">
                {product.badge}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
            <span>{isEn ? product.name : product.nameAr}</span>
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-normal">
            {isEn ? product.descEn : product.descAr}
          </p>

          {/* Specs / Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.specs?.map((spec, sIdx) => (
              <span 
                key={sIdx}
                className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-md bg-[var(--surface-secondary)] text-[var(--text-muted)] border border-[var(--border-default)]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${product.accentDot} animate-pulse`} />
            <span className="text-[11px]">{isEn ? 'Live System' : 'نظام تشغيلي'}</span>
          </span>

          <span className="text-[var(--color-primary)] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
            <span>{isEn ? 'Learn more' : 'تفاصيل النظام'}</span>
            {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
