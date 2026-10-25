import { useRef, useState } from 'react'
import { useDialKit } from 'dialkit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { PickleLive, BlickyLive, type CastState } from '@design/cast/Live'
import { Cursor } from '@design/stage/Cursor'
import type { Timeline } from '@design/engine/types'
import { Page, span } from '../../brand/frame'
import { Screen, Bubble, Words, Listening, Pin, StampMark, Ring, useLoop, DESK } from '../clip/kit'

/** 6 · The demo, clip 1: onboarding, the first minute, as one looping scene (his brief 2026-10-25: "one being for
    onboarding, how it goes through the whoole flow iwth the real visualizaitons of it but cuter ui and slight movement
    zooming in an little"). 1 step: the clip plays on its own.

    Simulated from a real onboarding run: the beats are the app's (docs/nap/story/beats.json in the pickje repo) and every
    line is the one on screen in that run's frames (docs/nap/story/*.png). A line cut off in the frame starts with "…".
    The intro card's button is his: "Achieve my greatest dreams!". Nothing here is invented dialogue. */
const BEATS = [
  { t: 0, label: 'OB0 · The intro card' },
  { t: 2.4, label: 'OB1 · Shake your cursor' },
  { t: 6.4, label: 'OB2 · He asks your name; the mic opens' },
  { t: 10.4, label: 'OB3 · Blicky pops out of thin air' },
  { t: 13.8, label: 'OB4 · Circle what you mean' },
  { t: 18.2, label: 'OB5 · Ask about something from earlier' },
  { t: 21.4, label: 'OB6 · Tell it a task; Pickle stamps it' },
]
const P = { x: 760, y: 600 }                       // the cursor, where Pickle lives

