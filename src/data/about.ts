import type { TimelineEvent, Skill } from '../types';

// =============================================================================
// BIO
// =============================================================================

export const bio = `Frontend-focused full-stack engineer based in Dublin, Ireland.
Previously at Yahoo / AOL building ad platform products at scale.
Currently deepening React & TypeScript skills and building side projects.
Looking for my next challenge — ideally somewhere that ships things people use.`;

// =============================================================================
// TIMELINE
// =============================================================================

export const timeline: TimelineEvent[] = [
  {
    id: 'yahoo-aol',
    year: '2019–2024',
    title: 'Frontend Engineer',
    company: 'Yahoo / AOL',
    description:
      'Built and maintained high-traffic product surfaces on the Yahoo and AOL advertising platform. Contributed to a shared React component library, worked across multiple cross-functional teams, and shipped features used by millions of users.',
    type: 'work',
  },
  {
    id: 'cosmoview',
    year: '2024',
    title: 'CosmoView — Full-Stack Project',
    description:
      'Built a NASA exploration platform with a React frontend, TanStack Query data layer, and Express backend. Focused on API orchestration, rich UI states, and turning public space data into a polished product experience.',
    type: 'project',
  },
  {
    id: 'portfolio',
    year: '2025',
    title: 'Terminal Portfolio',
    description:
      'Built this portfolio as a deep-dive into React 19, TypeScript strict mode, Tailwind CSS 4, and modern state management patterns (Zustand, useReducer, React Hook Form + Zod).',
    type: 'project',
  },
];

// =============================================================================
// SKILLS
// =============================================================================

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'language', proficiency: 4 },
  { name: 'JavaScript', category: 'language', proficiency: 5 },
  { name: 'HTML / CSS',  category: 'language', proficiency: 5 },
  { name: 'SQL',         category: 'language', proficiency: 3 },

  // Frameworks
  { name: 'React',       category: 'framework', proficiency: 4 },
  { name: 'Express',     category: 'framework', proficiency: 3 },
  { name: 'Tailwind CSS', category: 'framework', proficiency: 4 },
  { name: 'Zod',         category: 'framework', proficiency: 3 },
  { name: 'React Hook Form', category: 'framework', proficiency: 3 },

  // Tools
  { name: 'Vite',        category: 'tool', proficiency: 4 },
  { name: 'Git',         category: 'tool', proficiency: 4 },
  { name: 'Prisma',      category: 'tool', proficiency: 3 },

  // Platforms
  { name: 'PostgreSQL',  category: 'platform', proficiency: 3 },
  { name: 'Node.js',     category: 'platform', proficiency: 3 },
];
