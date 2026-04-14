import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import CodeBlock from './CodeBlock';

// TS note: Components is react-markdown's type for the `components` prop map.
// Each key is an HTML element name; the value is a React component that receives
// that element's props (plus `node` from the remark AST).
const components: Components = {
  h1: ({ children }) => (
    <h1 className="mt-8 mb-3 font-mono text-2xl font-semibold text-primary-400">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-7 mb-3 font-mono text-xl font-semibold text-primary-400">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 font-mono text-lg font-semibold text-text-primary">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-5 mb-2 font-mono text-base font-semibold text-text-primary">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-7 text-text-secondary">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-400 underline underline-offset-2 hover:text-primary-300"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc space-y-1 pl-5 text-sm text-text-secondary marker:text-primary-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-1 pl-5 text-sm text-text-secondary marker:text-primary-400">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-primary-400 pl-4 text-sm text-text-muted italic">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        className="w-full rounded-sm border border-surface"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-xs text-text-dim">{alt}</figcaption>
      )}
    </figure>
  ),
  hr: () => <hr className="my-8 border-surface" />,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm text-text-secondary">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="border-b border-surface">{children}</thead>,
  th: ({ children }) => (
    <th className="py-2 pr-4 text-left font-mono text-xs font-semibold text-primary-400">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-surface/50 py-2 pr-4 text-xs">{children}</td>
  ),
  // Inline code
  // TS note: react-markdown passes `inline` to distinguish `code` vs fenced `pre > code`.
  // We use the absence of a parent `pre` (checked via className) to determine inline vs block.
  code: ({ className, children, ...props }) => {
    const isBlock = /language-/.test(className ?? '');
    if (isBlock) {
      return <CodeBlock className={className ?? undefined}>{children}</CodeBlock>;
    }
    return (
      <code
        {...props}
        className="rounded bg-background-tertiary px-1.5 py-0.5 font-mono text-[0.85em] text-primary-400"
      >
        {children}
      </code>
    );
  },
  // Suppress the default <pre> wrapper — CodeBlock renders its own <pre>
  pre: ({ children }) => <>{children}</>,
};

interface ArticleBodyProps {
  content: string;
}

const ArticleBody = ({ content }: ArticleBodyProps) => (
  <div className="space-y-4">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  </div>
);

export default ArticleBody;
