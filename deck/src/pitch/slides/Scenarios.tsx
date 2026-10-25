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

/** 15 · The scenarios: the set-up for the live demo, then the routing.
    His words (2026-10-25, 4:38 AM, voice): "Let's say like, so we have a couple of other scenarios. We have the OKM
    worksheet thing, the thing in this, the thing there, three different things, design critiques. And then we'll do the
    live demo of how it interacts, creates diagrams, draws, and can do all these things."
    His run-through (2026-10-25, ~5:20 AM): "the first one we'll try is the OKM worksheet and then yeah so then we'll have
    the OKM worksheet the Cal Student Hub more basic stock page that we'll do live and then a design critique and then most
    importantly though, we should be able to visualize how we aren't creating more projects. The pickle just knows how to
    route to each one, and all you have to do is just, you know, reprime, what was it? Think what you want to do."
    ("OKM worksheet" = the o-chem worksheet, as heard.)

    Presses (7 steps):
      0  the title, the lede, Pickle and Blicky waiting
      1  the o-chem worksheet (question 22), Blicky's ring on the 4.94 integral
      2  the Cal Student Hub, Pickle's ring on Prof. Nguyen's message
      3  the stocks page, rings on the Jul 31 drop and the headline that explains it
      4  a design critique (the lab's landing page), rings on 3 planted problems
      5  the routing (his "most importantly"): "No new chats." The four screens line up on the right; one by one a dotted
         route runs from each into Pickle's notepad, its project tab lifts and lights, and what was said is written on the
         page with where it went. Four screens, one notepad, a tab each: no chat opens.
      6  "Now, live." The picture stays; Blicky joins Pickle.

    The notepad here is a clean drawn version of Pickle's (the real one is on Meet Pickle, slide 11): its sky glass tabs
    are drawn large, as clip/kit ProjectTabs draws them, so the tab names read from the back of the room.

    Screens: chemistry-nmr.jpg, cal-hub.jpg, stocks.jpg are ours (assets/screens/CREDITS.md). critique.png is a screenshot
    of the HeyClicky lab's E5 page (http://127.0.0.1:5340/e5-critique.html, "Lumen", a made-up company), taken 2026-10-25
    with the lab's drawer and chip hidden; it is a read-only prop with 5 planted problems (low-contrast headline, three
    competing buttons, misaligned cards, tiny text, stretched image).

    Words: the title, lede, every "does" line, the routing lines, the tab names and the asks marked DRAFT are ours; sources
    beside each. */

/** DRAFT title and lede (his: "a couple of other scenarios… then we'll do the live demo"). */
const TITLE = 'We’ll show it on 4 screens.'
const LEDE = 'A couple of scenarios first, then the live demo.'
/** DRAFT, from his "we aren't creating more projects. The pickle just knows how to route to each one, and all you have to
    do is just… think what you want to do" (the coordinator's wording). */
const ROUTE_TITLE = 'No new chats.'
const ROUTE_LINE = 'Pickle routes each one to its project; you just say what you want to do.'
const LIVE = 'Now, live.' // DRAFT

type Ring = { x: number; y: number; w: number; h: number } // the marked thing's box, fractions of the screen image
type Scenario = { name: string; tab: string; title: string; src: string; ask: string; does: string; ink: string; rings: Ring[] }

