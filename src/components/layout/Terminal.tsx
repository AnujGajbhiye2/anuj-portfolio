import { useEffect } from "react";
import ConnectionLine from "./ConnectionLine";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "../../lib/cn";

const GLOBAL_SHORTCUTS: Record<string, string> = {
  h: '/',
  p: '/projects',
  a: '/about',
  b: '/blog',
  c: '/contact',
};

const ScanlineOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(0, 0, 0, 0.3) 1px,
        rgba(0, 0, 0, 0.3) 2px
      )`,
      opacity: 0.03,
    }} aria-hidden="true" />
  );
};

const Terminal = ({ className }: { className?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const showConnectionLine = location.pathname === '/';

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      if (e.key === 'Escape') {
        navigate(-1);
        return;
      }

      const path = GLOBAL_SHORTCUTS[e.key];
      if (path && path !== location.pathname) navigate(path);
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, location.pathname]);

  return (
    <div className={cn(
      'min-h-screen',
      'bg-background-primary',
      'font-mono text-text-secondary',
      'flex flex-col',
      className
    )}>
      <ScanlineOverlay />
      <Header />
      <div className="terminal-body">
        {showConnectionLine && <ConnectionLine />}
        <main className={cn("terminal-main", "flex-1 py-4 lg:py-8")}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Terminal;
