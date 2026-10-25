import type { CSSProperties, ReactNode } from 'react'

/** Glass plastic, for small parts only (his words 2026-10-24, on Cofounder's "Download guide" tile: "I like how the color and
    texture of the light blue, almost like glass-like plastic covering, that should be some texture that we can add here";
    his pick: "Small parts only", the page number and the tabs).
    Read off the tile itself: a flat light blue face, a white catch along the top inside, a rim a step darker, and the plastic's
    thickness showing as a darker lip under the bottom edge. Lines only, no blur. */
export type Tint = 'sky' | 'moss'
/** The same plastic in two tints: sky (the projects) and moss (the plan tab, his pick: "A green tab in front"). */
const TINT: Record<Tint, { face: [string, string]; rim: string; lip: string; ink: string }> = {
  sky: { face: ['var(--sky-100)', 'var(--sky-200)'], rim: 'oklch(83% 0.088 246', lip: 'oklch(73% 0.13 250', ink: 'var(--sky-700)' },
  moss: { face: ['var(--moss-100)', 'var(--moss-200)'], rim: 'oklch(83% 0.118 124.6', lip: 'oklch(75% 0.138 126.8', ink: 'var(--moss-800)' },
}
export function glass(radius = 8, tint: Tint = 'sky'): CSSProperties {
  const t = TINT[tint]
  return {
    borderRadius: radius,
    background: `linear-gradient(180deg, ${t.face[0]}, ${t.face[1]} 70%)`,
    boxShadow: [
      'inset 0 1px 0 oklch(1 0 0 / .95)',             // the catch along the top inside
      `inset 0 0 0 1px ${t.rim} / .7)`,                // the rim, a step darker (300)
      `0 2px 0 0 ${t.lip} / .55)`,                     // the plastic's thickness, under the bottom edge (400)
      `0 0 0 1px ${t.rim} / .9)`,                      // the outer edge
    ].join(', '),
    color: t.ink,
  }
}

/** A small glass part: a chip that holds a number, a word or an icon. */
export function Glass({ children, radius = 8, style }: { children?: ReactNode; radius?: number; style?: CSSProperties }) {
  return <span style={{ display: 'inline-grid', placeItems: 'center', ...glass(radius), ...style }}>{children}</span>
}
