import { motion } from 'motion/react'
import { M, span } from '../../../brand/frame'
import { useStep } from '../../kit/step'
import { MiaFigure, Lines, Win, TypeOn, SCREENS } from './parts'
import { THIS_IS, SISTER, SHE_IS, PROJECTS, TOO_MANY, ASKS_AI, ONE_STEP, NEXT_STEP, ASK, WALL, OTHER_CHATS } from './words'

/** Mia's story as a sequence of slides, one idea each, one sentence per press (his brief 2026-10-25, about 4:10 AM:
    "the first slide I want to have is just a picture of Mia, and then… This is Mia, and then next slide. She… is
    ambitious. She's smart… But there's one thing that consistently stops her… too many interests, too many projects…
    That nothing starts… So Mia ask AI for help… by the time she's ten agent sessions in, she can't remember… Mia needs one
    step, not like ten different agent sessions"). The real screens are in ../../assets/screens (CREDITS.md there).
    Every slide's steps = its number of sentences; the counts are exported for index.tsx. */
const spring = { type: 'spring', visualDuration: 0.5, bounce: 0.14 } as const
const TOP = 150
/** His words 2026-10-25 ~4:25 AM: "make it so it's more animated when you do each like new slide". So in Mia's story things
    do move in when a slide arrives (the deck's "nothing animates in" is relaxed here, as in the first story scene). */
function Enter({ children, delay = 0, from = { y: 60, scale: 0.94 }, style }: { children: React.ReactNode; delay?: number; from?: { x?: number; y?: number; scale?: number; rotate?: number }; style?: React.CSSProperties }) {
  return <motion.div initial={{ opacity: 0, ...from }} animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }} transition={{ ...spring, delay }} style={style}>{children}</motion.div>
}

/** 1 · just Mia. */
export function MiaPortrait() {
  return <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}><Enter from={{ y: 120, scale: 0.8 }}><MiaFigure height={700} /></Enter></div>
}

/** 2 · "This is Mia." then, on the press, whose sister she is. 2 steps. */
export const THIS_IS_STEPS = 2
export function ThisIsMia() {
  const step = useStep()
  return (
    <>
      <Enter from={{ x: 120, scale: 0.96 }} style={{ position: 'absolute', right: M + 60, bottom: 0 }}><MiaFigure height={760} /></Enter>
      <Enter delay={0.15} from={{ y: 40 }} style={{ position: 'absolute', left: M, top: 380, font: '700 var(--deck-giant)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>{THIS_IS}</Enter>
      <motion.div initial={false} animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }} transition={spring}
        style={{ position: 'absolute', left: M, top: 540, width: span(7), font: '600 48px/1.2 var(--font-head)', letterSpacing: '-0.02em', color: 'var(--text-secondary)' }}>{SISTER}</motion.div>
    </>
  )
}

/** 3 · who she is: her projects, one card per press (his ask: "be more specific that these are different projects and like
    ways to organize context"), then the one thing that stops her. One sentence at a time, as in her AI slide. */
