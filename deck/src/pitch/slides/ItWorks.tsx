import { Stat } from '@design/ui/kit'
import { Page } from '../../brand/frame'
import { Show } from '../kit/step'

/** It works, the brand book's Numbers template: 3 numbers, one per press. 3 steps.
    Updated 2026-10-25 to the first full live exam (the pickje README, docs/PRODUCT.md:27-29, 50, 70): a live exam drove the
    real app on the real screen and a strict Opus judge graded it against the demo's rubric. Which 3 is his call; the
    caveat stays on the slide: the whole rubric was 52% on that run, which had demo examples in its prompts, so it isn't a
    clean number (pass bar: 80% over two runs). Others he could pick: 6 ms to the live card (Convex, :79), 15/18 found on a
    staged question set (Elastic, :87), 499 ms to go quiet when you talk (Cartesia, :61). Title is DRAFT. */
const NUMBERS = [
  { value: '0', caption: 'answers given away early: 16/16 reveal criteria.' },
  { value: '16/16', caption: 'turns routed to the right project.' },
  { value: '20/21', caption: 'chemistry criteria on the first live exam.' },
]
const CAVEAT = 'First full live exam, graded by a strict Opus judge against the demo’s rubric. The whole rubric was 52% on that run, which had demo examples in its prompts, so it isn’t a clean number. The pass bar is 80% over two runs.'
export const IT_WORKS_STEPS = NUMBERS.length

export function ItWorks() {
  return (
    <Page title="It already works">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 170 }}>
        {NUMBERS.map((n, i) => (
          <Show key={n.value} from={i}><Stat value={n.value} caption={n.caption} size="calc(var(--deck-giant) * 1.35)" /></Show>
        ))}
      </div>
      <Show from={2}><p style={{ margin: '56px 0 0', maxWidth: 1300, font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>{CAVEAT}</p></Show>
    </Page>
  )
}
