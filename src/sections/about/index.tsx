'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white overflow-hidden"
    >
      {/* Background halftone accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-manga-red/5 blur-[120px] pointer-events-none" />

      {/* Speed lines overlay in background */}
      <div className="absolute inset-0 speed-lines-bg opacity-20 pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Character Stats & Biography */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Chapter Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#ff2d2d] mb-6">
              <span>CHAPTER 002</span>
              <span className="w-1.5 h-1.5 bg-manga-red" />
              <span>CHARACTER PROFILE</span>
            </div>

            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-6">
              THE <span className="text-manga-red">PROTAGONIST</span> DOSSIER
            </h2>

            {/* High-Contrast B&W Character Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8 font-bebas text-sm">
              <div className="p-3 border-2 border-white bg-black shadow-[3px_3px_0px_#ff2d2d] skew-x-[-2deg]">
                <div className="text-manga-red tracking-widest mb-0.5">STATUS</div>
                <div className="text-white text-base font-bold">LEVEL 99 // ALIVE</div>
              </div>
              <div className="p-3 border-2 border-white bg-black shadow-[3px_3px_0px_#ff2d2d] skew-x-[-2deg]">
                <div className="text-manga-red tracking-widest mb-0.5">CLASS</div>
                <div className="text-white text-base font-bold">FULLSTACK MAGE</div>
              </div>
              <div className="p-3 border-2 border-white bg-black shadow-[3px_3px_0px_#ff2d2d] skew-x-[-2deg]">
                <div className="text-manga-red tracking-widest mb-0.5">ORIGIN</div>
                <div className="text-white text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap">KANPUR, INDIA</div>
              </div>
              <div className="p-3 border-2 border-white bg-black shadow-[3px_3px_0px_#ff2d2d] skew-x-[-2deg]">
                <div className="text-manga-red tracking-widest mb-0.5">GUILD</div>
                <div className="text-white text-base font-bold">JKC / OASIS</div>
              </div>
            </div>

            {/* Manga Caption / Story Narrative Box */}
            <div className="border-3 border-white bg-manga-gray-dark p-6 md:p-8 shadow-[6px_6px_0px_#ff2d2d] skew-x-[-1deg] relative w-full">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-manga-red" />
              
              <p className="font-grotesk text-sm md:text-base text-manga-gray-bright leading-relaxed mb-4 text-pretty">
                Arnav Kushwaha is a Final Year B.Tech student passionate about Full Stack Development, Data Science, Artificial Intelligence, Cybersecurity, and Academic Research.
              </p>
              <p className="font-grotesk text-sm md:text-base text-manga-gray-bright leading-relaxed mb-4 text-pretty">
                He enjoys building scalable web architectures, data-driven solutions, and interactive manga-style web applications that combine creative design with technical excellence.
              </p>
              <p className="font-grotesk text-sm md:text-base text-manga-gray-bright leading-relaxed text-pretty">
                Armed with Python, TypeScript, React, and Machine Learning models, he tackles complex technical problems and writes high-performance research dossiers to push the boundaries of human-computer intelligence.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Character Portrait Frame */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-5 flex items-center justify-center w-full"
          >
            <div className="w-full max-w-sm aspect-[4/5] bg-manga-gray-dark relative border-4 border-white shadow-[8px_8px_0px_#ff2d2d] skew-x-[-1deg] overflow-hidden group">
              
              {/* Halftone / Screen Tone background */}
              <div className="absolute inset-0 halftone-bg opacity-30 z-0 pointer-events-none" />
              
              {/* Speed lines in portrait panel */}
              <div className="absolute inset-0 speed-lines-bg opacity-25 z-0 pointer-events-none" />

              {/* Character Image */}
              <div className="relative w-full h-full z-10 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/assets/images/manga_character_portrait.png"
                  alt="Arnav Kushwaha Character Sketch"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                  className="object-cover grayscale contrast-125 brightness-95"
                />
              </div>

              {/* Character Name Ribbon Badge overlay */}
              <div className="absolute bottom-4 left-4 z-20 bg-manga-red border-2 border-white px-4 py-1 text-black font-bebas text-lg tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#fff]">
                ARNAV KUSHWAHA
              </div>

              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white z-20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white z-20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white z-20 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
