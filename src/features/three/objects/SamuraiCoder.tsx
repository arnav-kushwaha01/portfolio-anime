'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface SamuraiCoderProps {
  position?: [number, number, number]
  scale?: number
}

interface TroikaTextMesh extends THREE.Mesh {
  text: string
  sync: () => void
  material: THREE.Material
}



export function SamuraiCoder({ position = [0, 0, 0], scale = 1.0 }: SamuraiCoderProps) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Model parts refs
  const bodyGroupRef = useRef<THREE.Group>(null)
  const torsoGroupRef = useRef<THREE.Group>(null)
  const headGroupRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const swordRef = useRef<THREE.Group>(null)
  const ribbonLeftRef = useRef<THREE.Mesh>(null)
  const ribbonRightRef = useRef<THREE.Mesh>(null)
  const slashEffectRef = useRef<THREE.Mesh>(null)
  const leftLegRef = useRef<THREE.Mesh>(null)
  const rightLegRef = useRef<THREE.Mesh>(null)

  // Slashing states
  const [isSlashing, setIsSlashing] = useState(false)
  const wasSlashingRef = useRef(false)
  const slashTypeRef = useRef(0)

  // Code targets state (holds current position and assigned skill name)
  const codeTargets = useMemo(() => {
    return [
      { id: 1, x: 5, y: 0.5, z: 0.8, speed: 0.08, slashed: false, splitDir: [0.3, 0.4, -0.2] as [number, number, number], skill: 'React', yOffset: 0.1 },
      { id: 2, x: 8, y: -0.3, z: -0.5, speed: 0.09, slashed: false, splitDir: [-0.2, 0.5, 0.3] as [number, number, number], skill: 'Python', yOffset: 0.075 },
      { id: 3, x: 11, y: 0.8, z: 0.2, speed: 0.07, slashed: false, splitDir: [0.4, -0.4, 0.4] as [number, number, number], skill: 'Node.js', yOffset: 0.0875 },
    ]
  }, [])

  const target1Ref = useRef<THREE.Group>(null)
  const target2Ref = useRef<THREE.Group>(null)
  const target3Ref = useRef<THREE.Group>(null)
  const targetRefs = [target1Ref, target2Ref, target3Ref]

  const text1Ref = useRef<TroikaTextMesh>(null)
  const text2Ref = useRef<TroikaTextMesh>(null)
  const text3Ref = useRef<TroikaTextMesh>(null)
  const textRefs = [text1Ref, text2Ref, text3Ref]

  // Custom Trackball Rotation & Slash Logic
  useEffect(() => {
    let isDragging = false
    let previousMousePosition = { x: 0, y: 0 }
    let dragStartPos = { x: 0, y: 0 }

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true
      previousMousePosition = { x: e.clientX, y: e.clientY }
      dragStartPos = { x: e.clientX, y: e.clientY }
    }

    const handlePointerUp = (e: MouseEvent) => {
      isDragging = false
      
      // Calculate how far the mouse moved
      const dist = Math.hypot(e.clientX - dragStartPos.x, e.clientY - dragStartPos.y)
      
      // If they barely moved the mouse, count it as a CLICK (trigger slash)
      if (dist < 10) {
        setIsSlashing(true)

        codeTargets.forEach((target) => {
          if (target.x > 0.0 && target.x < 3.2 && !target.slashed) {
            target.slashed = true
          }
        })

        setTimeout(() => {
          setIsSlashing(false)
        }, 350)
      }
    }

    const handlePointerMove = (e: MouseEvent) => {
      if (isDragging && groupRef.current) {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y
        }

        // Apply a quaternion rotation for free 360-degree trackball rotation (X, Y, and Z planes)
        const rotationQuaternion = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(
            deltaMove.y * 0.008, // Rotate around X
            deltaMove.x * 0.008, // Rotate around Y
            0,
            'XYZ'
          ))
        
        // Multiply the new rotation onto the current rotation
        groupRef.current.quaternion.premultiply(rotationQuaternion)

        previousMousePosition = { x: e.clientX, y: e.clientY }
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('mousemove', handlePointerMove)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('mousemove', handlePointerMove)
    }
  }, [codeTargets])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()

    // 1. Overall floating bobbing (we add a tiny bobbing motion to the inner body so we don't overwrite the user's manual trackball rotation on groupRef)
    if (bodyGroupRef.current) {
      bodyGroupRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.3
    }

    // 2. Ribbon wind flutter
    if (ribbonLeftRef.current) {
      ribbonLeftRef.current.rotation.z = Math.sin(t * 12) * 0.12
      ribbonLeftRef.current.rotation.y = Math.cos(t * 8) * 0.08
    }
    if (ribbonRightRef.current) {
      ribbonRightRef.current.rotation.z = Math.cos(t * 10) * 0.12
      ribbonRightRef.current.rotation.y = Math.sin(t * 6) * 0.08
    }

    // 3. Slash trigger scanning
    let isTargetInSlashRange = false
    codeTargets.forEach((target) => {
      if (target.x > 0.8 && target.x < 1.8 && !target.slashed) {
        isTargetInSlashRange = true
      }
    })

    const isSlashActive = isTargetInSlashRange || isSlashing

    // Alternate slash direction
    if (isSlashActive && !wasSlashingRef.current) {
      slashTypeRef.current = (slashTypeRef.current + 1) % 3
    }
    wasSlashingRef.current = isSlashActive

    // 4. Full body 3D combat movements
    if (
      bodyGroupRef.current && 
      torsoGroupRef.current && 
      headGroupRef.current && 
      rightArmRef.current && 
      leftArmRef.current && 
      swordRef.current &&
      leftLegRef.current &&
      rightLegRef.current
    ) {
      if (isSlashActive) {
        const progress = Math.sin(t * 22) * 0.7 + 0.4
        const slashType = slashTypeRef.current

        // Lunge forward with a grounded stance
        bodyGroupRef.current.position.x = THREE.MathUtils.lerp(bodyGroupRef.current.position.x, 0.2, 0.3)
        bodyGroupRef.current.position.z = THREE.MathUtils.lerp(bodyGroupRef.current.position.z, 0.25, 0.3)
        bodyGroupRef.current.position.y = THREE.MathUtils.lerp(bodyGroupRef.current.position.y, -0.35, 0.3)

        // Knee bend (realistic wide fighting stance)
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, -Math.PI / 12, 0.3)
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, Math.PI / 15, 0.3)

        // Head tilt (keep eyes locked on target, minimal wild movement)
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, Math.PI / 15, 0.3)
        headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, Math.PI / 20, 0.3)

        // Left arm counter-balance (swings back for stability)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -Math.PI / 6, 0.3)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, Math.PI / 15, 0.3)

        // Arm swing & torso twist (reduced max angle to prevent meshes disconnecting)
        if (slashType === 0) {
          // Downward diagonal strike
          torsoGroupRef.current.rotation.x = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.x, Math.PI / 12, 0.3) 
          torsoGroupRef.current.rotation.y = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.y, -Math.PI / 12, 0.3) 

          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, Math.PI / 3 + progress * 0.4, 0.4)
          rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, Math.PI / 8, 0.4)
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -Math.PI / 12, 0.4)
          
          swordRef.current.rotation.x = THREE.MathUtils.lerp(swordRef.current.rotation.x, -Math.PI / 4, 0.4)

          if (slashEffectRef.current) {
            slashEffectRef.current.rotation.set(0.1, -Math.PI / 4, Math.PI / 5)
            slashEffectRef.current.position.set(0.6, 0.1, 0.3)
          }
        } 
        else if (slashType === 1) {
          // Horizontal side slash
          torsoGroupRef.current.rotation.x = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.x, Math.PI / 15, 0.3)
          torsoGroupRef.current.rotation.y = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.y, Math.PI / 15, 0.3)

          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, Math.PI / 8, 0.4)
          rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -Math.PI / 3 - progress * 0.5, 0.4)
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0, 0.4)
          
          swordRef.current.rotation.x = THREE.MathUtils.lerp(swordRef.current.rotation.x, Math.PI / 3, 0.4)
          swordRef.current.rotation.y = THREE.MathUtils.lerp(swordRef.current.rotation.y, -Math.PI / 4, 0.4)

          if (slashEffectRef.current) {
            slashEffectRef.current.rotation.set(Math.PI / 2.2, -Math.PI / 6, 0)
            slashEffectRef.current.position.set(0.6, -0.2, 0.4)
          }
        } 
        else {
          // Upward rising slash
          torsoGroupRef.current.rotation.x = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.x, -Math.PI / 20, 0.3)
          torsoGroupRef.current.rotation.y = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.y, -Math.PI / 12, 0.3)

          rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.PI / 4 + progress * 0.6, 0.4)
          rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, Math.PI / 6, 0.4)
          rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -Math.PI / 12, 0.4)
          
          swordRef.current.rotation.x = THREE.MathUtils.lerp(swordRef.current.rotation.x, -Math.PI / 2.5, 0.4)
          swordRef.current.rotation.y = THREE.MathUtils.lerp(swordRef.current.rotation.y, Math.PI / 8, 0.4)

          if (slashEffectRef.current) {
            slashEffectRef.current.rotation.set(-0.2, -Math.PI / 4, -Math.PI / 4)
            slashEffectRef.current.position.set(0.6, 0.3, 0.3)
          }
        }

        if (slashEffectRef.current) {
          const mat = slashEffectRef.current.material as THREE.MeshBasicMaterial
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.9, 0.5)
          
          const currentScale = slashEffectRef.current.scale.x
          const targetScale = currentScale + delta * 8.5
          slashEffectRef.current.scale.set(targetScale, targetScale, targetScale)
        }
      } else {
        // REVERT TO NEUTRAL POSTURE
        bodyGroupRef.current.position.x = THREE.MathUtils.lerp(bodyGroupRef.current.position.x, 0, 0.1)
        bodyGroupRef.current.position.z = THREE.MathUtils.lerp(bodyGroupRef.current.position.z, 0, 0.1)

        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, 0.1)
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, 0.1)

        torsoGroupRef.current.rotation.x = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.x, 0, 0.1)
        torsoGroupRef.current.rotation.y = THREE.MathUtils.lerp(torsoGroupRef.current.rotation.y, 0, 0.1)

        const headBob = Math.cos(t * 0.5) * 0.04
        headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, headBob, 0.1)
        headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, Math.sin(t * 0.8) * 0.08, 0.1)

        const idleSway = Math.sin(t * 2) * 0.08
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -Math.PI / 4 + idleSway, 0.1)
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, Math.PI / 3.8, 0.1)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, Math.PI / 10, 0.1)

        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.PI / 8 - idleSway, 0.1)
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0, 0.1)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -Math.PI / 10, 0.1)
        
        swordRef.current.rotation.x = THREE.MathUtils.lerp(swordRef.current.rotation.x, Math.PI / 3.6, 0.1)
        swordRef.current.rotation.y = THREE.MathUtils.lerp(swordRef.current.rotation.y, Math.PI / 8, 0.1)
        swordRef.current.rotation.z = THREE.MathUtils.lerp(swordRef.current.rotation.z, 0, 0.1)

        if (slashEffectRef.current) {
          const mat = slashEffectRef.current.material as THREE.MeshBasicMaterial
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.0, 0.2)
          if (mat.opacity < 0.05) {
            slashEffectRef.current.scale.set(0.1, 0.1, 0.1)
          }
        }
      }
    }

    // 5. Update code targets and floating skill texts
    codeTargets.forEach((target, idx) => {
      const ref = targetRefs[idx]
      if (!ref?.current) return

      target.x -= target.speed

      if (target.x <= 1.1 && !target.slashed) {
        target.slashed = true
      }

      if (target.x < -6) {
        target.x = 6 + Math.random() * 4
        target.y = (Math.random() - 0.5) * 1.5
        target.z = (Math.random() - 0.5) * 1.2
        target.slashed = false
      }

      try {
        const half1 = ref.current.children[0] as THREE.Mesh
        const half2 = ref.current.children[1] as THREE.Mesh

        if (target.slashed) {
          const timeSinceSlash = (ref.current.userData.slashTime || 0) + delta
          ref.current.userData.slashTime = timeSinceSlash

          if (half1 && half2 && half1.position && half2.position) {
            half1.position.x = -timeSinceSlash * target.splitDir[0]
            half1.position.y = target.yOffset + timeSinceSlash * target.splitDir[1]
            half1.position.z = timeSinceSlash * target.splitDir[2]
            
            half2.position.x = timeSinceSlash * target.splitDir[0]
            half2.position.y = -target.yOffset - timeSinceSlash * target.splitDir[1]
            half2.position.z = -timeSinceSlash * target.splitDir[2]

            const fadeScale = Math.max(1 - timeSinceSlash * 1.5, 0.001)
            half1.scale.set(fadeScale, fadeScale, fadeScale)
            half2.scale.set(fadeScale, fadeScale, fadeScale)
          }

          const textRef = textRefs[idx]
          if (textRef?.current) {
            textRef.current.visible = true
            textRef.current.position.set(0, timeSinceSlash * 1.5, 0)
            const textScale = 1.0 + timeSinceSlash * 0.6
            textRef.current.scale.set(textScale, textScale, textScale)
            
            if (textRef.current.material && 'opacity' in textRef.current.material) {
              textRef.current.material.transparent = true
              ;(textRef.current.material as THREE.Material & { opacity: number }).opacity = Math.max(1 - timeSinceSlash * 1.2, 0)
            }
          }
        } else {
          ref.current.position.set(target.x, target.y, target.z)
          ref.current.rotation.x += delta * 2
          ref.current.rotation.y += delta * 1.5
          ref.current.userData.slashTime = 0

          if (half1 && half2 && half1.position && half2.position) {
            half1.position.set(0, target.yOffset, 0)
            half2.position.set(0, -target.yOffset, 0)
            half1.scale.set(1, 1, 1)
            half2.scale.set(1, 1, 1)
            half1.rotation.set(0, 0, 0)
            half2.rotation.set(0, 0, 0)
          }

          const textRef = textRefs[idx]
          if (textRef?.current) {
            textRef.current.visible = false
          }
        }
      } catch (err) {
        console.error("Error animating slash targets", err)
      }
    })
  })

  // Initial setup: ensure the groupRef starts with a slight angle (it used to be hardcoded in the bodyGroupRef)
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -Math.PI / 6
    }
  }, [])

  return (
    <group ref={groupRef} position={position} scale={[scale, scale, scale]}>
      
      {/* 3D CRESCENT SWORD SLASH EFFECT */}
      <mesh ref={slashEffectRef} position={[0.6, 0, 0.4]} rotation={[0, -Math.PI / 4, Math.PI / 6]} scale={[0.1, 0.1, 0.1]}>
        <ringGeometry args={[0.3, 1.4, 32, 1, 0, Math.PI * 1.2]} />
        <meshBasicMaterial color="#ff2d2d" transparent opacity={0} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
      </mesh>

      {/* SAMURAI 3D MODEL ASSEMBLY WITH PROCEDURAL JOINTS */}
      <group ref={bodyGroupRef} position={[0, -0.3, 0]}>
        
        {/* Torso Group */}
        <group ref={torsoGroupRef}>
          {/* Torso / Kimono Chest */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.7, 0.28]} />
            <meshStandardMaterial color="#0c0c0c" roughness={0.7} metalness={0.2} />
          </mesh>
          
          {/* Red Chest Protector Plate */}
          <mesh position={[0, 0.08, 0.15]} rotation={[0.04, 0, 0]}>
            <boxGeometry args={[0.38, 0.4, 0.05]} />
            <meshStandardMaterial color="#ff2d2d" roughness={0.5} />
          </mesh>

          {/* Obi Sash Belt */}
          <mesh position={[0, -0.22, 0.01]}>
            <boxGeometry args={[0.52, 0.1, 0.3]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
          </mesh>
          <mesh position={[0, -0.22, 0.16]}>
            <boxGeometry args={[0.2, 0.12, 0.02]} />
            <meshStandardMaterial color="#ff2d2d" />
          </mesh>

          {/* Skewed Shoulder Armor Plates */}
          <mesh position={[-0.32, 0.24, 0]} rotation={[0, 0, 0.25]}>
            <boxGeometry args={[0.14, 0.25, 0.32]} />
            <meshStandardMaterial color="#ff2d2d" roughness={0.6} />
          </mesh>
          <mesh position={[0.32, 0.24, 0]} rotation={[0, 0, -0.25]}>
            <boxGeometry args={[0.14, 0.25, 0.32]} />
            <meshStandardMaterial color="#ff2d2d" roughness={0.6} />
          </mesh>

          {/* Head Assembly */}
          <group ref={headGroupRef} position={[0, 0.54, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.5} />
            </mesh>

            {/* Cyber Visor */}
            <mesh position={[0, 0.02, 0.16]}>
              <boxGeometry args={[0.28, 0.05, 0.12]} />
              <meshStandardMaterial color="#ff2d2d" emissive="#ff2d2d" emissiveIntensity={2.5} />
            </mesh>

            {/* Traditional Straw Hat (Kasa) */}
            <mesh position={[0, 0.18, 0]} rotation={[0.08, 0, 0]} castShadow>
              <coneGeometry args={[0.54, 0.15, 32]} />
              <meshStandardMaterial color="#121212" roughness={0.95} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.17, 0]} rotation={[0.08, 0, 0]}>
              <coneGeometry args={[0.55, 0.14, 32, 1, true]} />
              <meshBasicMaterial color="#ff2d2d" side={THREE.BackSide} />
            </mesh>

            {/* Ribbon wind-flutter */}
            <group position={[0, 0.04, -0.2]}>
              <mesh ref={ribbonLeftRef} position={[-0.04, -0.16, 0]} rotation={[0.25, 0, 0]}>
                <boxGeometry args={[0.04, 0.3, 0.01]} />
                <meshBasicMaterial color="#ff2d2d" />
              </mesh>
              <mesh ref={ribbonRightRef} position={[0.04, -0.16, 0]} rotation={[0.25, 0, 0.06]}>
                <boxGeometry args={[0.04, 0.34, 0.01]} />
                <meshBasicMaterial color="#ff2d2d" />
              </mesh>
            </group>
          </group>

          {/* Left Arm */}
          <group ref={leftArmRef} position={[-0.35, 0.16, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.12, 0.44, 0.12]} />
              <meshStandardMaterial color="#0c0c0c" roughness={0.7} />
            </mesh>
          </group>

          {/* Right Arm holding Katana */}
          <group ref={rightArmRef} position={[0.36, 0.12, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.12, 0.22, 0.12]} />
              <meshStandardMaterial color="#0c0c0c" roughness={0.7} />
            </mesh>

            {/* Forearm Group */}
            <group position={[0, -0.16, 0.02]}>
              <mesh castShadow>
                <boxGeometry args={[0.11, 0.24, 0.11]} />
                <meshStandardMaterial color="#0c0c0c" roughness={0.7} />
              </mesh>

              {/* Sword Grip */}
              <group ref={swordRef} position={[0.06, -0.16, 0.08]} rotation={[Math.PI / 3.6, Math.PI / 8, 0]}>
                <mesh position={[0, -0.1, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />
                  <meshStandardMaterial color="#ff2d2d" roughness={0.6} />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                  <cylinderGeometry args={[0.05, 0.05, 0.02, 8]} />
                  <meshStandardMaterial color="#ffffff" metalness={0.9} />
                </mesh>
                <group position={[0, 0.55, 0]}>
                  <mesh castShadow>
                    <boxGeometry args={[0.015, 1.0, 0.04]} />
                    <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={1.5} />
                  </mesh>
                  <pointLight color="#ff2d2d" intensity={2.5} distance={3} decay={2.0} />
                </group>
              </group>
            </group>
          </group>
        </group>

        {/* Hakama Pants / Legs */}
        <mesh ref={leftLegRef} position={[-0.15, -0.6, 0]} castShadow>
          <boxGeometry args={[0.18, 0.55, 0.24]} />
          <meshStandardMaterial color="#080808" roughness={0.8} />
        </mesh>
        <mesh ref={rightLegRef} position={[0.15, -0.6, 0]} castShadow>
          <boxGeometry args={[0.18, 0.55, 0.24]} />
          <meshStandardMaterial color="#080808" roughness={0.8} />
        </mesh>
      </group>

      {/* 3D GLOWING CODE CUBES WITH FLOATING SKILL NAMES */}
      
      {/* Target 1 */}
      <group ref={target1Ref} position={[5, 0.5, 0.8]} userData={{ slashTime: 0 }}>
        {/* Cube Half Top */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={0.8} wireframe />
        </mesh>
        {/* Cube Half Bottom */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.4]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={0.8} wireframe />
        </mesh>
        {/* Floating Skill Text (Drei SDF text) */}
        <Text
          ref={text1Ref}
          fontSize={0.24}
          color="#ffffff"
          outlineWidth={0.03}
          outlineColor="#ff2d2d"
          anchorX="center"
          anchorY="middle"
          visible={false}
        >
          {codeTargets[0].skill}
        </Text>
      </group>

      {/* Target 2 */}
      <group ref={target2Ref} position={[8, -0.3, -0.5]} userData={{ slashTime: 0 }}>
        {/* Cube Half Top */}
        <mesh position={[0, 0.075, 0]}>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={0.8} wireframe />
        </mesh>
        {/* Cube Half Bottom */}
        <mesh position={[0, -0.075, 0]}>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={0.8} wireframe />
        </mesh>
        {/* Floating Skill Text (Drei SDF text) */}
        <Text
          ref={text2Ref}
          fontSize={0.2}
          color="#ffffff"
          outlineWidth={0.025}
          outlineColor="#ff2d2d"
          anchorX="center"
          anchorY="middle"
          visible={false}
        >
          {codeTargets[1].skill}
        </Text>
      </group>

      {/* Target 3 */}
      <group ref={target3Ref} position={[11, 0.8, 0.2]} userData={{ slashTime: 0 }}>
        {/* Cube Half Top */}
        <mesh position={[0, 0.0875, 0]}>
          <boxGeometry args={[0.35, 0.175, 0.35]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={0.8} wireframe />
        </mesh>
        {/* Cube Half Bottom */}
        <mesh position={[0, -0.0875, 0]}>
          <boxGeometry args={[0.35, 0.175, 0.35]} />
          <meshStandardMaterial color="#ffffff" emissive="#ff2d2d" emissiveIntensity={0.8} wireframe />
        </mesh>
        {/* Floating Skill Text (Drei SDF text) */}
        <Text
          ref={text3Ref}
          fontSize={0.22}
          color="#ffffff"
          outlineWidth={0.028}
          outlineColor="#ff2d2d"
          anchorX="center"
          anchorY="middle"
          visible={false}
        >
          {codeTargets[2].skill}
        </Text>
      </group>
      
    </group>
  )
}
