'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { contactLinks } from '@/data/contact'
import { fadeInUp, staggerContainer } from '@/features/animations/framer/variants'
import { motionTransitions } from '@/features/animations/framer/transitions'

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return

    setStatus('transmitting')
    setTimeout(() => {
      setStatus('sent')
      setFormState({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setStatus('idle')
      }, 3500)
    }, 2000)
  }

  const resumeLink = contactLinks.find((l) => l.label === 'Resume')?.href || '/RESUME.pdf'

  return (
    <section
      id="contact"
      className="min-h-screen w-full relative flex flex-col items-center justify-between py-24 px-6 md:px-16 lg:px-24 bg-transparent border-t-3 border-white overflow-hidden"
    >
      {/* Background speed lines */}
      <div className="absolute inset-0 speed-lines-bg opacity-15 pointer-events-none" />
      <div className="absolute inset-0 halftone-bg-red opacity-10 pointer-events-none" />

      <div className="container-page relative z-10 w-full flex-grow flex flex-col justify-center mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Comms Channels */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-5 flex flex-col items-start"
          >
            {/* Chapter Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-black text-black font-bebas text-sm tracking-widest skew-x-[-8deg] shadow-[2px_2px_0px_#ff2d2d] mb-6">
              <span>CHAPTER 008</span>
              <span className="w-1.5 h-1.5 bg-manga-red" />
              <span>CONTACT TERMINAL</span>
            </div>

            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-6">
              ESTABLISH // <span className="text-manga-red">SIGNAL UPLINK</span>
            </h2>

            <p className="font-grotesk text-sm md:text-base text-manga-gray-bright leading-relaxed mb-8 text-pretty">
              Establish a secure coordinate bridge. Input your message into the transmission terminal, or connect directly through the active shonen communication channels below.
            </p>

            {/* Social Transmitter Nodes */}
            <div className="flex flex-col gap-4 w-full">
              {contactLinks.map((link) => {
                if (link.label === 'Resume') return null

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-white bg-manga-gray-dark hover:border-manga-red p-4 transition-all flex items-center justify-between group skew-x-[-2deg] shadow-[3px_3px_0px_#fff] hover:shadow-[3px_3px_0px_#ff2d2d]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 bg-manga-red" />
                      <span className="font-bebas text-sm tracking-wider text-manga-gray-bright group-hover:text-white transition-colors uppercase">
                        CHANNEL // {link.label}
                      </span>
                    </div>
                    <span className="font-bebas text-xs tracking-widest text-manga-red group-hover:underline">
                      CONNECT_LINK
                    </span>
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column: Terminal Transmitter Console Form */}
          <motion.div
            variants={fadeInUp}
            transition={motionTransitions.smooth}
            className="lg:col-span-7"
          >
            <div className="border-3 border-white bg-manga-gray-dark p-6 md:p-8 shadow-[6px_6px_0px_#ff2d2d] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-manga-red" />

              <div className="flex items-center justify-between mb-6 font-bebas text-xs tracking-wider text-manga-gray-light">
                <span>TERMINAL // SIGNAL_TRANSMITTER</span>
                <span className="text-manga-red font-bold uppercase animate-pulse">
                  STATUS: {status === 'idle' ? 'ready' : status === 'transmitting' ? 'broadcasting' : 'delivered'}
                </span>
              </div>

              {/* Form Screens */}
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label className="font-bebas text-xs tracking-wider text-manga-gray-light uppercase">
                        RETURN IDENTITY (NAME)
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="ENTER NAME OR GUILD..."
                        className="w-full bg-black border-2 border-white focus:border-manga-red focus:bg-manga-gray-dark px-4 py-3 font-grotesk text-sm text-white placeholder-manga-gray-light outline-none transition-all skew-x-[-1deg]"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="font-bebas text-xs tracking-wider text-manga-gray-light uppercase">
                        RETURN VECTOR (EMAIL)
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleInputChange}
                        placeholder="ENTER TRANSMISSION EMAIL..."
                        className="w-full bg-black border-2 border-white focus:border-manga-red focus:bg-manga-gray-dark px-4 py-3 font-grotesk text-sm text-white placeholder-manga-gray-light outline-none transition-all skew-x-[-1deg]"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                      <label className="font-bebas text-xs tracking-wider text-manga-gray-light uppercase">
                        SIGNAL PAYLOAD (MESSAGE)
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="ENTER CODES / TRANSMISSION SIGNAL..."
                        className="w-full bg-black border-2 border-white focus:border-manga-red focus:bg-manga-gray-dark px-4 py-3 font-grotesk text-sm text-white placeholder-manga-gray-light outline-none transition-all resize-none skew-x-[-1deg]"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full font-bebas text-base tracking-widest font-bold text-black bg-white border-2 border-black py-4 hover:bg-manga-red hover:text-white transition-all duration-200 cursor-pointer shadow-[4px_4px_0px_#ff2d2d] hover:shadow-[4px_4px_0px_#fff]"
                    >
                      TRANSMIT_SIGNAL
                    </button>
                  </motion.form>
                )}

                {status === 'transmitting' && (
                  <motion.div
                    key="transmitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 font-bebas text-center"
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-dashed border-manga-red animate-spin border-t-transparent mb-6" />
                    <div className="text-manga-red text-lg tracking-widest animate-pulse font-bold">
                      BROADCASTING_SIGNAL_DECK...
                    </div>
                    <div className="text-xs text-manga-gray-light tracking-widest mt-2 uppercase font-grotesk">
                      Syncing satellite uplink channels
                    </div>
                  </motion.div>
                )}

                {status === 'sent' && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 font-bebas text-center"
                  >
                    <div className="w-16 h-16 border-4 border-manga-red bg-manga-red/10 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(255,45,45,0.3)] rotate-[-6deg]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-8 h-8 text-manga-red"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-manga-red text-xl tracking-widest font-black mb-2">
                      [ OK ] SIGNAL_TRANSMITTED
                    </div>
                    <div className="text-xs text-manga-gray-bright tracking-wider uppercase font-grotesk max-w-xs leading-relaxed">
                      Transmission successfully registered on mission logs. Awaiting response.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FINAL CHAPTER: TO BE CONTINUED... */}
      <div className="w-full relative z-10 border-t-4 border-white pt-16 mt-8 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl"
        >
          {/* The Journey Continues message */}
          <div className="font-grotesk text-xs md:text-sm tracking-[0.25em] text-manga-gray-light uppercase mb-6 font-bold">
            — THE JOURNEY OF THE BUILDER CONTINUES —
          </div>

          {/* Stenciled To Be Continued Comic Panel */}
          <div className="border-4 border-white bg-black px-12 py-6 shadow-[8px_8px_0px_#ff2d2d] rotate-[-2deg] skew-x-[-4deg] mb-12 hover:rotate-[0deg] transition-transform duration-300">
            <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-widest leading-none select-none">
              TO BE <span className="text-manga-red">CONTINUED</span>...
            </h2>
          </div>

          {/* Call to action resume button */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-manga-red text-black border-2 border-white font-bebas text-base tracking-widest skew-x-[-6deg] shadow-[4px_4px_0px_#fff] hover:bg-white hover:text-black transition-colors"
            >
              DOWNLOAD RESUME
            </a>
          </div>

          {/* Credits footer */}
          <div className="font-grotesk text-[10px] tracking-widest text-manga-gray-light uppercase pb-2">
            CREATED BY ARNAV KUSHWAHA // ALL RIGHTS RESERVED © 2026
          </div>
        </motion.div>
      </div>
    </section>
  )
}
