const LOCALE = 'en-IE';

function parseDate(iso: string | null | undefined): Date | null {
  if (!iso || !iso.trim()) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Long date (e.g. "14 April 2026"). Returns 'date unavailable' when invalid. */
export function formatDate(iso: string | null | undefined): string {
  const date = parseDate(iso);
  if (!date) return 'date unavailable';
  return date.toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Short date (e.g. "14 Apr 2026"). For admin list views. */
export function formatDateShort(iso: string | null | undefined): string {
  const date = parseDate(iso);
  if (!date) return 'date unavailable';
  return date.toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Short date + time (e.g. "14 Apr, 10:30"). For analytics views. */
export function formatDateTime(iso: string | null | undefined): string {
  const date = parseDate(iso);
  if (!date) return 'date unavailable';
  return date.toLocaleString(LOCALE, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
