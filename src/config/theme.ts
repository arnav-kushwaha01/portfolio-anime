export const colorTokens = {
  space: {
    950: '#030611',
    900: '#05070f',
    800: '#0b1020',
    700: '#101828',
  },
  starlight: {
    50: '#f8fafc',
    100: '#e2e8f0',
    200: '#cbd5e1',
  },
  plasma: {
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
  },
  nebula: {
    400: '#a78bfa',
    500: '#8b5cf6',
  },
  solar: {
    300: '#fde68a',
    400: '#facc15',
  },
  void: {
    500: '#64748b',
    600: '#475569',
    700: '#334155',
  },
} as const

export const typographyTokens = {
  fontSans:
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontDisplay:
    "var(--font-sans), Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
} as const

export const themeTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  radii: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
} as const
