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
import g11ReaderNotes from '@/lib/g11-reader-notes.json';
import g10ReaderNotes from '@/lib/g10-reader-notes.json';
import g6ReaderNotes from '@/lib/g6-reader-notes.json';
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
  const g6Reader = (g6ReaderNotes as unknown as Record<string, ReaderChapter>)[slug];
  if (g6Reader) return <><ChapterReader data={g6Reader} /><ExploreSims slug={slug} /></>;
  const g12Reader = (g12ReaderNotes as unknown as Record<string, ReaderChapter>)[slug];
  if (g12Reader) return <ChapterReader data={g12Reader} />;
  const g11Reader = (g11ReaderNotes as unknown as Record<string, ReaderChapter>)[slug];
  if (g11Reader) return <><ChapterReader data={g11Reader} /><ExploreSims slug={slug} /></>;
  const g10Reader = (g10ReaderNotes as unknown as Record<string, ReaderChapter>)[slug];
  if (g10Reader) return <><ChapterReader data={g10Reader} /><ExploreSims slug={slug} /></>;
  if(slug === 'g11-straight-lines') return <><FormulaNotes data={straightLines as FormulaNotesData} /><ExploreSims slug={slug} /></>;
  if (icse7[slug]) return <><FormulaNotes data={icse7[slug]} /><ExploreSims slug={slug} /></>;
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;
  return <>{slug === 'g12-integrals' && <aside style={{padding:'20px',textAlign:'center',background:'#eee7f9'}}><a href="/cbse/grade-12/integrals">Expanded Integrals notes, 30 free practice questions and CBSE / JEE papers →</a></aside>}<NotesDocument notes={notes} /><ExploreSims slug={slug} /></>;
}
