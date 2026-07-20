export interface Experiment {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: 'all' | 'ai' | 'ecommerce' | 'marketing' | 'automation' | 'ux' | 'business' | 'trade' | 'research';
  status: 'early_idea' | 'research' | 'prototype' | 'testing' | 'on_hold' | 'promoted' | 'discontinued';
  featured: boolean;
  featuredOrder?: number;
  summaryAr: string;
  summaryEn: string;
  problemAr?: string;
  problemEn?: string;
  hypothesisAr?: string;
  hypothesisEn?: string;
  conceptAr?: string;
  conceptEn?: string;
  targetAudienceAr?: string[];
  targetAudienceEn?: string[];
  prototypeType?: 'flow' | 'ai_chat' | 'decision_tree' | 'recommendation' | 'timeline' | 'referral' | 'nodes' | 'heatmap' | 'route' | 'blueprint' | 'concept';
  researchNotesAr?: string[];
  researchNotesEn?: string[];
  currentStageAr?: string;
  currentStageEn?: string;
  learningsAr?: string[];
  learningsEn?: string[];
  nextStepAr?: string;
  nextStepEn?: string;
  relatedProductSlug?: string;
  brandColor?: string;
  secondaryColor?: string;
  backgroundGradient?: string;
  ambientGlow?: string;
  visualTheme?: string;
  coverVisual?: string;
  gallery?: string[];
  seo?: {
    titleAr?: string;
    titleEn?: string;
    descriptionAr?: string;
    descriptionEn?: string;
  };
}

