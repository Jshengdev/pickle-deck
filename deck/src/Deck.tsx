import { useEffect, useState } from 'react'
import { DialRoot, useDialKit } from 'dialkit'
import { slides, which } from './decks'
import { tokens } from '@design/tokens'
import { Chrome } from './brand/frame'
import { Builds } from './pitch/kit/step'
import dials from './dials.json'

const W = 1920, H = 1080
const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n))
const lastStep = (page: number) => (slides[page - 1].steps ?? 1) - 1

/** Where we are, from the hash: #/3 is slide 3 at its first step, #/3/2 is slide 3 at step 2 (steps count from 0). */
const read = () => {
  const [p, s] = location.hash.replace('#/', '').split('/')
  const page = clamp(parseInt(p, 10) || 1, 1, slides.length)
  return { page, step: clamp(parseInt(s, 10) || 0, 0, lastStep(page)) }
}
const go = (page: number, step: number) => { location.hash = step ? `/${page}/${step}` : `/${page}` }

/** Every brand text level (--t-head-1 … --t-pixel-4), re-declared so it grows with the "type scale" dial. */
const levels = tokens.type.levels as unknown as Record<string, Record<string, readonly number[]>>
const scaledType = Object.fromEntries(Object.entries(levels).flatMap(([face, lv]) => Object.entries(lv).map(([n, [size, weight, , lead]]) =>
  [`--t-${face}-${n}`, `${weight} calc(${size}px * var(--type-scale))/${lead} var(--font-${face})`])))
/** The pitch reads from the back of a room, so it starts bigger; the brand book keeps the brand's sizes. */
const startScale = which === 'pitch' ? dials.pitchTypeScale : dials.typeScale

/** The deck: one 1920 × 1080 slide at a time, scaled to the window.
    → / space: the next step of this slide, then the next slide. ←: back a step. ↓ ↑: skip a whole slide.
    G toggles the grid, ?print shows every slide at its last step for the PDF (tools/pdf.mjs).
    Dials (his rule) start from src/dials.json and hide in print. "type scale" grows every brand text level at once. */
export function Deck() {
  const print = new URLSearchParams(location.search).has('print')
  const [at, setAt] = useState(read)
  const [grid, setGrid] = useState(false)
  const [scale, setScale] = useState(1)
  const d = useDialKit('Deck', { margin: [dials.margin, 48, 160, 4], typeScale: [startScale, 0.8, 1.6, 0.01] })

  useEffect(() => {
    const fit = () => setScale(Math.min(innerWidth / W, innerHeight / H))
    const onHash = () => setAt(read())
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest?.('input, textarea, [contenteditable]')) return
      const { page, step } = read()
      if (e.key === 'ArrowRight' || e.key === ' ') step < lastStep(page) ? go(page, step + 1) : page < slides.length && go(page + 1, 0)
      if (e.key === 'ArrowLeft') step > 0 ? go(page, step - 1) : page > 1 && go(page - 1, lastStep(page - 1))
      if (e.key === 'ArrowDown') go(Math.min(slides.length, page + 1), 0)
      if (e.key === 'ArrowUp') go(Math.max(1, page - 1), 0)
      if (e.key.toLowerCase() === 'g') setGrid((g) => !g)
    }
    fit(); addEventListener('resize', fit); addEventListener('hashchange', onHash); addEventListener('keydown', onKey)
    return () => { removeEventListener('resize', fit); removeEventListener('hashchange', onHash); removeEventListener('keydown', onKey) }
  }, [])

  const vars = { '--slide-margin': `${d.margin}px`, '--type-scale': d.typeScale, ...scaledType } as React.CSSProperties
  const frame = (i: number, s: number, step: number) => {
    const e = slides[i], Slide = e.render
    return (
      <div key={i} style={{ width: W * s, height: H * s, overflow: 'hidden', position: 'relative', flex: 'none' }}>
        <div style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: '0 0', position: 'relative', overflow: 'hidden', background: e.ground ?? 'var(--surface-ground)', color: e.dark ? 'var(--text-on-dark)' : 'var(--ink)', ...vars }}>
          <Builds step={step}><Slide step={step} /></Builds>
          {e.chrome !== false && <Chrome n={i + 1} total={slides.length} chapter={e.chapter} dark={e.dark} ink={e.ink} />}
        </div>
      </div>
    )
  }

  if (print) return <div>{slides.map((_, i) => <div key={i} style={{ breakAfter: i < slides.length - 1 ? 'page' : 'auto' }}>{frame(i, 1, lastStep(i + 1))}</div>)}</div>
  return (
    <>
      {grid
        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 16 }}>{slides.map((_, i) => <a key={i} href={`#/${i + 1}`} onClick={() => setGrid(false)}>{frame(i, 0.2, lastStep(i + 1))}</a>)}</div>
        : <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>{frame(at.page - 1, scale, at.step)}</div>}
      <div className="no-print"><DialRoot position="bottom-right" defaultOpen={false} productionEnabled /></div>
    </>
  )
}
