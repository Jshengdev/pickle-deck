import { createContext, useContext, useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { motion, type Transition } from 'motion/react'
import { useDialKit, type TransitionConfig } from 'dialkit'
import { gsap, useGSAP } from '@design/engine/gsap'
import type { Timeline } from '@design/engine/types'

/** Builds: a slide moves through steps (0, 1, 2…) as you press →. Nothing animates when a slide arrives; only the
    change between steps moves, so the picture builds one idea at a time (BRAND.md: "nothing animates in").

    Two ways to move things, pick per slide:
    - <Show from={n}>: React + Motion springs. Good for things that appear, dim or shift. Tuned in the "Builds" dial.
    - useStepTimeline(): a GSAP timeline with a label per step. Good for drawn lines, morphs, paths, counters. */

/** The shared "Builds" dial: how every <Show> moves. Starting values live here.
    spring: the feel of every move · reveal: how things arrive · rise: px they rise from · dim: opacity once focus moves on. */
const useBuildDials = () => useDialKit('Builds', {
  spring: { type: 'spring', visualDuration: 0.5, bounce: 0.12 },
  reveal: { type: 'select', options: ['rise', 'fade', 'scale', 'none'], default: 'rise' },
  rise: [28, 0, 120, 1],
  dim: [0.22, 0, 1, 0.01],
})

type BuildCtx = { step: number; d: ReturnType<typeof useBuildDials> }
const Ctx = createContext<BuildCtx | null>(null)

/** Deck.tsx wraps every slide in this, so any component inside can read the step. */
export function Builds({ step, children }: { step: number; children: ReactNode }) {
  const d = useBuildDials()
  return <Ctx.Provider value={{ step, d }}>{children}</Ctx.Provider>
}

function useBuild() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useStep/Show must render inside a slide')
  return c
}

/** The step this slide is on (0 when it arrives). */
export const useStep = () => useBuild().step

/** DialKit's transition (spring or easing curve) as a Motion transition. */
export const toMotion = (t: TransitionConfig): Transition => t.type === 'easing' ? { duration: t.duration, ease: t.ease } : t

/** Shows its children from step `from` on. With `dimFrom`, they stay but fade back (focus moves on); with `until`,
    they leave after that step. `dim` sets the dimming yourself, for anything dimFrom can't say.
    Arriving on a slide never animates: it starts in the right state. */
export function Show({ from = 0, until, dimFrom, dim: dimmed, children, style }: { from?: number; until?: number; dimFrom?: number; dim?: boolean; children: ReactNode; style?: CSSProperties }) {
  const { step, d } = useBuild()
  const on = step >= from && (until === undefined || step <= until)
  const dim = dimmed ?? (dimFrom !== undefined && step >= dimFrom)
  const away = { opacity: 0, y: d.reveal === 'rise' ? d.rise : 0, scale: d.reveal === 'scale' ? 0.94 : 1 }
  const here = { opacity: dim ? d.dim : 1, y: 0, scale: 1 }
  return (
    <motion.div initial={false} animate={on ? here : away} transition={d.reveal === 'none' ? { duration: 0 } : toMotion(d.spring)}
      style={{ pointerEvents: on ? 'auto' : 'none', ...style }}>
      {children}
    </motion.div>
  )
}

/** A GSAP timeline driven by the step. In `build`, add tweens for step 1, then tl.addLabel('s1'); tweens for step 2,
    then tl.addLabel('s2'); and so on. Label sN = how the slide looks at step N ('s0' is added for you at time 0).
    → plays forward to the next label, ← plays back. Pass dial values in `deps` so the timeline rebuilds when you tune. */
export function useStepTimeline(scope: RefObject<HTMLElement | SVGElement | null>, build: (tl: Timeline) => void, deps: unknown[] = []) {
  const step = useStep()
  const at = useRef(step)
  const tl = useRef<Timeline | null>(null)
  useGSAP(() => {
    const t = gsap.timeline({ paused: true }).addLabel('s0', 0)
    build(t)
    t.progress(1, false).seek(`s${at.current}`, false)   // run through once (with callbacks, so typed text draws) so the sets at time 0 really apply
    tl.current = t
  }, { scope, dependencies: deps, revertOnUpdate: true })
  useEffect(() => {
    if (at.current === step) return
    at.current = step
    tl.current?.tweenTo(`s${step}`)
  }, [step])
}
