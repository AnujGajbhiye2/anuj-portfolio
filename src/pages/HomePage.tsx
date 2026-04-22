import { useNavigate } from 'react-router-dom';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useKeyboardNav } from '../hooks/useKeyboardNav';
import { AsciiArt } from '../components/ascii/AsciiArt';
import { cn } from '../lib/cn';
import {
  IconAbout,
  IconBlog,
  IconCode,
  IconContact,
  IconDownload,
  IconExperience,
  IconExternalLink,
  IconGithub,
  IconHome,
  IconLab,
  IconLinkedIn,
  IconLocation,
  IconProjects,
  IconAuthorization,
} from '../components/shared/icons';
import { getTechIcon } from '../components/shared/tech-icons';

const NAV_ITEMS = [
  { label: 'projects', path: '/projects', key: 'p', icon: IconProjects, summary: 'featured builds, product thinking, and live work' },
  { label: 'about', path: '/about', key: 'a', icon: IconAbout, summary: 'resume-backed experience, timeline, and skill depth' },
  { label: 'blog', path: '/blog', key: 'b', icon: IconBlog, summary: 'engineering notes, build decisions, and frontend thinking' },
  { label: 'contact', path: '/contact', key: 'c', icon: IconContact, summary: 'email, profile links, and direct outreach' },
  { label: 'lab', path: '/lab', key: 'l', icon: IconLab, summary: 'site internals, component demos, and implementation notes' },
] as const;

type NavItem = typeof NAV_ITEMS[number];

const QUICK_FACTS = [
  { label: 'location', value: 'Dublin, Ireland', icon: IconLocation },
  { label: 'experience', value: '5+ years shipping frontend products', icon: IconExperience },
  { label: 'stack', value: 'React, TypeScript, Next.js', icon: IconCode },
  { label: 'work auth', value: 'Stamp 4 work authorization', icon: IconAuthorization },
] as const;

const SIGNALS = [
  'CSS',
  'Design Systems',
  'Express',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'TanStack Query',
  'TypeScript',
  'Vite',
  'Zustand',
] as const;

const PROFILE_LINKS = [
  { label: 'GitHub', href: 'https://github.com/AnujGajbhiye2', icon: IconGithub, trailingIcon: IconExternalLink, download: false },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anuj-gajbhiye/', icon: IconLinkedIn, trailingIcon: IconExternalLink, download: false },
  { label: 'Email', href: 'mailto:gajbhiyeanuj97@gmail.com', icon: IconContact, trailingIcon: IconExternalLink, download: false },
  { label: 'Resume', href: '/Anuj_Gajbhiye_Resume.pdf', icon: IconAbout, trailingIcon: IconDownload, download: true },
  { label: 'Cover Letter', href: '/Anuj_Gajbhiye_Cover_Letter.pdf', icon: IconAbout, trailingIcon: IconDownload, download: true },
] as const;


