import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { AppProviders } from '@/app/providers/AppProviders'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.owner}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.owner }],
}

export const viewport: Viewport = {
  themeColor: '#05070f',
  colorScheme: 'dark',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
