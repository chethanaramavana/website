'use client';
import { useEffect, useState } from 'react';
import { Loader2, LogOut } from 'lucide-react';
import type { StudentRecordsPayload } from '@/lib/student-records';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
import ReportCard from './report-card';
export default function StudentDashboard({
  displayName,
  email,
  initialRecords,
}: {
  displayName: string;
  email: string;
  initialRecords: StudentRecordsPayload | null;
}) {
  const [records, setRecords] = useState(initialRecords);
  const [error, setError] = useState('');
  useEffect(() => {
    if (initialRecords) return;
    void fetch('/api/student/records', { cache: 'no-store' })
      .then(async (response) => {
        const payload = (await response.json()) as StudentRecordsPayload & {
          error?: string;
        };
        if (!response.ok || !payload.signedIn)
          throw new Error(
            payload.error ?? 'Please sign in again to load your report.',
          );
        setRecords(payload);
      })
      .catch((reason) =>
        setError(
          reason instanceof Error
            ? reason.message
            : 'Account could not be loaded.',
        ),
      );
  }, [initialRecords]);
  return (
    <div className="identity-learning">
      <LearningHeader signedIn />
      <main className="report-shell">
        <div className="report-account-bar">
          <a href="/#syllabus">← Chapters</a>
          <span>{email}</span>
          <a href="/api/auth/signout?return_to=%2F">
            <LogOut size={17} /> Sign out
          </a>
        </div>
        {error ? (
          <div role="alert" className="student-account-error">
            {error}
            <button onClick={() => window.location.reload()}>Try again</button>
          </div>
        ) : records ? (
          <ReportCard records={records} name={displayName} />
        ) : (
          <p role="status">
            <Loader2 /> Loading your report…
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
