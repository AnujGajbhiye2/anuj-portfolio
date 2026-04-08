# CLI Portfolio - Project Context

## Quick Summary

Building a terminal-aesthetic portfolio with React + TypeScript + Vite.

**Reference:** ssh.moriliu.com (terminal/CLI style)

---

## Tech Stack

```
Core:        React 19, Vite 7, TypeScript 5 (strict)
Routing:     React Router v7 (createBrowserRouter)
State:       Zustand 5 (theme), useReducer (projects filter)
Forms:       React Hook Form v7 + Zod v4
Styling:     Tailwind CSS 4 (CSS variables via theme.ts)
Build:       babel-plugin-react-compiler (React Compiler enabled)
```

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx           # Root — ThemeProvider wraps RouterProvider
│   ├── Providers.tsx     # Empty placeholder
│   └── Router.tsx        # All routes nested under <Terminal> layout
├── components/
│   ├── ui/               # Button, Input, Card, Badge, Kbd, Textarea
│   ├── layout/           # Terminal, Header, Footer, ConnectionLine
│   ├── shared/           # PageHeader
│   ├── ascii/            # AsciiArt (large ASCII portrait)
│   ├── projects/         # ProjectCard
│   └── about/            # Timeline, TimelineItem, SkillsSection
├── features/
│   ├── theme/            # ThemeContext, themeStore (Zustand), ThemeSwitcher, useTheme
│   ├── projects/         # projectsReducer (TOGGLE_TAG, CLEAR_FILTERS, getFilteredProjects)
│   ├── auth/             # types.ts (empty stub — Phase 6)
│   └── blog/             # types.ts (empty stub — Phase 5)
├── hooks/
│   ├── useKeyboardNav.ts  # Arrow/vim keys, Enter/Space/Esc navigation
│   ├── useTypingEffect.ts # Char-by-char typing animation
│   └── useLocalStorage.ts # localStorage persistence hook
├── pages/
│   ├── HomePage.tsx       # ✅ DONE
│   ├── ProjectsPage.tsx   # ✅ DONE
│   ├── AboutPage.tsx      # ✅ DONE
│   ├── ContactPage.tsx    # ✅ DONE
│   ├── BlogPage.tsx       # STUB — Phase 5
│   ├── BlogPostPage.tsx   # STUB — Phase 5
│   └── NotFound.tsx       # ✅ DONE
├── data/
│   ├── projects.ts        # Real project data (CosmoView, Portfolio, Yahoo/AOL)
│   └── about.ts           # Bio, timeline events, skills array
├── styles/
│   ├── theme.ts           # SINGLE SOURCE OF TRUTH — palettes, fonts, CSS var generators
│   ├── global.css         # Tailwind import + default CSS variables (cyan theme)
│   └── fonts.css          # Default font import; others loaded dynamically
├── lib/
│   ├── cn.ts              # clsx + tailwind-merge utility
│   ├── validation.ts      # Shared Zod schemas (contactSchema, ContactFormData)
│   └── api.ts             # Empty placeholder
├── types/
│   └── index.ts           # Project, Skill, TimelineEvent, SkillCategory, ProjectStatus
└── tests/
    ├── KitchenSink.tsx    # Component playground (imports contactSchema from validation.ts)
    └── ...                # Badge, Input, Kbd, Card test pages
