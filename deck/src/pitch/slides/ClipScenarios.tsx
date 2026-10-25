import { useRef, useState } from 'react'
import { useDialKit } from 'dialkit'
import { PickleLive, BlickyLive, type CastState } from '@design/cast/Live'
import { Cursor } from '@design/stage/Cursor'
import type { Timeline } from '@design/engine/types'
import { Page, span } from '../../brand/frame'
import { Screen, Bubble, Words, Ring, Worksheet, FusionWindow, FigmaWindow, ProjectTabs, useLoop, DESK } from '../clip/kit'

/** 7 · The demo, clip 2: the scenarios (his brief 2026-10-25: "and then all the differnet scnerairos"). 1 step, loops.
    Ring and Blicky positions are desktop points (1512 × 982). Three projects, one after the other: what he says, Pickle files it in the right project (its tab lights), Blicky flies
    to the one thing that answers it and rings it, then says the reply. The words and the replies are word for word from
    the product's staged projects (app/recall/staged.ts in the pickje repo: synthetic, every word by "test"). */
const SCENES = [
  { cls: 'sa', tab: 0, title: 'O-chem worksheet: ester or acid?', said: 'molecule B has the broad thing at 3000 and a peak at 1710, ester or acid',
    reply: 'the broad band from 2500 to 3300 is an O–H, so it’s the acid, not the ester; the 1710 is its C=O.', ring: { x: 290, y: 285, w: 200, h: 210 }, blicky: { x: 510, y: 470 } },
  { cls: 'sb', tab: 1, title: 'Desk lamp in Fusion: a lighter shade', said: 'how do i make the shade light, it’s solid right now',
    reply: 'shell it: revolve the cone, then Shell at 1.5 mm with the bottom face open.', ring: { x: 720, y: 330, w: 270, h: 260 }, blicky: { x: 990, y: 560 } },
  { cls: 'sc', tab: 2, title: 'A design critique: the mascot is everywhere', said: 'the mascot is cute but its on every screen',
    reply: 'keep it on the welcome screen only; on the goal picker it pulls the eye away from the choices.', ring: { x: 580, y: 260, w: 120, h: 120 }, blicky: { x: 720, y: 380 } },
]
const LEN = 8.6
const CUR = { x: 300, y: 760 }

