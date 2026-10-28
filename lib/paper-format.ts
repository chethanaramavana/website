export const RELATIONS_TEST_ID = 'g11-relations-free-30';
export const writtenQuestionMarks: Record<number, number> = {17:2,18:2,19:2,20:3,21:3,22:3,23:5,24:4};
export const objectiveMaximum = (id: string) => id === RELATIONS_TEST_ID ? 6 : 16;
export const paperMaximum = (id: string) => objectiveMaximum(id) + 24;
export const displayQuestion = (id: string, number: number) => id === RELATIONS_TEST_ID && number >= 17 ? number - 10 : number;
