import React from 'react'
import { cn } from '../../lib/cn';
import { useLocation } from 'react-router-dom';

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
    <header className="flex items-center gap-3 px-4 py-2 border-b border-surface bg-background-secondary">
      {/* Traffic Lights */}
      <div className="flex items-center gap-2" aria-hidden="true">
        <TrafficLightDot color="red" />
        <TrafficLightDot color="yellow" />
        <TrafficLightDot color="green" />
      </div>

      {/* Title (centered) */}
      <div className="flex-1 text-center">
        <span className="text-text-dim text-sm">
          anuj — {pageName} — 120×41
        </span>
      </div>

      {/* Spacer to balance the layout */}
      <div className="w-[52px]" />
    </header>
  )
}

export default Header
