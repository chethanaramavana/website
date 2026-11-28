const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const base = process.argv[2] ?? 'http://localhost:3000';
const production = process.argv[3] === 'production';
const request = (path, options = {}) => fetch(base + path, { redirect: 'manual', ...options });
const cookie = role => ({ cookie: `rmc_local_preview=${role}` });
(async () => {
  assert.equal((await request('/')).status, 200);
  assert.equal((await request('/api/teacher/analytics')).status, 403);
  assert.equal((await request('/api/teacher/analytics', { headers: cookie('student') })).status, 403);
  if (production) {
    assert.equal((await request('/dev-login')).status, 404);
    assert.equal((await request('/api/dev/login', { method: 'POST', headers: { origin: base } })).status, 404);
    assert.equal((await request('/api/teacher/analytics', { headers: cookie('teacher') })).status, 403);
    assert.equal((await request('/api/teacher/activity', { headers: cookie('teacher') })).status, 403);
    const page = await request('/teacher/analytics', { headers: cookie('teacher') });
    assert([302, 303, 307].includes(page.status));
    console.log('PASS: production HTTP checks: homepage serves, mock routes return 404, mock cookies cannot access analytics or teacher APIs, private dashboard redirects to real sign-in.');
    return;
  }
  const headers = cookie('teacher');
  const response = await request('/api/teacher/analytics?days=1', { headers });
  assert.equal(response.status, 200); assert.equal(response.headers.get('cache-control'), 'private, no-store');
  const before = await response.json(); assert.equal(before.preview, true);
  const event = { id: randomUUID(), visitor: randomUUID(), path: '/terms', source: 'local-check', device: 'Desktop' };
  for (let i = 0; i < 2; i++) assert.equal((await request('/api/analytics', {
    method: 'POST', headers: { origin: base, 'content-type': 'application/json' }, body: JSON.stringify(event),
  })).status, 204);
  const after = await (await request('/api/teacher/analytics?days=1', { headers })).json();
  assert.equal(after.totals.views, before.totals.views + 1);
  assert.equal(after.totals.visitors, before.totals.visitors + 1);
  assert(after.sources.some(row => row.label === 'campaign:local-check'));
  const student = await request('/teacher/analytics', { headers: cookie('student') });
  assert((await student.text()).includes('Teacher access only'));
  assert.equal((await request('/teacher/analytics', { headers })).status, 200);
  console.log('PASS: development HTTP checks: actual local D1 writes and reports, retry deduplication, source attribution, teacher page/API access and student/anonymous denial.');
})().catch(error => { console.error(error); process.exitCode = 1; });
