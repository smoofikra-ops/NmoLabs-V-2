import React from 'react';
import { motion, useTransform } from 'motion/react';
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
  CheckCircle2
} from 'lucide-react';
import { triggerBookingModal } from '../BookingModal';
import { StorySceneContainer } from './StorySceneContainer';
import { STORY_ASSETS } from './storyAssets';

const SOCIAL_PILLARS = [
  {
    titleAr: 'صناعة المحتوى الإبداعي',
    titleEn: 'Creative Content Production',
    descAr: 'تصاميم جذابة، ريلز ومقاطع فيديو سريعة، وكتابة نصوص تسويقية تلامس اهتمام جمهورك.',
    descEn: 'High-converting creatives, engaging reels/shorts, and relatable copy tailored to your audience.',
    icon: Camera,
    color: '#EC4899',
    badge: 'Content & Visuals'
  },
  {
    titleAr: 'إدارة وتفعيل الحسابات',
    titleEn: 'Channel Growth & Moderation',
    descAr: 'جدولة النشر، التفاعل مع المتابعين، الردود السريعة، وبناء مجتمع مخلص لعلامتك.',
    descEn: 'Strategic publishing calendars, active community interaction, and loyal customer tribes.',
    icon: MessageSquare,
    color: '#8B5CF6',
    badge: 'Engagement & Community'
  },
  {
    titleAr: 'التوجيه الإبداعي والهوية',
    titleEn: 'Creative Direction & Brand Identity',
    descAr: 'توحيد النبرة والصوت البصري للعلامة عبر كافة المنصات لتعزيز الأثر والتميز.',
    descEn: 'Unified brand voice, visual aesthetics, and distinct positioning across all platforms.',
    icon: Sparkles,
    color: '#06B6D4',
    badge: 'Brand Authority'
  }
];

const MOCK_POSTS = [
  {
    platform: 'Instagram Reels',
    views: '240K+',
    engagement: '14.8%',
    category: 'ريلز نمو المنتجات',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600',
  },
  {
    platform: 'X / Twitter Campaign',
    views: '180K+',
    engagement: '9.2%',
    category: 'محتوى بناء الثقة',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
  },
  {
    platform: 'TikTok Trend Video',
    views: '450K+',
    engagement: '18.4%',
    category: 'فيديو فيروسي موجه للشراء',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=600',
  }
];

export const StorySocialPresence: React.FC = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';

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
            className="text-center max-w-3xl mx-auto mb-14 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-primary)]/90 backdrop-blur-md border border-[var(--border-default)] text-xs font-semibold text-[var(--color-primary)] mb-4 shadow-sm">
              <Share2 className="w-3.5 h-3.5" />
              <span>STORY 06 • {isEn ? 'Social Media & Brand Presence' : 'حضور العلامة والتأثير الرقمي'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-4">
              {isEn ? 'Elevating Brand Presence on Social Media' : 'إدارة وتطوير حضور العلامة في وسائل التواصل'}
            </h2>

            <p className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium">
              {isEn ? 'From creative direction to high-impact content and active community management.' : 'نبني لعلامتك حضوراً مؤثراً يجذب الجمهور المستهدف ويحول التفاعل إلى مبيعات وثقة.'}
            </p>
          </motion.div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {SOCIAL_PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;

              return (
                <PillarCard
                  key={pillar.titleAr}
                  pillar={pillar}
                  icon={Icon}
                  index={index}
                  isEn={isEn}
                  isReducedMotion={isReducedMotion}
                />
              );
            })}
          </div>

          {/* Social Content Proof Showcase */}
          <motion.div
            initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)]/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                  {isEn ? 'Engaging Formats That Spark Action' : 'نماذج وتجارب محتوى تصنع التفاعل'}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                  {isEn ? 'Optimized for TikTok, Instagram Reels, Snapchat, and X' : 'محتوى متجاوب مع خوارزميات المنصات وسلوك المستهلك المحلي'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? 'Strategic Publishing' : 'نشر مبني على الأثر'}</span>
              </div>
            </div>

            {/* Social Mockup Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {MOCK_POSTS.map((post, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={post.image} 
                      alt={post.platform}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur text-[11px] font-bold text-white">
                      {post.platform}
                    </div>
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-xs">
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

                  <div className="p-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-secondary)]">
                      {post.category}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => triggerBookingModal()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold shadow-md hover:opacity-95 transition-all"
              >
                <span>{isEn ? 'Build Your Social Presence' : 'طور حضور علامتك مع NmoLabs'}</span>
                {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </StorySceneContainer>
  );
};

interface PillarCardProps {
  pillar: typeof SOCIAL_PILLARS[0];
  icon: React.ElementType;
  index: number;
  isEn: boolean;
  isReducedMotion: boolean;
}

const PillarCard: React.FC<PillarCardProps> = ({
  pillar,
  icon: Icon,
  index,
  isEn,
  isReducedMotion
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: isReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: isReducedMotion ? 0 : Math.min(index * 0.1, 0.3) }}
      className="p-6 sm:p-7 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)]/90 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs"
            style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-muted)]">
            {pillar.badge}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2.5">
          {isEn ? pillar.titleEn : pillar.titleAr}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          {isEn ? pillar.descEn : pillar.descAr}
        </p>
      </div>
    </motion.div>
  );
};

