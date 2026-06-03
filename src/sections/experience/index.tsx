'use client'

import { motion } from 'framer-motion'
import { experienceTimeline } from '@/data/experience'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white overflow-hidden"
    >
      {/* Background halftone accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-manga-red/5 blur-[140px] pointer-events-none" />

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
            <span>CHAPTER 004</span>
            <span className="w-1.5 h-1.5 bg-manga-red" />
            <span>MISSION LOGS</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-16 text-center"
          >
            MISSION LOGS // <span className="text-manga-red">CLASSIFIED REPORTS</span>
          </motion.h2>

          {/* Timeline Dossier Container */}
          <div className="relative w-full max-w-4xl min-h-[400px]">
            {/* Center Timeline ink line */}
            <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-1 -translate-x-1/2 bg-white pointer-events-none z-0" />

            <div className="flex flex-col gap-12 w-full relative z-10">
              {experienceTimeline.map((item, index) => {
                const isLeft = index % 2 === 0

                return (
                  <div
                    key={item.company}
                    className={`relative flex flex-col md:flex-row w-full ${
                      isLeft ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    {/* Comic-style center node dot */}
                    <div className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full bg-black border-4 border-white -translate-x-1/2 z-20 flex items-center justify-center top-7 shadow-[0_0_0_3px_#ff2d2d]">
                      <span className="h-1.5 w-1.5 bg-manga-red" />
                    </div>

                    {/* Staggered Card Wrapper */}
                    <motion.div
                      variants={fadeInUp}
                      transition={motionTransitions.smooth}
                      className={`w-full md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 ${
                        isLeft ? 'md:mr-10' : 'md:ml-10'
                      }`}
                    >
                      {/* Classified File Dossier Layout */}
                      <div className="border-3 border-white bg-manga-gray-dark p-6 shadow-[6px_6px_0px_#fff] relative group transition-all duration-300 hover:border-manga-red hover:shadow-[6px_6px_0px_#fff]">
                        
                        {/* Dossier top folder tab */}
                        <div className="absolute -top-[18px] left-4 bg-white border-t-3 border-x-3 border-white text-black font-bebas text-[10px] tracking-widest px-3 py-0.5 skew-x-[-10deg] font-bold">
                          FILE_DEPT // CONFIDENTIAL
                        </div>

                        {/* Top Metadata Header */}
                        <div className="flex items-center justify-between mb-4 font-bebas text-xs tracking-wider text-manga-gray-light mt-1">
                          <span>LOG_ID // ARCHIVE_0{index + 1}</span>
                          <span className="text-manga-red font-bold select-none">[ RESTRICTED ACCESS ]</span>
                        </div>

                        {/* Mission status stamp */}
                        <div className="absolute right-4 top-10 border-3 border-manga-red text-manga-red font-bebas text-sm md:text-base font-black px-3 py-1 uppercase tracking-widest rotate-[-12deg] select-none pointer-events-none opacity-80 shadow-[2px_2px_0px_#000]">
                          MISSION COMPLETED
                        </div>

                        {/* Company & Role */}
                        <h3 className="font-bebas text-2xl text-white mb-0.5 tracking-wide uppercase">{item.role}</h3>
                        <h4 className="font-grotesk text-sm font-bold text-manga-red mb-4 tracking-wider uppercase">
                          SECTOR: {item.company}
                        </h4>

                        <div className="font-bebas text-xs text-manga-gray-light mb-4">
                          DURATION: {item.period.toUpperCase()}
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[2px] bg-white/10 mb-4" />

                        {/* Objectives with Redacted details */}
                        <h5 className="font-bebas text-xs tracking-widest text-manga-gray-light uppercase mb-2">OPERATIONAL METRICS:</h5>
                        <ul className="flex flex-col gap-3 font-grotesk text-xs text-manga-gray-bright leading-relaxed list-none p-0 m-0 text-left">
                          {item.company === 'JKC Softwares' ? (
                            <>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Deployed production codebase utilizing <span className="redacted" title="Hover to decrypt">React.js client architectures</span> and state management layers.</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Designed RESTful controllers in <span className="redacted" title="Hover to decrypt">Node.js + Express.js API networks</span> with secure authorization protocols.</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Maintained structured tables in <span className="redacted" title="Hover to decrypt">MySQL databases</span>, optimization and query indexing.</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Coordinated with core developers using <span className="redacted" title="Hover to decrypt">Agile SCRUM workflows</span> and git-based release pipes.</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Developed machine learning architectures for <span className="redacted" title="Hover to decrypt">Predictive Sales forecasting models</span> using ads budget parameters.</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Conducted data filtration and cleaning pipelines in <span className="redacted" title="Hover to decrypt">Pandas & NumPy libraries</span>, resolving data anomalies.</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Created high-fidelity visual diagrams utilizing <span className="redacted" title="Hover to decrypt">Matplotlib & Seaborn plots</span> for team logs.</span>
                              </li>
                              <li className="flex items-start gap-2.5">
                                <span className="text-manga-red font-bold font-mono shrink-0 select-none">[✓]</span>
                                <span>Constructed regression and prediction setups in <span className="redacted" title="Hover to decrypt">Scikit-Learn estimators</span> with validated metrics.</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
