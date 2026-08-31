import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  TrendingUp, 
  Target, 
  BarChart2, 
  Activity,
  ArrowLeft,
  ArrowRight,
  Zap,
  Sparkles,
  Search,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { PinnedStoryScene } from './PinnedStoryScene';
import { STORY_ASSETS } from './storyAssets';

const PERFORMANCE_STAGES = [
  {
    step: '01',
    titleAr: 'نُطلق بدقة',
    titleEn: 'Precision Launch',
    subtitleAr: 'تأسيس الهيكل الإعلاني والبكسلات',
    subtitleEn: 'Ad account architecture & tracking',
    descAr: 'تجهيز الحسابات الإعلانية، ربط بكسلات التتبع (Pixel / CAPI)، وبناء الهياكل الإعلانية الموجهة للشراء المباشر.',
    descEn: 'Structuring high-converting ad sets, integrating Pixel & CAPI server-side tracking, and initial creative testing.',
    kpis: ['إعداد Meta CAPI & Google Ads', 'اختبار الجمهور والاهتمامات', 'بناء نماذج الإعلانات'],
    icon: Target,
    color: '#0F62FE'
  },
  {
    step: '02',
    titleAr: 'نقيس اللحظة',
    titleEn: 'Real-time Measurement',
    subtitleAr: 'تتبع مسار العميل والاكتساب',
    subtitleEn: 'Customer acquisition cost diagnostics',
    descAr: 'تتبع دقيق لمسار العميل، قياس تكلفة الاكتساب (CAC)، ونقاط التوقف والتسرب في قمع الشراء بالملي ثانية.',
    descEn: 'Tracking granular funnel progression, evaluating real-time CPA/CAC, and identifying drop-offs.',
    kpis: ['دقة تتبع الإحالات 99.4%', 'مراقبة تكلفة النقرة (CPC)', 'تحليل معدل وصول الإعلانات'],
    icon: Activity,
    color: '#06B6D4'
  },
  {
    step: '03',
    titleAr: 'نحلل الأرقام',
    titleEn: 'Data Analytics',
    subtitleAr: 'تشخيص سلوك الشراء والربحية',
    subtitleEn: 'Behavioral analytics & margins',
    descAr: 'تحليل سلوك الزوار داخل المتجر، فحص المنتجات الأكثر ربحية، واكتشاف أسباب ترك سلات الشراء.',
    descEn: 'Evaluating customer cohort behaviors, top margin SKUs, and checkout friction points.',
    kpis: ['تحليل القيمة الدائمة (LTV)', 'فحص مسار إتمام الطلب', 'تحديد أسباب التردد'],
    icon: BarChart2,
    color: '#8B5CF6'
  },
  {
    step: '04',
    titleAr: 'نطوّر ونضاعف',
    titleEn: 'Scale & Maximize',
    subtitleAr: 'إعادة الاستهداف ومضاعفة ROAS',
    subtitleEn: 'Retargeting & budget amplification',
    descAr: 'إعادة استهداف ذكية ومؤتمتة، تحسين مستمر للعائد على الإنفاق الإعلاني، وزيادة الميزانيات على الحملات الرابحة.',
    descEn: 'Smart algorithmic retargeting, conversion rate optimization (CRO), and scaling winning ad sets.',
    kpis: ['مضاعفة الميزانية الرابحة', 'إعادة استهداف متعددة القنوات', 'تخفيض تكلفة الطلب (CPA)'],
    icon: Sliders,
    color: '#EC4899'
  },
  {
    step: '05',
    titleAr: 'نتائج الأداء',
    titleEn: 'Performance Results',
    subtitleAr: 'عائد إعلاني موثق ونمو مستدام',
    subtitleEn: 'Verified ad ROAS and scale',
    descAr: 'نتائج أداء إعلاني مثبتة وقابلة للقياس عبر كافة المنصات الرئيسية (ميتا، جوجل، تيك توك، وسناب شات).',
    descEn: 'Documented return on ad spend across Meta, Google, TikTok, and Snapchat ad networks.',
    kpis: ['متوسط ROAS من 3.8x إلى 6.2x', 'انخفاض تكلفة الاكتساب 35%', 'ارتفاع معدل التحويل 42%'],
    icon: TrendingUp,
    color: '#10B981'
  }
];

