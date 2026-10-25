import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Card, Tray } from '@design/ui/kit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { Page, span } from '../../brand/frame'
import { useStep, toMotion } from '../kit/step'

/** 18 · How we built it: the technical breakdown, one layer per press. 4 steps.
    His words (2026-10-25, about 4:45 AM, voice): "Show more tech stack related and some of the processes used to build
    this thing." His run-through (about 5:20 AM, voice): "then go into more specific technical breakdown of Mac. Talk
    server and then the brains and memory. And then show how, and then we don't need the each spec starts as a sentence.
    We don't need the whatever." So the process thread and the counts are gone.
    0    the stack: 3 layers top to bottom (the way a turn flows), each with its parts named
    1    On your Mac zooms in (the other two stay as thin bars): the SwiftUI shell's real pieces and their files
    2    The talk server zooms in: the turn, step by step, with its real files
    3    The brains and memory zoom in: which model does what, then the six other parts with their package names
    The title, layer subtitles and every card's line are DRAFT (our wording). Every name, file and package is from the
    pickje repo, read-only, 2026-10-25; the source is in a comment beside each. No metrics on this slide. */
export const STACK_STEPS = 4

const TITLE = 'It runs in 3 layers'   // DRAFT

type Part = { n: string; f?: string; j: string; cast?: boolean }
type Layer = { name: string; sub: string; run?: string; slim: string; over: { n: string; j: string }[]; detail: Part[] }

/* ── Layer 1 · on your Mac ── app/shell (SwiftPM). README.md:3-4: "pickje's Mac shell (SwiftPM, no third-party packages):
   Pickle at the cursor, shake to wake, ⌃⌥⌘P to close, the native mic, and Blicky drawn natively in SwiftUI".
   - Characters.swift:1-4: "Pickle and Blicky as he drew them … Redrawn here as vectors, measured off his two images, so they
     stay crisp at any size and can animate."
   - PickjeCore/ShakeDetector.swift (left/right reversals in a window, a minimum speed and distance); PickjeCore/CircleDetector
     .swift: "A small circle drawn with the pointer, around something he wants explained".
   - PickjeEars/Capture.swift: "AVAudioEngine reads the default input"; PickjeCore/Addressed.swift (README "After a shake, or
     its name"): only speech that began just after his shake, or that names Blicky or Pickle, gets a turn.
   - PickjeCore/Marks.swift: "Blicky's mark library … Pure geometry, no AppKit, so shakecheck can unit-test every path";
     marks (grep 'name = "'): arrow box curve cut dots highlight label panel place ring underline.
   - PickjeCore/BeatGate.swift (README, Talk step 3): "The voice waits for its mark … a say line and its audio go out only once
     every draw written before it has its ink".
   - app/eyes/eyes.ts:1-3: "on the local screenpipe API … the only host contacted is screenpipe on localhost"; the turn takes
     screenpipe's newest frame (service README, `screen: "now"`). */
const MAC: Layer = {
  name: 'On your Mac', sub: 'Swift and SwiftUI, no third-party packages', run: 'swift run pickje',
  slim: 'Pickle and Blicky · shake · mic · marks · screenpipe',
  over: [
    { n: 'Pickle and Blicky', j: 'drawn in SwiftUI' }, { n: 'Shake to wake', j: 'and circle to point' }, { n: 'The mic', j: 'native, gated' },
    { n: 'Marks', j: 'drawn on your screen' }, { n: 'screenpipe', j: 'the eyes' },
  ],
  detail: [
    { n: 'Pickle and Blicky', f: 'Characters.swift', j: 'His two drawings, redrawn as SwiftUI vectors: crisp at any size, and they move', cast: true },
    { n: 'Shake and circle', f: 'ShakeDetector.swift', j: 'A quick shake of the pointer wakes Pickle; a small circle points at the spot' },
    { n: 'The mic and its gate', f: 'Addressed.swift', j: 'AVAudioEngine listens; only speech right after a shake, or that names Blicky or Pickle, becomes a turn' },
    { n: 'Blicky’s marks', f: 'Marks.swift', j: 'Ring, curve, label, panel, dots, cut, place: pure geometry, unit-tested' },
    { n: 'The voice waits', f: 'BeatGate.swift', j: 'Each line plays only once the marks before it have their ink' },
    { n: 'screenpipe', f: 'app/eyes · localhost', j: 'Records the screen on this Mac; each turn reads its newest frame' },
  ],
}

