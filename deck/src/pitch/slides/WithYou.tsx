import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Words } from '../clip/kit'
import chemistry from '../assets/screens/chemistry.jpg'
import calHub from '../assets/screens/cal-hub.jpg'

/** 9 · Built to do it with you. 6 steps.
    His run-through (2026-10-25, ~5:20 AM, voice, verbatim): "So instead of a tool that does more, we built one that does
    it with you. And then let's not make it learn, plan, build, create, invest because those are targeted towards the
    actual skills themselves. Our thing is more about AI collaboration. So we should talk about the more UX decisions
    behind why this must exist and what mental model it possesses to make this more of a human AI collaboration effort
    instead of it being just like an AI thing. But in the meantime, then we can just end it off on saying, introducing
    Pickle." ("Pickle" = the product, pickje.)

    0  the headline, his words (unchanged from his ~4:45 AM note; "build" set as "built"). Pickle and Blicky beside it.
    1–4  the UX decisions behind the collaboration, one per press: a short decision (left) + one line on why, and a
         picture of it (right). Decisions and lines are DRAFT, each grounded here:
      1  It works where your work is. pickle-deck docs/PRODUCT.md "What it is": "Nothing opens in a chat window: the
         explanation happens on top of the material you're working on." pickje docs/spec/0012 (demo/chaos/spec.txt): "the
         student should not need to screenshot the portal, paste it into a chat window, manually describe where each item
         appears". The picture: the Cal Student Hub with the spec's own line "Pickle, I'm overwhelmed" (verbatim), Blicky's
         ring on the inbox row the spec says to read first (P1), and its one next step (card wording DRAFT).
      2  Two friends, two jobs (the mental model). PRODUCT.md: Pickje "knows which of your projects this is and keeps each
         project's memory"; Blicky "draws on your actual document… and talks you through one step at a time". His words,
         pickje docs/context/his-words.md:88 (spelling fixed: "IT" → "It"): "It should feel like I have a friend
         screensharing my problems." The three project names on Pickle's cards are Mia's scenario (DRAFT).
      3  It asks before it acts. pickje docs/spec/0014 (his words, 10-25 ~1:30 AM): "a small popup wiht like a check or a
         no"; it asks on any project switch or new project, and before a close-out toward the north star; Droid's offer
         uses the same check/no popup (spec 0014, "kind": "droid"), and Droid works only after a yes (PRODUCT.md, Factory:
         "Say yes and Droid makes a practice set"). Pickle's question in the popup is DRAFT.
      4  One step at a time. pickje docs/spec/0006, his click 10-24 ~2:37 PM: "Step by step, everywhere"; the rule:
         Blicky's next step "never name[s] a result he hasn't asked for". app/shell/README.md: "The voice waits for its
         mark" (his click, 10-24), so here the words come only after the ring and arrow land. his-words.md:88: "keep it
         short, simple, sweet, one at a time". Blicky's line on the worksheet is DRAFT (the first step of the mechanism,
         the alcohol's O attacking the C=O carbon; the product is never drawn).
    5  "Introducing pickje." (his words: "end it off on saying, introducing Pickle"), with his mission under it,
       his-words.md:86 (spelling fixed, shortened at the sentence's first clause): "It's not another agent, it's a new
       paradigm for collaborative work between humans and technology." Leads into the title slide. */
export const WITH_YOU_STEPS = 6

const HEAD_A = 'Instead of a tool that does more,'
const HEAD_B = 'we built one that '
const HEAD_C = 'does it with you.'

/** The four decisions (DRAFT wording; sources above). `tab` is the short name in the row along the bottom. */
const DECISIONS = [
  { tab: 'Your screen', title: 'It works where your work is.', why: 'Nothing opens in a chat window. No screenshots, no pasting, no explaining it all again.' },
  { tab: 'Two friends', title: 'Two friends, two jobs.', why: 'Pickle keeps your context, so you don’t have to. Blicky shows you, right on your screen.' },
  { tab: 'Asks first', title: 'It asks before it acts.', why: 'A check or a no before it switches projects, closes out a goal or hands work to Droid. You stay in charge.' },
  { tab: 'One step', title: 'One step at a time.', why: 'It teaches the next step and holds back the answer until you ask. Its voice waits for each mark to land.' },
]
const FRIEND = '“It should feel like I have a friend screensharing my problems.”' // his-words.md:88, spelling fixed
const MISSION = 'It’s not another agent. It’s a new paradigm for collaborative work between humans and technology.' // his-words.md:86

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
          <div style={{ font: '700 40px/1.1 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--pickle-ink)' }}>Pickle keeps your context</div>
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
          <div style={{ font: '700 40px/1.1 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--blicky-ink)' }}>Blicky shows you</div>
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

