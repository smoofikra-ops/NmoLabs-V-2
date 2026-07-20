import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSite } from '../context/SiteContext';
import { ArrowLeft, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, MessageSquare, Rocket, Save, Send } from 'lucide-react';
import { projectTypes, budgetsAr, budgetsEn, timelinesAr, timelinesEn, ProjectType } from '../data/projectIntake';

export const StartProjectPage = () => {
  const { config, updateConfig } = useSite();
  const isEn = config.language === 'en';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '' as ProjectType | '',
    title: '',
    description: '',
    budget: '',
    timeline: '',
    name: '',
    company: '',
    phone: '',
    email: '',
    notes: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nmolabs_project_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.type) {
          setFormData(parsed);
        }
      } catch (e) {}
    }
  }, []);

  // Save to localStorage when formData changes
  useEffect(() => {
    localStorage.setItem('nmolabs_project_draft', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (step < 4) setStep(s => s + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(s => s - 1);
  };

  const handleSendWhatsApp = () => {
    const text = isEn ? `Hello NmoLabs!
I would like to start a new project.

Project Type: ${projectTypes.find(t => t.id === formData.type)?.labelEn || formData.type}
Budget: ${formData.budget}
Timeline: ${formData.timeline}

Name: ${formData.name}
Company: ${formData.company}
Email: ${formData.email}

Details:
${formData.description}`
    : `مرحباً نمو لابز!
أريد بدء مشروع جديد.

نوع المشروع: ${projectTypes.find(t => t.id === formData.type)?.labelAr || formData.type}
الميزانية: ${formData.budget}
الإطار الزمني: ${formData.timeline}

الاسم: ${formData.name}
الشركة/المشروع: ${formData.company}
البريد الإلكتروني: ${formData.email}

التفاصيل:
${formData.description}`;

    const num = config.contactNumber?.replace(/[^0-9]/g, '') || '966500000000';
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank');
    
    // Clear draft after successful submission
    localStorage.removeItem('nmolabs_project_draft');
    updateConfig({ currentRoute: 'home' });
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const steps = [
    { num: 1, title: isEn ? 'Goal' : 'الهدف', desc: isEn ? 'Project Type' : 'نوع المشروع' },
    { num: 2, title: isEn ? 'Details' : 'التفاصيل', desc: isEn ? 'Description & Scope' : 'الوصف والنطاق' },
    { num: 3, title: isEn ? 'Logistics' : 'الميزانية', desc: isEn ? 'Budget & Time' : 'الميزانية والوقت' },
    { num: 4, title: isEn ? 'Contact' : 'التواصل', desc: isEn ? 'Your Info' : 'معلوماتك' }
  ];

  const canProceed = () => {
    if (step === 1) return formData.type !== '';
    if (step === 2) return formData.description.trim().length > 10;
    if (step === 3) return formData.budget !== '' && formData.timeline !== '';
    if (step === 4) return formData.name.trim() !== '' && formData.phone.trim() !== '';
    return true;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 sm:pt-32 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <motion.button 
            initial={{ opacity: 0, x: isEn ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              updateConfig({ currentRoute: 'home' });
              window.scrollTo(0,0);
            }}
            className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6"
          >
            {isEn ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            {isEn ? 'Back to Home' : 'العودة للرئيسية'}
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight"
          >
            {isEn ? 'Start Your Project' : 'ابدأ مشروعك'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--text-muted)] font-light"
          >
            {isEn ? "Let's build something exceptional together. Fill out the details below so we can prepare the best approach." : "دعنا نبني شيئاً استثنائياً معاً. شاركنا التفاصيل لنتمكن من إعداد أفضل تصور لمشروعك."}
          </motion.p>
        </div>

        {/* Stepper */}
        <div className="mb-8 relative">
          <div className="absolute top-4 left-0 w-full h-0.5 bg-[var(--surface-secondary)] -z-10" />
          <div className="absolute top-4 left-0 h-0.5 bg-[var(--color-primary)] transition-all duration-500 -z-10" style={{ width: `${((step - 1) / 3) * 100}%` }} />
          
          <div className="flex justify-between">
            {steps.map((s, idx) => (
              <div key={s.num} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step >= s.num ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'bg-[var(--surface-primary)] border-[var(--interactive-border)] text-[var(--text-muted)]'}`}>
                  {step > s.num ? <CheckCircle size={16} /> : s.num}
                </div>
                <div className="text-xs font-bold text-[var(--text-primary)] mt-2 hidden sm:block">{s.title}</div>
                <div className="text-[10px] text-[var(--text-muted)] hidden sm:block">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-[var(--surface-primary)] border border-[var(--interactive-border)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'What are you looking to build?' : 'ما هو نوع المشروع الذي ترغب في بنائه؟'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, type: type.id as ProjectType })}
                      className={`text-right rtl:text-right ltr:text-left p-4 rounded-2xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${formData.type === type.id ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)] shadow-[var(--interactive-glow)]' : 'bg-[var(--surface-secondary)]/50 border-[var(--interactive-border)] hover:border-[var(--interactive-border-hover)] hover:bg-[var(--surface-secondary)]'}`}
                    >
                      <div className={`font-bold mb-1 ${formData.type === type.id ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)]'}`}>
                        {isEn ? type.labelEn : type.labelAr}
                      </div>
                      <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {isEn ? type.descEn : type.descAr}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Tell us more about it' : 'أخبرنا المزيد عن تفاصيل المشروع'}</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Project Description / Scope' : 'وصف المشروع ونطاق العمل'}
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder={isEn ? 'What are the main features? Who is the target audience?' : 'ما هي الميزات الأساسية؟ من هو الجمهور المستهدف؟'}
                      className="w-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all min-h-[150px] resize-y"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Additional Notes / Links' : 'ملاحظات إضافية / روابط مرجعية'}
                    </label>
                    <input
                      type="text"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder={isEn ? 'e.g. Reference websites, competitors...' : 'مثال: روابط لمواقع منافسة أو مرجعية...'}
                      className="w-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Budget & Timeline' : 'الميزانية والإطار الزمني'}</h2>
                
                <div>
                  <label className="block text-sm font-bold text-[var(--text-primary)] mb-4">
                    {isEn ? 'Estimated Budget' : 'الميزانية التقديرية'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {(isEn ? budgetsEn : budgetsAr).map((b, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${formData.budget === b ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'bg-[var(--surface-secondary)]/50 border-[var(--interactive-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--interactive-border-hover)]'}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-primary)] mb-4">
                    {isEn ? 'Expected Timeline' : 'الإطار الزمني المتوقع'}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {(isEn ? timelinesEn : timelinesAr).map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormData({ ...formData, timeline: t })}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${formData.timeline === t ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'bg-[var(--surface-secondary)]/50 border-[var(--interactive-border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--interactive-border-hover)]'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6">{isEn ? 'Contact Information' : 'معلومات التواصل'}</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Full Name *' : 'الاسم الكامل *'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Company / Project Name' : 'اسم الشركة / المشروع'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Phone Number (WhatsApp) *' : 'رقم الجوال (واتساب) *'}
                    </label>
                    <input
                      type="tel"
                      dir="ltr"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">
                      {isEn ? 'Email Address' : 'البريد الإلكتروني'}
                    </label>
                    <input
                      type="email"
                      dir="ltr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[var(--surface-secondary)] border border-[var(--interactive-border)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all text-right"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-[var(--interactive-border)] flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-[var(--text-primary)] bg-[var(--surface-secondary)] hover:bg-[var(--surface-secondary)]/80 border border-[var(--interactive-border)]'}`}
            >
              {isEn ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              {isEn ? 'Back' : 'السابق'}
            </button>

            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${!canProceed() ? 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--interactive-border)]' : 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(79,142,247,0.3)] hover:scale-105'}`}
              >
                {isEn ? 'Next' : 'التالي'}
                {isEn ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            ) : (
              <button
                onClick={handleSendWhatsApp}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${!canProceed() ? 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--interactive-border)]' : 'bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105'}`}
              >
                <MessageSquare size={18} />
                {isEn ? 'Send via WhatsApp' : 'إرسال عبر واتساب'}
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-center items-center gap-2 text-xs text-[var(--text-muted)]">
          <Save size={14} />
          {isEn ? 'Your progress is automatically saved to your device' : 'يتم حفظ تقدمك تلقائياً في متصفحك'}
        </div>
      </div>
    </div>
  );
};
