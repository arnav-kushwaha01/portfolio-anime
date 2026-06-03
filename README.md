# Arnav Kushwaha Portfolio

Production-ready architecture for a premium 3D portfolio website.

## Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Drei
- Framer Motion
- GSAP

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run start
```

## Architecture

```text
src/
  app/             Next.js App Router layouts, route groups, pages, loading states
  assets/          Code-imported icons, images, fonts, models, and textures
  components/      Reusable shell, navigation, feedback, UI, and 3D bridge components
  config/          Site metadata, routes, and navigation
  data/            Typed portfolio content from PROJECT_CONTEXT.md
  features/        Animation and Three.js feature systems
  hooks/           Shared React hooks
  lib/             Utilities and constants
  sections/        Page section entrypoints
  styles/          Tailwind and global design tokens
  types/           Shared TypeScript models

public/
  assets/          Deployable images, models, textures, fonts, documents
  RESUME.pdf       Static resume asset
```

The current state intentionally avoids UI implementation. It establishes the production folder structure, data contracts, route model, animation boundaries, 3D boundaries, and deployment configuration for the next build phase.
