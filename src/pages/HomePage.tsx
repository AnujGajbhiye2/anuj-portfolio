import { useNavigate } from 'react-router-dom';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { AsciiArt } from '../components/ascii/AsciiArt';
import { cn } from '../lib/cn';

const NAV_ITEMS = [
  { label: 'projects', path: '/projects', key: 'p' },
  { label: 'about',    path: '/about',    key: 'a' },
  { label: 'blog',     path: '/blog',     key: 'b' },
  { label: 'contact',  path: '/contact',  key: 'c' },
] as const;

type NavItem = typeof NAV_ITEMS[number];


export default function HomePage() {
  const navigate = useNavigate();

  const { displayedText, isTyping } = useTypingEffect({
    text: 'frontend engineer. terminal enthusiast. dublin.',
    delay: 400,
    speed: 50,
  });

  const { selectedIndex } = useKeyboardNav({
    itemCount: NAV_ITEMS.length,
    onSelect: (index) => navigate(NAV_ITEMS[index]?.path ?? '/'),
  });

  return (
    <div className="flex gap-6 items-start">

      {/* Left: ASCII portrait
          Natural size at text-[3.5px]: ~630px wide, ~590px tall
          scale-[0.32] brings it to ~200px × ~190px
          absolute + overflow-hidden keeps it out of flex layout */}
      <div className="hidden lg:block shrink-0 relative w-[220px] h-[209px] overflow-hidden mt-10">
        <AsciiArt className="absolute top-0 left-0 origin-top-left scale-[0.22] text-primary-400/70" />
      </div>

      {/* Right: name + content */}
      <div className="flex-1 min-w-0 space-y-8">

        <pre className="font-mono text-sm leading-tight text-primary-400 select-none">{`  __ _ _ __  _   _    _
 / _\` | '_ \\| | | |  (_)
| (_| | | | | |_| |  | |
 \\__,_|_| |_|\\__,_| _/ |
                   |__/`}</pre>

        <p className="text-lg text-text-secondary font-mono">
          {displayedText}
          {isTyping && <span className="animate-pulse text-primary-400">|</span>}
        </p>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item: NavItem, index) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 font-mono text-sm text-left w-fit',
                'transition-colors',
                index === selectedIndex
                  ? 'text-primary-400 bg-primary-400/10'
                  : 'text-text-muted hover:text-text-primary',
              )}
            >
              <span className="text-text-dim">+</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

      </div>

    </div>
  );
}
