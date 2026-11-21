import type { Metadata } from 'next';
import g10ReaderNotes from '@/lib/g10-reader-notes.json';
import ChapterReader, { type ReaderChapter } from '../chapter-reader';

export const metadata: Metadata = {
  title: 'Real Numbers Notes | Grade 10 Mathematics',
  description: 'CBSE Grade 10 Real Numbers notes: formula sheet and solved examples, line by line.',
};

export default function RealNumbersNotesPage() {
  const data = (g10ReaderNotes as unknown as Record<string, ReaderChapter>)['real-numbers'];
  return <ChapterReader data={data} />;
}
