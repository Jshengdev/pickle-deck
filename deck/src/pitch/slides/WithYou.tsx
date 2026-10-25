import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Words } from '../clip/kit'
import chemistry from '../assets/screens/chemistry.jpg'
import calHub from '../assets/screens/cal-hub.jpg'

/** 13 · Built to do it with you: the decisions behind it. 6 steps. After Meet Pickle and Meet Blicky; the big headline
    is its own slide before "Introducing pickje" (WithYouHeadline.tsx).
    His run-through (2026-10-25, 5:46 AM, voice, verbatim): "So instead of a tool that does more, we built one that does it
    with you. So it works where your work is. Nothing opens in a new chat window, no screenshot, no pasting. It's all on
    your screen. Two friends, two jobs. We have two cute little buddies, each with its own dedicated task and way to work.
    One of them tracks everything for you, and the other one. shows everything for you. And then it asks before it acts.
    It keeps you in the driver's seat for most decisions, and it helps when you're switching projects and going. … It
    works where your work is, your two friends … two job. Asks before it acts, one step at a time. And then another key
    one is it manages the context for you, so it knows when to route and do self-learning and things of that sort. So
    like use a bit of the VC buzzwords that they love to swallow up." His earlier note (~5:20 AM): talk about "the UX
    decisions behind why this must exist and what mental model it possesses", not the skills.

    The title, his words: "instead of a tool that does more for you, we build one that does it with you" ("built").
    0  the title and the five decisions as a list (the names are his lines; the list itself is ours). Pickle and Blicky.
    1–5  one decision per press: the decision and its why (left), its picture (right), the five along the bottom.
      1  "It works where your work is." Why, his words lightly cleaned: "Nothing opens in a new chat window: no
         screenshots, no pasting. It's all on your screen." Also PRODUCT.md "What it is": "Nothing opens in a chat window",
         and pickje docs/spec/0012: "should not need to screenshot the portal, paste it into a chat window". Picture: the
         Cal Student Hub with the spec's line "Pickle, I'm overwhelmed" (verbatim), Blicky's ring on the inbox row the
         spec says to read first (P1), and its one next step (card wording DRAFT).
      2  "Two friends, two jobs." Why, his words lightly cleaned: "One tracks everything for you; the other shows
         everything for you." His quote under it, pickje docs/context/his-words.md:88 (spelling fixed): "It should feel
         like I have a friend screensharing my problems." Card lines from PRODUCT.md ("knows which of your projects this
         is and keeps each project's memory"; Blicky "draws on your actual document… and talks you through"), wording
         DRAFT. The three project names are Mia's scenario (DRAFT).
      3  "It asks before it acts." Why, his words lightly cleaned: "You stay in the driver's seat, especially when you
         switch projects." Grounded in pickje docs/spec/0014 ("a small popup wiht like a check or a no"; it asks on any
         project switch or new project, before a close-out toward the north star, and for Droid's offer, kind "droid");
         Droid works only after a yes (PRODUCT.md, Factory). Pickle's question in the popup is DRAFT.
      4  "One step at a time." (his words). Why (DRAFT): pickje docs/spec/0006, his click 10-24: "Step by step,
         everywhere" (Blicky never names a result he hasn't asked for); app/shell/README.md: "The voice waits for its
         mark" (his click, 10-24), so the bubble comes only after the ring and arrow land. Blicky's line is DRAFT (the
         first step of the mechanism; the product is never drawn).
      5  "It manages your context for you." (his words, "it manages the context for you"). Why (DRAFT, his ask for VC
         words, kept true): pickje app/memory/README.md: "Every sentence you say is routed to its project by Moss in a few
         milliseconds… All of that runs on this Mac"; "the route takes 6–7 ms instead of about 1.3 s", but only when Moss
         decides on its own (8 of 16 turns in the projects check, 16/16 routed right either way); otherwise Claude
         routes. PRODUCT.md: Pickje "keeps each project's memory", and Claude Haiku runs "rewriting its memory". So:
         "updates its own memory as you work", NOT "self-learning" (the Learn verb is out for the demo, pickje
         docs/VERBS.md). The caveat is on the slide. The spoken sentence in the picture is the memory README's own example
         ("now circle the carbonyl carbon on it"); "routed by moss · 7 ms" is the card's real text (same README);
         "pickle is writing…" is the card's real status (PRODUCT.md). The project names are Mia's scenario (DRAFT). */
