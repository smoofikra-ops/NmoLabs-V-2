const fs = require('fs');
const path = 'src/data/projects.ts';
let content = fs.readFileSync(path, 'utf8');

const targetArrayStart = `export const projects: Project[] = [`;

const newProjects = `export const projects: Project[] = [
  {
    id: 'proj_rayatnajd',
    slug: 'rayatnajd',
    coverImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=1200',
    year: '2023',
    titleAr: 'رايات نجد',
    titleEn: 'Rayat Najd',
    category: 'corporate',
    sectorAr: 'موقع مؤسسي متكامل',
    sectorEn: 'Corporate Website',
    summaryAr: 'يعرض الشركة وخدمات التشجير والاستدامة والمشاتل والمشاريع السابقة، ويضم مركز معرفة ومدونة وأدوات ذكية. مناسب للشركات التي تحتاج إلى بناء الثقة، عرض خبراتها، واستهداف الظهور في نتائج البحث على المدى الطويل.',
    summaryEn: 'Showcases landscaping services, sustainability, nurseries, and previous projects, featuring a knowledge center, blog, and smart tools.',
    status: 'active',
    featured: true,
    featuredOrder: 5,
    size: 'standard',
    cardSize: 'standard',
    services: ['تصميم واجهة المستخدم', 'تطوير الويب', 'مركز المعرفة', 'تحسين محركات البحث'],
    projectUrl: 'https://rayatnajd.com',
    resultsAvailable: false,
    brandColor: '#3f7b49',
    backgroundStyle: 'gradient',
  },
  {
    id: 'proj_eventlive',
    slug: 'eventlive',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200',
    year: '2023',
    titleAr: 'إيفنت لايف',
    titleEn: 'Event Live',
    category: 'corporate',
    sectorAr: 'موقع خدماتي بصري',
    sectorEn: 'Visual Services Website',
    summaryAr: 'يركز على التصوير الفوتوغرافي، إنتاج الفيديو، البث المباشر وتغطية الفعاليات والمؤتمرات. يتميز بالعرض البصري القوي، إبراز الأعمال السابقة، وسهولة الوصول إلى الاتصال والواتساب لطلب الخدمة.',
    summaryEn: 'Focuses on photography, video production, live streaming, and event coverage with strong visual displays and easy communication access.',
    status: 'active',
    featured: true,
    featuredOrder: 6,
    size: 'standard',
    cardSize: 'standard',
    services: ['تصميم المواقع', 'عرض بصري', 'تجربة المستخدم'],
    projectUrl: 'https://eventliveksa.com',
    resultsAvailable: false,
    brandColor: '#e30a21',
    backgroundStyle: 'gradient',
  },
  {
    id: 'proj_almethali',
    slug: 'almethali',
    coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',
    year: '2023',
    titleAr: 'المثالي للدعاية والإعلان',
    titleEn: 'Almethali Adv',
    category: 'corporate',
    sectorAr: 'موقع خدمات ومعرض أعمال',
    sectorEn: 'Services and Portfolio Website',
    summaryAr: 'يعرض مجموعة كبيرة من الخدمات مثل اللوحات الإعلانية، الطباعة الرقمية، تجهيز المعارض والأكشاك، الفعاليات، الاستاندات والهدايا الدعائية، مع تقسيم واضح للخدمات ومعرض للأعمال المنفذة.',
    summaryEn: 'Displays a wide range of advertising services, digital printing, exhibitions setup, and promotional gifts with clear service categorization.',
    status: 'active',
    featured: true,
    featuredOrder: 7,
    size: 'standard',
    cardSize: 'standard',
    services: ['تصميم واجهة المستخدم', 'تطوير الويب', 'معرض أعمال'],
    projectUrl: 'https://almethaliadv.com',
    resultsAvailable: false,
    brandColor: '#1a56a4',
    backgroundStyle: 'gradient',
  },`;

if (content.includes(targetArrayStart)) {
  content = content.replace(targetArrayStart, newProjects);
  fs.writeFileSync(path, content);
  console.log("Successfully added new projects.");
} else {
  console.error("Could not find the target array in projects.");
}
