import { analyticsDay, IST_OFFSET, type AnalyticsCount } from '@/lib/analytics';
import { getDatabase, getRequestUser, isAdmin, jsonError } from '@/lib/server';
import { localPreviewEnabled } from '@/lib/local-preview-auth';

export async function GET(request: Request) {
  try {
    const user = await getRequestUser(request);
    if (!user || !isAdmin(user)) return jsonError('Teacher access only.', 403);
    const url = new URL(request.url);
    const preview = localPreviewEnabled(url.host);
    const days = Number(url.searchParams.get('days') ?? 7);
    if (![1, 7, 30, 90].includes(days)) return jsonError('Choose 1, 7, 30 or 90 days.', 400);
    const today = analyticsDay(), since = analyticsDay(Date.now() - (days - 1) * 86400000);
    const db = getDatabase();
    const where = 'preview=? AND day>=? AND day<=?';
    const query = (sql: string) => db.prepare(sql).bind(Number(preview), since, today);
    const [totals, daily, pages, sources, devices] = await Promise.all([
      query(`SELECT COUNT(*) AS views,COUNT(DISTINCT day || ':' || visitor) AS visitors,COUNT(DISTINCT path) AS pages FROM analytics_events WHERE ${where}`).first(),
      query(`SELECT day,COUNT(*) AS views,COUNT(DISTINCT visitor) AS visitors FROM analytics_events WHERE ${where} GROUP BY day ORDER BY day`).all<{ day: string; views: number; visitors: number }>(),
      ...['path', 'source', 'device'].map(column => query(`SELECT ${column} AS label,COUNT(*) AS views FROM analytics_events WHERE ${where} GROUP BY ${column} ORDER BY views DESC,${column} LIMIT 30`).all<AnalyticsCount>()),
    ]);
    const byDay = new Map(daily.results.map(row => [row.day, row]));
    const start = Date.parse(`${since}T00:00:00+05:30`);
    return Response.json({ preview, days, since, today, totals,
      daily: Array.from({ length: days }, (_, i) => {
        const day = new Date(start + IST_OFFSET + i * 86400000).toISOString().slice(0, 10);
        return byDay.get(day) ?? { day, views: 0, visitors: 0 };
      }), pages: pages.results, sources: sources.results, devices: devices.results,
    }, { headers: { 'cache-control': 'private, no-store', 'vary': 'Cookie' } });
  } catch (error) {
    console.error('Website analytics report failed', error);
    return jsonError('Analytics could not be loaded. Please try again.', 503);
  }
}
