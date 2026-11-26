import type { Request, Response } from 'express';

// Public-only PageSpeed audit. Never fetch a URL entered by the visitor from this server.
// Google measures the public page; private data, analytics and competitor traffic are NOT inferred.
const cache = new Map<string,{expires:number,data:unknown}>();
const MAX_CACHE = 100;
const scores=['performance','accessibility','best-practices','seo'] as const;
const labels:Record<string,{title:string,message:string}>={
 'largest-contentful-paint':{title:'العنصر الرئيسي يتأخر بالظهور',message:'العميل قد ينتظر قبل ما يشوف المحتوى الأساسي.'},
 'render-blocking-resources':{title:'ملفات تؤخر ظهور الصفحة',message:'بعض الملفات تمنع الصفحة من الظهور بسرعة.'},
 'uses-optimized-images':{title:'الصور تحتاج تحسين',message:'حجم الصور قد يزيد وقت التحميل.'},
 'modern-image-formats':{title:'صيغة الصور تحتاج مراجعة',message:'قد تساعد صيغ الصور الحديثة في تسريع التصفح.'},
 'uses-responsive-images':{title:'الصور غير مناسبة لكل الشاشات',message:'قد يتم تحميل صور أكبر من حاجة شاشة الجوال.'},
 'image-alt':{title:'بعض الصور تفتقد وصفًا',message:'هذا يؤثر على وضوحها لقارئات الشاشة وفهم محركات البحث.'},
 'document-title':{title:'عنوان الصفحة يحتاج مراجعة',message:'عنوان الصفحة يساعد الزائر ومحركات البحث يفهمون محتواها.'},
 'meta-description':{title:'وصف صفحة البحث غير مكتمل',message:'قد لا يظهر وصف واضح للصفحة في نتائج البحث.'},
 'link-text':{title:'بعض الروابط غير واضحة',message:'العميل قد ما يفهم إلى وين ينقله الرابط.'},
 'color-contrast':{title:'بعض النصوص صعب قراءتها',message:'تباين الخط مع الخلفية قد يصعّب القراءة.'},
 'tap-targets':{title:'بعض الأزرار صعبة الاستخدام بالجوال',message:'قد يضغط العميل على زر بالغلط بسبب تقارب العناصر.'},
 'viewport':{title:'عرض الجوال يحتاج مراجعة',message:'تجربة العرض على الشاشات الصغيرة قد تتأثر.'},
 'robots-txt':{title:'ملف توجيه محركات البحث يحتاج مراجعة',message:'قد تكون فيه تعليمات تؤثر على وصول محركات البحث.'},
 'is-crawlable':{title:'الصفحة قد تمنع الفهرسة',message:'قد ما يتمكن محرك البحث من إدراج الصفحة بالطريقة المتوقعة.'}
};
function validate(raw:unknown){
 if(typeof raw!=='string'||raw.length>500)return null;
 try{
  const value=/^https?:\/\//i.test(raw)?raw:'https://'+raw;
  const url=new URL(value);
  const host=url.hostname.toLowerCase();
  if(url.protocol!=='https:'&&url.protocol!=='http:')return null;
  if(url.username||url.password||url.port||host==='localhost'||host.endsWith('.localhost')||host.endsWith('.local')||host.endsWith('.internal')||host.endsWith('.test')||host.endsWith('.invalid'))return null;
  if(!/^[a-z0-9.-]+$/.test(host)||!host.includes('.')||host.startsWith('.')||host.includes('..'))return null;
  if(/^\d+\.\d+\.\d+\.\d+$/.test(host)||host.startsWith('127.')||host.startsWith('10.')||host.startsWith('192.168.')||host.startsWith('169.254.')||host.startsWith('172.')||host==='0.0.0.0')return null;
  url.hash='';
  return url.toString();
 }catch{return null;}
}
export default async function handler(req:Request,res:Response){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST')return res.status(405).json({success:false,message:'Method not allowed'});
 const input=validate(req.body?.url);
 if(!input)return res.status(400).json({success:false,message:'أدخل رابط موقع عام وصحيح يبدأ بـ https://'});
 const strategy=req.body?.strategy==='desktop'?'desktop':'mobile';
 const key=strategy+'|'+input;
 const cached=cache.get(key);
 if(cached&&cached.expires>Date.now())return res.json(cached.data);
 const controller=new AbortController();
 const timeout=setTimeout(()=>controller.abort(),46000);
 try{
  const endpoint=new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  endpoint.searchParams.set('url',input);
  endpoint.searchParams.set('strategy',strategy);
  for(const cat of scores)endpoint.searchParams.append('category',cat);
  if(process.env.PAGESPEED_API_KEY)endpoint.searchParams.set('key',process.env.PAGESPEED_API_KEY);
  const response=await fetch(endpoint,{signal:controller.signal});
  if(!response.ok)throw Error('PageSpeed HTTP '+response.status);
  const json:any=await response.json();
  const lh=json.lighthouseResult;
  if(!lh?.categories)throw Error('PageSpeed incomplete');
  const categories:Record<string,number|null>={};
  for(const name of scores){const score=lh.categories[name]?.score;categories[name]=typeof score==='number'?Math.round(score*100):null;}
  const issues=Object.entries(lh.audits||{}).filter(([id,a]:[string,any])=>labels[id]&&typeof a.score==='number'&&a.score<0.9&&a.scoreDisplayMode!=='manual').slice(0,15).map(([id,a]:[string,any])=>({id,title:labels[id].title,summary:labels[id].message,score:a.score,url:input}));
  const crux=json.loadingExperience?.metrics||{};
  const data={success:true,url:input,checkedAt:new Date().toISOString(),strategy,source:'Google PageSpeed Insights / Lighthouse',categories,issues,fieldDataAvailable:Object.keys(crux).length>0, fieldMetricCount:Object.keys(crux).length};
  if(cache.size>=MAX_CACHE)cache.delete(cache.keys().next().value!);
  cache.set(key,{expires:Date.now()+1000*60*30,data});
  return res.json(data);
 }catch(error:any){
  return res.status(502).json({success:false,message:error?.name==='AbortError'?'الفحص استغرق وقت أطول من المتوقع. حاول مرة ثانية.':'ما قدرنا نكمل الفحص من Google حاليًا. حاول بعد قليل.',retryable:true});
 }finally{clearTimeout(timeout);}
}
