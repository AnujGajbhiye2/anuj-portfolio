import { useEffect, useState, type ReactNode } from "react";
import type { AuthAdapter, AuthContextValue, AuthSession, AuthCredentials } from "../types";
import { AuthContext } from "./auth-context";

const mockAdapter: AuthAdapter = {
  async getSession() {
    return null;
  },
  async signIn(credentials) {
    await new Promise((resolve) => window.setTimeout(resolve, 400));

    return {
      user: {
        id: "admin-shell",
        email: credentials?.email ?? "admin@example.com",
        role: "admin",
        displayName: "Admin Shell",
      },
    };
  },
  async signOut() {
    await new Promise((resolve) => window.setTimeout(resolve, 200));
  },
};

const AuthProvider = ({
  children,
  adapter = mockAdapter,
}: {
  children: ReactNode;
  adapter?: AuthAdapter;
}) => {
  const [status, setStatus] = useState<AuthContextValue["status"]>("loading");
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        const nextSession = await adapter.getSession();
        if (!mounted) return;

        setSession(nextSession);
        setStatus(nextSession ? "authenticated" : "unauthenticated");
      } catch {
        if (!mounted) return;
        setSession(null);
        setStatus("unauthenticated");
      }
    };

    bootstrap();

    return () => {
      mounted = false;
    };
  }, [adapter]);

  const value: AuthContextValue = {
    status,
    user: session?.user ?? null,
    signIn: async (credentials?: AuthCredentials) => {
      setStatus("loading");
      const nextSession = await adapter.signIn(credentials);
      setSession(nextSession);
      setStatus("authenticated");
    },
    signOut: async () => {
      setStatus("loading");
      await adapter.signOut();
      setSession(null);
      setStatus("unauthenticated");
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
