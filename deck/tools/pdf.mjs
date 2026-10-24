// Prints every slide (add ?deck=pitch via DECK=pitch) to deck/exports/pickje-deck.pdf at 1920 × 1080. Needs the dev server: npm run dev (port 5320).
import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
mkdirSync(new URL('../exports/', import.meta.url), { recursive: true })
const b = await chromium.launch({ channel: 'chrome' })
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
await p.goto(`http://127.0.0.1:5320/?print${process.env.DECK ? `&deck=${process.env.DECK}` : ''}`, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(2500)
const out = new URL('../exports/pickje-deck.pdf', import.meta.url).pathname   // deck/exports, gitignored
await p.pdf({ path: out, width: '1920px', height: '1080px', printBackground: true })
await b.close()
console.log('wrote', out)
