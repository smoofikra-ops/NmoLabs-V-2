const fs = require('fs');
const path = 'src/components/Testimonials.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetTooltipEnd = `        {partner.types && partner.types.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-center">
            {partner.types.map((type: string) => (
              <span key={type} className="text-[10px] bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-0.5 rounded-full whitespace-nowrap">
                {type}
              </span>
            ))}
          </div>
        )}
      </div>`;

const newTooltipEnd = `        {partner.types && partner.types.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-center">
            {partner.types.map((type: string) => (
              <span key={type} className="text-[10px] bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-2 py-0.5 rounded-full whitespace-nowrap">
                {type}
              </span>
            ))}
          </div>
        )}
        {partner.description && (
          <div className="text-[11px] bg-[var(--surface-secondary)]/90 text-[var(--text-secondary)] px-3 py-1.5 rounded-lg text-center leading-relaxed mt-1 max-w-full whitespace-normal">
            {partner.description}
          </div>
        )}
      </div>`;

if (content.includes(targetTooltipEnd)) {
  content = content.replace(targetTooltipEnd, newTooltipEnd);
  fs.writeFileSync(path, content);
  console.log("Successfully updated Testimonials tooltip.");
} else {
  console.error("Could not find the target tooltip in Testimonials.");
}
