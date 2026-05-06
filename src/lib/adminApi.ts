import { apiFetch, ApiError, type BlogPost, type BlogListItem } from './api';

// ─── Blog (admin) ──────────────────────────────────────────────────────────

export interface AdminBlogListItem extends Omit<BlogListItem, 'published_at' | 'published'> {
  published: number;   // 0 | 1
  published_at: string | null;
  updated_at: string;
}

export interface CreateBlogPayload {
  slug: string;
  title: string;
  summary?: string | undefined;
  content: string;
  tags?: string[] | undefined;
  reading_time?: number | undefined;
  published?: boolean | undefined;
  cover_image_url?: string | undefined;
}

export interface UpdateBlogPayload {
  title?: string | undefined;
  summary?: string | undefined;
  content?: string | undefined;
  tags?: string[] | undefined;
  reading_time?: number | undefined;
  published?: boolean | undefined;
  cover_image_url?: string | undefined;
}

export const getAdminBlogs = (): Promise<{ posts: AdminBlogListItem[]; total: number }> =>
  apiFetch('/api/blogs/admin/all');

export const getAdminBlog = (id: number): Promise<{ post: BlogPost }> =>
  apiFetch(`/api/blogs/admin/${id}`);

export const createBlog = (data: CreateBlogPayload): Promise<{ post: BlogPost }> =>
  apiFetch('/api/blogs', { method: 'POST', body: JSON.stringify(data) });

export const updateBlog = (id: number, data: UpdateBlogPayload): Promise<{ post: BlogPost }> =>
  apiFetch(`/api/blogs/${id}`, { method: 'PATCH', body: JSON.stringify(data) });

export const deleteBlog = (id: number): Promise<void> =>
  apiFetch(`/api/blogs/${id}`, { method: 'DELETE' });

export interface UploadImageResult {
  url: string;
  publicId: string;
}

export async function uploadImage(file: File): Promise<UploadImageResult> {
  const BASE_URL = import.meta.env.VITE_API_URL as string;
  const form = new FormData();
  form.append('image', file);

  const res = await fetch(`${BASE_URL}/api/blogs/admin/upload-image`, {
    method: 'POST',
    credentials: 'include',
    body: form,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: string };
    throw new ApiError(res.status, body.error ?? `Upload failed: ${res.status}`);
  }

  return res.json() as Promise<UploadImageResult>;
}

// ─── Contacts ──────────────────────────────────────────────────────────────

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export const getContacts = (
  limit = 50,
  offset = 0,
): Promise<{ submissions: ContactSubmission[]; total: number }> =>
  apiFetch(`/api/contact?limit=${limit}&offset=${offset}`);

// ─── Analytics ─────────────────────────────────────────────────────────────

export interface AnalyticsSummary {
  totalViews: number;
  viewsLast7Days: number;
  topPages: { path: string; count: number }[];
}

export interface RecentView {
  id: number;
  path: string;
  title: string | null;
  created_at: string;
}

export const getAnalyticsSummary = (): Promise<AnalyticsSummary> =>
  apiFetch('/api/analytics/summary');

export const getRecentViews = (limit = 20): Promise<{ views: RecentView[] }> =>
  apiFetch(`/api/analytics/recent?limit=${limit}`);
