'use client';

import { Printer } from 'lucide-react';

export default function NotesPrintButton() {
  return <button type="button" className="notes-print-hint" onClick={() => window.print()}><Printer /> Print or save PDF</button>;
}
