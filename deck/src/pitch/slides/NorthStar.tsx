import { Card, Tray } from '@design/ui/kit'
import { tokens } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show, useStep } from '../kit/step'

/** 7 · Your north star, the brand book's Content template (a felt tray of metal cards). 4 steps.
    0–2  one card per press: say the big goal → react to a draft → one next step; the earlier ones fade back
    3    all 3 back, with his line under the tray
    His words: "ambition starts in your own words, not a template, and then the draft is something to react to, and the
    reaction is the signature." (S5) and he clicked "One step (Recommended)" (O6). Card lines are DRAFT. */
const K = tokens.component.deck.scale
const STEPS = [
  { title: 'Say the big goal', line: 'Out loud, in your own words.' },
  { title: 'React to a draft', line: 'One line pickje writes back.' },
  { title: 'Take one next step', line: 'Only one, never a list.' },
]
const LINE = '“the reaction is the signature.”'
export const NORTH_STAR_STEPS = STEPS.length + 1
const W = (1728 - 2 * 24 * K - 2 * 16 * K) / 3

export function NorthStar() {
  const step = useStep()
  const last = STEPS.length
  return (
    <Page title="Your north star, in your own words">
      <Tray width={1728} height={480} scale={K} layout={{ alignItems: 'center' }}>
        {STEPS.map((s, i) => (
          <Show key={s.title} from={i} dim={step > i && step < last}>
            <Card width={W} height={380} scale={K} lifted={step === i}>
              <div style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)' }}>{i + 1}</div>
              <div style={{ font: 'var(--t-head-2)' }}>{s.title}</div>
              <div style={{ font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{s.line}</div>
            </Card>
          </Show>
        ))}
      </Tray>
      <Show from={last} style={{ marginTop: 56, maxWidth: span(10) }}>
        <p style={{ margin: 0, font: 'var(--t-second-1)' }}>{LINE}</p>
      </Show>
    </Page>
  )
}
