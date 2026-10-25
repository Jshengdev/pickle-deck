import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../engine/gsap'
import { PickleArt } from './PickleArt'
import { BlickyArt } from './BlickyArt'
import TUNING from './live.tuning.json'

/** Blicky and Pickle alive, in the states of everyday use (his words, 2026-10-24: "right now we are trying to get the
    states in… IT should honeslty match the pikcle… something more for the regualr use"). Both share one rig and one
    state set, so they always feel like the same family: the approved drawings, dot eyes where the left one lags and
    overshoots, a breath, and each state's own small loop. Only the drawing's own parts move (eyes, body, arms, legs). */
export type CastState = 'asleep' | 'idle' | 'listening' | 'working' | 'talking' | 'sketching' | 'caught' | 'checked' | 'stuck' | 'dazed' | 'dragged'
export const CAST_STATES: { state: CastState; says: string }[] = [
  { state: 'asleep', says: 'asleep' }, { state: 'idle', says: 'here with you' }, { state: 'listening', says: 'listening' },
  { state: 'working', says: 'on it' }, { state: 'talking', says: 'talking' }, { state: 'sketching', says: 'showing you' },
  { state: 'caught', says: 'caught one' }, { state: 'checked', says: 'done' }, { state: 'stuck', says: 'stuck' },
  { state: 'dazed', says: 'just woke' }, { state: 'dragged', says: 'picked up' },
]

type Who = 'pickle' | 'blicky'
// joints in each drawing's own viewBox units (svgOrigin)
const J = {
  pickle: { armL: '56 176', armR: '152 176', legL: '87 278', legR: '121 278', body: '104 280' },
  blicky: { armL: '34 112', armR: '185 104', legL: '88 168', legR: '132 168', body: '108 170' },
} as const
// how far a raised arm turns before it hides behind the body (see Cast.tsx)
const LIFT = { pickle: 96, blicky: 52 }

export type Tune = Record<string, number>
/** The tuned defaults for each state (live.tuning.json); a `tune` prop overrides any of them. */
export const LIVE_TUNING = TUNING as unknown as Record<CastState, Tune>
export type LiveProps = { state?: CastState; height: number; tune?: Tune; style?: CSSProperties; children?: ReactNode }

