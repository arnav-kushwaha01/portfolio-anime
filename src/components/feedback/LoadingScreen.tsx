'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface LoadingScreenProps {
  onComplete?: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  // Store onComplete in a ref so we always call the latest version
  // without needing it in a useEffect dependency array
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Smooth progress calculation
  useEffect(() => {
    const startTime = Date.now()
    const duration = 2400 // 2.4 seconds load
    
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const pct = Math.min((elapsed / duration) * 100, 100)
      
      setProgress(Math.floor(pct))
      
      if (pct >= 100) {
        clearInterval(timer)
      }
    }, 25)

    return () => clearInterval(timer)
  }, [])

  // Fire onComplete once when progress reaches 100
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onCompleteRef.current?.()
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [progress]) // Only depends on progress, not the callback

  // Manga editing processes
  const EDITING_STEPS = [
    { id: 1, text: 'CREATING SKETCH OUTLINES...', threshold: 25 },
    { id: 2, text: 'INKING STORY PANELS...', threshold: 55 },
    { id: 3, text: 'APPLYING SCREEN TONE DOTS...', threshold: 85 },
    { id: 4, text: 'VOLUME READY FOR RELEASE!', threshold: 100 },
  ]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
        transition: { duration: 0.6, ease: 'easeInOut' },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none overflow-hidden halftone-bg"
    >
      {/* Dynamic Background Speedlines */}
      <div className="absolute inset-0 speed-lines-bg opacity-40 pointer-events-none" />

      {/* Decorative Ink Splat Vector - Left */}
      <div className="absolute -left-10 -top-10 w-48 h-48 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="white">
          <path d="M50 0 C60 20, 80 10, 80 40 C80 60, 60 70, 50 100 C30 80, 10 90, 10 50 C10 10, 30 20, 50 0 Z" />
        </svg>
      </div>

      {/* Decorative Ink Splat Vector - Right */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="white">
          <path d="M50 0 C70 30, 90 20, 100 60 C80 90, 70 80, 40 100 C10 80, 0 60, 20 40 C40 20, 30 0, 50 0 Z" />
        </svg>
      </div>

      {/* Manga Page Frame Border */}
      <div className="absolute inset-4 md:inset-8 border-4 border-white pointer-events-none z-10 shadow-[inset_0_0_0_2px_#000000]" />

      <div className="relative z-20 flex flex-col items-center max-w-md px-6 text-center">
        {/* Manga Title Logo layout */}
        <div className="mb-4">
          <div className="inline-block bg-manga-red border-2 border-white px-4 py-1.5 text-black font-bebas text-lg md:text-xl tracking-widest skew-x-[-6deg] shadow-[3px_3px_0px_#fff]">
            SERIES DEBUT
          </div>
        </div>

        <h1 className="font-bebas text-5xl md:text-7xl text-white tracking-wide leading-none mb-1">
          ARNAV KUSHWAHA
        </h1>
        <p className="font-grotesk text-xs md:text-sm tracking-[0.2em] text-manga-gray-light uppercase mb-10">
          — VOL. 01: THE PORTFOLIO ACT —
        </p>

        {/* Large Comic-Style Percentage Count */}
        <div className="relative mb-8">
          <div className="font-bebas text-8xl md:text-9xl text-white tracking-tighter leading-none select-none drop-shadow-[5px_5px_0px_#ff2d2d] skew-x-[-4deg]">
            {progress.toString().padStart(3, '0')}%
          </div>
        </div>

        {/* Process Log panel */}
        <div className="w-full max-w-xs bg-manga-gray-dark border-2 border-white p-4 shadow-[4px_4px_0px_#ff2d2d] skew-x-[-1deg] mb-6">
          <div className="flex flex-col gap-2.5 font-grotesk text-[10px] md:text-xs text-left">
            {EDITING_STEPS.map((step, idx) => {
              const isCompleted = progress >= step.threshold
              const prevThreshold = idx === 0 ? 0 : EDITING_STEPS[idx - 1].threshold
              const isActive = progress >= prevThreshold && progress < step.threshold

              let indicator = '○'
              let textColor = 'text-manga-gray-light opacity-50'

              if (isCompleted) {
                indicator = '●'
                textColor = 'text-white font-bold'
              } else if (isActive) {
                indicator = '▶'
                textColor = 'text-manga-red font-bold animate-pulse'
              }

              return (
                <div key={step.id} className={`flex items-center gap-3 transition-colors duration-150 ${textColor}`}>
                  <span className="shrink-0">{indicator}</span>
                  <span className="tracking-wider">{step.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Thick Comic Border Progress Bar */}
        <div className="w-64 h-5 border-2 border-white bg-black overflow-hidden relative skew-x-[-6deg]">
          <div
            className="h-full bg-manga-red border-r-2 border-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="font-bebas text-xs tracking-widest text-manga-gray-light mt-3 block">
          MANGA LOADER ACTIVE
        </span>
      </div>
    </motion.div>
  )
}
