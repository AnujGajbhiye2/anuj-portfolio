// Base fetch wrapper — prepends VITE_API_URL and always sends cookies.
// Throws an ApiError on non-2xx responses so callers get structured errors.

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL as string;

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include',   // send the JWT cookie on every request
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: string };
    throw new ApiError(res.status, body.error ?? `Request failed: ${res.status}`);
  }

  // 204 No Content — return undefined cast to T
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ─── Public API helpers ────────────────────────────────────────────────────

export interface BlogListItem {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  tags: string[];
  readingTime: number;
  publishedAt: string | null;
  createdAt: string;
  coverImageUrl?: string | null;
  published?: boolean;
}

export interface BlogPost extends BlogListItem {
  content: string;
  coverImageUrl: string | null;
  published: boolean;
  updatedAt: string;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface PageViewData {
  path: string;
  title?: string;
  referrer?: string;
}

export const getBlogs = (): Promise<{ posts: BlogListItem[]; total: number }> =>
  apiFetch('/api/blogs');

export const getBlogBySlug = (slug: string): Promise<{ post: BlogPost }> =>
  apiFetch(`/api/blogs/${encodeURIComponent(slug)}`);

export const submitContact = (data: ContactData): Promise<{ success: boolean; id: number }> =>
  apiFetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });

// Fire-and-forget — intentionally swallows errors
export function trackPageView(data: PageViewData): void {
  apiFetch('/api/analytics/page-view', {
    method: 'POST',
    body: JSON.stringify(data),
  }).catch(() => {
    // silently ignore — analytics must never break the UI
  });
}
