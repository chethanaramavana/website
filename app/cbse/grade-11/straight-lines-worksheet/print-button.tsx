'use client';
import type { ReactNode } from 'react';
export default function PrintButton({ children }: { children: ReactNode }) {
  return <button type="button" onClick={() => window.print()}>{children}</button>;
}
