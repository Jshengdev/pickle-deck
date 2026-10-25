import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Blicky } from '@design/cast/Cast'
import { NotesPad, MOSS_DEFAULT, type ScratchPage } from '@design/ui/product/NotesPad'
import { M, span, TOP } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Lines, Win } from './mia/parts'
import before from '../assets/annotations/before.png'
import after from '../assets/annotations/after.png'

/** 12 · Meet Blicky. His words (2026-10-25, 4:38 AM, voice): "And then this is Blicky, and show its scratchpad of like how
    it's able to draw diagrams and do all these different things."
    His run-through (2026-10-25, 5:20 AM, voice): "And then you meet Blicky. He is basically your draw executor. He basically
    does the actions on your screen. He draws it out. He keeps every diagram in a scratch pad, so you can easily organize your
    thoughts into whatever Pickle and Blicky."
    What each press shows:
      0  "Meet Blicky." and Blicky, drawn large (he bounces in when the slide arrives).
      1  "He does the work on your screen." A screen rises in (an o-chem page, unmarked) and Blicky steps down beside it with
         his pencil.
      2  "He draws it out with you." His marks draw across the page, left to right: the real marks the app drew
         (assets/annotations/after.png over before.png, from the app's marks gallery: rings, curved arrows, the IHD panel,
         the labels).
      3  "And keeps every diagram in his scratchpad, so your thoughts stay organized." His scratchpad rises onto the screen
         (where it lives in the app), the sticker lands, and the page is being written, the border running glass while it
         writes; when it's done the pad shows the diagrams it kept. The pen starts out of sight as the slide arrives (the
         earliest it can), so three presses in the page is well along.
    The scratchpad is the final he signed off ("these two will be the final two examples"), set up as in
    deck/src/notepads/Notepads.tsx (FinalPad, who='blicky'); its data is copied from there below. What the scratchpad is
    for, his words (deck/pitch/SCRIPT.md): "The scratch pad is just meant to summarize ideas and save the diagrams that
    were drawn so if it gets too cluttered it can pull the diagram from the screen and save it in the scratch pad." */
const TITLE = 'Meet Blicky.'                                     // his words (5:20 AM): "And then you meet Blicky"
const LINES = [
  'He does the work on your screen.',                              // his words, lightly cleaned: "He basically does the actions on your screen"
  'He draws it out with you.',                                     // his words: "He draws it out" ("with you" is ours, DRAFT)
  'And keeps every diagram in his scratchpad, so your thoughts stay organized.',   // his words, lightly cleaned: "He keeps every diagram in a scratch pad, so you can easily organize your thoughts"
]
export const MEET_BLICKY_STEPS = 1 + LINES.length

const PRINT = new URLSearchParams(location.search).has('print')
const spring = { type: 'spring', visualDuration: 0.55, bounce: 0.16 } as const

/** Blicky's scratchpad pages, word for word from deck/src/notepads/Notepads.tsx (there: from the staged worksheet sessions
    in app/recall/staged.ts, pickje repo; synthetic, every word by "test"). */
const SCRATCH: ScratchPage[] = [
  { working: 'Molecule B…', title: 'Molecule B is the acid', on: 'question 2: molecule B, C₄H₈O₂, with a broad IR band around 3000',
    done: 'named molecule B: butanoic acid, not the ester', context: 'the broad O–H band from 2500 to 3300 cm⁻¹ rules out the ester, and the 12 ppm singlet is the COOH',
    sources: [
      { kind: 'screen', label: 'worksheet 7, question 2', detail: 'its IR and NMR spectra' },
      { kind: 'words', label: 'what you said', detail: '“molecule B has the broad thing at 3000 and a peak at 1710, ester or acid”' },
      { kind: 'rule', label: 'your rule', detail: 'degrees of unsaturation first, before the NMR' },
      { kind: 'note', label: 'note: resonance in the carboxylate', detail: 'you said: “only the one that matters”' }],
    sketches: [{ kind: 'ir', label: 'broad O–H, sharp C=O' }, { kind: 'acid', label: 'butanoic acid' }],
    next: 'question 3: the Fischer esterification mechanism for butanoic acid with ethanol' },
  { working: 'Molecule A…', title: 'Molecule A is 3-pentanone', on: 'question 1: molecule A, C₅H₁₀O, its NMR',
    done: 'solved molecule A: 3-pentanone', context: 'only two NMR signals because it’s symmetric, an ethyl on each side of the C=O',
    sources: [
      { kind: 'screen', label: 'worksheet 7, question 1', detail: 'the quartet at 2.4 and the triplet at 1.0' },
      { kind: 'words', label: 'what you said', detail: '“the quartet at 2.4 and triplet at 1.0 thats an ethyl right”' },
      { kind: 'note', label: 'note: splitting, the n+1 rule', detail: 'you said: “ok the n+1 thing finally clicked”' }],
    sketches: [{ kind: 'split', label: 'n + 1' }, { kind: 'ketone', label: '3-pentanone' }],
    next: 'question 2: molecule B, C₄H₈O₂, with a broad IR band around 3000' },
]

