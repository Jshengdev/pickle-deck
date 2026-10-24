import { useEffect, useState } from 'react'
import { DialRoot, useDialKit } from 'dialkit'
import { Surface, type Material, type Shape, type Mask } from '@design/material/Surface'
import { PICKLE_BODY } from '@design/cast/PickleArt'
import { BLICKY_BODY } from '@design/cast/BlickyArt'

/** The materials lab (his words, 2026-10-24: "a materials lab where we can think and innovate and combine and optimize
    for what the current materials, and also just see it in forms to find what's ideal"). Pick a material, a form, a colour
    and a light; stack a second material on the first; see it across every form at once; keep what works as a preset. */
const FORMS = ['rect', 'cushion', 'ellipse', 'ring', 'blob', 'word', 'pickle', 'blicky'] as const
type Form = typeof FORMS[number]
const COLOURS = ['surface-felt', 'surface-felt-sky', 'surface-felt-sage', 'surface-felt-neutral', 'surface-felt-deep', 'silver-50', 'moss-500', 'pickle', 'blicky', 'catch']
const GROUNDS = { silver: 'var(--surface-ground)', forest: 'var(--forest-800)', sky: 'var(--sky-500)', night: 'var(--surface-night)' } as const

function formOf(f: Form): { shape: Shape; mask?: Mask } {
  if (f === 'word') return { shape: 'mask', mask: { text: 'pickje', weight: 900 } }
  if (f === 'pickle') return { shape: 'mask', mask: PICKLE_BODY }
  if (f === 'blicky') return { shape: 'mask', mask: BLICKY_BODY }
  return { shape: f }
}
const aspect = (f: Form) => (f === 'word' ? [1, 0.42] : f === 'pickle' ? [0.6, 1] : f === 'blicky' ? [1, 0.9] : f === 'rect' ? [1, 0.62] : f === 'cushion' ? [1, 0.55] : [1, 1])

type Preset = { name: string; a: Record<string, unknown>; b: Record<string, unknown>; stack: boolean; ground: keyof typeof GROUNDS }
const KEY = 'pickje.materials-lab.presets'

