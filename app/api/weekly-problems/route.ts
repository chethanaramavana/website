import { getDatabase } from '@/lib/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    // Hidden solutions never leave the server, including in the public archive.
    const {results} = await getDatabase().prepare('SELECT number, question, CASE WHEN solution_visible = 1 THEN solution ELSE NULL END AS solution FROM weekly_problems WHERE published = 1 ORDER BY number DESC').all<{number:number;question:string;solution:string|null}>();
    return Response.json({problems:results}, {headers:{'cache-control':'no-store'}});
  } catch {
    return Response.json({error:'Weekly problems are temporarily unavailable.'}, {status:503});
  }
}
