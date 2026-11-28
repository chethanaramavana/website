import { analyticsDay, analyticsPath, analyticsSource, ANALYTICS_RETENTION_DAYS } from '@/lib/analytics';
import { isLoopbackHost } from '@/lib/local-preview-auth';
import { getDatabase, jsonError } from '@/lib/server';

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
let cleanedDay = '';

export async function POST(request: Request) {
  const url = new URL(request.url);
  if (request.headers.get('origin') !== url.origin || request.headers.get('sec-fetch-site') === 'cross-site') return jsonError('Same-origin requests only.', 403);
  if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1'
    || /bot|crawler|spider|headless/i.test(request.headers.get('user-agent') ?? '')) return new Response(null, { status: 204 });
  if (!request.headers.get('content-type')?.startsWith('application/json')) return jsonError('JSON required.', 415);
  try {
    // Bound the stream even when Content-Length is missing or incorrect.
    const reader = request.body?.getReader();
    if (!reader) return jsonError('Missing event.', 400);
    let size = 0, body = '';
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 2048) { await reader.cancel(); return jsonError('Event too large.', 413); }
      body += decoder.decode(value, { stream: true });
    }
    let event;
    try { event = JSON.parse(body + decoder.decode()); } catch { return jsonError('Invalid event.', 400); }
    const path = analyticsPath(event?.path);
    if (!path || !uuid.test(event?.id ?? '') || !uuid.test(event?.visitor ?? '')
      || !['Mobile', 'Desktop', 'Tablet'].includes(event?.device)) return jsonError('Invalid event.', 400);
    const db = getDatabase(), now = Date.now(), day = analyticsDay(now);
    const preview = isLoopbackHost(url.host) || !['ramavanamath.com', 'www.ramavanamath.com'].includes(url.hostname);
    const source = analyticsSource(event.referrer, event.source, url.origin);
    // The event ID deduplicates retries. Limit repeated events per anonymous tab.
    await db.prepare(`INSERT OR IGNORE INTO analytics_events (id,day,created_at_ms,path,visitor,source,device,preview)
      SELECT ?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM analytics_events WHERE preview=? AND visitor=? AND created_at_ms>?) < 60`)
      .bind(event.id, day, now, path, event.visitor, source, event.device, Number(preview), Number(preview), event.visitor, now - 60000).run();
    if (cleanedDay !== day) {
      await db.prepare('DELETE FROM analytics_events WHERE day < ?').bind(analyticsDay(now - (ANALYTICS_RETENTION_DAYS - 1) * 86400000)).run();
      cleanedDay = day;
    }
    return new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    console.error('Website analytics recording failed', error);
    return jsonError('Analytics temporarily unavailable.', 503);
  }
}
