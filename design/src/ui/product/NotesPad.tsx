import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGSAP } from '../../engine/gsap'
import { tokens } from '../../tokens'
import { Surface } from '../../material/Surface'
import { Glass, glass } from '../../material/Glass'
import { Pickle, Blicky } from '../../cast/Cast'
import { Tabs, W as NOTEPAD_W, type Project } from './Notepad'

/** The notes pads: the ones that spawn to keep things when there's no room for the full UI (his words, 2026-10-24).
    Two pads, separate but alike ("They are both separate, they both different use cases and outputs, but relatively similar
    in what they should be doing"):
    - Blicky's (sky felt, blue ink) explains what's on the screen and sketches it: "if I'm on the chemistry homework and I'm
      asking a bunch of questions about things… then it should sketch on the Blicky tab". A page: notes, then sketches.
    - Pickle's (all moss or forest felt, on the metal page) keeps each project's plan as a timeline, end to end ("there was a
      structure that I liked before where you can have like a timeline of the things… ground the visuals of what it's saying"):
      the stops so far, the last stop, the next step (the one green thing), then on to the north star. The other projects are
      the blue tabs, the plan is the green tab in front (his picks: "A green tab in front", "Only in the blue tabs"). One header
      colour, one green, the rest neutral ("we shouldn't use so many different colors"). Pixel grass along its bottom. In use
      it is fed live as he works; a load button sits on the side for later ("keep a load button on the side… we will plan it
      out later").
    Both: one page per turn, titled once the writing is done, words set slightly off the line like handwriting, a little page
    number in glass blue (his pick: small parts only), moss living inside the felt, sized from the pad's width. */
export type Who = 'blicky' | 'pickle'
export type Note = { kind: 'quote' | 'detail'; text: string }
export type SketchKind = 'cast' | 'box' | 'arrow' | 'loop' | 'dots' | 'pad' | 'water' | 'co2' | 'tetra' | 'dipole' | 'ir' | 'acid' | 'split' | 'ketone'
export type Sketch = { kind: SketchKind; label?: string }
export type NotesPage = { title: string; working: string; notes: Note[]; sketches: Sketch[] }
export type Tone = 'grey' | 'blue' | 'butter' | 'green'
/** Pickle's page, final (his words 2026-10-24: "i still want the north star at the top. the last objective and a way to hove to
    see a preview of the screenshot nad the response, and then the next actinoable step and th when you are done it should be
    scroabble"): the north star, the last stop (hover it: the screen it was on and what was said), the next step, then the
    earlier stops further down the scroll. */
export type Stop = { day: string; text: string }
/** The last stop's moment: the screen it was on (a screenshot, or a stand-in), what he said and the reply. */
export type Peek = { shot?: ReactNode; where?: string; said: string; reply: string; by?: string }
export type PlanPage = { title: string; working: string; north: string; last: Stop; next: string; earlier?: Stop[]; peek?: Peek }
/** Blicky's scratchpad, final (his words 2026-10-24: "take the same template but add the blue felt texture to it, and utilzie
    the scartch pad look… we dont need to put dates. just mark the last action and some of the context for it… utilsize more
    fun shapes and instead of last stop give it what it completed and show the different routes to each source of content").
    A page: what it's working on, what it completed (the last action) and the context, dotted routes to each source the
    content came from, the scratch (sketches), and what's next. No dates. */
export type Source = { kind: 'screen' | 'words' | 'note' | 'rule'; label: string; detail?: string }
export type ScratchPage = { title: string; working: string; on: string; done: string; context: string; sources: Source[]; sketches: Sketch[]; next?: string }
export type AnyPage = NotesPage | PlanPage | ScratchPage
export type Binding = 'felt' | 'moss'
/** white: the clean page. bezel, glass, mix: the metal pad with an edge (his words: "a lot shinier… a lot more expensive
    looking. Definitely giving an edge of some sort"): Cofounder's double bezel, the glass prototype's chamfer, or both. */
export type PadSurface = 'white' | 'metal' | 'bezel' | 'glass' | 'mix'
export const PAD_SURFACES: PadSurface[] = ['white', 'metal', 'bezel', 'glass', 'mix']   // metal: the satin page alone, no edge ("The metal background was really nice… add that back")
export type MossPlace = 'edge' | 'middle' | 'puddles'
export type MossTune = { on: boolean; place: MossPlace; seed: number; amount: number; opacity: number; grain: number }
export const MOSS_DEFAULT: MossTune = { on: true, place: 'edge', seed: 3, amount: 1, opacity: 0.62, grain: 11 }

const isPlan = (p: AnyPage): p is PlanPage => 'last' in p
const isScratch = (p: AnyPage): p is ScratchPage => 'done' in p
function rnd(i: number, k: number) { const v = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return v - Math.floor(v) }

