import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Page } from '../../brand/frame'
import { useStep } from '../kit/step'

/** 15 · Fifteen verbs: what pickje can do, and which sponsor track each verb runs on. 10 steps.
    His brief (2026-10-25, 4:38 AM, voice; spelling fixed): "we originally created fifteen verbs. I think here we should
    flush out how we have fifteen verbs of what it's capable of doing, and how each sponsor track is associated with each."

    Source of truth: docs/VERBS.md (the table: group, verb, the forge's meaning, in pickje, sponsor, status). The verbs come
    from the hardened forge (~/code/clicky-module/_bmad-output/initiative-blicky/forge-blicky/forge-blicky.md, 10-17:
    "Fifteen verbs, one action each"); the sponsor column is his plan (docs/spec/0005-sponsors.md, his clicks 10-24) and
    docs/SPONSORS.md. Attune, Gauge and Learn are "out" for the demo (docs/SPEC.md V1), so they sit quiet and dashed.

    0  all 15 verbs in their 5 groups, nothing lit
    1  Cartesia → Catch (Cartesia Ink, the ear) and Show (two voices, Pickle and Blicky)        VERBS.md rows Catch, Show
    2  Moss → Recall (every turn) and Route (the routing query every turn)                      rows Recall, Route
    3  Convex → Hold (every Pickle step one transaction; the card renders live from it)         row Hold
    4  Elastic → Bring back (re-prime from session history after a gap)                        row Bring back
    5  Factory → Hand over (Factory Droid: hand-overs and spoken next steps on the Droid SDK)   row Hand over
    6  Anthropic → Teach (Claude writes every turn) and Push (partly: the tutor's step rule)    rows Teach, Push; last lines
    7  Mana → Curate (the idea log as a Mana app judges can open)                               row Curate
    8  Microsoft → Measure (Built for the Real World: measurable usefulness)                     row Measure
    9  all lit: "The whole product runs on Anthropic, and is the Microsoft entry."              VERBS.md's last 2 lines

    Ground has no sponsor: it runs on Jev (TypeSafe, not a sponsor; the forge: "Ground and Teach run on Jev"). It lights only
    on the last press, with "Jev, not a sponsor" on its card, because Claude (the brain's box) runs it too (VERBS.md row Ground).

    DRAFT (ours, not his): the title, every card's one-line meaning (the forge's meaning, shortened and turned to "you"), and
    each press's line under the grid (paraphrased from that sponsor's row in VERBS.md). The last line is VERBS.md's, trimmed. */
export const VERBS_STEPS = 10

type Verb = { verb: string; meaning: string; out?: boolean; sponsor?: string; at?: number }
type Group = { name: string; verbs: Verb[] }

/** at = the press that lights it (its sponsor's step). Ground and the out verbs have none. */
const GROUPS: Group[] = [
  { name: 'Senses', verbs: [
    { verb: 'Catch', meaning: 'your words, with their moment', sponsor: 'Cartesia Ink', at: 1 },
    { verb: 'Ground', meaning: 'find the thing on your screen', sponsor: 'Jev, not a sponsor' },
    { verb: 'Attune', meaning: 'out for the demo', out: true },
  ] },
  { name: 'Remembering', verbs: [
    { verb: 'Hold', meaning: 'your intent, per project', sponsor: 'Convex', at: 3 },
    { verb: 'Recall', meaning: 'what you said before', sponsor: 'Moss', at: 2 },
    { verb: 'Bring back', meaning: 'pick up again after a gap', sponsor: 'Elastic', at: 4 },
  ] },
  { name: 'Voice', verbs: [
    { verb: 'Show', meaning: 'show what’s happening, where', sponsor: 'Cartesia', at: 1 },
    { verb: 'Route', meaning: 'your words to the right project', sponsor: 'Moss', at: 2 },
    { verb: 'Hand over', meaning: 'the best prompt to the builder', sponsor: 'Factory Droid', at: 5 },
  ] },
  { name: 'Reflection', verbs: [
    { verb: 'Gauge', meaning: 'out for the demo', out: true },
    { verb: 'Push', meaning: 'push past the ask', sponsor: 'Anthropic', at: 6 },
    { verb: 'Teach', meaning: 'show you how, on your screen', sponsor: 'Anthropic', at: 6 },
  ] },
  { name: 'Sleep', verbs: [
    { verb: 'Curate', meaning: 'a tidy record you can share', sponsor: 'Mana', at: 7 },
    { verb: 'Learn', meaning: 'out for the demo', out: true },
    { verb: 'Measure', meaning: 'each verb against the baseline', sponsor: 'Microsoft', at: 8 },
  ] },
]

