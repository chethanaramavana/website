import partA from './icse6-part-a.json';
import partB from './icse6-part-b.json';
import partC from './icse6-part-c.json';
import type { ChapterNotes } from './chapter-notes';

export const icse6Notes = [...partA.notes, ...partB.notes, ...partC.notes] as unknown as ChapterNotes[];
