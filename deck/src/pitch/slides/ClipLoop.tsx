import { useRef, useState } from 'react'
import { useDialKit } from 'dialkit'
import { PickleLive, BlickyLive, type CastState } from '@design/cast/Live'
import { Surface } from '@design/material/Surface'
import { Cursor } from '@design/stage/Cursor'
import type { Timeline } from '@design/engine/types'
import { Page, span } from '../../brand/frame'
import { Screen, Bubble, Words, Ring, Worksheet, IrFigure, useLoop } from '../clip/kit'

/** 8 · The demo, clip 3: one turn, close up, looping (his brief 2026-10-25: "a hsort looping clip that shows how we talked
    to it and saw how it was able to execute each step properly"). 1 step.
    You talk (circling the band) → Blicky flies there and marks it first → his voice waits for each mark: line 1 only once
    ring 1 has its ink, line 2 only once ring 2 does (the app's voice gate, app/shell/README.md "The voice waits for its
    mark") → the screen is crowded, so the diagram flies into his scratchpad (his words: "if it gets too cluttered it can pull
    the diagrma form on the screen and save it in the scratch pad").
    The words and the reply are word for word from the staged o-chem project (app/recall/staged.ts, the Friday session). */
const SAID = 'molecule B has the broad thing at 3000 and a peak at 1710, ester or acid'
const LINE1 = 'the broad band from 2500 to 3300 is an O–H,'
const LINE2 = 'so it’s the acid, not the ester; the 1710 is its C=O.'
const STAGES = ['You talk', 'Blicky marks the spot first', 'His voice waits for each mark', 'Crowded? Saved to his scratchpad']
const PAD = { x: 1110, y: 520, w: 330, h: 400 }

