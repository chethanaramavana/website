import topic from '@/lib/math-basics-first-topic.json';
import {getGoogleUser,googleSignInPath} from '@/app/google-auth';
import FirstTopic from '../first-topic';
export const metadata={title:'Start with numbers | Maths Step by Step'};
export default async function Numbers(){const user=await getGoogleUser();return <FirstTopic topic={topic} signedIn={!!user} signInPath={googleSignInPath('/maths-basics/numbers')}/>;}
