export interface ISIQuestion {
  id: string;
  title: string;
  question: string;
  options: string[];
}

export const ISI_QUESTIONS: ISIQuestion[] = [
  { id: "1a", title: "Adormecer", question: "Nas últimas 2 semanas, quão difícil tem sido para você adormecer?", options: ["Nenhuma", "Leve", "Moderada", "Severa", "Muito severa"] },
  { id: "1b", title: "Manter o sono", question: "Dificuldade para manter o sono?", options: ["Nenhuma", "Leve", "Moderada", "Severa", "Muito severa"] },
  { id: "1c", title: "Despertar precoce", question: "Acorda cedo demais?", options: ["Nenhuma", "Leve", "Moderada", "Severa", "Muito severa"] },
  { id: "2", title: "Satisfação", question: "Satisfação com o sono atual?", options: ["Muito satisfeito", "Satisfeito", "Neutro", "Insatisfeito", "Muito insatisfeito"] },
  { id: "3", title: "Impacto diurno", question: "Quanto a insônia atrapalha seu dia?", options: ["Nada", "Leve", "Moderado", "Alto", "Muito alto"] },
  { id: "4", title: "Percepção social", question: "Outras pessoas percebem o impacto?", options: ["Nada", "Pouco", "Moderado", "Muito", "Extremamente"] },
  { id: "5", title: "Angústia", question: "Angústia por não conseguir dormir?", options: ["Nada", "Pouco", "Moderado", "Muito", "Extremamente"] },
];

export interface ISICategory {
  label: string;
  color: string;
  severity: number;
}

export function getISICategory(score: number): ISICategory {
  if (score <= 7) return { label: "Sem insônia clínica", color: "success", severity: 0 };
  if (score <= 14) return { label: "Insônia sublimiar", color: "warning", severity: 1 };
  if (score <= 21) return { label: "Insônia moderada", color: "warning", severity: 2 };
  return { label: "Insônia severa", color: "destructive", severity: 3 };
}
