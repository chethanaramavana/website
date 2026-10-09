import Quiz from '@/app/cbse/grade-10/ch-1/free-mcq/quiz';
import '@/app/cbse/grade-10/ch-1/free-mcq/quiz.css';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { freeQuizzes } from '@/lib/free-quizzes';

export default async function FreeQuizPage({chapter}:{chapter:number}) {
  const quiz = freeQuizzes[chapter-1];
  const user = await getGoogleUser();
  if (!user) return <div className="free-quiz"><main><nav><a href="/">Ramavana Mathematical Centre</a> / <a href="/cbse/grade-10/free-mcq">CBSE Class 10 free quizzes</a></nav><section className="fq-intro"><span className="fq-badge">FREE · NO PAYMENT</span><h1>{quiz.title}</h1><h2>50-question MCQ practice</h2><p>Includes 8 assertion–reason questions. Sign in with Google to take the free quiz. After submission, see your marks and all worked solutions.</p><p>Your name, email, answers and score will be saved for your teacher to review.</p><a className="fq-login" href={googleSignInPath(quiz.path)}>Continue with Google</a><p><a href="/privacy-policy">Privacy policy</a></p></section></main></div>;
  return <Quiz displayName={user.displayName} questions={quiz.questions} chapter={chapter} title={quiz.title}/>;
}
