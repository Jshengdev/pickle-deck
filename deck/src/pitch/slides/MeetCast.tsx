import type { ReactNode } from 'react'
import { Card } from '@design/ui/kit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { tokens } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show } from '../kit/step'

/** 3 · Meet Pickle and Blicky: one metal card each. Pickle is there on arrival; Blicky joins on the first press. 2 steps.
    The lines are from the option he picked (S4): "Pickle rides on your cursor… its real work is backstage as the context
    brain, helping Blicky. Blicky is the one you see sketch and talk." */
const K = tokens.component.deck.scale

function CastCard({ name, line, children }: { name: string; line: string; children: ReactNode }) {
  return (
    <Card width={span(6)} height={540} scale={K}>
      <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>{name}</div>
      <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)', maxWidth: span(4) }}>{line}</div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>{children}</div>
    </Card>
  )
}

export function MeetCast() {
  return (
    <Page title="Meet Pickle and Blicky">
      <div style={{ display: 'flex', gap: tokens.component.deck.gutter }}>
        <CastCard name="Pickle" line="Rides on your cursor. Its real work is backstage, as the context brain."><Pickle pose="listen" height={300} /></CastCard>
        <Show from={1}>
          <CastCard name="Blicky" line="The one you see sketch and talk."><Blicky pose="sketch" height={210} /></CastCard>
        </Show>
      </div>
    </Page>
  )
}
