import React from 'react';
import { useSite } from '../context/SiteContext';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

export const Workflow = () => {
  const { config } = useSite();
  if (!config.sections.workflow) return null;

  return (
    <section className="py-24 relative overflow-hidden" id="workflow">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-sm"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-6 tracking-tight text-[var(--text-primary)] leading-tight relative z-10">
            نحن لسنا شركة تسويق فقط..
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] block mt-4 text-3xl sm:text-4xl md:text-6xl whitespace-nowrap">
              نحن شريك نمو
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-light leading-relaxed mb-12 relative z-10">
            نحلل مشروعك، نكتشف نقاط الضعف، نبني خطة نمو، نحسن تجربة العميل، وندير حملاتك لتحقيق نتائج قابلة للقياس.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-6 relative z-10">
            {[
              { icon: <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6" />, title: "أمان واستقرار", desc: "بنية قوية" },
              { icon: <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6" />, title: "نمو مستدام", desc: "تركيز بالعائد" },
              { icon: <Users className="w-4 h-4 sm:w-6 sm:h-6" />, title: "تجربة مستخدم", desc: "واجهات مريحة" },
            ].map((feature, i) => (
              <div key={i} className="bg-[var(--surface-primary)] border border-[var(--border-default)] p-2 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col items-center text-center gap-2 sm:gap-4 hover:border-[var(--color-primary)] transition-colors">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] font-bold mb-1 text-[10px] sm:text-base leading-tight">{feature.title}</h4>
                  <p className="text-[var(--text-muted)] text-[9px] sm:text-sm leading-tight hidden sm:block">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};
