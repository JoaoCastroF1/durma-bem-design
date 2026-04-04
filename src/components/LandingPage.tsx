import { Moon, ChevronRight, Brain, Clock, BookOpen, Shield, Sparkles, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import StarField from "@/components/StarField";

interface LandingPageProps {
  onStartQuiz: () => void;
  onStartISI: () => void;
  onStartProgram: () => void;
}

const LandingPage = ({ onStartQuiz, onStartISI, onStartProgram }: LandingPageProps) => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        {/* Background layers */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "var(--gradient-night)" }} />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        <StarField />

        {/* Content */}
        <div className="relative z-10 text-center max-w-sm mx-auto">
          {/* Badge */}
          <div className="animate-fade-up mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-medium tracking-wide text-primary/90">BASEADO EM EVIDÊNCIAS CLÍNICAS</span>
            </div>
          </div>

          {/* Title */}
          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <h1 className="font-serif text-[3.25rem] leading-[0.95] font-bold tracking-tight mb-5">
              <span className="text-gradient-primary">Durma</span>
              <br />
              <span className="text-foreground">Melhor</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-[15px] text-muted-foreground leading-relaxed mb-3 font-light">
              Programa de 6 semanas para tratar insônia crônica.
            </p>
            <p className="text-[13px] text-muted-foreground/70 mb-10">
              Sem medicação. Com ciência. No seu tempo.
            </p>
          </div>

          {/* CTA */}
          <div className="animate-fade-up space-y-3" style={{ animationDelay: "0.45s" }}>
            <button onClick={onStartProgram} className="btn-primary w-full text-[15px] flex items-center justify-center gap-2">
              Começar Agora
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button onClick={onStartQuiz} className="btn-ghost text-[13px] flex items-center justify-center gap-1.5">
                🧬 Cronotipo
              </button>
              <button onClick={onStartISI} className="btn-ghost text-[13px] flex items-center justify-center gap-1.5">
                📋 Triagem ISI
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: "0.8s" }}>
          <ArrowDown className="w-4 h-4 text-muted-foreground/40 animate-float" />
        </div>
      </section>

      {/* Divider */}
      <div className="divider-glow" />

      {/* Method section */}
      <section className="px-6 py-20 max-w-sm mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary/70 mb-3">O MÉTODO</p>
          <h2 className="font-serif text-[1.75rem] font-bold text-foreground leading-tight">
            Quatro pilares da
            <br />
            <span className="text-gradient-warm">TCC para Insônia</span>
          </h2>
        </div>

        <div className="space-y-3">
          {[
            { icon: Brain, title: "Psicoeducação", desc: "Entenda pressão homeostática e ritmo circadiano. Conhecimento é o primeiro passo.", num: "01" },
            { icon: Clock, title: "Restrição de Sono", desc: "Alinhe o tempo na cama ao tempo real de sono. Eficiência acima de tudo.", num: "02" },
            { icon: Shield, title: "Controle de Estímulos", desc: "Recondicione a associação cama-sono. Quebre o ciclo de hiperalerta.", num: "03" },
            { icon: BookOpen, title: "Reestruturação Cognitiva", desc: "Identifique crenças disfuncionais que alimentam a ansiedade noturna.", num: "04" },
          ].map((feature, i) => (
            <div
              key={i}
              className="card-premium p-5 animate-fade-up group cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{ background: "var(--gradient-subtle)" }}
                  >
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold text-primary/40">{feature.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-[13px] mb-1.5">{feature.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-glow" />

      {/* Numbers */}
      <section className="px-6 py-16 max-w-sm mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "6", label: "semanas", sub: "de programa" },
            { value: "35", label: "módulos", sub: "de conteúdo" },
            { value: "80%", label: "eficácia", sub: "comprovada" },
          ].map((stat, i) => (
            <div key={i} className="card-premium p-4 text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="font-serif text-2xl font-bold text-gradient-primary mb-0.5">{stat.value}</div>
              <div className="text-[11px] font-medium text-foreground/80">{stat.label}</div>
              <div className="text-[9px] text-muted-foreground mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-glow" />

      {/* Social proof */}
      <section className="px-6 py-16 max-w-sm mx-auto">
        <div className="text-center mb-8">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-primary/70 mb-3">RESPALDO CIENTÍFICO</p>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Tratamento de primeira linha
          </h2>
        </div>

        <div className="card-premium p-5">
          <blockquote className="text-[13px] text-foreground/90 leading-relaxed italic font-serif mb-4">
            "A TCC-I tem eficácia equivalente ou superior à farmacoterapia no curto prazo, com resultados mais duradouros no longo prazo."
          </blockquote>
          <div className="divider-glow mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Consenso Brasileiro — ABS, 2023</span>
            <span className="text-[11px] text-primary/60">AASM</span>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-16 max-w-sm mx-auto">
        <div className="card-premium p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <StarField />
          </div>
          <div className="relative z-10">
            <Moon className="w-8 h-8 text-primary/60 mx-auto mb-4 animate-float" />
            <h3 className="font-serif text-lg font-bold text-foreground mb-2">Pronto para dormir melhor?</h3>
            <p className="text-[12px] text-muted-foreground mb-5">Comece sua jornada de 6 semanas hoje.</p>
            <button onClick={onStartProgram} className="btn-primary w-full text-[14px]">
              Começar o Programa
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 max-w-sm mx-auto text-center">
        <div className="divider-glow mb-6" />
        <p className="text-[11px] text-muted-foreground/60 leading-relaxed">
          Dr. João Pedro Castro · Psiquiatra
        </p>
        <p className="text-[10px] text-muted-foreground/40 mt-1">
          Programa baseado no protocolo TCC-I · 2026
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
