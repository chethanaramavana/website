import { quizTitle } from '@/lib/free-quizzes/catalog';
import { requireGoogleUser } from '@/app/google-auth';
import { isTeacherEmail } from '@/lib/identity';
import { getDatabase } from '@/lib/server';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
type Attempt = {quiz_id:string;id:string;student_name:string;user_email:string;score:number;total:number;answered:number;submitted_at:string};

export default async function FreeQuizResults({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const user = await requireGoogleUser('/teacher/free-mcq');
  if (!isTeacherEmail(user.email)) notFound();
  const params = await searchParams;
  const page = Math.max(1, Math.min(100000, Number.parseInt(params.page ?? '1', 10) || 1));
  let attempts: Attempt[] = []; let count = 0; let failed = false;
  try {
    const db = getDatabase();
    const [rows, total] = await Promise.all([
      db.prepare('SELECT quiz_id, id, student_name, user_email, score, total, answered, submitted_at FROM free_quiz_attempts ORDER BY submitted_at DESC, id DESC LIMIT 50 OFFSET ?').bind((page - 1) * 50).all<Attempt>(),
      db.prepare('SELECT count(*) AS count FROM free_quiz_attempts').first<{count:number}>(),
    ]);
    attempts = rows.results; count = total?.count ?? 0;
  } catch (error) { console.error('Free quiz results unavailable', error); failed = true; }
  return <main className="teacher-shell"><header className="teacher-header"><a href="/teacher">Back to teacher dashboard</a><div><p>CBSE Class 10 · All chapters</p><h1>Free MCQ results</h1></div><a href="/teacher/free-mcq">Refresh results</a></header>
    <p>Each completed attempt is saved separately. Marks are calculated automatically out of 50.</p>
    {failed ? <p role="alert">Results could not be loaded. Please refresh to try again.</p> : <><p>{count} completed attempts · Page {page}</p><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse',background:'white'}}><thead><tr>{['Student','Chapter','Email','Score','Answered','Submitted (IST)','Review'].map(label=><th key={label} style={{padding:14,textAlign:'left'}}>{label}</th>)}</tr></thead><tbody>{attempts.map(a=><tr key={a.id}><td style={{padding:14}}>{a.student_name}</td><td style={{padding:14}}>{quizTitle(a.quiz_id)}</td><td style={{padding:14}}>{a.user_email}</td><td style={{padding:14}}>{a.score}/{a.total}</td><td style={{padding:14}}>{a.answered}/{a.total}</td><td style={{padding:14}}>{new Date(a.submitted_at).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}</td><td style={{padding:14}}><a href={`/teacher/free-mcq/${a.id}`}>View answers</a></td></tr>)}</tbody></table></div>{attempts.length===0 && <p>No completed attempts on this page yet. Students will appear here after submitting the free quiz.</p>}<nav style={{display:'flex',gap:24,marginTop:24}}>{page>1 && <a href={`?page=${page-1}`}>Previous page</a>}{page*50<count && <a href={`?page=${page+1}`}>Next page</a>}</nav></>}
  </main>;
}
