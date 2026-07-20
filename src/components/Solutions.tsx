import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Code } from 'lucide-react';
import branchImg from '../assets/images/regenerated_image_1779062361308.png';
import ecommerceImg from '../assets/images/regenerated_image_1779062368023.png';
import sallaLogo from '../assets/images/regenerated_image_1779415116970.png';
import zidLogo from '../assets/images/regenerated_image_1779415117734.svg';

const branchChallenges = [
  {
    title: 'الضغط الموسمي وقلة الكفاءة',
    desc: 'المواسم والعروض تسوي زحمة وتخليك توظف بياعين مؤقتين بسرعة، وهالشيء يأثر على جودة الخدمة.'
  },
  {
    title: 'ضياع فرص البيع وقت الزحام',
    desc: 'الانتظار الطويل يخلي الزبون يطلع بدون ما يشتري، وتطير عليك فرص البيع.'
  },
  {
    title: 'صعوبة الإلمام بآلاف المنتجات',
    desc: 'كثرة المنتجات وتغيّر الأسعار والعروض تصعّب على الموظف يحفظ كل شيء بدقة.'
  },
  {
    title: 'تجربة عميل غير ثابتة',
    desc: 'الخدمة تختلف من فرع لفرع حسب خبرة الموظف، والعميل اليوم يبي خدمة سريعة ونفس المستوى بكل مكان.'
  },
  {
    title: 'ارتفاع تكاليف التشغيل',
    desc: 'كل موسم يبي لك توظيف وتدريب ومتابعة فرق جديدة بدون ما تضمن الجودة.'
  },
  {
    title: 'توقعات العميل أسرع من الواقع',
    desc: 'العميل متعود على السرعة من التطبيقات، ولما يجي الفرع ينصدم بالانتظار والبطء.'
  }
];

const branchValues = [
  {
    title: 'ريادة وابتكار',
    desc: 'براندك بيصير من الأوائل بالسعودية والخليج اللي وظّف الذكاء الاصطناعي في فصوله صدق. هالشي يعطيك ميزة تنافسية قوية ويسوق لك.'
  },
  {
    title: 'توسيع شريحة العملاء',
    desc: 'يدعم لغات ولهجات واجد، فتقدر تخدم كل الجنسيات وتكسر حاجز اللغة بكل سهولة.'
  },
  {
    title: 'يداوم 24/7 بدون موظفين',
    desc: 'شغال معك على مدار الساعة، يرد ويبيع حتى برّا أوقات الدوام، بدون لا تزيد موظفينك.'
  },
  {
    title: 'يحفظ اللي يحبه العميل',
    desc: 'يتعلم من كل زيارة ويحفظ وش يبي العميل. وإذا رجع لك مرة ثانية، يضبطه بطلبته المفضلة على طول.'
  }
];

const ecommerceChallenges = [
  {
    title: 'انخفاض معدل التحويل',
    desc: 'المتاجر اللي زياراتها طاقة الـ 100 ألف تعاني من قلة التحويل. المساعد الذكي يجاوب بسرعة ويزيد لك فرص الشراء.'
  },
  {
    title: 'نسبة المرتجعات عالية',
    desc: 'لما تعطي العميل صورة واضحة وكاملة عن المنتج من البداية، يقل الغلط بالشراء وتقل المرتجعات.'
  },
  {
    title: 'تكاليف خدمة العملاء',
    desc: 'يقلل حاجتك لفرق دعم كبيرة وقت المواسم، ويحافظ على جودة الخدمة بدون تكاليف تدريب وتوظيف.'
  }
];

