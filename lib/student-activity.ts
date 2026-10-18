import { getDatabase, type RequestUser } from './server';
import { paperDefinitionsById } from './papers';
import { freeQuizChapters, quizPrice } from './free-quizzes/catalog';
import { getIntegralsProduct } from './integrals-products';

export function activityPaper(id: string) {
  if(id==='maths-basics-numbers') return {title:'Maths Step by Step · Counting, whole numbers and place value',free:true,total:5,kind:'basics' as const};
  const product = getIntegralsProduct(id);
  if (product) return { title: `Grade 12 · ${product.title}`, free: false, total: id.includes('mcq-20') ? 20 : id.includes('board') ? 24 : id.includes('main') ? 25 : id.endsWith('01') ? 16 : 18, kind: 'integrals' as const };
  const match = /^cbse-(10|11|12)-ch-(\d+)-50$/.exec(id);
  if (match) {
    const grade = Number(match[1]), chapter = Number(match[2]);
    const title = grade === 10 ? freeQuizChapters[chapter-1] : grade === 11 && chapter === 2 ? 'Relations and Functions' : grade === 12 && chapter === 7 ? 'Integrals' : null;
    if (title) return { title: `Grade ${grade} · ${title} · MCQ`, free: quizPrice(chapter, grade) === 0, total: 50, kind: 'quiz' as const, grade, chapter };
  }
  const p = paperDefinitionsById[id];
  return p ? { title: `${p.board ?? 'CBSE'} · Grade ${p.grade ?? 10} · ${p.chapter} · Paper ${p.paperNumber}`, free: false, total: 24, kind: 'paper' as const } : null;
}

export async function recordPresence(user: RequestUser, signIn = false) {
  const now = Date.now();
  await getDatabase().prepare(`INSERT INTO student_presence (user_id,email,name,last_sign_in_ms,sign_in_count,last_seen_ms)
    VALUES (?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET email=excluded.email,name=excluded.name,
    last_sign_in_ms=COALESCE(excluded.last_sign_in_ms,student_presence.last_sign_in_ms),
    sign_in_count=student_presence.sign_in_count+excluded.sign_in_count,last_seen_ms=excluded.last_seen_ms`)
    .bind(user.userId,user.email,user.displayName,signIn ? now : null,signIn ? 1 : 0,now).run();
}
