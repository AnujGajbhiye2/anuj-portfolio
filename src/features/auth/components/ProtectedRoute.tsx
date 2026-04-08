import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="space-y-2 border-l-2 border-primary-400 pl-4">
        <p className="text-xs font-mono text-text-dim">$ auth status</p>
        <p className="text-sm text-primary-400">resolving session...</p>
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
