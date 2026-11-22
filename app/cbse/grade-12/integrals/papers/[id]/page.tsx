import {notFound,redirect} from 'next/navigation';
import {getGoogleUser,googleSignInPath} from '@/app/google-auth';
import {getIntegralsProduct,integralsPath} from '@/lib/integrals-products';
import {hasIntegralsAccess} from '@/lib/integrals-access';
import banks from '@/lib/integrals-online-papers.json';
import jeePaper3 from '@/lib/jee-papers/chapter-papers-3.json';
import type {IntegralQuestion} from '@/lib/integrals-score';
import OnlinePaper from '../../online-paper';
export const dynamic='force-dynamic';
export default async function Paper({params}:{params:Promise<{id:string}>}){const{id}=await params;const product=getIntegralsProduct(id);if(!product)notFound();const user=await getGoogleUser();if(!user)redirect(googleSignInPath(`${integralsPath}/papers/${id}`));if(!await hasIntegralsAccess(user,id))redirect(`${integralsPath}#${id}`);const questions=(banks as unknown as Record<string,IntegralQuestion[]>)[id]??(jeePaper3 as unknown as Record<string,IntegralQuestion[]>)[id];if(!questions)notFound();return <OnlinePaper product={product} questions={questions} name={user.displayName}/>}
