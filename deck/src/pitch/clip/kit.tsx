import { useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { gsap, useGSAP } from '@design/engine/gsap'
import type { Timeline } from '@design/engine/types'
import { Pickle } from '@design/cast/Cast'

/** The demo clips (his brief 2026-10-25: "have the clips from the demo cut and simualted to show each part… with the real
    visualizations of it but cuter ui and slight movement zooming in an little"). Each clip is a scene on a desktop inside a
    polished screen, played by one looping GSAP timeline with a slow camera. In print (?print) the loop stops on one frame.

    The desktop is 1512 × 982 (a MacBook's points), scaled into the screen; place things in those points. */
export const DESK = { w: 1512, h: 982 }
export const isPrint = () => new URLSearchParams(location.search).has('print')

/** A looping timeline for a clip. `build` adds the beats; `still` is the time shown in print. */
export function useLoop(scope: RefObject<HTMLElement | null>, build: (tl: Timeline) => void, still: number, deps: unknown[] = []) {
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: isPrint() })
    build(tl)
    if (isPrint()) tl.seek(still, false)
  }, { scope, dependencies: deps, revertOnUpdate: true })
}

/** The polished screen: a chrome bezel (the brand's metal edge: sky, a dark horizon line, floor), the desktop inside,
    and a camera layer (`data-cam`) the clip zooms and pans. */
export function Screen({ width, children, label }: { width: number; children: ReactNode; label?: ReactNode }) {
  const edge = 12, s = (width - edge * 2) / DESK.w, h = DESK.h * s + edge * 2
  return (
    <div className="clip" style={{ position: 'relative', width, height: h }}>
      <style>{'.clip [data-live="say"] { display: none !important }'}</style>{/* the clips draw their own bubbles */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 30, background: 'linear-gradient(180deg, oklch(1 0 0) 0%, oklch(0.94 0.005 220) 28%, oklch(0.78 0.012 230) 51%, oklch(0.42 0.016 235) 53%, oklch(0.62 0.014 232) 58%, oklch(0.9 0.006 222) 72%, oklch(0.97 0.004 220) 86%, oklch(0.6 0.012 232) 100%)',
        boxShadow: 'inset 0 0 0 1px oklch(1 0 0 / .95), 0 0 0 1px oklch(0.42 0.012 230 / .38), 0 2px 0 oklch(0.3 0.01 230 / .18)' }} />
      <div style={{ position: 'absolute', left: edge, top: edge, width: DESK.w * s, height: DESK.h * s, borderRadius: 18, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px oklch(0.4 0.012 230 / .22)' }}>
        <div style={{ width: DESK.w, height: DESK.h, transform: `scale(${s})`, transformOrigin: '0 0', position: 'relative' }}>
          <div data-cam style={{ position: 'absolute', inset: 0, transformOrigin: '50% 50%', background: 'linear-gradient(180deg, var(--silver-100), var(--silver-200))' }}>{children}</div>
        </div>
      </div>
      {label && <div style={{ position: 'absolute', left: 6, top: h + 18 }}>{label}</div>}
    </div>
  )
}

/** A speech bubble in the cast's colour: Pickle lime, Blicky sky (as in the app), the words in the written voice. */
export function Bubble({ who, children, width, style, className }: { who: 'pickle' | 'blicky'; children: ReactNode; width?: number; style?: CSSProperties; className?: string }) {
  const p = who === 'pickle'
  return (
    <div className={className} style={{ position: 'absolute', maxWidth: width ?? 480, padding: '14px 22px 16px', borderRadius: 22, background: p ? 'var(--lichen-100)' : 'var(--sky-50)',
      boxShadow: `inset 0 0 0 2px ${p ? 'var(--lichen-300)' : 'var(--sky-200)'}, 0 2px 0 oklch(0.3 0.01 230 / .12)`, ...style }}>
      <div style={{ font: '600 18px var(--font-head)', color: p ? 'var(--forest-700)' : 'var(--sky-700)', marginBottom: 4 }}>{p ? 'Pickle' : 'Blicky'}</div>
      <div style={{ font: '400 30px/1.3 var(--font-second)', color: 'var(--ink)' }}>{children}</div>
    </div>
  )
}

/** What he said out loud, as the app shows it: a dark chip in the machine's voice. */
export function Words({ children, style, className }: { children: ReactNode; style?: CSSProperties; className?: string }) {
  return <div className={className} style={{ position: 'absolute', padding: '10px 16px', borderRadius: 12, background: 'var(--surface-night)', color: 'var(--text-on-dark)', font: '400 26px/1.3 var(--font-dot)', maxWidth: 600, ...style }}>{children}</div>
}

/** The mic is open. */
export function Listening({ style, className }: { style?: CSSProperties; className?: string }) {
  return <div className={className} style={{ position: 'absolute', padding: '7px 14px', borderRadius: 99, background: 'var(--surface-night)', color: 'var(--text-on-dark)', font: '400 21px var(--font-dot)', ...style }}>listening</div>
}

/** A numbered mini Pickle, left where he circled (onboarding OB4). */
export function Pin({ n, style, className }: { n: number; style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ position: 'absolute', ...style }}>
      <Pickle look="drawn" height={58} />
      <span style={{ position: 'absolute', right: -14, top: -8, width: 24, height: 24, borderRadius: 99, display: 'grid', placeItems: 'center', background: 'var(--surface-night)', color: 'var(--text-on-dark)', font: '400 14px var(--font-pixel)' }}>{n}</span>
    </div>
  )
}

