import type { Project } from '../types';

// TS note: 'satisfies Project[]' checks the array shape at compile time
// while keeping the narrowest literal types inferred (e.g. status: 'completed'
// not just status: string). It's stricter than a plain type annotation.
export const projects: Project[] = [
  {
    id: 'anuj-portfolio',
    title: 'Terminal Portfolio',
    description:
      'This site — a terminal-aesthetic developer portfolio built with React 19, TypeScript, and Tailwind CSS. Features a theme engine with 4 palettes, keyboard navigation, typing animations, and a compound component system.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Zustand'],
    githubUrl: 'https://github.com/anujgajbhiye/anuj-portfolio',
    liveUrl: undefined,
    status: 'in-progress',
  },
  {
    id: 'cosmoview',
    title: 'CosmoView',
    description:
      'Full-stack NASA exploration platform that transforms multiple NASA public APIs into a mission-control themed app. Features APOD archive browsing, asteroid analytics, Earth imagery, NASA image library with infinite pagination, and an AI-powered Explorer Copilot. React 19 frontend on Vercel, Express backend on Render.',
    tags: ['React', 'TypeScript', 'TanStack Query', 'Express', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/AnujGajbhiye2/CosmoView',
    liveUrl: 'https://cosmo-view.vercel.app',
    status: 'completed',
  },
  {
    id: 'yahoo-aol',
    title: 'Yahoo / AOL — Ad Platform',
    description:
      'Frontend engineering on the Yahoo & AOL advertising platform. Built high-traffic product surfaces, contributed to shared design systems, and shipped features used by millions of users.',
    tags: ['React', 'JavaScript', 'CSS', 'Design Systems'],
    githubUrl: undefined,
    liveUrl: undefined,
    status: 'completed',
  },
];
