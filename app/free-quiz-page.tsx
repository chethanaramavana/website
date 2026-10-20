import LearningHeader from './learning-header';
import { SiteFooter } from './brand';
import { notFound } from 'next/navigation';
import { quizPrice } from '@/lib/free-quizzes/catalog';
import Quiz from '@/app/cbse/grade-10/ch-1/free-mcq/quiz';
import '@/app/cbse/grade-10/ch-1/free-mcq/quiz.css';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { freeQuizzes } from '@/lib/free-quizzes';
import { hasMcqAccess } from '@/lib/mcq-access';
import McqCheckout from '@/app/mcq-checkout';
export default async function FreeQuizPage({chapter,grade=10}:{chapter:number;grade?:number}) {
  const quiz = freeQuizzes.find(q=>q.chapter===chapter && q.grade===grade);
  if(!quiz) notFound();
  const user = await getGoogleUser();
  let allowed=false,failed=false;
  if(user) {try {allowed=await hasMcqAccess(user,chapter,grade);}catch {failed=true;}}
  if(allowed && user) return <Quiz email={user.email} userId={user.userId} displayName={user.displayName} questions={quiz.questions} chapter={chapter} grade={grade} title={quiz.title}/>;
  return <div className="free-quiz"><LearningHeader signedIn={!!user} /><main><nav><a href="/">Ramavana Mathematical Centre</a> / <a href={grade===10?"/cbse/grade-10/free-mcq":`/cbse/grade-${grade}`}>CBSE Class {grade}</a></nav><section className="fq-intro"><img src="/ramavana-mark.png" alt="Ramavana mathematical logo" style={{width:80,height:80,objectFit:"contain"}}/><span className="fq-badge">{quizPrice(chapter,grade) === 0?'FREE · NO PAYMENT':'₹20 · CHAPTER MCQ ACCESS'}</span><h1>{quiz.title}</h1><h2>50-question MCQ practice</h2><p>After submission, see your marks and all worked solutions.</p>{grade === 12 && chapter === 7 ? <p>Get your score automatically as soon as you submit, then review the correct answers and worked solutions.</p> : <p>Your name, email, answers and score will be saved for your teacher to review.</p>}{!user?<><p>Sign in with Google to {quizPrice(chapter,grade) === 0?'take the free quiz':'purchase or open your chapter quiz'}.</p><a className="fq-login" href={googleSignInPath(quiz.path)}>Continue with Google</a></>:failed?<p role="alert">Your chapter access could not be checked. Please refresh and try again.</p>:<McqCheckout chapter={chapter} title={quiz.title} name={user.displayName} email={user.email}/>}<p><a href="/privacy-policy">Privacy policy</a></p></section></main><SiteFooter /></div>;
}
