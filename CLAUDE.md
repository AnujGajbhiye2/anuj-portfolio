# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on localhost:3000 (auto-opens browser)
npm run build      # TypeScript check + Vite production build (tsc -b && vite build)
npm run lint       # ESLint across all .ts/.tsx files
npm run preview    # Preview production build locally
```

No test runner is configured yet.

## Architecture

Terminal-aesthetic portfolio site built with React 19 + TypeScript (strict) + Vite.

### Routing & Layout

- React Router v7 with `createBrowserRouter` — routes defined in `src/app/Router.tsx`
- All routes render inside `<Terminal/>` layout wrapper (`src/components/layout/Terminal.tsx`)
- Layout components: Header (traffic lights), Footer (keyboard hints), ConnectionLine

### Theme System

The theme system uses CSS custom properties driven by TypeScript tokens:

1. `src/styles/theme.ts` is the single source of truth — defines 4 color palettes (`cyan`, `matrix`, `amber`, `violet`) and 4 font stacks (`jetbrains`, `firacode`, `ibmplex`, `spacemono`)
2. `generateCSSVariables()` converts palette + font into CSS custom properties
3. Zustand store (`src/features/theme/store/themeStore.ts`) manages state with `persist` middleware (localStorage)
4. `tailwind.config.ts` maps CSS variables to Tailwind utility classes (e.g., `text-primary`, `bg-background-primary`, `text-text-muted`)

Theme changes: set Zustand state -> parse CSS variables -> apply to `document.documentElement`.

### Path Aliases

Configured in `vite.config.ts`: `@/` maps to `src/`, plus `@components`, `@features`, `@hooks`, `@lib`, `@pages`, `@styles`, `@types`.

### React Compiler

Enabled via `babel-plugin-react-compiler` in Vite config. Impacts dev/build performance but enables automatic memoization.

## Conventions

- **Named exports**, PascalCase component files
- **`forwardRef`** on all form elements (Input, etc.)
- **`cn()`** (`src/lib/cn.ts` — clsx + tailwind-merge) for all className merging
- **Tailwind classes only** — no inline styles
- **TypeScript**: prefer inference; explicit types only at function boundaries
- Reuse existing UI components from `src/components/ui/` (Button, Input, Card, Badge, Kbd)

## Current State & Roadmap

Phases 1-3 complete (foundation, layout, theme system). Phase 4 (core pages) is next: HomePage with typing effect, ProjectsPage with tag filtering (useReducer), AboutPage, ContactPage (React Hook Form + Zod).

---

## About the Developer

- Frontend-focused full-stack engineer, Dublin Ireland
- Previously at Yahoo/AOL
- Learning React/TypeScript deeply for job search
- Goal: master React patterns to confidently answer interview questions and build production apps

## Teaching Mode

- **No copy-paste**: give problem statements + minimal starter code with TODO slots
- **Explain TypeScript**: when introducing TS patterns (generics, utility types, forwardRef types), add brief `// TS note:` inline comments explaining what the syntax does and why
- **Build on what exists**: always reuse existing components and hooks
- **React concepts to cover**: useState, useEffect, useReducer, useContext, custom hooks, forwardRef, compound components, React Query, Zod validation, Zustand

### How to Issue Challenges

1. State what React concept the task teaches
2. Give the file location to create/edit
3. Provide a starter shell with clear TODO comments
4. List acceptance criteria (what it should do when done)
5. Do NOT show the full solution first

### Next Challenge: Phase 4, Step 1 — HomePage

**Concept taught:** Custom hooks + useEffect + useState
**File:** `src/pages/HomePage.tsx`

Issue this problem statement to the user:
> "Build the HomePage. It should show your name with a typing effect animation,
> an ASCII art logo, and support keyboard shortcuts (press `h` to go home, `p` for projects, etc.).
> Use the existing `useTypingEffect` and `useKeyboardNav` hooks.
> Reuse the `Kbd` component to show available shortcuts."
>
> Starter shell: provide `HomePage.tsx` with import stubs and TODO comments only.
> Acceptance criteria: animation plays on mount, keyboard nav works, no inline styles.