export const SHE_IS_STEPS = SHE_IS.length
const CREDIT: Record<string, string> = { cad: 'FreeCAD · Nik vr · CC BY-SA 4.0', video: 'Kdenlive · Ddeepeshkumar · CC BY-SA 4.0' }
const CARD_W = 420, CARD_GAP = 30
function ProjectCard({ name, what, src, credit, n }: { name: string; what: string; src: string; credit?: string; n: number }) {
  return (
    <div style={{ position: 'relative', width: CARD_W, paddingTop: 44 }}>
      {/* the folder tab, as on Pickle's notepad */}
      <div style={{ position: 'absolute', left: 0, top: 0, height: 52, padding: '0 20px', display: 'flex', alignItems: 'center', gap: 12, borderRadius: '14px 14px 0 0', background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair)' }}>
        <span style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>{n}</span>
        <span style={{ font: '700 24px var(--font-head)', letterSpacing: '-0.01em' }}>{name}</span>
      </div>
      <div style={{ position: 'relative', borderRadius: '0 18px 18px 18px', overflow: 'hidden', background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)' }}>
        <div style={{ position: 'relative', margin: 12, borderRadius: 10, overflow: 'hidden', height: 270 }}>
          <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />
          {credit && <span style={{ position: 'absolute', right: 6, bottom: 6, padding: '2px 6px', borderRadius: 6, background: 'oklch(1 0 0 / .85)', font: '400 11px var(--font-pixel)', color: 'var(--text-muted)' }}>{credit}</span>}
        </div>
        <div style={{ padding: '2px 22px 18px', font: '400 28px/1.25 var(--font-second)', color: 'var(--pickle-ink)' }}>{what}</div>
      </div>
    </div>
  )
}
export function SheIs() {
  const step = useStep(), last = SHE_IS.length - 1
  return (
    <>
      <Enter from={{ x: 100 }} style={{ position: 'absolute', right: M + 10, bottom: 0 }}><MiaFigure height={600} /></Enter>
      <div style={{ position: 'absolute', left: M, top: TOP, width: span(9) }}><Lines lines={[SHE_IS[step] ?? '']} from={step} /></div>
      {PROJECTS.map((p, i) => (
        <motion.div key={p.name} initial={false} transition={spring}
          animate={step >= p.at ? { opacity: step === last ? 0.5 : 1, y: 0, rotate: step === last ? (i - 1) * 3 : 0, scale: 1 } : { opacity: 0, y: 70, rotate: (i - 1) * 6, scale: 0.92 }}
          style={{ position: 'absolute', left: M + i * (CARD_W + CARD_GAP), top: 440 }}>
          <ProjectCard n={i + 1} name={p.name} what={p.what} src={SCREENS[p.screen]} credit={CREDIT[p.screen]} />
        </motion.div>
      ))}
    </>
  )
}

/** 4 · too much: her real screens pile up around her, then "So nothing starts." */
export const TOO_MANY_STEPS = TOO_MANY.length
const PILE = [
  { at: 0, title: 'Kdenlive · club-video.mp4', src: SCREENS.video, x: 1060, y: 120, w: 560, h: 330, r: -4, credit: 'Kdenlive · Ddeepeshkumar · CC BY-SA 4.0' },
  { at: 0, title: 'Markets · LRKS', src: SCREENS.stocks, x: 1300, y: 430, w: 520, h: 330, r: 5 },
  { at: 1, title: 'FreeCAD · bracket.FCStd', src: SCREENS.cad, x: 900, y: 360, w: 540, h: 320, r: -7, credit: 'FreeCAD · Nik vr · CC BY-SA 4.0' },
  { at: 1, title: 'chem-worksheet.pdf', src: SCREENS.chemistry, x: 1200, y: 700, w: 520, h: 330, r: 3 },
  { at: 2, title: 'Cal Student Hub', src: SCREENS.calHub, x: 760, y: 610, w: 600, h: 380, r: -3 },
  { at: 2, title: 'chem-worksheet.pdf · 22', src: SCREENS.chemistryNmr, x: 1420, y: 90, w: 440, h: 300, r: 8 },
]
export function TooMany() {
  const step = useStep()
  return (
    <>
      <Enter from={{ y: 80 }} style={{ position: 'absolute', left: M, bottom: 0 }}><div style={{ opacity: step >= 3 ? 0.55 : 1, transition: 'opacity 400ms' }}><MiaFigure height={350} /></div></Enter>
      <Lines lines={TOO_MANY} style={{ position: 'absolute', left: M, top: TOP, width: span(6) }} />
      {PILE.map((p, i) => (
        <motion.div key={p.title} initial={p.at === 0 ? { opacity: 0, scale: 0.8, rotate: p.r * 3, x: 0 } : false} transition={{ ...spring, delay: p.at === 0 ? 0.2 + i * 0.12 : 0 }}
          animate={step >= p.at ? { opacity: 1, scale: 1, rotate: p.r + (step >= 3 ? (i % 2 ? 2 : -2) : 0), x: step >= 3 ? (i % 2 ? -18 : 18) : 0 } : { opacity: 0, scale: 0.9, rotate: p.r, x: 0 }}
          style={{ position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h }}>
          <Win title={p.title} src={p.src} w={p.w} h={p.h} credit={p.credit} style={{ left: 0, top: 0 }} />
        </motion.div>
      ))}
    </>
  )
}

/** 5 · she asks an AI: types, gets a wall, screenshots, pastes, then opens session after session until she's lost. */
export const ASKS_AI_STEPS = ASKS_AI.length
const CHAT_W = 640, CHAT_H = 700
function Chat({ step }: { step: number }) {
  return (
    <motion.div initial={{ opacity: 0, x: 160 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.15 }} style={{ position: 'absolute', left: 1180, top: 210, width: CHAT_W, height: CHAT_H }}>
      <Win title="AI chat · new session" w={CHAT_W} h={CHAT_H} style={{ left: 0, top: 0 }}>
        <div style={{ padding: 22, display: 'grid', gap: 16, alignContent: 'start', height: CHAT_H - 34, boxSizing: 'border-box', overflow: 'hidden' }}>
          {step >= 1 && <div style={{ justifySelf: 'end', maxWidth: 420, padding: '12px 16px', borderRadius: 16, background: 'var(--silver-200)', font: '400 22px/1.35 var(--font-head)' }}><TypeOn text={ASK} play={step >= 1} /></div>}
          {step >= 2 && <div style={{ font: '400 19px/1.5 var(--font-head)', color: 'var(--text-secondary)' }}><TypeOn text={WALL} play={step >= 2} ms={10} /></div>}
          {step >= 4 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring} style={{ justifySelf: 'end', width: 300, borderRadius: 12, overflow: 'hidden', boxShadow: 'inset 0 0 0 2px var(--silver-300)' }}>
              <img src={SCREENS.chemistryNmr} alt="" style={{ width: '100%', display: 'block' }} />
            </motion.div>
          )}
        </div>
      </Win>
    </motion.div>
  )
}
const MORE = Array.from({ length: 10 }, (_, i) => ({ x: 1150 - i * 46, y: 230 + i * 34, r: (i % 3) - 1 }))
export function AsksAI() {
  const step = useStep()
  const sessions = step >= 8 ? 10 : step >= 7 ? 4 : step >= 6 ? 3 : step >= 5 ? 2 : 1
  return (
    <>
      <div style={{ position: 'absolute', left: M, top: TOP, width: span(5) }}><Lines lines={[ASKS_AI[step] ?? '']} from={step} size={(ASKS_AI[step]?.length ?? 0) > 48 ? 'var(--t-head-2)' : 'var(--t-head-1)'} /></div>
      {/* the page she's stuck on, and the screenshot flash */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: step >= 5 ? 0.35 : 1, y: 0 }} transition={spring} style={{ position: 'absolute', left: M, top: 470 }}>
        <Win title="chem-worksheet.pdf" src={SCREENS.chemistryNmr} w={680} h={460} style={{ left: 0, top: 0 }} />
        {step === 3 && <motion.div initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ position: 'absolute', inset: 0, background: 'white', borderRadius: 14 }} />}
        {step >= 3 && step <= 4 && <div style={{ position: 'absolute', left: 30, top: 60, width: 620, height: 380, border: '3px dashed var(--sky-600)', borderRadius: 6 }} />}
      </motion.div>
      {/* the other sessions she opens, then ten */}
      {MORE.slice(0, Math.max(0, sessions - 1)).map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 60, x: 80, rotate: m.r * 6 }} animate={{ opacity: step >= 8 ? 0.85 : 1, y: 0, x: 0, rotate: 0 }} transition={{ ...spring, delay: step >= 8 ? (i - 3) * 0.07 : 0 }}
          style={{ position: 'absolute', left: m.x, top: m.y, rotate: `${m.r}deg` }}>
          <Win title={`AI chat · ${OTHER_CHATS[i]?.title ?? 'session ' + (i + 2)}`} w={560} h={300} style={{ left: 0, top: 0 }}>
            <div style={{ padding: 18 }}>
              <div style={{ justifySelf: 'end', marginLeft: 'auto', maxWidth: 380, padding: '10px 14px', borderRadius: 14, background: 'var(--silver-200)', font: '400 19px/1.35 var(--font-head)' }}>{OTHER_CHATS[i]?.ask ?? '…'}</div>
              <div style={{ marginTop: 14, display: 'grid', gap: 8 }}>{[300, 420, 360].map((w, j) => <div key={j} style={{ height: 10, width: w, borderRadius: 5, background: 'var(--silver-200)' }} />)}</div>
            </div>
          </Win>
        </motion.div>
      ))}
      {sessions === 1 && <Chat step={step} />}
      {step >= 5 && <div style={{ position: 'absolute', right: M, top: 150, font: '400 26px var(--font-pixel)', color: 'var(--text-muted)' }}>{sessions} {sessions === 1 ? 'session' : 'sessions'} open</div>}
    </>
  )
}

