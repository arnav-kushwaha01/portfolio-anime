# Project Architecture

## Requirement Analysis

The portfolio is a single primary experience for Arnav Kushwaha with a futuristic space exploration concept. It needs to be SEO-friendly, Vercel-ready, mobile responsive, animation-rich, and performant enough to target Lighthouse scores above 90.

## Framework Decision

Next.js 15 with the App Router is used for production routing, metadata, deployment defaults, and future SEO expansion. Interactive systems such as React Three Fiber, Framer Motion, and GSAP are isolated into client-only feature folders so the rest of the application can remain server-first.

## Route Structure

```text
src/app/
  layout.tsx
  loading.tsx
  not-found.tsx
  (site)/
    layout.tsx
    page.tsx
    projects/[slug]/page.tsx
    research/page.tsx
    resume/page.tsx
```

The home route is the primary portfolio journey. Project, research, and resume routes are reserved for future deeper content without changing the root architecture later.

## Component Structure

```text
src/components/
  feedback/
  layout/
  navigation/
  seo/
  three/
  ui/
```

Global shell components live in `layout`, site movement lives in `navigation`, async states live in `feedback`, WebGL bridge components live in `three`, and future primitives belong in `ui`.

## Section Structure

```text
src/sections/
  hero/
  about/
  skills/
  experience/
  projects/
  research/
  certifications/
  contact/
```

Each section maps to the space journey concept: hero planet, about planet, skills planet, experience tunnel, project galaxy, research station, certification vault, and mission control contact center.

## Data Architecture

```text
src/data/
  profile.ts
  experience.ts
  skills.ts
  projects.ts
  research.ts
  certifications.ts
  contact.ts
  journey.ts
```

Portfolio content is typed and kept outside UI components. This keeps components reusable and makes a future CMS migration straightforward.

## Animation Architecture

```text
src/features/animations/
  framer/
    variants.ts
    transitions.ts
  gsap/
    context.ts
    scroll.ts
    timelines.ts
```

Framer Motion handles component-level state and entrance motion. GSAP is reserved for scroll orchestration and large timeline systems.

## Three.js Architecture

```text
src/features/three/
  canvas/
  config/
  effects/
  hooks/
  loaders/
  materials/
  objects/
  scenes/
```

React Three Fiber and Drei stay inside `features/three`. Canvas setup, scene composition, reusable objects, material tokens, effects, loaders, and performance configuration are separated to keep the WebGL layer maintainable.

## Asset Organization

```text
src/assets/
  fonts/
  icons/
  images/
  models/
  textures/

public/assets/
  documents/
  fonts/
  images/
  models/
  textures/
```

`public/assets` is for static deployed files referenced by URL. `src/assets` is for assets imported by code and bundled by Next.
