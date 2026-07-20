export const siteMetadata = {
  title: 'NMOLABS | نمو لابز',
  description: 'شركة حلول تقنية وابتكار للأعمال، متخصصة في تحويل الأفكار والتحديات التشغيلية والتجارية إلى مواقع، متاجر، تطبيقات وأنظمة رقمية قابلة للاستخدام والتوسع.',
  url: 'https://nmolabs.com',
  siteName: 'NMOLABS',
  locale: 'ar_SA',
  type: 'website',
};

// Strict Types to prevent prohibited fields
export type ProhibitedSeoKeys = 'price' | 'pricing' | 'offers' | 'offer' | 'priceCurrency' | 'lowPrice' | 'highPrice' | 'discount' | 'salePrice' | 'review' | 'aggregateRating' | 'ratingValue' | 'guaranteedResults' | 'outcomeGuarantee' | 'guaranteedROI' | 'guaranteedRevenue' | 'performanceGuarantee';

export type StrictServiceSeoData = {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  [key: string]: any;
} & {
  [K in ProhibitedSeoKeys]?: never;
};

export type StrictServiceStructuredData = {
  "@context": "https://schema.org";
  "@type": "Service";
  "serviceType": string;
  "provider": {
    "@type": "Organization";
    "name": string;
    "url"?: string;
  };
  "description": string;
  "url"?: string;
  "areaServed"?: string;
  "hasOfferCatalog"?: {
    "@type": "OfferCatalog";
    "name": string;
    "itemListElement": Array<{
      "@type": "Offer";
      "itemOffered": {
        "@type": "Service";
        "name": string;
      };
      "price"?: never; // Explicitly forbidden
    }>;
  };
  [key: string]: any;
} & {
  [K in ProhibitedSeoKeys]?: never;
};


export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteMetadata.siteName,
    "url": siteMetadata.url,
    "logo": `${siteMetadata.url}/logo.png`,
    "description": siteMetadata.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressCountry": "SA"
    }
  };
};

export const generateServiceSchema = (serviceName: string, description: string, urlPath: string = ''): StrictServiceStructuredData => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "Organization",
      "name": siteMetadata.siteName
    },
    "description": description,
    "url": `${siteMetadata.url}${urlPath}`,
    "areaServed": "SA",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceName,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    }
  };
};

export const generateWebPageSchema = (title: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": siteMetadata.siteName
    }
  };
};

// Detailed schema constants
export const COMMON_SCHEMAS = {
  erp: generateServiceSchema('أنظمة تخطيط موارد المؤسسات (ERP)', 'تطوير وتخصيص أنظمة ERP متكاملة لإدارة الموارد المالية والبشرية والمخزون بكفاءة عالية بما يتناسب مع متطلبات السوق السعودي.', '/services/erp'),
  crm: generateServiceSchema('أنظمة إدارة علاقات العملاء (CRM)', 'بناء أنظمة إدارة علاقات العملاء لتتبع المبيعات وتحسين تجربة التواصل وتطوير الأعمال وأتمتة العمليات البيعية.', '/services/crm'),
  ecommerce: generateServiceSchema('تأسيس المتاجر الإلكترونية', 'تصميم وتطوير متاجر إلكترونية احترافية على منصات مثل سلة وزد وتطوير متاجر مخصصة بالكامل مع ربط بوابات الدفع وأنظمة الشحن.', '/services/ecommerce'),
  webDev: generateServiceSchema('تطوير المواقع الإلكترونية', 'برمجة وبناء مواقع إلكترونية للشركات والمؤسسات بواجهات عصرية وتجربة مستخدم متميزة تدعم تحسين محركات البحث SEO.', '/services/web'),
  apps: generateServiceSchema('تطوير تطبيقات الجوال', 'تصميم وتطوير تطبيقات الهواتف الذكية المخصصة والمبتكرة لنظامي iOS وAndroid بأعلى معايير الجودة والأداء.', '/services/apps'),
};
