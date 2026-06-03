'use client'

import { motion } from 'framer-motion'
import { skillsByCategory } from '@/data/skills'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function SkillsSection() {
  // Hardcoded power levels representing Arnav's progress
  const powerLevels: Record<string, number> = {
    'Frontend': 85,
    'Backend': 75,
    'Database': 70,
    'Programming Languages': 85,
    'Data Science': 80,
    'Tools': 80,
  }

  // Helper function to render a segmented manga power bar
  const renderPowerBar = (percent: number) => {
    const totalSegments = 10
    const filledSegments = Math.round((percent / 100) * totalSegments)
    
    return (
      <div className="flex items-center gap-1 w-full my-3">
        {Array.from({ length: totalSegments }).map((_, idx) => {
          const isFilled = idx < filledSegments
          return (
            <motion.div
              key={idx}
              initial={{ scaleY: 0.1, backgroundColor: '#1c1c1c' }}
              whileInView={{ 
                scaleY: [0.1, 1, 1],
                backgroundColor: isFilled ? '#ff2d2d' : '#1c1c1c' 
              }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className={`h-5 w-full border border-white skew-x-[-10deg] ${
                isFilled ? 'bg-manga-red' : 'bg-manga-gray-dark'
              }`}
            />
          )
        })}
      </div>
    )
  }

  return (
    <section
      id="skills"
      className="min-h-screen w-full relative flex items-center justify-center py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white"
    >
      {/* Background halftone element */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-manga-red/5 blur-[130px] pointer-events-none" />

      {/* Speed lines backdrop */}
      <div className="absolute inset-0 speed-lines-bg opacity-25 pointer-events-none" />

      <div className="container-page relative z-10 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="flex flex-col items-start w-full"
        >
          {/* Chapter Badge */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#ff2d2d] mb-6"
          >
            <span>CHAPTER 003</span>
            <span className="w-1.5 h-1.5 bg-manga-red" />
            <span>TRAINING ARC</span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-12"
          >
            TRAINING ARC // <span className="text-manga-red">POWER SCALING</span>
          </motion.h2>

          {/* Grid of skill categories */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            {skillsByCategory.map((category) => {
              const powerVal = powerLevels[category.label] || 75
              return (
                <motion.div
                  key={category.label}
                  variants={fadeInUp}
                  transition={motionTransitions.smooth}
                  className="manga-panel p-6 border-3 border-white bg-black shadow-[6px_6px_0px_#fff] relative group overflow-hidden"
                >
                  {/* Glowing halftone corner overlay on card hover */}
                  <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-manga-red opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full blur-md" />

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 font-bebas text-xs tracking-wider text-manga-gray-light">
                    <span>SYS_MOD // {category.label.toUpperCase().replace(' ', '_')}</span>
                    <span className="text-manga-red font-bold animate-pulse">ACTIVE</span>
                  </div>

                  <h3 className="font-bebas text-2xl text-white mb-1 tracking-wide">
                    {category.label}
                  </h3>

                  {/* Power Level Label */}
                  <div className="flex items-end justify-between font-bebas">
                    <span className="text-xs text-manga-gray-light">POWER SCALE</span>
                    <span className="text-xl text-manga-red font-extrabold">{powerVal}%</span>
                  </div>

                  {/* Segmented Power Bar */}
                  {renderPowerBar(powerVal)}

                  {/* Divider */}
                  <div className="w-full h-[2px] bg-white/10 my-4" />

                  {/* Specific Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="px-2.5 py-1 bg-manga-gray-dark border border-white text-[10px] text-manga-gray-bright font-grotesk tracking-wider transition-colors hover:border-manga-red hover:bg-manga-red/10 flex items-center gap-1.5 select-none"
                      >
                        <span className="h-1 w-1 bg-manga-red" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
