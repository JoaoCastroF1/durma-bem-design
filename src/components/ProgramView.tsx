import { useState } from "react";
import { ChevronLeft, BookOpen, PenLine, BarChart3, Check, Lock } from "lucide-react";
import { WEEKS } from "@/data/program";

interface ProgramProps {
  onBack: () => void;
}

const typeIcons: Record<string, typeof BookOpen> = {
  lesson: BookOpen,
  diary: PenLine,
  review: BarChart3,
};

const typeLabels: Record<string, string> = {
  lesson: "Aula",
  diary: "Diário",
  review: "Revisão",
};

const weekColors = [
  "hsl(231 70% 70%)",
  "hsl(239 84% 67%)",
  "hsl(258 90% 66%)",
  "hsl(270 60% 60%)",
  "hsl(280 80% 65%)",
  "hsl(290 70% 65%)",
  "hsl(330 70% 65%)",
];

const ProgramView = ({ onBack }: ProgramProps) => {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(0);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const toggleModule = (id: string) => {
    setCompletedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalMods = WEEKS.reduce((s, w) => s + w.modules.length, 0);
  const doneMods = completedModules.size;
  const progress = Math.round((doneMods / totalMods) * 100);

  return (
    <div className="min-h-screen px-4 py-8 max-w-md mx-auto">
      <button onClick={onBack} className="flex items-center gap-1 text-muted-foreground text-sm mb-6 hover:text-foreground transition-colors">
        <ChevronLeft className="w-4 h-4" /> Voltar
      </button>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-xs font-semibold tracking-widest text-primary mb-2">PROGRAMA TCC-I</div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Durma Melhor</h1>
      </div>

      {/* Progress bar */}
      <div className="rounded-xl bg-glass p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-muted-foreground">Progresso</span>
          <span className="text-xs font-semibold text-primary">{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-muted-foreground">{doneMods}/{totalMods} módulos</span>
          <span className="text-[10px] text-muted-foreground">6 semanas</span>
        </div>
      </div>

      {/* Weeks */}
      <div className="space-y-3">
        {WEEKS.map((week, wIdx) => {
          const isExpanded = expandedWeek === week.id;
          const weekDone = week.modules.every(m => completedModules.has(m.id));
          const weekProgress = week.modules.filter(m => completedModules.has(m.id)).length;
          const color = weekColors[wIdx] || weekColors[0];

          return (
            <div key={week.id} className="rounded-xl bg-glass overflow-hidden animate-fade-in" style={{ animationDelay: `${wIdx * 0.05}s` }}>
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                className="w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-primary/5"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${color}18` }}
                >
                  {weekDone ? <Check className="w-5 h-5" style={{ color }} /> : week.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{week.title}</span>
                    {weekProgress > 0 && !weekDone && (
                      <span className="text-[10px] text-muted-foreground">{weekProgress}/{week.modules.length}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{week.subtitle}</span>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <ChevronLeft className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-[-90deg]" : "rotate-180"}`} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-2 animate-slide-up">
                  {week.modules.map((mod) => {
                    const Icon = typeIcons[mod.type] || BookOpen;
                    const done = completedModules.has(mod.id);

                    return (
                      <button
                        key={mod.id}
                        onClick={() => toggleModule(mod.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                          done ? "bg-primary/10 border border-primary/20" : "bg-muted/30 border border-transparent hover:border-border"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          done ? "bg-primary/20" : "bg-muted"
                        }`}>
                          {done ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Icon className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-foreground">{mod.title}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {typeLabels[mod.type]} · {mod.duration}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramView;
