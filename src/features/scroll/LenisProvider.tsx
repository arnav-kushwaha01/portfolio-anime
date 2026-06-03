'use client'

import { ReactLenis } from 'lenis/react'
import type { PropsWithChildren } from 'react'

export function LenisProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.1,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
