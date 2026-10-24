import { forwardRef, type CSSProperties } from 'react'
import { ART } from './art'
import type { DotEyes } from './PickleArt'

type Props = { height: number; eyes?: Partial<DotEyes>; style?: CSSProperties; className?: string }

export const BLICKY_BODY = { viewBox: [220, 200] as const, d: 'M32 102C30 56 66 30 110 30C156 30 188 56 186 102C184 150 152 170 108 170C62 170 34 150 32 102Z' }
const BODY = BLICKY_BODY.d

/** Blicky as drawn on the story slide: a sky-blue blob, marker outline, two dot eyes (the right one bigger), cheek red,
    short thick limbs. Parts are groups (data-part) for motion. */
export const BlickyArt = forwardRef<SVGSVGElement, Props>(function BlickyArt({ height, eyes, style, className }, ref) {
  const e = { lx: 0, ly: 0, rx: 0, ry: 0, lid: 0, ...eyes }
  const w = height * (220 / 200)
  return (
    <svg ref={ref} viewBox="0 0 220 200" width={w} height={height} style={{ overflow: 'visible', ...style }} className={className} aria-label="Blicky">
      <g data-part="arm-l" stroke={ART.ink} strokeWidth="10" strokeLinecap="round"><path d="M34 112L16 116" /></g>
      <g data-part="arm-r" stroke={ART.ink} strokeWidth="10" strokeLinecap="round"><path d="M185 104L203 100" /></g>
      <g data-part="leg-l" stroke={ART.ink} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M88 168L86 186L72 188" /></g>
      <g data-part="leg-r" stroke={ART.ink} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M132 168L134 186L148 188" /></g>
      <g data-part="body">
        <path d={BODY} fill={ART.sky} />
        <ellipse cx="58" cy="114" rx="16" ry="10" fill={ART.cheek} />
        <ellipse cx="162" cy="110" rx="16" ry="10" fill={ART.cheek} />
        <path d={BODY} fill="none" stroke={ART.ink} strokeWidth={ART.outline} strokeLinejoin="round" />
      </g>
      <g data-part="eyes" fill={ART.ink}>
        <ellipse data-part="eye-l" cx={100 + e.lx} cy={96 + e.ly} rx="5.6" ry={5.6 * (1 - e.lid) + 0.6} />
        <ellipse data-part="eye-r" cx={124 + e.rx} cy={92 + e.ry} rx="7.6" ry={7.6 * (1 - e.lid) + 0.6} />
      </g>
    </svg>
  )
})
