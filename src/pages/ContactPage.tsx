import { useState } from 'react';
import { submitContact } from '../lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { contactSchema, type ContactFormData } from '../lib/validation';
import {
  IconAbout,
  IconAuthorization,
  IconContact,
  IconExternalLink,
  IconGithub,
  IconLinkedIn,
  IconMail,
} from '../components/shared/icons';

// TS note: useState<'idle' | 'success' | 'error'> is a union type used as a
// simple state machine — only these three values are ever valid, so TypeScript
// will error if you try to set any other string.
type SubmitState = 'idle' | 'success' | 'error';

const CONTACT_LINKS = [
  {
    label: 'email',
    value: 'gajbhiyeanuj97@gmail.com',
    href: 'mailto:gajbhiyeanuj97@gmail.com',
    icon: IconMail,
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/anuj-gajbhiye',
    href: 'https://www.linkedin.com/in/anuj-gajbhiye/',
    icon: IconLinkedIn,
  },
  {
    label: 'github',
    value: 'github.com/AnujGajbhiye2',
    href: 'https://github.com/AnujGajbhiye2',
    icon: IconGithub,
  },
] as const;

export default function ContactPage() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact(data);
      setSubmitState('success');
      reset();
    } catch {
      setSubmitState('error');
    }
  };

  const handleReset = () => {
    setSubmitState('idle');
    reset();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <PageHeader title="contact" />

      <section className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="rounded-sm border border-surface bg-background-secondary/70 p-4 space-y-3">
            <p className="text-xs font-mono text-text-dim">$ whoami --contact</p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Best for frontend engineering roles, product-focused teams, and conversations around modernizing web
              experiences.
            </p>
            <div className="rounded-sm border border-surface bg-background-primary/50 p-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
                <IconAuthorization className="h-3.5 w-3.5 text-primary-400" />
                <span>work auth</span>
              </div>
              <p className="mt-2 text-sm text-text-secondary">Stamp 4 work authorization, based in Dublin, Ireland.</p>
            </div>
          </div>

          <div className="space-y-3">
            {CONTACT_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="flex cursor-pointer items-start justify-between gap-3 rounded-sm border border-surface bg-background-secondary/70 p-4 text-left transition-colors duration-150 hover:border-surface-hover hover:text-text-primary"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-text-dim">
                      <Icon className="h-3.5 w-3.5 text-primary-400" />
                      <span>{link.label}</span>
                    </div>
                    <p className="truncate text-sm text-text-secondary">{link.value}</p>
                  </div>
                  <IconExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-dim" />
                </a>
              );
            })}
          </div>
        </div>

        {submitState === 'success' ? (
          <div className="space-y-3 font-mono text-sm border-l-2 border-primary-400 pl-4 lg:pt-4">
            <p className="text-text-dim">$ send --message</p>
            <p className="text-primary-400">✓ message transmitted successfully</p>
            <p className="text-text-dim">{'>'} exit code: 0</p>
            <p className="text-text-muted mt-4">i&apos;ll get back to you soon.</p>
            <Button variant="ghost" size="sm" onClick={handleReset} className="mt-4">
              ← send another
            </Button>
          </div>
        ) : submitState === 'error' ? (
          <div className="space-y-3 font-mono text-sm border-l-2 border-red-500 pl-4 lg:pt-4">
            <p className="text-text-dim">$ send --message</p>
            <p className="text-red-400">✗ transmission failed</p>
            <p className="text-text-dim">{'>'} exit code: 1</p>
            <p className="text-text-muted mt-4">please try again or email directly.</p>
            <Button variant="ghost" size="sm" onClick={handleReset} className="mt-4">
              ← try again
            </Button>
          </div>
        ) : (
          <Card>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <CardHeader className="space-y-2">
                <p className="font-mono text-xs text-text-dim">$ compose --to anuj</p>
                <p className="text-sm text-text-muted">
                  Prefer the form if you want to include context about a role, product, or project.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block font-mono text-xs text-text-secondary">
                    name
                  </label>
                  <Input
                    id="name"
                    placeholder="your name"
                    error={errors.name?.message}
                    leftElement={<IconAbout className="h-4 w-4" />}
                    {...register('name')}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block font-mono text-xs text-text-secondary">
                    email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    leftElement={<IconMail className="h-4 w-4" />}
                    {...register('email')}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block font-mono text-xs text-text-secondary">
                    message
                  </label>
                  <div className="rounded-sm border border-transparent">
                    <div className="mb-2 inline-flex items-center gap-2 text-xs font-mono text-text-dim">
                      <IconContact className="h-3.5 w-3.5 text-primary-400" />
                      <span>include role, company, or project context if relevant</span>
                    </div>
                    <Textarea
                      id="message"
                      placeholder="what's on your mind..."
                      error={errors.message?.message}
                      {...register('message')}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  reset
                </Button>
                <Button type="submit" size="sm" disabled={isSubmitting}>
                  {isSubmitting ? 'transmitting...' : 'send →'}
                </Button>
              </CardFooter>
            </form>
          </Card>
      )}
      </section>
    </div>
  );
}
