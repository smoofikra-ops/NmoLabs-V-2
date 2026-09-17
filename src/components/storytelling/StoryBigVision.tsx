import React from 'react';
import { motion, useTransform } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import { getWhatsAppUrl } from '../../lib/utils';
import { StorySceneContainer } from './StorySceneContainer';
import { STORY_ASSETS } from './storyAssets';
import { NATIONAL_DAY_96_CONFIG } from '../../config/nationalDay96';
import { NationalDay96Motif } from '../seasonal/NationalDayElements';

const AUDIENCES = [
  'صاحب فكرة ناشئة',
  'صاحب مشروع قائم',
  'شركة تبحث عن التوسع',
  'مستثمر ورائد أعمال',
  'صاحب رأس مال يبحث عن فرصة',
  'جهة لديها تحدٍ يحتاج لحل'
];

const AUDIENCES_EN = [
  'Early Stage Founder',
  'Established Business',
  'Scaling Enterprise',
  'Investor & Entrepreneur',
  'Capital Seeking Opportunities',
  'Organization with a Complex Challenge'
];

export const StoryBigVision: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  return (
    <StorySceneContainer
      id="story-big-vision"
      bgUrl={STORY_ASSETS.STORY_07_VISION}
      isEn={isEn}
    >
      {({ scrollYProgress, headerOpacity, headerY, isReducedMotion }) => (
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Story Header */}
          <motion.div style={{ opacity: headerOpacity, y: headerY }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STORY 07 • {isEn ? 'Idea to Operating Business' : 'من الفكرة إلى التشغيل والنمو'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-6">
              {isEn ? 'Have a Bigger Vision?' : 'وعندك فكرة أكبر؟'}
            </h2>

            <p className="text-xl sm:text-2xl text-[var(--color-primary)] font-bold mb-6">
              {isEn 
                ? 'NmoLabs is your technology & execution partner from concept to scale.'
                : 'NmoLabs شريكك من الفكرة إلى النمو والتشغيل.'
              }
            </p>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 font-medium">
              {isEn 
                ? 'Whether you are launching a new startup, modernizing enterprise workflows, or scaling an established brand — we bring engineering, growth science, and operations under one roof.'
                : 'سواء كنت تملك فكرة مشروع مبتكر، تبحث عن حل لتعقيدات التشغيل، أو ترغب في مضاعفة مبيعاتك وأرباحك، نبني وننفذ معك خطوة بخطوة.'
              }
            </p>
          </motion.div>

          {/* Target Audiences Chips */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {(isEn ? AUDIENCES_EN : AUDIENCES).map((audience, idx) => (
              <span 
                key={idx}
                className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-[var(--text-secondary)] shadow-xs"
              >
                {audience}
              </span>
            ))}
          </div>

          {/* Final Growth Partner Showcase Box (STORY 08) */}
          <motion.div 
            initial={{ opacity: 0, y: isReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-3xl bg-[var(--surface-primary)]/95 backdrop-blur-xl p-8 sm:p-10 shadow-xl overflow-hidden text-center mb-6 transition-all ${
              NATIONAL_DAY_96_CONFIG.isActive 
                ? 'border-2 border-emerald-600/30 dark:border-emerald-500/30 shadow-[0_16px_50px_-10px_rgba(11,87,56,0.2)]'
                : 'border border-[var(--border-default)]'
            }`}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <img 
                src={STORY_ASSETS.STORY_08_PARTNER}
                alt="NmoLabs Growth Partner"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-primary)] via-[var(--surface-primary)]/80 to-transparent" />
            </div>

            {/* National Day 96 Decorative Ambient Motif */}
            {NATIONAL_DAY_96_CONFIG.isActive && (
              <div className="absolute -top-12 -right-12 pointer-events-none opacity-25 dark:opacity-30 select-none">
                <NationalDay96Motif size={180} glow={false} />
              </div>
            )}

            <div className="relative z-10">
              {NATIONAL_DAY_96_CONFIG.isActive && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 shadow-xs">
                  <span>🇸🇦</span>
                  <span>{isEn ? NATIONAL_DAY_96_CONFIG.partnershipEn : NATIONAL_DAY_96_CONFIG.partnershipAr}</span>
                  <span className="opacity-40">•</span>
                  <span className="text-amber-700 dark:text-amber-300 font-black">{isEn ? NATIONAL_DAY_96_CONFIG.sloganEn : NATIONAL_DAY_96_CONFIG.sloganAr}</span>
                </div>
              )}

              <div className="block" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>STORY 08 • {isEn ? 'Your Long-Term Growth Partner' : 'شريكك التقني والتشغيلي المستدام'}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-3">
                {isEn ? 'Ready to Build Something Significant?' : 'جاهز لتحويل رؤيتك إلى واقع رقمي متكامل؟'}
              </h3>

              <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto mb-8">
                {isEn 
                  ? 'Connect directly with our strategy and engineering team to evaluate your project scope and launch roadmap.'
                  : 'تواصل مباشرة مع فريق الاستراتيجية والهندسة لدينا لتقييم متطلبات مشروعك والبدء في خارطة التنفيذ.'
                }
              </p>

              {/* Direct CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    updateConfig({ currentRoute: 'kyc' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-primary)] text-white text-base font-bold shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>{isEn ? 'Start Project Discovery' : 'ابدأ دراسة مشروعك الآن'}</span>
                  {isEn ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                </button>

                {config.contactNumber && (
                  <a
                    href={getWhatsAppUrl(config.contactNumber, 'مرحباً، أود استكشاف شراكة وبناء مشروع مع NmoLabs')}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-tertiary)] border border-[var(--border-default)] text-[var(--text-primary)] text-base font-bold transition-all shadow-sm flex items-center justify-center gap-2.5"
                  >
                    <MessageCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>{isEn ? 'Chat on WhatsApp' : 'تحدث مباشرة عبر واتساب'}</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </StorySceneContainer>
  );
};

