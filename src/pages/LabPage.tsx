import PageHeader from '../components/shared/PageHeader';
import { KitchenSinkSections } from '../tests/KitchenSink';
import { IconCommand, IconLab, IconProjects } from '../components/shared/icons';

const LabPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader title="lab" />

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
            <IconLab className="h-3.5 w-3.5 text-primary-400" />
            <span>purpose</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            A public site-internals route for inspecting the building blocks behind the portfolio.
          </p>
        </div>

        <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
            <IconCommand className="h-3.5 w-3.5 text-primary-400" />
            <span>interaction model</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Shows the keyboard, input, and validation primitives that support the terminal-like UX.
          </p>
        </div>

        <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
            <IconProjects className="h-3.5 w-3.5 text-primary-400" />
            <span>scope</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            Focused on reusable UI primitives and current implementation patterns, not hidden dev tooling.
          </p>
        </div>
      </section>

      <KitchenSinkSections />
    </div>
  );
};

export default LabPage;
