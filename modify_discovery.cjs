const fs = require('fs');

let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

// 1. Add state variables inside DiscoveryPortal component
const componentStart = code.indexOf('export const DiscoveryPortal = () => {');
if (componentStart === -1) {
    console.error('Cannot find component start');
    process.exit(1);
}

const stateInsertionPoint = code.indexOf('const [isSubmitting, setIsSubmitting] = useState(false);', componentStart);

code = code.substring(0, stateInsertionPoint) + 
`  const [backendStatusText, setBackendStatusText] = useState('');
  const [fullWaMessage, setFullWaMessage] = useState('');
  const [isWhatsAppOpened, setIsWhatsAppOpened] = useState(false);
` + code.substring(stateInsertionPoint);

// 2. Replace handleSubmit
const handleSubmitStart = code.indexOf('const handleSubmit = async () => {');
const getMotivationalTextStart = code.indexOf('const getMotivationalText = (idx: number) => {');

const newHandleSubmit = `  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    const sub_id = "NML-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const payload: KYCSubmissionPayload = {
      submission_id: sub_id,
      submitted_at: new Date().toISOString(),
      language: config.language,
      completion_percentage: 100,
      primary_service:
        projectTypes.find((t) => t.value === formData.type)?.labelEn ||
        formData.type,
      selected_subservices: dynamicFields
        .map((f) => (isEn ? f.labelEn : f.labelAr))
        .join(", "),
      client_information: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
      business_information: {
        company: formData.company,
      },
      project_information: {
        description: formData.description,
        budget: formData.budget,
        timeline: formData.timeline,
      },
      platform_information: formData.platform_information,
      content_information: formData.content_information,
      attachments_information: formData.attachments_information,
      approval_response_time: formData.approval_response_time,
      answers: {
        ...formData.dynamicAnswers,
        additional_notes: formData.additional_notes,
      },
    };

    let result = { success: false, submission_id: '', row_number: null, message: '' };
    try {
      result = await submitKYCForm(payload);
    } catch (e: any) {
      result = { success: false, submission_id: '', row_number: null, message: e.message };
    }

    setIsSubmitting(false);

    const isBackendSuccess = result.success === true;
    const backendStatusMsg = isBackendSuccess 
        ? "✅ RESPONDED / SAVED" 
        : "⚠️ NOT RESPONDED\\nAction Required: مراجعة الطلب وإدخاله يدويًا عند الحاجة.";
        
    setBackendStatusText(backendStatusMsg);
    setSubmissionId(result.submission_id || sub_id);
    
    // Build WhatsApp message
    const date = new Date();
    const dateStr = date.toLocaleDateString('en-GB');
    const timeStr = date.toLocaleTimeString('en-US', { hour12: false });
    
    const serviceName = isEn 
        ? (projectTypes.find(t => t.value === payload.primary_service)?.labelEn || payload.primary_service)
        : (projectTypes.find(t => t.value === payload.primary_service)?.labelAr || payload.primary_service);

    let msg = \`🔵 طلب KYC جديد — NMOLABS\\n\\n\`;
    msg += \`⚙️ حالة النظام:\\nBackend: \${backendStatusMsg}\\n\\n\`;
    msg += \`━━━━━━━━━━━━━━━━━━\\n\\n\`;
    msg += \`👤 بيانات العميل\\n\\n\`;
    msg += \`الاسم:\\n\${payload.client_information.name}\\n\\n\`;
    msg += \`رقم الجوال:\\n\${payload.client_information.phone}\\n\\n\`;
    msg += \`البريد الإلكتروني:\\n\${payload.client_information.email || 'لم يتم الإدخال'}\\n\\n\`;
    msg += \`اسم المؤسسة / الشركة:\\n\${payload.business_information.company}\\n\\n\`;
    
    msg += \`━━━━━━━━━━━━━━━━━━\\n\\n\`;
    msg += \`📋 تفاصيل الطلب\\n\\n\`;
    msg += \`الخدمة الرئيسية:\\n\${serviceName}\\n\\n\`;
    
    if (payload.selected_subservices) {
      msg += \`الخدمات الفرعية:\\n\${payload.selected_subservices}\\n\\n\`;
    }
    
    if (payload.project_information.description) {
      msg += \`وصف المشروع:\\n\${payload.project_information.description}\\n\\n\`;
    }
    if (payload.project_information.budget) {
      msg += \`الميزانية:\\n\${payload.project_information.budget}\\n\\n\`;
    }
    if (payload.project_information.timeline) {
      msg += \`الإطار الزمني:\\n\${payload.project_information.timeline}\\n\\n\`;
    }
    if (payload.approval_response_time) {
      msg += \`وقت الاستجابة للموافقات:\\n\${payload.approval_response_time}\\n\\n\`;
    }
    if (payload.platform_information) {
      msg += \`المنصات والحسابات:\\n\${payload.platform_information}\\n\\n\`;
    }
    if (payload.content_information) {
      msg += \`الهوية والمحتوى:\\n\${payload.content_information}\\n\\n\`;
    }
    if (payload.attachments_information) {
      msg += \`المرفقات والروابط:\\n\${payload.attachments_information}\\n\\n\`;
    }
    
    // Dynamic answers
    const dynamicKeys = Object.keys(payload.answers).filter(k => k !== 'additional_notes');
    if (dynamicKeys.length > 0) {
       msg += \`تفاصيل إضافية:\\n\`;
       dynamicKeys.forEach(k => {
          let label = k;
          for (const type in dynamicStepsConfig) {
             const field = dynamicStepsConfig[type].find(f => f.id === k);
             if (field) {
               label = isEn ? field.labelEn : field.labelAr;
               break;
             }
          }
          msg += \`- \${label}:\\n  \${payload.answers[k]}\\n\\n\`;
       });
    }

    if (payload.answers.additional_notes) {
      msg += \`ملاحظات إضافية:\\n\${payload.answers.additional_notes}\\n\\n\`;
    }

    msg += \`━━━━━━━━━━━━━━━━━━\\n\\n\`;
    msg += \`🕐 بيانات الطلب\\n\\n\`;
    msg += \`تاريخ الإرسال:\\n\${dateStr}\\n\\n\`;
    msg += \`وقت الإرسال:\\n\${timeStr}\\n\\n\`;
    msg += \`Request ID:\\n\${result.submission_id || sub_id}\\n\`;

    setFullWaMessage(msg);
    setSubmitSuccess(true);
    localStorage.removeItem("nomoDiscoveryProgress_v3");
    localStorage.removeItem("nomoDiscoveryStep_v3");

    const NOMOLABS_WHATSAPP_NUMBER = 'PUT_NUMBER_HERE';
    const waUrl = \`https://wa.me/\${NOMOLABS_WHATSAPP_NUMBER}?text=\${encodeURIComponent(msg)}\`;
    setTimeout(() => {
        window.open(waUrl, '_blank');
    }, 500);
  };

  const handleWhatsAppClick = () => {
    setIsWhatsAppOpened(true);
    const NOMOLABS_WHATSAPP_NUMBER = 'PUT_NUMBER_HERE';
    const waUrl = \`https://wa.me/\${NOMOLABS_WHATSAPP_NUMBER}?text=\${encodeURIComponent(fullWaMessage)}\`;
    window.open(waUrl, '_blank');
    
    setTimeout(() => {
        setIsWhatsAppOpened(false);
    }, 4000);
  };

`;