export function WithYou() {
  const step = useStep()
  const d = useDialKit('With you', {
    head: [92, 60, 130, 1], small: [0.48, 0.3, 0.8, 0.01],
    screenW: [1080, 820, 1180, 4], ring: [6, 2, 12, 0.5], beat: [0.16, 0, 0.5, 0.01],
  })
  const at = step >= 1 && step <= 4 ? step - 1 : -1
  const dec = at >= 0 ? DECISIONS[at] : null
  const W = d.screenW, H = Math.round(W * 0.625), winLeft = 1920 - M - W, winTop = 984 - H - 44
  const small = step >= 1, end = step >= 5
  const Visual = [OnYourScreen, TwoFriends, AsksFirst, OneStep][at]

  return (
    <>
      {/* the headline: big on arrival, then up to the top as the title while the decisions play; gone for the end */}
      <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: end ? 0 : 1, y: small ? (end ? 100 : 130) - 290 : 0, scale: small ? d.small : 1 }} transition={spring}
        style={{ position: 'absolute', left: M, top: 290, margin: 0, transformOrigin: '0 0', font: `700 ${d.head}px/1.04 var(--font-head)`, letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
        {HEAD_A}<br />{HEAD_B}<span style={{ color: 'var(--pickle-ink)' }}>{HEAD_C}</span>
      </motion.h1>

      {/* steps 0 and 5: the two of them, side by side */}
      <motion.div initial={{ opacity: 0, y: 120 }} animate={step === 0 || end ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }} transition={{ ...spring, delay: step === 0 || end ? 0.2 : 0 }}
        style={{ position: 'absolute', right: M + 80, bottom: 70, display: 'flex', alignItems: 'flex-end', gap: 36, pointerEvents: 'none' }}>
        <Pickle pose={end ? 'point' : 'wave'} height={250} />
        <Blicky pose={end ? 'wave' : 'cheer'} height={330} />
      </motion.div>

      {/* steps 1–4: the decision and why on the left, its picture on the right */}
      <AnimatePresence>
        {dec && (
          <motion.div key={dec.tab} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={spring}
            style={{ position: 'absolute', left: M, top: 320, width: winLeft - M - 56 }}>
            <div style={{ font: '700 72px/1.04 var(--font-head)', letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)', textWrap: 'balance' } as CSSProperties}>{dec.title}</div>
            <p style={{ margin: '30px 0 0', font: '500 34px/1.3 var(--font-head)', letterSpacing: '-0.01em', color: 'var(--ink)' }}>{dec.why}</p>
            {at === 1 && <p style={{ margin: '30px 0 0', font: '400 30px/1.35 var(--font-second)', color: 'var(--pickle-ink)' }}>{FRIEND}</p>}
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
      {/* where we are among the four */}
      <motion.div initial={false} animate={{ opacity: dec ? 1 : 0 }} transition={spring} style={{ position: 'absolute', left: M, top: 920, display: 'flex', gap: 30 }}>
        {DECISIONS.map((k, i) => (
          <div key={k.tab} style={{ position: 'relative', font: `${i === at ? 700 : 500} 24px var(--font-head)`, color: i === at ? 'var(--ink)' : 'var(--text-muted)', paddingBottom: 10, whiteSpace: 'nowrap' }}>
            {k.tab}
            {i === at && <motion.i layoutId="with-you-bar" transition={spring} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, borderRadius: 2, background: 'var(--pickle-ink)' }} />}
          </div>
        ))}
      </motion.div>

      {/* step 5: introducing pickje */}
      <AnimatePresence>
        {end && (
          <motion.div key="intro" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ ...spring, delay: 0.1 }}
            style={{ position: 'absolute', left: M, top: 300, width: 1060 }}>
            <div style={{ font: '700 var(--deck-giant)/0.98 var(--font-head)', letterSpacing: 'var(--tracking-giant)', color: 'var(--ink)' }}>
              Introducing <span style={{ color: 'var(--pickle-ink)' }}>pickje.</span>
            </div>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.45 }}
              style={{ margin: '44px 0 0', maxWidth: 900, font: '400 34px/1.35 var(--font-second)', color: 'var(--pickle-ink)' }}>“{MISSION}”</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
