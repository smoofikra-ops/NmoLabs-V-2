export type ProductStatus = 'available' | 'on_demand' | 'in_progress' | 'planning' | 'prototype' | 'coming_soon';

export interface Product {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  shortNameAr: string;
  shortNameEn: string;
  category: string;
  status: ProductStatus;
  featured: boolean;
  featuredOrder?: number;
  summaryAr: string;
  summaryEn: string;
  descriptionAr: string;
  descriptionEn: string;
  problemsAr: string[];
  problemsEn: string[];
  benefitsAr: string[];
  benefitsEn: string[];
  featuresAr: string[];
  featuresEn: string[];
  targetAudienceAr: string[];
  targetAudienceEn: string[];
  useCasesAr: string[];
  useCasesEn: string[];
  integrations?: string[];
  brandColor: string;
  secondaryColor?: string;
  backgroundGradient?: string;
  ambientGlow?: string;
  icon?: string;
  coverVisual?: string;
  screenshots?: string[];
  demoAvailable?: boolean;
  externalUrl?: string;
  faq?: { questionAr: string; answerAr: string; questionEn: string; answerEn: string }[];
  seo?: {
    titleAr?: string;
    descriptionAr?: string;
    titleEn?: string;
    descriptionEn?: string;
  };
}

export const productsData: Product[] = [
  {
    id: '1',
    slug: 'smart-seller-ecommerce',
    titleAr: 'البائع الذكي للمتاجر الإلكترونية',
    titleEn: 'Smart Seller for Ecommerce',
    shortNameAr: 'البائع الذكي (متاجر)',
    shortNameEn: 'Smart Seller (E-com)',
    category: 'ذكاء اصطناعي وتجارة إلكترونية',
    status: 'in_progress',
    featured: true,
    featuredOrder: 1,
    summaryAr: 'مساعد مبيعات ذكي يتفاعل مع زوار المتجر الإلكتروني، ويفهم احتياجاتهم، ويجيب عن استفساراتهم، ويرشح المنتجات المناسبة، ويساعدهم على اتخاذ قرار الشراء.',
    summaryEn: 'An intelligent ecommerce sales assistant that interacts with store visitors, understands their needs, answers questions, recommends suitable products, and guides purchasing decisions.',
    descriptionAr: 'منصة تعتمد على الذكاء الاصطناعي لتقديم تجربة تسوق مخصصة لكل زائر. يعمل النظام كمندوب مبيعات خبير يتواجد على مدار الساعة، يفهم اللغة الطبيعية للعملاء، ويحلل الكتالوج لتقديم اقتراحات ذكية تزيد من نسبة التحويل والمبيعات.',
    descriptionEn: 'An AI-driven platform that provides a personalized shopping experience for every visitor. The system acts as an expert sales representative available 24/7, understanding customers natural language, and analyzing the catalog to offer smart suggestions that increase conversion rates and sales.',
    problemsAr: [
      'دخول الزوار دون إكمال الشراء.',
      'صعوبة الوصول للمنتج المناسب.',
      'كثرة الاستفسارات المتكررة.',
      'غياب المساعدة الفورية داخل المتجر.',
      'تردد العميل في اتخاذ قرار الشراء.',
      'ضعف البيع الإضافي والبيع المتقاطع.'
    ],
    problemsEn: [
      'Visitors dropping off without purchasing.',
      'Difficulty finding the right product.',
      'High volume of repetitive inquiries.',
      'Lack of immediate assistance in-store.',
      'Customer hesitation in making purchasing decisions.',
      'Poor cross-selling and upselling.'
    ],
    benefitsAr: [
      'إرشاد فوري للزائر.',
      'ترشيحات مخصصة.',
      'إجابات على مدار الساعة.',
      'تحسين تجربة التسوق.',
      'تقليل التخلي عن المتجر.',
      'دعم البيع الإضافي.'
    ],
    benefitsEn: [
      'Instant guidance for visitors.',
      'Personalized product recommendations.',
      '24/7 instant answers.',
      'Enhanced shopping experience.',
      'Reduced cart abandonment.',
      'Boosted upselling opportunities.'
    ],
    featuresAr: ['فهم اللغة الطبيعية', 'توصيات ذكية للمنتجات', 'الربط التلقائي بكتالوج المتجر', 'متابعة العربات المتروكة'],
    featuresEn: ['Natural Language Understanding', 'Smart Product Recommendations', 'Automatic Catalog Sync', 'Abandoned Cart Follow-up'],
    targetAudienceAr: ['المتاجر الإلكترونية', 'العلامات التجارية', 'شركات التجزئة المباشرة'],
    targetAudienceEn: ['Ecommerce Stores', 'DTC Brands', 'Retail Companies'],
    useCasesAr: ['مساعدة العميل في اختيار مقاس مناسب', 'الرد على أسئلة الشحن والاسترجاع'],
    useCasesEn: ['Helping customer choose the right size', 'Answering shipping & return queries'],
    brandColor: '#7C3AED',
    secondaryColor: '#3B82F6',
    demoAvailable: true,
  },
  {
    id: '2',
    slug: 'smart-seller-branches',
    titleAr: 'البائع الذكي للفروع',
    titleEn: 'Smart Seller for Branches',
    shortNameAr: 'البائع الذكي (فروع)',
    shortNameEn: 'Smart Seller (Branches)',
    category: 'ذكاء اصطناعي ومبيعات',
    status: 'in_progress',
    featured: true,
    featuredOrder: 2,
    summaryAr: 'مساعد مبيعات ذكي يعمل داخل الفروع والمتاجر التقليدية، ويساعد العملاء والموظفين على الوصول إلى المنتجات المناسبة والحصول على إجابات فورية وتحسين تجربة الشراء.',
    summaryEn: 'An intelligent sales assistant designed for physical branches, helping customers and employees find suitable products, receive instant answers, and improve the in-store buying experience.',
    descriptionAr: 'واجهة تفاعلية تعمل عبر الأجهزة اللوحية (Kiosks) أو هواتف العملاء داخل الفرع، تقدم معلومات تفصيلية عن المنتجات، توفر مقارنات، وتوجه العميل لاتخاذ قرار الشراء بثقة، مما يقلل الضغط على الموظفين.',
    descriptionEn: 'An interactive interface operating on in-store Kiosks or customers smartphones, providing detailed product information, comparisons, and guiding the customer to confidently make a purchase decision, reducing staff workload.',
    problemsAr: [
      'تأخر خدمة العملاء داخل الفروع.',
      'ضغط العملاء خلال أوقات الذروة.',
      'صعوبة معرفة تفاصيل جميع المنتجات.',
      'اختلاف مستوى الخدمة بين الموظفين.',
      'ضياع فرص البيع بسبب الانتظار.',
      'صعوبة ترشيح المنتج المناسب.'
    ],
    problemsEn: [
      'Delayed customer service in branches.',
      'Overwhelming customer traffic during peak hours.',
      'Difficulty for staff to memorize all product details.',
      'Inconsistent service quality among staff.',
      'Lost sales opportunities due to wait times.',
      'Difficulty in recommending the right product.'
    ],
    benefitsAr: [
      'خدمة عدد كبير من العملاء في الوقت نفسه.',
      'تقليل وقت الانتظار.',
      'تخفيف الضغط على موظفي المبيعات.',
      'تقديم توصيات فورية.',
      'توحيد جودة الخدمة.',
      'رفع فرص التحويل والبيع الإضافي.'
    ],
    benefitsEn: [
      'Serve multiple customers simultaneously.',
      'Reduce waiting times.',
      'Relieve pressure on sales staff.',
      'Provide instant recommendations.',
      'Standardize service quality.',
      'Increase conversion and upselling chances.'
    ],
    featuresAr: ['شاشات تفاعلية', 'مسح الباركود', 'مقارنة المنتجات', 'ربط مع المخزون الفوري'],
    featuresEn: ['Interactive Kiosks', 'Barcode Scanning', 'Product Comparison', 'Real-time Inventory Sync'],
    targetAudienceAr: ['معارض التجزئة', 'المراكز التجارية', 'المتاجر الكبرى'],
    targetAudienceEn: ['Retail Showrooms', 'Shopping Malls', 'Department Stores'],
    useCasesAr: ['استعلام العميل عن توفر لون أو مقاس دون انتظار البائع', 'تصفح الكتالوج الرقمي داخل المعرض'],
    useCasesEn: ['Customer checking color/size availability without waiting', 'Browsing digital catalog in-store'],
    brandColor: '#0EA5E9',
    secondaryColor: '#22D3EE',
    demoAvailable: true,
  },
  {
    id: '3',
    slug: 'growth-ambassador',
    titleAr: 'سفير النمو',
    titleEn: 'Growth Ambassador',
    shortNameAr: 'سفير النمو',
    shortNameEn: 'Growth Ambassador',
    category: 'إحالات وولاء ونمو',
    status: 'planning',
    featured: true,
    featuredOrder: 3,
    summaryAr: 'نظام إحالات وولاء يحول العملاء الحاليين إلى سفراء للعلامة التجارية من خلال أكواد وروابط وQR مخصصة، مع مكافآت للسفير ومزايا للعميل الجديد.',
    summaryEn: 'A referral and loyalty platform that turns existing customers into brand ambassadors using personalized codes, links, and QR codes, with rewards for ambassadors and incentives for new buyers.',
    descriptionAr: 'منصة ذكية متكاملة لإدارة برامج الإحالة والولاء. تتيح للمتاجر إطلاق برامج تسويق بالعمولة لعملائها بسهولة، تتبع المبيعات الناتجة عن الإحالات، وتوزيع المكافآت بشكل آلي، مما يبني مجتمعاً ولائياً نشطاً.',
    descriptionEn: 'A comprehensive smart platform for managing referral and loyalty programs. It allows stores to easily launch customer affiliate programs, track referral sales, and distribute rewards automatically, building an active loyal community.',
    problemsAr: [
      'ارتفاع تكاليف الاستحواذ على العملاء عبر الإعلانات.',
      'عدم استغلال ولاء العملاء الحاليين.',
      'صعوبة تتبع الإحالات بشكل يدوي.',
      'ضعف تفاعل العملاء بعد عملية الشراء الأولى.',
      'صعوبة إدارة المستحقات والمكافآت للسفراء.'
    ],
    problemsEn: [
      'High Customer Acquisition Costs (CAC) via ads.',
      'Underutilizing existing customer loyalty.',
      'Difficulty tracking referrals manually.',
      'Poor customer engagement post-purchase.',
      'Challenges in managing ambassador rewards and payouts.'
    ],
    benefitsAr: [
      'خفض تكلفة الاستحواذ على العملاء (CAC).',
      'زيادة الولاء والمبيعات المتكررة.',
      'تحويل العملاء إلى مسوقين.',
      'أتمتة كاملة لنظام المكافآت.',
      'بناء مجتمع حول العلامة التجارية.'
    ],
    benefitsEn: [
      'Lower Customer Acquisition Cost (CAC).',
      'Increase loyalty and repeat sales.',
      'Turn customers into marketers.',
      'Fully automated reward system.',
      'Build a community around the brand.'
    ],
    featuresAr: ['روابط مخصصة (QR و Links)', 'مستويات سفراء (برونزي، فضي، ذهبي)', 'محفظة أرصدة', 'لوحة تحكم خاصة بالسفير'],
    featuresEn: ['Custom Links & QR', 'Ambassador Tiers (Bronze, Silver, Gold)', 'Wallet System', 'Dedicated Ambassador Dashboard'],
    targetAudienceAr: ['العلامات التجارية المتنامية', 'المتاجر الإلكترونية', 'شركات الخدمات'],
    targetAudienceEn: ['Growing Brands', 'Ecommerce Stores', 'Service Companies'],
    useCasesAr: ['مشاركة عميل لتجربته عبر كود خصم خاص به', 'بناء شبكة مسوقين بالعمولة للمتجر'],
    useCasesEn: ['Customer sharing their experience via a custom promo code', 'Building an affiliate network for the store'],
    brandColor: '#F59E0B',
    secondaryColor: '#8B5CF6',
    demoAvailable: false,
  },
  {
    id: '4',
    slug: 'store-analysis',
    titleAr: 'أدوات تحليل المتاجر',
    titleEn: 'Store Analysis Tools',
    shortNameAr: 'تحليل المتاجر',
    shortNameEn: 'Store Analysis',
    category: 'تحليل وتحسين التجارة الإلكترونية',
    status: 'in_progress',
    featured: true,
    featuredOrder: 4,
    summaryAr: 'مجموعة أدوات ذكية لتحليل المتاجر الإلكترونية واكتشاف مشكلات السرعة وتجربة المستخدم ومحركات البحث والتحويل، ثم تقديم توصيات عملية للتحسين.',
    summaryEn: 'A set of intelligent tools that analyze ecommerce stores, identify performance, UX, SEO, and conversion issues, and provide practical optimization recommendations.',
    descriptionAr: 'منصة تشخيصية شاملة تقوم بعمل فحص دقيق للمتاجر الإلكترونية لتقييم صحتها التقنية ومستوى تجربة المستخدم. تقدم تقارير مفصلة قابلة للتنفيذ لمساعدة أصحاب المتاجر على اكتشاف التسريبات في قمع المبيعات.',
    descriptionEn: 'A comprehensive diagnostic platform that performs a deep audit of ecommerce stores to evaluate technical health and UX. It provides actionable detailed reports to help store owners discover leaks in their sales funnel.',
    problemsAr: [
      'انخفاض معدلات التحويل دون سبب واضح.',
      'بطء تحميل صفحات المنتجات.',
      'ضعف أرشفة المتجر في محركات البحث.',
      'مشاكل تجربة المستخدم على الجوال.',
      'صعوبة تحديد أولويات التحسين التقني.'
    ],
    problemsEn: [
      'Low conversion rates without a clear reason.',
      'Slow product page loading times.',
      'Poor store indexing on search engines.',
      'Mobile UX issues.',
      'Difficulty prioritizing technical improvements.'
    ],
    benefitsAr: [
      'اكتشاف نقاط الضعف بدقة.',
      'تحسين سرعة المتجر.',
      'زيادة فرص الظهور في جوجل.',
      'رفع معدل التحويل (CRO).',
      'توفير وقت تحليل المشاكل.'
    ],
    benefitsEn: [
      'Accurate identification of weak points.',
      'Improved store speed.',
      'Higher chances of Google visibility.',
      'Increased Conversion Rate (CRO).',
      'Saved time in troubleshooting.'
    ],
    featuresAr: ['فحص السرعة والأداء', 'تحليل SEO الأساسي', 'اكتشاف أخطاء واجهة المستخدم', 'تقارير قابلة للتصدير'],
    featuresEn: ['Speed & Performance Audit', 'Basic SEO Analysis', 'UI/UX Error Detection', 'Exportable Reports'],
    targetAudienceAr: ['أصحاب المتاجر', 'مدراء التجارة الإلكترونية', 'وكالات التسويق'],
    targetAudienceEn: ['Store Owners', 'Ecommerce Managers', 'Marketing Agencies'],
    useCasesAr: ['فحص متجر قبل إطلاق حملة تسويقية كبيرة', 'مراجعة دورية لأداء الموقع'],
    useCasesEn: ['Auditing a store before a major ad campaign', 'Periodic performance review'],
    brandColor: '#10B981',
    secondaryColor: '#06B6D4',
    demoAvailable: true,
  },
  {
    id: '5',
    slug: 'ads-intelligence',
    titleAr: 'نظام ذكاء الحملات الإعلانية',
    titleEn: 'NmoLabs Ads Intelligence',
    shortNameAr: 'ذكاء الحملات',
    shortNameEn: 'Ads Intelligence',
    category: 'إدارة وتحليل الحملات الإعلانية',
    status: 'prototype',
    featured: false,
    summaryAr: 'نظام داخلي موحد يساعد فريق NmoLabs على متابعة الحملات الإعلانية لعدة عملاء من نافذة واحدة، مع تقارير وتنبيهات وتوصيات تحسين لكل حساب.',
    summaryEn: 'An internal multi-client advertising intelligence system that helps the NmoLabs team monitor campaigns, reports, alerts, and optimization opportunities from one unified dashboard.',
    descriptionAr: 'منصة أتمتة وتحليل مصممة خصيصاً لوكالات التسويق وفرق النمو. تجمع بيانات الحملات من منصات متعددة في لوحة معلومات واحدة، مما يتيح متابعة الأداء الفعلي، وتلقي تنبيهات عند التغيرات المفاجئة، وتقديم توصيات مدعومة بالبيانات.',
    descriptionEn: 'An automation and analytics platform custom-built for marketing agencies and growth teams. It aggregates campaign data from multiple platforms into a single dashboard, allowing real-time performance tracking, instant alerts for sudden changes, and data-backed recommendations.',
    problemsAr: [
      'تشتت البيانات بين منصات إعلانية متعددة.',
      'صعوبة تتبع أداء عدة عملاء في وقت واحد.',
      'التأخر في اكتشاف انخفاض العائد الإعلاني (ROAS).',
      'الوقت الضائع في استخراج التقارير اليدوية.'
    ],
    problemsEn: [
      'Scattered data across multiple ad platforms.',
      'Difficulty tracking multiple clients simultaneously.',
      'Delay in spotting ROAS drops.',
      'Wasted time generating manual reports.'
    ],
    benefitsAr: [
      'مركزية البيانات في شاشة واحدة.',
      'رد فعل سريع عبر التنبيهات الآلية.',
      'توفير ساعات العمل على التقارير.',
      'تحسين مستمر لنتائج العملاء.'
    ],
    benefitsEn: [
      'Centralized data in one view.',
      'Fast reaction via automated alerts.',
      'Saved hours of reporting work.',
      'Continuous improvement of client results.'
    ],
    featuresAr: ['لوحة تحكم موحدة', 'تنبيهات انخفاض الأداء', 'تقارير مؤتمتة', 'ربط مع Google، Meta، Snapchat، TikTok'],
    featuresEn: ['Unified Dashboard', 'Performance Drop Alerts', 'Automated Reporting', 'Integrations with Google, Meta, Snap, TikTok'],
    targetAudienceAr: ['الفرق الداخلية في NmoLabs', 'مدراء الحملات الإعلانية'],
    targetAudienceEn: ['Internal NmoLabs Teams', 'Media Buyers'],
    useCasesAr: ['مراقبة ميزانية 10 عملاء معاً في موسم التخفيضات'],
    useCasesEn: ['Monitoring budgets for 10 clients simultaneously during sale seasons'],
    brandColor: '#F97316',
    secondaryColor: '#1E3A8A',
    demoAvailable: false,
  },
  {
    id: '6',
    slug: 'nomu-trader',
    titleAr: 'نمو تاجر',
    titleEn: 'Nomu Trader',
    shortNameAr: 'نمو تاجر',
    shortNameEn: 'Nomu Trader',
    category: 'تجارة واستيراد وإدارة طلبات',
    status: 'in_progress',
    featured: false,
    summaryAr: 'نظام لإدارة ومتابعة طلبات الاستيراد من الصين، بداية من استلام طلب العميل وحتى التوريد والشحن والوصول والاستلام.',
    summaryEn: 'A platform for managing and tracking China import orders from initial customer request through sourcing, shipping, delivery, and final receipt.',
    descriptionAr: 'منصة سحابية متخصصة في أتمتة دورة حياة أوامر الاستيراد. تربط بين التاجر، المورد، وشركات الشحن، لتوفر شفافية كاملة للعميل النهائي حول حالة طلبه، المدفوعات، والجدول الزمني المتوقع للوصول.',
    descriptionEn: 'A specialized cloud platform automating the import order lifecycle. It connects the merchant, supplier, and shipping companies to provide full transparency to the end customer regarding order status, payments, and expected ETA.',
    problemsAr: [
      'فقدان التحديثات بين مراحل الاستيراد المختلفة.',
      'كثرة استفسارات العملاء حول حالة الشحنات.',
      'صعوبة تتبع المدفوعات والفواتير المتعددة.',
      'الاعتماد على جداول إكسل المعقدة في إدارة الطلبات.'
    ],
    problemsEn: [
      'Lost updates across various import stages.',
      'High volume of customer queries regarding shipment status.',
      'Difficulty tracking multiple payments and invoices.',
      'Reliance on complex Excel sheets for order management.'
    ],
    benefitsAr: [
      'نظام منظم وسهل لتتبع الشحنات.',
      'تحديث العملاء آلياً بحالة طلباتهم.',
      'حفظ الوثائق والمستندات في مكان واحد.',
      'تقليل الأخطاء البشرية في إدارة الطلبات.'
    ],
    benefitsEn: [
      'Organized and simple shipment tracking system.',
      'Automated customer updates on order status.',
      'Document storage in a single place.',
      'Reduced human errors in order management.'
    ],
    featuresAr: ['إنشاء وتتبع الطلبات', 'بوابة العميل للتتبع', 'إدارة الدفعات', 'تنبيهات WhatsApp/Email'],
    featuresEn: ['Order Creation & Tracking', 'Customer Tracking Portal', 'Payment Management', 'WhatsApp/Email Alerts'],
    targetAudienceAr: ['مكاتب الاستيراد والتصدير', 'تجار الجملة', 'شركات التوريد'],
    targetAudienceEn: ['Import/Export Offices', 'Wholesalers', 'Sourcing Companies'],
    useCasesAr: ['متابعة عميل لشحنة أثاث من الصين بمرجعية رقم الطلب'],
    useCasesEn: ['Customer tracking a furniture shipment from China using an order number'],
    brandColor: '#2563EB',
    secondaryColor: '#EA580C',
    demoAvailable: true,
  },
  {
    id: '7',
    slug: 'accounting-systems',
    titleAr: 'الأنظمة المحاسبية المخصصة',
    titleEn: 'Custom Accounting Systems',
    shortNameAr: 'أنظمة محاسبية',
    shortNameEn: 'Custom Accounting',
    category: 'أنظمة أعمال وإدارة مالية',
    status: 'on_demand',
    featured: false,
    summaryAr: 'تصميم وتطوير أنظمة محاسبية وإدارية مخصصة حسب طبيعة المنشأة واحتياجاتها التشغيلية، بدل الاعتماد على حلول عامة لا تناسب جميع الأنشطة.',
    summaryEn: 'Custom-built accounting and operational systems designed around each organization’s specific workflows, requirements, and business model.',
    descriptionAr: 'حلول مالية وإدارية تبنى من الصفر أو تخصص لتلائم أدق تفاصيل العمليات اليومية للشركات. نحن نوفر أنظمة مرنة تدير المبيعات، المشتريات، المخزون، والتقارير بالطريقة التي تعمل بها شركتك فعلياً.',
    descriptionEn: 'Financial and operational solutions built from scratch or customized to fit the exact details of daily company operations. We provide flexible systems that manage sales, purchases, inventory, and reporting the way your company actually works.',
    problemsAr: [
      'عدم مرونة الأنظمة المحاسبية الجاهزة (Off-the-shelf).',
      'دفع اشتراكات لخصائص لا يتم استخدامها.',
      'صعوبة دمج النظام المحاسبي مع برامج الشركة الأخرى.',
      'تقارير غير ملائمة لطبيعة عمل الإدارة.'
    ],
    problemsEn: [
      'Inflexibility of off-the-shelf accounting systems.',
      'Paying subscriptions for unused features.',
      'Difficulty integrating the accounting system with other company software.',
      'Reports that do not suit the management business model.'
    ],
    benefitsAr: [
      'نظام مصمم خصيصاً ليطابق سير العمل (Workflow).',
      'تملك النظام بالكامل وتقليل الاشتراكات المتكررة.',
      'أمان وخصوصية أعلى للبيانات المالية.',
      'تقارير دقيقة ومخصصة لمتخذي القرار.'
    ],
    benefitsEn: [
      'System tailored to match the specific workflow.',
      'Full ownership of the system, reducing recurring subscriptions.',
      'Higher security and privacy for financial data.',
      'Accurate and custom reports for decision makers.'
    ],
    featuresAr: ['إدارة المبيعات والمشتريات', 'نظام المخزون المتقدم', 'إدارة الصلاحيات الدقيقة', 'لوحات تحكم (Dashboards) مالية'],
    featuresEn: ['Sales & Purchase Management', 'Advanced Inventory System', 'Granular Permissions Management', 'Financial Dashboards'],
    targetAudienceAr: ['الشركات المتوسطة والكبيرة', 'المصانع', 'شركات المقاولات', 'مقدمي الخدمات المتخصصة'],
    targetAudienceEn: ['Medium/Large Enterprises', 'Factories', 'Construction Companies', 'Specialized Service Providers'],
    useCasesAr: ['نظام لشركة مقاولات يربط التكاليف بمراحل المشروع المختلفة'],
    useCasesEn: ['System for a construction company linking costs to different project phases'],
    brandColor: '#065F46',
    secondaryColor: '#D97706',
    demoAvailable: false,
  }
];
