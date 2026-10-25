import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Words } from '../clip/kit'
import chemistryNmr from '../assets/screens/chemistry-nmr.jpg'
import calHub from '../assets/screens/cal-hub.jpg'
import stocks from '../assets/screens/stocks.jpg'
import critique from '../assets/scenarios/critique.png'

/** 14 · The scenarios: the set-up for the live demo.
    His words (2026-10-25, 4:38 AM, voice): "Let's say like, so we have a couple of other scenarios. We have the OKM
    worksheet thing, the thing in this, the thing there, three different things, design critiques. And then we'll do the
    live demo of how it interacts, creates diagrams, draws, and can do all these things."
    ("OKM worksheet" = the o-chem worksheet, as heard.)

    Presses (6 steps):
      0  the title, the lede, Pickle and Blicky waiting
      1  the o-chem worksheet (question 22), Blicky's ring on the 4.94 integral
      2  the Cal Student Hub, Pickle's ring on Prof. Nguyen's message
      3  the stocks page, rings on the Jul 31 drop and the headline that explains it
      4  a design critique (the lab's landing page), rings on 3 planted problems
      5  all four small in a row, then "Now, live."

    Screens: chemistry-nmr.jpg, cal-hub.jpg, stocks.jpg are ours (assets/screens/CREDITS.md). critique.png is a screenshot
    of the HeyClicky lab's E5 page (http://127.0.0.1:5340/e5-critique.html, "Lumen", a made-up company), taken 2026-10-25
    with the lab's drawer and chip hidden; it is a read-only prop with 5 planted problems (low-contrast headline, three
    competing buttons, misaligned cards, tiny text, stretched image).

    Words: the title, lede, every "does" line and the asks marked DRAFT are ours; sources beside each. */

/** DRAFT title and lede (his: "a couple of other scenarios… then we'll do the live demo"). */
const TITLE = 'We’ll show it on 4 screens.'
const LEDE = 'A couple of scenarios first, then the live demo.'
const LIVE = 'Now, live.' // DRAFT

type Ring = { x: number; y: number; w: number; h: number } // the marked thing's box, fractions of the screen image
type Scenario = { name: string; title: string; src: string; ask: string; does: string; ink: string; rings: Ring[] }

const SCENARIOS: Scenario[] = [
  {
    name: 'The o-chem worksheet',
    title: 'chem-worksheet.pdf · question 22',
    src: chemistryNmr,
    ask: 'Where do I even start on 22?', // DRAFT
    // docs/PRODUCT.md "What it is": Blicky "draws on your actual document (rings, curved arrows, labels, a worked panel, a
    // molecule drawn live from SMILES), and talks you through one step at a time… Its rule is to hold back a result you
    // haven't reached until you ask for it." Wording DRAFT.
    does: 'Blicky teaches it step by step and draws the structures, but never gives the answer away.',
    ink: 'var(--blicky-ink)',
    rings: [{ x: 0.2, y: 0.25, w: 0.088, h: 0.125 }], // the aromatic multiplet and its 4.94 integral (the question's own first step)
  },
  {
    name: 'The Cal Student Hub',
    title: 'Cal Student Hub · Dashboard',
    src: calHub,
    ask: 'Pickle, I’m overwhelmed.', // pickje demo/chaos/spec.txt §1, verbatim
    // demo/chaos/spec.txt §1: "watch Pickle point at important items → hear Blicky explain why → receive a concise side
    // note → click the first step and start"; §1.1: Pickle draws green circles; §2.2 P1: read Prof. Nguyen's message first.
    does: 'Pickle points at what’s due first, and gives her one next step.', // DRAFT wording
    ink: 'var(--pickle-ink)',
    rings: [{ x: 0.443, y: 0.236, w: 0.245, h: 0.05 }], // Inbox row 1: "Assignment submission link updated" (spec P1)
  },
  {
    name: 'The stocks page',
    title: 'Markets · LRKS',
    src: stocks,
    // pickje demo/stocks/index.html header: "What a student could ask about: the 18% drop the day after earnings (Jul 31,
    // with the volume spike and a headline that explains it)". The company and data are invented (CREDITS.md).
    ask: 'Why did it drop 18% the day after earnings?', // DRAFT, from that header
    does: 'Blicky circles the drop, then the headline that explains it.', // DRAFT; the headline (Jul 31, a cut 2026 forecast) is on the page
    ink: 'var(--blicky-ink)',
    rings: [
      { x: 0.343, y: 0.37, w: 0.025, h: 0.21 }, // the Jul 31 cliff
      { x: 0.735, y: 0.74, w: 0.225, h: 0.07 }, // "Larkspan sinks 18% after cutting its 2026 sales forecast"
    ],
  },
  {
    name: 'A design critique',
    title: 'lumen.app · landing page',
    src: critique,
    ask: 'What’s wrong with this layout?', // the lab's E5 "terse" line, verbatim
    // The lab's E5 "rambling" line: "Mark the three worst problems right on the page and tell me how you'd fix each one."
    does: 'Blicky marks the worst problems right on the page, and says how to fix each.', // DRAFT
    ink: 'var(--blicky-ink)',
    rings: [
      { x: 0.016, y: 0.104, w: 0.565, h: 0.124 }, // the low-contrast headline
      { x: 0.017, y: 0.298, w: 0.244, h: 0.044 }, // three competing buttons
      { x: 0.017, y: 0.541, w: 0.89, h: 0.129 }, // misaligned cards
    ],
  },
]

