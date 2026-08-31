import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { BookOpen, Calendar, ArrowLeft, ArrowRight, Tag, Sparkles, TrendingUp, Layers, Cpu, Compass } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export interface BlogPost {
  id: number;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  image?: string;
  date: string;
  category: string;
  categoryEn?: string;
  readTime?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'أهمية التخطيط السليم قبل إطلاق متجرك الإلكتروني',
    titleEn: 'The Importance of Strategic Planning Before Launching Your E-Commerce Store',
    excerpt: 'خطوات عملية واضحة لتخطيط وإدارة مشروعك التجاري لضمان نمو وتطوير مستدام قبل إطلاق أي حملات إعلانية.',
    excerptEn: 'Clear actionable steps to structure and manage your business before launching paid campaigns.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400',
    date: '18 مايو 2026',
    category: 'إدارة الأعمال',
    categoryEn: 'Business Operations',
    readTime: '5 دقائق'
  },
  {
    id: 2,
    title: 'مواكبة التطورات والابتكار في التجارة الإلكترونية',
    titleEn: 'Embracing Innovation & Trends in Modern Digital Commerce',
    excerpt: 'تعرف على أحدث التوجهات التقنية في المتاجر الإلكترونية، وكيف تستخدم الابتكار لمضاعفة مبيعاتك ونموك.',
    excerptEn: 'Discover latest tech trends in e-commerce and how to utilize innovation to scale revenue.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600&h=400',
    date: '15 مايو 2026',
    category: 'التطوير والابتكار',
    categoryEn: 'Innovation & Tech',
    readTime: '6 دقائق'
  },
  {
    id: 3,
    title: 'نصائح لزيادة المبيعات: للتجار المبتدئين والحاليين',
    titleEn: 'Conversion Rate & Growth Playbook for Merchants',
    excerpt: 'دليل شامل يجمع أهم الاستراتيجيات لرفع العائد على الاستثمار، وكيفية التعامل مع تحديات السوق بنجاح.',
    excerptEn: 'Comprehensive guide combining key strategies to maximize ROAS and navigate competitive markets.',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=600&h=400',
    date: '10 مايو 2026',
    category: 'نصائح النمو',
    categoryEn: 'Growth Tips',
    readTime: '4 دقائق'
  },
  {
    id: 4,
    title: 'كيف تقرأ تقارير الحملات الإعلانية وتحللها؟',
    titleEn: 'Mastering Ad Analytics & Attribution Data',
    excerpt: 'أسرار رفع كفاءة إعلاناتك من خلال الفهم العميق لتقارير الأداء وتتبع سلوك العملاء بدقة.',
    excerptEn: 'Learn how to interpret performance analytics and track customer journeys with precision.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
    date: '05 مايو 2026',
    category: 'التسويق الرقمي',
    categoryEn: 'Digital Marketing',
    readTime: '7 دقائق'
  },
  {
    id: 5,
    title: 'الدليل الشامل لربط البكسلات وتتبع الإحالات',
    titleEn: 'Complete Guide to Tracking Pixels & Conversions',
    excerpt: 'كل ما تحتاج لمعرفته حول إعداد بكسل سناب شات، ميتا وتيك توك لتتبع الإحالات الناجحة وتعظيم أرباحك.',
    excerptEn: 'Everything you need about Meta, TikTok, and Snapchat pixel tracking setup.',
    image: 'https://images.unsplash.com/photo-1432888117426-15c015d86c8f?auto=format&fit=crop&q=80&w=600&h=400',
    date: '28 أبريل 2026',
    category: 'التتبع التحليلي',
    categoryEn: 'Analytics Tracking',
    readTime: '5 دقائق'
  },
  {
    id: 6,
    title: 'الفرق الشامل للبدء بين منصة سلة ومنصة زد',
    titleEn: 'Salla vs Zid: Choosing the Right Commerce Platform',
    excerpt: 'مقارنة مفصلة وتجربة حقيقية لضمان اختيار المنصة الأمثل لمشروعك بين عملاقي التجارة الإلكترونية سلة وزد.',
    excerptEn: 'In-depth comparison helping you pick between top Saudi regional platforms.',
    image: 'https://images.unsplash.com/photo-1531538512165-8b8120e2ef5b?auto=format&fit=crop&q=80&w=600&h=400',
    date: '20 أبريل 2026',
    category: 'منصات التجارة',
    categoryEn: 'Commerce Platforms',
    readTime: '8 دقائق'
  }
];

