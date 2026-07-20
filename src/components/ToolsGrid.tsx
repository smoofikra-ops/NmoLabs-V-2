import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Activity, LineChart, Target, Hash, CheckSquare, Search, Code, Link as LinkIcon, Share2, PenTool, Calendar, Headphones, MessageSquare, Wrench, Zap, Type, MessageCircle, ChevronDown, CheckCircle2, AlertTriangle, MapPin, Layout } from 'lucide-react';
import { ToolAnalyzerModal } from './ToolAnalyzerModal';

const IconMapper = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Activity': return <Activity className={className} />;
    case 'CheckSquare': return <CheckSquare className={className} />;
    case 'LineChart': return <LineChart className={className} />;
    case 'Search': return <Search className={className} />;
    case 'Code': return <Code className={className} />;
    case 'Hash': return <Hash className={className} />;
    case 'Target': return <Target className={className} />;
    case 'LinkIcon': return <LinkIcon className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Type': return <Type className={className} />;
    case 'MessageCircle': return <MessageCircle className={className} />;
    case 'Layout': return <Layout className={className} />;
    case 'AlertTriangle': return <AlertTriangle className={className} />;
    case 'MapPin': return <MapPin className={className} />;
    default: return <Wrench className={className} />;
  }
};

const pricingPackages = [
  {
    name: 'الباقة المجانية',
    price: '0',
    currency: 'ر.س',
    period: '/ مدى الحياة',
    desc: 'مجموعة أدوات أساسية تضبطك بالبداية.',
    features: ['حاسبة أداء المتجر', 'فاحص السرعة', 'مولد العناوين', 'دعم مجتمعي'],
    color: '#22d3a0',
    buttonLabel: 'ابدأ مجاناً'
  },
  {
    name: 'باقة الأعمال',
    price: '149',
    currency: 'ر.س',
    period: '/ شهرياً',
    desc: 'خذ وصول كامل لكل أدوات التحليل الأساسية.',
    features: ['جميع الأدوات المجانية', 'محلل UX وفاحص SEO', 'تحليل المنافسين', 'أفكار الحملات الإعلانية', 'حلول أزمات Google الأساسية', 'دعم فني عبر البريد'],
    color: '#4f8ef7',
    buttonLabel: 'اختر الباقة',
    popular: true
  },
  {
    name: 'الباقة الاحترافية',
    price: '299',
    currency: 'ر.س',
    period: '/ شهرياً',
    desc: 'افتح كل الإمكانيات والأدوات المتقدمة بالمنصة.',
    features: ['وصول كامل لجميع الأدوات', 'أدوات مدعومة بالذكاء الاصطناعي', 'تغطية شاملة لحلول Google', 'تقارير مخصصة ومفصلة', 'مدير حساب مخصص', 'أولوية في الدعم الفني'],
    color: '#7c3aed',
    buttonLabel: 'اختر الباقة'
  },
  {
    name: 'باقة مخصصة',
    price: 'أسعار',
    currency: 'مخصصة',
    period: '',
    desc: 'هل تبحث عن حلول خاصة وحجم عمل أكبر؟',
    features: ['كل ميزات الاحترافية', 'أدوات مخصصة لتجارتك', 'استشارات تسويقية', 'ربط API خاص'],
    color: '#10b981',
    buttonLabel: 'تواصل معنا',
    contactLink: 'https://wa.me/966XXXXXXXXX'
  }
];

const getToolDescription = (name: string) => {
  switch (name) {
    case 'فاحص SEO': return 'احصل على تحليل شامل لتهيئة محركات البحث لمتجرك';
    case 'محلل UX': return 'اكتشف مشاكل واجهة المستخدم وتجربة العميل';
    case 'مدقق الكلمات المفتاحية': return 'اعثر على أفضل الكلمات المفتاحية لجلب الزيارات';
    case 'محلل الروابط الخلفية': return 'افحص قوة الروابط الخلفية التي تشير لمتجرك';
    case 'تحليل المنافسين': return 'راقب أداء منافسيك واستراتيجياتهم';
    case 'تحليل مبيعات السوق': return 'اكتشف المنتجات الأكثر مبيعاً في قطاعك';
    case 'محسن Google Ads': return 'أدوات متقدمة لتحسين أداء حملات جوجل';
    case 'منشئ إعلانات Meta': return 'اصنع إعلانات جذابة لفيسبوك وانستقرام';
    case 'أفكار سناب وتيك توك': return 'احصل على أفكار إبداعية لحملات الفيديو';
    case 'حاسبة الحملات': return 'احسب التكاليف المتوقعة والعائد على الاستثمار';
    case 'حاسبة أداء المتجر': return 'قيم أداء متجرك بناءً على المقاييس الأساسية';
    case 'مولد العناوين': return 'أنشئ عناوين جذابة للمنتجات والمقالات';
    case 'فاحص السرعة': return 'تحقق من سرعة تحميل صفحات متجرك';
    case 'مولد ردود العملاء': return 'اصنع ردوداً احترافية لخدمة العملاء';
    case 'إصلاح Merchant Center': return 'حل مشاكل تعليق المنتجات في جوجل شوبنق';
    case 'حل تعليق حسابات Ads': return 'إرشادات لفك تعليق حسابات جوجل الإعلانية';
    case 'تحسين الخرائط Google Business': return 'تصدر نتائج البحث المحلي في خرائط جوجل';
    case 'إصلاح فهرسة Search Console': return 'حل مشاكل عدم ظهور صفحاتك في بحث جوجل';
    default: return `استخدم أداة ${name} لتحسين أداء متجرك وزيادة مبيعاتك`;
  }
};

