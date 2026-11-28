'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsDay, analyticsPath } from '@/lib/analytics';

export default function WebsiteAnalytics() {
  const pathname = usePathname();
  const previous = useRef('');
  useEffect(() => {
    if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
    const path = analyticsPath(pathname);
    if (!path) { previous.current = pathname; return; }
    if (previous.current === pathname) return;
    const record = () => {
      if (document.visibilityState !== 'visible' || previous.current === pathname) return;
      previous.current = pathname;
      const day = analyticsDay();
      let visitor = crypto.randomUUID();
      let source = new URLSearchParams(location.search).get('utm_source') ?? '';
      let referrer = document.referrer ? new URL(document.referrer).origin : '';
      try {
        const saved = JSON.parse(sessionStorage.getItem('rmc_analytics') ?? 'null');
        if (saved?.day === day && typeof saved.visitor === 'string') {
          visitor = saved.visitor;
          source = source || saved.source;
          referrer = saved.referrer;
        }
        sessionStorage.setItem('rmc_analytics', JSON.stringify({ day, visitor, source, referrer }));
      } catch { /* Page views still work when browser storage is unavailable. */ }
      const device = /iPad|Tablet|Android(?!.*Mobile)/i.test(navigator.userAgent) ? 'Tablet'
        : /Mobile|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
      void fetch('/api/analytics', {
        method: 'POST', headers: { 'content-type': 'application/json' }, credentials: 'omit',
        body: JSON.stringify({ id: crypto.randomUUID(), visitor, path: pathname, source, referrer, device }),
        keepalive: true,
      }).catch(() => {});
    };
    record();
    document.addEventListener('visibilitychange', record);
    return () => document.removeEventListener('visibilitychange', record);
  }, [pathname]);
  return null;
}
