import { useReducer } from 'react';
import PageHeader from '../components/shared/PageHeader';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/cn';
import { projects } from '../data/projects';
import { IconExperience, IconProjects, IconTag } from '../components/shared/icons';
import {
  initialState,
  projectsReducer,
  getFilteredProjects,
  getUniqueTags,
} from '../features/projects/projectsReducer';

// TS note: useReducer<State, Action> takes a reducer function + initial state
// and returns [currentState, dispatch]. dispatch sends an action to the reducer
// which returns the next state — same pattern as Redux, but local to this component.
const allTags = getUniqueTags(projects);

export default function ProjectsPage() {
  const [state, dispatch] = useReducer(projectsReducer, initialState);
  const filtered = getFilteredProjects(projects, state);
  const hasFilters = state.selectedTags.length > 0;

  return (
    <div className="space-y-8">
      <PageHeader title="projects" />

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
            <IconProjects className="h-3.5 w-3.5 text-primary-400" />
            <span>project set</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            A mix of shipped personal work and representative product engineering experience.
          </p>
        </div>

        <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
            <IconExperience className="h-3.5 w-3.5 text-primary-400" />
            <span>selection logic</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Prioritizes frontend architecture, user-facing product quality, and scale-relevant work over quantity.
          </p>
        </div>

        <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
            <IconTag className="h-3.5 w-3.5 text-primary-400" />
            <span>tag filters</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Filter by stack to inspect React, TypeScript, data-heavy UI work, and design-system adjacent experience.
          </p>
        </div>
      </section>

      {/* Tag filter bar */}
      <div className="space-y-3">
        <p className="inline-flex items-center gap-2 text-text-dim text-xs font-mono">
          <IconTag className="h-3.5 w-3.5 text-primary-400" />
          <span>$ filter --tags</span>
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          {allTags.map((tag) => {
            const isActive = state.selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => dispatch({ type: 'TOGGLE_TAG', payload: tag })}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
                aria-pressed={isActive}
              >
                <Badge
                  variant={isActive ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer transition-colors duration-150',
                    isActive && 'ring-1 ring-primary-400/40',
                  )}
                >
                  {tag}
                </Badge>
              </button>
            );
          })}
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
              className="text-xs"
            >
              × clear
            </Button>
          )}
        </div>

        {/* Count */}
        <p className="text-text-dim text-xs font-mono">
          {filtered.length === projects.length
            ? `${projects.length} projects`
            : `${filtered.length} of ${projects.length} projects`}
        </p>
      </div>

      {/* Project grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-2">
          <p className="text-text-muted font-mono text-sm">no projects match those filters</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
          >
            clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
