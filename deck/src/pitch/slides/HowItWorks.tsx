import { Card, Tray } from '@design/ui/kit'
import { tokens } from '@design/tokens'
import { Page } from '../../brand/frame'
import { Show, useStep } from '../kit/step'

/** How it's built: a felt tray holding the parts, each sponsor doing one job. All there on arrival; each press lifts one
    and the rest fade back. Steps = PIECES.length + 1. Updated 2026-10-25 from the pickje README (docs/PRODUCT.md:47-107):
    every line and proof is from there. Which ones to name is his call (outline, "Calls that are his" 4). Title is DRAFT. */
const K = tokens.component.deck.scale
const PIECES = [
  { name: 'Claude', line: 'Both brains, and the teacher', proof: 'Opus writes every turn and mark' },
  { name: 'Cartesia', line: 'The voice and the ears', proof: 'quiet 499 ms after you talk' },
  { name: 'Moss', line: 'Routes each turn; holds the live context', proof: '16/16 routed right' },
  { name: 'Convex', line: 'Pickle’s record, live', proof: '6 ms to the card' },
  { name: 'Elastic', line: 'Brings back what you did days ago', proof: '15/18, staged data' },
  { name: 'Factory', line: 'Droid does the project’s work', proof: 'says it back before it writes' },
  { name: 'Mana', line: 'The idea log a judge can open', proof: '36 staged entries' },
]
export const HOW_STEPS = PIECES.length + 1
const W = (1728 - 2 * 24 * K - (PIECES.length - 1) * 16 * K) / PIECES.length

export function HowItWorks() {
  const step = useStep()
  return (
    <Page title="7 parts, each doing one job">
      <Tray width={1728} height={540} scale={K} layout={{ alignItems: 'center' }}>
        {PIECES.map((p, i) => (
          <Show key={p.name} dim={step > 0 && step !== i + 1}>
            <Card width={W} height={440} scale={K} lifted={step === i + 1}>
              <div style={{ font: '700 30px var(--font-head)', letterSpacing: '-0.02em' }}>{p.name}</div>
              <div style={{ font: '400 21px/1.35 var(--font-second)', color: 'var(--text-secondary)' }}>{p.line}</div>
              <div style={{ marginTop: 'auto', font: '400 16px/1.3 var(--font-pixel)', color: 'var(--text-muted)' }}>{p.proof}</div>
            </Card>
          </Show>
        ))}
      </Tray>
    </Page>
  )
}
