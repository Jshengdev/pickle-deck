import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Blicky, Pickle } from '@design/cast/Cast'
import { M, TOP } from '../../brand/frame'
import { Show, useStep } from '../kit/step'
import nmrPage from '../assets/screens/chemistry-nmr.jpg'

/** 16 · The full exam. His words (2026-10-25, 4:38 AM, voice): "Basically show a full exam of how I was able to perform,
    and then more data about the whole thing that we built." 4 steps, one sentence per press (all sentences DRAFT):
    0  how the exam works: the real screen → the real app → a strict judge, traced through one real step
       (docs/evals/README.md "How the live exam runs"; docs/PRODUCT.md:27-30). The step shown is run 1, step 3 of the
       latest saved run (docs/evals/2026-10-24-2/results.json, records[0]): his words "what does this formula tell me?",
       Blicky's 2nd line, and 3 of that step's criteria with the judge's verdicts (V1 PASS, V2 FAIL, R1 PASS).
    1  the score: run 1 52% (117/224, docs/evals/2026-10-24-1/summary.txt) → latest 62% (302/485, two passes,
       docs/evals/2026-10-24-2/summary.txt). The pass bar (his click, docs/evals/README.md): ≥ 80% of criteria over 2 runs
       of both demos, no reveal slips. NOT PASSED: 62% and 1 slip.
    2  the five kinds of criteria, run 1 vs latest (same two summary.txt files). The 1 slip: run 2 step 15, "a recap of the
       last session named the product" (summary.txt R1 line; README).
    3  more of what we built: six measured numbers from docs/PRODUCT.md, each line cited below.
    Caveats kept on the slide: not passed; 1 reveal slip; in the latest run the mic heard 0 of 36 steps, so every step's
    words were handed to the app (testHeard), not heard; 3 of 36 steps not judged in the latest, 3 of 18 in run 1 (screenpipe saved no frame after
    the marks); run 1 still had demo examples in its prompts (README "Prompt hints"). */

const LINES = [
  'It drives the real app on the real screen, and a strict judge grades every step.',
  '52% on the first run, 62% on the latest. The bar is 80%, so it hasn’t passed yet.',
  'It holds back the answer and gets the chemistry right. Where it draws is the weak part.',
  'And underneath, the parts we built, each measured on its own.',
]
export const EXAM_STEPS = LINES.length

// docs/evals/2026-10-24-1/summary.txt and docs/evals/2026-10-24-2/summary.txt ("pass rate" and the five kinds).
const OVERALL = [
  { name: 'Run 1', sub: 'Oct 24 · 1 pass · 15 steps judged', pass: 117, of: 224 },
  { name: 'Latest', sub: 'Oct 24 · 2 passes · 33 steps judged', pass: 302, of: 485 },
]
const KINDS = [
  { name: 'Reveal', sub: 'no answer before he asks', a: [16, 16], b: [33, 34], note: 'a recap of the last session named the product' },
  { name: 'Chemistry', sub: 'is the chemistry right', a: [20, 21], b: [47, 50] },
  { name: 'General', sub: 'everything else in the rubric', a: [31, 46], b: [78, 101] },
  { name: 'Voice', sub: 'what Blicky says', a: [18, 42], b: [58, 92] },
  { name: 'Visual', sub: 'what Blicky draws, and where', a: [32, 99], b: [86, 208] },
] as const
const PASS_BAR = 80 // %, docs/evals/README.md "The pass bar (his click)"
const EAR_KINDS = 'Graded on words handed in, not heard: in the latest run the mic caught 0 of 36 steps.'
const EAR = 'In the latest run the mic heard 0 of 36 steps, so every step’s words were handed in, not heard. 3 of its 36 steps weren’t judged (3 of 18 in run 1): screenpipe saved no frame after the marks.'

// docs/PRODUCT.md, the line each number is quoted from:
const BUILT = [
  // :197-198 "Projects check, 16 turns: … 16/16 routed right either way." (metrics.md; output not kept)
  { value: '16/16', caption: 'turns routed to the right project', who: 'Moss + Claude · projects check' },
  // :63 "6 ms from Pickje's write to the card's callback (receipt)"; :238-239 "a median 6 ms, 5–9 ms"
  { value: '6 ms', caption: 'from Pickle’s write to the live card', who: 'Convex · median of 3 runs' },
  // :152-153 "Barge-in … your first sound to Blicky silent in a median 499 ms (metrics.md; output not kept)"
  { value: '499 ms', caption: 'for Blicky to go quiet when you talk', who: 'Cartesia · barge-in check' },
  // :279 "Hybrid search found the answer in the top 3 for 15/18 and 16/18 in the two saved runs"
  { value: '15/18', caption: 'past questions found in the top 3', who: 'Elastic · 18 staged questions' },
  // :330 "Hand-over: done 5/5, round trip a median 8.1 s (metrics.md; those runs' output wasn't kept)"
  { value: '8.1 s', caption: 'to hand a job over to Droid, 5 of 5 done', who: 'Factory · median' },
  // :60 "Blicky's cost per turn $0.029 → $0.019 with prompt caching (receipts)"; :100-103 read $0.019 as the saving
  { value: '$0.029 → $0.019', caption: 'Blicky’s cost per turn with prompt caching', who: 'Anthropic · the saving, not the price' },
]

