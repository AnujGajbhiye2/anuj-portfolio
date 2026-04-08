import { z } from 'zod/v4';

// =============================================================================
// CONTACT FORM SCHEMA
// Shared by ContactPage and KitchenSink — single source of truth.
// TS note: z.infer<typeof schema> derives a TypeScript type FROM the Zod schema,
// so the type and the runtime validation are always in sync.
// =============================================================================

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
