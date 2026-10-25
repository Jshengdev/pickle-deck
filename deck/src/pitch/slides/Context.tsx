import { AnimatePresence, motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { Card, Scribble } from '@design/ui/kit'
import { Pickle } from '@design/cast/Cast'
import { Page } from '../../brand/frame'
import { Show, useStep, toMotion } from '../kit/step'
import { MiaFigure } from './mia/parts'
import { TASKS } from './story'

/** 14 · Where your context lives. 3 steps.
    His words (2026-10-25, 5:46 AM, voice, verbatim): "But I think what I'm missing right now is something to say like where
    the context is stored. The context is stored as basically their own dedicated repo inside of the. Pickling, and the
    reason why we built it like that is so that whenever you want to actually start a Claude code session for each
    individual project, you can still go in depth, and Pickle will be the in between between sending a prompt from you to
    the actual Claude project itself. So you're able to take your design feedback and paste it exactly where the website
    code itself is at through the Claude code terminal. I think that was important point."
    0    the project's folder: Mia's portfolio site (story.ts) as its own repo, its code, and `.pickje/` inside it with the
         real files; a footer for projects Pickle makes from the screen (their own folder inside pickje, subjects/)
    1    a Claude Code session opens in that folder (the cmux workspace "pickje · portfolio"): go in depth
    2    Pickle is the in-between: she says her design feedback, Pickle hands it over verbatim, it lands in words.jsonl
         first, then arrives as the next turn in the portfolio's Claude Code session, where the site's code is
    Sources (pickje repo, read-only, 2026-10-25):
    - app/service/home.ts:4-11 and README "Files": "Each project repo gets `<repo>/.pickje/`, hidden by that repo's
      `.git/info/exclude`, never committed: north-star.md (one outcome in Johnny's words) · desk.md (why · done · must stay
      true · where it stopped · next) · words.jsonl (his words, verbatim, append-only) · receipts.jsonl (what pickje did
      with them: deliveries, replies, timings) · session.json (the project's background Claude session and its cmux
      workspace)". "Spoken subjects (subject.ts) and projects made from the screen (projects.ts) are folders in
      `<pickje>/subjects/` (gitignored), registered the same way." cli.ts:109-124 hides it with .git/info/exclude and
      checks it with `git check-ignore`.
    - app/service/projects.ts:8-17: subjects/<slug>/ holds RESUME.md, pickle.md, blicky.md, words.jsonl, references/,
      notes/, memlog.md (memlog.ts: "Each project folder's .claude/settings.json … runs this as its SessionStart and Stop
      hooks"). His words in subject.ts:1-3: "its just inside pickje and it create a new folder for that subject. and that is
      where it acts as its own context but pickje is just looking in and adjusting whatever".
    - cli.ts header: `attach <repo>`, `session <project>`, `handover <project> "<words>" [--origin typed|spoken|pasted]`,
      `show <project>`. session starts `claude --bg` in the repo (cli.ts:180, startBackground(p.repo, …)); show makes the
      cmux workspace `pickje · <project>` in the repo running `claude attach <id>` (cli.ts:346-356).
    - README "How the handover works": "His words go into `words.jsonl` first, so the record holds even if the send fails.
      Then … `claude --resume <sessionId> -- "<words>"`. Claude Code sends the prompt to the running session as its next
      turn … An attached cmux viewer sees the turn arrive." The reply is read from the session's transcript into
      receipts.jsonl.
    Caveat (not on the slide): `handover` is the session layer's command. In a talk turn, a spoken hand-over (subject.ts)
    goes to the project's hands: Factory's Droid when it's set up, Claude Code otherwise. grep finds no talk-turn path that
    calls `cli.ts handover` yet.
    DRAFT: the title, the 3 sentences, every file's few words, her feedback line, and the portfolio's site files (story.ts
    names index.html; styles.css is our example). Mia is a scenario. */
export const CONTEXT_STEPS = 3

const TITLE = 'Where your context lives'   // DRAFT
const LINES = [                            // DRAFT, one per press: the sentence he says
  'Every project keeps its context in its own folder.',
  'Open a Claude Code session in any project, and go as deep as you like.',
  'Pickle is the in-between: your words go, word for word, to where the code is.',
]
const SITE = TASKS[1]                       // story.ts: { name: 'Portfolio site', file: 'portfolio — index.html' }
const PROJECT = 'portfolio'
const FEEDBACK = 'Make the project cards bigger, and put my best one first.'   // DRAFT: her design feedback, an example
const SITE_FILES = ['index.html', 'styles.css']
const PJ = [
  { f: 'north-star.md', j: 'one outcome, in your words' },
  { f: 'desk.md', j: 'why · done · stopped · next' },
  { f: 'words.jsonl', j: 'your words, verbatim', hot: true },
  { f: 'receipts.jsonl', j: 'each hand-over and its reply', hot: true },
  { f: 'session.json', j: 'its Claude Code session' },
]
const SUBJECTS = ['RESUME.md', 'pickle.md', 'blicky.md', 'notes/', 'memlog.md']

// geometry (body 1728 × ~694): you → Pickle → the folder → the terminal, left to right
const YOU = { x: 0, w: 258 }, PK = { x: 306, w: 240 }, FD = { x: 596, w: 600 }, TM = { x: 1246, w: 482 }
const MID = 290                                  // the diagram's middle line
const FD_H = 510, TM_H = 340
const SHIFT = [-32, -298, 0]                     // the group's x per step: the folder centred, then folder + terminal, then all

const mono = (size = 22, color = 'var(--ink)') => ({ font: `400 ${size}px/1.3 var(--font-mono)`, color, whiteSpace: 'nowrap' as const })
const note = { font: '400 20px/1.35 var(--font-head)', color: 'var(--text-secondary)' } as const

function Arrow({ x }: { x: number }) {
  return <div style={{ position: 'absolute', left: x + 6, top: MID - 12, width: 38 }}><Scribble kind="arrow" w={38} seed={x} /></div>
}

function Folder({ step }: { step: number }) {
  const hot = step >= 2
  return (
    <Card width={FD.w} height={FD_H} lifted={step === 0}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <span style={{ ...mono(26), fontWeight: 600 }}>{PROJECT}/</span>
        <span style={note}>{SITE.name.toLowerCase()}, its own repo</span>
      </div>
      <div style={{ display: 'flex', gap: 22, paddingLeft: 26 }}>
        {SITE_FILES.map((f) => <span key={f} style={mono(21, 'var(--text-secondary)')}>{f}</span>)}
        <span style={{ ...note, color: 'var(--text-muted)' }}>the site’s code</span>
      </div>
      <div style={{ marginTop: 6, paddingLeft: 26, display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{ ...mono(23), fontWeight: 600 }}>.pickje/</span>
        <span style={note}>hidden by <span style={mono(20, 'var(--text-secondary)')}>.git/info/exclude</span></span>
      </div>
      <div style={{ display: 'grid', gap: 9, paddingLeft: 52 }}>
        {PJ.map((r) => {
          const on = hot && r.hot
          return (
            <div key={r.f} style={{ display: 'grid', gridTemplateColumns: '196px 1fr', alignItems: 'baseline' }}>
              <span style={{ ...mono(21, on ? 'var(--pickle-ink)' : 'var(--ink)'), fontWeight: on ? 600 : 400, transition: 'color 300ms' }}>{r.f}</span>
              <span style={{ ...note, color: on ? 'var(--pickle-ink)' : note.color, transition: 'color 300ms' }}>{r.j}</span>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line-hair)', display: 'grid', gap: 6 }}>
        <span style={note}>Made from your screen instead? Its own folder inside pickje:</span>
        <span style={{ ...mono(20, 'var(--text-secondary)'), whiteSpace: 'normal' }}>subjects/&lt;project&gt;/ · {SUBJECTS.join(' · ')}</span>
      </div>
    </Card>
  )
}

function Terminal({ step }: { step: number }) {
  return (
    <div style={{ width: TM.w, height: TM_H, borderRadius: 29, background: 'var(--surface-night)', color: 'var(--text-on-dark)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '18px 28px', borderBottom: '1px solid oklch(1 0 0 / .12)', ...mono(20, 'var(--text-on-dark-muted)') }}>pickje · {PROJECT}</div>
      <div style={{ padding: '22px 28px', display: 'grid', gap: 12, alignContent: 'start' }}>
        <span style={mono(20, 'var(--text-on-dark-muted)')}>~/{PROJECT}</span>
        <span style={mono(21, 'var(--text-on-dark)')}>$ claude attach &lt;id&gt;</span>
        <span style={{ ...note, color: 'var(--text-on-dark-muted)' }}>Claude Code, in the site’s own code</span>
        <AnimatePresence initial={false}>
          {step >= 2 && (
            <motion.div key="turn" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.55 }}
              style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '26px 1fr', ...mono(22, 'var(--pickle)'), whiteSpace: 'normal' }}>
              <span>&gt;</span><span>{FEEDBACK}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Context() {
  const step = useStep()
  const d = useDialKit('Context', { mia: [210, 120, 280, 1], pickle: [150, 80, 200, 1], camera: { type: 'spring', visualDuration: 0.6, bounce: 0.06 } })
  return (
    <Page title={TITLE}>
      <div style={{ position: 'relative', height: '100%' }}>
        <motion.div initial={false} animate={{ x: SHIFT[step] ?? 0 }} transition={toMotion(d.camera)} style={{ position: 'absolute', left: 0, top: 0, width: 1728, height: 580 }}>
          {/* the folder: there from the start */}
          <div style={{ position: 'absolute', left: FD.x, top: MID - FD_H / 2 }}><Folder step={step} /></div>

          {/* press 1: the Claude Code session in that folder */}
          <Show from={1} style={{ position: 'absolute', inset: 0 }}>
            <Arrow x={FD.x + FD.w} />
            <div style={{ position: 'absolute', left: TM.x, top: MID - TM_H / 2 }}><Terminal step={step} /></div>
            <div style={{ position: 'absolute', left: TM.x + 4, top: MID + TM_H / 2 + 18, display: 'grid', gap: 6 }}>
              <span style={note}><span style={mono(20)}>cli.ts session {PROJECT}</span> starts it</span>
              <span style={note}><span style={mono(20)}>cli.ts show {PROJECT}</span> opens it</span>
            </div>
          </Show>

          {/* press 2: you say it, Pickle hands it over */}
          <Show from={2} style={{ position: 'absolute', inset: 0 }}>
            <div style={{ position: 'absolute', left: YOU.x, top: MID - 250, width: YOU.w, display: 'grid', justifyItems: 'start', gap: 14 }}>
              <div style={{ padding: '16px 20px', borderRadius: 18, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 2px var(--silver-300)', font: '400 22px/1.35 var(--font-second)', color: 'var(--ink)' }}>
                “{FEEDBACK}”
              </div>
              <MiaFigure height={d.mia} />
            </div>
            <Arrow x={YOU.x + YOU.w} />
            <div style={{ position: 'absolute', left: PK.x, top: MID - 150, width: PK.w, display: 'grid', justifyItems: 'center', gap: 14 }}>
              <Pickle pose="listen" height={d.pickle} />
              <div style={{ display: 'grid', gap: 2, justifyItems: 'center' }}>
                <span style={mono(20)}>cli.ts handover</span>
                <span style={mono(20)}>{PROJECT} "…"</span>
                <span style={mono(20, 'var(--text-secondary)')}>--origin spoken</span>
              </div>
            </div>
            <Arrow x={PK.x + PK.w} />
          </Show>
        </motion.div>

        {/* the sentence he says, one per press */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 612 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              style={{ margin: 0, font: 'var(--t-head-2)', letterSpacing: 'var(--t-head-2-track)', color: 'var(--ink)' }}>
              {LINES[step] ?? LINES[LINES.length - 1]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Page>
  )
}
