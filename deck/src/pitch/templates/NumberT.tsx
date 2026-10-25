import { useRef } from 'react'
import { useDialKit } from 'dialkit'
import { ease } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show, useStepTimeline } from '../kit/step'

/** TEMPLATE · One number. The title says what it means; the first press counts the number up (the machine counts in
    steps, so it ticks); the second adds what it compares to. Every number names its source. 3 steps.
    Register with: { steps: 3, render: NumberT }

    CHANGE ME ↓ (use a real number from docs/STATUS.md and cite its ID) */
const TITLE = 'It finds what’s on your screen in 42 ms'
const VALUE = 42
const UNIT = 'ms'
const CAPTION = 'Newest frame, read from the screen'
const COMPARE = 'Faster than a blink, so it already knows before you finish the sentence.'   // DRAFT
const SOURCE = 'docs/STATUS.md, C4'

export function NumberT() {
  const root = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)
  const d = useDialKit('Number', { count: [0.9, 0.2, 3, 0.05], ticks: [24, 4, 60, 1], size: [320, 120, 480, 4] })

  useStepTimeline(root, (tl) => {
    const n = { v: 0 }
    const draw = () => { if (num.current) num.current.textContent = String(Math.round(n.v)) }
    tl.set('.figure', { opacity: 0 }).set(n, { v: 0, onUpdate: draw })
      .to('.figure', { opacity: 1, duration: 0.15, ease: ease.step })
      .to(n, { v: VALUE, duration: d.count, ease: `steps(${d.ticks})`, onUpdate: draw }, '<')
      .addLabel('s1')
  }, [d.count, d.ticks])

  return (
    <Page title={TITLE}>
      <div ref={root}>
        <div className="figure" style={{ display: 'grid', gap: 10 }}>
          <div style={{ font: `400 ${d.size}px/0.9 var(--font-pixel)`, letterSpacing: '-0.02em' }}>
            <span ref={num}>{VALUE}</span><span style={{ fontSize: '0.35em', marginLeft: 16 }}>{UNIT}</span>
          </div>
          <div style={{ font: 'var(--t-head-3)', color: 'var(--text-secondary)' }}>{CAPTION} · {SOURCE}</div>
        </div>
        <Show from={2} style={{ marginTop: 48, maxWidth: span(7) }}>
          <p style={{ margin: 0, font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{COMPARE}</p>
        </Show>
      </div>
    </Page>
  )
}
