import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Card, Tray, Flow, Stat, Scribble, type Step } from '@design/ui/kit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { Page } from '../../brand/frame'
import { Show, useStep } from '../kit/step'

/** 18 · How we built it. His words (2026-10-25, 4:38 AM, voice): "Show more tech stack related and some of the
    processes used to build this thing." 5 steps.
    0    the stack, layer 1: on your Mac (the native shell: Pickle and Blicky in SwiftUI, the mic, screenpipe's eyes)
    1    layer 2: the talk server, also on the Mac, running one turn at a time
    2    layer 3: the brains and memory, Claude on top, then the six other parts, one job each
    3    the stack clears: how we built it, his words → a spec → click questions → build → a live exam, traced through one
         real thread (spec 0012, Sun 10-25)
    4    the real counts: commits, specs, hours
    Titles, layer subtitles, card jobs and the thread caption are DRAFT (our wording). Every fact is from the pickje repo,
    read-only, 2026-10-25 about 4:43 AM PDT; the command or file is in a comment beside it. Re-run the counts before he
    presents: they grow with every commit. */
export const STACK_STEPS = 5

const TITLE_STACK = 'It runs in 3 layers'                      // DRAFT
const TITLE_BUILD = 'Every spec starts as a sentence'   // DRAFT (true of all 21: each opens with his words verbatim)

/* ── Layer 1 · on your Mac ──
   app/shell/README.md:3-4: "pickje's Mac shell (SwiftPM, no third-party packages): Pickle at the cursor, shake to wake,
   ⌃⌥⌘P to close, the native mic, and Blicky drawn natively in SwiftUI with its mark library and the past-frame card."
   app/eyes/eyes.ts:1-3: "on the local screenpipe API … the only host contacted is screenpipe on localhost." */
const MAC = {
  name: 'On your Mac', sub: 'Swift and SwiftUI, no third-party packages',
  cast: { name: 'Pickle and Blicky', job: 'Drawn natively in SwiftUI, right at your cursor' },
  parts: [
    { name: 'The mic', job: 'Shake to wake, then just talk' },          // shell README: "shake to wake … the native mic"
    { name: 'screenpipe', job: 'The eyes: it records your screen' },    // app/eyes: screenpipe on localhost
  ],
}

/* ── Layer 2 · the talk server ──
   app/service/talk-server.ts:2-7: "the local talk server (J1). Node 25 runs this TypeScript directly … It listens on
   127.0.0.1 only." POST /turn streams "one event per line as it happens (turn.ts)". app/service/turn.ts:1: "one talk
   turn (J1, 'Talk: shake, say, hear a reply')". The 4 lines below are our summary of a turn (DRAFT). */
const SERVER = {
  name: 'The talk server', sub: 'TypeScript on Node 25',
  card: 'One turn at a time',
  turn: ['Your words and the screen', 'Into the right project', 'Claude writes the turn', 'Voice and marks stream back'],
}

/* ── Layer 3 · the brains and memory ── jobs from docs/PRODUCT.md:47-60 and docs/SPONSORS.md; the machine line under each
   name is from the code (grep -rhoE over ~/code/pickje/app):
   claude-opus-5-5 ×8, claude-haiku-5-5 ×12 · sonic-3.6 ×3 (app/voice) · ink-2 (app/ears/providers/cartesia-ink.ts:5) ·
   @moss-js/moss 1.21.0 (app/memory/package.json:10) · Convex is a local deployment, no account (app/convex/README.md:3-4) ·
   jina-embeddings-v5-text-small, Agent Builder (app/recall/README.md; SPONSORS.md) · @factory/droid-sdk 0.10.0
   (app/service/package.json) · Mana: published as a Mana app (app/mana/README.md, publish.ts). */
const CLAUDE = { name: 'Claude', tech: 'claude-opus-5-5 · claude-haiku-5-5', job: 'Opus writes every line Blicky says and picks every mark; Haiku runs Pickle’s quick calls' }
const BRAINS = [
  { name: 'Cartesia', tech: 'sonic-3.6 · ink-2', job: 'Two voices, and the ears' },
  { name: 'Moss', tech: 'moss 1.21', job: 'Routes each turn; live context' },
  { name: 'Convex', tech: 'local', job: 'The live record on the card' },
  { name: 'Elastic', tech: 'Agent Builder', job: 'Recalls what you did days ago' },
  { name: 'Factory', tech: 'droid-sdk', job: 'Droid does the project’s work' },
  { name: 'Mana', tech: 'a Mana app', job: 'The idea log a judge can open' },
]

