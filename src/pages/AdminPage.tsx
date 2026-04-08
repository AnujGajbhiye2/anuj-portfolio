import { useNavigate } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import useAuth from "../features/auth/hooks/useAuth";

const AdminPage = () => {
  const { user, signOut, status } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="space-y-8">
      <PageHeader title="admin" />

      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-mono text-text-dim">$ admin status</p>
            <h2 className="text-xl font-semibold text-primary-400">Protected admin shell</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            sign out
          </Button>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <p className="text-text-secondary">
            This route is now protected behind a provider-agnostic auth boundary. A future adapter can wire
            real sessions into the same interface without changing page logic.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-sm border border-surface bg-background-tertiary p-4">
              <p className="text-xs font-mono text-text-dim">session.user</p>
              <p className="mt-2 text-primary-400">{user?.displayName ?? "unknown"}</p>
              <p className="text-text-muted">{user?.email ?? "unknown"}</p>
            </div>

            <div className="rounded-sm border border-surface bg-background-tertiary p-4">
              <p className="text-xs font-mono text-text-dim">auth.state</p>
              <p className="mt-2 text-primary-400">{status}</p>
              <p className="text-text-muted">role: {user?.role ?? "none"}</p>
            </div>
          </div>

          <div className="rounded-sm border border-primary-400/30 bg-primary-400/5 p-4">
            <p className="text-xs font-mono text-text-dim">next integration targets</p>
            <p className="mt-2 text-text-secondary">
              Provider adapter, persistent session bootstrap, admin content actions, and protected editor
              routes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
