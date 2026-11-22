/** Full-syllabus JEE entrance papers (Grade 11 and Grade 12). They open only with the JEE package. Metadata only; the questions live in jee-papers/entrance-papers.json. */
export type JeeEntranceProduct = { id: string; title: string; standard: 'JEE Main' | 'JEE Advanced'; detail: string; total: number };
export const jeeEntranceProducts: JeeEntranceProduct[] = [
  ...[1, 2, 3, 4, 5, 6].map((k) => ({ id: `jee-main-full-0${k}`, title: `JEE Main Entrance Paper ${k}`, standard: 'JEE Main' as const, detail: '25 questions · 100 marks · Grade 11 and 12 syllabus · Suggested 75 minutes', total: 25 })),
  ...[1, 2, 3, 4, 5, 6].map((k) => ({ id: `jee-adv-full-0${k}`, title: `JEE Advanced Entrance Paper ${k}`, standard: 'JEE Advanced' as const, detail: '16 questions · 60 marks · Grade 11 and 12 syllabus · Suggested 90 minutes', total: 16 })),
];
export const jeeEntrancePath = (id: string) => `/jee/papers/${id}`;
export function getJeeEntranceProduct(id: string) { return jeeEntranceProducts.find((p) => p.id === id); }