/** Words set by hand: each word a hair off the line and a hair turned; appears a character every 40 ms when writing. */
function Hand({ text, seed, play, stagger, k, open = '', close = '', delay = 0, onDone }: { text: string; seed: number; play: boolean; stagger: number; k: number; open?: string; close?: string; delay?: number; onDone?: () => void }) {
  const [n, setN] = useState(play ? 0 : text.length)
  useEffect(() => {
    if (!play) { setN(text.length); return }
    let c = 0, id = 0
    setN(0)
    // count in the timer, not in a state updater: telling the pad it's done from inside an updater updates it mid-render
    const start = window.setTimeout(() => { id = window.setInterval(() => { c += 1; setN(c); if (c >= text.length) { clearInterval(id); onDone?.() } }, tokens.motion.ms.dot) }, delay)
    return () => { clearTimeout(start); clearInterval(id) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, play])
  let shown = 0
  const words = text.split(' '), last = words.length - 1
  return (
    <>
      {words.map((w, i) => {
        const vis = Math.max(0, Math.min(w.length, n - shown)); shown += w.length + 1
        return (
          <span key={i} style={{ display: 'inline-block', marginRight: i < last ? '0.32em' : 0, transform: `translateY(${(rnd(seed + i, 1) - 0.5) * 3 * stagger * k}px) rotate(${(rnd(seed + i, 2) - 0.5) * 2.4 * stagger}deg)` }}>
            {i === 0 && open}{w.slice(0, vis)}<span style={{ visibility: 'hidden' }}>{w.slice(vis)}</span>{i === last && <span style={{ visibility: n >= text.length ? 'visible' : 'hidden' }}>{close}</span>}
          </span>
        )
      })}
    </>
  )
}

/** Blicky's sketches: drawn in the line's own hand, each stroke laid in as he draws it, the letters after. */
function SketchArt({ s, k, ink, play }: { s: Sketch; k: number; ink: string; play: boolean }) {
  const root = useRef<SVGSVGElement>(null)
  useGSAP(() => {
    if (!root.current) return
    const paths = root.current.querySelectorAll('path, rect, ellipse, circle')
    const words = root.current.querySelectorAll('text')
    paths.forEach((el) => { const g = el as SVGGeometryElement; const L = g.getTotalLength?.() ?? 400; gsap.set(g, { strokeDasharray: L, strokeDashoffset: play ? L : 0 }) })
    gsap.set(words, { autoAlpha: play ? 0 : 1 })
    if (play) {
      gsap.to(paths, { strokeDashoffset: 0, duration: 0.5, stagger: 0.18, ease: 'none' })   // drawn, not eased: a hand moving
      gsap.to(words, { autoAlpha: 1, duration: 0.001, delay: 0.3 + paths.length * 0.12, stagger: 0.16, ease: 'steps(1)' })
    }
  }, { dependencies: [play, s.kind] })
  const vh = s.label ? 152 : 130, w = 300 * k, h = vh * k, sw = 3.2
  const common = { fill: 'none', stroke: ink, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  const atom = (x: number, y: number, t: string, size = 26) => <text x={x} y={y} textAnchor="middle" dominantBaseline="central" style={{ font: `400 ${size}px var(--font-second)`, fill: ink }}>{t}</text>
  const small = (x: number, y: number, t: string) => <text x={x} y={y} textAnchor="middle" style={{ font: '400 15px var(--font-second)', fill: ink }}>{t}</text>
  const dot = (x: number, y: number) => <circle cx={x} cy={y} r="2.8" fill={ink} stroke="none" />
  return (
    <svg ref={root} viewBox={`0 0 300 ${vh}`} width={w} height={h} style={{ display: 'block', overflow: 'visible' }}>
      <defs><filter id="hand"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" /><feDisplacementMap in="SourceGraphic" scale="2.2" /></filter></defs>
      <g filter="url(#hand)">
        {s.kind === 'cast' && <>
          <path {...common} d="M70 34C70 20 78 12 88 12C98 12 106 20 106 34L108 96C108 108 100 116 89 116C77 116 69 108 69 96Z" />
          <circle cx="84" cy="34" r="2.6" fill={ink} stroke="none" /><circle cx="94" cy="32" r="3.6" fill={ink} stroke="none" />
          <path {...common} d="M150 80C150 60 166 50 184 50C204 50 218 60 218 80C218 100 204 110 184 110C164 110 150 100 150 80Z" />
          <circle cx="180" cy="78" r="2.4" fill={ink} stroke="none" /><circle cx="190" cy="76" r="3.2" fill={ink} stroke="none" />
          <path {...common} d="M122 66L136 66M122 74L136 74" />
        </>}
        {s.kind === 'box' && <path {...common} d="M30 26C90 22 200 20 268 28C272 56 270 86 266 104C190 110 96 108 32 104C28 80 27 50 30 26Z" />}
        {s.kind === 'arrow' && <path {...common} d="M30 90C90 60 160 50 250 54M226 36L252 54L228 74" />}
        {s.kind === 'loop' && <path {...common} d="M24 86C70 86 96 30 140 34C176 38 170 86 140 84C108 82 118 34 170 30C214 26 246 60 276 56" />}
        {s.kind === 'dots' && <>
          {Array.from({ length: 13 }, (_, i) => { const t = i / 12; const x = 30 + t * 210, y = 96 - Math.sin(t * Math.PI) * 60; return <circle key={i} cx={x} cy={y} r="3.2" fill={ink} stroke="none" /> })}
          <rect {...common} x="246" y="50" width="34" height="66" rx="8" />
        </>}
        {s.kind === 'pad' && <>
          <rect {...common} x="90" y="16" width="120" height="104" rx="12" />
          <path {...common} d="M90 36L210 36M108 56L180 56M108 72L170 72M108 88L160 88M190 120L210 100" />
        </>}
        {/* chemistry: water bent at 104.5°, CO₂ straight, the 4 groups round O, and the pull toward O */}
        {s.kind === 'water' && <>
          <path {...common} d="M139 62L108 86M161 62L192 86" />
          <path {...common} strokeWidth={2} d="M131 70Q150 88 169 70" />
          {dot(128, 36)}{dot(134, 29)}{dot(166, 29)}{dot(172, 36)}
          {atom(150, 50, 'O')}{atom(98, 96, 'H')}{atom(202, 96, 'H')}{small(150, 112, '104.5°')}
        </>}
        {s.kind === 'co2' && <>
          <path {...common} d="M96 56L134 56M96 66L134 66M166 56L204 56M166 66L204 66" />
          {dot(66, 40)}{dot(74, 40)}{dot(66, 82)}{dot(74, 82)}{dot(226, 40)}{dot(234, 40)}{dot(226, 82)}{dot(234, 82)}
          {atom(80, 61, 'O')}{atom(150, 61, 'C')}{atom(220, 61, 'O')}{small(150, 108, '180°')}
        </>}
        {s.kind === 'tetra' && <>
          <path {...common} d="M140 56C122 52 100 32 106 18C112 4 134 22 140 56" /><path {...common} d="M160 56C178 52 200 32 194 18C188 4 166 22 160 56" />
          <path {...common} d="M140 74L112 102M160 74L188 102" />
          {dot(116, 26)}{dot(124, 34)}{dot(184, 26)}{dot(176, 34)}
          {atom(150, 66, 'O')}{atom(102, 112, 'H')}{atom(198, 112, 'H')}
        </>}
        {s.kind === 'dipole' && <>
          <path {...common} d="M139 62L108 86M161 62L192 86" />
          <path {...common} d="M246 104L246 34M236 46L246 32L256 46M238 94L254 94" />
          {atom(150, 50, 'O')}{atom(98, 96, 'H')}{atom(202, 96, 'H')}
          {small(150, 22, 'δ−')}{small(80, 122, 'δ+')}{small(220, 122, 'δ+')}
        </>}
        {/* the IR spectrum of an acid: the broad O–H trough round 3000, the sharp C=O at 1710 (4000 at the left, 500 at the right) */}
        {s.kind === 'ir' && <>
          <path {...common} strokeWidth={2} d="M20 114L280 114M20 114L20 14" />
          <path {...common} d="M24 22C44 22 56 24 64 30C74 40 80 88 98 94C114 98 124 64 136 36C146 26 170 26 182 28L186 30L190 100L195 30C210 28 228 32 240 34L246 52L252 32C262 30 272 32 280 34" />
          {small(98, 108, '3000')}{small(190, 128, '1710')}
        </>}
        {/* butanoic acid, skeletal: the chain, the C=O up, the OH off to the right */}
        {s.kind === 'acid' && <>
          <path {...common} d="M44 96L84 72L124 96L164 72M164 72L204 96M160 72L160 36M168 72L168 36" />
          {atom(164, 22, 'O', 22)}{atom(226, 100, 'OH', 22)}
        </>}
        {/* n+1: a quartet next to a triplet */}
        {s.kind === 'split' && <>
          <path {...common} strokeWidth={2} d="M20 108L280 108" />
          <path {...common} d="M70 108L70 74M82 108L82 40M94 108L94 40M106 108L106 74M196 108L196 60M208 108L208 30M220 108L220 60" />
          {small(88, 128, 'q · 2.4')}{small(208, 128, 't · 1.0')}
        </>}
        {/* 3-pentanone: an ethyl each side of the C=O */}
        {s.kind === 'ketone' && <>
          <path {...common} d="M60 96L100 72L140 96L180 72L220 96M136 96L136 56M144 96L144 56" />
          {atom(140, 42, 'O', 22)}
        </>}
      </g>
      {s.label && <text x="150" y="148" textAnchor="middle" style={{ font: '400 14px var(--font-second)', fill: 'var(--text-muted)' }}>{s.label}</text>}
    </svg>
  )
}

/** Pastel pills from his Cofounder ref ("this color palette… shows a little bit of cleanliness"): a pale fill, a 1 px rim
    in its own hue, the word a step darker. */
const TONE: Record<Tone, { bg: string; rim: string; ink: string }> = {
  grey: { bg: 'var(--silver-100)', rim: 'var(--silver-300)', ink: 'var(--silver-800)' },
  blue: { bg: 'var(--sky-50)', rim: 'var(--sky-200)', ink: 'var(--sky-700)' },
  butter: { bg: 'var(--pollen-50)', rim: 'var(--pollen-200)', ink: 'var(--pollen-700)' },
  green: { bg: 'var(--moss-50)', rim: 'var(--moss-300)', ink: 'var(--moss-700)' },
}
function Pill({ tone, k, children }: { tone: Tone; k: number; children: ReactNode }) {
  const t = TONE[tone]
  return <span style={{ display: 'inline-block', padding: `${2 * k}px ${9 * k}px`, borderRadius: 99, background: t.bg, boxShadow: `inset 0 0 0 1px ${t.rim}`, color: t.ink,
    font: `500 ${12.5 * k}px/1.3 var(--font-head)`, whiteSpace: 'nowrap', flex: 'none' }}>{children}</span>
}
/** Blicky's page body: the notes, then the sketches. */
function NotesBody({ p, page, k, ink, writing, go, written, stagger, small, onItem }: { p: NotesPage; page: number; k: number; ink: string; writing: boolean; go: boolean; written: number; stagger: number; small: boolean; onItem: (i: number) => void }) {
  const shown = writing ? Math.min(p.notes.length, written + (go ? 1 : 0)) : p.notes.length
  return (
    <>
      <div style={{ display: 'grid', gap: 14 * k, marginTop: 18 * k }}>
        {p.notes.slice(0, shown).map((n, i) => (
          <div key={`${page}-${i}`} style={{ font: `400 ${(n.kind === 'quote' ? 20 : 17) * k}px/1.4 var(--font-second)`, color: n.kind === 'quote' ? ink : 'var(--text-secondary)',
            paddingLeft: n.kind === 'detail' ? 18 * k : 0, position: 'relative' }}>
            {n.kind === 'detail' && <span style={{ position: 'absolute', left: 0, top: '0.62em', width: 9 * k, height: 2 * k, borderRadius: 2, background: 'var(--text-muted)', transform: `rotate(${(rnd(i, 3) - 0.5) * 10}deg)` }} />}
            <Hand text={n.text} seed={page * 31 + i * 7} play={go && i === written} stagger={stagger} k={k} open={n.kind === 'quote' ? '“' : ''} close={n.kind === 'quote' ? '”' : ''} onDone={() => onItem(i)} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 22 * k, marginTop: 26 * k, paddingTop: 18 * k }}>
        {(!writing || written >= p.notes.length) && p.sketches.map((s, i) => <SketchArt key={`${page}-s${i}`} s={s} k={k * (small ? 0.9 : 1)} ink={ink} play={writing} />)}
      </div>
    </>
  )
}
const planCount = (p: PlanPage) => 3 + (p.earlier?.length ?? 0)      // north star, last stop, next step, each earlier stop

/** Pickle's page body: the north star at the top, then the last stop and the next step on a short rail (the one green thing is
    the next step), then the earlier stops, quieter, further down the scroll. Hovering the last stop shows the moment it was
    (the pad draws that card outside the page, see `onPeek`). */
function PlanBody({ p, page, k, ink, writing, go, written, stagger, onItem, onPeek }: { p: PlanPage; page: number; k: number; ink: string; writing: boolean; go: boolean; written: number
  stagger: number; onItem: (i: number) => void; onPeek: (el: HTMLElement | null) => void }) {
  const vis = (i: number) => !writing || i < written || (go && i === written)
  const hand = (i: number, text: string) => <Hand text={text} seed={page * 31 + i * 7} play={go && i === written} stagger={stagger} k={k} onDone={() => onItem(i)} />
  const [hot, setHot] = useState(false)
  const gutter = 30 * k, mid = 9 * k
  const marker = (kind: 'north' | 'last' | 'next' | 'earlier') => (
    <span style={{ position: 'absolute', left: mid, top: 10 * k, transform: `translate(-50%, -50%)${kind === 'north' ? ' rotate(45deg)' : ''}`,
      width: (kind === 'next' ? 14 : kind === 'north' ? 11 : kind === 'earlier' ? 8 : 10) * k, height: (kind === 'next' ? 14 : kind === 'north' ? 11 : kind === 'earlier' ? 8 : 10) * k,
      borderRadius: kind === 'north' ? 2 * k : 99, background: kind === 'next' ? ink : 'var(--surface-page)',
      boxShadow: kind === 'next' ? `0 0 0 ${2.5 * k}px var(--surface-page), 0 0 0 ${3.5 * k}px var(--moss-300)` : `inset 0 0 0 ${1.5 * k}px var(${kind === 'earlier' ? '--silver-300' : '--silver-500'})` }} />
  )
  const row: CSSProperties = { position: 'relative', paddingLeft: gutter, display: 'grid', gap: 5 * k }
  const head: CSSProperties = { display: 'flex', gap: 8 * k, alignItems: 'center', minHeight: 20 * k }
  const day = (d: string) => <span style={{ font: `400 ${12 * k}px var(--font-pixel)`, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{d}</span>
  return (
    <div style={{ display: 'grid', gap: 20 * k, marginTop: 16 * k }}>
      {vis(0) && <div style={row}>{marker('north')}
        <span style={head}><Pill tone="grey" k={k}>north star</Pill></span>
        <span style={{ font: `400 ${17 * k}px/1.42 var(--font-second)`, color: 'var(--text-secondary)' }}>{hand(0, p.north)}</span>
      </div>}
      {vis(1) && <div style={{ ...row, margin: `${-6 * k}px ${-8 * k}px 0`, padding: `${6 * k}px ${8 * k}px ${6 * k}px ${gutter + 8 * k}px`, borderRadius: 10 * k,
          background: hot && p.peek ? 'var(--silver-100)' : 'transparent', cursor: p.peek ? 'default' : undefined }}
          onMouseEnter={(e) => { if (!p.peek) return; setHot(true); onPeek(e.currentTarget) }} onMouseLeave={() => { setHot(false); onPeek(null) }}>
        <span style={{ position: 'absolute', left: mid + 8 * k - 0.75, top: 20 * k, bottom: -20 * k, width: 1.5, background: vis(2) ? 'var(--silver-300)' : 'transparent' }} />
        <span style={{ position: 'absolute', left: 8 * k, top: 6 * k, width: 2 * mid, height: 20 * k }}>{marker('last')}</span>
        <span style={head}>{day(p.last.day)}<Pill tone="grey" k={k}>last stop</Pill>
          {p.peek && <span title="hover to see the screen and what was said" style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4 * k, font: `500 ${11.5 * k}px var(--font-head)`, color: 'var(--text-muted)' }}>
            <svg viewBox="0 0 16 16" width={14 * k} height={14 * k} fill="none" stroke="currentColor" strokeWidth={1.4}><rect x="1.5" y="3" width="13" height="10" rx="2" /><path d="M1.5 11l4-4 3 3 2-2 4 4" /></svg>preview</span>}
        </span>
        <span style={{ font: `400 ${17 * k}px/1.42 var(--font-second)`, color: 'var(--text-secondary)' }}>{hand(1, p.last.text)}</span>
      </div>}
      {vis(2) && <div style={row}>{marker('next')}
        <span style={head}><Pill tone="green" k={k}>next step</Pill></span>
        <span style={{ font: `400 ${20 * k}px/1.42 var(--font-second)`, color: ink }}>{hand(2, p.next)}</span>
      </div>}
      {p.earlier && p.earlier.length > 0 && vis(3) && <div style={{ display: 'grid', gap: 12 * k, marginTop: 10 * k }}>
        <span style={{ paddingLeft: gutter, font: `600 ${11.5 * k}px var(--font-head)`, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>earlier</span>
        {p.earlier.map((e, j) => vis(3 + j) && <div key={j} style={row}>{marker('earlier')}
          <span style={head}>{day(e.day)}</span>
          <span style={{ font: `400 ${15 * k}px/1.42 var(--font-second)`, color: 'var(--text-muted)' }}>{hand(3 + j, e.text)}</span>
        </div>)}
      </div>}
    </div>
  )
}

/** The last stop's moment, beside the pad: the screen it was on, what he said, and the reply. Neutral: a white card, one rim. */
function PeekCard({ peek, k }: { peek: Peek; k: number }) {
  const W = 290 * k
  return (
    <div style={{ width: W, padding: 12 * k, boxSizing: 'border-box', borderRadius: 16 * k, background: 'var(--surface-page)', display: 'grid', gap: 10 * k,
      boxShadow: 'inset 0 0 0 1px var(--silver-200), 0 1px 0 oklch(0.3 0.01 230 / .12), 0 6px 0 -3px oklch(0.3 0.01 230 / .06)' }}>
      <div style={{ width: W - 24 * k, height: (W - 24 * k) * 0.625, borderRadius: 9 * k, overflow: 'hidden', background: 'var(--silver-100)', boxShadow: 'inset 0 0 0 1px var(--silver-200)', position: 'relative' }}>
        {peek.shot ?? <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', font: `400 ${12 * k}px var(--font-pixel)`, color: 'var(--text-muted)' }}>no screenshot</span>}
      </div>
      {peek.where && <span style={{ font: `400 ${11 * k}px var(--font-pixel)`, color: 'var(--text-muted)' }}>{peek.where}</span>}
      <div style={{ display: 'grid', gap: 4 * k }}>
        <span><Pill tone="grey" k={k}>you said</Pill></span>
        <span style={{ font: `400 ${14.5 * k}px/1.4 var(--font-second)`, color: 'var(--ink)' }}>“{peek.said}”</span>
      </div>
      <div style={{ display: 'grid', gap: 4 * k }}>
        <span><Pill tone="grey" k={k}>{peek.by ?? 'Blicky'}</Pill></span>
        <span style={{ font: `400 ${14.5 * k}px/1.4 var(--font-second)`, color: 'var(--text-secondary)' }}>{peek.reply}</span>
      </div>
    </div>
  )
}

/** Fun shapes for the scratchpad's markers ("utilsize more fun shapes"): a star, a sparkle, a blob, a flower, a rounded
    triangle. Drawn in the line's hand; filled for the thing just done, hollow for the rest. */
export type Fun = 'star' | 'spark' | 'blob' | 'flower' | 'tri'
const FUN: Record<Fun, string> = {
  star: 'M12 2.5l2.8 6 6.5.7-4.9 4.4 1.4 6.4L12 16.8 6.2 20l1.4-6.4L2.7 9.2l6.5-.7z',
  spark: 'M12 2c.9 5.2 4.8 9.1 10 10-5.2.9-9.1 4.8-10 10-.9-5.2-4.8-9.1-10-10 5.2-.9 9.1-4.8 10-10z',
  blob: 'M12.5 3c4.6-.2 8.6 3.4 8.4 8.2-.2 5-3.8 9.6-9 9.3C6.8 20.2 3 16.6 3.2 11.8 3.4 7 7.6 3.2 12.5 3z',
  flower: 'M12 9.5a3 3 0 1 1 0-.01zM12 3a3.2 3.2 0 0 1 2.4 5.4A3.2 3.2 0 0 1 20.2 10a3.2 3.2 0 0 1-3.9 4.4 3.2 3.2 0 0 1-1.9 5.5A3.2 3.2 0 0 1 12 16a3.2 3.2 0 0 1-2.4 3.9 3.2 3.2 0 0 1-1.9-5.5A3.2 3.2 0 0 1 3.8 10a3.2 3.2 0 0 1 5.8-1.6A3.2 3.2 0 0 1 12 3z',
  tri: 'M12 3.5c.8 0 1.5.4 1.9 1.1l7 12.2c.8 1.4-.2 3.2-1.9 3.2H5c-1.7 0-2.7-1.8-1.9-3.2l7-12.2c.4-.7 1.1-1.1 1.9-1.1z',
}
function FunMark({ shape, size, ink, filled }: { shape: Fun; size: number; ink: string; filled?: boolean }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} style={{ display: 'block', overflow: 'visible' }}>
    <path d={FUN[shape]} fill={filled ? ink : 'var(--surface-page)'} stroke={filled ? 'var(--surface-page)' : ink} strokeWidth={filled ? 1.2 : 1.8} strokeLinejoin="round" fillRule="evenodd" />
  </svg>
}
const SOURCE_SHAPE: Record<Source['kind'], Fun> = { screen: 'blob', words: 'flower', note: 'tri', rule: 'star' }
const scratchCount = (p: ScratchPage) => 3 + p.sources.length + (p.next ? 1 : 0)      // on, done, context, each source, next

/** Blicky's scratchpad body: what it's on, what it completed (filled sparkle, his ink) with its context, the routes from it to
    each source, the scratch, and what's next. */
function ScratchBody({ p, page, k, ink, writing, go, written, stagger, onItem }: { p: ScratchPage; page: number; k: number; ink: string; writing: boolean; go: boolean; written: number; stagger: number; onItem: (i: number) => void }) {
  const vis = (i: number) => !writing || i < written || (go && i === written)
  const hand = (i: number, text: string, delay = 0) => <Hand text={text} seed={page * 31 + i * 7} play={go && i === written} delay={delay} stagger={stagger} k={k} onDone={() => onItem(i)} />
  const gutter = 32 * k, S = p.sources.length
  const row: CSSProperties = { position: 'relative', paddingLeft: gutter, display: 'grid', gap: 5 * k }
  const mark = (shape: Fun, filled = false, size = 18) => <span style={{ position: 'absolute', left: 10 * k - (size * k) / 2, top: 1 * k }}><FunMark shape={shape} size={size * k} ink={ink} filled={filled} /></span>
  const drawn = !writing || written >= 3 + S
  return (
    <div style={{ display: 'grid', gap: 18 * k, marginTop: 16 * k }}>
      {vis(0) && <div style={row}>{mark('star')}
        <span><Pill tone="grey" k={k}>working on</Pill></span>
        <span style={{ font: `400 ${17 * k}px/1.42 var(--font-second)`, color: 'var(--text-secondary)' }}>{hand(0, p.on)}</span>
      </div>}
      {vis(1) && <div style={row}>{mark('spark', true, 20)}
        <span><Pill tone="blue" k={k}>completed</Pill></span>
        <span style={{ font: `400 ${20 * k}px/1.4 var(--font-second)`, color: ink }}>{hand(1, p.done)}</span>
        {vis(2) && <span style={{ font: `400 ${15 * k}px/1.45 var(--font-second)`, color: 'var(--text-muted)' }}>{hand(2, p.context)}</span>}
      </div>}
      {S > 0 && vis(3) && <SourceMap sources={p.sources} page={page} k={k} ink={ink} writing={writing} go={go} written={written - 3} stagger={stagger} onItem={(j) => onItem(3 + j)} />}
      {drawn && p.sketches.length > 0 && <div style={{ display: 'grid', gap: 10 * k, paddingLeft: gutter - 10 * k }}>
        {p.sketches.map((sk, i) => <SketchArt key={`${page}-x${i}`} s={sk} k={k * 0.92} ink={ink} play={writing} />)}
      </div>}
      {p.next && vis(3 + S) && <div style={row}>{mark('spark', false, 16)}
        <span><Pill tone="grey" k={k}>up next</Pill></span>
        <span style={{ font: `400 ${16 * k}px/1.42 var(--font-second)`, color: 'var(--text-secondary)' }}>{hand(3 + S, p.next, writing ? 600 + p.sketches.length * 700 : 0)}</span>
      </div>}
    </div>
  )
}

/** The routes to each source of content: from what it completed, a dotted branch to each source (the screen, his words, a
    note, a rule of his), laid a dot every 40 ms, each ending in its own shape. */
function SourceMap({ sources, page, k, ink, writing, go, written, stagger, onItem }: { sources: Source[]; page: number; k: number; ink: string; writing: boolean; go: boolean; written: number; stagger: number; onItem: (j: number) => void }) {
  const box = useRef<HTMLDivElement>(null), svg = useRef<SVGSVGElement>(null)
  const [ys, setYs] = useState<number[]>([])
  const shown = writing ? Math.min(sources.length, Math.max(0, written + (go ? 1 : 0))) : sources.length
  useLayoutEffect(() => {
    const el = box.current; if (!el) return
    const measure = () => setYs(Array.from(el.querySelectorAll<HTMLElement>('[data-src]')).map((r) => r.offsetTop + 11 * k))
    measure()
    const ro = new ResizeObserver(measure); ro.observe(el)
    return () => ro.disconnect()
  }, [k, shown])
  const ox = 10 * k, oy = -10 * k, nx = 46 * k, gap = 7.5 * k
  const branch = (y: number) => {
    const P = [[ox, oy], [ox, y], [ox + (nx - ox) * 0.3, y], [nx - 10 * k, y]]
    const at = (t: number) => [0, 1].map((d) => (1 - t) ** 3 * P[0][d] + 3 * (1 - t) ** 2 * t * P[1][d] + 3 * (1 - t) * t * t * P[2][d] + t ** 3 * P[3][d])
    const n = Math.max(4, Math.round((Math.abs(y - oy) + nx - ox) / gap))
    return Array.from({ length: n + 1 }, (_, i) => at(i / n))
  }
  const laid = useRef(new Set<number>())
  useGSAP(() => {
    if (!svg.current) return
    ys.slice(0, shown).forEach((_, j) => {
      const dots = svg.current!.querySelectorAll(`[data-b="${j}"] circle`)
      if (!writing || laid.current.has(j) || !dots.length) return
      laid.current.add(j)
      gsap.fromTo(dots, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.001, stagger: tokens.motion.ms.dot / 1000, ease: 'steps(1)' })
    })
  }, { dependencies: [ys.length, shown, writing] })
  return (
    <div ref={box} style={{ position: 'relative', display: 'grid', gap: 12 * k, marginTop: -4 * k }}>
      <svg ref={svg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
        {ys.slice(0, shown).map((y, j) => <g key={j} data-b={j}>{branch(y).map(([x, yy], i) => <circle key={i} cx={x} cy={yy} r={1.8 * k} fill={ink} opacity={0.75} />)}</g>)}
      </svg>
      <span style={{ paddingLeft: nx + 4 * k, font: `600 ${11.5 * k}px var(--font-head)`, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>from</span>
      {sources.slice(0, shown).map((src, j) => (
        <div key={`${page}-${j}`} data-src style={{ position: 'relative', paddingLeft: nx + 4 * k, display: 'grid', gap: 3 * k }}>
          <span style={{ position: 'absolute', left: nx - 13 * k, top: 2 * k }}><FunMark shape={SOURCE_SHAPE[src.kind]} size={17 * k} ink={ink} /></span>
          <span style={{ font: `600 ${13.5 * k}px var(--font-head)`, color: 'var(--ink)' }}>{src.label}</span>
          {src.detail && <span style={{ font: `400 ${14 * k}px/1.4 var(--font-second)`, color: 'var(--text-muted)' }}>
            <Hand text={src.detail} seed={page * 31 + (j + 3) * 7} play={go && j === written} delay={writing ? 300 : 0} stagger={stagger} k={k} onDone={() => onItem(j)} />
          </span>}
        </div>
      ))}
    </div>
  )
}

/** The border while the pad is writing (his words: "when it is activaly writing, use the example where the metal borarder is
    almost shiney like prismatic glass and not rainbows"): the chrome clears toward glass and a bright catch runs round it,
    its fringes only a breath of cool and warm, never a rainbow. */
function Glint({ R, edge, on }: { R: number; edge: number; on: boolean }) {
  const ring = useRef<HTMLDivElement>(null), spin = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (!ring.current || !spin.current) return
    gsap.to(ring.current, { autoAlpha: on ? 1 : 0, duration: tokens.motion.ms.swap / 1000, ease: 'power2.out' })
    if (on) gsap.fromTo(spin.current, { rotation: 0 }, { rotation: 360, duration: 2.6, ease: 'none', repeat: -1 })
    else gsap.killTweensOf(spin.current)
  }, { dependencies: [on] })
  const m = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)'
  return (
    <div ref={ring} style={{ position: 'absolute', inset: 0, borderRadius: R, padding: edge, overflow: 'hidden', opacity: 0, WebkitMask: m, mask: m, WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' } as CSSProperties}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, oklch(1 0 0 / .82), oklch(0.95 0.008 225 / .55) 45%, oklch(0.99 0.004 220 / .78))' }} />
      <div ref={spin} style={{ position: 'absolute', left: '50%', top: '50%', width: '160%', aspectRatio: '1', translate: '-50% -50%',
        background: 'conic-gradient(from 0deg, transparent 0deg, oklch(0.93 0.045 200 / .0) 6deg, oklch(0.93 0.045 200 / .8) 20deg, oklch(1 0 0) 30deg, oklch(0.94 0.04 330 / .75) 40deg, transparent 56deg, transparent 170deg, oklch(0.95 0.03 210 / .6) 186deg, oklch(1 0 0 / .9) 194deg, oklch(0.95 0.03 320 / .5) 202deg, transparent 218deg, transparent 360deg)' }} />
      {/* the glass's own edges: a bright line on the outside, a fine darker one where it meets the page */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: R, boxShadow: 'inset 0 0 0 1px oklch(1 0 0 / .95)' }} />
    </div>
  )
}

/** Moss inside the felt (his words: "don't put on the left edges… cut off by the felt itself… a slight texture, lower opacity,
    a little bit better blended around the edges… a more thinner pattern… adjust the seed for… different shapes locations
    maybe just the edge maybe in the middle maybe it's like smaller puddles"). Fine-grained moss, clipped to the felt's own
    shape, shown only through soft puddles placed from the seed, and never in the left third. */
function MossInFelt({ width, height, radius, m }: { width: number; height: number; radius: number; m: MossTune }) {
  const mask = useMemo(() => {
    const n = m.place === 'middle' ? 1 : m.place === 'edge' ? 3 : 5
    return Array.from({ length: n }, (_, i) => {
      const a = rnd(m.seed * 7 + i, 1), b = rnd(m.seed * 7 + i, 2), c = rnd(m.seed * 7 + i, 3)
      const p = m.place === 'edge' ? { x: 0.42 + 0.58 * a, y: 0.04 + 0.1 * b, rx: (0.1 + 0.09 * c) * width, ry: (0.5 + 0.3 * c) * height }
        : m.place === 'middle' ? { x: 0.55 + 0.3 * (a - 0.5), y: 0.5, rx: 0.2 * width, ry: 0.62 * height }
        : { x: 0.38 + 0.6 * a, y: 0.15 + 0.7 * b, rx: (0.045 + 0.055 * c) * width, ry: (0.3 + 0.3 * c) * height }
      return `radial-gradient(${p.rx * m.amount}px ${p.ry * m.amount}px at ${p.x * 100}% ${p.y * 100}%, #000 0%, rgb(0 0 0 / .55) 45%, transparent 100%)`
    }).join(', ')
  }, [m.place, m.seed, m.amount, width, height])
  return (
    <div style={{ position: 'absolute', inset: 0, borderRadius: radius, overflow: 'hidden', opacity: m.opacity, WebkitMaskImage: mask, maskImage: mask, pointerEvents: 'none' }}>
      <Surface material="moss" width={width} height={height} radius={0} pad={0} shadow={0} seed={m.seed} cushion={m.grain} sparse={0.55} bloom={0.16} dew={0.3} fringe={0} />
    </div>
  )
}

/** Pixel grass along the bottom of Pickle's page (his Cofounder ref: "this bottom texture of grass. Pixelated is also really
    good"). A low band of lime, then pixels scattering up out of it, thinning as they rise. */
function PixelGrass({ width, k, seed = 2, hue = 'moss' }: { width: number; k: number; seed?: number; hue?: 'moss' | 'sky' }) {
  const px = Math.max(3, Math.round(4 * k)), H = Math.round(42 * k), cols = Math.ceil(width / px), rows = Math.ceil(H / px)
  const cells = useMemo(() => {
    const out: { x: number; y: number; w: number; c: string }[] = []
    for (let i = 0; i < cols; i++) {
      const base = 3 + Math.round(rnd(i * 0.31 + seed, 5) * 1.2 + Math.sin(i * 0.23 + seed) * 1.1)
      for (let j = 0; j < rows; j++) {
        const r = rnd(i * 13.1 + j * 7.7 + seed, 6), c = rnd(i * 3.3 + j * 5.1 + seed, 8)
        if (j < base) {                                                                  // the band, with lighter and darker patches
          out.push({ x: i * px, y: H - (j + 1) * px, w: px, c: c < 0.12 ? `var(--${hue}-400)` : c < 0.34 ? `var(--${hue}-200)` : `var(--${hue}-300)` })
        } else if (r < 0.5 * Math.exp(-(j - base) / 2)) {                                // pixels scattering up, thinning out
          out.push({ x: i * px, y: H - (j + 1) * px, w: px * (c < 0.22 ? 2 : 1), c: c < 0.5 ? `var(--${hue}-200)` : c < 0.8 ? `var(--${hue}-100)` : `var(--${hue}-300)` })
        }
      }
    }
    return out
  }, [cols, rows, px, H, seed, hue])
  return (
    <svg width={width} height={H} shapeRendering="crispEdges" style={{ position: 'absolute', left: 0, bottom: 0, display: 'block', pointerEvents: 'none' }}>
      {cells.map((c, i) => <rect key={i} x={c.x} y={c.y} width={c.w} height={px} fill={c.c} />)}
    </svg>
  )
}

/** A ring drawn only on the edge of a rounded box (a line that keeps the radius), filled with any background. */
function Ring({ radius, width = 1, background, inset = 0 }: { radius: number; width?: number; background: string; inset?: number }) {
  const m = 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)'
  // the shorthand first: set after the composite, it would reset it and the ring would fill solid
  return <div style={{ position: 'absolute', inset, borderRadius: radius, padding: width, background, WebkitMask: m, mask: m, WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' } as CSSProperties} />
}
/** A polished edge mirroring the room, the way chrome does: bright sky above, a crisp dark horizon line a little below the
    middle, the light floor, then a darker foot. On the long sides that reads as polish, not as a grey line. */
const POLISH = 'linear-gradient(180deg, oklch(1 0 0) 0%, oklch(0.94 0.005 220) 28%, oklch(0.78 0.012 230) 51%, oklch(0.42 0.016 235) 53%, oklch(0.62 0.014 232) 58%, oklch(0.9 0.006 222) 72%, oklch(0.97 0.004 220) 86%, oklch(0.6 0.012 232) 100%)'
const RAINBOW = 'conic-gradient(from 200deg, oklch(0.86 0.09 200), oklch(0.88 0.08 300), oklch(0.9 0.08 350), oklch(0.93 0.08 95), oklch(0.88 0.09 160), oklch(0.86 0.09 230), oklch(0.86 0.09 200))'

/** The metal pad's edge, behind the page. bezel (refs 05, 06: "what they round off into edges"): a polished shell holds the
    page a few px in, radii concentric. glass (ref 04): a clear chamfered rim with a thin rainbow on its outer edge. mix: the
    polished shell with a glass lip. */
function Edge({ surface, width, height, R, edge, k }: { surface: PadSurface; width: number; height: number; R: number; edge: number; k: number }) {
  if (surface === 'white' || surface === 'metal') return null
  const shell = <Surface material="metal" width={width} height={height} radius={R} shadow={0} pad={0} contrast={1.85} sheen={1.5} dome={0.1} bevel={2.2} brushed={0.15} specks={0.1} />
  const line = <div style={{ position: 'absolute', inset: 0, borderRadius: R, boxShadow: '0 0 0 1px oklch(0.42 0.012 230 / .38)', pointerEvents: 'none' }} />
  if (surface === 'bezel') return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {shell}
      <Ring radius={R} width={edge} background={POLISH} />{/* the polished edge round the page */}
      <Ring radius={R} background="oklch(1 0 0 / .95)" />{/* the light catching the shell's outer edge */}
      {line}
    </div>
  )
  if (surface === 'glass') return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: R, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: RAINBOW, opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg, oklch(1 0 0 / .96) 0%, oklch(0.97 0.006 220 / .72) 30%, oklch(0.94 0.01 225 / .6) 62%, oklch(0.99 0.004 220 / .9) 100%)' }} />
        <Ring radius={R} width={1.5 * k} background={RAINBOW} />{/* light split by the chamfer */}
        <Ring radius={R - 1.5 * k} inset={1.5 * k} background="oklch(1 0 0 / .95)" />
      </div>
      {line}
    </div>
  )
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {shell}
      <div style={{ position: 'absolute', inset: 0, borderRadius: R, overflow: 'hidden' }}>
        <Ring radius={R - 3 * k} inset={3 * k} width={edge - 3 * k} background={POLISH} />
        <Ring radius={R} width={3 * k} background={`linear-gradient(155deg, oklch(1 0 0 / .9), oklch(0.96 0.01 220 / .5) 50%, oklch(1 0 0 / .8)), ${RAINBOW}`} />
        <Ring radius={R} width={1.2 * k} background={RAINBOW} />
        <Ring radius={R - 3 * k} inset={3 * k} background="oklch(1 0 0 / .9)" />
      </div>
      {line}
    </div>
  )
}

