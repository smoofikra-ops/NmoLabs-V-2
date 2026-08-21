const fs = require('fs');

const contextPath = 'src/context/SiteContext.tsx';
let content = fs.readFileSync(contextPath, 'utf8');

const targetArrayEnd = `    { id: 'partner_1779064336725', name: 'شركة مقاولات', color: '', imageUrl: '', linkUrl: '' }
  ],`;

const newPartners = `    { id: 'partner_1779064336725', name: 'شركة مقاولات', color: '', imageUrl: '', linkUrl: '' },
    { 
      id: 'partner_rayatnajd', 
      name: 'رايات نجد', 
      color: '#3f7b49', 
      imageUrl: '', 
      linkUrl: 'https://rayatnajd.com',
      types: ['موقع مؤسسي متكامل'],
      description: 'يعرض الشركة وخدمات التشجير والاستدامة والمشاتل والمشاريع السابقة، ويضم مركز معرفة ومدونة وأدوات ذكية. مناسب للشركات التي تحتاج إلى بناء الثقة، عرض خبراتها، واستهداف الظهور في نتائج البحث على المدى الطويل.'
    },
    { 
      id: 'partner_eventlive', 
      name: 'إيفنت لايف', 
      color: '#e30a21', 
      imageUrl: '', 
      linkUrl: 'https://eventliveksa.com',
      types: ['موقع خدماتي بصري'],
      description: 'يركز على التصوير الفوتوغرافي، إنتاج الفيديو، البث المباشر وتغطية الفعاليات والمؤتمرات. يتميز بالعرض البصري القوي، إبراز الأعمال السابقة، وسهولة الوصول إلى الاتصال والواتساب لطلب الخدمة.'
    },
    { 
      id: 'partner_almethali', 
      name: 'المثالي للدعاية والإعلان', 
      color: '#1a56a4', 
      imageUrl: '', 
      linkUrl: 'https://almethaliadv.com',
      types: ['موقع خدمات ومعرض أعمال'],
      description: 'يعرض مجموعة كبيرة من الخدمات مثل اللوحات الإعلانية، الطباعة الرقمية، تجهيز المعارض والأكشاك، الفعاليات، الاستاندات والهدايا الدعائية، مع تقسيم واضح للخدمات ومعرض للأعمال المنفذة.'
    }
  ],`;

if (content.includes(targetArrayEnd)) {
  content = content.replace(targetArrayEnd, newPartners);
  fs.writeFileSync(contextPath, content);
  console.log("Successfully added new partners to SiteContext.");
} else {
  console.error("Could not find the target array end in SiteContext.");
}
