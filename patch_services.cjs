const fs = require('fs');
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

// Add "Ideal Conversion Journey" data to the service
code = code.replace(
  "deliverables: ['دراسة السوق والمنافسين', 'إطلاق وإدارة الإعلانات', 'تحسين مستمر (A/B Testing)', 'تقارير أداء دورية'],",
  "deliverables: ['دراسة السوق والمنافسين', 'إطلاق وإدارة الإعلانات', 'تحسين مستمر (A/B Testing)'],\n    journey: [\n      {title: 'تحليل البيانات', desc: 'فهم الوضع الحالي، القنوات، الجمهور، الأداء والفرص قبل تشغيل الحملات.'},\n      {title: 'التجهيز', desc: 'إعداد الحسابات الإعلانية، أدوات القياس، Pixels، الأحداث وصفحات الهبوط.'},\n      {title: 'إطلاق الحملات', desc: 'بناء الحملات واختيار الجماهير والرسائل والإعلانات المناسبة.'},\n      {title: 'التحسين المستمر', desc: 'متابعة الأداء، اختبار الإعلانات، تعديل الميزانيات وتحسين تكلفة النتائج.'},\n      {title: 'زيادة المبيعات', desc: 'التركيز على رفع التحويل وتحسين العائد من الإنفاق الإعلاني.'},\n      {title: 'الولاء والاستدامة', desc: 'إعادة الاستهداف، الاحتفاظ بالعملاء وبناء نمو مستدام طويل المدى.'}\n    ]"
);

// Add activeService state
if (!code.includes("activeService")) {
  code = code.replace(
    'const [openId, setOpenId] = useState<number | null>(null);',
    'const [openId, setOpenId] = useState<number | null>(null);\n  const [activeService, setActiveService] = useState<any>(null);'
  );
}

// We'll add the button to open details for service with id=1
const deliverablesReplacement = `<ul className="space-y-3 mb-6 mt-auto">
                      {service.deliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                          <ChevronDown size={14} className="text-[var(--color-primary)] rotate-[-90deg] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {service.id === 1 ? (
                      <button 
                        onClick={() => setActiveService(service)}
                        className="w-full py-3 rounded-xl font-bold bg-[var(--surface-tertiary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        تفاصيل أكثر
                        <ArrowUpRight size={16} className="group-hover/btn:rotate-45 transition-transform" />
                      </button>
                    ) : (
                      <button onClick={() => triggerBookingModal(service.title)} className="w-full py-3 rounded-xl font-bold bg-[var(--surface-tertiary)] text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--color-primary)] hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn">
                         اطلب الخدمة
                         <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </button>
                    )}`;

code = code.replace(
  /<ul className="space-y-3 mb-6 mt-auto">.*?<\/ul>/s,
  deliverablesReplacement
);

// Add Modal at the end
const modalCode = `
      {/* Service Details Modal */}
      <AnimatePresence>
        {activeService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveService(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--surface-primary)] border border-[var(--border-default)] rounded-3xl shadow-2xl z-10"
            >
              <button onClick={() => setActiveService(null)} className="absolute top-6 left-6 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-20">
                <X size={24} />
              </button>
              
              <div className="p-8 md:p-10 relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
                    {activeService.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">{activeService.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm">{activeService.desc}</p>
                  </div>
                </div>

                {activeService.journey && (
                  <div className="mt-10">
                    <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6 pb-4 border-b border-[var(--border-default)]">رحلة التحويل المثالية</h4>
                    <div className="space-y-4">
                      {activeService.journey.map((step, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-2xl bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-colors">
                          <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--color-primary)] text-white font-bold flex items-center justify-center">
                            {i + 1}
                          </div>
                          <div>
                            <h5 className="font-bold text-[var(--text-primary)] mb-1">{step.title}</h5>
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-10 pt-6 border-t border-[var(--border-default)]">
                  <button onClick={() => { setActiveService(null); triggerBookingModal(activeService.title); }} className="w-full py-4 rounded-xl font-bold bg-[var(--color-primary)] text-white hover:opacity-90 transition-opacity">
                    طلب إدارة حملاتك
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};`;

code = code.replace(/<\/section>\s*\);\s*};\s*$/s, modalCode);

fs.writeFileSync('src/components/Services.tsx', code);
