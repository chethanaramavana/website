import partA from './icse6-part-a.json';
import partB from './icse6-part-b.json';
import partC from './icse6-part-c.json';
import type { ChapterNotes } from './chapter-notes';
import { icse6SimpleConcepts } from './icse6-simple-concepts';

export const icse6Notes = ([...partA.notes, ...partB.notes, ...partC.notes] as unknown as ChapterNotes[])
  .map(notes => ({...notes, concepts: icse6SimpleConcepts[notes.slug] ?? notes.concepts}));
