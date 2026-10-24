import type { CSSProperties, ReactNode } from 'react'
import { Banner, Wordmark } from '@design/ui/kit'
import { Surface } from '@design/material/Surface'
import { tokens } from '@design/tokens'

/** The brand book's frame on the 1920 × 1080 canvas: margin 96, 12 columns, gutter 32 (tokens.component.deck).
    The hierarchy on every page, and nothing else: 1 the title (a short sentence that states the rule), 2 one lede,
    3 one hero (the real thing, rendered), 4 at most three short rules or captions. No label above the title, no borders
    around blocks, no badges, no pixel or mono labels (BRAND.md §12). Pixel type appears only where the machine speaks. */
export const D = tokens.component.deck
export const M = D.margin
export const COL = (D.width - 2 * M - (D.columns - 1) * D.gutter) / D.columns
export const span = (n: number) => n * COL + (n - 1) * D.gutter
export const TOP = 170

export type Meta = { n: number; total: number; chapter?: string; dark?: boolean; ink?: boolean }

/** The quiet chrome: the real mark and name top left, the chapter and page top right. */
export function Chrome({ n, total, chapter, dark, ink: allInk }: Meta) {
  const muted = dark ? 'var(--text-on-dark-muted)' : allInk ? 'var(--ink)' : 'var(--text-muted)'
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: M, top: 48 }}><Wordmark size={30} tone={dark ? 'on-dark' : 'ink'} /></div>
      <div style={{ position: 'absolute', right: M, top: 58, font: '400 19px/1 var(--font-head)', color: muted, fontVariantNumeric: 'tabular-nums', display: 'flex', gap: 28 }}>
        {chapter && <span>{chapter}</span>}<span>{n} / {total}</span>
      </div>
    </div>
  )
}

