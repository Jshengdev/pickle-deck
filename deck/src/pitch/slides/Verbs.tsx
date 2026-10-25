import { Fragment, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Stat } from '@design/ui/kit'
import { Page } from '../../brand/frame'
import { useStep } from '../kit/step'

/** 16 · Fifteen verbs: the whole product is built on 15 verbs, then sponsor by sponsor, what carries each verb. 9 steps.

    His words (2026-10-25, ~4:45 AM, voice; spelling fixed): "we originally created fifteen verbs. I think here we should
    flush out how we have fifteen verbs of what it's capable of doing, and how each sponsor track is associated with each."
    His words (2026-10-25, ~5:20 AM, run-through; verbatim): "more specifically, go into the fifteen verbs. Show how the
    entire product is built on these fifteen verbs. go more into detail on what that specifically means for the UX. But
    then, when we're introducing how we're using each sponsor, be very specific about how we're optimizing it and how the
    sponsor is the backbone of this specific thing. Talk metrics, talk everything super important, very technical, and how
    it's being applied and why it's a core part of the repo. [...] But for the anthropic, anthropic is just what we use to
    run everything. and then Microsoft is be able to like measure against real world tasks."

    0  all 15 verbs in 5 groups, each with what it means for you (the UX line). Attune, Gauge, Learn: out for the demo.
    1  Cartesia → Catch, Show        2  Moss → Recall, Route       3  Convex → Hold       4  Elastic → Bring back
    5  Factory → Hand over           6  Mana → Curate
    7  Anthropic: runs everything (all 12 verbs in the demo light, Ground included; Ground's chip: "Jev, not a sponsor")
    8  Microsoft: the whole product, measured against real-world tasks (all stay lit)
    From press 1 the grid shrinks to chips (verb + its sponsor once named) and a panel below shows the sponsor: why it's
    the backbone, how it's built and optimised (packages, models, mechanism), its numbers, and where it lives in the repo.

    Sources. The verb ↔ sponsor map: docs/VERBS.md (sponsor column; Push and Teach → Anthropic; Ground → Jev, TypeSafe,
    not a sponsor; Attune, Gauge, Learn out per docs/SPEC.md V1). Note: the forge line inside VERBS.md says "Ground and
    Teach run on Jev"; the sponsor column (his plan) puts Teach on Anthropic, and that's what this slide follows.
    Every panel's mechanism and number: docs/PRODUCT.md, "How pickje uses its sponsors" (line numbers per panel below),
    with docs/SPONSORS.md for the jobs. Package versions checked read-only in ~/code/pickje/app/<folder>/package.json (convex
    1.48.0, @moss-js/moss 1.21.0, @factory/droid-sdk 0.10.0); model ids in app/brain/providers/anthropic.ts
    (claude-opus-5-5, claude-haiku-5-5), app/voice/cartesia.ts (sonic-3.6), app/ears/providers/cartesia-ink.ts (ink-2).
    Caveats kept on the slide: outputs not kept, staged data, headless, off by default, not passed.

    DRAFT (ours, not his): the title; every UX line; every panel's "why" sentence and bullet wording (facts from PRODUCT.md,
    shortened). Character name: the deck says Pickle; PRODUCT.md now writes Pickje for the same character. */
export const VERBS_STEPS = 9
const ANTHROPIC = 7
const MICROSOFT = 8

type Verb = { verb: string; ux: string; out?: boolean; sponsor?: string; at?: number }
type Group = { name: string; verbs: Verb[] }

/** ux = what the verb means for you (DRAFT, from VERBS.md's meaning and PRODUCT.md's "For the student" lines).
    at = the press that names its sponsor. Ground has no sponsor press: it lights with Anthropic's "runs everything". */
