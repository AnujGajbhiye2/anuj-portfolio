import { Kbd } from '../components/ui/Kbd';

export default function TestKbd() {
  return (
    <div className="space-y-4">
      {/* Single keys */}
      <div className="flex items-center gap-4 text-text-muted">
        <span><Kbd>↑</Kbd><Kbd>↓</Kbd> navigate</span>
        <span><Kbd>enter</Kbd> select</span>
        <span><Kbd>esc</Kbd> back</span>
      </div>
      
      {/* Key combinations */}
      <div className="flex items-center gap-2 text-text-muted">
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
        <span className="ml-2">Open command palette</span>
      </div>
      
      {/* Sizes */}
      <div className="flex items-center gap-4">
        <span><Kbd size="sm">sm</Kbd> Small</span>
        <span><Kbd size="md">md</Kbd> Medium</span>
      </div>
    </div>
  );
}