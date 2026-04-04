import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { QUIZ_QUESTIONS, CHRONOTYPES, calculateChronotype } from "@/data/quiz";

interface QuizProps {
  onBack: () => void;
  onComplete: (chronotype: string) => void;
}

const ChronotypeQuiz = ({ onBack, onComplete }: QuizProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (optIdx: number) => {
    const newAnswers = [...answers, optIdx];
    setAnswers(newAnswers);

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const ct = calculateChronotype(newAnswers);
      setResult(ct);
    }
  };

  if (result) {
    const ct = CHRONOTYPES[result];
    const colorMap: Record<string, string> = {
      lion: "hsl(38 92% 50%)",
      bear: "hsl(142 71% 45%)",
      wolf: "hsl(258 90% 66%)",
      dolphin: "hsl(188 95% 42%)",
    };
    const accentColor = colorMap[ct.color] || "hsl(239 84% 67%)";

    return (
      <div className="min-h-screen px-4 py-8 max-w-md mx-auto animate-fade-up">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{ct.emoji}</div>
          <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
            {ct.name}
          </h2>
          <p className="text-sm font-medium" style={{ color: accentColor }}>
            {ct.tag}
          </p>
        </div>

        <div className="rounded-xl bg-glass p-5 mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{ct.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl bg-glass p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Pico</div>
            <div className="font-serif text-lg font-bold text-foreground">{ct.peak}</div>
          </div>
          <div className="rounded-xl bg-glass p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Sono Ideal</div>
            <div className="font-serif text-lg font-bold text-foreground">{ct.sleep}</div>
          </div>
        </div>

        <div className="rounded-xl bg-glass p-5 mb-4">
          <div className="text-xs font-semibold tracking-wider mb-3" style={{ color: accentColor }}>
            PONTOS FORTES
          </div>
          {ct.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-2 mb-2 last:mb-0">
              <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: accentColor }} />
              <span className="text-sm text-foreground">{s}</span>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-5 mb-6" style={{ background: `${accentColor}12`, borderLeft: `3px solid ${accentColor}` }}>
          <p className="text-sm text-foreground leading-relaxed italic">"{ct.tip}"</p>
        </div>

        <button
          onClick={() => onComplete(result)}
          className="w-full py-4 rounded-xl font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
          style={{ background: "var(--gradient-primary)" }}
        >
          Continuar para o Programa
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen px-4 py-8 max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </button>

      {/* Progress */}
      <div className="h-1 rounded-full bg-muted mb-6">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
        />
      </div>

      <p className="text-xs text-muted-foreground mb-2">{step + 1} de {QUIZ_QUESTIONS.length}</p>

      <h2 className="font-serif text-xl font-bold text-foreground mb-8 animate-slide-up" key={step}>
        {q.text}
      </h2>

      <div className="space-y-3" key={`opts-${step}`}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="w-full text-left p-4 rounded-xl border border-border bg-card/50 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98] animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChronotypeQuiz;
