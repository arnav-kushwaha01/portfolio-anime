'use client'

import type { PropsWithChildren } from 'react'

import { LenisProvider } from '@/features/scroll/LenisProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return <LenisProvider>{children}</LenisProvider>
}
