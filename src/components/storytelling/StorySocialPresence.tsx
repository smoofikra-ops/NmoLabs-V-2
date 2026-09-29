import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../../context/SiteContext';
import { 
  Share2, 
  Sparkles, 
  MessageSquare, 
  Eye, 
  ArrowLeft, 
  ArrowRight,
  TrendingUp,
  Camera,
  CheckCircle2,
  X,
  Maximize2,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { triggerBookingModal } from '../BookingModal';
import { StorySceneContainer } from './StorySceneContainer';
import { STORY_ASSETS, SOCIAL_ASSETS } from './storyAssets';

const SOCIAL_PILLARS = [
  {
    id: 'creative-content',
    titleAr: 'صناعة المحتوى الإبداعي',
    titleEn: 'Creative Content Production',
    descAr: 'تصاميم جذابة، ريلز ومقاطع فيديو سريعة، وكتابة نصوص تسويقية تلامس اهتمام جمهورك.',
    descEn: 'High-converting creatives, engaging reels/shorts, and relatable copy tailored to your audience.',
    icon: Camera,
    color: '#EC4899',
    badge: 'Content & Visuals',
    benefitsAr: [
      'إنتاج مقاطع فيديو قصيرة (Reels / TikTok) متوافقة مع الخوارزميات',
      'كتابة نصوص تسويقية جاذبة تركز على نقاط اهتمام العميل',
      'تصاميم بصرية متناسقة تعزز هوية العلامة وتزيد التفاعل'
    ],
    benefitsEn: [
      'Algorithm-friendly short video production (Reels / TikTok)',
      'High-converting copywriting addressing customer pain points',
      'Consistent visual creatives reinforcing brand identity'
    ]
  },
  {
    id: 'channel-growth',
    titleAr: 'إدارة وتفعيل الحسابات',
    titleEn: 'Channel Growth & Moderation',
    descAr: 'جدولة النشر، التفاعل مع المتابعين، الردود السريعة، وبناء مجتمع مخلص لعلامتك.',
    descEn: 'Strategic publishing calendars, active community interaction, and loyal customer tribes.',
    icon: MessageSquare,
    color: '#8B5CF6',
    badge: 'Engagement & Community',
    benefitsAr: [
      'جدولة واستمرارية النشر في الأوقات الأعلى وصولاً وتفاعلاً',
      'إدارة الردود على الاستفسارات وبناء علاقة قوية مع المتابعين',
      'تحليل مؤشرات التفاعل وتحديث استراتيجية المحتوى دورياً'
    ],
    benefitsEn: [
      'Consistent publishing during peak audience activity windows',
      'Active inquiry moderation and strong community engagement',
      'Ongoing analytics tracking and agile content optimization'
    ]
  },
  {
    id: 'creative-direction',
    titleAr: 'التوجيه الإبداعي والهوية',
    titleEn: 'Creative Direction & Brand Identity',
    descAr: 'توحيد النبرة والصوت البصري للعلامة عبر كافة المنصات لتعزيز الأثر والتميز.',
    descEn: 'Unified brand voice, visual aesthetics, and distinct positioning across all platforms.',
    icon: Sparkles,
    color: '#06B6D4',
    badge: 'Brand Authority',
    benefitsAr: [
      'توحيد الصوت البصري ونبرة الخطاب عبر كافة القنوات الرقمية',
      'بناء قوالب محتوى حصرية تميز علامتك عن المنافسين',
      'تعزيز مكانة العلامة وثقة العملاء لتحفيز قرارات الشراء'
    ],
    benefitsEn: [
      'Unified aesthetic voice and positioning across all channels',
      'Exclusive branded content frameworks and templates',
      'Elevated brand prestige and buyer trust acceleration'
    ]
  }
];

const MOCK_POSTS = [
  {
    id: 'instagram-reels',
    platform: 'Instagram Reels',
    platformAr: 'إنستغرام ريلز',
    views: '240K+',
    engagement: '14.8%',
    category: 'ريلز نمو المنتجات',
    categoryEn: 'Product Growth Reels',
    image: SOCIAL_ASSETS.INSTAGRAM_IDEA,
    descriptionAr: 'نموذج محتوى فيديو قصير مصمم لإبراز قيمة المنتج وتجربة استخدامه في ثوانٍ معدودة، محققاً تفاعلاً عالي ونسبة حفظ ومشاركة قياسية.',
    descriptionEn: 'Short-form visual showcase highlighting product utility and lifestyle appeal, generating viral engagement and bookmark metrics.'
  },
  {
    id: 'snapchat-campaign',
    platform: 'Snapchat Campaign',
    platformAr: 'حملات سناب شات',
    views: '180K+',
    engagement: '9.2%',
    category: 'محتوى العروض وبناء الثقة',
    categoryEn: 'Offers & Trust Content',
    image: SOCIAL_ASSETS.SNAP_IDEA,
    descriptionAr: 'قصص تفاعلية مصممة خصيصاً لسلوك مستخدمي سناب شات في السوق السعودي والخليجي مع روابط توجيه مباشرة لصفحة الشراء.',
    descriptionEn: 'Native full-screen vertical storytelling optimized for Saudi/GCC Snapchat behavior with direct swipe-up call-to-actions.'
  },
  {
    id: 'tiktok-trend',
    platform: 'TikTok Trend Video',
    platformAr: 'تيك توك تريند',
    views: '450K+',
    engagement: '18.4%',
    category: 'فيديو فيروسي موجه للشراء',
    categoryEn: 'Viral High-Conversion Video',
    image: SOCIAL_ASSETS.TIKTOK_IDEA,
    descriptionAr: 'محتوى تفاعلي سريع يستثمر تريندات المنصة بذكاء لربط علامتك بجمهور واسع ومضاعفة المبيعات الفورية.',
    descriptionEn: 'Dynamic, trend-aligned native video engineered for maximum organic reach and rapid conversion acceleration.'
  }
];

export const StorySocialPresence: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const [activePillarModal, setActivePillarModal] = useState<typeof SOCIAL_PILLARS[0] | null>(null);
  const [activeExampleModal, setActiveExampleModal] = useState<typeof MOCK_POSTS[0] | null>(null);

  // Close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePillarModal(null);
        setActiveExampleModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activePillarModal || activeExampleModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePillarModal, activeExampleModal]);

  return (
    <StorySceneContainer
      id="story-social"
      bgUrl={STORY_ASSETS.STORY_06_SOCIAL}
      isEn={isEn}
    >
      {({ scrollYProgress, headerOpacity, headerY, isReducedMotion }) => (
        <>
          {/* Story Header */}
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center max-w-3xl mx-auto mb-10 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
              <Share2 className="w-3.5 h-3.5" />
              <span>STORY 06 • {isEn ? 'Social Media & Brand Presence' : 'حضور العلامة والتأثير الرقمي'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
              {isEn ? 'Elevating Brand Presence on Social Media' : 'إدارة وتطوير حضور العلامة في وسائل التواصل'}
            </h2>

            <p className="text-base sm:text-xl text-[var(--text-secondary)] font-medium">
              {isEn ? 'From creative direction to high-impact content and active community management.' : 'نبني لعلامتك حضوراً مؤثراً يجذب الجمهور المستهدف ويحول التفاعل إلى مبيعات وثقة.'}
            </p>
          </motion.div>

          {/* 3 Pillars: Horizontal Rail on Mobile, 3-Col Grid on Desktop */}
          <div className="mb-10 lg:mb-12">
            {/* Mobile swipe hint */}
            <div className="flex md:hidden items-center justify-between px-1 mb-2 text-[11px] font-semibold text-[var(--text-muted)]">
              <span>{isEn ? 'Swipe services' : 'اسحب لاستعراض الخدمات'}</span>
              <span className="flex items-center gap-0.5 text-[var(--color-primary)]">
                {isEn ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </span>
            </div>

            <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {SOCIAL_PILLARS.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <div 
                    key={pillar.id}
                    className="min-w-[82vw] sm:min-w-[300px] md:min-w-0 snap-center shrink-0 md:shrink"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: isReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
                      onClick={() => setActivePillarModal(pillar)}
                      className="p-5 sm:p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)]/95 backdrop-blur-md shadow-sm hover:shadow-md hover:border-[var(--interactive-border)] transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                          <div 
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
                            style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-muted)]">
                            {pillar.badge}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                          {isEn ? pillar.titleEn : pillar.titleAr}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                          {isEn ? pillar.descEn : pillar.descAr}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[var(--border-default)] flex items-center justify-between text-xs font-bold text-[var(--color-primary)]">
                        <span>{isEn ? 'View Details & Benefits' : 'عرض التفاصيل والمميزات'}</span>
                        {isEn ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Content Proof Showcase: Compact Horizontal Row on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)]/90 backdrop-blur-md p-5 sm:p-8 lg:p-10 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">
                  {isEn ? 'Engaging Formats That Spark Action' : 'نماذج وتجارب محتوى تصنع التفاعل'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  {isEn ? 'Tap any example to inspect full creative details' : 'انقر على أي نموذج للاطلاع على التفاصيل والنتائج'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? 'Optimized for Saudi/GCC' : 'محتوى متجاوب مع خوارزميات المنصات'}</span>
              </div>
            </div>

            {/* Content Examples: Horizontal Snap Rail on Mobile, 3-Col Grid on SM+ */}
            <div className="flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory hide-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0">
              {MOCK_POSTS.map((post) => (
                <div 
                  key={post.id}
                  onClick={() => setActiveExampleModal(post)}
                  className="min-w-[78vw] sm:min-w-0 snap-center shrink-0 sm:shrink rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] overflow-hidden shadow-xs hover:shadow-md hover:border-[var(--interactive-border)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative h-40 sm:h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={post.image} 
                      alt={isEn ? post.platform : post.platformAr}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-[10px] sm:text-[11px] font-bold text-white">
                      {isEn ? post.platform : post.platformAr}
                    </div>

                    <div className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-bold">
                        <Eye className="w-3.5 h-3.5" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {post.engagement}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-secondary)] truncate">
                      {isEn ? post.categoryEn : post.category}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => triggerBookingModal()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[var(--color-primary-hover)] transition-all cursor-pointer"
              >
                <span>{isEn ? 'Build Your Social Presence' : 'طور حضور علامتك مع NmoLabs'}</span>
                {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* MODAL 1: SERVICE PILLAR DETAILS */}
          {/* ======================================================== */}
          <AnimatePresence>
            {activePillarModal && (
              <div 
                className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                onClick={() => setActivePillarModal(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg rounded-3xl bg-[var(--surface-primary)] border border-[var(--border-default)] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                >
                  <button 
                    onClick={() => setActivePillarModal(null)}
                    className="absolute top-4 left-4 sm:top-5 sm:left-5 w-8 h-8 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 mb-5">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activePillarModal.color}15`, color: activePillarModal.color }}
                    >
                      <activePillarModal.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface-secondary)] text-[var(--text-muted)]">
                        {activePillarModal.badge}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                        {isEn ? activePillarModal.titleEn : activePillarModal.titleAr}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                    {isEn ? activePillarModal.descEn : activePillarModal.descAr}
                  </p>

                  <div className="mb-6 space-y-2.5 bg-[var(--surface-secondary)] p-4 rounded-2xl border border-[var(--border-default)]">
                    <h4 className="text-xs font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Key Deliverables & Value' : 'أبرز مخرجات وقيمة الخدمة:'}
                    </h4>
                    {(isEn ? activePillarModal.benefitsEn : activePillarModal.benefitsAr).map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActivePillarModal(null);
                        triggerBookingModal();
                      }}
                      className="flex-1 py-3 px-5 rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[var(--color-primary-hover)] transition-all text-center cursor-pointer"
                    >
                      {isEn ? 'Request This Service' : 'اطلب الخدمة الآن'}
                    </button>
                    <button
                      onClick={() => setActivePillarModal(null)}
                      className="py-3 px-5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] text-xs sm:text-sm font-semibold hover:text-[var(--text-primary)] transition-all cursor-pointer"
                    >
                      {isEn ? 'Close' : 'إغلاق'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* ======================================================== */}
          {/* MODAL 2: CONTENT EXAMPLE LIGHTBOX */}
          {/* ======================================================== */}
          <AnimatePresence>
            {activeExampleModal && (
              <div 
                className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={() => setActiveExampleModal(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg rounded-3xl bg-[var(--surface-primary)] border border-[var(--border-default)] overflow-hidden shadow-2xl relative"
                >
                  <button 
                    onClick={() => setActiveExampleModal(null)}
                    className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                    aria-label="Close lightbox"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="relative h-64 sm:h-72 w-full bg-black">
                    <img 
                      src={activeExampleModal.image} 
                      alt={isEn ? activeExampleModal.platform : activeExampleModal.platformAr}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white text-xs">
                      <span className="font-bold text-sm">
                        {isEn ? activeExampleModal.platform : activeExampleModal.platformAr}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 font-bold">
                          <Eye className="w-3.5 h-3.5" />
                          {activeExampleModal.views}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {activeExampleModal.engagement}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-2 inline-block">
                      {isEn ? activeExampleModal.categoryEn : activeExampleModal.category}
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                      {isEn ? activeExampleModal.descriptionEn : activeExampleModal.descriptionAr}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setActiveExampleModal(null);
                          triggerBookingModal();
                        }}
                        className="flex-1 py-3 px-5 rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[var(--color-primary-hover)] transition-all text-center cursor-pointer"
                      >
                        {isEn ? 'Start Creative Campaign' : 'ابدأ حملتك الإبداعية'}
                      </button>
                      <button
                        onClick={() => setActiveExampleModal(null)}
                        className="py-3 px-5 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] text-xs sm:text-sm font-semibold hover:text-[var(--text-primary)] transition-all cursor-pointer"
                      >
                        {isEn ? 'Close' : 'إغلاق'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </StorySceneContainer>
  );
};