/** 6 · the turn: she doesn't need ten sessions; she needs one next step. The sessions clear, one card stays. */
export const ONE_STEP_STEPS = ONE_STEP.length
export function OneStep() {
  const step = useStep()
  return (
    <>
      <Lines lines={ONE_STEP} style={{ position: 'absolute', left: M, top: TOP, width: span(8) }} />
      {MORE.slice(0, 9).map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={step >= 1 ? { opacity: 0, y: 260 + i * 20, rotate: m.r * 8 } : { opacity: 0.8, y: 0, rotate: m.r }} transition={{ ...spring, delay: step >= 1 ? i * 0.03 : 0 }}
          style={{ position: 'absolute', left: m.x, top: m.y + 120 }}>
          <Win title={`AI chat · ${OTHER_CHATS[i]?.title ?? 'session ' + (i + 2)}`} w={560} h={300} style={{ left: 0, top: 0 }} />
        </motion.div>
      ))}
      <motion.div initial={false} animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.96 }} transition={{ ...spring, delay: step >= 1 ? 0.35 : 0 }}
        style={{ position: 'absolute', left: M, top: 520, width: 760, padding: '30px 36px', borderRadius: 24, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)' }}>
        <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>next step</div>
        <div style={{ font: '400 40px/1.3 var(--font-second)', color: 'var(--pickle-ink)', marginTop: 10 }}>{NEXT_STEP}</div>
      </motion.div>
      <Enter from={{ y: 80 }} style={{ position: 'absolute', right: M + 40, bottom: 0 }}><MiaFigure height={420} /></Enter>
    </>
  )
}