const GROUPS: Group[] = [
  { name: 'Senses', verbs: [
    { verb: 'Catch', ux: 'It hears you, and knows what you were looking at when you said it.', sponsor: 'Cartesia Ink', at: 1 },
    { verb: 'Ground', ux: 'Point or circle, and it finds that exact thing on your screen.', sponsor: 'Jev, not a sponsor', at: ANTHROPIC },
    { verb: 'Attune', ux: 'Out for the demo.', out: true },
  ] },
  { name: 'Remembering', verbs: [
    { verb: 'Hold', ux: 'Each project remembers why, what’s done and what’s next.', sponsor: 'Convex', at: 3 },
    { verb: 'Recall', ux: 'It remembers what you said before, and when you said it.', sponsor: 'Moss', at: 2 },
    { verb: 'Bring back', ux: 'Come back days later, and it picks up where you stopped.', sponsor: 'Elastic', at: 4 },
  ] },
  { name: 'Voice', verbs: [
    { verb: 'Show', ux: 'Blicky draws on your page and says each step as the mark lands.', sponsor: 'Cartesia', at: 1 },
    { verb: 'Route', ux: 'Switch assignments and just talk: it lands in the right project.', sponsor: 'Moss', at: 2 },
    { verb: 'Hand over', ux: 'Say yes, and the work gets done, like a new practice set.', sponsor: 'Factory Droid', at: 5 },
  ] },
  { name: 'Reflection', verbs: [
    { verb: 'Gauge', ux: 'Out for the demo.', out: true },
    { verb: 'Push', ux: 'It nudges you one step past what you asked.', sponsor: 'Anthropic', at: ANTHROPIC },
    { verb: 'Teach', ux: 'It shows you how on your own worksheet, one step at a time.', sponsor: 'Anthropic', at: ANTHROPIC },
  ] },
  { name: 'Sleep', verbs: [
    { verb: 'Curate', ux: 'Your ideas and decisions, kept in one log you can share.', sponsor: 'Mana', at: 6 },
    { verb: 'Learn', ux: 'Out for the demo.', out: true },
    { verb: 'Measure', ux: 'Every verb is counted against a baseline, so you know it helps.', sponsor: 'Microsoft', at: MICROSOFT },
  ] },
]

type Panel = { sponsor: string; role: string; why: string; how: [string, string][]; stats: { value: string; caption: string }[]; note?: string; repo: string }