export function ClipLoop() {
  const d = useDialKit('Clip: the loop', { zoom: [1.14, 1, 1.5, 0.01], speed: [1, 0.5, 1.6, 0.05] })
  const root = useRef<HTMLDivElement>(null), said = useRef<HTMLSpanElement>(null)
  const [blicky, setBlicky] = useState<CastState>('idle'), [pickle, setPickle] = useState<CastState>('idle')
  useLoop(root, (tl: Timeline) => {
    tl.timeScale(d.speed)
    const band = { x: 390, y: 390 }
    tl.set('[data-cam]', { transformOrigin: '0 0', x: 0, y: 0, scale: 1 }, 0)
    tl.set('.lp-hide', { autoAlpha: 0 }, 0).set('.marks', { x: 0, y: 0, scale: 1, autoAlpha: 1 }, 0)
    tl.set('.stage', { opacity: 0.3 }, 0).set('.curs', { x: 0, y: 0 }, 0).set('.blk', { x: 0, y: 0 }, 0)
    const stage = (i: number, at: number) => tl.to('.stage', { opacity: (j: number) => (j === i ? 1 : 0.3), duration: 0.25 }, at)
    // 1 · you talk: the cursor goes to the band and circles it while your words come in
    stage(0, 0.3)
    tl.to('[data-cam]', { x: band.x * (1 - d.zoom) * 0.7, y: band.y * (1 - d.zoom) * 0.7, scale: d.zoom, duration: 1.4, ease: 'power2.inOut' }, 0.3)
    tl.to('.curs', { x: band.x + 110 - 620, y: band.y + 40 - 720, duration: 0.6, ease: 'power2.inOut' }, 0.4)
    tl.call(() => setPickle('listening'), [], 0.8)
    tl.to('.curs', { keyframes: { x: [-120, -200, -300, -230, -120], y: [-330, -420, -330, -250, -330] }, duration: 1.6, ease: 'none' }, 1.0)
    tl.set('.said', { autoAlpha: 1 }, 0.9)
    const n = { v: 0 }
    tl.fromTo(n, { v: 0 }, { v: SAID.length, duration: 2.3, ease: 'none', onUpdate: () => { if (said.current) said.current.textContent = SAID.slice(0, Math.round(n.v)) } }, 0.9)
    // 2 · Blicky flies there and marks it first
    stage(1, 3.4)
    tl.call(() => { setPickle('idle'); setBlicky('dragged') }, [], 3.4)
    tl.to('.blk', { x: 500 - 1320, y: 540 - 820, duration: 0.7, ease: 'power2.inOut' }, 3.4)
    tl.call(() => setBlicky('sketching'), [], 4.1)
    tl.set('.m1', { autoAlpha: 1 }, 4.1)
    tl.fromTo('.m1 .ink', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'none' }, 4.1)
    tl.fromTo('.l1', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 4.75)
    // 3 · his voice waits for each mark: line 1 only after ring 1, line 2 only after ring 2
    stage(2, 4.9)
    tl.call(() => setBlicky('talking'), [], 4.9)
    tl.fromTo('.v1', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 4.9)
    tl.call(() => setBlicky('sketching'), [], 6.4)
    tl.to('.blk', { x: 760 - 1320, y: 540 - 820, duration: 0.45, ease: 'power2.inOut' }, 6.2)
    tl.set('.m2', { autoAlpha: 1 }, 6.6)
    tl.fromTo('.m2 .ink', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'none' }, 6.6)
    tl.fromTo('.l2', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 7.15)
    tl.call(() => setBlicky('talking'), [], 7.3)
    tl.fromTo('.v2', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 7.3)
    // 4 · crowded: the diagram flies into his scratchpad
    stage(3, 9.6)
    tl.to(['.said', '.v1', '.v2'], { autoAlpha: 0, duration: 0.3 }, 9.6)
    tl.to('[data-cam]', { x: 0, y: 0, scale: 1, duration: 1.0, ease: 'power2.inOut' }, 9.6)
    tl.fromTo('.pad', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 9.8)
    tl.to('.blk', { x: PAD.x + PAD.w - 60 - 1320, y: PAD.y - 70 - 820, duration: 0.7, ease: 'power2.inOut' }, 10.0)
    tl.to('.marks', { x: PAD.x + PAD.w / 2 - 505, y: PAD.y + 250 - 392, scale: 0.3, transformOrigin: '505px 392px', duration: 0.7, ease: 'power2.inOut' }, 10.3)
    tl.to('.marks', { autoAlpha: 0, duration: 0.15 }, 11.0)
    tl.fromTo('.pad-sketch', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 10.95)
    tl.call(() => setBlicky('idle'), [], 11.2)
    tl.to({}, { duration: 1.8 }, 11.3)
  }, 7.6, [d.zoom, d.speed])

  return (
    <Page title="Talk, mark, speak, save">
      <div ref={root} style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <Screen width={1040}>
          <Worksheet x={110} y={90} w={900} />
          {/* what Blicky draws: rings and his labels, in his ink */}
          <div className="marks" style={{ position: 'absolute', inset: 0 }}>
            <div className="m1 lp-hide"><Ring x={290} y={285} w={200} h={210} /></div>
            <div className="l1 lp-hide" style={{ position: 'absolute', left: 330, top: 520, font: '400 30px var(--font-second)', color: 'var(--blicky-ink)' }}>O–H</div>
            <div className="m2 lp-hide"><Ring x={672} y={300} w={46} h={200} /></div>
            <div className="l2 lp-hide" style={{ position: 'absolute', left: 735, top: 470, font: '400 30px var(--font-second)', color: 'var(--blicky-ink)' }}>C=O</div>
          </div>
          {/* his scratchpad: sky felt, a dot grid, the title, and the saved diagram */}
          <div className="pad lp-hide" style={{ position: 'absolute', left: PAD.x, top: PAD.y, width: PAD.w, height: PAD.h }}>
            <div style={{ position: 'absolute', left: 0, top: 22, right: 0, bottom: 0, borderRadius: 18, background: 'var(--surface-page)', backgroundImage: 'radial-gradient(circle, var(--silver-300) 1px, transparent 1.4px)', backgroundSize: '14px 14px',
              boxShadow: 'inset 0 0 0 2px oklch(0.85 0.01 225), 0 2px 0 oklch(0.3 0.01 230 / .14)' }} />
            <div style={{ position: 'absolute', left: -2, top: 0 }}><Surface material="felt" color="surface-felt-sky" width={PAD.w + 4} height={44} radius={14} shadow={0.5} spread={8} fringe={1} /></div>
            <div style={{ position: 'absolute', left: 22, top: 66, font: '700 25px var(--font-head)', letterSpacing: '-0.02em' }}>Molecule B is the acid</div>
            <div style={{ position: 'absolute', left: 22, top: 104, font: '400 18px/1.35 var(--font-second)', color: 'var(--blicky-ink)' }}>named molecule B: butanoic acid, not the ester</div>
            <div className="pad-sketch lp-hide" style={{ position: 'absolute', left: 32, top: 190, width: 266, height: 98, transform: 'scale(1)', transformOrigin: '0 0' }}>
              <div style={{ transform: 'scale(0.32)', transformOrigin: '0 0', width: 820, position: 'relative' }}>
                <IrFigure />
                <svg width={820} height={300} style={{ position: 'absolute', left: 0, top: 22 }}><path d="M240 40C340 30 352 240 240 244C130 248 132 44 240 40Z" fill="none" stroke="var(--blicky-ink)" strokeWidth={9} /><path d="M545 50C580 50 580 250 545 250C510 250 510 50 545 50Z" fill="none" stroke="var(--blicky-ink)" strokeWidth={9} /></svg>
              </div>
            </div>
          </div>
          {/* the cast */}
          <div className="curs" style={{ position: 'absolute', left: 620, top: 720 }}>
            <Cursor size={30} />
            <div style={{ position: 'absolute', left: 18, top: 16 }}><PickleLive state={pickle} height={100} /></div>
          </div>
          <Words className="said lp-hide" style={{ left: 120, top: 780, maxWidth: 820 }}><span ref={said} /></Words>
          <div className="blk" style={{ position: 'absolute', left: 1320, top: 820 }}><BlickyLive state={blicky} height={108} /></div>
          <Bubble who="blicky" className="v1 lp-hide" width={520} style={{ left: 760, top: 110 }}>{LINE1}</Bubble>
          <Bubble who="blicky" className="v2 lp-hide" width={520} style={{ left: 760, top: 270 }}>{LINE2}</Bubble>
        </Screen>
        <div style={{ width: span(4), display: 'grid', gap: 22, paddingTop: 10 }}>
          {STAGES.map((s, i) => <div key={s} className="stage" style={{ font: 'var(--t-head-3)' }}><span style={{ font: 'var(--t-pixel-3)', color: 'var(--text-muted)', marginRight: 14 }}>{i + 1}</span>{s}</div>)}
          <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)', marginTop: 20 }}>One turn from the staged o-chem project, word for word. The voice waits for its mark, as in the app.</div>
        </div>
      </div>
    </Page>
  )
}
