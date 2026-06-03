'use client'

import { motion } from 'framer-motion'
import { certifications } from '@/data/certifications'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white"
    >
      {/* Background halftone highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-manga-red/5 blur-[120px] pointer-events-none" />

      {/* Speed lines backdrop */}
      <div className="absolute inset-0 speed-lines-bg opacity-20 pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="flex flex-col items-center w-full"
        >
          {/* Chapter Badge */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#ff2d2d] mb-6"
          >
            <span>CHAPTER 007</span>
            <span className="w-1.5 h-1.5 bg-manga-red" />
            <span>ACHIEVEMENT ARCHIVE</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-16 text-center"
          >
            ACHIEVEMENT ARCHIVE // <span className="text-manga-red">TROPHY VAULT</span>
          </motion.h2>

          {/* Grid of Decrypted Credential Keys */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={fadeInUp}
                transition={motionTransitions.smooth}
                className="manga-panel p-6 border-3 border-white bg-black shadow-[6px_6px_0px_#fff] hover:shadow-[8px_8px_0px_#ff2d2d] relative group overflow-hidden flex flex-col justify-between min-h-[220px]"
              >
                {/* Diagonal high-speed line glare effect that animates on hover */}
                <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[25deg] transform -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                {/* Halftone dot background inside card */}
                <div className="absolute inset-0 halftone-bg opacity-20 pointer-events-none" />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-6 font-bebas text-xs tracking-wider text-manga-gray-light relative z-10">
                  <span>VAULT_KEY // CRED_0{index + 1}</span>
                  <span className="text-manga-red font-bold animate-pulse">DECRYPTED</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-bebas text-2xl text-white mb-2 leading-snug group-hover:text-manga-red transition-colors duration-200">
                    {cert.title}
                  </h3>
                  <div className="font-grotesk text-[10px] tracking-wider text-manga-gray-light uppercase flex items-center gap-1.5 mt-3">
                    <span className="h-1.5 w-1.5 bg-manga-red animate-ping" />
                    <span className="font-bold">ACCESS // AUTHORIZED & VERIFIED</span>
                  </div>
                </div>

                {/* Graphic Lock Icon */}
                <div className="flex items-center justify-end mt-6 relative z-10">
                  <div className="p-2.5 border-2 border-white bg-manga-gray-dark group-hover:border-manga-red transition-colors duration-200 skew-x-[-4deg]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-manga-red transform group-hover:scale-110 transition-transform duration-200"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