export const WITH_YOU_STEPS = 6

const HEAD_A = 'Instead of a tool that does more for you,'
const HEAD_B = 'we built one that '
const HEAD_C = 'does it with you.'

/** The five decisions (sources above). `tab` is the short name in the row along the bottom (DRAFT). */
const DECISIONS = [
  { tab: 'On screen', title: 'It works where your work is.', why: 'Nothing opens in a new chat window: no screenshots, no pasting. It’s all on your screen.' },
  { tab: 'Two friends', title: 'Two friends, two jobs.', why: 'One tracks everything for you; the other shows everything for you.' },
  { tab: 'Asks first', title: 'It asks before it acts.', why: 'You stay in the driver’s seat, especially when you switch projects.' },
  { tab: 'One step', title: 'One step at a time.', why: 'It teaches the next step and holds back the answer until you ask. Its voice waits for each mark to land.' },
  { tab: 'Context', title: 'It manages your context for you.', why: 'On-device routing puts each sentence in the right project in milliseconds. Every project keeps its own memory, and Pickle updates it as you work.' },
]
const FRIEND = '“It should feel like I have a friend screensharing my problems.”' // his-words.md:88, spelling fixed
/** The caveat on the 6–7 ms (app/memory/README.md). */
const ROUTE_NOTE = '6–7 ms when Moss decides on its own (8 of 16 turns in our projects check, all 16 routed right); otherwise Claude routes.'

type Mark = { kind: 'ring'; cx: number; cy: number; rx: number; ry: number } | { kind: 'arrow'; d: string; tip: [number, number]; from: [number, number] }
type Shot = { src: string; iw: number; ih: number; marks: Mark[] }
/** Positions are in the screen image's own pixels (the marks' SVG shares its viewBox). */
const HUB: Shot = { src: calHub, iw: 2880, ih: 1800, marks: [{ kind: 'ring', cx: 1634, cy: 474, rx: 380, ry: 72 }] }
const CHEM: Shot = {
  src: chemistry, iw: 1440, ih: 900,
  marks: [
    { kind: 'ring', cx: 425, cy: 322, rx: 48, ry: 38 },
    { kind: 'arrow', d: 'M452 284C470 180 560 150 618 204', from: [560, 150], tip: [618, 204] },
  ],
}

const spring = { type: 'spring', visualDuration: 0.5, bounce: 0.14 } as const
const shadow = '0 3px 0 oklch(0.3 0.01 230 / .14)'
/** object-fit: cover, anchored top left: the scale from image pixels to the box. */
const fit = (c: Shot, w: number, h: number) => Math.max(w / c.iw, h / c.ih)

/** A hand-drawn ring (two half-ellipses that overshoot where they meet) and a curved arrow with an open head. */
function ringPath({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return `M${cx + rx * 0.15} ${cy - ry * 1.04}C${cx + rx * 1.38} ${cy - ry} ${cx + rx * 1.34} ${cy + ry * 1.02} ${cx} ${cy + ry}` +
    `C${cx - rx * 1.33} ${cy + ry * 0.98} ${cx - rx * 1.3} ${cy - ry * 1.06} ${cx - rx * 0.1} ${cy - ry * 0.94}`
}
function headPath([fx, fy]: [number, number], [tx, ty]: [number, number], len: number) {
  const a = Math.atan2(ty - fy, tx - fx), w = 0.5
  const p = (s: number) => `${tx - len * Math.cos(a + s * w)} ${ty - len * Math.sin(a + s * w)}`
  return `M${p(1)}L${tx} ${ty}L${p(-1)}`
}

/** Blicky's marks on a screen, drawn in one after another. */
function Marks({ c, w, h, stroke, delay = 0 }: { c: Shot; w: number; h: number; stroke: number; delay?: number }) {
  const s = fit(c, w, h), sw = stroke / s
  const draw = (i: number, dur: number) => ({
    initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: dur, ease: 'easeInOut', delay: delay + i * 0.35 }, opacity: { duration: 0.01, delay: delay + i * 0.35 } },
  } as const)
  return (
    <svg viewBox={`0 0 ${c.iw} ${c.ih}`} preserveAspectRatio="xMinYMin slice" width={w} height={h} style={{ position: 'absolute', left: 0, top: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <g fill="none" stroke="var(--blicky-ink)" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        {c.marks.map((m, i) => m.kind === 'ring'
          ? <motion.path key={i} d={ringPath(m)} {...draw(i, 0.55)} />
          : <g key={i}><motion.path d={m.d} {...draw(i, 0.4)} /><motion.path d={headPath(m.from, m.tip, 16 / s)} {...draw(i + 0.9, 0.15)} /></g>)}
      </g>
    </svg>
  )
}

/** Her pointer, with Pickle riding beside it. */
function Cursor({ x, y, size = 30 }: { x: number; y: number; size?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y }}>
      <svg width={size} height={size * 1.5} viewBox="0 0 20 30" style={{ display: 'block', overflow: 'visible' }}>
        <path d="M1 1L1 23L6.5 17.6L10.4 27L14 25.4L10.2 16.4L18 16.4Z" fill="var(--ink)" stroke="var(--surface-page)" strokeWidth={1.6} strokeLinejoin="round" />
      </svg>
      <div style={{ position: 'absolute', left: size * 1.05, top: -size * 0.25 }}><Pickle height={84} /></div>
    </div>
  )
}

