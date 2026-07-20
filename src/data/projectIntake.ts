export type ProjectType = 'website' | 'ecommerce' | 'custom-system' | 'accounting-system' | 'ai-automation' | 'marketing' | 'catalog-profile' | 'audit-improvement' | 'consultation' | 'integrated-project' | 'other';

export const projectTypes = [
  { id: 'website', value: 'website', labelAr: 'إنشاء موقع إلكتروني', labelEn: 'Website Development', descAr: 'موقع تعريفي، موقع شركة، صفحة هبوط أو موقع خدمات.', descEn: 'Corporate site, landing page, or service website.' },
  { id: 'ecommerce', value: 'ecommerce', labelAr: 'إنشاء متجر إلكتروني', labelEn: 'E-commerce Setup', descAr: 'إطلاق متجر جديد أو تطوير متجر قائم.', descEn: 'Launch a new store or develop an existing one.' },
  { id: 'custom-system', value: 'custom-system', labelAr: 'بناء نظام أو برنامج مخصص', labelEn: 'Custom System', descAr: 'نظام داخلي، CRM، لوحة تحكم، بوابة عملاء أو نظام تشغيل.', descEn: 'Internal system, CRM, dashboard, customer portal, etc.' },
  { id: 'accounting-system', value: 'accounting-system', labelAr: 'نظام محاسبي أو إداري', labelEn: 'Accounting System', descAr: 'نظام محاسبة، مخزون، مبيعات، مشتريات أو تقارير.', descEn: 'Accounting, inventory, sales, purchases, or reports.' },
  { id: 'ai-automation', value: 'ai-automation', labelAr: 'الذكاء الاصطناعي والأتمتة', labelEn: 'AI & Automation', descAr: 'مساعد ذكي، أتمتة عمليات، تحليل بيانات أو ربط أنظمة.', descEn: 'Smart assistant, process automation, data analysis, or integrations.' },
  { id: 'marketing', value: 'marketing', labelAr: 'التسويق وإدارة الحملات', labelEn: 'Marketing & Campaigns', descAr: 'إعلانات، محتوى، SEO، تحسين مبيعات أو خطة نمو.', descEn: 'Ads, content, SEO, sales optimization, or growth plan.' },
  { id: 'catalog-profile', value: 'catalog-profile', labelAr: 'تصميم كتالوج أو ملف تعريفي', labelEn: 'Catalog or Profile', descAr: 'ملف شركة، كتالوج منتجات، عرض خدمات أو Portfolio.', descEn: 'Company profile, product catalog, service presentation, or Portfolio.' },
  { id: 'audit-improvement', value: 'audit-improvement', labelAr: 'تحليل وتطوير مشروع قائم', labelEn: 'Audit & Improvement', descAr: 'تحليل موقع أو متجر أو نظام وتحديد فرص التحسين.', descEn: 'Analyze a site, store, or system and identify areas for improvement.' },
  { id: 'consultation', value: 'consultation', labelAr: 'استشارة وتحديد الحل المناسب', labelEn: 'Consultation', descAr: 'غير متأكد من الخدمة المناسبة وتحتاج توجيهًا.', descEn: 'Not sure which service fits and need guidance.' },
  { id: 'integrated-project', value: 'integrated-project', labelAr: 'مشروع متكامل', labelEn: 'Integrated Project', descAr: 'مجموعة خدمات مترابطة تشمل البناء والتسويق والتشغيل.', descEn: 'A set of connected services including build, marketing, and operations.' },
  { id: 'other', value: 'other', labelAr: 'أخرى', labelEn: 'Other', descAr: 'حدد احتياجك الخاص', descEn: 'Specify your custom need.' }
];

export const budgetsAr = [
  'أقل من 3,000 ريال',
  'من 3,000 إلى 7,500 ريال',
  'من 7,500 إلى 15,000 ريال',
  'من 15,000 إلى 30,000 ريال',
  'أكثر من 30,000 ريال',
  'أحتاج تقديرًا أولًا',
  'أفضل عدم التحديد الآن'
];

export const budgetsEn = [
  'Less than 3,000 SAR',
  '3,000 - 7,500 SAR',
  '7,500 - 15,000 SAR',
  '15,000 - 30,000 SAR',
  'More than 30,000 SAR',
  'I need an estimate first',
  'Prefer not to say right now'
];

export const timelinesAr = [
  'في أقرب وقت',
  'خلال شهر',
  'خلال 1–3 أشهر',
  'خلال 3–6 أشهر',
  'غير محدد'
];

export const timelinesEn = [
  'As soon as possible',
  'Within a month',
  '1-3 months',
  '3-6 months',
  'Not specified'
];
