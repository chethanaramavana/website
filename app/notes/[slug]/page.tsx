import type { Metadata } from 'next';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesDocument from '../notes-document';
import IntegralsOnline from '../integrals-online';
import ExploreSims from '../explore-sims';
import FormulaNotes, {type FormulaNotesData} from '../formula-notes';
import straightLines from '@/lib/straight-lines-notes.json';
import cbse89Notes from '@/lib/cbse89-notes.json';
import icse7Notes from '@/lib/icse7-notes.json';
import g12ReaderNotes from '@/lib/g12-reader-notes.json';
import ChapterReader, {type ReaderChapter} from '../chapter-reader';

const icse7 = icse7Notes as unknown as Record<string, FormulaNotesData>;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const notes = getChapterNotes(slug);
  if (!notes) return { title: 'Chapter notes | Ramavana Mathematical Center' };
  return {
    title: `${notes.chapter} Notes | Grade ${notes.grade ?? 10} Mathematics`,
    description: `Student-friendly ${notes.board ?? 'CBSE'} Grade ${notes.grade ?? 10} ${notes.chapter} notes with visual explanations, worked examples and practice.`,
  };
}

export default async function ChapterNotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newNotes = (cbse89Notes as unknown as Record<string, FormulaNotesData>)[slug];
  if (newNotes) return <FormulaNotes data={newNotes} />;
  if(slug === 'g12-integrals') return <IntegralsOnline/>;
  const g12Reader = (g12ReaderNotes as unknown as Record<string, ReaderChapter>)[slug];
  if (g12Reader) return <ChapterReader data={g12Reader} />;
  if(slug === 'g11-straight-lines') return <><FormulaNotes data={straightLines as FormulaNotesData} /><ExploreSims slug={slug} /></>;
  if (icse7[slug]) return <FormulaNotes data={icse7[slug]} />;
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;
  return <>{slug === 'g12-integrals' && <aside style={{padding:'20px',textAlign:'center',background:'#eee7f9'}}><a href="/cbse/grade-12/integrals">Expanded Integrals notes, 50 free practice questions and CBSE / JEE papers →</a></aside>}<NotesDocument notes={notes} /><ExploreSims slug={slug} /></>;
}
