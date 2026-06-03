'use client'

import type { ReactNode } from 'react'
import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThreeStage } from '@/components/three/ThreeStage'
import { Navbar } from '@/components/navigation/Navbar'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Stable callback reference so LoadingScreen's useEffect doesn't reset
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  // Safety net: force-dismiss loading screen after 4 seconds no matter what
  useEffect(() => {
    const safety = setTimeout(() => {
      setIsLoading(false)
    }, 4000)
    return () => clearTimeout(safety)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white selection:bg-manga-red selection:text-white">
      {/* Manga loading screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="manga-loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* 3D fixed canvas backdrop */}
      <div className="fixed inset-0 z-0 h-full w-full pointer-events-none">
        <ThreeStage />
      </div>

      {/* Halftone Printing Screen Tone Overlay */}
      <div className="fixed inset-0 z-[1] halftone-bg pointer-events-none opacity-30" />
      
      {/* Floating Navigation System */}
      <Navbar />

      <main className="relative z-10 w-full">{children}</main>
    </div>
  )
}
