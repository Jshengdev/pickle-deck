import { Card, Tray } from '@design/ui/kit'
import { tokens } from '@design/tokens'
import { Page } from '../../brand/frame'
import { Show, useStep } from '../kit/step'

/** 8 · How it works: a felt tray holding the 5 pieces. All 5 are there on arrival; each press lifts one and the rest
    fade back, so you talk through them one at a time. Steps = PIECES.length + 1.
    Every line is a fact from the outline with its ID (docs/SPEC.md, docs/STATUS.md). The title is DRAFT. */
const K = tokens.component.deck.scale
const PIECES = [
  { name: 'Shell', line: 'Native Swift, like open-source Clicky', proof: 'S8, F2' },
  { name: 'Eyes', line: 'screenpipe, local: nothing leaves the Mac', proof: 'M4' },
  { name: 'Brain', line: 'Claude decides now or earlier', proof: 'C6' },
  { name: 'Voice', line: 'Cartesia', proof: 'Q4' },
  { name: 'Sessions', line: 'cmux, with your words kept per repo', proof: 'C10, C15' },
]
export const HOW_STEPS = PIECES.length + 1
const W = (1728 - 2 * 24 * K - (PIECES.length - 1) * 16 * K) / PIECES.length

export function HowItWorks() {
  const step = useStep()
  return (
    <Page title="5 pieces make it work">
      <Tray width={1728} height={540} scale={K} layout={{ alignItems: 'center' }}>
        {PIECES.map((p, i) => (
          <Show key={p.name} dim={step > 0 && step !== i + 1}>
            <Card width={W} height={440} scale={K} lifted={step === i + 1}>
              <div style={{ font: 'var(--t-head-2)' }}>{p.name}</div>
              <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>{p.line}</div>
              <div style={{ marginTop: 'auto', font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>{p.proof}</div>
            </Card>
          </Show>
        ))}
      </Tray>
    </Page>
  )
}
