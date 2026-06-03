'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navigationItems } from '@/config/navigation'

export function Navbar() {
  const [activeId, setActiveId] = useState<string>('#hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  // Mapping of hrefs to Chapter names/numbers
  const chapterMappings: Record<string, { short: string; full: string }> = {
    '#hero': { short: 'CH 001', full: '01. The Awakening' },
    '#about': { short: 'CH 002', full: '02. Character Profile' },
    '#skills': { short: 'CH 003', full: '03. Training Arc' },
    '#experience': { short: 'CH 004', full: '04. Mission Logs' },
    '#projects': { short: 'CH 005', full: '05. Battle Arena' },
    '#research': { short: 'CH 006', full: '06. Forbidden Research' },
    '#certifications': { short: 'CH 007', full: '07. Achievement Archive' },
    '#contact': { short: 'CH 008', full: '08. Contact Terminal' },
  }

  // 1. Scroll observer to highlight the active section
  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.href.replace('#', ''))
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingRef.current) return

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(`#${entry.target.id}`)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.unobserve(el)
      })
      observer.disconnect()
    }
  }, [])

  // Lock body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Handle smooth scroll clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      isScrollingRef.current = true
      setActiveId(href)
      setIsMenuOpen(false)

      targetElement.scrollIntoView({
        behavior: 'smooth',
      })

      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = window.setTimeout(() => {
        isScrollingRef.current = false
      }, 900)
    }
  }

  return (
    <>
      {/* Floating Desktop & Mobile Header wrapper */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[min(95vw,1200px)] select-none">
        <nav className="w-full h-16 bg-black border-2 border-white flex items-center justify-between px-6 md:px-8 shadow-[4px_4px_0px_#ff2d2d] skew-x-[-1deg] relative">
          
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 group z-10"
          >
            <span className="font-bebas text-2xl tracking-[0.1em] text-white transition-colors group-hover:text-manga-red">
              ARNAV // VOL.01
            </span>
            <span className="h-2 w-2 bg-manga-red skew-x-[-10deg]" />
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 bg-manga-gray-dark border border-white/20 py-0.5 px-1 rounded-sm relative z-10">
            {navigationItems.map((item) => {
              const active = activeId === item.href
              const chInfo = chapterMappings[item.href] || { short: item.label, full: item.label }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 font-bebas text-sm tracking-wider uppercase transition-colors duration-200 rounded-sm cursor-pointer ${
                    active ? 'text-black' : 'text-manga-gray-light hover:text-white'
                  }`}
                >
                  {/* Skewed red active block */}
                  {active && (
                    <motion.span
                      layoutId="activeMangaPill"
                      className="absolute inset-0 bg-manga-red border border-white rounded-sm -z-10 skew-x-[-8deg] shadow-[2px_2px_0px_#fff]"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  )}
                  {chInfo.short}
                </a>
              )
            })}
          </div>

          {/* Right CTA Button (Desktop only) */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:flex font-bebas text-sm tracking-widest text-white border-2 border-white bg-black hover:bg-manga-red hover:shadow-[3px_3px_0px_#fff] px-5 py-2 transition-all duration-200 z-10 skew-x-[-5deg] shadow-[3px_3px_0px_#ff2d2d]"
          >
            CONTACT_TERM
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex lg:hidden flex-col items-center justify-center w-10 h-10 border-2 border-white bg-black cursor-pointer relative z-50 focus:outline-none hover:bg-manga-gray-medium transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center relative">
              <span
                className={`w-5 h-[2px] bg-white transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-white transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-white transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/98 md:flex flex-col justify-center px-8 relative overflow-hidden halftone-bg"
          >
            {/* Speed line vector overlay in mobile menu background */}
            <div className="absolute inset-0 speed-lines-bg opacity-30 pointer-events-none" />

            {/* Giant volume outline title in background */}
            <div className="absolute right-4 bottom-4 font-bebas text-[12vw] text-stroke-white opacity-5 select-none pointer-events-none">
              VOL.01
            </div>

            {/* Mobile Navigation Links */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="flex flex-col gap-4 max-w-lg mt-10 relative z-10"
            >
              {navigationItems.map((item) => {
                const active = activeId === item.href
                const chInfo = chapterMappings[item.href] || { short: item.label, full: item.label }

                return (
                  <motion.div
                    key={item.label}
                    variants={{
                      hidden: { x: -30, opacity: 0 },
                      show: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 20 } },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="inline-flex items-center gap-4 group"
                    >
                      <span className="font-bebas text-lg tracking-widest text-manga-red">
                        {chInfo.short}
                      </span>
                      <span
                        className={`text-2xl font-bebas tracking-wide uppercase transition-all duration-200 ${
                          active 
                            ? 'text-white border-b-3 border-manga-red scale-105 origin-left' 
                            : 'text-manga-gray-light hover:text-white'
                        }`}
                      >
                        {chInfo.full.split('. ')[1]}
                      </span>
                    </a>
                  </motion.div>
                )
              })}

              <motion.div
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 },
                }}
                className="pt-6 border-t-2 border-white/10 mt-4"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="inline-block font-bebas text-base tracking-widest text-black bg-white hover:bg-manga-red hover:text-white px-8 py-3.5 border-2 border-black shadow-[4px_4px_0px_#ff2d2d] transition-all"
                >
                  ESTABLISH_UPLINK
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
