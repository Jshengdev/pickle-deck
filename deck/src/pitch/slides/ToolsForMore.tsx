import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { M, Page } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Lines } from './mia/parts'

/** 8 · There's always a tool for more. 4 steps.
    His words (2026-10-25, 4:38 AM, voice; spelling fixed): "for that there's always a tool for more. Have stacked
    screenshots of different releases of so many different niche models of AI tools, things to use, productivity hacks,
    all that. And then we don't need. And so basically just summarize the quote into just our ambitions are being held
    back by tools that only seem to complicate. So then show that."
    0  the title; new-model launch posts drop onto the desk: "A new model every week."            (sentence DRAFT)
    1  niche AI tools, changelogs and an app pile on: "A new AI tool for every niche."           (sentence DRAFT)
    2  productivity apps and "hacks" listicles, dozens now, messier: "A new hack to stay on top of it all." (DRAFT)
    3  the pile dims and settles; his line lands: "Our ambitions are being held back by tools that only seem to
       complicate them." (his words above, summarized as he asked; lightly cleaned: "them" added to end the sentence)
    Sources: none needed; no facts or numbers are claimed. Every card is a mock-up: the model, app and tool names,
    taglines, version numbers and listicle titles are made up (DRAFT), no real company, product, logo or screenshot.
    "10 productivity hacks" is from his brief ("productivity hacks"), the rest is ours. The "Instead of a tool that does
    more…" pivot, its 3 cards and the mission line moved to their own slide (WithYou). */
export const TOOLS_STEPS = 4

const SAY = ['A new model every week.', 'A new AI tool for every niche.', 'A new hack to stay on top of it all.'] // DRAFT
const QUOTE = 'Our ambitions are being held back by tools that only seem to complicate them.' // his words, lightly cleaned

/** The mock cards (all names and lines DRAFT, made up). */
type Card =
  | { k: 'model'; name: string; line: string; band: string }
  | { k: 'tool'; name: string; line: string; icon: string }
  | { k: 'app'; name: string; line: string; icon: string }
  | { k: 'hack'; title: string; bg: string; ink: string }
  | { k: 'log'; ver: string; title: string; line: string }
type Placed = Card & { at: number; x: number; y: number; r: number }

