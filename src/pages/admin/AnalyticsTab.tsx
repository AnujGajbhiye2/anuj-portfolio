import { useQuery } from '@tanstack/react-query';
import { getAnalyticsSummary, getRecentViews } from '../../lib/adminApi';
import { formatDateTime as formatDate } from '../../lib/format';

const AnalyticsTab = () => {
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ['admin', 'analytics', 'summary'],
    queryFn: getAnalyticsSummary,
  });

  const { data: recent, isLoading: loadingRecent } = useQuery({
    queryKey: ['admin', 'analytics', 'recent'],
    queryFn: () => getRecentViews(20),
  });

  return (
    <div className="space-y-6">
      <p className="text-xs font-mono text-text-dim">$ tail -f analytics.log</p>

      {/* Summary cards */}
      {loadingSummary ? (
        <p className="text-xs font-mono text-text-dim">loading...</p>
      ) : summary ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-surface bg-background-secondary p-4">
            <p className="text-xs font-mono text-text-dim">total views</p>
            <p className="mt-2 text-2xl font-semibold text-primary-400">{summary.totalViews}</p>
          </div>
          <div className="rounded-sm border border-surface bg-background-secondary p-4">
            <p className="text-xs font-mono text-text-dim">last 7 days</p>
            <p className="mt-2 text-2xl font-semibold text-primary-400">{summary.viewsLast7Days}</p>
          </div>
          <div className="rounded-sm border border-surface bg-background-secondary p-4">
            <p className="text-xs font-mono text-text-dim">top page</p>
            <p className="mt-2 text-sm font-mono text-primary-400 truncate">
              {summary.topPages[0]?.path ?? '—'}
            </p>
          </div>
        </div>
      ) : null}

      {/* Top pages */}
      {summary?.topPages && summary.topPages.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-mono text-text-dim">top pages</p>
          <div className="rounded-sm border border-surface overflow-hidden">
            {summary.topPages.map((page, i) => (
              <div
                key={page.path}
                className="flex items-center justify-between px-4 py-2.5 text-sm border-b border-surface last:border-b-0 bg-background-secondary/40"
              >
                <span className="font-mono text-text-dim mr-3">{i + 1}</span>
                <span className="flex-1 text-text-secondary truncate">{page.path}</span>
                <span className="font-mono text-primary-400 ml-4">{page.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent views */}
      <div className="space-y-2">
        <p className="text-xs font-mono text-text-dim">recent activity</p>
        {loadingRecent ? (
          <p className="text-xs font-mono text-text-dim">loading...</p>
        ) : (
          <div className="rounded-sm border border-surface overflow-hidden">
            {recent?.views.map((view) => (
              <div
                key={view.id}
                className="flex items-center justify-between gap-4 px-4 py-2 text-xs border-b border-surface last:border-b-0 bg-background-secondary/40"
              >
                <span className="font-mono text-text-secondary truncate">{view.path}</span>
                <span className="font-mono text-text-dim shrink-0">{formatDate(view.created_at)}</span>
              </div>
            ))}
            {recent?.views.length === 0 && (
              <p className="px-4 py-3 text-xs font-mono text-text-dim">no views yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsTab;