/* ── Layer 2 · the talk server ── app/service.
   - talk-server.ts:2-9: "Node 25 runs this TypeScript directly … It listens on 127.0.0.1 only … Every request must carry
     `Authorization: Bearer <token>`"; README "Caller check": the token lives in <pickje>/.pickje/talk.json (mode 0600).
   - README: `screen: "now"` "has the server fetch screenpipe's newest frame through `app/eyes` … and use it as the image …
     the frame and its scaled copy are deleted when the turn ends".
   - app/memory/README.md:98: Route is `route.ts` `routeOnMoss`, "called by `projects.ts` `route()` … Otherwise Claude";
     app/brain/README.md:49: "Pickle's calls run on Claude Haiku 5.5: routing his words …".
   - turn.ts (one talk turn), beats.ts (the beat-line parser, README `beats-check.ts`); events `say` and `do`.
   - voiceturn.ts / voicelink.ts (PRODUCT.md Cartesia: "Sonic 3.6 over one socket, kept open between turns … Blicky's audio
     waits until Pickle's context is done, so the two never overlap").
   - README events: "`application/x-ndjson`, one event per line, each written as it happens. A newer turn ends the running one
     with {"event":"superseded"}"; `GET /watch`: "Pickle's card as NDJSON, a line each time Convex pushes a change". */
const SERVER: Layer = {
  name: 'The talk server', sub: 'TypeScript, run directly by Node 25', run: 'node app/service/talk-server.ts',
  slim: 'POST /turn → the screen → the route → the turn → streamed back',
  over: [
    { n: 'POST /turn', j: 'your words' }, { n: 'The screen', j: 'its newest frame' }, { n: 'The route', j: 'the right project' },
    { n: 'The turn', j: 'Claude writes it' }, { n: 'Streamed back', j: 'voice and marks' },
  ],
  detail: [
    { n: '1 · The door', f: 'talk-server.ts', j: '127.0.0.1 only; every request carries the token in .pickje/talk.json' },
    { n: '2 · The screen', f: 'app/eyes', j: 'screenpipe’s newest frame becomes the turn’s image, deleted when it ends' },
    { n: '3 · The route', f: 'projects.ts · route.ts', j: 'Moss picks the project; Claude Haiku decides when Moss can’t' },
    { n: '4 · The turn', f: 'turn.ts · beats.ts', j: 'Your words, the frame and the project’s brief go to Claude Opus; its lines become say and do' },
    { n: '5 · The voice', f: 'voiceturn.ts · voicelink.ts', j: 'Two voices over one kept Cartesia socket; they never overlap' },
    { n: '6 · Streamed back', f: 'NDJSON · GET /watch', j: 'say, do and audio, one event per line as it happens; a newer turn takes over' },
  ],
}

/* ── Layer 3 · the brains and memory ── names from the code (grep -rhoE over ~/code/pickje/app): claude-opus-5-5,
   claude-haiku-5-5, sonic-3.6, ink-2 (app/ears/providers/cartesia-ink.ts:5), @moss-js/moss 1.21.0 (app/memory/package.json),
   @factory/droid-sdk 0.10.0 (app/service/package.json). Jobs:
   - Claude: PRODUCT.md "Claude Opus 5.5 writes every turn Blicky speaks and decides every mark it draws, from the screenshot
     and your words; Claude Haiku 5.5 runs Pickje's quick calls (routing when Moss can't decide, naming a new project,
     rewriting its memory)"; "The Messages API over plain `fetch`, streamed, no SDK"; prompt caching (anthropic.ts:61-70).
   - Cartesia: PRODUCT.md "Sonic speaks for both characters over one kept WebSocket, and Ink is the ear … start talking to cut
     Blicky off".
   - Moss: app/memory/README.md "Every sentence you say is routed to its project by Moss … each project's live context … lives
     in its own Moss session that Blicky and Droid read. All of that runs on this Mac."
   - Convex: app/convex/README.md "a local deployment on this Mac with no account"; "one mutation per step"; the talk service
     holds the live query (his click "The service subscribes").
   - Elastic: app/recall/README.md: "An Agent Builder agent, Pickle's archive (`pickle-archive`)", a hybrid search in ES|QL.
   - Factory: app/service/droid.ts:11-17: spec mode proposes a plan whose first line says the task back; "The plan waits for a
     yes"; writes only through Pickle's tools, inside the project's folder.
   - Mana: app/mana/publish.ts:2-4: "Pickle's idea log, published as a Mana app a judge can open". */
