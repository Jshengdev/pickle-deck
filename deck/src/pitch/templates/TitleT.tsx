import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M, span } from '../../brand/frame'
import { Show } from '../kit/step'

/** TEMPLATE · Title. A big statement on forest felt, then one quiet line on the first press. 2 steps.
    Register with: { steps: 2, ground: 'var(--surface-felt)', dark: true, chrome: false, render: TitleT }

    CHANGE ME ↓ */
const STATEMENT = 'pickje sees what you mean.'     // his pick (outline slide 1, S2)
const LINE = 'cal hacks 13.0 · october 2026'       // outline slide 1

export function TitleT() {
  const d = useDialKit('Title', { size: [180, 96, 260, 2], castHeight: [300, 120, 480, 4] })
  return (
    <>
      <div style={{ position: 'absolute', left: M, bottom: 140, width: span(9), color: 'var(--text-on-dark)' }}>
        <div style={{ font: `700 ${d.size}px/0.92 var(--font-head)`, letterSpacing: 'var(--tracking-giant)' }}>{STATEMENT}</div>
        <Show from={1} style={{ marginTop: 36 }}>
          <div style={{ font: 'var(--t-second-2)', color: 'var(--text-on-dark-muted)' }}>{LINE}</div>
        </Show>
      </div>
      <div style={{ position: 'absolute', right: M, bottom: 140, display: 'flex', alignItems: 'flex-end', gap: 24 }}>
        <Pickle pose="wave" height={d.castHeight * 0.8} />
        <Blicky pose="stand" height={d.castHeight} />
      </div>
    </>
  )
}
