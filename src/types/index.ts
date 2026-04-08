// =============================================================================
// SHARED TYPES
// Single source of truth for data shapes used across pages and data files.
// =============================================================================

// TS note: 'as const' on a data array keeps literal types narrow (e.g. 'work'
// not just string), which makes exhaustive type checks possible downstream.

export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string | undefined;
  liveUrl?: string | undefined;
  status: ProjectStatus;
}

// TS note: 'work' | 'education' | 'project' is a discriminated union —
// each branch represents a mutually exclusive kind of event.
export type TimelineEventType = 'work' | 'education' | 'project';

export interface TimelineEvent {
  id: string;
  year: string;         // e.g. "2023" or "2020–2023"
  title: string;
  company?: string | undefined;
  description: string;
  type: TimelineEventType;
}

export type SkillCategory = 'language' | 'framework' | 'tool' | 'platform';

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
}

export interface ProfileFact {
  id: string;
  label: string;
  value: string;
}

// ContactFormData is derived via z.infer from the Zod schema in validation.ts.
// Re-exported here so consumers can import from one place.
export type { ContactFormData } from '../lib/validation';
