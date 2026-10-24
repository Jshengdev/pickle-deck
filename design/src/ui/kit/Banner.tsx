import type { CSSProperties, ReactNode } from 'react'
import { Pickle, Blicky, type Pose } from '../../cast/Cast'
import { Surface } from '../../material/Surface'

/** A banner for the top of a deck or a chapter (his words, 2026-10-24: "the traced outline of Blicky, and then the traced
    outline of the pickle… for the banner… with a little bit more variability… handdrawn with the occasional including the
    felt pieces and shapes"). One felt backdrop; the cast traced large and cropped by the edge; a felt piece or two; a
    hand-drawn mark. The seed varies the composition; the same seed always gives the same banner. */
export type BannerProps = { width: number; height: number; seed?: number; felt?: 'forest' | 'sky' | 'sage' | 'silver'; clearLeft?: number; children?: ReactNode; style?: CSSProperties }
const FELT = { forest: 'surface-felt', sky: 'surface-felt-sky', sage: 'surface-felt-sage', silver: 'surface-felt-neutral' } as const
const PIECES = ['surface-felt-sky', 'surface-felt-sage', 'surface-felt-neutral', 'surface-felt-deep'] as const
const POSES: Pose[] = ['wave', 'stand', 'point', 'cheer', 'listen', 'sketch']

function rnd(seed: number, k: number) { const v = Math.sin(seed * 91.7 + k * 47.3) * 43758.5453; return v - Math.floor(v) }

/** A marker scribble: an underline swoosh, a loop, a star or an arrow, wobbled like the cast's own line. */
export function Scribble({ kind, w, color = 'var(--ink)', seed = 1 }: { kind: 'swoosh' | 'loop' | 'star' | 'arrow'; w: number; color?: string; seed?: number }) {
  const id = `scr${Math.round(seed * 1000)}${kind}`
  const d = kind === 'swoosh' ? 'M6 34C40 22 90 14 150 18C176 20 190 26 196 30'
    : kind === 'loop' ? 'M10 30C40 30 60 6 84 10C104 14 100 40 80 40C60 40 62 14 96 12C130 10 160 26 194 22'
    : kind === 'star' ? 'M100 4L112 30L140 32L118 48L126 76L100 60L74 76L82 48L60 32L88 30Z'
    : 'M8 40C50 30 110 26 170 30M150 14L178 30L152 46'
  const vb = kind === 'star' ? '50 0 100 80' : '0 0 200 50'
  return (
    <svg viewBox={vb} width={w} style={{ overflow: 'visible', display: 'block' }}>
      <defs><filter id={id}><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={Math.round(seed * 10)} /><feDisplacementMap in="SourceGraphic" scale="3" /></filter></defs>
      <path d={d} fill="none" stroke={color} strokeWidth={kind === 'star' ? 6 : 7} strokeLinecap="round" strokeLinejoin="round" filter={`url(#${id})`} />
    </svg>
  )
}

export function Banner({ width, height, seed = 1, felt = 'forest', clearLeft = 0.4, children, style }: BannerProps) {
  const dark = felt === 'forest'
  const line = dark ? 'var(--text-on-dark)' : 'var(--ink)'
  const r = (k: number) => rnd(seed, k)
  const who = r(1) < 0.34 ? 'pickle' : r(1) < 0.67 ? 'blicky' : 'both'
  const pose = POSES[Math.floor(r(2) * POSES.length)]
  const big = Math.min(height * (1.05 + r(3) * 0.5), width * 0.42)
  const x = width * (Math.max(0.55, clearLeft + 0.12) + r(4) * 0.2)
  const piece = PIECES[Math.floor(r(5) * PIECES.length)]
  const pieceShape = r(6) < 0.5 ? 'ellipse' : 'blob'
  const pw = Math.min(height * (0.35 + r(7) * 0.3), width * 0.18)
  const scribble = (['swoosh', 'loop', 'star', 'arrow'] as const)[Math.floor(r(8) * 4)]
  return (
    <div style={{ position: 'relative', width, height, overflow: 'hidden', borderRadius: 0, ...style }}>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color={FELT[felt]} width={width} height={height} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: Math.max(width * clearLeft, x - pw * (0.6 + r(9) * 0.8)), top: height * (0.1 + r(10) * 0.5) }}>
        <Surface material="felt" color={piece} shape={pieceShape} width={pw} height={pw * (0.7 + r(11) * 0.5)} seed={seed} spread={10} shadow={0.7} fringe={1.4} />
      </div>
      <div style={{ position: 'absolute', left: x, top: height * (0.08 + r(12) * 0.3), ['--cast-line' as string]: line, transform: `rotate(${(r(13) - 0.5) * 16}deg)` } as CSSProperties}>
        {who !== 'blicky' && <Pickle look="traced" pose={pose === 'sketch' ? 'wave' : pose} height={big} />}
        {who !== 'pickle' && <span style={{ position: who === 'both' ? 'absolute' : 'static', left: who === 'both' ? big * 0.45 : 0, top: big * 0.5 }}><Blicky look="traced" pose={pose} height={big * (who === 'both' ? 0.42 : 0.62)} /></span>}
      </div>
      <div style={{ position: 'absolute', left: Math.max(width * clearLeft, x - width * 0.12), top: height * (0.62 + r(14) * 0.2), opacity: 0.9 }}><Scribble kind={scribble} w={height * 0.7} color={line} seed={seed} /></div>
      {children && <div style={{ position: 'absolute', inset: 0 }}>{children}</div>}
    </div>
  )
}
