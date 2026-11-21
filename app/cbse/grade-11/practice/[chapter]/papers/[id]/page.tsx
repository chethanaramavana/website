import { notFound, redirect } from 'next/navigation';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { getG12PracticeProduct, g11PracticePath } from '@/lib/g12-practice-catalog';
import { hasG12PracticeAccess } from '@/lib/g12-practice-access';
import { g12PracticeBanks } from '@/lib/g12-practice-banks';
import OnlinePaper from '../../../../../grade-12/integrals/online-paper';

export const dynamic = 'force-dynamic';

export default async function G11PracticePaper({ params }: { params: Promise<{ chapter: string; id: string }> }) {
  const { chapter, id } = await params;
  const product = getG12PracticeProduct(id);
  const questions = g12PracticeBanks[id];
  if (!product || product.grade !== 11 || !questions || chapter !== `ch-${product.chapter}`) notFound();
  const path = g11PracticePath(product.chapter);
  const user = await getGoogleUser();
  if (!user) redirect(googleSignInPath(`${path}/papers/${id}`));
  if (!await hasG12PracticeAccess(user, id)) redirect(`${path}#${id}`);
  return <OnlinePaper product={product} questions={questions} name={user.displayName} back={{ href: path, label: product.chapterTitle }} />;
}
