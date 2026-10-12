export const integralsPath = '/cbse/grade-12/integrals';
export const integralsProducts = [
  { id: 'integrals-pdf-board-01', title: 'Board Pattern Paper 1', standard: 'CBSE', detail: '38 questions · 80 marks · 3 hours', stem: '04_PAID_Board_01' },
  { id: 'integrals-pdf-board-02', title: 'Board Pattern Paper 2', standard: 'CBSE', detail: '38 questions · 80 marks · 3 hours', stem: '04_PAID_Board_02' },
  { id: 'integrals-pdf-board-03', title: 'Board Pattern Paper 3', standard: 'CBSE', detail: '38 questions · 80 marks · 3 hours', stem: '04_PAID_Board_03' },
  { id: 'integrals-pdf-main-01', title: 'JEE Main Paper 1', standard: 'JEE Main', detail: '25 questions · 100 marks · Suggested 75 minutes', stem: '05_PAID_JEE_Main_01' },
  { id: 'integrals-pdf-main-02', title: 'JEE Main Paper 2', standard: 'JEE Main', detail: '25 questions · 100 marks · Suggested 75 minutes', stem: '05_PAID_JEE_Main_02' },
  { id: 'integrals-pdf-advanced-01', title: 'JEE Advanced Paper 1', standard: 'JEE Advanced', detail: '16 questions · 60 marks · Suggested 90 minutes', stem: '06_PAID_JEE_Advanced_01' },
  { id: 'integrals-pdf-advanced-02', title: 'JEE Advanced Paper 2', standard: 'JEE Advanced', detail: '18 questions · 60 marks · Suggested 90 minutes', stem: '06_PAID_JEE_Advanced_02' },
] as const;
export function getIntegralsProduct(id: string) { return integralsProducts.find(p => p.id === id); }
