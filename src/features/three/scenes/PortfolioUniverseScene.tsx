'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { SamuraiCoder } from '@/features/three/objects/SamuraiCoder'

export function PortfolioUniverseScene() {
  const { viewport } = useThree()
  const dustRef = useRef<THREE.Points>(null)

  // Determine if we are on a smaller screen (tablet / mobile)
  const isMobile = viewport.width < 9.5

  // Generate random space dust particles
  const dustCount = 250
  const dustPositions = useMemo(() => {
    // Deterministic seeded random number generator to ensure purity in render path
    let seed = 42
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }

    const arr = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount * 3; i += 3) {
      arr[i] = (random() - 0.5) * 25 // X
      arr[i + 1] = (random() - 0.5) * 18 // Y
      arr[i + 2] = (random() - 0.5) * 15 // Z
    }
    return arr
  }, [])

  // Animation frame loop: handles camera entrance, camera parallax, and dust drift
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const { pointer, camera } = state

    // 1. Dust drift animation
    if (dustRef.current) {
      dustRef.current.rotation.y = t * 0.015
      dustRef.current.rotation.x = t * 0.008
    }

    // 2. Camera entrance + mouse parallax interpolation
    // If we've just mounted, the camera starts at Z = 15 (defined in SceneCanvas)
    // We want to glide it to Z = defaultZ (8.5 on desktop, 10.5 on mobile)
    const targetZ = isMobile ? 11.5 : 8.5
    
    // Parallax intensities (larger scale = more camera movement)
    const parallaxX = pointer.x * (isMobile ? 1.0 : 1.8)
    const parallaxY = pointer.y * (isMobile ? 0.8 : 1.2)

    // Lerp camera position towards the parallax target
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, parallaxX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, parallaxY, 0.04)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03) // slower zoom-in

    // Ensure the camera always looks at the center of our universe
    camera.lookAt(0, 0, 0)
  })

  // Responsive position and scale for the Samurai Coder duel
  const samuraiPos: [number, number, number] = isMobile ? [0, -1.8, 0] : [3.0, -0.3, 0]
  const samuraiScale = isMobile ? 1.0 : 1.55

  return (
    <>
      {/* Background space fog to smoothly fade items in the distance */}
      <fog attach="fog" args={['#000000', 5, 28]} />

      {/* Ambient Cosmic Light (base exposure) */}
      <ambientLight intensity={0.35} />

      {/* Main Key Light - High contrast pure white */}
      <directionalLight
        position={[8, 5, 5]}
        intensity={3.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Fill Light - Dark charcoal light for deep shadows */}
      <directionalLight
        position={[-6, -4, -3]}
        intensity={1.5}
        color="#262626"
      />

      {/* Backlight / Rim Light - Vibrant manga red plasma outline */}
      <directionalLight
        position={[0, 4, -8]}
        intensity={3.0}
        color="#ff2d2d"
      />

      {/* 3D Objects */}
      <SamuraiCoder position={samuraiPos} scale={samuraiScale} />

      {/* Far Background Stars */}
      <Stars
        radius={120}
        depth={60}
        count={2000}
        factor={4}
        saturation={0.0}
        fade
        speed={0.8}
      />

      {/* Close-up drifting red manga speed dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ff2d2d"
          size={0.06}
          sizeAttenuation
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

