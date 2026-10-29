'use client';

import { useCallback, useRef, useState } from 'react';
import AnswerAnnotator from './answer-annotator';

type AnswerFile = { id: string; file_name: string; content_type: string };

export default function AnswerViewer({ submissionId, files, question, onDirty }: { submissionId: string; files: AnswerFile[]; question: number; onDirty: (fileId: string, dirty: boolean) => void }) {
  const [selected, setSelected] = useState(0);
  const unsaved = useRef(false);
  const file = files[selected];
  const trackDirty = useCallback((dirty: boolean) => { unsaved.current = dirty; if (file) onDirty(file.id, dirty); }, [file, onDirty]);
  if (!file) return <div className="answer-preview-empty">No answer uploaded for this question.</div>;
  const url = `/api/teacher/submissions/${encodeURIComponent(submissionId)}/files/${encodeURIComponent(file.id)}`;
  const isImage = ['image/jpeg', 'image/png', 'image/webp'].includes(file.content_type);
  return <section className="answer-preview" aria-label={`Student answer for question ${question}`}>
    <div className="answer-preview-toolbar">
      <strong>Student’s answer</strong>
      {files.length > 1 && <label>File <select aria-label={`Answer file for question ${question}`} value={selected} onChange={(event) => {
        if (unsaved.current) { alert('Please wait for corrections to save, or retry the save, before switching files.'); return; }
        setSelected(Number(event.target.value));
      }}>
        {files.map((item, index) => <option key={item.id} value={index}>{index + 1} — {item.file_name}</option>)}
      </select></label>}
    </div>
    <p className="answer-preview-filename">{file.file_name}</p>
    <AnswerAnnotator key={file.id} url={url} isImage={isImage} question={question} onDirty={trackDirty} />
  </section>;
}
