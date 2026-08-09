const fs = require('fs');

const code = `import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Check, AlertCircle, Loader2, Edit2, Sparkles, Mic, Type, Database, Layers, BrainCircuit, ScanSearch, Target, Rocket, LineChart, TrendingUp, Search, MessagesSquare, Lightbulb, Zap, Smartphone, MonitorSmartphone } from 'lucide-react';
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

const NOMOLABS_WHATSAPP_NUMBER = 'PUT_NUMBER_HERE';

const NOMOLABS_SERVICES = [
  { ar: 'إطلاق المتاجر الإلكترونية', en: 'E-Commerce Launch', icon: Rocket },
  { ar: 'تطوير المتاجر', en: 'Store Development', icon: MonitorSmartphone },
  { ar: 'إنشاء المواقع', en: 'Web Development', icon: Layers },
  { ar: 'تطوير التطبيقات', en: 'Mobile Apps', icon: Smartphone },
  { ar: 'برمجيات مخصصة', en: 'Custom Software', icon: Database },
  { ar: 'تحسين محركات البحث SEO', en: 'SEO', icon: Search },
  { ar: 'AI Search Optimization', en: 'AI Search', icon: BrainCircuit },
  { ar: 'إدارة الحملات', en: 'Paid Advertising', icon: Target },
  { ar: 'تحليل البيانات', en: 'Data Analytics', icon: LineChart },
  { ar: 'دراسة السوق', en: 'Market Intelligence', icon: ScanSearch },
  { ar: 'تجربة التجارة', en: 'E-Commerce UX', icon: Sparkles },
  { ar: 'CRO', en: 'CRO', icon: TrendingUp },
  { ar: 'حلول الذكاء الاصطناعي', en: 'AI Solutions', icon: BrainCircuit },
  { ar: 'الأتمتة', en: 'Automation', icon: Zap },
  { ar: 'صناعة المحتوى', en: 'Content', icon: Type },
  { ar: 'الاستشارات الرقمية', en: 'Digital Consulting', icon: MessagesSquare },
  { ar: 'تطوير المشاريع', en: 'Growth Strategy', icon: Lightbulb },
];

const SPOTLIGHT_SERVICES = [
  { ar: { title: 'تطوير المتاجر الإلكترونية', desc: 'نبني تجربة بيع أسرع وأكثر قابلية للنمو' }, en: { title: 'E-Commerce Development', desc: 'We build faster, more scalable shopping experiences' }, icon: MonitorSmartphone },
  { ar: { title: 'تحليل السوق والمنافسين', desc: 'قرارات أفضل تبدأ من بيانات أوضح' }, en: { title: 'Market Intelligence', desc: 'Better decisions start with clearer data' }, icon: ScanSearch },
  { ar: { title: 'حلول الذكاء الاصطناعي', desc: 'حوّل العمليات المتكررة إلى أنظمة ذكية' }, en: { title: 'AI Solutions', desc: 'Turn repetitive tasks into smart systems' }, icon: BrainCircuit },
  { ar: { title: 'SEO + AI Search', desc: 'اجعل علامتك أكثر قابلية للاكتشاف' }, en: { title: 'SEO + AI Search', desc: 'Make your brand more discoverable' }, icon: Search },
];

const ServicesTicker = ({ isEn }: { isEn: boolean }) => {
  return (
    <div className="w-full bg-[var(--surface-secondary)]/80 backdrop-blur-md border-b border-[var(--border-default)] overflow-hidden py-3 z-20 relative">
      <style>{\`
        @keyframes ticker {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .animate-ticker-loop {
          animation: ticker 40s linear infinite;
        }
        [dir="rtl"] .animate-ticker-loop {
          animation: ticker-rtl 40s linear infinite;
        }
        @keyframes ticker-rtl {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(33.333%, 0, 0); }
        }
      \`}</style>
      <div className="flex w-max animate-ticker-loop">
        {[...NOMOLABS_SERVICES, ...NOMOLABS_SERVICES, ...NOMOLABS_SERVICES].map((srv, idx) => {
          const Icon = srv.icon;
          return (
            <div key={idx} className="flex items-center gap-2 px-6 text-sm font-bold text-[var(--text-muted)] whitespace-nowrap">
              <Icon size={16} className="text-[var(--color-primary)]" />
              {isEn ? srv.en : srv.ar}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FloatingServiceSpotlight = ({ isEn }: { isEn: boolean }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SPOTLIGHT_SERVICES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const srv = SPOTLIGHT_SERVICES[index];
  const Icon = srv.icon;

  return (
    <div className="hidden xl:block fixed right-8 bottom-32 z-10 pointer-events-none w-72 ltr:right-8 rtl:left-8 rtl:right-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--surface-secondary)]/60 backdrop-blur-xl border border-[var(--color-primary)]/20 p-5 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center">
              <Icon size={20} />
            </div>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">{isEn ? srv.en.title : srv.ar.title}</h4>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">
            {isEn ? srv.en.desc : srv.ar.desc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const DataJourneyBackground = () => {
  return (
     <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-primary)] to-[var(--color-primary)]/5" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        
        <motion.div animate={{ y: [0, -30, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-3xl mix-blend-screen" />
        <motion.div animate={{ y: [0, 40, 0], opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl mix-blend-screen" />
        
        <div className="hidden lg:flex absolute left-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 opacity-20">
          <Database size={24} className="text-[var(--text-primary)]" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
          <Layers size={24} className="text-[var(--text-primary)]" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
          <BrainCircuit size={24} className="text-[var(--text-primary)]" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
          <ScanSearch size={24} className="text-[var(--text-primary)]" />
        </div>
        <div className="hidden lg:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col items-center gap-8 opacity-20">
          <Target size={24} className="text-[var(--text-primary)]" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
          <Rocket size={24} className="text-[var(--text-primary)]" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
          <LineChart size={24} className="text-[var(--text-primary)]" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--text-primary)] to-transparent" />
          <TrendingUp size={24} className="text-[var(--text-primary)]" />
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
    setFormData(prev => ({ ...prev, phone: \`\${code} \${cleanNumber}\` }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isWhatsAppOpened, setIsWhatsAppOpened] = useState(false);
  
  const dynamicFields = useMemo(() => {
    return dynamicStepsConfig[formData.type] || [];
  }, [formData.type]);

  const sections = useMemo(() => {
    const s = [
      { id: 'client_info', titleEn: 'Client Information', titleAr: 'معلومات العميل', descEn: 'Let\\'s get to know you better.', descAr: 'لنتعرف عليك بشكل أفضل.' },
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
    switch (sectionId) {
      case 'client_info':
        return (
          formData.name.trim().length > 1 &&
          formData.company.trim().length > 1 &&
          formData.phone.trim().length > 5 &&
          (
            formData.email.trim() === '' ||
            formData.email.trim().includes('@')
          )
        );
      case 'service':
        return formData.type !== '' && formData.description.trim().length > 10;
      case 'project_details':
        return dynamicFields.every(
          f => (formData.dynamicAnswers[f.id] || '').trim().length > 0
        );
      case 'identity_content':
        return true;
      case 'platforms':
        return true;
      case 'timeline':
        return (
          formData.budget !== '' &&
          formData.timeline !== '' &&
          formData.approval_response_time !== ''
        );
      case 'additional_notes':
        return true;
      case 'review':
        return agreedToTerms && !isSubmitting;
      default:
        return true;
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
      setSubmitError(isEn ? (result.message || 'Failed to submit. Please try again.') : (result.message || 'فشل الإرسال. يرجى المحاولة مرة أخرى.'));
    }
  };

  const handleWhatsAppClick = () => {
      setIsWhatsAppOpened(true);
      const serviceName = isEn 
          ? (projectTypes.find(t => t.value === formData.type)?.labelEn || formData.type)
          : (projectTypes.find(t => t.value === formData.type)?.labelAr || formData.type);
  
      const msgAr = \`مرحبًا فريق NomoLabs 👋\\n\\nقمت بإرسال طلب مشروع جديد عبر نموذج NomoLabs KYC وأرغب في تسريع المراجعة.\\n\\nرقم الطلب: \${submissionId}\\nالاسم: \${formData.name}\\nالشركة / المشروع: \${formData.company}\\nرقم الجوال: \${formData.phone}\\nالخدمة المطلوبة: \${serviceName}\\nالميزانية: \${formData.budget}\\nالمدة المتوقعة: \${formData.timeline}\\nوقت الاستجابة للموافقات: \${formData.approval_response_time}\\n\\nتم إرسال التفاصيل الكاملة وحفظها في نظام NomoLabs.\`;
      
      const msgEn = \`Hello NomoLabs Team 👋\\n\\nI have submitted a new project request via the NomoLabs KYC form and would like to fast-track the review.\\n\\nOrder Number: \${submissionId}\\nName: \${formData.name}\\nCompany / Project: \${formData.company}\\nPhone: \${formData.phone}\\nRequested Service: \${serviceName}\\nBudget: \${formData.budget}\\nExpected Timeline: \${formData.timeline}\\nApproval Response Time: \${formData.approval_response_time}\\n\\nFull details have been submitted and saved in the NomoLabs system.\`;
  
      const text = encodeURIComponent(isEn ? msgEn : msgAr);
      const waUrl = \`https://wa.me/\${NOMOLABS_WHATSAPP_NUMBER}?text=\${text}\`;
      window.open(waUrl, '_blank');
      
      setTimeout(() => {
          setIsWhatsAppOpened(false);
      }, 4000);
  };

  const percentage = Math.round(((stepIndex + 1) / sections.length) * 100);

  const getMotivationalText = (idx: number) => {
    if (idx === 0) return isEn ? "Started 👋" : "بدأنا 👋";
    if (idx === sections.length - 1) return isEn ? "Ready to submit ✓" : "جاهز للإرسال ✓";
    
    const textsEn = [
      "Started 👋",
      "Great! The picture is getting clearer.",
      "Awesome, we know your project better now.",
      "More than halfway there 🚀",
      "Almost there!",
      "Just a few details left.",
      "Ready to submit ✓"
    ];
    const textsAr = [
      "بدأنا 👋",
      "ممتاز، بدأت الصورة تتضح",
      "رائع، نعرف مشروعك أكثر الآن",
      "أكثر من نصف الطريق 🚀",
      "بقي القليل",
      "جاهزون تقريبًا",
      "جاهز للإرسال ✓"
    ];
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
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col font-sans relative z-10">
        <DataJourneyBackground />
        <ServicesTicker isEn={isEn} />
        
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-[var(--surface-secondary)]/80 backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-[var(--border-default)] shadow-[0_8px_32px_rgba(0,0,0,0.12)] relative z-10 text-center"
          >
            <div className="w-20 h-20 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-4">
              {isEn ? "Request Received Successfully ✓" : "تم استلام معلومات مشروعك بنجاح ✓"}
            </h1>
            <p className="text-lg text-[var(--text-muted)] mb-8 font-medium">
              {isEn ? "Your request has been saved and the NomoLabs team will review it and start the preparation steps." : "تم حفظ طلبك وسيقوم فريق NomoLabs بمراجعته وبدء خطوات التجهيز."}
            </p>
            <div className="bg-[var(--bg-primary)] p-5 rounded-2xl border border-[var(--border-default)] inline-flex flex-col items-center gap-2 mb-10 shadow-inner">
              <span className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">{isEn ? 'Order Number' : 'رقم الطلب'}</span>
              <span className="font-mono text-2xl font-black text-[var(--color-primary)]">{submissionId}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] rounded-xl font-bold shadow-sm hover:border-[var(--text-muted)] transition-colors w-full sm:w-auto"
              >
                {isEn ? 'Return Home' : 'العودة للرئيسية'}
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold shadow-lg hover:bg-[#20b858] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {isWhatsAppOpened ? (
                  isEn ? 'WhatsApp Opened ✓' : 'تم فتح واتساب ✓'
                ) : (
                  isEn ? 'Fast Review via WhatsApp' : 'تسريع المراجعة عبر واتساب'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'client_info':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Personal Details' : 'البيانات الشخصية'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Enter your name. Email is optional.' : 'أدخل اسمك الكريم، والبريد الإلكتروني اختياري.'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Full Name' : 'الاسم الكريم'}</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)]"
                    placeholder={isEn ? "John Doe" : "عبدالله محمد"}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Email (Optional)' : 'البريد الإلكتروني (اختياري)'}</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    dir="ltr"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all text-left shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)]"
                    placeholder={isEn ? "example@domain.com — Optional" : "example@domain.com — اختياري"}
                  />
                  <p className="text-xs font-medium text-[var(--text-muted)]">
                    {isEn
                      ? 'You can continue without entering an email address.'
                      : 'يمكنك المتابعة بدون إدخال البريد الإلكتروني.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">B</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Business Info' : 'بيانات العمل'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Company name and contact phone' : 'اسم الشركة أو المشروع ورقم الجوال'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Company / Project Name' : 'اسم الشركة / المشروع'}</label>
                  <input 
                    type="text" 
                    value={formData.company} 
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)]"
                    placeholder={isEn ? "NomoLabs" : "نمو لابز"}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-[var(--text-primary)]">{isEn ? 'Phone Number' : 'رقم الجوال'}</label>
                  <div className="flex" dir="ltr">
                    <select 
                      value={countryCode}
                      onChange={(e) => handlePhoneChange(e.target.value, phoneNumber)}
                      className="bg-[var(--surface-secondary)] border border-r-0 border-[var(--border-default)] rounded-l-xl px-3 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all shadow-sm min-w-[90px] font-medium focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] z-10"
                    >
                      {GCC_COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      value={phoneNumber} 
                      onChange={e => handlePhoneChange(countryCode, e.target.value)}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-r-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)]"
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
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Primary Service' : 'الخدمة الأساسية المطلوبة'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Select the main service you need' : 'اختر الخدمة الرئيسية التي تحتاجها'}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setFormData({...formData, type: t.value, dynamicAnswers: {}})}
                    className={\`text-start p-5 rounded-2xl border transition-all flex items-start gap-4 \${formData.type === t.value ? 'bg-[var(--bg-primary)] border-[var(--color-primary)] ring-1 ring-[var(--color-primary)] shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] hover:border-[var(--text-muted)]'}\`}
                  >
                    <div className={\`mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors \${formData.type === t.value ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'border-[var(--border-default)]'}\`}>
                      {formData.type === t.value && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <div className={\`font-black mb-1 \${formData.type === t.value ? 'text-[var(--color-primary)]' : 'text-[var(--text-primary)]'}\`}>{isEn ? t.labelEn : t.labelAr}</div>
                      <div className="text-sm font-medium text-[var(--text-muted)] leading-relaxed">{isEn ? t.descEn : t.descAr}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">B</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'General Description' : 'وصف عام للمشروع / الفكرة'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Tell us more about your project goals' : 'حدثنا أكثر عن أهداف مشروعك ورؤيتك'}</p>
                </div>
              </div>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full h-40 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
                placeholder={isEn ? "Tell us about your idea..." : "حدثنا عن فكرتك..."}
              />
            </div>
          </div>
        );

      case 'project_details':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Specific Details' : 'التفاصيل الدقيقة'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Help us understand the technical requirements' : 'يساعدنا هذا في فهم المتطلبات التقنية الدقيقة'}</p>
                </div>
              </div>
              <div className="space-y-8">
                {dynamicFields.map((field, idx) => (
                  <div key={field.id} className="space-y-3 group">
                    <label className="text-base font-bold text-[var(--text-primary)]">{isEn ? field.labelEn : field.labelAr}</label>
                    {field.type === 'textarea' ? (
                      <textarea 
                        value={formData.dynamicAnswers[field.id] || ''}
                        onChange={e => setFormData({...formData, dynamicAnswers: {...formData.dynamicAnswers, [field.id]: e.target.value}})}
                        className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
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
                              className={\`px-5 py-3 rounded-xl text-sm font-bold border transition-all flex items-center gap-2 \${isSelected ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}\`}
                            >
                              {isSelected && <Check size={16} strokeWidth={3} />}
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
                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl px-5 py-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
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
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Visual Identity & Content' : 'الهوية البصرية والمحتوى'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Do you have an existing logo or content?' : 'هل تمتلك هوية بصرية أو محتوى جاهز؟'}</p>
                </div>
              </div>
              <textarea 
                value={formData.content_information}
                onChange={e => setFormData({...formData, content_information: e.target.value})}
                className="w-full h-40 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
                placeholder={isEn ? "e.g., We have a logo and brand guidelines..." : "مثال: لدينا شعار وهوية بصرية كاملة، ونحتاج تصميم..."}
              />
            </div>
            
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">B</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Files & Attachments' : 'الملفات والمرفقات'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Provide any links to drive folders or references' : 'قم بتوفير روابط لملفات Google Drive أو مراجع'}</p>
                </div>
              </div>
              <textarea 
                value={formData.attachments_information}
                onChange={e => setFormData({...formData, attachments_information: e.target.value})}
                className="w-full h-32 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
                placeholder={isEn ? "Paste links here..." : "ضع الروابط هنا..."}
              />
            </div>
          </div>
        );

      case 'platforms':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Platforms & Accounts' : 'المنصات والحسابات'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'What are your target platforms or existing accounts?' : 'ما هي المنصات المستهدفة أو حساباتك الحالية؟'}</p>
                </div>
              </div>
              <textarea 
                value={formData.platform_information}
                onChange={e => setFormData({...formData, platform_information: e.target.value})}
                className="w-full h-40 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
                placeholder={isEn ? "e.g., Instagram, Twitter, TikTok..." : "مثال: انستقرام، تويتر، تيك توك..."}
              />
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Estimated Budget' : 'الميزانية المتوقعة'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Select your expected budget range' : 'اختر النطاق المتوقع للميزانية'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isEn ? budgetsEn : budgetsAr).map((b, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({...formData, budget: b})}
                    className={\`px-6 py-4 rounded-xl text-sm font-bold border transition-all flex items-center gap-3 \${formData.budget === b ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}\`}
                  >
                    {formData.budget === b && <Check size={16} strokeWidth={3} />}
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">B</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Expected Timeline' : 'الإطار الزمني المتوقع'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'When do you expect the project to be delivered?' : 'متى تتوقع استلام المشروع؟'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isEn ? timelinesEn : timelinesAr).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({...formData, timeline: t})}
                    className={\`px-6 py-4 rounded-xl text-sm font-bold border transition-all flex items-center gap-3 \${formData.timeline === t ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}\`}
                  >
                    {formData.timeline === t && <Check size={16} strokeWidth={3} />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm transition-all">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">C</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Approval Response Time' : 'وقت الاستجابة للموافقات'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'Expected time for approvals (hosting, domains, etc.)' : 'الوقت المتوقع لاعتماد بعض المتطلبات (استضافة، دومين، الخ)'}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {(isEn ? ['Immediately', 'Within hours', 'Same day', 'Next business day', 'More than a day'] : ['مباشرة', 'خلال ساعات', 'في نفس اليوم', 'يوم العمل التالي', 'أكثر من يوم']).map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFormData({...formData, approval_response_time: t})}
                    className={\`px-6 py-4 rounded-xl text-sm font-bold border transition-all flex items-center gap-3 \${formData.approval_response_time === t ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-md' : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]'}\`}
                  >
                    {formData.approval_response_time === t && <Check size={16} strokeWidth={3} />}
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
            <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] p-6 sm:p-8 rounded-3xl shadow-sm focus-within:ring-2 focus-within:ring-[var(--color-primary)]/20 transition-all relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-black">A</div>
                <div>
                  <h3 className="font-black text-xl text-[var(--text-primary)]">{isEn ? 'Any other notes?' : 'أية ملاحظات أخرى؟'}</h3>
                  <p className="text-sm font-medium text-[var(--text-muted)] mt-1">{isEn ? 'You can type or record your voice' : 'يمكنك التحدث مباشرة، وسنحوّل كلامك إلى نص لتسهيل إضافة ملاحظاتك.'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={startRecording}
                  className={\`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-colors \${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-[var(--bg-primary)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--color-primary)]'}\`}
                >
                  <Mic size={18} />
                  {isRecording ? (isEn ? 'Recording...' : 'جاري التسجيل...') : (isEn ? 'Voice Recording' : 'تسجيل صوتي')}
                </button>
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] font-bold">
                  <Type size={18} />
                  {isEn ? 'Text Input' : 'كتابة'}
                </div>
              </div>

              <textarea 
                value={formData.additional_notes}
                onChange={e => setFormData({...formData, additional_notes: e.target.value})}
                className="w-full h-48 bg-[var(--bg-primary)] border border-[var(--border-default)] rounded-xl p-5 text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-all resize-none shadow-sm focus:shadow-[0_0_0_4px_rgba(79,142,247,0.1)] text-base"
                placeholder={isEn ? "Add your notes here..." : "أضف ملاحظاتك هنا..."}
              />
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="space-y-6">
              {/* Client Info Summary */}
              <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 justify-between relative group shadow-sm transition-all">
                <div className="flex-1">
                  <h3 className="font-black text-xl text-[var(--color-primary)] mb-6">{isEn ? 'Client Information' : 'معلومات العميل'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Name' : 'الاسم'}</span><span className="font-medium text-[var(--text-primary)] text-base">{formData.name}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Company' : 'الشركة'}</span><span className="font-medium text-[var(--text-primary)] text-base">{formData.company}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Phone' : 'الجوال'}</span><span className="font-medium text-[var(--text-primary)] text-base" dir="ltr">{formData.phone}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Email' : 'البريد'}</span><span className="font-medium text-[var(--text-primary)] text-base">{formData.email || '-'}</span></div>
                  </div>
                </div>
                <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'client_info'))} className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-all rtl:mr-auto ltr:ml-auto">
                  <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                </button>
              </div>

              {/* Service Summary */}
              <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 justify-between relative group shadow-sm transition-all">
                <div className="flex-1">
                  <h3 className="font-black text-xl text-[var(--color-primary)] mb-6">{isEn ? 'Project & Service' : 'المشروع والخدمة'}</h3>
                  <div className="space-y-6 text-sm">
                    <div>
                      <span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Service Type' : 'نوع الخدمة'}</span>
                      <span className="font-medium text-[var(--text-primary)] text-base">{isEn ? projectTypes.find(t => t.value === formData.type)?.labelEn : projectTypes.find(t => t.value === formData.type)?.labelAr}</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'General Description' : 'الوصف العام'}</span>
                      <span className="font-medium text-[var(--text-primary)] text-base whitespace-pre-wrap">{formData.description}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'service'))} className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-all rtl:mr-auto ltr:ml-auto">
                  <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                </button>
              </div>

              {/* Project Details Summary */}
              {dynamicFields.length > 0 && (
                <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 justify-between relative group shadow-sm transition-all">
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-[var(--color-primary)] mb-6">{isEn ? 'Project Details' : 'تفاصيل المشروع'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                      {dynamicFields.map(f => (
                        <div key={f.id}>
                          <span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? f.labelEn : f.labelAr}</span>
                          <span className="font-medium text-[var(--text-primary)] text-base line-clamp-3">{formData.dynamicAnswers[f.id] || '-'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'project_details'))} className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-all rtl:mr-auto ltr:ml-auto">
                    <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                  </button>
                </div>
              )}

              {/* Identity & Content Summary */}
              {(formData.content_information || formData.attachments_information) && (
                <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 justify-between relative group shadow-sm transition-all">
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-[var(--color-primary)] mb-6">{isEn ? 'Identity & Content' : 'الهوية والمحتوى'}</h3>
                    <div className="space-y-6 text-sm">
                      {formData.content_information && (
                        <div>
                          <span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Content Info' : 'معلومات المحتوى'}</span>
                          <span className="font-medium text-[var(--text-primary)] text-base whitespace-pre-wrap">{formData.content_information}</span>
                        </div>
                      )}
                      {formData.attachments_information && (
                        <div>
                          <span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Attachments' : 'المرفقات'}</span>
                          <span className="font-medium text-[var(--text-primary)] text-base whitespace-pre-wrap">{formData.attachments_information}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'identity_content'))} className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-all rtl:mr-auto ltr:ml-auto">
                    <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                  </button>
                </div>
              )}

              {/* Timeline Summary */}
              <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 justify-between relative group shadow-sm transition-all">
                <div className="flex-1">
                  <h3 className="font-black text-xl text-[var(--color-primary)] mb-6">{isEn ? 'Timeline & Approvals' : 'الجدول الزمني والموافقات'}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Budget' : 'الميزانية'}</span><span className="font-medium text-[var(--text-primary)] text-base">{formData.budget}</span></div>
                    <div><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Timeline' : 'المدة المطلوبة'}</span><span className="font-medium text-[var(--text-primary)] text-base">{formData.timeline}</span></div>
                    <div className="sm:col-span-2"><span className="block text-[var(--text-muted)] text-xs mb-2 font-bold uppercase tracking-wider">{isEn ? 'Approval Time' : 'وقت الاستجابة للموافقات'}</span><span className="font-medium text-[var(--text-primary)] text-base">{formData.approval_response_time}</span></div>
                  </div>
                </div>
                <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'timeline'))} className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-all rtl:mr-auto ltr:ml-auto">
                  <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                </button>
              </div>
              
              {/* Additional Notes Summary */}
              {formData.additional_notes && (
                <div className="bg-[var(--surface-secondary)]/80 backdrop-blur-xl border border-[var(--border-default)] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-6 justify-between relative group shadow-sm transition-all">
                  <div className="flex-1">
                    <h3 className="font-black text-xl text-[var(--color-primary)] mb-6">{isEn ? 'Additional Notes' : 'ملاحظات إضافية'}</h3>
                    <div className="text-sm">
                      <span className="font-medium text-[var(--text-primary)] text-base whitespace-pre-wrap">{formData.additional_notes}</span>
                    </div>
                  </div>
                  <button onClick={() => setStepIndex(sections.findIndex(s => s.id === 'additional_notes'))} className="mt-4 sm:mt-0 px-4 py-2 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-default)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] flex items-center gap-2 transition-all rtl:mr-auto ltr:ml-auto">
                    <Edit2 size={16} /> {isEn ? 'Edit' : 'تعديل'}
                  </button>
                </div>
              )}
            </div>

            <div 
              className="mt-8 p-6 bg-[var(--surface-secondary)]/80 backdrop-blur-xl rounded-2xl border border-[var(--border-default)] flex items-center gap-4 cursor-pointer hover:bg-[var(--surface-secondary)] transition-all group shadow-sm" 
              onClick={() => setAgreedToTerms(!agreedToTerms)}
            >
              <div className={\`shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all \${agreedToTerms ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(79,142,247,0.4)]' : 'border-[var(--border-default)] bg-[var(--bg-primary)] group-hover:border-[var(--color-primary)]'}\`}>
                {agreedToTerms && <Check size={18} strokeWidth={3} />}
              </div>
              <p className="text-base font-bold text-[var(--text-primary)]">
                {isEn ? "I confirm the information is correct and I agree to use it to prepare and execute the project." : "أؤكد صحة المعلومات وأوافق على استخدامها لتجهيز وتنفيذ المشروع."}
              </p>
            </div>

            {submitError && (
              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 mt-6 shadow-sm">
                <AlertCircle size={24} />
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
      <DataJourneyBackground />
      <ServicesTicker isEn={isEn} />
      <FloatingServiceSpotlight isEn={isEn} />
      
      {/* Enhanced Progress Area */}
      <div className="sticky top-0 z-20 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-black text-2xl text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles size={24} className="text-[var(--color-primary)]" />
              NomoLabs Discovery
            </h1>
            <div className="text-right">
              <div className="text-xl font-black text-[var(--color-primary)]">{percentage}%</div>
              <div className="text-xs font-bold text-[var(--text-muted)] mt-1">{getMotivationalText(stepIndex)}</div>
            </div>
          </div>
          
          <div className="h-2.5 w-full bg-[var(--surface-secondary)] rounded-full overflow-hidden relative shadow-inner">
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-[var(--color-primary)] rounded-full ltr:left-0 rtl:right-0 rtl:left-auto"
              initial={{ width: 0 }}
              animate={{ width: \`\${percentage}%\` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 bottom-0 left-0 bg-white/30 rounded-full ltr:left-0 rtl:right-0 rtl:left-auto"
              initial={{ width: 0 }}
              animate={{ width: \`\${percentage}%\` }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.1 }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-10 pb-40 px-4 sm:px-6 scroll-smooth">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          
          {/* Section Header */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={\`header-\${currentSection}\`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="mb-10 text-center sm:text-start"
            >
              <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] mb-3 tracking-tight">
                {isEn ? sections[stepIndex].titleEn : sections[stepIndex].titleAr}
              </h2>
              <p className="text-lg text-[var(--text-muted)] font-bold">
                {isEn ? sections[stepIndex].descEn : sections[stepIndex].descAr}
              </p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {renderSectionContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 bg-[var(--surface-secondary)]/50 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-[var(--border-default)] shadow-sm">
            <button 
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className={\`w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-black px-8 py-4 rounded-xl transition-all \${stepIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border-default)] hover:border-[var(--text-muted)] shadow-sm'}\`}
            >
              {isEn ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              {isEn ? 'Back' : 'السابق'}
            </button>

            {currentSection !== 'review' ? (
              <button 
                onClick={handleNext}
                disabled={!validateSection(currentSection)}
                className={\`w-full sm:w-auto flex items-center justify-center gap-2 text-base font-black px-10 py-4 rounded-xl transition-all min-w-[180px] \${validateSection(currentSection) ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_20px_rgba(79,142,247,0.4)] hover:shadow-[0_4px_25px_rgba(79,142,247,0.5)] hover:scale-[1.02]' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'}\`}
              >
                {isEn ? 'Next Step' : 'الخطوة التالية'}
                {isEn ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={!validateSection('review') || isSubmitting}
                className={\`w-full sm:w-auto flex items-center justify-center gap-3 text-base font-black px-10 py-4 rounded-xl transition-all min-w-[200px] \${validateSection('review') && !isSubmitting ? 'bg-[var(--color-primary)] text-white shadow-[0_4px_25px_rgba(79,142,247,0.4)] hover:scale-[1.02]' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-default)]'}\`}
              >
                {isSubmitting ? (isEn ? 'Submitting...' : 'جاري الإرسال...') : (isEn ? 'Submit Request' : 'إرسال الطلب')}
                {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Check size={20} strokeWidth={3} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
`;

fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);