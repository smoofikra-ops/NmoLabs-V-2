import type { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";

const MAX_CHARS = 6000;

const fallbackSaudiArabic = (input: string) => {
  let text = input.trim();
  const replacements: Array<[RegExp, string]> = [
    [/\bعايز\b/giu, "أبغى"],
    [/\bعاوز\b/giu, "أبغى"],
    [/\bبدي\b/giu, "أبغى"],
    [/\bأريد\b/giu, "أبغى"],
    [/\bمحتاج\b/giu, "أحتاج"],
    [/\bمحتاجة\b/giu, "أحتاج"],
    [/\bدلوقتي\b/giu, "الحين"],
    [/\bهلق\b/giu, "الحين"],
    [/\bهسا\b/giu, "الحين"],
    [/\bمش\b/giu, "مو"],
    [/\bموش\b/giu, "مو"],
    [/\bإزاي\b/giu, "كيف"],
    [/\bازاي\b/giu, "كيف"],
    [/\bشو\b/giu, "وش"],
    [/\bإيش\b/giu, "وش"],
  ];
  for (const [pattern, replacement] of replacements) text = text.replace(pattern, replacement);
  return text.replace(/\s+/g, " ").trim();
};

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  let body: any = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  const transcript = typeof body?.transcript === "string" ? body.transcript.trim().slice(0, MAX_CHARS) : "";
  const currentValue = typeof body?.currentValue === "string" ? body.currentValue.trim().slice(0, MAX_CHARS) : "";
  const context = typeof body?.context === "string" ? body.context.trim().slice(0, 300) : "business project request";

  if (!transcript) {
    return res.status(400).json({ success: false, message: "Missing transcript." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const combined = [currentValue, fallbackSaudiArabic(transcript)].filter(Boolean).join(" ").trim();
    return res.status(200).json({ success: true, text: combined, aiNormalized: false });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const prompt = [
      "أنت مساعد استقبال مشاريع لشركة تقنية سعودية.",
      "حوّل كلام العميل التالي إلى نص عربي واضح ومفهوم باللهجة السعودية المهنية الطبيعية.",
      "المطلوب فهم نية العميل وليس التفريغ الحرفي.",
      "إذا كان الكلام بلهجة عربية أخرى أو بلغة أخرى، انقل المعنى إلى صياغة سعودية واضحة.",
      "يجب أن يكون الناتج النهائي بالعربية فقط وبأحرف عربية، باستثناء أسماء العلامات التجارية والمصطلحات التقنية والروابط التي يلزم إبقاؤها كما هي.",
      "ممنوع ترجمة كلام عربي إلى الإنجليزية أو إخراج جملة إنجليزية بدل النص العربي.",
      "حافظ بدقة على أسماء الأشخاص والشركات والعلامات التجارية والأرقام والمبالغ والروابط والمصطلحات التقنية.",
      "لا تضف أي معلومات أو اقتراحات غير موجودة في كلام العميل، ولا تغيّر قصده.",
      "إذا كان جزء غير واضح فلا تخمّن.",
      "اكتب النص النهائي فقط بدون مقدمة وبدون علامات اقتباس.",
      "سياق الحقل: " + context,
      currentValue ? "النص الموجود مسبقاً في الحقل، ادمج معه الكلام الجديد بدون حذف معلومات صحيحة: " + currentValue : "",
      "كلام العميل: " + transcript,
    ].filter(Boolean).join("\n");

    const result = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    const normalized = String(result.text || "").trim();
    const text = normalized || [currentValue, fallbackSaudiArabic(transcript)].filter(Boolean).join(" ").trim();
    return res.status(200).json({ success: true, text, aiNormalized: Boolean(normalized) });
  } catch (error: any) {
    // Never log the customer's raw transcript.
    console.warn("Voice normalization failed:", error?.message || "unknown_error");
    const text = [currentValue, fallbackSaudiArabic(transcript)].filter(Boolean).join(" ").trim();
    return res.status(200).json({ success: true, text, aiNormalized: false });
  }
}
