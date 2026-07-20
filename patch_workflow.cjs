const fs = require('fs');

const workflowCode = `import React from 'react';
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
          
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[var(--text-primary)] leading-tight relative z-10">
            نحن لسنا شركة تسويق فقط..
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] block mt-4 text-4xl md:text-6xl">
              نحن شريك نمو
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-light leading-relaxed mb-12 relative z-10">
            نحلل مشروعك، نكتشف نقاط الضعف، نبني خطة نمو، نحسن تجربة العميل، وندير حملاتك لتحقيق نتائج قابلة للقياس.
          </p>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {[
              { icon: <ShieldCheck size={24} />, title: "أمان واستقرار", desc: "نبني بنية تحتية تقنية قوية" },
              { icon: <TrendingUp size={24} />, title: "نمو مستدام", desc: "نركز على العائد على الاستثمار" },
              { icon: <Users size={24} />, title: "تجربة مستخدم", desc: "نصمم واجهات ترفع التحويل" },
            ].map((feature, i) => (
              <div key={i} className="bg-[var(--surface-primary)] border border-[var(--border-default)] p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:border-[var(--color-primary)] transition-colors">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] font-bold mb-2">{feature.title}</h4>
                  <p className="text-[var(--text-muted)] text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};
`;
fs.writeFileSync('src/components/Workflow.tsx', workflowCode);
