export type DynamicStep = {
  id: string;
  labelAr: string;
  labelEn: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio';
  optionsAr?: string[];
  optionsEn?: string[];
};

export type ServiceDynamicConfig = {
  [serviceId: string]: DynamicStep[];
};

export const dynamicStepsConfig: ServiceDynamicConfig = {
  ecommerce: [
    { id: 'storeInfo', labelAr: 'بيانات المتجر', labelEn: 'Store Info', type: 'textarea' },
    { id: 'products', labelAr: 'المنتجات', labelEn: 'Products', type: 'textarea' },
    { id: 'payment', labelAr: 'طرق الدفع', labelEn: 'Payment Methods', type: 'text' },
    { id: 'shipping', labelAr: 'طرق الشحن', labelEn: 'Shipping Methods', type: 'text' },
    { id: 'domain', labelAr: 'اسم النطاق (الدومين)', labelEn: 'Domain Name', type: 'text' },
    { id: 'visualIdentity', labelAr: 'الهوية البصرية', labelEn: 'Visual Identity', type: 'text' }
  ],
  marketing: [
    { id: 'marketingGoal', labelAr: 'الهدف التسويقي الرئيسي', labelEn: 'Main Marketing Goal', type: 'text' },
    { id: 'platforms', labelAr: 'المنصات المستهدفة', labelEn: 'Target Platforms', type: 'text' },
    { id: 'audience', labelAr: 'الجمهور المستهدف', labelEn: 'Target Audience', type: 'textarea' },
    { id: 'adAccounts', labelAr: 'الحسابات الإعلانية الحالية', labelEn: 'Current Ad Accounts', type: 'text' },
    { id: 'competitors', labelAr: 'المنافسون', labelEn: 'Competitors', type: 'textarea' },
  ],
  website: [
    { id: 'pages', labelAr: 'الصفحات المطلوبة', labelEn: 'Required Pages', type: 'textarea' },
    { id: 'content', labelAr: 'المحتوى المتوفر', labelEn: 'Available Content', type: 'textarea' },
    { id: 'languages', labelAr: 'اللغات المطلوبة', labelEn: 'Languages', type: 'text' },
    { id: 'domain', labelAr: 'اسم النطاق (الدومين)', labelEn: 'Domain Name', type: 'text' }
  ],
  'custom-system': [
    { id: 'systemIdea', labelAr: 'فكرة النظام', labelEn: 'System Idea', type: 'textarea' },
    { id: 'users', labelAr: 'المستخدمون المستهدفون', labelEn: 'Target Users', type: 'text' },
    { id: 'permissions', labelAr: 'الصلاحيات المطلوبة', labelEn: 'Required Permissions', type: 'textarea' },
    { id: 'integrations', labelAr: 'الربط مع أنظمة أخرى (التكاملات)', labelEn: 'Integrations', type: 'textarea' },
    { id: 'reports', labelAr: 'التقارير المطلوبة', labelEn: 'Required Reports', type: 'textarea' }
  ]
};
