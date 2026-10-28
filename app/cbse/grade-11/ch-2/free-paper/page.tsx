import type { Metadata } from 'next';
import { requireGoogleUser } from '@/app/google-auth';
import RelationsTest from './test';
import './paper.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {title:'Free Relations and Functions test · 30 marks | Ramavana',description:'A free, timed Class 11 chapter test. Submit MCQs and written answers to unlock solutions.'};
export default async function RelationsPaper() {
  const user = await requireGoogleUser('/cbse/grade-11/ch-2/free-paper');
  return <RelationsTest userId={user.userId} name={user.displayName} />;
}
