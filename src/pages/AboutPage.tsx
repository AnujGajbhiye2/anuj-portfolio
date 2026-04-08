import PageHeader from '../components/shared/PageHeader';
import { Timeline, TimelineItem } from '../components/about/Timeline';
import { SkillsSection } from '../components/about/SkillsSection';
import { bio, timeline, skills } from '../data/about';

export default function AboutPage() {
  return (
    <div className="space-y-12 max-w-2xl">
      <PageHeader title="about" />

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
