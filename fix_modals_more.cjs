const fs = require('fs');

let toolModal = fs.readFileSync('src/components/ToolAnalyzerModal.tsx', 'utf8');
toolModal = toolModal.replace(/text-\[#cbd5e1\]/g, 'text-[var(--text-secondary)]');
toolModal = toolModal.replace(/from-\[#111827\]/g, 'from-[var(--surface-secondary)]');
toolModal = toolModal.replace(/bg-\[#4f46e5\]/g, 'bg-[var(--color-primary)]');
toolModal = toolModal.replace(/hover:bg-\[#4338ca\]/g, 'hover:brightness-110');
toolModal = toolModal.replace(/text-\[#38bdf8\]/g, 'text-[var(--color-primary)]');
toolModal = toolModal.replace(/bg-\[#38bdf8\]/g, 'bg-[var(--color-primary)]');
toolModal = toolModal.replace(/shadow-\[0_0_8px_#38bdf8\]/g, 'shadow-[0_0_8px_var(--color-primary)]');
toolModal = toolModal.replace(/text-\[#34d399\]/g, 'text-[var(--color-accent)]');
toolModal = toolModal.replace(/bg-\[#34d399\]/g, 'bg-[var(--color-accent)]');
toolModal = toolModal.replace(/shadow-\[0_0_8px_#34d399\]/g, 'shadow-[0_0_8px_var(--color-accent)]');
fs.writeFileSync('src/components/ToolAnalyzerModal.tsx', toolModal);