export const SCENARIOS_STEPS = SCENARIOS.length + 2

const BAR = 44
const TILE_TOP = 290
const ROW_GAP = 32
const ALL = SCENARIOS.length + 1 // the step that shows them all

/** A ring Blicky (or Pickle) draws round what she means: a hand-drawn loop round the thing's box (padded), its end
    running past its start, drawn in when its screen arrives. Tile image px. */
const PAD = 14
function Mark({ r, w, h, color, on, delay }: { r: Ring; w: number; h: number; color: string; on: boolean; delay: number }) {
  const W = r.w * w + 2 * PAD, H = r.h * h + 2 * PAD, c = 0.86
  const d = `M${W / 2} -2 C${W / 2 + c * W / 2} -2 ${W + 4} ${H / 2 - c * H / 2} ${W + 4} ${H / 2}`
    + ` C${W + 4} ${H / 2 + c * H / 2} ${W / 2 + c * W / 2} ${H + 3} ${W / 2} ${H + 3}`
    + ` C${W / 2 - c * W / 2} ${H + 3} -3 ${H / 2 + c * H / 2} -3 ${H / 2}`
    + ` C-3 ${H / 2 - c * H / 2} ${W / 2 - c * W / 2} 3 ${W * 0.62} 5`
  return (
    <svg style={{ position: 'absolute', left: r.x * w - PAD, top: BAR + r.y * h - PAD, overflow: 'visible', pointerEvents: 'none' }} width={W} height={H}>
      <motion.path d={d} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={on ? { pathLength: { duration: 0.6, delay, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.01, delay } } : { duration: 0.15 }} />
    </svg>
  )
}

