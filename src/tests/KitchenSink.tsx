import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactFormData } from '../lib/validation';

import Card, { CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Kbd } from '../components/ui/Kbd';
import { IconCode, IconCommand, IconContact, IconLab } from '../components/shared/icons';

// =============================================================================
// KITCHEN SINK
// =============================================================================

export const KitchenSinkSections = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <div className="space-y-12 font-mono text-text-primary">
      <div className="rounded-sm border border-surface bg-background-secondary/70 p-4">
        <div className="inline-flex items-center gap-2 text-xs text-text-dim">
          <IconLab className="h-3.5 w-3.5 text-primary-400" />
          <span>$ cat lab/overview.txt</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          This route collects the UI primitives and interaction patterns that power the portfolio: cards, badges,
          inputs, keyboard hints, and validation flows.
        </p>
      </div>

      {/* ================================================================= */}
      {/* CARD VARIANTS                                                     */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-text-secondary">
          <IconCode className="h-5 w-5 text-primary-400" />
          <span>Card Variants</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Default Card</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">Solid background and border.</p>
            </CardContent>
            <CardFooter>
              <Badge>default</Badge>
            </CardFooter>
          </Card>

          <Card variant="interactive">
            <CardHeader>
              <h3 className="font-semibold">Interactive Card</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">Hover me to see the effect.</p>
            </CardContent>
            <CardFooter>
              <Badge variant="outline">interactive</Badge>
            </CardFooter>
          </Card>

          <Card variant="selected">
            <CardHeader>
              <h3 className="font-semibold">Selected Card</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">Primary border and tinted background.</p>
            </CardContent>
            <CardFooter>
              <Badge variant="subtle">selected</Badge>
            </CardFooter>
          </Card>

          <Card variant="ghost">
            <CardHeader>
              <h3 className="font-semibold">Ghost Card</h3>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary text-sm">No border, no background.</p>
            </CardContent>
            <CardFooter>
              <Badge>ghost</Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ================================================================= */}
      {/* BUTTONS                                                           */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-text-secondary">
          <IconCode className="h-5 w-5 text-primary-400" />
          <span>Buttons</span>
        </h2>
        <Card>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================================================================= */}
      {/* BADGES                                                            */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-text-secondary">
          <IconCode className="h-5 w-5 text-primary-400" />
          <span>Badges</span>
        </h2>
        <Card>
          <CardContent>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge>Default sm</Badge>
              <Badge size="md">Default md</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="outline" size="md">Outline md</Badge>
              <Badge variant="subtle">Subtle</Badge>
              <Badge variant="subtle" size="md">Subtle md</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================================================================= */}
      {/* KBD                                                               */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-text-secondary">
          <IconCommand className="h-5 w-5 text-primary-400" />
          <span>Keyboard Shortcuts</span>
        </h2>
        <Card>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center text-text-secondary text-sm">
              <span>Save: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd></span>
              <span>Search: <Kbd size="md">Ctrl</Kbd> + <Kbd size="md">K</Kbd></span>
              <span>Quit: <Kbd>Esc</Kbd></span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================================================================= */}
      {/* INPUT                                                             */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-text-secondary">
          <IconContact className="h-5 w-5 text-primary-400" />
          <span>Inputs</span>
        </h2>
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 max-w-md">
              <Input placeholder="Default input" />
              <Input placeholder="Disabled input" disabled />
              <Input placeholder="With error" error="Something went wrong" id="error-demo" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================================================================= */}
      {/* RHF FORM                                                          */}
      {/* ================================================================= */}
      <section className="mb-12">
        <h2 className="mb-4 inline-flex items-center gap-2 text-xl font-semibold text-text-secondary">
          <IconContact className="h-5 w-5 text-primary-400" />
          <span>Contact Form (React Hook Form + Zod)</span>
        </h2>
        <Card className="max-w-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <h3 className="font-semibold">Send a message</h3>
              <p className="text-text-muted text-sm mt-1">All fields are validated with Zod v4.</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-text-secondary mb-1">Name</label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-text-secondary mb-1">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    leftElement={<IconContact className="h-4 w-4" />}
                    {...register('email')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-text-secondary mb-1">Message</label>
                  <Input
                    id="message"
                    placeholder="At least 10 characters..."
                    error={errors.message?.message}
                    leftElement={<IconContact className="h-4 w-4" />}
                    {...register('message')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button type="button" variant="ghost" onClick={() => reset()}>
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </div>
  );
};

const KitchenSink = () => {
  return (
    <div className="min-h-screen bg-background-primary p-8 font-mono text-text-primary">
      <h1 className="mb-8 text-3xl font-bold">Kitchen Sink</h1>
      <KitchenSinkSections />
    </div>
  );
};

export default KitchenSink;