/** A content page: the title, one lede, then the body. */
export function Page({ title, lede, children, bodyStyle }: { title: ReactNode; lede?: ReactNode; children?: ReactNode; bodyStyle?: CSSProperties }) {
  return (
    <div style={{ position: 'absolute', left: M, right: M, top: TOP, bottom: 96, display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)', maxWidth: span(9) }}>{title}</h1>
      {lede && <p style={{ margin: '18px 0 0', font: 'var(--t-head-3)', color: 'var(--text-secondary)', maxWidth: span(7) }}>{lede}</p>}
      <div style={{ flex: 1, position: 'relative', marginTop: 56, ...bodyStyle }}>{children}</div>
    </div>
  )
}

/** A chapter opener: a banner (his traced cast, felt pieces and a hand-drawn mark, varied by seed) across the whole
    slide, and the chapter's name set large and quiet. Forest leads; sky and sage now and then. */
export function Opener({ num, name, lede, felt = 'forest', seed = 1 }: { num: string; name: string; lede?: ReactNode; felt?: 'forest' | 'sky' | 'sage'; seed?: number }) {
  const dark = felt === 'forest'
  const ink = dark ? 'var(--text-on-dark)' : 'var(--ink)', soft = dark ? 'var(--text-on-dark-muted)' : 'var(--ink)'
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Banner width={1920} height={1080} seed={seed} felt={felt} clearLeft={0.5} /></div>
      <div style={{ position: 'absolute', left: M, bottom: 120, color: ink, width: span(7) }}>
        <div style={{ font: '700 var(--deck-giant)/0.92 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>
          {name}<span style={{ font: `400 var(--deck-hero)/1 var(--font-pixel)`, color: soft, marginLeft: 28, letterSpacing: 0 }}>{num}</span>
        </div>
        {lede && <p style={{ margin: '28px 0 0', font: 'var(--t-second-2)', color: soft, maxWidth: span(5) }}>{lede}</p>}
      </div>
    </>
  )
}
export const OPENER_FELT = { sage: 'surface-felt-sage', sky: 'surface-felt-sky', forest: 'surface-felt' } as const

/** A figure: the thing, then (only if it adds something) one caption sentence. */
export function Fig({ caption, children, w, h, style }: { caption?: ReactNode; children?: ReactNode; w?: number; h?: number; style?: CSSProperties }) {
  return (
    <figure style={{ margin: 0, width: w, display: 'flex', flexDirection: 'column', ...style }}>
      <div style={{ height: h, position: 'relative', display: 'grid', placeItems: 'center' }}>{children}</div>
      {caption && <figcaption style={{ marginTop: 18, font: '400 20px/1.45 var(--font-head)', color: 'var(--text-muted)' }}>{caption}</figcaption>}
    </figure>
  )
}

/** A rule: a short lead sentence and one more. No dot, no box. */
export function Rule({ lead, children }: { lead: string; children?: ReactNode }) {
  return (
    <div>
      <div style={{ font: '600 23px/1.3 var(--font-head)', letterSpacing: '-0.01em' }}>{lead}</div>
      {children && <div style={{ font: '400 20px/1.45 var(--font-head)', color: 'var(--text-secondary)', marginTop: 4 }}>{children}</div>}
    </div>
  )
}

/** Do and don't, shown with real renders: the word under each, nothing else. */
export function DoDont({ items, size = 260 }: { items: { ok: boolean; el: ReactNode; note: string }[]; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: D.gutter }}>
      {items.map((it, i) => (
        <div key={i} style={{ width: size }}>
          <div style={{ height: size * 0.72, borderRadius: 18, background: 'var(--surface-sunken)', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>{it.el}</div>
          <div style={{ marginTop: 14, font: '600 20px var(--font-head)' }}>{it.ok ? 'Do' : 'Don’t'}</div>
          <div style={{ font: '400 18px/1.4 var(--font-head)', color: 'var(--text-muted)' }}>{it.note}</div>
        </div>
      ))}
    </div>
  )
}

/** A redline: a measured dimension (real numbers from the tokens), in the focus colour. Parent px. */
export function Redline({ x1, y1, x2, y2, label, side = 'above' }: { x1: number; y1: number; x2: number; y2: number; label: string; side?: 'above' | 'below' | 'left' | 'right' }) {
  const horiz = Math.abs(y2 - y1) < Math.abs(x2 - x1)
  const len = horiz ? Math.abs(x2 - x1) : Math.abs(y2 - y1)
  const lx = horiz ? Math.min(x1, x2) : x1, ly = horiz ? y1 : Math.min(y1, y2)
  const bar = (extra: CSSProperties) => <i style={{ position: 'absolute', background: 'var(--focus)', ...extra }} />
  const lab: CSSProperties = horiz
    ? { left: '50%', transform: 'translateX(-50%)', [side === 'below' ? 'top' : 'bottom']: 8 }
    : { top: '50%', transform: 'translateY(-50%)', [side === 'left' ? 'right' : 'left']: 10 }
  return (
    <div style={{ position: 'absolute', left: lx, top: ly, width: horiz ? len : 0, height: horiz ? 0 : len, pointerEvents: 'none' }}>
      {horiz ? bar({ left: 0, right: 0, top: -0.75, height: 1.5 }) : bar({ top: 0, bottom: 0, left: -0.75, width: 1.5 })}
      {horiz ? <>{bar({ left: 0, top: -6, width: 1.5, height: 12 })}{bar({ right: 0, top: -6, width: 1.5, height: 12 })}</>
        : <>{bar({ top: 0, left: -6, height: 1.5, width: 12 })}{bar({ bottom: 0, left: -6, height: 1.5, width: 12 })}</>}
      <span style={{ position: 'absolute', whiteSpace: 'nowrap', font: '500 17px var(--font-head)', fontVariantNumeric: 'tabular-nums', color: 'var(--focus)', ...lab }}>{label}</span>
    </div>
  )
}

/** Code: Geist Mono on night, the one place mono belongs. */
export function Code({ children, style }: { children: string; style?: CSSProperties }) {
  return <pre style={{ margin: 0, padding: '26px 30px', background: 'var(--surface-night)', color: 'var(--text-on-dark)', borderRadius: 29, font: '20px/1.6 var(--font-mono)', whiteSpace: 'pre', overflow: 'hidden', ...style }}>{children}</pre>
}

/** A swatch: colour, then its name and use in Pretendard (no labels inside the colour). */
export function Swatch({ color, name, use, h = 120 }: { color: string; name: string; use: string; h?: number }) {
  return (
    <div>
      <div style={{ height: h, borderRadius: 18, background: color }} />
      <div style={{ marginTop: 12, font: '600 20px var(--font-head)' }}>{name}</div>
      <div style={{ font: '400 18px/1.4 var(--font-head)', color: 'var(--text-muted)' }}>{use}</div>
    </div>
  )
}

/** A voice at a level, as a style (from tokens.type.levels), for samples that need the exact numbers. */
export function lvl(face: 'head' | 'second' | 'dot' | 'pixel', n: 1 | 2 | 3 | 4, cap?: number): React.CSSProperties {
  const [size, weight, track, lead] = (tokens.type.levels as Record<string, Record<number, readonly number[]>>)[face][n]
  return { fontFamily: `var(--font-${face})`, fontSize: cap ? Math.min(size, cap) : size, fontWeight: weight, letterSpacing: `${track}em`, lineHeight: lead }
}
