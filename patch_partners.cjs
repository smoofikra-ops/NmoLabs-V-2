const fs = require('fs');
let code = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');

const oldPartners = `  partners: [
    { id: '1', name: 'الفكرة النادرة - دعاية واعلان', color: '#e63450', imageUrl: 'https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/BrzyDD/5GmtTmSorZpwTyuxAPydLrhQ20Zl5HMfO5392Rek.png', linkUrl: 'https://ric.com.sa/' },
    { id: '2', name: 'بوابة الشبكات - انتينا ورواتر 5G', color: '#f29b6d', imageUrl: '', linkUrl: 'https://netgate-sa.com/' },
    { id: '3', name: 'نخلتين واي فاي - انتينا وراتر', color: '#0e2f67', imageUrl: 'https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/wBalV/H2Do5qXWaQdqr9xBlSCxSz4CTZvn14mVFKvIhQHD.png', linkUrl: 'https://nakhltain.com/' },
    { id: '4', name: 'ثلث اليوم للمفروشات', color: '#235418', imageUrl: 'https://cdn.salla.sa/cdn-cgi/image/fit=scale-down,width=400,height=400,onerror=redirect,format=auto/mQdDnZ/PyXrrxl7c8MJjl9A6wokcULOPOTmMNUqsaxfKR1v.png', linkUrl: 'https://thulth-sa.com/' },
    { id: 'partner_1778961537430', name: 'مناديل ريجين', color: '#22b6ed', imageUrl: 'https://media.zid.store/13b20f5f-3857-45e3-9134-458d965caf58/a8827d63-f750-41ea-b5b2-1be59091326a.png', linkUrl: 'https://regine-sa.com' },
    { id: 'partner_1779035910510', name: 'الأجهزة المبتكرة', color: '#de9336', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779035948609', name: 'صفقات كوم - كوزماتيكس', color: '#f5abc5', imageUrl: '', linkUrl: 'https://safaqatcom.com/' },
    { id: 'partner_1779064216129', name: 'Rayflow Studio - ورشات عمل', color: '#414798', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779064264993', name: 'مناديل حصة', color: '#fdb700', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779064308309', name: 'بولي مارت - مصنع بلاستيك', color: '', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779064336725', name: 'شركة مقاولات', color: '', imageUrl: '', linkUrl: '' }
  ],`;

const newPartners = `  partners: [
    { id: '1', name: 'الفكرة النادرة - دعاية واعلان', color: '#e63450', imageUrl: '/partners/1.png', linkUrl: 'https://ric.com.sa/' },
    { id: '2', name: 'بوابة الشبكات - انتينا ورواتر 5G', color: '#f29b6d', imageUrl: '', linkUrl: 'https://netgate-sa.com/' },
    { id: '3', name: 'نخلتين واي فاي - انتينا وراتر', color: '#0e2f67', imageUrl: '/partners/3.png', linkUrl: 'https://nakhltain.com/' },
    { id: '4', name: 'ثلث اليوم للمفروشات', color: '#235418', imageUrl: '/partners/4.png', linkUrl: 'https://thulth-sa.com/' },
    { id: 'partner_1778961537430', name: 'مناديل ريجين', color: '#22b6ed', imageUrl: '/partners/regine.png', linkUrl: 'https://regine-sa.com' },
    { id: 'partner_1779035910510', name: 'الأجهزة المبتكرة', color: '#de9336', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779035948609', name: 'صفقات كوم - كوزماتيكس', color: '#f5abc5', imageUrl: '', linkUrl: 'https://safaqatcom.com/' },
    { id: 'partner_1779064216129', name: 'Rayflow Studio - ورشات عمل', color: '#414798', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779064264993', name: 'مناديل حصة', color: '#fdb700', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779064308309', name: 'بولي مارت - مصنع بلاستيك', color: '', imageUrl: '', linkUrl: '' },
    { id: 'partner_1779064336725', name: 'شركة مقاولات', color: '', imageUrl: '', linkUrl: '' }
  ],`;

code = code.replace(oldPartners, newPartners);
fs.writeFileSync('src/context/SiteContext.tsx', code);
