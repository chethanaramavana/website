import { quizPrice } from '@/lib/free-quizzes/catalog';
import Quiz from '@/app/cbse/grade-10/ch-1/free-mcq/quiz';
import '@/app/cbse/grade-10/ch-1/free-mcq/quiz.css';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { freeQuizzes } from '@/lib/free-quizzes';
import { hasMcqAccess } from '@/lib/mcq-access';
import McqCheckout from '@/app/mcq-checkout';
export default async function FreeQuizPage({chapter}:{chapter:number}) {
  const quiz = freeQuizzes[chapter-1];
  const user = await getGoogleUser();
  let allowed=false,failed=false;
  if(user) {try {allowed=await hasMcqAccess(user,chapter);}catch {failed=true;}}
  if(allowed && user) return <Quiz displayName={user.displayName} questions={quiz.questions} chapter={chapter} title={quiz.title}/>;
  return <div className="free-quiz"><main><nav><a href="/">Ramavana Mathematical Centre</a> / <a href="/cbse/grade-10/free-mcq">CBSE Class 10 MCQ quizzes</a></nav><section className="fq-intro"><span className="fq-badge">{quizPrice(chapter) === 0?'FREE · NO PAYMENT':'₹20 · CHAPTER MCQ ACCESS'}</span><h1>{quiz.title}</h1><h2>50-question MCQ practice</h2><p>Includes 8 assertion–reason questions. After submission, see your marks and all worked solutions.</p><p>Your name, email, answers and score will be saved for your teacher to review.</p>{!user?<><p>Sign in with Google to {quizPrice(chapter) === 0?'take the free quiz':'purchase or open your chapter quiz'}.</p><a className="fq-login" href={googleSignInPath(quiz.path)}>Continue with Google</a></>:failed?<p role="alert">Your chapter access could not be checked. Please refresh and try again.</p>:<McqCheckout chapter={chapter} title={quiz.title} name={user.displayName} email={user.email}/>}<p><a href="/privacy-policy">Privacy policy</a></p></section></main></div>;
}
