import { useRef } from 'react'
import { gsap, useGSAP } from '../../engine/gsap'
import { tokens } from '../../tokens'

/** The meter (s08): ten pixel segments. It fills 40 ms a dot and drains 80 ms a dot (s12), in steps, never a
    smooth bar. Amber marks the one segment where a catch happened; nothing else is ever amber. */
export function Meter({ value, total = 10, accent, outlined = false, catchAt, scale = 1 }: {
  value: number; total?: number; accent: string; outlined?: boolean; catchAt?: number; scale?: number
}) {
  const root = useRef<HTMLDivElement>(null)
  const shown = useRef(0)
  useGSAP(() => {
    const segs = gsap.utils.toArray<HTMLElement>('i', root.current)
    const from = shown.current, to = Math.round(value)
    if (from === to) return
    const up = to > from, ms = tokens.motion.ms
    const order = up ? segs.slice(from, to) : segs.slice(to, from).reverse()
    gsap.to(order, { '--on': up ? 1 : 0, duration: 0.001, stagger: (up ? ms.dot : ms.drain) / 1000, ease: 'steps(1)' })
    shown.current = to
  }, { dependencies: [value], scope: root })

  return (
    <div ref={root} style={{ display: 'flex', gap: 3 * scale }}>
      {Array.from({ length: total }, (_, i) => {
        const caught = catchAt === i
        return (
          <i key={i} style={{
            '--on': 0, width: 15 * scale, height: 8 * scale, borderRadius: 2 * scale, display: 'block',
            background: `color-mix(in oklch, ${caught ? 'var(--catch)' : accent} calc(var(--on) * 100%), var(--line-hair))`,
            boxShadow: outlined ? 'inset 0 0 0 1px color-mix(in oklch, var(--ink) calc(var(--on) * 100%), transparent)' : 'none',
          } as React.CSSProperties} />
        )
      })}
    </div>
  )
}
