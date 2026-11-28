import g6Symmetry from './g6-symmetry.json';
import g8NumberPlay from './g8-number-play.json';

/** Paid chapter worksheets (₹15 each). Each worksheet is a payment product: its id is stored as the paper_id of the payment. */
export type WorksheetQuestion = { n: number; text: string; answer: string; parts?: string[]; picture?: unknown; answerPicture?: unknown; puzzle?: { n: number; mirror: 'v' | 'h' | 'd' | 'vh'; given: number[][] } };
export type Worksheet = { id: string; slug: string; title: string; grade: number; board: string; chapterPath: string; notesPath: string; amount: number; freeCount: number; sections: { title: string; note: string; questions: WorksheetQuestion[] }[] };

export const worksheets = [g6Symmetry as Worksheet, g8NumberPlay as Worksheet];
export const worksheetPath = (w: Worksheet) => `${w.chapterPath}/worksheet`;
export function getWorksheetProduct(id: string) { return worksheets.find((w) => w.id === id) ?? null; }
export function worksheetByChapterPath(path: string) { return worksheets.find((w) => w.chapterPath === path) ?? null; }
export function worksheetByNotesSlug(slug: string) { return worksheets.find((w) => w.notesPath === `/notes/${slug}`) ?? null; }
