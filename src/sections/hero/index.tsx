'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { contactLinks } from '@/data/contact'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

// Typewriter for the manga title subtitle / active roles
function RoleTypewriter() {
  const roles = profile.roles
  const [roleIndex, setRoleIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (subIndex === roles[roleIndex].length + 1 && !isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
    } 
    else if (subIndex === 0 && isDeleting) {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 300)
    } 
    else {
      timeout = setTimeout(() => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
        setText(roles[roleIndex].substring(0, subIndex + (isDeleting ? -1 : 1)))
      }, isDeleting ? 25 : 55)
    }

    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, roleIndex, roles])

  return (
    <span className="inline-flex items-center text-manga-red font-grotesk text-lg md:text-xl lg:text-2xl font-bold tracking-wide h-[1.8em] uppercase">
      {text}
      <span className="ml-1.5 inline-block w-[3px] h-[0.9em] bg-manga-red animate-pulse" />
    </span>
  )
}

function ReadingTimer() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600).toString().padStart(2, '0')
    const mins = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0')
    const secs = (totalSeconds % 60).toString().padStart(2, '0')
    return `${hrs}:${mins}:${secs}`
  }

  return <span>T+{formatTime(elapsed)}</span>
}

export function HeroSection() {
  const handleScrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const resumeLink = contactLinks.find((l) => l.label === 'Resume')?.href || '/RESUME.pdf'

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-start overflow-hidden px-6 md:px-16 lg:px-24 bg-transparent halftone-bg-red"
    >
      {/* Background speed lines */}
      <div className="absolute inset-0 speed-lines-bg opacity-30 pointer-events-none" />

      {/* Manga Frame Border */}
      <div className="absolute inset-4 md:inset-8 border-3 border-white pointer-events-none z-20 shadow-[inset_0_0_0_2px_#000000]" />

      {/* Manga Magazine Metadata HUD elements */}
      {/* Top Left: Magazine Title */}
      <div className="absolute top-10 left-10 hidden md:flex flex-col gap-0.5 font-bebas text-xs tracking-wider text-manga-gray-light pointer-events-none select-none z-10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-manga-red skew-x-[-10deg]" />
          <span className="text-white font-bold">WEEKLY SHONEN BUILDER</span>
        </div>
        <div className="text-[10px]">ISSUE #01 // YEAR 2026</div>
      </div>

      {/* Top Right: Chapter Coordinates */}
      <div className="absolute top-10 right-10 hidden md:flex flex-col items-end gap-0.5 font-bebas text-xs tracking-wider text-manga-gray-light pointer-events-none select-none z-10">
        <div>STATUS // ARNAV ON DUTY</div>
        <div className="text-manga-red">CHAPTER // 001. THE AWAKENING</div>
      </div>

      {/* Bottom Left: Chapter Label */}
      <div className="absolute bottom-10 left-10 hidden md:flex flex-col gap-0.5 font-bebas text-xs tracking-wider text-manga-gray-light pointer-events-none select-none z-10">
        <div>ACT_01 // INTRODUCING PROTAGONIST</div>
        <div>GENRE // TECHNICAL STORYTELLING</div>
      </div>

      {/* Bottom Right: Reading clock */}
      <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-end gap-0.5 font-bebas text-xs tracking-wider text-manga-gray-light pointer-events-none select-none z-10">
        <div>READ_ELAPSED</div>
        <div className="text-manga-red font-bold">
          <ReadingTimer />
        </div>
      </div>

      {/* Main Magazine Cover Content */}
      <div className="container-page relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-16 md:pt-0">
        <motion.div
          className="lg:col-span-8 flex flex-col items-start text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Chapter Badge */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-4 py-1 bg-manga-red border border-white text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#fff] mb-6"
          >
            <span>CHAPTER 001</span>
            <span className="w-1.5 h-1.5 bg-black" />
            <span>THE AWAKENING</span>
          </motion.div>

          {/* Main Giant Skewed Title Banner */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="relative mb-4 group"
          >
            {/* Outline title behind */}
            <div className="absolute -top-3 -left-3 font-bebas text-6xl md:text-8xl lg:text-9xl text-stroke-white opacity-10 select-none pointer-events-none transform -skew-x-3">
              {profile.name}
            </div>

            <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl text-white tracking-wide leading-none select-none skew-x-[-4deg] relative z-10">
              {profile.name}
            </h1>
            
            {/* Stylized Red Accent Slash line */}
            <div className="h-1.5 bg-manga-red w-full mt-2 skew-x-[-10deg] border border-white shadow-[1px_1px_0px_#000]" />
          </motion.div>

          {/* Role Typewriter Subtitle */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="mb-4 min-h-[3rem]"
          >
            <RoleTypewriter />
          </motion.div>

          {/* Manga Caption / Story Narrative Box */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="relative mb-10 w-full max-w-2xl"
          >
            {/* Manga speech-panel border style */}
            <div className="border-3 border-white bg-black p-5 shadow-[5px_5px_0px_#ff2d2d] skew-x-[-1deg] relative">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 font-mono text-xs text-manga-red">「</div>
              <div className="absolute bottom-2 right-2 font-mono text-xs text-manga-red">」</div>
              
              <p className="font-grotesk text-sm md:text-base text-manga-gray-bright leading-relaxed px-4 text-pretty font-semibold">
                &ldquo;{profile.tagline}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="flex flex-wrap items-center gap-5"
          >
            {/* Open Manga / Explore Button */}
            <button
              onClick={handleScrollToNext}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black border-2 border-black font-bebas text-base tracking-widest transition-all skew-x-[-6deg] shadow-[4px_4px_0px_#ff2d2d] hover:bg-manga-red hover:text-white hover:shadow-[4px_4px_0px_#fff] cursor-pointer active:translate-y-1"
            >
              <span>OPEN VOLUME</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                className="transform group-hover:translate-y-1 transition-transform duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Download Resume / Brief Button */}
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-black text-white border-2 border-white font-bebas text-base tracking-widest transition-all skew-x-[-6deg] shadow-[4px_4px_0px_#ff2d2d] hover:bg-manga-red hover:shadow-[4px_4px_0px_#fff] active:translate-y-1"
            >
              <span>DOWNLOAD BRIEF</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transform group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Space reserved for 3D elements on the right */}
        <div className="lg:col-span-4 h-[1px]" />
      </div>

      {/* Floating Manga Page Turn Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 select-none pointer-events-none z-10">
        <span className="font-bebas text-xs tracking-[0.2em] text-manga-gray-light uppercase">
          PAGE TURN
        </span>
        <div className="w-5 h-8 border-2 border-white flex justify-center p-1 skew-x-[-6deg] bg-black">
          <motion.div
            className="w-1.5 h-2 bg-manga-red"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </section>
  )
}
