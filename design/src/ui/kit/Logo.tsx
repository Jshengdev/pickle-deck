import type { CSSProperties } from 'react'
import { Pickle, Blicky } from '../../cast/Cast'
import { Surface } from '../../material/Surface'

/** Logo directions (his words, 2026-10-24: remove the pixel one "in favor of the one that's standing on the moss… the
    pickle is like peeking over the top… Try to be a little bit more creative with what the logo design might look like").
    Every direction uses the approved drawings; none is final until he picks. */
export type LogoKind = 'moss' | 'peek' | 'sticker' | 'mossword' | 'traced' | 'patch'
export const LOGO_KINDS: { kind: LogoKind; name: string }[] = [
  { kind: 'moss', name: 'Standing on moss' }, { kind: 'peek', name: 'Pickle peeking over Blicky' }, { kind: 'sticker', name: 'The waving sticker' },
  { kind: 'mossword', name: 'Grown in moss' }, { kind: 'traced', name: 'Traced in one line' }, { kind: 'patch', name: 'The felt patch' },
]

/** The wordmark: "pickje" in Pretendard, heavy and tight. */
export function Wordmark({ size = 64, tone = 'ink', style }: { size?: number; tone?: 'ink' | 'on-dark'; style?: CSSProperties }) {
  return <span style={{ font: `800 ${size}px/0.9 var(--font-head)`, letterSpacing: '-0.055em', color: tone === 'ink' ? 'var(--ink)' : 'var(--text-on-dark)', ...style }}>pickje</span>
}

/** One logo direction at a given height (the characters' height; the word scales with it). */
export function Logo({ kind, h = 220, tone = 'ink', word = true, seed = 4.4 }: { kind: LogoKind; h?: number; tone?: 'ink' | 'on-dark'; word?: boolean; seed?: number }) {
  const wordEl = word ? <Wordmark size={h * 0.34} tone={tone} /> : null
  if (kind === 'moss') return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: h * 0.1 }}>
      <div style={{ position: 'relative', width: h * 1.5, height: h * 1.05 }}>
        <div style={{ position: 'absolute', left: 0, bottom: 0 }}><Surface material="moss" shape="cushion" width={h * 1.5} height={h * 0.42} radius={h * 0.21} seed={seed} spread={8} shadow={0.5} bloom={0.32} /></div>
        <div style={{ position: 'absolute', left: h * 0.28, bottom: h * 0.26 }}><Pickle height={h * 0.78} /></div>
        <div style={{ position: 'absolute', left: h * 0.72, bottom: h * 0.24 }}><Blicky pose="wave" height={h * 0.42} /></div>
      </div>
      {wordEl}
    </div>
  )
  if (kind === 'peek') return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-end', gap: h * 0.14 }}>
      <div style={{ position: 'relative', width: h * 0.66, height: h * 0.82 }}>
        <div style={{ position: 'absolute', left: h * 0.15, top: 0, height: h * 0.5, overflow: 'hidden' }}><Pickle height={h * 0.66} /></div>
        <div style={{ position: 'absolute', left: 0, bottom: 0 }}><Blicky height={h * 0.52} /></div>
      </div>
      {wordEl}
    </div>
  )
  if (kind === 'sticker') return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: h * 0.12 }}>
      <div style={{ transform: 'rotate(-7deg)', display: 'flex', alignItems: 'flex-end', gap: h * 0.02 }}><Pickle pose="wave" look="sticker" height={h * 0.82} /><Blicky look="sticker" height={h * 0.42} /></div>
      {wordEl}
    </div>
  )
  if (kind === 'mossword') return (
    <div style={{ position: 'relative', width: h * 2.1, height: h * 1.0 }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0 }}><Surface material="moss" shape="mask" mask={{ text: 'pickje', weight: 900 }} width={h * 2.1} height={h * 0.72} seed={seed} spread={6} shadow={0.5} bloom={0.26} sparse={0.2} /></div>
      <div style={{ position: 'absolute', left: h * 1.06, bottom: h * 0.5 }}><Pickle pose="wave" height={h * 0.5} /></div>
    </div>
  )
  if (kind === 'traced') return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-end', gap: h * 0.1, ['--cast-line' as string]: tone === 'ink' ? 'var(--ink)' : 'var(--text-on-dark)' } as CSSProperties}>
      <div style={{ position: 'relative', width: h * 0.95, height: h * 0.82 }}>
        <div style={{ position: 'absolute', left: h * 0.34, top: 0 }}><Pickle look="traced" height={h * 0.72} /></div>
        <div style={{ position: 'absolute', left: 0, bottom: 0 }}><Blicky look="traced" pose="wave" height={h * 0.42} /></div>
      </div>
      <span style={{ font: `400 ${h * 0.3}px/0.9 var(--font-second)`, color: tone === 'ink' ? 'var(--ink)' : 'var(--text-on-dark)' }}>pickje</span>
    </div>
  )
  // patch: a round forest felt patch, the pair traced in on-dark line, as if stitched
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: h * 0.14 }}>
      <Surface material="felt" color="surface-felt" shape="ellipse" width={h} height={h} spread={10} shadow={0.6} fringe={1.6}>
        <div style={{ position: 'absolute', inset: 0, ['--cast-line' as string]: 'var(--text-on-dark)' } as CSSProperties}>
          <div style={{ position: 'absolute', left: h * 0.42, top: h * 0.14, height: h * 0.36, overflow: 'hidden' }}><Pickle look="traced" height={h * 0.56} /></div>
          <div style={{ position: 'absolute', left: h * 0.2, top: h * 0.42 }}><Blicky look="traced" height={h * 0.36} /></div>
        </div>
      </Surface>
      {wordEl}
    </div>
  )
}
