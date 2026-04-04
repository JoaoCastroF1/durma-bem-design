import { Moon, ChevronRight, Brain, Clock, BookOpen, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

interface LandingPageProps {
  onStartQuiz: () => void;
  onStartISI: () => void;
  onStartProgram: () => void;
}

const LandingPage = ({ onStartQuiz, onStartISI, onStartProgram }: LandingPageProps) => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up">
            <Moon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">TCC-I baseada em evidências</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-gradient">Durma</span>{" "}
            <span className="text-foreground">Melhor</span>
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Programa de 6 semanas para tratar insônia crônica. Sem medicação. Com ciência.
          </p>
          
          <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={onStartProgram}
              className="w-full py-4 px-6 rounded-xl font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg glow-primary"
              style={{ background: "var(--gradient-primary)" }}
            >
              Começar o Programa
              <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onStartQuiz}
                className="py-3 px-4 rounded-xl border border-border bg-card/50 text-foreground font-medium text-sm transition-all hover:bg-card hover:border-primary/30"
              >
                🧬 Meu Cronotipo
              </button>
              <button
                onClick={onStartISI}
                className="py-3 px-4 rounded-xl border border-border bg-card/50 text-foreground font-medium text-sm transition-all hover:bg-card hover:border-primary/30"
              >
                📋 Avaliar Insônia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 max-w-lg mx-auto">
        <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-3">
          Como funciona
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10">
          Tratamento de primeira linha recomendado pela AASM
        </p>
        
        <div className="space-y-4">
          {[
            { icon: Brain, title: "Psicoeducação", desc: "Entenda os dois sistemas que regulam seu sono: pressão homeostática e ritmo circadiano." },
            { icon: Clock, title: "Restrição de Sono", desc: "Alinhe o tempo na cama ao tempo real de sono, aumentando a eficiência progressivamente." },
            { icon: BookOpen, title: "Reestruturação Cognitiva", desc: "Identifique e corrija crenças disfuncionais que alimentam a ansiedade sobre dormir." },
            { icon: Shield, title: "Controle de Estímulos", desc: "Recondicione a associação cama-sono, quebrando o ciclo de hiperalerta noturno." },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl bg-glass transition-all hover:border-primary/20"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gradient-subtle)" }}>
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16 max-w-lg mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "6", label: "Semanas" },
            { value: "35", label: "Módulos" },
            { value: "80%", label: "Eficácia" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-glass">
              <div className="font-serif text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 max-w-lg mx-auto text-center">
        <p className="text-xs text-muted-foreground">
          Dr. João Pedro Castro · Psiquiatra · CRM-XX/XXXXX
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