/** A window with a real screen inside: a title bar (dots and a title) over the image, and whatever's drawn on it. */
function Win({ title, src, w, h, children }: { title: string; src: string; w: number; h: number; children?: ReactNode }) {
  const bar = 44
  return (
    <div style={{ position: 'relative', width: w, height: h + bar, borderRadius: 18, overflow: 'hidden', background: 'var(--surface-page)', boxShadow: `inset 0 0 0 1px var(--line-hair), ${shadow}` }}>
      <div style={{ height: bar, display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', background: 'var(--silver-100)', borderBottom: '1px solid var(--silver-200)' }}>
        {['var(--ember-400)', 'var(--pollen-300)', 'var(--moss-400)'].map((c) => <i key={c} style={{ width: 13, height: 13, borderRadius: 99, background: c }} />)}
        <span style={{ marginLeft: 10, font: '500 20px var(--font-head)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{title}</span>
      </div>
      <div style={{ position: 'relative', width: w, height: h, overflow: 'hidden' }}>
        <img src={src} alt="" style={{ width: w, height: h, objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />
        {children}
      </div>
    </div>
  )
}

/** Things on a screen arrive in order: index i waits i beats. */
const pop = (beat: number, i: number, from: { x?: number; y?: number; scale?: number } = { y: 24 }) =>
  ({ initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1 }, transition: { ...spring, delay: i * beat } })

/** A card in the app's plain style. */
function Note({ label, ink, children, style }: { label: string; ink: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ boxSizing: 'border-box', padding: '16px 20px', borderRadius: 18, background: 'var(--surface-page)', boxShadow: `inset 0 0 0 2px var(--line-hair), ${shadow}`, ...style }}>
      <div style={{ font: '600 20px var(--font-head)', color: ink }}>{label}</div>
      <div style={{ font: '500 25px/1.3 var(--font-head)', color: 'var(--ink)', marginTop: 4 }}>{children}</div>
    </div>
  )
}

/** 1 · it works where your work is: the Cal Student Hub, as it is, with Pickle and Blicky on it. */
function OnYourScreen({ w, h, d }: { w: number; h: number; d: { ring: number; beat: number } }) {
  const s = fit(HUB, w, h), b = d.beat
  return (
    <Win title="Cal Student Hub" src={HUB.src} w={w} h={h}>
      <Marks c={HUB} w={w} h={h} stroke={d.ring} delay={4 * b} />
      <motion.div {...pop(b, 1, { x: 40, y: 30 })} style={{ position: 'absolute', left: 0, top: 0 }}><Cursor x={1100 * s} y={205 * s} /></motion.div>
      <motion.div {...pop(b, 2, { y: 14 })} style={{ position: 'absolute', left: 1100 * s + 128, top: 205 * s - 6 }}><Words style={{ position: 'relative', whiteSpace: 'nowrap' }}>Pickle, I’m overwhelmed</Words></motion.div>
      <motion.div {...pop(b, 3, { y: 60, scale: 0.8 })} style={{ position: 'absolute', left: 2075 * s, top: 470 * s }}><Blicky pose="sketch" height={120} /></motion.div>
      <motion.div {...pop(b, 7, { y: 30, scale: 0.94 })} style={{ position: 'absolute', left: 2050 * s, top: 850 * s, width: 290 }}>
        <Note label="Now" ink="var(--pickle-ink)">Read Prof. Nguyen’s new PS4 link.</Note>{/* DRAFT wording of spec P1 */}
      </motion.div>
    </Win>
  )
}

/** 2 · two friends, two jobs: Pickle with your projects behind him, Blicky with his pencil and a ring. */
function TwoFriends({ w, h, d }: { w: number; h: number; d: { beat: number } }) {
  const b = d.beat, col = (w - 48) / 2
  const projects = ['CHEM 120 · worksheet', 'Club bracket · CAD', 'LRKS · why it dropped'] // DRAFT, Mia's scenario
  return (
    <div style={{ position: 'relative', width: w, height: h + 44, display: 'flex', gap: 48 }}>
      {/* Pickle: the context brain, backstage */}
      <div style={{ width: col, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'relative', height: 400 }}>
          {projects.map((p, i) => (
            <motion.div key={p} {...pop(b, 2 + i, { x: -30, y: 10 })} style={{ position: 'absolute', left: 236, top: 40 + i * 92, width: col - 236 }}>
              <div style={{ padding: '14px 18px', borderRadius: 14, background: 'var(--surface-page)', boxShadow: `inset 0 0 0 2px ${i === 0 ? 'var(--moss-300)' : 'var(--line-hair)'}, ${shadow}`, font: `${i === 0 ? 600 : 500} 22px var(--font-head)`, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p}</div>
            </motion.div>
          ))}
          <motion.div {...pop(b, 0, { y: 80, scale: 0.85 })} style={{ position: 'absolute', left: 30, bottom: 0 }}><Pickle pose="point" height={300} /></motion.div>
        </div>
        <motion.div {...pop(b, 5)} style={{ marginTop: 28 }}>
          <div style={{ font: '700 40px/1.1 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--pickle-ink)' }}>Pickle tracks everything</div>
          <div style={{ font: '400 25px/1.4 var(--font-head)', color: 'var(--ink)', marginTop: 8 }}>Which project this is, what you asked, where you stopped.</div>
        </motion.div>
      </div>
      {/* Blicky: the one you see */}
      <div style={{ width: col, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <div style={{ position: 'relative', height: 400 }}>
          <svg width={col} height={400} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <g fill="none" stroke="var(--blicky-ink)" strokeWidth={6} strokeLinecap="round">
              <motion.path d={ringPath({ cx: col - 120, cy: 110, rx: 90, ry: 56 })} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ pathLength: { duration: 0.55, delay: 3 * b }, opacity: { duration: 0.01, delay: 3 * b } }} />
            </g>
          </svg>
          <motion.div {...pop(b, 1, { y: 80, scale: 0.85 })} style={{ position: 'absolute', left: 20, bottom: 0 }}><Blicky pose="sketch" height={300} /></motion.div>
        </div>
        <motion.div {...pop(b, 6)} style={{ marginTop: 28 }}>
          <div style={{ font: '700 40px/1.1 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--blicky-ink)' }}>Blicky shows everything</div>
          <div style={{ font: '400 25px/1.4 var(--font-head)', color: 'var(--ink)', marginTop: 8 }}>He draws on your own screen and talks you through it.</div>
        </motion.div>
      </div>
    </div>
  )
}

const Check = ({ size = 30, color = 'currentColor' }: { size?: number; color?: string }) =>
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M4 12.5L9.5 18L20 6.5" fill="none" stroke={color} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
const Cross = ({ size = 30, color = 'currentColor' }: { size?: number; color?: string }) =>
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M6 6L18 18M18 6L6 18" fill="none" stroke={color} strokeWidth={3.4} strokeLinecap="round" /></svg>

/** 3 · it asks before it acts: Pickle's check-or-no popup, and the three times it asks. */
function AsksFirst({ w, h, d }: { w: number; h: number; d: { beat: number } }) {
  const b = d.beat
  const when = ['Before it switches projects', 'Before it closes out a goal', 'Before Droid starts any work'] // spec 0014's three kinds
  return (
    <div style={{ position: 'relative', width: w, height: h + 44 }}>
      <motion.div {...pop(b, 0, { y: 50, scale: 0.92 })} style={{ position: 'absolute', left: 150, top: 70, width: 760, padding: '34px 40px 36px', boxSizing: 'border-box', borderRadius: 28, background: 'var(--surface-page)', boxShadow: `inset 0 0 0 2px var(--moss-300), ${shadow}` }}>
        <div style={{ font: '600 22px var(--font-head)', color: 'var(--pickle-ink)' }}>Pickle</div>
        <div style={{ font: '500 40px/1.25 var(--font-head)', letterSpacing: '-0.015em', color: 'var(--ink)', marginTop: 8 }}>This sounds like your club video. Switch to that project?</div>{/* DRAFT */}
        <div style={{ display: 'flex', gap: 18, marginTop: 30 }}>
          <motion.div initial={{ scale: 1 }} animate={{ scale: [1, 0.92, 1] }} transition={{ duration: 0.35, delay: 6 * b + 0.3 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 30px', borderRadius: 99, background: 'var(--moss-300)', font: '600 26px var(--font-head)', color: 'var(--ink)' }}><Check size={28} />Yes</motion.div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 30px', borderRadius: 99, background: 'var(--silver-200)', font: '600 26px var(--font-head)', color: 'var(--ink)' }}><Cross size={26} />No</div>
        </div>
      </motion.div>
      <motion.div {...pop(b, 1, { x: -40, y: 40 })} style={{ position: 'absolute', left: 0, top: 170 }}><Pickle pose="point" height={210} /></motion.div>
      <div style={{ position: 'absolute', left: 150, top: 470, display: 'grid', gap: 18 }}>
        {when.map((t, i) => (
          <motion.div key={t} {...pop(b, 2 + i, { x: 30, y: 0 })} style={{ display: 'flex', alignItems: 'center', gap: 16, font: '500 30px var(--font-head)', color: 'var(--ink)' }}>
            <span style={{ display: 'grid', placeItems: 'center', width: 44, height: 44, borderRadius: 99, background: 'var(--moss-100, var(--surface-page))', boxShadow: 'inset 0 0 0 2px var(--moss-300)' }}><Check size={24} color="var(--pickle-ink)" /></span>{t}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** 4 · one step at a time: the worksheet; Blicky's ring and arrow land first, then his words; the answer stays back. */
function OneStep({ w, h, d }: { w: number; h: number; d: { ring: number; beat: number } }) {
  const s = fit(CHEM, w, h), b = d.beat
  return (
    <Win title="chem-worksheet.pdf" src={CHEM.src} w={w} h={h}>
      <Marks c={CHEM} w={w} h={h} stroke={d.ring} delay={2 * b} />
      {/* where the product goes: held back until she asks */}
      <motion.div {...pop(b, 2, { scale: 0.94 })} style={{ position: 'absolute', left: 1135 * s, top: 212 * s, width: 200 * s, height: 160 * s, boxSizing: 'border-box', borderRadius: 14, border: '3px dashed var(--silver-400)', display: 'grid', placeItems: 'center', textAlign: 'center', font: '500 20px/1.25 var(--font-head)', color: 'var(--text-secondary)' }}>
        the answer,<br />when you ask
      </motion.div>
      <motion.div {...pop(b, 1, { y: 60, scale: 0.8 })} style={{ position: 'absolute', left: 150 * s, top: 600 * s }}><Blicky pose="sketch" height={190} /></motion.div>
      {/* the voice waits for its mark: the bubble comes after the ring and arrow have ink */}
      <motion.div {...pop(b, 2, { y: 20 })} transition={{ ...spring, delay: 2 * b + 1.05 }}
        style={{ position: 'absolute', left: 400 * s, top: 640 * s, maxWidth: 560, padding: '14px 22px 16px', borderRadius: 22, background: 'var(--sky-50)', boxShadow: `inset 0 0 0 2px var(--sky-200), ${shadow}` }}>
        <div style={{ font: '600 20px var(--font-head)', color: 'var(--blicky-ink)', marginBottom: 4 }}>Blicky</div>
        <div style={{ font: '400 30px/1.3 var(--font-second)', color: 'var(--ink)' }}>First, the oxygen in OH attacks this carbon.</div>{/* DRAFT */}
      </motion.div>
    </Win>
  )
}

/** 5 · it manages your context: her sentence → Pickle → the right project (routed by Moss, on this Mac), and Pickle
    writing that project's memory. */
function Context({ w, h, d }: { w: number; h: number; d: { beat: number } }) {
  const b = d.beat
  const projects = ['CHEM 120 · worksheet', 'Club bracket · CAD', 'LRKS · why it dropped'] // DRAFT, Mia's scenario
  const memory = ['Your words, verbatim', 'Blicky’s notes', 'The session log'] // what a project folder holds (app/memory/README.md)
  const line = (dd: string, i: number) => (
    <motion.path d={dd} fill="none" stroke="var(--pickle-ink)" strokeWidth={5} strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ pathLength: { duration: 0.45, ease: 'easeInOut', delay: i * b }, opacity: { duration: 0.01, delay: i * b } }} />
  )
  return (
    <div style={{ position: 'relative', width: w, height: h + 44 }}>
      <svg width={w} height={h + 44} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }}>
        {line('M250 300C330 300 420 110 548 98', 3)}
        {line('M190 420C230 560 380 560 548 540', 5)}
      </svg>
      <motion.div {...pop(b, 0, { x: -30, y: 0 })} style={{ position: 'absolute', left: 0, top: 0 }}>
        <Words style={{ position: 'relative', whiteSpace: 'nowrap' }}>now circle the carbonyl carbon on it</Words>
      </motion.div>
      <motion.div {...pop(b, 1, { y: 60, scale: 0.85 })} style={{ position: 'absolute', left: 60, top: 180 }}><Pickle pose="point" height={230} /></motion.div>
      {projects.map((p, i) => (
        <motion.div key={p} {...pop(b, 1 + i * 0.5, { x: 30, y: 0 })} style={{ position: 'absolute', left: 560, top: i === 0 ? 40 : 60 + i * 110, width: 500 }}>
          <motion.div initial={i === 0 ? { boxShadow: `inset 0 0 0 2px var(--line-hair), ${shadow}` } : false}
            animate={{ boxShadow: `inset 0 0 0 ${i === 0 ? 3 : 2}px ${i === 0 ? 'var(--moss-400)' : 'var(--line-hair)'}, ${shadow}` }} transition={{ duration: 0.3, delay: i === 0 ? 4 * b + 0.2 : 0 }}
            style={{ boxSizing: 'border-box', padding: '16px 22px', borderRadius: 16, background: 'var(--surface-page)', boxShadow: `inset 0 0 0 2px var(--line-hair), ${shadow}` }}>
            <div style={{ font: `${i === 0 ? 600 : 500} 26px var(--font-head)`, color: 'var(--ink)' }}>{p}</div>
            {i === 0 && <motion.div {...pop(b, 4)} style={{ marginTop: 6, font: '400 21px var(--font-pixel)', color: 'var(--pickle-ink)' }}>routed by moss · 7 ms</motion.div>}
          </motion.div>
        </motion.div>
      ))}
      <motion.div {...pop(b, 5.5, { y: 30, scale: 0.96 })} style={{ position: 'absolute', left: 560, top: 430, width: 500, boxSizing: 'border-box', padding: '20px 24px 22px', borderRadius: 20, background: 'var(--surface-page)', boxShadow: `inset 0 0 0 2px var(--moss-300), ${shadow}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ font: '600 24px var(--font-head)', color: 'var(--pickle-ink)' }}>CHEM 120 · memory</span>
          <span style={{ font: '400 20px var(--font-pixel)', color: 'var(--text-secondary)' }}>pickle is writing…</span>
        </div>
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {memory.map((m, i) => (
            <motion.div key={m} {...pop(b, 6.5 + i, { x: 20, y: 0 })} style={{ display: 'flex', alignItems: 'center', gap: 12, font: '500 24px var(--font-head)', color: 'var(--ink)' }}>
              <Check size={24} color="var(--pickle-ink)" />{m}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function WithYou() {
  const step = useStep()
  const d = useDialKit('With you', { head: [44, 30, 70, 1], screenW: [1080, 820, 1180, 4], ring: [6, 2, 12, 0.5], beat: [0.16, 0, 0.5, 0.01] })
  const at = step >= 1 && step <= 5 ? step - 1 : -1
  const dec = at >= 0 ? DECISIONS[at] : null
  const W = d.screenW, H = Math.round(W * 0.625), winLeft = 1920 - M - W, winTop = 984 - H - 44
  const Visual = [OnYourScreen, TwoFriends, AsksFirst, OneStep, Context][at]

  return (
    <>
      {/* the title: his line, small, the whole slide */}
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={spring}
        style={{ position: 'absolute', left: M, top: 130, margin: 0, font: `700 ${d.head}px/1.04 var(--font-head)`, letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
        {HEAD_A}<br />{HEAD_B}<span style={{ color: 'var(--pickle-ink)' }}>{HEAD_C}</span>
      </motion.h1>

      {/* step 0: the five decisions as a list, and the two of them */}
      <AnimatePresence>
        {step === 0 && (
          <motion.ol key="list" exit={{ opacity: 0, y: -20 }} transition={spring} style={{ position: 'absolute', left: M, top: 320, margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 26 }}>
            {DECISIONS.map((k, i) => (
              <motion.li key={k.tab} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.15 + i * 0.09 }}
                style={{ display: 'flex', alignItems: 'baseline', gap: 26 }}>
                <span style={{ width: 30, font: '600 32px var(--font-head)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                <span style={{ font: '700 56px/1.05 var(--font-head)', letterSpacing: '-0.035em', color: 'var(--ink)' }}>{k.title}</span>
              </motion.li>
            ))}
          </motion.ol>
        )}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 120 }} animate={step === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }} transition={{ ...spring, delay: step === 0 ? 0.3 : 0 }}
        style={{ position: 'absolute', right: M + 60, bottom: 70, display: 'flex', alignItems: 'flex-end', gap: 30, pointerEvents: 'none' }}>
        <Pickle pose="wave" height={210} />
        <Blicky pose="cheer" height={280} />
      </motion.div>

      {/* steps 1–5: the decision and why on the left, its picture on the right */}
      <AnimatePresence>
        {dec && (
          <motion.div key={dec.tab} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={spring}
            style={{ position: 'absolute', left: M, top: 320, width: winLeft - M - 56 }}>
            <div style={{ font: '700 72px/1.04 var(--font-head)', letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)', textWrap: 'balance' } as CSSProperties}>{dec.title}</div>
            <p style={{ margin: '30px 0 0', font: '500 34px/1.3 var(--font-head)', letterSpacing: '-0.01em', color: 'var(--ink)' }}>{dec.why}</p>
            {at === 1 && <p style={{ margin: '30px 0 0', font: '400 30px/1.35 var(--font-second)', color: 'var(--pickle-ink)' }}>{FRIEND}</p>}
            {at === 4 && <p style={{ margin: '26px 0 0', font: '400 20px/1.4 var(--font-head)', color: 'var(--text-secondary)' }}>{ROUTE_NOTE}</p>}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {Visual && (
          <motion.div key={at} initial={{ opacity: 0, x: 120, rotate: 1.5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -80, rotate: -1 }} transition={spring}
            style={{ position: 'absolute', left: winLeft, top: winTop }}>
            <Visual w={W} h={H} d={d} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* where we are among the five */}
      <motion.div initial={false} animate={{ opacity: dec ? 1 : 0 }} transition={spring} style={{ position: 'absolute', left: M, top: 920, display: 'flex', gap: 24 }}>
        {DECISIONS.map((k, i) => (
          <div key={k.tab} style={{ position: 'relative', font: `${i === at ? 700 : 500} 22px var(--font-head)`, color: i === at ? 'var(--ink)' : 'var(--text-muted)', paddingBottom: 10, whiteSpace: 'nowrap' }}>
            {k.tab}
            {i === at && <motion.i layoutId="with-you-bar" transition={spring} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, borderRadius: 2, background: 'var(--pickle-ink)' }} />}
          </div>
        ))}
      </motion.div>
    </>
  )
}
