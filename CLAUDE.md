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

Single-page portfolio on **Next.js 16 (App Router)**, **React 19**, **TypeScript**. It is a port of a hand-written static site (`../index.html`, `../css/styles.css`, `../js/*.js`) and must render identically to it.

- `app/page.tsx`: a server component that composes the page from `components/site/*`, then renders `<Experience />` last.
- `components/site/`: one file per part of the original `index.html` body (sprite, loader, rooms, dock, menu, scene (hero + 01 About), skills, projects, experience (`ExperienceChapter`), resume, contact, footer, case-studies, hello, cursor, toast). This is plain server-rendered markup with no state or handlers. Classes, ids, `data-*`, `aria-*` and whitespace between inline elements (`{" "}`) mirror the static HTML exactly. The behaviour code looks elements up by those attributes, so keep them in step. Images are plain `<img>`/`<video>` (not `next/image`), with root-absolute paths (`/assets/...`, `/resume.pdf`), including paths in `data-src`.
- `components/experience.tsx` (`"use client"`): starts the behaviour in `lib/experience/*` (a port of `js/main.js` + `js/rooms.js`: GSAP, ScrollTrigger, Lenis) in a `useEffect`.
- `app/layout.tsx`: metadata/viewport through the Metadata API, preloads through `react-dom`'s `preload()`, the pre-paint inline script (adds `js`/`motion`/`is-loading`/`is-entered` classes to `<html>`, hence `suppressHydrationWarning`) and the JSON-LD.
- `app/robots.ts` and `app/sitemap.ts` mirror the static `robots.txt` / `sitemap.xml`.

### Styling

`app/globals.css` is the static design's `styles.css` verbatim, with only its `url()`s made root-absolute. **There is no Tailwind on the page.** Do not add `@import "tailwindcss"`, because its preflight would change the design. `postcss.config.mjs` still lists `@tailwindcss/postcss`, which does nothing without the import. The font (Jost) is self-hosted at `public/fonts/jost.woff2`.

`components/ui/` and `hooks/` hold leftover shadcn/ui primitives that the page doesn't use. Treat them as third-party.
