'use client'

import { Canvas } from '@react-three/fiber'
import { useState, useEffect, Suspense } from 'react'
import { PortfolioUniverseScene } from '@/features/three/scenes/PortfolioUniverseScene'

export function SceneCanvas() {
  const [mounted, setMounted] = useState(false)

  // Prevent SSR hydration errors by only mounting on client
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(handle)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full bg-black" />
    )
  }

  return (
    <div className="w-full h-full bg-transparent">
      <Canvas
        dpr={[1, 1.5]} // Limit DPR to 1.5 for performance on high-DPI retina displays
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{
          fov: 60,
          near: 0.1,
          far: 1000,
          position: [0, 0, 15], // Start zoomed out for the entrance fly-in
        }}
      >
        <Suspense fallback={null}>
          <PortfolioUniverseScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

