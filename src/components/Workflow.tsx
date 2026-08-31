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
    nameEn: 'Research',
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
    nameEn: 'Analysis',
    tagAr: 'تشخيص البيانات ونقاط التسرب',
    tagEn: 'Funnel & bottleneck analysis',
    descAr: 'تشخيص مسارات الشراء الحالية، اكتشاف مواضع الهدر المالي، وتحديد مؤشرات الأداء الأساسية.',
    descEn: 'Diagnostic evaluation of user drop-offs, budget leakage points, and core KPI baseline.',
    icon: BarChart2,
    color: '#06B6D4',
  },
  {
    id: 'plan',
    number: '03',
    nameAr: 'تخطيط',
    nameEn: 'Planning',
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
    nameEn: 'Build & Code',
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
    nameEn: 'Launch',
    tagAr: 'الإطلاق التقني والإعلاني',
    tagEn: 'Go-live & tracking activation',
    descAr: 'تفعيل خوادم الإنتاج، فحص جودة العمليات، وربط بكسلات التتبع الإعلاني (CAPI & Pixel).',
    descEn: 'Live production deployment, stress-testing workflows, and advanced tracking setup.',
    icon: Rocket,
    color: '#EC4899',
  },
  {
    id: 'operate',
    number: '06',
    nameAr: 'تشغيل',
    nameEn: 'Operations',
    tagAr: 'إدارة واستقرار المنظومة',
    tagEn: 'Operations & support',
    descAr: 'متابعة حية للعمليات، صيانة دورية، دعم فني مستمر، ومراقبة أداء الخوادم وقواعد البيانات.',
    descEn: 'Real-time uptime monitoring, proactive infrastructure maintenance, and operational support.',
    icon: Cpu,
    color: '#10B981',
  },
  {
    id: 'grow',
    number: '07',
    nameAr: 'نمو',
    nameEn: 'Scale & Growth',
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
    offset: ['start 80%', 'end 30%']
  });

  if (!config.sections.workflow) return null;

  return (
    <section 
      ref={containerRef}
      id="workflow"
      className="py-14 sm:py-20 relative overflow-hidden bg-[var(--surface-primary)] border-b border-[var(--border-default)] transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] max-w-4xl h-96 bg-[var(--color-primary)]/5 dark:bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'THE 7-STAGE LIFECYCLE' : 'رحلة الفكرة — من التأسيس إلى النمو'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-2.5">
            {isEn ? (
              <>We don't just build, we <span className="text-[var(--color-primary)]">engineer growth</span></>
            ) : (
              <>نحن لسنا شركة تنفيذ فقط.. <span className="text-[var(--color-primary)] block sm:inline">نحن شريك نمو متكامل</span></>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-normal max-w-2xl mx-auto leading-relaxed">
            {isEn 
              ? 'Our battle-tested 7-stage methodology transforms raw concepts into scalable, revenue-generating digital systems.'
              : 'منهجية من 7 مراحل متكاملة تحول الفكرة إلى منظومة برمجية وتجارية متكاملة وقابلة للتوسع ومضاعفة الأرباح.'}
          </p>
        </div>

        {/* Unified Journey Visualization */}
        
        {/* Desktop Connected Stream */}
        <div className="hidden lg:block relative mb-12">
          {/* Central Connecting Track */}
          <div className="absolute top-[38px] left-[5%] right-[5%] h-1 bg-[var(--surface-secondary)] z-0 rounded-full overflow-hidden border border-[var(--border-default)]">
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

          <div className="grid grid-cols-7 gap-2.5 relative z-10">
            {JOURNEY_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const threshold = index / (JOURNEY_STAGES.length - 1);
              const nodeActive = useTransform(
                scrollYProgress,
                [Math.max(0, threshold - 0.1), threshold, Math.min(1, threshold + 0.1)],
                [0.55, 1, 0.8]
              );
              const nodeScale = useTransform(
                scrollYProgress,
                [Math.max(0, threshold - 0.08), threshold, Math.min(1, threshold + 0.08)],
                shouldReduceMotion ? [1, 1, 1] : [0.94, 1.05, 0.98]
              );

              return (
                <motion.div
                  key={stage.id}
                  style={{
                    opacity: shouldReduceMotion ? 1 : nodeActive,
                    scale: nodeScale
                  }}
                  className="p-3.5 rounded-2xl border border-[var(--border-default)] hover:border-[var(--color-primary)] bg-[var(--surface-primary)]/95 backdrop-blur-md transition-all flex flex-col justify-between"
                >
                  <div className="flex flex-col items-center text-center">
                    <div 
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-xs mb-2 transition-transform"
                      style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>

                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] border border-[var(--border-default)] mb-1">
                      {stage.number}
                    </span>

                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">
                      {isEn ? stage.nameEn : stage.nameAr}
                    </h4>

                    <p className="text-[10px] font-semibold text-[var(--color-primary)] mb-1.5 line-clamp-1">
                      {isEn ? stage.tagEn : stage.tagAr}
                    </p>

                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-3">
                      {isEn ? stage.descEn : stage.descAr}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Compact Alternating Zig-Zag Journey Node Stream */}
        <div className="lg:hidden relative mb-10 px-2">
          {/* Vertical central connector line */}
          <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[3px] bg-[var(--surface-secondary)] z-0 rounded-full overflow-hidden border border-[var(--border-default)]">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#0F62FE] via-[#8B5CF6] to-[#F59E0B] rounded-full origin-top"
              style={{
                height: useTransform(
                  scrollYProgress, 
                  [0.05, 0.95], 
                  shouldReduceMotion ? ['100%', '100%'] : ['0%', '100%']
                )
              }}
            />
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            {JOURNEY_STAGES.map((stage, index) => {
              const Icon = stage.icon;
              const isEven = index % 2 === 0;
              const threshold = index / (JOURNEY_STAGES.length - 1);
              const nodeActive = useTransform(
                scrollYProgress,
                [Math.max(0, threshold - 0.12), threshold, Math.min(1, threshold + 0.12)],
                [0.6, 1, 0.85]
              );

              return (
                <motion.div
                  key={stage.id}
                  style={{ opacity: shouldReduceMotion ? 1 : nodeActive }}
                  className={`flex items-center w-full ${isEven ? 'justify-start pr-8 sm:pr-12' : 'justify-end pl-8 sm:pl-12'}`}
                >
                  <div className="w-[88%] sm:w-[75%] p-3.5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)]/95 backdrop-blur-md shadow-xs flex items-start gap-3">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${stage.color}15`, color: stage.color }}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--text-primary)] truncate">
                          {isEn ? stage.nameEn : stage.nameAr}
                        </h4>
                        <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                          {stage.number}
                        </span>
                      </div>
                      <p className="text-[10px] font-semibold text-[var(--color-primary)] mb-1 truncate">
                        {isEn ? stage.tagEn : stage.tagAr}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">
                        {isEn ? stage.descEn : stage.descAr}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Partnership Callout */}
        <div className="card-depth-2 rounded-2xl p-5 sm:p-7 border border-[var(--border-default)] bg-[var(--surface-secondary)]/70 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-start">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-0.5">
                {isEn ? 'End-to-End Execution Under One Roof' : 'تنفيذ متكامل من البداية إلى التوسع تحت سقف واحد'}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] font-normal">
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
            className="w-full md:w-auto px-6 py-2.5 sm:py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-xs sm:text-sm shadow-md hover:bg-[var(--color-primary)]/90 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>{isEn ? 'Start Your Project Journey' : 'ابدأ رحلة مشروعك الآن'}</span>
            {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>
    </section>
  );
};
