const fs = require('fs');

const code = `import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Sparkles, Building2, User, Phone, Mail, FileText, Target, Calendar, ArrowRight, ArrowLeft, RefreshCw, Save } from 'lucide-react';
import { projectTypes, budgetsAr, timelinesAr, budgetsEn, timelinesEn } from '../data/projectIntake';
import { useSite } from '../context/SiteContext';
import { dynamicStepsConfig } from '../data/dynamicSteps';

export const DiscoveryPortal = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('nomoDiscoveryProgress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: '',
      company: '',
      phone: '',
      email: '',
      type: '',
      description: '',
      budget: '',
      timeline: '',
      dynamicAnswers: {}
    };
  });

  const [stepIndex, setStepIndex] = useState(() => {
    const savedStep = localStorage.getItem('nomoDiscoveryStep');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('nomoDiscoveryProgress', JSON.stringify(formData));
    localStorage.setItem('nomoDiscoveryStep', stepIndex.toString());
  }, [formData, stepIndex]);

  const dynamicFields = useMemo(() => {
    return dynamicStepsConfig[formData.type] || [];
  }, [formData.type]);

  const stepsList = useMemo(() => {
    const baseInitial = ['intro', 'name', 'company', 'phone', 'email', 'type'];
    const baseFinal = ['description', 'budget', 'timeline', 'review'];
    const dyn = dynamicFields.map(f => \`dynamic_\${f.id}\`);
    return [...baseInitial, ...dyn, ...baseFinal];
  }, [dynamicFields]);

  const totalSteps = stepsList.length - 1;
  const progress = (stepIndex / totalSteps) * 100;
  const currentStep = stepsList[stepIndex];

  const handleNext = () => {
    if (stepIndex < totalSteps) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const jumpToStep = (index) => {
    setStepIndex(index);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'intro': return true;
      case 'name': return formData.name.trim().length > 1;
      case 'company': return formData.company.trim().length > 1;
      case 'phone': return formData.phone.trim().length > 5;
      case 'email': return formData.email.trim().includes('@');
      case 'type': return formData.type !== '';
      case 'description': return formData.description.trim().length > 10;
      case 'budget': return formData.budget !== '';
      case 'timeline': return formData.timeline !== '';
      case 'review': return true;
      default:
        if (currentStep.startsWith('dynamic_')) {
          const fieldId = currentStep.replace('dynamic_', '');
          const answer = formData.dynamicAnswers[fieldId] || '';
          return answer.trim().length > 0;
        }
        return true;
    }
  };

  const completionPercentage = useMemo(() => {
    let filled = 0;
    let total = stepsList.length - 2; // Exclude intro and review
    if (formData.name) filled++;
    if (formData.company) filled++;
    if (formData.phone) filled++;
    if (formData.email) filled++;
    if (formData.type) filled++;
    if (formData.description) filled++;
    if (formData.budget) filled++;
    if (formData.timeline) filled++;
    
    dynamicFields.forEach(f => {
      if (formData.dynamicAnswers[f.id]) filled++;
    });
    
    return Math.round((filled / total) * 100);
  }, [formData, stepsList, dynamicFields]);

  const encouragementsAr = ['','بداية موفقة!','اسم رائع!','ممتاز، اقتربنا أكثر.','رائع!','اختيار ممتاز.'];
  const encouragementsEn = ['','Great start!','Awesome name!','Perfect, getting closer.','Excellent!','Great choice.'];
  const encouragements = isEn ? encouragementsEn : encouragementsAr;
  const encourageText = encouragements[stepIndex % encouragements.length] || (isEn ? 'Keep going!' : 'استمر، أنت تبلي بلاءً حسناً!');

  const renderDynamicField = (fieldId) => {
    const field = dynamicFields.find(f => f.id === fieldId);
    if (!field) return null;
    
    return (
      <motion.div 
        key={fieldId}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
          <Sparkles size={24} />
          <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Project Details' : 'تفاصيل المشروع'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight">
          {isEn ? field.labelEn : field.labelAr}
        </h2>
        <div className="relative mt-8">
          {field.type === 'textarea' ? (
            <textarea 
              autoFocus
              rows={4}
              value={formData.dynamicAnswers[field.id] || ''}
              onChange={(e) => setFormData({...formData, dynamicAnswers: {...formData.dynamicAnswers, [field.id]: e.target.value}})}
              placeholder={isEn ? "Add details here..." : "أضف التفاصيل هنا..."}
              className="w-full text-lg sm:text-xl bg-[var(--surface-secondary)] rounded-2xl border border-[var(--border-default)] focus:border-[var(--color-primary)] p-6 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/50 resize-none shadow-inner custom-scrollbar"
            />
          ) : (
            <input 
              type="text"
              autoFocus
              value={formData.dynamicAnswers[field.id] || ''}
              onChange={(e) => setFormData({...formData, dynamicAnswers: {...formData.dynamicAnswers, [field.id]: e.target.value}})}
              placeholder={isEn ? "Add details here..." : "أضف التفاصيل هنا..."}
              className="w-full text-xl sm:text-3xl bg-transparent border-b-2 border-[var(--border-default)] focus:border-[var(--color-primary)] py-4 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/30 font-bold"
            />
          )}
        </div>
      </motion.div>
    );
  };

  const renderReview = () => (
    <motion.div 
      key="review"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight mb-2">
            {isEn ? "Review your details" : "مراجعة البيانات"}
          </h2>
          <p className="text-[var(--text-muted)]">
            {isEn ? "Please ensure all information is correct before submitting." : "يرجى التأكد من صحة جميع المعلومات قبل الإرسال."}
          </p>
        </div>
        
        {/* Summary Card */}
        <div className="bg-[var(--surface-secondary)] p-4 rounded-2xl border border-[var(--border-default)] flex flex-col gap-2 min-w-[200px]">
          <div className="flex justify-between items-center text-sm font-bold">
            <span className="text-[var(--text-muted)]">{isEn ? 'Completion' : 'نسبة الاكتمال'}</span>
            <span className="text-[var(--color-primary)]">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-[var(--border-default)] h-2 rounded-full overflow-hidden">
            <div className="bg-[var(--color-primary)] h-full transition-all duration-500" style={{ width: \`\${completionPercentage}%\` }} />
          </div>
          <div className="mt-2 text-xs text-[var(--text-muted)] flex flex-col gap-1">
            <div className="flex justify-between">
              <span>{isEn ? 'Service:' : 'الخدمة المختارة:'}</span>
              <span className="font-bold truncate max-w-[100px]">{isEn ? projectTypes.find(t => t.value === formData.type)?.labelEn : projectTypes.find(t => t.value === formData.type)?.labelAr}</span>
            </div>
            <div className="flex justify-between">
              <span>{isEn ? 'Sub-services:' : 'الخدمات الفرعية:'}</span>
              <span className="font-bold">{dynamicFields.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface-secondary)] rounded-3xl p-6 sm:p-10 border border-[var(--border-default)] grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b border-[var(--border-default)] pb-4 text-[var(--color-primary)]">
            {isEn ? 'Basic Information' : 'المعلومات الأساسية'}
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('name'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Name' : 'الاسم'}</span>
              <span className="font-bold text-lg">{formData.name}</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('company'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Company' : 'الشركة'}</span>
              <span className="font-bold text-lg">{formData.company}</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('phone'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Phone' : 'رقم الجوال'}</span>
              <span className="font-bold text-lg" dir="ltr">{formData.phone}</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('email'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Email' : 'البريد الإلكتروني'}</span>
              <span className="font-bold text-lg">{formData.email}</span>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b border-[var(--border-default)] pb-4 text-[var(--color-primary)]">
            {isEn ? 'Project Details' : 'تفاصيل المشروع'}
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('type'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Service Type' : 'نوع الخدمة'}</span>
              <span className="font-bold text-lg">
                {isEn ? projectTypes.find(t => t.value === formData.type)?.labelEn : projectTypes.find(t => t.value === formData.type)?.labelAr}
              </span>
            </div>
            {dynamicFields.map(f => (
              <div key={f.id} className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf(\`dynamic_\${f.id}\`))}>
                <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? f.labelEn : f.labelAr}</span>
                <span className="font-bold text-lg line-clamp-2">{formData.dynamicAnswers[f.id] || (isEn ? 'Not specified' : 'لم يحدد')}</span>
              </div>
            ))}
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('description'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'General Details' : 'تفاصيل عامة'}</span>
              <span className="font-bold text-lg line-clamp-2">{formData.description}</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('budget'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Budget' : 'الميزانية'}</span>
              <span className="font-bold text-lg">{formData.budget}</span>
            </div>
            <div className="flex flex-col cursor-pointer hover:bg-[var(--bg-primary)] p-2 -mx-2 rounded-lg transition-colors" onClick={() => jumpToStep(stepsList.indexOf('timeline'))}>
              <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Timeline' : 'الإطار الزمني'}</span>
              <span className="font-bold text-lg">{formData.timeline}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canProceed() && stepIndex > 0 && stepIndex < totalSteps && currentStep !== 'description' && !currentStep.startsWith('dynamic_')) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white" onKeyDown={handleKeyDown}>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-[var(--surface-secondary)] z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
          initial={{ width: 0 }}
          animate={{ width: \`\${progress}%\` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-6 py-24 min-h-screen relative">
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            {/* Intro */}
            {currentStep === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-8"
              >
                <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-[var(--surface-secondary)] text-[var(--color-primary)] mb-4">
                  <Sparkles size={48} />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[var(--text-primary)] tracking-tight leading-tight">
                  {isEn ? "Let's build something" : "دعنا نبني شيئاً"} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]">
                    {isEn ? "extraordinary." : "استثنائياً."}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
                  {isEn ? "Answer a few questions to help us understand your vision, and we'll craft the perfect solution for you." : "أجب عن بعض الأسئلة لنفهم رؤيتك، وسنقوم بتصميم الحل الأمثل لك."}
                </p>
                
                <div className="pt-8">
                  <button 
                    onClick={handleNext}
                    className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full text-lg font-bold overflow-hidden transition-transform hover:scale-105"
                  >
                    <span className="relative z-10">{isEn ? "Start Discovery" : "ابدأ الاستكشاف"}</span>
                    <span className="relative z-10 transition-transform group-hover:translate-x-1">
                      {isEn ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
                  </button>
                  {localStorage.getItem('nomoDiscoveryProgress') && (
                    <p className="mt-4 text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
                      <Save size={12} /> {isEn ? 'Session auto-saved' : 'تم حفظ الجلسة تلقائياً'}
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Name */}
            {currentStep === 'name' && (
              <motion.div 
                key="name"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <User size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Step 1' : 'الخطوة 1'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight">
                  {isEn ? "What's your name?" : "ما هو اسمك الكريم؟"}
                </h2>
                <div className="relative mt-8">
                  <input 
                    type="text"
                    autoFocus
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={isEn ? "Type your full name" : "اكتب اسمك الكامل هنا..."}
                    className="w-full text-2xl sm:text-4xl bg-transparent border-b-2 border-[var(--border-default)] focus:border-[var(--color-primary)] py-4 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/30 font-bold"
                  />
                </div>
              </motion.div>
            )}

            {/* Company */}
            {currentStep === 'company' && (
              <motion.div 
                key="company"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Building2 size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Step 2' : 'الخطوة 2'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight">
                  {isEn ? "What's the name of your company or project?" : "ما هو اسم شركتك أو مشروعك؟"}
                </h2>
                <div className="relative mt-8">
                  <input 
                    type="text"
                    autoFocus
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder={isEn ? "Company name" : "اسم الشركة..."}
                    className="w-full text-2xl sm:text-4xl bg-transparent border-b-2 border-[var(--border-default)] focus:border-[var(--color-primary)] py-4 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/30 font-bold"
                  />
                </div>
              </motion.div>
            )}

            {/* Phone */}
            {currentStep === 'phone' && (
              <motion.div 
                key="phone"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Phone size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Step 3' : 'الخطوة 3'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight">
                  {isEn ? "What's your phone number?" : "ما هو رقم جوالك للتواصل؟"}
                </h2>
                <div className="relative mt-8" dir="ltr">
                  <input 
                    type="tel"
                    autoFocus
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+966 50 000 0000"
                    className="w-full text-2xl sm:text-4xl bg-transparent border-b-2 border-[var(--border-default)] focus:border-[var(--color-primary)] py-4 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/30 font-bold"
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            {currentStep === 'email' && (
              <motion.div 
                key="email"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Mail size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Step 4' : 'الخطوة 4'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight">
                  {isEn ? "And your email address?" : "وما هو بريدك الإلكتروني؟"}
                </h2>
                <div className="relative mt-8" dir="ltr">
                  <input 
                    type="email"
                    autoFocus
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="hello@example.com"
                    className="w-full text-2xl sm:text-4xl bg-transparent border-b-2 border-[var(--border-default)] focus:border-[var(--color-primary)] py-4 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/30 font-bold"
                  />
                </div>
              </motion.div>
            )}

            {/* Service Type */}
            {currentStep === 'type' && (
              <motion.div 
                key="type"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6 w-full"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Target size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Step 5' : 'الخطوة 5'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight mb-8">
                  {isEn ? "What kind of project are we building?" : "ما هو نوع المشروع الذي ترغب في تنفيذه؟"}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar pb-10">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setFormData({ ...formData, type: type.value });
                        setTimeout(handleNext, 400);
                      }}
                      className={\`flex flex-col text-start p-5 rounded-2xl border transition-all \${
                        formData.type === type.value 
                          ? 'bg-[var(--surface-secondary)] border-[var(--color-primary)] shadow-md ring-1 ring-[var(--color-primary)]' 
                          : 'bg-[var(--surface-secondary)] border-[var(--border-default)] hover:border-[var(--text-muted)]'
                      }\`}
                    >
                      <span className="font-bold text-lg text-[var(--text-primary)] mb-2">
                        {isEn ? type.labelEn : type.labelAr}
                      </span>
                      <span className="text-sm text-[var(--text-muted)] line-clamp-2">
                        {isEn ? type.descEn : type.descAr}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Dynamic Steps */}
            {currentStep.startsWith('dynamic_') && renderDynamicField(currentStep.replace('dynamic_', ''))}

            {/* Description */}
            {currentStep === 'description' && (
              <motion.div 
                key="description"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <FileText size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'General Details' : 'تفاصيل عامة'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight">
                  {isEn ? "Tell us a bit more about the idea and main goals." : "حدثنا أكثر عن فكرة المشروع وأهدافك الرئيسية بشكل عام."}
                </h2>
                <div className="relative mt-8">
                  <textarea 
                    autoFocus
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder={isEn ? "Type your thoughts here..." : "اكتب أفكارك هنا، كلما كانت التفاصيل أكثر كان أفضل..."}
                    className="w-full text-lg sm:text-xl bg-[var(--surface-secondary)] rounded-2xl border border-[var(--border-default)] focus:border-[var(--color-primary)] p-6 outline-none text-[var(--text-primary)] transition-colors placeholder:text-[var(--text-muted)]/50 resize-none shadow-inner custom-scrollbar"
                  />
                </div>
              </motion.div>
            )}

            {/* Budget */}
            {currentStep === 'budget' && (
              <motion.div 
                key="budget"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Target size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Budget' : 'الميزانية'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight mb-8">
                  {isEn ? "What's the estimated budget for this phase?" : "ما هي الميزانية التقديرية المخصصة لهذه المرحلة؟"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(isEn ? budgetsEn : budgetsAr).map((b, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFormData({ ...formData, budget: b });
                        setTimeout(handleNext, 400);
                      }}
                      className={\`px-5 py-3 rounded-full text-sm font-medium border transition-all \${
                        formData.budget === b 
                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md transform scale-105' 
                          : 'bg-[var(--surface-secondary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-gray-400'
                      }\`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Timeline */}
            {currentStep === 'timeline' && (
              <motion.div 
                key="timeline"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Calendar size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Timeline' : 'الإطار الزمني'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight mb-8">
                  {isEn ? "When are you looking to launch?" : "متى ترغب في إطلاق المشروع؟"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(isEn ? timelinesEn : timelinesAr).map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFormData({ ...formData, timeline: t });
                        setTimeout(handleNext, 400);
                      }}
                      className={\`px-5 py-3 rounded-full text-sm font-medium border transition-all \${
                        formData.timeline === t 
                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md transform scale-105' 
                          : 'bg-[var(--surface-secondary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-gray-400'
                      }\`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Review Page */}
            {currentStep === 'review' && renderReview()}
          </AnimatePresence>

          {/* Navigation Controls */}
          {stepIndex > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-6 flex flex-wrap items-center justify-between gap-4"
            >
              <button 
                onClick={handlePrev}
                className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-4 py-2 rounded-full hover:bg-[var(--surface-secondary)]"
              >
                {isEn ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                {isEn ? 'Back' : 'السابق'}
              </button>
              
              <div className="flex-1 text-center min-w-[150px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={stepIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-xs font-bold text-[var(--color-primary)]"
                  >
                    {encourageText}
                  </motion.p>
                </AnimatePresence>
              </div>

              {stepIndex < totalSteps ? (
                <button 
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={\`flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-full transition-all \${
                    canProceed() 
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:scale-105 shadow-lg' 
                      : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'
                  }\`}
                >
                  {isEn ? 'Continue' : 'متابعة'}
                  {isEn ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
              ) : (
                <button 
                  onClick={() => {
                    const dynamicText = dynamicFields.map(f => \`\${isEn ? f.labelEn : f.labelAr}: \${formData.dynamicAnswers[f.id] || ''}\`).join('\\n');
                    const text = isEn 
                      ? \`Hello NomoLabs!\\nI have completed the Discovery Portal.\\n\\nName: \${formData.name}\\nCompany: \${formData.company}\\nPhone: \${formData.phone}\\nEmail: \${formData.email}\\nProject Type: \${projectTypes.find(t => t.value === formData.type)?.labelEn || formData.type}\\n\\nProject Details:\\n\${dynamicText}\\n\\nGeneral Details:\\n\${formData.description}\\n\\nBudget: \${formData.budget}\\nTimeline: \${formData.timeline}\`
                      : \`مرحباً نمو لابز!\\nلقد أكملت بوابة الاستكشاف.\\n\\nالاسم: \${formData.name}\\nالشركة: \${formData.company}\\nرقم الجوال: \${formData.phone}\\nالبريد الإلكتروني: \${formData.email}\\nنوع المشروع: \${projectTypes.find(t => t.value === formData.type)?.labelAr || formData.type}\\n\\nتفاصيل المشروع:\\n\${dynamicText}\\n\\nتفاصيل عامة:\\n\${formData.description}\\n\\nالميزانية: \${formData.budget}\\nالإطار الزمني: \${formData.timeline}\`;
                    
                    const encoded = encodeURIComponent(text);
                    let waPhone = config.contactNumber.replace(/[^0-9]/g, '');
                    if (waPhone.startsWith('05')) waPhone = '966' + waPhone.substring(1);
                    window.open(\`https://wa.me/\${waPhone}?text=\${encoded}\`, '_blank');
                    
                    // Clear local storage after submission
                    localStorage.removeItem('nomoDiscoveryProgress');
                    localStorage.removeItem('nomoDiscoveryStep');
                  }}
                  disabled={!canProceed()}
                  className={\`flex items-center gap-2 text-sm font-bold px-8 py-3 rounded-full transition-all \${
                    canProceed() 
                      ? 'bg-[var(--color-primary)] text-white hover:scale-105 shadow-[0_0_20px_rgba(79,142,247,0.4)]' 
                      : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'
                  }\`}
                >
                  {isEn ? 'Submit Request' : 'إرسال الطلب'}
                  <Check size={16} />
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
`
fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
