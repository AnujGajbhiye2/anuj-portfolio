import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { contactSchema, type ContactFormData } from '../lib/validation';

// TS note: useState<'idle' | 'success' | 'error'> is a union type used as a
// simple state machine — only these three values are ever valid, so TypeScript
// will error if you try to set any other string.
type SubmitState = 'idle' | 'success' | 'error';

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
    // Simulate async submission — swap for a real service (Formspree, etc.) later
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('[ContactPage] form submitted:', data);
    setSubmitState('success');
    reset();
  };

  const handleReset = () => {
    setSubmitState('idle');
    reset();
  };

  return (
    <div className="space-y-8 max-w-lg">
      <PageHeader title="contact" />

      {submitState === 'success' ? (
        // Terminal-style success state
        <div className="space-y-3 font-mono text-sm border-l-2 border-primary-400 pl-4">
          <p className="text-text-dim">$ send --message</p>
          <p className="text-primary-400">✓ message transmitted successfully</p>
          <p className="text-text-dim">{'>'} exit code: 0</p>
          <p className="text-text-muted mt-4">i'll get back to you soon.</p>
          <Button variant="ghost" size="sm" onClick={handleReset} className="mt-4">
            ← send another
          </Button>
        </div>
      ) : (
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CardHeader>
              <p className="font-mono text-xs text-text-dim">$ compose --to anuj</p>
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
                  {...register('email')}
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block font-mono text-xs text-text-secondary">
                  message
                </label>
                <Textarea
                  id="message"
                  placeholder="what's on your mind..."
                  error={errors.message?.message}
                  {...register('message')}
                />
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
    </div>
  );
}
