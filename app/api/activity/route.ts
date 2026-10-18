import {canOpenBasicsAny} from '@/lib/basics-access';
import { getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';
import { activityPaper, recordPresence } from '@/lib/student-activity';
import { hasMcqAccess } from '@/lib/mcq-access';
import { hasIntegralsAccess } from '@/lib/integrals-access';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid origin.',403);
  try {
    const user = await getRequestUser(request);
    if (!user) return new Response(null,{status:401});
    const raw = await request.text();
    if (raw.length > 1000) return jsonError('Invalid activity.',400);
    let body;
    try { body=JSON.parse(raw); } catch { return jsonError('Invalid activity.',400); }
    if (!body || typeof body !== 'object') return jsonError('Invalid activity.',400);
    if (body.kind === 'presence') { await recordPresence(user); return new Response(null,{status:204}); }
    if (body.kind !== 'test' || typeof body.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.id) || typeof body.paperId !== 'string' || !['opened','started','submitted'].includes(body.state)) return jsonError('Invalid activity.',400);
    const paper=activityPaper(body.paperId);
    if (!paper || !Number.isInteger(body.answered) || body.answered<0 || body.answered>paper.total) return jsonError('Invalid test.',400);
    if (!isAdmin(user)) {
      if(paper.kind==='basics'&&!await canOpenBasicsAny(user,paper.slug))return jsonError('Level access required.',403);
      if (paper.kind==='quiz' && !await hasMcqAccess(user,paper.chapter!,paper.grade!)) return jsonError('Test access required.',403);
      if (paper.kind==='integrals' && !await hasIntegralsAccess(user,body.paperId)) return jsonError('Test access required.',403);
      if (paper.kind==='paper') {
        const access=await getDatabase().prepare(`SELECT 1 FROM payment_requests WHERE user_id=? AND paper_id=? AND status='approved' UNION ALL SELECT 1 FROM submissions WHERE (user_id=? OR lower(user_email)=?) AND paper_id=? LIMIT 1`).bind(user.userId,body.paperId,user.userId,user.email.toLowerCase(),body.paperId).first();
        if (!access) return jsonError('Test access required.',403);
      }
    }
    await recordPresence(user);
    const now=Date.now();
    await getDatabase().prepare(`INSERT INTO test_activity (id,user_id,paper_id,opened_at_ms,started_at_ms,last_seen_ms,submitted_at_ms,answered)
      VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET
      started_at_ms=COALESCE(test_activity.started_at_ms,excluded.started_at_ms),
      last_seen_ms=MAX(test_activity.last_seen_ms,excluded.last_seen_ms),
      submitted_at_ms=COALESCE(test_activity.submitted_at_ms,excluded.submitted_at_ms),answered=excluded.answered
      WHERE test_activity.user_id=excluded.user_id AND test_activity.paper_id=excluded.paper_id AND test_activity.submitted_at_ms IS NULL`)
      .bind(body.id,user.userId,body.paperId,now,body.state==='opened'?null:now,now,body.state==='submitted'?now:null,body.answered).run();
    return new Response(null,{status:204});
  } catch(error) { console.error('Activity recording failed',error);return jsonError('Activity unavailable.',503); }
}
