'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface SpaceshipProps {
  position?: [number, number, number]
  scale?: number
}

export function Spaceship({ position = [-3.5, 0.5, 0], scale = 0.9 }: SpaceshipProps) {
  const groupRef = useRef<THREE.Group>(null)
  const engineLightRef1 = useRef<THREE.PointLight>(null)
  const engineLightRef2 = useRef<THREE.PointLight>(null)

  // Floating and swaying animation in the useFrame loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      // Hovering vertical float (sine wave)
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.18
      
      // Gentle horizontal drift
      groupRef.current.position.x = position[0] + Math.cos(t * 0.5) * 0.08

      // Gentle pitch (rotation around X) and roll (rotation around Z) based on floating
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.03
      groupRef.current.rotation.z = Math.cos(t * 0.8) * 0.05 - 0.05
      
      // Yaw adjustment (slowly face slightly more or less towards center)
      groupRef.current.rotation.y = Math.PI / 4 + Math.sin(t * 0.3) * 0.04
    }

    // Engine thrust flicker animation
    const flicker1 = Math.sin(t * 25) * 0.6 + Math.cos(t * 40) * 0.3
    const flicker2 = Math.cos(t * 22) * 0.6 + Math.sin(t * 35) * 0.3
    if (engineLightRef1.current) {
      engineLightRef1.current.intensity = 4.0 + flicker1
    }
    if (engineLightRef2.current) {
      engineLightRef2.current.intensity = 4.0 + flicker2
    }
  })

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]} rotation={[0, Math.PI / 4, 0]}>
      {/* Central Fuselage (Main Body) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.2, 2.0, 8]} />
        <meshStandardMaterial
          color="#0b1020"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Cockpit Canopy */}
      <mesh position={[0, 0.1, 0.3]} castShadow>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Nose Cone */}
      <mesh position={[0, 0, -1.05]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.5, 8]} />
        <meshStandardMaterial
          color="#101828"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Left Wing */}
      <group position={[-0.7, -0.05, 0.2]} rotation={[0, 0, -0.08]}>
        {/* Main Wing Panel */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.03, 0.5]} />
          <meshStandardMaterial
            color="#0b1020"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Wing Tip Extension */}
        <mesh position={[-0.6, 0.05, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.3]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Laser Gun / Wingtip Light */}
        <mesh position={[-0.7, 0.05, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 4]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* Right Wing */}
      <group position={[0.7, -0.05, 0.2]} rotation={[0, 0, 0.08]}>
        {/* Main Wing Panel */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.03, 0.5]} />
          <meshStandardMaterial
            color="#0b1020"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Wing Tip Extension */}
        <mesh position={[0.6, 0.05, 0.1]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.3]} />
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Laser Gun / Wingtip Light */}
        <mesh position={[0.7, 0.05, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 4]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={2}
          />
        </mesh>
      </group>

      {/* Vertical Tail Stabilizer */}
      <mesh position={[0, 0.3, 0.8]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.03, 0.5, 0.3]} />
        <meshStandardMaterial
          color="#05070f"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Engines & Thrusters (At the rear: y-axis of cylinder is vertical, so we rotate around X) */}
      
      {/* Left Thruster Port */}
      <group position={[-0.15, 0, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#101828" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Thruster Flame/Glow */}
        <mesh position={[0, -0.16, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
        {/* Light emission */}
        <pointLight ref={engineLightRef1} color="#22d3ee" distance={2.5} intensity={4} position={[0, -0.3, 0]} />
      </group>

      {/* Right Thruster Port */}
      <group position={[0.15, 0, 1.0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#101828" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Thruster Flame/Glow */}
        <mesh position={[0, -0.16, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#22d3ee" />
        </mesh>
        {/* Light emission */}
        <pointLight ref={engineLightRef2} color="#22d3ee" distance={2.5} intensity={4} position={[0, -0.3, 0]} />
      </group>
      
      {/* Central Booster Core (Underbody engine block) */}
      <mesh position={[0, -0.08, 0.7]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.16, 0.4, 0.12]} />
        <meshStandardMaterial color="#0b1020" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
