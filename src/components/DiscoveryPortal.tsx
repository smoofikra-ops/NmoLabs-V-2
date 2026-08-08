import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, Download, AlertCircle, Loader2, Edit2, Clock, Sparkles, Mic, Type } from 'lucide-react';
import { submitKYCForm, KYCSubmissionPayload } from '../services/kycSubmissionService';
import { projectTypes, budgetsAr, timelinesAr, budgetsEn, timelinesEn } from '../data/projectIntake';
import { useSite } from '../context/SiteContext';
import { dynamicStepsConfig } from '../data/dynamicSteps';

const GCC_COUNTRIES = [
  { code: '+966', nameAr: 'السعودية', nameEn: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', nameAr: 'الإمارات', nameEn: 'UAE', flag: '🇦🇪' },
  { code: '+965', nameAr: 'الكويت', nameEn: 'Kuwait', flag: '🇰🇼' },
  { code: '+974', nameAr: 'قطر', nameEn: 'Qatar', flag: '🇶🇦' },
  { code: '+973', nameAr: 'البحرين', nameEn: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', nameAr: 'عمان', nameEn: 'Oman', flag: '🇴🇲' }
];

const BackgroundEffects = ({ sectionId, logoUrl }: { sectionId: string, logoUrl: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <AnimatePresence mode="popLayout">
        {sectionId === 'client_info' && (
          <motion.div key="client_info" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent" />
        )}
        {sectionId === 'service' && (
          <motion.div key="service" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-3xl" />
          </motion.div>
        )}
        {sectionId === 'project_details' && (
          <motion.div key="project_details" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen" />
          </motion.div>
        )}
        {sectionId === 'identity_content' && (
          <motion.div key="identity_content" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0">
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          </motion.div>
        )}
        {sectionId === 'platforms' && (
          <motion.div key="platforms" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </motion.div>
        )}
        {sectionId === 'timeline' && (
          <motion.div key="timeline" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
          </motion.div>
        )}
        {sectionId === 'additional_notes' && (
          <motion.div key="additional_notes" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent" />
        )}
        {sectionId === 'review' && (
          <motion.div key="review" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1 }} className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5" />
        )}
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none mix-blend-luminosity">
        {logoUrl && <img src={logoUrl} alt="NomoLabs Watermark" className="w-1/2 max-w-md grayscale" />}
      </div>
    </div>
  );
};

