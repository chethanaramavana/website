import { getDatabase, getRequestUser, isAdmin, jsonError } from '@/lib/server';
import { activityPaper } from '@/lib/student-activity';
import {quizTitle} from '@/lib/free-quizzes/catalog';
import { isTeacherEmail } from '@/lib/identity';

export async function GET(request: Request) {
  try {
    const user=await getRequestUser(request);
    if(!user || !isAdmin(user)) return jsonError('Teacher access only.',403);
    const db=getDatabase();
    const [accounts,attempts,results]=await Promise.all([
      db.prepare('SELECT user_id,email,name,last_sign_in_ms,sign_in_count,last_seen_ms FROM student_presence ORDER BY last_seen_ms DESC LIMIT 100').all<{user_id:string;email:string;name:string;last_sign_in_ms:number|null;sign_in_count:number;last_seen_ms:number}>(),
      db.prepare(`SELECT a.*,p.name,p.email FROM test_activity a JOIN student_presence p ON p.user_id=a.user_id ORDER BY a.last_seen_ms DESC LIMIT 100`).all<{id:string;user_id:string;paper_id:string;name:string;email:string;opened_at_ms:number;started_at_ms:number|null;last_seen_ms:number;submitted_at_ms:number|null;answered:number}>(),
      db.prepare('SELECT id,quiz_id,student_name,user_email,score,total,answered,submitted_at FROM free_quiz_attempts ORDER BY submitted_at DESC LIMIT 50').all<{id:string;quiz_id:string;student_name:string;user_email:string;score:number;total:number;answered:number;submitted_at:string}>(),
    ]);
    return Response.json({now:Date.now(),results:results.results.map(r=>({...r,title:quizTitle(r.quiz_id),teacher:isTeacherEmail(r.user_email)})),accounts:accounts.results.map(p=>({...p,teacher:isTeacherEmail(p.email)})),attempts:attempts.results.map(a=>({...a,teacher:isTeacherEmail(a.email),paper:activityPaper(a.paper_id)}))},{headers:{'cache-control':'no-store'}});
  } catch(error) { console.error('Teacher activity failed',error);return jsonError('Student activity could not be loaded.',503); }
}
