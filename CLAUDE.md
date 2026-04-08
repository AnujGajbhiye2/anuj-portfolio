# Jobhunt - Learning Context

## About the Developer
- Frontend-focused full-stack engineer, Dublin Ireland
- Previously at Yahoo/AOL
- Learning React/TypeScript deeply for job search
- Goal: master React patterns to confidently answer interview questions and build production apps

## Teaching Philosophy
- **No copy-paste**: Claude gives problem statements + minimal starter code with TODO slots
- **Explain TypeScript**: when introducing TS patterns (generics, utility types, forwardRef types), add a brief inline comment explaining what the syntax does and why
- **Build on what exists**: always reuse existing components (Button, Card, Badge, etc.) and hooks
- **React concepts to cover**: useState, useEffect, useReducer, useContext, custom hooks, forwardRef, compound components, React Query, Zod validation, Zustand

## Projects
- `anuj-portfolio/` — terminal CLI portfolio (Vite + React + TypeScript) — ACTIVE
- `devmarket-be/` — marketplace backend (Express + Prisma + PostgreSQL) — scaffolded
- `devmarket-fe/` — marketplace frontend (React + Radix UI) — scaffolded (Next.js, comes later)

---

# anuj-portfolio - Project Context

## Stack
- React 19 + TypeScript (strict) + Vite
- React Router v7 (createBrowserRouter)
- Tailwind CSS 4.2 (CSS variables via theme.ts)
- Zustand 5 for theme state
- TanStack Query 5 (not yet used — Phase 5)
- React Hook Form + Zod (form validation)

## Current State: Phase 3 complete
Phases 1-3 done: foundation, layout, theme system (4 palettes, 4 fonts).

## Next: Phase 4 — Core Pages
- HomePage: typing effect animation, ASCII art, keyboard nav
- ProjectsPage: project cards with tag filtering (useReducer pattern)
- AboutPage: timeline, skills section
- ContactPage: form with React Hook Form + Zod validation

## Key Files
- `src/styles/theme.ts` — all design tokens, applyTheme(), generateCSSVariables()
- `src/lib/cn.ts` — clsx + tailwind-merge utility
- `src/hooks/useTypingEffect.ts` — typing animation hook
- `src/hooks/useKeyboardNav.ts` — keyboard navigation
- `src/hooks/useLocalStorage.ts` — localStorage persistence
- `src/components/ui/` — Button, Input, Card, Badge, Kbd (reuse these)
- `src/lib/validation.ts` — Zod schemas (extend for contact form)

## Conventions
- Components: named exports, PascalCase files
- forwardRef on all form elements
- cn() for all className merging
- Tailwind classes only — no inline styles
- TypeScript: prefer inference; add explicit types only at function boundaries

## TypeScript Learning Notes
When Claude provides starter code, brief `// TS note:` comments explain key patterns:
- Why `forwardRef<HTMLInputElement, InputProps>` has two type args
- What `Record<string, string>` means vs an interface
- When to use `as const` and why
- Difference between `type` and `interface`

## Teaching Mode: How to Issue Challenges
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
