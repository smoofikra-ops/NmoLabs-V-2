import React, { useEffect, useRef, useState } from "react";
import { Loader2, Mic, Square } from "lucide-react";
import { motion } from "motion/react";

type VoiceFieldButtonProps = {
  value: string;
  onChange: (value: string) => void;
  context: string;
  compact?: boolean;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
};

const getSpeechRecognition = () => {
  if (typeof window === "undefined") return null;
  const w = window as any;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

const normalizeSaudi = async (transcript: string, context: string, currentValue: string) => {
  const response = await fetch("/api/voice-normalize", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ transcript, context, currentValue }),
  });

  if (!response.ok) throw new Error("normalization_failed");
  const data = await response.json();
  return typeof data?.text === "string" && data.text.trim() ? data.text.trim() : transcript;
};

export const VoiceFieldButton = ({
  value,
  onChange,
  context,
  compact = false,
}: VoiceFieldButtonProps) => {
  const [state, setState] = useState<"idle" | "listening" | "processing">("idle");
  const [error, setError] = useState("");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const baseValueRef = useRef("");
  const finalTranscriptRef = useRef("");
  const resultPartsRef = useRef<Map<number, string>>(new Map());
  const stopTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
      try { recognitionRef.current?.abort(); } catch {}
    };
  }, []);

  const finishAndNormalize = async () => {
    if (stopTimerRef.current) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }

    const transcript = finalTranscriptRef.current.trim();
    recognitionRef.current = null;

    if (!transcript) {
      setState("idle");
      return;
    }

    setState("processing");
    try {
      const normalized = await normalizeSaudi(transcript, context, baseValueRef.current);
      onChange(normalized);
      setError("");
    } catch {
      // Keep the speech transcript if the normalization service is unavailable.
      const merged = [baseValueRef.current.trim(), transcript].filter(Boolean).join(" ");
      onChange(merged);
      setError("تم تحويل الصوت لنص، وتقدر تعدله إذا احتجت.");
    } finally {
      setState("idle");
    }
  };

  const startListening = () => {
    setError("");

    if (state === "listening") {
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) {
      setError("الإدخال الصوتي غير مدعوم في هذا المتصفح حالياً.");
      return;
    }

    try {
      const recognition: SpeechRecognitionLike = new SpeechRecognitionCtor();
      recognition.continuous = true;
      recognition.interimResults = true;
      // The KYC experience is Arabic-first. Pin speech recognition to Saudi Arabic so
      // an English browser locale never makes Arabic speech get interpreted as English.
      // Multilingual speech-to-Saudi-Arabic belongs in the server AI audio path.
      recognition.lang = "ar-SA";
      recognition.maxAlternatives = 1;

      baseValueRef.current = value;
      finalTranscriptRef.current = "";
      resultPartsRef.current = new Map();
      recognitionRef.current = recognition;

      recognition.onresult = (event: any) => {
        const finalParts = resultPartsRef.current;
        let interimText = "";

        for (let i = 0; i < event.results.length; i += 1) {
          const piece = String(event.results[i][0]?.transcript || "").trim();
          if (!piece) continue;

          if (event.results[i].isFinal) {
            finalParts.set(i, piece);
          } else {
            interimText = [interimText, piece].filter(Boolean).join(" ");
          }
        }

        const orderedFinalParts = Array.from(finalParts.entries())
          .sort(([a], [b]) => a - b)
          .map(([, piece]) => piece)
          .filter((piece, index, all) => {
            if (index === 0) return true;
            const current = piece.replace(/\s+/g, " ").trim().toLowerCase();
            const previous = all[index - 1].replace(/\s+/g, " ").trim().toLowerCase();
            return current !== previous;
          });

        const finalText = orderedFinalParts.join(" ").trim();
        finalTranscriptRef.current = finalText;

        const liveText = [baseValueRef.current.trim(), finalText, interimText.trim()]
          .filter(Boolean)
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        onChange(liveText);
      };

      recognition.onerror = (event: any) => {
        if (event?.error === "aborted") return;
        setError(
          event?.error === "not-allowed"
            ? "اسمح للمتصفح باستخدام الميكروفون عشان تقدر تتكلم."
            : "ما قدرنا نلتقط الصوت بوضوح. جرّب مرة ثانية."
        );
        setState("idle");
      };

      recognition.onend = () => {
        if (state !== "processing") void finishAndNormalize();
      };

      recognition.start();
      setState("listening");

      // Keep entries concise and avoid long-running microphone sessions.
      stopTimerRef.current = window.setTimeout(() => {
        try { recognition.stop(); } catch {}
      }, 45000);
    } catch {
      setState("idle");
      setError("تعذر تشغيل الميكروفون. جرّب مرة ثانية.");
    }
  };

  const label =
    state === "listening"
      ? "إيقاف التسجيل"
      : state === "processing"
        ? "جاري ترتيب كلامك..."
        : "تكلّم بدل الكتابة";

  return (
    <div className={compact ? "mt-2" : "mt-3"}>
      <motion.button
        type="button"
        onClick={startListening}
        disabled={state === "processing"}
        whileTap={{ scale: 0.96 }}
        aria-label={label}
        className={
          "group inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-black transition-all " +
          (state === "listening"
            ? "border-red-400/60 bg-red-500/10 text-red-500 shadow-[0_0_0_6px_rgba(239,68,68,0.08)]"
            : "border-[var(--interactive-border)] bg-[var(--surface-secondary)] text-[var(--color-primary)] hover:border-[var(--color-primary)]")
        }
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-primary)]">
          {state === "processing" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : state === "listening" ? (
            <>
              <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
              <Square size={13} fill="currentColor" className="relative z-10" />
            </>
          ) : (
            <>
              <span className="absolute inset-0 rounded-full bg-[var(--color-primary)]/15 animate-pulse" />
              <Mic size={16} className="relative z-10" />
            </>
          )}
        </span>
        <span>{label}</span>
      </motion.button>

      <p className="mt-1.5 text-[11px] font-medium leading-5 text-[var(--text-muted)]">
        {state === "listening"
          ? "تكلم بطبيعتك وبلهجتك. بنرتب كلامك داخل الحقل بصياغة سعودية واضحة."
          : "وفر وقتك: تكلم بطبيعتك، وإحنا نحول كلامك لنص واضح ومناسب للطلب."}
      </p>

      {error && <p className="mt-1 text-[11px] font-bold text-amber-600 dark:text-amber-400">{error}</p>}
    </div>
  );
};
