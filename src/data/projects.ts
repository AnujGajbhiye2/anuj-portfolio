import type { Project } from '../types';

// TS note: 'satisfies Project[]' checks the array shape at compile time
// while keeping the narrowest literal types inferred (e.g. status: 'completed'
// not just status: string). It's stricter than a plain type annotation.
export const projects: Project[] = [
  {
    id: 'yahoo-aol',
    title: 'Yahoo / AOL — Consumer Platform',
    description:
      'Frontend engineering across Yahoo and AOL consumer experiences, including high-traffic modules, experimentation rollouts, analytics instrumentation, and design-system-aligned UI shipped to audiences at consumer scale.',
    tags: ['React', 'Next.js', 'JavaScript', 'CSS', 'Design Systems'],
    githubUrl: undefined,
    liveUrl: undefined,
    status: 'completed',
  },
  {
    id: 'valuelabs-finance-platform',
    title: 'ValueLabs — Finance Platform Modernization',
    description:
      'Led the migration of a legacy finance platform from ColdFusion to Vue.js, improving maintainability and user experience for 50,000+ users. Designed REST APIs to decouple frontend and backend systems and introduced Jest and Cypress automated testing to improve release confidence.',
    tags: ['Vue.js', 'JavaScript', 'REST APIs', 'Jest', 'Cypress'],
    githubUrl: undefined,
    liveUrl: undefined,
    status: 'completed',
  },
  {
    id: 'anuj-portfolio',
    title: 'Terminal Portfolio',
    description:
      'Terminal-first portfolio and frontend playground built with React 19 and TypeScript. Designed to showcase typed UI architecture, theme switching, keyboard-aware navigation, content-driven routing, and a reusable component system without dropping the shell aesthetic.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Zustand', 'Design Systems'],
    githubUrl: 'https://github.com/anujgajbhiye/anuj-portfolio',
    liveUrl: undefined,
    status: 'in-progress',
  },
  {
    id: 'cosmoview',
    title: 'CosmoView',
    description:
      'Full-stack NASA exploration platform that turns multiple public APIs into a mission-control style product. Built rich search, pagination, analytics views, and data-heavy UI states with React, TypeScript, TanStack Query, and Express across a split frontend/backend deployment.',
    tags: ['React', 'TypeScript', 'TanStack Query', 'Express', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/AnujGajbhiye2/CosmoView',
    liveUrl: 'https://cosmo-view.vercel.app',
    status: 'completed',
  },
];