export const experimentsData: Experiment[] = [
  {
    id: 'ai-purchase-decision-assistant',
    slug: 'ai-purchase-decision-assistant',
    titleAr: 'مساعد قرار الشراء الذكي',
    titleEn: 'AI Purchase Decision Assistant',
    category: 'ai',
    status: 'research',
    featured: true,
    featuredOrder: 1,
    summaryAr: 'تجربة لبناء مساعد ذكي لا يكتفي بترشيح المنتجات، بل يقارن الخيارات ويشرح الفروق ويساعد العميل على اتخاذ قرار شراء يناسب احتياجه وميزانيته.',
    summaryEn: 'An experiment to build an intelligent assistant that compares options, explains differences, and helps customers make purchasing decisions based on needs and budget.',
    problemAr: 'كثرة الخيارات، تشابه المنتجات، صعوبة فهم المواصفات، تردد العميل، الاعتماد على موظف أو دعم بشري.',
    problemEn: 'Too many options, similar products, difficulty understanding specs, customer hesitation, reliance on human support.',
    hypothesisAr: 'إذا تمكّن الزائر من شرح احتياجه بلغة طبيعية، ثم حصل على مقارنة واضحة ومبررة، فقد يصبح اتخاذ القرار أسرع وأسهل.',
    hypothesisEn: 'If visitors can explain their needs in natural language and receive a clear, justified comparison, decision-making will be faster and easier.',
    targetAudienceAr: ['المتاجر ذات المنتجات التقنية', 'متاجر الأجهزة', 'الأثاث والمفروشات', 'منتجات العناية', 'المتاجر ذات الكتالوجات الكبيرة'],
    targetAudienceEn: ['Tech product stores', 'Appliance stores', 'Furniture stores', 'Personal care products', 'Stores with large catalogs'],
    prototypeType: 'ai_chat',
    brandColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
  },
  {
    id: 'adaptive-store-experience',
    slug: 'adaptive-store-experience',
    titleAr: 'متجر يتغير حسب الزائر',
    titleEn: 'Adaptive Store Experience',
    category: 'ux',
    status: 'early_idea',
    featured: false,
    summaryAr: 'تجربة لمتجر إلكتروني يغيّر ترتيب الأقسام والمنتجات والرسائل بحسب سلوك الزائر واهتماماته وسياق الزيارة.',
    summaryEn: 'An experiment for an ecommerce experience that adapts product order, sections, and messaging based on visitor behavior and context.',
    problemAr: 'المتاجر تعرض نفس التجربة لجميع الزوار، رغم اختلاف نواياهم واهتماماتهم.',
    problemEn: 'Stores present the same experience to all visitors, despite different intents and interests.',
    hypothesisAr: 'يمكن أن يؤدي تخصيص الواجهة والمحتوى إلى تسريع الوصول للمنتج وتحسين التحويل.',
    hypothesisEn: 'Personalizing interface and content could speed up product discovery and improve conversion.',
    prototypeType: 'concept',
    brandColor: '#8b5cf6',
    secondaryColor: '#06b6d4',
  },
  {
    id: 'ecommerce-operations-agent',
    slug: 'ecommerce-operations-agent',
    titleAr: 'وكيل تشغيل المتجر',
    titleEn: 'Ecommerce Operations Agent',
    category: 'automation',
    status: 'prototype',
    featured: true,
    featuredOrder: 2,
    summaryAr: 'وكيل ذكي يراقب الطلبات والمخزون والأسعار والمحتوى والتنبيهات التشغيلية، ثم يقترح أو ينفذ إجراءات ضمن صلاحيات محددة.',
    summaryEn: 'An intelligent operations agent that monitors orders, inventory, pricing, content, and operational alerts, then recommends or performs approved actions.',
    problemAr: 'كثرة المهام المتكررة، التأخر في متابعة المخزون، أخطاء تحديث الأسعار، نسيان الطلبات أو التنبيهات، تعدد لوحات التحكم.',
    problemEn: 'Repetitive tasks, delays in inventory tracking, pricing errors, forgotten orders or alerts, multiple dashboards.',
    hypothesisAr: 'يمكن لوكيل ذكي محدود الصلاحيات أن يقلل الأعمال اليدوية ويحسن سرعة الاستجابة.',
    hypothesisEn: 'A limited-permission intelligent agent can reduce manual work and improve response time.',
    prototypeType: 'timeline',
    brandColor: '#10b981',
    secondaryColor: '#3b82f6',
  },
  {
    id: 'viral-referral-loop',
    slug: 'viral-referral-loop',
    titleAr: 'تجربة الإحالة الفيروسية',
    titleEn: 'Viral Referral Loop',
    category: 'marketing',
    status: 'testing',
    featured: true,
    featuredOrder: 3,
    summaryAr: 'بحث في كيفية تصميم نظام إحالات ينمو بشكل طبيعي بين العملاء دون الاعتماد الكامل على الحملات المدفوعة.',
    summaryEn: 'Research into designing a referral system that can grow naturally through customer sharing without relying entirely on paid campaigns.',
    relatedProductSlug: 'growth-ambassador',
    problemAr: 'برامج الإحالة التقليدية غالبًا تكون معقدة أو ضعيفة التحفيز.',
    problemEn: 'Traditional referral programs are often complex or poorly incentivized.',
    hypothesisAr: 'تبسيط المشاركة وربط المكافأة بالشراء الفعلي وتدرج المستويات قد يزيد معدل الإحالات.',
    hypothesisEn: 'Simplifying sharing, linking rewards to actual purchases, and adding tiers could increase referral rates.',
    prototypeType: 'referral',
    brandColor: '#eab308',
    secondaryColor: '#a855f7',
  },
  {
    id: 'omnichannel-smart-seller',
    slug: 'omnichannel-smart-seller',
    titleAr: 'البائع الذكي متعدد القنوات',
    titleEn: 'Omnichannel Smart Seller',
    category: 'ai',
    status: 'research',
    featured: true,
    featuredOrder: 4,
    summaryAr: 'تصور لمساعد مبيعات موحد يعمل داخل المتجر الإلكتروني والواتساب والفروع، ويحافظ على سياق العميل بين القنوات.',
    summaryEn: 'A concept for a unified sales assistant across ecommerce, WhatsApp, and physical branches while maintaining customer context between channels.',
    problemAr: 'ينقطع سياق العميل عند انتقاله من قناة إلى أخرى.',
    problemEn: 'Customer context is lost when moving from one channel to another.',
    hypothesisAr: 'توحيد المحادثة وسجل الاحتياج والتوصيات يمكن أن يرفع جودة الخدمة ويقلل التكرار.',
    hypothesisEn: 'Unifying conversation, needs history, and recommendations can improve service quality and reduce repetition.',
    prototypeType: 'nodes',
    brandColor: '#2563eb',
    secondaryColor: '#06b6d4',
  },
  {
    id: 'store-opportunity-mapping',
    slug: 'store-opportunity-mapping',
    titleAr: 'تحليل فرص المتجر تلقائيًا',
    titleEn: 'Automated Store Opportunity Mapping',
    category: 'ecommerce',
    status: 'prototype',
    featured: false,
    summaryAr: 'أداة لا تكتفي باكتشاف الأخطاء، بل ترتب فرص التحسين حسب التأثير المتوقع وسهولة التنفيذ.',
    summaryEn: 'A tool that goes beyond detecting issues by prioritizing optimization opportunities based on expected impact and implementation effort.',
    problemAr: 'تقارير التحليل التقليدية تعرض ملاحظات كثيرة دون تحديد الأولويات.',
    problemEn: 'Traditional analytics reports show many observations without setting priorities.',
    hypothesisAr: 'تقييم الفرص حسب التأثير والجهد يساعد صاحب المتجر على اتخاذ قرارات أسرع.',
    hypothesisEn: 'Evaluating opportunities by impact and effort helps store owners make faster decisions.',
    prototypeType: 'heatmap',
    brandColor: '#22c55e',
    secondaryColor: '#06b6d4',
  },
  {
    id: 'system-blueprint-assistant',
    slug: 'system-blueprint-assistant',
    titleAr: 'مساعد إنشاء الأنظمة المخصصة',
    titleEn: 'Custom System Blueprint Assistant',
    category: 'business',
    status: 'early_idea',
    featured: false,
    summaryAr: 'مساعد يجمع متطلبات العميل ويحلل سير العمل، ثم يحولها إلى تصور أولي للنظام والصفحات والصلاحيات وقاعدة البيانات.',
    summaryEn: 'An assistant that gathers client requirements, analyzes workflows, and produces an initial system blueprint covering screens, roles, and data structure.',
    problemAr: 'العملاء غالبًا يشرحون احتياجاتهم بطريقة غير منظمة، مما يسبب نقص المتطلبات وتعديلات متكررة.',
    problemEn: 'Clients often explain their needs in an unstructured way, causing missing requirements and frequent revisions.',
    hypothesisAr: 'يمكن لأداة حوارية منظمة أن تقلل غموض المتطلبات قبل بدء التطوير.',
    hypothesisEn: 'A structured conversational tool can reduce requirement ambiguity before development begins.',
    prototypeType: 'blueprint',
    brandColor: '#8b5cf6',
    secondaryColor: '#3b82f6',
  },
  {
    id: 'shipment-delay-prediction',
    slug: 'shipment-delay-prediction',
    titleAr: 'تنبؤ تأخر الشحنات',
    titleEn: 'Shipment Delay Prediction',
    category: 'trade',
    status: 'research',
    featured: false,
    summaryAr: 'تجربة لتحليل مراحل طلبات الاستيراد والتنبؤ المبكر باحتمال تأخر التصنيع أو الشحن أو التخليص.',
    summaryEn: 'An experiment to analyze import-order stages and predict potential manufacturing, shipping, or customs delays.',
    relatedProductSlug: 'nomu-trader',
    problemAr: 'اكتشاف التأخير غالبًا يحدث بعد وقوعه.',
    problemEn: 'Discovering delays often happens after the fact.',
    hypothesisAr: 'جمع البيانات التاريخية وإشارات الحالة قد يساعد في إصدار تنبيهات مبكرة.',
    hypothesisEn: 'Gathering historical data and status signals could help issue early alerts.',
    prototypeType: 'route',
    brandColor: '#f97316',
    secondaryColor: '#3b82f6',
  }
];
