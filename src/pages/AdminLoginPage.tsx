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
  const [email, setEmail] = useState("admin@example.com");

  const fromPath = (location.state as { from?: string } | null)?.from ?? "/admin";

  const handleEnterShell = async () => {
    await signIn({ email });
    navigate(fromPath, { replace: true });
  };

  return (
    <div className="max-w-lg space-y-8">
      <PageHeader title="admin/login" />

      <Card>
        <CardHeader className="space-y-2">
          <p className="text-xs font-mono text-text-dim">$ auth connect --provider pending</p>
          <h2 className="text-lg font-semibold text-primary-400">Admin shell access</h2>
          <p className="text-sm text-text-muted">
            This screen is a provider-agnostic placeholder. The route protection and auth contract are in
            place, but the real backend integration is intentionally deferred.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="block font-mono text-xs text-text-secondary">
              admin email
            </label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div className="rounded-sm border border-surface bg-background-tertiary px-3 py-3 text-sm text-text-muted">
            Next backend step: swap the mock adapter for a real auth provider without changing route guards
            or page-level auth calls.
          </div>
        </CardContent>

        <CardFooter className="justify-between gap-3">
          <p className="text-xs text-text-dim font-mono">status: {status}</p>
          <Button size="sm" onClick={handleEnterShell} disabled={status === "loading"}>
            {status === "loading" ? "connecting..." : "enter admin shell →"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
