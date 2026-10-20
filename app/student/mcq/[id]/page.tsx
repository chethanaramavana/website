import { quizTitle } from '@/lib/free-quizzes/catalog';
import { requireGoogleUser } from '@/app/google-auth';
import { getDatabase } from '@/lib/server';
import { notFound } from 'next/navigation';
import MathText from '@/app/notes/math-text';
import SolutionSteps from '@/app/solution-steps';
import type { Question } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';

export const dynamic = 'force-dynamic';
type Attempt = {quiz_id:string;student_name:string;user_email:string;score:number;total:number;submitted_at:string;answers_json:string;questions_json:string};
export default async function StudentQuizDetail({params}:{params:Promise<{id:string}>}) {
  const {id} = await params;
  const user = await requireGoogleUser(`/student/mcq/${encodeURIComponent(id)}`);
  let attempt:Attempt|null;
  try { attempt = await getDatabase().prepare('SELECT quiz_id, student_name, user_email, score, total, submitted_at, answers_json, questions_json FROM free_quiz_attempts WHERE id = ? AND user_id = ?').bind(id,user.userId).first<Attempt>(); }
  catch(error) { console.error('Free quiz detail unavailable',error); return <main className="teacher-shell saved-quiz-review"><a href="/student">Back to results</a><p role="alert">This result could not be loaded. Please refresh to try again.</p></main>; }
  if (!attempt) notFound();
  const questions:Question[] = JSON.parse(attempt.questions_json);
  const answers:Record<number,number> = JSON.parse(attempt.answers_json);
  return <main className="teacher-shell saved-quiz-review"><header className="teacher-header"><img className="saved-quiz-crest" src="/ramavana-paper-logo.png" width="170" height="170" alt="Ramavana Mathematical Centre" /><a href="/student">Back to my tests</a><div><h1>{attempt.student_name}</h1><p>{attempt.user_email}</p><p>{quizTitle(attempt.quiz_id)} · {attempt.score}/{attempt.total} · {new Date(attempt.submitted_at).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST</p></div></header>{questions.map((q,i)=><section key={i} style={{background:'white',padding:24,margin:'20px 0',borderRadius:12}}><h2>Question {i+1} · {answers[i]===q.answer?'Correct · 1 mark':answers[i]===undefined?'Unanswered · 0 marks':'Incorrect · 0 marks'}</h2><p style={{whiteSpace:'pre-line'}}><MathText>{q.prompt}</MathText></p><p style={{padding:12,borderRadius:8,background:answers[i]===undefined?"#f3f4f6":answers[i]===q.answer?"#f4f6f9":"#fff",color:answers[i]===undefined?"#374151":answers[i]===q.answer?"#011e47":"#b0300e"}}><strong>Your answer: </strong>{answers[i]===undefined?'Not answered':<MathText>{`${String.fromCharCode(65+answers[i])}. ${q.options[answers[i]]}`}</MathText>}</p><p style={{padding:12,borderRadius:8,background:"#f4f6f9",color:"#011e47"}}><strong>Correct answer: </strong><MathText>{`${String.fromCharCode(65+q.answer)}. ${q.options[q.answer]}`}</MathText></p><SolutionSteps solution={q.solution}/></section>)}</main>;
}
