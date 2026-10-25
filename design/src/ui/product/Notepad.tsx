import { forwardRef, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../engine/gsap'
import { tokens } from '../../tokens'
import { Surface } from '../../material/Surface'
import { glass } from '../../material/Glass'
import { Pickle, Blicky } from '../../cast/Cast'

/** The notepad Blicky spawns, v2 (his words, 2026-10-24: "remove the rings… make the text bigger… a clear hierarchy…
    remove the metalness, make it just straight white… a little bit of the felt texture to shine through… Blicky is writing
    to you in blue… one shared UI with the way to switch between the two modes… come up with four different print
    examples"). It is Pickle's small panel and the desk (SPEC O6, C11): the north star, the one next step, his words kept
    verbatim (C10), the action items. Divider tabs on the right are the routing menu (Route, C15): they barely peek, and
    slide out on hover ("very very minimally peek out").

    Modes: 'blicky' (sky felt, Blicky writes to you in blue) and 'pickle' (forest felt, Pickle's view). One UI, two modes.
    Variants (4 ways to build the same page): 'tablet' (a felt bezel round a white screen, thick like a reMarkable),
    'pad' (a felt binding across the top, sheets stacked under), 'card' (a white card on felt with the sticker stuck on),
    'spine' (a white page with a felt spine down the left, the lightest). */
export type Project = { name: string; felt: string; ink: 'ink' | 'on-dark'; state: 'running' | 'idle' | 'asleep'; north: string; next: string }
export type Line = { words: string; time: string; to?: string; status: 'hearing' | 'kept' | 'sent' | 'stamped' }
export type Item = { text: string; done: boolean }
export type Phase = 'quiet' | 'hearing' | 'routing' | 'sent' | 'stamped'
export type Mode = 'blicky' | 'pickle'
export type Variant = 'tablet' | 'pad' | 'card' | 'spine'
export const VARIANTS: { v: Variant; name: string }[] = [{ v: 'tablet', name: 'Tablet' }, { v: 'pad', name: 'Pad' }, { v: 'card', name: 'Card' }, { v: 'spine', name: 'Spine' }]

export const W = 420, H = 540
const MODE = {
  blicky: { felt: 'surface-felt-sky', ink: 'var(--blicky-ink)', deep: 'sky-700', on: 'ink' as const },
  pickle: { felt: 'surface-felt', ink: 'var(--pickle-ink)', deep: 'surface-felt-deep', on: 'on-dark' as const },
}
const TAB_W = 40, TAB_H = 92, PEEK = 4, OUT = 30

/** The routing tabs: one felt tab per project, tucked behind the page; a sliver shows, the whole tab on hover.
    In glass (the notes pad): one blue tab per project, and optionally a green `lead` tab in front of them all, the plan end to
    end (his words: "When there's tabs for blue, it should basically reference each one of the different projects… and then the
    green one is always the one at the utmost front of like the entire timeline, the plan end to end"; his pick: "A green tab in
    front"). Hovering a project's tab shows its next step beside it. */
export function Tabs({ projects, active, phase, hover, lit, onPick, onHover, top = 70, material = 'felt', lead }: { projects: Project[]; active: string; phase: Phase; hover?: string; lit?: string
  onPick?: (n: string) => void; onHover?: (n?: string) => void; top?: number; material?: 'felt' | 'glass'; lead?: string }) {
  const root = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('[data-tab]', root.current).forEach((el) => {
      const n = el.dataset.tab!
      const x = n === lit ? OUT + 4 : n === hover ? OUT : phase === 'routing' ? OUT * 0.55 : n === lead ? OUT - 4 : PEEK   // the plan tab stands out, its name showing: it's always in front
      gsap.to(el, { x, y: n === lit ? -4 : 0, duration: tokens.motion.ms.swap / 1000, ease: 'power3.out' })
    })
  }, { dependencies: [phase, active, hover, lit], scope: root })
  return (
    <div ref={root} style={{ position: 'absolute', left: W - TAB_W, top, display: 'grid', gap: 6 }}>
      {lead && material === 'glass' && (
        <button data-tab={lead} onClick={() => onPick?.(lead)} onMouseEnter={() => onHover?.(lead)} onMouseLeave={() => onHover?.(undefined)}
          style={{ position: 'relative', zIndex: 1, width: TAB_W, height: TAB_H, border: 0, padding: 0, background: 'transparent', cursor: onPick ? 'pointer' : 'default' }}>
          <span aria-hidden style={{ position: 'absolute', left: '100%', top: 0, width: 16, height: '100%' }} />
          <span style={{ position: 'absolute', inset: 0, ...glass(10, 'moss') }}>
            <span style={{ position: 'absolute', right: OUT / 2, top: '50%', transform: 'translate(50%, -50%) rotate(90deg)', whiteSpace: 'nowrap', font: '600 12px var(--font-head)', color: 'var(--moss-800)' }}>{lead}</span>
          </span>
        </button>
      )}
      {projects.map((p, i) => (
        <button key={p.name} data-tab={p.name} onClick={() => onPick?.(p.name)} onMouseEnter={() => onHover?.(p.name)} onMouseLeave={() => onHover?.(undefined)}
          style={{ position: 'relative', width: TAB_W, height: TAB_H, border: 0, padding: 0, background: 'transparent', cursor: onPick ? 'pointer' : 'default' }}>
          <span aria-hidden style={{ position: 'absolute', left: '100%', top: 0, width: 16, height: '100%' }} />{/* a wider hover zone: only 4 px of the tab peeks */}
          {material === 'glass'
            ? <span style={{ position: 'absolute', inset: 0, ...glass(10) }}>
                <span style={{ position: 'absolute', right: OUT / 2, top: '50%', transform: 'translate(50%, -50%) rotate(90deg)', whiteSpace: 'nowrap', font: '600 12px var(--font-head)', color: 'var(--sky-700)' }}>{p.name}</span>
                {n_lamp(p.name === lit)}
              </span>
            : null}
          {material === 'glass' && p.next && hover === p.name && (
            <span style={{ position: 'absolute', left: TAB_W + 8, top: 0, width: 210, padding: '9px 12px', borderRadius: 10, background: 'var(--surface-page)', textAlign: 'left',
              boxShadow: 'inset 0 0 0 1px var(--silver-200), 0 1px 0 oklch(0.3 0.01 230 / .12)', display: 'grid', gap: 3, pointerEvents: 'none' }}>
              <span style={{ font: '600 13px var(--font-head)', color: 'var(--ink)' }}>{p.name}</span>
              <span style={{ font: '400 13px/1.35 var(--font-second)', color: 'var(--text-secondary)' }}>{p.next}</span>
            </span>
          )}
          {material === 'glass'
            ? null
            : <Surface material="felt" color={p.felt} width={TAB_W} height={TAB_H} radius={10} shadow={0.4} spread={5} pad={8} fringe={0.7} seed={i + 2}>
                <span style={{ position: 'absolute', right: OUT / 2, top: '50%', transform: 'translate(50%, -50%) rotate(90deg)', whiteSpace: 'nowrap', font: '600 12px var(--font-head)',
                  color: p.ink === 'ink' ? 'var(--ink)' : 'var(--text-on-dark)' }}>{p.name}</span>
                {n_lamp(p.name === lit)}
              </Surface>}
        </button>
      ))}
    </div>
  )
}
/** The lamp on a tab: goes green for a beat when words are routed to it. */
function n_lamp(on: boolean) {
  return <i style={{ position: 'absolute', right: OUT / 2 - 4, top: 4, width: 8, height: 8, borderRadius: 99, background: on ? 'var(--checked)' : 'transparent', transition: `background ${tokens.motion.ms.hitStop}ms steps(1)` }} />
}

