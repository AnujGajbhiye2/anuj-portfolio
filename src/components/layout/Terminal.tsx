import { useEffect, useRef, useState } from "react";
import ConnectionLine from "./ConnectionLine";
import { Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer, { type KeyboardHint } from "./Footer";
import { cn } from "../../lib/cn";
import PageTransition from "../shared/PageTransition";
import { trackPageView } from "../../lib/api";

const GLOBAL_SHORTCUTS: Record<string, string> = {
  h: '/',
  p: '/projects',
  a: '/about',
  b: '/blog',
  c: '/contact',
  l: '/lab',
};

const ROUTE_HINTS: Record<string, KeyboardHint[]> = {
  '/': [
    { keys: ['↑', '↓'], label: 'Navigate' },
    { keys: ['Enter'], label: 'Select' },
    { keys: ['h', 'p', 'a', 'b', 'c', 'l'], label: 'Jump' },
  ],
  '/projects': [
    { keys: ['Esc'], label: 'Back' },
    { keys: ['h'], label: 'Home' },
    { keys: ['Click'], label: 'Tags filter' },
  ],
  '/about': [
    { keys: ['Esc'], label: 'Back' },
    { keys: ['h'], label: 'Home' },
    { keys: ['Scroll'], label: 'Explore' },
  ],
  '/contact': [
    { keys: ['Esc'], label: 'Back' },
    { keys: ['Tab'], label: 'Next field' },
    { keys: ['Enter'], label: 'Submit' },
  ],
  '/blog': [
    { keys: ['Esc'], label: 'Back' },
    { keys: ['↑', '↓'], label: 'Browse posts' },
    { keys: ['Enter'], label: 'Open' },
  ],
  '/lab': [
    { keys: ['Esc'], label: 'Back' },
    { keys: ['Scroll'], label: 'Explore' },
    { keys: ['h'], label: 'Home' },
  ],
  '/admin': [
    { keys: ['Esc'], label: 'Back' },
    { keys: ['Sign out'], label: 'Exit shell' },
  ],
  '/admin/login': [
    { keys: ['Tab'], label: 'Move focus' },
    { keys: ['Enter'], label: 'Enter shell' },
  ],
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
  const navigation = useNavigation();
  const previousPathRef = useRef(location.pathname);
  const [showTransition, setShowTransition] = useState(false);

  const showConnectionLine = location.pathname === '/';
  const footerHints = ROUTE_HINTS[location.pathname] ?? (location.pathname.startsWith('/blog/')
    ? [
        { keys: ['Esc'], label: 'Back' },
        { keys: ['b'], label: 'Blog index' },
        { keys: ['h'], label: 'Home' },
      ]
    : undefined);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      if (e.key === 'Escape') {
        navigate(-1);
        return;
      }

      if (!import.meta.env.DEV) {
        const path = GLOBAL_SHORTCUTS[e.key];
        if (path && path !== location.pathname) navigate(path);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (previousPathRef.current === location.pathname) return;

    previousPathRef.current = location.pathname;
    const frameId = window.requestAnimationFrame(() => setShowTransition(true));
    const timeoutId = window.setTimeout(() => setShowTransition(false), 260);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  // Fire-and-forget analytics on every navigation
  useEffect(() => {
    trackPageView({ path: location.pathname, title: document.title });
  }, [location.pathname]);

  const isTransitioning = navigation.state !== 'idle' || showTransition;

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
        <PageTransition visible={isTransitioning} pathname={location.pathname} />
        <main className={cn("terminal-main", "flex-1 py-4 pb-8 md:pb-24 lg:py-8 lg:pb-20")}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer hints={footerHints} className="hidden md:block" />
    </div>
  );
};

export default Terminal;
