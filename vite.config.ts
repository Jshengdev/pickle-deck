import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// One app: the design system lives in design/src and is imported as '@design'; the decks live in deck/src.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@design': resolve(import.meta.dirname, 'design/src') } },
})
