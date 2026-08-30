import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  TrendingUp, 
  Target, 
  BarChart2, 
  PieChart, 
  Zap, 
  ArrowUpRight, 
  CheckCircle, 
  Sparkles,
  Layers,
  Activity,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { triggerBookingModal } from '../BookingModal';

const CAMPAIGN_PHASES = [
  {
    step: '01',
    titleAr: 'نُطلق بدقة',
    titleEn: 'Precision Launch',
    descAr: 'تجهيز الحسابات الإعلانية، ربط البكسلات (Pixel / CAPI)، وبناء الهياكل الإعلانية الموجهة للتحويل.',
    descEn: 'Account structuring, Pixel/CAPI tracking integration, and conversion-focused architectures.',
    icon: Target,
    color: '#0F62FE'
  },
  {
    step: '02',
    titleAr: 'نقيس ونحلل',
    titleEn: 'Measure & Analyze',
    descAr: 'تتبع مسار العميل، قياس تكلفة الاكتساب (CAC)، ونقاط التوقف والتسرب في قمع الشراء.',
    descEn: 'Customer journey tracking, CAC analysis, and funnel drop-off diagnostics.',
    icon: BarChart2,
    color: '#06B6D4'
  },
  {
    step: '03',
    titleAr: 'نطوّر ونضاعف (ROAS)',
    titleEn: 'Scale & Maximize ROAS',
    descAr: 'تحسين مستمر للعائد على الإنفاق الإعلاني، وإعادة الاستهداف الذكي لزيادة القيمة الدائمة للعميل.',
    descEn: 'Continuous return on ad spend optimization, smart retargeting, and LTV amplification.',
    icon: TrendingUp,
    color: '#10B981'
  }
];

const METRICS = [
  { labelAr: 'معدل العائد الإعلاني (ROAS)', labelEn: 'Average Campaign ROAS', value: '3.8x — 6.2x', trend: '+140%', highlight: true },
  { labelAr: 'تحسن معدل التحويل (CR)', labelEn: 'Conversion Rate Uplift', value: '+42%', trend: '+42%', highlight: false },
  { labelAr: 'انخفاض تكلفة الاكتساب (CPA)', labelEn: 'Acquisition Cost Reduction', value: '-35%', trend: '-35%', highlight: false },
  { labelAr: 'دقة تتبع الإحالات (Attribution)', labelEn: 'Attribution Accuracy', value: '99.4%', trend: 'Verified', highlight: false },
];

export const StoryGrowthCampaigns: React.FC = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);

  return (
    <section 
      ref={containerRef} 
      id="story-growth" 
      className="relative py-20 lg:py-28 overflow-hidden bg-[var(--surface-secondary)] border-b border-[var(--border-default)] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Story Header */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-primary)] border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5" />
            <span>STORY 04 • {isEn ? 'Growth & Ad Intelligence' : 'الحملات والنمو الرقمي'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
            {isEn ? 'Launch. Measure. Analyze. Scale.' : 'نطلق. نقيس. نحلل. نطوّر.'}
          </h2>

          <p className="text-lg sm:text-xl text-[var(--text-muted)] font-medium">
            {isEn ? 'Data-driven ad management and conversion science engineered for repeatable growth.' : 'إدارة حملات إعلانية مدعومة بالبيانات والأتمتة لضمان أعلى عائد واستدامة النمو.'}
          </p>
        </motion.div>

        {/* 3 Step Visual Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CAMPAIGN_PHASES.map((phase, index) => {
            const startRange = 0.12 + (index * 0.12);
            const endRange = Math.min(0.32 + (index * 0.12), 0.88);
            const Icon = phase.icon;

            return (
              <PhaseCard
                key={phase.step}
                phase={phase}
                icon={Icon}
                scrollYProgress={scrollYProgress}
                startRange={startRange}
                endRange={endRange}
                isEn={isEn}
              />
            );
          })}
        </div>

        {/* Dashboard Visualizer Frame */}
        <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 mb-6 border-b border-[var(--border-default)]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {isEn ? 'Real-Time Campaign Engine' : 'محرك تحليل الأداء والعائد الإعلاني'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                {isEn ? 'Integrated tracking across Meta, Google Ads, TikTok, and Snap CAPI' : 'ربط تحليلي مباشر وشامل عبر منصات ميتا، جوجل، وتيك توك مع بكسلات التتبع المتقدمة'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['Meta Ads', 'Google Ads', 'TikTok Ads', 'Snap CAPI'].map((network) => (
                <span key={network} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]">
                  {network}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METRICS.map((metric, idx) => (
              <div 
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl border ${metric.highlight ? 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5' : 'border-[var(--border-default)] bg-[var(--surface-secondary)]/60'}`}
              >
                <div className="text-xs text-[var(--text-muted)] font-medium mb-1.5">
                  {isEn ? metric.labelEn : metric.labelAr}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-2">
                  {metric.value}
                </div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Strip */}
          <div className="mt-8 pt-6 border-t border-[var(--border-default)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs sm:text-sm text-[var(--text-muted)] text-center sm:text-right">
              {isEn ? 'Ready to scale your store or company with proven ad performance?' : 'هل ترغب في إدارة احترافية لحملاتك الإعلانية ورفع العائد على الاستثمار؟'}
            </span>
            <button
              onClick={() => triggerBookingModal()}
              className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-2 shrink-0"
            >
              <span>{isEn ? 'Request Growth Audit' : 'اطلب تدقيق حملاتك الإعلانية'}</span>
              {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

interface PhaseCardProps {
  phase: typeof CAMPAIGN_PHASES[0];
  icon: React.ElementType;
  scrollYProgress: any;
  startRange: number;
  endRange: number;
  isEn: boolean;
}

const PhaseCard: React.FC<PhaseCardProps> = ({
  phase,
  icon: Icon,
  scrollYProgress,
  startRange,
  endRange,
  isEn
}) => {
  const opacity = useTransform(scrollYProgress, [startRange, endRange], [0, 1]);
  const y = useTransform(scrollYProgress, [startRange, endRange], [24, 0]);
  const scale = useTransform(scrollYProgress, [startRange, endRange], [0.95, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="p-6 sm:p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs"
            style={{ backgroundColor: `${phase.color}15`, color: phase.color }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-black font-mono px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-muted)]">
            PHASE {phase.step}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2.5">
          {isEn ? phase.titleEn : phase.titleAr}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          {isEn ? phase.descEn : phase.descAr}
        </p>
      </div>
    </motion.div>
  );
};
