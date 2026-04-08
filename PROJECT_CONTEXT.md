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

### Phase 7 — Portfolio Refresh & Governance (APPROVED, NOT STARTED)

#### Summary
- Refresh the site around three goals:
  - make the homepage feel substantial and credible
  - update the content to reflect the resume
  - make navigation visible from every route
- Add a public `/lab` route for site internals and component demos
- Use `react-icons` selectively
- Standardize pointer affordance across interactive UI

#### Terminal-First Guardrail
- Upcoming UI changes must preserve the terminal-shell visual language
- Navigation, icons, denser content, and new route surfaces should still feel like terminal affordances
- Do **not** drift into a generic SaaS dashboard, card-grid portfolio template, or conventional marketing-site look
- Keep the shell/CLI metaphor intact in layout, copy, and interaction patterns

#### Approval Workflow (MANDATORY)
- Before changing any section or route content/UI, present the proposed section changes first
- Do **not** edit that section until explicit approval is given
- Approvals are section-scoped, not global
- Approval buckets:
  - `home`
  - `about`
  - `projects`
  - `blog`
  - `contact`
  - `lab`
  - `global navigation / header / footer`
- `PROJECT_CONTEXT.md` is the standing reference for both roadmap and approval process

#### Planned Work

##### 7.1 — Homepage Redesign
- Replace the sparse home layout with a hero plus credibility section
- Replace the current tagline with a professional product-focused line based on the resume
- Keep the ASCII identity, but use the space for:
  - quick facts: Dublin, 5+ years, Yahoo/AOL, UCD MSc, Stamp 4
  - featured stack / credibility strip
  - clearer route cards for Projects, About, Blog, Contact, and Lab
  - external links for GitHub, LinkedIn, email, and resume-style profile presence

##### 7.2 — Resume-Driven Content Update
- Update `about` content to match the resume:
  - stronger summary
  - Yahoo/AOL experience depth
  - ValueLabs migration/testing work
  - UCD education
  - stronger skills/tooling coverage
- Add an experience-focused surface instead of overloading the current short bio
- Keep the projects page portfolio-focused, but refine descriptions to match the resume tone and impact
- Add contact/profile shortcuts that reflect resume links and work authorization

##### 7.3 — Navigation Overhaul
- Introduce persistent header navigation on every route
- Keep keyboard shortcuts as a secondary affordance
- Make navigation discoverable via visible nav plus a compact shortcuts/help treatment
- Add `/lab` as a public route and include it in header navigation
- Keep `/admin` out of the public primary nav unless requested later

##### 7.4 — Lab Route
- Add a public `/lab` route built around site internals
- Use existing KitchenSink and test/demo surfaces as the base
- Reorganize them into a coherent lab page that explains:
  - UI primitives
  - forms / validation
  - keyboard navigation
  - theme system
  - in-progress experiments
- Rename the route/surface from kitchen sink to lab in user-facing UI

##### 7.5 — Icons
- Add `react-icons` and use it selectively, not decoratively
- Packs:
  - `react-icons/ri` for nav, metadata, route cards, project actions, lab sections
  - `react-icons/hi2` for utility/form/system icons
  - `react-icons/si` only for brand and tech logos
- Apply icons in:
  - header nav items
  - homepage quick facts and route cards
  - about summary cards and timeline type markers
  - project action buttons and filter label
  - contact shortcuts and field adornments
  - blog list/detail metadata
  - lab section headings
- Do **not**:
  - add icons inside the ASCII art
  - replace `Kbd` tokens with icons
  - add per-skill-row icons

##### 7.6 — Pointer Affordance
- Ensure all clickable buttons, links, interactive cards, icon buttons, and tag/filter controls visibly use `cursor-pointer`
- Audit shared primitives first so the fix is inherited broadly rather than patched page-by-page

#### Public Interfaces / Contracts
- Routing:
  - add `/lab` as a new public route
  - add it to persistent header nav and homepage route cards
- Content/data:
  - extend typed data sources instead of hardcoding resume facts directly into page components
  - support quick facts / highlight metrics
  - support richer experience entries
  - support profile/contact links
- Icons:
  - introduce a small icon mapping layer for primary routes so header nav and homepage route cards stay consistent

#### Status Checklist
- `[approved][not started]` homepage redesign
- `[approved][not started]` resume-content refresh
- `[approved][not started]` persistent header navigation
- `[approved][not started]` `/lab` route
- `[approved][not started]` icon pass
- `[approved][not started]` pointer-affordance audit

#### Test Plan
- Run `npm run lint`
- Run `npm run build`
- Verify persistent header nav appears on all public routes and current-page indication is clear
- Verify homepage no longer feels sparse on desktop and mobile, and the new tagline reflects the professional tone
- Verify about/experience content matches resume facts: role history, dates, tech emphasis, education, work authorization, and testing/tooling experience
- Verify `/lab` is reachable from header and homepage, and its sections render the reused demo content cleanly
- Verify icon usage improves scanning without clutter in the no-go areas
- Verify all clickable UI shows pointer affordance

#### Assumptions
- The resume is the source of truth for professional summary, skills emphasis, experience framing, and education
- The refresh adds an experience-focused surface in addition to updating existing pages
- `/lab` is public and positioned as a site-internals page, not a hidden dev-only playground
- Public primary navigation includes Home, Projects, About, Blog, Contact, and Lab
- `react-icons` is acceptable with restrained usage

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
