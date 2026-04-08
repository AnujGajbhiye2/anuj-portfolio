import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { ThemeSwitcher } from '../../features/theme/components/ThemeSwitcher';
import {
  IconAbout,
  IconBlog,
  IconCommand,
  IconContact,
  IconHome,
  IconLab,
  IconProjects,
} from '../shared/icons';

const HEADER_ROUTES = [
  { label: 'home', to: '/', icon: IconHome },
  { label: 'projects', to: '/projects', icon: IconProjects },
  { label: 'about', to: '/about', icon: IconAbout },
  { label: 'blog', to: '/blog', icon: IconBlog },
  { label: 'contact', to: '/contact', icon: IconContact },
  { label: 'lab', to: '/lab', icon: IconLab },
] as const;

// Traffic light dot component
function TrafficLightDot({ color }: { color: 'red' | 'yellow' | 'green' }) {
  const colors = {
    red: 'bg-red-500/80 hover:bg-red-500',
    yellow: 'bg-yellow-500/80 hover:bg-yellow-500', 
    green: 'bg-green-500/80 hover:bg-green-500',
  };

  return (
    <div
      className={cn(
        'w-3 h-3 rounded-full',
        'transition-colors duration-150',
        'opacity-80 hover:opacity-100',
        colors[color]
      )}
    />
  );
}

const Header = () => {
  const location = useLocation();
  const pageName = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];

  return (
    <header className="border-b border-surface bg-background-secondary">
      <div className="flex flex-col gap-3 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <TrafficLightDot color="red" />
            <TrafficLightDot color="yellow" />
            <TrafficLightDot color="green" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="truncate text-text-dim text-sm">
              anuj — {pageName} — 120×41
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-text-dim">
            <IconCommand className="h-3.5 w-3.5 text-primary-400" />
            <span>visible routes + keyboard shortcuts</span>
          </div>

          <ThemeSwitcher className="ml-auto" />
        </div>

        <nav className="flex flex-wrap items-center gap-2 border-t border-surface/70 pt-3" aria-label="Primary">
          {HEADER_ROUTES.map((route) => {
            const Icon = route.icon;

            return (
              <NavLink
                key={route.to}
                to={route.to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-mono transition-colors duration-150',
                    isActive
                      ? 'border-primary-400/50 bg-primary-400/10 text-primary-400'
                      : 'border-surface bg-background-primary/60 text-text-muted hover:border-surface-hover hover:text-text-primary'
                  )
                }
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{route.label}</span>
              </NavLink>
            );
          })}

          <div className="ml-auto hidden md:flex items-center gap-2 text-[11px] text-text-dim">
            <IconCommand className="h-3.5 w-3.5 text-primary-400" />
            <span>`h p a b c` still work from anywhere</span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