const SCENARIOS: Scenario[] = [
  {
    name: 'The o-chem worksheet', tab: 'o-chem',
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
    name: 'The Cal Student Hub', tab: 'Cal Hub',
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
    name: 'The stocks page', tab: 'stocks',
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
    name: 'A design critique', tab: 'critique',
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


const N = SCENARIOS.length
const ROUTE = N + 1 // the press that routes all four into Pickle's notepad
const LIVE_AT = N + 2 // "Now, live."
export const SCENARIOS_STEPS = N + 3

const BAR = 44
const TILE_TOP = 290
const spring = (delay = 0) => ({ type: 'spring', visualDuration: 0.55, bounce: 0.12, delay }) as const

/** The routing layout (slide px): the words on the left, Pickle's notepad in the middle with a tab per project on its
    right edge, the four screens in a column on the right, and a dotted route from each screen to its tab. */
const L = {
  textW: 460,
  pad: { x: 600, y: 170, w: 400, h: 808, strip: 56 },
  tab: { w: 66, h: 148, top: 262, gap: 16, peek: 30 },
  colW: 280,
}
const tabTop = (i: number) => L.tab.top + i * (L.tab.h + L.tab.gap)
const colX = 1920 - M - L.colW
const tileH = (tile: number) => (BAR + tile * 0.625) * (L.colW / tile)
const rowY = (i: number, tile: number) => L.pad.y + i * (tileH(tile) + (L.pad.h - N * tileH(tile)) / (N - 1))
/** When screen i's route starts drawing, and when it lands, after the routing press. */
const routeAt = (i: number) => 0.6 + i * 0.5
const landAt = (i: number) => routeAt(i) + 0.5

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

/** A screen in a clean window: a title bar (dots and its name) and the real screen under it. Big on its own press, then
    small in the right-hand column for the routing. */
function Tile({ s, i, step, w, ringDelay }: { s: Scenario; i: number; step: number; w: number; ringDelay: number }) {
  const h = w * 0.625
  const at = i + 1, col = step >= ROUTE
  const state = col ? { opacity: 1, x: colX - M, y: rowY(i, w) - TILE_TOP, scale: L.colW / w }
    : step === at ? { opacity: 1, x: 0, y: 0, scale: 1 }
    : step < at ? { opacity: 0, x: 0, y: 70, scale: 0.97 }
    : { opacity: 0, x: -90, y: 0, scale: 0.97 }
  const marks = step === at || col
  return (
    <motion.div initial={false} animate={state} transition={spring(col && step === ROUTE ? i * 0.07 : 0)}
      style={{ position: 'absolute', left: M, top: TILE_TOP, width: w, height: BAR + h, transformOrigin: '0 0', borderRadius: 16, overflow: 'hidden',
        background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)' }}>
      <div style={{ height: BAR, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: 'var(--silver-100)', borderBottom: '1px solid var(--silver-200)' }}>
        {['var(--ember-400)', 'var(--pollen-300)', 'var(--moss-400)'].map((c) => <i key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c }} />)}
        <span style={{ marginLeft: 10, font: '500 20px var(--font-head)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{s.title}</span>
      </div>
      <img src={s.src} alt="" style={{ display: 'block', width: w, height: h, objectFit: 'cover', objectPosition: 'top left' }} />
      {s.rings.map((r, k) => <Mark key={k} r={r} w={w} h={h} color={s.ink} on={marks} delay={col ? 0 : ringDelay + k * 0.45} />)}
    </motion.div>
  )
}

/** What she asks and what pickje does, beside the screen. */
function Caption({ s, i, step, left }: { s: Scenario; i: number; step: number; left: number }) {
  const on = step === i + 1
  const part = (delay: number, style?: CSSProperties) => ({
    initial: false as const, animate: { opacity: on ? 1 : 0, y: on ? 0 : 22 }, transition: on ? spring(delay) : { duration: 0.18 }, style,
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

/** A dotted route from screen i to its tab, drawn from the screen's side (a mask draws it so the dots stay dots). */
function Route({ i, on, tile }: { i: number; on: boolean; tile: number }) {
  const x1 = colX - 14, y1 = rowY(i, tile) + tileH(tile) / 2
  const x2 = L.pad.x + L.pad.w + L.tab.peek + 40, y2 = tabTop(i) + L.tab.h / 2
  const dx = x1 - x2
  const d = `M${x1} ${y1} C${x1 - dx * 0.5} ${y1} ${x2 + dx * 0.5} ${y2} ${x2} ${y2}`
  const id = `scn-route-${i}`
  // the mask's round cap leaves a dot at length 0, so it also fades in as it starts drawing
  const t = on ? { pathLength: { duration: 0.5, delay: routeAt(i), ease: [0.65, 0, 0.35, 1] as const }, opacity: { duration: 0.01, delay: routeAt(i) } } : { duration: 0.15 }
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
      <mask id={id} maskUnits="userSpaceOnUse" x={0} y={0} width={1920} height={1080}>
        <motion.path d={d} fill="none" stroke="#fff" strokeWidth={16} strokeLinecap="round" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={t} />
      </mask>
      <path d={d} fill="none" stroke="var(--pickle-ink)" strokeWidth={5} strokeLinecap="round" strokeDasharray="0 13" mask={`url(#${id})`} />
      <motion.circle cx={x2} cy={y2} r={7} fill="var(--pickle-ink)" initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0 }}
        transition={on ? spring(landAt(i) - 0.05) : { duration: 0.15 }} style={{ transformOrigin: `${x2}px ${y2}px` }} />
    </svg>
  )
}

/** Pickle's notepad, drawn clean: a paper sheet under a felt strip, a sky glass tab per project on its right edge (each
    lifts and lights when a screen is routed to it), and on the page what was said, with where it went. */
function Notepad({ step }: { step: number }) {
  const shown = step >= ROUTE, fresh = step === ROUTE
  const { x, y, w, h, strip } = L.pad
  return (
    <motion.div initial={false} animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 60 }} transition={shown ? spring(0.1) : { duration: 0.2 }}
      style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, pointerEvents: 'none' }}>
      {SCENARIOS.map((s, i) => {
        const lit = shown
        return (
          <motion.div key={s.tab} initial={false} animate={{ x: lit ? L.tab.peek + 10 : L.tab.peek - L.tab.w + 14 }}
            transition={lit ? spring(fresh ? landAt(i) : 0) : { duration: 0.2 }}
            style={{ position: 'absolute', left: x + w - L.tab.peek, top: tabTop(i), width: L.tab.w, height: L.tab.h, borderRadius: '0 16px 16px 0',
              background: 'linear-gradient(180deg, var(--sky-100), var(--sky-200) 70%)',
              boxShadow: 'inset 0 1px 0 oklch(1 0 0 / .95), inset 0 0 0 1px oklch(83% 0.088 246 / .7), 0 2px 0 oklch(73% 0.13 250 / .55)' }}>
            <span style={{ position: 'absolute', left: '58%', top: '54%', transform: 'translate(-50%, -50%) rotate(90deg)', whiteSpace: 'nowrap', font: '600 22px var(--font-head)', color: 'var(--sky-700)' }}>{s.tab}</span>
            <motion.i initial={false} animate={{ opacity: lit ? 1 : 0, scale: lit ? 1 : 0.4 }} transition={lit ? spring(fresh ? landAt(i) + 0.1 : 0) : { duration: 0.15 }}
              style={{ position: 'absolute', left: 30, top: 12, width: 14, height: 14, borderRadius: 99, background: 'var(--checked)' }} />
          </motion.div>
        )
      })}
      <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 22, overflow: 'hidden', background: 'var(--surface-page)',
        boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)' }}>
        <div style={{ height: strip, background: 'var(--surface-felt)' }} />
      </div>
      {SCENARIOS.map((s, i) => (
        <motion.div key={s.tab} initial={false} animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 14 }} transition={shown ? spring(fresh ? landAt(i) + 0.05 : 0) : { duration: 0.15 }}
          style={{ position: 'absolute', left: x + 32, top: tabTop(i) + 22, width: w - 64 }}>
          <div style={{ font: '400 22px/1.3 var(--font-dot)', color: 'var(--ink)' }}>“{s.ask}”</div>
          <div style={{ marginTop: 10, font: '600 20px var(--font-head)', color: 'var(--pickle-ink)' }}>→ {s.tab}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function Scenarios() {
  const step = useStep()
  const d = useDialKit('Scenarios', { tile: [1040, 820, 1120, 10], ringDelay: [0.35, 0, 1.5, 0.05], castSize: [250, 160, 360, 5] })
  const colLeft = M + d.tile + 56
  const routing = step >= ROUTE
  const show = (on: boolean, delay = 0) => ({ initial: false as const, animate: { opacity: on ? 1 : 0, y: on ? 0 : 24 }, transition: on ? spring(delay) : { duration: 0.2 } })
  // The cast: large and waiting on the title press, small beside the captions, then Pickle alone under the routing words
  // (he's the one routing), and Blicky back beside him for "Now, live."
  const castH = d.castSize
  const cast = step === 0 ? { x: 1180, scale: 1.5 } : routing ? { x: M + 10, scale: 1.1 } : { x: colLeft, scale: 0.62 }
  const head = { position: 'absolute', left: M, top: 170, margin: 0, color: 'var(--ink)' } as const

  return (
    <>
      <motion.h1 {...show(step < ROUTE)} style={{ ...head, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)', whiteSpace: 'nowrap' }}>{TITLE}</motion.h1>
      <motion.p {...show(step === 0)} style={{ position: 'absolute', left: M, top: 252, margin: 0, font: 'var(--t-head-3)', letterSpacing: 'var(--t-head-3-track)', color: 'var(--text-secondary)' }}>{LEDE}</motion.p>

      <motion.h1 {...show(step === ROUTE)} style={{ ...head, width: L.textW, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>{ROUTE_TITLE}</motion.h1>
      <motion.p {...show(step === ROUTE, 0.1)} style={{ position: 'absolute', left: M, top: 262, width: L.textW, margin: 0, font: 'var(--t-head-2)', letterSpacing: 'var(--t-head-2-track)', color: 'var(--text-secondary)' }}>{ROUTE_LINE}</motion.p>
      <motion.div {...show(step === LIVE_AT)} style={{ ...head, width: L.textW, font: '700 var(--deck-hero)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>{LIVE}</motion.div>

      <Notepad step={step} />
      {SCENARIOS.map((_, i) => <Route key={i} i={i} on={routing} tile={d.tile} />)}
      {SCENARIOS.map((s, i) => <Tile key={s.name} s={s} i={i} step={step} w={d.tile} ringDelay={d.ringDelay} />)}
      {SCENARIOS.map((s, i) => <Caption key={s.name} s={s} i={i} step={step} left={colLeft} />)}

      <motion.div initial={false} animate={cast} transition={{ type: 'spring', visualDuration: 0.6, bounce: 0.14 }}
        style={{ position: 'absolute', left: 0, top: 984 - castH, height: castH, display: 'flex', alignItems: 'flex-end', gap: 18, transformOrigin: '0 100%' }}>
        <Pickle pose={step === 0 ? 'wave' : step === LIVE_AT ? 'cheer' : 'point'} height={castH} />
        <motion.div initial={false} animate={{ opacity: step === ROUTE ? 0 : 1, scale: step === ROUTE ? 0.8 : 1 }} transition={spring()} style={{ transformOrigin: '50% 100%' }}>
          <Blicky pose={step === 0 ? 'wave' : step === LIVE_AT ? 'cheer' : 'sketch'} height={castH * 0.7} />
        </motion.div>
      </motion.div>
    </>
  )
}
