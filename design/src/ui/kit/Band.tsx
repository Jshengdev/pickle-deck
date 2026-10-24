import type { CSSProperties, ReactNode } from 'react'
import { Surface } from '../../material/Surface'
import { tokens } from '../../tokens'

/** The band (s02): a deep felt slab for chapters and title cards. The title with its number after it (never a label
    above), the subs as a quiet line. Padding 32 × 40, radius 36 (tokens.component.band). */
export function Band({ width, height, number, title, subs, color = 'surface-felt-deep', scale = 1, children, style }: {
  width: number; height: number; number?: string; title: ReactNode; subs?: string[]; color?: string; scale?: number; children?: ReactNode; style?: CSSProperties
}) {
  const b = tokens.component.band
  return (
    <Surface material="felt" color={color} width={width} height={height} radius={tokens.radius[b.radius] * scale} shadow={0.6} spread={14 * scale} style={style}>
      <div style={{ position: 'absolute', inset: 0, padding: `${b.padY * scale}px ${b.padX * scale}px`, display: 'flex', flexDirection: 'column', gap: b.gap * scale, color: 'var(--text-on-dark)', boxSizing: 'border-box' }}>
        <div style={{ font: `700 ${scale > 1 ? 'var(--deck-hero)' : 'var(--text-display)'}/1.05 var(--font-head)`, letterSpacing: 'var(--tracking-display)' }}>
          {title}{number && <span style={{ fontWeight: 400, color: 'var(--text-on-dark-muted)', marginLeft: '0.4em', fontVariantNumeric: 'tabular-nums' }}>{number}</span>}
        </div>
        {subs && <div style={{ font: `400 ${scale > 1 ? 'var(--deck-caption)' : 'var(--text-small)'}/1.4 var(--font-head)`, color: 'var(--text-on-dark-muted)' }}>{subs.join(' · ')}</div>}
        {children}
      </div>
    </Surface>
  )
}
