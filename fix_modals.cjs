const fs = require('fs');

// Fix ToolAnalyzerModal
let toolModal = fs.readFileSync('src/components/ToolAnalyzerModal.tsx', 'utf8');
toolModal = toolModal.replace(/bg-\[var\(--surface-primary\)\/80\]/g, 'bg-black/80');
toolModal = toolModal.replace(/bg-\[#0b121c\]/g, 'bg-[var(--surface-primary)]');
toolModal = toolModal.replace(/bg-\[#151f2e\]/g, 'bg-[var(--surface-secondary)]');
toolModal = toolModal.replace(/bg-\[#111827\]/g, 'bg-[var(--surface-secondary)]');
toolModal = toolModal.replace(/text-\[#e2e8f0\]/g, 'text-[var(--text-primary)]');
toolModal = toolModal.replace(/text-\[#94a3b8\]/g, 'text-[var(--text-muted)]');
toolModal = toolModal.replace(/text-gray-200/g, 'text-[var(--text-secondary)]');
fs.writeFileSync('src/components/ToolAnalyzerModal.tsx', toolModal);

// Fix BookingModal
let bookingModal = fs.readFileSync('src/components/BookingModal.tsx', 'utf8');
bookingModal = bookingModal.replace(/bg-\[var\(--surface-primary\)\/80\]/g, 'bg-black/80');
bookingModal = bookingModal.replace(/bg-\[#07070F\]/g, 'bg-[var(--surface-primary)]');
fs.writeFileSync('src/components/BookingModal.tsx', bookingModal);

// Fix AnalysisModal
let analysisModal = fs.readFileSync('src/components/AnalysisModal.tsx', 'utf8');
analysisModal = analysisModal.replace(/bg-\[var\(--surface-primary\)\/80\]/g, 'bg-black/80');
analysisModal = analysisModal.replace(/bg-\[color:var\(--bg-color\)\]/g, 'bg-[var(--surface-primary)]');
fs.writeFileSync('src/components/AnalysisModal.tsx', analysisModal);

console.log("Done");
