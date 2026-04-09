import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { EMO_QUESTIONS, EMO_DATA } from "@/data/emotions";

type Step = "pick" | "questions" | "result";

const EMOTIONS = [
  { key: "Happy", emoji: "😊", bg: "linear-gradient(135deg, hsl(145 55% 92%), hsl(145 50% 82%))", border: "#86efac", color: "#15803d" },
  { key: "Sad", emoji: "😢", bg: "linear-gradient(135deg, hsl(210 80% 93%), hsl(210 70% 87%))", border: "#93c5fd", color: "#1e40af" },
  { key: "Suffocated", emoji: "😫", bg: "linear-gradient(135deg, hsl(45 95% 90%), hsl(45 85% 80%))", border: "#f59e0b", color: "#92400e" },
  { key: "Cry", emoji: "😭", bg: "linear-gradient(135deg, hsl(0 80% 93%), hsl(0 70% 85%))", border: "#fca5a5", color: "#b91c1c" },
];

export default function EmotionsPage() {
  const nav = useNavigate();
  const [step, setStep] = useState<Step>("pick");
  const [emotion, setEmotion] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const reset = () => {
    setStep("pick");
    setEmotion("");
    setQIdx(0);
    setAnswers([]);
  };

  const pickEmotion = (e: string) => {
    setEmotion(e);
    setQIdx(0);
    setAnswers([]);
    setStep("questions");
  };

  const answerQuestion = (opt: string) => {
    const newAnswers = [...answers, opt];
    setAnswers(newAnswers);
    const qs = EMO_QUESTIONS[emotion];
    if (qIdx + 1 >= qs.length) {
      setStep("result");
    } else {
      setQIdx(qIdx + 1);
    }
  };

  const data = emotion ? EMO_DATA[emotion] : null;
  const questions = emotion ? EMO_QUESTIONS[emotion] : [];

  // Build result insight
  const getInsight = () => {
    if (!data) return "";
    for (const ans of answers) {
      if (data.insights[ans]) return data.insights[ans];
    }
    return `Based on your answers, baby appears to be in a ${emotion.toLowerCase()} state. Follow the recommended activities above and monitor closely. If symptoms persist, consult your paediatrician.`;
  };

  return (
    <>
      <PageHeader title="Baby Emotions" onBack={() => { reset(); nav("/home"); }} />
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {/* Step 1: Pick emotion */}
        {step === "pick" && (
          <div className="bg-card rounded-2xl p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <div className="font-display text-sm font-black text-primary mb-1">How is your baby feeling?</div>
            <p className="text-xs text-muted-foreground mb-4">Tap the expression that best describes baby right now</p>
            <div className="grid grid-cols-2 gap-3">
              {EMOTIONS.map(e => (
                <button key={e.key} onClick={() => pickEmotion(e.key)}
                  className="rounded-2xl p-5 flex flex-col items-center gap-2 active:scale-[0.93] transition-transform"
                  style={{ background: e.bg, border: `2.5px solid ${e.border}` }}>
                  <span className="text-5xl leading-none">{e.emoji}</span>
                  <span className="font-display font-black text-[15px]" style={{ color: e.color }}>{e.key}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: AI Questions */}
        {step === "questions" && data && (
          <>
            <div className="bg-card rounded-2xl p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="text-[44px] mb-1">{data.ico}</div>
              <div className="font-display font-black text-base text-baby-rose">{emotion} Baby</div>
              <p className="text-xs text-muted-foreground">AI is asking you some questions to understand baby better</p>
            </div>

            <div className="bg-card rounded-2xl p-3" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: "var(--gradient-purple)" }}>🤖</div>
                <div className="font-display font-black text-sm" style={{ color: "#5b21b6" }}>AI Assistant</div>
                <div className="ml-auto text-[10px] text-muted-foreground font-bold font-display">
                  Question {qIdx + 1} of {questions.length}
                </div>
              </div>

              <div className="text-sm font-extrabold text-foreground leading-relaxed mb-3 rounded-xl p-3"
                style={{ background: "hsl(270 50% 98%)", borderLeft: "4px solid hsl(270 60% 70%)" }}>
                {questions[qIdx].q}
              </div>

              <div className="flex flex-col gap-2">
                {questions[qIdx].opts.map(opt => (
                  <button key={opt} onClick={() => answerQuestion(opt)}
                    className="w-full text-left rounded-xl border-2 border-border bg-card px-3.5 py-3 text-xs font-extrabold text-foreground transition-all hover:border-accent hover:bg-muted active:scale-[0.97]">
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={reset}
              className="w-full rounded-xl py-3 bg-muted text-xs font-extrabold text-muted-foreground font-display">
              ← Back to Emotions
            </button>
          </>
        )}

        {/* Step 3: Result */}
        {step === "result" && data && (
          <>
            <div className="bg-card rounded-2xl p-4 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="text-[52px] mb-2 leading-none">{data.ico}</div>
              <div className="font-display font-black text-base mb-3" style={{ color: data.color }}>
                {emotion} Baby — Here Is What To Do
              </div>

              <div className="italic text-sm text-muted-foreground rounded-xl p-3 text-left mb-3"
                style={{ background: "hsl(270 50% 98%)", borderLeft: "4px solid hsl(270 60% 70%)" }}>
                "{data.quotes[Math.floor(Math.random() * data.quotes.length)]}"
              </div>

              <div className="rounded-xl p-3 text-left"
                style={{ background: "hsl(25 100% 97%)", borderLeft: "4px solid hsl(25 90% 60%)" }}>
                <div className="font-display font-black text-[11px] uppercase tracking-wide mb-2" style={{ color: "#ea580c" }}>
                  ✅ Recommended Activities
                </div>
                <div className="text-xs text-foreground leading-relaxed space-y-2">
                  {data.activities.map((a, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 mt-0.5 text-primary-foreground"
                        style={{ background: data.color }}>{i + 1}</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-3" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                  style={{ background: "var(--gradient-purple)" }}>🤖</div>
                <div className="font-display font-black text-xs" style={{ color: "#5b21b6" }}>AI Personalised Insight</div>
              </div>
              <div className="text-xs text-foreground leading-relaxed rounded-lg p-3"
                style={{ background: "hsl(270 50% 98%)" }}>
                {getInsight()}
              </div>
            </div>

            <button onClick={reset}
              className="w-full rounded-xl py-3 text-sm font-display font-black text-primary-foreground"
              style={{ background: "var(--gradient-btn)", boxShadow: "var(--shadow-btn)" }}>
              ← Check Another Emotion
            </button>
          </>
        )}
      </div>
    </>
  );
}
