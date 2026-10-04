import type { Metadata } from 'next';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesDocument from '../notes-document';

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
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;
  return <NotesDocument notes={notes} />;
}
