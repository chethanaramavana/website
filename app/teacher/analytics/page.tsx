'use client';
import { useEffect, useState } from 'react';
import type { AnalyticsCount, AnalyticsReport } from '@/lib/analytics';
import './analytics.css';

const number = (value: number) => value.toLocaleString('en-IN');
const date = (day: string) => new Date(`${day}T12:00:00+05:30`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

function Breakdown({ title, rows, total }: { title: string; rows: AnalyticsCount[]; total: number }) {
  return <section className="analytics-panel"><h2>{title}</h2>
    {rows.length ? <table><thead><tr><th scope="col">{title === 'Popular pages' ? 'Page' : title === 'Visit sources' ? 'Source' : 'Device'}</th><th scope="col">Views</th><th scope="col">Share</th></tr></thead>
      <tbody>{rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th><td>{number(row.views)}</td><td>{total ? Math.round(row.views / total * 100) : 0}%</td></tr>)}</tbody></table>
      : <p>No visits recorded for this period.</p>}
  </section>;
}

export default function TeacherAnalytics() {
  const [days, setDays] = useState(7), [reload, setReload] = useState(0);
  const [data, setData] = useState<AnalyticsReport | null>(null);
  const [loading, setLoading] = useState(true), [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError(''); setData(null);
    void fetch(`/api/teacher/analytics?days=${days}`, { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        const result = await response.json() as AnalyticsReport & { error?: string };
        if (!response.ok) throw new Error(result.error ?? 'Analytics could not be loaded.');
        setData(result);
      }).catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Analytics could not be loaded.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [days, reload]);
  const maximum = Math.max(1, ...(data?.daily.map(row => row.views) ?? []));
  return <main className="teacher-shell analytics-shell">
    <a className="analytics-back" href="/teacher">Teacher workspace</a>
    <header className="analytics-heading"><div><h1>Website analytics</h1><p>Understand which pages visitors use, and how they reach Ramavana.</p></div>
      <button type="button" disabled={loading} onClick={() => setReload(value => value + 1)}>Refresh</button></header>
    <nav className="analytics-periods" aria-label="Analytics period">{([1, 7, 30, 90] as const).map(value => <button key={value} type="button" aria-pressed={days === value} onClick={() => setDays(value)}>{value === 1 ? 'Today' : `${value} days`}</button>)}</nav>
    <div aria-live="polite">{loading && <p>Loading analytics…</p>}{error && <p className="analytics-error" role="alert">{error} Use Refresh to retry.</p>}</div>
    {data && <>
      {data.preview && <p className="analytics-preview"><strong>Local preview data.</strong> These visits are separate from live website traffic.</p>}
      <p className="analytics-range">{date(data.since)} – {date(data.today)} · India Standard Time</p>
      <div className="analytics-totals">
        <section><h2>Page views</h2><strong>{number(data.totals.views)}</strong><p>Recorded page loads and navigation</p></section>
        <section><h2>Estimated visitors</h2><strong>{number(data.totals.visitors)}</strong><p>Sum of daily browser-tab visitors</p></section>
        <section><h2>Pages visited</h2><strong>{number(data.totals.pages)}</strong><p>Different page paths in this period</p></section>
      </div>
      {!data.totals.views && <p className="analytics-preview">No visits yet. Statistics appear as people browse the website; earlier traffic cannot be recovered.</p>}
      <section className="analytics-panel"><h2>Daily traffic</h2><p>Page views per day. Open Daily totals below for exact counts.</p>
        <div className="analytics-chart" role="img" aria-label={`Daily page views from ${date(data.since)} to ${date(data.today)}. Exact counts are in the daily totals table.`}>
          {data.daily.map(row => <div key={row.day} title={`${date(row.day)}: ${row.views} views`}><span style={{ height: `${row.views / maximum * 100}%`, minHeight: row.views ? 3 : 0 }} /></div>)}
        </div><div className="analytics-chart-labels"><span>{date(data.since)}</span><span>{date(data.today)}</span></div>
        <details><summary>Daily totals</summary><div className="analytics-daily-table"><table><thead><tr><th scope="col">Date</th><th scope="col">Page views</th><th scope="col">Estimated visitors</th></tr></thead><tbody>{data.daily.map(row => <tr key={row.day}><th scope="row">{date(row.day)}</th><td>{number(row.views)}</td><td>{number(row.visitors)}</td></tr>)}</tbody></table></div></details>
      </section>
      <Breakdown title="Popular pages" rows={data.pages} total={data.totals.views} />
      <div className="analytics-breakdowns"><Breakdown title="Visit sources" rows={data.sources} total={data.totals.views} /><Breakdown title="Devices" rows={data.devices} total={data.totals.views} /></div>
      <section className="analytics-notes"><h2>About these numbers</h2><p>All website pages use the same tracker. API requests and sign-in callbacks are excluded. Teacher page visits are included. Lists show the top 30 entries.</p><p>Visitor estimates use a random ID stored in a browser tab, renewed daily. Separate tabs, days, devices, or blocked browser storage can count the same person again. These are approximate traffic statistics, not a count of individual students.</p><p>No analytics cookies, names, email addresses, IP addresses, answers, or full referring URLs are stored. URL parameters and fragments are excluded. A simple utm_source tag, such as whatsapp, can label a campaign. Browser privacy signals and common automated bots are excluded; blockers and unrecognised bots can affect counts.</p><p>History is available for 90 days, with older events removed when new traffic arrives. Student test activity and results remain in the existing teacher workspace.</p></section>
    </>}
  </main>;
}
