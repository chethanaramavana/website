const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('lib/local-preview-auth.ts', 'utf8');
function load(development) {
  const code = ts.transpileModule(
    source.replace('import.meta.env.DEV', String(development)),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  const exports = {};
  vm.runInNewContext(code, {
    exports,
    URL,
    require: () => ({ TEACHER_EMAIL: 'teacher@example.test' }),
  });
  return exports;
}
const production = load(false),
  development = load(true);
for (const host of [
  'localhost:3000',
  '127.0.0.1:3000',
  '[::1]:3000',
  'ramavanamath.com',
  'localhost.evil',
  'evil@localhost',
  'localhost/path',
  null,
]) {
  assert.equal(production.localPreviewEnabled(host), false);
  assert.equal(production.previewUser('rmc_local_preview=teacher', host), null);
}
for (const host of ['localhost:3000', '127.0.0.1:3000', '[::1]:3000']) {
  assert.equal(development.localPreviewEnabled(host), true);
  assert.equal(
    development.previewUser('other=x; rmc_local_preview=student', host).userId,
    'preview:student',
  );
}
for (const host of [
  'ramavanamath.com',
  'localhost.evil',
  'evil@localhost',
  'localhost/path',
  '127.0.0.2',
  null,
])
  assert.equal(
    development.previewUser('rmc_local_preview=teacher', host),
    null,
  );
for (const cookie of [
  null,
  'rmc_local_preview=admin',
  'rmc_local_preview=student-extra',
  'fake_rmc_local_preview=teacher',
])
  assert.equal(development.previewUser(cookie, 'localhost:3000'), null);
assert.equal(
  development.previewUser('rmc_local_preview=teacher', 'localhost:3000').userId,
  'preview:teacher',
);
console.log(
  'Local preview auth checks passed: production disabled, exact loopback hosts only, fixed mock roles and identities.',
);