/** Pickle's stamp: a round ink stamp with Pickle traced in it, at a slight tilt. No words (his pick: "Stamp it, undo allowed"). */
function Stamp({ size = 34 }: { size?: number }) {
  return (
    <span data-stamp style={{ display: 'inline-grid', placeItems: 'center', width: size, height: size, borderRadius: '50%', boxShadow: 'inset 0 0 0 2px var(--checked)',
      transform: 'rotate(-12deg)', flex: 'none', ['--cast-line' as string]: 'var(--checked)' } as CSSProperties}>
      <Pickle look="traced" height={size * 0.62} />
    </span>
  )
}

/** Words that type in, a character every 40 ms (the s12 dot timing). */
function Typed({ text, play }: { text: string; play: boolean }) {
  const [n, setN] = useState(play ? 0 : text.length)
  useEffect(() => {
    if (!play) { setN(text.length); return }
    setN(0)
    const id = setInterval(() => setN((k) => (k >= text.length ? (clearInterval(id), k) : k + 1)), tokens.motion.ms.dot)
    return () => clearInterval(id)
  }, [text, play])
  return <>{text.slice(0, n)}</>
}

/** The mode switch: Blicky or Pickle, one small flat control (small things are flat colour). */
function ModeSwitch({ mode, onMode }: { mode: Mode; onMode?: (m: Mode) => void }) {
  return (
    <span style={{ display: 'inline-flex', padding: 3, borderRadius: 12, background: 'var(--surface-sunken)' }}>
      {(['blicky', 'pickle'] as const).map((m) => (
        <button key={m} onClick={() => onMode?.(m)} style={{ height: 26, padding: '0 10px', borderRadius: 9, border: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
          background: m === mode ? 'var(--surface-page)' : 'transparent', boxShadow: m === mode ? '0 1px 0 oklch(0.3 0.01 230 / .18)' : 'none', font: '600 13px var(--font-head)', color: m === mode ? 'var(--ink)' : 'var(--text-secondary)' }}>
          <i style={{ width: 8, height: 8, borderRadius: 99, background: m === 'blicky' ? 'var(--blicky)' : 'var(--pickle)' }} />{m}
        </button>
      ))}
    </span>
  )
}

