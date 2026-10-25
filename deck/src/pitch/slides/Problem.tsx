import { Card } from '@design/ui/kit'
import { tokens } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show } from '../kit/step'

/** A problem statement, built in 3 steps (index.tsx: steps: 3). Outline slide 2.
    0  the screens you already looked at
    1  the question you ask now
    2  focus falls on the one screen that held the answer; the rest fade back
    Words marked DRAFT are ours, not his; check them before the final pass. */
const K = tokens.component.deck.scale

// The screens, left to right. `answer` marks the one that held it.
const SCREENS = [
  { what: 'A video you watched', when: 'earlier', answer: true },
  { what: 'The page you read', when: 'earlier' },
  { what: 'The file you’re in', when: 'now' },
]
const QUESTION = '“What radius did that video use?”'               // his pick (outline slide 6, D1)
const LINE = 'The answer was on a screen you already closed.'      // DRAFT

export function Problem() {
  return (
    <Page title="You already looked at it. Why explain it again?">
      <div style={{ display: 'flex', gap: tokens.component.deck.gutter }}>
        {SCREENS.map((s) => (
          <Show key={s.what} dimFrom={s.answer ? undefined : 2}>
            <Card width={span(4)} height={250} scale={K}>
              <div style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)' }}>{s.when}</div>
              <div style={{ font: 'var(--t-head-2)' }}>{s.what}</div>
            </Card>
          </Show>
        ))}
      </div>
      <Show from={1} style={{ marginTop: 72 }}>
        <div style={{ font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>{QUESTION}</div>
      </Show>
      <Show from={2} style={{ marginTop: 20, maxWidth: span(7) }}>
        <p style={{ margin: 0, font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{LINE}</p>
      </Show>
    </Page>
  )
}
