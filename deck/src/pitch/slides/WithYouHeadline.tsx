import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M } from '../../brand/frame'

/** 9 · the headline, right before "Introducing pickje". 1 step: the line, big, with the two of them beside it.
    His words (2026-10-25, 5:46 AM run-through, voice): "instead of a tool that does more for you, we build one that does
    it with you" ("build" set as "built", nothing else changed). The same line is the title of the decisions slide
    (WithYou.tsx), after Meet Pickle and Meet Blicky. Things rise in when the slide arrives (his ask, 10-25 ~5 AM: "more
    animated when you do each new slide"). */
export const WITH_YOU_HEADLINE_STEPS = 1

const spring = { type: 'spring', visualDuration: 0.55, bounce: 0.14 } as const

export function WithYouHeadline() {
  const d = useDialKit('Does it with you', { head: [92, 60, 130, 1], top: [290, 160, 420, 2], pickle: [250, 120, 400, 2], blicky: [330, 160, 480, 2] })
  return (
    <>
      <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={spring}
        style={{ position: 'absolute', left: M, top: d.top, margin: 0, font: `700 ${d.head}px/1.04 var(--font-head)`, letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
        Instead of a tool that does more for you,<br />
        we built one that <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.45 }} style={{ color: 'var(--pickle-ink)' }}>does it with you.</motion.span>
      </motion.h1>
      <motion.div initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.25 }}
        style={{ position: 'absolute', right: M + 80, bottom: 70, display: 'flex', alignItems: 'flex-end', gap: 36, pointerEvents: 'none' }}>
        <Pickle pose="wave" height={d.pickle} />
        <Blicky pose="cheer" height={d.blicky} />
      </motion.div>
    </>
  )
}
