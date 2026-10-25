import { useEffect, useRef, useState } from 'react'
import { motion, animate, useMotionValue, useTransform, type AnimationPlaybackControls } from 'motion/react'
import { useDialKit } from 'dialkit'
import { M } from '../../brand/frame'
import { useStep } from '../kit/step'
import { Cursor } from '@design/stage/Cursor'
import { Screen, DESK, isPrint } from '../clip/kit'
import ob0Card from '../assets/onboarding/ob0-card.png'
import ob1Shake from '../assets/onboarding/ob1-shake.png'
import ob1Pop from '../assets/onboarding/ob1-pop.png'
import ob1Wave from '../assets/onboarding/ob1-wave.png'
import ob2Listening from '../assets/onboarding/ob2-listening.png'
import ob2Heard from '../assets/onboarding/ob2-heard.png'
import ob3Pop from '../assets/onboarding/ob3-pop.png'
import ob3Said from '../assets/onboarding/ob3-said.png'
import ob4Asks from '../assets/onboarding/ob4-asks.png'
import ob4Pins from '../assets/onboarding/ob4-pins.png'
import ob5Asks from '../assets/onboarding/ob5-asks.png'

/** 13 · The onboarding: a press per beat, OB0 → OB5, on the REAL frames the app rendered of its own onboarding
    (assets/onboarding/*.png + beats.json, copied from the pickje repo's docs/nap/story/).

    His brief (2026-10-25, 4:38 AM, voice): "Then we're gonna do the intro into the entire demo. Make it so that when I
    click the next tab, it will go into the next part of the demo. So then OB zero, OB one, OB two, OB three, OB four,
    OB five. These are all going to be live, and make it so that they look as real to the live visualization as
    possible… show how the onboarding looks end to end. And then just do like the first couple parts of it where it's
    like you tell it your name, and then you do the circle and ask it to explain what's on the two points. I think
    that's probably the two coolest ones."

    His run-through (2026-10-25, 5:20 AM, voice), which the captions now follow: "So then here's the demonstration of
    the onboarding. Make it so that when include the shake your cursor to spawn in the pickle thing. That one was really
    cute. And then, Pickle pops up the cursor, shows that testing your mic, and then little Blicky will pop up, and then
    you can, you'll have the first feature you'll have is to be able to circle as you dictate, and it'll be able to watch
    the past footage and answer your questions, sequentially. And then you can also because it has context and you're
    able to reprime, uh, your thought process. To ask about something from earlier is designed so that you can resume
    context and then get caught up on what you were doing, especially what the things on your screen."

    The presses (9):
      0  OB0 · The intro card                      ob0-card (the two of them)
      1  OB1 · Shake your cursor to wake Pickle    ob1-shake (the intro card) + a cursor shaking beside it, where he spawns
      2  OB1 · Pickle pops up at your cursor       ob1-pop, then ob1-wave ("Hi, I'm Pickle.") 1.1 s later
      3  OB2 · He tests your mic                   ob2-listening, zoomed tighter
      4  OB2 · Your words show as heard            ob2-heard ("you can call me johnny"), pushes in further
      5  OB3 · Little Blicky pops up               ob3-pop, then ob3-said 1.4 s later
      6  OB4 · Circle as you talk                  ob4-asks ("point 1, point 2, and what you want to know.")
      7  OB4 · Each circle leaves a numbered pin   ob4-pins: pulls wide, then pushes in on the 2 circles
      8  OB5 · Ask about something from earlier    ob5-asks
    Captions: his run-through's words, lightly cleaned ("spawn in the pickle thing" → "wake Pickle", "pops up the
    cursor" → "pops up at your cursor", "testing your mic", "little Blicky will pop up", "circle as you dictate… watch the
    past footage and answer your questions, sequentially" → "circle as you talk: it watches what just happened and answers
    your points, one by one", "ask about something from earlier… get caught up on… the things on your screen"). OB0's
    "The intro card", OB2's "He asks your name; the mic opens" and "Your words show as heard" are beats.json's titles,
    verbatim. Every line in the bubbles is the app's own, as rendered in that frame (some frames catch a line mid-type,
    e.g. OB3's "screen and talks you through stuff.").

    The camera: every frame shares one coordinate system (the storyboard tool put its reference cast at the same top-left
    spot in each; only ob4-pins is shifted, by 161, 92). So one camera glides from beat to beat (a slow Ken Burns: pan +
    zoom, ~2.4 s) while the frames crossfade, and the live part (Pickle at the cursor with his lime bubble, Blicky with
    his blue one, the "listening" pill, your words, the pins) fills the screen. The reference cast stays out of view
    except on OB0 (where it IS the intro card) and OB4 (where it's what you circle). In ?print the camera rests.
    The one thing not from a frame: the cursor on the shake beat (ob1-shake.png is the same image as ob0-card, so the
    shake itself isn't in it). It's the brand's macOS cursor (@design/stage/Cursor), set where Pickle then spawns. */

