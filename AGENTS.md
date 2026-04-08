# Repository Guidelines

## Project Structure & Module Organization
This repository is a React 19 + TypeScript + Vite portfolio app with a terminal-style UI. Application code lives in `src/`. Use `src/app/` for app wiring and routing, `src/pages/` for route screens, `src/components/` for reusable UI and layout pieces, `src/features/` for feature-scoped state and types, `src/data/` for static content, `src/hooks/` for custom hooks, and `src/styles/` for theme tokens and global CSS. Public assets live in `public/`, and helper scripts live in `scripts/`.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server on port `3000`.
- `npm run build`: run TypeScript project builds with `tsc -b`, then create the production bundle.
- `npm run lint`: run ESLint across the repo.
- `npm run preview`: serve the built app locally for a production-style check.

Run `npm install` first if dependencies are not present.

## Coding Style & Naming Conventions
Use TypeScript with React function components and named exports where practical. Keep component files in PascalCase, hooks in camelCase with a `use` prefix, and route pages in `src/pages/`. Prefer existing path aliases such as `@/`, `@components`, and `@features` over long relative imports. Styling should stay in Tailwind utilities and theme variables from [`src/styles/theme.ts`](/Users/anujgajbhiye/Projects/anuj-portfolio/src/styles/theme.ts); avoid inline styles. ESLint is the active style gate. The codebase currently mixes indentation styles, so match the surrounding file and avoid large-format-only diffs.

## Testing Guidelines
There is no automated test runner configured yet. Treat `npm run build` and `npm run lint` as the minimum pre-PR checks. Use the playground files under `src/tests/` for manual component verification, and note manual test coverage in your PR for UI changes.

## Commit & Pull Request Guidelines
Git history is minimal (`init`), so follow a simple convention: short, imperative commit subjects such as `add blog page stub` or `refine theme switcher layout`. Keep commits focused. Pull requests should include a clear summary, affected routes or components, screenshots or short recordings for visual changes, and links to any related issue or task. Call out manual verification steps explicitly.

## Architecture Notes
Routes are defined in [`src/app/Router.tsx`](/Users/anujgajbhiye/Projects/anuj-portfolio/src/app/Router.tsx) and rendered inside the shared `Terminal` layout. Theme tokens are centralized in [`src/styles/theme.ts`](/Users/anujgajbhiye/Projects/anuj-portfolio/src/styles/theme.ts); update that file first when changing colors, fonts, or theme behavior.
