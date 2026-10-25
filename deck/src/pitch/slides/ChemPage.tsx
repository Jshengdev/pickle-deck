import { HOMEWORK } from './story'

/** Mia's chemistry homework as a PDF window on her screen: the aspirin molecule, her 2 questions, and her answers in
    her own typing (Fairfax HD, the second voice). Answer 2 stops mid-sentence with the text cursor still blinking
    there: that's where she's stuck. Words live in ./story.ts (HOMEWORK). */
export function ChemPage({ w, h }: { w: number; h: number }) {
  return (
    <div style={{ width: w, height: h, borderRadius: 14, overflow: 'hidden', background: 'var(--silver-300)', boxShadow: '0 24px 50px -24px oklch(0.2 0.02 230 / .45), 0 0 0 1px var(--line-hair)' }}>
      <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: 'var(--silver-100)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <i key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
        <span style={{ font: '400 calc(14px * var(--type-scale)) var(--font-head)', color: 'var(--text-muted)', marginLeft: 12 }}>{HOMEWORK.file}</span>
      </div>
      <div style={{ margin: '18px 28px 0', height: h - 34 - 18, background: 'var(--surface-plane)', padding: '22px 30px', boxSizing: 'border-box', boxShadow: '0 2px 8px oklch(0.2 0.02 230 / .15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ font: '600 calc(20px * var(--type-scale))/1.2 var(--font-head)' }}>{HOMEWORK.course}</div>
          <div style={{ font: '400 calc(15px * var(--type-scale)) var(--font-head)', color: 'var(--text-muted)' }}>{HOMEWORK.due}</div>
        </div>
        <Aspirin width={250} style={{ margin: '4px 0 0' }} />
        <ol style={{ margin: 0, paddingLeft: 24, display: 'grid', gap: 14 }}>
          {HOMEWORK.questions.map(({ q, a }, i) => (
            <li key={q} style={{ font: '500 calc(18px * var(--type-scale))/1.35 var(--font-head)' }}>
              {q}
              <div style={{ marginTop: 4, font: '400 calc(16px * var(--type-scale))/1.45 var(--font-second)', color: 'var(--text-secondary)' }}>
                {a}{i === HOMEWORK.questions.length - 1 && <span className="caret" style={{ display: 'inline-block', width: 2, height: '1.1em', marginLeft: 3, verticalAlign: '-0.15em', background: 'var(--ink)', animation: 'chem-caret 1s steps(1) infinite' }} />}
              </div>
            </li>
          ))}
        </ol>
        <style>{'@keyframes chem-caret { 50% { opacity: 0 } }'}</style>
      </div>
    </div>
  )
}

type P = readonly [number, number]
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]

/** One bond from a to b. `trim` pulls an end back (px) so it doesn't run into an atom's letter; `double` adds a second
    line beside it; `inner` draws that second line toward a ring's centre, shorter, as in a benzene ring. */
function Bond({ a, b, trimA = 0, trimB = 0, double = false, inner }: { a: P; b: P; trimA?: number; trimB?: number; double?: boolean; inner?: P }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const A = lerp(a, b, trimA / len), B = lerp(a, b, 1 - trimB / len)
  const line = (p: P, q: P, k: string) => <line key={k} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} />
  if (!double) return line(A, B, 'a')
  if (inner) {
    const A2 = lerp(lerp(a, inner, 0.2), lerp(b, inner, 0.2), 0.15), B2 = lerp(lerp(a, inner, 0.2), lerp(b, inner, 0.2), 0.85)
    return <>{line(A, B, 'a')}{line(A2, B2, 'b')}</>
  }
  const nx = -(B[1] - A[1]) / len * 2.6, ny = (B[0] - A[0]) / len * 2.6
  return <>{line([A[0] + nx, A[1] + ny], [B[0] + nx, B[1] + ny], 'a')}{line([A[0] - nx, A[1] - ny], [B[0] - nx, B[1] - ny], 'b')}</>
}

/** Aspirin (acetylsalicylic acid), drawn as a skeletal structure: a benzene ring with the carboxylic acid (–COOH,
    upper right) and the acetyl ester (–OCOCH₃, lower right) on neighbouring carbons. */
export function Aspirin({ width = 220, style }: { width?: number; style?: React.CSSProperties }) {
  const c: P = [60, 80]
  const v: P[] = [-90, -30, 30, 90, 150, 210].map((d) => [c[0] + 30 * Math.cos(d * Math.PI / 180), c[1] + 30 * Math.sin(d * Math.PI / 180)] as P)
  const C1: P = [112, 50], O1: P = [112, 20], OH: P = [140, 65]                       // –COOH
  const O2: P = [112, 110], C2: P = [140, 95], O3: P = [140, 127], Me: P = [166, 80]  // –O–C(=O)–CH₃
  const label = (p: P, t: string) => <text x={p[0]} y={p[1]} textAnchor="middle" dominantBaseline="central">{t}</text>
  return (
    <svg viewBox="20 8 160 132" width={width} height={width * 132 / 160} style={{ display: 'block', ...style }}>
      <g stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" fill="none">
        {v.map((p, i) => <Bond key={i} a={p} b={v[(i + 1) % 6]} double={i % 2 === 0} inner={c} />)}
        <Bond a={v[1]} b={C1} />
        <Bond a={C1} b={O1} trimB={7} double />
        <Bond a={C1} b={OH} trimB={10} />
        <Bond a={v[2]} b={O2} trimB={7} />
        <Bond a={O2} b={C2} trimA={7} />
        <Bond a={C2} b={O3} trimB={7} double />
        <Bond a={C2} b={Me} />
      </g>
      <g fill="var(--ink)" style={{ font: '500 14px var(--font-head)' }}>
        {label(O1, 'O')}{label([OH[0] + 4, OH[1]], 'OH')}{label(O2, 'O')}{label(O3, 'O')}
      </g>
    </svg>
  )
}