const NIGHT = 'var(--surface-night)', FOREST = 'var(--forest-800)', SKY = 'var(--sky-800)', IRON = 'var(--silver-900)'
const PILE: Placed[] = [
  // 0 · new models, a tidy-ish stack on the right
  { at: 0, x: 1190, y: 440, r: -3, k: 'model', name: 'Nova-4', line: 'Introducing Nova-4: our smartest model yet.', band: NIGHT },
  { at: 0, x: 1610, y: 390, r: 4, k: 'model', name: 'Orbit 2.5 Pro', line: 'Faster, smarter, cheaper. Available today.', band: SKY },
  { at: 0, x: 1400, y: 650, r: -2, k: 'model', name: 'Lumen-7', line: 'Meet Lumen-7, our most capable model.', band: FOREST },
  { at: 0, x: 1740, y: 640, r: 3, k: 'log', ver: 'v12.0', title: 'Meet your new AI assistant', line: '+ Now built into everything' },
  { at: 0, x: 1150, y: 840, r: 2, k: 'model', name: 'Vega Ultra', line: 'Vega Ultra is here. Try it now.', band: IRON },
  { at: 0, x: 1590, y: 880, r: -4, k: 'model', name: 'Quill 3 mini', line: 'Small, fast, and now in preview.', band: NIGHT },
  { at: 0, x: 1800, y: 230, r: 5, k: 'model', name: 'Halcyon 5', line: 'Halcyon 5 changes everything.', band: FOREST },
  // 1 · niche AI tools, more changelogs, the first app
  { at: 1, x: 1130, y: 340, r: -7, k: 'tool', name: 'Filenamer', line: 'AI that names your files', icon: 'var(--sky-500)' },
  { at: 1, x: 1450, y: 250, r: 6, k: 'tool', name: 'Standupbot', line: 'An agent that writes your standup', icon: 'var(--moss-400)' },
  { at: 1, x: 1800, y: 470, r: -8, k: 'tool', name: 'Prompt Pal', line: 'An AI for your AI prompts', icon: 'var(--pollen-300)' },
  { at: 1, x: 1260, y: 560, r: 9, k: 'tool', name: 'Notesy', line: 'AI that summarizes your summaries', icon: 'var(--sky-300)' },
  { at: 1, x: 1520, y: 520, r: -6, k: 'model', name: 'Atlas-o2', line: 'Atlas-o2 preview: thinks before it answers.', band: SKY },
  { at: 1, x: 1020, y: 700, r: -6, k: 'tool', name: 'Flashly', line: 'Flashcards from any lecture', icon: 'var(--moss-300)' },
  { at: 1, x: 1310, y: 330, r: -5, k: 'log', ver: 'v4.2', title: 'New: AI summaries everywhere', line: '+ Summaries of your summaries' },
  { at: 1, x: 1720, y: 770, r: 7, k: 'tool', name: 'Meetbot', line: 'Joins your meetings for you', icon: 'var(--silver-400)' },
  { at: 1, x: 1880, y: 330, r: 10, k: 'app', name: 'Taskpile', line: 'Tasks, but with AI', icon: 'var(--sky-600)' },
  { at: 1, x: 1360, y: 950, r: -9, k: 'tool', name: 'Tabwise', line: 'An AI for your open tabs', icon: 'var(--pollen-400)' },
  { at: 1, x: 1110, y: 1000, r: 8, k: 'model', name: 'Strata 9', line: 'Strata 9: a new frontier.', band: IRON },
  { at: 1, x: 1840, y: 990, r: 5, k: 'tool', name: 'Slidesmith', line: 'A whole deck from one sentence', icon: 'var(--moss-500)' },
  { at: 1, x: 1620, y: 1040, r: -7, k: 'log', ver: 'v3.0', title: 'Agents, now in your inbox', line: '+ And in your calendar' },
  // 2 · productivity apps and hacks, dozens, everywhere
  { at: 2, x: 210, y: 650, r: -10, k: 'hack', title: '10 productivity hacks you need', bg: 'var(--pollen-300)', ink: 'var(--ink)' },
  { at: 2, x: 590, y: 610, r: 8, k: 'hack', title: 'The 5 AM routine that fixed my life', bg: 'var(--sky-300)', ink: 'var(--ink)' },
  { at: 2, x: 140, y: 860, r: -5, k: 'app', name: 'Focusly', line: 'A timer for deep work', icon: 'var(--moss-400)' },
  { at: 2, x: 440, y: 790, r: 7, k: 'app', name: 'Plannr', line: 'Plan your whole life', icon: 'var(--pollen-300)' },
  { at: 2, x: 330, y: 960, r: 6, k: 'hack', title: 'Stop using to-do lists. Do this instead.', bg: NIGHT, ink: 'var(--pollen-300)' },
  { at: 2, x: 760, y: 880, r: -12, k: 'hack', title: 'I tried every notes app so you don’t have to', bg: 'var(--pollen-300)', ink: 'var(--ink)' },
  { at: 2, x: 920, y: 640, r: 10, k: 'hack', title: '7 AI tools that replace your whole team', bg: 'var(--surface-page)', ink: 'var(--ink)' },
  { at: 2, x: 1150, y: 500, r: -11, k: 'app', name: 'Calendo', line: 'A calendar that thinks', icon: 'var(--sky-500)' },
  { at: 2, x: 1270, y: 230, r: 9, k: 'hack', title: 'The only apps you need', bg: 'var(--sky-300)', ink: 'var(--ink)' },
  { at: 2, x: 1620, y: 300, r: 9, k: 'app', name: 'Habitloop', line: 'Build habits that stick', icon: 'var(--moss-300)' },
  { at: 2, x: 1430, y: 440, r: 12, k: 'model', name: 'Ember-X', line: 'Ember-X: the model for everything.', band: FOREST },
  { at: 2, x: 1170, y: 660, r: -13, k: 'tool', name: 'Mailmind', line: 'Replies before you read', icon: 'var(--pollen-300)' },
  { at: 2, x: 1470, y: 730, r: -14, k: 'hack', title: 'My second brain setup', bg: NIGHT, ink: 'var(--pollen-300)' },
  { at: 2, x: 1800, y: 570, r: 13, k: 'hack', title: 'How I plan my week in 10 minutes', bg: 'var(--pollen-300)', ink: 'var(--ink)' },
  { at: 2, x: 1300, y: 820, r: 12, k: 'app', name: 'Mindmapr', line: 'Map every idea you have', icon: 'var(--sky-300)' },
  { at: 2, x: 1910, y: 860, r: -10, k: 'app', name: 'Dayflow', line: 'Your day, automated', icon: 'var(--moss-500)' },
  { at: 2, x: 600, y: 1030, r: 4, k: 'log', ver: 'v8.1', title: 'Smarter. Faster. More.', line: '+ More AI, everywhere' },
  { at: 2, x: 1010, y: 900, r: 14, k: 'app', name: 'Jotter', line: 'Notes for everything', icon: 'var(--silver-400)' },
  { at: 2, x: 900, y: 1050, r: -6, k: 'hack', title: 'Build a system, not goals', bg: 'var(--sky-300)', ink: 'var(--ink)' },
  { at: 2, x: 1530, y: 1000, r: -8, k: 'log', ver: 'v2.14', title: 'What’s new: an AI that plans your day', line: '+ And one that re-plans it' },
  { at: 2, x: 90, y: 1040, r: -9, k: 'tool', name: 'Inboxly', line: 'Sorts your email with AI', icon: 'var(--sky-500)' },
  { at: 2, x: 1760, y: 160, r: -12, k: 'app', name: 'Clipmind', line: 'Save everything. Read it never.', icon: 'var(--pollen-400)' },
]

