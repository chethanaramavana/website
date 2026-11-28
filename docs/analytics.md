# Built-in website analytics

The root layout mounts `WebsiteAnalytics` on all rendered pages. An anonymous,
same-origin POST to `/api/analytics` records page views in D1. The teacher dashboard
is `/teacher/analytics`; its API independently enforces the existing teacher role
and returns private, non-cacheable reports. Student learning records are separate.

## Counting and privacy

- Page loads and pathname changes count once while visible; focus changes do not.
- Visitor estimates sum distinct random browser-tab IDs per day in India Standard
  Time. Session storage rotates the identifier daily. These are not unique people
  across days or devices. Counts can be higher when storage is blocked.
- Only event ID, day, timestamp, normalised path, daily tab identifier, source,
  device category and preview flag are stored. No login identity, IP address,
  answers, full referrer, query string or fragment is stored in analytics.
- UUID paths are grouped as `:id`. APIs and `/dev-login` are excluded. Teacher
  page views count. Common bot user agents, DNT and GPC are excluded.
- A link such as `https://ramavanamath.com/?utm_source=whatsapp` labels the source
  for that tab's subsequent visits. Use simple campaign names, never personal data.
- Only the referring hostname is retained. Missing referrers and internal visits
  without a saved source appear as `Direct / internal`.
- Each event UUID is accepted once; each visitor ID is capped at 60 events per
  minute. This is basic noise protection, not comprehensive bot/abuse detection.
- Reports cover up to 90 calendar days. Old rows are removed on the first accepted
  event of each day in a worker instance. No background job is required; inactive
  sites may retain older rows until traffic resumes, but reports exclude them.

## Local testing and deployment

Migration `0011_clean_malcolm_colcord.sql` creates only analytics storage and
indexes. Run `python scripts/setup-local-preview.py` after starting development
to apply it to the existing local database. This never touches remote D1.

Loopback and noncanonical host events are marked preview. In local development,
the dashboard shows preview events and clearly labels them. On the live custom
domain it shows only live traffic. No historical traffic is imported or invented.

Checks:

```
node scripts/check-analytics.cjs
node scripts/check-local-preview-auth.cjs
node scripts/check-analytics-http.cjs http://localhost:3000
node scripts/check-analytics-http.cjs http://127.0.0.1:3001 production
node node_modules/typescript/bin/tsc --noEmit --incremental false
npm run build
```

The analytics check exercises the actual route code with all SQL migrations in
an in-memory SQLite database and exercises the client effect with browser stubs.
The HTTP checks use a running development server and a local production Worker
respectively; they never test against the live website. Browser QA additionally covers teacher/student access, responsive layout, a real
learning-page visit, campaign attribution, filters and daily totals.

There is no analytics subscription or external analytics service. Events and
queries consume the site's existing Workers/D1 hosting allowance. Deployment is
separate: GitHub pushes do not activate tracking on the live website. The normal
Sites deployment applies the migration before publishing the updated Worker.
