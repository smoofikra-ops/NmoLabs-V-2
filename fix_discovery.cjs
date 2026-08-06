const fs = require('fs');
let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

// Imports
code = code.replace(
  /import \{ projectTypes/,
  `import { submitKYCForm, KYCSubmissionPayload } from '../services/kycSubmissionService';\nimport { projectTypes`
);

// lucide-react imports
code = code.replace(
  /RefreshCw, Save \} from 'lucide-react';/,
  `RefreshCw, Save, Clock, Download, AlertCircle, Loader2 } from 'lucide-react';`
);

// Initial state
code = code.replace(
  /dynamicAnswers: \{\}\n    \};\n  \}\);/,
  `dynamicAnswers: {},\n      approval_response_time: ''\n    };\n  });`
);

// additional state
code = code.replace(
  /const \[stepIndex, setStepIndex\] = useState/,
  `const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [stepIndex, setStepIndex] = useState`
);

// stepsList
code = code.replace(
  /const baseFinal = \['description', 'budget', 'timeline', 'review'\];/,
  `const baseFinal = ['description', 'budget', 'timeline', 'approval_response_time', 'review'];`
);

// canProceed
code = code.replace(
  /case 'timeline': return formData.timeline !== '';\n      case 'review': return true;/,
  `case 'timeline': return formData.timeline !== '';
      case 'approval_response_time': return formData.approval_response_time !== '';
      case 'review': return agreedToTerms && !isSubmitting;`
);

// completionPercentage
code = code.replace(
  /if \(formData.timeline\) filled\+\+;\n    \n    dynamicFields/,
  `if (formData.timeline) filled++;
    if (formData.approval_response_time) filled++;
    
    dynamicFields`
);

// approval response time component string
const approvalStep = `
            {/* Approval Response Time */}
            {currentStep === 'approval_response_time' && (
              <motion.div 
                key="approval_response_time"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-[var(--color-primary)] mb-6">
                  <Clock size={24} />
                  <span className="font-bold tracking-widest text-sm uppercase">{isEn ? 'Response Time' : 'وقت الاستجابة'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)] leading-tight mb-2">
                  {isEn ? "When needing your approval to purchase a domain, hosting, theme, or subscription, what is the expected time to get your approval?" : "عند احتياج موافقتك على شراء دومين أو استضافة أو ثيم أو اشتراك، ما المدة المتوقعة للحصول على الموافقة؟"}
                </h2>
                <p className="text-[var(--text-muted)] mb-8">
                  {isEn ? "This helps us set a realistic timeline and avoid work pauses during execution." : "يساعدنا ذلك على وضع جدول زمني واقعي وتجنب توقف العمل أثناء التنفيذ."}
                </p>
                <div className="flex flex-wrap gap-3">
                  {(isEn ? ['Immediately', 'Within hours', 'Same day', 'Next business day', 'More than a day'] : ['مباشرة', 'خلال ساعات', 'في نفس اليوم', 'يوم العمل التالي', 'أكثر من يوم']).map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFormData({ ...formData, approval_response_time: t });
                        setTimeout(handleNext, 400);
                      }}
                      className={\`px-5 py-3 rounded-full text-sm font-medium border transition-all \${
                        formData.approval_response_time === t 
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
`;

code = code.replace(
  /\{\/\* Review Page \*\/\}/,
  approvalStep + "\n\n            {/* Review Page */}"
);

// Review page elements - Agreement checkbox
const reviewMod = `
      {/* Terms Agreement */}
      <div className="mt-8 p-4 bg-[var(--surface-secondary)] rounded-xl border border-[var(--border-default)] flex items-start gap-4 cursor-pointer" onClick={() => setAgreedToTerms(!agreedToTerms)}>
        <div className={\`mt-1 w-6 h-6 rounded-md border flex items-center justify-center transition-colors \${agreedToTerms ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'border-[var(--border-default)]'}\`}>
          {agreedToTerms && <Check size={16} />}
        </div>
        <p className="text-sm text-[var(--text-primary)]">
          {isEn ? "I confirm the information is correct and I agree to use it to prepare and execute the project." : "أؤكد صحة المعلومات وأوافق على استخدامها لتجهيز وتنفيذ المشروع."}
        </p>
      </div>

      {submitError && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{submitError}</p>
        </div>
      )}
`;

code = code.replace(
  /<\/div>\n    <\/motion\.div>/,
  reviewMod + "\n      </div>\n    </motion.div>"
);

// Handle Submit logic
const submitLogic = `
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const sub_id = 'NML-' + Math.random().toString(36).substring(2, 9).toUpperCase();

    const payload: KYCSubmissionPayload = {
      submission_id: sub_id,
      submitted_at: new Date().toISOString(),
      language: config.language,
      completion_percentage: completionPercentage,
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
      platform_information: '',
      content_information: '',
      attachments_information: '',
      approval_response_time: formData.approval_response_time,
      answers: formData.dynamicAnswers
    };

    const result = await submitKYCForm(payload);
    setIsSubmitting(false);

    if (result.success) {
      setSubmissionId(result.submission_id || sub_id);
      setSubmitSuccess(true);
      localStorage.removeItem('nomoDiscoveryProgress');
      localStorage.removeItem('nomoDiscoveryStep');
    } else {
      setSubmitError(isEn ? (result.message || 'Failed to submit. Please try again.') : 'فشل الإرسال. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "nomolabs-discovery.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
`;

code = code.replace(
  /const handleKeyDown = \(e\)/,
  submitLogic + "\n\n  const handleKeyDown = (e)"
);

// Update review submission button logic
code = code.replace(
  /onClick=\{\(\) => \{\n                    const dynamicText[\s\S]*?\}                   \}/,
  `onClick={handleSubmit}`
);

// Add loading to submit button
code = code.replace(
  /\{isEn \? 'Submit Request' : 'إرسال الطلب'\}/,
  `{isSubmitting ? (isEn ? 'Submitting...' : 'جاري الإرسال...') : (isEn ? 'Submit Request' : 'إرسال الطلب')}`
);

code = code.replace(
  /<Check size=\{16\} \/>\n                <\/button>\n              \)\}/,
  `{isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}\n                </button>\n              )}`
);

// Success Screen handling
const successScreen = `
  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center font-sans px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-[var(--surface-secondary)] p-8 sm:p-12 rounded-3xl border border-[var(--border-default)] text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] mb-4">
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
            <button 
              onClick={handleDownload}
              className="px-8 py-3 bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] rounded-full font-bold hover:bg-[var(--bg-primary)] transition-colors flex items-center gap-2"
            >
              <Download size={18} />
              {isEn ? 'Download a copy' : 'تحميل نسخة'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
`;

code = code.replace(
  /return \(\n    <div className="min-h-screen/,
  successScreen + "\n  return (\n    <div className=\"min-h-screen"
);


fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
