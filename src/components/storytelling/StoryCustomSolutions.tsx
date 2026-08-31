import React from 'react';
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
import { CinematicStageContainer, CinematicCardWrapper } from './VerticalCinematicStage';

const PRODUCTS = [
  {
    id: 'nucleus',
    name: 'Nucleus',
    nameAr: 'النواة الرقمية — Nucleus',
    badge: 'Core Engine',
    descAr: 'المنظومة المركزية لربط العمليات وقواعد البيانات والتكاملات البرمجية المتطورة.',
    descEn: 'Central core engine connecting processes, databases, and enterprise APIs.',
    specs: ['معمارية مفتوحة', 'معالجة فورية', 'تشفير متقدم'],
    icon: Cpu,
    color: '#0F62FE',
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
    accentDot: 'bg-indigo-500',
  }
];

export const StoryCustomSolutions: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  const totalCount = PRODUCTS.length + 1;

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
      itemCount={totalCount}
      isEn={isEn}
      scrollMultiplier={2.8}
    >
      {({ activeProgress, isReducedMotion }) => (
        <CinematicStageContainer>
          {PRODUCTS.map((prod, index) => {
            const Icon = prod.icon;
            return (
              <CinematicCardWrapper
                key={prod.id}
                index={index}
                totalItems={totalCount}
                activeProgress={activeProgress}
                isReducedMotion={isReducedMotion}
                onClick={() => {
                  updateConfig({ currentRoute: 'products' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="card-depth-2 w-full p-5 sm:p-7 rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/95 backdrop-blur-xl shadow-xl hover:shadow-2xl cursor-pointer flex flex-col justify-between group relative overflow-hidden">
                  
                  {/* Subtle Ambient Color Glow */}
                  <div 
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" 
                    style={{ backgroundColor: prod.color }}
                  />

                  <div>
                    {/* Card Top: Category Badge, Number, and Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${prod.color}18`, color: prod.color }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.75} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] font-mono">
                          0{index + 1} / 0{totalCount}
                        </span>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]">
                          {prod.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                      <span>{isEn ? prod.name : prod.nameAr}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-normal">
                      {isEn ? prod.descEn : prod.descAr}
                    </p>

                    {/* Specs / Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {prod.specs?.map((spec, sIdx) => (
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
                      <span className={`w-2 h-2 rounded-full ${prod.accentDot} animate-pulse`} />
                      <span className="text-[11px]">{isEn ? 'Operational System' : 'نظام تشغيلي متكامل'}</span>
                    </span>

                    <span className="text-[var(--color-primary)] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      <span>{isEn ? 'Explore Specifications' : 'تفاصيل النظام'}</span>
                      {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>
              </CinematicCardWrapper>
            );
          })}

          {/* Final 8th CTA Card */}
          <CinematicCardWrapper
            index={PRODUCTS.length}
            totalItems={totalCount}
            activeProgress={activeProgress}
            isReducedMotion={isReducedMotion}
            onClick={() => {
              updateConfig({ currentRoute: 'products' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-depth-3 w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-primary)]/50 hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/95 backdrop-blur-xl flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[var(--color-primary)]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="my-auto py-2 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-3 shadow-lg shadow-[var(--color-primary)]/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-1 font-mono">
                  NmoLabs Ecosystem
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                  {isEn ? 'Explore Full Product Suite' : 'اكتشف المزيد من الحلول'}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed mb-5 font-medium">
                  {isEn 
                    ? 'Discover complete technical specifications, interactive live demos, and tailored enterprise architectures.'
                    : 'استكشف المواصفات الفنية الكاملة، النماذج التجريبية، وخيارات التكامل المخصصة لمنشأتك.'}
                </p>

                <button
                  className="px-6 py-2.5 sm:py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-[var(--color-primary)]/90 transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'View Products Hub' : 'استعراض منصة المنتجات'}</span>
                  {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                </button>
              </div>

              <div className="w-full pt-3 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isEn ? 'Ready for Instant API Integration' : 'جاهزة للربط الفوري والتخصيص السحابي'}</span>
              </div>
            </div>
          </CinematicCardWrapper>
        </CinematicStageContainer>
      )}
    </PinnedStoryScene>
  );
};
