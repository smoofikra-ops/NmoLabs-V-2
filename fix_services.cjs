const fs = require('fs');
let code = fs.readFileSync('src/components/Services.tsx', 'utf8');

// Remove the state I added
code = code.replace(
  'const [openId, setOpenId] = useState<number | null>(null);\n  const [activeService, setActiveService] = useState<any>(null);',
  'const [openId, setOpenId] = useState<number | null>(null);'
);

// Remove the new modal I added
code = code.replace(
  /\s*\{\/\* Service Details Modal \*\/\}\s*<AnimatePresence>.*?<\/AnimatePresence>/s,
  ''
);

// We want to add the Journey to id === 1. It is already added to the data at the top? Yes, I replaced the deliverables array.
// Let's verify data
code = code.replace(
  "deliverables: ['دراسة السوق والمنافسين', 'إطلاق وإدارة الإعلانات', 'تحسين مستمر (A/B Testing)', 'تقارير أداء دورية'],",
  "deliverables: ['دراسة السوق والمنافسين', 'إطلاق وإدارة الإعلانات', 'تحسين مستمر (A/B Testing)'],\n    journey: [\n      {title: 'تحليل البيانات', desc: 'فهم الوضع الحالي، القنوات، الجمهور، الأداء والفرص قبل تشغيل الحملات.'},\n      {title: 'التجهيز', desc: 'إعداد الحسابات الإعلانية، أدوات القياس، Pixels، الأحداث وصفحات الهبوط.'},\n      {title: 'إطلاق الحملات', desc: 'بناء الحملات واختيار الجماهير والرسائل والإعلانات المناسبة.'},\n      {title: 'التحسين المستمر', desc: 'متابعة الأداء، اختبار الإعلانات، تعديل الميزانيات وتحسين تكلفة النتائج.'},\n      {title: 'زيادة المبيعات', desc: 'التركيز على رفع التحويل وتحسين العائد من الإنفاق الإعلاني.'},\n      {title: 'الولاء والاستدامة', desc: 'إعادة الاستهداف، الاحتفاظ بالعملاء وبناء نمو مستدام طويل المدى.'}\n    ]"
); // It might not do anything if already done.


// We changed the button earlier:
// onClick={() => setActiveService(service)}
// We need to change it back to onClick={() => setOpenId(service.id)}
code = code.replace(/onClick=\{\(\) => setActiveService\(service\)\}/g, 'onClick={() => setOpenId(service.id)}');


// Now we modify the existing modal to render `activeService.journey` if it exists.
const oldModalBody = `{activeService.id !== 6 && (
                   <>
                     <h4 className="text-sm font-bold mb-6 text-[color:var(--color-brand-green-val)] uppercase tracking-wider flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[color:var(--color-brand-green-val)] shadow-[0_0_8px_var(--color-brand-green-val)]" />
                       ماذا نقدم في هذه الخدمة؟
                     </h4>
                     <ul className="space-y-4">
                       {activeService.deliverables.map((item: any, i: number) => (
                         <li key={i} className="flex items-start gap-3 text-[var(--text-primary)]">
                           <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                             <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                           </div>
                           <span className="leading-relaxed font-bold">{item}</span>
                         </li>
                       ))}
                     </ul>
                   </>
                 )}`;

// We need to insert the journey section into the modal.
const modifiedModalBody = `{activeService.id !== 6 && (
                   <>
                     <h4 className="text-sm font-bold mb-6 text-[color:var(--color-brand-green-val)] uppercase tracking-wider flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[color:var(--color-brand-green-val)] shadow-[0_0_8px_var(--color-brand-green-val)]" />
                       ماذا نقدم في هذه الخدمة؟
                     </h4>
                     <ul className="space-y-4 mb-8">
                       {activeService.deliverables.map((item: any, i: number) => (
                         <li key={i} className="flex items-start gap-3 text-[var(--text-primary)]">
                           <div className="w-6 h-6 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center shrink-0 mt-0.5">
                             <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                           </div>
                           <span className="leading-relaxed font-bold">{item}</span>
                         </li>
                       ))}
                     </ul>
                     
                     {/* ADDED JOURNEY HERE */}
                     {activeService.journey && (
                        <div className="mt-8 pt-8 border-t border-[var(--border-default)]">
                          <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6">رحلة التحويل المثالية</h4>
                          <div className="space-y-4">
                            {activeService.journey.map((step: any, i: number) => (
                              <div key={i} className="flex gap-4 p-5 rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-sm">
                                <div className="w-10 h-10 shrink-0 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold flex items-center justify-center">
                                  {i + 1}
                                </div>
                                <div>
                                  <h5 className="font-bold text-[var(--text-primary)] mb-2 text-lg">{step.title}</h5>
                                  <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                     )}
                   </>
                 )}`;

code = code.replace(
  /\{activeService\.id !== 6 && \(\s*<>\s*<h4 className="text-sm font-bold mb-6 text-\[color:var\(--color-brand-green-val\)\] uppercase tracking-wider flex items-center gap-2">\s*<div className="w-2 h-2 rounded-full bg-\[color:var\(--color-brand-green-val\)\] shadow-\[0_0_8px_var\(--color-brand-green-val\)\]" \/>\s*ماذا نقدم في هذه الخدمة\؟\s*<\/h4>\s*<ul className="space-y-4">\s*\{activeService\.deliverables\.map\(\(item(: any)?, i(: number)?\) => \(\s*<li key=\{i\} className="flex items-start gap-3 text-\[var\(--text-primary\)\]">\s*<div className="w-6 h-6 rounded-full bg-\[var\(--color-primary\)\]\/10 text-\[var\(--color-primary\)\] flex items-center justify-center shrink-0 mt-0\.5">\s*<ChevronDown className="w-4 h-4 rotate-\[-90deg\]" \/>\s*<\/div>\s*<span className="leading-relaxed font-bold">\{item\}<\/span>\s*<\/li>\s*\)\)\}\s*<\/ul>\s*<\/>\s*\)\}/s,
  modifiedModalBody
);


fs.writeFileSync('src/components/Services.tsx', code);
