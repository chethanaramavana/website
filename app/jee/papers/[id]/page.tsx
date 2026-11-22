import { notFound, redirect } from 'next/navigation';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { isAdmin } from '@/lib/server';
import { getJeeEntranceProduct, jeeEntrancePath } from '@/lib/jee-entrance';
import { JEE_PACKAGE } from '@/lib/jee-package';
import { hasJeePackage } from '@/lib/jee-package-access';
import type { IntegralQuestion } from '@/lib/integrals-score';
import banks from '@/lib/jee-papers/entrance-papers.json';
import OnlinePaper from '@/app/cbse/grade-12/integrals/online-paper';

export const dynamic = 'force-dynamic';

export default async function JeeEntrancePaper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getJeeEntranceProduct(id);
  const questions = (banks as unknown as Record<string, IntegralQuestion[]>)[id];
  if (!product || !questions) notFound();
  const user = await getGoogleUser();
  if (!user) redirect(googleSignInPath(jeeEntrancePath(id)));
  if (!isAdmin(user) && !await hasJeePackage(user)) redirect(`${JEE_PACKAGE.path}#entrance`);
  return <OnlinePaper product={product} questions={questions} name={user.displayName} back={{ href: JEE_PACKAGE.path, label: 'JEE package' }} />;
}
