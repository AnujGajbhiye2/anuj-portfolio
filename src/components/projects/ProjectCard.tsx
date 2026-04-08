import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import type { Project, ProjectStatus } from '../../types';

// TS note: Record<K, V> maps every key in K to a value of type V.
// Here it guarantees every ProjectStatus has a display label — if you add
// a new status to the union, TypeScript will error until you add it here too.
const statusLabel: Record<ProjectStatus, string> = {
  'completed':   '● done',
  'in-progress': '◐ active',
  'planned':     '○ planned',
};

const statusColor: Record<ProjectStatus, string> = {
  'completed':   'text-primary-400',
  'in-progress': 'text-yellow-400',
  'planned':     'text-text-dim',
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card variant="interactive" className="flex flex-col h-full">
      <CardHeader className="flex items-start justify-between gap-2">
        <h3 className="font-mono font-semibold text-text-primary text-sm leading-snug">
          {project.title}
        </h3>
        <span className={cn('text-xs font-mono shrink-0', statusColor[project.status])}>
          {statusLabel[project.status]}
        </span>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-text-muted text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tags — each rendered as a Badge */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="subtle" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {/* Only render footer when at least one link exists */}
      {(project.githubUrl ?? project.liveUrl) && (
        <CardFooter className="gap-2">
          {project.githubUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(project.githubUrl, '_blank', 'noopener')}
            >
              ~/github
            </Button>
          )}
          {project.liveUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project.liveUrl, '_blank', 'noopener')}
            >
              ~/live
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
