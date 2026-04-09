import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../lib/adminApi';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IE', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

const ContactsTab = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'contacts'],
    queryFn: () => getContacts(),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-text-dim">$ cat inbox.log</p>
        {data && (
          <p className="text-xs font-mono text-text-dim">{data.total} submission{data.total !== 1 ? 's' : ''}</p>
        )}
      </div>

      {isLoading && (
        <p className="text-xs font-mono text-text-dim">loading...</p>
      )}

      {data?.submissions.length === 0 && (
        <p className="text-xs font-mono text-text-dim">&gt; inbox empty</p>
      )}

      <div className="space-y-2">
        {data?.submissions.map((sub) => (
          <div
            key={sub.id}
            className="rounded-sm border border-surface bg-background-secondary/40 overflow-hidden"
          >
            <button
              onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
              className="w-full px-4 py-3 text-left flex items-start justify-between gap-4 hover:bg-background-secondary transition-colors"
            >
              <div className="min-w-0 flex-1 space-y-0.5">
                <p className="text-sm text-text-primary font-medium truncate">{sub.name}</p>
                <p className="text-xs font-mono text-text-dim truncate">{sub.email}</p>
                {expanded !== sub.id && (
                  <p className="text-xs text-text-muted truncate">{sub.message}</p>
                )}
              </div>
              <span className="text-xs font-mono text-text-dim shrink-0">{formatDate(sub.created_at)}</span>
            </button>

            {expanded === sub.id && (
              <div className="px-4 pb-4 border-t border-surface bg-background-tertiary/50">
                <p className="text-sm leading-relaxed text-text-secondary mt-3 whitespace-pre-wrap">
                  {sub.message}
                </p>
                <a
                  href={`mailto:${sub.email}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-primary-400 hover:text-primary-300"
                >
                  reply →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsTab;