const BRAINS: Layer = {
  name: 'The brains and memory', sub: '7 parts, each doing one job',
  slim: 'Claude · Cartesia · Moss · Convex · Elastic · Factory · Mana',
  over: [
    { n: 'Claude', j: 'every turn' }, { n: 'Cartesia', j: 'voice, ears' }, { n: 'Moss', j: 'routing' }, { n: 'Convex', j: 'live record' },
    { n: 'Elastic', j: 'recall' }, { n: 'Factory', j: 'hand-over' }, { n: 'Mana', j: 'idea log' },
  ],
  detail: [
    { n: 'Cartesia', f: 'sonic-3.6 · ink-2', j: 'Two voices, one kept socket; Ink hears you and lets you cut in' },
    { n: 'Moss', f: '@moss-js/moss', j: 'Routes each sentence on this Mac; holds the live context' },
    { n: 'Convex', f: 'convex, local', j: 'The record, one mutation a step; a live query feeds the card' },
    { n: 'Elastic', f: 'Agent Builder', j: 'pickle-archive: hybrid search over what you did days ago' },
    { n: 'Factory', f: '@factory/droid-sdk', j: 'Droid does the project’s work: says the plan back, waits for a yes' },
    { n: 'Mana', f: 'a Mana app', j: 'The idea log: words, decisions and notes, for judges to open' },
  ],
}
const CLAUDE = {
  n: 'Claude', f: 'Messages API, streamed, cached',
  models: [
    { m: 'claude-opus-5-5', j: 'Blicky: every line and every mark, from the frame and your words' },
    { m: 'claude-haiku-5-5', j: 'Pickle: the route when Moss can’t decide, new projects, memory' },
  ],
}
const LAYERS = [MAC, SERVER, BRAINS]

// geometry: the body under the title is about 694 px tall and 1728 wide; a label column (3 of 12) and a tray (the other 9)
const H = 680, GAP = 16, LABEL_W = span(3), TRAY_X = LABEL_W + 32, TRAY_W = 1728 - TRAY_X
const BIG = (slim: number) => H - 2 * slim - 2 * GAP
const OVER_H = (H - 2 * GAP) / 3

/** Where each layer sits at each step: [top, height]. Step 0 shares the height; then one layer zooms and two stay thin. */
function place(step: number, slim: number): [number, number][] {
  if (step === 0) return [0, 1, 2].map((i) => [i * (OVER_H + GAP), OVER_H])
  const open = step - 1
  let y = 0
  return [0, 1, 2].map((i) => { const h = i === open ? BIG(slim) : slim; const r: [number, number] = [y, h]; y += h + GAP; return r })
}

const nameStyle = { font: '600 27px/1.15 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)' } as const
const fileStyle = { font: 'var(--t-pixel-4)', color: 'var(--text-muted)', whiteSpace: 'nowrap' } as const
const jobStyle = { font: '400 22px/1.32 var(--font-head)', color: 'var(--text-secondary)' } as const

function Label({ l, big }: { l: Layer; big?: boolean }) {
  return (
    <div style={{ width: LABEL_W, display: 'grid', gap: 6, alignContent: 'start', paddingTop: big ? 8 : 4 }}>
      <div style={{ font: '600 31px/1.15 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)' }}>{l.name}</div>
      <div style={{ font: 'var(--t-head-4)', color: 'var(--text-secondary)' }}>{l.sub}</div>
      {big && l.run && <div style={{ ...fileStyle, marginTop: 14 }}>{l.run}</div>}
    </div>
  )
}

/** Step 0: the layer's parts in one row, a name and a few words each. */
function Overview({ l, h }: { l: Layer; h: number }) {
  const n = l.over.length, w = (TRAY_W - 48 - (n - 1) * 16) / n
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Label l={l} />
      <Tray width={TRAY_W} height={h} layout={{ alignItems: 'center' }}>
        {l.over.map((p) => (
          <Card key={p.n} width={w} height={h - 48}>
            <div style={{ ...nameStyle, fontSize: n > 5 ? 25 : 27 }}>{p.n}</div>
            <div style={{ ...jobStyle, fontSize: 20 }}>{p.j}</div>
          </Card>
        ))}
      </Tray>
    </div>
  )
}