code = code.substring(0, handleSubmitStart) + newHandleSubmit + code.substring(getMotivationalTextStart);

// 3. Update the Success Screen
const successScreenStart = code.indexOf('if (submitSuccess) {');
const successScreenEnd = code.indexOf('const renderSectionContent = () => {', successScreenStart);

const newSuccessScreen = `  if (submitSuccess) {
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
            {isEn
              ? "Request Received Successfully ✓"
              : "تم استلام معلومات مشروعك بنجاح ✓"}
          </h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            {isEn
              ? "Your request has been saved and the NomoLabs team will review it and start the preparation steps."
              : "تم حفظ طلبك وسيقوم فريق NomoLabs بمراجعته وبدء خطوات التجهيز."}
          </p>
          <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-default)] inline-flex flex-col items-center gap-1 mb-8">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              {isEn ? "Order Number" : "رقم الطلب"}
            </span>
            <span className="font-mono text-xl font-bold text-[var(--color-primary)]">
              {submissionId}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] rounded-xl font-bold shadow-sm hover:border-[var(--text-muted)] transition-colors w-full sm:w-auto"
            >
              {isEn ? "Return Home" : "العودة للرئيسية"}
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-3 bg-[#25D366] text-white rounded-xl font-bold shadow-lg hover:bg-[#20b858] transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
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
    );
  }

  `;

code = code.substring(0, successScreenStart) + newSuccessScreen + code.substring(successScreenEnd);

fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
console.log('Modified successfully.');