/** Hard edges only (BRAND: no blur shadows): a hairline and a flat drop. */
const edge = 'inset 0 0 0 1.5px var(--line-hair), 0 4px 0 var(--silver-300)'
const head = (size: number, weight = 700): CSSProperties => ({ font: `${weight} ${size}px/1.15 var(--font-head)`, letterSpacing: '-0.015em' })

/** A small flat app icon: a coloured square with a white circle in it (no logos). */
function Icon({ bg, size }: { bg: string; size: number }) {
  return <div style={{ width: size, height: size, flex: 'none', borderRadius: size * 0.24, background: bg, display: 'grid', placeItems: 'center' }}><i style={{ width: size * 0.38, height: size * 0.38, borderRadius: 99, background: 'var(--surface-page)' }} /></div>
}

function CardFace({ c }: { c: Card }): ReactNode {
  switch (c.k) {
    case 'model': // a launch post: a dark band with the name, the announcement under it
      return (
        <div style={{ width: 410, borderRadius: 18, overflow: 'hidden', background: 'var(--surface-page)', boxShadow: edge }}>
          <div style={{ height: 112, background: c.band, display: 'grid', placeItems: 'center', color: 'var(--text-on-dark)', ...head(42) }}>{c.name}</div>
          <div style={{ padding: '14px 20px 16px', font: '500 21px/1.3 var(--font-head)', color: 'var(--ink)' }}>{c.line}</div>
        </div>
      )
    case 'tool': // a launch-day listing: icon, name, tagline, an upvote box
      return (
        <div style={{ width: 430, padding: 18, borderRadius: 14, background: 'var(--surface-page)', boxShadow: edge, display: 'flex', gap: 16, alignItems: 'center' }}>
          <Icon bg={c.icon} size={64} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={head(27)}>{c.name}</div>
            <div style={{ font: '400 20px/1.3 var(--font-head)', color: 'var(--text-secondary)', marginTop: 4 }}>{c.line}</div>
          </div>
          <div style={{ width: 54, height: 62, flex: 'none', borderRadius: 10, boxShadow: 'inset 0 0 0 1.5px var(--line-hair)', display: 'grid', placeItems: 'center' }}>
            <i style={{ width: 0, height: 0, borderLeft: '11px solid transparent', borderRight: '11px solid transparent', borderBottom: '14px solid var(--ink)' }} />
          </div>
        </div>
      )
    case 'app': // an app-store row: big icon, name, subtitle, a Get pill
      return (
        <div style={{ width: 400, padding: 18, borderRadius: 24, background: 'var(--surface-page)', boxShadow: edge, display: 'flex', gap: 18, alignItems: 'center' }}>
          <Icon bg={c.icon} size={84} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={head(27)}>{c.name}</div>
            <div style={{ font: '400 20px/1.3 var(--font-head)', color: 'var(--text-secondary)', marginTop: 2 }}>{c.line}</div>
            <div style={{ marginTop: 10, display: 'inline-block', padding: '4px 20px', borderRadius: 99, background: 'var(--silver-200)', font: '700 20px/1.2 var(--font-head)', color: 'var(--sky-700)' }}>Get</div>
          </div>
        </div>
      )
    case 'hack': // a listicle / video thumbnail: loud title, a play chip
      return (
        <div style={{ position: 'relative', width: 380, height: 214, padding: '22px 24px', boxSizing: 'border-box', borderRadius: 10, background: c.bg, boxShadow: edge, color: c.ink }}>
          <div style={{ ...head(36, 800), lineHeight: 1.04, letterSpacing: '-0.03em', maxWidth: 300 }}>{c.title}</div>
          <div style={{ position: 'absolute', right: 14, bottom: 14, width: 50, height: 36, borderRadius: 8, background: 'var(--ink)', display: 'grid', placeItems: 'center' }}>
            <i style={{ width: 0, height: 0, marginLeft: 4, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '14px solid var(--surface-page)' }} />
          </div>
        </div>
      )
    case 'log': // a changelog entry: version chip, what's new, one added line
      return (
        <div style={{ width: 430, padding: '18px 22px', borderRadius: 12, background: 'var(--surface-page)', boxShadow: edge }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ padding: '2px 10px', borderRadius: 8, background: 'var(--sky-100)', font: '400 20px/1.3 var(--font-pixel)', color: 'var(--sky-800)' }}>{c.ver}</span>
            <span style={{ font: '500 20px/1.3 var(--font-head)', color: 'var(--text-muted)' }}>What’s new</span>
          </div>
          <div style={{ ...head(27, 650), marginTop: 10 }}>{c.title}</div>
          <div style={{ font: '400 20px/1.3 var(--font-head)', color: 'var(--text-secondary)', marginTop: 6 }}>{c.line}</div>
        </div>
      )
  }
}