export type NotesPadProps = { who: Who; pages: AnyPage[]; page: number; writing?: boolean; surface?: PadSurface; width?: number; height?: number; stagger?: number
  moss?: MossTune; binding?: Binding; sticker?: boolean | 'hidden'; grass?: boolean; load?: boolean; onLoad?: () => void
  /** paper: the normal white page; satin: brushed metal under a veil. Defaults: paper on white, satin on the metal surfaces. */
  sheet?: 'paper' | 'satin' | 'grid'
  /** the border turns to clear glass with a running catch while the page is being written */
  glint?: boolean
  /** with `writing`, hold the pen until this turns true (the final story waits for Pickle to land on the pad) */
  start?: boolean
  projects?: Project[]; lead?: string; onPick?: (name: string) => void; active?: string; onResize?: (w: number, h: number) => void; onWritten?: () => void; style?: CSSProperties }

export function NotesPad({ who, pages, page, writing = false, surface = 'white', width = 400, height = 520, stagger = 1, moss = MOSS_DEFAULT, binding = 'felt', sticker = true,
  grass = who === 'pickle', load = who === 'pickle', onLoad, sheet: tone, glint = false, start = true, projects, lead, onPick, active = 'pickje', onResize, onWritten, style }: NotesPadProps) {
  const go = writing && start
  const k = width / 400
  const ink = who === 'blicky' ? 'var(--blicky-ink)' : 'var(--pickle-ink)'
  const p = pages[Math.min(page, pages.length - 1)]
  const total = isPlan(p) ? planCount(p) : isScratch(p) ? scratchCount(p) : p.notes.length
  const [written, setWritten] = useState(0)                 // how many items on this page are fully written
  const [titled, setTitled] = useState(!writing)            // the header shows the summing-up title once writing is done
  const [hover, setHover] = useState<string>()
  const [over, setOver] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null), scroll = useRef<HTMLDivElement>(null), root = useRef<HTMLDivElement>(null), stick = useRef<HTMLDivElement>(null)
  const [peekTop, setPeekTop] = useState<number | null>(null)
  const onPeek = (el: HTMLElement | null) => {
    if (!el || !root.current) { setPeekTop(null); return }
    const r = root.current.getBoundingClientRect(), e = el.getBoundingClientRect(), sc = r.width / root.current.offsetWidth   // the screen may be scaled
    setPeekTop((e.top - r.top) / sc)
  }
  // the sticker lands: a hit and a settle (90 ms, then back to size)
  const was = useRef(sticker)
  useGSAP(() => {
    if (was.current === 'hidden' && sticker === true && stick.current) gsap.fromTo(stick.current, { scale: 1.22 }, { scale: 1, duration: (tokens.motion.ms.hitStop * 2.4) / 1000, ease: 'back.out(3)', transformOrigin: '50% 80%' })
    was.current = sticker
  }, { dependencies: [sticker] })
  useEffect(() => { setWritten(writing ? 0 : total); setTitled(!writing) }, [page, writing])
  useEffect(() => {
    if (writing && written >= total) {
      const t = setTimeout(() => { setTitled(true); if (!('notes' in p)) scroll.current?.scrollTo({ top: 0, behavior: 'smooth' }); onWritten?.() }, 600 + (isPlan(p) ? 0 : isScratch(p) ? 300 : p.sketches.length * 700))
      return () => clearTimeout(t)
    }
  }, [written, writing])
  useEffect(() => { if (go && written > 0) scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: 'smooth' }) }, [written, writing])
  const onItem = (i: number) => setWritten((w) => Math.max(w, i + 1))
  // a new page: the last one flips up over the binding (220 ms, ease out)
  const prev = useRef(page)
  useGSAP(() => {
    if (prev.current !== page && pageRef.current) gsap.fromTo(pageRef.current, { rotationX: 28, y: -18 * k, autoAlpha: 0.2, transformPerspective: 900, transformOrigin: '50% 0%' }, { rotationX: 0, y: 0, autoAlpha: 1, duration: (tokens.motion.ms.swap * 1.6) / 1000, ease: 'power3.out' })
    prev.current = page
  }, { dependencies: [page] })
  const titleRef = useRef<HTMLDivElement>(null)
  useGSAP(() => { if (titled && writing && titleRef.current) gsap.fromTo(titleRef.current, { y: 6 * k, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: tokens.motion.ms.swap / 1000, ease: 'power3.out' }) }, { dependencies: [titled] })

  // resize from the top-left corner (the pad lives at the bottom right of the screen)
  const drag = useRef<{ x: number; y: number; w: number; h: number } | null>(null)
  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY, w: width, h: height }; (e.target as HTMLElement).setPointerCapture(e.pointerId) }
  const onMove = (e: React.PointerEvent) => { const d = drag.current; if (!d) return; onResize?.(Math.max(220, d.w - (e.clientX - d.x)), Math.max(260, d.h - (e.clientY - d.y))) }

  const bind = 54 * k, curl = 26 * k, top = bind * 0.55, frameH = height - top
  const framed = surface === 'bezel' || surface === 'glass' || surface === 'mix', satin = tone ? tone === 'satin' : surface !== 'white'
  const R = 22 * k, edge = surface === 'mix' ? 11 * k : surface === 'bezel' ? 8 * k : framed ? 7 * k : 0
  const sheet = { x: edge, y: top + edge, w: width - edge * 2, h: frameH - edge * 2, r: framed ? R - edge : 18 * k }   // radii stay concentric
  const pad = width < 300 ? 18 * k : 26 * k, head = bind * 0.75 + 16 * k - edge
  const fade = satin ? 'oklch(0.975 0.004 220 / 0)' : 'oklch(1 0 0 / 0)'
  const headBg = satin ? 'linear-gradient(to bottom, oklch(0.975 0.004 220) 82%, oklch(0.975 0.004 220 / 0))' : 'var(--surface-page)'
  return (
    <div ref={root} data-pad={who} onPointerEnter={() => setOver(true)} onPointerLeave={() => !drag.current && setOver(false)} style={{ position: 'relative', width: width + 44 * k, height, ...style }}>
      {projects && <div style={{ transform: `scale(${k})`, transformOrigin: '0 0', position: 'absolute', left: 0, top: 0, width: 400 }}>
        <div style={{ position: 'absolute', left: 400 - NOTEPAD_W, top: 0 }}><Tabs projects={projects} active={active} phase="quiet" hover={hover} onHover={setHover} onPick={onPick} top={bind / k + 30} material="glass" lead={lead} /></div>
      </div>}
      <div style={{ position: 'absolute', left: 0, top, width, height: frameH }}><Edge surface={surface} width={width} height={frameH} R={R} edge={edge} k={k} />
        {framed && glint && <Glint R={R} edge={edge} on={go && !titled} />}</div>
      {/* the sheet: white, or satin metal under a white veil inside the polished edge; its bottom right corner curls in */}
      <div ref={pageRef} style={{ position: 'absolute', left: sheet.x, top: sheet.y, width: sheet.w, height: sheet.h, borderRadius: sheet.r, overflow: 'hidden',
        background: 'var(--surface-page)', clipPath: `polygon(0 0, 100% 0, 100% calc(100% - ${curl}px), calc(100% - ${curl}px) 100%, 0 100%)` }}>
        {satin && <>
          <div style={{ position: 'absolute', inset: 0 }}><Surface material="metal" width={sheet.w} height={sheet.h} radius={0} shadow={0} pad={0} brushed={0.85} sheen={0.5} contrast={1.1} bevel={0} specks={0.35} /></div>
          <div style={{ position: 'absolute', inset: 0, background: 'oklch(0.985 0.003 220 / .66)' }} />{/* satin: the brushing shows, the words still read */}
        </>}
        <div ref={scroll} style={{ position: 'absolute', inset: 0, overflowY: 'auto', scrollbarWidth: 'none', padding: `${head}px ${pad}px ${(grass ? 70 : 44) * k}px`, boxSizing: 'border-box',
          ...(tone === 'grid' ? { backgroundImage: `radial-gradient(circle, var(--silver-300) ${1 * k}px, transparent ${1.4 * k}px)`, backgroundSize: `${16 * k}px ${16 * k}px`, backgroundAttachment: 'local' } : {}) }}>
          <div style={{ position: 'sticky', top: -head, margin: `${-head}px ${-pad}px 0`, padding: `${head}px ${pad}px ${10 * k}px`, zIndex: 2, background: headBg }}>
            <div ref={titleRef} style={{ font: `700 ${27 * k}px/1.15 var(--font-head)`, letterSpacing: '-0.025em', color: 'var(--ink)' }}>{titled ? p.title : p.working}</div>
            {!satin && <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', height: 16 * k, background: 'linear-gradient(var(--surface-page), transparent)' }} />}{/* notes fade under the title as they scroll */}
          </div>
          {isPlan(p)
            ? <PlanBody p={p} page={page} k={k} ink={ink} writing={writing} go={go} written={written} stagger={stagger} onItem={onItem} onPeek={onPeek} />
            : isScratch(p) ? <ScratchBody p={p} page={page} k={k} ink={ink} writing={writing} go={go} written={written} stagger={stagger} onItem={onItem} />
            : <NotesBody p={p} page={page} k={k} ink={ink} writing={writing} go={go} written={written} stagger={stagger} small={width < 300} onItem={onItem} />}
          <div style={{ height: 40 * k }} />
        </div>
        {grass
          ? <><div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 66 * k, background: `linear-gradient(to bottom, ${fade} 0%, ${fade.replace('/ 0)', '/ 1)')} 55%)`, pointerEvents: 'none' }} />
              <PixelGrass width={sheet.w} k={k} seed={page + 2} hue={who === 'blicky' ? 'sky' : 'moss'} /></>
          : <>{/* a soft highlight and shade round off the bottom of the pad (no blur: a gradient and a 1 px line) */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 46 * k, background: 'linear-gradient(to bottom, transparent, oklch(0.3 0.01 230 / .06) 70%, oklch(0.3 0.01 230 / .1))', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: 14 * k, right: curl + 4, bottom: 3 * k, height: 1, background: 'oklch(1 0 0 / .8)', pointerEvents: 'none' }} />
            </>}
        {/* the sheet's own rim: a 1 px line and a light catch along its top inside (Cofounder's inner card) */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: sheet.r, boxShadow: framed ? 'inset 0 0 0 1px oklch(0.4 0.012 230 / .22), inset 0 1px 0 1px oklch(1 0 0 / .9)' : 'inset 0 -1px 0 oklch(0.3 0.01 230 / .12)', pointerEvents: 'none' }} />
      </div>
      {/* the curl: the corner lifted and turned in */}
      <div style={{ position: 'absolute', left: sheet.x + sheet.w - curl, top: sheet.y + sheet.h - curl, width: curl, height: curl, pointerEvents: 'none',
        background: 'linear-gradient(135deg, var(--silver-200) 0%, var(--silver-50) 45%, var(--silver-300) 100%)', clipPath: 'polygon(0 0, 100% 0, 0 100%)', borderRadius: `0 0 0 ${6 * k}px`,
        boxShadow: 'inset -1px -1px 0 oklch(0.3 0.01 230 / .25)', filter: 'drop-shadow(1px 1px 0 oklch(0.3 0.01 230 / .18))' }} />
      {/* the page number: a small glass chip at the bottom left of the sheet */}
      <Glass radius={7 * k} style={{ position: 'absolute', left: sheet.x + 14 * k, top: sheet.y + sheet.h - 34 * k, minWidth: 22 * k, height: 20 * k, padding: `0 ${6 * k}px`, boxSizing: 'border-box',
        font: `400 ${12 * k}px var(--font-pixel)` }}>{page + 1}</Glass>
      {/* the binding: the felt (sky for Blicky, forest for Pickle) with moss living inside it, or all moss ("maybe even attempt
          got it like the green is fully made out of just the moss"); then the sticker */}
      <div style={{ position: 'absolute', left: -4 * k, top: 0, width: width + 8 * k, height: bind }}>
        {binding === 'moss'
          ? <Surface material="moss" width={width + 8 * k} height={bind} radius={16 * k} shadow={0.6} spread={10} seed={moss.seed} cushion={moss.grain * 1.3} bloom={0.14} dew={0.35} fringe={2.5} />
          : <><Surface material="felt" color={who === 'blicky' ? 'surface-felt-sky' : 'surface-felt'} width={width + 8 * k} height={bind} radius={16 * k} shadow={0.6} spread={10} fringe={1} />
              {moss.on && <MossInFelt width={width + 8 * k} height={bind} radius={16 * k} m={moss} />}</>}
      </div>
      {sticker && <div data-sticker style={{ position: 'absolute', left: width - (who === 'blicky' ? 64 : 70) * k, top: (who === 'blicky' ? -30 : -46) * k, transform: 'rotate(12deg)', visibility: sticker === 'hidden' ? 'hidden' : 'visible' }}>
        <div ref={stick}>{who === 'blicky' ? <Blicky pose="wave" look="sticker" height={62 * k} /> : <Pickle pose="wave" look="sticker" height={84 * k} />}</div></div>}
      {isPlan(p) && p.peek && peekTop !== null && <div style={{ position: 'absolute', right: `calc(100% + ${16 * k}px)`, top: Math.max(0, peekTop - 40 * k), zIndex: 5, pointerEvents: 'none' }}><PeekCard peek={p.peek} k={k} /></div>}
      {load && <button type="button" onClick={onLoad} disabled={!onLoad} title={onLoad ? 'load' : 'load: planned, not wired yet'} aria-label="load"
        style={{ position: 'absolute', left: width + 9 * k, top: bind + (projects ? (30 + (projects.length + (lead ? 1 : 0)) * 98 + 6) * k : 30 * k), width: 28 * k, height: 28 * k, border: 0, padding: 0,
          cursor: onLoad ? 'pointer' : 'default', ...glass(8 * k), display: 'grid', placeItems: 'center' }}>
        <svg viewBox="0 0 16 16" width={15 * k} height={15 * k} fill="none" stroke="var(--sky-600)" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2.5v7M5 6.8 8 9.8l3-3M3 9.5v3h10v-3" /></svg>
      </button>}
      {onResize && <div onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => (drag.current = null)} title="drag to resize"
        style={{ position: 'absolute', left: -8, top: -8, width: 16, height: 16, borderRadius: 99, cursor: 'nwse-resize', background: 'var(--surface-plane)', boxShadow: '0 1px 0 oklch(0.3 0.01 230 / .3)',
          opacity: over ? 1 : 0, transition: `opacity ${tokens.motion.ms.swap}ms` }} />}
    </div>
  )
}
