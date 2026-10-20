import { getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';
import { validWeeklyProblem } from '@/lib/weekly-problems';
export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user || !isAdmin(user)) return jsonError('Teacher access is required.',403);
  try {
    const {results} = await getDatabase().prepare('SELECT number, question, solution, published, solution_visible AS solutionVisible FROM weekly_problems ORDER BY number DESC').all();
    return Response.json({problems:results.map(p => ({...p,published:!!p.published,solutionVisible:!!p.solutionVisible}))});
  } catch { return jsonError('Problems could not be loaded. Please try again.',503); }
}
export async function PUT(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.',403);
  const user = await getRequestUser(request);
  if (!user || !isAdmin(user)) return jsonError('Teacher access is required.',403);
  let problem: unknown;
  try { problem = await request.json(); } catch { return jsonError('Invalid problem.',400); }
  if (!validWeeklyProblem(problem)) return jsonError('Enter a positive problem number, a question and a solution before revealing it.',400);
  try {
    await getDatabase().prepare('INSERT INTO weekly_problems (number, question, solution, published, solution_visible) VALUES (?, ?, ?, ?, ?) ON CONFLICT(number) DO UPDATE SET question=excluded.question, solution=excluded.solution, published=excluded.published, solution_visible=excluded.solution_visible, updated_at=CURRENT_TIMESTAMP').bind(problem.number,problem.question.trim(),problem.solution.trim(),Number(problem.published),Number(problem.solutionVisible)).run();
    return Response.json({saved:true});
  } catch { return jsonError('Problem could not be saved. Your changes remain in the editor.',503); }
}
