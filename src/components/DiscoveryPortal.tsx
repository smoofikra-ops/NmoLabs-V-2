import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheckBig,
  Code2,
  Compass,
  Loader2,
  Mail,
  Phone,
  Send,
  Sparkles,
  UserRound,
  WandSparkles,
} from "lucide-react";
import { getWhatsAppUrl } from "../lib/utils";
import {
  KYCSubmissionPayload,
  submitKYCForm,
} from "../services/kycSubmissionService";
import { budgetsAr, budgetsEn, timelinesAr, timelinesEn } from "../data/projectIntake";
import { useSite } from "../context/SiteContext";
import { VoiceFieldButton } from "./VoiceFieldButton";
import { KycTechBackground } from "./KycTechBackground";

type MainGoalId =
  | "create-new"
  | "improve-existing"
  | "applications"
  | "systems"
  | "ai-automation"
  | "integrated";

type ContinuePath = "details" | "contact" | "help";

type SubService = {
  id: string;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
};

type MainGoal = {
  id: MainGoalId;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
  image: string;
  services: SubService[];
};

const MAIN_GOALS: MainGoal[] = [
  {
    id: "create-new",
    ar: "إنشاء شيء جديد",
    en: "Build Something New",
    descAr: "موقع، متجر، ملف تعريفي أو تجربة رقمية جديدة.",
    descEn: "A new website, store, profile or digital experience.",
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=82',
    services: [
      { id: "website", ar: "موقع إلكتروني", en: "Website", descAr: "موقع شركة، خدمات، تعريفي أو صفحة هبوط.", descEn: "Corporate, service, profile or landing website." },
      { id: "ecommerce", ar: "متجر إلكتروني", en: "E-commerce Store", descAr: "متجر جديد مع الدفع والشحن وتجربة الشراء.", descEn: "A new online store with checkout, payments and shipping." },
      { id: "catalog-profile", ar: "ملف تعريفي أو كتالوج", en: "Company Profile / Catalog", descAr: "عرض احترافي للشركة أو المنتجات أو الخدمات.", descEn: "Professional presentation for your company, products or services." },
      { id: "digital-platform", ar: "منصة أو بوابة رقمية", en: "Digital Platform / Portal", descAr: "منصة محتوى، بوابة عملاء أو تجربة رقمية مخصصة.", descEn: "Content platform, customer portal or tailored digital experience." },
    ],
  },
  {
    id: "improve-existing",
    ar: "تطوير مشروع قائم",
    en: "Improve an Existing Project",
    descAr: "تحليل وتحسين موقع، متجر، نظام أو نمو مشروع قائم.",
    descEn: "Audit and improve an existing site, store, system or growth engine.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=82',
    services: [
      { id: "audit-improvement", ar: "تحليل شامل وتطوير", en: "Audit & Improvement", descAr: "UX/UI، أداء، تحويل، بنية تقنية وفرص تحسين.", descEn: "UX/UI, performance, conversion and technical improvement." },
      { id: "website-redesign", ar: "إعادة تصميم موقع", en: "Website Redesign", descAr: "تحسين تجربة الموقع والواجهة والمحتوى والأداء.", descEn: "Improve website experience, UI, content and performance." },
      { id: "store-growth", ar: "تطوير متجر وزيادة التحويل", en: "Store Growth & Conversion", descAr: "تحسين تجربة الشراء، صفحات المنتجات والتحويل.", descEn: "Improve shopping flow, product pages and conversion." },
      { id: "marketing-growth", ar: "تسويق ونمو", en: "Marketing & Growth", descAr: "حملات، SEO، محتوى، قياس وتحسين الأداء.", descEn: "Campaigns, SEO, content, measurement and optimization." },
    ],
  },
  {
    id: "applications",
    ar: "تطبيقات",
    en: "Applications",
    descAr: "تطبيقات جوال وويب وبوابات للعملاء أو الفرق.",
    descEn: "Mobile apps, web apps and portals for customers or teams.",
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=1200&q=82',
    services: [
      { id: "mobile-app", ar: "تطبيق جوال", en: "Mobile App", descAr: "iOS / Android لتجربة عميل أو خدمة رقمية.", descEn: "iOS / Android for a customer experience or digital service." },
      { id: "web-app", ar: "تطبيق ويب", en: "Web Application", descAr: "تطبيق يعمل من المتصفح بواجهة وتدفقات مخصصة.", descEn: "Browser-based application with custom workflows." },
      { id: "customer-portal", ar: "بوابة عملاء", en: "Customer Portal", descAr: "حسابات، طلبات، ملفات، حالات ومتابعة العملاء.", descEn: "Accounts, requests, files, status and customer follow-up." },
      { id: "internal-app", ar: "تطبيق داخلي للموظفين", en: "Internal Team App", descAr: "مهام، عمليات، نماذج، صلاحيات ومتابعة.", descEn: "Tasks, operations, forms, permissions and tracking." },
    ],
  },
  {
    id: "systems",
    ar: "أنظمة وبرامج",
    en: "Systems & Software",
    descAr: "ERP، CRM، لوحات تحكم وأنظمة تشغيل مخصصة.",
    descEn: "ERP, CRM, dashboards and custom operating systems.",
    image: 'https://images.unsplash.com/photo-1771923082503-0a3381c46cef?auto=format&fit=crop&w=1200&q=82',
    services: [
      { id: "custom-system", ar: "نظام مخصص", en: "Custom System", descAr: "نظام مبني حسب عمليات الشركة واحتياجها.", descEn: "Software built around your company operations." },
      { id: "erp", ar: "ERP / إدارة العمليات", en: "ERP / Operations", descAr: "مبيعات، مشتريات، مخزون، مهام وتقارير.", descEn: "Sales, purchasing, inventory, tasks and reporting." },
      { id: "crm", ar: "CRM / إدارة العملاء", en: "CRM / Customer Management", descAr: "عملاء، فرص، متابعة، مبيعات وخدمة ما بعد البيع.", descEn: "Customers, opportunities, follow-up, sales and service." },
      { id: "dashboard", ar: "لوحات تحكم وتقارير", en: "Dashboards & Reporting", descAr: "مؤشرات، تقارير، صلاحيات وربط مصادر البيانات.", descEn: "KPIs, reporting, permissions and data integrations." },
    ],
  },
  {
    id: "ai-automation",
    ar: "الذكاء الاصطناعي والأتمتة",
    en: "AI & Automation",
    descAr: "مساعدات ذكية، أتمتة عمليات وربط الأنظمة والبيانات.",
    descEn: "AI assistants, workflow automation, integrations and data intelligence.",
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=82',
    services: [
      { id: "ai-assistant", ar: "مساعد ذكي", en: "AI Assistant", descAr: "للعملاء أو الموظفين أو فرق المبيعات والدعم.", descEn: "For customers, employees, sales or support teams." },
      { id: "workflow-automation", ar: "أتمتة عمليات", en: "Workflow Automation", descAr: "ربط خطوات العمل وتقليل المهام اليدوية.", descEn: "Connect workflows and reduce manual work." },
      { id: "ai-data", ar: "تحليل بيانات وذكاء أعمال", en: "AI Data & Intelligence", descAr: "تحليل، تلخيص، تنبؤ ولوحات رؤى.", descEn: "Analysis, summarization, prediction and insight dashboards." },
      { id: "system-integration", ar: "ربط أنظمة وواجهات API", en: "Systems & API Integration", descAr: "تكامل التطبيقات والبيانات والخدمات.", descEn: "Connect applications, data sources and services." },
    ],
  },
  {
    id: "integrated",
    ar: "مشروع متكامل",
    en: "Integrated Project",
    descAr: "بناء + تشغيل + تسويق + نمو في مشروع واحد مترابط.",
    descEn: "Build + operations + marketing + growth in one connected engagement.",
    image: 'https://images.unsplash.com/photo-1758691737124-05c5bffe46f0?auto=format&fit=crop&w=1200&q=82',
    services: [
      { id: "end-to-end", ar: "من الفكرة إلى التشغيل", en: "Idea to Operations", descAr: "دراسة، تصميم، بناء، إطلاق وتشغيل.", descEn: "Discovery, design, build, launch and operations." },
      { id: "digital-transformation", ar: "تحول رقمي للأعمال", en: "Digital Transformation", descAr: "إعادة بناء العمليات وربط الأنظمة والتجارب الرقمية.", descEn: "Redesign operations, systems and digital experiences." },
      { id: "commerce-growth", ar: "تجارة إلكترونية + نمو", en: "Commerce + Growth", descAr: "متجر، تشغيل، حملات، محتوى وقياس.", descEn: "Store, operations, campaigns, content and measurement." },
      { id: "consultation", ar: "استشارة وخارطة تنفيذ", en: "Consultation & Roadmap", descAr: "تحديد الحل والنطاق والأولويات قبل التنفيذ.", descEn: "Define the right solution, scope and priorities first." },
    ],
  },
];

