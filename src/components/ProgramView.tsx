import { useState } from "react";
import { ChevronLeft, ChevronDown, BookOpen, PenLine, BarChart3, Check, Moon } from "lucide-react";
import { WEEKS } from "@/data/program";
import StarField from "@/components/StarField";

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

const weekGradients = [
  ["hsl(225 60% 60%)", "hsl(240 70% 68%)"],
  ["hsl(235 70% 62%)", "hsl(250 80% 68%)"],
  ["hsl(250 75% 60%)", "hsl(265 70% 65%)"],
  ["hsl(260 65% 58%)", "hsl(275 60% 62%)"],
  ["hsl(270 55% 56%)", "hsl(285 50% 60%)"],
  ["hsl(280 50% 58%)", "hsl(295 45% 62%)"],
  ["hsl(320 55% 55%)", "hsl(340 50% 60%)"],
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
    <div className="min-h-screen relative">
      <StarField />
      <div className="relative z-10 px-5 py-8 max-w-sm mx-auto">
        {/* Nav */}
        <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground/70 text-[13px] mb-8 hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>

        {/* Header */}
        <div className="text-center mb-8 animate-fade-up">
          <Moon className="w-6 h-6 text-primary/50 mx-auto mb-3" />
          <p className="text-[10px] font-semibold tracking-[0.2em] text-primary/60 mb-2">PROGRAMA TCC-I</p>
          <h1 className="font-serif text-[1.75rem] font-bold text-foreground tracking-tight">Durma Melhor</h1>
        </div>

        {/* Progress card */}
        <div className="card-premium p-5 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex justify-between items-end mb-3">
            <div>
              <div className="text-[10px] text-muted-foreground/60 tracking-wider uppercase mb-1">Progresso geral</div>
              <div className="font-serif text-2xl font-bold text-gradient-primary">{progress}%</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-muted-foreground tabular-nums">{doneMods}/{totalMods}</div>
              <div className="text-[9px] text-muted-foreground/50">módulos</div>
            </div>
          </div>
          <div className="h-[5px] rounded-full bg-muted/40">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%`, background: "var(--gradient-primary)" }}
            />
          </div>
        </div>

        {/* Weeks */}
        <div className="space-y-2.5">
          {WEEKS.map((week, wIdx) => {
            const isExpanded = expandedWeek === week.id;
            const weekDone = week.modules.every(m => completedModules.has(m.id));
            const weekProgress = week.modules.filter(m => completedModules.has(m.id)).length;
            const [c1, c2] = weekGradients[wIdx] || weekGradients[0];

            return (
              <div
                key={week.id}
                className="card-premium overflow-hidden animate-fade-up"
                style={{ animationDelay: `${0.15 + wIdx * 0.05}s` }}
              >
                <button
                  onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                  className="w-full flex items-center gap-3.5 p-4 text-left transition-colors hover:bg-primary/[0.03]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0 transition-transform duration-300"
                    style={{
                      background: weekDone
                        ? `linear-gradient(135deg, ${c1}20, ${c2}10)`
                        : `linear-gradient(135deg, ${c1}15, ${c2}08)`,
                    }}
                  >
                    {weekDone ? (
                      <Check className="w-4.5 h-4.5" style={{ color: c1 }} />
                    ) : (
                      <span>{week.icon}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-foreground">{week.title}</span>
                      {weekProgress > 0 && !weekDone && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary/70 tabular-nums">{weekProgress}/{week.modules.length}</span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground/70">{week.subtitle}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground/40 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-1.5">
                    <div className="divider-glow mb-3" />
                    {week.modules.map((mod, mIdx) => {
                      const Icon = typeIcons[mod.type] || BookOpen;
                      const done = completedModules.has(mod.id);

                      return (
                        <button
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 animate-slide-up ${
                            done
                              ? "bg-primary/8 border border-primary/15"
                              : "border border-transparent hover:bg-muted/20 hover:border-border/30"
                          }`}
                          style={{ animationDelay: `${mIdx * 0.04}s` }}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                            done ? "bg-primary/15" : "bg-muted/40"
                          }`}>
                            {done ? (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <Icon className="w-3.5 h-3.5 text-muted-foreground/60" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] text-foreground/90 font-medium">{mod.title}</div>
                            <div className="text-[10px] text-muted-foreground/50 mt-0.5">
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
    </div>
  );
};

export default ProgramView;
