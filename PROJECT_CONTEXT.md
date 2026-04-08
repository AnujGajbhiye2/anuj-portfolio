# CLI Portfolio - Project Context

## Quick Summary

Building a terminal-aesthetic portfolio with React + TypeScript + Vite.

**Reference:** ssh.moriliu.com (terminal/CLI style)

## Tech Stack

```
Core:           React 18, Vite, TypeScript (strict mode)
Routing:        React Router v6 (createBrowserRouter)
State:          Context API + Zustand (learning both)
Forms:          React Hook Form + Zod
Styling:        Tailwind CSS + CSS Variables
```

## Project Structure

```
src/
├── app/
│   ├── App.tsx           # Root with RouterProvider
│   └── Router.tsx        # Route definitions
├── components/
│   ├── ui/               # Button, Input, Card, Badge, Kbd, Cursor
│   └── layout/           # Terminal, Header, Footer
├── features/
│   └── theme/            # ThemeContext or themeStore (Zustand)
├── hooks/
│   ├── useKeyboardNav.ts
│   ├── useTypingEffect.ts
│   └── useLocalStorage.ts
├── styles/
│   ├── theme.ts          # Design tokens (palettes, fonts)
│   ├── globals.css       # CSS variables, base styles
│   └── fonts.css         # Google Fonts imports
├── pages/
│   ├── HomePage.tsx
│   ├── ProjectsPage.tsx
│   ├── BlogPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
└── lib/
    └── cn.ts             # clsx + tailwind-merge utility
```

## Completed Phases

### Phase 1: Foundation ✅
- Vite + React + TypeScript setup
- Strict TypeScript config
- Tailwind with CSS variables
- UI components: Button, Input, Card, Badge, Kbd, Cursor
- cn() utility

### Phase 2: Layout & Navigation ✅
- Terminal wrapper component
- Header with traffic lights
- Footer with keyboard hints
- React Router setup
- useKeyboardNav hook
- Scanline CRT effect

### Phase 3: Theme System ✅
- 4 color palettes (cyan, matrix, amber, violet)
- 4 font options (JetBrains, Fira Code, IBM Plex, Space Mono)
- Context API implementation
- Zustand implementation (alternative)
- localStorage persistence
- ThemeSwitcher component

## Remaining Phases

### Phase 4: Core Pages
- Home with typing effect + ASCII portrait
- Projects with filtering (useReducer)
- About page
- Contact form (already have from Kitchen Sink)

### Phase 5: Blog System
- MDX for posts
- TanStack Query for data fetching
- Lazy loading with React.lazy + Suspense
- Code syntax highlighting

### Phase 6: Auth System (Optional)
- JWT authentication
- Zustand auth store
- Protected routes
- Blog admin

## Key Files Reference

### theme.ts exports:
- `palettes` - 4 color themes
- `fonts` - 4 font stacks  
- `PaletteName` - 'cyan' | 'matrix' | 'amber' | 'violet'
- `FontName` - 'jetbrains' | 'firacode' | 'ibmplex' | 'spacemono'
- `generateCSSVariables()` - converts theme to CSS vars
- `applyTheme()` - applies theme to DOM
- `loadFont()` - loads Google Font

### Component Patterns Used:
- forwardRef for form elements
- Compound components (Card + CardHeader + CardContent)
- Variant objects for styling
- cn() for class merging

## User Context

- Frontend-focused full stack engineer
- Based in Dublin, Ireland
- Previously at Yahoo/AOL
- Building this for job search portfolio
- Wants to learn: useReducer, Context, Zustand, TanStack Query, Zod