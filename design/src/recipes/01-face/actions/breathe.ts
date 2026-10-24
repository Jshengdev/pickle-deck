import { gsap } from '../../../engine/gsap'

/** The idle breath, on its own clock so it never stops: the body rises 2% and the arms drift with it. */
export function breathe(body: SVGElement, arms: SVGElement[], depth: number) {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2 } })
  tl.to(body, { scaleY: 1 + depth, transformOrigin: '50% 100%' }, 0)
  tl.to(arms, { y: -depth * 60, rotation: (i) => (i ? -2 : 2), transformOrigin: '50% 0%' }, 0)
  return tl
}
