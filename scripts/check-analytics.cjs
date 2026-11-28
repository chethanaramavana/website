const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict'), ts = require('typescript');
const { randomUUID } = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');
const sql = new DatabaseSync(':memory:');
for (const file of fs.readdirSync('drizzle').filter(f => f.endsWith('.sql')).sort()) sql.exec(fs.readFileSync('drizzle/' + file, 'utf8'));
const db = { prepare(q) { let values = []; return {
  bind(...args) { values = args; return this; },
  async run() { return sql.prepare(q).run(...values); },
  async first() { return sql.prepare(q).get(...values) ?? null; },
  async all() { return { results: sql.prepare(q).all(...values) }; },
}; } };
let user = null;
const server = { getDatabase: () => db, getRequestUser: async () => user,
  isAdmin: u => u.role === 'teacher', jsonError: (error, status) => Response.json({ error }, { status }) };
const cache = {};
function load(file) {
  file = path.resolve(file);
  if (cache[file]) return cache[file];
  const m = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module: m, exports: m.exports, require: name => {
    if (name === '@/lib/server') return server;
    if (name === '@/lib/analytics') return load('lib/analytics.ts');
    if (name === '@/lib/local-preview-auth') return {
      isLoopbackHost: host => host === '127.0.0.1:3000', localPreviewEnabled: host => host === '127.0.0.1:3000',
    };
    throw Error(name);
  }, Request, Response, URL, Date, TextDecoder, console });
  return cache[file] = m.exports;
}
const analytics = load('lib/analytics.ts');
const post = load('app/api/analytics/route.ts').POST;
const get = load('app/api/teacher/analytics/route.ts').GET;
const live = 'https://ramavanamath.com', local = 'http://127.0.0.1:3000';
const event = (changes = {}) => ({ id: randomUUID(), visitor: randomUUID(), path: '/', device: 'Mobile', ...changes });
const req = (body, origin = live, headers = {}) => new Request(origin + '/api/analytics', {
  method: 'POST', headers: { origin, 'content-type': 'application/json', ...headers }, body: JSON.stringify(body),
});
const report = (origin = live, days = 7) => get(new Request(`${origin}/api/teacher/analytics?days=${days}`));

