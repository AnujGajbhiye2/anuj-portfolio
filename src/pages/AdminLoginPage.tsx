import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import useAuth from "../features/auth/hooks/useAuth";

const AdminLoginPage = () => {
  const { signIn, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const fromPath = (location.state as { from?: string } | null)?.from ?? "/admin";

  const handleLogin = async () => {
    setError(undefined);
    try {
      await signIn({ password });
      navigate(fromPath, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="max-w-lg space-y-8">
      <PageHeader title="admin/login" />

      <Card>
        <CardHeader className="space-y-2">
          <p className="text-xs font-mono text-text-dim">$ sudo auth --scope admin</p>
          <h2 className="text-lg font-semibold text-primary-400">Admin access</h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="block font-mono text-xs text-text-secondary">
              password
            </label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="enter password"
              autoFocus
            />
          </div>

          {error && (
            <p className="font-mono text-xs text-red-400">
              &gt; error: {error}
            </p>
          )}
        </CardContent>

        <CardFooter className="justify-between gap-3">
          <p className="text-xs text-text-dim font-mono">status: {status}</p>
          <Button
            size="sm"
            onClick={handleLogin}
            disabled={status === "loading" || !password}
          >
            {status === "loading" ? "authenticating..." : "login →"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
