export type WeeklyProblem = { number:number; question:string; solution:string; published:boolean; solutionVisible:boolean };
export function validWeeklyProblem(value: unknown): value is WeeklyProblem {
  if (!value || typeof value !== 'object') return false;
  const p = value as WeeklyProblem;
  return Number.isInteger(p.number) && p.number > 0 && p.number < 100000
    && typeof p.question === 'string' && p.question.trim().length > 0 && p.question.length <= 10000
    && typeof p.solution === 'string' && p.solution.length <= 20000
    && typeof p.published === 'boolean' && typeof p.solutionVisible === 'boolean'
    && (!p.solutionVisible || p.solution.trim().length > 0);
}
