const fs = require('fs');
let code = fs.readFileSync('src/data/services.tsx', 'utf8');

// 1. Update ServiceItem Type
code = code.replace(
  "  deliverablesEn: string[];",
  "  deliverablesEn: string[];\n  packages?: {\n    title: string;\n    titleEn?: string;\n    price?: string;\n    priceEn?: string;\n    details: { title: string; desc: string }[];\n    detailsEn?: { title: string; desc: string }[];\n  }[];"
);

// 2. Add packages to ecommerce-setup
const ecommercePackages = `
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
    ],`;
code = code.replace(
  "    deliverablesEn: ['Starter Package', 'Growth Package', 'Full Operation Package', 'Custom Package'],",
  "    deliverablesEn: ['Starter Package', 'Growth Package', 'Full Operation Package', 'Custom Package']," + ecommercePackages
);

// 3. Add packages to ads-management
const adsPackages = `
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
    ],`;
code = code.replace(
  "    deliverablesEn: ['Market & Competitor Analysis', 'Launch & Manage Ads', 'Continuous Optimization (A/B Testing)'],",
  "    deliverablesEn: ['Market & Competitor Analysis', 'Launch & Manage Ads', 'Continuous Optimization (A/B Testing)']," + adsPackages
);

fs.writeFileSync('src/data/services.tsx', code);
