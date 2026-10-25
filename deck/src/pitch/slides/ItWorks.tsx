import { Stat } from '@design/ui/kit'
import { Page } from '../../brand/frame'
import { Show } from '../kit/step'

/** 9 · It works, the brand book's Numbers template: 3 numbers, one per press. 3 steps.
    All re-run by the lead (docs/STATUS.md). Which 3 is his call (outline, "Calls that are his" 3); the others:
    earlier moment in the top 10 for 5/5 (C5), boxes 9/10 at IoU ≥ 0.9 (C7), capture 99.5% (C2). Title is DRAFT. */
const NUMBERS = [
  { value: '42ms', caption: 'The newest frame. STATUS C4.' },
  { value: '9/9', caption: 'Now or earlier, right. C6.' },
  { value: '10/10', caption: 'Shakes caught, 0 false wakes. C1.' },
]
export const IT_WORKS_STEPS = NUMBERS.length

export function ItWorks() {
  return (
    <Page title="It already works">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 170 }}>
        {NUMBERS.map((n, i) => (
          <Show key={n.value} from={i}><Stat value={n.value} caption={n.caption} size="calc(var(--deck-giant) * 1.35)" /></Show>
        ))}
      </div>
    </Page>
  )
}