export function MaterialsLab() {
  const a = useDialKit('Layer 1', {
    material: { type: 'select', options: ['metal', 'felt', 'flock', 'moss'], default: 'metal' },
    form: { type: 'select', options: [...FORMS], default: 'ellipse' },
    color: { type: 'select', options: COLOURS, default: 'silver-50' },
    size: [420, 120, 760, 2], radius: [40, 0, 200, 1], light: [225, 0, 360, 1],
    contrast: [1.35, 0.6, 2.4, 0.01], dome: [0.9, 0, 1.5, 0.01], brushed: [0.35, 0, 2, 0.01], sheen: [0.7, 0, 2, 0.01],
    fringe: [1.2, 0, 5, 0.05], noise: [0.9, 0, 2, 0.01], bloom: [0.3, 0, 0.8, 0.01], sparse: [0.35, 0, 1, 0.01], cushion: [30, 6, 90, 1],
    shadow: [0.9, 0, 1.5, 0.01], seed: [4, 0, 30, 0.1],
  })
  const b = useDialKit('Layer 2 (stacked)', {
    on: false,
    material: { type: 'select', options: ['moss', 'metal', 'felt', 'flock'], default: 'moss' },
    form: { type: 'select', options: [...FORMS], default: 'cushion' },
    color: { type: 'select', options: COLOURS, default: 'moss-500' },
    size: [0.55, 0.1, 1.2, 0.01], x: [0.45, -0.2, 1.2, 0.01], y: [0.62, -0.2, 1.2, 0.01], bloom: [0.32, 0, 0.8, 0.01], dome: [0.9, 0, 1.5, 0.01],
  })
  const g = useDialKit('Ground', { ground: { type: 'select', options: Object.keys(GROUNDS), default: 'silver' }, forms: true })
  const [presets, setPresets] = useState<Preset[]>(() => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } })
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(presets)) }, [presets])

  const render = (L: typeof a, form: Form, w: number, extra?: Partial<Record<string, unknown>>) => {
    const [ax, ay] = aspect(form), f = formOf(form)
    const shared = { material: L.material as Material, ...f, width: w * ax, height: w * ay, color: L.color as string, radius: L.radius, light: L.light, seed: L.seed, shadow: L.shadow }
    const mat = L.material === 'metal' ? { contrast: L.contrast, dome: L.dome, brushed: L.brushed, sheen: L.sheen }
      : L.material === 'moss' ? { bloom: L.bloom, sparse: L.sparse, cushion: L.cushion, color: L.color === 'silver-50' ? undefined : L.color }
      : { fringe: L.fringe, noise: L.noise, sheen: L.sheen }
    return <Surface {...shared} {...mat} {...extra} />
  }
  const hero = (
    <div style={{ position: 'relative' }}>
      {render(a, a.form as Form, a.size)}
      {b.on && (() => {
        const [ax, ay] = aspect(a.form as Form), W = a.size * ax, H = a.size * ay, bw = a.size * b.size
        return <div style={{ position: 'absolute', left: W * b.x - bw / 2, top: H * b.y - (bw * aspect(b.form as Form)[1]) / 2 }}>
          {render({ ...a, material: b.material, color: b.color, bloom: b.bloom, dome: b.dome } as typeof a, b.form as Form, bw)}
        </div>
      })()}
    </div>
  )
  const save = () => setPresets((p) => [...p, { name: `${a.material} ${a.form}${b.on ? ` + ${b.material}` : ''}`, a: { ...a }, b: { ...b }, stack: b.on, ground: g.ground as keyof typeof GROUNDS }])

  return (
    <div style={{ minHeight: '100vh', background: GROUNDS[g.ground as keyof typeof GROUNDS], color: g.ground === 'silver' ? 'var(--ink)' : 'var(--text-on-dark)', padding: '40px 56px 120px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <h1 style={{ margin: 0, font: '700 44px/1 var(--font-head)', letterSpacing: '-0.04em' }}>Materials lab</h1>
        <span style={{ font: '400 18px var(--font-head)', opacity: 0.75 }}>Tune with the dials at the bottom right. Stack a second layer. Keep what works.</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <button onClick={save} style={btn}>Keep as preset</button>
          <button onClick={() => navigator.clipboard?.writeText(JSON.stringify({ a, b, ground: g.ground }))} style={{ ...btn, background: 'transparent', color: 'inherit', textDecoration: 'underline' }}>Copy values</button>
          <a href="./" style={{ ...btn, background: 'transparent', color: 'inherit', textDecoration: 'underline' }}>Back to the book</a>
        </span>
      </div>
      <div style={{ height: 620, display: 'grid', placeItems: 'center' }}>{hero}</div>
      {g.forms && (
        <div style={{ display: 'flex', gap: 34, alignItems: 'center', flexWrap: 'wrap' }}>
          {FORMS.map((f) => <div key={f} style={{ display: 'grid', justifyItems: 'center', gap: 10 }}>{render(a, f, 150)}<span style={{ font: '400 15px var(--font-head)', opacity: 0.75 }}>{f}</span></div>)}
        </div>
      )}
      {presets.length > 0 && (
        <div style={{ marginTop: 56 }}>
          <div style={{ font: '600 20px var(--font-head)', marginBottom: 16 }}>Kept</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {presets.map((p, i) => (
              <div key={i} style={{ display: 'grid', gap: 8, justifyItems: 'start' }}>
                <div style={{ padding: 18, borderRadius: 18, background: GROUNDS[p.ground] }}>{render(p.a as typeof a, p.a.form as Form, 130)}</div>
                <span style={{ font: '400 15px var(--font-head)' }}>{p.name}</span>
                <span style={{ display: 'flex', gap: 10 }}>
                  <button style={mini} onClick={() => navigator.clipboard?.writeText(JSON.stringify(p))}>copy</button>
                  <button style={mini} onClick={() => setPresets((q) => q.filter((_, j) => j !== i))}>remove</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <DialRoot position="bottom-right" defaultOpen productionEnabled />
    </div>
  )
}
const btn = { height: 40, padding: '0 16px', borderRadius: 12, border: 0, background: 'var(--ink)', color: 'var(--text-on-dark)', font: '600 15px var(--font-head)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' } as const
const mini = { border: 0, background: 'transparent', color: 'inherit', font: '400 14px var(--font-head)', textDecoration: 'underline', cursor: 'pointer', padding: 0 } as const
