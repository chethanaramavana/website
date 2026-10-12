import {notFound,redirect} from 'next/navigation';
import {getGoogleUser,googleSignInPath} from '@/app/google-auth';
import {getIntegralsProduct,integralsPath} from '@/lib/integrals-products';
import {hasIntegralsAccess} from '@/lib/integrals-access';
import banks from '@/lib/integrals-online-papers.json';
import OnlinePaper from '../../online-paper';
export const dynamic='force-dynamic';
export default async function Paper({params}:{params:Promise<{id:string}>}){const{id}=await params;const product=getIntegralsProduct(id);if(!product)notFound();const user=await getGoogleUser();if(!user)redirect(googleSignInPath(`${integralsPath}/papers/${id}`));if(!await hasIntegralsAccess(user,id))redirect(`${integralsPath}#${id}`);const questions=banks[id as keyof typeof banks];return <OnlinePaper product={product} questions={questions} name={user.displayName}/>}
