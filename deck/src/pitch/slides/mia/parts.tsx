import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useStep } from '../../kit/step'
import chemistry from '../../assets/screens/chemistry.jpg'
import chemistryNmr from '../../assets/screens/chemistry-nmr.jpg'
import calHub from '../../assets/screens/cal-hub.jpg'
import stocks from '../../assets/screens/stocks.jpg'
import cad from '../../assets/screens/cad.jpg'
import video from '../../assets/screens/video.jpg'

/** Mia's story, the parts every slide in this folder shares. */
export const SCREENS = { chemistry, chemistryNmr, calHub, stocks, cad, video }

/** Mia, drawn in the cast's marker line: a round face, dot eyes (one bigger, like Pickle and Blicky), cheeks, a bun,
    a Cal-blue hoodie with gold strings. DRAFT drawing. */
export function MiaFigure({ height = 420, style }: { height?: number; style?: CSSProperties }) {
  const ink = 'var(--ink)', hair = 'var(--silver-900)'
  return (
    <svg viewBox="0 0 200 260" height={height} width={height * (200 / 260)} style={{ display: 'block', overflow: 'visible', ...style }}>
      <g stroke={ink} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
        <circle cx="100" cy="38" r="19" fill={hair} />
        <path d="M56 92C48 124 46 154 52 180C72 190 128 190 148 180C154 154 152 124 144 92Z" fill={hair} />
        <path d="M44 258C44 204 68 176 100 176C132 176 156 204 156 258Z" fill="var(--sky-500)" />
        <path d="M76 180C84 198 116 198 124 180" fill="var(--sky-400)" />
        <path d="M90 194L88 224M110 194L112 224" stroke="var(--pollen-300)" strokeWidth={5} />
        <ellipse cx="100" cy="114" rx="50" ry="54" fill="var(--amber-50)" />
        <path d="M50 108C50 74 76 56 102 56C130 56 152 76 150 104C138 94 122 86 106 82C94 96 72 106 50 108Z" fill={hair} />
      </g>
      <circle cx="84" cy="120" r="5.5" fill={ink} /><circle cx="116" cy="118" r="7" fill={ink} />
      <ellipse cx="71" cy="138" rx="10" ry="6" fill="var(--ember-300)" opacity={0.8} /><ellipse cx="129" cy="136" rx="10" ry="6" fill="var(--ember-300)" opacity={0.8} />
      <path d="M93 146Q100 153 107 146" fill="none" stroke={ink} strokeWidth={4} strokeLinecap="round" />
    </svg>
  )
}

/** The sentences, one per press: the newest at full strength, the ones before it fade back (his brief: "for every tab it
    only Pushes the next sentence that I basically say"). `from` = the press its first sentence shows on. */
export function Lines({ lines, from = 0, size = 'var(--t-head-1)', gap = 26, style }: { lines: string[]; from?: number; size?: string; gap?: number; style?: CSSProperties }) {
  const step = useStep()
  return (
    <div style={{ display: 'grid', gap, alignContent: 'start', ...style }}>
      {lines.map((l, i) => {
        const at = from + i, on = step >= at
        return (
          <motion.div key={l} initial={false} animate={{ opacity: on ? (step === at ? 1 : 0.28) : 0, y: on ? 0 : 18 }} transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.12 }}
            style={{ font: size, letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)' }}>{l}</motion.div>
        )
      })}
    </div>
  )
}

/** An app window: a light title bar with the three dots and a title, and a screen inside. */
export function Win({ title, src, w, h, children, style, credit }: { title: string; src?: string; w: number; h: number; children?: ReactNode; style?: CSSProperties; credit?: string }) {
  return (
    <div style={{ position: 'absolute', width: w, height: h, borderRadius: 14, overflow: 'hidden', background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--line-hair), 0 3px 0 oklch(0.3 0.01 230 / .14)', ...style }}>
      <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px', background: 'var(--silver-100)', borderBottom: '1px solid var(--silver-200)' }}>
        {['var(--ember-400)', 'var(--pollen-300)', 'var(--moss-400)'].map((c) => <i key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />)}
        <span style={{ marginLeft: 8, font: '500 15px var(--font-head)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>
      </div>
      {src && <img src={src} alt="" style={{ width: '100%', height: h - 34, objectFit: 'cover', objectPosition: 'top left', display: 'block' }} />}
      {children}
      {credit && <span style={{ position: 'absolute', right: 8, bottom: 6, padding: '2px 6px', borderRadius: 6, background: 'oklch(1 0 0 / .85)', font: '400 11px var(--font-pixel)', color: 'var(--text-muted)' }}>{credit}</span>}
    </div>
  )
}

/** Text that types in, a character every `ms`, once `play` turns on (never on arrival: if it's already on when the slide
    arrives, it shows whole). */
export function TypeOn({ text, play, ms = 28 }: { text: string; play: boolean; ms?: number }) {
  const [n, setN] = useState(play ? text.length : 0)
  const [was, setWas] = useState(play)
  useEffect(() => {
    if (play === was) return
    setWas(play)
    if (!play) { setN(0); return }
    let c = 0
    const id = window.setInterval(() => { c += 2; setN(Math.min(c, text.length)); if (c >= text.length) clearInterval(id) }, ms)
    return () => clearInterval(id)
  }, [play])
  return <>{text.slice(0, n)}</>
}