// Helper: Fallback Category Icon & Gradient
const getCategoryGraphic = (category: string) => {
  if (category.includes('ذكاء') || category.includes('ابتكار')) {
    return {
      icon: <Sparkles className="w-8 h-8 text-[var(--color-primary)]" />,
      gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent'
    };
  }
  if (category.includes('تسويق') || category.includes('نمو')) {
    return {
      icon: <TrendingUp className="w-8 h-8 text-[var(--color-accent)]" />,
      gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent'
    };
  }
  if (category.includes('تحليل') || category.includes('تتبع')) {
    return {
      icon: <Cpu className="w-8 h-8 text-cyan-400" />,
      gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent'
    };
  }
  return {
    icon: <Layers className="w-8 h-8 text-indigo-400" />,
    gradient: 'from-purple-600/20 via-indigo-600/10 to-transparent'
  };
};

export const BlogCard: React.FC<{ post: BlogPost; isEn: boolean }> = ({ post, isEn }) => {
  const [imgError, setImgError] = useState(false);
  const graphic = getCategoryGraphic(post.category);

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="card-depth-2 group/card flex flex-col h-full overflow-hidden transition-all duration-300 hover:border-[var(--interactive-border-active)]"
    >
      {/* Media Header / Branded Fallback */}
      <div className="h-48 relative overflow-hidden bg-[var(--surface-secondary)] border-b border-[var(--border-default)]">
        {/* Category Pill */}
        <div className="absolute top-3.5 right-3.5 rtl:right-3.5 ltr:left-3.5 ltr:right-auto z-10 bg-[var(--surface-primary)]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)] border border-[var(--border-default)] shadow-sm">
          {isEn ? (post.categoryEn || post.category) : post.category}
        </div>

        {!imgError && post.image ? (
          <img
            src={post.image}
            alt={isEn ? (post.titleEn || post.title) : post.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* Branded Fallback Visual */
          <div className={`w-full h-full bg-gradient-to-br ${graphic.gradient} flex flex-col items-center justify-center p-6 text-center relative`}>
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="p-3.5 rounded-2xl bg-[var(--surface-primary)]/80 border border-[var(--border-default)] shadow-sm mb-2 backdrop-blur-sm">
              {graphic.icon}
            </div>
            <span className="text-xs font-bold text-[var(--text-muted)] tracking-wider uppercase">
              {isEn ? (post.categoryEn || post.category) : post.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] font-medium mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[var(--color-primary)]" />
              {post.date}
            </span>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2.5 line-clamp-2 leading-snug group-hover/card:text-[var(--color-primary)] transition-colors">
            {isEn ? (post.titleEn || post.title) : post.title}
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
            {isEn ? (post.excerptEn || post.excerpt) : post.excerpt}
          </p>
        </div>

        <button className="text-[var(--text-primary)] bg-[var(--surface-secondary)] hover:bg-[var(--color-primary)] hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between group/btn transition-all duration-200 w-full mt-auto cursor-pointer border border-[var(--border-default)]">
          <span>{isEn ? 'Read Article' : 'قراءة المقال'}</span>
          <ArrowLeft size={15} className={`transition-transform ${isEn ? 'rotate-180 group-hover/btn:translate-x-1' : 'group-hover/btn:-translate-x-1'}`} />
        </button>
      </div>
    </div>
  );
};

export const Blog = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  const isStandalone = config.currentRoute === 'blog';

  if (!isStandalone && config.sections?.blog === false) return null;

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden" id="blog">
      <Helmet>
        <title>{isEn ? 'Articles & Insights | NmoLabs' : 'المدونة والمقالات | نمو لابز'}</title>
        <meta name="description" content={isEn ? 'Explore strategic articles on software, AI, e-commerce, and business growth.' : 'استكشف أحدث المقالات والرؤى التقنية في بناء الأنظمة، التجارة الإلكترونية، والنمو الرقمي.'} />
      </Helmet>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-bold text-[var(--color-primary)] mb-4"
        >
          <BookOpen size={13} />
          <span>{isEn ? 'Knowledge & Engineering Insights' : 'المعرفة والرؤى التقنية'}</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)] tracking-tight"
        >
          {isEn ? 'NmoLabs Blog & Insights' : 'مدونة ومقالات نمو لابز'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto"
        >
          {isEn 
            ? 'Articles, engineering breakdowns, and tactical strategies to build and scale modern digital businesses.' 
            : 'مقالات واستراتيجيات تقنية وعملية لمساعدتك على تخطيط، بناء، وتوسيع نطاق أعمالك الرقمية.'}
        </motion.p>
      </div>

      {/* Content Display */}
      {isStandalone ? (
        /* Standalone Grid Mode */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} isEn={isEn} />
            ))}
          </div>
        </div>
      ) : (
        /* Homepage Marquee Showcase */
        <div className="relative z-10 overflow-hidden w-full" dir="ltr">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 px-4">
            {[...blogPosts, ...blogPosts].map((post, index) => (
              <div key={`${post.id}-${index}`} className="w-[320px] sm:w-[380px] shrink-0">
                <BlogCard post={post} isEn={isEn} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
