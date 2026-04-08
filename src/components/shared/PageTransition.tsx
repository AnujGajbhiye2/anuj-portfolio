import { cn } from "../../lib/cn";

const PageTransition = ({ visible, pathname }: { visible: boolean; pathname: string }) => {
  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none sticky top-0 z-30 mx-auto max-w-5xl px-6 lg:px-12 transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="mt-4 rounded-sm border border-primary-400/40 bg-background-secondary/95 px-4 py-2 shadow-[0_0_20px_rgba(34,211,238,0.08)]">
        <p className="text-xs font-mono text-primary-400">
          $ loading {pathname === "/" ? "home" : pathname.replace("/", "")}
          <span className="ml-1 animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
};

export default PageTransition;