/** Pickle's stamp: a round ink stamp that says it's got it (onboarding OB6). */
export function StampMark({ style, className }: { style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ position: 'absolute', width: 92, height: 92, borderRadius: 99, display: 'grid', placeItems: 'center', transform: 'rotate(-12deg)',
      boxShadow: 'inset 0 0 0 4px var(--checked), inset 0 0 0 8px var(--surface-page), inset 0 0 0 10px var(--checked)', background: 'var(--surface-page)', ...style }}>
      <span style={{ font: '700 20px var(--font-head)', color: 'var(--checked)', letterSpacing: '0.04em' }}>GOT IT</span>
    </div>
  )
}

/** A hand-drawn ring Blicky draws round what he means (stroke drawn in by the clip: class `ink`). */
export function Ring({ x, y, w, h, color = 'var(--blicky-ink)', className = 'ink' }: { x: number; y: number; w: number; h: number; color?: string; className?: string }) {
  return (
    <svg style={{ position: 'absolute', left: x - 12, top: y - 12, overflow: 'visible' }} width={w + 24} height={h + 24}>
      <path className={className} d={`M${w * 0.52 + 12} ${8} C${w + 16} ${4} ${w + 22} ${h + 18} ${w * 0.5 + 12} ${h + 18} C${2} ${h + 20} ${2} ${10} ${w * 0.46 + 12} ${10}`}
        fill="none" stroke={color} strokeWidth={5} strokeLinecap="round" />
    </svg>
  )
}

/** The label under a clip: the beat now playing, in the machine's voice (updated by the timeline). */
export function BeatLabel({ refEl, first }: { refEl: RefObject<HTMLSpanElement | null>; first: string }) {
  return <span ref={refEl} style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>{first}</span>
}
export const setText = (el: HTMLElement | null, t: string) => () => { if (el) el.textContent = t }
export const useLabel = () => useRef<HTMLSpanElement>(null)

/** The staged o-chem worksheet, question 2 (app/recall/staged.ts in the pickje repo), with its IR spectrum. */
export function Worksheet({ x = 120, y = 110, w = 900 }: { x?: number; y?: number; w?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, borderRadius: 18, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 2px 0 oklch(0.3 0.01 230 / .1)', padding: '30px 40px 36px' }}>
      <div style={{ font: '400 16px var(--font-pixel)', color: 'var(--text-muted)' }}>chem3b-worksheet-7.pdf</div>
      <div style={{ font: '700 30px var(--font-head)', marginTop: 8 }}>Worksheet 7: unknowns from IR and NMR</div>
      <div style={{ font: '400 22px/1.4 var(--font-head)', color: 'var(--text-secondary)', marginTop: 18 }}><b style={{ color: 'var(--ink)' }}>2.</b> Molecule B, C₄H₈O₂, with a broad IR band around 3000: name it.</div>
      <IrFigure />
    </div>
  )
}
/** An IR spectrum: the broad O–H trough round 3000 and the sharp C=O at 1710 (4000 on the left, 500 on the right).
    Its box is 820 × 300; the broad band sits at x 150–330, the 1710 peak at x 545. */