const pct = (p: number, o: number) => Math.round((p / o) * 100)

/** One sentence per press, stacked in place: the current one shows, the others are gone. */
function Said({ lines }: { lines: string[] }) {
  const step = useStep()
  return (
    <div style={{ display: 'grid' }}>
      {lines.map((l, i) => (
        <motion.p key={l} initial={false} animate={{ opacity: step === i ? 1 : 0, y: step === i ? 0 : step > i ? -10 : 10 }}
          transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.1 }}
          style={{ gridArea: '1 / 1', margin: 0, font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{l}</motion.p>
      ))}
    </div>
  )
}

/** A scene: one hero, here only on its own press. */
const Scene = ({ at, children }: { at: number; children: ReactNode }) => (
  <Show from={at} until={at} style={{ position: 'absolute', inset: 0 }}>{children}</Show>
)

const small: CSSProperties = { font: 'var(--t-head-4)', color: 'var(--text-muted)' }

/* ── 0 · how it works ─────────────────────────────────────────────── */
function Node({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div style={{ width: 500, display: 'grid', gap: 18, alignContent: 'start' }}>
      <div style={{ height: 340, borderRadius: 18, background: 'var(--surface-sunken)', position: 'relative', overflow: 'hidden' }}>{children}</div>
      <div style={{ font: 'var(--t-head-2)', letterSpacing: 'var(--t-head-2-track)', color: 'var(--ink)' }}>{title}</div>
      <div style={{ font: 'var(--t-head-3)', letterSpacing: 'var(--t-head-3-track)', color: 'var(--text-secondary)' }}>{text}</div>
    </div>
  )
}
const Arrow = () => (
  <svg width={80} height={340} viewBox="0 0 80 340" style={{ flex: 'none' }}>
    <path d="M10 170H66M56 160L68 170L56 180" fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Verdict = ({ ok, children }: { ok: boolean; children: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '78px 1fr', gap: 14, alignItems: 'baseline' }}>
    <span style={{ font: 'var(--t-pixel-4)', color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}>
      <i style={{ width: 10, height: 10, borderRadius: 2, background: ok ? 'var(--checked)' : 'var(--stuck)', flex: 'none' }} />{ok ? 'PASS' : 'FAIL'}
    </span>
    <span style={{ font: '400 20px/1.35 var(--font-head)', color: 'var(--ink)' }}>{children}</span>
  </div>
)
function HowItWorks() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
      <Node title="The real screen" text="His worksheet in Preview. The real pointer circles it and asks out loud.">
        <div style={{ position: 'absolute', inset: 0, background: 'var(--surface-page)' }}>
          {/* chemistry-nmr.jpg = pickje demo/chemistry/judge/nmr/question.png (assets/screens/CREDITS.md); crop: the question + spectrum (a) */}
          <img src={nmrPage} alt="" style={{ position: 'absolute', width: 911, left: -171, top: -6 }} />
        </div>
        <div style={{ position: 'absolute', left: 20, bottom: 18, padding: '8px 14px', borderRadius: 12, background: 'var(--ink)', color: 'var(--text-on-dark)', font: '500 22px/1.3 var(--font-head)' }}>
          “what does this formula tell me?”
        </div>
      </Node>
      <Arrow />
      <Node title="The real app" text="pickje as it ships: Claude for both brains, Cartesia for both voices.">
        <div style={{ position: 'absolute', left: 40, right: 30, top: 34, display: 'flex', alignItems: 'flex-end', gap: 22 }}>
          <Pickle pose="listen" height={118} />
          <Blicky pose="sketch" height={128} />
        </div>
        {/* Blicky's 2nd line on that step (results.json records[0].says[1]) */}
        <div style={{ position: 'absolute', left: 30, right: 30, bottom: 26, font: 'var(--t-dot-4)', color: 'var(--ink)' }}>
          “For C10H12O that comes out to five, and oxygen doesn’t change the count.”
        </div>
      </Node>
      <Arrow />
      <Node title="A strict judge" text="Claude Opus grades what was recorded against the demo’s rubric.">
        {/* 3 of the step's 19 criteria with the judge's verdicts (results.json records[0].criteria: V1, V2, R1) */}
        <div style={{ position: 'absolute', inset: '30px 28px', display: 'grid', gap: 20, alignContent: 'start' }}>
          <Verdict ok>Blicky appears beside the molecular formula.</Verdict>
          <Verdict ok={false}>Blicky draws a thin animated circle around C₁₀H₁₂O.</Verdict>
          <Verdict ok>Do not show the answers or final chemical structures initially.</Verdict>
        </div>
      </Node>
    </div>
  )
}

