const fs = require('fs');
let analysisModal = fs.readFileSync('src/components/AnalysisModal.tsx', 'utf8');
analysisModal = analysisModal.replace(/bg-\[#061814\]\/90 border-green-500\/40 text-green-300/g, 'bg-green-500/10 border-green-500/40 text-green-600 dark:text-green-300');
analysisModal = analysisModal.replace(/bg-\[#1c0808\]\/90 border-red-500\/40 text-red-300/g, 'bg-red-500/10 border-red-500/40 text-red-600 dark:text-red-300');
analysisModal = analysisModal.replace(/bg-\[#1c1208\]\/90 border-orange-500\/40 text-orange-300/g, 'bg-orange-500/10 border-orange-500/40 text-orange-600 dark:text-orange-300');
fs.writeFileSync('src/components/AnalysisModal.tsx', analysisModal);
