import type { CSSProperties, ReactNode } from 'react'
import { PickleArt } from './PickleArt'
import { BlickyArt } from './BlickyArt'
import type { DotEyes } from './PickleArt'

/** The cast in their poses. The approved drawings are never redrawn: a pose only turns their own parts (arm-l, arm-r,
    the eyes) about their joints, so every pose is still the story-slide Pickle and Blicky.
    Looks: 'drawn' as on the slide · 'sticker' die-cut with a white edge (his s01) · 'traced' a single ink line (his s02). */
export type Pose = 'stand' | 'wave' | 'cheer' | 'point' | 'listen' | 'dazed' | 'asleep' | 'sketch'
export type Look = 'drawn' | 'sticker' | 'traced'

const JOINT = {
  pickle: { 'arm-l': '56px 176px', 'arm-r': '152px 176px' },
  blicky: { 'arm-l': '34px 112px', 'arm-r': '185px 104px' },
} as const

// arm angles per pose (deg; negative lifts the right arm, positive lifts the left)
const ARMS: Record<'pickle' | 'blicky', Record<Pose, [number, number]>> = {
  pickle: { stand: [0, 0], wave: [0, -100], cheer: [95, -95], point: [0, -48], listen: [8, -8], dazed: [-14, 14], asleep: [10, -10], sketch: [0, -60] },
  blicky: { stand: [0, 0], wave: [0, -52], cheer: [52, -52], point: [0, -20], listen: [6, -6], dazed: [-12, 12], asleep: [8, -8], sketch: [0, -34] },
}
const EYES: Partial<Record<Pose, Partial<DotEyes>>> = {
  listen: { lx: 3, rx: -3, ly: 1, ry: 1 }, dazed: { lx: -2, ly: -2, rx: 2, ry: 2, lid: 0.35 }, asleep: { lid: 1 },
  point: { lx: 3, rx: 3, ly: -1, ry: -1 }, sketch: { lx: 3, rx: 3, ly: 2, ry: 2 }, wave: { lid: 0.15 },
}

let injected = false
function useCastStyles() {
  if (injected || typeof document === 'undefined') return
  injected = true
  const css = `
  .cast [data-part] { transform-box: view-box; }
  .cast.traced [data-part="body"] path[fill]:not([fill="none"]), .cast.traced [data-part="body"] ellipse { fill: none !important; }
  .cast.traced [data-part="body"] g[clip-path] { display: none; }
  .cast.traced [stroke] { stroke: var(--cast-line, var(--ink)); }
  .cast.traced [data-part="eyes"] { fill: var(--cast-line, var(--ink)); }
  .cast.sticker { filter: url(#pickje-sticker-edge) drop-shadow(0 1.5px 0 oklch(0.3 0.01 230 / .28)); }
  @keyframes cast-wave { 0%, 100% { transform: rotate(-88deg) } 50% { transform: rotate(-116deg) } }
  .cast.moving.pose-wave [data-part="arm-r"] { animation: cast-wave 560ms ease-in-out infinite !important; }`
  const el = document.createElement('style'); el.textContent = css; document.head.appendChild(el)
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
  svg.innerHTML = `<filter id="pickje-sticker-edge" x="-20%" y="-20%" width="140%" height="140%">
    <feMorphology in="SourceAlpha" operator="dilate" radius="7" result="grow"/><feFlood flood-color="#ffffff"/>
    <feComposite in2="grow" operator="in" result="edge"/><feMerge><feMergeNode in="edge"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`
  document.body.appendChild(svg)
}

type Props = { pose?: Pose; look?: Look; height: number; moving?: boolean; line?: string; style?: CSSProperties }

function CastWrap({ who, pose, look, moving, line, style, children }: { who: 'pickle' | 'blicky'; pose: Pose; look: Look; moving?: boolean; line?: string; style?: CSSProperties; children: ReactNode }) {
  useCastStyles()
  const [l, r] = ARMS[who][pose]
  const vars = { '--cast-line': line } as CSSProperties
  return (
    <span className={`cast cast-${who} pose-${pose} ${look} ${moving ? 'moving' : ''}`} style={{ display: 'inline-block', position: 'relative', lineHeight: 0, ...vars, ...style }}>
      <style>{`.cast-${who}.pose-${pose} [data-part="arm-l"]{transform-origin:${JOINT[who]['arm-l']};transform:rotate(${l}deg)}
        .cast-${who}.pose-${pose} [data-part="arm-r"]{transform-origin:${JOINT[who]['arm-r']};transform:rotate(${r}deg)}`}</style>
      {children}
    </span>
  )
}

