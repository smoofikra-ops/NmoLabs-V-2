import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const faqCategories = [
  {
    titleAr: 'عن المنصة وحلولنا الذكية',
    titleEn: 'About NmoLabs & Smart Solutions',
    questions: [
      {
        qAr: 'أنتم مجرد وكالة تسويق (Agency) عادية؟',
        qEn: 'Are you just a traditional marketing agency?',
        aAr: 'لا، نمو لابز هي منظومة تقنية وشريك نمو استراتيجي. ندمج الأنظمة البرمجية، أدوات الذكاء الاصطناعي، والخبرة الهندسية والتسويقية لبناء حلول نمو مستدامة مبنية على البيانات والحقائق.',
        aEn: 'No, NmoLabs is a technology ecosystem and strategic growth partner. We combine custom software engineering, AI tooling, and operational marketing expertise to deliver verified, data-driven business scale.'
      },
      {
        qAr: 'ما هي الحلول والمنظومات التي تطورونها؟',
        qEn: 'What solutions and systems do you develop?',
        aAr: 'نصمم ونبني أنظمة إدارة العمليات (ERP/CRM)، منصات التجارة الإلكترونية المتقدمة، محركات أتمتة الأعمال، ونماذج الذكاء الاصطناعي التوليدي والتحليلي المخصصة للشركات.',
        aEn: 'We engineer enterprise ERP & CRM systems, bespoke headless commerce platforms, business automation engines, and custom generative/predictive AI systems.'
      },
      {
        qAr: 'كم من الوقت يلزم لمشاهدة نتائج ملموسة؟',
        qEn: 'How long does it take to see measurable results?',
        aAr: 'تبدأ المؤشرات الأولية والتحسينات التشغيلية بالظهور خلال أول 14 إلى 21 يوماً من إطلاق النظام أو الحملة، مع استقرار المؤشرات الرئيسية والنمو المضاعف بين 30 إلى 90 يوماً.',
        aEn: 'Initial operational milestones and conversion lifts appear within 14 to 21 days of launch, with compounding growth and scaled ROI stabilizing between 30 and 90 days.'
      }
    ]
  },
  {
    titleAr: 'نماذج العمل والتكامل',
    titleEn: 'Engagement Models & Integration',
    questions: [
      {
        qAr: 'هل تقدمون حلولاً مخصصة بالكامل أم باقات جاهزة؟',
        qEn: 'Do you offer custom tailored solutions or fixed packages?',
        aAr: 'نقدم كلاً النموذجين: منتجات وأنظمة ذكية جاهزة للتشغيل الفوري مع خيارات تخصيص، بالإضافة إلى تطوير أنظمة مخصصة بالكامل (Bespoke Enterprise Engineering) حسب متطلباتك الدقيقة.',
        aEn: 'We offer both: ready-to-deploy modular SaaS systems with configuration options, as well as 100% bespoke engineering built specifically for enterprise specifications.'
      },
      {
        qAr: 'هل تتكامل أنظمتكم مع منصات التجارة مثل سلة وزد وشوبيفاي؟',
        qEn: 'Do your systems integrate with Salla, Zid, and Shopify?',
        aAr: 'نعم بكل تأكيد. جميع منتجاتنا مصممة وفق معمارية برمجية مفتوحة وقابلة للربط السلس عبر واجهات برمجة التطبيقات (APIs) و Webhooks مع كافة المنصات الإقليمية والعالمية.',
        aEn: 'Yes, absolutely. All our systems are built with open API architecture and webhooks, ensuring frictionless bi-directional integration with Salla, Zid, Shopify, and external ERPs.'
      },
      {
        qAr: 'كيف نبدأ استشارة أو مشروعاً مع نمو لابز؟',
        qEn: 'How do we kick off a project or consultation?',
        aAr: 'يمكنك ببساطة النقر على زر "تواصل معنا" أو "ابدأ مشروعك"، وسيقوم مستشارونا التقنيون بجدولة جلسة استكشاف وتحليل متطلبات خلال 24 ساعة.',
        aEn: 'Simply click "Talk to Us" or "Start Project", and our senior technology consultants will schedule a discovery & scoping session within 24 hours.'
      }
    ]
  }
];

export const FAQ = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  const isStandalone = config.currentRoute === 'faq';
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isStandalone && config.sections?.faq === false) return null;

  return (
    <section className="py-12 sm:py-16 md:py-24 relative overflow-hidden" id="faq">
      <Helmet>
        <title>{isEn ? 'Frequently Asked Questions | NmoLabs' : 'الأسئلة الشائعة | نمو لابز'}</title>
        <meta name="description" content={isEn ? 'Find verified answers to common questions about NmoLabs engineering, solutions, AI tools, and process.' : 'إجابات شاملة ومفصلة حول حلول نمو لابز البرمجية، أدوات الذكاء الاصطناعي، ومنهجية العمل.'} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-xs font-bold text-[var(--color-primary)] mb-4"
          >
            <HelpCircle size={14} />
            <span>{isEn ? 'Clarity & Verification' : 'إجابات واضحة وشفافة'}</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[var(--text-primary)] tracking-tight"
          >
            {isEn ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
          </motion.h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto">
            {isEn 
              ? 'Everything you need to know about our technology systems, development workflows, and partnership models.' 
              : 'كل ما تحتاج لمعرفته حول حلولنا التقنية، نماذج التكامل، ومراحل بناء المنتجات.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {faqCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(0);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === idx 
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--interactive-border)]'
              }`}
            >
              {isEn ? cat.titleEn : cat.titleAr}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-3.5"
            >
              {faqCategories[activeCategory].questions.map((faq, i) => {
                const isOpen = openIndex === i;
                const questionText = isEn ? faq.qEn : faq.qAr;
                const answerText = isEn ? faq.aEn : faq.aAr;

                return (
                  <div 
                    key={i}
                    className={`card-depth-1 transition-all duration-200 rounded-2xl overflow-hidden ${
                      isOpen 
                        ? 'bg-[var(--surface-secondary)] border border-[var(--interactive-border-active)]' 
                        : 'bg-[var(--surface-primary)] border border-[var(--border-default)] hover:border-[var(--interactive-border)]'
                    }`}
                  >
                    <button 
                      className="w-full text-right rtl:text-right ltr:text-left p-5 text-sm sm:text-base font-bold flex items-center justify-between text-[var(--text-primary)] group focus-visible:outline-none cursor-pointer"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className={`pr-2 rtl:pr-0 rtl:pl-4 transition-colors ${isOpen ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'}`}>
                        {questionText}
                      </span>
                      <div 
                        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border ${
                          isOpen 
                            ? 'bg-[var(--color-primary)] text-white border-transparent' 
                            : 'bg-[var(--surface-secondary)] border-[var(--border-default)] text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <Plus size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-5 pt-0 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-default)]/50 mx-5 mt-1">
                            {answerText}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