export const DiscoveryPortal = () => {
  const { config } = useSite();
  const isEn = config.language === 'en';
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('nomoDiscoveryProgress_v3');
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
      dynamicAnswers: {} as Record<string, string>,
      approval_response_time: '',
      platform_information: '',
      content_information: '',
      attachments_information: '',
      additional_notes: ''
    };
  });

  const [countryCode, setCountryCode] = useState('+966');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Initialize phone parts on mount
  useEffect(() => {
    if (formData.phone) {
      const parts = formData.phone.split(' ');
      if (parts.length > 1) {
        setCountryCode(parts[0]);
        setPhoneNumber(parts.slice(1).join(' '));
      } else {
        setPhoneNumber(formData.phone);
      }
    }
  }, []);

  const handlePhoneChange = (code: string, number: string) => {
    setCountryCode(code);
    let cleanNumber = number.replace(/[^0-9]/g, '');
    if (code === '+966' && cleanNumber.startsWith('0')) {
      cleanNumber = cleanNumber.substring(1);
    }
    setPhoneNumber(cleanNumber);
    setFormData(prev => ({ ...prev, phone: `${code} ${cleanNumber}` }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const dynamicFields = useMemo(() => {
    return dynamicStepsConfig[formData.type] || [];
  }, [formData.type]);

  const sections = useMemo(() => {
    const s = [
      { id: 'client_info', titleEn: 'Client Information', titleAr: 'معلومات العميل', descEn: 'Let\'s get to know you better.', descAr: 'لنتعرف عليك بشكل أفضل.' },
      { id: 'service', titleEn: 'Requested Service', titleAr: 'الخدمة المطلوبة', descEn: 'What service are you looking for?', descAr: 'ما هي الخدمة التي تبحث عنها؟' }
    ];
    if (dynamicFields.length > 0) {
      s.push({ id: 'project_details', titleEn: 'Project Details', titleAr: 'تفاصيل المشروع', descEn: 'Tell us more about your project.', descAr: 'أخبرنا المزيد عن مشروعك.' });
    }
    s.push({ id: 'identity_content', titleEn: 'Identity & Content', titleAr: 'الهوية والمحتوى', descEn: 'Visual identity and available content.', descAr: 'الهوية البصرية والمحتوى المتوفر.' });
    s.push({ id: 'platforms', titleEn: 'Platforms & Accounts', titleAr: 'المنصات والحسابات', descEn: 'Target platforms and social accounts.', descAr: 'المنصات المستهدفة وحسابات التواصل الاجتماعي.' });
    s.push({ id: 'timeline', titleEn: 'Timeline & Approvals', titleAr: 'الجدول الزمني والموافقات', descEn: 'This helps us build a realistic execution plan and reduce delays.', descAr: 'تساعدنا هذه المعلومات على بناء خطة تنفيذ واقعية وتقليل أي تأخير أثناء المشروع.' });
    s.push({ id: 'additional_notes', titleEn: 'Additional Notes', titleAr: 'ملاحظات إضافية', descEn: 'Anything else you want to add?', descAr: 'هل هناك أي شيء آخر تود إضافته؟' });
    s.push({ id: 'review', titleEn: 'Final Review', titleAr: 'المراجعة النهائية', descEn: 'Review your details before submitting.', descAr: 'راجع تفاصيل طلبك قبل الإرسال.' });
    return s;
  }, [dynamicFields]);

  const [stepIndex, setStepIndex] = useState(() => {
    const savedStep = localStorage.getItem('nomoDiscoveryStep_v3');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('nomoDiscoveryProgress_v3', JSON.stringify(formData));
    localStorage.setItem('nomoDiscoveryStep_v3', stepIndex.toString());
  }, [formData, stepIndex]);

  const currentSection = sections[stepIndex]?.id || 'client_info';

  const validateSection = (sectionId: string) => {
    switch(sectionId) {
      case 'client_info':
        return formData.name.trim().length > 1 && formData.company.trim().length > 1 && formData.phone.trim().length > 5 && formData.email.trim().includes('@');
      case 'service':
        return formData.type !== '' && formData.description.trim().length > 10;
      case 'project_details':
        return dynamicFields.every(f => (formData.dynamicAnswers[f.id] || '').trim().length > 0);
      case 'identity_content':
        return true; 
      case 'platforms':
        return true; 
      case 'timeline':
        return formData.budget !== '' && formData.timeline !== '' && formData.approval_response_time !== '';
      case 'additional_notes':
        return true; 
      case 'review':
        return agreedToTerms && !isSubmitting;
      default: return true;
    }
  };

  const handleNext = () => {
    if (stepIndex < sections.length - 1) {
      setStepIndex(stepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
    const sub_id = 'NML-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    
    const payload: KYCSubmissionPayload = {
      submission_id: sub_id,
      submitted_at: new Date().toISOString(),
      language: config.language,
      completion_percentage: 100,
      primary_service: projectTypes.find(t => t.value === formData.type)?.labelEn || formData.type,
      selected_subservices: dynamicFields.map(f => isEn ? f.labelEn : f.labelAr).join(', '),
      client_information: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      },
      business_information: {
        company: formData.company
      },
      project_information: {
        description: formData.description,
        budget: formData.budget,
        timeline: formData.timeline
      },
      platform_information: formData.platform_information,
      content_information: formData.content_information,
      attachments_information: formData.attachments_information,
      approval_response_time: formData.approval_response_time,
      answers: {
        ...formData.dynamicAnswers,
        additional_notes: formData.additional_notes
      }
    };

    const result = await submitKYCForm(payload);
    setIsSubmitting(false);

    if (result.success === true && result.submission_id && result.row_number) {
      setSubmissionId(result.submission_id);
      setSubmitSuccess(true);
      localStorage.removeItem('nomoDiscoveryProgress_v3');
      localStorage.removeItem('nomoDiscoveryStep_v3');
    } else {
      setSubmitError(isEn ? (result.message || 'Failed to submit. Please try again.') : 'فشل الإرسال. يرجى المحاولة مرة أخرى.');
    }
  };

  const getMotivationalText = (idx: number) => {
    const textsEn = [
      "Let's start with the basics.",
      "Great! Let's get into the details.",
      "Awesome. This helps us plan better.",
      "Almost there! Just a few more questions.",
      "Perfect! Ready for the final review."
    ];
    const textsAr = [
      "لنبداً بالمعلومات الأساسية.",
      "ممتاز، بدأت الصورة تتضح 👌",
      "رائع، هذه المعلومات تساعدنا في التخطيط.",
      "وصلنا تقريباً للنهاية.",
      "جاهزين للمراجعة النهائية!"
    ];
    // Map index approximately
    const mapped = Math.floor((idx / sections.length) * textsEn.length);
    return isEn ? textsEn[Math.min(mapped, textsEn.length - 1)] : textsAr[Math.min(mapped, textsAr.length - 1)];
  };

  const [isRecording, setIsRecording] = useState(false);
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = isEn ? 'en-US' : 'ar-SA';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({ ...prev, additional_notes: (prev.additional_notes ? prev.additional_notes + ' ' : '') + transcript }));
      };
      recognition.onerror = (event: any) => {
        console.error(event.error);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);
      
      recognition.start();
    } else {
      alert(isEn ? 'Speech recognition is not supported in this browser.' : 'التعرف على الصوت غير مدعوم في هذا المتصفح.');
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center font-sans px-6 relative z-10">
        <BackgroundEffects sectionId="review" logoUrl={config.desktopLogoUrl} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-[var(--surface-secondary)]/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-[var(--border-default)] text-center shadow-2xl relative z-10"
        >
          <div className="w-20 h-20 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-4">
            {isEn ? "Request Received Successfully" : "تم استلام معلومات مشروعك بنجاح"}
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            {isEn ? "The NomoLabs team will review it and start the preparation steps." : "سيقوم فريق NomoLabs بمراجعتها وبدء خطوات التجهيز."}
          </p>
          <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-default)] inline-flex flex-col items-center gap-1 mb-8">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Order Number' : 'رقم الطلب'}</span>
            <span className="font-mono text-xl font-bold text-[var(--color-primary)]">{submissionId}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform"
            >
              {isEn ? 'Return Home' : 'العودة للرئيسية'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'client_info':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Personal Details' : 'البيانات الشخصية'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Enter your full name and contact email' : 'أدخل اسمك الكريم وبريدك الإلكتروني'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Full Name' : 'الاسم الكريم'}</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
                    placeholder={isEn ? "John Doe" : "عبدالله محمد"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Email' : 'البريد الإلكتروني'}</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    dir="ltr"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors text-left shadow-sm"
                    placeholder="example@domain.com"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">B</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Business Info' : 'بيانات العمل'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Company name and contact phone' : 'اسم الشركة أو المشروع ورقم الجوال'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Company / Project Name' : 'اسم الشركة / المشروع'}</label>
                  <input 
                    type="text" 
                    value={formData.company} 
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
                    placeholder={isEn ? "NomoLabs" : "نمو لابز"}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Phone Number' : 'رقم الجوال'}</label>
                  <div className="flex" dir="ltr">
                    <select 
                      value={countryCode}
                      onChange={(e) => handlePhoneChange(e.target.value, phoneNumber)}
                      className="bg-[var(--surface-secondary)] border border-r-0 border-[var(--border-default)] rounded-l-xl px-2 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm min-w-[80px]"
                    >
                      {GCC_COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      value={phoneNumber} 
                      onChange={e => handlePhoneChange(countryCode, e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-r-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
                      placeholder="5X XXX XXXX"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'service':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Primary Service' : 'الخدمة الأساسية المطلوبة'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Select the main service you need' : 'اختر الخدمة الرئيسية التي تحتاجها'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setFormData({...formData, type: t.value, dynamicAnswers: {}})}
                    className={`text-start p-4 rounded-2xl border transition-all flex items-start gap-3 ${formData.type === t.value ? 'bg-[var(--bg-primary)] border-[var(--color-primary)] ring-1 ring-[var(--color-primary)] shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] hover:border-[var(--text-muted)]'}`}
                  >
                    <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${formData.type === t.value ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'border-[var(--border-default)]'}`}>
                      {formData.type === t.value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className={`font-bold mb-1 ${formData.type === t.value ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)]'}`}>{isEn ? t.labelEn : t.labelAr}</div>
                      <div className="text-xs text-[var(--text-muted)] leading-relaxed">{isEn ? t.descEn : t.descAr}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">B</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'General Description' : 'وصف عام للمشروع / الفكرة'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Tell us more about your project goals' : 'حدثنا أكثر عن أهداف مشروعك ورؤيتك'}</p>
                </div>
              </div>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none shadow-sm"
                placeholder={isEn ? "Tell us about your idea..." : "حدثنا عن فكرتك..."}
              />
            </div>
          </div>
        );

      case 'project_details':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Specific Details' : 'التفاصيل الدقيقة'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Help us understand the technical requirements' : 'يساعدنا هذا في فهم المتطلبات التقنية الدقيقة'}</p>
                </div>
              </div>
              <div className="space-y-6">
                {dynamicFields.map((field, idx) => (
                  <div key={field.id} className="space-y-3">
                    <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? field.labelEn : field.labelAr}</label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        value={formData.dynamicAnswers[field.id] || ''}
                        onChange={e => setFormData({...formData, dynamicAnswers: {...formData.dynamicAnswers, [field.id]: e.target.value}})}
                        className="w-full h-24 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none shadow-sm"
                      />
                    ) : field.type === 'checkbox' ? (
                      <div className="flex flex-wrap gap-3">
                        {(isEn ? field.optionsEn : field.optionsAr)?.map((opt, oIdx) => {
                          const currentAnswers = formData.dynamicAnswers[field.id] ? formData.dynamicAnswers[field.id].split(', ') : [];
                          const isSelected = currentAnswers.includes(opt);
                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                let newAnswers = [...currentAnswers];
                                if (isSelected) {
                                  newAnswers = newAnswers.filter(a => a !== opt);
                                } else {
                                  newAnswers.push(opt);
                                }
                                setFormData({...formData, dynamicAnswers: {...formData.dynamicAnswers, [field.id]: newAnswers.join(', ')}});
                              }}
                              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all flex items-center gap-2 ${isSelected ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--color-primary)]'}`}
                            >
                              {isSelected && <Check size={14} strokeWidth={3} />}
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input 
                        type="text"
                        value={formData.dynamicAnswers[field.id] || ''}
                        onChange={e => setFormData({...formData, dynamicAnswers: {...formData.dynamicAnswers, [field.id]: e.target.value}})}
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-4 py-3.5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors shadow-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'identity_content':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Visual Identity & Content' : 'الهوية البصرية والمحتوى'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Do you have an existing logo or content?' : 'هل تمتلك هوية بصرية أو محتوى جاهز؟'}</p>
                </div>
              </div>
              <textarea 
                value={formData.content_information}
                onChange={e => setFormData({...formData, content_information: e.target.value})}
                className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none shadow-sm"
                placeholder={isEn ? "e.g., We have a logo and brand guidelines..." : "مثال: لدينا شعار وهوية بصرية كاملة، ونحتاج تصميم..."}
              />
            </div>
            
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">B</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Files & Attachments' : 'الملفات والمرفقات'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Provide any links to drive folders or references' : 'قم بتوفير روابط لملفات Google Drive أو مراجع'}</p>
                </div>
              </div>
              <textarea 
                value={formData.attachments_information}
                onChange={e => setFormData({...formData, attachments_information: e.target.value})}
                className="w-full h-24 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none shadow-sm"
                placeholder={isEn ? "Paste links here..." : "ضع الروابط هنا..."}
              />
            </div>
          </div>
        );

      case 'platforms':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Platforms & Accounts' : 'المنصات والحسابات'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'What are your target platforms or existing accounts?' : 'ما هي المنصات المستهدفة أو حساباتك الحالية؟'}</p>
                </div>
              </div>
              <textarea 
                value={formData.platform_information}
                onChange={e => setFormData({...formData, platform_information: e.target.value})}
                className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none shadow-sm"
                placeholder={isEn ? "e.g., Instagram, Twitter, TikTok..." : "مثال: انستقرام، تويتر، تيك توك..."}
              />
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Estimated Budget' : 'الميزانية المتوقعة'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Select your expected budget range' : 'اختر النطاق المتوقع للميزانية'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isEn ? budgetsEn : budgetsAr).map((b, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({...formData, budget: b})}
                    className={`px-5 py-3 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${formData.budget === b ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}`}
                  >
                    {formData.budget === b && <Check size={14} strokeWidth={3} />}
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">B</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Expected Timeline' : 'الإطار الزمني المتوقع'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'When do you expect the project to be delivered?' : 'متى تتوقع استلام المشروع؟'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isEn ? timelinesEn : timelinesAr).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({...formData, timeline: t})}
                    className={`px-5 py-3 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${formData.timeline === t ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}`}
                  >
                    {formData.timeline === t && <Check size={14} strokeWidth={3} />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">C</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Approval Response Time' : 'وقت الاستجابة للموافقات'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'Expected time for approvals (hosting, domains, etc.)' : 'الوقت المتوقع لاعتماد بعض المتطلبات (استضافة، دومين، الخ)'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isEn ? ['Immediately', 'Within hours', 'Same day', 'Next business day', 'More than a day'] : ['مباشرة', 'خلال ساعات', 'في نفس اليوم', 'يوم العمل التالي', 'أكثر من يوم']).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({...formData, approval_response_time: t})}
                    className={`px-5 py-3 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${formData.approval_response_time === t ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}`}
                  >
                    {formData.approval_response_time === t && <Check size={14} strokeWidth={3} />}
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'additional_notes':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[var(--bg-primary)] border border-[var(--border-default)] flex items-center justify-center font-bold text-[var(--color-primary)]">A</div>
                <div>
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">{isEn ? 'Any other notes?' : 'أية ملاحظات أخرى؟'}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{isEn ? 'You can type or record your voice' : 'يمكنك التحدث مباشرة، وسنحوّل كلامك إلى نص لتسهيل إضافة ملاحظاتك.'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={startRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--color-primary)]'}`}
                >
                  <Mic size={16} />
                  {isRecording ? (isEn ? 'Recording...' : 'جاري التسجيل...') : (isEn ? 'Voice Recording' : 'تسجيل صوتي')}
                </button>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-medium">
                  <Type size={16} />
                  {isEn ? 'Text Input' : 'كتابة'}
                </div>
              </div>

              <textarea 
                value={formData.additional_notes}
                onChange={e => setFormData({...formData, additional_notes: e.target.value})}
                className="w-full h-40 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none shadow-sm"
                placeholder={isEn ? "Add your notes here..." : "أضف ملاحظاتك هنا..."}
              />
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Client Info Summary */}
              <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between relative group">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">{isEn ? 'Client Information' : 'معلومات العميل'}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Name' : 'الاسم'}</span><span className="font-medium text-[var(--text-primary)]">{formData.name}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Company' : 'الشركة'}</span><span className="font-medium text-[var(--text-primary)]">{formData.company}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Phone' : 'الجوال'}</span><span className="font-medium text-[var(--text-primary)]" dir="ltr">{formData.phone}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Email' : 'البريد'}</span><span className="font-medium text-[var(--text-primary)]">{formData.email}</span></div>
                  </div>
                </div>
                <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'client_info'))} className="mt-4 sm:mt-0 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors rtl:mr-auto ltr:ml-auto">
                  <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                </button>
              </div>

              {/* Service Summary */}
              <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between relative group">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">{isEn ? 'Project & Service' : 'المشروع والخدمة'}</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Service Type' : 'نوع الخدمة'}</span>
                      <span className="font-medium text-[var(--text-primary)]">{isEn ? projectTypes.find(t => t.value === formData.type)?.labelEn : projectTypes.find(t => t.value === formData.type)?.labelAr}</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'General Description' : 'الوصف العام'}</span>
                      <span className="font-medium text-[var(--text-primary)] whitespace-pre-wrap">{formData.description}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'service'))} className="mt-4 sm:mt-0 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors rtl:mr-auto ltr:ml-auto">
                  <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                </button>
              </div>

              {/* Project Details Summary */}
              {dynamicFields.length > 0 && (
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between relative group">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">{isEn ? 'Project Details' : 'تفاصيل المشروع'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      {dynamicFields.map(f => (
                        <div key={f.id}>
                          <span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? f.labelEn : f.labelAr}</span>
                          <span className="font-medium text-[var(--text-primary)] line-clamp-2">{formData.dynamicAnswers[f.id] || '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'project_details'))} className="mt-4 sm:mt-0 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors rtl:mr-auto ltr:ml-auto">
                    <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                  </button>
                </div>
              )}

              {/* Identity & Content Summary */}
              {(formData.content_information || formData.attachments_information) && (
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between relative group">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">{isEn ? 'Identity & Content' : 'الهوية والمحتوى'}</h3>
                    <div className="space-y-4 text-sm">
                      {formData.content_information && (
                        <div>
                          <span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Content Info' : 'معلومات المحتوى'}</span>
                          <span className="font-medium text-[var(--text-primary)] whitespace-pre-wrap">{formData.content_information}</span>
                        </div>
                      )}
                      {formData.attachments_information && (
                        <div>
                          <span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Attachments' : 'المرفقات'}</span>
                          <span className="font-medium text-[var(--text-primary)] whitespace-pre-wrap">{formData.attachments_information}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'identity_content'))} className="mt-4 sm:mt-0 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors rtl:mr-auto ltr:ml-auto">
                    <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                  </button>
                </div>
              )}

              {/* Timeline Summary */}
              <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between relative group">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">{isEn ? 'Timeline & Approvals' : 'الجدول الزمني والموافقات'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Budget' : 'الميزانية'}</span><span className="font-medium text-[var(--text-primary)]">{formData.budget}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Timeline' : 'المدة المطلوبة'}</span><span className="font-medium text-[var(--text-primary)]">{formData.timeline}</span></div>
                    <div className="sm:col-span-2"><span className="block text-[var(--text-muted)] text-xs mb-1">{isEn ? 'Approval Time' : 'وقت الاستجابة للموافقات'}</span><span className="font-medium text-[var(--text-primary)]">{formData.approval_response_time}</span></div>
                  </div>
                </div>
                <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'timeline'))} className="mt-4 sm:mt-0 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors rtl:mr-auto ltr:ml-auto">
                  <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                </button>
              </div>
              
              {/* Additional Notes */}
              {formData.additional_notes && (
                <div className="bg-[var(--surface-secondary)] border border-[var(--border-default)] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between relative group">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-[var(--color-primary)] mb-4">{isEn ? 'Additional Notes' : 'ملاحظات إضافية'}</h3>
                    <div className="text-sm">
                      <span className="font-medium text-[var(--text-primary)] whitespace-pre-wrap">{formData.additional_notes}</span>
                    </div>
                  </div>
                  <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'additional_notes'))} className="mt-4 sm:mt-0 text-sm font-bold text-[var(--text-muted)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-colors rtl:mr-auto ltr:ml-auto">
                    <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                  </button>
                </div>
              )}
            </div>

            <div 
              className="mt-6 p-4 bg-[var(--surface-secondary)] rounded-xl border border-[var(--border-default)] flex items-start gap-4 cursor-pointer hover:bg-[var(--bg-primary)] transition-colors" 
              onClick={() => setAgreedToTerms(!agreedToTerms)}
            >
              <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${agreedToTerms ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'border-[var(--border-default)] bg-[var(--bg-primary)]'}`}>
                {agreedToTerms && <Check size={14} strokeWidth={3} />}
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {isEn ? "I confirm the information is correct and I agree to use it to prepare and execute the project." : "أؤكد صحة المعلومات وأوافق على استخدامها لتجهيز وتنفيذ المشروع."}
              </p>
            </div>

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                <AlertCircle size={20} />
                <p className="text-sm font-bold">{submitError}</p>
              </div>
            )}
          </div>
        );
      
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col font-sans selection:bg-[var(--color-primary)] selection:text-white relative z-0 overflow-hidden">
      <BackgroundEffects sectionId={currentSection} logoUrl={config.desktopLogoUrl} />
      
      {/* Header/Progress Area */}
      <div className="sticky top-0 z-20 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-black text-xl text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles size={20} className="text-[var(--color-primary)]" />
              NomoLabs Discovery
            </h1>
            <div className="text-sm font-bold text-[var(--text-muted)]">
              {isEn ? `Step ${stepIndex + 1} of ${sections.length}` : `الخطوة ${stepIndex + 1} من ${sections.length}`}
            </div>
          </div>
          
          <div className="h-2 w-full bg-[var(--surface-secondary)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--color-primary)] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((stepIndex + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-8 pb-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto w-full relative z-10">
          
          {/* Section Header */}
          <motion.div 
            key={`header-${currentSection}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center sm:text-start"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-2">
              {isEn ? sections[stepIndex].titleEn : sections[stepIndex].titleAr}
            </h2>
            <p className="text-[var(--text-muted)] font-medium">
              {isEn ? sections[stepIndex].descEn : sections[stepIndex].descAr}
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button 
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold px-6 py-3.5 rounded-xl transition-all ${stepIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-[var(--text-primary)] bg-[var(--surface-secondary)] border border-[var(--border-default)] hover:border-[var(--color-primary)]'}`}
            >
              {isEn ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              {isEn ? 'Back' : 'السابق'}
            </button>

            <div className="hidden sm:block flex-1 text-center">
               <motion.span 
                 key={stepIndex}
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-sm font-bold text-[var(--text-muted)] bg-[var(--surface-secondary)]/50 px-4 py-2 rounded-full border border-[var(--border-default)] inline-block"
               >
                 {getMotivationalText(stepIndex)}
               </motion.span>
            </div>

            {currentSection !== 'review' ? (
              <button 
                onClick={handleNext}
                disabled={!validateSection(currentSection)}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold px-8 py-3.5 rounded-xl transition-all min-w-[140px] ${validateSection(currentSection) ? 'bg-[var(--color-primary)] text-white shadow-lg hover:shadow-xl hover:scale-105' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'}`}
              >
                {isEn ? 'Next Step' : 'الخطوة التالية'}
                {isEn ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!validateSection('review') || isSubmitting}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-bold px-8 py-3.5 rounded-xl transition-all min-w-[160px] ${validateSection('review') && !isSubmitting ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(79,142,247,0.4)] hover:scale-105' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'}`}
              >
                {isSubmitting ? (isEn ? 'Submitting...' : 'جاري الإرسال...') : (isEn ? 'Submit Request' : 'إرسال الطلب')}
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
