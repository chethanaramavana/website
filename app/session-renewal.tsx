'use client';

import { useEffect } from 'react';

export default function SessionRenewal() {
  useEffect(() => {
    let lastAttempt = 0;
    const refresh = () => {
      if (document.visibilityState !== 'visible' || Date.now() - lastAttempt < 60 * 60 * 1000) return;
      lastAttempt = Date.now();
      // No credentials are exposed to client JavaScript or browser storage.
      void fetch('/api/auth/refresh', { method: 'POST', credentials: 'same-origin', cache: 'no-store' }).catch(() => {});
    };
    refresh();
    document.addEventListener('visibilitychange', refresh);
    const interval = window.setInterval(refresh, 60 * 60 * 1000);
    return () => { document.removeEventListener('visibilitychange', refresh); window.clearInterval(interval); };
  }, []);
  return null;
}
