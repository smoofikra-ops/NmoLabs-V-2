import React from 'react';
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
  Zap
} from 'lucide-react';
import { PinnedStoryScene } from './PinnedStoryScene';
import { STORY_ASSETS } from './storyAssets';
import { CinematicStageContainer, CinematicCardWrapper } from './VerticalCinematicStage';

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
        <CinematicStageContainer>
          {PERFORMANCE_STAGES.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <CinematicCardWrapper
                key={stage.step}
                index={index}
                totalItems={totalCount}
                activeProgress={activeProgress}
                isReducedMotion={isReducedMotion}
                onClick={() => {
                  updateConfig({ currentRoute: 'start-project' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="card-depth-2 w-full p-5 sm:p-7 rounded-3xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/95 backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer flex flex-col justify-between group relative overflow-hidden">
                  
                  <div 
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity" 
                    style={{ backgroundColor: stage.color }}
                  />

                  <div>
                    {/* Stage Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundColor: `${stage.color}18`, color: stage.color }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.75} />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] font-mono">
                          {stage.step} / 0{totalCount}
                        </span>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]">
                          {isEn ? stage.subtitleEn : stage.subtitleAr}
                        </span>
                      </div>
                    </div>

                    {/* Stage Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {isEn ? stage.titleEn : stage.titleAr}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4 font-normal">
                      {isEn ? stage.descEn : stage.descAr}
                    </p>

                    {/* KPIs / Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                      {stage.kpis.map((kpi, kIdx) => (
                        <div 
                          key={kIdx}
                          className="p-2.5 rounded-xl bg-[var(--surface-secondary)]/80 border border-[var(--border-default)] text-center flex flex-col justify-center"
                        >
                          <span className="text-[11px] font-semibold text-[var(--text-primary)]">
                            {kpi}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stage Footer */}
                  <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs text-[var(--text-muted)] font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px]">{isEn ? 'Data-Driven Loop' : 'إجراء منهجي مستمر'}</span>
                    </span>

                    <span className="text-[var(--color-primary)] font-bold text-xs flex items-center gap-1 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform">
                      <span>{isEn ? 'Request Growth Audit' : 'طلب دراسة نمو'}</span>
                      {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </div>
              </CinematicCardWrapper>
            );
          })}

          {/* Final CTA Card */}
          <CinematicCardWrapper
            index={PERFORMANCE_STAGES.length}
            totalItems={totalCount}
            activeProgress={activeProgress}
            isReducedMotion={isReducedMotion}
            onClick={() => {
              updateConfig({ currentRoute: 'start-project' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="card-depth-3 w-full p-6 sm:p-8 rounded-3xl border-2 border-dashed border-emerald-500/50 hover:border-emerald-500 bg-[var(--surface-primary)]/95 backdrop-blur-xl flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-300 group shadow-xl hover:shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="my-auto py-2 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>

                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1 font-mono">
                  Growth & ROAS Science
                </span>

                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">
                  {isEn ? 'Scale Your Performance Marketing' : 'ابدأ قيادة نمو حملاتك الرقمية'}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md leading-relaxed mb-5 font-medium">
                  {isEn 
                    ? 'Schedule a direct growth diagnostic audit with our media buyers and conversion engineers.'
                    : 'احصل على تحليل شامل لمسار التحويل، تدقيق بكسلات التتبع، واستراتيجية مضاعفة العائد الإعلاني.'}
                </p>

                <button
                  className="px-6 py-2.5 sm:py-3 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md group-hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'Start Growth Consultation' : 'طلب دراسة نمو للحملات'}</span>
                  {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
                </button>
              </div>

              <div className="w-full pt-3 border-t border-[var(--border-default)] flex items-center justify-center gap-2 text-[11px] text-[var(--text-muted)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isEn ? 'Real-Time Attribution & Server-Side CAPI' : 'تتبع خادم مباشر ودقة عزو إعلاني عالية'}</span>
              </div>
            </div>
          </CinematicCardWrapper>
        </CinematicStageContainer>
      )}
    </PinnedStoryScene>
  );
};
