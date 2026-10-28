import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Loader2,
  Mail,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import { getWhatsAppUrl } from "../lib/utils";
import {
  KYCSubmissionPayload,
  submitKYCForm,
} from "../services/kycSubmissionService";
import { projectTypes } from "../data/projectIntake";
import { useSite } from "../context/SiteContext";

type GoalOption = {
  id: string;
  ar: string;
  en: string;
};

type SmartGoalMap = Record<string, GoalOption[]>;

const GCC_COUNTRIES = [
  { code: "+966", nameAr: "السعودية", nameEn: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+971", nameAr: "الإمارات", nameEn: "UAE", flag: "🇦🇪" },
  { code: "+965", nameAr: "الكويت", nameEn: "Kuwait", flag: "🇰🇼" },
  { code: "+974", nameAr: "قطر", nameEn: "Qatar", flag: "🇶🇦" },
  { code: "+973", nameAr: "البحرين", nameEn: "Bahrain", flag: "🇧🇭" },
  { code: "+968", nameAr: "عمان", nameEn: "Oman", flag: "🇴🇲" },
];

const SMART_GOALS: SmartGoalMap = {
  website: [
    { id: "professional-presence", ar: "إطلاق حضور رقمي احترافي", en: "Launch a professional digital presence" },
    { id: "lead-generation", ar: "زيادة طلبات التواصل والعملاء", en: "Generate more leads and enquiries" },
    { id: "service-clarity", ar: "عرض الخدمات بشكل أوضح", en: "Present services more clearly" },
    { id: "seo", ar: "تحسين الظهور في محركات البحث", en: "Improve search visibility" },
  ],
  ecommerce: [
    { id: "launch-store", ar: "إطلاق متجر جديد", en: "Launch a new store" },
    { id: "increase-sales", ar: "زيادة المبيعات والتحويل", en: "Increase sales and conversion" },
    { id: "checkout-ux", ar: "تحسين تجربة الشراء", en: "Improve the buying experience" },
    { id: "payments-shipping", ar: "ربط الدفع والشحن والتشغيل", en: "Connect payments, shipping and operations" },
  ],
  "custom-system": [
    { id: "automation", ar: "أتمتة العمليات الداخلية", en: "Automate internal operations" },
    { id: "dashboard", ar: "لوحة تحكم مركزية", en: "Build a central dashboard" },
    { id: "crm-workflow", ar: "إدارة العملاء والمهام", en: "Manage customers and workflows" },
    { id: "reports-permissions", ar: "تقارير وصلاحيات متقدمة", en: "Advanced reports and permissions" },
  ],
  "accounting-system": [
    { id: "sales-purchases", ar: "تنظيم المبيعات والمشتريات", en: "Organize sales and purchases" },
    { id: "inventory", ar: "إدارة المخزون", en: "Manage inventory" },
    { id: "financial-reports", ar: "تقارير مالية وإدارية", en: "Financial and management reporting" },
    { id: "multi-branch", ar: "ربط الفروع والعمليات", en: "Connect branches and operations" },
  ],
  "ai-automation": [
    { id: "task-automation", ar: "أتمتة المهام المتكررة", en: "Automate repetitive tasks" },
    { id: "ai-assistant", ar: "مساعد ذكي للموظفين أو العملاء", en: "AI assistant for staff or customers" },
    { id: "data-analysis", ar: "تحليل البيانات واستخراج الرؤى", en: "Analyze data and extract insights" },
    { id: "system-integration", ar: "ربط الأنظمة بالذكاء الاصطناعي", en: "Connect systems with AI" },
  ],
  marketing: [
    { id: "sales-growth", ar: "زيادة المبيعات والعملاء", en: "Increase sales and customers" },
    { id: "brand-awareness", ar: "رفع الوعي بالعلامة التجارية", en: "Grow brand awareness" },
    { id: "ads-performance", ar: "تحسين أداء الإعلانات", en: "Improve advertising performance" },
    { id: "seo-content", ar: "SEO والمحتوى والنمو العضوي", en: "SEO, content and organic growth" },
  ],
  "catalog-profile": [
    { id: "company-profile", ar: "ملف شركة احترافي", en: "Professional company profile" },
    { id: "product-catalog", ar: "كتالوج منتجات", en: "Product catalog" },
    { id: "service-presentation", ar: "عرض خدمات واضح ومقنع", en: "Clear service presentation" },
    { id: "portfolio", ar: "Portfolio للأعمال والمشاريع", en: "Portfolio for work and projects" },
  ],
  "audit-improvement": [
    { id: "conversion", ar: "رفع معدل التحويل", en: "Improve conversion rate" },
    { id: "performance", ar: "تحسين السرعة والأداء", en: "Improve speed and performance" },
    { id: "ux-ui", ar: "تحسين تجربة وواجهة المستخدم", en: "Improve UX and UI" },
    { id: "full-audit", ar: "تحليل تقني وتسويقي شامل", en: "Full technical and marketing audit" },
  ],
  consultation: [
    { id: "find-solution", ar: "تحديد الحل المناسب", en: "Identify the right solution" },
    { id: "priorities", ar: "ترتيب الأولويات", en: "Prioritize the work" },
    { id: "scope-budget", ar: "تحديد النطاق والتكلفة المتوقعة", en: "Define scope and expected budget" },
    { id: "roadmap", ar: "بناء خارطة تنفيذ", en: "Build an execution roadmap" },
  ],
  "integrated-project": [
    { id: "build", ar: "بناء المنتج أو المنصة", en: "Build the product or platform" },
    { id: "growth", ar: "التسويق والنمو", en: "Marketing and growth" },
    { id: "operations", ar: "التشغيل والأتمتة", en: "Operations and automation" },
    { id: "end-to-end", ar: "حل متكامل من البداية للنهاية", en: "End-to-end integrated solution" },
  ],
  "events-management": [
    { id: "coverage", ar: "التغطية والتوثيق", en: "Event coverage and documentation" },
    { id: "live-stream", ar: "البث المباشر", en: "Live streaming" },
    { id: "production", ar: "التصوير والمونتاج", en: "Photography and video production" },
    { id: "event-content", ar: "إدارة محتوى الفعالية", en: "Event content management" },
  ],
  other: [
    { id: "custom-solution", ar: "أحتاج حلًا مخصصًا", en: "I need a custom solution" },
    { id: "improve-existing", ar: "أحتاج تطوير مشروع قائم", en: "I need to improve an existing project" },
    { id: "combined-services", ar: "أحتاج ربط عدة خدمات", en: "I need multiple connected services" },
    { id: "not-sure", ar: "لست متأكدًا وأحتاج توجيهًا", en: "I am not sure and need guidance" },
  ],
};

const DEFAULT_GOALS: GoalOption[] = [
  { id: "growth", ar: "تحقيق نمو واضح", en: "Achieve measurable growth" },
  { id: "efficiency", ar: "رفع الكفاءة وتقليل العمل اليدوي", en: "Improve efficiency and reduce manual work" },
  { id: "experience", ar: "تحسين تجربة العميل", en: "Improve customer experience" },
  { id: "clarity", ar: "تحديد الحل المناسب", en: "Identify the right solution" },
];

type LiteFormData = {
  type: string;
  goals: string[];
  name: string;
  company: string;
  phone: string;
  email: string;
};

const STORAGE_KEY = "nmolabsSmartKycLite_v1";
const STEP_KEY = "nmolabsSmartKycLiteStep_v1";

export const DiscoveryPortal = () => {
  const { config } = useSite();
  const isEn = config.language === "en";

  const [formData, setFormData] = useState<LiteFormData>(() => {
    const fallback: LiteFormData = {
      type: "",
      goals: [],
      name: "",
      company: "",
      phone: "",
      email: "",
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...fallback, ...JSON.parse(saved) } : fallback;
    } catch {
      return fallback;
    }
  });

  const [stepIndex, setStepIndex] = useState(() => {
    const saved = Number(localStorage.getItem(STEP_KEY) || "0");
    return Number.isFinite(saved) && saved >= 0 && saved <= 2 ? saved : 0;
  });

  const [countryCode, setCountryCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [backendSaved, setBackendSaved] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [whatsAppMessage, setWhatsAppMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      localStorage.setItem(STEP_KEY, String(stepIndex));
    } catch {
      // Ignore storage failures and keep the form usable.
    }
  }, [formData, stepIndex]);

  useEffect(() => {
    const value = formData.phone.trim();
    if (!value) return;

    const matchedCountry = GCC_COUNTRIES.find((country) =>
      value.startsWith(country.code),
    );

    if (matchedCountry) {
      setCountryCode(matchedCountry.code);
      setPhoneNumber(value.replace(matchedCountry.code, "").trim());
    } else {
      setPhoneNumber(value);
    }
  }, []);

  const selectedService = useMemo(
    () => projectTypes.find((item) => item.value === formData.type),
    [formData.type],
  );

  const goalOptions = useMemo(
    () => SMART_GOALS[formData.type] || DEFAULT_GOALS,
    [formData.type],
  );

  const selectedGoalOptions = useMemo(
    () => goalOptions.filter((goal) => formData.goals.includes(goal.id)),
    [goalOptions, formData.goals],
  );

  const steps = [
    {
      id: "service",
      titleAr: "وش تحتاج من نمو لابز؟",
      titleEn: "What do you need from NomoLabs?",
      descAr: "اختر الخدمة الأقرب لاحتياجك. نقدر نضبط التفاصيل بعد التواصل.",
      descEn: "Choose the service closest to your need. We can refine the details later.",
    },
    {
      id: "goals",
      titleAr: "وش الهدف الأهم لك؟",
      titleEn: "What matters most to you?",
      descAr: "اختر من هدف واحد إلى ثلاثة أهداف. الخيارات تتغير حسب الخدمة.",
      descEn: "Choose one to three goals. Options adapt to the selected service.",
    },
    {
      id: "contact",
      titleAr: "خلّنا نتواصل معك",
      titleEn: "How can we reach you?",
      descAr: "بيانات بسيطة فقط عشان نراجع الطلب ونتواصل معك.",
      descEn: "Just the essentials so we can review your request and contact you.",
    },
  ];

  const handlePhoneChange = (code: string, number: string) => {
    setCountryCode(code);
    let cleanNumber = number.replace(/[^0-9]/g, "");
    if (code === "+966" && cleanNumber.startsWith("0")) {
      cleanNumber = cleanNumber.substring(1);
    }

    setPhoneNumber(cleanNumber);
    setFormData((current) => ({
      ...current,
      phone: cleanNumber ? code + " " + cleanNumber : "",
    }));
  };

  const selectService = (type: string) => {
    setFormData((current) => ({
      ...current,
      type,
      goals: current.type === type ? current.goals : [],
    }));
  };

  const toggleGoal = (goalId: string) => {
    setFormData((current) => {
      const selected = current.goals.includes(goalId);

      if (selected) {
        return {
          ...current,
          goals: current.goals.filter((item) => item !== goalId),
        };
      }

      if (current.goals.length >= 3) {
        return current;
      }

      return {
        ...current,
        goals: [...current.goals, goalId],
      };
    });
  };

  const isStepValid = (index: number) => {
    if (index === 0) return Boolean(formData.type);
    if (index === 1) return formData.goals.length > 0;
    return (
      formData.name.trim().length > 1 &&
      formData.phone.trim().length > 5 &&
      (formData.email.trim() === "" || formData.email.includes("@")) &&
      agreedToTerms
    );
  };

  const goNext = () => {
    if (!isStepValid(stepIndex) || stepIndex >= 2) return;
    setStepIndex((current) => current + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (stepIndex <= 0) return;
    setStepIndex((current) => current - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getGoalLabels = (language: "ar" | "en") =>
    selectedGoalOptions.map((goal) => (language === "en" ? goal.en : goal.ar));

  const buildWhatsAppMessage = (
    requestId: string,
    backendWasSaved: boolean,
  ) => {
    const serviceLabel = isEn
      ? selectedService?.labelEn
      : selectedService?.labelAr;
    const goals = getGoalLabels(isEn ? "en" : "ar");

    const lines = [
      "🔵 طلب Smart KYC جديد — NMOLABS",
      "",
      backendWasSaved
        ? "✅ تم حفظ الطلب في النظام"
        : "⚠️ تعذر الحفظ التلقائي — يرجى مراجعة الطلب عبر واتساب",
      "",
      "━━━━━━━━━━━━━━━━━━",
      "",
      "👤 بيانات العميل",
      "الاسم: " + formData.name,
      "الجوال: " + formData.phone,
      "البريد: " + (formData.email || "غير مدخل"),
      "الشركة / المشروع: " + (formData.company || "غير مدخل"),
      "",
      "📋 الاحتياج",
      "الخدمة: " + (serviceLabel || formData.type),
      "الأهداف: " + goals.join("، "),
      "",
      "Request ID: " + requestId,
    ];

    return lines.join("\n");
  };

  const handleSubmit = async () => {
    if (!isStepValid(2) || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    const requestId =
      "NML-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const goalsAr = getGoalLabels("ar");
    const goalsEn = getGoalLabels("en");

    const payload: KYCSubmissionPayload = {
      submission_id: requestId,
      submitted_at: new Date().toISOString(),
      language: config.language,
      completion_percentage: 100,
      primary_service: selectedService?.labelEn || formData.type,
      selected_subservices: goalsEn.join(", "),
      client_information: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      },
      business_information: {
        company: formData.company.trim(),
      },
      project_information: {
        description: goalsAr.join("، "),
        budget: "",
        timeline: "",
      },
      platform_information: "",
      content_information: "",
      attachments_information: "",
      approval_response_time: "",
      answers: {
        smart_goals_ar: goalsAr.join(" | "),
        smart_goals_en: goalsEn.join(" | "),
        form_version: "smart-kyc-lite-v1",
      },
    };

    try {
      const result = await submitKYCForm(payload);
      const saved = result.success === true;
      const finalRequestId = result.submission_id || requestId;
      const message = buildWhatsAppMessage(finalRequestId, saved);

      setBackendSaved(saved);
      setSubmissionId(finalRequestId);
      setWhatsAppMessage(message);
      setSubmitSuccess(true);

      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STEP_KEY);
      } catch {
        // Ignore storage cleanup failures.
      }

      if (config.contactNumber) {
        setTimeout(() => {
          window.open(
            getWhatsAppUrl(config.contactNumber, message),
            "_blank",
            "noopener,noreferrer",
          );
        }, 400);
      }
    } catch (error: any) {
      setSubmitError(
        error?.message ||
          (isEn
            ? "We could not submit your request. Please try again."
            : "تعذر إرسال الطلب. حاول مرة أخرى."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    if (!config.contactNumber || !whatsAppMessage) return;
    window.open(
      getWhatsAppUrl(config.contactNumber, whatsAppMessage),
      "_blank",
      "noopener,noreferrer",
    );
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] px-5 py-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-xl rounded-3xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-7 sm:p-10 text-center shadow-2xl"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CircleCheckBig size={42} />
          </div>

          <h1 className="mb-3 text-3xl font-black text-[var(--text-primary)]">
            {backendSaved
              ? isEn
                ? "Your request is in ✓"
                : "تم استلام طلبك ✓"
              : isEn
                ? "Your request is ready for WhatsApp review"
                : "طلبك جاهز للمراجعة عبر واتساب"}
          </h1>

          <p className="mb-6 text-[var(--text-muted)]">
            {backendSaved
              ? isEn
                ? "We saved the request successfully and the team can review it now."
                : "تم حفظ الطلب بنجاح، وفريق نمو لابز يقدر يراجعه الآن."
              : isEn
                ? "Automatic saving did not complete. Send the prepared request through WhatsApp so the team can review it."
                : "الحفظ التلقائي ما اكتمل. أرسل الطلب الجاهز عبر واتساب عشان يراجعه الفريق."}
          </p>

          <div className="mb-7 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-primary)] p-4">
            <div className="mb-1 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              {isEn ? "Request ID" : "رقم الطلب"}
            </div>
            <div className="font-mono text-xl font-black text-[var(--color-primary)]">
              {submissionId}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {config.contactNumber && (
              <button
                type="button"
                onClick={openWhatsApp}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Send size={18} />
                {isEn ? "Open WhatsApp" : "فتح واتساب"}
              </button>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-6 py-3.5 font-bold text-[var(--text-primary)]"
            >
              {isEn ? "New request" : "طلب جديد"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentStep = steps[stepIndex];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="sticky top-0 z-20 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-5 py-4 sm:px-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-black">
              <Sparkles size={20} className="text-[var(--color-primary)]" />
              <span>Smart KYC Lite</span>
            </div>
            <div className="text-sm font-bold text-[var(--text-muted)]">
              {isEn
                ? "Step " + (stepIndex + 1) + " of 3"
                : "الخطوة " + (stepIndex + 1) + " من 3"}
            </div>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
            <motion.div
              className="h-full rounded-full bg-[var(--color-primary)]"
              animate={{ width: ((stepIndex + 1) / 3) * 100 + "%" }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl px-5 pb-28 pt-8 sm:px-6 sm:pt-12">
        <motion.header
          key={currentStep.id + "-header"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <div className="mb-3 inline-flex rounded-full border border-[var(--border-default)] bg-[var(--surface-secondary)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">
            {isEn ? "Fast project discovery" : "تحديد احتياجك بسرعة"}
          </div>
          <h1 className="mb-3 text-3xl font-black sm:text-5xl">
            {isEn ? currentStep.titleEn : currentStep.titleAr}
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-7 text-[var(--text-muted)] sm:text-lg">
            {isEn ? currentStep.descEn : currentStep.descAr}
          </p>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.section
            key={currentStep.id}
            initial={{ opacity: 0, x: isEn ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isEn ? -20 : 20 }}
            transition={{ duration: 0.25 }}
          >
            {stepIndex === 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {projectTypes.map((service) => {
                  const selected = formData.type === service.value;

                  return (
                    <button
                      type="button"
                      key={service.id}
                      onClick={() => selectService(service.value)}
                      className={
                        "group rounded-2xl border p-5 text-start transition-all " +
                        (selected
                          ? "border-[var(--color-primary)] bg-[var(--surface-secondary)] shadow-lg ring-1 ring-[var(--color-primary)]"
                          : "border-[var(--border-default)] bg-[var(--surface-secondary)] hover:-translate-y-0.5 hover:border-[var(--color-primary)]")
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={
                            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border " +
                            (selected
                              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                              : "border-[var(--border-default)] bg-[var(--bg-primary)]")
                          }
                        >
                          {selected && <Check size={14} strokeWidth={3} />}
                        </div>
                        <div>
                          <div className="mb-1 font-black">
                            {isEn ? service.labelEn : service.labelAr}
                          </div>
                          <div className="text-sm leading-6 text-[var(--text-muted)]">
                            {isEn ? service.descEn : service.descAr}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {stepIndex === 1 && (
              <div className="mx-auto max-w-3xl">
                <div className="mb-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4">
                  <div className="text-xs font-bold text-[var(--text-muted)]">
                    {isEn ? "Selected service" : "الخدمة المختارة"}
                  </div>
                  <div className="mt-1 font-black text-[var(--color-primary)]">
                    {isEn ? selectedService?.labelEn : selectedService?.labelAr}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {goalOptions.map((goal) => {
                    const selected = formData.goals.includes(goal.id);
                    const locked =
                      !selected && formData.goals.length >= 3;

                    return (
                      <button
                        type="button"
                        key={goal.id}
                        disabled={locked}
                        onClick={() => toggleGoal(goal.id)}
                        className={
                          "rounded-2xl border p-5 text-start transition-all " +
                          (selected
                            ? "border-[var(--color-primary)] bg-[var(--surface-secondary)] shadow-md ring-1 ring-[var(--color-primary)]"
                            : locked
                              ? "cursor-not-allowed border-[var(--border-default)] bg-[var(--surface-secondary)] opacity-45"
                              : "border-[var(--border-default)] bg-[var(--surface-secondary)] hover:border-[var(--color-primary)]")
                        }
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={
                              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border " +
                              (selected
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                                : "border-[var(--border-default)] bg-[var(--bg-primary)]")
                            }
                          >
                            {selected && <Check size={14} strokeWidth={3} />}
                          </div>
                          <span className="font-bold">
                            {isEn ? goal.en : goal.ar}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-center text-sm font-medium text-[var(--text-muted)]">
                  {isEn
                    ? formData.goals.length + " of 3 selected"
                    : "تم اختيار " + formData.goals.length + " من 3"}
                </p>
              </div>
            )}

            {stepIndex === 2 && (
              <div className="mx-auto max-w-3xl space-y-5">
                <div className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5 sm:p-7">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <UserRound size={16} className="text-[var(--color-primary)]" />
                        {isEn ? "Name" : "الاسم"}
                      </span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3.5 outline-none transition-colors focus:border-[var(--color-primary)]"
                        placeholder={isEn ? "Your full name" : "اسمك الكريم"}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <Building2 size={16} className="text-[var(--color-primary)]" />
                        {isEn ? "Company / Project (Optional)" : "الشركة / المشروع (اختياري)"}
                      </span>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            company: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3.5 outline-none transition-colors focus:border-[var(--color-primary)]"
                        placeholder={isEn ? "Company or project name" : "اسم الشركة أو المشروع"}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <Phone size={16} className="text-[var(--color-primary)]" />
                        {isEn ? "Phone" : "رقم الجوال"}
                      </span>
                      <div className="flex" dir="ltr">
                        <select
                          value={countryCode}
                          onChange={(event) =>
                            handlePhoneChange(event.target.value, phoneNumber)
                          }
                          className="min-w-[94px] rounded-l-xl border border-r-0 border-[var(--border-default)] bg-[var(--bg-primary)] px-2 py-3.5 outline-none focus:border-[var(--color-primary)]"
                        >
                          {GCC_COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(event) =>
                            handlePhoneChange(countryCode, event.target.value)
                          }
                          className="w-full rounded-r-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3.5 text-left outline-none transition-colors focus:border-[var(--color-primary)]"
                          placeholder="5X XXX XXXX"
                        />
                      </div>
                    </label>

                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        <Mail size={16} className="text-[var(--color-primary)]" />
                        {isEn ? "Email (Optional)" : "البريد الإلكتروني (اختياري)"}
                      </span>
                      <input
                        type="email"
                        dir="ltr"
                        value={formData.email}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            email: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--bg-primary)] px-4 py-3.5 text-left outline-none transition-colors focus:border-[var(--color-primary)]"
                        placeholder="name@example.com"
                      />
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-5">
                  <div className="mb-3 text-xs font-bold text-[var(--text-muted)]">
                    {isEn ? "Your request at a glance" : "ملخص طلبك"}
                  </div>
                  <div className="font-black text-[var(--color-primary)]">
                    {isEn ? selectedService?.labelEn : selectedService?.labelAr}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    {selectedGoalOptions
                      .map((goal) => (isEn ? goal.en : goal.ar))
                      .join(" • ")}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAgreedToTerms((current) => !current)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4 text-start"
                >
                  <div
                    className={
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 " +
                      (agreedToTerms
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-[var(--border-default)] bg-[var(--bg-primary)]")
                    }
                  >
                    {agreedToTerms && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-medium leading-6">
                    {isEn
                      ? "I confirm the information is correct and agree to use it to review and prepare my request."
                      : "أؤكد صحة المعلومات وأوافق على استخدامها لمراجعة وتجهيز طلبي."}
                  </span>
                </button>

                {submitError && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-500">
                    <AlertCircle size={20} className="mt-0.5 shrink-0" />
                    <span className="text-sm font-bold">{submitError}</span>
                  </div>
                )}
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        <div className="mx-auto mt-9 flex max-w-3xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0}
            className={
              "inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition-all " +
              (stepIndex === 0
                ? "pointer-events-none opacity-0"
                : "border-[var(--border-default)] bg-[var(--surface-secondary)]")
            }
          >
            {isEn ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            {isEn ? "Back" : "السابق"}
          </button>

          {stepIndex < 2 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!isStepValid(stepIndex)}
              className={
                "inline-flex min-w-[160px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-black transition-all " +
                (isStepValid(stepIndex)
                  ? "bg-[var(--color-primary)] text-white shadow-lg hover:scale-[1.02]"
                  : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")
              }
            >
              {isEn ? "Continue" : "متابعة"}
              {isEn ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isStepValid(2) || isSubmitting}
              className={
                "inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-black transition-all " +
                (isStepValid(2) && !isSubmitting
                  ? "bg-[var(--color-primary)] text-white shadow-lg hover:scale-[1.02]"
                  : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isEn ? "Sending..." : "جاري الإرسال..."}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {isEn ? "Send request" : "إرسال الطلب"}
                </>
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
