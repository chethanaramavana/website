export const ANALYTICS_RETENTION_DAYS = 90;
export const IST_OFFSET = 330 * 60 * 1000;

export function analyticsDay(now = Date.now()) {
  return new Date(now + IST_OFFSET).toISOString().slice(0, 10);
}

// Keep URL parameters, account identifiers and submission IDs out of analytics.
export function analyticsPath(value: unknown): string | null {
  if (typeof value !== 'string' || value.length > 300 || !/^\/(?:[a-zA-Z0-9_/-]*)$/.test(value)
    || value.includes('//') || value.split('/').some(part => part === '.' || part === '..')) return null;
  if (/^\/(api|dev-login|_next|\.well-known)(\/|$)/.test(value)) return null;
  return value.replace(/\/$/, '').replace(/\b[0-9a-f]{8}-[0-9a-f-]{27,}\b/gi, ':id')
    .replace(/\/[^/]*[a-zA-Z][^/]*\d[^/]{20,}(?=\/|$)/g, '/:id') || '/';
}

export function analyticsSource(referrer: unknown, source: unknown, origin: string) {
  if (typeof source === 'string' && /^[a-zA-Z0-9_-]{1,40}$/.test(source)) return `campaign:${source.toLowerCase()}`;
  if (typeof referrer === 'string' && referrer.length <= 300) {
    try {
      const url = new URL(referrer);
      if (!['https:', 'http:'].includes(url.protocol) || url.origin === origin) return 'Direct / internal';
      return url.hostname.replace(/^www\./, '').slice(0, 100);
    } catch { /* No valid referrer. */ }
  }
  return 'Direct / internal';
}

export type AnalyticsCount = { label: string; views: number };
export type AnalyticsReport = {
  preview: boolean; days: number; since: string; today: string;
  totals: { views: number; visitors: number; pages: number };
  daily: { day: string; views: number; visitors: number }[];
  pages: AnalyticsCount[]; sources: AnalyticsCount[]; devices: AnalyticsCount[];
};
