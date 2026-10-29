'use client';

import { useState } from 'react';

type AnswerFile = { id: string; file_name: string; content_type: string };

export default function AnswerViewer({ submissionId, files, question }: { submissionId: string; files: AnswerFile[]; question: number }) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [failed, setFailed] = useState(false);
  const file = files[selected];
  if (!file) return <div className="answer-preview-empty">No answer uploaded for this question.</div>;
  const url = `/api/teacher/submissions/${encodeURIComponent(submissionId)}/files/${encodeURIComponent(file.id)}`;
  const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.content_type);
  return <section className="answer-preview" aria-label={`Student answer for question ${question}`}>
    <div className="answer-preview-toolbar">
      <strong>Student’s answer</strong>
      {files.length > 1 && <label>Page <select aria-label={`Answer file for question ${question}`} value={selected} onChange={(event) => { setSelected(Number(event.target.value)); setZoom(100); setFailed(false); }}>
        {files.map((item, index) => <option key={item.id} value={index}>{index + 1} — {item.file_name}</option>)}
      </select></label>}
      {isImage && <label>Zoom <select aria-label={`Answer zoom for question ${question}`} value={zoom} onChange={(event) => setZoom(Number(event.target.value))}>
        {[100, 125, 150, 200].map(value => <option key={value} value={value}>{value === 100 ? 'Fit width' : `${value}%`}</option>)}
      </select></label>}
    </div>
    <p className="answer-preview-filename">{file.file_name}</p>
    {failed ? <p role="alert">The answer preview could not load. Refresh the page to retry.</p> : isImage ?
      <div className="answer-image-scroll"><img src={url} alt={`Uploaded answer to question ${question}, file ${selected + 1}`} style={{ width: `${zoom}%` }} loading="lazy" onError={() => setFailed(true)} /></div> :
      <iframe key={file.id} src={url} title={`PDF answer to question ${question}, file ${selected + 1}`} className="answer-pdf" />}
  </section>;
}
