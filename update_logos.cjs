const fs = require('fs');
let code = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');

code = code.replace(
  "{ id: '1', name: 'الفكرة النادرة - دعاية واعلان', color: '#e63450', imageUrl: '/partners/1.png', linkUrl: 'https://ric.com.sa/' }",
  "{ id: '1', name: 'الفكرة النادرة - دعاية واعلان', color: '#e63450', imageUrl: 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245696/%D8%A7%D9%84%D9%81%D9%83%D8%B1%D8%A9_%D8%A7%D9%84%D9%86%D8%A7%D8%AF%D8%B1%D8%A9_fi5pw6.jpg', linkUrl: 'https://ric.com.sa/' }"
);

code = code.replace(
  "{ id: '3', name: 'نخلتين واي فاي - انتينا وراتر', color: '#0e2f67', imageUrl: '/partners/3.png', linkUrl: 'https://nakhltain.com/' }",
  "{ id: '3', name: 'نخلتين واي فاي - انتينا وراتر', color: '#0e2f67', imageUrl: 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245697/%D9%86%D8%AE%D9%84%D8%AA%D9%8A%D9%86_%D9%88%D8%A7%D9%8A_%D9%81%D8%A7%D9%8A_2_lz530o.jpg', linkUrl: 'https://nakhltain.com/' }"
);

code = code.replace(
  "{ id: '4', name: 'ثلث اليوم للمفروشات', color: '#235418', imageUrl: '/partners/4.png', linkUrl: 'https://thulth-sa.com/' }",
  "{ id: '4', name: 'ثلث اليوم للمفروشات', color: '#235418', imageUrl: 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245696/%D8%AB%D9%84%D8%AB_%D8%A7%D9%84%D9%8A%D9%88%D9%85_fkd0yu.jpg', linkUrl: 'https://thulth-sa.com/' }"
);

code = code.replace(
  "{ id: 'partner_1778961537430', name: 'مناديل ريجين', color: '#22b6ed', imageUrl: '/partners/regine.png', linkUrl: 'https://regine-sa.com' }",
  "{ id: 'partner_1778961537430', name: 'مناديل ريجين', color: '#22b6ed', imageUrl: 'https://res.cloudinary.com/x6mkqvcj/image/upload/v1785245697/%D9%85%D9%86%D8%A7%D8%AF%D9%8A%D9%84_%D8%B1%D9%8A%D8%AC%D9%8A%D9%86_nj67xq.jpg', linkUrl: 'https://regine-sa.com' }"
);

fs.writeFileSync('src/context/SiteContext.tsx', code);
