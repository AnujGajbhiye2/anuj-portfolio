import { apiFetch, ApiError } from '../../../lib/api';
import type { AuthAdapter, AuthSession } from '../types';

// Maps the backend { user: { role: 'admin' } } shape to the frontend AuthSession shape
function toSession(): AuthSession {
  return {
    user: {
      id: 'admin',
      email: 'admin',
      role: 'admin',
      displayName: 'Admin',
    },
  };
}

export const backendAdapter: AuthAdapter = {
  async getSession(): Promise<AuthSession | null> {
    try {
      await apiFetch<{ user: { role: string } }>('/api/auth/me');
      return toSession();
    } catch (err) {
      // 401 = no valid cookie — not an error, just unauthenticated
      if (err instanceof ApiError && err.status === 401) return null;
      throw err;
    }
  },

  async signIn(credentials): Promise<AuthSession> {
    await apiFetch<{ user: { role: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password: credentials?.password ?? '' }),
    });
    return toSession();
  },

  async signOut(): Promise<void> {
    await apiFetch('/api/auth/logout', { method: 'POST' });
  },
};
