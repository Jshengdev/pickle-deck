import { Surface } from '@design/material/Surface'
import { Wordmark } from '@design/ui/kit'
import { motion } from 'motion/react'
import { M, span } from '../../brand/frame'
import { PickleOnMoss } from '../../brand/slides-a'
import { Show, useStep } from '../kit/step'
import { HER } from './story'

/** 19 · Close, as the end of a love letter: back to Mia, a quick summary, then "We've got you, Mia." with the cast. 3 steps.
    His run-through 2026-10-25 5:20 AM, verbatim: "And then ended off with tonight. Mia started not with ten sessions, but
    with the one next step. This is a quick summary. Beautiful, beautiful, beautiful. And then ended up with we got you, Mia.
    And then make it so like the image at the end is the pickle and Blicky."
    0  her ending (his words)
    1  the quick summary: 3 reasons, the last with real numbers: the latest live exam, two passes
       (docs/evals/2026-10-24-2/summary.txt: chemistry 47/50, reveal 33/34 with 1 slip) and routing (docs/PRODUCT.md:198)
    2  "We've got you, Mia." (his words) and Pickle and Blicky, big: the last image
    The reasons are DRAFT. */
export const CLOSE_STEPS = 3
const ENDING = `Tonight, ${HER} started.`
const ENDING_LINE = 'Not with ten sessions, but with the one next step.'
const REASONS = [
  { lead: 'It remembers everything you’re juggling.', proof: '' },
  { lead: 'It gives you one next step, not a wall.', proof: '' },
  { lead: 'It already works.', proof: '47/50 chemistry · kept the answer back 33/34 (1 slip) · 16/16 routed right  (latest live exam, 2 passes)' },
]
const SIGN_OFF = `We’ve got you, ${HER}.`
const spring = { type: 'spring', visualDuration: 0.6, bounce: 0.14 } as const

export function Close() {
  const step = useStep(), end = step >= 2
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, top: 64 }}><Wordmark size={44} tone="on-dark" /></div>

      <motion.div initial={false} animate={{ opacity: end ? 0 : 1, y: end ? -30 : 0 }} transition={spring}
        style={{ position: 'absolute', left: M, top: 170, width: span(8), color: 'var(--text-on-dark)' }}>
        <div style={{ font: '700 var(--deck-hero)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>{ENDING}</div>
        <p style={{ margin: '22px 0 0', font: 'var(--t-second-2)', color: 'var(--text-on-dark-muted)' }}>{ENDING_LINE}</p>
        <div style={{ display: 'grid', gap: 26, marginTop: 64 }}>
          {REASONS.map((r, i) => (
            <Show key={r.lead} from={1}>
              <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', alignItems: 'baseline' }}>
                <span style={{ font: 'var(--t-pixel-3)', color: 'var(--text-on-dark-muted)' }}>{i + 1}</span>
                <div>
                  <div style={{ font: 'var(--t-head-2)' }}>{r.lead}</div>
                  {r.proof && <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-on-dark-muted)', marginTop: 8 }}>{r.proof}</div>}
                </div>
              </div>
            </Show>
          ))}
        </div>
      </motion.div>

      {/* the last image: the sign-off and the two of them, big */}
      <motion.div initial={false} animate={{ opacity: end ? 1 : 0, y: end ? 0 : 40 }} transition={{ ...spring, delay: end ? 0.2 : 0 }}
        style={{ position: 'absolute', left: M, top: 330, width: span(6), color: 'var(--text-on-dark)', font: '700 var(--deck-giant)/0.95 var(--font-head)', letterSpacing: 'var(--tracking-giant)', pointerEvents: 'none' }}>
        {SIGN_OFF}
      </motion.div>
      <motion.div initial={false} animate={end ? { scale: 1.45, x: -90, y: -40 } : { scale: 1, x: 0, y: 0 }} transition={spring}
        style={{ position: 'absolute', right: 110, bottom: 96, transformOrigin: '100% 100%' }}>
        <PickleOnMoss withBlicky w={600} h={390} />
      </motion.div>
    </>
  )
}
