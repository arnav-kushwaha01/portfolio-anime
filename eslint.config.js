import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default defineConfig([
  globalIgnores(['.next', 'node_modules', 'out', 'dist', 'next-env.d.ts']),
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
  },
])
