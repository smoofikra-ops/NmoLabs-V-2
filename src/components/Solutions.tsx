import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Code } from 'lucide-react';
import branchImg from '../assets/images/regenerated_image_1779062361308.png';
import ecommerceImg from '../assets/images/regenerated_image_1779062368023.png';
import sallaLogo from '../assets/images/regenerated_image_1784602783544.jpg';
import zidLogo from '../assets/images/regenerated_image_1784602784358.jpg';

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


const FlipCard = ({ title, detailsList, colorHex, imageUrl }: { title: string, detailsList: any[], colorHex: string, imageUrl?: string }) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div 
      className="relative w-full h-[320px] sm:h-[350px] md:h-[400px] max-w-lg mx-auto rounded-3xl cursor-pointer group [perspective:1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700"
        animate={{ rotateY: flipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-300">
           {imageUrl && (
             <div className="absolute inset-0 z-0">
               <img src={imageUrl} alt={title} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-secondary)] via-[var(--surface-secondary)]/80 to-transparent" />
             </div>
           )}
           <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-[60px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20 z-0" style={{ backgroundColor: colorHex }} />
           
           <div className="relative z-10 flex flex-col items-center justify-center h-full p-8">
             <h3 className="text-2xl sm:text-3xl font-black text-center text-[var(--text-primary)] text-shadow-sm leading-snug">
               {title}
             </h3>
           </div>
           
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-100 transition-opacity z-10">
             <span className="text-xs sm:text-sm font-bold tracking-widest uppercase bg-[var(--surface-primary)]/80 px-4 py-2 rounded-full backdrop-blur-sm">انقر للتفاصيل</span>
           </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 [backface-visibility:hidden] bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-6 overflow-y-auto custom-scrollbar"
          style={{ transform: 'rotateY(180deg)' }}
        >
           <h4 className="text-lg sm:text-xl font-bold mb-4 pb-3 border-b border-[var(--border-default)] sticky top-0 bg-[var(--surface-secondary)] z-10" style={{ color: colorHex }}>{title}</h4>
           <ul className="space-y-3">
             {detailsList.map((item, idx) => (
               <li key={idx} className="flex gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                 <div className="w-1.5 h-1.5 mt-1.5 rounded-full shrink-0" style={{ backgroundColor: colorHex }} />
                 <div>
                   <strong className="text-[var(--text-primary)] block mb-0.5">{item.title}</strong>
                   <p className="leading-relaxed font-light">{item.desc}</p>
                 </div>
               </li>
             ))}
           </ul>
        </div>
      </motion.div>
    </div>
  );
};

export const Solutions = () => {
  const { config } = useSite();

  // Typewriter effect component for Navigator of Growth
  const TypewriterText = ({ text, speed = 50, delay = 0 }: { text: string; speed?: number, delay?: number }) => {
    const [displayedText, setDisplayedText] = React.useState('');
    const [start, setStart] = React.useState(false);

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

  const branchDetails = [...branchChallenges, ...branchValues];
  const ecommerceDetails = [...ecommerceChallenges, ...ecommerceValues];

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
          <FlipCard title="البائع الذكي للفروع" detailsList={branchDetails} colorHex="var(--color-primary)" imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop" />
          <FlipCard title="البائع الذكي للمتاجر الإلكترونية" detailsList={ecommerceDetails} colorHex="var(--color-secondary)" imageUrl="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop" />
        </div>


        {/* Navigator of Growth Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 w-full max-w-lg mx-auto p-6 sm:p-8 rounded-3xl border border-[var(--color-primary)]/30 bg-[var(--surface-primary)]/60 relative overflow-hidden group shadow-[inset_0_4px_20px_rgba(0,0,0,0.8),0_0_30px_rgba(79,142,247,0.15)] backdrop-blur-md"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-[10px] font-bold mb-4 text-blue-300">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              قريباً - أداة جديدة
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black mb-4 text-[var(--text-primary)] text-shadow-sm drop-shadow-[0_2px_10px_rgba(79,142,247,0.3)]">
              سفير النمو <span className="text-[var(--color-primary)] block mt-1 text-sm sm:text-base font-bold">Ambassador of Growth</span>
            </h3>
            
            <div className="text-[var(--text-muted)] leading-relaxed space-y-2 mb-6 text-xs sm:text-sm">
              <p>
                <TypewriterText text='نعمل حالياً على إطلاق أداة "سفير النمو" قريباً للمتاجر الإلكترونية... الأداة ستكون متاحة على منصات (زد وسلة) لجميع التجار.' delay={300} speed={40} />
              </p>
              <p className="text-[var(--text-secondary)]">
                <TypewriterText text="صُممت هذه الأداة خصيصاً لحل مشكلة ارتفاع تكاليف الاستحواذ للعملاء." delay={3000} speed={40} />
              </p>
            </div>
            
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold text-sm shadow-lg hover:shadow-[0_0_20px_rgba(79,142,247,0.4)] transition-all transform hover:-translate-y-1">
              أخبرني عند الإطلاق
            </button>
          </div>
        </motion.div>
      </div>
</section>
  );
};
