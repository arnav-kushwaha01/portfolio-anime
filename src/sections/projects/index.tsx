'use client'

import { motion } from 'framer-motion'
import { featuredProjects } from '@/data/projects'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ProjectsSection() {
  // Mapping of projects to battle stats to align with Chapter 5 requirements
  const battleDetails: Record<string, { enemy: string; weapon: string; problem: string; strategy: string }> = {
    'sales-prediction-system': {
      enemy: 'UNPREDICTABLE SALES DATA',
      weapon: 'MACHINE LEARNING & PYTHON',
      problem: 'Advertising budgets are scattered, and sales trends are highly chaotic and unpredictable.',
      strategy: 'Constructed a predictive regression pipeline using Scikit-Learn to analyze historical ad-spend matrices and forecast future sales.',
    },
    'teamtalk-pro': {
      enemy: 'COMMUNICATION CHALLENGES',
      weapon: 'SOCKET.IO & FULLSTACK REACT',
      problem: 'High-latency collaboration systems leading to team miscommunication, server lag, and authentication vulnerabilities.',
      strategy: 'Engineered a low-latency real-time workspace with JWT security, file sharing nodes, and a MySQL admin management center.',
    },
    'echoboard': {
      enemy: 'TEAM COLLABORATION PROBLEMS',
      weapon: 'REACT & NODE.JS SYSTEM',
      problem: 'Scattered workflow tracking, asynchronous team updates, and lack of visual boards for fast coordination.',
      strategy: 'Forged a unified real-time dashboard for team task allocation and boards, syncing updates dynamically.',
    },
    'multimodal-emotion-recognition': {
      enemy: 'EMOTION DETECTION COMPLEXITY',
      weapon: 'DEEP LEARNING & COMPUTER VISION',
      problem: 'Single-modal image or audio detectors fail to capture the compound complexity of human expressions.',
      strategy: 'Pioneered a multi-modal feature fusion framework merging speech tone features and video frames to detect compound emotions.',
    },
  }

  return (
    <section
      id="projects"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white"
    >
      {/* Background halftone highlight */}
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-manga-red/5 blur-[130px] pointer-events-none" />

      {/* Speed lines overlay */}
      <div className="absolute inset-0 speed-lines-bg opacity-20 pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="flex flex-col items-start w-full"
        >
          {/* Chapter Badge */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#ff2d2d] mb-6"
          >
            <span>CHAPTER 005</span>
            <span className="w-1.5 h-1.5 bg-manga-red" />
            <span>BATTLE ARENA</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-12"
          >
            BATTLE ARENA // <span className="text-manga-red">PROJECT SHOWCASE</span>
          </motion.h2>

          {/* Staggered Grid of Project Battle Sheets */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full"
          >
            {featuredProjects.map((project) => {
              const details = battleDetails[project.slug] || {
                enemy: 'UNKNOWN ANOMALY',
                weapon: 'React & TypeScript',
                problem: project.description,
                strategy: 'Implemented structured system architecture to eliminate the code anomaly.',
              }

              return (
                <motion.div
                  key={project.slug}
                  variants={fadeInUp}
                  transition={motionTransitions.smooth}
                  className="manga-panel p-6 md:p-8 border-3 border-white bg-black shadow-[6px_6px_0px_#fff] relative group overflow-hidden"
                >
                  {/* Diagonal background slash card highlight on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 skew-x-[-15deg] transform translate-x-12 translate-y-[-12px] group-hover:bg-manga-red/10 transition-colors duration-300 pointer-events-none" />

                  {/* High contrast project header */}
                  <div className="flex items-center justify-between mb-4 font-bebas text-xs tracking-wider text-manga-gray-light">
                    <span>ARENA_MOD // {project.slug.toUpperCase().replace('-', '_')}</span>
                    <span className="text-manga-red font-bold">LEVEL_1_CLEAR</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bebas text-3xl text-white mb-6 tracking-wide group-hover:text-manga-red transition-colors">
                    {project.title}
                  </h3>

                  {/* Red Victory Stamp */}
                  <div className="absolute right-4 top-14 border-4 border-manga-red text-manga-red font-bebas text-lg md:text-xl font-black px-4 py-1.5 uppercase tracking-widest rotate-[-10deg] select-none pointer-events-none opacity-85 shadow-[3px_3px_0px_#000]">
                    BATTLE VICTORY
                  </div>

                  {/* Mapped Battle Metrics */}
                  <div className="flex flex-col gap-3.5 mb-6 font-grotesk text-xs text-left">
                    <div>
                      <span className="font-bebas text-sm text-manga-red tracking-wider block">TARGET ENEMY:</span>
                      <p className="text-white font-bold bg-manga-gray-dark px-3 py-1 border border-white/20 inline-block skew-x-[-5deg]">
                        {details.enemy}
                      </p>
                    </div>

                    <div>
                      <span className="font-bebas text-sm text-manga-red tracking-wider block">CHOSEN WEAPON:</span>
                      <p className="text-white font-bold bg-manga-gray-dark px-3 py-1 border border-white/20 inline-block skew-x-[-5deg]">
                        {details.weapon}
                      </p>
                    </div>

                    <div>
                      <span className="font-bebas text-sm text-manga-red tracking-wider block">THE INFLICTED PROBLEM:</span>
                      <p className="text-manga-gray-bright leading-relaxed">
                        {details.problem}
                      </p>
                    </div>

                    <div>
                      <span className="font-bebas text-sm text-manga-red tracking-wider block">COMBAT STRATEGY:</span>
                      <p className="text-manga-gray-bright leading-relaxed">
                        {details.strategy}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-black border border-white text-white font-bebas text-[10px] tracking-wider uppercase select-none skew-x-[-5deg] group-hover:border-manga-red transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divider line */}
                  <div className="w-full h-[2px] bg-white/20 mb-6" />

                  {/* Features Bullet List */}
                  <h4 className="font-bebas text-xs tracking-wider text-manga-gray-light uppercase mb-3">TACTICAL OBJECTIVES SECURED</h4>
                  <ul className="flex flex-col gap-2.5 list-none p-0 m-0 text-xs text-manga-gray-bright font-grotesk">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-manga-red shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
