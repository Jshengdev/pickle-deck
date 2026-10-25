import { Surface } from '@design/material/Surface'
import { Wordmark } from '@design/ui/kit'
import { M } from '../../brand/frame'
import { PickleOnMoss } from '../../brand/slides-a'
import { Show } from '../kit/step'

/** 1 · Title, the brand book's cover template: forest felt, the wordmark, the line, the cast on moss. 2 steps.
    His pick for the line: "It sees what you mean" (S2). The kicker is from the outline.
    The bottom line, his words 2026-10-25 ~4:40 AM, lightly cleaned: "Computer use AI collaborator that… works with you, helps
    you on your own screen, and manages your context… So you can turn your messy projects and ambitious thoughts into the
    next actionable step." */
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
        <div style={{ font: '700 var(--deck-giant)/0.92 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>pickje sees<br />what you mean.</div>
        <Show from={1}><p style={{ margin: '36px 0 0', maxWidth: 940, font: 'var(--t-second-2)', color: 'var(--text-on-dark)' }}>{LINE}</p></Show>
      </div>
      <div style={{ position: 'absolute', right: 130, bottom: 110 }}><PickleOnMoss withBlicky w={680} h={440} /></div>
    </>
  )
}