export default function HomePage() {
  const navigate = useNavigate();

  const { displayedText, isTyping } = useTypingEffect({
    text: 'frontend-focused full-stack engineer building production-grade web experiences.',
    delay: 400,
    speed: 50,
  });

  const { selectedIndex } = useKeyboardNav({
    itemCount: NAV_ITEMS.length,
    onSelect: (index) => navigate(NAV_ITEMS[index]?.path ?? '/'),
    enabled: !import.meta.env.DEV,
  });

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <div className="hidden xl:block shrink-0 rounded-sm border border-surface bg-background-secondary/70 p-4">
          <p className="text-xs text-text-dim">$ whoami --portrait</p>
          <div className="relative mt-4 h-75 overflow-hidden rounded-sm border border-surface bg-background-primary/40 p-2">
            <AsciiArt className="absolute inset-2" src="/anuj-bg-free.png" />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-text-muted">
            Shipping consumer-facing product interfaces with a bias toward clarity, resilience, and maintainable UI systems.
          </p>
        </div>

        <div className="min-w-0 space-y-6">
          <div className="rounded-sm border border-primary-400/20 bg-background-secondary/70 p-4 lg:p-6">
            <div className="lg:hidden rounded-sm border border-surface bg-background-primary/60 p-4">
              <p className="text-xs text-text-dim">$ whoami --compact</p>
              <pre className="mt-3 text-xs leading-tight text-primary-400">{String.raw`┌─────────────┐
│  anuj.exe   │
│  frontend   │
│  dublin.ie  │
└─────────────┘`}</pre>
            </div>

            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="text-xs text-text-dim">$ cat profile/summary.txt</p>
                  <pre className="font-mono text-sm leading-tight text-primary-400 select-none">{`  __ _ _ __  _   _    _
 / _\` | '_ \\| | | |  (_)
| (_| | | | | |_| |  | |
 \\__,_|_| |_|\\__,_| _/ |
                   |__/`}</pre>
                  <p className="min-h-16 max-w-3xl text-lg leading-relaxed text-text-secondary font-mono ">
                    {displayedText}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'text-primary-400',
                        isTyping ? 'animate-pulse opacity-100' : 'opacity-0'
                      )}
                    >
                      |
                    </span>
                  </p>
                  <p className="max-w-3xl text-sm leading-relaxed text-text-muted">
                    Built and modernized high-traffic web experiences at Yahoo/AOL, with a focus on React,
                    TypeScript, testing, experimentation, and production-ready frontend architecture.
                  </p>
                </div>

                <div className="hidden md:flex items-center gap-2 rounded-sm border border-surface bg-background-primary/60 px-3 py-2 text-xs text-text-dim">
                  <IconHome className="h-3.5 w-3.5 text-primary-400" />
                  <span>terminal workspace</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {SIGNALS.map((signal) => {
                  const Icon = getTechIcon(signal);
                  return (
                    <span
                      key={signal}
                      className="inline-flex items-center gap-2 rounded-sm border border-surface bg-background-primary/60 px-3 py-1.5 text-xs text-text-muted"
                    >
                      {Icon && <Icon className="h-3.5 w-3.5 text-primary-400" />}
                      <span>{signal}</span>
                    </span>
                  );
                })}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {QUICK_FACTS.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="rounded-sm border border-surface bg-background-primary/50 p-3">
                      <div className="flex items-center gap-2 text-xs text-text-dim">
                        <Icon className="h-3.5 w-3.5 text-primary-400" />
                        <span>{fact.label}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{fact.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                {PROFILE_LINKS.map((link) => {
                  const Icon = link.icon;
                  const TrailingIcon = link.trailingIcon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      download={link.download ? 'Anuj_Gajbhiye_Resume.pdf' : undefined}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-surface bg-background-primary/60 px-3 py-2 text-sm text-text-muted transition-colors duration-150 hover:border-surface-hover hover:text-text-primary"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary-400" />
                      <span>{link.label}</span>
                      <TrailingIcon className="h-3.5 w-3.5 text-text-dim" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-text-dim">$ ls public/routes</p>
          {/* <p className="hidden md:block text-xs text-text-dim">visible nav above, keyboard nav still active here</p> */}
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {NAV_ITEMS.map((item: NavItem, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'group flex cursor-pointer items-start justify-between gap-4 rounded-sm border p-4 text-left transition-colors duration-150',
                  index === selectedIndex
                    ? 'border-primary-400/50 bg-primary-400/10 text-primary-400'
                    : 'border-surface bg-background-secondary/70 text-text-muted hover:border-surface-hover hover:bg-background-secondary hover:text-text-primary',
                )}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-primary-400" />
                    <span className="font-mono text-sm">/{item.label}</span>
                  </div>
                  <p className={cn(
                    'text-sm leading-relaxed',
                    index === selectedIndex ? 'text-text-secondary' : 'text-text-muted group-hover:text-text-secondary'
                  )}>
                    {item.summary}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs text-text-dim">[{item.key}]</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
