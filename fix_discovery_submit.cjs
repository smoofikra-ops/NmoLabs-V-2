const fs = require('fs');
let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

const submitLogic = `
  const handleComplete = () => {
    const text = isEn ? \`Hello NomoLabs!\\nI have completed the Discovery Portal.\\n\\nName: \${formData.name}\\nCompany: \${formData.company}\\nPhone: \${formData.phone}\\nEmail: \${formData.email}\\nProject Type: \${projectTypes.find(t => t.value === formData.type)?.labelEn || formData.type}\\nBudget: \${formData.budget}\\nTimeline: \${formData.timeline}\\n\\nDetails:\\n\${formData.description}\` : \`مرحباً نمو لابز!\\nلقد أكملت بوابة الاستكشاف.\\n\\nالاسم: \${formData.name}\\nالشركة: \${formData.company}\\nرقم الجوال: \${formData.phone}\\nالبريد الإلكتروني: \${formData.email}\\nنوع المشروع: \${projectTypes.find(t => t.value === formData.type)?.labelAr || formData.type}\\nالميزانية: \${formData.budget}\\nالإطار الزمني: \${formData.timeline}\\n\\nالتفاصيل:\\n\${formData.description}\`;

    const encoded = encodeURIComponent(text);
    const waPhone = '966500000000'; // Replace with actual company WA number if needed, using generic or what was there
    window.open(\`https://wa.me/\${waPhone}?text=\${encoded}\`, '_blank');
  };
`;

code = code.replace(
  /const handleKeyDown = \(e: React.KeyboardEvent\) => \{/,
  submitLogic + "\n  const handleKeyDown = (e: React.KeyboardEvent) => {"
);

code = code.replace(
  /onClick=\{\(\) => console\.log\('Submit to NBOS \/ DB', formData\)\}/,
  "onClick={handleComplete}"
);

fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
