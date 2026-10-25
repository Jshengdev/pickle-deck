import { useRef } from 'react'
import { useDialKit } from 'dialkit'
import { Card } from '@design/ui/kit'
import { tokens, ease } from '@design/tokens'
import { Page } from '../../brand/frame'
import { useStepTimeline } from '../kit/step'

/** A motion graphic on a GSAP timeline, 4 steps (index.tsx: steps: 4). Outline slide 5 (M2–M5).
    Each → draws the next line, then lights the next stage. The machine moves in steps, so the light snaps (ease.step);
    the line travels (ease.inOut). Tune it in the "Sees flow" dial. */
const K = tokens.component.deck.scale
const STAGES = ['You say it', 'Now or earlier?', 'The right moment', 'Blicky draws']
const W = 360, H = 300, GAP = (1728 - STAGES.length * W) / (STAGES.length - 1), Y = 40

export function SeesFlow() {
  const root = useRef<HTMLDivElement>(null)
  const d = useDialKit('Sees flow', { draw: [0.6, 0.1, 2, 0.05], line: [3, 1, 10, 0.5], unlit: [0.25, 0, 1, 0.01] })

  useStepTimeline(root, (tl) => {
    tl.set('.stage', { opacity: (i: number) => (i === 0 ? 1 : d.unlit) }).set('.link', { drawSVG: '0%' })
    for (let i = 1; i < STAGES.length; i++) {
      tl.to(`.link-${i}`, { drawSVG: '100%', duration: d.draw, ease: ease.inOut })
        .to(`.stage-${i}`, { opacity: 1, duration: 0.2, ease: ease.step })
        .addLabel(`s${i}`)
    }
  }, [d.draw, d.unlit])

  return (
    <Page title="It sees what you mean">
      <div ref={root} style={{ position: 'relative', height: H + 2 * Y, marginTop: 110 }}>
        <svg width={1728} height={H + 2 * Y} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {STAGES.slice(1).map((_, i) => {
            const x1 = (i + 1) * W + i * GAP, x2 = x1 + GAP
            return <path key={i} className={`link link-${i + 1}`} d={`M${x1 + 12} ${Y + H / 2} H${x2 - 12}`} stroke="var(--surface-felt)" strokeWidth={d.line} strokeLinecap="round" fill="none" />
          })}
        </svg>
        {STAGES.map((s, i) => (
          <div key={s} className={`stage stage-${i}`} style={{ position: 'absolute', left: i * (W + GAP), top: Y }}>
            <Card width={W} height={H} scale={K}>
              <div style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)' }}>{i + 1}</div>
              <div style={{ font: 'var(--t-head-2)' }}>{s}</div>
            </Card>
          </div>
        ))}
      </div>
    </Page>
  )
}
