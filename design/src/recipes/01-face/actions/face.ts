import { gsap } from '../../../engine/gsap'

export type FaceEls = { eyeL: SVGElement; eyeR: SVGElement; body: SVGElement; arms: SVGElement[] }
export type FaceParams = { lag: number; inward: number; saccade: number; blink: number }

/** Pickle's face on one clock: look around, listen (eyes all the way in), talk back (left, right, then a stare). The left
    dot always lags the right one a hair and overshoots a little: that is the dingy part. Labels: idle, listening, talking. */
export function face(e: FaceEls, p: FaceParams) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'back.out(2.2)' } })
  const both = (vars: { x: number; y: number }, at: number | string, dur = 0.32, rDelta = { x: 0, y: 0 }) => {
    tl.to(e.eyeR, { x: vars.x + rDelta.x, y: vars.y + rDelta.y, duration: dur }, at)
    tl.to(e.eyeL, { x: vars.x, y: vars.y, duration: dur * 1.15 }, typeof at === 'number' ? at + p.lag : `${at}+=${p.lag}`)
  }
  const blink = (at: number | string) => {
    tl.to([e.eyeR, e.eyeL], { scaleY: 0.08, duration: p.blink / 2, ease: 'power2.in', transformOrigin: '50% 50%' }, at)
      .to([e.eyeR, e.eyeL], { scaleY: 1, duration: p.blink / 2, ease: 'power2.out' })
  }

  // idle: a look around, a blink
  tl.addLabel('idle', 0)
  both({ x: -6, y: 1 }, 0.4)
  both({ x: 7, y: -2 }, 1.4)
  both({ x: 2, y: -6 }, 2.3)
  blink(3.0)
  both({ x: 0, y: 0 }, 3.4)

  // listening: the dots slide all the way in toward each other and lift a touch; small focused jiggles while he listens
  tl.addLabel('listening', 4.2)
  tl.to(e.eyeL, { x: 5 * p.inward, y: -2, duration: 0.45 }, 'listening')
  tl.to(e.eyeR, { x: -5 * p.inward, y: -2, duration: 0.4 }, `listening+=${p.lag}`)
  tl.to(e.body, { scaleY: 0.985, scaleX: 1.012, duration: 0.5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 'listening')
  for (let i = 0; i < 4; i++) tl.to([e.eyeL, e.eyeR], { y: i % 2 ? -2 : -3.2, duration: 0.35, ease: 'sine.inOut' }, `listening+=${0.7 + i * 0.4}`)
  tl.to(e.body, { scaleY: 1, scaleX: 1, duration: 0.5, ease: 'sine.inOut' }, 'listening+=2.4')

  // talking back: look at you, dart left and right, then hold a stare
  tl.addLabel('talking', 7.2)
  both({ x: 0, y: 1 }, 'talking', 0.3)
  both({ x: -7 * p.saccade, y: 1 }, 'talking+=0.6', 0.18)
  both({ x: 7 * p.saccade, y: 1 }, 'talking+=1.0', 0.18)
  both({ x: -5 * p.saccade, y: 1 }, 'talking+=1.4', 0.16)
  both({ x: 6 * p.saccade, y: 1 }, 'talking+=1.75', 0.16)
  tl.addLabel('stare', 'talking+=2.2')
  both({ x: 0, y: 1.5 }, 'stare', 0.25)
  tl.to([e.eyeL, e.eyeR], { scale: 1.12, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 'stare+=0.1')
  tl.to({}, { duration: 1.6 }, 'stare+=0.4')
  tl.to([e.eyeL, e.eyeR], { scale: 1, duration: 0.3, ease: 'power2.out' }, 'stare+=2.0')
  blink('stare+=2.3')
  both({ x: 0, y: 0 }, 'stare+=2.6')
  tl.to({}, { duration: 0.6 })
  return tl
}
