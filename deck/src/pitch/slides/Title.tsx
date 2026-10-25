import { Surface } from '@design/material/Surface'
import { Wordmark } from '@design/ui/kit'
import { M } from '../../brand/frame'
import { PickleOnMoss } from '../../brand/slides-a'
import { Show } from '../kit/step'

/** 1 · Title, the brand book's cover template: forest felt, the wordmark, the line, the cast on moss. 2 steps.
    His pick for the line: "It sees what you mean" (S2). The kicker is from the outline. */
export function Title() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, top: 110 }}><Wordmark size={64} tone="on-dark" /></div>
      <div style={{ position: 'absolute', left: M, bottom: 140, color: 'var(--text-on-dark)' }}>
        <div style={{ font: '700 var(--deck-giant)/0.92 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>pickje sees<br />what you mean.</div>
        <Show from={1}><p style={{ margin: '30px 0 0', font: 'var(--t-second-2)', color: 'var(--text-on-dark-muted)' }}>cal hacks 13.0 · october 2026</p></Show>
      </div>
      <div style={{ position: 'absolute', right: 130, bottom: 110 }}><PickleOnMoss withBlicky w={680} h={440} /></div>
    </>
  )
}