const PricingPackageCard: React.FC<{ pkg: any, index: number }> = ({ pkg, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { config } = useSite();
  
  return (
    <motion.div
      id={`package-${index}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsOpen(!isOpen)}
      className={`bg-[var(--surface-secondary)] relative rounded-3xl p-6 sm:p-8 border cursor-pointer hover:border-[var(--color-primary)]/50 transition-colors ${pkg.popular ? 'border-[var(--color-primary)] shadow-[0_0_30px_rgba(79,142,247,0.15)] md:-translate-y-2' : 'border-[var(--border-default)] shadow-md'} flex flex-col`}
    >
      {pkg.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-[var(--color-primary)] text-[var(--text-primary)] text-xs font-bold rounded-full whitespace-nowrap z-10">
          الأكثر طلباً
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">{pkg.name}</h3>
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center bg-[var(--surface-primary)] border border-[var(--border-default)] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[var(--color-primary)]/20 text-[var(--color-primary)]' : 'text-[var(--text-muted)]'}`}
        >
          <ChevronDown size={16} />
        </button>
      </div>
      
      <p className="text-sm text-[var(--text-muted)] mb-4 min-h-[40px]">{pkg.desc}</p>
      
      <div className="mb-4 font-english" dir="ltr">
        <span className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">{pkg.price}</span>
        <span className="text-lg sm:text-xl text-[var(--text-muted)] ml-1">{pkg.currency}</span>
        <span className="text-sm text-gray-500 ml-1 block mt-1">{pkg.period}</span>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-[var(--border-default)] pt-6 mt-2"
          >
            <div className="space-y-4 mb-8">
              {pkg.features.map((feat: string, fi: number) => (
                <div key={fi} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: pkg.color }} />
                  <span className="text-sm sm:text-base text-[var(--text-secondary)]">{feat}</span>
                </div>
              ))}
            </div>
            
            {(pkg.contactLink || pkg.buttonLabel === 'تواصل معنا' || pkg.buttonLabel.includes('تواصل')) ? (
              <a 
                href={config.contactNumber ? `https://wa.me/${config.contactNumber.replace(/[^0-9]/g, '')}` : '#contact'}
                target={config.contactNumber ? "_blank" : "_self"}
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full py-4 text-base rounded-xl font-bold transition-all duration-300 flex items-center justify-center text-center hover:scale-[1.02]"
                style={{ 
                  backgroundColor: pkg.popular ? pkg.color : 'rgba(255,255,255,0.05)',
                  color: pkg.popular ? '#fff' : pkg.color,
                  border: pkg.popular ? 'none' : `1px solid ${pkg.color}40`
                }}
              >
                {pkg.buttonLabel}
              </a>
            ) : (
              <button 
                onClick={(e) => e.stopPropagation()}
                className="w-full py-4 text-base rounded-xl font-bold transition-all duration-300 hover:scale-[1.02]"
                style={{ 
                  backgroundColor: pkg.popular ? pkg.color : 'rgba(255,255,255,0.05)',
                  color: pkg.popular ? '#fff' : pkg.color,
                  border: pkg.popular ? 'none' : `1px solid ${pkg.color}40`
                }}
              >
                {pkg.buttonLabel}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ToolsGrid = () => {
  const { config } = useSite();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedTool, setSelectedTool] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!config.sections.tools) return null;

  return (
    <section className="py-16 sm:py-24 md:py-32 relative bg-[color:var(--glass-bg)] bg-radial-glow" id="tools">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface-primary)] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight text-[var(--text-primary)]"
          >
            كل أدوات النمو في مكان واحد
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-3xl mx-auto font-light"
          >
            6 أقسام رئيسية، 25+ أداة ذكية، ومحتوى مخصص للسوق السعودي.
          </motion.p>
        </div>

        {/* Tools Layout (Categories as Icons) */}
        <div className="flex flex-col mb-20 md:mb-32" id="tools-container">
          
          {/* Categories Horizontal Icons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
            {config.toolCategories?.map((category, idx) => (
              <button
                key={category.id || idx}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-3 transition-all duration-300 border ${
                  openIndex === idx 
                    ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-[color:var(--color-brand-green-val)] shadow-[0_0_15px_rgba(79,142,247,0.3)]' 
                    : 'bg-[var(--surface-secondary)] border-[var(--border-default)] text-[var(--text-muted)] hover:bg-[var(--surface-primary)] hover:text-[var(--text-primary)] hover:border-[var(--color-primary)]/50'
                }`}
              >
                <IconMapper name={category.tools?.[0]?.iconName || 'Wrench'} className={`w-5 h-5 sm:w-6 sm:h-6 ${openIndex === idx ? 'text-[color:var(--color-brand-green-val)]' : 'opacity-70'}`} />
                <span className="font-bold text-sm sm:text-base whitespace-nowrap">{category.title}</span>
              </button>
            ))}
          </div>
          
          {/* Active Category Tools Frame */}
          <AnimatePresence mode="wait">
            {openIndex !== null && config.toolCategories && config.toolCategories[openIndex] && (
              <motion.div
                key={openIndex}
                initial={{ opacity: 0, height: 0, scale: 0.95 }}
                animate={{ opacity: 1, height: 'auto', scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full overflow-hidden"
              >
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-3xl p-6 sm:p-10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                  <div className="mb-8 text-center sm:text-right">
                    <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2">{config.toolCategories[openIndex].title}</h3>
                    <p className="text-sm sm:text-base text-[var(--text-muted)]">تشخيص وتطوير أداء متجرك من كل زاوية باستخدام أفضل الأدوات.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {config.toolCategories[openIndex].tools.map((tool, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          setSelectedTool(tool);
                          setIsModalOpen(true);
                        }}
                        tabIndex={0}
                        className={`relative p-4 sm:p-6 rounded-2xl flex flex-col items-center text-center justify-between transition-all group/tooltip min-h-[140px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 ${
                          tool.locked 
                            ? 'bg-[var(--surface-primary)]/30 border border-[var(--border-default)] hover:bg-[var(--surface-primary)]' 
                            : 'bg-[var(--surface-tertiary)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)] border border-black hover:border-[var(--color-primary)]/40 hover:shadow-[0_0_15px_rgba(79,142,247,0.1)]'
                        }`}
                      >
                        {/* Tooltip */}
                        <div className="hidden sm:block absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 group-focus-within/tooltip:opacity-100 transition-all duration-300 pointer-events-none z-50 transform group-hover/tooltip:-translate-y-2 group-focus-within/tooltip:-translate-y-2 w-max max-w-xs">
                          <div className="bg-[color:var(--bg-color-darker)] backdrop-blur text-[var(--text-primary)] p-3 rounded-xl shadow-xl border border-[var(--border-default)] text-center">
                            <h5 className="font-bold text-sm mb-1 text-[var(--color-primary)]">{tool.name}</h5>
                            <p className="text-xs text-[var(--text-muted)] whitespace-normal leading-relaxed">{getToolDescription(tool.name)}</p>
                          </div>
                        </div>

                        <div className={`w-12 h-12 rounded-2xl bg-[var(--surface-primary)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] border border-[var(--border-default)] flex items-center justify-center shrink-0 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--color-primary)]/10`}>
                          <IconMapper name={tool.iconName} className={`w-6 h-6 ${tool.iconColor || 'text-[var(--text-muted)]'} group-hover:text-[var(--color-primary)] transition-colors`} />
                        </div>
                        
                        <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">{tool.name}</h4>
                        
                        <div className="mt-3">
                          {tool.locked ? (
                            <div className="flex items-center gap-1 text-[10px] text-[var(--color-secondary)] bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/20 px-2 py-1 rounded-full font-bold">
                              <Lock size={10} />
                              <span>مدفوعة</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-[10px] text-[color:var(--color-brand-green-val)] bg-[color:var(--color-brand-green-val)]/10 border border-[color:var(--color-brand-green-val)]/20 px-2 py-1 rounded-full font-bold">
                              <Zap size={10} />
                              <span>مجانية</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Packages */}
        <div className="mt-12 sm:mt-20 pt-12 sm:pt-20 border-t border-[var(--border-default)]" id="pricing-packages">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-[var(--text-primary)]">باقات الاشتراك</h2>
            <p className="text-sm sm:text-base text-[var(--text-muted)]">اختر الباقة التي تناسب حجم نشاطك</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {pricingPackages.map((pkg, i) => (
              <PricingPackageCard key={i} pkg={pkg} index={i} />
            ))}
          </div>
        </div>

        <ToolAnalyzerModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tool={selectedTool}
        />

      </div>
    </section>
  );
};
