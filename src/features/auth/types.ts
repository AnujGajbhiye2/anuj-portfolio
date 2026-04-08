export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;
  email: string;
  role: "admin";
  displayName: string;
}

export interface AuthSession {
  user: AuthUser;
}

export interface AuthCredentials {
  email?: string;
  password?: string;
}

export interface AuthAdapter {
  getSession: () => Promise<AuthSession | null>;
  signIn: (credentials?: AuthCredentials) => Promise<AuthSession>;
  signOut: () => Promise<void>;
}

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  signIn: (credentials?: AuthCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}
