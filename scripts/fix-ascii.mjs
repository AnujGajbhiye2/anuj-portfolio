import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('D:/jobhunt/anuj-portfolio/src/components/ascii/AsciiArt.tsx', 'utf8');
const lines = content.split('\n');
// lines 5..138 are the raw art (0-indexed, inside the <div>)
const artLines = lines.slice(5, 139);
const art = artLines.join('\n');

// The art only contains . , ' ; : c l o d x k O 0 K X N W and spaces — no backticks or backslashes
// so no escaping needed, just wrap in template literal
const output = `import { cn } from '../../lib/cn';

const PORTRAIT = \`${art}\`;

export function AsciiArt({ className }: { className?: string }) {
  return (
    <pre className={cn('font-mono text-[5.5px] leading-tight select-none', className)}>
      {PORTRAIT}
    </pre>
  );
}

export default AsciiArt;
`;

writeFileSync('D:/jobhunt/anuj-portfolio/src/components/ascii/AsciiArt.tsx', output);
console.log('Done.');
