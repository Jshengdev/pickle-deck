import { useState, type ReactNode } from 'react'
import { Surface } from '../../material/Surface'
import { Scribble } from './Banner'

/** Diagrams in the brand (his words, 2026-10-24: "using a lot of data, metrics… help define all the different diagrams").
    Every chart names its source under it; values are numerals in Geist Pixel; labels are Pretendard in text colours, never
    the series colour. One series, one hue, no legend; a hover shows the note behind each bar. */
export type Bar = { label: string; value: number; display: string; note?: string }

export function Bars({ rows, width = 900, accent = 'var(--surface-felt)', felt = false, source, scale = 1 }: {
  rows: Bar[]; width?: number; accent?: string; felt?: boolean; source: string; scale?: number
}) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...rows.map((r) => r.value))
  const labelW = 260 * scale, valueW = 140 * scale, track = width - labelW - valueW
  const thick = 18 * scale, rowH = 46 * scale
  return (
    <figure style={{ margin: 0, width }}>
      <div style={{ display: 'grid', gap: 2 * scale }}>
        {rows.map((r, i) => {
          const w = Math.max(6, (r.value / max) * track)
          return (
            <div key={r.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} title={r.note}
              style={{ display: 'grid', gridTemplateColumns: `${labelW}px ${track}px ${valueW}px`, alignItems: 'center', height: rowH, cursor: 'default' }}>
              <span style={{ font: `400 ${20 * scale}px/1.2 var(--font-head)`, color: hover === i ? 'var(--ink)' : 'var(--text-secondary)' }}>{r.label}</span>
              <div style={{ position: 'relative', height: thick }}>
                {felt
                  ? <Surface material="felt" color="surface-felt" width={w} height={thick} radius={4 * scale} shadow={0.4} spread={4} pad={8} fringe={0.6} />
                  : <div style={{ width: w, height: thick, background: accent, borderRadius: `0 ${4 * scale}px ${4 * scale}px 0`, opacity: hover === null || hover === i ? 1 : 0.55 }} />}
              </div>
              <span style={{ font: `400 ${24 * scale}px/1 var(--font-pixel)`, color: 'var(--ink)', paddingLeft: 14 * scale }}>{r.display}</span>
            </div>
          )
        })}
      </div>
      <figcaption style={{ marginTop: 16 * scale, font: `400 ${16 * scale}px/1.4 var(--font-head)`, color: 'var(--text-muted)' }}>
        {hover !== null && rows[hover].note ? rows[hover].note : `Source: ${source}`}
      </figcaption>
    </figure>
  )
}

export type Step = { label: string; value: string; id?: string }
/** A pipeline: metal pebbles joined by hand-drawn arrows, each with its measured number (Geist Pixel) and where it came from. */
export function Flow({ steps, w = 250, h = 130, scale = 1, footnote }: { steps: Step[]; w?: number; h?: number; scale?: number; footnote?: ReactNode }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10 * scale }}>
            <Surface material="metal" width={w * scale} height={h * scale} radius={(h * scale) / 2} dome={0.5} contrast={1.25} spread={14} shadow={0.7}>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center', justifyItems: 'center', gap: 6 * scale, textAlign: 'center', padding: `0 ${18 * scale}px` }}>
                <span style={{ font: `600 ${21 * scale}px/1.15 var(--font-head)`, letterSpacing: '-0.01em' }}>{s.label}</span>
                <span style={{ font: `400 ${22 * scale}px/1 var(--font-pixel)` }}>{s.value}</span>
              </div>
            </Surface>
            {i < steps.length - 1 && <div style={{ width: 60 * scale }}><Scribble kind="arrow" w={60 * scale} seed={i + 2} /></div>}
          </div>
        ))}
      </div>
      {footnote && <figcaption style={{ marginTop: 22 * scale, font: `400 ${16 * scale}px/1.4 var(--font-head)`, color: 'var(--text-muted)' }}>{footnote}</figcaption>}
    </figure>
  )
}