/* ── How we built it: one real thread, spec 0012 ──
   His words: docs/spec/0012-chaos-to-clarity-scenario.md:3, "When: 2026-10-25 at about 12:01 AM PDT"; verbatim "shoudl we
   create it as a folder and have each fucnationality be one thing?" (spelling fixed on the slide: should, functionality).
   The spec: commit d690246, 10-25 00:01, "spec 0012: his chaos-to-clarity scenario … verbatim".
   His click: spec 0012 "His clicks, 2026-10-25 at about 12:08 AM PDT": "Split now, no behavior change" (commit a65fae9, 00:08).
   The build: commit d808ae9, 10-25 00:20, "AppController split into a folder, one job per file, no behavior change".
     (git -C ~/code/pickje log --format='%h %ad %s' --date=format:'%m-%d %H:%M' | grep -i appcontroller)
   The live exam: demo/chemistry/exam/exam.ts header (the real app on his real screen: Preview, the real pointer, `say`,
   graded by a judge from screenpipe's frames); docs/evals/2026-10-24-2/summary.txt: "36 step(s) run, 33 judged; judge
   claude-opus-5-5". The exam is the gate for every change; it isn't a test of this one split. */
const FLOW: Step[] = [
  { label: 'Words, verbatim', value: '12:01 AM' },
  { label: 'A spec', value: '12:01 AM' },
  { label: 'Click questions', value: '12:08 AM' },
  { label: 'Build', value: '12:20 AM' },
  { label: 'Live exam', value: 'real screen' },
]
const THREAD = [
  '“Should we create it as a folder and have each functionality be one thing?”',
  'docs/spec/0012: the words first, then the questions',
  'The click: “Split now, no behavior change”',
  'd808ae9: AppController split into a folder, one job per file',
  'Real app, real pointer; Opus grades what screenpipe saw',
]
const THREAD_CAPTION = 'One real thread, Sunday just after midnight: 19 minutes from the question to the commit.'   // DRAFT · 12:01 → 00:20

/* ── The counts ── run 2026-10-25 4:43 AM PDT:
   git -C ~/code/pickje log --oneline | wc -l                         → 271
   ls ~/code/pickje/docs/spec/*.md | wc -l                            → 21   (ls docs/spec | wc -l says 22: one is the design-01-refs folder)
   git -C ~/code/pickje log --reverse --format=%ad --date=iso | head -1 → 2026-10-24 00:05:22 -0700
   git -C ~/code/pickje log -1 --format=%ad --date=iso                → 2026-10-25 04:37:16 -0700   → 28.5 h
   docs/PRODUCT.md:3-4: "The repo started empty on 10-23 after 18:00 PDT". */
const COUNTS = [
  { value: '271', caption: 'commits' },
  { value: '21', caption: 'specs, each starting with the words' },
  { value: '28 h', caption: 'from the first commit to the latest' },
]
const COUNT_NOTE = 'The repo started empty after Friday 6 PM. Counted Sunday 4:43 AM.'

// geometry: the body under the title is about 694 px tall (1080 − 170 − 96 − the title − 56) and 1728 wide
const H = 680, LABEL_H = 77, TRAY_H = H - LABEL_H
const MAC_W = 450, SRV_W = 330, GAP = 72
const SRV_X = MAC_W + GAP, BR_X = SRV_X + SRV_W + GAP, BR_W = 1728 - BR_X
const IN = TRAY_H - 48                                    // a tray's inner height (padding 24)
const PART_H = 130, CAST_H = IN - 2 * PART_H - 32
const CLAUDE_H = 150, BRAIN_H = (IN - CLAUDE_H - 3 * 16) / 3, BRAIN_W = (BR_W - 48 - 16) / 2
const PILL_W = 276, PILL_STEP = PILL_W + 80               // Flow: each pill, then 10 + 60 + 10 for the arrow

