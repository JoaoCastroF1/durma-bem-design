import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { ISI_QUESTIONS, getISICategory } from "@/data/isi";
import StarField from "@/components/StarField";

interface ISIProps {
  onBack: () => void;
  onComplete: (score: number) => void;
}

const severityColors = ["hsl(155 60% 45%)", "hsl(42 90% 55%)", "hsl(25 85% 55%)", "hsl(0 72% 55%)"];

const ISIAssessment = ({ onBack, onComplete }: ISIProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleAnswer = (val: number) => {
    setSelected(val);
    setTimeout(() => {
      const newAnswers = [...answers, val];
      setAnswers(newAnswers);
      setSelected(null);

      if (step < ISI_QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setResult(newAnswers.reduce((s, v) => s + v, 0));
      }
    }, 300);
  };

  if (result !== null) {
    const cat = getISICategory(result);
    const accent = severityColors[cat.severity];
    const percentage = Math.round((result / 28) * 100);

    return (
      <div className="min-h-screen relative">
        <StarField />
        <div className="relative z-10 px-5 py-10 max-w-sm mx-auto">
          {/* Score display */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="relative inline-block mb-5">
              <svg width="140" height="140" viewBox="0 0 140 140" className="transform -rotate-90">
                <circle cx="70" cy="70" r="60" fill="none" stroke="hsl(225 15% 13%)" strokeWidth="6" />
                <circle
                  cx="70" cy="70" r="60" fill="none"
                  stroke={accent}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - percentage / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-4xl font-bold" style={{ color: accent }}>{result}</span>
                <span className="text-[10px] text-muted-foreground">/28</span>
              </div>
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold" style={{ background: `${accent}15`, color: accent }}>
              {cat.label}
            </div>
          </div>

          {/* Scale */}
          <div className="card-premium p-5 mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="text-[10px] font-semibold text-muted-foreground/70 tracking-[0.15em] mb-4">ESCALA ISI</div>
            <div className="space-y-1.5">
              {[
                { range: "0–7", label: "Sem insônia clínica", sev: 0 },
                { range: "8–14", label: "Insônia sublimiar", sev: 1 },
                { range: "15–21", label: "Insônia moderada", sev: 2 },
                { range: "22–28", label: "Insônia severa", sev: 3 },
              ].map((r, i) => {
                const active = cat.severity === r.sev;
                return (
                  <div key={i} className={`flex justify-between items-center px-3.5 py-2.5 rounded-xl text-[12px] transition-all ${
                    active ? "bg-primary/8 border border-primary/15" : "border border-transparent"
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: severityColors[r.sev], opacity: active ? 1 : 0.3 }} />
                      <span className={active ? "text-foreground font-medium" : "text-muted-foreground/70"}>{r.label}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/50 tabular-nums">{r.range}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendation */}
          {result >= 8 && (
            <div className="card-premium p-5 mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: "var(--gradient-subtle)" }}>
                <span className="text-sm">💡</span>
              </div>
              <p className="text-[13px] text-foreground/80 leading-relaxed">
                {result >= 15
                  ? "Seu nível de insônia indica benefício significativo com o programa TCC-I de 6 semanas."
                  : "Sua insônia é sublimiar, mas o programa pode prevenir cronificação e melhorar qualidade de vida."}
              </p>
            </div>
          )}

          <button
            onClick={() => onComplete(result)}
            className="btn-primary w-full text-[14px] animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {result >= 8 ? "Começar o Programa TCC-I" : "Explorar o Programa"}
          </button>
        </div>
      </div>
    );
  }

  const q = ISI_QUESTIONS[step];
  const progress = ((step + 1) / ISI_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen relative">
      <StarField />
      <div className="relative z-10 px-5 py-8 max-w-sm mx-auto">
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground/70 text-[13px] mb-8 hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-[3px] rounded-full bg-muted/50">
            <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%`, background: "var(--gradient-primary)" }} />
          </div>
          <span className="text-[11px] text-muted-foreground font-medium tabular-nums">{step + 1}/{ISI_QUESTIONS.length}</span>
        </div>

        {/* Category tag */}
        <div key={step}>
          <div className="inline-block px-3 py-1 rounded-full bg-primary/8 border border-primary/10 mb-4 animate-slide-up">
            <span className="text-[10px] text-primary/70 font-medium">{q.title}</span>
          </div>

          <h2 className="font-serif text-[1.4rem] font-bold text-foreground leading-snug mb-10 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            {q.question}
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
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 transition-all ${
                  selected === i ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground/70"
                }`}>
                  {i}
                </div>
                <span className="text-foreground/90">{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ISIAssessment;
