# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test suite.

## Architecture

Single-page portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Page structure

`app/page.tsx` is a `"use client"` component (required for Framer Motion's `useScroll`/`useSpring`). It renders sections in order: `Navbar → Hero → About → Skills → Projects → Experience → Contact`. A fixed scroll-progress bar sits above everything.

`app/layout.tsx` sets up metadata, three Google Fonts (Inter/Syne/JetBrains Mono), and wraps children in `<Providers>` (ThemeProvider + TooltipProvider + Toaster).

### Component layers

- `components/sections/` — The seven portfolio sections. **Content data (projects, experience entries) is hardcoded inside each section file**, not in a separate data layer.
- `components/` — Feature components: `ContactModal` (dialog with react-hook-form + zod, currently mock submission), `ProjectArchiveModal` (searchable table of all projects), `ModeToggle`, `ThemeProvider`, `Providers`.
- `components/ui/` — shadcn/ui primitives; treat as third-party.
- `lib/utils.ts` — Exports only `cn()` (clsx + tailwind-merge).

### Styling

Tailwind CSS v4 syntax is used: `globals.css` starts with `@import "tailwindcss"` (not `@tailwind` directives). CSS variables for the design system are defined in `:root` / `.dark` blocks in `globals.css`. Custom utility classes (`.text-gradient`, `.glass`, `.glass-card`, `.neo-brutal`, `.text-stroke`) are defined there too.

Font variables: `--font-sans` (Inter), `--font-display` (Syne), `--font-mono` (JetBrains Mono). Use `font-display` for headings, `font-mono` for labels/tags.

The accent color is an electric green (`hsl(142 76% 36%)` light / `hsl(142 70% 50%)` dark). Default theme is light; the `ThemeProvider` stores preference in `localStorage` under key `vite-ui-theme`.

### SEO

`app/sitemap.ts` and `app/robots.ts` generate dynamic sitemap and robots.txt. JSON-LD Person schema is inlined in `page.tsx`. The production URL placeholder is `https://faris-portfolio.vercel.app`.
