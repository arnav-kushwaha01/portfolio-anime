export type AppRoute = {
  label: string
  href: string
  description: string
}

export const appRoutes = [
  {
    label: 'Home',
    href: '/',
    description: 'Single-page portfolio journey.',
  },
  {
    label: 'Project Detail',
    href: '/projects/[slug]',
    description: 'Future project case-study route.',
  },
  {
    label: 'Research',
    href: '/research',
    description: 'Future research archive route.',
  },
  {
    label: 'Resume',
    href: '/resume',
    description: 'Future resume route.',
  },
] satisfies AppRoute[]