/** Pickle in a pose. */
export function Pickle({ pose = 'stand', look = 'drawn', height, moving, line, style }: Props) {
  return (
    <CastWrap who="pickle" pose={pose} look={look} moving={moving} line={line} style={style}>
      <PickleArt height={height} eyes={EYES[pose]} wobble={look === 'traced' ? 3 : 2.4} />
      {pose === 'dazed' && <Stars h={height} />}
      {pose === 'asleep' && <Zs h={height} />}
    </CastWrap>
  )
}

/** Blicky in a pose. 'sketch' puts the pencil in its right hand. */
export function Blicky({ pose = 'stand', look = 'drawn', height, moving, line, style }: Props) {
  return (
    <CastWrap who="blicky" pose={pose} look={look} moving={moving} line={line} style={style}>
      <BlickyArt height={height} eyes={EYES[pose]} />
      {pose === 'sketch' && <Pencil h={height} />}
      {pose === 'dazed' && <Stars h={height} />}
      {pose === 'asleep' && <Zs h={height} />}
    </CastWrap>
  )
}

/** Small marker stars circling a dazed head (after the shake). */
function Stars({ h }: { h: number }) {
  const s = h * 0.09
  return (
    <svg viewBox="0 0 100 40" width={h * 0.6} style={{ position: 'absolute', left: '20%', top: -h * 0.1, overflow: 'visible' }}>
      {[[14, 22], [50, 8], [86, 22]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - s / 2}L${x + s / 6} ${y - s / 6}L${x + s / 2} ${y}L${x + s / 6} ${y + s / 6}L${x} ${y + s / 2}L${x - s / 6} ${y + s / 6}L${x - s / 2} ${y}L${x - s / 6} ${y - s / 6}Z`} fill="var(--attention)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
      ))}
    </svg>
  )
}
/** "z z" in the dot face, drifting up from a sleeping head. */
function Zs({ h }: { h: number }) {
  return <span style={{ position: 'absolute', right: -h * 0.12, top: -h * 0.06, font: `${h * 0.12}px/1 var(--font-dot)`, color: 'var(--ink)', lineHeight: 1 }}>z<span style={{ fontSize: '0.7em', verticalAlign: 'super' }}>z</span></span>
}
/** Blicky's pencil: marker outline, pollen body, a lead tip. */
function Pencil({ h }: { h: number }) {
  return (
    <svg viewBox="0 0 60 60" width={h * 0.34} style={{ position: 'absolute', right: -h * 0.16, top: h * 0.05, overflow: 'visible' }}>
      <g transform="rotate(35 30 30)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round">
        <rect x="22" y="2" width="16" height="40" rx="3" fill="var(--attention)" />
        <path d="M22 42L30 58L38 42Z" fill="var(--silver-100)" />
        <path d="M27 52L30 58L33 52Z" fill="var(--ink)" strokeWidth="2" />
      </g>
    </svg>
  )
}

/** Speech: what a character says, in the dot face (his rule: the characters speak in Geist Pixel Circle). */
export function Say({ children, size = 25, side = 'left', style }: { children: ReactNode; size?: number; side?: 'left' | 'right'; style?: CSSProperties }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', padding: `${size * 0.5}px ${size * 0.75}px`, borderRadius: size * 0.9, background: 'var(--surface-plane)',
      boxShadow: 'inset 1px 1px 0 oklch(1 0 0 / .9), 0 1px 0 oklch(0.3 0.01 230 / .25)', font: `${size}px/1.2 var(--font-dot)`, color: 'var(--ink)', whiteSpace: 'nowrap', ...style }}>
      {children}
      <i style={{ position: 'absolute', bottom: -size * 0.35, [side]: size * 0.9, width: size * 0.7, height: size * 0.7, background: 'var(--surface-plane)', clipPath: side === 'left' ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)' } as CSSProperties} />
    </span>
  )
}

