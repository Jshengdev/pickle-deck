import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Pickle } from '@design/cast/Cast'
import { NotesPad, MOSS_DEFAULT, type PlanPage, type Peek } from '@design/ui/product/NotesPad'
import type { Project } from '@design/ui/product/Notepad'
import { M, span, TOP } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Lines } from './mia/parts'

/** 11 · Meet Pickle. His words (2026-10-25, 4:38 AM, voice): "so then we're going to introduce the cast, which is Meet
    Pickle. Basically, this is your context brain. It keeps track of your to-do listing, and then also include the
    visualization of its UI tab."
    What each press shows:
      0  "Meet Pickle." and Pickle, drawn large (he moves in when the slide arrives: "more animated when you do each new slide").
      1  "Your context brain." Pickle steps aside and points; his notepad rises in, the sticker lands, the page is written.
      2  "It keeps track of every project…" the pad keeps writing: the north star, the last stop, the next step.
      3  "Each project is a tab…" the desk lamp tab slides out with its next step, and one press later the pad is on that page.
    The notepad is the final one he signed off ("these two will be the final two examples"), set up as in
    deck/src/notepads/Notepads.tsx (FinalPad, who='pickle'); its data is copied from there below. */
const TITLE = 'Meet Pickle.'                                     // his words: "introduce the cast, which is Meet Pickle"
const LEAD = 'Your context brain.'                                      // his words: "this is your context brain" (trimmed)
const LINES = [
  'It keeps track of every project: the north star, the last stop, the next step.',   // DRAFT, from his "It keeps track of your to-do listing"; the three are the pad's own labels
  'Each project is a tab; one press and you’re back in it.',                          // DRAFT, from his "include the visualization of its UI tab"
]
export const MEET_PICKLE_STEPS = 2 + LINES.length

const PRINT = new URLSearchParams(location.search).has('print')
const spring = { type: 'spring', visualDuration: 0.55, bounce: 0.14 } as const

/** The staged projects, word for word from deck/src/notepads/Notepads.tsx (there: from app/recall/staged.ts in the pickje
    repo; synthetic, every word by "test"). The peeks keep their words; their screen stand-ins are left out (nothing was
    captured, and the card only shows on hover). */
const STAGED: { name: string; tab: string; title: string; north: string; last: { day: string; text: string }; next: string; earlier: { day: string; text: string }[]; peek: Peek }[] = [
  { name: 'O-chem worksheet', tab: 'o-chem', title: 'O-chem worksheet', north: 'solve every unknown on the worksheet and be able to explain each step on the exam',
    last: { day: 'FRI', text: 'Molecule B: butanoic acid, confirmed by the 12 ppm singlet' }, next: 'question 3: the Fischer esterification mechanism for butanoic acid with ethanol',
    earlier: [{ day: 'THU', text: 'Molecule A solved: 3-pentanone' }, { day: 'WED', text: 'Molecule A: one degree of unsaturation, and the 1715 cm⁻¹ IR peak makes it a ketone' }],
    peek: { where: 'FRI 3:32 PM · chem3b-worksheet-7, question 2',
      said: 'molecule B has the broad thing at 3000 and a peak at 1710, ester or acid', reply: 'the broad band from 2500 to 3300 is an O–H, so it’s the acid, not the ester; the 1710 is its C=O.' } },
  { name: 'Desk lamp', tab: 'desk lamp', title: 'Desk lamp in Fusion 360', north: 'a printable desk lamp: base, two-link arm and shade, exported as STLs that fit the printer bed',
    last: { day: 'FRI', text: 'Shade shelled at 1.5 mm; elbow joint limited to 0–110°' }, next: 'cut a 5 mm wire channel down the upper link, then export the STLs',
    earlier: [{ day: 'THU', text: 'Both arm links modeled, the elbow hole at 6.4 mm' }, { day: 'WED', text: 'Base revolved and filleted' }],
    peek: { where: 'FRI 11:03 AM · desk-lamp v4',
      said: 'how do i make the shade light, it’s solid right now', reply: 'shell it: revolve the cone, then Shell at 1.5 mm with the bottom face open.' } },
  { name: 'Onboarding critique', tab: 'onboarding', title: 'Onboarding critique', north: 'a short, kind critique with the three changes that matter most, ready for Monday’s design review',
    last: { day: 'FRI', text: 'Critique written for screens 1 to 3' }, next: 'write the one-paragraph summary for Monday’s design review and pick two screenshots to attach',
    earlier: [{ day: 'THU', text: 'Decided on three onboarding screens' }],
    peek: { where: 'FRI 6:32 PM · Habit app onboarding v3',
      said: 'the mascot is cute but its on every screen', reply: 'keep it on the welcome screen only; on the goal picker it pulls the eye away from the choices.' } },
]
/** Pickle's pages: one per project. */
const PICKLE: PlanPage[] = STAGED.map((p) => ({ title: p.title, working: `${p.name}…`, north: p.north, last: p.last, next: p.next, earlier: p.earlier, peek: p.peek }))
/** The blue tabs, one per project, each holding its next step for the hover card. */
const PROJECTS: Project[] = STAGED.map((p, i) => ({ name: p.tab, felt: ['surface-felt', 'surface-felt-sky', 'surface-felt-sage'][i], ink: i === 0 ? 'on-dark' : 'ink',
  state: i === 0 ? 'running' : 'idle', north: p.north, next: p.next }))
