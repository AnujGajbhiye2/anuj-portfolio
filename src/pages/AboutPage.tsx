import PageHeader from '../components/shared/PageHeader';
import { Timeline, TimelineItem } from '../components/about/Timeline';
import { SkillsSection } from '../components/about/SkillsSection';
import { bio, impactHighlights, profileFacts, timeline, skills } from '../data/about';
import {
  IconAuthorization,
  IconEducation,
  IconExperience,
  IconLocation,
  IconReact,
} from '../components/shared/icons';

const factIcons = {
  location: IconLocation,
  experience: IconExperience,
  authorization: IconAuthorization,
  education: IconEducation,
} as const;

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-5xl">
      <PageHeader title="about" />

      <section className="space-y-4">
        <p className="text-text-dim text-xs font-mono">$ stat profile --summary</p>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {profileFacts.map((fact) => {
            const Icon = factIcons[fact.id as keyof typeof factIcons];

            return (
              <div key={fact.id} className="rounded-sm border border-surface bg-background-secondary/70 p-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
                  <Icon className="h-3.5 w-3.5 text-primary-400" />
                  <span>{fact.label}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{fact.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bio — styled as a cat output */}
      <section className="space-y-2">
        <p className="text-text-dim text-xs font-mono">$ cat about.txt</p>
        <div className="border-l-2 border-surface pl-4 space-y-1">
          {bio.split('\n').map((line, i) => (
            <p key={i} className="font-mono text-sm text-text-secondary leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-text-dim text-xs font-mono">$ grep -n "impact" resume.log</p>
        <div className="grid gap-3 lg:grid-cols-2">
          {impactHighlights.map((highlight) => (
            <div key={highlight.id} className="rounded-sm border border-surface bg-background-secondary/70 p-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
                <IconReact className="h-3.5 w-3.5 text-primary-400" />
                <span>{highlight.label}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{highlight.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <p className="text-text-dim text-xs font-mono">$ git log --oneline career</p>
        <Timeline>
          {timeline.map((event, i) => (
            <TimelineItem
              key={event.id}
              year={event.year}
              title={event.title}
              company={event.company}
              type={event.type}
              isLast={i === timeline.length - 1}
            >
              {event.description}
            </TimelineItem>
          ))}
        </Timeline>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <p className="text-text-dim text-xs font-mono">$ which --all skills</p>
        <SkillsSection skills={skills} />
      </section>
    </div>
  );
}
