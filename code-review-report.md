# 🔍 Code Quality Report

**Project:** anuj-portfolio  
**Files reviewed:** ~45 source files (components, hooks, features, pages, lib, styles, types)  
**Stack:** React 19 + Vite + TypeScript (strict) + Tailwind CSS + Zustand + TanStack Query + React Router v7  
**Date:** 2026-04-14

---

## Scorecard

| Dimension | Score | Grade |
|-----------|-------|-------|
| Component Reuse | 9/10 | 🟢 |
| Folder Structure | 9/10 | 🟢 |
| TypeScript Strictness | 7/10 | 🟡 |
| Code Cleanliness | 8/10 | 🟢 |
| Logic Duplication | 7/10 | 🟡 |
| Formatting Consistency | 7/10 | 🟡 |
| **Overall** | **7.8/10** | |

🟢 8–10  🟡 5–7  🔴 0–4

---

## Prioritised Issues

### P1 — Fix Now

**Logic Duplication — Theme CSS application duplicated in two places**
> `src/features/theme/store/themeStore.ts` and `src/components/...ThemeContext.tsx`  
> Both files independently iterate over CSS variable strings and call `root.style.setProperty`. If one changes without the other they will diverge silently. Extract to a single helper in `src/styles/theme.ts` (which already owns the theme tokens) and import it in both places.

```typescript
// src/styles/theme.ts — add this
export function applyThemeCSSVariables(cssString: string): void {
  const root = document.documentElement;
  cssString.split(';').forEach((rule) => {
    const [property, value] = rule.split(':').map((s) => s.trim());
    if (property && value) root.style.setProperty(property, value);
  });
}
```

**TypeScript Strictness — Loose types in themeStore**
> `src/features/theme/store/themeStore.ts`  
> `palette` and `font` are typed as `string` instead of `PaletteName` and `FontName`. This means the store accepts any string silently, and downstream callers must cast (`palette as PaletteName`). Tighten the store type — the union types already exist in `theme.ts`.

```typescript
// Before
type ThemeStore = { palette: string; font: string; ... }
// After
type ThemeStore = { palette: PaletteName; font: FontName; ... }
```

**Logic Duplication — Unused Zustand store shadowing ThemeContext**
> `src/features/theme/store/themeStore.ts`  
> This Zustand store is not imported anywhere in the app — `ThemeContext.tsx` handles all theme state. The orphaned store is a maintenance trap: a future developer might wire it up thinking it's the source of truth and create a split-brain bug. Delete it or replace `ThemeContext` with it — don't keep both.

---

### P2 — Fix Soon

**Logic Duplication — `formatDate()` defined separately in four files**
> `src/pages/BlogPage.tsx`, `src/pages/BlogPostPage.tsx`, `src/pages/admin/ContactsTab.tsx`, `src/pages/admin/AnalyticsTab.tsx`  
> Each file defines its own `formatDate(iso)` function. A locale mismatch or format change requires four edits. Centralise to `src/lib/format.ts` and import everywhere.

```typescript
// src/lib/format.ts
export function formatDate(iso: string | null, locale = 'en-IE'): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
```

**TypeScript Strictness — Non-null assertion without guard context**
> `src/pages/BlogPostPage.tsx`  
> `data!.post` is used after a conditional render that hides the component when data is absent — which makes the assertion safe in practice, but it's invisible to the type checker and to future readers who reorder the JSX. Use a local variable with a type guard instead:

```typescript
// Before
<ArticleBody blocks={data!.post.content} />
// After
const post = data?.post;
if (!post) return null;
<ArticleBody blocks={post.content} />
```

**Code Cleanliness — `BlogsTab.tsx` exceeds single-responsibility at ~450 lines**
> `src/pages/admin/BlogsTab.tsx`  
> The file owns list-fetch, row selection, form state, image upload, and submission in one component. This is manageable now but will become hard to change. Consider splitting form logic into a `<BlogEditor />` sub-component that accepts `initialValues` — the tab then just toggles between list view and editor.

**Formatting Consistency — No `.prettierrc` means formatting relies on convention**
> Project root  
> ESLint is configured but Prettier is not. Minor inconsistencies exist: some files use 4-space indentation in block comments (`src/styles/theme.ts`), `// ─────` dividers appear only in admin tabs, and comment style varies (inline `//` vs `/* */` blocks). Add a minimal `.prettierrc` to lock the style and run `prettier --write src/**` once.

```json
{ "semi": true, "singleQuote": true, "trailingComma": "es5", "tabWidth": 2 }
```

---

### P3 — Nice to Have

**Code Cleanliness — `// ─────` section dividers used inconsistently**
> `src/pages/admin/BlogsTab.tsx`, `src/pages/admin/ContactsTab.tsx`  
> Section dividers using box-drawing characters appear only in some admin files, not others. Prefer grouping with blank lines and comments like `// — List view` instead. Doesn't affect correctness but adds visual noise that editors don't syntax-highlight.

**Component Reuse — No React error boundary wrapping admin tabs**
> `src/pages/admin/`  
> A runtime error in any admin tab will crash the whole page. Wrapping the tab outlet with a simple `<ErrorBoundary>` prevents this. React 19's `use()` hook and built-in error boundary support make this straightforward to add.

