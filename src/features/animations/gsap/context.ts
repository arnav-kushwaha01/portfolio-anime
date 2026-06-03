'use client'

import gsap from 'gsap'

export function createGsapContext(scope?: Element | string) {
  return gsap.context(() => undefined, scope)
}
