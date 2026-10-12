import type { Metadata } from 'next';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesDocument from '../notes-document';
import IntegralsOnline from '../integrals-online';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const notes = getChapterNotes(slug);
  if (!notes) return { title: 'Chapter notes | Ramavana Mathematical Centre' };
  return {
    title: `${notes.chapter} Notes | Grade ${notes.grade ?? 10} Mathematics`,
    description: `Student-friendly ${notes.board ?? 'CBSE'} Grade ${notes.grade ?? 10} ${notes.chapter} notes with visual explanations, worked examples and practice.`,
  };
}

export default async function ChapterNotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if(slug === 'g12-integrals') return <IntegralsOnline/>;
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;
  return <>{slug === 'g12-integrals' && <aside style={{padding:'20px',textAlign:'center',background:'#eee7f9'}}><a href="/cbse/grade-12/integrals">Expanded Integrals notes, 50 free practice questions and CBSE / JEE papers →</a></aside>}<NotesDocument notes={notes} /></>;
}
