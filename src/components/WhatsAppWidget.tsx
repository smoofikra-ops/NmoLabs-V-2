import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { config } = useSite();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.contactNumber) return;
    
    const phoneNumber = config.contactNumber.replace(/[^0-9]/g, '');
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  if (!config.contactNumber) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl shadow-2xl overflow-hidden mb-4"
          >
            <div className="bg-[#25D366] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">تواصل معنا عبر واتساب</h4>
                  <p className="text-xs text-white/80">نحن متاحون للرد على استفساراتك</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 bg-[var(--surface-primary)]">
              <form onSubmit={handleSend} className="space-y-3">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="مرحباً، أود الاستفسار عن..."
                  className="w-full h-24 bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-xl p-3 text-sm focus:outline-none focus:border-[#25D366] resize-none text-[var(--text-primary)]"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-[#25D366] text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors"
                >
                  <span>إرسال الرسالة</span>
                  <Send size={16} className="rotate-180" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 relative"
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse" />
      </button>
    </div>
  );
};
