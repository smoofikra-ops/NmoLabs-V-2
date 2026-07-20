import React from 'react';
import { Megaphone, Share2, Search, PenTool, Layout as LayoutIcon } from 'lucide-react';
import { StrictServiceSeoData } from '../lib/schemas';

export type ServiceItem = {
  id: string;
  title: string;
  titleEn: string;
  icon: React.ReactNode;
  desc: string;
  descEn: string;
  deliverables: string[];
  deliverablesEn: string[];
  journey?: { title: string; desc: string }[];
  seo: StrictServiceSeoData;
};

export const servicesList: ServiceItem[] = [
  {
    id: 'ecommerce-setup',
    title: 'تأسيس المتاجر الإلكترونية',
    titleEn: 'E-Commerce Setup',
    icon: <LayoutIcon className="w-10 h-10" />,
    desc: 'من اختيار الاسم والهوية لين التشغيل والتسويق — نضبط لك متجر احترافي جاهز للبيع.',
    descEn: 'From naming and branding to operations and marketing — we build a professional, ready-to-sell store.',
    deliverables: ['باقة الانطلاقة', 'باقة النمو', 'باقة التشغيل الكامل', 'باقة مخصصة'],
    deliverablesEn: ['Starter Package', 'Growth Package', 'Full Operation Package', 'Custom Package'],
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
    desc: 'نوجه ميزانيتك للجمهور الصح. استهداف دقيق يعتمد على الأرقام عشان نرفع مبيعاتك ROAS.',
    descEn: 'Direct your budget to the right audience. Data-driven targeting to increase your ROAS.',
    deliverables: ['دراسة السوق والمنافسين', 'إطلاق وإدارة الإعلانات', 'تحسين مستمر (A/B Testing)'],
    deliverablesEn: ['Market & Competitor Analysis', 'Launch & Manage Ads', 'Continuous Optimization (A/B Testing)'],
    journey: [
      {title: 'تحليل البيانات', desc: 'فهم الوضع الحالي، القنوات، الجمهور، الأداء والفرص قبل تشغيل الحملات.'},
      {title: 'التجهيز', desc: 'إعداد الحسابات الإعلانية، أدوات القياس، Pixels، الأحداث وصفحات الهبوط.'},
      {title: 'إطلاق الحملات', desc: 'بناء الحملات واختيار الجماهير والرسائل والإعلانات المناسبة.'},
      {title: 'التحسين المستمر', desc: 'متابعة الأداء، اختبار الإعلانات، تعديل الميزانيات وتحسين تكلفة النتائج.'},
      {title: 'زيادة المبيعات', desc: 'التركيز على رفع التحويل وتحسين العائد من الإنفاق الإعلاني.'},
      {title: 'الولاء والاستدامة', desc: 'إعادة الاستهداف، الاحتفاظ بالعملاء وبناء نمو مستدام طويل المدى.'}
    ],
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
    desc: 'ما ننزل بوستات وبس، نبني لك مجتمع يتفاعل ويشتري. ندير حساباتك من الألف للياء.',
    descEn: 'We do not just post; we build an engaging community that buys. End-to-end account management.',
    deliverables: ['خطة محتوى شهرية', 'تصميم بوستات وفيديوهات', 'إدارة التفاعل', 'توثيق الحسابات'],
    deliverablesEn: ['Monthly Content Plan', 'Posts & Video Design', 'Engagement Management', 'Account Verification'],
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
    desc: 'نمسك لك الصدارة ببحث جوجل عشان تضمن زوار حقيقيين ومجانيين يدورون على منتجاتك.',
    descEn: 'Secure the top spots on Google search to ensure real, free traffic looking for your products.',
    deliverables: ['تدقيق فني للمتجر', 'تحليل كلمات مفتاحية', 'بناء روابط (Backlinks)', 'تحسين سرعة الموقع'],
    deliverablesEn: ['Technical Store Audit', 'Keyword Analysis', 'Link Building (Backlinks)', 'Site Speed Optimization'],
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
    desc: 'نصمم لك واجهات مو بس شكلها حلو، لكن تسهّل الشراء وترفع نسبة التحويل.',
    descEn: 'We design interfaces that are not only beautiful but also facilitate purchases and increase conversion rates.',
    deliverables: ['خرائط حرارية لتحليل السلوك', 'تصميم صفحات المنتجات', 'تحسين خطوات الدفع', 'اختبار المستخدمين'],
    deliverablesEn: ['Heatmaps for Behavior Analysis', 'Product Page Design', 'Checkout Optimization', 'User Testing'],
    seo: {
      title: 'تصميم واجهات وتجربة المستخدم UI/UX | نمو لابز',
      description: 'تصميم واجهات مستخدم وتجارب (UI/UX) احترافية لا تقتصر على الجماليات بل تهدف لتسهيل عملية الشراء ورفع معدلات التحويل.',
      ogTitle: 'تصميم واجهات وتجربة المستخدم UI/UX | نمو لابز',
      ogDescription: 'تصميم واجهات مستخدم وتجارب احترافية تهدف لرفع معدلات التحويل.',
    }
  }
];
