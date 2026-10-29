'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import type { AnswerAnnotation, Point } from '@/lib/answer-annotations';

type Tool = 'view' | 'tick' | 'cross' | 'pen' | 'comment' | 'erase';
export default function AnswerAnnotator({ url, isImage, question, onDirty }: { url: string; isImage: boolean; question: number; onDirty: (dirty: boolean) => void }) {
  const [annotations, setAnnotations] = useState<AnswerAnnotation[]>([]);
  const [history, setHistory] = useState<AnswerAnnotation[][]>([]);
  const [tool, setTool] = useState<Tool>('view');
  const [comment, setComment] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [ratio, setRatio] = useState(1.4);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('Loading corrections…');
  const [error, setError] = useState('');
  const [mediaError, setMediaError] = useState('');
  const [stroke, setStroke] = useState<Point[]>([]);
  const [dirty, setDirty] = useState(false);
  const [retry, setRetry] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pdf = useRef<import('pdfjs-dist').PDFDocumentProxy | null>(null);
  const [pdfReady, setPdfReady] = useState(false);
  const revision = useRef<string | null>(null);
  const latest = useRef<AnswerAnnotation[]>([]);
  const saved = useRef<AnswerAnnotation[]>([]);
  const saving = useRef(false);
  const drawing = useRef<Point[]>([]);
  const height = ratio * 1000;

  useEffect(() => {
    let cancelled = false;
    fetch(`${url}/annotations`, { cache: 'no-store' }).then(async response => {
      const payload = await response.json() as { error?: string; revision: string | null; document: { annotations: AnswerAnnotation[] } };
      if (!response.ok) throw new Error(payload.error || 'Corrections could not load.');
      if (cancelled) return;
      revision.current = payload.revision;
      latest.current = saved.current = payload.document.annotations;
      setAnnotations(payload.document.annotations); setLoaded(true); setStatus('All corrections saved');
    }).catch(e => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [url]);

  useEffect(() => {
    if (isImage) return;
    let cancelled = false;
    let task: import('pdfjs-dist').PDFDocumentLoadingTask | undefined;
    (async () => {
      const pdfjs = await import('pdfjs-dist');
      const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?worker&url');
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      task = pdfjs.getDocument({ url });
      const document = await task.promise;
      if (cancelled) { void task.destroy(); return; }
      pdf.current = document; setPages(document.numPages); setPdfReady(true);
    })().catch(() => { if (!cancelled) setMediaError('This PDF could not be opened for correction. It may be password-protected or damaged.'); });
    return () => { cancelled = true; void task?.destroy(); pdf.current = null; };
  }, [url, isImage]);

  useEffect(() => {
    if (!pdfReady || !pdf.current) return;
    let cancelled = false;
    let render: import('pdfjs-dist').RenderTask | undefined;
    setReady(false);
    (async () => {
      const pdfPage = await pdf.current!.getPage(page);
      if (cancelled || !canvas.current) return;
      const viewport = pdfPage.getViewport({ scale: 1 });
      const scaled = pdfPage.getViewport({ scale: Math.min(2, 1800 / viewport.width) });
      const element = canvas.current;
      element.width = scaled.width; element.height = scaled.height;
      setRatio(viewport.height / viewport.width);
      render = pdfPage.render({ canvas: element, canvasContext: element.getContext('2d')!, viewport: scaled });
      await render.promise;
      if (!cancelled) setReady(true);
    })().catch(e => { if (!cancelled && e.name !== 'RenderingCancelledException') setMediaError('This PDF page could not be displayed.'); });
    return () => { cancelled = true; render?.cancel(); };
  }, [page, pdfReady]);

  useEffect(() => { onDirty(dirty); }, [dirty, onDirty]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (latest.current !== saved.current) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, []);

  useEffect(() => {
    if (!loaded || !dirty) return;
    const timer = window.setTimeout(async () => {
      if (saving.current) return;
      saving.current = true; setStatus('Saving corrections…');
      try {
        // Serialize writes; keep saving if drawing continued during the request.
        while (latest.current !== saved.current) {
          const snapshot = latest.current;
          const response = await fetch(`${url}/annotations`, { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ document: { version: 1, annotations: snapshot }, revision: revision.current }) });
          const payload = await response.json() as { error?: string; revision: string };
          if (!response.ok) throw new Error(payload.error || 'Corrections could not be saved.');
          revision.current = payload.revision; saved.current = snapshot;
        }
        setDirty(false); onDirty(false); setError(''); setStatus('All corrections saved');
      } catch (e) { setError(e instanceof Error ? e.message : 'Save failed. Please retry.'); setStatus('Corrections not saved'); }
      finally { saving.current = false; }
    }, 600);
    return () => window.clearTimeout(timer);
  }, [annotations, dirty, loaded, retry, url, onDirty]);

  function change(next: AnswerAnnotation[]) {
    if (next.length > 1000) { setError('This file has reached the correction limit. Erase older corrections to continue.'); return; }
    setHistory(h => [...h.slice(-49), latest.current]); latest.current = next;
    setAnnotations(next); setDirty(true); onDirty(true); setStatus('Unsaved corrections');
  }
  function point(event: PointerEvent<SVGSVGElement>): Point {
    const bounds = event.currentTarget.getBoundingClientRect();
    return { x: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)), y: Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)) };
  }
  function down(event: PointerEvent<SVGSVGElement>) {
    if (!loaded || !ready || tool === 'view' || tool === 'erase' || event.button !== 0) return;
    event.preventDefault();
    const position = point(event);
    if (tool === 'pen') { event.currentTarget.setPointerCapture(event.pointerId); drawing.current = [position]; setStroke([position]); return; }
    if (tool === 'comment' && !comment.trim()) { setError('Type a comment, then click where it belongs on the answer.'); return; }
    change([...latest.current, { id: crypto.randomUUID(), page, kind: tool, points: [position], ...(tool === 'comment' ? { text: comment.trim() } : {}) }]);
  }
  function finish(event: PointerEvent<SVGSVGElement>) {
    if (!drawing.current.length) return;
    const points = [...drawing.current]; drawing.current = []; setStroke([]);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    change([...latest.current, { id: crypto.randomUUID(), page, kind: 'pen', points }]);
  }
  const path = (points: Point[]) => points.map(p => `${p.x * 1000},${p.y * height}`).join(' ');
  const tools: [Tool, string][] = [['view', 'Move / scroll'], ['tick', '✓ Tick'], ['cross', '✗ Cross'], ['pen', 'Pen'], ['comment', 'Comment'], ['erase', 'Eraser']];

  return <div className="answer-annotator">
    <div className="annotation-toolbar" role="group" aria-label={`Correction tools for question ${question}`}>
      {tools.map(([value, label]) => <button type="button" key={value} aria-pressed={tool === value} disabled={!loaded || !ready} onClick={() => setTool(value)}>{label}</button>)}
      <button type="button" disabled={!history.length} onClick={() => {
        const previous = history[history.length - 1]; setHistory(h => h.slice(0, -1)); latest.current = previous; setAnnotations(previous); setDirty(true); onDirty(true);
      }}>Undo</button>
      <button type="button" disabled={!dirty} onClick={() => setRetry(n => n + 1)}>Save corrections</button>
      <label>Zoom <select aria-label={`Answer zoom for question ${question}`} value={zoom} onChange={e => setZoom(Number(e.target.value))}>{[100,125,150,200].map(value => <option value={value} key={value}>{value === 100 ? 'Fit width' : `${value}%`}</option>)}</select></label>
    </div>
    {tool === 'comment' && <label className="annotation-comment">Comment, then tap the answer<textarea maxLength={240} rows={2} value={comment} onChange={e => setComment(e.target.value)} placeholder="Write feedback here…" /></label>}
    {!isImage && <div className="annotation-pages"><button type="button" disabled={page === 1 || !ready} onClick={() => { setReady(false); setPage(p => p - 1); }}>Previous page</button><span>Page {page} of {pages}</span><button type="button" disabled={page === pages || !ready} onClick={() => { setReady(false); setPage(p => p + 1); }}>Next page</button></div>}
    <p className="annotation-status" role="status">{status}{!ready && !mediaError ? ' · Loading answer…' : ''}</p>
    {error && <p className="annotation-error" role="alert">{error} {dirty && <button type="button" onClick={() => setRetry(n => n + 1)}>Retry save</button>}</p>}
    {mediaError ? <p className="annotation-error" role="alert">{mediaError}</p> : <div className="answer-image-scroll">
      <div className="annotation-page" style={{ width: `${zoom}%`, aspectRatio: `1 / ${ratio}` }}>
        {isImage ? <img src={url} alt={`Uploaded answer to question ${question}`} draggable={false} onLoad={e => { setRatio(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth); setReady(true); }} onError={() => setMediaError('The answer image could not load. Refresh to retry.')} /> : <canvas ref={canvas} aria-label={`Answer PDF page ${page}`} />}
        {ready && <svg viewBox={`0 0 1000 ${height}`} className={`annotation-overlay tool-${tool}`} aria-label="Answer correction canvas" onPointerDown={down} onPointerMove={e => {
          if (!drawing.current.length || drawing.current.length >= 3000) return;
          drawing.current.push(point(e)); setStroke([...drawing.current]);
        }} onPointerUp={finish} onPointerCancel={() => { drawing.current = []; setStroke([]); }}>
          {annotations.filter(a => a.page === page).map(a => {
            const x = a.points[0].x * 1000, y = a.points[0].y * height;
            return <g key={a.id} className="annotation-mark" onPointerDown={e => { if (tool === 'erase') { e.stopPropagation(); change(latest.current.filter(item => item.id !== a.id)); } }}>
              {a.kind === 'pen' ? <>
                <polyline points={path(a.points)} fill="none" stroke="transparent" strokeWidth="24" />
                {a.points.length === 1 ? <circle cx={x} cy={y} r="3" fill="#b91c1c" /> : <polyline points={path(a.points)} fill="none" stroke="#b91c1c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
              </> : a.kind === 'comment' ?
                <foreignObject x={Math.min(x, 640)} y={Math.min(y, Math.max(0, height - 350))} width="350" height="350"><div className="annotation-note">{a.text}</div></foreignObject> :
                <text x={Math.min(x, 940)} y={Math.max(55, Math.min(y, height - 10))} fill={a.kind === 'tick' ? '#157347' : '#b91c1c'} fontSize="60" fontFamily="Arial, sans-serif" fontWeight="bold">{a.kind === 'tick' ? '✓' : '✗'}</text>}
            </g>;
          })}
          {!!stroke.length && <polyline points={path(stroke)} fill="none" stroke="#b91c1c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>}
      </div>
    </div>}
  </div>;
}
