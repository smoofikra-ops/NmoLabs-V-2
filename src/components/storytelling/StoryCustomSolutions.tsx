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
  ShieldCheck, 
  Zap, 
  Code2 
} from 'lucide-react';
import { StorySceneContainer } from './StorySceneContainer';
import { STORY_ASSETS } from './storyAssets';

const PRODUCTS = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    nameAr: 'النواة الرقمية — Nucleus',
    badge: 'Core Engine',
    descAr: 'المنظومة المركزية لربط العمليات وقواعد البيانات والتكاملات.',
    descEn: 'Central core engine connecting processes, databases, and APIs.',
    icon: Cpu,
    color: '#0F62FE',
    lightBg: 'bg-blue-50/80 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800/50',
    accentDot: 'bg-blue-500',
  },
  {
    id: 'nbos',
    name: 'NBOS',
    nameAr: 'نظام التشغيل — NBOS',
    badge: 'Business OS',
    descAr: 'نظام تشغيل الأعمال السحابي لإدارة المشاريع وفرق العمل.',
    descEn: 'Cloud business operating system for project and team execution.',
    icon: Layers,
    color: '#06B6D4',
    lightBg: 'bg-cyan-50/80 dark:bg-cyan-950/30',
    borderColor: 'border-cyan-200 dark:border-cyan-800/50',
    accentDot: 'bg-cyan-500',
  },
  {
    id: 'nmo-erp',
    name: 'NMO ERP',
    nameAr: 'نظام الموارد — NMO ERP',
    badge: 'Enterprise ERP',
    descAr: 'تخطيط الموارد، المخزون، الحسابات، والفوترة الإلكترونية المعتمدة.',
    descEn: 'Enterprise resource planning, inventory, and certified e-invoicing.',
    icon: Database,
    color: '#10B981',
    lightBg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800/50',
    accentDot: 'bg-emerald-500',
  },
  {
    id: 'smart-seller',
    name: 'Smart Seller',
    nameAr: 'البائع الذكي — Smart Seller',
    badge: 'Sales Automation',
    descAr: 'وكيل بيع ذكي ومؤتمت لمساعدة العملاء وإتمام الطلبات على مدار الساعة.',
    descEn: 'Automated AI sales agent assisting buyers and closing orders 24/7.',
    icon: Bot,
    color: '#8B5CF6',
    lightBg: 'bg-purple-50/80 dark:bg-purple-950/30',
    borderColor: 'border-purple-200 dark:border-purple-800/50',
    accentDot: 'bg-purple-500',
  },
  {
    id: 'store-intelligence',
    name: 'Store Intelligence',
    nameAr: 'ذكاء المتاجر — Store Intelligence',
    badge: 'Data & Analytics',
    descAr: 'تحليل سلوك الزوار، نقاط التسرب، واقتراح فرص النمو الفورية.',
    descEn: 'Visitor behavior analysis, funnel leak detection, and growth triggers.',
    icon: BarChart3,
    color: '#F59E0B',
    lightBg: 'bg-amber-50/80 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800/50',
    accentDot: 'bg-amber-500',
  },
  {
    id: 'ambassador-of-growth',
    name: 'Ambassador of Growth',
    nameAr: 'سفير النمو — Ambassador of Growth',
    badge: 'Loyalty & Affiliates',
    descAr: 'إدارة شبكات التسويق بالعمولة، سفراء العلامة، وحوافز المبيعات.',
    descEn: 'Growth affiliate networks, brand ambassadors, and sales incentives.',
    icon: Award,
    color: '#EC4899',
    lightBg: 'bg-pink-50/80 dark:bg-pink-950/30',
    borderColor: 'border-pink-200 dark:border-pink-800/50',
    accentDot: 'bg-pink-500',
  },
  {
    id: 'ai-center',
    name: 'AI Center',
    nameAr: 'مركز الذكاء الاصطناعي — AI Center',
    badge: 'GenAI & Automation',
    descAr: 'محرك نماذج الذكاء الاصطناعي التوليدي المخصص لقطاع أعمالك.',
    descEn: 'Custom generative AI engine and automation models for your vertical.',
    icon: Sparkles,
    color: '#6366F1',
    lightBg: 'bg-indigo-50/80 dark:bg-indigo-950/30',
    borderColor: 'border-indigo-200 dark:border-indigo-800/50',
    accentDot: 'bg-indigo-500',
  }
];

