const fs = require('fs');
const path = 'src/lib/utils.ts';
const content = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format any Saudi or international phone number into standard WhatsApp wa.me phone string (e.g. 966500804990)
 */
export function formatWhatsAppPhone(phone?: string): string {
  if (!phone) return '966500804990';
  let clean = phone.replace(/[^0-9]/g, '');
  // If clean number contains old number 545698905, migrate it
  if (clean.includes('545698905')) {
    return '966500804990';
  }
  if (clean.startsWith('00966')) {
    clean = clean.substring(2);
  } else if (clean.startsWith('05')) {
    clean = '966' + clean.substring(1);
  } else if (clean.startsWith('5') && clean.length === 9) {
    clean = '966' + clean;
  }
  return clean || '966500804990';
}

/**
 * Build a valid WhatsApp wa.me URL
 */
export function getWhatsAppUrl(phone?: string, message?: string): string {
  const formattedPhone = formatWhatsAppPhone(phone);
  const textParam = message ? \`?text=\${encodeURIComponent(message)}\` : '';
  return \`https://wa.me/\${formattedPhone}\${textParam}\`;
}
`;

fs.writeFileSync(path, content);
console.log('Updated src/lib/utils.ts successfully');