/** Where things sit. The screen: the marks page (2880 × 1640) cropped at the bottom, where it's empty. */
const SCR = { x: 930, y: 176, w: 894 }
const IMG_H = Math.round(SCR.w / 2.02), SCR_H = IMG_H + 34
const PAD = { x: 1420, y: 236, w: 400, h: 760 }
const BIG = 500                                          // Blicky's drawn height when he's alone on the slide
const SIDE = { scale: 0.46, x: -690, y: -150 }           // and beside the screen (from step 1): smaller, at its left, pencil up to it

export function MeetBlicky() {
  const step = useStep()
  const screen = step >= 1, marks = step >= 2, pad = step >= 3
  // the pen starts when the slide arrives, out of sight, so by press 3 the page is well along (it writes a character every
  // 40 ms, about 25 s for the page); the pad rises in on press 3 and the sticker lands on it
  const [started, setStarted] = useState(PRINT)
  useEffect(() => { const t = window.setTimeout(() => setStarted(true), 300); return () => clearTimeout(t) }, [])
  const [stuck, setStuck] = useState(PRINT || step >= 3)
  useEffect(() => {
    if (!pad) { setStuck(false); return }
    const t = window.setTimeout(() => setStuck(true), PRINT ? 0 : 650)
    return () => clearTimeout(t)
  }, [pad])
  // once the page is written the pad goes back to its top; here it scrolls down to the diagrams instead (the title stays,
  // it's pinned), since the diagrams are the point of this slide. In print, the same still.
  const box = useRef<HTMLDivElement>(null)
  const toSketches = () => {
    const el = Array.from(box.current?.querySelectorAll<HTMLDivElement>('div') ?? []).find((d) => getComputedStyle(d).overflowY === 'auto')
    el?.scrollTo({ top: el.scrollHeight, behavior: PRINT ? 'auto' : 'smooth' })
  }
  useEffect(() => { if (PRINT) { const t = window.setTimeout(toSketches, 200); return () => clearTimeout(t) } }, [])

  return (
    <>
      {/* the words: his name, then one sentence per press */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }}
        style={{ position: 'absolute', left: M, top: TOP, font: '700 var(--deck-giant)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)', whiteSpace: 'nowrap' }}>{TITLE}</motion.div>
      <Lines lines={LINES} from={1} size="var(--t-head-2)" gap={22} style={{ position: 'absolute', left: M, top: 372, width: span(5) + 40 }} />

      {/* the screen (press 1), and his marks drawing across it (press 2) */}
      <motion.div initial={false} animate={screen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.97 }} transition={spring}
        style={{ position: 'absolute', left: SCR.x, top: SCR.y, width: SCR.w, height: SCR_H }}>
        <Win title="o-chem · ethanol + benzoyl chloride" w={SCR.w} h={SCR_H} style={{ left: 0, top: 0 }}>
          <div style={{ position: 'relative', height: IMG_H, overflow: 'hidden' }}>
            <img src={before} alt="" style={{ position: 'absolute', left: 0, top: 0, width: '100%', display: 'block' }} />
            <motion.img src={after} alt="Blicky's marks on the o-chem page: rings, curved arrows, the IHD panel and labels" initial={false}
              animate={{ clipPath: marks ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
              transition={PRINT || !marks ? { duration: 0.25 } : { duration: 1.8, ease: 'easeInOut', delay: 0.15 }}
              style={{ position: 'absolute', left: 0, top: 0, width: '100%', display: 'block' }} />
          </div>
        </Win>
      </motion.div>

      {/* Blicky, drawn: alone and large, then beside the screen with his pencil */}
      <motion.div initial={{ opacity: 0, y: 140, scale: 0.8, rotate: -6 }} transition={spring}
        animate={screen ? { opacity: 1, x: SIDE.x, y: SIDE.y, scale: SIDE.scale, rotate: 0 } : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        style={{ position: 'absolute', left: 1150, bottom: 70, transformOrigin: '50% 100%' }}>
        <Blicky pose={screen ? 'sketch' : 'wave'} height={BIG} />
      </motion.div>

      {/* his scratchpad, the final: metal bezel, grid sheet, sky felt binding, the border running glass while it writes */}
      <motion.div ref={box} initial={false} animate={pad ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 70, rotate: 2 }} transition={{ ...spring, delay: pad ? 0.15 : 0 }}
        style={{ position: 'absolute', left: PAD.x, top: PAD.y, pointerEvents: pad ? 'auto' : 'none' }}>
        <NotesPad who="blicky" pages={SCRATCH} page={0} writing={!PRINT} start={started} surface="bezel" sheet="grid" glint binding="felt"
          moss={{ ...MOSS_DEFAULT, on: false }} sticker={stuck ? true : 'hidden'} stagger={1} load={false} grass width={PAD.w} height={PAD.h}
          onWritten={() => requestAnimationFrame(toSketches)} />
      </motion.div>
    </>
  )
}