```

---

## Path Aliases (vite.config.ts)

```
@/          → src/
@components → src/components/
@features   → src/features/
@hooks      → src/hooks/
@lib        → src/lib/
@pages      → src/pages/
@styles     → src/styles/
@types      → src/types/
```

---

## Commands

```bash
npm run dev      # Start dev server on localhost:3000 (auto-opens)
npm run build    # tsc -b && vite build (must pass before any PR)
npm run lint     # ESLint across all .ts/.tsx
npm run preview  # Preview production build
```

---

## Conventions

- Named exports, PascalCase component files
- `forwardRef` on all form elements (Textarea uses it; Input uses React 19 ref-as-prop)
- `cn()` for all className merging
- Tailwind classes only — no inline styles
- TypeScript: prefer inference; explicit types only at function boundaries
- Reuse existing UI components from `src/components/ui/`

---

## Theme System

1. `src/styles/theme.ts` — 4 palettes (cyan, matrix, amber, violet), 4 fonts (jetbrains, firacode, ibmplex, spacemono)
2. `generateCSSVariables(palette, font)` → CSS string
3. `applyTheme(paletteName, fontName)` → applies to `document.documentElement`
4. Zustand store (`themeStore.ts`) persists to localStorage under key `theme-store`
5. Tailwind classes map to CSS vars: `text-primary-400`, `bg-background-primary`, `text-text-muted`, etc.
6. **ThemeSwitcher component exists** (`src/features/theme/components/ThemeSwitcher.tsx`) but is **NOT rendered anywhere yet** — Phase 4E.1

---

## Routing

All routes nested under `<Terminal>` layout component:

| Path          | Component       | Status   |
|---------------|-----------------|----------|
| `/`           | HomePage        | ✅ Done  |
| `/projects`   | ProjectsPage    | ✅ Done  |
| `/about`      | AboutPage       | ✅ Done  |
| `/contact`    | ContactPage     | ✅ Done  |
| `/blog`       | BlogPage        | Stub     |
| `/blog/:slug` | BlogPostPage    | Stub     |
| `*`           | NotFoundPage    | ✅ Done  |

Global keyboard shortcuts (in Terminal.tsx):
- `h` → `/`, `p` → `/projects`, `a` → `/about`, `b` → `/blog`, `c` → `/contact`
- `Esc` → navigate back
- Disabled when focus is inside INPUT / TEXTAREA / contentEditable

---

## Completed Work

### Phase 1–3 (Pre-existing)
- Vite + React 19 + TypeScript strict setup
- All UI primitives: Button (3 variants, 3 sizes), Input, Card (compound), Badge, Kbd
- Terminal layout: Header (macOS traffic lights), Footer (keyboard hints), ConnectionLine ("last login"), scanline CRT overlay
- Theme system: 4 palettes, 4 fonts, Zustand store, CSS variable switching
- Custom hooks: useTypingEffect, useKeyboardNav, useLocalStorage
- HomePage fully built: ASCII name banner, ASCII portrait, typing effect, keyboard nav buttons

### Phase 4A — Cleanup & Foundation ✅
- Deleted dead CSS files (`App.css`, `index.css` — neither was imported)
- Fixed 6 pre-existing TypeScript build errors (unused imports, Timeout types, import extension)
- `src/types/index.ts` — `Project`, `Skill`, `TimelineEvent`, `TimelineEventType`, `SkillCategory`, `ProjectStatus`
- `src/lib/validation.ts` — `contactSchema` (Zod), `ContactFormData` (z.infer)
- KitchenSink updated to import schema from shared location
- `src/data/projects.ts` — 3 real projects: CosmoView, Terminal Portfolio, Yahoo/AOL
- `src/data/about.ts` — bio string, timeline array, skills array

### Phase 4B — Projects Page ✅
- `src/components/projects/ProjectCard.tsx` — Card (interactive), Badge (tags), Button (links), status indicator
- `src/features/projects/projectsReducer.ts` — `TOGGLE_TAG`, `CLEAR_FILTERS` actions; `getFilteredProjects()`, `getUniqueTags()` helpers
- `src/pages/ProjectsPage.tsx` — useReducer wired up, tag filter bar (Badge toggles), project count, empty state, responsive 2-col grid

### Phase 4C — About Page ✅
- `src/components/about/Timeline.tsx` — compound components (Timeline + TimelineItem), color-coded by type, vertical connector line
- `src/components/about/SkillsSection.tsx` — skills grouped by category via reduce, ASCII proficiency bars `[████░░]`
- `src/pages/AboutPage.tsx` — bio (cat about.txt style), timeline (git log style), skills (ls style)

### Phase 4D — Contact Page ✅
- `src/components/ui/Textarea.tsx` — forwardRef, error prop, aria attributes, matches Input styling
- `src/pages/ContactPage.tsx` — React Hook Form + Zod (shared contactSchema), 3 fields (name, email, message), 800ms simulated submit, terminal-style success state

---

## Remaining Work

### Phase 4E — UX Polish (NOT STARTED)

#### 4E.1 — ThemeSwitcher in Header
- Add `<ThemeSwitcher>` to `src/components/layout/Header.tsx`
- Currently: two plain `<select>` dropdowns. Should be restyled to fit the terminal title bar.
- Decision made: render in the Header bar (right side, balanced against traffic lights)

#### 4E.2 — Page-Contextual Footer Hints
- `src/components/layout/Footer.tsx` already accepts an optional `hints` prop
- `src/components/layout/Terminal.tsx` needs to compute and pass hints based on `location.pathname`
- Per-page hints planned:
  - `/` → `[↑↓] navigate  [enter] select  [h/p/a/b/c] jump`
  - `/projects` → `[esc] back  [h] home  tags are clickable`
  - `/contact` → `[esc] back  [tab] next field`
  - `/blog` → `[esc] back  [↑↓] browse posts`

#### 4E.3 — Mobile Experience Audit
- HomePage: ASCII portrait is `hidden lg:block` — nothing replaces it on mobile. Needs a decision/fix.
- Footer: keyboard hints are irrelevant on touch — should be hidden or replaced on mobile.
- All pages: verify scroll, touch targets (44×44px minimum).

#### 4E.4 — Loading / Transition States
- Create `src/components/shared/PageTransition.tsx` — terminal-style loading indicator between routes
- Use `useNavigation()` from React Router for navigation state
- Wrap `<Outlet>` in Terminal.tsx with Suspense + lazy if needed

---

### Phase 5 — Blog System (NOT STARTED)

#### 5.1 — Blog Types & Sample Data
- Populate `src/features/blog/types.ts` with `BlogPost`, `BlogMeta`
- Create `src/data/blog-posts.ts` with 2–3 sample posts

#### 5.2 — BlogPage (Post List)
- Replace stub in `src/pages/BlogPage.tsx`
- Posts sorted newest-first, file-listing terminal aesthetic

#### 5.3 — BlogPostPage (Single Post)
- Replace stub in `src/pages/BlogPostPage.tsx`
- Read slug from useParams, look up in data, handle missing slugs

#### 5.4 — Stretch: MDX, TanStack Query, React.lazy + Suspense

---

### Phase 6 — Auth (Optional, not planned yet)

---

## Data Reference

### projects.ts entries
1. **CosmoView** — Full-stack NASA exploration platform. React 19 + TanStack Query + Express. Live: https://cosmo-view.vercel.app, GitHub: https://github.com/AnujGajbhiye2/CosmoView
2. **Terminal Portfolio** — This site. status: in-progress
3. **Yahoo / AOL** — Ad platform frontend work. No URLs (proprietary).

### about.ts
- Bio: 4-line string (Dublin, Yahoo/AOL background, job search)
- Timeline: Yahoo/AOL (2019–2024, work), DevMarket (2024, project), Portfolio (2025, project)
  - ⚠️ NOTE: DevMarket timeline entry should be replaced with CosmoView — carried over from old data, not yet updated
- Skills: 14 entries across language / framework / tool / platform, proficiency 1–5

---

## Key Files for Next Agent

| Priority | File | Why |
|----------|------|-----|
| 🔴 High | `src/components/layout/Header.tsx` | Add ThemeSwitcher (4E.1) |
| 🔴 High | `src/components/layout/Terminal.tsx` | Pass contextual hints to Footer (4E.2) |
| 🟡 Med  | `src/data/about.ts` | Fix DevMarket→CosmoView in timeline |
| 🟡 Med  | `src/pages/BlogPage.tsx` | Replace stub (Phase 5) |
| 🟡 Med  | `src/pages/BlogPostPage.tsx` | Replace stub (Phase 5) |
| 🟢 Low  | `src/features/blog/types.ts` | Populate for Phase 5 |

---

## Known Issues / Tech Debt

- `src/data/about.ts` timeline still references DevMarket — should be replaced with CosmoView
- `src/features/theme/constants.ts` is empty — either populate or delete
- `src/lib/api.ts` is empty — placeholder for Phase 5 blog fetching
- `src/app/Providers.tsx` is empty — kept as placeholder, can be deleted
- `src/features/auth/types.ts` is empty — Phase 6 only, no urgency
