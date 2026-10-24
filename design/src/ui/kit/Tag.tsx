import type { ReactNode } from 'react'
import { tokens } from '../../tokens'

export type Status = 'asleep' | 'listening' | 'heard' | 'working' | 'waiting' | 'checked' | 'caught' | 'stuck'
const DOT: Record<Status, string> = {
  asleep: 'var(--state-asleep)', listening: 'var(--state-listening)', heard: 'var(--state-heard)', working: 'var(--state-working)',
  waiting: 'var(--state-waiting)', checked: 'var(--state-checked)', caught: 'var(--catch)', stuck: 'var(--state-stuck)',
}

/** The tag: a state square and a pixel word, for a dense live list of sessions only (BRAND.md: state is said in words
    first; never a badge for decoration, sign #5). Height 28, padding 10, radius 8. Amber only for "caught", red only for "stuck". */
export function Tag({ status, children, scale = 1 }: { status: Status; children?: ReactNode; scale?: number }) {
  const c = tokens.component.chip
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: c.gap * scale, height: c.height * scale, padding: `0 ${c.padX * scale}px`, borderRadius: tokens.radius[c.radius] * scale,
      background: 'var(--surface-sunken)', font: `${13 * scale}px var(--font-pixel)`, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
      <i style={{ width: 8 * scale, height: 8 * scale, borderRadius: 2 * scale, background: DOT[status], display: 'block' }} />{children ?? status}
    </span>
  )
}

/** A key cap: brushed metal, pixel label. pickje wakes on a cursor shake and closes on ⌃⌥⌘P (SPEC S3, C1). */
export function Key({ children = '⌘', scale = 1 }: { children?: ReactNode; scale?: number }) {
  return (
    <span style={{ display: 'inline-grid', placeItems: 'center', minWidth: 30 * scale, height: 28 * scale, padding: `0 ${8 * scale}px`, borderRadius: tokens.radius.chip * scale, boxSizing: 'border-box',
      background: 'linear-gradient(160deg, var(--silver-50), var(--silver-200))', boxShadow: 'inset 1px 1px 0 oklch(1 0 0 / .9), inset 0 0 0 1px var(--line-hair), 0 1px 0 oklch(0.3 0.01 230 / .25)',
      font: `${13 * scale}px var(--font-pixel)`, color: 'var(--ink)' }}>{children}</span>
  )
}