/* ── 1 · the score ────────────────────────────────────────────────── */
function Score({ on, thick, grow }: { on: boolean; thick: number; grow: number }) {
  const labelW = 400, track = 1200
  const x = (p: number) => (p / 100) * track
  return (
    <div style={{ position: 'relative', width: labelW + track, paddingTop: 70 }}>
      {OVERALL.map((r, i) => {
        const p = pct(r.pass, r.of), latest = i === 1
        return (
          <div key={r.name} style={{ display: 'grid', gridTemplateColumns: `${labelW}px ${track}px`, alignItems: 'center', height: 150 }}>
            <div>
              <div style={{ font: 'var(--t-head-2)', letterSpacing: 'var(--t-head-2-track)', color: 'var(--ink)' }}>{r.name}</div>
              <div style={{ ...small, color: 'var(--text-secondary)' }}>{r.sub}</div>
            </div>
            <div style={{ position: 'relative', height: thick }}>
              <motion.div initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ type: 'spring', visualDuration: grow, bounce: 0, delay: on ? 0.15 + i * 0.25 : 0 }}
                style={{ position: 'absolute', left: 0, top: 0, height: thick, width: x(p), transformOrigin: 'left', borderRadius: '0 4px 4px 0', background: latest ? 'var(--forest-700)' : 'var(--silver-400)' }} />
              <div style={{ position: 'absolute', left: x(p) + 20, top: '50%', transform: 'translateY(-38%)', display: 'grid', gap: 2, whiteSpace: 'nowrap' }}>
                <span style={{ font: 'var(--t-pixel-2)', color: latest ? 'var(--ink)' : 'var(--text-secondary)' }}>{p}%</span>
                <span style={{ ...small, color: 'var(--text-secondary)' }}>{r.pass}/{r.of} criteria</span>
              </div>
            </div>
          </div>
        )
      })}
      {/* the pass bar, drawn at 80% on the same axis */}
      <motion.div initial={false} animate={{ scaleY: on ? 1 : 0 }} transition={{ type: 'spring', visualDuration: 0.6, bounce: 0, delay: on ? 0.8 : 0 }}
        style={{ position: 'absolute', left: labelW + x(PASS_BAR), top: 56, height: 2 * 150 + 20, width: 0, borderLeft: '2.5px dashed var(--ink)', transformOrigin: 'top' }} />
      <div style={{ position: 'absolute', left: labelW + x(PASS_BAR) + 16, top: 50, font: '600 25px/1.25 var(--font-head)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
        Pass bar 80%<div style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>over 2 runs, no reveal slips</div>
      </div>
      {/* axis: 0 and 100 only */}
      <div style={{ position: 'absolute', left: labelW, top: 70, height: 300, borderLeft: '1px solid var(--line-strong)' }} />
      <div style={{ ...small, position: 'absolute', left: labelW - 6, top: 384 }}>0</div>
      <div style={{ ...small, position: 'absolute', left: labelW + track - 24, top: 384 }}>100%</div>
      <div style={{ position: 'absolute', left: labelW, top: 440, width: track }}>
        <div style={{ font: 'var(--t-head-2)', letterSpacing: 'var(--t-head-2-track)', color: 'var(--ink)' }}>Not passed yet: 62% over 2 runs, and 1 reveal slip.</div>
        <div style={{ ...small, marginTop: 8 }}>{EAR}</div>
      </div>
    </div>
  )
}

