'use client';
import { useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import type { ReportDocument } from '@/lib/report-pdf';

export default function ReportDownload({ report }: { report: ReportDocument }) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [pdfUrl, setPdfUrl] = useState('');
  useEffect(() => {
    setPdfUrl('');
  }, [report]);
  useEffect(
    () => () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    },
    [pdfUrl],
  );
  async function download() {
    setBusy(true);
    setError('');
    try {
      const { createReportPdf } = await import('@/lib/report-pdf');
      const bytes = await createReportPdf(report);
      const url = URL.createObjectURL(
        new Blob([new Uint8Array(bytes)], { type: 'application/pdf' }),
      );
      setPdfUrl(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Ramavana-progress-report-${report.year}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'The report could not be downloaded. Please try again.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="report-download">
      {pdfUrl ? (
        <a
          className="rmc-button rmc-button-outline"
          href={pdfUrl}
          download={`Ramavana-progress-report-${report.year}.pdf`}
        >
          <Download aria-hidden="true" />
          Download Report
        </a>
      ) : (
        <button
          type="button"
          className="rmc-button rmc-button-outline"
          onClick={() => void download()}
          disabled={busy}
        >
          {busy ? (
            <Loader2 aria-hidden="true" />
          ) : (
            <Download aria-hidden="true" />
          )}
          {busy ? 'Preparing PDF…' : 'Download Report'}
        </button>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
