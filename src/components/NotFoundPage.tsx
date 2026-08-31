import React from 'react';
import { motion } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { ArrowLeft, ArrowRight, Home, Compass, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/utils';

export const NotFoundPage: React.FC = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const navigateTo = (route: string) => {
    updateConfig({ currentRoute: route });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center p-8 sm:p-12 rounded-3xl bg-[var(--surface-primary)] border border-[var(--border-default)] shadow-xl relative overflow-hidden"
      >
        {/* Subtle decorative background accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[var(--color-secondary)]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-block text-7xl sm:text-9xl font-black text-[var(--color-primary)] mb-2 font-mono tracking-tighter drop-shadow-sm">
            404
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] mb-4">
            {isEn ? 'Page Not Found' : 'الصفحة غير موجودة'}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg mx-auto mb-10 leading-relaxed font-medium">
            {isEn 
              ? 'The page or resource you are looking for might have been moved, renamed, or is temporarily unavailable.' 
              : 'الصفحة أو الرابط الذي تبحث عنه قد تم نقله أو تغييره، أو أنه غير متوفر حالياً.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-white font-bold flex items-center justify-center gap-2 hover:opacity-95 shadow-md transition-all cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>{isEn ? 'Back to Home' : 'العودة للرئيسية'}</span>
              {isEn ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            </button>

            <button
              onClick={() => navigateTo('work')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] font-bold flex items-center justify-center gap-2 hover:bg-[var(--surface-tertiary)] transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>{isEn ? 'Explore Our Work' : 'استكشف أعمالنا'}</span>
            </button>

            {config.contactNumber && (
              <a
                href={getWhatsAppUrl(config.contactNumber, 'مرحباً، واجهت صفحة غير موجودة في الموقع')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isEn ? 'Contact Support' : 'تواصل معنا'}</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