// ── Words ──────────────────────────────────────────────────────────────────────────────────────────────────────
/** His words (run-through 5:20 AM: "here's the demonstration of the onboarding"), shortened. */
const TITLE = 'Here’s the onboarding.'

// ── The frames (pixel sizes as in beats.json; dx, dy place a frame in the shared coordinates) ─────────────────────
type FrameId = 'ob0-card' | 'ob1-shake' | 'ob1-pop' | 'ob1-wave' | 'ob2-listening' | 'ob2-heard' | 'ob3-pop' | 'ob3-said' | 'ob4-asks' | 'ob4-pins' | 'ob5-asks'
const FRAMES: { id: FrameId; src: string; w: number; h: number; dx?: number; dy?: number }[] = [
  { id: 'ob0-card', src: ob0Card, w: 534, h: 420 },
  { id: 'ob1-shake', src: ob1Shake, w: 534, h: 420 },
  { id: 'ob1-pop', src: ob1Pop, w: 900, h: 852 },
  { id: 'ob1-wave', src: ob1Wave, w: 1148, h: 845 },
  { id: 'ob2-listening', src: ob2Listening, w: 1341, h: 841 },
  { id: 'ob2-heard', src: ob2Heard, w: 1340, h: 843 },
  { id: 'ob3-pop', src: ob3Pop, w: 1140, h: 763 },
  { id: 'ob3-said', src: ob3Said, w: 1688, h: 761 },
  { id: 'ob4-asks', src: ob4Asks, w: 1704, h: 769 },
  { id: 'ob4-pins', src: ob4Pins, w: 1865, h: 854, dx: -161, dy: -92 },
  { id: 'ob5-asks', src: ob5Asks, w: 1592, h: 770 },
]
/** Where the cursor's tip sits on the shake beat (frame pixels): just above-left of where Pickle pops in ob1-pop. */
const CURSOR = { x: 700, y: 548 }

// ── The beats: one per press. A view is the camera: its centre (cx, cy) and how wide it sees (vw), in frame pixels ──
type View = { cx: number; cy: number; vw: number }
type Who = 'both' | 'pickle' | 'blicky'
type Beat = { ob: number; title: string; more?: string; who: Who; frames: { id: FrameId; at?: number }[]; to: View; via?: View }
const BEATS: Beat[] = [
  { ob: 0, title: 'The intro card', who: 'both', frames: [{ id: 'ob0-card' }], to: { cx: 267, cy: 210, vw: 820 } },
  { ob: 1, title: 'Shake your cursor to wake Pickle', who: 'pickle', frames: [{ id: 'ob1-shake' }], to: { cx: 470, cy: 360, vw: 985 } },
  { ob: 1, title: 'Pickle pops up at your cursor', who: 'pickle', frames: [{ id: 'ob1-pop' }, { id: 'ob1-wave', at: 1.1 }], to: { cx: 900, cy: 640, vw: 860 } },
  { ob: 2, title: 'He tests your mic', more: 'He asks your name; the mic opens.', who: 'pickle', frames: [{ id: 'ob2-listening' }], to: { cx: 1001, cy: 676, vw: 760 } },
  { ob: 2, title: 'Your words show as heard', who: 'pickle', frames: [{ id: 'ob2-heard' }], to: { cx: 990, cy: 688, vw: 660 } },
  { ob: 3, title: 'Little Blicky pops up', who: 'blicky', frames: [{ id: 'ob3-pop' }, { id: 'ob3-said', at: 1.4 }], to: { cx: 1175, cy: 616, vw: 1060 } },
  { ob: 4, title: 'Circle as you talk', more: 'It watches what just happened and answers your points, one by one.', who: 'blicky', frames: [{ id: 'ob4-asks' }], to: { cx: 1095, cy: 640, vw: 1240 } },
  { ob: 4, title: 'Each circle leaves a numbered pin', who: 'blicky', frames: [{ id: 'ob4-pins' }], via: { cx: 771, cy: 338, vw: 1900 }, to: { cx: 196, cy: 168, vw: 760 } },
  { ob: 5, title: 'Ask about something from earlier', more: 'It catches you up on what was on your screen.', who: 'blicky', frames: [{ id: 'ob5-asks' }], to: { cx: 1040, cy: 625, vw: 1120 } },
]
const SHAKE = 1   // the press with the shaking cursor
export const ONBOARDING_STEPS = BEATS.length
const OBS = [0, 1, 2, 3, 4, 5]
const INK: Record<Who, string> = { both: 'var(--ink)', pickle: 'var(--pickle-ink)', blicky: 'var(--blicky-ink)' }

