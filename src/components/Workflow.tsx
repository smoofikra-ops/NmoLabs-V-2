import React, { useRef } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { 
  Search, 
  BarChart2, 
  Compass, 
  Code2, 
  Rocket, 
  Cpu, 
  TrendingUp, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const JOURNEY_STAGES = [
  {
    id: 'study',
    number: '01',
    nameAr: 'دراسة',
    nameEn: 'Research & Discovery',
    tagAr: 'فهم السوق والمنافسين',
    tagEn: 'Market & competitor audit',
    descAr: 'دراسة شاملة لنموذج العمل، سلوك الجمهور المستهدف، وتحليل نقاط القوة والفرص.',
    descEn: 'Comprehensive business model audit, target audience mapping, and competitive analysis.',
    icon: Search,
    color: '#0F62FE',
  },
  {
    id: 'analyze',
    number: '02',
    nameAr: 'تحليل',
    nameEn: 'Data Diagnostics',
    tagAr: 'تشخيص البيانات ونقاط التسرب',
    tagEn: 'Funnel & bottleneck analysis',
    descAr: 'تشخيص مسارات الشراء الحالية، اكتشاف مواضع الهدر المالي، وتحديد مؤشرات الأداء الأساسية (KPIs).',
    descEn: 'Diagnostic evaluation of user drop-offs, budget leakage points, and core KPI baseline.',
    icon: BarChart2,
    color: '#06B6D4',
  },
  {
    id: 'plan',
    number: '03',
    nameAr: 'تخطيط',
    nameEn: 'Strategic Roadmap',
    tagAr: 'هندسة خطة النمو',
    tagEn: 'Growth architecture',
    descAr: 'تصميم هيكل الحل الرقمي، رحلة العميل (Customer Journey)، واستراتيجية الإطلاق والتوسع.',
    descEn: 'Structuring the digital architecture, customer conversion journeys, and multi-channel scale plan.',
    icon: Compass,
    color: '#3B82F6',
  },
  {
    id: 'build',
    number: '04',
    nameAr: 'بناء',
    nameEn: 'Engineering & Craft',
    tagAr: 'تطوير المنظومة والواجهات',
    tagEn: 'Agile development & UI/UX',
    descAr: 'برمجة وتصميم الواجهات، تكامل بوابات الدفع وقواعد البيانات، وضمان أعلى معايير السرعة والأمان.',
    descEn: 'Engineering high-performance UI/UX, database integrations, payment gateways, and security standards.',
    icon: Code2,
    color: '#8B5CF6',
  },
  {
    id: 'launch',
    number: '05',
    nameAr: 'إطلاق',
    nameEn: 'Precision Launch',
    tagAr: 'الإطلاق التقني والإعلاني',
    tagEn: 'Go-live & tracking activation',
    descAr: 'تفعيل خوادم الإنتاج، فحص جودة العمليات، وربط بكسلات التتبع الإعلاني (CAPI & Pixel).',
    descEn: 'Live production deployment, stress-testing workflows, and advanced tracking (Pixel & CAPI) setup.',
    icon: Rocket,
    color: '#EC4899',
  },
  {
    id: 'operate',
    number: '06',
    nameAr: 'تشغيل',
    nameEn: 'Live Operations',
    tagAr: 'إدارة واستقرار المنظومة',
    tagEn: 'Operations & support',
    descAr: 'متابعة حية للعمليات، صيانة دورية، دعم فني مستمر، ومراقبة أداء الخوادم وقواعد البيانات.',
    descEn: 'Real-time uptime monitoring, proactive infrastructure maintenance, and operational technical support.',
    icon: Cpu,
    color: '#10B981',
  },
  {
    id: 'grow',
    number: '07',
    nameAr: 'نمو',
    nameEn: 'Scale & Performance',
    tagAr: 'مضاعفة العائد والأداء',
    tagEn: 'ROAS & revenue optimization',
    descAr: 'تحسين مستمر لمعدل التحويل (CRO)، مضاعفة العائد الإعلاني (ROAS)، وفتح قنوات بيع جديدة.',
    descEn: 'Conversion rate optimization (CRO), ROAS maximization, and long-term brand scaling.',
    icon: TrendingUp,
    color: '#F59E0B',
  },
];

export const Workflow: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  if (!config.sections.workflow) return null;

  return (
    <section 
      ref={containerRef}
      id="workflow"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-[var(--surface-primary)] border-b border-[var(--border-default)] transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] max-w-4xl h-96 bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'THE 7-STAGE LIFECYCLE' : 'رحلة الفكرة — من التأسيس إلى النمو'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
            {isEn ? (
              <>We don't just build, we <span className="text-[var(--color-primary)]">engineer growth</span></>
            ) : (
              <>نحن لسنا شركة تنفيذ فقط.. <span className="text-[var(--color-primary)] block sm:inline">نحن شريك نمو متكامل</span></>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-normal max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? 'Our battle-tested 7-stage methodology transforms raw concepts into scalable, revenue-generating digital systems.'
              : 'منهجية من 7 مراحل متكاملة تحول الفكرة إلى منظومة برمجية وتجارية قابلة للتوسع ومضاعفة الأرباح.'}
          </p>
        </div>

        {/* Interactive Lifecycle Path (Desktop & Tablet) */}
        <div className="relative mb-16">
          
          {/* Connecting Progress Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-1 bg-[var(--surface-secondary)] z-0 rounded-full overflow-hidden border border-[var(--border-default)]">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#0F62FE] via-[#8B5CF6] to-[#F59E0B] rounded-full"
              style={{
                width: useTransform(
                  scrollYProgress, 
                  [0.05, 0.95], 
                  shouldReduceMotion ? ['100%', '100%'] : ['0%', '100%']
                )
              }}
            />
          </div>

          {/* 7 Stages Grid / Node Stream */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3 relative z-10">
            {JOURNEY_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const stageThreshold = index / (JOURNEY_STAGES.length - 1);
              
              return (
                <StageNodeItem
                  key={stage.id}
                  stage={stage}
                  icon={Icon}
                  index={index}
                  total={JOURNEY_STAGES.length}
                  stageThreshold={stageThreshold}
                  scrollYProgress={scrollYProgress}
                  isEn={isEn}
                  isReducedMotion={!!shouldReduceMotion}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Partnership Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-depth-2 rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--border-default)] bg-[var(--surface-secondary)]/70 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-start">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">
                {isEn ? 'End-to-End Execution Under One Roof' : 'تنفيذ متكامل من البداية إلى التوسع تحت سقف واحد'}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal">
                {isEn 
                  ? 'No fragmented vendors. Strategy, software engineering, and performance marketing in full synergy.'
                  : 'بدون تشتت بين جهات متعددة: الاستراتيجية، البرمجة، وتنمية المبيعات تعمل بتناغم كامل.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              updateConfig({ currentRoute: 'start-project' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full md:w-auto px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm shadow-md hover:bg-[var(--color-primary)]/90 transition-all flex items-center justify-center gap-2 shrink-0 group cursor-pointer"
          >
            <span>{isEn ? 'Start Your Project Journey' : 'ابدأ رحلة مشروعك الآن'}</span>
            {isEn ? <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> : <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />}
          </button>
        </motion.div>

      </div>
    </section>
  );
};

interface StageNodeProps {
  stage: typeof JOURNEY_STAGES[0];
  icon: React.ElementType;
  index: number;
  total: number;
  stageThreshold: number;
  scrollYProgress: any;
  isEn: boolean;
  isReducedMotion: boolean;
}

const StageNodeItem: React.FC<StageNodeProps> = ({
  stage,
  icon: Icon,
  index,
  total,
  stageThreshold,
  scrollYProgress,
  isEn,
  isReducedMotion
}) => {
  // Bidirectional activation based on current scroll position
  const stepActivation = useTransform(
    scrollYProgress,
    [Math.max(0, stageThreshold - 0.1), Math.min(1, stageThreshold + 0.05)],
    [0.7, 1]
  );

  const nodeScale = useTransform(
    scrollYProgress,
    [Math.max(0, stageThreshold - 0.08), stageThreshold, Math.min(1, stageThreshold + 0.08)],
    isReducedMotion ? [1, 1, 1] : [0.96, 1.03, 0.98]
  );

  return (
    <motion.div
      style={{
        opacity: isReducedMotion ? 1 : stepActivation,
        scale: nodeScale
      }}
      className="card-depth-1 group relative p-4 sm:p-5 rounded-2xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/90 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Node Circle Header */}
        <div className="flex items-center justify-between lg:flex-col lg:items-center gap-2 mb-3">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)]">
              {stage.number}
            </span>
          </div>
        </div>

        {/* Stage Name */}
        <h4 className="text-base font-bold text-[var(--text-primary)] text-start lg:text-center mb-1 group-hover:text-[var(--color-primary)] transition-colors">
          {isEn ? stage.nameEn : stage.nameAr}
        </h4>

        {/* Tag line */}
        <p className="text-[11px] font-semibold text-[var(--color-primary)] text-start lg:text-center mb-2">
          {isEn ? stage.tagEn : stage.tagAr}
        </p>

        {/* Description */}
        <p className="text-xs text-[var(--text-muted)] text-start lg:text-center leading-relaxed font-normal">
          {isEn ? stage.descEn : stage.descAr}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-[var(--border-default)]/60 flex items-center justify-between lg:justify-center text-[10px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>{isEn ? 'Validated' : 'مرحلة معتمدة'}</span>
        </span>
      </div>
    </motion.div>
  );
};