/* ── 2 · the five kinds ───────────────────────────────────────────── */
function Kinds({ on, grow }: { on: boolean; grow: number }) {
  const labelW = 400, track = 1000, bar = 20
  const x = (p: number) => (p / 100) * track
  const series = [{ k: 'a' as const, name: 'Run 1', fill: 'var(--silver-400)' }, { k: 'b' as const, name: 'Latest, 2 passes', fill: 'var(--forest-700)' }]
  return (
    <div style={{ position: 'relative', width: labelW + track + 240 }}>
      <div style={{ display: 'flex', gap: 36, marginLeft: labelW, height: 44, alignItems: 'center' }}>
        {series.map((s) => (
          <span key={s.k} style={{ display: 'flex', alignItems: 'center', gap: 10, font: 'var(--t-head-4)', color: 'var(--text-secondary)' }}>
            <i style={{ width: 22, height: 12, borderRadius: 2, background: s.fill }} />{s.name}
          </span>
        ))}
      </div>
      <div style={{ position: 'relative', marginTop: 14 }}>
        <div style={{ position: 'absolute', left: labelW, top: 0, bottom: 0, borderLeft: '1px solid var(--line-strong)' }} />
        {KINDS.map((r, i) => (
          <div key={r.name} style={{ display: 'grid', gridTemplateColumns: `${labelW}px 1fr`, alignItems: 'center', height: 92 }}>
            <div>
              <div style={{ font: '600 25px/1.2 var(--font-head)', color: 'var(--ink)' }}>{r.name}</div>
              <div style={{ ...small, color: 'var(--text-secondary)' }}>{r.sub}</div>
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              {series.map((s, j) => {
                const [p, o] = r[s.k], v = pct(p, o)
                return (
                  <div key={s.k} style={{ position: 'relative', height: bar }}>
                    <motion.div initial={false} animate={{ scaleX: on ? 1 : 0 }} transition={{ type: 'spring', visualDuration: grow, bounce: 0, delay: on ? 0.1 + i * 0.08 + j * 0.05 : 0 }}
                      style={{ position: 'absolute', left: 0, height: bar, width: x(v), transformOrigin: 'left', borderRadius: '0 3px 3px 0', background: s.fill }} />
                    <span style={{ position: 'absolute', left: x(v) + 14, top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', font: 'var(--t-pixel-4)', color: j ? 'var(--ink)' : 'var(--text-secondary)' }}>
                      {v}% <span style={{ font: '400 20px var(--font-head)', color: 'var(--text-muted)' }}>{p}/{o}</span>
                      {j === 1 && 'note' in r && <span style={{ font: '600 20px var(--font-head)', color: 'var(--ink)', marginLeft: 14 }}>· 1 slip</span>}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ ...small, marginTop: 16, marginLeft: labelW, maxWidth: track + 200 }}>
        <div>Reveal’s 1 slip (latest, pass 2, step 15): {KINDS[0].note}.</div>
        <div>{EAR_KINDS}</div>
      </div>
    </div>
  )
}

/* ── 3 · more of what we built ────────────────────────────────────── */
function Built() {
  const step = useStep()
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap: 56, rowGap: 56 }}>
        {BUILT.map((b, i) => (
          <motion.div key={b.value} initial={false} animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
            transition={{ type: 'spring', visualDuration: 0.5, bounce: 0.1, delay: step >= 3 ? 0.06 * i : 0 }}>
            <div style={{ font: `400 ${b.value.length > 8 ? 54 : 95}px/1 var(--font-pixel)`, letterSpacing: '-0.02em', color: 'var(--ink)', height: 95, display: 'flex', alignItems: 'flex-end' }}>{b.value}</div>
            <div style={{ marginTop: 14, font: 'var(--t-head-3)', letterSpacing: 'var(--t-head-3-track)', color: 'var(--ink)' }}>{b.caption}</div>
            <div style={{ ...small, marginTop: 4 }}>{b.who}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ ...small, marginTop: 44 }}>
        From docs/PRODUCT.md. 16/16, 499 ms and 8.1 s come from earlier checks whose output wasn’t kept; Elastic’s questions are staged.
      </div>
    </div>
  )
}

export function Exam() {
  const step = useStep()
  const d = useDialKit('Exam', { barThick: [56, 16, 96, 2], grow: [0.9, 0.2, 2, 0.05] })
  return (
    <div style={{ position: 'absolute', left: M, right: M, top: TOP, bottom: 96, display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>We gave pickje the full exam</h1>
      <div style={{ marginTop: 18 }}><Said lines={LINES} /></div>
      <div style={{ flex: 1, position: 'relative', marginTop: 44 }}>
        <Scene at={0}><HowItWorks /></Scene>
        <Scene at={1}><Score on={step === 1} thick={d.barThick} grow={d.grow} /></Scene>
        <Scene at={2}><Kinds on={step === 2} grow={d.grow} /></Scene>
        <Scene at={3}><Built /></Scene>
      </div>
    </div>
  )
}
