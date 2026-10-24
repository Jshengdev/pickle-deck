import { useState, type ReactNode } from 'react'
import { tokens } from '../../tokens'

/** Buttons are small, so they are flat token colour, not a material (materials are for surfaces over ~120 px).
    primary: ink · secondary: brushed metal (a CSS gradient lit from the upper left) · quiet: text only.
    Height 40, padding 16, radius 12 (tokens.component.control). Press sinks 1 px in 90 ms (the s12 hit-stop). */
export function Button({ children, variant = 'primary', icon, onClick }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'quiet'; icon?: ReactNode; onClick?: () => void }) {
  const [down, setDown] = useState(false)
  const c = tokens.component.control, ms = tokens.motion.ms
  const look = variant === 'primary'
    ? { background: 'var(--ink)', color: 'var(--text-on-dark)', boxShadow: 'none' }
    : variant === 'secondary'
      ? { background: 'linear-gradient(160deg, var(--silver-50) 0%, var(--silver-100) 45%, var(--silver-200) 100%)', color: 'var(--ink)',
          boxShadow: 'inset 1px 1px 0 oklch(1 0 0 / .9), inset -1px -1px 0 oklch(0.4 0.01 230 / .14), 0 1px 0 oklch(0.3 0.01 230 / .2)' }
      : { background: 'transparent', color: 'var(--ink)', boxShadow: 'none' }
  return (
    <button onClick={onClick} onPointerDown={() => setDown(true)} onPointerUp={() => setDown(false)} onPointerLeave={() => setDown(false)}
      style={{ ...look, height: c.height, padding: `0 ${c.padX}px`, borderRadius: tokens.radius[c.radius], border: 0, display: 'inline-flex', alignItems: 'center',
        gap: c.gap, font: '600 15px var(--font-head)', letterSpacing: '-0.01em', cursor: 'pointer', textDecoration: variant === 'quiet' ? 'underline' : 'none',
        textUnderlineOffset: 4, transform: down ? 'translateY(1px) scale(0.985)' : 'none', transition: `transform ${ms.hitStop}ms var(--ease-out)` }}>
      {icon}{children}
    </button>
  )
}
