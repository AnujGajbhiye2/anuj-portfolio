# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend
npm run dev        # Dev server on localhost:3000 (auto-opens browser)
npm run build      # tsc -b && vite build (must pass before any PR)
npm run lint       # ESLint across all .ts/.tsx
npm run preview    # Preview production build

# Backend (run from backend/)
cd backend && npm run dev        # Backend dev server
cd backend && npm run build      # TypeScript compile
cd backend && npm run lint
cd backend && npm run db:generate  # Prisma client generation
cd backend && npm run db:push      # Push schema to SQLite
```

No test runner configured. `npm run build` is the correctness gate.

## Architecture

Terminal-aesthetic portfolio. Frontend: React 19 + TypeScript strict + Vite. Backend: standalone Express + TypeScript + SQLite + Prisma in `backend/`.

### Provider Stack

`src/app/Providers.tsx` wraps the app in this order:
1. `QueryClientProvider` (TanStack Query, `staleTime: 30s`, `retry: 1`)
2. `ThemeProvider` (CSS variable injection)
3. `AuthProvider` (JWT cookie session)

### Routing & Layout

- `src/app/Router.tsx` — all routes nested under `<RootLayout>` → `<Terminal>`
- Routes: `/`, `/projects`, `/about`, `/blog`, `/blog/:slug`, `/contact`, `/lab`, `/admin/login`, `/admin` (protected)
- `<Terminal>` renders `<Header>`, scanline overlay, `<Outlet>`, `<Footer>`, `<ConnectionLine>`
- Global keyboard shortcuts in `Terminal.tsx`: `h/p/a/b/c` jump to routes; disabled when focus in input/textarea

### Theme System

`src/styles/theme.ts` is the single source of truth — 4 palettes (`cyan`, `matrix`, `amber`, `violet`), 4 fonts. `generateCSSVariables()` → CSS string → applied to `document.documentElement`. Zustand store (`src/features/theme/store/themeStore.ts`) persists to localStorage. Tailwind classes (`text-primary`, `bg-background-primary`, etc.) map to CSS vars defined in `tailwind.config.ts`.

### API Layer

`src/lib/api.ts` — public API helpers (`getBlogs`, `getBlogBySlug`, `submitContact`, `trackPageView`). Base: `apiFetch` prepends `VITE_API_URL`, sends cookies, throws `ApiError` on non-2xx.

`src/lib/adminApi.ts` — admin-only CRUD for blogs, contacts, analytics, and image upload (multipart, skips `apiFetch`).

### Auth

Adapter pattern: `src/features/auth/adapters/backendAdapter.ts` implements `AuthAdapter` (getSession, signIn, signOut). `AuthProvider` bootstraps session on mount. `ProtectedRoute` guards `/admin`. Hook: `useAuth()` from `src/features/auth/hooks/useAuth.ts`.

### Path Aliases

`@/` → `src/`, plus `@components`, `@features`, `@hooks`, `@lib`, `@pages`, `@styles`, `@types`.

### React Compiler

`babel-plugin-react-compiler` enabled in Vite — automatic memoization; avoid manual `useMemo`/`useCallback` unless profiling shows a specific issue.

## Conventions

- **Named exports**, PascalCase component files
- **`cn()`** (`src/lib/cn.ts` — clsx + tailwind-merge) for all className merging
- **Tailwind classes only** — no inline styles
- **TypeScript**: prefer inference; explicit types at function boundaries only
- Reuse UI primitives from `src/components/ui/` (Button, Input, Card, Badge, Kbd, Textarea, LazyImage)
- Shared Zod schemas in `src/lib/validation.ts`; typed data in `src/data/`

## Current State

All Phase 4 pages complete (Home, Projects, About, Contact). Backend Phase 8 scaffolded. See `PROJECT_CONTEXT.md` for the full phase roadmap, approval workflow for Phase 7 (visual refresh), and known tech debt.

**Approval requirement:** Before changing any section or route content/UI, present the proposed changes first and wait for explicit per-section approval. Approval buckets: `home`, `about`, `projects`, `blog`, `contact`, `lab`, `global navigation / header / footer`.

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
