import type { CSSProperties, ReactNode } from 'react'
import { Surface } from '../../material/Surface'
import { tokens } from '../../tokens'

/** The card: a metal plane, one idea per card. Padding 24, gap 12, radius 18 (tokens.component.card). Lifted = the active
    one: a longer grain shadow, nothing else changes. scale: 1 on screens, tokens.component.deck.scale (1.6) on slides. */
export function Card({ width, height, lifted = false, scale = 1, children, style }: { width: number; height: number; lifted?: boolean; scale?: number; children?: ReactNode; style?: CSSProperties }) {
  const c = tokens.component.card
  return (
    <Surface material="metal" width={width} height={height} radius={tokens.radius[c.radius] * scale} shadow={lifted ? 1 : 0.7} spread={(lifted ? 20 : 11) * scale} style={style}>
      <div style={{ padding: c.pad * scale, display: 'flex', flexDirection: 'column', gap: c.gap * scale, height: '100%', boxSizing: 'border-box' }}>{children}</div>
    </Surface>
  )
}
