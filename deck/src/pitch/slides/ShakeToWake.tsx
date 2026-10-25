import { useRef } from 'react'
import { Key } from '@design/ui/kit'
import { Pickle } from '@design/cast/Cast'
import { Cursor } from '@design/stage/Cursor'
import { Page, Rule, span } from '../../brand/frame'
import { StateCard } from '../../brand/slides-d'
import { Show, useStep, useStepTimeline } from '../kit/step'
import { ChemPage } from './ChemPage'

/** 4 · Shake to wake, the brand book's Moment template (the screen, the cursor, the card at the bottom right). 3 steps.
    The screen is Mia's chemistry homework (./ChemPage.tsx), so the story carries on: she's stuck on it, and shakes.
    0  Pickle asleep at the cursor, on the molecule's –COOH group ("this carboxylic acid group here")
    1  the cursor shakes (ease 'unsure', the brand's wiggle) and Pickle wakes; the card says Listening
    2  the 2 rules, with the proof
    His words: "shake it to awake for the hands free mode… a combination key bind to close it" (S3).
    Fact: 10 of 10 shakes, 0 false wakes; ⌃⌥⌘P closes (C1). Title from the outline draft. */
export function ShakeToWake() {
  const step = useStep()
  const root = useRef<HTMLDivElement>(null)
  useStepTimeline(root, (tl) => {
    tl.to('.shake', { x: 34, duration: 0.8, ease: 'unsure' }).addLabel('s1')
  })

  return (
    <Page title="Shake your cursor. Say it.">
      <div ref={root} style={{ position: 'relative', width: 1280, height: 660, borderRadius: 29, overflow: 'hidden', background: 'linear-gradient(165deg, var(--silver-200), var(--silver-300))' }}>
        <div style={{ position: 'absolute', left: 60, top: 50 }}><ChemPage w={840} h={580} /></div>
        <div className="shake" style={{ position: 'absolute', left: 352, top: 190 }}>
          <Cursor size={34} />
          <div style={{ position: 'absolute', left: 24, top: 26 }}><Pickle pose={step >= 1 ? 'listen' : 'asleep'} height={70} /></div>
        </div>
        <Show from={1} style={{ position: 'absolute', right: 40, bottom: 40 }}>
          <StateCard title="Listening" value={2} accent="var(--state-listening)" lifted time="11:52" w={360} h={190} />
        </Show>
      </div>
      <Show from={2} style={{ position: 'absolute', left: 1340, top: 40, display: 'grid', gap: 40, width: span(3) }}>
        <Rule lead="Shake to wake.">10 of 10 shakes caught, 0 false wakes. STATUS C1.</Rule>
        <Rule lead="Sleep with 4 keys."><span style={{ display: 'inline-flex', gap: 6, marginTop: 10, zoom: 1.9 }}><Key>⌃</Key><Key>⌥</Key><Key>⌘</Key><Key>P</Key></span></Rule>
      </Show>
    </Page>
  )
}
