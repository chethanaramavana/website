import {basicsCourses} from './basics-catalog';
import basicsOutline from './math-basics-outline.json';
import { getDatabase, type RequestUser } from './server';
import { paperDefinitionsById } from './papers';
import { cbse6QuizChapters, cbse7QuizChapters, cbse8QuizChapters, freeQuizChapters, icse6QuizChapters, icse7QuizChapters, quizInfo, quizPrice } from './free-quizzes/catalog';
import { getIntegralsProduct } from './integrals-products';
import { getG12PracticeProduct, g12PracticeChapter } from './g12-practice-catalog';
import { objectiveMaximum, writtenNumbers } from './paper-format';

export function activityPaper(id: string) {
  const basics=basicsOutline.find(t=>id==='maths-basics-'+t.slug);
  if(basics)return {title:`Maths Step by Step · ${basics.title}`,free:basicsCourses.some(c=>c.topics[0]===basics.slug),total:10,kind:'basics' as const,slug:basics.slug};
  const product = getIntegralsProduct(id);
  if (product) return { title: `Grade 12 · ${product.title}`, free: false, total: id.includes('mcq-20') ? 20 : id.includes('board') ? 24 : id.includes('main') ? 25 : id.endsWith('01') ? 16 : 18, kind: 'integrals' as const };
  const practice = getG12PracticeProduct(id);
  if (practice) return { title: `Grade ${practice.grade} · ${practice.chapterTitle} · ${practice.title}`, free: false, total: practice.total, kind: 'g12practice' as const };
  const icse = quizInfo(id);
  if (icse?.board === 'ICSE') return { title: `ICSE Grade ${icse.grade} · ${(icse.grade === 6 ? icse6QuizChapters : icse7QuizChapters)[icse.chapter-1]} · MCQ`, free: quizPrice(icse.chapter, icse.grade, 'ICSE') === 0, total: 30, kind: 'quiz' as const, grade: icse.grade, chapter: icse.chapter, board: 'ICSE' as const };
  if (icse?.board === 'CBSE' && icse.grade === 8) return { title: `Grade 8 · ${cbse8QuizChapters[icse.chapter]} · MCQ`, free: false, total: 30, kind: 'quiz' as const, grade: 8, chapter: icse.chapter, board: 'CBSE' as const };
  if (icse?.board === 'CBSE' && icse.grade === 7) return { title: `Grade 7 · ${cbse7QuizChapters[icse.chapter-1]} · MCQ`, free: false, total: 30, kind: 'quiz' as const, grade: 7, chapter: icse.chapter, board: 'CBSE' as const };
  if (icse?.board === 'CBSE' && icse.grade === 6) return { title: `Grade 6 · ${cbse6QuizChapters[icse.chapter-1]} · MCQ`, free: false, total: 30, kind: 'quiz' as const, grade: 6, chapter: icse.chapter, board: 'CBSE' as const };
  const match = /^cbse-(10|11|12)-ch-(\d+)-50$/.exec(id);
  if (match) {
    const grade = Number(match[1]), chapter = Number(match[2]);
    const title = grade === 10 ? freeQuizChapters[chapter-1] : grade === 11 && chapter === 2 ? 'Relations and Functions' : grade === 12 && chapter === 7 ? 'Integrals' : grade === 12 ? (g12PracticeChapter(chapter)?.title ?? null) : null;
    if (title) return { title: `Grade ${grade} · ${title} · MCQ`, free: quizPrice(chapter, grade) === 0, total: 50, kind: 'quiz' as const, grade, chapter, board: 'CBSE' as const };
  }
  const p = paperDefinitionsById[id];
  return p ? { title: `${p.board ?? 'CBSE'} · Grade ${p.grade ?? 10} · ${p.chapter} · Paper ${p.paperNumber}`, free: false, total: objectiveMaximum(id) + writtenNumbers(id).length, kind: 'paper' as const } : null;
}

export async function recordPresence(user: RequestUser, signIn = false) {
  const now = Date.now();
  await getDatabase().prepare(`INSERT INTO student_presence (user_id,email,name,last_sign_in_ms,sign_in_count,last_seen_ms)
    VALUES (?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET email=excluded.email,name=excluded.name,
    last_sign_in_ms=COALESCE(excluded.last_sign_in_ms,student_presence.last_sign_in_ms),
    sign_in_count=student_presence.sign_in_count+excluded.sign_in_count,last_seen_ms=excluded.last_seen_ms`)
    .bind(user.userId,user.email,user.displayName,signIn ? now : null,signIn ? 1 : 0,now).run();
}
