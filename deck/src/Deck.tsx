import { useEffect, useState } from 'react'
import { DialRoot, useDialKit } from 'dialkit'
import { slides } from './decks'
import { Chrome } from './brand/frame'
import dials from './dials.json'

const W = 1920, H = 1080
const pageOf = () => Math.max(1, Math.min(slides.length, parseInt(location.hash.replace('#/', ''), 10) || 1))

/** The deck: one 1920 × 1080 slide at a time, scaled to the window. ← → page, G toggles the grid, ?print shows every
    slide at full size for the PDF (tools/pdf.mjs). Dials (his rule) start from src/dials.json and hide in print. */
export function Deck() {
  const print = new URLSearchParams(location.search).has('print')
  const [page, setPage] = useState(pageOf)
  const [grid, setGrid] = useState(false)
  const [scale, setScale] = useState(1)
  const d = useDialKit('Deck', { margin: [dials.margin, 48, 160, 4], typeScale: [dials.typeScale, 0.8, 1.25, 0.01] })

  useEffect(() => {
    const fit = () => setScale(Math.min(innerWidth / W, innerHeight / H))
    const onHash = () => setPage(pageOf())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') location.hash = `/${Math.min(slides.length, pageOf() + 1)}`
      if (e.key === 'ArrowLeft') location.hash = `/${Math.max(1, pageOf() - 1)}`
      if (e.key.toLowerCase() === 'g') setGrid((g) => !g)
    }
    fit(); addEventListener('resize', fit); addEventListener('hashchange', onHash); addEventListener('keydown', onKey)
    return () => { removeEventListener('resize', fit); removeEventListener('hashchange', onHash); removeEventListener('keydown', onKey) }
  }, [])

  const vars = { '--slide-margin': `${d.margin}px`, '--type-scale': d.typeScale } as React.CSSProperties
  const frame = (i: number, s: number) => {
    const e = slides[i], Slide = e.render
    return (
      <div key={i} style={{ width: W * s, height: H * s, overflow: 'hidden', position: 'relative', flex: 'none' }}>
        <div style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: '0 0', position: 'relative', overflow: 'hidden', background: e.ground ?? 'var(--surface-ground)', color: e.dark ? 'var(--text-on-dark)' : 'var(--ink)', ...vars }}>
          <Slide />
          {e.chrome !== false && <Chrome n={i + 1} total={slides.length} chapter={e.chapter} dark={e.dark} ink={e.ink} />}
        </div>
      </div>
    )
  }

  if (print) return <div>{slides.map((_, i) => <div key={i} style={{ breakAfter: i < slides.length - 1 ? 'page' : 'auto' }}>{frame(i, 1)}</div>)}</div>
  return (
    <>
      {grid
        ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: 16 }}>{slides.map((_, i) => <a key={i} href={`#/${i + 1}`} onClick={() => setGrid(false)}>{frame(i, 0.2)}</a>)}</div>
        : <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>{frame(page - 1, scale)}</div>}
      <div className="no-print"><DialRoot position="bottom-right" defaultOpen={false} productionEnabled /></div>
    </>
  )
}