function checkClient() {
  let pathname = '/', effect, cleanup;
  const previous = { current: '' }, sent = [], stored = new Map(), listeners = new Map();
  const document = { visibilityState: 'visible', referrer: 'https://search.example/private?email=hidden',
    addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: name => listeners.delete(name) };
  const navigator = { userAgent: 'Mobile', doNotTrack: '0' };
  const m = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync('app/website-analytics.tsx', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module: m, exports: m.exports, require: name => {
    if (name === 'react') return { useEffect: callback => { effect = callback; }, useRef: () => previous };
    if (name === 'next/navigation') return { usePathname: () => pathname };
    if (name === '@/lib/analytics') return analytics;
    throw Error(name);
  }, navigator, document, crypto: { randomUUID }, URL, URLSearchParams, location: { search: '?utm_source=whatsapp&email=private' },
  sessionStorage: { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, value) },
  fetch: (url, options) => { sent.push({ url, ...options, event: JSON.parse(options.body) }); return Promise.resolve(); } });
  function render(value) { cleanup?.(); pathname = value; m.exports.default(); cleanup = effect(); }
  render('/'); render('/'); assert.equal(sent.length, 1, 'Strict effect replay must not double count');
  render('/maths-basics/numbers'); assert.equal(sent.length, 2);
  assert.equal(sent[0].event.visitor, sent[1].event.visitor);
  assert.equal(sent[0].event.referrer, 'https://search.example');
  assert.equal(sent[0].event.source, 'whatsapp');
  assert.equal(sent[0].credentials, 'omit');
  render('/dev-login'); render('/maths-basics/numbers'); assert.equal(sent.length, 3);
  document.visibilityState = 'hidden'; render('/terms'); assert.equal(sent.length, 3);
  document.visibilityState = 'visible'; listeners.get('visibilitychange')(); assert.equal(sent.length, 4);
  listeners.get('visibilitychange')(); assert.equal(sent.length, 4, 'Focus changes do not inflate views');
  navigator.doNotTrack = '1'; render('/privacy-policy'); assert.equal(sent.length, 4);
  navigator.doNotTrack = '0'; navigator.globalPrivacyControl = true; render('/careers'); assert.equal(sent.length, 4);
}
(async () => {
  checkClient();
  assert.equal(analytics.analyticsDay(Date.parse('2026-11-27T18:29:59Z')), '2026-11-27');
  assert.equal(analytics.analyticsDay(Date.parse('2026-11-27T18:30:00Z')), '2026-11-28');
  for (const value of ['//evil.test', '/api/auth/google', '/dev-login', '/foo?email=private', '/foo#secret', '/a/../b', '/foo%40bar', '/foo\\bar']) assert.equal(analytics.analyticsPath(value), null);
  assert.equal(analytics.analyticsPath('/student/results/' + randomUUID()), '/student/results/:id');
  assert.equal(analytics.analyticsSource('https://search.example/path?private=yes', '', live), 'search.example');
  assert.equal(analytics.analyticsSource('', 'hello@example.com', live), 'Direct / internal');
  assert.equal((await report()).status, 403);
  user = { role: 'student' }; assert.equal((await report()).status, 403);
  user = { role: 'teacher' };
  assert.equal((await report(live, 365)).status, 400);
  const empty = await (await report()).json(); assert.equal(empty.totals.views, 0); assert.equal(empty.daily.length, 7);
  const visit = event({ source: 'whatsapp', referrer: 'https://example.com/private' });
  assert.equal((await post(req(visit))).status, 204);
  await post(req(visit)); // Retry must not double-count.
  await post(req(event({ visitor: visit.visitor, path: '/maths-around-us/1', device: 'Desktop' })));
  await post(req(event({ path: '/teacher/analytics' }), local));
  assert.equal((await post(req(event(), live, { origin: 'https://evil.test' }))).status, 403);
  assert.equal((await post(req(event(), live, { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await post(req({ ...event(), padding: 'x'.repeat(2100) }))).status, 413);
  for (const changes of [{ id: 'bad' }, { visitor: 'bad' }, { device: 'bad' }, { path: '/api/auth/google' }]) assert.equal((await post(req(event(changes)))).status, 400);
  for (const headers of [{ dnt: '1' }, { 'sec-gpc': '1' }, { 'user-agent': 'Googlebot' }]) await post(req(event(), live, headers));
  assert.equal((await post(new Request(live + '/api/analytics', { method: 'POST', headers: { origin: live, 'content-type': 'application/json' }, body: '{' }))).status, 400);
  const result = await report(); assert.equal(result.headers.get('cache-control'), 'private, no-store');
  const data = await result.json();
  assert.equal(data.totals.views, 2); assert.equal(data.totals.visitors, 1); assert.equal(data.totals.pages, 2);
  assert.equal(data.sources.find(r => r.label === 'campaign:whatsapp').views, 1);
  assert.equal((await (await report(local)).json()).totals.views, 1);
  assert.equal((await (await report(live, 90)).json()).daily.length, 90);
  // Storage uses only the intended anonymous fields.
  assert.deepEqual(Object.keys(sql.prepare('SELECT * FROM analytics_events LIMIT 1').get()).sort(), ['id','day','created_at_ms','path','visitor','source','device','preview'].sort());
  // Per-tab burst limit and pruning of expired history.
  const burst = randomUUID();
  for (let i = 0; i < 65; i++) await post(req(event({ visitor: burst })));
  assert.equal(sql.prepare('SELECT COUNT(*) AS n FROM analytics_events WHERE visitor=?').get(burst).n, 60);
  sql.prepare('INSERT INTO analytics_events VALUES (?,?,?,?,?,?,?,?)').run(randomUUID(), '2000-01-01', 0, '/', randomUUID(), 'Direct / internal', 'Desktop', 0);
  // A fresh worker starts daily pruning again.
  delete cache[path.resolve('app/api/analytics/route.ts')];
  await load('app/api/analytics/route.ts').POST(req(event()));
  assert.equal(sql.prepare("SELECT COUNT(*) AS n FROM analytics_events WHERE day='2000-01-01'").get().n, 0);
  console.log('PASS: client navigation and duplicate prevention, visible-page tracking, migration, private reports, preview isolation, page counting, retry deduplication, IST dates, empty periods, URL privacy, campaign sources, privacy signals, bot filtering, bounded payloads, burst limits and retention.');
})().catch(error => { console.error(error); process.exitCode = 1; });
