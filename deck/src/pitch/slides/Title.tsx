import { Surface } from '@design/material/Surface'
import { Wordmark } from '@design/ui/kit'
import { M } from '../../brand/frame'
import { PickleOnMoss } from '../../brand/slides-a'
import { Show } from '../kit/step'

/** 10 · Title, "Introducing pickje.", the brand book's cover template: forest felt, the wordmark, the line, the cast on moss. 2 steps.
    His pick for the line: "It sees what you mean" (S2). The kicker is from the outline.
    His second run-through 2026-10-25 5:46 AM, verbatim: "And then I think we should just introduce introducing Pickje, and
    then under the bottom of that say it's a computer use a collaborator that works with you". So the giant line is
    "Introducing pickje." and the bottom line is his, lightly cleaned. The tagline ("pickje sees what you mean.", his S2 pick)
    is off this slide since then. */
// his ask 2026-10-25 ~7 AM: "restore the full descitoponi of hte ai collaborat … i want the full descritpion": the 4:38 AM line
const LINE = 'A computer-use AI collaborator that works with you on your own screen and manages your context, so you can turn messy projects and ambitious thoughts into the next actionable step.'

export function Title() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, top: 110, display: 'flex', alignItems: 'baseline', gap: 28 }}>
        <Wordmark size={64} tone="on-dark" />
        <span style={{ font: 'var(--t-pixel-4)', color: 'var(--text-on-dark-muted)' }}>cal hacks 13.0 · october 2026</span>
      </div>
      <div style={{ position: 'absolute', left: M, bottom: 140, color: 'var(--text-on-dark)' }}>
        <div style={{ font: '700 var(--deck-giant)/0.92 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>Introducing<br />pickje.</div>
        <Show from={1}><p style={{ margin: '36px 0 0', maxWidth: 940, font: 'var(--t-second-2)', color: 'var(--text-on-dark)' }}>{LINE}</p></Show>
      </div>
      <div style={{ position: 'absolute', right: 130, bottom: 110 }}><PickleOnMoss withBlicky w={680} h={440} /></div>
    </>
  )
}
