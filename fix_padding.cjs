const fs = require('fs');

const files = [
  'src/components/AboutPage.tsx',
  'src/components/ProductsPreview.tsx',
  'src/components/WorkPreview.tsx',
  'src/components/FounderPage.tsx',
  'src/components/Workflow.tsx',
  'src/components/Testimonials.tsx',
  'src/components/Solutions.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let code = fs.readFileSync(file, 'utf8');
    
    // Replace very large vertical paddings on mobile with smaller ones
    code = code.replace(/py-16 sm:py-20 md:py-32/g, 'py-10 sm:py-16 md:py-32');
    code = code.replace(/py-16 sm:py-24 lg:py-32/g, 'py-10 sm:py-16 lg:py-32');
    code = code.replace(/py-20 sm:py-24 md:py-32/g, 'py-10 sm:py-16 md:py-32');
    code = code.replace(/py-12 lg:py-24/g, 'py-8 lg:py-24');
    code = code.replace(/py-20/g, 'py-10 md:py-20');
    code = code.replace(/mb-12 sm:mb-16 lg:mb-20/g, 'mb-8 sm:mb-12 lg:mb-20');
    code = code.replace(/mb-16 lg:mb-24/g, 'mb-8 lg:mb-24');
    code = code.replace(/gap-8 lg:gap-16/g, 'gap-6 lg:gap-16');
    code = code.replace(/gap-12 md:gap-16 lg:gap-24/g, 'gap-8 md:gap-16 lg:gap-24');
    code = code.replace(/gap-12 lg:gap-20/g, 'gap-6 lg:gap-20');
    
    fs.writeFileSync(file, code);
  }
});