**TypeScript Strictness — `Input` component manages `ref` manually instead of `forwardRef`**
> `src/components/ui/Input.tsx` line ~12  
> `ref?: React.Ref<HTMLInputElement>` is declared as a regular prop. This works but bypasses the standard `forwardRef` idiom — consumers accessing the ref via `React.createRef()` or `useRef()` will not get IDE autocomplete on the ref type. CLAUDE.md already mandates `forwardRef` on all form elements; this is the one gap.

---

## Inline Suggestions

### `src/features/theme/store/themeStore.ts`
- **Lines 1–end** — TypeScript Strictness: Replace `palette: string` and `font: string` with `palette: PaletteName` and `font: FontName`. Import those union types from `src/styles/theme.ts`. Eliminates downstream casts.
- **Lines 1–end** — Logic Duplication: The CSS variable application loop is a copy of the same logic in ThemeContext. Extract to `applyThemeCSSVariables()` in `src/styles/theme.ts`.

### `src/pages/BlogPostPage.tsx`
- **`data!.post` usage** — TypeScript Strictness: Replace non-null assertion with a local `const post = data?.post; if (!post) return null;` guard before the JSX block.

### `src/pages/BlogPage.tsx`
- **`formatDate` function** — Logic Duplication: Move to `src/lib/format.ts` and import. Same applies to `ContactsTab.tsx`, `AnalyticsTab.tsx`, and `BlogPostPage.tsx`.

### `src/components/ui/Input.tsx`
- **ref prop** — TypeScript Strictness / Convention: Wrap with `React.forwardRef<HTMLInputElement, InputProps>` to match CLAUDE.md convention and other form components.

### `src/pages/admin/BlogsTab.tsx`
- **Lines 1–~450** — Code Cleanliness: File mixes fetch, form, upload and submission. Extract the editor form section (blog creation/edit form) into `src/components/blog/BlogEditor.tsx`, keeping `BlogsTab` as the list + routing controller only.

---

## What's Working Well

- **Adapter pattern for auth** (`src/features/auth/`) — `AuthAdapter` interface with a `backendAdapter` implementation makes swapping auth providers a one-file change. This is a genuinely advanced pattern for a portfolio project.
- **useReducer + pure helpers for project filtering** — `src/features/projects/` uses a discriminated union action type, a pure `projectsReducer`, and a separate `getFilteredProjects()` helper. Logic is fully testable without rendering anything.
- **Zod → TypeScript type derivation for forms** — `src/lib/validation.ts` defines schemas once; `z.infer<typeof contactSchema>` gives typed form data for free. No type duplication between validation and component props.
- **Compound component pattern in UI layer** — `Card`, `Timeline`, and `Selector` all export sub-components (CardHeader, CardContent, TimelineItem) that compose cleanly without prop-drilling.
- **No `any` types anywhere detected** — Strict TypeScript throughout; generics are used correctly in `apiFetch<T>` and `useLocalStorage<T>`.

---

## Top 3 Recommendations

1. **Delete or adopt the Zustand theme store** — The unused `themeStore.ts` is the highest-risk dead code in the project. It won't cause a bug today, but it will confuse the next developer (or future-you) who finds it and assumes it's active. If `ThemeContext` is the chosen approach, delete the store entirely. If you want Zustand, migrate and remove the context. Either is fine; both active is not.

2. **Centralise `formatDate` and other small utilities into `src/lib/format.ts`** — This is a low-effort, high-leverage change. One locale change or format tweak currently requires edits in four files. A shared utility also gives you a natural place to add `formatRelativeTime`, `formatReadingTime`, etc., as the blog grows.

3. **Add `.prettierrc` and run a one-time format pass** — Without Prettier, formatting correctness depends entirely on developer discipline. Adding the config file (5 lines) + running `prettier --write "src/**/*.{ts,tsx}"` once will normalise indentation, quote style, and trailing commas across the whole codebase. Future PRs and AI-assisted edits will then stay consistent automatically.

---

## 💼 Interview Talking Points

1. **Adapter pattern for swappable backends** — "I used the adapter pattern in my auth layer — I defined an `AuthAdapter` interface and a concrete `backendAdapter` that hits my Express API. Swapping to a third-party auth provider like Auth0 would only require writing a new adapter that satisfies the same interface. This decouples the React app from the auth implementation detail."

2. **useReducer with discriminated union actions for complex UI state** — "For my projects filter page I moved filter state into a `useReducer` instead of multiple `useState` calls. The action type is a discriminated union (`SET_TAG | TOGGLE_OPEN_SOURCE | RESET`), the reducer is a pure function, and I extracted `getFilteredProjects()` into its own helper. This means the filtering logic is fully unit-testable without mounting any React component."

3. **CSS custom properties as a runtime theme system** — "My theme system works by generating a CSS variable string from TypeScript token objects at runtime and writing those variables to `document.documentElement`. Tailwind is then configured to read those variables (`text-primary: var(--color-primary)`) so every utility class automatically tracks the active theme. Theme switches are instant — no full re-render, no flash."