/** A thin bar for a layer that isn't the one zoomed in. */
function Slim({ l, h }: { l: Layer; h: number }) {
  return (
    <div style={{ height: h, display: 'flex', alignItems: 'center', gap: 32, padding: '0 28px', borderRadius: 18, background: 'var(--surface-sunken)', boxSizing: 'border-box' }}>
      <span style={{ font: '600 25px/1 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--ink)', width: LABEL_W - 28, flex: 'none' }}>{l.name}</span>
      <span style={{ font: '400 22px/1 var(--font-head)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{l.slim}</span>
    </div>
  )
}

function PartCard({ p, w, h, cast }: { p: Part; w: number; h: number; cast: number }) {
  return (
    <Card width={w} height={h}>
      <div style={{ position: 'relative', display: 'grid', gap: 6 }}>
        <div style={nameStyle}>{p.n}</div>
        {p.f && <div style={fileStyle}>{p.f}</div>}
        {p.cast && (
          <div style={{ position: 'absolute', right: 0, top: -6, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <Pickle pose="wave" height={cast} /><Blicky pose="sketch" height={cast} />
          </div>
        )}
      </div>
      <div style={{ ...jobStyle, marginTop: 'auto' }}>{p.j}</div>
    </Card>
  )
}

/** Steps 1–3: the zoomed layer, six parts (Mac, server) or Claude plus six (brains). */
function Detail({ l, h, cast }: { l: Layer; h: number; cast: number }) {
  const inner = h - 48, rowH = (inner - 16) / 2
  const brains = l === BRAINS
  const cols = brains ? 4 : 3, w = (TRAY_W - 48 - (cols - 1) * 16) / cols
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Label l={l} big />
      <Tray width={TRAY_W} height={h} layout={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, ${w}px)`, gridAutoRows: `${rowH}px`, gap: 16 }}>
        {brains && (
          <div style={{ gridRow: 'span 2' }}>
            <Card width={w} height={inner} lifted>
              <div style={{ display: 'grid', gap: 6 }}>
                <div style={{ ...nameStyle, fontSize: 31 }}>{CLAUDE.n}</div>
                <div style={{ ...jobStyle, fontSize: 20 }}>{CLAUDE.f}</div>
              </div>
              {CLAUDE.models.map((m) => (
                <div key={m.m} style={{ display: 'grid', gap: 6, marginTop: 22 }}>
                  <div style={{ ...fileStyle, color: 'var(--ink)' }}>{m.m}</div>
                  <div style={jobStyle}>{m.j}</div>
                </div>
              ))}
            </Card>
          </div>
        )}
        {l.detail.map((p) => <PartCard key={p.n} p={p} w={w} h={rowH} cast={cast} />)}
      </Tray>
    </div>
  )
}

export function Stack() {
  const step = useStep()
  const d = useDialKit('Stack', { slim: [64, 48, 96, 2], cast: [64, 40, 96, 1], spring: { type: 'spring', visualDuration: 0.5, bounce: 0.08 } })
  const pos = place(step, d.slim)
  return (
    <Page title={TITLE}>
      <div style={{ position: 'relative', height: H }}>
        {LAYERS.map((l, i) => {
          const [top, h] = pos[i]
          const mode = step === 0 ? 'over' : step - 1 === i ? 'detail' : 'slim'
          return (
            <motion.div key={l.name} initial={false} animate={{ top, height: h }} transition={toMotion(d.spring)} style={{ position: 'absolute', left: 0, right: 0 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={mode} initial={{ opacity: 0, y: mode === 'detail' ? 18 : 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: mode === 'detail' ? 0.32 : 0.2, ease: 'easeOut' }} style={{ position: 'absolute', inset: 0 }}>
                  {mode === 'over' && <Overview l={l} h={h} />}
                  {mode === 'slim' && <Slim l={l} h={h} />}
                  {mode === 'detail' && <Detail l={l} h={h} cast={d.cast} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </Page>
  )
}