export function ClipScenarios() {
  const d = useDialKit('Clip: scenarios', { zoom: [1.12, 1, 1.5, 0.01], speed: [1, 0.5, 1.6, 0.05] })
  const root = useRef<HTMLDivElement>(null)
  const [blicky, setBlicky] = useState<CastState>('idle'), [pickle, setPickle] = useState<CastState>('idle')
  useLoop(root, (tl: Timeline) => {
    tl.timeScale(d.speed)
    const C = { x: DESK.w / 2, y: DESK.h / 2 }
    const cam = (p: { x: number; y: number }, s: number, at: number, dur = 1.3) => {
      const q = { x: p.x + (C.x - p.x) * 0.35, y: p.y + (C.y - p.y) * 0.35 }
      tl.to('[data-cam]', { x: q.x - s * p.x, y: q.y - s * p.y, scale: s, duration: dur, ease: 'power2.inOut' }, at)
    }
    tl.set('[data-cam]', { transformOrigin: '0 0', x: 0, y: 0, scale: 1 }, 0)
    tl.set('.sc-hide', { autoAlpha: 0 }, 0)
    tl.set('.scene-name', { opacity: 0.32 }, 0)
    tl.set('.tab', { x: 0, y: 0 }, 0).set('.lamp', { opacity: 0 }, 0)
    tl.set('.blk', { x: 0, y: 0 }, 0)
    SCENES.forEach((s, i) => {
      const t = i * LEN
      tl.to('.scene-name', { opacity: (j: number) => (j === i ? 1 : 0.32), duration: 0.25 }, t)
      tl.fromTo(`.${s.cls}-win`, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' }, t)
      tl.call(() => setPickle('listening'), [], t + 0.6)
      tl.fromTo(`.${s.cls}-said`, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3 }, t + 0.8)
      // Pickle files it: the project's tab slides out and its lamp lights
      tl.call(() => setPickle('working'), [], t + 2.0)
      tl.to(`.tab${s.tab}`, { x: -26, duration: 0.24, ease: 'power3.out' }, t + 2.1).to(`.tab${s.tab} .lamp`, { opacity: 1, duration: 0.01 }, t + 2.3)
      // Blicky flies to the thing and rings it, then says the reply
      cam({ x: s.ring.x + s.ring.w / 2, y: s.ring.y + s.ring.h / 2 }, d.zoom, t + 2.6)
      tl.call(() => setBlicky('dragged'), [], t + 2.8)
      tl.to('.blk', { x: s.blicky.x - 1300, y: s.blicky.y - 780, duration: 0.8, ease: 'power2.inOut' }, t + 2.8)
      tl.call(() => setBlicky('sketching'), [], t + 3.6)
      tl.set(`.${s.cls}-ring`, { autoAlpha: 1 }, t + 3.6)
      tl.fromTo(`.${s.cls}-ring .ink`, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.7, ease: 'none' }, t + 3.6)
      tl.call(() => { setBlicky('talking'); setPickle('idle') }, [], t + 4.4)
      tl.to(`.${s.cls}-said`, { autoAlpha: 0, duration: 0.25 }, t + 4.2)   // what he said gives way to the answer
      tl.fromTo(`.${s.cls}-reply`, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3 }, t + 4.4)
      // out: back home, the tab tucks back
      const out = t + LEN - 0.9
      tl.to([`.${s.cls}-win`, `.${s.cls}-said`, `.${s.cls}-reply`, `.${s.cls}-ring`], { autoAlpha: 0, duration: 0.3 }, out)
      tl.to(`.tab${s.tab}`, { x: 0, duration: 0.24 }, out).to(`.tab${s.tab} .lamp`, { opacity: 0, duration: 0.01 }, out)
      tl.to('.blk', { x: 0, y: 0, duration: 0.6, ease: 'power2.inOut' }, out)
      tl.call(() => setBlicky('idle'), [], out)
      cam(C, 1, out, 0.8)
    })
    tl.to({}, { duration: 0.2 }, SCENES.length * LEN)
  }, 4.9, [d.zoom, d.speed])

  return (
    <Page title="Any screen, the same two friends">
      <div ref={root} style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <Screen width={1040}>
          <div className="sa-win sc-hide"><Worksheet x={110} y={90} w={900} /></div>
          <div className="sb-win sc-hide"><FusionWindow x={110} y={90} /></div>
          <div className="sc-win sc-hide"><FigmaWindow x={110} y={90} /></div>
          {SCENES.map((s) => <div key={s.cls} className={`${s.cls}-ring sc-hide`}><Ring x={s.ring.x} y={s.ring.y} w={s.ring.w} h={s.ring.h} /></div>)}
          <ProjectTabs names={['o-chem', 'desk lamp', 'onboarding']} />
          <div style={{ position: 'absolute', left: CUR.x, top: CUR.y }}><Cursor size={30} /></div>
          <div style={{ position: 'absolute', left: CUR.x + 18, top: CUR.y + 16 }}><PickleLive state={pickle} height={104} /></div>
          {SCENES.map((s) => <Words key={s.cls} className={`${s.cls}-said sc-hide`} style={{ left: CUR.x + 130, top: CUR.y - 20 }}>{s.said}</Words>)}
          <div className="blk" style={{ position: 'absolute', left: 1300, top: 780 }}><BlickyLive state={blicky} height={108} /></div>
          {SCENES.map((s) => <Bubble key={s.cls} who="blicky" className={`${s.cls}-reply sc-hide`} width={500} style={{ left: s.blicky.x > 800 ? s.blicky.x - 560 : s.blicky.x + 130, top: s.blicky.x > 800 ? s.blicky.y + 40 : s.blicky.y - 250 }}>{s.reply}</Bubble>)}
        </Screen>
        <div style={{ width: span(4), display: 'grid', gap: 22, paddingTop: 10 }}>
          {SCENES.map((s, i) => <div key={s.cls} className="scene-name" style={{ font: 'var(--t-head-3)' }}><span style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)', marginRight: 14 }}>{i + 1}</span>{s.title}</div>)}
          <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)', marginTop: 20 }}>Staged projects: the words and the replies are word for word from the product’s demo data.</div>
        </div>
      </div>
    </Page>
  )
}
