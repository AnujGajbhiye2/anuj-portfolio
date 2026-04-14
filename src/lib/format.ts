const LOCALE = 'en-IE';

/** Long date (e.g. "14 April 2026"). Returns 'draft' when iso is null. */
export function formatDate(iso: string | null): string {
  if (!iso) return 'draft';
  return new Date(iso).toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Short date (e.g. "14 Apr 2026"). For admin list views. */
export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Short date + time (e.g. "14 Apr, 10:30"). For analytics views. */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(LOCALE, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
