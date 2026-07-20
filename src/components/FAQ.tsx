import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqCategories = [
  {
    title: 'عن المنصة وحلولنا الذكية',
    questions: [
      {
        q: 'أنتم مجرد وكالة تسويق (Agency) عادية؟',
        a: 'لا، إحنا منصة (SaaS) وشريك نمو تقني. ندمج أدوات الذكاء الاصطناعي عشان نحلل متجرك، مع خبرات تسويقية تدير حملاتك وتصنع محتواك، عشان نوفر لك نمو حقيقي مبني على الأرقام مو التخمين.'
      },
      {
        q: 'وش هي الحلول الذكية اللي تغير طريقة البيع؟',
        a: 'نقدم لك أدوات تحليل متكاملة، تحسين محركات بحث، إدارة حملات إعلانية مدعومة بالتقنية، وفحص دقيق للمتجر عشان نكتشف وين يضيع العميل ونعالج المشكلة فوراً.'
      },
      {
        q: 'كيف تفيدني هالحلول الذكية؟',
        a: 'حلولنا تتميز بالدقة وسرعة التنفيذ لأنها تعتمد على الأرقام والذكاء الاصطناعي. بتقدر تحسن واجهة متجرك، تقلل تكاليف إعلاناتك، وترفع مبيعاتك بشكل مستدام.'
      },
      {
        q: 'كم يبي لي عشان أشوف نتايج؟',
        a: 'التحسن المبدئي يبدأ خلال أول 14 يوم بعد التدقيق التقني، ونتائج الحملات الكبيرة تبدأ توضح من 30 إلى 90 يوم كحد أقصى عشان نوصل لأفضل عائد إعلاني (ROAS).'
      },
      {
        q: 'كيف تختلف منصتكم عن باقي أدوات التحليل؟',
        a: 'ما نعطيك أرقام وتخطيطات وبس، إحنا نربط كل مشكلة بحل تسويقي وننفذه لك إذا تبي، يعني إحنا شريك نجاح مو بس أداة تراقب أداءك.'
      }
    ]
  },
  {
    title: 'الأسعار والتواصل',
    questions: [
      {
        q: 'هل الأدوات اشتراكها لحالها ولا ضمن الخدمات؟',
        a: 'الأدوات متاحة لكل مشتركين باقاتنا كجزء من الشراكة. وقريباً بنوفر اشتراك منفصل للي يبغى يدير متجره بنفسه.'
      },
      {
        q: 'عندكم باقات تناسب حجم متجري؟',
        a: 'أكيد، عندنا باقات مرنة تناسب الكل (أعمال واحترافية) بالإضافة لباقات مخصصة بالكامل للمتاجر الكبيرة واللي تحتاج ربط API.'
      },
      {
        q: 'كيف أتواصل معكم عشان أختار الباقة الصح؟',
        a: 'بكل بساطة اضغط على "تواصل معنا"، وبيحولك للواتساب ومستشارينا بيعطونك أفضل توصية لمشروعك.'
      },
      {
        q: 'أقدر أجرب قبل ما أدفع؟',
        a: 'عندنا باقة مجانية مدى الحياة تعطيك وصول لأدوات أساسية زي حاسبة الأداء وفاحص السرعة عشان تبدأ تحسّن متجرك بدون أي التزام.'
      },
      {
        q: 'تدعمون متاجر سلة وزد؟',
        a: 'طبعاً! منصتنا مصممة عشان تتوافق بشكل كامل مع سلة وزد وتقدر تسحب البيانات وتنفذ خططك بسهولة تامة.'
      }
    ]
  },
  {
    title: 'متاعب جوجل وحلولها',
    questions: [
      {
        q: 'حسابي في Google Merchant Center توقف، تقدرون تحلونه؟',
        a: 'إيه نعم، عندنا خبرة قوية في حل تعليق Merchant Center، نعالج مشاكل الوصف المضلل والبيانات الناقصة عشان ترجع إعلاناتك بسلام.'
      },
      {
        q: 'منتجاتي ترفضها إعلانات جوجل دايم، وش الحل؟',
        a: 'نفحص المنتجات المرفوضة ونعرف وش السياسة اللي تسببت بالرفض (سواء أسعار، جودة صور، أو مشاكل تقنية زي الـ GTIN) ونحلها لك من جذورها.'
      },
      {
        q: 'حسابي بـ Google Ads تبند، كيف تساعدوني؟',
        a: 'حالات الإيقاف يبيلها مراجعة دقيقة لسبب المشكلة سواء فوترة أو مخالفات. نرفع لك التماس احترافي وندير التواصل لين تنحل.'
      },
      {
        q: 'متجري ما يظهر بخرائط جوجل للبحث المحلي، وش السواة؟',
        a: 'نضبط لك الظهور المحلي بخرائط جوجل ونستهدف الكلمات المفتاحية الصح عشان تكسب ثقة العملاء وتظهر لهم لما يبحثون.'
      },
      {
        q: 'عندي مشاكل أرشفة في Search Console؟',
        a: 'نحلل تقارير جوجل كونسول عشان نعرف الصفحات اللي ما تأرشفت، ونضبط أخطاء الأداء (Core Web Vitals) عشان ترتفع تصنيفات متجرك.'
      }
    ]
  },
  {
    title: 'الحملات وضمان الجودة',
    questions: [
      {
        q: 'وش يضمن لي نجاح الحملات؟',
        a: 'ما نطلق أي إعلان قبل ما نقفل كل "ثغرات التسرب" بمتجرك (مشاكل تقنية، صور ضعيفة، رحلة شراء معقدة). هالشيء يرفع نسبة نجاح الحملة أكثر من 80% مقارنة باللي يطلق إعلان وهو مغمض.'
      },
      {
        q: 'كيف تقيسون أداء الإعلانات؟',
        a: 'نعتمد على مؤشرات الأداء الحقيقية (KPIs) وعندنا لوحات تحكم دقيقة تراقب العائد الإعلاني ومعدلات التحويل لحظة بلحظة عشان نحسّن باستمرار.'
      },
      {
        q: 'فيه تقارير دورية لأداء متجري؟',
        a: 'أكيد، بتشوف بيانات دقيقة من لوحة تحكم المنصة، ونرسل لك تقارير ملخصة مع توصيات استراتيجية.'
      },
      {
        q: 'وش يصير لو ما شفت النتائج اللي أبيها؟',
        a: 'إحنا نؤمن بالشراكة والمشاركة بالنتائج. لو صار أي نزول، نتدخل فوراً بحملات A/B Testing ونحلل وين المشكلة عشان نعدل المسار بسرعة.'
      },
      {
        q: 'تسوون محتوى ولا بس تديرون الإعلانات؟',
        a: 'نضبط لك الشغلة كاملة! نبني لك خطة محتوى، نكتب لك نصوص تسويقية بطلة تقنع العميل، وندير لك إعلاناتك بأعلى المعايير.'
      }
    ]
  }
];

