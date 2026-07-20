export interface CompanyData {
  nameAr: string;
  nameEn: string;
  legalNameAr: string;
  legalNameEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  positioningAr: string;
  positioningEn: string;
  visionAr: string;
  visionEn: string;
  missionAr: string;
  missionEn: string;
  values: Array<{
    id: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }>;
  businessAreas: Array<{
    id: string;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: string;
    linkRoute?: string;
    linkAct?: string;
  }>;
  sectors: Array<{
    nameAr: string;
    nameEn: string;
  }>;
  workProcess: Array<{
    step: number;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }>;
  journeyStages: Array<{
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
  }>;
  links: {
    work: string;
    services: string;
    products: string;
    innovation: string;
    founder: string;
  };
  seo: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
  };
}

export const companyData: CompanyData = {
  nameAr: 'نمو لابز',
  nameEn: 'NmoLabs',
  legalNameAr: 'NmoLabs للتقنية والتسويق',
  legalNameEn: 'NmoLabs for Technology and Marketing',
  shortDescriptionAr: 'NmoLabs شركة تقنية وتطوير رقمي تجمع بين بناء المواقع والمتاجر والأنظمة والمنتجات الذكية، وبين فهم التسويق وتجربة المستخدم والعمليات، لتقديم حلول تخدم أهداف المشروع وتستطيع النمو معه.',
  shortDescriptionEn: 'NmoLabs is a technology and digital development company that combines websites, ecommerce, custom systems, and intelligent products with marketing, user experience, and operational understanding to build solutions that support business goals and scale with them.',
  fullDescriptionAr: 'NmoLabs هي شركة تقنية وتطوير رقمي تساعد الشركات والمشاريع على بناء حضورها الرقمي وتحسين عملياتها من خلال المواقع والمتاجر الإلكترونية والأنظمة المخصصة والذكاء الاصطناعي والحلول التسويقية المتكاملة.\n\nلا نبدأ من اختيار التقنية أو شكل التصميم، بل نبدأ بفهم النشاط والمستخدم والتحديات والهدف المطلوب، ثم نبني الحل المناسب الذي يمكن تطويره والتوسع فيه مستقبلًا.\n\nلا ننظر إلى الموقع أو المتجر أو النظام كمنتج منفصل، بل كجزء من منظومة العمل والمبيعات والتشغيل والنمو.',
  fullDescriptionEn: 'NmoLabs is a technology and digital development company that helps businesses build their digital presence and improve operations through websites, ecommerce platforms, custom systems, artificial intelligence, and integrated marketing solutions.\n\nWe do not begin with technology selection or visual design. We begin by understanding the business, users, challenges, and desired outcomes, then build a solution that can evolve and scale.\n\nWe view every website, store, or system as part of a broader business, sales, operations, and growth ecosystem.',
  positioningAr: 'شركة تقنية تفهم العمل قبل أن تبدأ في البناء',
  positioningEn: 'A technology company that understands the business before building',
  visionAr: 'أن تكون NmoLabs شريكًا تقنيًا موثوقًا يساعد الشركات والمشاريع على بناء حلول رقمية عملية وقابلة للتطوير، تجمع بين التقنية وفهم الأعمال والنمو.',
  visionEn: 'To be a trusted technology partner that helps businesses build practical, scalable digital solutions combining technology, business understanding, and growth.',
  missionAr: 'فهم تحديات الأعمال وتحويلها إلى مواقع ومتاجر وأنظمة ومنتجات رقمية تساعد على تحسين التشغيل وتجربة العملاء والمبيعات.',
  missionEn: 'To understand business challenges and transform them into websites, ecommerce platforms, systems, and digital products that improve operations, customer experience, and sales.',
  values: [
    {
      id: 'understanding',
      titleAr: 'الفهم قبل التنفيذ',
      titleEn: 'Understanding Before Executing',
      descAr: 'لا نبدأ بالبناء قبل فهم المشروع والمشكلة والهدف.',
      descEn: 'We do not start building before fully understanding the project, problem, and objective.'
    },
    {
      id: 'utility',
      titleAr: 'الحل قبل الاستعراض',
      titleEn: 'Solutions Over Showing Off',
      descAr: 'الجمال مهم، لكن يجب أن يخدم الاستخدام والنتائج.',
      descEn: 'Aesthetics matter, but they must serve utility and concrete results.'
    },
    {
      id: 'transparency',
      titleAr: 'الوضوح',
      titleEn: 'Clarity',
      descAr: 'نوضح النطاق والمراحل والمسؤوليات والقرارات.',
      descEn: 'We clarify the scope, phases, responsibilities, and decisions upfront.'
    },
    {
      id: 'flexibility',
      titleAr: 'المرونة',
      titleEn: 'Flexibility',
      descAr: 'نبني حلولًا قابلة للتعديل والتوسع.',
      descEn: 'We build solutions designed to be modified and scaled.'
    },
    {
      id: 'partnership',
      titleAr: 'الشراكة',
      titleEn: 'Partnership',
      descAr: 'نتعامل مع العميل كشريك نجاح وليس مجرد طلب.',
      descEn: 'We treat the client as a success partner, not just a service request.'
    },
    {
      id: 'continuous-improvement',
      titleAr: 'التحسين المستمر',
      titleEn: 'Continuous Improvement',
      descAr: 'لا نعتبر الإطلاق نهاية المشروع.',
      descEn: 'We do not view launch as the end of the project.'
    },
    {
      id: 'privacy-security',
      titleAr: 'الخصوصية والأمان',
      titleEn: 'Privacy & Security',
      descAr: 'نراعي حماية البيانات والصلاحيات منذ بداية التصميم.',
      descEn: 'We incorporate data privacy and access control from the design phase.'
    },
    {
      id: 'quality',
      titleAr: 'الجودة في التفاصيل',
      titleEn: 'Quality in Details',
      descAr: 'التجربة القوية تتكون من قرارات صغيرة مدروسة.',
      descEn: 'A robust experience is made of deliberate small decisions.'
    }
  ],
  businessAreas: [
    {
      id: 'experiences',
      titleAr: 'المواقع والتجارب الرقمية',
      titleEn: 'Websites & Digital Experiences',
      descAr: 'مواقع تعريفية وصفحات هبوط وكتالوجات رقمية وتجارب مؤسسية تعكس هوية النشاط وتدعم أهدافه.',
      descEn: 'Informational websites, landing pages, digital catalogs, and corporate experiences that reflect your brand identity and support its goals.',
      icon: 'Globe',
      linkAct: 'whatToBuild'
    },
    {
      id: 'ecommerce',
      titleAr: 'المتاجر والتجارة الإلكترونية',
      titleEn: 'Stores & E-Commerce',
      descAr: 'متاجر إلكترونية وتجارب شراء وتحسين تحويل وربط منصات الدفع والشحن والتحليلات.',
      descEn: 'E-commerce stores, checkout experiences, conversion rate optimization, and integrations with payment, shipping, and analytical platforms.',
      icon: 'ShoppingBag',
      linkRoute: 'products'
    },
    {
      id: 'custom-systems',
      titleAr: 'الأنظمة والمنصات المخصصة',
      titleEn: 'Custom Systems & Platforms',
      descAr: 'لوحات تحكم وأنظمة تشغيل وإدارة ومتابعة وحلول محاسبية ومنصات مصممة حول سير العمل الحقيقي.',
      descEn: 'Control panels, operations systems, management portals, accounting solutions, and custom platforms designed around actual workflows.',
      icon: 'Layers',
      linkAct: 'services'
    },
    {
      id: 'ai-products',
      titleAr: 'المنتجات والذكاء الاصطناعي',
      titleEn: 'Products & Artificial Intelligence',
      descAr: 'مساعدات مبيعات وأدوات تحليل وأنظمة إحالات وأتمتة ومنتجات تقنية قابلة للتطوير.',
      descEn: 'Sales assistants, analysis tools, referral systems, automation engines, and scalable technology products.',
      icon: 'Cpu',
      linkRoute: 'innovation-lab'
    },
    {
      id: 'marketing-growth',
      titleAr: 'التسويق والنمو',
      titleEn: 'Marketing & Growth',
      descAr: 'استراتيجيات تسويق وحملات وإعلانات ومحركات بحث ومحتوى وتحسين تجربة المستخدم والمبيعات.',
      descEn: 'Marketing strategies, campaigns, advertising, search engine optimization (SEO), content creation, and conversion rate/sales optimization.',
      icon: 'TrendingUp',
      linkAct: 'services'
    }
  ],
  sectors: [
    { nameAr: 'التجارة الإلكترونية', nameEn: 'E-commerce' },
    { nameAr: 'المناديل والمنتجات الاستهلاكية', nameEn: 'Tissues & Consumer Products' },
    { nameAr: 'الإلكترونيات والشبكات', nameEn: 'Electronics & Networks' },
    { nameAr: 'المقاولات', nameEn: 'Contracting' },
    { nameAr: 'التشجير والمقاولات الزراعية', nameEn: 'Landscaping & Agricultural Contracting' },
    { nameAr: 'الدعاية والإعلان', nameEn: 'Advertising & Marketing' },
    { nameAr: 'المفروشات ومنتجات النوم', nameEn: 'Furniture & Sleep Products' },
    { nameAr: 'المنتجات الغذائية', nameEn: 'Food Products' },
    { nameAr: 'الإنتاج الإعلامي والفعاليات', nameEn: 'Media Production & Events' },
    { nameAr: 'الاستيراد والتجارة', nameEn: 'Import & Trading' },
    { nameAr: 'الأنظمة المحاسبية والإدارية', nameEn: 'Accounting & Admin Systems' },
    { nameAr: 'الخدمات المهنية', nameEn: 'Professional Services' }
  ],
  workProcess: [
    {
      step: 1,
      titleAr: 'الاستكشاف',
      titleEn: 'Discovery',
      descAr: 'فهم النشاط والأهداف والمستخدمين والتحديات.',
      descEn: 'Understanding the business, goals, target users, and current challenges.'
    },
    {
      step: 2,
      titleAr: 'التحليل',
      titleEn: 'Analysis',
      descAr: 'تحليل المتمتطلبات والمنافسين وسير العمل والفرص.',
      descEn: 'Analyzing requirements, competitors, real-world workflows, and opportunities.'
    },
    {
      step: 3,
      titleAr: 'التصور',
      titleEn: 'Conceptualization',
      descAr: 'تصميم الهيكل وتجربة المستخدم والوظائف ونطاق المشروع.',
      descEn: 'Designing the architecture, user experience flow, features, and project scope.'
    },
    {
      step: 4,
      titleAr: 'التنفيذ',
      titleEn: 'Execution',
      descAr: 'التصميم والتطوير والربط وبناء المحتوى والأنظمة.',
      descEn: 'Handling final UI design, development, systems integrations, and content building.'
    },
    {
      step: 5,
      titleAr: 'الاختبار',
      titleEn: 'Testing',
      descAr: 'اختبار الوظائف والجوال والأداء وتجربة المستخدم.',
      descEn: 'Verifying functionality, mobile responsiveness, performance, and user experience.'
    },
    {
      step: 6,
      titleAr: 'الإطلاق',
      titleEn: 'Launch',
      descAr: 'النشر والربط والتأكد من عمل النظام بشكل صحيح.',
      descEn: 'Publishing, connecting custom domains, and ensuring the systems run correctly.'
    },
    {
      step: 7,
      titleAr: 'التحسين',
      titleEn: 'Optimization',
      descAr: 'مراقبة النتائج وإجراء التحسينات والتطوير المستمر.',
      descEn: 'Monitoring results, conducting continuous improvements, and iterative scaling.'
    }
  ],
  journeyStages: [
    {
      titleAr: 'التجارة الإلكترونية والتشغيل',
      titleEn: 'E-commerce & Operations',
      descAr: 'البدايات بالعمل المباشر في تشغيل المتاجر وتحدياتها اليومية.',
      descEn: 'Our early phase working directly on e-commerce store operations and day-to-day operations.'
    },
    {
      titleAr: 'التسويق وتجربة المستخدم',
      titleEn: 'Marketing & User Experience',
      descAr: 'التوسع في فهم سلوك العميل، تحسين معدل التحويل والحملات.',
      descEn: 'Expanding into user psychology, optimizing conversion rates, and scaling marketing campaigns.'
    },
    {
      titleAr: 'المواقع والمتاجر',
      titleEn: 'Websites & Custom Stores',
      descAr: 'تطوير المواقع والمتاجر لتكون سريعة ومصممة خصيصاً.',
      descEn: 'Developing high-performance, custom-crafted websites and stores built to scale.'
    },
    {
      titleAr: 'الأنظمة المخصصة',
      titleEn: 'Custom Systems',
      descAr: 'ربط وبناء لوحات التحكم المخصصة وإدارة العمليات بكفاءة.',
      descEn: 'Building custom backend portals and operations panels to automate workflows.'
    },
    {
      titleAr: 'تأسيس NmoLabs',
      titleEn: 'Founding NmoLabs',
      descAr: 'إطلاق العلامة التجارية لجمع الخبرات وصياغة هوية متكاملة.',
      descEn: 'Launching NmoLabs as a unified brand combining all our expertise under one house.'
    },
    {
      titleAr: 'المنتجات التقنية',
      titleEn: 'Technology Products',
      descAr: 'التحول لبناء منتجات ذكية وأدوات خاصة للنمو والمبيعات.',
      descEn: 'Transitioning to building smart software products and growth enablement systems.'
    },
    {
      titleAr: 'مختبر الابتكارات',
      titleEn: 'Innovation Lab',
      descAr: 'صناعة أفكار وتجارب ونماذج أولية لتطوير حلول الغد بالذكاء الاصطناعي.',
      descEn: 'Pioneering prototypes, AI experiments, and future solutions to shape tomorrow\'s market.'
    }
  ],
  links: {
    work: 'work',
    services: 'services',
    products: 'products',
    innovation: 'innovation-lab',
    founder: 'founder'
  },
  seo: {
    titleAr: 'من نحن | NmoLabs للتقنية والتسويق',
    titleEn: 'About NmoLabs | Technology and Digital Development',
    descriptionAr: 'تعرف على NmoLabs، شركة تقنية وتطوير رقمي تبني المواقع والمتاجر الإلكترونية والأنظمة المخصصة ومنتجات الذكاء الاصطناعي وحلول النمو.',
    descriptionEn: 'Learn about NmoLabs, a technology and digital development company building websites, ecommerce platforms, custom systems, AI products, and growth solutions.'
  }
};
