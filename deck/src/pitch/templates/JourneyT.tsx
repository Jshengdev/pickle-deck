import { useRef } from 'react'
import { useDialKit } from 'dialkit'
import { ease } from '@design/tokens'
import { Page } from '../../brand/frame'
import { useStepTimeline } from '../kit/step'

/** TEMPLATE · Motion graphic: a journey. One dot travels a curved path from stop to stop; each press draws the next
    leg, flies the dot along it (ease.route: a small pull back, then a glide) and lands it on the next stop (ease.land).
    One moving thing per press. Steps = STOPS.length. With 4 stops: { steps: 4, render: JourneyT }

    CHANGE ME ↓ (x, y in px on a 1728 × 560 canvas; the label sits under the stop, or over it with above: true) */
const TITLE = 'Blicky flies to the right moment'                  // DRAFT
const STOPS = [
  { x: 120, y: 420, label: 'You ask' },
  { x: 620, y: 160, label: 'Now or earlier?', above: true },
  { x: 1120, y: 380, label: 'The right moment' },
  { x: 1600, y: 140, label: 'Blicky draws', above: true },
] as { x: number; y: number; label: string; above?: boolean }[]                                                                  // outline slide 5 (M2–M5)
export const JOURNEY_STEPS = STOPS.length
const CW = 1728, CH = 560

/** A leg from a to b, bowed sideways by `arc` (0 = straight). */
const leg = (a: typeof STOPS[0], b: typeof STOPS[0], arc: number) => {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y
  return `M${a.x} ${a.y} Q${mx - dy * arc} ${my + dx * arc} ${b.x} ${b.y}`
}

export function JourneyT() {
  const root = useRef<HTMLDivElement>(null)
  const d = useDialKit('Journey', {
    travel: [0.9, 0.2, 3, 0.05], arc: [0.25, -0.6, 0.6, 0.01], dot: [16, 6, 40, 1], line: [3, 1, 10, 0.5], unlit: [0.2, 0, 1, 0.01],
  })

  useStepTimeline(root, (tl) => {
    tl.set('.leg', { drawSVG: '0%' })
      .set('.stop', { opacity: (_: number, el: Element) => (el.classList.contains('stop-0') ? 1 : d.unlit) })
      .set('.dot', { x: STOPS[0].x, y: STOPS[0].y })
    for (let i = 1; i < STOPS.length; i++) {
      tl.to(`.leg-${i}`, { drawSVG: '100%', duration: d.travel, ease: ease.route })
        .to('.dot', { motionPath: { path: `.leg-${i}` }, duration: d.travel, ease: ease.route }, '<')
        .to(`.stop-${i}`, { opacity: 1, duration: 0.35, ease: ease.land })
        .addLabel(`s${i}`)
    }
  }, [d.travel, d.arc, d.unlit])

  return (
    <Page title={TITLE}>
      <div ref={root} style={{ position: 'relative', width: CW, height: CH }}>
        <svg width={CW} height={CH} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {STOPS.slice(1).map((b, i) => (
            <path key={i} className={`leg leg-${i + 1}`} d={leg(STOPS[i], b, d.arc)} stroke="var(--surface-felt)" strokeWidth={d.line} strokeLinecap="round" fill="none" />
          ))}
          {STOPS.map((s, i) => <circle key={i} className={`stop stop-${i}`} cx={s.x} cy={s.y} r={d.dot * 0.6} fill="var(--surface-felt)" />)}
          <circle className="dot" cx={0} cy={0} r={d.dot} fill="var(--ink)" />
        </svg>
        {STOPS.map((s, i) => (
          <div key={i} className={`stop stop-${i}`} style={{ position: 'absolute', left: s.x, top: s.above ? s.y - d.dot - 18 : s.y + d.dot + 18, transform: s.above ? 'translate(-50%, -100%)' : 'translateX(-50%)', font: 'var(--t-head-2)', whiteSpace: 'nowrap' }}>{s.label}</div>
        ))}
      </div>
    </Page>
  )
}
