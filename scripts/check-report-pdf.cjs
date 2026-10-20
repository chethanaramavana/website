const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const assert = require('node:assert/strict');
require.extensions['.ts'] = (module, filename) =>
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    filename,
  );
const { createReportPdf } = require('../lib/report-pdf.ts');
const { PDFDocument } = require('pdf-lib');
const root = path.resolve(__dirname, '..');
const readAsset = async (url) =>
  new Uint8Array(
    fs.readFileSync(path.join(root, 'public', decodeURIComponent(url))),
  );
const base = {
  name: 'Example student · preview',
  classes: '6, 10',
  books: 'CBSE Mathematics · Ganita Prakash',
  year: '2026–27',
  issued: '20 October 2026',
};
const row = (i) => ({
  id: String(i),
  chapter: `Chapter ${String(i).padStart(2, '0')}`,
  paper: 'Written paper 01',
  context: 'CBSE · Class 6',
  score: i === 1 ? 34 : 12,
  maximum: 40,
  remark:
    i === 1
      ? 'Good use of prime factorisation. Show each division in your HCF working.'
      : 'Show the steps in your working.',
  pending: false,
  href: '/student',
  action: 'Review paper',
});
(async () => {
  fs.mkdirSync(path.join(root, 'tmp/pdfs'), { recursive: true });
  const normal = await createReportPdf(
    {
      ...base,
      rows: [
        row(1),
        {
          ...row(2),
          pending: true,
          score: 12,
          maximum: 16,
          remark: 'MCQs scored. Written answers awaiting marking.',
        },
        {
          ...row(3),
          score: undefined,
          maximum: undefined,
          remark: 'Not yet taken.',
          pending: true,
        },
      ],
    },
    readAsset,
  );
  fs.writeFileSync(path.join(root, 'tmp/pdfs/report-download.pdf'), normal);
  assert.equal((await PDFDocument.load(normal)).getPageCount(), 1);
  const rows = Array.from({ length: 40 }, (_, i) => row(i + 1));
  rows[8].remark =
    'LONG_REMARK_START ' +
    'Explain each division and check the remainder. '.repeat(180) +
    ' LONG_REMARK_END';
  const long = await createReportPdf({ ...base, rows }, readAsset);
  fs.writeFileSync(path.join(root, 'tmp/pdfs/report-long.pdf'), long);
  assert.ok((await PDFDocument.load(long)).getPageCount() > 3);
  console.log(
    `Report PDF checks passed: embedded fonts and crest, ${normal.length} byte single-page report, long remarks and 40 rows across ${(await PDFDocument.load(long)).getPageCount()} pages.`,
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
