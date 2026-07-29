import React from 'react';
import { Megaphone, Share2, Search, PenTool, Layout as LayoutIcon } from 'lucide-react';
import { StrictServiceSeoData } from '../lib/schemas';

export type ServiceItem = {
  id: string;
  title: string;
  titleEn: string;
  icon: React.ReactNode;
  image?: string;
  desc: string;
  descEn: string;
  deliverables: string[];
  deliverablesEn: string[];
  packages?: {
    title: string;
    titleEn?: string;
    price?: string;
    priceEn?: string;
    details: { title: string; desc: string }[];
    detailsEn?: { title: string; desc: string }[];
  }[];
  journey?: { title: string; desc: string }[];
  pricing?: {
    title: string;
    titleEn?: string;
    desc?: string;
    descEn?: string;
    items?: { label: string; value: string; desc?: string }[];
    itemsEn?: { label: string; value: string; desc?: string }[];
  };
  seo: StrictServiceSeoData;
};

export const servicesList: ServiceItem[] = [
  {
    id: 'ecommerce-setup',
    title: 'تأسيس المتاجر الإلكترونية',
    titleEn: 'E-Commerce Setup',
    icon: <LayoutIcon className="w-10 h-10" />,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',
    desc: 'من اختيار الاسم والهوية لين التشغيل والتسويق — نضبط لك متجر احترافي جاهز للبيع.',
    descEn: 'From naming and branding to operations and marketing — we build a professional, ready-to-sell store.',
    deliverables: ['باقة الانطلاقة', 'باقة النمو', 'باقة التشغيل الكامل', 'باقة مخصصة'],
    deliverablesEn: ['Starter Package', 'Growth Package', 'Full Operation Package', 'Custom Package'],
    packages: [
      {
        title: 'باقة الانطلاقة',
        titleEn: 'Starter Package',
        price: 'تواصل معنا للتسعير',
        priceEn: 'Contact for pricing',
        details: [
          { title: 'تصميم المتجر', desc: 'تصميم واجهة مستخدم أساسية وجذابة' },
          { title: 'إعداد المنتجات', desc: 'إضافة المنتجات وتصنيفاتها الأساسية' },
          { title: 'الربط والدفع', desc: 'تفعيل بوابات الدفع وطرق الشحن' }
        ],
        detailsEn: [
          { title: 'Store Design', desc: 'Basic and attractive user interface design' },
          { title: 'Product Setup', desc: 'Adding products and basic categories' },
          { title: 'Payment & Shipping', desc: 'Activating payment gateways and shipping methods' }
        ]
      },
      {
        title: 'باقة النمو',
        titleEn: 'Growth Package',
        price: 'تواصل معنا للتسعير',
        priceEn: 'Contact for pricing',
        details: [
          { title: 'تصميم متقدم', desc: 'واجهة مستخدم مخصصة لتحسين التحويل' },
          { title: 'أدوات التسويق', desc: 'ربط أدوات التتبع وتحليل البيانات' },
          { title: 'تحسين المحركات', desc: 'تهيئة أساسية لمحركات البحث SEO' }
        ],
        detailsEn: [
          { title: 'Advanced Design', desc: 'Custom UI optimized for conversions' },
          { title: 'Marketing Tools', desc: 'Integrating tracking and analytics tools' },
          { title: 'Basic SEO', desc: 'Fundamental search engine optimization' }
        ]
      },
      {
        title: 'باقة التشغيل الكامل',
        titleEn: 'Full Operation Package',
        price: 'تواصل معنا للتسعير',
        priceEn: 'Contact for pricing',
        details: [
          { title: 'إدارة متكاملة', desc: 'إدارة العمليات اليومية للمتجر بالكامل' },
          { title: 'حملات تسويقية', desc: 'إطلاق وإدارة حملات إعلانية مستمرة' },
          { title: 'تقارير دورية', desc: 'تحليل الأداء وتقديم تقارير مخصصة للنمو' }
        ],
        detailsEn: [
          { title: 'Full Management', desc: 'Complete daily operations management' },
          { title: 'Marketing Campaigns', desc: 'Launching and managing continuous ad campaigns' },
          { title: 'Periodic Reports', desc: 'Performance analysis and custom growth reports' }
        ]
      },
      {
        title: 'باقة مخصصة',
        titleEn: 'Custom Package',
        price: 'تواصل معنا للتسعير',
        priceEn: 'Contact for pricing',
        details: [
          { title: 'حلول مفصلة', desc: 'خدمات مصممة خصيصاً لاحتياجات نشاطك التجاري' },
          { title: 'استشارات خاصة', desc: 'جلسات استشارية لتحديد أفضل استراتيجيات النمو' }
        ],
        detailsEn: [
          { title: 'Tailored Solutions', desc: 'Services custom-designed for your business needs' },
          { title: 'Specialized Consulting', desc: 'Consulting sessions to determine best growth strategies' }
        ]
      }
    ],
    seo: {
      title: 'تأسيس المتاجر الإلكترونية | نمو لابز',
      description: 'نقدم حلول متكاملة لتأسيس وإطلاق المتاجر الإلكترونية بدءاً من اختيار الهوية وحتى التشغيل والتسويق لبناء متجر احترافي جاهز للبيع.',
      ogTitle: 'تأسيس المتاجر الإلكترونية | نمو لابز',
      ogDescription: 'نقدم حلول متكاملة لتأسيس وإطلاق المتاجر الإلكترونية بدءاً من اختيار الهوية وحتى التشغيل والتسويق.',
    }
  },
  {
    id: 'ads-management',
    title: 'إدارة الحملات الإعلانية',
    titleEn: 'Ads Management',
    icon: <Megaphone className="w-10 h-10" />,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    desc: 'نوجه ميزانيتك للجمهور الصح. استهداف دقيق يعتمد على الأرقام عشان نرفع مبيعاتك ROAS.',
    descEn: 'Direct your budget to the right audience. Data-driven targeting to increase your ROAS.',
    deliverables: ['دراسة السوق والمنافسين', 'إطلاق وإدارة الإعلانات', 'تحسين مستمر (A/B Testing)'],
    deliverablesEn: ['Market & Competitor Analysis', 'Launch & Manage Ads', 'Continuous Optimization (A/B Testing)'],
    packages: [
      {
        title: 'مبلغ ثابت بالإضافة إلى نسبة',
        titleEn: 'Fixed amount plus a percentage',
        price: 'حسب الميزانية الإعلانية',
        priceEn: 'Based on Ad Spend',
        details: [
          { title: 'إدارة مرنة', desc: 'رسوم ثابتة لإدارة الحملات بالإضافة إلى نسبة من العائد' },
          { title: 'تحليل الأداء', desc: 'متابعة مستمرة لتحسين العائد على الإنفاق ROAS' }
        ],
        detailsEn: [
          { title: 'Flexible Management', desc: 'Fixed fee for campaign management plus a percentage of ROAS' },
          { title: 'Performance Analysis', desc: 'Continuous monitoring to optimize ROAS' }
        ]
      },
      {
        title: 'نسبة من إجمالي الصرف',
        titleEn: 'Percentage of total spending',
        price: 'حسب الميزانية الإعلانية',
        priceEn: 'Based on Ad Spend',
        details: [
          { title: 'شراكة في النجاح', desc: 'رسومنا تعتمد بشكل كامل على ميزانية حملاتك الإعلانية' },
          { title: 'توسيع الوصول', desc: 'التركيز على الوصول لأكبر شريحة ممكنة بأفضل تكلفة' }
        ],
        detailsEn: [
          { title: 'Partnership in Success', desc: 'Our fees are fully dependent on your ad budget' },
          { title: 'Expand Reach', desc: 'Focus on reaching the largest possible audience at the best cost' }
        ]
      },
      {
        title: 'إدارة وتخطيط كامل',
        titleEn: 'Full management and planning',
        price: 'تواصل معنا للتسعير',
        priceEn: 'Contact for pricing',
        details: [
          { title: 'تخطيط استراتيجي', desc: 'بناء استراتيجية إعلانية متكاملة عبر عدة منصات' },
          { title: 'تنفيذ وإدارة', desc: 'إدارة كاملة من الإنشاء وحتى قياس وتحليل النتائج' },
          { title: 'تقارير شاملة', desc: 'تقارير دورية توضح الأداء ومقترحات التحسين' }
        ],
        detailsEn: [
          { title: 'Strategic Planning', desc: 'Building a comprehensive ad strategy across platforms' },
          { title: 'Execution & Management', desc: 'Full management from creation to analyzing results' },
          { title: 'Comprehensive Reports', desc: 'Periodic reports detailing performance and optimization proposals' }
        ]
      }
    ],
    journey: [
      {title: 'تحليل البيانات', desc: 'فهم الوضع الحالي، القنوات، الجمهور، الأداء والفرص قبل تشغيل الحملات.'},
      {title: 'التجهيز', desc: 'إعداد الحسابات الإعلانية، أدوات القياس، Pixels، الأحداث وصفحات الهبوط.'},
      {title: 'إطلاق الحملات', desc: 'بناء الحملات واختيار الجماهير والرسائل والإعلانات المناسبة.'},
      {title: 'التحسين المستمر', desc: 'متابعة الأداء، اختبار الإعلانات، تعديل الميزانيات وتحسين تكلفة النتائج.'},
      {title: 'زيادة المبيعات', desc: 'التركيز على رفع التحويل وتحسين العائد من الإنفاق الإعلاني.'},
      {title: 'الولاء والاستدامة', desc: 'إعادة الاستهداف، الاحتفاظ بالعملاء وبناء نمو مستدام طويل المدى.'}
    ],
    pricing: {
      title: 'تفاصيل التسعير والخدمة',
      titleEn: 'Pricing & Service Details',
      desc: 'إدارة الحملات الإعلانية عندنا مو مجرد إطلاق إعلان وخلاص. تعتمد بشكل كبير على نوع نشاطك، وهل متجرك وصفحات الهبوط الخاصة بك مهيأة فعلاً لتحقيق الأرباح؟ قبل ما نبدأ، ندرس حالتك بالتفصيل عشان نحدد إذا كان فيه أي مشكلة تمنع المبيعات. هدفنا ما تصرف ولا ريال في الإعلانات بدون ما يكون متجرك، منتجاتك، وكل العوامل المهمة لنجاح الحملة جاهزة ومضبوطة 100%.',
      descEn: 'Ad management depends on your business type and readiness. We ensure your store and products are fully optimized before spending any budget on ads.',
      items: [
        { label: 'مبلغ ثابت + نسبة', value: 'حسب الحالة', desc: 'مبلغ ثابت لإدارة الحملات بالإضافة إلى نسبة من المبيعات المتحققة.' },
        { label: 'نسبة من إجمالي الصرف', value: 'حسب الصرف', desc: 'نسبة مئوية من إجمالي المبلغ الذي سيتم صرفه على الحملات الإعلانية.' },
        { label: 'إدارة وتخطيط كامل', value: 'حسب الحالة', desc: 'تخطيط وإدارة شاملة للحملات، العروض، والتسعير بمبلغ منفصل.' },
      ]
    },
    seo: {
      title: 'إدارة الحملات الإعلانية | نمو لابز',
      description: 'إدارة متقدمة للحملات الإعلانية باستهداف دقيق يعتمد على تحليل البيانات لتحسين العائد على الإنفاق (ROAS).',
      ogTitle: 'إدارة الحملات الإعلانية | نمو لابز',
      ogDescription: 'إدارة متقدمة للحملات الإعلانية باستهداف دقيق يعتمد على تحليل البيانات لتحسين العائد على الإنفاق (ROAS).',
    }
  },
  {
    id: 'social-media',
    title: 'إدارة السوشيال ميديا',
    titleEn: 'Social Media Management',
    icon: <Share2 className="w-10 h-10" />,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    desc: 'ما ننزل بوستات وبس، نبني لك مجتمع يتفاعل ويشتري. ندير حساباتك من الألف للياء.',
    descEn: 'We do not just post; we build an engaging community that buys. End-to-end account management.',
    deliverables: ['خطة محتوى شهرية', 'تصميم بوستات وفيديوهات', 'إدارة التفاعل', 'توثيق الحسابات'],
    deliverablesEn: ['Monthly Content Plan', 'Posts & Video Design', 'Engagement Management', 'Account Verification'],
    pricing: {
      title: 'تفاصيل التسعير والخدمة',
      titleEn: 'Pricing & Service Details',
      desc: 'نمسك حساباتك ونديرها بشكل كامل وباحترافية عالية، عشان تبني تفاعل قوي مع جمهورك وتزيد الوعي بعلامتك التجارية.',
      descEn: 'Full professional management of your social media accounts to build strong engagement and brand awareness.',
      items: [
        { label: 'إدارة الحساب الواحد', value: '500 ريال / شهرياً', desc: 'تشمل نشر 30 بوست وصورة، بالإضافة إلى 5 مقاطع فيديو لكل منصة (إنستجرام، إكس، سناب شات وغيرها).' },
      ]
    },
    seo: {
      title: 'إدارة السوشيال ميديا | نمو لابز',
      description: 'نحن لا ننشر المحتوى فقط، بل نبني مجتمعاً يتفاعل لخدمة أهدافك التسويقية من خلال إدارة احترافية لحسابات التواصل الاجتماعي.',
      ogTitle: 'إدارة السوشيال ميديا | نمو لابز',
      ogDescription: 'إدارة احترافية لحسابات التواصل الاجتماعي لبناء مجتمع تفاعلي قوي.',
    }
  },
  {
    id: 'seo',
    title: 'تحسين محركات البحث SEO',
    titleEn: 'SEO Optimization',
    icon: <Search className="w-10 h-10" />,
    image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&q=80&w=1200',
    desc: 'نمسك لك الصدارة ببحث جوجل عشان تضمن زوار حقيقيين ومجانيين يدورون على منتجاتك.',
    descEn: 'Secure the top spots on Google search to ensure real, free traffic looking for your products.',
    deliverables: ['تدقيق فني للمتجر', 'تحليل كلمات مفتاحية', 'بناء روابط (Backlinks)', 'تحسين سرعة الموقع'],
    deliverablesEn: ['Technical Store Audit', 'Keyword Analysis', 'Link Building (Backlinks)', 'Site Speed Optimization'],
    pricing: {
      title: 'تفاصيل التسعير والخدمة',
      titleEn: 'Pricing & Service Details',
      desc: 'إيش فايدة الـ SEO؟ تحسين محركات البحث هو استثمارك الحقيقي على المدى الطويل. يساعد متجرك يظهر في الصفحة الأولى لجوجل، وهذا يعني زوار مجانيين وعملاء مستمرين بدون ما تدفع ريال في الإعلانات. راح نشتغل على تحسين الكلمات المفتاحية، سرعة الموقع، وبناء الروابط، وغالباً تبدأ تلاحظ النتائج وتصدر موقعك خلال 3 إلى 6 أشهر من العمل المستمر.',
      descEn: 'SEO is a long-term investment to rank your site on the first page of Google, bringing continuous organic traffic without ad spend.',
      items: [
        { label: 'باقة 3 أشهر', value: '6,000 ريال', desc: 'بمعدل 2000 ريال شهرياً. تشمل تهيئة كاملة للمتجر، تحسينات تقنية، وبناء محتوى يرفع من ترتيبك في جوجل.' },
      ]
    },
    seo: {
      title: 'تحسين محركات البحث SEO | نمو لابز',
      description: 'تصدر نتائج البحث في جوجل واحصل على زوار مهتمين ومجانيين من خلال استراتيجيات SEO متقدمة وبناء روابط قوية.',
      ogTitle: 'تحسين محركات البحث SEO | نمو لابز',
      ogDescription: 'تصدر نتائج البحث في جوجل واحصل على زوار مهتمين من خلال استراتيجيات SEO متقدمة.',
    }
  },
  {
    id: 'copywriting',
    title: 'كتابة المحتوى البيعي',
    titleEn: 'Sales Copywriting',
    icon: <PenTool className="w-10 h-10" />,
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e74b8638c?auto=format&fit=crop&q=80&w=1200',
    desc: 'نكتب الكلمات اللي تقنع العميل يفتح محفظته ويدفع بدون أي تردد.',
    descEn: 'We write the words that convince the customer to open their wallet and pay without hesitation.',
    deliverables: ['وصف منتجات احترافي', 'نصوص الإعلانات (Copywriting)', 'إيميلات تسويقية', 'صفحات هبوط'],
    deliverablesEn: ['Professional Product Descriptions', 'Ad Copywriting', 'Email Marketing', 'Landing Pages'],
    seo: {
      title: 'كتابة المحتوى البيعي | نمو لابز',
      description: 'كتابة محتوى إعلاني بيعي متخصص ومقنع يساعد في تحويل الزوار إلى عملاء بشكل فعال عبر أوصف منتجات ونصوص دقيقة.',
      ogTitle: 'كتابة المحتوى البيعي | نمو لابز',
      ogDescription: 'كتابة محتوى إعلاني بيعي متخصص ومقنع يساعد في تحويل الزوار إلى عملاء بشكل فعال.',
    }
  },
  {
    id: 'ui-ux',
    title: 'تصميم واجهات المتجر (UI/UX)',
    titleEn: 'UI/UX Design',
    icon: <LayoutIcon className="w-10 h-10" />,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200',
    desc: 'نصمم لك واجهات مو بس شكلها حلو، لكن تسهّل الشراء وترفع نسبة التحويل.',
    descEn: 'We design interfaces that are not only beautiful but also facilitate purchases and increase conversion rates.',
    deliverables: ['خرائط حرارية لتحليل السلوك', 'تصميم صفحات المنتجات', 'تحسين خطوات الدفع', 'اختبار المستخدمين'],
    deliverablesEn: ['Heatmaps for Behavior Analysis', 'Product Page Design', 'Checkout Optimization', 'User Testing'],
    pricing: {
      title: 'تفاصيل التسعير والخدمة',
      titleEn: 'Pricing & Service Details',
      desc: 'نصمم لك واجهة متجر مخصصة بالكامل تناسب نوع نشاطك وتعكس هويتك، بعيداً عن الثيمات الجاهزة والمكررة. نركز على تحسين تجربة المستخدم (UI/UX) عشان نضمن رحلة سلسة للعميل تزيد من احتمالية الشراء.',
      descEn: 'Custom storefront design tailored to your business, focusing on UI/UX best practices to increase conversion rates without relying on templates.',
      items: [
        { label: 'تصميم واجهة المتجر', value: '1,200 ريال', desc: 'تصميم مخصص، متوافق مع تجربة المستخدم (UX/UI)، ومبني خصيصاً ليناسب نشاطك التجاري.' },
      ]
    },
    seo: {
      title: 'تصميم واجهات وتجربة المستخدم UI/UX | نمو لابز',
      description: 'تصميم واجهات مستخدم وتجارب (UI/UX) احترافية لا تقتصر على الجماليات بل تهدف لتسهيل عملية الشراء ورفع معدلات التحويل.',
      ogTitle: 'تصميم واجهات وتجربة المستخدم UI/UX | نمو لابز',
      ogDescription: 'تصميم واجهات مستخدم وتجارب احترافية تهدف لرفع معدلات التحويل.',
    }
  }
];
