import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../../engine/gsap'
import { tokens } from '../../tokens'

/** The print (s11): text Pickle writes, in dot-matrix (Geist Pixel Circle). It prints one character every 40 ms (s12), in
    steps, then holds. */
export function Print({ text, size = 31, play = true, style }: { text: string; size?: number; play?: boolean; style?: CSSProperties }) {
  const root = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    const chars = gsap.utils.toArray<HTMLElement>('i', root.current)
    if (!play) { gsap.set(chars, { opacity: 1 }); return }
    gsap.fromTo(chars, { opacity: 0 }, { opacity: 1, duration: 0.001, stagger: tokens.motion.ms.dot / 1000, ease: 'steps(1)' })
  }, { dependencies: [text, play], scope: root })
  return (
    <span ref={root} style={{ font: `${size}px/1.25 var(--font-dot)`, color: 'var(--ink)', whiteSpace: 'pre-wrap', ...style }}>
      {[...text].map((ch, i) => <i key={i} style={{ fontStyle: 'normal' }}>{ch}</i>)}
    </span>
  )
}
