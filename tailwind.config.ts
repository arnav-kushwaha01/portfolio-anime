import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: ['var(--font-display)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },
      colors: {
        space: '#05070f',
        'space-950': '#030611',
        'space-900': '#05070f',
        'space-800': '#0b1020',
        'space-700': '#101828',
        orbit: '#101828',
        starlight: '#f8fafc',
        muted: '#94a3b8',
        void: '#64748b',
        plasma: '#22d3ee',
        'plasma-300': '#67e8f9',
        'plasma-400': '#22d3ee',
        'plasma-500': '#06b6d4',
        nebula: '#8b5cf6',
        'nebula-400': '#a78bfa',
        'nebula-500': '#8b5cf6',
        solar: '#facc15',
        'solar-300': '#fde68a',
        'solar-400': '#facc15',
      },
      boxShadow: {
        'glow-plasma': '0 0 40px rgba(34, 211, 238, 0.28)',
        'glow-nebula': '0 0 48px rgba(139, 92, 246, 0.24)',
      },
      maxWidth: {
        page: '80rem',
      },
    },
  },
} satisfies Config
