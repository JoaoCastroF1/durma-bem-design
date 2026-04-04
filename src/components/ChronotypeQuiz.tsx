import { useState } from "react";
import { ChevronLeft, Sparkles } from "lucide-react";
import { QUIZ_QUESTIONS, CHRONOTYPES, calculateChronotype } from "@/data/quiz";
import StarField from "@/components/StarField";

interface QuizProps {
  onBack: () => void;
  onComplete: (chronotype: string) => void;
}

const colorMap: Record<string, string> = {
  lion: "hsl(42 90% 55%)",
  bear: "hsl(155 60% 45%)",
  wolf: "hsl(265 70% 62%)",
  dolphin: "hsl(192 80% 48%)",
};

const ChronotypeQuiz = ({ onBack, onComplete }: QuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (optIdx: number) => {
    setSelected(optIdx);
    setTimeout(() => {
      const newAnswers = [...answers, optIdx];
      setAnswers(newAnswers);
      setSelected(null);

      if (step < QUIZ_QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        const ct = calculateChronotype(newAnswers);
        setResult(ct);
      }
    }, 300);
  };

  if (result) {
    const ct = CHRONOTYPES[result];
    const accent = colorMap[ct.color];

    return (
      <div className="min-h-screen relative">
        <StarField />
        <div className="relative z-10 px-5 py-10 max-w-sm mx-auto">
          {/* Result header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="text-7xl mb-5">{ct.emoji}</div>
            <h2 className="font-serif text-4xl font-bold text-foreground mb-2 tracking-tight">
              {ct.name}
            </h2>
            <p className="text-[13px] font-medium" style={{ color: accent }}>
              {ct.tag}
            </p>
          </div>

          {/* Description */}
          <div className="card-premium p-5 mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <p className="text-[13px] text-muted-foreground leading-[1.8]">{ct.desc}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5 mb-3 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            {[
              { label: "Pico de energia", value: ct.peak },
              { label: "Janela ideal de sono", value: ct.sleep },
            ].map((item, i) => (
              <div key={i} className="card-premium p-4 text-center">
                <div className="text-[10px] text-muted-foreground/70 tracking-wider uppercase mb-2">{item.label}</div>
                <div className="font-serif text-base font-bold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Strengths */}
          <div className="card-premium p-5 mb-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="text-[10px] font-semibold tracking-[0.15em] mb-4" style={{ color: accent }}>
              PONTOS FORTES
            </div>
            <div className="space-y-3">
              {ct.strengths.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                  <span className="text-[13px] text-foreground/90">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tip */}
          <div
            className="rounded-2xl p-5 mb-8 animate-fade-up"
            style={{
              animationDelay: "0.25s",
              background: `linear-gradient(135deg, ${accent}08, ${accent}04)`,
              borderLeft: `2px solid ${accent}60`,
            }}
          >
            <p className="text-[13px] text-foreground/80 leading-relaxed font-serif italic">
              "{ct.tip}"
            </p>
          </div>

          <button
            onClick={() => onComplete(result)}
            className="btn-primary w-full text-[14px] animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Continuar para o Programa
          </button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen relative">
      <StarField />
      <div className="relative z-10 px-5 py-8 max-w-sm mx-auto">
        {/* Nav */}
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground/70 text-[13px] mb-8 hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-[3px] rounded-full bg-muted/50">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
            />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium tabular-nums">{step + 1}/{QUIZ_QUESTIONS.length}</span>
        </div>

        {/* Question */}
        <div className="mb-10" key={step}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/8 border border-primary/10 mb-4 animate-slide-up">
            <Sparkles className="w-3 h-3 text-primary/60" />
            <span className="text-[10px] text-primary/70">Pergunta {step + 1}</span>
          </div>
          <h2 className="font-serif text-[1.4rem] font-bold text-foreground leading-snug animate-slide-up" style={{ animationDelay: "0.05s" }}>
            {q.text}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-2.5" key={`opts-${step}`}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-2xl border text-[13px] transition-all duration-300 animate-slide-up ${
                selected === i
                  ? "border-primary/50 bg-primary/10 scale-[0.98]"
                  : "border-border/60 bg-card/40 hover:border-primary/25 hover:bg-card/70 active:scale-[0.98]"
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-semibold shrink-0 transition-all ${
                  selected === i
                    ? "bg-primary/20 text-primary"
                    : "bg-muted/50 text-muted-foreground"
                }`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-foreground/90">{opt.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChronotypeQuiz;
