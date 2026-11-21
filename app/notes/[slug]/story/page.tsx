import type { Metadata } from 'next';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesDocument from '../../notes-document';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const notes = getChapterNotes(slug);
  if (!notes) return { title: 'Chapter notes | Ramavana Mathematical Center' };
  return { title: `${notes.chapter} Story Notes | Grade ${notes.grade ?? 10} Mathematics` };
}

export default async function ChapterStoryNotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;
  return <NotesDocument notes={notes} />;
}
