import icse7Notes from '@/lib/icse7-notes.json';
import GoogleSignIn from './google-sign-in';
import LearningHeader from './learning-header';
import { SiteFooter } from './brand';
import { notFound } from 'next/navigation';
import { quizPrice, type QuizBoard } from '@/lib/free-quizzes/catalog';
import Quiz from '@/app/cbse/grade-10/ch-1/free-mcq/quiz';
import '@/app/cbse/grade-10/ch-1/free-mcq/quiz.css';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { freeQuizzes } from '@/lib/free-quizzes';
import { hasMcqAccess } from '@/lib/mcq-access';
import McqCheckout from '@/app/mcq-checkout';
export default async function FreeQuizPage({chapter,grade=10,board='CBSE'}:{chapter:number;grade?:number;board?:QuizBoard}) {
  const quiz = freeQuizzes.find(q=>q.chapter===chapter && q.grade===grade && q.board===board);
  const price = quizPrice(chapter,grade,board);
  if(!quiz) notFound();
  const notesSlug = board === 'ICSE' && grade === 7 ? Object.keys(icse7Notes).find(slug => icse7Notes[slug as keyof typeof icse7Notes].back.href === `/icse/grade-7/ch-${chapter}`) : undefined;
  const notesHref = notesSlug ? `/notes/${notesSlug}` : undefined;
  const user = await getGoogleUser();
  let allowed=false,failed=false;
  if(user) {try {allowed=await hasMcqAccess(user,chapter,grade,board);}catch {failed=true;}}
  if(allowed && user) return <Quiz notesHref={notesHref} email={user.email} userId={user.userId} displayName={user.displayName} questions={quiz.questions} chapter={chapter} grade={grade} board={board} title={quiz.title}/>;
  return <div className="free-quiz"><LearningHeader signedIn={!!user} /><main><nav><a href="/">Ramavana Mathematical Center</a> / {board==='ICSE'?<a href={`/icse/grade-${grade}`}>ICSE Grade {grade}</a>:<a href={grade===10?"/cbse/grade-10/free-mcq":`/cbse/grade-${grade}`}>CBSE Class {grade}</a>}</nav><section className="fq-intro"><img src="/ramavana-mark.png" alt="Ramavana mathematical logo" style={{width:80,height:80,objectFit:"contain"}}/><span className="fq-badge">{price === 0?'FREE · NO PAYMENT':`₹${price/100} · CHAPTER MCQ ACCESS`}</span><h1>{quiz.title}</h1><h2>{quiz.questions.length}-question MCQ practice</h2>{notesHref && <p><a href={notesHref}>Step 1: Read free chapter notes</a> · Step 2: MCQs · Written exam paper: separate ₹30 purchase, retakes included.</p>}<p>After submission, see your marks and all worked solutions.</p>{grade === 12 && chapter === 7 ? <p>Get your score automatically as soon as you submit, then review the correct answers and worked solutions.</p> : <p>Your name, email, answers and score will be saved for your teacher to review.</p>}{!user?<><p>Sign in with Google to {price === 0?'take the free quiz':'purchase or open your chapter quiz'}.</p><GoogleSignIn href={googleSignInPath(quiz.path)} /></>:failed?<p role="alert">Your chapter access could not be checked. Please refresh and try again.</p>:<McqCheckout chapter={chapter} grade={grade} board={board} count={quiz.questions.length} title={quiz.title} name={user.displayName} email={user.email}/>}<p><a href="/privacy-policy">Privacy policy</a></p></section></main><SiteFooter /></div>;
}
