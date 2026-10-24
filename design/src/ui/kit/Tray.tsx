import type { CSSProperties, ReactNode } from 'react'
import { Surface } from '../../material/Surface'
import { tokens } from '../../tokens'

/** The tray: coloured felt sunk into the ground; it holds cards. Padding 24, gap 16, radius 28 (tokens.component.tray).
    Children are laid out in a padded box; place them with flex or grid. */
export function Tray({ width, height, color = 'surface-felt', scale = 1, children, style, layout }: {
  width: number; height: number; color?: string; scale?: number; children?: ReactNode; style?: CSSProperties; layout?: CSSProperties
}) {
  const t = tokens.component.tray
  return (
    <Surface material="felt" color={color} inset width={width} height={height} radius={tokens.radius[t.radius] * scale} spread={18 * scale} style={style}>
      <div style={{ position: 'absolute', inset: 0, padding: t.pad * scale, display: 'flex', gap: t.gap * scale, boxSizing: 'border-box', ...layout }}>{children}</div>
    </Surface>
  )
}
