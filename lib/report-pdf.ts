import 'regenerator-runtime/runtime.js';
import { PDFDocument, rgb, degrees, type PDFFont } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { ReportRow } from './report-card';

export type ReportDocument = {
  name: string;
  classes: string;
  books: string;
  year: string;
  issued: string;
  rows: ReportRow[];
};
type ReadAsset = (path: string) => Promise<ArrayBuffer | Uint8Array>;

/** Generate only the report data. No page capture, HTML, navigation or account chrome. */
export async function createReportPdf(
  report: ReportDocument,
  readAsset: ReadAsset = async (path) => {
    const response = await fetch(path);
    if (!response.ok)
      throw new Error(
        'A report font or crest could not be loaded. Please try again.',
      );
    return response.arrayBuffer();
  },
) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle(`Progress report ${report.year} - ${report.name}`);
  pdf.setAuthor('Ramavana Mathematical Center');
  const [uiBytes, italicBytes, marksBytes, crestBytes] = await Promise.all([
    readAsset('/fonts/BalooTamma2-Regular.ttf'),
    readAsset('/fonts/SourceSerif4-Italic.ttf'),
    readAsset('/fonts/shrikhand-Shrikhand-Regular.ttf'),
    readAsset('/ramavana-paper-logo.png'),
  ]);
  const [ui, italic, marks, crest] = await Promise.all([
    // Full Baloo embedding preserves composite outlines used by Latin and Kannada.
    pdf.embedFont(uiBytes, { subset: false }),
    pdf.embedFont(italicBytes, { subset: true }),
    pdf.embedFont(marksBytes, { subset: true }),
    pdf.embedPng(crestBytes),
  ]);
  const ink = rgb(1 / 255, 30 / 255, 71 / 255),
    red = rgb(176 / 255, 48 / 255, 14 / 255),
    muted = rgb(78 / 255, 91 / 255, 112 / 255),
    rule = rgb(0.86, 0.89, 0.92),
    pale = rgb(0.96, 0.97, 0.98);
  const W = 595.28,
    H = 841.89,
    M = 36,
    CW = W - 2 * M,
    lh = 14,
    pad = 10;
  const widths = [140, 108, 76, CW - 324];
  const xs = [
    M,
    M + widths[0],
    M + widths[0] + widths[1],
    M + widths[0] + widths[1] + widths[2],
  ];
  function wrap(text: string, font: PDFFont, size: number, width: number) {
    const lines: string[] = [];
    for (const paragraph of text.replace(/\r/g, '').split('\n')) {
      let line = '';
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        const test = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(test, size) <= width) {
          line = test;
          continue;
        }
        if (line) lines.push(line);
        line = '';
        for (const char of word) {
          if (line && font.widthOfTextAtSize(line + char, size) > width) {
            lines.push(line);
            line = '';
          }
          line += char;
        }
      }
      lines.push(line);
    }
    return lines.length ? lines : [''];
  }
  let page = pdf.addPage([W, H]);
  let y = H - M;
  const text = (
    value: string,
    x: number,
    top: number,
    font = ui,
    size = 10,
    color = ink,
  ) => page.drawText(value, { x, y: top - size, font, size, color });
  function header(continued = false) {
    const top = H - M;
    if (continued) {
      page.drawImage(crest, { x: M, y: top - 48, width: 48, height: 48 });
      text(`PROGRESS REPORT · ${report.year}`, M + 62, top - 3, ui, 12);
      text(`${report.name} · continued`, M + 62, top - 26, ui, 10, muted);
      y = top - 64;
      return;
    }
    const identityX = M + 124,
      labelWidth = 44,
      valueX = identityX + labelWidth,
      valueWidth = CW - 124 - labelWidth - 12;
    const fields = [
      ['Student', report.name],
      ['Class', report.classes],
      ['Book', report.books],
    ];
    const lineGroups = fields.map(([, value]) =>
      wrap(value, ui, 10.5, valueWidth),
    );
    const height = Math.max(
      122,
      42 +
        lineGroups.reduce((total, lines) => total + lines.length * lh + 6, 0),
    );
    page.drawRectangle({
      x: M,
      y: top - height,
      width: CW,
      height,
      borderWidth: 0.7,
      borderColor: rule,
    });
    page.drawImage(crest, { x: M + 12, y: top - 110, width: 100, height: 100 });
    text(`PROGRESS REPORT · ${report.year}`, identityX, top - 14, ui, 11.5);
    let fieldY = top - 40;
    fields.forEach(([label], index) => {
      text(label, identityX, fieldY, ui, 9, muted);
      lineGroups[index].forEach((line, j) =>
        text(line, valueX, fieldY - j * lh, ui, 10.5),
      );
      fieldY -= lineGroups[index].length * lh + 6;
    });
    y = top - height - 24;
  }
  function tableHeader() {
    page.drawRectangle({ x: M, y: y - 30, width: CW, height: 30, color: pale });
    ['Chapter', 'Paper', 'Marks', 'Remark'].forEach((label, i) =>
      text(label, xs[i] + pad, y - 7, ui, 10.5),
    );
    y -= 30;
  }
  function nextPage() {
    page = pdf.addPage([W, H]);
    header(true);
    tableHeader();
  }
  header();
  tableHeader();
  const rows = report.rows;
  if (!rows.length) {
    text('No papers or saved tests yet.', M + pad, y - 18, ui, 11, muted);
    y -= 60;
  }
  for (const row of rows) {
    const remarkFont = /[\u0c80-\u0cff]/.test(row.remark)
      ? ui
      : row.pending
        ? ui
        : italic;
    const columns = [
      wrap(`${row.chapter}\n${row.context}`, ui, 10, widths[0] - 2 * pad),
      wrap(row.paper, ui, 10, widths[1] - 2 * pad),
      wrap(row.remark, remarkFont, 10.5, widths[3] - 2 * pad),
    ];
    const qualifies =
      !row.pending &&
      row.score !== undefined &&
      !!row.maximum &&
      row.score / row.maximum >= 0.8;
    let first = true;
    while (first || columns.some((lines) => lines.length)) {
      const fullHeight =
        Math.max(
          34,
          ...columns.map((lines) => lines.length * lh),
          first && qualifies
            ? 86
            : first && row.score !== undefined && row.pending
              ? 36
              : 0,
        ) +
        2 * pad;
      if (y - fullHeight < 62 && fullHeight < 650) nextPage();
      if (y - 62 < (first && qualifies ? 110 : 70)) nextPage();
      const fit = Math.max(1, Math.floor((y - 62 - 2 * pad) / lh));
      const pieces = columns.map((lines) => lines.splice(0, fit));
      const rowHeight =
        Math.max(
          34,
          ...pieces.map((lines) => lines.length * lh),
          first && qualifies
            ? 86
            : first && row.score !== undefined && row.pending
              ? 36
              : 0,
        ) +
        2 * pad;
      pieces[0].forEach((line, j) =>
        text(line, xs[0] + pad, y - pad - j * lh, ui, 10, j ? muted : ink),
      );
      pieces[1].forEach((line, j) =>
        text(line, xs[1] + pad, y - pad - j * lh, ui, 10),
      );
      pieces[2].forEach((line, j) =>
        text(
          line,
          xs[3] + pad,
          y - pad - j * lh,
          remarkFont,
          10.5,
          row.pending ? muted : red,
        ),
      );
      if (first) {
        const score =
          row.score === undefined ? '—' : `${row.score}/${row.maximum}`;
        text(
          score,
          xs[2] + pad,
          y - pad,
          row.score === undefined ? ui : marks,
          13,
          row.score === undefined ? muted : red,
        );
        if (row.pending && row.score !== undefined)
          text('MCQ only', xs[2] + pad, y - pad - 21, ui, 8, muted);
        if (qualifies) {
          const cx = xs[2] + widths[2] / 2,
            cy = y - 64;
          page.drawCircle({
            x: cx,
            y: cy,
            size: 23,
            borderColor: red,
            borderWidth: 1,
          });
          page.drawCircle({
            x: cx,
            y: cy,
            size: 20,
            borderColor: red,
            borderWidth: 0.5,
          });
          page.drawText('ಭೇಷ್!', {
            x: cx - 17,
            y: cy + 1,
            font: ui,
            size: 13,
            color: red,
            rotate: degrees(-13),
          });
          page.drawText('WELL DONE', {
            x: cx - 18,
            y: cy - 10,
            font: ui,
            size: 6,
            color: red,
            rotate: degrees(-13),
          });
        }
      }
      page.drawLine({
        start: { x: M, y: y - rowHeight },
        end: { x: W - M, y: y - rowHeight },
        thickness: 0.5,
        color: rule,
      });
      y -= rowHeight;
      first = false;
      if (columns.some((lines) => lines.length)) nextPage();
    }
  }
  if (y < 140) {
    page = pdf.addPage([W, H]);
    header(true);
  }
  text(`Issued ${report.issued}`, M, y - 28, ui, 10, muted);
  text('Ramavana Mathematical Center', W - M - 205, y - 28, ui, 11);
  text('Run by professional mathematicians', W - M - 205, y - 46, ui, 9, muted);
  page.drawLine({
    start: { x: W - M - 205, y: y - 68 },
    end: { x: W - M, y: y - 68 },
    thickness: 0.7,
    color: ink,
  });
  const pages = pdf.getPages();
  pages.forEach((p, index) => {
    p.drawText('Ramavana Mathematical Center', {
      x: M,
      y: 24,
      font: ui,
      size: 8,
      color: muted,
    });
    p.drawText(`Page ${index + 1} / ${pages.length}`, {
      x: W - M - 55,
      y: 24,
      font: ui,
      size: 8,
      color: muted,
    });
  });
  return pdf.save();
}
