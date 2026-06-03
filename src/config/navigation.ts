export type NavigationItem = {
  label: string
  href: `#${string}`
}

export const navigationItems = [
  { label: 'Hero', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
] satisfies NavigationItem[]
