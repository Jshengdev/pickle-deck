import { useRef } from 'react'
import { gsap, useGSAP } from '../../engine/gsap'
import { tokens } from '../../tokens'

/** The segmented toggle (s08): a sunken well, an ink thumb that slides to the choice in 220 ms (the s12 card swap).
    Well radius 12, thumb radius 8 with a 4 px inset: concentric (12 − 4 = 8). Labels in pixel. */
export function Toggle<T extends string>({ options, value, onChange, width = 82 }: { options: readonly T[]; value: T; onChange: (v: T) => void; width?: number }) {
  const thumb = useRef<HTMLDivElement>(null)
  const i = Math.max(0, options.indexOf(value))
  useGSAP(() => { gsap.to(thumb.current, { x: i * width, duration: tokens.motion.ms.swap / 1000, ease: 'power3.out' }) }, { dependencies: [i, width] })
  const h = 32
  return (
    <div style={{ position: 'relative', display: 'inline-flex', padding: 4, borderRadius: tokens.radius.control, background: 'var(--surface-sunken)',
      boxShadow: 'inset 1px 1px 0 oklch(0.3 0.01 230 / .14), inset -1px -1px 0 oklch(1 0 0 / .7)' }}>
      <div ref={thumb} style={{ position: 'absolute', left: 4, top: 4, width, height: h, borderRadius: tokens.radius.chip, background: 'var(--ink)' }} />
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)} style={{ position: 'relative', width, height: h, border: 0, background: 'transparent', cursor: 'pointer',
          font: '14px var(--font-pixel)', color: o === value ? 'var(--text-on-dark)' : 'var(--text-secondary)', transition: `color ${tokens.motion.ms.swap}ms` }}>{o}</button>
      ))}
    </div>
  )
}
