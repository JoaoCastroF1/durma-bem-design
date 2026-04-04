export interface Module {
  id: string;
  type: "lesson" | "diary" | "review";
  title: string;
  duration: string;
}

export interface Week {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  modules: Module[];
}

export const WEEKS: Week[] = [
  { id: 0, title: "Semana 0", subtitle: "Linha de base", icon: "📋", modules: [
    { id: "edu0", type: "lesson", title: "Bem-vindo ao Durma Melhor", duration: "3 min" },
    { id: "diary0", type: "diary", title: "Diário do Sono", duration: "2 min" },
    { id: "review0", type: "review", title: "Raio-X Semana 0", duration: "1 min" },
  ]},
  { id: 1, title: "Semana 1", subtitle: "Psicoeducação + Higiene", icon: "🧠", modules: [
    { id: "edu1a", type: "lesson", title: "Como o sono funciona", duration: "5 min" },
    { id: "edu1b", type: "lesson", title: "Modelo 3P da insônia", duration: "4 min" },
    { id: "edu1c", type: "lesson", title: "12 regras de higiene do sono", duration: "5 min" },
    { id: "diary1", type: "diary", title: "Diário do Sono", duration: "2 min" },
    { id: "review1", type: "review", title: "Revisão semanal", duration: "2 min" },
  ]},
  { id: 2, title: "Semana 2", subtitle: "Restrição de Tempo na Cama", icon: "⏱️", modules: [
    { id: "edu2a", type: "lesson", title: "O que é restrição de sono", duration: "4 min" },
    { id: "edu2b", type: "lesson", title: "Calculando sua janela de sono", duration: "3 min" },
    { id: "edu2c", type: "lesson", title: "Regras da restrição", duration: "3 min" },
    { id: "diary2", type: "diary", title: "Diário do Sono", duration: "2 min" },
    { id: "review2", type: "review", title: "Ajuste de janela", duration: "2 min" },
  ]},
  { id: 3, title: "Semana 3", subtitle: "Controle de Estímulos", icon: "🛏️", modules: [
    { id: "edu3a", type: "lesson", title: "A cama virou gatilho", duration: "4 min" },
    { id: "edu3b", type: "lesson", title: "As 5 regras do controle", duration: "4 min" },
    { id: "edu3c", type: "lesson", title: "Técnica dos 20 minutos", duration: "3 min" },
    { id: "diary3", type: "diary", title: "Diário do Sono", duration: "2 min" },
    { id: "review3", type: "review", title: "Revisão semanal", duration: "2 min" },
  ]},
  { id: 4, title: "Semana 4", subtitle: "Reestruturação Cognitiva", icon: "💭", modules: [
    { id: "edu4a", type: "lesson", title: "Crenças sobre o sono", duration: "5 min" },
    { id: "edu4b", type: "lesson", title: "DBAS-16: suas crenças", duration: "6 min" },
    { id: "edu4c", type: "lesson", title: "Desafiando pensamentos", duration: "4 min" },
    { id: "diary4", type: "diary", title: "Diário do Sono", duration: "2 min" },
    { id: "review4", type: "review", title: "Revisão semanal", duration: "2 min" },
  ]},
  { id: 5, title: "Semana 5", subtitle: "Relaxamento e Desativação", icon: "🧘", modules: [
    { id: "edu5a", type: "lesson", title: "Relaxamento muscular progressivo", duration: "5 min" },
    { id: "edu5b", type: "lesson", title: "Respiração 4-7-8", duration: "3 min" },
    { id: "edu5c", type: "lesson", title: "Diário de preocupações", duration: "3 min" },
    { id: "diary5", type: "diary", title: "Diário do Sono", duration: "2 min" },
    { id: "review5", type: "review", title: "Revisão semanal", duration: "2 min" },
  ]},
  { id: 6, title: "Semana 6", subtitle: "Prevenção de Recaída", icon: "🏆", modules: [
    { id: "edu6a", type: "lesson", title: "O que você conquistou", duration: "3 min" },
    { id: "edu6b", type: "lesson", title: "Identificando gatilhos", duration: "3 min" },
    { id: "edu6c", type: "lesson", title: "Plano de manutenção", duration: "4 min" },
    { id: "diary6", type: "diary", title: "Diário Final", duration: "2 min" },
    { id: "review6", type: "review", title: "ISI: antes e depois", duration: "3 min" },
  ]},
];