/** A screen in a clean window: a title bar (dots and its name) and the real screen under it. */
function Tile({ s, i, step, w, rowW, ringDelay }: { s: Scenario; i: number; step: number; w: number; rowW: number; ringDelay: number }) {
  const h = w * 0.625
  const at = i + 1, row = step === ALL
  const scale = rowW / w
  const state = row ? { opacity: 1, x: i * (rowW + ROW_GAP), y: 40, scale }
    : step === at ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : step < at ? { opacity: 0, x: 0, y: 70, scale: 0.97 }
    : { opacity: 0, x: -90, y: 0, scale: 0.97 }
  const spring = { type: 'spring', visualDuration: 0.55, bounce: 0.12, delay: row ? i * 0.07 : 0 } as const
  const marks = step === at || row
  return (
    <motion.div initial={false} animate={state} transition={spring}
      style={{ position: 'absolute', left: M, top: TILE_TOP, width: w, height: BAR + h, transformOrigin: '0 0', borderRadius: 16, overflow: 'hidden',
        background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)' }}>
      <div style={{ height: BAR, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: 'var(--silver-100)', borderBottom: '1px solid var(--silver-200)' }}>
        {['var(--ember-400)', 'var(--pollen-300)', 'var(--moss-400)'].map((c) => <i key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c }} />)}
        <span style={{ marginLeft: 10, font: '500 20px var(--font-head)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{s.title}</span>
      </div>
      <img src={s.src} alt="" style={{ display: 'block', width: w, height: h, objectFit: 'cover', objectPosition: 'top left' }} />
      {s.rings.map((r, k) => <Mark key={k} r={r} w={w} h={h} color={s.ink} on={marks} delay={row ? 0 : ringDelay + k * 0.45} />)}
    </motion.div>
  )
}

/** What she asks and what pickje does, beside the screen. */
function Caption({ s, i, step, left }: { s: Scenario; i: number; step: number; left: number }) {
  const on = step === i + 1
  const t = (delay: number) => on ? { type: 'spring', visualDuration: 0.5, bounce: 0.12, delay } as const : { duration: 0.18 }
  const part = (delay: number, style?: CSSProperties) => ({
    initial: false as const, animate: { opacity: on ? 1 : 0, y: on ? 0 : 22 }, transition: t(delay), style,
  })
  return (
    <div style={{ position: 'absolute', left, right: M, top: TILE_TOP + 6, pointerEvents: on ? 'auto' : 'none' }}>
      <motion.div {...part(0.05, { font: 'var(--t-head-2)', fontWeight: 700, letterSpacing: 'var(--t-head-2-track)', color: 'var(--ink)' })}>
        <span style={{ color: 'var(--text-muted)', marginRight: 14, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>{s.name}
      </motion.div>
      <motion.div {...part(0.15, { marginTop: 34 })}>
        <Words style={{ position: 'relative', display: 'inline-block' }}>“{s.ask}”</Words>
      </motion.div>
      <motion.p {...part(0.5, { margin: '30px 0 0', font: 'var(--t-head-2)', fontWeight: 500, letterSpacing: 'var(--t-head-2-track)', color: 'var(--text-secondary)' })}>{s.does}</motion.p>
    </div>
  )
}

export function Scenarios() {
  const step = useStep()
  const d = useDialKit('Scenarios', { tile: [1040, 820, 1120, 10], ringDelay: [0.35, 0, 1.5, 0.05], castSize: [250, 160, 360, 5] })
  const rowW = (1920 - 2 * M - 3 * ROW_GAP) / 4
  const colLeft = M + d.tile + 56
  const row = step === ALL
  const show = (on: boolean, delay = 0) => ({ initial: false as const, animate: { opacity: on ? 1 : 0, y: on ? 0 : 24 }, transition: on ? { type: 'spring', visualDuration: 0.5, bounce: 0.12, delay } as const : { duration: 0.2 } })
  // The cast: large and waiting on the title press, small beside the captions, then by "Now, live."
  const castH = d.castSize
  const cast = step === 0 ? { x: 1180, scale: 1.5 } : row ? { x: 1440, scale: 1 } : { x: colLeft, scale: 0.62 }
  const rowLabelTop = TILE_TOP + 40 + rowW * 0.625 + BAR * (rowW / d.tile) + 22

  return (
    <>
      <h1 style={{ position: 'absolute', left: M, top: 170, margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)' }}>{TITLE}</h1>
      <motion.p {...show(step === 0)} style={{ position: 'absolute', left: M, top: 252, margin: 0, font: 'var(--t-head-3)', letterSpacing: 'var(--t-head-3-track)', color: 'var(--text-secondary)' }}>{LEDE}</motion.p>

      {SCENARIOS.map((s, i) => <Tile key={s.name} s={s} i={i} step={step} w={d.tile} rowW={rowW} ringDelay={d.ringDelay} />)}
      {SCENARIOS.map((s, i) => <Caption key={s.name} s={s} i={i} step={step} left={colLeft} />)}

      {SCENARIOS.map((s, i) => (
        <motion.div key={s.name} {...show(row, 0.25 + i * 0.07)}
          style={{ position: 'absolute', left: M + i * (rowW + ROW_GAP), top: rowLabelTop, width: rowW, font: 'var(--t-head-3)', fontWeight: 600, color: 'var(--ink)' }}>{s.name}</motion.div>
      ))}
      <motion.div {...show(row, 0.55)}
        style={{ position: 'absolute', left: M, top: 760, font: '700 var(--deck-giant)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)', color: 'var(--ink)' }}>{LIVE}</motion.div>

      <motion.div initial={false} animate={cast} transition={{ type: 'spring', visualDuration: 0.6, bounce: 0.14 }}
        style={{ position: 'absolute', left: 0, top: 984 - castH, height: castH, display: 'flex', alignItems: 'flex-end', gap: 18, transformOrigin: '0 100%' }}>
        <Pickle pose={step === 0 ? 'wave' : row ? 'cheer' : 'point'} height={castH} />
        <Blicky pose={step === 0 ? 'wave' : row ? 'cheer' : 'sketch'} height={castH * 0.7} />
      </motion.div>
    </>
  )
}
