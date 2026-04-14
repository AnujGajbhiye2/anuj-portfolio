import type { ProfileFact, TimelineEvent, Skill } from '../types';

// =============================================================================
// BIO
// =============================================================================

export const bio = `Frontend-focused full-stack software engineer with 5+ years of experience building and modernizing high-traffic web applications.
Strongest in JavaScript, TypeScript, React, Next.js, and production-grade frontend architecture that can survive real product scale.
Experienced with testing, experimentation, analytics instrumentation, CI/CD, and shipping features in globally distributed teams.
Based in Dublin, Ireland, with Stamp 4 work authorization and a First Class Honours MSc in Computer Science from UCD.`;

export const profileFacts: ProfileFact[] = [
  {
    id: 'location',
    label: 'location',
    value: 'Dublin, Ireland',
  },
  {
    id: 'experience',
    label: 'experience',
    value: '5+ years building frontend and full-stack products',
  },
  {
    id: 'authorization',
    label: 'work auth',
    value: 'Stamp 4 work authorization',
  },
  {
    id: 'education',
    label: 'education',
    value: 'MSc Computer Science, UCD, First Class Honours',
  },
];

export const impactHighlights: ProfileFact[] = [
  {
    id: 'scale',
    label: 'platform scale',
    value: '30M+ monthly active users supported through AOL consumer surfaces',
  },
  {
    id: 'testing',
    label: 'testing',
    value: 'Playwright, Vitest, Jest, Cypress, and regression-focused delivery',
  },
  {
    id: 'experimentation',
    label: 'product work',
    value: 'A/B tests, feature rollouts, analytics instrumentation, and content tooling',
  },
  {
    id: 'tooling',
    label: 'tooling',
    value: 'Git, Webpack, CI/CD pipelines, build systems, and reusable component architecture',
  },
];

// =============================================================================
// TIMELINE
// =============================================================================

export const timeline: TimelineEvent[] = [
  {
    id: 'yahoo-international',
    year: 'Nov 2023 – Mar 2026',
    title: 'Software Dev Engineer',
    company: 'Yahoo International Limited',
    description:
      'Owned end-to-end development across AOL homepage, channel, and article experiences. Shipped reusable UI modules, migrated legacy stitching and page layers to Next.js-based architecture, integrated analytics instrumentation, supported experimentation rollout, and brought Playwright E2E coverage into CI/CD.',
    type: 'work',
  },
  {
    id: 'yahoo-intern',
    year: 'May 2023 – Sep 2023',
    title: 'Technical Intern II',
    company: 'Yahoo EMEA Limited',
    description:
      'Shipped production frontend modules for AOL.com including weather, local news, and location-based experiences. Worked on live consumer surfaces across AOL.com, AOL.co.uk, and AOL.ca while collaborating closely with engineering and design.',
    type: 'work',
  },

  {
    id: 'ucd',
    year: '2022 – 2023',
    title: 'MSc Computer Science (Negotiated Learning)',
    company: 'University College Dublin',
    description:
      'Graduated with First Class Honours. Coursework included design patterns, cloud computing, distributed systems, advanced data structures, and Java programming.',
    type: 'education',
  },
  {
    id: 'valuelabs',
    year: 'Jun 2019 – Jul 2022',
    title: 'Software Engineer',
    company: 'ValueLabs',
    description:
      'Led frontend modernization work on a finance platform, migrating legacy ColdFusion experiences to Vue.js, designing REST APIs, and introducing Jest/Cypress-based testing to improve maintainability and release confidence.',
    type: 'work',
  },
    {
    id: 'cosmoview',
    year: '2024',
    title: 'CosmoView — Full-Stack Project',
    description:
      'Built a NASA exploration platform with React, TypeScript, TanStack Query, and Express. Focused on API orchestration, search and pagination UX, and turning public space data into a polished product experience.',
    type: 'project',
  },
  {
    id: 'portfolio',
    year: '2025 – now',
    title: 'Terminal Portfolio',
    description:
      'Building this portfolio as a focused React and TypeScript showcase: terminal-first UI, theme engine, keyboard navigation, typed content, and progressively richer case-study and lab surfaces.',
    type: 'project',
  },
];

// =============================================================================
// SKILLS
// =============================================================================

export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'language', proficiency: 5 },
  { name: 'JavaScript', category: 'language', proficiency: 5 },
  { name: 'HTML / CSS',  category: 'language', proficiency: 5 },
  { name: 'SQL',         category: 'language', proficiency: 3 },
  { name: 'Python',      category: 'language', proficiency: 3 },

  // Frameworks
  { name: 'React',       category: 'framework', proficiency: 5 },
  { name: 'Next.js',     category: 'framework', proficiency: 4 },
  { name: 'Vue.js',      category: 'framework', proficiency: 4 },
  { name: 'SvelteKit',   category: 'framework', proficiency: 3 },
  { name: 'Express',     category: 'framework', proficiency: 3 },
  { name: 'Tailwind CSS', category: 'framework', proficiency: 4 },
  { name: 'Zod',         category: 'framework', proficiency: 3 },
  { name: 'React Hook Form', category: 'framework', proficiency: 3 },

  // Tools
  { name: 'Playwright',  category: 'tool', proficiency: 4 },
  { name: 'Vitest',      category: 'tool', proficiency: 3 },
  { name: 'Jest',        category: 'tool', proficiency: 4 },
  { name: 'Cypress',     category: 'tool', proficiency: 3 },
  { name: 'Vite',        category: 'tool', proficiency: 4 },
  { name: 'Webpack',     category: 'tool', proficiency: 4 },
  { name: 'Git',         category: 'tool', proficiency: 4 },
  { name: 'Docker',      category: 'tool', proficiency: 3 },

  // Platforms
  { name: 'Node.js',     category: 'platform', proficiency: 4 },
  { name: 'PostgreSQL',  category: 'platform', proficiency: 3 },
  { name: 'AWS',         category: 'platform', proficiency: 3 },
  { name: 'CI/CD Pipelines', category: 'platform', proficiency: 4 },
];
