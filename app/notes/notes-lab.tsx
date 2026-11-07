'use client';
import InvestigationLab from '@/app/maths-basics/labs/investigation-lab';
import '@/app/maths-basics/basics.css';
import '@/app/maths-basics/concept-lesson.css';

/** A Maths Step by Step simulation shown inside chapter notes. */
export default function NotesLab({slug, index}: {slug: string; index: number}) {
  return <div className="ir-lab-host identity-learning"><div className="basics"><div className="concept-lesson"><InvestigationLab slug={slug} index={index} /></div></div></div>;
}
