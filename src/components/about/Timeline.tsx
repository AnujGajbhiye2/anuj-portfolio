import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { TimelineEventType } from '../../types';

// TS note: This is the compound component pattern — Timeline is the container,
// TimelineItem is the building block. Consumers compose them like:
//   <Timeline>
//     <TimelineItem year="2023" title="..." type="work">...</TimelineItem>
//   </Timeline>
// The parent controls layout; the child controls its own content.

// Color per event type — Record ensures all branches are handled
const typeStyles: Record<TimelineEventType, { dot: string; label: string; text: string }> = {
  work:      { dot: 'bg-primary-400',   label: 'work',      text: 'text-primary-400' },
  education: { dot: 'bg-primary-300',   label: 'education', text: 'text-primary-300' },
  project:   { dot: 'bg-yellow-400/80', label: 'project',   text: 'text-yellow-400' },
};

// =============================================================================
// TIMELINE (container)
// =============================================================================

interface TimelineProps {
  children: ReactNode;
  className?: string | undefined;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <ol className={cn('relative space-y-0', className)}>
      {children}
    </ol>
  );
}

// =============================================================================
// TIMELINE ITEM
// =============================================================================

interface TimelineItemProps {
  year: string;
  title: string;
  company?: string | undefined;
  type: TimelineEventType;
  children: ReactNode;
  isLast?: boolean | undefined;
}

export function TimelineItem({
  year,
  title,
  company,
  type,
  children,
  isLast = false,
}: TimelineItemProps) {
  const style = typeStyles[type];

  return (
    <li className="relative flex gap-6 pb-8">
      {/* Vertical connector line — hidden on the last item */}
      {!isLast && (
        <div className="absolute left-[7px] top-4 bottom-0 w-px bg-surface" aria-hidden="true" />
      )}

      {/* Dot */}
      <div className="relative mt-1 shrink-0">
        <div className={cn('w-3.5 h-3.5 rounded-full border-2 border-background-primary', style.dot)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
          <span className="font-mono text-xs text-text-dim">{year}</span>
          <span className={cn('font-mono text-xs', style.text)}>[{style.label}]</span>
        </div>
        <h3 className="font-mono font-semibold text-sm text-text-primary leading-snug">
          {title}
        </h3>
        {company && (
          <p className="font-mono text-xs text-text-muted">{company}</p>
        )}
        <div className="font-mono text-sm text-text-muted leading-relaxed pt-0.5">
          {children}
        </div>
      </div>
    </li>
  );
}
