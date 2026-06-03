'use client'

import { motion } from 'framer-motion'
import { researchItems } from '@/data/research'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ResearchSection() {
  const item = researchItems[0]

  return (
    <section
      id="research"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white overflow-hidden"
    >
      {/* Red science grid backdrop */}
      <div className="absolute inset-0 speed-lines-bg opacity-15 pointer-events-none" />
      <div className="absolute inset-0 halftone-bg-red opacity-10 pointer-events-none" />

      {/* Secret lab alert banner */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-manga-red" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Research Dossier */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Chapter Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#ff2d2d] mb-6">
              <span>CHAPTER 006</span>
              <span className="w-1.5 h-1.5 bg-manga-red" />
              <span>FORBIDDEN RESEARCH</span>
            </div>

            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-6">
              RESTRICTED // <span className="text-manga-red">RESEARCH ARCHIVE</span>
            </h2>

            {/* Dossier Container */}
            {item && (
              <div className="border-3 border-white bg-manga-gray-dark p-6 md:p-8 shadow-[6px_6px_0px_#fff] relative w-full group hover:border-manga-red transition-all">
                
                {/* Redacted dossier header */}
                <div className="absolute -top-[18px] left-4 bg-manga-red text-white font-bebas text-[10px] tracking-widest px-3 py-0.5 skew-x-[-10deg] font-bold border-2 border-white shadow-[2px_2px_0px_#000]">
                  SUBJECT CODE // CLASSIFIED_EMOTION_AI
                </div>

                <div className="flex items-center justify-between mb-6 font-bebas text-xs tracking-wider text-manga-gray-light mt-1">
                  <span>DECK // LAB_STATION_A9</span>
                  <span className="text-manga-red font-bold select-none">[ LEVEL 5 CLEARANCE ]</span>
                </div>

                <h3 className="font-bebas text-3xl text-white mb-4 tracking-wide group-hover:text-manga-red transition-colors">
                  {item.title}
                </h3>

                {/* Red Stamp Overlay */}
                <div className="absolute right-4 top-14 border-4 border-manga-red text-manga-red font-bebas text-sm md:text-base font-black px-3 py-1.5 uppercase tracking-widest rotate-[8deg] select-none pointer-events-none opacity-85 shadow-[3px_3px_0px_#000]">
                  RESTRICTED DOSSIER
                </div>

                <p className="font-grotesk text-sm md:text-base text-manga-gray-bright leading-relaxed mb-6 text-pretty">
                  An AI research experiment designed to analyze human psychological patterns. The model processes input by fusing features extracted from <span className="redacted" title="Hover to decrypt">facial expression visual meshes</span> and <span className="redacted" title="Hover to decrypt">speech signal audio frequencies</span> in a unified neural network to detect complex emotional indicators.
                </p>

                {/* Research Vectors */}
                <h4 className="font-bebas text-sm tracking-wider text-manga-gray-light uppercase mb-3">RESEARCH VECTOR MAPPING</h4>
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {item.areas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1.5 bg-black border border-white text-white font-bebas text-[11px] tracking-wider uppercase skew-x-[-4deg] hover:border-manga-red hover:bg-manga-red/10 transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                {/* Mission Objective */}
                <div className="p-4 border-2 border-manga-red bg-manga-red/5 font-grotesk">
                  <div className="font-bebas text-sm text-manga-red tracking-wider mb-1 font-bold">CORE ARCHIVE GOAL</div>
                  <div className="text-xs text-white leading-relaxed font-semibold">
                    {item.goal}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: High-tech Monochrome Face Scanner */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-5 flex items-center justify-center w-full"
          >
            <div className="w-full max-w-sm aspect-square bg-manga-gray-dark border-3 border-white shadow-[6px_6px_0px_#ff2d2d] skew-x-[-1deg] relative flex items-center justify-center p-6 overflow-hidden group">
              {/* Technical square mesh grid */}
              <div className="absolute inset-0 opacity-[0.06]" 
                   style={{
                     backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
                     backgroundSize: '20px 20px'
                   }} 
              />
              
              <svg className="w-full h-full relative" viewBox="0 0 200 200">
                {/* Crosshairs */}
                <circle cx="100" cy="100" r="85" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.2" />
                <circle cx="100" cy="100" r="75" stroke="#ff2d2d" strokeWidth="0.8" strokeDasharray="4 10" fill="none" opacity="0.4" />
                
                {/* Head wireframe contour */}
                <path d="M 60 70 C 60 40, 140 40, 140 70 C 140 110, 125 150, 100 170 C 75 150, 60 110, 60 70 Z" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                
                {/* Eyes contour */}
                <path d="M 75 75 Q 85 71 95 75" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
                <path d="M 105 75 Q 115 71 125 75" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
                
                {/* Dynamic mouth vector */}
                <motion.path
                  d="M 80 130 Q 100 138 120 130 Q 100 148 80 130"
                  fill="none"
                  stroke="#ff2d2d"
                  strokeWidth="1.5"
                  opacity="0.8"
                  animate={{
                    d: [
                      "M 80 130 Q 100 138 120 130 Q 100 148 80 130", // neutral
                      "M 80 130 Q 100 148 120 130 Q 100 134 80 130", // smile
                      "M 80 130 Q 100 122 120 130 Q 100 142 80 130"  // surprise
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Nose contour */}
                <path d="M 100 75 L 100 110 L 92 118 L 100 120 L 108 118 L 100 110" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />

                {/* Landmark checks */}
                <motion.circle cx="85" cy="80" r="3" fill="#ff2d2d" animate={{ r: [2.5, 4.5, 2.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <motion.circle cx="115" cy="80" r="3" fill="#ff2d2d" animate={{ r: [2.5, 4.5, 2.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                <motion.circle cx="100" cy="112" r="3" fill="#ffffff" animate={{ r: [2.5, 4, 2.5] }} transition={{ duration: 2, repeat: Infinity }} />
                <motion.circle cx="80" cy="130" r="2.5" fill="#ffffff" />
                <motion.circle cx="120" cy="130" r="2.5" fill="#ffffff" />
                <motion.circle cx="100" cy="170" r="2.5" fill="#ff2d2d" />
                
                {/* Dots connector vectors */}
                <line x1="85" y1="80" x2="100" y2="112" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                <line x1="115" y1="80" x2="100" y2="112" stroke="#ffffff" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                <line x1="80" y1="130" x2="100" y2="112" stroke="#ff2d2d" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                <line x1="120" y1="130" x2="100" y2="112" stroke="#ff2d2d" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

                {/* Red sweeping horizontal laser line */}
                <motion.line
                  x1="30"
                  y1="35"
                  x2="170"
                  y2="35"
                  stroke="#ff2d2d"
                  strokeWidth="2"
                  opacity="0.8"
                  animate={{ y: [35, 175, 35] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>

              {/* Technical corner indicators */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
