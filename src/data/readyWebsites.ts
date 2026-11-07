export interface ReadyWebsite {
  slug: string;
  nameAr: string;
  nameEn: string;
  sectorAr: string;
  sectorEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  audienceAr: string[];
  benefitsAr: string[];
  keywordsAr: string[];
  previewUrl: string;
  screenshotUrl?: string;
  serviceType: 'corporate' | 'commerce' | 'content';
}
export const readyWebsites: ReadyWebsite[] = [
  {
    slug: 'manpower', nameAr: 'موقع تأجير الأيادي العاملة', nameEn: 'Manpower Rental Website',
    sectorAr: 'شركات تأجير العمالة', sectorEn: 'Manpower Services',
    taglineAr: 'واجهة احترافية لخدمات تأجير الأيادي العاملة', taglineEn: 'Professional website for manpower rental businesses',
    descriptionAr: 'نموذج موقع تعريفي وخدمي قابل للتخصيص للشركات والمؤسسات العاملة في خدمات تأجير وتوفير الأيادي العاملة. اطلع على المعاينة الفعلية وحدد متطلبات نشاطك قبل الاتفاق على نطاق التخصيص.',
    descriptionEn: 'A customizable business website concept for manpower rental and staffing service providers.',
    audienceAr: ['شركات تأجير الأيدي العاملة', 'مؤسسات الخدمات التشغيلية', 'مزودو خدمات العمالة'],
    benefitsAr: ['عرض الخدمات والقطاعات بوضوح', 'إبراز هوية الشركة ومعلومات التواصل', 'تخصيص المحتوى والدومين بحسب النشاط'],
    keywordsAr: ['تصميم موقع تأجير عمالة', 'موقع شركة تأجير الأيادي العاملة', 'إنشاء موقع مؤسسة خدمات'],
    previewUrl: 'https://rent.nmolabs.com/ar', serviceType: 'corporate'
  },
  {
    slug: 'real-estate', nameAr: 'حصاد العقار', nameEn: 'Hasad Real Estate',
    sectorAr: 'شركات التطوير العقاري', sectorEn: 'Real Estate Development',
    taglineAr: 'حضور رقمي احترافي للمطورين والشركات العقارية', taglineEn: 'Modern web presence for property developers',
    descriptionAr: 'نموذج موقع مخصص للشركات العقارية والمطورين العقاريين، يتيح معاينة التصميم الحالي قبل طلب تكييفه لهوية الشركة ومشاريعها وخدماتها.',
    descriptionEn: 'A real-estate website concept designed for property companies and developers, available for customization.',
    audienceAr: ['المطورون العقاريون', 'الشركات العقارية', 'الجهات التي تعرض المشاريع والوحدات'],
    benefitsAr: ['عرض الهوية والمشاريع بصورة احترافية', 'تنظيم محتوى الخدمات والعروض العقارية', 'تصميم قابل للتطوير بحسب نطاق المشروع'],
    keywordsAr: ['تصميم موقع شركة عقارية', 'برمجة موقع مطور عقاري', 'مواقع عقارية جاهزة'],
    previewUrl: 'https://hasad.nmolabs.com', serviceType: 'corporate'
  },
  {
    slug: 'car-wash', nameAr: 'معدات وتجهيز مغاسل السيارات', nameEn: 'Car Wash Equipment',
    sectorAr: 'التجارة الإلكترونية المتخصصة', sectorEn: 'Specialized E-commerce',
    taglineAr: 'واجهة تجارية لمعدات ومستلزمات مغاسل السيارات', taglineEn: 'Specialist storefront for car wash equipment',
    descriptionAr: 'نموذج موقع متخصص في عرض معدات وتجهيزات مغاسل السيارات. المعاينة توضح النسخة الحالية، وتحدد وظائف المتجر والتكاملات والتسعير النهائي بعد دراسة متطلبات العميل.',
    descriptionEn: 'A specialized storefront concept for car wash equipment and supplies; scope and integrations are assessed individually.',
    audienceAr: ['موردو معدات مغاسل السيارات', 'تجار مستلزمات الغسيل', 'المتاجر المتخصصة في معدات العناية بالمركبات'],
    benefitsAr: ['عرض المنتجات والأقسام المتخصصة', 'هوية رقمية واضحة لمجال المعدات', 'إمكانية تخصيص العمليات وفق الاحتياجات'],
    keywordsAr: ['تصميم متجر معدات مغاسل السيارات', 'برمجة متجر معدات غسيل السيارات', 'موقع بيع معدات المغاسل'],
    previewUrl: 'https://car-wash.nmolabs.com', serviceType: 'commerce'
  },
  {
    slug: 'stories', nameAr: 'واحة القصص', nameEn: 'Stories Platform',
    sectorAr: 'القصص والمحتوى الرقمي', sectorEn: 'Digital Stories & Content',
    taglineAr: 'منصة رقمية لعرض القصص والمحتوى', taglineEn: 'Digital platform for stories and content',
    descriptionAr: 'نموذج منصة للقصص والمحتوى الإلكتروني. يمكن معاينة التجربة الحالية وطلب تطوير نسخة تتناسب مع طبيعة المحتوى والجمهور وآلية النشر المطلوبة.',
    descriptionEn: 'A digital stories and content platform concept, customizable to publishing workflows and audience needs.',
    audienceAr: ['منشئو المحتوى', 'مشاريع القصص الإلكترونية', 'منصات النشر المتخصصة'],
    benefitsAr: ['تنظيم عرض القصص والمحتوى', 'تجربة قراءة تتناسب مع طبيعة الجمهور', 'قابلية تخصيص تجربة النشر بحسب المتطلبات'],
    keywordsAr: ['برمجة منصة قصص', 'تصميم موقع قصص إلكترونية', 'تطوير موقع محتوى رقمي'],
    previewUrl: 'https://stories.nmolabs.com', serviceType: 'content'
  }
];
export const findReadyWebsite = (slug: string) => readyWebsites.find(site => site.slug === slug);
