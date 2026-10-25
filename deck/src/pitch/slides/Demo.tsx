import { Card, Scribble } from '@design/ui/kit'
import { Blicky } from '@design/cast/Cast'
import { tokens } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show } from '../kit/step'

/** 6 · The demo cue. The question is his pick (D1: "S05 → E3: 'what radius did that video use?'"). 3 steps.
    0  the question, and the 2 screens: one seen earlier, one now
    1  the earlier screen lights: the answer only exists there ("9:14, 3 mm", docs/research/scenarios.md per the outline)
    2  now: Blicky marks the Fillet tool on the current screen
    Then the live demo runs; the backup clip is J6. Card wording is DRAFT. */
const K = tokens.component.deck.scale

export function Demo() {
  return (
    <Page title="“What radius did that video use?”">
      <div style={{ display: 'flex', gap: tokens.component.deck.gutter, alignItems: 'flex-start' }}>
        <Show dimFrom={2}>
          <Card width={span(6)} height={420} scale={K}>
            <div style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)' }}>earlier</div>
            <div style={{ font: 'var(--t-head-2)' }}>The video you watched</div>
            <Show from={1} style={{ marginTop: 'auto' }}>
              <div style={{ font: '400 var(--deck-hero)/1 var(--font-pixel)' }}>3 mm</div>
              <div style={{ font: 'var(--t-head-3)', color: 'var(--text-secondary)', marginTop: 8 }}>at 9:14</div>
            </Show>
          </Card>
        </Show>
        <Show dim={false}>
          <Card width={span(6)} height={420} scale={K}>
            <div style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)' }}>now</div>
            <div style={{ font: 'var(--t-head-2)' }}>The file you’re in</div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ position: 'relative', font: '600 var(--deck-lead)/1 var(--font-head)', padding: '18px 26px' }}>
                Fillet
                <Show from={2} style={{ position: 'absolute', left: 0, top: '78%', pointerEvents: 'none' }}><Scribble kind="swoosh" w={200} seed={3} /></Show>
              </div>
              <Show from={2}><Blicky pose="sketch" height={150} /></Show>
            </div>
          </Card>
        </Show>
      </div>
    </Page>
  )
}
