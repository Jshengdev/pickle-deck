import { forwardRef, useId, type CSSProperties } from 'react'
import { ART } from './art'

export type DotEyes = { lx: number; ly: number; rx: number; ry: number; lid: number } // pupil offsets (viewBox units), lid 0 open → 1 shut

type Props = { height: number; eyes?: Partial<DotEyes>; wobble?: number; style?: CSSProperties; className?: string }

// The bean from his drawing: tall, a touch fuller at the bottom right, the top leaning a little left.
export const PICKLE_BODY = { viewBox: [200, 330] as const, d: 'M60 78C60 42 80 20 104 20C128 20 148 40 149 76C151 130 155 186 154 232C153 262 133 280 104 280C74 280 53 263 52 234C51 184 59 128 60 78Z' }
const BODY = PICKLE_BODY.d

/** Pickle as drawn on the story slide: marker outline, Brine stripes, two dot eyes (the right one bigger), stick arms and
    legs. Every part is its own group (data-part) so motion can move one piece at a time. */
export const PickleArt = forwardRef<SVGSVGElement, Props>(function PickleArt({ height, eyes, wobble = 2.4, style, className }, ref) {
  const clip = `pk${useId().replace(/:/g, '')}`
  const e = { lx: 0, ly: 0, rx: 0, ry: 0, lid: 0, ...eyes }
  const w = height * (200 / 330)
  return (
    <svg ref={ref} viewBox="0 0 200 330" width={w} height={height} style={{ overflow: 'visible', ...style }} className={className} aria-label="Pickle">
      <defs>
        <clipPath id={clip}><path d={BODY} /></clipPath>
        <filter id={`${clip}w`} x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" /><feDisplacementMap in="SourceGraphic" scale={wobble} /></filter>
      </defs>
      <g filter={wobble ? `url(#${clip}w)` : undefined}>
      <g data-part="arm-l" fill="none" stroke={ART.ink} strokeWidth={ART.limb} strokeLinecap="round" strokeLinejoin="round">
        <path d="M56 176C44 184 34 196 26 212" /><path d="M26 212L21 206" />
      </g>
      <g data-part="arm-r" fill="none" stroke={ART.ink} strokeWidth={ART.limb} strokeLinecap="round" strokeLinejoin="round">
        <path d="M152 176C164 184 174 196 182 212" /><path d="M182 212L188 206" />
      </g>
      <g data-part="leg-l" stroke={ART.ink} strokeWidth={ART.limb} strokeLinecap="round">
        <path d="M87 278L86 304L71 306" fill="none" strokeLinejoin="round" />
      </g>
      <g data-part="leg-r" stroke={ART.ink} strokeWidth={ART.limb} strokeLinecap="round">
        <path d="M121 278L122 304L137 306" fill="none" strokeLinejoin="round" />
      </g>
      <g data-part="body">
        <path d={BODY} fill={ART.pickle} />
        <g clipPath={`url(#${clip})`} fill="none" stroke={ART.brine} strokeWidth="12" strokeLinecap="round">
          <path d="M74 14C70 80 73 150 70 220C69 250 71 270 72 290" />
          <path d="M97 14C95 80 98 150 96 220C95 250 97 270 97 290" />
          <path d="M121 14C121 80 124 150 123 220C122 250 124 270 124 290" />
          <path d="M144 14C145 80 149 150 149 220C149 250 150 270 150 290" />
        </g>
        <path d={BODY} fill="none" stroke={ART.ink} strokeWidth={ART.outline} strokeLinejoin="round" />
      </g>
      </g>
      <g data-part="eyes" fill={ART.ink}>
        <ellipse data-part="eye-l" cx={95 + e.lx} cy={82 + e.ly} rx="6.2" ry={6.2 * (1 - e.lid) + 0.6} />
        <ellipse data-part="eye-r" cx={118 + e.rx} cy={78 + e.ry} rx="8.4" ry={8.4 * (1 - e.lid) + 0.6} />
      </g>
    </svg>
  )
})
