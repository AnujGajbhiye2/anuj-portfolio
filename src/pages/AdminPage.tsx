import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/shared/PageHeader";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/cn";
import useAuth from "../features/auth/hooks/useAuth";
import BlogsTab from "./admin/BlogsTab";
import ContactsTab from "./admin/ContactsTab";
import AnalyticsTab from "./admin/AnalyticsTab";

type Tab = "blogs" | "contacts" | "analytics";

const TABS: { id: Tab; label: string }[] = [
  { id: "blogs", label: "blogs" },
  { id: "contacts", label: "contacts" },
  { id: "analytics", label: "analytics" },
];

const AdminPage = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("blogs");

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="admin" />
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          sign out
        </Button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 border-b border-surface">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 text-xs font-mono transition-colors",
              "border-b-2 -mb-px",
              activeTab === tab.id
                ? "border-primary-400 text-primary-400"
                : "border-transparent text-text-dim hover:text-text-secondary",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "blogs" && <BlogsTab />}
        {activeTab === "contacts" && <ContactsTab />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