/** The tab press 3 opens, and its page. */
const OPEN = 'desk lamp', OPEN_PAGE = PROJECTS.findIndex((p) => p.name === OPEN)

/** Where things sit. The pad: its sheet is PAD.w wide; the tabs and their hover card hang off its right side. */
const PAD = { x: 1060, y: 160, w: 460, h: 830 }
const BIG = 700                                         // Pickle's drawn height when he's alone on the slide
const SIDE = { scale: 0.56, x: -436, y: -4 }            // and beside the pad (from step 1): smaller, to its left, pointing at it

export function MeetPickle() {
  const step = useStep()
  const shown = step >= 1
  // the pad rises in, then the sticker lands on it, then the page is written (as the final does: start = landed)
  const [landed, setLanded] = useState(PRINT || step >= 1)
  useEffect(() => {
    if (!shown) { setLanded(false); return }
    const t = window.setTimeout(() => setLanded(true), PRINT ? 0 : 650)
    return () => clearTimeout(t)
  }, [shown])
  // press 3: the desk lamp tab slides out (the pad's own hover, shown by hovering it for him), then the pad turns to its page
  const pad = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(step >= 3 ? OPEN_PAGE : 0)
  useEffect(() => {
    const tab = pad.current?.querySelector<HTMLElement>(`[data-tab="${OPEN}"]`)
    if (step >= 3) {
      tab?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
      const t = window.setTimeout(() => setPage(OPEN_PAGE), PRINT ? 0 : 750)
      return () => clearTimeout(t)
    }
    tab?.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    setPage(0)
  }, [step])
  const pick = (name: string) => { const i = PROJECTS.findIndex((p) => p.name === name); if (i >= 0) setPage(i) }

  return (
    <>
      {/* the words: his name for him, then one sentence per press */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}
        style={{ position: 'absolute', left: M, top: TOP, font: '700 var(--deck-giant)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)', whiteSpace: 'nowrap' }}>{TITLE}</motion.div>
      <Lines lines={[LEAD]} from={1} style={{ position: 'absolute', left: M, top: 364, width: span(6) }} />
      <Lines lines={LINES} from={2} size="var(--t-head-2)" gap={22} style={{ position: 'absolute', left: M, top: 476, width: span(6) - 40 }} />

      {/* Pickle, drawn: alone and large, then beside his notepad, pointing at it */}
      <motion.div initial={{ opacity: 0, y: 140, scale: 0.86 }} transition={spring}
        animate={shown ? { opacity: 1, x: SIDE.x, y: SIDE.y, scale: SIDE.scale } : { opacity: 1, x: 0, y: 0, scale: 1 }}
        style={{ position: 'absolute', left: 1180, bottom: 34, transformOrigin: '50% 100%' }}>
        <Pickle pose={shown ? 'point' : 'wave'} height={BIG} />
      </motion.div>

      {/* his notepad, the final: metal bezel, paper sheet, all-moss binding, the plan tab in front and the blue project tabs */}
      <motion.div ref={pad} initial={false} animate={shown ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 70, rotate: 2 }} transition={{ ...spring, delay: shown ? 0.15 : 0 }}
        style={{ position: 'absolute', left: PAD.x, top: PAD.y, pointerEvents: shown ? 'auto' : 'none' }}>
        <NotesPad who="pickle" pages={PICKLE} page={page} writing={!PRINT && step < 3} start={landed} surface="bezel" sheet="paper" binding="moss"
          moss={MOSS_DEFAULT} sticker={landed ? true : 'hidden'} stagger={1} load grass projects={PROJECTS} lead="plan" onPick={pick} width={PAD.w} height={PAD.h} />
      </motion.div>
    </>
  )
}