function useLive(who: Who, state: CastState, tune?: Tune) {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const root = scope.current!
    const q = (s: string) => root.querySelector(s) as SVGElement
    const eyeL = q('[data-part="eye-l"]'), eyeR = q('[data-part="eye-r"]'), body = q('[data-part="body"]')
    const armL = q('[data-part="arm-l"]'), armR = q('[data-part="arm-r"]'), legL = q('[data-part="leg-l"]'), legR = q('[data-part="leg-r"]')
    const extras = [...root.querySelectorAll('[data-live]')] as HTMLElement[]
    const j = J[who], lift = LIFT[who]
    const t = { ...LIVE_TUNING[state], ...tune }
    gsap.set([eyeL, eyeR], { transformOrigin: '50% 50%' })
    gsap.set(armL, { svgOrigin: j.armL }); gsap.set(armR, { svgOrigin: j.armR })
    gsap.set(legL, { svgOrigin: j.legL }); gsap.set(legR, { svgOrigin: j.legR }); gsap.set(body, { svgOrigin: j.body })
    gsap.set(extras, { autoAlpha: 0 })
    const show = (name: string) => gsap.set(root.querySelector(`[data-live="${name}"]`), { autoAlpha: 1 })
    // the eyes move as a pair; the left dot lags and overshoots (the dingy part, as in Pickle's face)
    const lag = t.lag ?? 0.06, over = `back.out(${t.overshoot ?? 2.2})`
    const eyes = (tl: gsap.core.Timeline, x: number, y: number, at: number | string, dur = 0.3) => {
      tl.to(eyeR, { x, y, duration: dur, ease: over }, at)
      tl.to(eyeL, { x, y, duration: dur * 1.15, ease: over }, typeof at === 'number' ? at + lag : `${at}+=${lag}`)
    }
    const blink = (tl: gsap.core.Timeline, at: number | string) =>
      tl.to([eyeL, eyeR], { scaleY: 0.08, duration: 0.07, ease: 'power2.in' }, at).to([eyeL, eyeR], { scaleY: 1, duration: 0.07, ease: 'power2.out' })
    const breath = (depth = 0.02, dur = 2) =>
      gsap.to(body, { scaleY: 1 + depth, duration: dur, ease: 'sine.inOut', repeat: -1, yoyo: true })
    const loop = () => gsap.timeline({ repeat: -1 })

    if (state === 'asleep') {
      gsap.set([eyeL, eyeR], { scaleY: 0.08, y: 2 }); gsap.set(armL, { rotation: 6 }); gsap.set(armR, { rotation: -6 })
      breath(t.breath, t.breathTime); show('zs')
      gsap.fromTo(root.querySelector('[data-live="zs"]'), { y: 6, autoAlpha: 0 }, { y: 6 - t.zRise, autoAlpha: 1, duration: t.breathTime, ease: 'sine.out', repeat: -1 })
    }
    if (state === 'idle') {
      breath(t.breath, t.breathTime)
      const tl = loop(), k = t.look / 7, e = t.lookEvery
      eyes(tl, -6 * k, 1, 0.4 * e); eyes(tl, 7 * k, -2 * k, 1.5 * e); eyes(tl, 2 * k, -5 * k, 2.4 * e); blink(tl, 3.1 * e); eyes(tl, 0, 0, 3.5 * e); tl.to({}, { duration: 0.8 * e })
    }
    if (state === 'listening') {
      breath(0.015)
      const tl = loop()
      tl.to(eyeL, { x: t.inward, y: -2, duration: 0.4, ease: 'back.out(2)' }, 0).to(eyeR, { x: -t.inward, y: -2, duration: 0.35, ease: 'back.out(2)' }, t.lag)
      tl.to(body, { rotation: who === 'blicky' ? -t.lean : t.lean, duration: 0.5, ease: 'sine.out' }, 0)
      for (let i = 0; i < 6; i++) tl.to([eyeL, eyeR], { y: i % 2 ? -2 : -2 - t.bob, duration: t.bobTime, ease: 'sine.inOut' }, 0.5 + i * (t.bobTime + 0.04))
      blink(tl, 0.5 + 6 * (t.bobTime + 0.04)); tl.to({}, { duration: 0.3 })
    }
    if (state === 'working') {
      breath(0.012)
      eyes(gsap.timeline(), -t.lookUp * 0.8, -t.lookUp, 0, 0.35)
      const tl = loop()
      tl.to(body, { rotation: t.sway, duration: t.swayTime, ease: 'sine.inOut' }).to(body, { rotation: -t.sway, duration: t.swayTime, ease: 'sine.inOut' })
      tl.to(armR, { rotation: -lift * t.tap, duration: 0.16, ease: 'power2.out', yoyo: true, repeat: Math.max(1, Math.round(t.taps) - 1) }, 0.1)   // a tap, a tap
      tl.to([eyeL, eyeR], { x: '+=3', duration: 0.25, ease: 'steps(1)', yoyo: true, repeat: 1 }, 0.8)
    }
    if (state === 'talking') {
      breath(0.01)
      show('say')
      const tl = loop()
      eyes(tl, 0, 1, 0, 0.25)
      const n = Math.round(t.words), w = t.wordTime, end = 0.2 + n * (w + 0.01)
      for (let i = 0; i < n; i++) tl.to(body, { scaleY: i % 2 ? 1 : 1 - t.squash, scaleX: i % 2 ? 1 : 1 + t.squash * 0.6, duration: w, ease: 'power1.inOut' }, 0.2 + i * (w + 0.01))
      eyes(tl, -t.dart, 1, end, 0.18); eyes(tl, t.dart, 1, end + 0.35, 0.18); eyes(tl, 0, 1, end + 0.7, 0.2)
      for (let i = 0; i < 4; i++) tl.to(body, { scaleY: i % 2 ? 1 : 1 - t.squash * 0.8, duration: w }, end + 0.9 + i * (w + 0.02))
      blink(tl, 2.6); tl.to({}, { duration: 0.6 })
    }
    if (state === 'sketching') {
      breath(0.01)
      show('pencil')
      eyes(gsap.timeline(), 5, 4, 0, 0.3)
      const tl = loop()
      // the hand scribbles in short strokes (machine-steady, not eased), the eyes follow the pencil
      for (let i = 0; i < Math.round(t.strokes); i++) tl.to(armR, { rotation: -lift * (t.reach + (i % 2) * t.spread), duration: t.strokeTime, ease: 'none' }, i * (t.strokeTime + 0.02))
      tl.to([eyeL, eyeR], { x: `+=${t.follow}`, duration: 0.2, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0)
      tl.to({}, { duration: 0.5 })
    }
    if (state === 'caught') {
      breath(0.01)
      const tl = loop()
      eyes(tl, 0, 1.5, 0, 0.22)
      tl.to(body, { rotation: who === 'blicky' ? t.tilt : -t.tilt, duration: 0.25, ease: 'back.out(2)' }, 0)
      tl.to([eyeL, eyeR], { scale: t.stare, duration: 0.25, ease: 'back.out(3)' }, 0.1)
      tl.to({}, { duration: t.hold })                                                 // it holds, and waits for you
      tl.to(body, { y: -t.nudge, duration: 0.09, ease: 'power2.out', yoyo: true, repeat: 1 })   // a small nudge: still here
      tl.to({}, { duration: 0.6 })
    }
    if (state === 'checked') {
      const tl = loop()
      tl.to([eyeL, eyeR], { scaleY: t.squint, duration: 0.12 }, 0)                    // happy squint
      tl.to(armL, { rotation: lift * t.lift, duration: 0.18, ease: 'back.out(2)' }, 0).to(armR, { rotation: -lift * t.lift, duration: 0.18, ease: 'back.out(2)' }, 0)
      tl.to(root.firstElementChild, { y: -t.hop, duration: 0.18, ease: 'power2.out' }, 0.05).to(root.firstElementChild, { y: 0, duration: 0.42, ease: 'bounce.out' })
      tl.to({}, { duration: 0.5 })
      tl.to([armL, armR], { rotation: 0, duration: 0.3, ease: 'power2.out' }).to([eyeL, eyeR], { scaleY: 1, duration: 0.15 }, '<')
      tl.to({}, { duration: t.rest })
    }
    if (state === 'stuck') {
      gsap.set(body, { scaleY: 1 - t.slump, rotation: -t.lean }); gsap.set([eyeL, eyeR], { y: 4, x: -2 })
      gsap.set(armL, { rotation: -t.droop }); gsap.set(armR, { rotation: t.droop })
      const tl = loop()
      tl.to(body, { rotation: -t.lean * 1.5, duration: t.swayTime, ease: 'sine.inOut', yoyo: true, repeat: 1 })
      blink(tl, 1.0); tl.to({}, { duration: 0.6 })
    }
    if (state === 'dazed') {
      show('stars')
      gsap.to(root.querySelector('[data-live="stars"]'), { rotation: 360, duration: t.spin, ease: 'none', repeat: -1 })
      gsap.set([eyeL, eyeR], { scaleY: 0.7 })
      const tl = loop(), c = t.circle, ct = t.circleTime
      // the eyes go round, a little out of step, and the body wobbles back to centre
      const ring = [[c, 0], [0, c * 0.75], [-c, 0], [0, -c * 0.75]]
      ring.forEach(([x, y], i) => { tl.to(eyeR, { x, y, duration: ct, ease: 'sine.inOut' }, i * ct); tl.to(eyeL, { x: -x, y: -y, duration: ct, ease: 'sine.inOut' }, i * ct + 0.05) })
      tl.to(body, { rotation: t.wobble, duration: ct * 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
    }
    if (state === 'dragged') {
      gsap.set([eyeL, eyeR], { scale: t.wide, y: 3 }); gsap.set(armL, { rotation: lift * t.lift }); gsap.set(armR, { rotation: -lift * t.lift })
      // the feet swing free, like a pendulum that never quite settles (his words: "his feet will flow freely")
      gsap.to(legL, { rotation: t.swing, duration: t.swingTime, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.fromTo(legR, { rotation: -t.swing * 0.45 }, { rotation: t.swing * 1.1, duration: t.swingTime * 1.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.12 })
      gsap.to(root.firstElementChild, { rotation: t.tilt, duration: t.swingTime * 1.3, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 0%' })
    }
  }, { scope, dependencies: [state, who, JSON.stringify(tune ?? {})], revertOnUpdate: true })
  return scope
}

/** Overlays that belong to a state: the pencil (sketching), the bubble (talking), z (asleep), stars (dazed). */
function Extras({ who, h, line }: { who: Who; h: number; line?: ReactNode }) {
  const w = who === 'blicky' ? h * 1.1 : h * (200 / 330)
  return (
    <>
      <svg data-live="pencil" viewBox="0 0 60 60" width={h * 0.34} style={{ position: 'absolute', left: w * 0.84, top: h * 0.02, overflow: 'visible' }}>
        <g transform="rotate(35 30 30)" stroke="var(--ink)" strokeWidth="5" strokeLinejoin="round">
          <rect x="22" y="2" width="16" height="40" rx="3" fill="var(--attention)" /><path d="M22 42L30 58L38 42Z" fill="var(--silver-100)" /><path d="M27 52L30 58L33 52Z" fill="var(--ink)" strokeWidth="2" />
        </g>
      </svg>
      <span data-live="zs" style={{ position: 'absolute', left: w * 0.86, top: -h * 0.12, font: `${Math.max(12, h * 0.16)}px/1 var(--font-dot)`, color: 'var(--ink)' }}>z<span style={{ fontSize: '0.7em', verticalAlign: 'super' }}>z</span></span>
      <svg data-live="stars" viewBox="-50 -50 100 100" width={w * 0.9} style={{ position: 'absolute', left: w * 0.05, top: -h * 0.22, overflow: 'visible' }}>
        {[0, 120, 240].map((a) => {
          const x = Math.cos((a * Math.PI) / 180) * 38, y = Math.sin((a * Math.PI) / 180) * 12, s = 9
          return <path key={a} d={`M${x} ${y - s}L${x + s / 3} ${y - s / 3}L${x + s} ${y}L${x + s / 3} ${y + s / 3}L${x} ${y + s}L${x - s / 3} ${y + s / 3}L${x - s} ${y}L${x - s / 3} ${y - s / 3}Z`} fill="var(--attention)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        })}
      </svg>
      <span data-live="say" style={{ position: 'absolute', left: w * 1.02, top: -h * 0.18, padding: `${Math.max(5, h * 0.06)}px ${Math.max(8, h * 0.09)}px`, borderRadius: Math.max(10, h * 0.1),
        background: 'var(--surface-plane)', boxShadow: 'inset 1px 1px 0 oklch(1 0 0 / .9), 0 1px 0 oklch(0.3 0.01 230 / .25)', font: `${Math.max(12, h * 0.12)}px/1.2 var(--font-dot)`, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
        {line ?? 'on the header, got it'}
      </span>
    </>
  )
}

/** Blicky alive, in one of the everyday states. */
export function BlickyLive({ state = 'idle', height, tune, style, children }: LiveProps) {
  const scope = useLive('blicky', state, tune)
  return (
    <div ref={scope} style={{ position: 'relative', display: 'inline-block', lineHeight: 0, ...style }}>
      <div style={{ display: 'inline-block' }}><BlickyArt height={height} /></div>
      <Extras who="blicky" h={height} line={children} />
    </div>
  )
}

/** Pickle alive, in the same states (Pickle listens and keeps the context; only Blicky talks, by his rule). */
export function PickleLive({ state = 'idle', height, tune, style, children }: LiveProps) {
  const scope = useLive('pickle', state, tune)
  return (
    <div ref={scope} style={{ position: 'relative', display: 'inline-block', lineHeight: 0, ...style }}>
      <div style={{ display: 'inline-block' }}><PickleArt height={height} /></div>
      <Extras who="pickle" h={height} line={children} />
    </div>
  )
}
