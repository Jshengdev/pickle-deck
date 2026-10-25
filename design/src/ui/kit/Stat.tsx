import type { ReactNode } from 'react'

/** A number that carries a slide: the counts are Geist Pixel (his pick: "the numerals… the guys pixel counts"), with a plain
    Pretendard caption under it. */
export function Stat({ value, caption, size = 'var(--text-giant)', tone = 'ink' }: { value: ReactNode; caption: ReactNode; size?: string; tone?: 'ink' | 'on-dark' }) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <div style={{ font: `400 ${size}/0.95 var(--font-pixel)`, letterSpacing: '-0.02em', color: tone === 'ink' ? 'var(--ink)' : 'var(--text-on-dark)' }}>{value}</div>
      <div style={{ font: '400 calc(20px * var(--type-scale, 1))/1.4 var(--font-head)', color: tone === 'ink' ? 'var(--text-secondary)' : 'var(--text-on-dark-muted)' }}>{caption}</div>
    </div>
  )
}
