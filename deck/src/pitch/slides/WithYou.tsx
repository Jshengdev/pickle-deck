import type { CSSProperties, ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { M } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Words } from '../clip/kit'
import chemistry from '../assets/screens/chemistry.jpg'
import calHub from '../assets/screens/cal-hub.jpg'
import cad from '../assets/screens/cad.jpg'
import video from '../assets/screens/video.jpg'
import stocks from '../assets/screens/stocks.jpg'

/** 9 · Built to do it with you. 7 steps.
    0    the headline, his words (2026-10-25, 4:38 AM, voice: "so instead of a tool that does more, we build one that
         does it with you"; "build" set as "built", nothing else changed). Pickle and Blicky beside it.
    1–5  the main use cases, one per press (his ask, same note: "be a little bit more higher level about what it can do,
         like the main use cases… something cooler than that"). Each is a real screen (assets/screens, CREDITS.md there)
         with Pickle at her cursor, what she asks, and Blicky's drawn ring on the one thing that matters.
           1 Learn   the chemistry worksheet (pickje demo/chemistry). The arrow is the first step of the mechanism (the
                     alcohol's O attacks the C=O carbon); the product is never drawn. Grounded in docs/PRODUCT.md: Blicky
                     "holds back a result you haven't reached until you ask for it".
           2 Plan    the Cal Student Hub (pickje demo/chaos/spec.txt). "Pickle, I'm overwhelmed" is the spec's line,
                     verbatim. The ring and the next step are the spec's P1: the inbox's first row ("Assignment
                     submission link updated", Prof. Nguyen) is read first, before tonight's PS4.
           3 Build   FreeCAD (Nik vr, Wikimedia Commons, CC BY-SA 4.0), standing in for SolidWorks; credited on the tile.
           4 Create  Kdenlive (Ddeepeshkumar, Wikimedia Commons, CC BY-SA 4.0); credited on the tile.
           5 Invest  the stocks page (pickje demo/stocks/index.html, its header: "the 18% drop the day after earnings…
                     with the volume spike and a headline that explains it"). Made-up company and data.
    6    all five as a row of tiles, and the three principles small along the bottom. The principles are from his words
         via the pickje session (the sources are in ToolsForMore.tsx's header as of 2026-10-25 ~4:40 AM: his-words.md:86-90,
         spec 0014, spec 0006): "It asks before it acts" · "One step at a time" · "A friend on your screen".
    DRAFT (ours, for him to react to): every verb and one-line, every question she asks except "Pickle, I'm overwhelmed",
    and the next-step card's wording on the Cal Hub. Ring and cursor spots were placed by eye on the real screens. */
export const WITH_YOU_STEPS = 7

/** His words (spelling kept; "build" → "built"). The last words take Pickle's ink. */
const HEAD_A = 'Instead of a tool that does more,'
const HEAD_B = 'we built one that '
const HEAD_C = 'does it with you.'

type Mark = { kind: 'ring'; cx: number; cy: number; rx: number; ry: number } | { kind: 'arrow'; d: string; tip: [number, number]; from: [number, number] }
type Case = {
  verb: string; line: string; title: string; src: string; iw: number; ih: number
  ask: string; cursor: [number, number]; askAt: [number, number]; blicky: [number, number, number]
  marks: Mark[]; credit?: string; note?: { at: [number, number]; label: string; text: string }
}
/** Positions are in the screen image's own pixels (the marks' SVG shares its viewBox), except `askAt`: her question's
    offset from the cursor tip, in slide pixels. */