export function ClipOnboarding() {
  const d = useDialKit('Clip: onboarding', { zoom: [1.22, 1, 1.6, 0.01], speed: [1, 0.5, 1.6, 0.05] })
  const root = useRef<HTMLDivElement>(null)
  const [pickle, setPickle] = useState<CastState>('idle'), [blicky, setBlicky] = useState<CastState>('idle')
  useLoop(root, (tl: Timeline) => {
    tl.timeScale(d.speed)
    const C = { x: DESK.w / 2, y: DESK.h / 2 }
    const cam = (p: { x: number; y: number }, s: number, at: number, dur = 1.4) => {
      const q = { x: p.x + (C.x - p.x) * 0.35, y: p.y + (C.y - p.y) * 0.35 }
      tl.to('[data-cam]', { x: q.x - s * p.x, y: q.y - s * p.y, scale: s, duration: dur, ease: 'power2.inOut' }, at)
    }
    const on = (sel: string, at: number, extra: Record<string, unknown> = {}) => tl.fromTo(sel, { autoAlpha: 0, y: 10, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: 'back.out(2)', ...extra }, at)
    const off = (sel: string, at: number) => tl.to(sel, { autoAlpha: 0, duration: 0.22 }, at)
    // the start of each loop: only the intro card and the cursor
    tl.set('[data-cam]', { transformOrigin: '0 0', x: 0, y: 0, scale: 1 }, 0)
    tl.set('.ob-hide', { autoAlpha: 0 }, 0)
    tl.set('.card', { autoAlpha: 1, scale: 1 }, 0)
    tl.set('.t2', { autoAlpha: 0 }, 0).set('.t1', { autoAlpha: 1 }, 0)
    tl.set('.beat', { opacity: 0.32 }, 0)
    BEATS.forEach((b, i) => tl.to('.beat', { opacity: (j: number) => (j === i ? 1 : 0.32), duration: 0.25 }, b.t))
    // OB0 → OB1: the card asks for a shake; the cursor wiggles; Pickle pops in waving and types who he is
    tl.to('.t1', { autoAlpha: 0, duration: 0.2 }, 1.6).to('.t2', { autoAlpha: 1, duration: 0.2 }, 1.8)
    tl.to('.cursor', { keyframes: { x: [0, -14, 14, -12, 12, -6, 0] }, duration: 0.7, ease: 'none' }, 2.4)
    tl.to('.card', { autoAlpha: 0, scale: 0.9, duration: 0.3 }, 3.1)
    tl.fromTo('.pickle', { autoAlpha: 0, scale: 0.2 }, { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'back.out(2.4)', transformOrigin: '20% 100%' }, 3.2)
    cam(P, d.zoom, 3.1)
    tl.call(() => setPickle('talking'), [], 3.5)
    on('.pb1', 3.6); off('.pb1', 5.0); on('.pb2', 5.1)
    // OB2: he asks your name; the mic opens; your words come back
    off('.pb2', 6.3); on('.pb3', 6.4)
    tl.call(() => setPickle('listening'), [], 7.4)
    on('.listen', 7.4); on('.words', 8.4); off('.listen', 9.6)
    // OB3: Blicky's butt peeks from the corner, then he pops out and says what he does
    off('.pb3', 10.2); off('.words', 10.2)
    tl.call(() => setPickle('idle'), [], 10.2)
    cam({ x: 1180, y: 700 }, d.zoom * 0.96, 10.2)
    tl.fromTo('.blicky', { x: 260, y: 140, autoAlpha: 1, rotation: 160 }, { x: 170, y: 80, rotation: 160, duration: 0.5, ease: 'power2.out' }, 10.5)
    tl.to('.blicky', { x: 0, y: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.8)' }, 11.3)
    tl.call(() => setBlicky('talking'), [], 11.7)
    on('.bb1', 11.8)
    // OB4: circle what you mean; each circle leaves a numbered mini Pickle
    off('.bb1', 13.6)
    cam({ x: 520, y: 430 }, 1.08, 13.6, 1.2)
    on('.doc', 13.8)
    tl.call(() => setBlicky('idle'), [], 13.8)
    tl.fromTo('.c1 .ink', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'none' }, 14.6)
    on('.pin1', 15.2)
    tl.fromTo('.c2 .ink', { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'none' }, 15.6)
    on('.pin2', 16.2)
    tl.call(() => setBlicky('talking'), [], 16.4)
    on('.bb2', 16.4)
    // OB5: ask about something from earlier; the past frame comes back as a card
    off('.bb2', 18.0); off('.doc', 18.0); off('.pin1', 18.0); off('.pin2', 18.0); off('.c1', 18.0); off('.c2', 18.0)
    cam({ x: 820, y: 470 }, d.zoom * 0.92, 18.0)
    on('.past', 18.4); on('.bb3', 19.2)
    // OB6: tell it a task: Blicky prompts, you say it, Pickle stamps it, Blicky says it's done
    off('.past', 21.2); off('.bb3', 21.2)
    cam({ x: 900, y: 640 }, d.zoom, 21.2)
    on('.bb4', 21.4); on('.words2', 22.8)
    tl.fromTo('.stamp', { autoAlpha: 0, scale: 1.6, rotation: -30 }, { autoAlpha: 1, scale: 1, rotation: -12, duration: 0.18, ease: 'power4.in' }, 24.0)
    off('.bb4', 24.4); on('.bb5', 24.5)
    // and back out, to the card's last line
    off('.bb5', 26.8); off('.words2', 26.8); off('.stamp', 26.8)
    tl.call(() => { setBlicky('idle'); setPickle('idle') }, [], 26.8)
    cam(C, 1, 26.8, 1.2)
    on('.end', 27.4)
    tl.to({}, { duration: 1.6 }, 28)
  }, 16.6, [d.zoom, d.speed])

  return (
    <Page title="The first minute with pickje">
      <div ref={root} style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <Screen width={1040}>
          {/* OB0: the intro card, his button */}
          <div className="card" style={{ position: 'absolute', left: 496, top: 230, width: 520, padding: '34px 36px', borderRadius: 26, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 2px 0 oklch(0.3 0.01 230 / .12)', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 14, height: 150 }}><Pickle pose="wave" height={140} /><Blicky pose="wave" height={98} /></div>
            <div style={{ position: 'relative', height: 50, marginTop: 18 }}>
              <div className="t1" style={{ position: 'absolute', inset: 0, font: '700 34px var(--font-head)', letterSpacing: '-0.02em' }}>Meet Pickle and Blicky.</div>
              <div className="t2" style={{ position: 'absolute', inset: 0, font: '700 34px var(--font-head)', letterSpacing: '-0.02em' }}>Shake your cursor.</div>
            </div>
            <div style={{ display: 'inline-block', marginTop: 16, padding: '12px 26px', borderRadius: 14, background: 'var(--surface-night)', color: 'var(--text-on-dark)', font: '600 19px var(--font-head)' }}>Achieve my greatest dreams!</div>
          </div>
          {/* OB4: a page to circle on */}
          <div className="doc ob-hide" style={{ position: 'absolute', left: 150, top: 150, width: 560, height: 560, borderRadius: 18, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair)', padding: '34px 40px' }}>
            <div style={{ font: '700 28px var(--font-head)' }}>Problem set 4</div>
            {[260, 380, 300, 420, 340, 260, 390].map((w, i) => <div key={i} style={{ height: 14, width: w, borderRadius: 7, background: 'var(--silver-200)', margin: '30px 0 0' }} />)}
          </div>
          <div className="c1 ob-hide"><Ring x={180} y={244} w={330} h={36} /></div>
          <div className="c2 ob-hide"><Ring x={180} y={420} w={400} h={36} /></div>
          <Pin n={1} className="pin1 ob-hide" style={{ left: 538, top: 214 }} />
          <Pin n={2} className="pin2 ob-hide" style={{ left: 608, top: 390 }} />
          {/* OB5: a frame from earlier, back as a card */}
          <div className="past ob-hide" style={{ position: 'absolute', left: 560, top: 300, width: 380, padding: 12, borderRadius: 16, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 2px 0 oklch(0.3 0.01 230 / .12)' }}>
            <div style={{ height: 200, borderRadius: 10, background: 'linear-gradient(180deg, var(--silver-50), var(--silver-100))', boxShadow: 'inset 0 0 0 1px var(--silver-200)', padding: 20 }}>
              {[220, 280, 180, 250].map((w, i) => <div key={i} style={{ height: 11, width: w, borderRadius: 6, background: 'var(--silver-300)', marginTop: i ? 18 : 4 }} />)}
            </div>
            <div style={{ font: '400 15px var(--font-pixel)', color: 'var(--text-muted)', marginTop: 10 }}>from earlier</div>
          </div>
          {/* the cast */}
          <div className="cursor" style={{ position: 'absolute', left: P.x, top: P.y }}><Cursor size={30} /></div>
          <div className="pickle ob-hide" style={{ position: 'absolute', left: P.x + 18, top: P.y + 16 }}><PickleLive state={pickle} height={112} /></div>
          <div className="blicky ob-hide" style={{ position: 'absolute', left: 1150, top: 640 }}><BlickyLive state={blicky} height={112} /></div>
          <Listening className="listen ob-hide" style={{ left: P.x + 140, top: P.y + 150 }} />
          <StampMark className="stamp ob-hide" style={{ left: P.x - 70, top: P.y + 66 }} />
          {/* the lines, as in the run's frames */}
          <Bubble who="pickle" className="pb1 ob-hide" style={{ left: P.x + 140, top: P.y - 70 }}>Hi, I’m Pickle.</Bubble>
          <Bubble who="pickle" className="pb2 ob-hide" style={{ left: P.x + 140, top: P.y - 120 }} width={430}>…and everything you tell me, so nothing gets lost.</Bubble>
          <Bubble who="pickle" className="pb3 ob-hide" style={{ left: P.x + 140, top: P.y - 120 }} width={450}>yo! you look great today, what should i call u?</Bubble>
          <Words className="words ob-hide" style={{ left: P.x + 140, top: P.y + 70 }}>you can call me johnny</Words>
          <Bubble who="blicky" className="bb1 ob-hide" style={{ left: 760, top: 470 }} width={380}>…screen and talks you through stuff.</Bubble>
          <Bubble who="blicky" className="bb2 ob-hide" style={{ left: 780, top: 520 }} width={380}>point 1, point 2, and what you want to know.</Bubble>
          <Bubble who="blicky" className="bb3 ob-hide" style={{ left: 980, top: 400 }} width={360}>…looked at a little while ago.</Bubble>
          <Bubble who="blicky" className="bb4 ob-hide" style={{ left: 820, top: 440 }} width={420}>try: write a short haiku about pickles in haiku.md</Bubble>
          <Words className="words2 ob-hide" style={{ left: 470, top: P.y + 170 }}>write a short haiku about pickles in haiku.md</Words>
          <Bubble who="blicky" className="bb5 ob-hide" style={{ left: 820, top: 470 }} width={400}>written into a file called haiku.md</Bubble>
          <div className="end ob-hide" style={{ position: 'absolute', left: 496, top: 330, width: 520, padding: '30px 36px', borderRadius: 26, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair)', textAlign: 'center', font: '700 34px var(--font-head)', letterSpacing: '-0.02em' }}>Shake me to see it work.</div>
        </Screen>
        <div style={{ width: span(4), display: 'grid', gap: 18, paddingTop: 10 }}>
          {BEATS.map((b) => <div key={b.label} className="beat" style={{ font: 'var(--t-head-3)', color: 'var(--ink)' }}>{b.label}</div>)}
          <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)', marginTop: 20 }}>Simulated from a real onboarding run: its beats and its lines, in the brand’s cast.</div>
        </div>
      </div>
    </Page>
  )
}