export const StoryGrowthCampaigns: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  return (
    <PinnedStoryScene
      id="story-growth"
      bgUrl={STORY_ASSETS.STORY_05_GROWTH}
      badge={{
        icon: Activity,
        textAr: 'STORY 05 • إدارة الحملات والأداء الإعلاني',
        textEn: 'STORY 05 • Performance Marketing & Growth Science'
      }}
      titleAr="نُطلق. نقيس. نحلل. نطوّر. نقود نتائج الأداء."
      titleEn="Launch. Measure. Analyze. Scale. Deliver Results."
      subtitleAr="إدارة حملات إعلانية مدعومة بالبيانات وهندسة التحويل لضمان أعلى عائد إعلاني (ROAS)."
      subtitleEn="Data-driven ad management and conversion science engineered for scalable ROAS."
      itemCount={PERFORMANCE_STAGES.length + 1}
      isEn={isEn}
      scrollMultiplier={2.6}
    >
      {({ trackX, trackRef, activeProgress, isReducedMotion }) => (
        <div className="w-full px-4 sm:px-8">
          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="flex flex-row flex-nowrap items-stretch gap-4 sm:gap-6 will-change-transform py-3"
          >
            {PERFORMANCE_STAGES.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <PerformanceStoryCard
                  key={phase.step}
                  phase={phase}
                  icon={Icon}
                  index={index}
                  totalItems={PERFORMANCE_STAGES.length + 1}
                  activeProgress={activeProgress}
                  isEn={isEn}
                  isReducedMotion={isReducedMotion}
                  onSelect={() => {
                    updateConfig({ currentRoute: 'start-project' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              );
            })}

            {/* Final CTA Card */}
            <div className="w-[85vw] sm:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 flex">
              <div
                onClick={() => {
                  updateConfig({ currentRoute: 'start-project' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card-depth-2 w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed border-[var(--color-primary)]/40 hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/90 backdrop-blur-md flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-md hover:shadow-xl relative overflow-hidden"
              >
                <div className="my-auto py-4 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2 font-mono">
                    Scale With NmoLabs
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                    {isEn ? 'Scale Your Ad Campaigns' : 'ضاعف أرباح حملاتك الإعلانية'}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-[260px] leading-relaxed mb-6 font-medium">
                    {isEn 
                      ? 'Partner with our growth team to audit, optimize, and scale your advertising performance.'
                      : 'احصل على تدقيق مجاني لحساباتك الإعلانية وخطة عملية لرفع العائد وتقليل تكلفة الاكتساب.'}
                  </p>

                  <button
                    className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-[var(--color-primary)]/90 transition-colors"
                  >
                    <span>{isEn ? 'Request Growth Audit' : 'طلب دراسة نمو للحملات'}</span>
                    {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                  </button>
                </div>

                <div className="w-full pt-4 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isEn ? 'Data-Driven & Transparent Attribution' : 'شفافية كاملة في مؤشرات التتبع والعائد'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PinnedStoryScene>
  );
};

interface PhaseCardProps {
  phase: typeof PERFORMANCE_STAGES[0];
  icon: React.ElementType;
  index: number;
  totalItems: number;
  activeProgress: any;
  isEn: boolean;
  isReducedMotion: boolean;
  onSelect: () => void;
}

const PerformanceStoryCard: React.FC<PhaseCardProps> = ({
  phase,
  icon: Icon,
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
      <div className="card-depth-2 w-full p-5 sm:p-7 rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/92 backdrop-blur-md transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between group relative overflow-hidden">
        
        {/* Ambient glow */}
        <div 
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" 
          style={{ backgroundColor: phase.color }}
        />

        <div>
          {/* Top Stage Bar */}
          <div className="flex items-center justify-between mb-4">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${phase.color}18`, color: phase.color }}
            >
              <Icon className="w-6 h-6" strokeWidth={1.75} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] font-mono">
                STAGE {phase.step}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
            {isEn ? phase.titleEn : phase.titleAr}
          </h3>

          <p className="text-xs font-semibold text-[var(--color-primary)] mb-3">
            {isEn ? phase.subtitleEn : phase.subtitleAr}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-normal">
            {isEn ? phase.descEn : phase.descAr}
          </p>

          {/* KPI bullet points */}
          <div className="space-y-1.5 mb-4">
            {phase.kpis.map((kpi, kIdx) => (
              <div 
                key={kIdx}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-[var(--text-muted)] bg-[var(--surface-secondary)]/80 p-2 rounded-xl border border-[var(--border-default)]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                <span>{kpi}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
          <span className="flex items-center gap-1.5 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isEn ? 'Active Process' : 'منهجية معتمدة'}</span>
          </span>

          <span className="text-[var(--color-primary)] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
            <span>{isEn ? 'Explore Strategy' : 'تفاصيل الخطة'}</span>
            {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