const CASES: Case[] = [
  {
    verb: 'Learn', line: 'It teaches you the next step, not the answer.', // DRAFT (as ToolsForMore's card)
    title: 'chem-worksheet.pdf', src: chemistry, iw: 1440, ih: 900,
    ask: 'Where do I even start?', // DRAFT
    cursor: [1150, 290], askAt: [-330, 92], blicky: [170, 590, 200],
    marks: [
      { kind: 'ring', cx: 425, cy: 322, rx: 48, ry: 38 },
      { kind: 'arrow', d: 'M452 284C470 180 560 150 618 204', from: [560, 150], tip: [618, 204] },
    ],
  },
  {
    verb: 'Plan', line: '“I’m overwhelmed” becomes one next step.', // DRAFT; grounded in spec.txt's "Central promise"
    title: 'Cal Student Hub', src: calHub, iw: 2880, ih: 1800,
    ask: 'Pickle, I’m overwhelmed', // demo/chaos/spec.txt, verbatim
    cursor: [1100, 205], askAt: [128, -6], blicky: [2075, 470, 120],
    marks: [{ kind: 'ring', cx: 1634, cy: 474, rx: 380, ry: 72 }],
    note: { at: [2050, 850], label: 'Now', text: 'Read Prof. Nguyen’s new PS4 link.' }, // DRAFT wording of spec P1
  },
  {
    verb: 'Build', line: 'It marks the part that matters, right on your model.', // DRAFT
    title: 'FreeCAD · bracket', src: cad, iw: 1491, ih: 858,
    ask: 'How do I cut this hole through?', // DRAFT
    cursor: [865, 440], askAt: [-260, 94], blicky: [1010, 215, 140],
    marks: [{ kind: 'ring', cx: 808, cy: 392, rx: 56, ry: 50 }],
    credit: 'FreeCAD · Nik vr · CC BY-SA 4.0',
  },
  {
    verb: 'Create', line: 'It shows you where to click, right in your editor.', // DRAFT
    title: 'Kdenlive · club-video', src: video, iw: 1920, ih: 1044,
    ask: 'Where do I fix this clip’s color?', // DRAFT
    cursor: [640, 800], askAt: [118, 8], blicky: [850, 160, 130],
    marks: [{ kind: 'ring', cx: 540, cy: 172, rx: 280, ry: 30 }],
    credit: 'Kdenlive · Ddeepeshkumar · CC BY-SA 4.0',
  },
  {
    verb: 'Invest', line: 'It ties the drop to the news that caused it.', // DRAFT; the drop and the headline are on the page
    title: 'Markets · LRKS', src: stocks, iw: 2880, ih: 1800,
    ask: 'Why did it drop here?', // DRAFT
    cursor: [1160, 690], askAt: [16, 96], blicky: [1540, 1385, 140],
    marks: [
      { kind: 'ring', cx: 1026, cy: 860, rx: 72, ry: 215 },
      { kind: 'arrow', d: 'M1040 1100C1070 1530 1760 1530 2070 1420', from: [1760, 1530], tip: [2070, 1420] },
      { kind: 'ring', cx: 2448, cy: 1397, rx: 370, ry: 84 },
    ],
  },
]
const PRINCIPLES = ['It asks before it acts', 'One step at a time', 'A friend on your screen']

const spring = { type: 'spring', visualDuration: 0.5, bounce: 0.14 } as const
/** object-fit: cover, anchored top left: the scale from image pixels to the box. */
const fit = (c: Case, w: number, h: number) => Math.max(w / c.iw, h / c.ih)

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

