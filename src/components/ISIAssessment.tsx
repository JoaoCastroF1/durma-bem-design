import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ISI_QUESTIONS, getISICategory } from "@/data/isi";

interface ISIProps {
  onBack: () => void;
  onComplete: (score: number) => void;
}

const ISIAssessment = ({ onBack, onComplete }: ISIProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const handleAnswer = (val: number) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);

    if (step < ISI_QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const total = newAnswers.reduce((s, v) => s + v, 0);
      setResult(total);
    }
  };

  if (result !== null) {
    const cat = getISICategory(result);
    const colorMap: Record<string, string> = {
      success: "hsl(142 76% 36%)",
      warning: "hsl(38 92% 50%)",
      destructive: "hsl(0 84% 60%)",
    };
    const accentColor = colorMap[cat.color] || "hsl(142 76% 36%)";

    return (
      <div className="min-h-screen px-4 py-8 max-w-md mx-auto animate-fade-up">
        <div className="text-center mb-8">
          <div className="font-serif text-6xl font-bold mb-2" style={{ color: accentColor }}>{result}</div>
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold" style={{ background: `${accentColor}18`, color: accentColor }}>
            {cat.label}
          </div>
        </div>

        <div className="rounded-xl bg-glass p-5 mb-4">
          <div className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">ESCALA ISI</div>
          <div className="space-y-2">
            {[
              { range: "0–7", label: "Sem insônia", active: result <= 7 },
              { range: "8–14", label: "Sublimiar", active: result >= 8 && result <= 14 },
              { range: "15–21", label: "Moderada", active: result >= 15 && result <= 21 },
              { range: "22–28", label: "Severa", active: result >= 22 },
            ].map((r, i) => (
              <div key={i} className={`flex justify-between items-center p-3 rounded-lg text-sm transition-all ${r.active ? "bg-primary/10 border border-primary/20" : ""}`}>
                <span className={r.active ? "text-foreground font-medium" : "text-muted-foreground"}>{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.range}</span>
              </div>
            ))}
          </div>
        </div>

        {result >= 8 && (
          <div className="rounded-xl p-5 mb-6" style={{ background: "var(--gradient-subtle)", borderLeft: "3px solid hsl(var(--primary))" }}>
            <p className="text-sm text-foreground leading-relaxed">
              {result >= 15
                ? "Seu nível de insônia indica benefício significativo com o programa TCC-I de 6 semanas."
                : "Sua insônia é sublimiar, mas o programa pode ajudar a prevenir cronificação."}
            </p>
          </div>
        )}

        <button
          onClick={() => onComplete(result)}
          className="w-full py-4 rounded-xl font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
          style={{ background: "var(--gradient-primary)" }}
        >
          {result >= 8 ? "Começar o Programa TCC-I" : "Ver o Programa"}
        </button>
      </div>
    );
  }

  const q = ISI_QUESTIONS[step];
  const progress = ((step + 1) / ISI_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen px-4 py-8 max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="h-1 rounded-full bg-muted mb-6">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
      </div>

      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary mb-4">
        {q.title}
      </div>

      <h2 className="font-serif text-xl font-bold text-foreground mb-8 animate-slide-up" key={step}>
        {q.question}
      </h2>

      <div className="space-y-3" key={`opts-${step}`}>
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="w-full text-left p-4 rounded-xl border border-border bg-card/50 text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98] animate-slide-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className="text-muted-foreground mr-2">{i}</span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ISIAssessment;