/** The line under the grid, one per press. Sponsor names exactly as VERBS.md's sponsor column; the lines are DRAFT. */
const LINES: Record<number, { sponsor?: string; line: string }> = {
  1: { sponsor: 'Cartesia', line: 'Ink listens; two voices, Pickle and Blicky, answer.' },
  2: { sponsor: 'Moss', line: 'Every turn: what you said before, and which project it’s for.' },
  3: { sponsor: 'Convex', line: 'Every Pickle step is one transaction; the card renders live from it.' },
  4: { sponsor: 'Elastic', line: 'After a gap, it re-primes from your session history.' },
  5: { sponsor: 'Factory', line: 'Droid does each project’s work: every hand-over and next step.' },
  6: { sponsor: 'Anthropic', line: 'Claude writes every turn, teaches step by step, and runs the whole brain.' },
  7: { sponsor: 'Mana', line: 'The idea log, as a Mana app the judges can open.' },
  8: { sponsor: 'Microsoft', line: 'Built for the Real World: every verb counted against the baseline.' },
  9: { line: 'The whole product runs on Anthropic, and is the Microsoft entry.' },
}
const FINAL = VERBS_STEPS - 1

export function Verbs() {
  const step = useStep()
  const d = useDialKit('Verbs', {
    cardHeight: [150, 110, 200, 2],
    gap: [16, 8, 40, 2],
    lift: [6, 0, 20, 1],
    lit: { type: 'select', options: ['moss-200', 'moss-100', 'moss-300', 'sky-100'], default: 'moss-200' },
  })
  const line = LINES[step]

  return (
    <Page title="15 verbs, each with a job">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: 32 }}>
        {GROUPS.map((g) => (
          <div key={g.name}>
            <div style={{ font: 'var(--t-head-3)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 18 }}>{g.name}</div>
            <div style={{ display: 'grid', gap: d.gap }}>
              {g.verbs.map((v) => <VerbCard key={v.verb} v={v} step={step} height={d.cardHeight} lift={d.lift} lit={`var(--${d.lit})`} />)}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 48 }}>
        <AnimatePresence mode="wait" initial={false}>
          {line && (
            <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', visualDuration: 0.35, bounce: 0.1 }}
              style={{ display: 'flex', alignItems: 'baseline', gap: 22, whiteSpace: 'nowrap' }}>
              {line.sponsor && <span style={{ font: 'var(--t-head-2)', fontWeight: 700, color: 'var(--ink)' }}>{line.sponsor}</span>}
              <span style={step === FINAL
                ? { font: 'var(--t-head-2)', fontWeight: 600, color: 'var(--ink)' }
                : { font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{line.line}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  )
}

/** One verb: its name, its meaning, and (once its sponsor is named) the sponsor at the foot.
    lit = its sponsor's press, or the last press for every verb in the demo. Out verbs stay dashed and quiet. */
function VerbCard({ v, step, height, lift, lit: litColor }: { v: Verb; step: number; height: number; lift: number; lit: string }) {
  const lit = !v.out && (step === v.at || step === FINAL)
  const named = !v.out && (v.at !== undefined ? step >= v.at : step === FINAL)
  return (
    <motion.div initial={false} animate={{ y: lit ? -lift : 0 }} transition={{ type: 'spring', visualDuration: 0.4, bounce: 0.15 }}
      style={{ position: 'relative', height, borderRadius: 18, boxSizing: 'border-box', padding: '18px 22px', display: 'flex', flexDirection: 'column',
        background: v.out ? 'transparent' : 'var(--surface-plane)',
        border: v.out ? '2px dashed var(--silver-400)' : 'none' }}>
      {/* the lit fill fades over the plane, so the text never changes colour */}
      {!v.out && (
        <motion.div initial={false} animate={{ opacity: lit ? 1 : 0 }} transition={{ duration: 0.25 }}
          style={{ position: 'absolute', inset: 0, borderRadius: 18, background: litColor }} />
      )}
      <div style={{ position: 'relative', font: 'var(--t-head-2)', fontWeight: 650, letterSpacing: '-0.01em', color: v.out ? 'var(--text-muted)' : 'var(--ink)' }}>{v.verb}</div>
      <div style={{ position: 'relative', marginTop: 6, font: '400 20px/1.3 var(--font-head)', color: v.out ? 'var(--text-muted)' : 'var(--text-secondary)' }}>{v.meaning}</div>
      {v.sponsor && (
        <motion.div initial={false} animate={{ opacity: named ? 1 : 0 }} transition={{ duration: 0.25 }}
          style={{ position: 'relative', marginTop: 'auto', font: '600 20px/1 var(--font-head)', color: lit ? 'var(--pickle-ink)' : 'var(--text-secondary)' }}>
          {v.sponsor}
        </motion.div>
      )}
    </motion.div>
  )
}
