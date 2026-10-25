import { Surface } from '@design/material/Surface'
import { Wordmark } from '@design/ui/kit'
import { Say } from '@design/cast/Cast'
import { M, span } from '../../brand/frame'
import { PickleOnMoss } from '../../brand/slides-a'
import { Show } from '../kit/step'
import { HER } from './story'

/** 11 · Close, as the end of a love letter: back to Mia, the 3 reasons with proof, then the signature. 3 steps.
    0  her ending: she started (the story pays off)
    1  why it works for her, and for you: 3 reasons, the last one with real numbers (docs/STATUS.md C4, C6, C1)
    2  the line, signed by the cast ("the reaction is the signature", his words S5), and the ask if there is one
    Wording is DRAFT. ASK stays empty until he gives the one-line ask; empty means it isn't shown (no placeholders). */
export const CLOSE_STEPS = 3
const ENDING = `Tonight, ${HER} started.`
const ENDING_LINE = 'Not with 5 answers. With 1 next step.'
const REASONS = [
  { lead: 'It remembers everything you’re juggling.', proof: '' },
  { lead: 'It gives you 1 next step, not a wall.', proof: '' },
  { lead: 'It already works.', proof: '42 ms to see your screen · 9/9 now-or-earlier · 10/10 shakes  (STATUS C4, C6, C1)' },
]
const SIGN_OFF = `we’ve got you, ${HER}`
const ASK = ''

export function Close() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, top: 64 }}><Wordmark size={44} tone="on-dark" /></div>

      <div style={{ position: 'absolute', left: M, top: 170, width: span(8), color: 'var(--text-on-dark)' }}>
        <div style={{ font: '700 var(--deck-hero)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>{ENDING}</div>
        <p style={{ margin: '22px 0 0', font: 'var(--t-second-2)', color: 'var(--text-on-dark-muted)' }}>{ENDING_LINE}</p>

        <div style={{ display: 'grid', gap: 26, marginTop: 64 }}>
          {REASONS.map((r, i) => (
            <Show key={r.lead} from={1}>
              <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'baseline' }}>
                <span style={{ font: 'var(--t-pixel-3)', color: 'var(--text-on-dark-muted)' }}>{i + 1}</span>
                <div>
                  <div style={{ font: 'var(--t-head-2)' }}>{r.lead}</div>
                  {r.proof && <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-on-dark-muted)', marginTop: 8 }}>{r.proof}</div>}
                </div>
              </div>
            </Show>
          ))}
        </div>
      </div>

      <Show from={2} style={{ position: 'absolute', left: M, bottom: 96, color: 'var(--text-on-dark)' }}>
        <div style={{ font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>pickje sees what you mean.</div>
        {ASK && <div style={{ font: 'var(--t-second-2)', color: 'var(--text-on-dark-muted)', marginTop: 14 }}>{ASK}</div>}
      </Show>

      <div style={{ position: 'absolute', right: 110, bottom: 96 }}>
        <Show from={2} style={{ position: 'absolute', right: 20, top: -120 }}><Say size={30} side="right">{SIGN_OFF}</Say></Show>
        <PickleOnMoss withBlicky w={600} h={390} />
      </div>
    </>
  )
}