const GCC_COUNTRIES = [
  { code: "+966", label: "🇸🇦 +966" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+965", label: "🇰🇼 +965" },
  { code: "+974", label: "🇶🇦 +974" },
  { code: "+973", label: "🇧🇭 +973" },
  { code: "+968", label: "🇴🇲 +968" },
];

type FormData = {
  mainGoal: MainGoalId | "";
  subService: string;
  continuePath: ContinuePath | "";
  description: string;
  currentUrl: string;
  platform: string;
  budget: string;
  timeline: string;
  helpNeed: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  preferredContactTime: string;
};

const STORAGE_KEY = "nmolabsSmartKycDecisionFlow_v2";

export const DiscoveryPortal = () => {
  const { config } = useSite();
  const isEn = config.language === "en";

  const emptyForm: FormData = {
    mainGoal: "",
    subService: "",
    continuePath: "",
    description: "",
    currentUrl: "",
    platform: "",
    budget: "",
    timeline: "",
    helpNeed: "",
    name: "",
    company: "",
    phone: "",
    email: "",
    preferredContactTime: "",
  };

  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...emptyForm, ...JSON.parse(saved) } : emptyForm;
    } catch {
      return emptyForm;
    }
  });

  const [screen, setScreen] = useState<"goal" | "service" | "path" | "details" | "help" | "contact">("goal");
  const [countryCode, setCountryCode] = useState("+966");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [backendSaved, setBackendSaved] = useState(false);
  const [whatsAppMessage, setWhatsAppMessage] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {}
  }, [formData]);

  useEffect(() => {
    const value = formData.phone.trim();
    if (!value) return;
    const match = GCC_COUNTRIES.find((country) => value.startsWith(country.code));
    if (match) {
      setCountryCode(match.code);
      setPhoneNumber(value.replace(match.code, "").trim());
    }
  }, []);

  const selectedGoal = useMemo(
    () => MAIN_GOALS.find((goal) => goal.id === formData.mainGoal),
    [formData.mainGoal],
  );

  const selectedService = useMemo(
    () => selectedGoal?.services.find((service) => service.id === formData.subService),
    [selectedGoal, formData.subService],
  );

  const screenOrder = useMemo(() => {
    if (formData.continuePath === "details") return ["goal", "service", "path", "details", "contact"];
    if (formData.continuePath === "help") return ["goal", "service", "path", "help", "contact"];
    return ["goal", "service", "path", "contact"];
  }, [formData.continuePath]);

  const currentIndex = Math.max(0, screenOrder.indexOf(screen));
  const progress = ((currentIndex + 1) / screenOrder.length) * 100;

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const selectGoal = (goal: MainGoalId) => {
    setFormData((current) => ({
      ...current,
      mainGoal: goal,
      subService: "",
      continuePath: "",
    }));
  };

  const handlePhoneChange = (code: string, number: string) => {
    setCountryCode(code);
    let clean = number.replace(/[^0-9]/g, "");
    if (code === "+966" && clean.startsWith("0")) clean = clean.substring(1);
    setPhoneNumber(clean);
    setField("phone", clean ? code + " " + clean : "");
  };

  const goBack = () => {
    if (screen === "service") setScreen("goal");
    else if (screen === "path") setScreen("service");
    else if (screen === "details" || screen === "help") setScreen("path");
    else if (screen === "contact") {
      if (formData.continuePath === "details") setScreen("details");
      else if (formData.continuePath === "help") setScreen("help");
      else setScreen("path");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactValid =
    formData.name.trim().length > 1 &&
    formData.phone.trim().length > 5 &&
    (formData.email.trim() === "" || formData.email.includes("@")) &&
    agreedToTerms;

  const buildWhatsAppMessage = (requestId: string, saved: boolean) => {
    const goalLabel = isEn ? selectedGoal?.en : selectedGoal?.ar;
    const serviceLabel = isEn ? selectedService?.en : selectedService?.ar;
    const pathLabel =
      formData.continuePath === "details"
        ? "أكمل التفاصيل"
        : formData.continuePath === "contact"
          ? "تواصلوا معي"
          : "ساعدوني أحدد احتياجي";

    return [
      "🔵 طلب KYC جديد — NMOLABS",
      "",
      saved ? "✅ تم حفظ الطلب في النظام" : "⚠️ تعذر الحفظ التلقائي — راجع الطلب عبر واتساب",
      "",
      "الهدف الرئيسي: " + (goalLabel || ""),
      "الخدمة الفرعية: " + (serviceLabel || ""),
      "طريقة الاستمرار: " + pathLabel,
      formData.description ? "تفاصيل المشروع: " + formData.description : "",
      formData.helpNeed ? "ما يحتاج المساعدة فيه: " + formData.helpNeed : "",
      formData.currentUrl ? "الرابط الحالي: " + formData.currentUrl : "",
      formData.platform ? "المنصة / التقنية: " + formData.platform : "",
      formData.budget ? "الميزانية: " + formData.budget : "",
      formData.timeline ? "الموعد: " + formData.timeline : "",
      "",
      "الاسم: " + formData.name,
      "الجوال: " + formData.phone,
      "البريد: " + (formData.email || "غير مدخل"),
      "الشركة / المشروع: " + (formData.company || "غير مدخل"),
      formData.preferredContactTime ? "وقت التواصل المفضل: " + formData.preferredContactTime : "",
      "",
      "Request ID: " + requestId,
    ].filter(Boolean).join("\n");
  };

  const handleSubmit = async () => {
    if (!contactValid || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    const requestId = "NML-" + Math.random().toString(36).substring(2, 9).toUpperCase();

    const payload: KYCSubmissionPayload = {
      submission_id: requestId,
      submitted_at: new Date().toISOString(),
      language: config.language,
      completion_percentage: 100,
      primary_service: (selectedGoal?.en || formData.mainGoal) + " > " + (selectedService?.en || formData.subService),
      selected_subservices: selectedService?.en || formData.subService,
      client_information: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      },
      business_information: {
        company: formData.company.trim(),
      },
      project_information: {
        description: [formData.description, formData.helpNeed, formData.currentUrl, formData.platform]
          .filter(Boolean)
          .join(" | "),
        budget: formData.budget,
        timeline: formData.timeline,
      },
      platform_information: formData.platform,
      content_information: "",
      attachments_information: "",
      approval_response_time: formData.preferredContactTime,
      answers: {
        main_goal_ar: selectedGoal?.ar || "",
        main_goal_en: selectedGoal?.en || "",
        sub_service_ar: selectedService?.ar || "",
        sub_service_en: selectedService?.en || "",
        continue_path: formData.continuePath,
        current_url: formData.currentUrl,
        help_need: formData.helpNeed,
        form_version: "smart-kyc-decision-flow-v2",
      },
    };

    try {
      const result = await submitKYCForm(payload);
      const saved = result.success === true;
      const finalId = result.submission_id || requestId;
      const message = buildWhatsAppMessage(finalId, saved);

      setBackendSaved(saved);
      setSubmissionId(finalId);
      setWhatsAppMessage(message);
      setSubmitSuccess(true);

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}

      if (config.contactNumber) {
        setTimeout(() => {
          window.open(
            getWhatsAppUrl(config.contactNumber, message),
            "_blank",
            "noopener,noreferrer",
          );
        }, 350);
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

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] px-5 py-10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-xl rounded-[28px] border border-[var(--border-default)] bg-[var(--surface-primary)] p-8 text-center shadow-2xl"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500">
            <CircleCheckBig size={42} />
          </div>
          <h1 className="mb-3 text-3xl font-black text-[var(--text-primary)]">
            {backendSaved ? (isEn ? "Request received" : "تم استلام طلبك") : (isEn ? "Request prepared" : "طلبك جاهز للمراجعة")}
          </h1>
          <p className="mb-6 text-[var(--text-muted)]">
            {backendSaved
              ? (isEn ? "The team can review your request now." : "فريق نمو لابز يقدر يراجع طلبك الآن.")
              : (isEn ? "Send the prepared request through WhatsApp." : "أرسل الطلب الجاهز عبر واتساب للمراجعة.")}
          </p>
          <div className="mb-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4">
            <div className="text-xs font-bold text-[var(--text-muted)]">{isEn ? "Request ID" : "رقم الطلب"}</div>
            <div className="mt-1 font-mono text-xl font-black text-[var(--color-primary)]">{submissionId}</div>
          </div>
          {config.contactNumber && (
            <button
              onClick={() => window.open(getWhatsAppUrl(config.contactNumber, whatsAppMessage), "_blank", "noopener,noreferrer")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white shadow-lg"
            >
              <Send size={18} />
              {isEn ? "Open WhatsApp" : "فتح واتساب"}
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  const screenTitle =
    screen === "goal"
      ? (isEn ? "What are you trying to achieve?" : "وش هدفك الرئيسي؟")
      : screen === "service"
        ? (isEn ? "Choose the closest service" : "اختر الخدمة الأقرب لاحتياجك")
        : screen === "path"
          ? (isEn ? "How would you like to continue?" : "كيف تحب نكمل معك؟")
          : screen === "details"
            ? (isEn ? "Give us the useful details" : "أعطنا التفاصيل اللي تفرق")
            : screen === "help"
              ? (isEn ? "Let us help define the need" : "خلّنا نساعدك نحدد الاحتياج")
              : (isEn ? "How can we reach you?" : "بيانات التواصل");

  const screenDesc =
    screen === "goal"
      ? (isEn ? "Start with the outcome, not the service name." : "ابدأ بالنتيجة اللي تبغاها، مو باسم الخدمة.")
      : screen === "service"
        ? (isEn ? "We only show services related to your selected goal." : "نعرض لك فقط الخدمات المرتبطة بالهدف اللي اخترته.")
        : screen === "path"
          ? (isEn ? "Choose the fastest route for you." : "اختر المسار الأنسب لك، ونكمل بدون تعقيد.")
          : screen === "details"
            ? (isEn ? "A few focused questions help us assess the project faster." : "أسئلة قصيرة ومركزة تساعدنا نقيم المشروع بشكل أدق وأسرع.")
            : screen === "help"
              ? (isEn ? "Tell us what is unclear and we will guide the next step." : "قل لنا وين الحيرة، ونرتب لك الخطوة التالية.")
              : (isEn ? "Just the essentials so the team can follow up." : "بيانات بسيطة فقط عشان الفريق يقدر يتواصل معك.");

  const encouragement =
    screen === "goal" && formData.mainGoal
      ? (isEn ? "Great — we now know the direction. Next we only show options relevant to you." : "ممتاز، كذا عرفنا الاتجاه العام. الخطوة الجاية بنعرض لك الخيارات الأقرب فقط.")
      : screen === "service" && formData.subService
        ? (isEn ? "Good choice. One more decision helps us shorten the rest of the form." : "اختيار واضح. باقي نعرف كيف تحب تكمل، وبنختصر عليك الأسئلة غير الضرورية.")
        : screen === "path" && formData.continuePath
          ? (isEn ? "Perfect — the next step adapts to the way you prefer to continue." : "تمام، من هنا المسار بيتكيف مع الطريقة اللي تناسبك.")
          : screen === "details"
            ? (isEn ? "Every useful detail helps us understand the project correctly from the first review." : "كل معلومة تضيفها تساعدنا نفهم المشروع من أول مرة ونرجع لك بصورة أدق.")
            : screen === "help"
              ? (isEn ? "Speak freely. We use your context to understand the need before suggesting a direction." : "خذ راحتك في الشرح. كل ما فهمنا سياقك أكثر، قدرنا نحدد احتياجك بشكل أدق.")
              : screen === "contact"
                ? (isEn ? "Last step — only the essentials we need to follow up with you." : "باقي خطوة أخيرة فقط: بيانات بسيطة عشان نقدر نرجع لك.")
                : "";

  const encouragementAction =
    screen === "goal" && formData.mainGoal
      ? (isEn ? "Press Continue to see the closest options." : "اضغط متابعة عشان نعرض لك الخيارات الأقرب.")
      : screen === "service" && formData.subService
        ? (isEn ? "Press Continue and we will tailor the next step." : "اضغط متابعة عشان نكمّل بالمسار المناسب لك.")
        : screen === "path" && formData.continuePath
          ? (isEn ? "Press Continue — the next step is ready." : "اضغط متابعة — خطوتك الجاية جاهزة.")
          : "";

  const encouragementKey =
    screen + "-" + formData.mainGoal + "-" + formData.subService + "-" + formData.continuePath;

  const serviceIcon = () => {
    if (formData.mainGoal === "ai-automation") return <Sparkles size={24} />;
    if (formData.mainGoal === "improve-existing") return <Compass size={24} />;
    if (formData.mainGoal === "applications" || formData.mainGoal === "systems") return <Code2 size={24} />;
    return <WandSparkles size={24} />;
  };

  const backVisible = screen !== "goal";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <KycTechBackground />
      <div className="sticky top-0 z-30 border-b border-[var(--border-default)] bg-[var(--surface-primary)]/88 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-2.5 sm:px-6 sm:py-4">
          <div className="mb-2 flex items-center justify-between gap-3 sm:mb-3 sm:gap-4">
            <div className="flex items-center gap-2 font-black">
              <Sparkles size={20} className="text-[var(--color-primary)]" />
              <span>{isEn ? "Start Your Project" : "ابدأ مشروعك"}</span>
            </div>
            <div className="text-sm font-bold text-[var(--text-muted)]">
              {isEn ? "Smart project discovery" : "تحديد ذكي للاحتياج"}
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-secondary)] sm:h-2">
            <motion.div
              className="h-full rounded-full bg-[var(--color-primary)]"
              animate={{ width: String(progress) + "%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-3.5 pb-8 pt-4 sm:px-6 sm:pb-28 sm:pt-12">
        <motion.header
          key={screen + "-header"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-4 max-w-3xl text-center sm:mb-9"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--interactive-border)] bg-[var(--surface-secondary)] px-3 py-1 text-[11px] font-bold text-[var(--color-primary)] sm:mb-3 sm:text-xs">
            <WandSparkles size={14} />
            {isEn ? "Adaptive flow" : "مسار يتكيف مع اختيارك"}
          </div>
          <h1 className="mb-1.5 text-[28px] font-black leading-tight sm:mb-3 sm:text-5xl">{screenTitle}</h1>
          <p className="mx-auto max-w-2xl text-[13px] font-medium leading-5 text-[var(--text-muted)] sm:text-lg sm:leading-7">{screenDesc}</p>
          <AnimatePresence mode="wait">
            {encouragement && (
              <motion.div
                key={encouragementKey}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="relative mx-auto mt-3 w-full max-w-2xl overflow-hidden rounded-2xl border-2 border-[var(--color-primary)]/45 bg-[var(--surface-primary)] px-3.5 py-3 text-start shadow-[0_12px_32px_rgba(15,98,254,0.16)] sm:mt-5 sm:px-5 sm:py-4 sm:shadow-[0_16px_45px_rgba(15,98,254,0.18)]"
              >
                {[0, 1, 2, 3, 4, 5].map((particle) => (
                  <motion.span
                    key={particle}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[var(--color-primary)]"
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: [0, (particle % 2 === 0 ? 1 : -1) * (34 + particle * 8)],
                      y: [0, (particle < 3 ? -1 : 1) * (24 + particle * 6)],
                      scale: [0, 1, 0.3],
                    }}
                    transition={{ duration: 0.7, delay: particle * 0.035, ease: "easeOut" }}
                  />
                ))}
                <div className="relative flex min-w-0 items-start gap-2.5 sm:gap-3">
                  <motion.div
                    initial={{ rotate: -18, scale: 0.6 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-[0_8px_20px_rgba(15,98,254,0.28)] sm:h-9 sm:w-9"
                  >
                    <CircleCheckBig size={19} />
                  </motion.div>
                  <div className="min-w-0 flex-1">
                    <div className="break-words text-[13px] font-black leading-6 text-[var(--text-primary)] sm:text-[15px] sm:leading-7">
                      {encouragement}
                    </div>
                    {encouragementAction && (
                      <motion.div
                        initial={{ opacity: 0, x: isEn ? -8 : 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55, duration: 0.25 }}
                        className="mt-1 flex min-w-0 items-center gap-1.5 text-[11px] font-black leading-5 text-[var(--color-primary)] sm:mt-1.5 sm:text-sm"
                      >
                        <Sparkles size={14} />
                        <span className="min-w-0 break-words">{encouragementAction}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.section
            key={screen}
            initial={{ opacity: 0, x: isEn ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isEn ? -24 : 24 }}
            transition={{ duration: 0.22 }}
          >
            {screen === "goal" && (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
                {MAIN_GOALS.map((goal) => {
                  const selected = formData.mainGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => selectGoal(goal.id)}
                      aria-pressed={selected}
                      className={
                        "group relative min-h-[118px] overflow-hidden rounded-[20px] border text-start shadow-md transition-all duration-300 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] sm:min-h-[235px] sm:rounded-[28px] " +
                        (selected
                          ? "border-[var(--color-primary)] shadow-2xl ring-2 ring-[var(--color-primary)]"
                          : "border-white/10 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-2xl")
                      }
                    >
                      <img
                        src={goal.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/15 transition-colors duration-300 group-hover:from-black group-hover:via-black/55" />
                      <div className="absolute inset-0 bg-[var(--color-primary)]/0 transition-colors duration-300 group-hover:bg-[var(--color-primary)]/10" />

                      <div className="relative z-10 flex min-h-[118px] flex-col justify-between p-3 sm:min-h-[235px] sm:p-6">
                        <div className="flex justify-end">
                          <div
                            className={
                              "flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all sm:h-8 sm:w-8 " +
                              (selected
                                ? "border-white bg-[var(--color-primary)] text-white shadow-lg"
                                : "border-white/35 bg-black/25 text-white")
                            }
                          >
                            {selected && <Check size={16} strokeWidth={3} />}
                          </div>
                        </div>

                        <div className="max-w-full sm:max-w-[92%]">
                          <div className="mb-0.5 text-[15px] font-black leading-5 text-white drop-shadow-sm sm:mb-2 sm:text-2xl sm:leading-normal">
                            {isEn ? goal.en : goal.ar}
                          </div>
                          <div className="line-clamp-2 text-[10px] font-medium leading-4 text-white/80 drop-shadow-sm sm:text-sm sm:leading-6">
                            {isEn ? goal.descEn : goal.descAr}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {screen === "service" && selectedGoal && (
              <div className="mx-auto max-w-4xl">
                <div className="mb-5 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] p-4">
                  <div className="text-xs font-bold text-[var(--text-muted)]">{isEn ? "Main goal" : "الهدف الرئيسي"}</div>
                  <div className="mt-1 font-black text-[var(--color-primary)]">{isEn ? selectedGoal.en : selectedGoal.ar}</div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {selectedGoal.services.map((service) => {
                    const selected = formData.subService === service.id;
                    return (
                      <motion.button
                        key={service.id}
                        type="button"
                        onClick={() => setField("subService", service.id)}
                        whileHover={{ y: -5, scale: 1.012 }}
                        whileTap={{ y: 1, scale: 0.99 }}
                        aria-pressed={selected}
                        className={
                          "group relative overflow-hidden rounded-[24px] border p-5 text-start transition-all duration-300 [transform-style:preserve-3d] " +
                          (selected
                            ? "border-[var(--color-primary)] bg-[var(--surface-primary)] shadow-[0_20px_50px_rgba(15,98,254,0.22)] ring-2 ring-[var(--color-primary)]/25"
                            : "border-[var(--border-default)] bg-[var(--surface-primary)] shadow-[0_10px_28px_rgba(15,23,42,0.08)] hover:border-[var(--color-primary)] hover:shadow-[0_20px_45px_rgba(15,98,254,0.15)]")
                        }
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/8 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative flex items-start gap-4">
                          <motion.div
                            animate={selected ? { y: [0, -3, 0], rotate: [0, -3, 0] } : { y: 0, rotate: 0 }}
                            transition={selected ? { duration: 0.5, ease: "easeOut" } : {}}
                            className={
                              "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border text-[var(--color-primary)] transition-all duration-300 " +
                              (selected
                                ? "border-[var(--color-primary)]/45 bg-[var(--color-primary)]/12 shadow-[0_12px_24px_rgba(15,98,254,0.24)]"
                                : "border-[var(--interactive-border)] bg-[var(--surface-secondary)] shadow-[0_8px_18px_rgba(15,23,42,0.10)] group-hover:-translate-y-1 group-hover:shadow-[0_14px_26px_rgba(15,98,254,0.18)]")
                            }
                          >
                            <span className="absolute inset-x-2 top-1 h-px rounded-full bg-white/45" />
                            {serviceIcon()}
                            {selected && (
                              <span className="absolute -end-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg">
                                <Check size={13} strokeWidth={3} />
                              </span>
                            )}
                          </motion.div>
                          <div className="min-w-0 flex-1 pt-1">
                            <div className="mb-1 text-lg font-black text-[var(--text-primary)]">{isEn ? service.en : service.ar}</div>
                            <div className="text-sm font-medium leading-6 text-[var(--text-muted)]">{isEn ? service.descEn : service.descAr}</div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {screen === "path" && (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setField("continuePath", "details")}
                  className={
                    "relative min-h-[260px] rounded-[30px] border p-7 text-start transition-all duration-200 active:translate-y-[2px] " +
                    (formData.continuePath === "details"
                      ? "border-[var(--color-primary)] bg-[var(--surface-primary)] shadow-[0_16px_45px_rgba(15,98,254,0.20)] ring-1 ring-[var(--color-primary)]"
                      : "border-[var(--color-primary)] bg-[var(--surface-primary)] shadow-[0_14px_35px_rgba(15,98,254,0.15)] hover:-translate-y-1")
                  }
                >
                  <div className="absolute end-5 top-5 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-black text-white">
                    {isEn ? "Recommended" : "موصى به"}
                  </div>
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] shadow-inner">
                    <Code2 size={30} />
                  </div>
                  <div className="mb-2 text-[22px] font-black">{isEn ? "Continue the details" : "أكمل التفاصيل"}</div>
                  <p className="text-[15px] font-medium leading-7 text-[var(--text-muted)]">
                    {isEn ? "Answer a few smart questions so we can assess scope, timing and fit more accurately." : "جاوب على أسئلة ذكية قصيرة عشان نقيّم النطاق والوقت والحل بشكل أدق وأسرع."}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setField("continuePath", "contact")}
                  className={
                    "min-h-[260px] rounded-[30px] border p-7 text-start transition-all duration-200 active:translate-y-[2px] " +
                    (formData.continuePath === "contact"
                      ? "border-[var(--color-primary)] bg-[var(--surface-primary)] shadow-xl ring-1 ring-[var(--color-primary)]"
                      : "border-[var(--border-default)] bg-[var(--surface-primary)] hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-xl")
                  }
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--interactive-border)] bg-[var(--surface-secondary)] text-[var(--color-primary)]">
                    <Phone size={29} />
                  </div>
                  <div className="mb-2 text-[22px] font-black">{isEn ? "Contact me" : "تواصلوا معي"}</div>
                  <p className="text-[15px] font-medium leading-7 text-[var(--text-muted)]">
                    {isEn ? "Leave your contact details and preferred time. The team will follow up directly." : "اترك بياناتك ووقت التواصل المناسب، والفريق يتواصل معك مباشرة."}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setField("continuePath", "help")}
                  className={
                    "min-h-[260px] rounded-[30px] border p-7 text-start transition-all duration-200 active:translate-y-[2px] " +
                    (formData.continuePath === "help"
                      ? "border-[var(--color-primary)] bg-[var(--surface-primary)] shadow-xl ring-1 ring-[var(--color-primary)]"
                      : "border-[var(--border-default)] bg-[var(--surface-primary)] hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-xl")
                  }
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl border border-[var(--interactive-border)] bg-[var(--surface-secondary)] text-[var(--color-primary)]">
                    <Compass size={29} />
                  </div>
                  <div className="mb-2 text-[22px] font-black">{isEn ? "Help me define the need" : "ساعدوني أحدد احتياجي"}</div>
                  <p className="text-[15px] font-medium leading-7 text-[var(--text-muted)]">
                    {isEn ? "Use a guided path when you are not sure about the exact scope or solution yet." : "مسار استكشافي إذا الفكرة أو النطاق لسه مو واضحين وتحتاج توجيه قبل التنفيذ."}
                  </p>
                </button>
              </div>
            )}

            {screen === "details" && (
              <div className="mx-auto max-w-3xl space-y-5">
                <label className="block rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6">
                  <span className="mb-2 block font-black">{isEn ? "Describe what you want to build or improve" : "اشرح لنا باختصار وش تبغى نبني أو نطوّر"}</span>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(event) => setField("description", event.target.value)}
                    className="w-full resize-none rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-4 outline-none focus:border-[var(--color-primary)]"
                    placeholder={isEn ? "A short practical description is enough..." : "وصف عملي قصير يكفي..."}
                  />
                  <VoiceFieldButton
                    value={formData.description}
                    onChange={(value) => setField("description", value)}
                    context="وصف المشروع وما الذي يريد العميل بناءه أو تطويره"
                  />
                </label>

                {formData.mainGoal === "improve-existing" && (
                  <label className="block rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6">
                    <span className="mb-2 block font-black">{isEn ? "Current website / store / system URL" : "رابط الموقع / المتجر / النظام الحالي"}</span>
                    <input
                      dir="ltr"
                      type="url"
                      value={formData.currentUrl}
                      onChange={(event) => setField("currentUrl", event.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 text-left outline-none focus:border-[var(--color-primary)]"
                      placeholder="https://"
                    />
                  </label>
                )}

                {(formData.mainGoal === "applications" || formData.mainGoal === "systems" || formData.mainGoal === "ai-automation") && (
                  <label className="block rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6">
                    <span className="mb-2 block font-black">{isEn ? "Any preferred platform, technology or system to connect?" : "هل عندك منصة أو تقنية أو نظام لازم نربطه؟"}</span>
                    <input
                      value={formData.platform}
                      onChange={(event) => setField("platform", event.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 outline-none focus:border-[var(--color-primary)]"
                      placeholder={isEn ? "Optional" : "اختياري"}
                    />
                    <VoiceFieldButton
                      compact
                      value={formData.platform}
                      onChange={(value) => setField("platform", value)}
                      context="اسم المنصة أو التقنية أو النظام الذي يريد العميل ربطه"
                    />
                  </label>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6">
                    <span className="mb-2 block font-black">{isEn ? "Budget range" : "الميزانية التقريبية"}</span>
                    <select
                      value={formData.budget}
                      onChange={(event) => setField("budget", event.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="">{isEn ? "Choose..." : "اختر..."}</option>
                      {(isEn ? budgetsEn : budgetsAr).map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </label>

                  <label className="rounded-3xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-6">
                    <span className="mb-2 block font-black">{isEn ? "Preferred timeline" : "الموعد المتوقع"}</span>
                    <select
                      value={formData.timeline}
                      onChange={(event) => setField("timeline", event.target.value)}
                      className="w-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 outline-none focus:border-[var(--color-primary)]"
                    >
                      <option value="">{isEn ? "Choose..." : "اختر..."}</option>
                      {(isEn ? timelinesEn : timelinesAr).map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            )}

            {screen === "help" && (
              <div className="mx-auto max-w-3xl rounded-[30px] border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 sm:p-8">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Compass size={30} />
                </div>
                <label className="block">
                  <span className="mb-2 block text-xl font-black">{isEn ? "What is unclear right now?" : "وش الشيء اللي مو واضح لك الآن؟"}</span>
                  <p className="mb-4 text-sm leading-6 text-[var(--text-muted)]">
                    {isEn ? "Tell us about the idea, problem or decision you are trying to make. We will use it to guide the consultation." : "اكتب الفكرة أو المشكلة أو القرار اللي محتار فيه، ونستخدمه عشان نوجّه الاستشارة بشكل صحيح."}
                  </p>
                  <textarea
                    rows={6}
                    value={formData.helpNeed}
                    onChange={(event) => setField("helpNeed", event.target.value)}
                    className="w-full resize-none rounded-2xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-4 outline-none focus:border-[var(--color-primary)]"
                    placeholder={isEn ? "Example: I know the outcome I want, but not the right system or approach..." : "مثال: أعرف النتيجة اللي أبغاها، لكن ما أعرف هل أحتاج موقع أو نظام أو أتمتة..."}
                  />
                  <VoiceFieldButton
                    value={formData.helpNeed}
                    onChange={(value) => setField("helpNeed", value)}
                    context="الفكرة أو المشكلة أو القرار الذي يحتاج العميل مساعدة في تحديده"
                  />
                </label>
              </div>
            )}

            {screen === "contact" && (
              <div className="mx-auto max-w-3xl space-y-5">
                <div className="rounded-[30px] border border-[var(--border-default)] bg-[var(--surface-primary)] p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold"><UserRound size={16} className="text-[var(--color-primary)]" />{isEn ? "Name" : "الاسم"}</span>
                      <input
                        value={formData.name}
                        onChange={(event) => setField("name", event.target.value)}
                        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 outline-none focus:border-[var(--color-primary)]"
                        placeholder={isEn ? "Your full name" : "اسمك الكريم"}
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="text-sm font-bold">{isEn ? "Company / Project (Optional)" : "الشركة / المشروع (اختياري)"}</span>
                      <input
                        value={formData.company}
                        onChange={(event) => setField("company", event.target.value)}
                        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 outline-none focus:border-[var(--color-primary)]"
                        placeholder={isEn ? "Company or project name" : "اسم الشركة أو المشروع"}
                      />
                      <VoiceFieldButton
                        compact
                        value={formData.company}
                        onChange={(value) => setField("company", value)}
                        context="اسم الشركة أو المشروع فقط"
                      />
                    </label>

                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold"><Phone size={16} className="text-[var(--color-primary)]" />{isEn ? "Phone" : "رقم الجوال"}</span>
                      <div className="flex" dir="ltr">
                        <select
                          value={countryCode}
                          onChange={(event) => handlePhoneChange(event.target.value, phoneNumber)}
                          className="min-w-[100px] rounded-l-xl border border-r-0 border-[var(--border-default)] bg-[var(--surface-secondary)] px-2 py-3.5 outline-none"
                        >
                          {GCC_COUNTRIES.map((country) => <option key={country.code} value={country.code}>{country.label}</option>)}
                        </select>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(event) => handlePhoneChange(countryCode, event.target.value)}
                          className="w-full rounded-r-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 text-left outline-none focus:border-[var(--color-primary)]"
                          placeholder="5X XXX XXXX"
                        />
                      </div>
                    </label>

                    <label className="space-y-2">
                      <span className="flex items-center gap-2 text-sm font-bold"><Mail size={16} className="text-[var(--color-primary)]" />{isEn ? "Email (Optional)" : "البريد الإلكتروني (اختياري)"}</span>
                      <input
                        dir="ltr"
                        type="email"
                        value={formData.email}
                        onChange={(event) => setField("email", event.target.value)}
                        className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 text-left outline-none focus:border-[var(--color-primary)]"
                        placeholder="name@example.com"
                      />
                    </label>

                    {(formData.continuePath === "contact" || formData.continuePath === "help") && (
                      <label className="space-y-2 sm:col-span-2">
                        <span className="text-sm font-bold">{isEn ? "Preferred contact time (Optional)" : "وقت التواصل المفضل (اختياري)"}</span>
                        <input
                          value={formData.preferredContactTime}
                          onChange={(event) => setField("preferredContactTime", event.target.value)}
                          className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-secondary)] px-4 py-3.5 outline-none focus:border-[var(--color-primary)]"
                          placeholder={isEn ? "Example: after 6 PM" : "مثال: بعد الساعة 6 مساءً"}
                        />
                        <VoiceFieldButton
                          compact
                          value={formData.preferredContactTime}
                          onChange={(value) => setField("preferredContactTime", value)}
                          context="وقت التواصل المفضل، مع الحفاظ على الوقت والأرقام بدقة"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAgreedToTerms((current) => !current)}
                  className="flex w-full items-start gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-primary)] p-4 text-start"
                >
                  <div className={"mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 " + (agreedToTerms ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--border-default)] bg-[var(--surface-secondary)]")}>
                    {agreedToTerms && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="text-sm font-medium leading-6">
                    {isEn ? "I confirm the information is correct and agree to use it to review and prepare my request." : "أؤكد صحة المعلومات وأوافق على استخدامها لمراجعة وتجهيز طلبي."}
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

        <div className="mx-auto mt-4 flex max-w-4xl flex-col-reverse gap-2 sm:mt-9 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <button
            type="button"
            onClick={goBack}
            className={"inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--surface-primary)] px-6 py-3.5 text-sm font-bold transition-all " + (backVisible ? "" : "pointer-events-none opacity-0")}
          >
            {isEn ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            {isEn ? "Back" : "السابق"}
          </button>

          {screen === "goal" && (
            <button
              type="button"
              disabled={!formData.mainGoal}
              onClick={() => { setScreen("service"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={"inline-flex min-h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black sm:min-w-[170px] sm:px-7 sm:py-3.5 " + (formData.mainGoal ? "bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(15,98,254,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,98,254,0.34)] transition-all" : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")}
            >
              {isEn ? "Continue" : "متابعة"}
              {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </button>
          )}

          {screen === "service" && (
            <button
              type="button"
              disabled={!formData.subService}
              onClick={() => { setScreen("path"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={"inline-flex min-h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black sm:min-w-[170px] sm:px-7 sm:py-3.5 " + (formData.subService ? "bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(15,98,254,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,98,254,0.34)] transition-all" : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")}
            >
              {isEn ? "Continue" : "متابعة"}
              {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </button>
          )}

          {screen === "path" && (
            <button
              type="button"
              disabled={!formData.continuePath}
              onClick={() => {
                if (formData.continuePath === "details") setScreen("details");
                else if (formData.continuePath === "help") setScreen("help");
                else setScreen("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={"inline-flex min-h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black sm:min-w-[170px] sm:px-7 sm:py-3.5 " + (formData.continuePath ? "bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(15,98,254,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,98,254,0.34)] transition-all" : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")}
            >
              {isEn ? "Continue" : "متابعة"}
              {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </button>
          )}

          {screen === "details" && (
            <button
              type="button"
              disabled={!formData.description.trim()}
              onClick={() => { setScreen("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={"inline-flex min-h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black sm:min-w-[170px] sm:px-7 sm:py-3.5 " + (formData.description.trim() ? "bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(15,98,254,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,98,254,0.34)] transition-all" : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")}
            >
              {isEn ? "Continue" : "متابعة"}
              {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </button>
          )}

          {screen === "help" && (
            <button
              type="button"
              disabled={!formData.helpNeed.trim()}
              onClick={() => { setScreen("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={"inline-flex min-h-11 min-w-[150px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black sm:min-w-[170px] sm:px-7 sm:py-3.5 " + (formData.helpNeed.trim() ? "bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(15,98,254,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,98,254,0.34)] transition-all" : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")}
            >
              {isEn ? "Continue" : "متابعة"}
              {isEn ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </button>
          )}

          {screen === "contact" && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!contactValid || isSubmitting}
              className={"inline-flex min-w-[190px] items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-black " + (contactValid && !isSubmitting ? "bg-[var(--color-primary)] text-white shadow-[0_12px_30px_rgba(15,98,254,0.28)] hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(15,98,254,0.34)] transition-all" : "cursor-not-allowed border border-[var(--border-default)] bg-[var(--surface-secondary)] text-[var(--text-muted)]")}
            >
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" />{isEn ? "Sending..." : "جاري الإرسال..."}</> : <><Send size={18} />{isEn ? "Send request" : "إرسال الطلب"}</>}
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
