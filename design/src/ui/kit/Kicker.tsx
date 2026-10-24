import type { CSSProperties, ReactNode } from 'react'

/** The machine's small label (s09): Geist Pixel, muted. Counts, times, session names. */
export function Kicker({ children, tone = 'muted', size = 13, style }: { children: ReactNode; tone?: 'muted' | 'ink' | 'on-dark'; size?: number; style?: CSSProperties }) {
  const color = tone === 'ink' ? 'var(--ink)' : tone === 'on-dark' ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
  return <span style={{ font: `${size}px/1.2 var(--font-pixel)`, letterSpacing: '0.02em', color, ...style }}>{children}</span>
}
