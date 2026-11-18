/** Keep only public learning routes; never store query strings, fragments or account URLs. */
export function activityPage(value: unknown): { path: string; title: string } | null {
  if (!value || typeof value !== 'object') return null;
  const { path, title } = value as Record<string, unknown>;
  if (typeof path !== 'string' || path.length > 240 || !/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/.test(path)) return null;
  if (path !== '/' && !/^\/(?:cbse|icse|igcse|notes|maths-basics|maths-around-us|previous-papers|problems)(?:\/|$)/.test(path)) return null;
  const fallback = path === '/' ? 'Home' : path.slice(1).replace(/\//g, ' · ').replace(/-/g, ' ');
  return { path, title: typeof title === 'string' ? title.replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 160) || fallback : fallback };
}
