import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Zap, Brain, Shield, Rocket, ArrowLeft } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const WhyChooseUs = () => {
  const { config } = useSite();

  const features = [
    {
      title: 'استراتيجيات نمو بالذكاء الاصطناعي',
      desc: 'نستخدم أدوات ذكاء اصطناعي ذكية عشان نحلل السلوك ونتوقع ترندات السوق ونرفع لك العائد.',
      icon: <Brain className="w-6 h-6 text-[var(--color-secondary)]" />
    },
    {
      title: 'حلول متكاملة بمكان واحد',
      desc: 'من بناء متجرك لهويتك لإدارة حملاتك، نضبط لك الشغل كله بمكان واحد بدون تشتت.',
      icon: <Zap className="w-6 h-6 text-[var(--color-primary)]" />
    },
    {
      title: 'بنية تحتية سريعة وآمنة',
      desc: 'نبني متاجر وأنظمة سريعة وتتحمل ضغط، وتحفظ بيانات عملائك بأمان.',
      icon: <Shield className="w-6 h-6 text-[var(--color-accent)]" />
    },
    {
      title: 'نتائج مدعومة بالأرقام',
      desc: 'ما عندنا شغل تخمين. كل خطوة نسويها مبنية على تحليل أرقام عشان نضمن لك نمو مستدام.',
      icon: <Rocket className="w-6 h-6 text-orange-400" />
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden" id="why-us">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-secondary)]/5 max-w-full rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 max-w-full rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--border-default)] text-sm font-medium mb-6 text-[var(--text-muted)]">
              ليش تختارنا؟
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight font-tajawal text-[var(--text-primary)]">
              ليش تختار <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">{config.logoText || 'NMOLABS'}</span>؟
            </h2>
            
            <p className="text-lg text-[var(--text-muted)] mb-10 leading-relaxed font-light">
              إحنا مو مجرد وكالة تسويق عادية، إحنا شريك نجاح تقني ندمج لك التكنولوجيا المتقدمة مع أحدث استراتيجيات النمو عشان تكتسح السوق.
            </p>

            <div className="space-y-6 mb-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--surface-primary)]/20 border border-[var(--border-default)] hover:border-[var(--color-primary)]/30 transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(79,142,247,0.1)] group cursor-default">
                  <div className="p-3 bg-[var(--surface-secondary)] rounded-xl border border-[var(--border-default)] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-[var(--text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[var(--color-primary)] transition-colors duration-300">{feature.title}</h4>
                    <p className="text-sm text-[var(--text-muted)] font-light leading-relaxed group-hover:text-[var(--text-secondary)] transition-colors duration-300">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {
                if(config.contactNumber) {
                   window.open(`https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}`, '_blank');
                } else {
                   document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-8 py-4 rounded-xl text-[var(--text-primary)] font-bold inline-flex items-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(79,142,247,0.3)] hover:shadow-[0_0_30px_rgba(79,142,247,0.5)]"
              style={{ backgroundColor: config.primaryColor }}
            >
              ابدأ الاستشارة المجانية الآن
              <ArrowLeft size={20} className="animate-bounce-x" />
            </button>
          </motion.div>

          {/* Image/Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 blur-[60px] rounded-full" />
            <div className="relative border border-[var(--border-default)] bg-[var(--surface-secondary)] backdrop-blur-xl p-8 rounded-3xl shadow-2xl overflow-hidden aspect-square flex flex-col justify-center">
              
              {/* Abstract Nodes/Network graphic */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-primary)] via-transparent to-transparent pointer-events-none" />
              
              <div className="grid grid-cols-2 gap-4 relative z-10 w-full">
                 <div className="bg-[var(--surface-primary)]/60 border border-[var(--border-default)] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-[var(--color-primary)]/50 transition-colors">
                    <Brain className="w-10 h-10 text-[var(--color-secondary)]" />
                    <span className="font-bold text-lg">تحليل ذكي</span>
                 </div>
                 <div className="bg-[var(--surface-primary)]/60 border border-[var(--border-default)] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-[var(--color-primary)]/50 transition-colors translate-y-8">
                    <Rocket className="w-10 h-10 text-[var(--color-primary)]" />
                    <span className="font-bold text-lg">أداء مضاعف</span>
                 </div>
                 <div className="bg-[var(--surface-primary)]/60 border border-[var(--border-default)] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-[var(--color-primary)]/50 transition-colors">
                    <CheckCircle2 className="w-10 h-10 text-[var(--color-accent)]" />
                    <span className="font-bold text-lg">نمو مستدام</span>
                 </div>
                 <div className="bg-[var(--surface-primary)]/60 border border-[var(--border-default)] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-[var(--color-primary)]/50 transition-colors translate-y-8">
                    <Shield className="w-10 h-10 text-orange-400" />
                    <span className="font-bold text-lg">حماية وشراكة</span>
                 </div>
              </div>

              {/* Connecting SVG Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.2 }}>
                <line x1="25%" y1="25%" x2="75%" y2="75%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="25%" y1="75%" x2="75%" y2="25%" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
