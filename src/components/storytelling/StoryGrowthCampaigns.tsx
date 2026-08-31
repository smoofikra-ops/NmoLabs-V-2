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
  Sliders, 
  CheckCircle2,
  Zap,
  Sparkles
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
    kpis: ['Meta CAPI & Google Ads', 'اختبار الجمهور والاهتمامات', 'بناء نماذج الإعلانات'],
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
  const totalCount = PERFORMANCE_STAGES.length + 1;

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
      itemCount={totalCount}
      isEn={isEn}
      scrollMultiplier={2.6}
    >
      {({ activeProgress, isReducedMotion }) => (
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6">
          
          {/* Connected Data Stream / Signal Pipeline Header */}
          <div className="w-full max-w-2xl mx-auto mb-4 sm:mb-6">
            <div className="flex items-center justify-between relative px-2 sm:px-6">
              {/* Central connecting track */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] bg-[var(--border-default)] z-0">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"
                  style={{
                    width: useTransform(
                      activeProgress,
                      [0, totalCount - 1],
                      ['0%', '100%']
                    )
                  }}
                />
              </div>

              {/* Stage Flow Indicator Nodes */}
              {PERFORMANCE_STAGES.map((st, idx) => {
                const nodeActive = useTransform(
                  activeProgress,
                  [idx - 0.4, idx, idx + 0.4],
                  [0.4, 1, 0.6]
                );
                const nodeScale = useTransform(
                  activeProgress,
                  [idx - 0.4, idx, idx + 0.4],
                  [0.85, 1.15, 0.9]
                );

                return (
                  <motion.button
                    key={st.step}
                    style={{
                      opacity: nodeActive,
                      scale: isReducedMotion ? 1 : nodeScale
                    }}
                    onClick={() => {
                      // Click on a node allows quick inspection
                    }}
                    className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 transition-colors cursor-pointer bg-[var(--surface-primary)] shadow-sm"
                  >
                    <span style={{ color: st.color }}>{st.step}</span>
                  </motion.button>
                );
              })}

              {/* Final Target Node */}
              <motion.div
                style={{
                  opacity: useTransform(activeProgress, [PERFORMANCE_STAGES.length - 0.5, PERFORMANCE_STAGES.length], [0.4, 1]),
                  scale: useTransform(activeProgress, [PERFORMANCE_STAGES.length - 0.5, PERFORMANCE_STAGES.length], [0.85, 1.15])
                }}
                className="relative z-10 w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border-2 border-dashed border-emerald-500 text-emerald-500 bg-[var(--surface-primary)] shadow-sm"
              >
                <TrendingUp className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>

          {/* Active Stage Data Card Focus Deck */}
          <div className="relative w-full h-[360px] sm:h-[380px] flex items-center justify-center">
            {PERFORMANCE_STAGES.map((stage, index) => {
              const Icon = stage.icon;

              const opacity = useTransform(
                activeProgress,
                [index - 0.8, index - 0.2, index, index + 0.2, index + 0.8],
                [0, 0.95, 1, 0.95, 0]
              );
              const scale = useTransform(
                activeProgress,
                [index - 0.8, index, index + 0.8],
                isReducedMotion ? [1, 1, 1] : [0.9, 1, 0.9]
              );
              const y = useTransform(
                activeProgress,
                [index - 0.8, index, index + 0.8],
                isReducedMotion ? [0, 0, 0] : [25, 0, -25]
              );
              const pointerEvents = useTransform(
                activeProgress,
                [index - 0.45, index, index + 0.45],
                ['none', 'auto', 'none']
              );

              return (
                <motion.div
                  key={stage.step}
                  style={{
                    opacity,
                    scale,
                    y,
                    pointerEvents: pointerEvents as any
                  }}
                  onClick={() => {
                    updateConfig({ currentRoute: 'start-project' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="absolute inset-x-0 mx-auto w-full max-w-xl sm:max-w-2xl will-change-transform transform-gpu"
                >
                  <div className="card-depth-2 w-full p-5 sm:p-7 rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/95 backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer flex flex-col justify-between group relative overflow-hidden">
                    
                    {/* Background Pulse Glow */}
                    <div 
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" 
                      style={{ backgroundColor: stage.color }}
                    />

                    <div>
                      {/* Flow Step Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundColor: `${stage.color}18`, color: stage.color }}
                          >
                            <Icon className="w-5 h-5" strokeWidth={1.75} />
                          </div>

                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                              PIPELINE STAGE {stage.step}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-[var(--color-primary)]">
                              {isEn ? stage.subtitleEn : stage.subtitleAr}
                            </h4>
                          </div>
                        </div>

                        <div className="px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[11px] font-mono text-[var(--text-secondary)] font-bold">
                          {stage.step} / 0{totalCount}
                        </div>
                      </div>

                      {/* Stage Main Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--color-primary)] transition-colors">
                        {isEn ? stage.titleEn : stage.titleAr}
                      </h3>

                      {/* Stage Description */}
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3.5 font-normal">
                        {isEn ? stage.descEn : stage.descAr}
                      </p>

                      {/* KPIs Data Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3.5">
                        {stage.kpis.map((kpi, kIdx) => (
                          <div 
                            key={kIdx}
                            className="p-2 rounded-xl bg-[var(--surface-secondary)]/90 border border-[var(--border-default)] text-center flex flex-col justify-center"
                          >
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[var(--text-primary)]">
                              {kpi}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stage Footer Connector */}
                    <div className="pt-2.5 border-t border-[var(--border-default)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                      <span className="flex items-center gap-1.5 text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{isEn ? 'Continuous Optimization Loop' : 'إجراء منهجي مستمر'}</span>
                      </span>

                      <span className="text-[var(--color-primary)] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                        <span>{isEn ? 'Request Growth Audit' : 'طلب دراسة نمو'}</span>
                        {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Final Target CTA Card */}
            {(() => {
              const ctaIdx = PERFORMANCE_STAGES.length;
              const opacity = useTransform(
                activeProgress,
                [ctaIdx - 0.8, ctaIdx - 0.2, ctaIdx, ctaIdx + 0.2, ctaIdx + 0.8],
                [0, 0.95, 1, 0.95, 0]
              );
              const scale = useTransform(
                activeProgress,
                [ctaIdx - 0.8, ctaIdx, ctaIdx + 0.8],
                isReducedMotion ? [1, 1, 1] : [0.9, 1, 0.9]
              );
              const y = useTransform(
                activeProgress,
                [ctaIdx - 0.8, ctaIdx, ctaIdx + 0.8],
                isReducedMotion ? [0, 0, 0] : [25, 0, -25]
              );
              const pointerEvents = useTransform(
                activeProgress,
                [ctaIdx - 0.45, ctaIdx, ctaIdx + 0.45],
                ['none', 'auto', 'none']
              );

              return (
                <motion.div
                  style={{
                    opacity,
                    scale,
                    y,
                    pointerEvents: pointerEvents as any
                  }}
                  onClick={() => {
                    updateConfig({ currentRoute: 'start-project' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="absolute inset-x-0 mx-auto w-full max-w-xl sm:max-w-2xl will-change-transform transform-gpu"
                >
                  <div className="card-depth-3 w-full p-6 sm:p-7 rounded-3xl border-2 border-dashed border-emerald-500/50 hover:border-emerald-500 bg-[var(--surface-primary)]/95 backdrop-blur-xl flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="my-auto py-1 flex flex-col items-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-2.5 shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                        <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1 font-mono">
                        Growth & ROAS Science
                      </span>

                      <h3 className="text-lg sm:text-xl font-black text-[var(--text-primary)] mb-1.5">
                        {isEn ? 'Scale Your Performance Marketing' : 'ابدأ قيادة نمو حملاتك الرقمية'}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed mb-4 font-medium">
                        {isEn 
                          ? 'Schedule a direct growth diagnostic audit with our media buyers and conversion engineers.'
                          : 'احصل على تحليل شامل لمسار التحويل، تدقيق بكسلات التتبع، واستراتيجية مضاعفة العائد الإعلاني.'}
                      </p>

                      <button
                        className="px-5 py-2 sm:py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-emerald-700 transition-colors cursor-pointer"
                      >
                        <span>{isEn ? 'Start Growth Consultation' : 'طلب دراسة نمو للحملات'}</span>
                        {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                      </button>
                    </div>

                    <div className="w-full pt-2.5 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{isEn ? 'Real-Time Attribution & Server-Side CAPI' : 'تتبع خادم مباشر ودقة عزو إعلاني عالية'}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      )}
    </PinnedStoryScene>
  );
};