function Layer({ name, sub }: { name: string; sub: string }) {
  return (
    <div style={{ height: LABEL_H }}>
      <div style={{ font: '600 31px/1.15 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{name}</div>
      <div style={{ font: 'var(--t-head-4)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{sub}</div>
    </div>
  )
}

function Part({ name, job, tech }: { name: string; job: string; tech?: string }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ font: '600 27px/1.1 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)', whiteSpace: 'nowrap' }}>{name}</span>
        {tech && <span style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{tech}</span>}
      </div>
      <div style={{ font: '400 22px/1.3 var(--font-head)', color: 'var(--text-secondary)' }}>{job}</div>
    </>
  )
}

function Arrow({ x }: { x: number }) {
  return <div style={{ position: 'absolute', left: x + 8, top: LABEL_H + TRAY_H / 2 - 14, width: GAP - 16 }}><Scribble kind="arrow" w={GAP - 16} seed={x} /></div>
}

export function Stack() {
  const step = useStep()
  const d = useDialKit('Stack', { stagger: [0.09, 0, 0.3, 0.01], cast: [104, 60, 140, 1] })
  const title = step < 3 ? TITLE_STACK : TITLE_BUILD
  return (
    <Page title={
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={title} style={{ display: 'inline-block' }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.24 }}>{title}</motion.span>
      </AnimatePresence>
    }>
      <div style={{ position: 'relative', height: H }}>
        {/* ── presses 0–2: the stack, one layer per press ── */}
        <Show until={2} style={{ position: 'absolute', inset: 0 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: MAC_W }}>
            <Layer name={MAC.name} sub={MAC.sub} />
            <Tray width={MAC_W} height={TRAY_H} layout={{ flexDirection: 'column' }}>
              <Card width={MAC_W - 48} height={CAST_H} lifted={step === 0}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: d.cast + 6 }}>
                  <Pickle pose="wave" height={d.cast} />
                  <Blicky pose="sketch" height={d.cast} />
                </div>
                <div style={{ marginTop: 'auto', display: 'grid', gap: 8 }}><Part name={MAC.cast.name} job={MAC.cast.job} /></div>
              </Card>
              {MAC.parts.map((p) => <Card key={p.name} width={MAC_W - 48} height={PART_H} lifted={step === 0}><Part {...p} /></Card>)}
            </Tray>
          </div>

          <Show from={1}>
            <Arrow x={MAC_W} />
            <div style={{ position: 'absolute', left: SRV_X, top: 0, width: SRV_W }}>
              <Layer name={SERVER.name} sub={SERVER.sub} />
              <Tray width={SRV_W} height={TRAY_H} layout={{ flexDirection: 'column' }}>
                <Card width={SRV_W - 48} height={IN} lifted={step === 1}>
                  <div style={{ font: '600 27px/1.15 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{SERVER.card}</div>
                  <div style={{ display: 'grid', gap: 30, marginTop: 18 }}>
                    {SERVER.turn.map((t, i) => (
                      <div key={t} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', alignItems: 'baseline' }}>
                        <span style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>{i + 1}</span>
                        <span style={{ font: '400 22px/1.3 var(--font-head)', color: 'var(--text-secondary)' }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto', font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>on your Mac: 127.0.0.1 only</div>
                </Card>
              </Tray>
            </div>
          </Show>

          <Show from={2}>
            <Arrow x={SRV_X + SRV_W} />
            <div style={{ position: 'absolute', left: BR_X, top: 0, width: BR_W }}>
              <Layer name="The brains and memory" sub="7 parts, each doing one job" />
              <Tray width={BR_W} height={TRAY_H} layout={{ flexWrap: 'wrap', alignContent: 'flex-start' }}>
                <Card width={BR_W - 48} height={CLAUDE_H} lifted={step === 2}><Part {...CLAUDE} /></Card>
                {BRAINS.map((b) => <Card key={b.name} width={BRAIN_W} height={BRAIN_H}><Part {...b} /></Card>)}
              </Tray>
            </div>
          </Show>
        </Show>

        {/* ── presses 3–4: how we built it, then the counts ── */}
        <Show from={3} style={{ position: 'absolute', inset: 0 }}>
          <Flow steps={FLOW} w={PILL_W} h={120} />
          {THREAD.map((t, i) => (
            <motion.p key={t} initial={false} animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.1, delay: step === 3 ? 0.15 + i * d.stagger : 0 }}
              style={{ position: 'absolute', left: i * PILL_STEP, top: 148, width: PILL_W + 40, margin: 0,
                font: i === 0 ? '400 23px/1.38 var(--font-second)' : '400 22px/1.38 var(--font-head)', color: i === 0 ? 'var(--pickle-ink)' : 'var(--text-secondary)' }}>
              {t}
            </motion.p>
          ))}
          <Show from={3} style={{ position: 'absolute', left: 0, top: 316 }}>
            <p style={{ margin: 0, font: 'var(--t-head-3)', color: 'var(--ink)' }}>{THREAD_CAPTION}</p>
          </Show>
        </Show>

        <Show from={4} style={{ position: 'absolute', left: 0, right: 0, top: 418 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {COUNTS.map((c) => <Stat key={c.value} value={c.value} caption={<span style={{ font: 'var(--t-head-3)' }}>{c.caption}</span>} size="var(--deck-giant)" />)}
          </div>
          <p style={{ margin: '26px 0 0', font: 'var(--t-head-4)', color: 'var(--text-muted)' }}>{COUNT_NOTE}</p>
        </Show>
      </div>
    </Page>
  )
}
