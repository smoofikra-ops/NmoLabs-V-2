const fs = require('fs');
let code = fs.readFileSync('src/components/AboutPage.tsx', 'utf8');

// 1. Workflow Mobile update
const workflowMobileStart = `{/* Mobile view: Simple Vertical List */}`;
const workflowMobileRegex = /\{\/\* Mobile view: Simple Vertical List \*\/\}.*?(?=<\/section>)/s;
const newWorkflowMobile = `
          {/* Mobile view: Horizontal scroll stepper */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x custom-scrollbar">
              {companyData.workProcess.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className={\`shrink-0 snap-center px-5 py-4 rounded-2xl border transition-all duration-300 min-w-[140px] text-center \${isActive ? 'bg-[var(--surface-primary)] border-[var(--color-primary)] shadow-md' : 'bg-[var(--surface-secondary)]/60 border-[var(--border-default)]'}\`}
                  >
                    <span className={\`text-xs font-bold font-english block mb-2 \${isActive ? 'text-[var(--color-primary)]' : 'text-[var(--text-muted)]'}\`}>
                      {step.step}
                    </span>
                    <h4 className={\`font-black text-sm \${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}\`}>
                      {isEn ? step.titleEn : step.titleAr}
                    </h4>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-4 bg-[var(--surface-secondary)] border border-[var(--color-primary)]/20 p-6 rounded-3xl text-center shadow-inner relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="font-black text-lg text-[var(--color-primary)]">
                    {isEn ? companyData.workProcess[activeStep].titleEn : companyData.workProcess[activeStep].titleAr}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {isEn ? companyData.workProcess[activeStep].descEn : companyData.workProcess[activeStep].descAr}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
`;

code = code.replace(workflowMobileRegex, newWorkflowMobile);


// 2. Values layout (SECTION 6)
// The user says: "Values: Avoid one-card-per-row. Use 2-column layout. Mixed emphasis."
// Let's replace the grid for values.
// Currently it's `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`
// We'll change it to `<div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">`
// and for the first item we can make it `col-span-2` on mobile.

const valuesGridRegex = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">/;
code = code.replace(valuesGridRegex, '<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">');
code = code.replace(/className="bg-\[var\(--surface-secondary\)\] border border-\[var\(--border-default\)\] p-8 rounded-3xl group hover:border-\[var\(--color-primary\)\] transition-colors"/g, 'className={`bg-[var(--surface-secondary)] border border-[var(--border-default)] p-5 md:p-8 rounded-3xl group hover:border-[var(--color-primary)] transition-colors ${idx === 0 ? \'col-span-2 lg:col-span-1\' : \'col-span-1\'}`}');


// 3. Vision & Mission (SECTION 5)
// "Vision & Mission: Two cards per row. Balanced heights."
// Currently: `<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative items-stretch">`
// We will change grid-cols-1 to grid-cols-2 so it sits side by side on mobile!
const visionRegex = /<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative items-stretch">/;
code = code.replace(visionRegex, '<div className="grid grid-cols-2 gap-4 lg:gap-12 relative items-stretch">');
// Change p-8 md:p-12 to p-4 md:p-12
code = code.replace(/p-8 md:p-12/g, 'p-5 lg:p-12');


fs.writeFileSync('src/components/AboutPage.tsx', code);