export function Onboarding() {
  const step = Math.min(useStep(), BEATS.length - 1)
  const beat = BEATS[step]
  const print = isPrint()
  const d = useDialKit('Onboarding', {
    screen: [1200, 900, 1300, 10],     // the screen's width on the slide
    zoom: [1, 0.7, 1.5, 0.01],         // > 1 pushes every view in
    glide: [2.4, 0.6, 5, 0.1],         // s: the camera's move on a press
    settle: [3.2, 0.5, 6, 0.1],        // s: the slow push-in when the slide arrives
    fade: [0.55, 0.1, 2, 0.05],        // s: the crossfade between frames
  })

  // the camera, in frame pixels; the zoom runs on log(width) so it feels even
  const cx = useMotionValue(beat.to.cx), cy = useMotionValue(beat.to.cy), lz = useMotionValue(Math.log(beat.to.vw / d.zoom))
  const transform = useTransform([cx, cy, lz], ([x, y, z]: number[]) => {
    const k = DESK.w / Math.exp(z)
    return `translate(${DESK.w / 2 - x * k}px, ${DESK.h / 2 - y * k}px) scale(${k})`
  })
  const arrived = useRef(false)
  useEffect(() => {
    const at = (v: View) => [v.cx, v.cy, Math.log(v.vw / d.zoom)]
    const set = (v: View) => { const [a, b, c] = at(v); cx.set(a); cy.set(b); lz.set(c) }
    if (print) { set(beat.to); return }
    let path: View[], duration: number
    if (!arrived.current) {                       // arriving: a slow push-in on the beat
      arrived.current = true
      set(beat.via ?? { ...beat.to, vw: beat.to.vw * 1.14 })
      path = [beat.to]; duration = d.settle
    } else {                                      // a press: glide there (out wide first, if the beat has a via)
      path = beat.via ? [beat.via, beat.to] : [beat.to]; duration = beat.via ? d.glide * 1.6 : d.glide
    }
    const runs: AnimationPlaybackControls[] = [cx, cy, lz].map((mv, i) => {
      const keys = [mv.get(), ...path.map((v) => at(v)[i])]
      return animate(mv, keys, { duration, ease: 'easeInOut', times: keys.length === 3 ? [0, 0.34, 1] : undefined })
    })
    return () => runs.forEach((r) => r.stop())
  }, [step, d.zoom, d.glide, d.settle])          // eslint-disable-line react-hooks/exhaustive-deps

  // a beat with 2 frames plays them in turn, like the app does (in ?print, the last one)
  const [sub, setSub] = useState({ step, i: print ? beat.frames.length - 1 : 0 })
  useEffect(() => {
    const fs = BEATS[step].frames
    if (print) { setSub({ step, i: fs.length - 1 }); return }
    setSub({ step, i: 0 })
    const timers = fs.slice(1).map((f, i) => window.setTimeout(() => setSub({ step, i: i + 1 }), (f.at ?? 0) * 1000))
    return () => timers.forEach(clearTimeout)
  }, [step, print])
  const shown = beat.frames[sub.step === step ? sub.i : print ? beat.frames.length - 1 : 0].id

  const screenH = (d.screen - 24) / DESK.w * DESK.h + 24
  const top = 170, colW = 1920 - 2 * M - d.screen - 56
  return (
    <>
      {/* the left column: the title, then (at the screen's foot) the beat now playing and where we are */}
      <div style={{ position: 'absolute', left: M, top, width: colW, height: screenH, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>{TITLE}</h1>
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', height: 170 }}>
          {BEATS.map((b, i) => (
            <motion.div key={i} initial={false} animate={{ opacity: i === step ? 1 : 0, y: i === step ? 0 : i < step ? -16 : 16 }}
              transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.1 }}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, font: 'var(--t-head-2)', letterSpacing: 'var(--t-head-2-track)', color: 'var(--ink)', textWrap: 'balance' }}>
              <div><span style={{ fontWeight: 700, color: INK[b.who] }}>OB{b.ob}</span> · {b.title}</div>
              {b.more && <div style={{ marginTop: 10, font: 'var(--t-head-3)', letterSpacing: 'var(--t-head-3-track)', color: 'var(--text-secondary)' }}>{b.more}</div>}
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 34 }}>
          {OBS.map((n) => {
            const on = n === beat.ob
            return (
              <div key={n} style={{ position: 'relative', paddingBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-head)', fontSize: 'calc(24px * var(--type-scale, 1))', fontWeight: on ? 700 : 500, fontVariantNumeric: 'tabular-nums',
                  color: on ? INK[beat.who] : 'var(--text-muted)', transition: 'color 300ms' }}>OB{n}</span>
                <motion.i initial={false} animate={{ scaleX: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={{ type: 'spring', visualDuration: 0.4, bounce: 0.1 }}
                  style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, borderRadius: 2, background: INK[beat.who], transformOrigin: '0 50%' }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* the hero: the real frames on a polished screen, one camera gliding across them */}
      <div style={{ position: 'absolute', right: M, top }}>
        <Screen width={d.screen}>
          {/* the frames' own grey, taken from a frame's corner pixels (no new colour) and stretched behind them */}
          <div style={{ position: 'absolute', left: 0, top: 0, width: 2, height: 2, overflow: 'hidden', transform: 'scale(800)', transformOrigin: '0 0' }}>
            <img src={ob0Card} alt="" style={{ display: 'block' }} />
          </div>
          <motion.div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform }}>
            {FRAMES.map((f) => {
              const on = f.id === shown
              return (
                <motion.img key={f.id} src={f.src} alt={on ? `${beat.title} (the app's onboarding, ${f.id})` : ''} draggable={false}
                  initial={false} animate={{ opacity: on ? 1 : 0 }}
                  transition={on ? { duration: d.fade, ease: 'easeOut' } : { duration: d.fade, delay: d.fade * 0.4, ease: 'easeIn' }}
                  style={{ position: 'absolute', left: f.dx ?? 0, top: f.dy ?? 0, width: f.w, height: f.h, maxWidth: 'none', display: 'block', zIndex: on ? 2 : 1 }} />
              )
            })}
            {/* the shake: the cursor wiggles where Pickle is about to spawn, then fades as he pops in */}
            <motion.div initial={false} animate={{ opacity: step === SHAKE ? 1 : 0 }} transition={{ duration: d.fade }}
              style={{ position: 'absolute', left: CURSOR.x, top: CURSOR.y, zIndex: 3, pointerEvents: 'none' }}>
              <motion.div initial={false}
                animate={step === SHAKE && !print ? { x: [0, -16, 16, -14, 14, -9, 9, 0], y: [0, 3, -3, 3, -2, 2, -1, 0] } : { x: 0, y: 0 }}
                transition={step === SHAKE && !print ? { duration: 0.75, ease: 'linear', repeat: Infinity, repeatDelay: 0.55, delay: 0.5 } : { duration: 0.2 }}>
                <Cursor size={52} />
              </motion.div>
              {/* two hand-drawn shake marks either side, so the shake reads in a still too */}
              <svg width={112} height={52} viewBox="0 0 96 44" style={{ position: 'absolute', left: -40, top: 4, overflow: 'visible' }}>
                <g fill="none" stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round">
                  <path d="M14 6Q6 18 14 30" /><path d="M5 10Q-1 18 5 26" />
                  <path d="M82 6Q90 18 82 30" /><path d="M91 10Q97 18 91 26" />
                </g>
              </svg>
            </motion.div>
          </motion.div>
        </Screen>
      </div>
    </>
  )
}
