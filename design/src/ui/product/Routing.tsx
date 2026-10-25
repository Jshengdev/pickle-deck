import { useRef, useState, type RefObject } from 'react'
import { gsap, useGSAP } from '../../engine/gsap'
import { tokens } from '../../tokens'

/** Routing, its own moment (his words, 2026-10-24: "when you're finished talking about a specific scenario… a little like
    dotted line go towards a project that lights up for a second to see that it's actually being routed to the correct
    project"). From the brand lab's Route beat (round two, slide 6): he lets go → 500 ms of nothing → a line runs to one
    project → it lifts and its lamp goes green. Here the line is dots (the machine's motif), laid 40 ms apart in steps,
    and it drains 80 ms a dot once the project has lit. */
export type Pt = { x: number; y: number }
export type Route = { from: Pt; to: Pt; key: number }

/** Where an element sits inside a container, in the container's own (unscaled) px. */
export function localCenter(container: HTMLElement, el: Element, scale = 1, side: 'right' | 'left' | 'center' = 'center'): Pt {
  const c = container.getBoundingClientRect(), r = el.getBoundingClientRect()
  const x = side === 'right' ? r.right : side === 'left' ? r.left : r.left + r.width / 2
  return { x: (x - c.left) / scale, y: (r.top + r.height / 2 - c.top) / scale }
}

/** The dotted line itself: dots along a gentle arc from `from` to `to`, laid in one by one, then drained. */
export function RouteDots({ route, color = 'var(--ink)', size = 6, gap = 16, onLit, onDone }: { route: Route | null; color?: string; size?: number; gap?: number; onLit?: () => void; onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const ms = tokens.motion.ms
  const pts: Pt[] = []
  if (route) {
    const { from: a, to: b } = route
    const dist = Math.hypot(b.x - a.x, b.y - a.y) + 220, n = Math.max(8, Math.round(dist / gap))
    // the line swings out past the page and comes back into the project, so it reads even when the two are close
    const c = { x: Math.max(a.x, b.x) + 150, y: (a.y + b.y) / 2 - 30 }
    for (let i = 0; i <= n; i++) { const t = i / n; pts.push({ x: (1 - t) ** 2 * a.x + 2 * (1 - t) * t * c.x + t * t * b.x, y: (1 - t) ** 2 * a.y + 2 * (1 - t) * t * c.y + t * t * b.y }) }
  }
  useGSAP(() => {
    if (!route) return
    const dots = gsap.utils.toArray<HTMLElement>('i', root.current)
    gsap.set(dots, { autoAlpha: 0, scale: 0.4 })
    const tl = gsap.timeline()
    tl.to({}, { duration: 0.5 })                                                              // 500 ms of nothing: he has let go
    tl.to(dots, { autoAlpha: 1, scale: 1, duration: 0.001, stagger: ms.dot / 1000, ease: 'steps(1)' })   // laid in, a dot every 40 ms
    tl.call(() => onLit?.())                                                                   // the project lights
    tl.to({}, { duration: 0.62 })
    tl.to(dots, { autoAlpha: 0, duration: 0.001, stagger: ms.drain / 1000 / 2, ease: 'steps(1)' })   // drained from the start
    tl.call(() => onDone?.())
  }, { dependencies: [route?.key], scope: root, revertOnUpdate: true })
  return (
    <div ref={root} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {pts.map((p, i) => <i key={`${route?.key}-${i}`} style={{ position: 'absolute', left: p.x - size / 2, top: p.y - size / 2, width: size, height: size, borderRadius: 99, background: color, display: 'block' }} />)}
    </div>
  )
}

/** A small helper for stories and the app: run a route from one element to another inside a container. */
export function useRouting(container: RefObject<HTMLElement | null>, scale = 1) {
  const [route, setRoute] = useState<Route | null>(null)
  const run = (fromEl: Element | null, toEl: Element | null) => {
    if (!container.current || !fromEl || !toEl) return
    const to = localCenter(container.current, toEl, scale, 'right')
    setRoute({ from: localCenter(container.current, fromEl, scale, 'right'), to: { x: to.x + 30, y: to.y }, key: Date.now() })   // where the tab will be once it slides out
  }
  return { route, run, clear: () => setRoute(null) }
}