export type NotepadProps = { projects: Project[]; active: string; lines: Line[]; items: Item[]; phase: Phase; mode?: Mode; variant?: Variant; hover?: string; lit?: string
  onPick?: (n: string) => void; onHover?: (n?: string) => void; onToggle?: (i: number) => void; onUndo?: (i: number) => void; onMode?: (m: Mode) => void; style?: CSSProperties }

/** The page's content, the same in every variant: hierarchy by size and weight only (BRAND §2). */
const Page = forwardRef<HTMLDivElement, NotepadProps & { pad: string }>(function Page({ projects, active, lines, items, phase, mode = 'blicky', hover, onToggle, onUndo, onMode, pad }, ref) {
  const p = projects.find((x) => x.name === (phase === 'routing' && hover ? hover : active)) ?? projects[0]
  const ink = MODE[mode].ink
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, padding: pad, display: 'flex', flexDirection: 'column', gap: 18, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ font: '600 15px var(--font-head)', color: 'var(--text-secondary)' }}>{p.name}<span style={{ fontWeight: 400, color: 'var(--text-muted)' }}> · {p.state === 'running' ? 'working' : p.state}</span></span>
        <ModeSwitch mode={mode} onMode={onMode} />
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ font: '700 27px/1.15 var(--font-head)', letterSpacing: '-0.025em' }}>{p.next}</div>
        <div style={{ font: '400 16px/1.4 var(--font-second)', color: 'var(--text-secondary)' }}>{p.north}</div>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {lines.map((l, i) => (
          <div key={i} data-line={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 12 }}>
            <span style={{ font: '400 20px/1.35 var(--font-second)', color: l.status === 'hearing' ? 'var(--text-secondary)' : ink }}>“<Typed text={l.words} play={l.status === 'hearing'} />”</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 3 }}>
              {l.status === 'sent' && <span style={{ font: '400 14px var(--font-head)', color: 'var(--text-muted)' }}>to {l.to}</span>}
              {l.status === 'stamped' && <><Stamp /><button onClick={() => onUndo?.(i)} style={{ border: 0, background: 'transparent', padding: 0, font: '400 14px var(--font-head)', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>undo</button></>}
              <span style={{ font: '400 13px var(--font-pixel)', color: 'var(--text-muted)' }}>{l.time}</span>
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 'auto', display: 'grid', gap: 12 }}>
        {items.map((it, i) => (
          <button key={i} onClick={() => onToggle?.(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, border: 0, background: 'transparent', padding: 0, cursor: onToggle ? 'pointer' : 'default', textAlign: 'left' }}>
            <span style={{ width: 20, height: 20, borderRadius: 6, flex: 'none', background: it.done ? 'var(--checked)' : 'var(--surface-sunken)', display: 'grid', placeItems: 'center' }}>
              {it.done && <svg width="12" height="10" viewBox="0 0 11 9"><path d="M1 4.5L4 7.5L10 1" fill="none" stroke="var(--text-on-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </span>
            <span style={{ font: '400 17px/1.3 var(--font-head)', color: it.done ? 'var(--text-muted)' : 'var(--ink)', textDecoration: it.done ? 'line-through' : 'none', textDecorationColor: 'var(--text-muted)' }}>{it.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
})

/** White, flat, with a 1 px contact line under it: the page (no metal). */
const white = (r: number): CSSProperties => ({ position: 'absolute', background: 'var(--surface-page)', borderRadius: r, boxShadow: '0 1px 0 oklch(0.3 0.01 230 / .22)' })

export const Notepad = forwardRef<HTMLDivElement, NotepadProps>(function Notepad(props, ref) {
  const { variant = 'tablet', mode = 'blicky', phase, style } = props
  const m = MODE[mode]
  const pageRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const st = pageRef.current?.querySelectorAll('[data-stamp]')
    if (phase === 'stamped' && st?.length) gsap.fromTo(st[st.length - 1], { scale: 1.8, opacity: 0 }, { scale: 1, opacity: 1, duration: tokens.motion.ms.hitStop / 1000, ease: 'power4.in' })
  }, { dependencies: [phase] })
  const tabs = <Tabs projects={props.projects} active={props.active} phase={phase} hover={props.hover} lit={props.lit} onPick={props.onPick} onHover={props.onHover} top={variant === 'pad' ? 92 : 70} />
  let body: ReactNode
  if (variant === 'tablet') body = (
    <>
      <div style={{ position: 'absolute', left: 0, top: 6 }}><Surface material="felt" color={m.deep} width={W} height={H} radius={30} shadow={0.9} spread={18} fringe={0.6} /></div>
      <div style={{ position: 'absolute', left: 0, top: 0 }}><Surface material="felt" color={m.felt} width={W} height={H} radius={30} shadow={0} fringe={0.9} /></div>
      <div style={{ ...white(16), left: 14, top: 14, width: W - 28, height: H - 28 }}><Page {...props} ref={pageRef} pad="24px 26px" /></div>
    </>
  )
  else if (variant === 'pad') body = (
    <>
      <div style={{ ...white(14), left: 8, top: 22, width: W - 16, height: H - 14, background: 'var(--silver-100)' }} />
      <div style={{ ...white(14), left: 4, top: 16, width: W - 8, height: H - 14, background: 'var(--silver-50)' }} />
      <div style={{ ...white(14), left: 0, top: 10, width: W, height: H - 14 }}><Page {...props} ref={pageRef} pad="76px 26px 24px" /></div>
      <div style={{ position: 'absolute', left: -4, top: 0 }}><Surface material="felt" color={m.felt} width={W + 8} height={58} radius={16} shadow={0.6} spread={10} fringe={1} /></div>
      <div style={{ position: 'absolute', right: 18, top: -36, transform: 'rotate(12deg)' }}>{mode === 'blicky' ? <Blicky pose="wave" look="sticker" height={60} /> : <Pickle pose="wave" look="sticker" height={80} />}</div>
    </>
  )
  else if (variant === 'card') body = (
    <>
      <div style={{ position: 'absolute', left: 0, top: 0 }}><Surface material="felt" color={m.felt} width={W} height={H} radius={30} shadow={0.8} spread={16} fringe={1} /></div>
      <div style={{ ...white(18), left: 22, top: 26, width: W - 44, height: H - 46, transform: 'rotate(-1.2deg)' }}><Page {...props} ref={pageRef} pad="26px 26px 24px" /></div>
      <div style={{ position: 'absolute', right: 6, top: -26, transform: 'rotate(12deg)' }}>{mode === 'blicky' ? <Blicky pose="wave" look="sticker" height={62} /> : <Pickle pose="wave" look="sticker" height={84} />}</div>
    </>
  )
  else body = (
    <>
      <div style={{ ...white(18), left: 0, top: 0, width: W, height: H }}><Page {...props} ref={pageRef} pad="24px 26px 24px 46px" /></div>
      <div style={{ position: 'absolute', left: -2, top: 0 }}><Surface material="felt" color={m.felt} width={26} height={H} radius={13} shadow={0.5} spread={8} fringe={1.1} /></div>
    </>
  )
  return (
    <div ref={ref} style={{ position: 'relative', width: W + OUT + 10, height: H + 10, ...style }}>
      {tabs}
      <div style={{ position: 'absolute', left: 0, top: 0, width: W, height: H }}>{body}</div>
    </div>
  )
})
