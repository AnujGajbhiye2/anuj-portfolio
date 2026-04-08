import { cn } from "../../lib/cn";
import Kbd from "../ui/Kbd";

type KeyboardHint = {
  keys: string;
  label: string;
};

const DEFAULT_HINTS: KeyboardHint[] = [
  { keys: '↑↓', label: 'Navigate' },
  { keys: 'Enter', label: 'Select' },
  { keys: 'Esc', label: 'Back' },
];

type KeyboardHintItemProps = {
  hint: KeyboardHint;
};

const KeyboardHintItem = ({ hint }: KeyboardHintItemProps) => {
  const chars = [...hint.keys];
  return (
    <span className="flex items-center gap-1.5 text-xs text-text-dim">
      {chars.map((k, i) => <Kbd key={i}>{k}</Kbd>)}
      <span>{hint.label}</span>
    </span>
  );
};

const Footer = ({ hints = DEFAULT_HINTS, className }: { hints?: KeyboardHint[]; className?: string }) => {
  return (
    <footer className={cn(
      'fixed bottom-0 left-0 right-0',
      'px-6 py-3',
      'border-t border-surface',
      'bg-background-primary/90',
      'backdrop-blur-sm',
      'z-40',
      className
    )}>
      <div className="flex items-center gap-6">
        {hints.map((hint) => (
          <KeyboardHintItem key={hint.keys} hint={hint} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
