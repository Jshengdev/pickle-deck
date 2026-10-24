import { useRef } from 'react'
import { gsap, useGSAP } from '../engine/gsap'
import { PickleArt } from './PickleArt'
import { face, type FaceParams } from '../recipes/01-face/actions/face'
import { breathe } from '../recipes/01-face/actions/breathe'
import type { Timeline } from '../engine/types'

export type FaceMode = 'loop' | 'idle' | 'listening' | 'talking'
type Props = Partial<FaceParams> & { height?: number; mode?: FaceMode; breath?: number; wobble?: number; onTimeline?: (tl: Timeline) => void }

const SECTIONS: Record<Exclude<FaceMode, 'loop'>, [string, string]> = { idle: ['idle', 'listening'], listening: ['listening', 'talking'], talking: ['talking', ''] }

/** Pickle, alive: the approved drawing with the dot-eye face and the breath. It plays itself; `mode` picks one section of
    the face or the whole loop. Hand `onTimeline` to drive it from outside (the cookbook transport) instead. */
export function PickleFace({ height = 300, mode = 'loop', lag = 0.06, inward = 0.65, saccade = 1, blink = 0.14, breath = 0.02, wobble, onTimeline }: Props) {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const q = (s: string) => scope.current!.querySelector(s) as SVGElement
    const els = { eyeL: q('[data-part="eye-l"]'), eyeR: q('[data-part="eye-r"]'), body: q('[data-part="body"]'),
      arms: [...scope.current!.querySelectorAll('[data-part^="arm"]')] as SVGElement[] }
    breathe(els.body, els.arms, breath)
    const tl = face(els, { lag, inward, saccade, blink })
    if (onTimeline) { onTimeline(tl); return }
    if (mode === 'loop') { tl.repeat(-1).play(0); return }
    const [from, to] = SECTIONS[mode]
    const end = to ? tl.labels[to] : tl.duration()
    gsap.timeline({ repeat: -1 }).add(tl.tweenFromTo(tl.labels[from], end))
  }, { scope, dependencies: [mode, lag, inward, saccade, blink, breath], revertOnUpdate: true })
  return <div ref={scope} style={{ display: 'inline-block' }}><PickleArt height={height} wobble={wobble} /></div>
}