export function IrFigure() {
  return (
    <svg width={820} height={300} viewBox="0 0 820 300" style={{ display: 'block', marginTop: 22 }}>
      <path d="M40 260L800 260M40 260L40 20" stroke="var(--silver-400)" strokeWidth={2} fill="none" />
      <path d="M44 40C110 40 140 44 160 56C190 80 200 210 240 222C280 232 300 150 330 74C352 50 420 48 500 52L530 56L545 236L560 56C600 52 650 56 690 60L706 110L720 62C760 58 790 60 800 62"
        stroke="var(--ink)" strokeWidth={3} fill="none" strokeLinejoin="round" />
      {[['4000', 40], ['3000', 245], ['2000', 450], ['1710', 545], ['1000', 655]].map(([t, x]) => <text key={t} x={Number(x)} y={288} textAnchor="middle" style={{ font: '400 16px var(--font-pixel)', fill: 'var(--text-muted)' }}>{t}</text>)}
    </svg>
  )
}
/** A Fusion-style window with the desk lamp (staged: "Desk lamp in Fusion 360"). The shade sits at x 640–900, y 250–470. */
export function FusionWindow({ x = 120, y = 110 }: { x?: number; y?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 1060, height: 700, borderRadius: 18, overflow: 'hidden', background: 'var(--silver-50)', boxShadow: 'inset 0 0 0 1px var(--line-hair)' }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 22px', background: 'var(--surface-page)', borderBottom: '1px solid var(--silver-200)', font: '500 18px var(--font-head)', color: 'var(--text-secondary)' }}>Autodesk Fusion · desk-lamp v4</div>
      <svg width={1060} height={648} style={{ display: 'block' }}>
        {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${i * 80} 0V648`} stroke="var(--silver-200)" />)}
        {Array.from({ length: 9 }, (_, i) => <path key={'h' + i} d={`M0 ${i * 80}H1060`} stroke="var(--silver-200)" />)}
        <g fill="none" stroke="var(--silver-600)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="360" cy="560" rx="170" ry="38" /><path d="M360 540L470 330L700 260" /><circle cx="470" cy="330" r="13" />
          <path d="M700 260L770 205L860 400L620 430Z" fill="var(--silver-200)" />
        </g>
      </svg>
    </div>
  )
}
/** A Figma-style canvas with 3 onboarding screens, the mascot on every one (staged: the onboarding critique). The mascot on
    screen 2 (the goal picker) sits at x 616–716, y 250–350. */
export function FigmaWindow({ x = 120, y = 110 }: { x?: number; y?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 1060, height: 700, borderRadius: 18, overflow: 'hidden', background: 'var(--silver-100)', boxShadow: 'inset 0 0 0 1px var(--line-hair)' }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 22px', background: 'var(--surface-page)', borderBottom: '1px solid var(--silver-200)', font: '500 18px var(--font-head)', color: 'var(--text-secondary)' }}>Figma · Habit app onboarding v3</div>
      {['Welcome', 'Pick a goal', 'Remind me'].map((t, i) => (
        <div key={t} style={{ position: 'absolute', left: 90 + i * 320, top: 100, width: 240, height: 500, borderRadius: 34, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 2px var(--silver-300)', padding: '30px 22px', textAlign: 'center' }}>
          <div style={{ width: 100, height: 100, margin: '50px auto 0', borderRadius: 99, background: 'var(--pollen-200)', boxShadow: 'inset 0 0 0 3px var(--pollen-400)' }} />
          <div style={{ font: '700 22px var(--font-head)', marginTop: 34 }}>{t}</div>
          {i === 1 && ['Read more', 'Run', 'Sleep'].map((g) => <div key={g} style={{ margin: '12px auto 0', width: 160, height: 32, borderRadius: 10, boxShadow: 'inset 0 0 0 2px var(--silver-300)', font: '500 15px/32px var(--font-head)', color: 'var(--text-secondary)' }}>{g}</div>)}
          <div style={{ position: 'absolute', left: 30, right: 30, bottom: 30, height: 46, borderRadius: 14, background: 'var(--surface-night)' }} />
        </div>
      ))}
    </div>
  )
}
/** Pickle's project tabs at the right edge of the desktop: glass, the one it routed to lifts and lights (the notepad's tabs). */
export function ProjectTabs({ names, x = 1452, y = 180 }: { names: string[]; x?: number; y?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, display: 'grid', gap: 10 }}>
      {names.map((n, i) => (
        <div key={n} className={`tab tab${i}`} style={{ position: 'relative', width: 60, height: 150, borderRadius: 14, background: 'linear-gradient(180deg, var(--sky-100), var(--sky-200) 70%)',
          boxShadow: 'inset 0 1px 0 oklch(1 0 0 / .95), inset 0 0 0 1px oklch(83% 0.088 246 / .7), 0 2px 0 oklch(73% 0.13 250 / .55)' }}>
          <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', whiteSpace: 'nowrap', font: '600 17px var(--font-head)', color: 'var(--sky-700)' }}>{n}</span>
          <i className="lamp" style={{ position: 'absolute', left: 24, top: 8, width: 12, height: 12, borderRadius: 99, background: 'var(--checked)', opacity: 0 }} />
        </div>
      ))}
    </div>
  )
}
