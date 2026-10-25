import { useDialKit } from 'dialkit'
import { Card } from '@design/ui/kit'
import { tokens } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show } from '../kit/step'

/** COPY ME to start a slide. Then add it to deck/src/pitch/index.tsx: { title, chapter, steps: 3, render: MySlide }.

    The shape of every slide: a title (a short sentence with a verb), then one hero, built up one idea per →.
    - steps: 3 in index.tsx means states 0, 1, 2. State 0 is what shows when the slide arrives.
    - <Show from={1}> appears on the first →. <Show dimFrom={2}> fades back when focus moves on.
    - The slide's own dial (bottom right, "Template") tunes this slide live. Copy the values you like back here. */
const K = tokens.component.deck.scale

export function TemplateSlide() {
  const d = useDialKit('Template', { cardWidth: [520, 300, 800, 4], gap: [32, 0, 120, 4] })
  return (
    <Page title="One idea arrives with each press">
      <div style={{ display: 'flex', gap: d.gap, alignItems: 'flex-start' }}>
        <Card width={d.cardWidth} height={300} scale={K}>
          <div style={{ font: 'var(--t-head-2)' }}>Here from the start</div>
        </Card>
        <Show from={1} dimFrom={2}>
          <Card width={d.cardWidth} height={300} scale={K}>
            <div style={{ font: 'var(--t-head-2)' }}>Arrives on the first press</div>
          </Card>
        </Show>
        <Show from={2} style={{ maxWidth: span(4) }}>
          <p style={{ margin: 0, font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>And the second press moves the focus here.</p>
        </Show>
      </div>
    </Page>
  )
}