export const StoryCustomSolutions: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  return (
    <StorySceneContainer
      id="story-solutions"
      bgUrl={STORY_ASSETS.STORY_02_SYSTEMS}
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
              <Code2 className="w-3.5 h-3.5" />
              <span>STORY 02 • {isEn ? 'Custom Digital Solutions' : 'الأنظمة والحلول الرقمية'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
              {isEn ? 'Custom Systems, Apps & Digital Solutions' : 'الأنظمة والتطبيقات والحلول الرقمية المخصصة'}
            </h2>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium">
              {isEn ? 'We build the exact technology your business needs.' : 'نبني التقنية التي يحتاجها عملك.'}
            </p>
          </motion.div>

          {/* Scroll-Choreographed Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {PRODUCTS.map((prod, index) => {
              const Icon = prod.icon;

              return (
                <ProductTileItem
                  key={prod.id}
                  product={prod}
                  icon={Icon}
                  index={index}
                  isEn={isEn}
                  isReducedMotion={isReducedMotion}
                  onSelect={() => {
                    updateConfig({ currentRoute: 'products' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              );
            })}

            {/* 8th Tile for Symmetry and Action */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => {
                updateConfig({ currentRoute: 'products' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative p-6 rounded-2xl border-2 border-dashed border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/80 backdrop-blur-md hover:bg-[var(--surface-primary)] flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md min-h-[160px]"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1 text-base">
                {isEn ? 'Explore Full Suite' : 'استكشف كافة الحلول'}
              </h3>
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1 group-hover:text-[var(--color-primary)] font-semibold transition-colors">
                <span>{isEn ? 'View all products' : 'عرض منتجات NmoLabs'}</span>
                {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              </p>
            </motion.div>
          </div>

          {/* Bottom Proof Strip */}
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                updateConfig({ currentRoute: 'products' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md hover:bg-[var(--surface-secondary)] border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] transition-all shadow-sm hover:shadow group"
            >
              <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
              <span>{isEn ? 'Engineered for scalability & security' : 'أنظمة مبنية لتحمل التوسع والأمان العالي'}</span>
              {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
            </button>
          </div>
        </>
      )}
    </StorySceneContainer>
  );
};

interface ProductTileProps {
  product: typeof PRODUCTS[0];
  icon: React.ElementType;
  index: number;
  isEn: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
}

const ProductTileItem: React.FC<ProductTileProps> = ({
  product,
  icon: Icon,
  index,
  isEn,
  isReducedMotion,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: isReducedMotion ? 0 : Math.min(index * 0.06, 0.3) }}
      onClick={onSelect}
      className={`group relative p-5 sm:p-6 rounded-2xl border ${product.borderColor} bg-[var(--surface-primary)]/88 backdrop-blur-md hover:bg-[var(--surface-primary)] transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer flex flex-col justify-between overflow-hidden`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: `${product.color}15`, color: product.color }}
          >
            <Icon className="w-6 h-6" strokeWidth={1.75} />
          </div>

          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]">
            {product.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
          <span>{isEn ? product.name : product.nameAr}</span>
        </h3>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
          {isEn ? product.descEn : product.descAr}
        </p>
      </div>

      <div className="pt-3 border-t border-[var(--border-default)]/60 flex items-center justify-between text-[11px] text-[var(--text-muted)] font-medium">
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${product.accentDot} animate-pulse`} />
          {isEn ? 'Active Architecture' : 'بنية جاهزة للربط'}
        </span>
        <span className="text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
          {isEn ? 'Details →' : 'التفاصيل ←'}
        </span>
      </div>
    </motion.div>
  );
};
