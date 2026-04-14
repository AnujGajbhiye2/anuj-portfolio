import { useEffect, useState, useRef } from 'react';
import { createHighlighter, type Highlighter } from 'shiki';
import { Button } from '../ui/Button';

const SUPPORTED_LANGS = [
  'typescript', 'tsx', 'javascript', 'jsx', 'json',
  'bash', 'shell', 'css', 'html', 'markdown',
  'python', 'go', 'rust', 'sql', 'plaintext',
] as const;

// Normalize fence language aliases to shiki names
const LANG_MAP: Record<string, string> = {
  ts: 'typescript',
  js: 'javascript',
  sh: 'bash',
  zsh: 'bash',
  md: 'markdown',
  py: 'python',
  txt: 'plaintext',
};

// Singleton highlighter promise — created once, shared across all CodeBlocks
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['one-dark-pro'],
      langs: SUPPORTED_LANGS as unknown as string[],
    });
  }
  return highlighterPromise;
}

interface CodeBlockProps {
  className?: string | undefined;
  children?: React.ReactNode;
}

const CodeBlock = ({ className, children }: CodeBlockProps) => {
  const rawLang = className?.replace('language-', '') ?? 'plaintext';
  const lang = LANG_MAP[rawLang] ?? (SUPPORTED_LANGS.includes(rawLang as typeof SUPPORTED_LANGS[number]) ? rawLang : 'plaintext');
  const code = String(children ?? '').replace(/\n$/, '');

  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((hl) => {
      if (cancelled) return;
      const highlighted = hl.codeToHtml(code, {
        lang,
        theme: 'one-dark-pro',
      });
      setHtml(highlighted);
    });
    return () => { cancelled = true; };
  }, [code, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 overflow-hidden rounded-sm border border-surface text-sm">
      {/* Header strip */}
      <div className="flex items-center justify-between bg-background-tertiary px-3 py-1.5">
        <span className="font-mono text-xs text-text-dim">{lang}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-6 px-2 text-xs"
        >
          {copied ? 'copied!' : 'copy'}
        </Button>
      </div>

      {/* Code body */}
      {html ? (
        <div
          className="overflow-x-auto [&>pre]:m-0 [&>pre]:rounded-none [&>pre]:border-0 [&>pre]:bg-background-secondary! [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:leading-6"
          // TS note: dangerouslySetInnerHTML is required here because shiki returns
          // a full <pre><code>…</code></pre> HTML string with inline token spans.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="overflow-x-auto bg-background-secondary p-4 font-mono text-xs leading-6 text-text-secondary">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

export default CodeBlock;