/** One panel per sponsor press. `backticks` render as code. Every number keeps its caveat. */
const PANELS: Record<number, Panel> = {
  // PRODUCT.md:115-161 (Cartesia). 499 ms: barge-in through the app's own code, a file as the mic, a stand-in voice,
  // median; "metrics.md; output not kept" (:152-153). 183 ms: Cartesia's text → first audio for Blicky, median, live exam
  // run 2, recomputed from results.json (:145-147). Echo-cancellation limit: :158-159.
  1: {
    sponsor: 'Cartesia', role: 'the backbone of Catch and Show',
    why: 'The whole conversation is voice: Ink is the ear, Sonic speaks for both characters.',
    how: [
      ['Ink 2 hears you.', 'Streaming `ink-2` at 16 kHz; a 7 s end timeout keeps a mid-thought pause from ending your turn.'],
      ['Sonic 3.6 speaks.', 'One socket kept open between turns, two contexts a turn, two cloned voices; Blicky streams line by line.'],
      ['Pen and voice in sync.', 'Word timestamps hold each line until its mark lands; your voice cancels Blicky mid-line.'],
    ],
    stats: [
      { value: '499 ms', caption: 'from your first sound to Blicky going quiet (median; output not kept)' },
      { value: '183 ms', caption: 'Cartesia’s own time from a line’s text to its first audio (median, live exam)' },
    ],
    note: 'Live, echo cancellation failed to start, so a shake cuts Blicky off instead.',
    repo: 'app/voice/cartesia.ts · app/ears/providers/cartesia-ink.ts · app/service/voiceturn.ts',
  },
  // PRODUCT.md:163-213 (Moss). 6–7 ms: Moss deciding alone, 8 of 16 projects-check turns, median over two runs
  // (VERBS.md Route row; PRODUCT :197-200, "6 ms"; the card shows "routed by moss · 7 ms"); 1,332 ms with Moss off;
  // 16/16 right either way; "this check needs lab pages from outside the repo and its output wasn't kept".
  2: {
    sponsor: 'Moss', role: 'the backbone of Route and Recall',
    why: 'The fast memory both characters decide with, inside the talk server’s own process.',
    how: [
      ['Two warm sessions.', '`@moss-js/moss` 1.21.0 on `moss-minilm`: every project, and 8 hours of screen text re-indexed every 10 s.'],
      ['Route.', '3 hybrid queries a sentence (alpha 0.6, metadata filters); Moss decides alone when it’s clear, else Claude picks from its top 3.'],
      ['Recall.', 'Up to 4 older lines of the project go into Blicky’s brief; a shared session tells Droid what’s drawn.'],
    ],
    stats: [
      { value: '6–7 ms', caption: 'to route when Moss decides alone (median, 2 runs), vs 1,332 ms for a Claude call' },
      { value: '16/16', caption: 'sentences routed right, 8 by Moss alone (projects check; output not kept)' },
    ],
    repo: 'app/memory/route.ts · app/memory/live.ts · app/memory/context.ts',
  },
  // PRODUCT.md:215-246 (Convex). 6 ms median (5–9 ms), three runs on 10-24, one run's output kept, through the app's own
  // TalkStream and LiveCard code run headless (:238-241). 864 ms: a close made while Convex was stopped, back on the card
  // after it returned (docs/evals/receipts/convex-live-check.log).
  3: {
    sponsor: 'Convex', role: 'the backbone of Hold',
    why: 'Pickle’s record: every step is one transaction, and the card renders live from it.',
    how: [
      ['Local, no account.', '`convex` 1.48.0, self-hosted on 127.0.0.1: 7 tables, 12 indexes.'],
      ['One mutation a step.', '`turns:close` writes the card, the 3 hot files, the memlog line and the notes in one transaction.'],
      ['One live query.', '`card:now`, held through `ConvexClient.onUpdate` and streamed to the Mac app on `GET /watch`.'],
    ],
    stats: [
      { value: '6 ms', caption: 'from Pickle’s write to the card’s callback (median, 5–9 ms over 3 runs)' },
      { value: '864 ms', caption: 'for a close made while Convex was down to reach the card once it was back' },
    ],
    note: 'Measured headless, through the app’s own card code.',
    repo: 'app/convex/convex/turns.ts · app/convex/live.ts · app/convex/record.ts',
  },
  // PRODUCT.md:248-293 (Elastic). 18 staged questions about three earlier days: hybrid hit@3 15/18 and 16/18 in the two
  // saved runs; the brief alone holds the answer for 9 (:279-282). Hybrid round trip median 185–224 ms; agent 5/5 right,
  // median 10.1–11.1 s (:283-284). Guard: staged/test data only, his real words only after his yes, never screenshots (:274-276).
  4: {
    sponsor: 'Elastic', role: 'the backbone of Bring back',
    why: 'The library across days: what you said and decided, so a session picks up where you stopped.',
    how: [
      ['Serverless index.', '`pickje-recall`: BM25 text plus `semantic_text` on `.jina-embeddings-v5-text-small`, written at each close.'],
      ['Bring back.', 'After an 8-hour gap, an RRF retriever (BM25 + semantic, filtered to the project) primes Blicky’s brief.'],
      ['Agent Builder.', 'Agent `pickle-archive` with a hybrid ES|QL tool (`FORK … | FUSE`) and 4 more ES|QL tools.'],
    ],
    stats: [
      { value: '15/18', caption: 'past questions found in the top 3 (16/18 on a second run); the brief alone holds 9' },
      { value: '185–224 ms', caption: 'hybrid round trip (medians); the agent answered 5/5 right in 10.1 s' },
    ],
    note: 'Staged data only: his own words go up only after his yes, screenshots never.',
    repo: 'app/recall/elastic.ts',
  },
  // PRODUCT.md:295-336 (Factory). Hand-over 5/5, round trip median 8.1 s ("metrics.md; those runs' output wasn't kept",
  // :330). Practice set, 3 runs: 33.7, 52.9, 33.3 s; 2,942, 2,431, 2,346 credits; 2–3 molecules + 1 note (:327-328).
  // PICKJE_DROID_NEXT=1, off by default (:65, :310).
  5: {
    sponsor: 'Factory', role: 'the backbone of Hand over',
    why: 'Blicky’s hands: a project’s real work runs on Droid, and every step shows on the card.',
    how: [
      ['Plan first.', '`@factory/droid-sdk` 0.10.0, a session per project in spec mode: it says its plan back, and writes nothing before your yes.'],
      ['Fenced.', 'Droid’s own shell, web and edit tools are off; it writes only through 4 tools pickje serves, inside the folder.'],
      ['Visible.', 'Each step streams into Convex `droid_steps`: the plan, each molecule, then the receipt.'],
    ],
    stats: [
      { value: '8.1 s', caption: 'hand-over round trip, 5/5 done (median; those runs’ output wasn’t kept)' },
      { value: '33–53 s', caption: 'for a practice set: 2–3 molecules from SMILES and a note (3 runs)' },
    ],
    note: 'The practice set runs with `PICKJE_DROID_NEXT=1`, off by default.',
    repo: 'app/service/droid.ts · app/service/droidyes.ts',
  },
  // PRODUCT.md:338-368 (Mana). Published 10-24 ~6 PM after his yes: 36 staged entries over 3 projects, read back 36/36;
  // status read 9:47 PM: not public (docs/evals/receipts/mana-status-2147.json). No code sends his real projects to Mana.
  6: {
    sponsor: 'Mana', role: 'the backbone of Curate',
    why: 'The idea log: each project’s words, decisions and notes, as a Mana app the judges can open.',
    how: [
      ['4 routes, 1 path.', 'Mana’s external API only (`me`, `read`, `update`, `delete`), under `file-system/pickje/idea-log`.'],
      ['One update.', 'Writes the app node (`user_div`, its React from `viewer.js`) and every entry; a read-back must match.'],
      ['Guarded.', 'Only staged entries by “test” go up, and only with the digest he approved.'],
    ],
    stats: [
      { value: '36/36', caption: 'staged entries read back after publishing, over 3 projects' },
    ],
    note: 'Staged demo only, and not public yet: no code sends a real project to Mana.',
    repo: 'app/mana/publish.ts · app/mana/viewer.js',
  },
  // PRODUCT.md:69-113 (Anthropic) and :60. Blicky's cost a turn, median $0.029 over 8 uncached turns → $0.019 over 6 that
  // read the cache (docs/evals/receipts/anthropic-claude-check-17*.json); live exam run 2: $0.030 a turn on the grown
  // prompts, "read $0.019 as the saving, not the price" (:100-103). His words: "anthropic is just what we use to run everything."
  7: {
    sponsor: 'Anthropic', role: 'runs every verb',
    why: 'The whole product runs on Claude.',
    how: [
      ['Opus 5.5', 'writes every line Blicky says and picks every mark it draws, from the screenshot and your words.'],
      ['Haiku 5.5', 'runs Pickle’s quick calls: routing when Moss can’t decide, naming a project, rewriting its memory.'],
    ],
    stats: [
      { value: '$0.019', caption: 'Blicky’s cost a turn with prompt caching, down from $0.029 (medians)' },
    ],
    note: 'That’s the saving, not the price: on the live exam’s longer prompts a turn cost $0.030.',
    repo: 'app/brain/providers/anthropic.ts · app/brain/chain.ts',
  },
  // PRODUCT.md:28-37 and :370-420 (Microsoft); docs/evals/2026-10-24-2/summary.txt: 36 steps run, 33 judged; pass rate
  // 302/485 62%; reveal 33/34, 1 slip; pass bar (80% over 2 runs, no slips) NOT PASSED. The mic failed on every wake in
  // that run, so the words were handed in (PRODUCT :33-34). Fresh problems, 13 kinds of screen, blind: 49–51% (:392).
  // His words: "Microsoft is be able to like measure against real world tasks."
  8: {
    sponsor: 'Microsoft', role: 'the backbone of Measure',
    why: 'The whole product is the entry, measured against real-world tasks.',
    how: [
      ['A live exam.', 'On the real screen: it opens the worksheet, moves the real pointer, circles and shakes; Claude Opus grades each step.'],
      ['Fresh problems.', 'Blicky runs blind on 13 kinds of screen: 49–51% of criteria.'],
      ['A trust line.', 'Every turn says what left the Mac, committed to Convex and shown on the card.'],
    ],
    stats: [
      { value: '36', caption: 'live steps on his real screen over 2 runs, 33 judged against the written rubric' },
      { value: '33/34', caption: 'reveal criteria held: it kept the answer back until asked (1 slip)' },
    ],
    note: 'Latest: 62% vs the 80% bar, not passed. The mic failed, so words were handed in.',
    repo: 'demo/chemistry/judge/ · docs/evals/2026-10-24-2/',
  },
}

