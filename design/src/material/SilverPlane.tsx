import type { ReactNode } from 'react'
import { GrainField } from './GrainField'

type Props = { width: number; height: number; radius?: number; sheen?: number; shadow?: number; children?: ReactNode; style?: React.CSSProperties }

/** The silver plane: a pearly, plain silver surface lit from the upper left. Its shadow is grain dispersing, not a blur;
    its texture is a fine silver speck. */
export function SilverPlane({ width, height, radius = 22, sheen = 1, shadow = 1, children, style }: Props) {
  const pad = 60
  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      {shadow > 0 && (
        <GrainField width={width + pad * 2} height={height + pad * 2} style={{ position: 'absolute', left: -pad + 10, top: -pad + 16, pointerEvents: 'none' }}
          shape="rect" center={[width / 2 + pad, height / 2 + pad]} size={[width - 10, height - 14]} radius={radius} fill={1}
          spread={22} density={0.5 * shadow} grain={1.4} lch={[0.42, 0.025, 275]} hueShift={0} satJitter={0.3} still />
      )}
      <div style={{ position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden',
        background: `linear-gradient(225deg, oklch(0.965 0.006 250) 0%, oklch(0.9 0.01 255) 38%, oklch(0.84 0.012 280) 72%, oklch(0.8 0.014 300) 100%)`,
        boxShadow: `inset 1px 1px 0 oklch(1 0 0 / ${0.85 * sheen}), inset -1px -1px 0 oklch(0.55 0.02 280 / 0.25)` }}>
        <GrainField width={width} height={height} style={{ position: 'absolute', inset: 0, mixBlendMode: 'multiply', opacity: 0.55 }}
          shape="rect" size={[width * 3, height * 3]} radius={0} fill={1} density={0.28} grain={1} lch={[0.7, 0.01, 260]} hueShift={0} satJitter={0.2} still />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 18% 8%, oklch(1 0 0 / ${0.55 * sheen}) 0%, transparent 55%)` }} />
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</div>
      </div>
    </div>
  )
}
