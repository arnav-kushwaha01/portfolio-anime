'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { spaceMaterialTokens } from '@/features/three/materials/spaceMaterials'

interface HeroPlanetProps {
  position?: [number, number, number]
  scale?: number
}

export function HeroPlanet({ position = [3.2, -0.2, 0], scale = 1.05 }: HeroPlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const gridRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Group>(null)

  // Standard animation loop for planet components
  useFrame((state, delta) => {
    // Overall subtle floating
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.4) * 0.12
    }

    // Core rotates slowly on Y
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.04
    }

    // Energy wireframe grid rotates slightly faster in the opposite direction
    if (gridRef.current) {
      gridRef.current.rotation.y -= delta * 0.07
      gridRef.current.rotation.x += delta * 0.03
    }

    // Rings rotate on their axis
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.025
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      {/* 1. Main Core Planet Sphere */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          color={spaceMaterialTokens.planetSurface}
          roughness={0.45}
          metalness={0.8}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* 2. Holographic High-Tech Energy Grid (Wireframe Overlay) */}
      <mesh ref={gridRef} scale={1.01}>
        <sphereGeometry args={[1.8, 24, 24]} />
        <meshStandardMaterial
          color={spaceMaterialTokens.atmosphere}
          emissive={spaceMaterialTokens.atmosphere}
          emissiveIntensity={0.65}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* 3. Glowing Atmosphere Outer Shield */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color={spaceMaterialTokens.atmosphere}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 4. Planetary Rings (Tilted) */}
      <group ref={ringRef} rotation={[Math.PI / 2.6, Math.PI / 10, 0]}>
        {/* Soft Glowing Broad Ring */}
        <mesh receiveShadow>
          <ringGeometry args={[2.2, 3.4, 64]} />
          <meshStandardMaterial
            color={spaceMaterialTokens.orbit}
            emissive={spaceMaterialTokens.orbit}
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>

        {/* Sharp High-Intensity Inner Glowing Orbit Path */}
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[2.65, 2.69, 64]} />
          <meshStandardMaterial
            color={spaceMaterialTokens.atmosphere}
            emissive={spaceMaterialTokens.atmosphere}
            emissiveIntensity={1.8}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Localized Glow Light Source (Fills out shadows near the planet) */}
      <pointLight
        color={spaceMaterialTokens.atmosphere}
        intensity={3.5}
        distance={8}
        decay={2.0}
      />
    </group>
  )
}

