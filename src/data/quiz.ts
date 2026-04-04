export interface QuizOption {
  label: string;
  scores: Record<string, number>;
}

export interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { text: "A que horas você se sente mais alerta?", options: [{ label: "Manhã (antes das 10h)", scores: { L: 3, U: 1 } }, { label: "Final da manhã (10h-12h)", scores: { U: 3, L: 1 } }, { label: "Tarde (14h-18h)", scores: { W: 2, U: 1 } }, { label: "Noite (após 20h)", scores: { W: 3, D: 1 } }] },
  { text: "Como se sente ao acordar sem despertador?", options: [{ label: "Ótimo, desperto", scores: { L: 3, U: 1 } }, { label: "Bem, com lentidão", scores: { U: 3 } }, { label: "Devagar, preciso de tempo", scores: { W: 3 } }, { label: "Cansado mesmo dormindo", scores: { D: 3 } }] },
  { text: "Costuma acordar antes do despertador?", options: [{ label: "Quase sempre", scores: { L: 3 } }, { label: "Às vezes", scores: { U: 2, D: 1 } }, { label: "Raramente", scores: { W: 2, U: 1 } }, { label: "Nunca", scores: { W: 3 } }] },
  { text: "Qual seu horário ideal de sono?", options: [{ label: "21h às 5h", scores: { L: 3 } }, { label: "22h30 às 6h30", scores: { U: 3 } }, { label: "0h às 8h", scores: { W: 3 } }, { label: "Irregular / varia muito", scores: { D: 3 } }] },
  { text: "Melhor horário para treinar?", options: [{ label: "Manhã cedo (6h-8h)", scores: { L: 3 } }, { label: "Meio da manhã (9h-11h)", scores: { U: 3, L: 1 } }, { label: "Tarde (16h-19h)", scores: { W: 2, U: 1 } }, { label: "Noite (após 20h)", scores: { W: 3 } }] },
  { text: "Como se sente entre 21h e 23h?", options: [{ label: "Cansado, pronto pra dormir", scores: { L: 3 } }, { label: "Normal, desacelerando", scores: { U: 3 } }, { label: "Muito ativo", scores: { W: 3 } }, { label: "Ansioso / mente acelerada", scores: { D: 3 } }] },
  { text: "Costuma cochilar durante o dia?", options: [{ label: "Frequentemente", scores: { D: 2, W: 1 } }, { label: "Às vezes", scores: { U: 2 } }, { label: "Raramente", scores: { L: 2, U: 1 } }, { label: "Nunca consigo", scores: { D: 3 } }] },
  { text: "Sente sono antes das 22h?", options: [{ label: "Frequentemente", scores: { L: 3 } }, { label: "Às vezes", scores: { U: 3, L: 1 } }, { label: "Raramente", scores: { W: 3 } }, { label: "Quase nunca", scores: { W: 2, D: 1 } }] },
  { text: "Tem dificuldade para adormecer?", options: [{ label: "Nenhuma", scores: { L: 2, U: 2 } }, { label: "Às vezes demoro", scores: { U: 2, W: 1 } }, { label: "Frequentemente", scores: { W: 2, D: 1 } }, { label: "Sempre, mente não para", scores: { D: 3 } }] },
  { text: "Seu sono é leve ou profundo?", options: [{ label: "Profundo", scores: { L: 2, U: 2 } }, { label: "Médio", scores: { U: 3 } }, { label: "Leve, acordo fácil", scores: { D: 3 } }, { label: "Irregular", scores: { D: 2, W: 1 } }] },
  { text: "Desperta durante a noite?", options: [{ label: "Raramente", scores: { L: 2, U: 2 } }, { label: "Às vezes", scores: { U: 2, W: 1 } }, { label: "Frequentemente", scores: { D: 3 } }, { label: "Sim, e não volto a dormir", scores: { D: 3, W: 1 } }] },
  { text: "Períodos mais produtivos?", options: [{ label: "Manhã (6h-12h)", scores: { L: 3, U: 1 } }, { label: "Meio do dia (10h-15h)", scores: { U: 3 } }, { label: "Tarde/Noite (16h-22h)", scores: { W: 3 } }, { label: "Imprevisível", scores: { D: 3 } }] },
];

export interface ChronotypeInfo {
  name: string;
  emoji: string;
  color: string;
  tag: string;
  desc: string;
  peak: string;
  sleep: string;
  strengths: string[];
  tip: string;
}

export const CHRONOTYPES: Record<string, ChronotypeInfo> = {
  L: { name: "Leão", emoji: "🦁", color: "lion", tag: "A Vantagem de Quem Começa Primeiro", desc: "Pico de cortisol antes das 6h30. Cérebro em máxima capacidade entre 7h e 10h30.", peak: "6h–10h30", sleep: "21h–5h30", strengths: ["Clareza matinal e decisão rápida", "Disciplina natural para rotinas", "Sono profundo N3 de alta qualidade"], tip: "Proteja sua manhã como território sagrado." },
  U: { name: "Urso", emoji: "🐻", color: "bear", tag: "O Relógio Humano da Natureza", desc: "Ritmo circadiano alinhado ao ciclo solar. Pico entre 10h e 14h.", peak: "10h–14h", sleep: "22h30–7h", strengths: ["Estabilidade emocional sob rotina", "Boa performance colaborativa", "Regeneração com pausas reais"], tip: "Constância é sua força. Proteja suas pausas." },
  W: { name: "Lobo", emoji: "🐺", color: "wolf", tag: "O Ritmo de Quem Brilha à Noite", desc: "Cortisol e melatonina em ciclo atrasado. Melhores horas quando os outros desaceleram.", peak: "16h–22h", sleep: "0h–8h", strengths: ["Criatividade e pensamento divergente", "Hiperfoco em projetos", "Energia intelectual noturna"], tip: "Pare de lutar contra sua biologia." },
  D: { name: "Golfinho", emoji: "🐬", color: "dolphin", tag: "O Cérebro que Nunca Desliga", desc: "Atividade beta alta mesmo durante o sono. Sono leve, energia flutuante.", peak: "11h–14h (variável)", sleep: "23h–7h (irregular)", strengths: ["Hiperconsciência e senso de detalhe", "Capacidade analítica acima da média", "Criatividade em introspecção"], tip: "Crie rituais de desaceleração." },
};

export function calculateChronotype(answers: number[]): string {
  const scores: Record<string, number> = { L: 0, U: 0, W: 0, D: 0 };
  answers.forEach((ansIdx, qIdx) => {
    const option = QUIZ_QUESTIONS[qIdx].options[ansIdx];
    Object.entries(option.scores).forEach(([key, val]) => {
      scores[key] = (scores[key] || 0) + val;
    });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}
