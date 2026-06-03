'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isReady, setIsReady] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)
  const [hatchOpen, setHatchOpen] = useState(false)
  
  // Store onComplete in a ref
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Automated Timeline Sequence
  useEffect(() => {
    // 1. Start drop animation immediately
    setIsReady(true)

    // 2. Open the hatch automatically after the drop settles
    const hatchTimer = setTimeout(() => {
      setHatchOpen(true)
    }, 1800)

    // 3. Trigger the blinding flash shortly after hatch opens
    const flashTimer = setTimeout(() => {
      setIsFlashing(true)
    }, 2400)

    // 4. Reveal the website after flash covers the screen
    const completeTimer = setTimeout(() => {
      onCompleteRef.current?.()
    }, 3000)

    return () => {
      clearTimeout(hatchTimer)
      clearTimeout(flashTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020202] overflow-hidden select-none"
    >
      {/* Background Deep Space Starfield */}
      <div className="absolute inset-0 pointer-events-none opacity-50" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-20" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ff2d2d 1px, transparent 1px)',
          backgroundSize: '120px 120px',
          backgroundPosition: '30px 30px'
        }}
      />

      {/* Flashing White Overlay (Automated) */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 30 }}
            className="absolute z-50 w-64 h-64 bg-white rounded-full pointer-events-none"
            transition={{ duration: 0.5, ease: "easeIn" }}
          />
        )}
      </AnimatePresence>

      {/* Massive Battleship Container */}
      {isReady && (
        <motion.div
          initial={{ y: '-100vh', scale: 1.5 }}
          animate={{ y: '-10vh', scale: 1 }}
          transition={{ 
            type: 'spring', 
            damping: 18, 
            stiffness: 70, 
            duration: 2
          }}
          className="relative w-full max-w-5xl aspect-video flex items-center justify-center z-20"
        >
          {/* Hovering idle animation applied to wrapper */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center mt-32"
          >
            {/* MASSIVE BATTLESHIP VECTOR */}
            <svg viewBox="0 0 1000 600" className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,45,45,0.15)]">
              {/* Massive Main Thrusters */}
              <motion.path 
                animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.15 }}
                style={{ originY: 0.5 }}
                d="M350 450 L400 580 L450 450 Z" 
                fill="#ff2d2d" 
              />
              <motion.path 
                animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.15, delay: 0.05 }}
                style={{ originY: 0.5 }}
                d="M550 450 L600 580 L650 450 Z" 
                fill="#ff2d2d" 
              />
              
              {/* Inner White Hot Thruster Cores */}
              <motion.path 
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.1 }}
                style={{ originY: 0.5 }}
                d="M370 450 L400 530 L430 450 Z" fill="#ffffff" 
              />
              <motion.path 
                animate={{ scaleY: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
                style={{ originY: 0.5 }}
                d="M570 450 L600 530 L630 450 Z" fill="#ffffff" 
              />

              {/* Broad Sweeping Wings / Armor Plating */}
              <path d="M500 50 L100 350 L100 450 L350 450 L350 300 Z" fill="#0c0c0c" stroke="#333" strokeWidth="4" />
              <path d="M500 50 L900 350 L900 450 L650 450 L650 300 Z" fill="#0c0c0c" stroke="#333" strokeWidth="4" />
              
              {/* Main Central Dreadnought Hull */}
              <path d="M500 20 L400 150 L400 500 L600 500 L600 150 Z" fill="#151515" stroke="#444" strokeWidth="5" />
              <path d="M500 20 L450 150 L450 450 L550 450 L550 150 Z" fill="#0a0a0a" />
              
              {/* Giant Red Front Armor Wedge */}
              <path d="M500 20 L420 200 L580 200 Z" fill="#ff2d2d" opacity="0.8" />
              
              {/* Gun Batteries (Left/Right) */}
              <rect x="150" y="380" width="20" height="120" fill="#222" stroke="#ff2d2d" strokeWidth="2" />
              <rect x="250" y="390" width="30" height="150" fill="#111" stroke="#ff2d2d" strokeWidth="2" />
              
              <rect x="830" y="380" width="20" height="120" fill="#222" stroke="#ff2d2d" strokeWidth="2" />
              <rect x="720" y="390" width="30" height="150" fill="#111" stroke="#ff2d2d" strokeWidth="2" />

              {/* Cyber-Grid Detail Lines */}
              <line x1="450" y1="250" x2="550" y2="250" stroke="#ff2d2d" strokeWidth="2" opacity="0.5" />
              <line x1="430" y1="300" x2="570" y2="300" stroke="#ff2d2d" strokeWidth="2" opacity="0.5" />
              <line x1="410" y1="350" x2="590" y2="350" stroke="#ff2d2d" strokeWidth="2" opacity="0.5" />

              {/* Central Hatch Bay Frame */}
              <circle cx="500" cy="380" r="80" fill="#000" stroke="#333" strokeWidth="6" />
              
              {/* The Mechanical Hatch Doors */}
              <g style={{ transformOrigin: "500px 380px" }}>
                <motion.path 
                  initial={{ x: 0 }}
                  animate={{ x: hatchOpen ? -80 : 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 60 }}
                  d="M500 300 A 80 80 0 0 0 500 460 Z" 
                  fill="#1a1a1a" stroke="#ff2d2d" strokeWidth="3" 
                />
                <motion.path 
                  initial={{ x: 0 }}
                  animate={{ x: hatchOpen ? 80 : 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 60 }}
                  d="M500 300 A 80 80 0 0 1 500 460 Z" 
                  fill="#1a1a1a" stroke="#ff2d2d" strokeWidth="3" 
                />
              </g>

              {/* The Blinding Core Inside the Hatch (Revealed when open) */}
              <motion.circle 
                cx="500" cy="380" r="50" 
                fill="#ffffff" 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: hatchOpen ? 1 : 0, 
                  scale: hatchOpen ? [1, 1.2, 1] : 0.5 
                }}
                transition={{ 
                  scale: { repeat: Infinity, duration: 0.1 },
                  opacity: { duration: 0.2 }
                }}
                style={{ filter: "drop-shadow(0 0 30px #ffffff)" }}
              />
            </svg>

          </motion.div>
        </motion.div>
      )}

      {/* Cinematic Text Tracker */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-16 text-center z-10"
      >
        <p className="font-bebas text-manga-red tracking-[0.5em] text-xl animate-pulse drop-shadow-[0_0_10px_#ff2d2d]">
          INTERACTIVE RESUME
        </p>
        <p className="font-grotesk text-manga-gray-light tracking-[0.3em] text-xs mt-2 opacity-60">
          INITIATING DEPLOYMENT SEQUENCE...
        </p>
      </motion.div>
    </motion.div>
  )
}