/** Blicky's marks on a screen, drawn in (or already drawn, for the overview tiles). */
function Marks({ c, w, h, stroke, play = true, delay = 0 }: { c: Case; w: number; h: number; stroke: number; play?: boolean; delay?: number }) {
  const s = fit(c, w, h), sw = stroke / s
  const draw = (i: number, dur: number) => play
    ? { initial: { pathLength: 0, opacity: 0 }, animate: { pathLength: 1, opacity: 1 }, transition: { pathLength: { duration: dur, ease: 'easeInOut', delay: delay + i * 0.35 }, opacity: { duration: 0.01, delay: delay + i * 0.35 } } } as const
    : { initial: false } as const
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
function Win({ title, src, w, h, children, style }: { title: string; src: string; w: number; h: number; children?: ReactNode; style?: CSSProperties }) {
  const bar = 44
  return (
    <div style={{ position: 'relative', width: w, height: h + bar, borderRadius: 18, overflow: 'hidden', background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)', ...style }}>
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

/** One use case as the hero: the screen, her pointer and question, Blicky and his marks, arriving in that order. */
function Hero({ c, w, h, d }: { c: Case; w: number; h: number; d: { ring: number; beat: number } }) {
  const s = fit(c, w, h), b = d.beat
  const pop = (i: number, from: { x?: number; y?: number; scale?: number } = { y: 24 }) =>
    ({ initial: { opacity: 0, ...from }, animate: { opacity: 1, x: 0, y: 0, scale: 1 }, transition: { ...spring, delay: i * b } })
  return (
    <Win title={c.title} src={c.src} w={w} h={h}>
      <Marks c={c} w={w} h={h} stroke={d.ring} delay={4 * b} />
      {c.note && (
        <motion.div {...pop(6, { y: 30, scale: 0.94 })} style={{ position: 'absolute', left: c.note.at[0] * s, top: c.note.at[1] * s, width: 290, boxSizing: 'border-box', padding: '16px 20px', borderRadius: 18, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 2px var(--moss-300), 0 3px 0 oklch(0.3 0.01 230 / .16)' }}>
          <div style={{ font: '600 20px var(--font-head)', color: 'var(--pickle-ink)' }}>{c.note.label}</div>
          <div style={{ font: '500 25px/1.3 var(--font-head)', color: 'var(--ink)', marginTop: 4 }}>{c.note.text}</div>
        </motion.div>
      )}
      <motion.div {...pop(1, { x: 40, y: 30 })} style={{ position: 'absolute', left: 0, top: 0 }}><Cursor x={c.cursor[0] * s} y={c.cursor[1] * s} /></motion.div>
      <motion.div {...pop(2, { y: 14 })} style={{ position: 'absolute', left: c.cursor[0] * s + c.askAt[0], top: c.cursor[1] * s + c.askAt[1] }}><Words style={{ position: 'relative', whiteSpace: 'nowrap' }}>{c.ask}</Words></motion.div>
      <motion.div {...pop(3, { y: 60, scale: 0.8 })} style={{ position: 'absolute', left: c.blicky[0] * s, top: c.blicky[1] * s }}><Blicky pose="sketch" height={c.blicky[2]} /></motion.div>
      {c.credit && <span style={{ position: 'absolute', right: 10, bottom: 10, padding: '4px 10px', borderRadius: 8, background: 'var(--surface-page)', font: '400 20px var(--font-head)', color: 'var(--text-secondary)' }}>{c.credit}</span>}
    </Win>
  )
}

export function WithYou() {
  const step = useStep()
  const d = useDialKit('With you', {
    head: [92, 60, 130, 1], small: [0.48, 0.3, 0.8, 0.01],
    screenW: [1080, 820, 1180, 4], ring: [6, 2, 12, 0.5], beat: [0.16, 0, 0.5, 0.01],
  })
  const at = step >= 1 && step <= 5 ? step - 1 : -1
  const c = at >= 0 ? CASES[at] : null
  const W = d.screenW, H = Math.round(W * 0.625), winLeft = 1920 - M - W, winTop = 984 - H - 44
  const tileW = (1728 - 4 * 24) / 5, tileH = Math.round(tileW * 0.625)
  const small = step >= 1

  return (
    <>
      {/* the headline: big on arrival, then up to the top as the title while the use cases play */}
      <motion.h1 initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: small ? 130 - 290 : 0, scale: small ? d.small : 1 }} transition={spring}
        style={{ position: 'absolute', left: M, top: 290, margin: 0, transformOrigin: '0 0', font: `700 ${d.head}px/1.04 var(--font-head)`, letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
        {HEAD_A}<br />{HEAD_B}<span style={{ color: 'var(--pickle-ink)' }}>{HEAD_C}</span>
      </motion.h1>

      {/* step 0: the two of them, side by side */}
      <motion.div initial={{ opacity: 0, y: 120 }} animate={step === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }} transition={{ ...spring, delay: step === 0 ? 0.2 : 0 }}
        style={{ position: 'absolute', right: M + 80, bottom: 70, display: 'flex', alignItems: 'flex-end', gap: 36, pointerEvents: 'none' }}>
        <Pickle pose="wave" height={250} />
        <Blicky pose="cheer" height={330} />
      </motion.div>

      {/* steps 1–5: the verb and its line on the left, the screen on the right */}
      <AnimatePresence>
        {c && (
          <motion.div key={c.verb} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={spring}
            style={{ position: 'absolute', left: M, top: 330, width: winLeft - M - 56 }}>
            <div style={{ font: '700 var(--deck-hero)/1 var(--font-head)', letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)' }}>{c.verb}</div>
            <p style={{ margin: '30px 0 0', font: '500 40px/1.25 var(--font-head)', letterSpacing: '-0.015em', color: 'var(--ink)' }}>{c.line}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {c && (
          <motion.div key={c.verb} initial={{ opacity: 0, x: 120, rotate: 1.5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -80, rotate: -1 }} transition={spring}
            style={{ position: 'absolute', left: winLeft, top: winTop }}>
            <Hero c={c} w={W} h={H} d={d} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* where we are among the five */}
      <motion.div initial={false} animate={{ opacity: c ? 1 : 0 }} transition={spring} style={{ position: 'absolute', left: M, top: 920, display: 'flex', gap: 30 }}>
        {CASES.map((k, i) => (
          <div key={k.verb} style={{ position: 'relative', font: `${i === at ? 700 : 500} 24px var(--font-head)`, color: i === at ? 'var(--ink)' : 'var(--text-muted)', paddingBottom: 10 }}>
            {k.verb}
            {i === at && <motion.i layoutId="with-you-bar" transition={spring} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, borderRadius: 2, background: 'var(--pickle-ink)' }} />}
          </div>
        ))}
      </motion.div>

      {/* step 6: all five, then the three principles */}
      {step >= 6 && (
        <>
          <div style={{ position: 'absolute', left: M, top: 300, display: 'flex', gap: 24 }}>
            {CASES.map((k, i) => (
              <motion.div key={k.verb} initial={{ opacity: 0, y: 50, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ ...spring, delay: i * 0.08 }} style={{ width: tileW }}>
                <div style={{ position: 'relative', width: tileW, height: tileH, borderRadius: 16, overflow: 'hidden', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)' }}>
                  <img src={k.src} alt="" style={{ width: tileW, height: tileH, objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />
                  <Marks c={k} w={tileW} h={tileH} stroke={3.5} delay={0.4 + i * 0.08} />
                </div>
                <div style={{ marginTop: 20, font: '700 40px/1 var(--font-head)', letterSpacing: '-0.03em', color: 'var(--ink)' }}>{k.verb}</div>
                <div style={{ marginTop: 10, font: '400 24px/1.35 var(--font-head)', color: 'var(--ink)' }}>{k.line}</div>
                {k.credit && <div style={{ marginTop: 8, font: '400 20px/1.3 var(--font-head)', color: 'var(--text-secondary)' }}>{k.credit.replace(' · CC', '\nCC').split('\n').map((t) => <div key={t}>{t}</div>)}</div>}
              </motion.div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: M, right: M, top: 830, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {PRINCIPLES.map((p, i) => (
              <motion.div key={p} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.6 + i * 0.12 }}
                style={{ paddingTop: 18, borderTop: '3px solid var(--pickle-ink)', font: '600 34px/1.2 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{p}</motion.div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
