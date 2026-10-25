import { useDialKit } from 'dialkit'
import { Page, span } from '../../brand/frame'
import { Show, useStep } from '../kit/step'

/** TEMPLATE · Problem statement. The title states it; each press adds one pain and the earlier ones fade back, so
    only one idea is lit at a time. The last press brings them all back with the line that lands it.
    Steps = PAINS.length + 2. With 3 pains: { steps: 5, render: ProblemT }

    CHANGE ME ↓ (add or remove pains; the steps follow) */
const TITLE = 'You explain the same thing 3 times'                     // DRAFT: a sentence with a verb
const PAINS = [
  { lead: 'You saw the answer on a screen earlier', detail: 'A video, a page, a file you already closed.' },
  { lead: 'You go back and dig for it', detail: 'Scrubbing, scrolling, searching tabs.' },
  { lead: 'Then you explain it all again', detail: 'Out loud, to a tool that wasn’t there.' },
]                                                                        // DRAFT
const LANDING = '“Start saying something that seems to like reference context from what you were looking at before…”' // his words (M1)
export const PROBLEM_STEPS = PAINS.length + 2

export function ProblemT() {
  const step = useStep()
  const last = PAINS.length + 1
  const d = useDialKit('Problem', { rowGap: [40, 12, 96, 2], numberWidth: [120, 60, 220, 2] })
  return (
    <Page title={TITLE}>
      <div style={{ display: 'grid', gap: d.rowGap }}>
        {PAINS.map((p, i) => (
          <Show key={p.lead} from={i + 1} dim={step > i + 1 && step < last}>
            <div style={{ display: 'grid', gridTemplateColumns: `${d.numberWidth}px 1fr`, alignItems: 'baseline' }}>
              <div style={{ font: 'var(--t-pixel-2)' }}>{i + 1}</div>
              <div>
                <div style={{ font: 'var(--t-head-2)' }}>{p.lead}</div>
                <div style={{ font: 'var(--t-head-3)', color: 'var(--text-secondary)', marginTop: 6 }}>{p.detail}</div>
              </div>
            </div>
          </Show>
        ))}
      </div>
      <Show from={last} style={{ position: 'absolute', bottom: 0, maxWidth: span(9) }}>
        <p style={{ margin: 0, font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{LANDING}</p>
      </Show>
    </Page>
  )
}
