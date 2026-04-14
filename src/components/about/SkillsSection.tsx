import { cn } from '../../lib/cn';
import type { Skill, SkillCategory } from '../../types';
import {
  IconSkillFramework,
  IconSkillLanguage,
  IconSkillPlatform,
  IconSkillTool,
} from '../shared/icons';

// TS note: Object.groupBy is available in ES2024+ / modern browsers.
// It returns Record<string, Skill[] | undefined> — the | undefined is because
// TypeScript can't know at compile time which keys will actually appear.

const categoryOrder: SkillCategory[] = ['language', 'framework', 'tool', 'platform'];

const categoryLabel: Record<SkillCategory, string> = {
  language:  'languages',
  framework: 'frameworks & libraries',
  tool:      'tools',
  platform:  'platforms & runtimes',
};

const categoryIcon = {
  language: IconSkillLanguage,
  framework: IconSkillFramework,
  tool: IconSkillTool,
  platform: IconSkillPlatform,
} as const;

// Renders [████░░░░░░] — filled blocks up to proficiency, empty after
function AsciiBar({ value, max = 5 }: { value: number; max?: number }) {
  const percent = Math.round((value / max) * 100);
  const filled = '█'.repeat(value);
  const empty  = '░'.repeat(max - value);
  return (
    <div className="flex items-center gap-3">
      <span
        className="font-mono text-xs"
        aria-label={`${value} of ${max} (${percent}%)`}
        title={`${percent}% proficiency`}
      >
        <span className="text-primary-400">{filled}</span>
        <span className="text-surface">{empty}</span>
      </span>
      <span className="min-w-[3ch] text-right font-mono text-xs text-text-dim">
        {percent}%
      </span>
    </div>
  );
}

interface SkillsSectionProps {
  skills: Skill[];
  className?: string | undefined;
}

export function SkillsSection({ skills, className }: SkillsSectionProps) {
  // Group skills by category using reduce — same idea as Object.groupBy but
  // compatible with our tsconfig target without needing lib: "ES2024"
  const grouped = skills.reduce<Partial<Record<SkillCategory, Skill[]>>>((acc, skill) => {
    const bucket = acc[skill.category] ?? [];
    return { ...acc, [skill.category]: [...bucket, skill] };
  }, {});

  return (
    <div className={cn('space-y-6', className)}>
      {categoryOrder.map((cat) => {
        const catSkills = grouped[cat];
        if (!catSkills || catSkills.length === 0) return null;

        return (
          <div key={cat}>
            <p className="mb-3 inline-flex items-center gap-2 text-text-dim text-xs font-mono">
              {(() => {
                const Icon = categoryIcon[cat];
                return <Icon className="h-3.5 w-3.5 text-primary-400" />;
              })()}
              <span>$ ls ./{categoryLabel[cat]}</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {catSkills.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between gap-4">
                  <span className="font-mono text-sm text-text-secondary truncate">
                    {skill.name}
                  </span>
                  <AsciiBar value={skill.proficiency} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
