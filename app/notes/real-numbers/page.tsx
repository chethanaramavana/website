import type { Metadata } from 'next';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesDocument from '../notes-document';

export const metadata: Metadata = {
  title: 'Real Numbers Notes | Grade 10 Mathematics',
  description: 'Student-friendly CBSE Grade 10 Real Numbers notes with visual explanations, worked reasoning and practice.',
};

export default function RealNumbersNotesPage() {
  const notes = getChapterNotes('real-numbers');
  if (!notes) return null;
  return <NotesDocument notes={notes} />;
}