export function ToolsForMore() {
  const step = useStep()
  // DialKit (his standing stack): how much the pile dims, how messy it gets, how big his line lands.
  const d = useDialKit('Tools for more', { dim: [0.11, 0, 0.6, 0.01], mess: [1, 0, 2, 0.05], quote: [0.84, 0.5, 1.2, 0.01] })
  const arrived = useRef(false)
  useEffect(() => { arrived.current = true }, [])
  const quiet = step >= 3
  const groupIndex = (i: number) => PILE.slice(0, i).filter((p) => p.at === PILE[i].at).length
  return (
    <>
      {/* the pile: one layer for the whole slide, so it can spill off the edges */}
      <motion.div initial={false} animate={{ opacity: quiet ? d.dim : 1, y: quiet ? 36 : 0 }} transition={{ type: 'spring', visualDuration: 0.6, bounce: 0.1 }}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {PILE.map((p, i) => {
          const on = step >= p.at
          const r = p.r * d.mess
          // the first time the slide shows, the pile drops in card by card; after that, each press drops its own group
          const delay = !on ? 0 : !arrived.current ? 0.15 + i * 0.03 : step === p.at ? groupIndex(i) * 0.04 : 0
          return (
            <motion.div key={i} initial={{ opacity: 0, y: -70, scale: 1.12, rotate: r * 2.2 }}
              animate={on ? { opacity: 1, y: 0, scale: 1, rotate: r } : { opacity: 0, y: -70, scale: 1.12, rotate: r * 2.2 }}
              transition={{ type: 'spring', visualDuration: 0.5, bounce: 0.18, delay }}
              style={{ position: 'absolute', left: p.x, top: p.y, translate: '-50% -50%', zIndex: i }}>
              <CardFace c={p} />
            </motion.div>
          )
        })}
      </motion.div>
      <Page title="There’s always a tool for more">
        <Lines lines={SAY[step] ? [SAY[step]] : []} from={step} size="var(--t-second-1)" style={{ position: 'absolute', left: 0, top: 0, width: 800 }} />
      </Page>
      {/* his line lands on the settled pile */}
      <motion.div initial={false} animate={{ opacity: quiet ? 1 : 0, y: quiet ? 0 : 40, scale: quiet ? 1 : 0.98 }} transition={{ type: 'spring', visualDuration: 0.6, bounce: 0.14, delay: quiet ? 0.25 : 0 }}
        style={{ position: 'absolute', left: M, right: M, top: 300, bottom: 96, display: 'grid', alignContent: 'center', pointerEvents: 'none' }}>
        <p style={{ margin: 0, maxWidth: 1600, font: `400 calc(var(--deck-hero) * ${d.quote})/1.14 var(--font-second)`, color: 'var(--ink)', textWrap: 'balance', textIndent: '-1ch' }}>“{QUOTE}”</p>
      </motion.div>
    </>
  )
}