export const FAQ = () => {
  const { config } = useSite();
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!config.sections.faq) return null;

  return (
    <section className="py-16 sm:py-24 md:py-32 relative bg-grid-pattern" id="faq">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-[var(--border-default)] text-xs sm:text-sm font-medium mb-4 sm:mb-6 text-[var(--text-muted)]"
          >
            <HelpCircle size={16} />
            إجابات شفافة
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-[var(--text-primary)]"
          >
            الأسئلة الشائعة
          </motion.h2>
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] font-light">كل ما يدور في ذهنك حول منهجيتنا التقنية في التسويق.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {faqCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === idx 
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.4)]'
                  : 'bg-[var(--surface-secondary)] border border-[var(--border-default)] shadow-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-primary)] hover:border-[var(--color-primary)]/50'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="space-y-4 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {faqCategories[activeCategory].questions.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div 
                    key={i}
                    className={`transition-all duration-300 rounded-2xl overflow-hidden ${isOpen ? 'bg-[var(--surface-secondary)]/90 border border-[var(--interactive-border-active)] shadow-[var(--interactive-glow)]' : 'bg-[var(--surface-secondary)]/40 backdrop-blur-sm border border-[var(--interactive-border)] shadow-sm hover:bg-[var(--surface-secondary)]/80 hover:border-[var(--interactive-border-hover)] hover:shadow-[0_0_10px_rgba(79,142,247,0.05)]'}`}
                  >
                    <button 
                      className="w-full text-right p-5 md:p-6 text-lg font-bold flex items-center justify-between text-[var(--text-primary)] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className={`pl-4 leading-relaxed transition-colors ${isOpen ? 'text-[var(--color-primary)]' : 'group-hover:text-[var(--color-primary)]'}`}>{faq.q}</span>
                      <div 
                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${isOpen ? 'bg-[var(--color-primary)] text-white border-transparent shadow-[0_0_15px_rgba(79,142,247,0.4)]' : 'bg-[var(--surface-primary)] border-[var(--interactive-border)] text-[var(--text-muted)] group-hover:border-[var(--interactive-border-hover)] group-hover:text-[var(--color-primary)]'}`}
                      >
                        <Plus size={20} className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="p-5 md:p-6 pt-0 text-[var(--text-secondary)] leading-relaxed font-light border-t border-[var(--border-default)]/50 mx-5 md:mx-6 mt-2">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
