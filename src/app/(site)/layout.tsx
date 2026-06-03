import type { ReactNode } from 'react'

import { SiteShell } from '@/components/layout/SiteShell'

type SiteLayoutProps = {
  children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return <SiteShell>{children}</SiteShell>
}
