import { motion } from 'motion/react'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M } from '../../brand/frame'

/** 14 · The hand-off to his live demo of the onboarding. 1 step.
    His words (2026-10-25 5:20 AM, run-through): "the next slide just saying so we're gonna go ahead and do a quick live demo
    of the onboarding." The slide's line is his, lightly cleaned. */
const spring = { type: 'spring', visualDuration: 0.55, bounce: 0.16 } as const

export function LiveDemo() {
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={spring}
        style={{ position: 'absolute', left: M, top: 300, display: 'inline-flex', alignItems: 'center', gap: 14, padding: '10px 22px', borderRadius: 999, background: 'var(--ink)', color: 'var(--surface-page)', font: 'var(--t-pixel-3)' }}>
        <i style={{ width: 14, height: 14, borderRadius: 99, background: 'var(--ember-400)' }} />live
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}
        style={{ position: 'absolute', left: M, top: 390, width: 1100, font: '700 var(--deck-giant)/0.98 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>
        A quick live demo of the onboarding.
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.25 }} style={{ position: 'absolute', right: M + 40, bottom: 80, display: 'flex', alignItems: 'flex-end', gap: 30 }}>
        <Pickle pose="wave" height={460} />
        <Blicky pose="cheer" height={300} />
      </motion.div>
    </>
  )
}