const ecommerceValues = [
  {
    title: 'خدمة عملاء 24/7',
    desc: 'أي عميل يدخل متجرك يلقى مين يرد عليه فوراً وبأي وقت، ما عاد تحتاج شفتات ليلية.'
  },
  {
    title: 'يرفع المبيعات لحاله',
    desc: 'يقترح للعميل منتجات ثانية (Upsell و Cross-sell) بناءً على اللي يحبه، ويزيد سلة المشتريات بدون تعب.'
  },
  {
    title: 'ريادة تسويقية',
    desc: 'بيكون براندك من أوائل اللي طبقوا هالتقنية بالمملكة، وهالشي يعطيك نقطة قوة تسويقية رهيبة.'
  },
  {
    title: 'توسيع شريحة العملاء',
    desc: 'يدعم لغات ولهجات متعددة، فتقدر تخدم العملاء من كل الجنسيات بدون عوائق.'
  },
  {
    title: 'ذاكرة ذكية للعميل',
    desc: 'يحفظ وش يفضل العميل، ولما يرجع مرة ثانية تضبطه بتجربة مفصلة على مقاسه بالضبط.'
  }
];

type AccordionItemProps = { title: string, content: string, isOpen: boolean, onClick: () => void, colorClass: string };

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick, colorClass }) => {
  return (
    <div className="border border-[var(--border-default)] rounded-2xl bg-[var(--surface-primary)]/20 overflow-hidden mb-3 transition-colors hover:border-[var(--border-strong)]">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 text-right transition-colors hover:bg-[var(--surface-secondary)]"
      >
        <span className="font-bold text-[var(--text-primary)] text-sm md:text-base">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={colorClass}
        >
          <ChevronDown size={32} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 pt-0 text-[var(--text-muted)] text-sm leading-relaxed border-t border-[var(--border-default)] mt-2">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Solutions = () => {
  const { config } = useSite();
  const [branchTab, setBranchTab] = useState<'challenges' | 'values'>('challenges');
  const [ecoTab, setEcoTab] = useState<'challenges' | 'values'>('challenges');
  const [openChallengeId, setOpenChallengeId] = useState<number | null>(0);
  const [openValueId, setOpenValueId] = useState<number | null>(0);
  const [openEcoId, setOpenEcoId] = useState<number | null>(0);

  // Typewriter effect component for Navigator of Growth
  const TypewriterText = ({ text, speed = 50, delay = 0 }: { text: string; speed?: number, delay?: number }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [start, setStart] = useState(false);

    React.useEffect(() => {
      const t = setTimeout(() => setStart(true), delay);
      return () => clearTimeout(t);
    }, [delay]);

    React.useEffect(() => {
      if (!start) return;
      setDisplayedText('');
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, [text, speed, start]);

    return <span className="whitespace-pre-line">{displayedText}</span>;
  };

  if (!config.sections.solutions) return null;

  return (
    <section className="py-16 sm:py-24 md:py-32 relative bg-dots-pattern" id="solutions">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-secondary)] opacity-20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight text-[var(--text-primary)]"
          >
            لماذا ابتكرنا "البائع الذكي"؟
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-3xl mx-auto font-light"
          >
            حلول مبتكرة لمواجهة التحديات في الفروع التقليدية والمتاجر الإلكترونية وتقديم قيمة تفاعلية تليق بتوقعات العميل.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative items-start">
          
          {/* Card 1: Retail Branches */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl border border-black/80 bg-[var(--surface-secondary)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(79,142,247,0.15)] transition-all duration-500 shadow-md"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-10 blur-[60px] rounded-full group-hover:opacity-20 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 shrink-0">
                  <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-[30px] rounded-full group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                  <img 
                    src={branchImg} 
                    alt="البائع الذكي للفروع" 
                    loading="lazy"
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=400";
                      e.currentTarget.classList.add("rounded-2xl");
                    }}
                  />
                </div>
                <a 
                  href="#contact" 
                  className="mt-2 sm:mt-4 px-6 py-2.5 bg-[var(--color-primary)] hover:brightness-110 text-[var(--text-primary)] rounded-full font-bold text-sm shadow-[0_0_15px_rgba(43,194,194,0.3)] transition-transform hover:-translate-y-1 block text-center w-full sm:w-auto"
                >
                  كن أول من يحصل على الخدمة
                </a>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)] text-shadow-sm text-center sm:text-right">البائع الذكي للفروع</h3>
              <p className="text-[var(--text-muted)] mb-6 leading-relaxed font-light text-center sm:text-right">
                إليك التحديات التي واجهناها والتي دفعتنا للابتكار، بالإضافة إلى القيمة المضافة لعلامتك التجارية.
              </p>

              <div className="flex gap-1 sm:gap-2 mb-6 bg-[var(--surface-secondary)] p-1.5 rounded-full border border-[var(--border-default)] w-full sm:w-max relative z-20">
                <button 
                  onClick={() => setBranchTab('challenges')} 
                  className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${branchTab === 'challenges' ? 'bg-[var(--color-primary)] text-[var(--text-primary)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                  التحديات
                </button>
                <button 
                  onClick={() => setBranchTab('values')} 
                  className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${branchTab === 'values' ? 'bg-[var(--color-primary)] text-[var(--text-primary)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                  القيمة المضافة
                </button>
              </div>
              
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={branchTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {branchTab === 'challenges' && branchChallenges.map((challenge, i) => (
                      <AccordionItem 
                        key={i}
                        title={challenge.title}
                        content={challenge.desc}
                        isOpen={openChallengeId === i}
                        onClick={() => setOpenChallengeId(openChallengeId === i ? null : i)}
                        colorClass="text-[var(--color-primary)] shrink-0"
                      />
                    ))}
                    {branchTab === 'values' && branchValues.map((val, i) => (
                      <AccordionItem 
                        key={i}
                        title={val.title}
                        content={val.desc}
                        isOpen={openValueId === i}
                        onClick={() => setOpenValueId(openValueId === i ? null : i)}
                        colorClass="text-[var(--color-primary)] shrink-0"
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Card 2: E-commerce */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 sm:p-8 md:p-10 rounded-3xl border border-black/80 bg-[var(--surface-secondary)] relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(124,58,237,0.15)] transition-all duration-500 shadow-md mt-8 md:mt-0"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)] opacity-10 blur-[60px] rounded-full group-hover:opacity-20 transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-6 gap-4">
                <div className="w-32 h-32 sm:w-40 sm:h-40 relative group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 shrink-0">
                  <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-20 blur-[30px] rounded-full group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
                  <img 
                    src={ecommerceImg} 
                    alt="البائع الذكي للمتاجر الإلكترونية" 
                    loading="lazy"
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400&h=400";
                      e.currentTarget.classList.add("rounded-2xl");
                    }}
                  />
                </div>
                <a 
                  href="#contact" 
                  className="mt-2 sm:mt-4 px-6 py-2.5 bg-[var(--color-secondary)] hover:brightness-110 text-[var(--text-primary)] rounded-full font-bold text-sm shadow-[0_0_15px_rgba(19,80,91,0.3)] transition-transform hover:-translate-y-1 block text-center w-full sm:w-auto"
                >
                  تواصل معنا
                </a>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--text-primary)] text-shadow-sm text-center sm:text-right">البائع الذكي للمتاجر الإلكترونية</h3>
              <p className="text-[var(--text-muted)] mb-6 leading-relaxed font-light text-center sm:text-right">
                أداة تضعك في الريادة؛ توسع شرائح عملائك، وتعمل على مدار الساعة وتحفظ التفضيلات لتقديم خدمة شخصية لا تُنسى.
              </p>
              
              <div className="flex gap-1 sm:gap-2 mb-6 bg-[var(--surface-secondary)] p-1.5 rounded-full border border-[var(--border-default)] w-full sm:w-max relative z-20">
                <button 
                  onClick={() => setEcoTab('challenges')} 
                  className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${ecoTab === 'challenges' ? 'bg-[var(--color-secondary)] text-[var(--text-primary)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                  التحديات
                </button>
                <button 
                  onClick={() => setEcoTab('values')} 
                  className={`flex-1 sm:flex-none px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${ecoTab === 'values' ? 'bg-[var(--color-secondary)] text-[var(--text-primary)] shadow-lg' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                  القيمة المضافة
                </button>
              </div>
              
              <div className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ecoTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ecoTab === 'challenges' && ecommerceChallenges.map((challenge, i) => (
                      <AccordionItem 
                        key={i}
                        title={challenge.title}
                        content={challenge.desc}
                        isOpen={openEcoId === i}
                        onClick={() => setOpenEcoId(openEcoId === i ? null : i)}
                        colorClass="text-[var(--color-secondary)] shrink-0"
                      />
                    ))}
                    {ecoTab === 'values' && ecommerceValues.map((val, i) => (
                      <AccordionItem 
                        key={i}
                        title={val.title}
                        content={val.desc}
                        isOpen={openEcoId === i}
                        onClick={() => setOpenEcoId(openEcoId === i ? null : i)}
                        colorClass="text-[var(--color-secondary)] shrink-0"
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Navigator of Growth Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 w-full p-6 sm:p-8 md:p-12 rounded-3xl border border-[var(--color-primary)]/30 bg-[var(--surface-primary)]/60 relative overflow-hidden group shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_0_30px_rgba(79,142,247,0.15)] backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 w-full text-center sm:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-xs font-bold mb-6 text-blue-300 mx-auto sm:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                قريباً - أداة جديدة
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 text-[var(--text-primary)] text-shadow-sm drop-shadow-[0_2px_10px_rgba(79,142,247,0.3)]">
                سفير النمو <span className="text-[var(--color-primary)] block mt-2 text-xl sm:text-2xl md:text-3xl font-bold">Ambassador of Growth</span>
              </h3>
              
              <div className="font-mono text-[var(--text-muted)] leading-relaxed space-y-4 mb-8 text-sm md:text-base sm:border-r-2 border-[var(--color-primary)]/50 sm:pr-4">
                <p>
                  <TypewriterText text='نعمل حالياً على إطلاق أداة "سفير النمو" قريباً للمتاجر الإلكترونية... الأداة ستكون متاحة على منصات (زد وسلة) لجميع التجار.' delay={300} speed={40} />
                </p>
                <p className="text-[var(--text-secondary)]">
                  <TypewriterText text="صُممت هذه الأداة خصيصاً لحل مشكلة ارتفاع تكاليف الاستحواذ للعملاء، حيث تقدم عوائد أعلى وأكثر موثوقية، بتكلفة أقل ومصداقية أسرع." delay={3000} speed={40} />
                </p>
                <p className="text-[var(--color-primary)] font-bold text-base sm:text-lg pt-2">
                  <TypewriterText text="أداة أساسية لكل تاجر، لا غنى عنها في سوق التجارة الرقمية." delay={7000} speed={50} />
                </p>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center gap-6 relative mt-4 md:mt-0">
              <div className="absolute inset-0 bg-[var(--color-primary)] opacity-20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 relative z-10 w-full max-w-[500px]">
                <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-md border border-blue-500/30 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4 hover:bg-[var(--surface-tertiary)] hover:border-blue-500/80 transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transform hover:-translate-y-2 w-[110px] sm:w-[130px] md:w-[150px] aspect-square">
                  <img src={sallaLogo} alt="Salla" className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-90 transition-transform group-hover:scale-110" />
                  <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">سلة</span>
                </div>
                <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4 hover:bg-[var(--surface-tertiary)] hover:border-purple-500/80 transition-all shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transform hover:-translate-y-2 w-[110px] sm:w-[130px] md:w-[150px] aspect-square">
                  <img src={zidLogo} alt="Zid" className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain opacity-90 transition-transform group-hover:scale-110" />
                  <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">زد</span>
                </div>
                <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-md border border-[var(--color-primary)]/30 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4 hover:bg-[var(--surface-tertiary)] hover:border-[var(--color-primary)]/80 transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transform hover:-translate-y-2 w-[110px] sm:w-[130px] md:w-[150px] aspect-square">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center text-[var(--color-primary)] opacity-90 transition-transform group-hover:scale-110">
                    <Code className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[var(--text-muted)] text-center">متاجر خاصة</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
