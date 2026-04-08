import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../lib/cn';
import type { Project, ProjectStatus } from '../../types';
import { getTechIcon } from '../shared/tech-icons';
import { IconDemo, IconExternalLink, IconGithub, IconTag } from '../shared/icons';

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

const statusDetail: Record<ProjectStatus, string> = {
  'completed': 'shipped and viewable',
  'in-progress': 'actively evolving',
  'planned': 'not built yet',
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card variant="interactive" className="flex flex-col h-full">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono font-semibold text-text-primary text-sm leading-snug">
            {project.title}
          </h3>
          <span className={cn('text-xs font-mono shrink-0', statusColor[project.status])}>
            {statusLabel[project.status]}
          </span>
        </div>
        <p className="text-xs font-mono text-text-dim">{statusDetail[project.status]}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-text-muted text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tags — each rendered as a Badge */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="subtle" size="sm" className="gap-1.5">
                <IconTag className="h-3 w-3 text-text-dim" />
                {(() => {
                  const Icon = getTechIcon(tag);
                  return Icon ? <Icon className="h-3 w-3 text-primary-400" /> : null;
                })()}
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
              className="gap-2"
              onClick={() => window.open(project.githubUrl, '_blank', 'noopener')}
            >
              <IconGithub className="h-3.5 w-3.5" />
              ~/github
              <IconExternalLink className="h-3.5 w-3.5" />
            </Button>
          )}
          {project.liveUrl && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => window.open(project.liveUrl, '_blank', 'noopener')}
            >
              <IconDemo className="h-3.5 w-3.5" />
              ~/live
              <IconExternalLink className="h-3.5 w-3.5" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
