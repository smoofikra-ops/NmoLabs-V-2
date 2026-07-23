const fs = require('fs');
let code = fs.readFileSync('src/components/Testimonials.tsx', 'utf8');

code = code.replace(/className="py-32 relative overflow-hidden bg-\[color:var\(--glass-bg\)\] bg-dots-pattern"/g, 'className="py-16 relative overflow-hidden bg-[color:var(--glass-bg)] bg-dots-pattern"');
code = code.replace(/className="max-w-7xl mx-auto px-6 mt-32 relative z-10"/g, 'className="max-w-7xl mx-auto px-6 mt-16 relative z-10"');

fs.writeFileSync('src/components/Testimonials.tsx', code);