/** `code` inside a sentence, set in Geist Mono (the one place mono belongs). */
function rich(text: string): ReactNode {
  return text.split('`').map((part, i) => i % 2
    ? <code key={i} style={{ font: '400 0.9em/1 var(--font-mono)', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{part}</code>
    : <Fragment key={i}>{part}</Fragment>)
}

const LABEL_H = 48      // the group name row
const GAP = 12          // between cards, both sizes

export function Verbs() {
  const step = useStep()
  const d = useDialKit('Verbs', {
    cardHeight: [190, 150, 220, 2],
    chipHeight: [50, 44, 64, 1],
    panelGap: [24, 12, 48, 2],
    lit: { type: 'select', options: ['moss-200', 'moss-100', 'moss-300', 'sky-100'], default: 'moss-200' },
  })
  const compact = step > 0
  const panel = PANELS[step]
  const panelTop = LABEL_H + 3 * d.chipHeight + 2 * GAP + d.panelGap
  const spring = { type: 'spring' as const, visualDuration: 0.45, bounce: 0.1 }

  return (
    <Page title="The whole product is built on 15 verbs">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', columnGap: 32 }}>
        {GROUPS.map((g) => (
          <div key={g.name}>
            <div style={{ height: LABEL_H, font: 'var(--t-head-3)', fontWeight: 600, lineHeight: 1, color: 'var(--text-secondary)' }}>{g.name}</div>
            <div style={{ display: 'grid', gap: GAP }}>
              {g.verbs.map((v) => (
                <VerbCard key={v.verb} v={v} step={step} compact={compact} height={compact ? d.chipHeight : d.cardHeight}
                  chipHeight={d.chipHeight} lit={`var(--${d.lit})`} spring={spring} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <motion.div initial={false} animate={{ opacity: compact ? 1 : 0, y: compact ? 0 : 40 }} transition={{ ...spring, delay: compact ? 0.28 : 0 }}
        style={{ position: 'absolute', left: 0, right: 0, top: panelTop, bottom: 0, borderRadius: 28, background: 'var(--surface-plane)', overflow: 'hidden', pointerEvents: compact ? 'auto' : 'none' }}>
        <AnimatePresence mode="wait" initial={false}>
          {panel && (
            <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', visualDuration: 0.32, bounce: 0.08 }}
              style={{ position: 'absolute', inset: 0, padding: '34px 40px', display: 'grid', gridTemplateColumns: '380px 1fr 470px', columnGap: 44 }}>
              <PanelBody p={panel} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Page>
  )
}

function PanelBody({ p }: { p: Panel }) {
  return (
    <>
      <div>
        <div style={{ font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)' }}>{p.sponsor}</div>
        <div style={{ marginTop: 6, font: '500 22px/1.3 var(--font-head)', color: 'var(--pickle-ink)' }}>{p.role}</div>
        <p style={{ margin: '26px 0 0', font: 'var(--t-second-3)', color: 'var(--ink)' }}>{p.why}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'grid', gap: 16 }}>
          {p.how.map(([lead, text]) => (
            <p key={lead} style={{ margin: 0, font: '400 22px/1.4 var(--font-head)', color: 'var(--text-secondary)' }}>
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}>{lead}</b> {rich(text)}
            </p>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 16, font: '400 20px/1.45 var(--font-mono)', color: 'var(--text-secondary)' }}>{p.repo}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {p.stats.map((s) => <Stat key={s.value} value={s.value} caption={s.caption} size="61px" />)}
        {p.note && <div style={{ marginTop: 'auto', font: '400 20px/1.4 var(--font-head)', color: 'var(--text-muted)' }}>{rich(p.note)}</div>}
      </div>
    </>
  )
}

/** One verb. Full size on press 0 (the verb and what it means for you); a chip after (the verb, and its sponsor once
    named). Lit = its sponsor's press, or every verb in the demo from Anthropic's press on. Out verbs stay dashed and quiet. */
function VerbCard({ v, step, compact, height, chipHeight, lit: litColor, spring }: {
  v: Verb; step: number; compact: boolean; height: number; chipHeight: number; lit: string; spring: object
}) {
  const lit = !v.out && (step === v.at || step >= ANTHROPIC)
  const named = !v.out && v.at !== undefined && step >= v.at
  const verbSize = compact ? 23 : 31
  return (
    <motion.div initial={false} animate={{ height, borderRadius: compact ? 14 : 18 }} transition={spring}
      style={{ position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
        background: v.out ? 'transparent' : 'var(--surface-plane)', border: v.out ? '2px dashed var(--silver-400)' : 'none' }}>
      {!v.out && (
        <motion.div initial={false} animate={{ opacity: lit ? 1 : 0 }} transition={{ duration: 0.25 }}
          style={{ position: 'absolute', inset: 0, background: litColor }} />
      )}
      <motion.div initial={false} animate={{ fontSize: verbSize, top: compact ? (chipHeight - verbSize * 1.2) / 2 - (v.out ? 2 : 0) : 18 }} transition={spring}
        style={{ position: 'absolute', left: 20, fontFamily: 'var(--font-head)', fontWeight: 650, lineHeight: 1.2, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
          color: v.out ? 'var(--text-muted)' : 'var(--ink)' }}>{v.verb}</motion.div>
      <motion.div initial={false} animate={{ opacity: compact ? 0 : 1 }} transition={{ duration: 0.2 }}
        style={{ position: 'absolute', left: 20, right: 18, top: 18 + 31 * 1.2 + 8, font: '400 21px/1.35 var(--font-head)', color: v.out ? 'var(--text-muted)' : 'var(--text-secondary)' }}>
        {v.ux}
      </motion.div>
      {(v.out || v.sponsor) && (
        <motion.div initial={false} animate={{ opacity: compact && (v.out || named) ? 1 : 0 }} transition={{ duration: 0.25 }}
          style={{ position: 'absolute', right: 18, top: v.out ? -2 : 0, height: chipHeight, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap',
            font: `${v.out ? 400 : 600} 20px/1 var(--font-head)`, color: v.out ? 'var(--text-muted)' : lit ? 'var(--pickle-ink)' : 'var(--text-secondary)' }}>
          {v.out ? 'out for the demo' : v.sponsor}
        </motion.div>
      )}
    </motion.div>
  )
}
