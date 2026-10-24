import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { tokens } from '../tokens'
import { VERT, FRAG } from './surface.glsl'
import feltH from './textures/felt-height.jpg'
import feltN from './textures/felt-normal.jpg'
import flockH from './textures/flock-height.jpg'
import flockN from './textures/flock-normal.jpg'
import mossD from './textures/moss-detail.jpg'
import mossM from './textures/moss-mat.jpg'

export type Material = 'felt' | 'flock' | 'moss' | 'metal'
export type Shape = 'rect' | 'cushion' | 'ellipse' | 'ring' | 'blob' | 'mask'
export type Mask = { text: string; weight?: number; family?: string } | { d: string; viewBox: readonly [number, number] }
type LCH = [number, number, number]

/** A role ('surface-felt'), a palette step ('matcha-200') or a fixed colour ('night') as OKLCH numbers. */
export function lchOf(name: string): LCH {
  const sem = (tokens.semantic as Record<string, { ref: string }>)[name]
  const r = sem ? sem.ref : name
  const fixed = (tokens.fixed as Record<string, { lch: readonly number[] }>)[r]
  if (fixed) return [...fixed.lch] as LCH
  const [fam, step] = r.split('-')
  const pal = (tokens.palettes as Record<string, { steps: Record<string, { lch: readonly number[] }> }>)[fam]
  if (!pal) throw new Error(`no colour named ${name}`)
  return [...pal.steps[step].lch] as LCH
}

export type SurfaceProps = {
  material: Material
  width: number; height: number           // the shape, CSS px
  radius?: number
  shape?: Shape                           // rect · cushion (noisy rect) · ellipse · ring · blob · mask (see `mask`)
  mask?: Mask                             // shape = 'mask': text, an SVG path (e.g. PICKLE_BODY), drawn to fill the box
  ring?: number                           // ring thickness, px
  contrast?: number; dome?: number        // metal: contrast; 0 a flat plane → 1 a domed chrome object
  undertone?: string; sparse?: number     // moss: the colour between shoots, and how sparse the low parts get
  color?: string                          // a role or step; each material has a default from tokens.material
  tip?: string; crevice?: string          // moss only
  petal?: string; bloom?: number; bright?: number; dew?: number   // moss: flower colour, how many flowers, brightness, dew
  inset?: boolean                         // a sunken tray (felt) instead of a raised part
  shadow?: number                         // 0..1.5, grain shadow under raised things
  spread?: number                         // px the shadow disperses
  noise?: number; scale?: number; sheen?: number; fringe?: number; hueJitter?: number; satJitter?: number
  cushion?: number                        // moss: cushion size, px
  brushed?: number; specks?: number; bevel?: number   // metal
  light?: number                          // degrees; 225 = upper left
  seed?: number
  pad?: number                            // room around the shape for the shadow and the fringe
  children?: ReactNode
  style?: CSSProperties
}

const MAT = { felt: 0, flock: 0, moss: 1, metal: 2 } as const
const SHAPE = { rect: 0, cushion: 1, ellipse: 2, ring: 3, blob: 4, mask: 5 } as const
const images = new Map<string, Promise<HTMLImageElement>>()
const load = (src: string) => {
  if (!images.has(src)) images.set(src, new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = src }))
  return images.get(src)!
}
const TEX: Record<Material, [string, string, string]> = {
  felt: [feltH, feltN, mossM], flock: [flockH, flockN, mossM], moss: [mossD, feltN, mossM], metal: [feltH, feltN, mossM],
}

// ---- one shared WebGL2 renderer for every Surface on the page --------------------------------------------------------
// Browsers allow only ~16 live WebGL contexts, and a deck or a PDF can hold far more surfaces than that. So one hidden
// canvas draws each surface in turn, and each Surface keeps only a plain 2D copy of its pixels.
type Renderer = { canvas: HTMLCanvasElement; gl: WebGL2RenderingContext; u: (n: string) => WebGLUniformLocation | null; tex: Map<string, WebGLTexture> }
let shared: Renderer | null = null
function renderer(): Renderer | null {
  if (shared && !shared.gl.isContextLost()) return shared
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2', { premultipliedAlpha: false, alpha: true, preserveDrawingBuffer: true })
  if (!gl) { console.error('Surface: WebGL2 is not available'); return null }
  const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('Surface shader:', gl.getShaderInfoLog(s)); return s }
  const prog = gl.createProgram()!; gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) console.error('Surface link:', gl.getProgramInfoLog(prog))
  gl.useProgram(prog)
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'aPos'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const cache = new Map<string, WebGLUniformLocation | null>()
  const u = (n: string) => { if (!cache.has(n)) cache.set(n, gl.getUniformLocation(prog, n)); return cache.get(n)! }
  gl.uniform1i(u('uTexH'), 0); gl.uniform1i(u('uTexN'), 1); gl.uniform1i(u('uTex2'), 2)
  shared = { canvas, gl, u, tex: new Map() }
  return shared
}
function texture(r: Renderer, src: string, img: HTMLImageElement) {
  const { gl } = r
  let t = r.tex.get(src)
  if (!t) {
    t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    r.tex.set(src, t)
  }
  return t
}

/** Draws a mask (text or a path) to fill w × h, softened so the shader can read it as a distance. */
const MASK_BLUR = 5
function maskCanvas(mask: Mask, w: number, h: number) {
  const k = Math.min(2, 1024 / Math.max(w, h)), W = Math.max(8, Math.round(w * k)), H = Math.max(8, Math.round(h * k))
  const a = document.createElement('canvas'); a.width = W; a.height = H
  const ctx = a.getContext('2d')!
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff'
  if ('text' in mask) {
    ctx.font = `${mask.weight ?? 800} ${H * 0.82}px ${mask.family ?? 'Pretendard'}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    const m = ctx.measureText(mask.text), sx = Math.min(1, (W * 0.96) / m.width)
    ctx.save(); ctx.translate(W / 2, H * 0.53); ctx.scale(sx, sx); ctx.fillText(mask.text, 0, 0); ctx.restore()
  } else {
    const [vw, vh] = mask.viewBox, sc = Math.min(W / vw, H / vh)
    ctx.save(); ctx.translate((W - vw * sc) / 2, (H - vh * sc) / 2); ctx.scale(sc, sc); ctx.fill(new Path2D(mask.d)); ctx.restore()
  }
  const b = document.createElement('canvas'); b.width = W; b.height = H
  const bx = b.getContext('2d')!; bx.filter = `blur(${MASK_BLUR * k}px)`; bx.drawImage(a, 0, 0)
  return { canvas: b, pxPerUnit: 1 / k }
}

/** One surface of the brand in one of its three materials (metal, felt or flock, moss). It renders once per change (no
    loop) through the shared renderer, so a page, a deck or a PDF can hold as many as it likes. */
export function Surface(props: SurfaceProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const felty = props.material === 'felt' || props.material === 'flock'
  const pad = props.pad ?? (props.inset ? (felty ? 12 : 0) : 40)       // felt always has room for fibres over its edge
  const W = props.width + pad * 2, H = props.height + pad * 2
  const key = JSON.stringify({ ...props, children: undefined, style: undefined })

  useEffect(() => {
    let alive = true
    const fontReady = props.shape === 'mask' && props.mask && 'text' in props.mask
      ? document.fonts.load(`${props.mask.weight ?? 800} 100px ${props.mask.family ?? 'Pretendard'}`).catch(() => [])
      : Promise.resolve([])
    Promise.all([...TEX[props.material].map(load), fontReady]).then((all) => {
      const imgs = all.slice(0, 3) as HTMLImageElement[]
      const r = renderer()
      if (!alive || !r || !ref.current) return
      const { gl, u } = r
      const srcs = TEX[props.material]
      imgs.forEach((img, i) => { gl.activeTexture(gl.TEXTURE0 + i); gl.bindTexture(gl.TEXTURE_2D, texture(r, srcs[i], img)) })
      const p = props, m = tokens.material as unknown as Record<string, Record<string, number | string>>
      const def = m[p.material === 'flock' ? 'flock' : p.material === 'felt' ? 'felt' : p.material] ?? {}
      const num = (v: number | undefined, k: string, f: number) => v ?? (typeof def[k] === 'number' ? (def[k] as number) : f)
      const dpr = Math.min(devicePixelRatio, 2)
      const cw = Math.round(W * dpr), ch = Math.round(H * dpr)
      if (r.canvas.width !== cw || r.canvas.height !== ch) { r.canvas.width = cw; r.canvas.height = ch }
      gl.viewport(0, 0, cw, ch)
      gl.uniform2f(u('uRes'), cw, ch); gl.uniform1f(u('uDpr'), dpr)
      gl.uniform1i(u('uMat'), MAT[p.material]); gl.uniform1i(u('uShape'), SHAPE[p.shape ?? 'rect'])
      gl.uniform1i(u('uMask'), 3); gl.uniform1f(u('uRing'), p.ring ?? Math.min(p.width, p.height) * 0.16)
      if (p.shape === 'mask' && p.mask) {
        const mk = maskCanvas(p.mask, p.width, p.height)
        gl.activeTexture(gl.TEXTURE3)
        if (!r.tex.has('__mask')) r.tex.set('__mask', gl.createTexture()!)
        gl.bindTexture(gl.TEXTURE_2D, r.tex.get('__mask')!)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mk.canvas)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.uniform1f(u('uMaskPx'), MASK_BLUR * 4.2 * mk.pxPerUnit)
      }
      gl.uniform2f(u('uCenter'), W / 2, H / 2); gl.uniform2f(u('uSize'), p.width, p.height)
      gl.uniform1f(u('uRadius'), Math.min(p.radius ?? 16, Math.min(p.width, p.height) / 2)); gl.uniform1f(u('uSeed'), p.seed ?? 3.7)
      const metal = tokens.material.metal, moss = tokens.material.moss
      const A = p.material === 'metal' ? lchOf(p.color ?? metal.stops[0]) : p.material === 'moss' ? lchOf(p.color ?? moss.body)
        : lchOf(p.color ?? 'surface-felt')
      const B = p.material === 'metal' ? lchOf(metal.stops[metal.stops.length - 1]) : p.material === 'moss' ? lchOf(p.tip ?? moss.tip) : A
      const C = p.material === 'metal' ? lchOf(metal.env) : p.material === 'moss' ? lchOf(p.crevice ?? moss.crevice) : A
      gl.uniform3f(u('uA'), ...A); gl.uniform3f(u('uB'), ...B); gl.uniform3f(u('uC'), ...C)
      gl.uniform3f(u('uP'), ...lchOf(p.petal ?? moss.petal)); gl.uniform3f(u('uW'), ...lchOf(moss.petalLight)); gl.uniform3f(u('uY'), ...lchOf(moss.pollen)); gl.uniform3f(u('uBl'), ...lchOf(moss.petalBlue))
      gl.uniform1f(u('uBloom'), num(p.bloom, 'bloom', 0)); gl.uniform1f(u('uBright'), num(p.bright, 'bright', 1)); gl.uniform1f(u('uDew'), num(p.dew, 'dew', 0))
      gl.uniform1f(u('uLight'), num(p.light, 'light', 225)); gl.uniform1f(u('uNoise'), num(p.noise, 'noise', p.material === 'moss' ? moss.detail : 0.9))
      gl.uniform1f(u('uScale'), num(p.scale, 'scale', p.material === 'moss' ? 2.4 : 3)); gl.uniform1f(u('uSheen'), num(p.sheen, 'sheen', 0.6))
      gl.uniform1f(u('uFringe'), num(p.fringe, 'fringe', 1)); gl.uniform1f(u('uHueJ'), num(p.hueJitter, 'hueJitter', 3))
      gl.uniform1f(u('uSatJ'), num(p.satJitter, 'satJitter', 0.25)); gl.uniform1f(u('uInset'), p.inset ? 1 : 0)
      gl.uniform1f(u('uShadow'), p.shadow ?? (p.inset ? 0 : 1)); gl.uniform1f(u('uSpread'), p.spread ?? 14)
      gl.uniform1f(u('uCushion'), num(p.cushion, 'cushion', 26)); gl.uniform1f(u('uBrushed'), num(p.brushed, 'brushed', 0.35))
      gl.uniform1f(u('uSpecks'), num(p.specks, 'specks', 0.18)); gl.uniform1f(u('uBevel'), num(p.bevel, 'bevel', 1))
      gl.uniform1f(u('uContrast'), num(p.contrast, 'contrast', 1)); gl.uniform1f(u('uDome'), num(p.dome, 'dome', 0))
      gl.uniform3f(u('uU'), ...lchOf(p.undertone ?? (moss as unknown as { undertone: string }).undertone)); gl.uniform1f(u('uSparse'), num(p.sparse, 'sparse', 0))
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      const out = ref.current
      out.width = cw; out.height = ch
      const ctx = out.getContext('2d')!
      ctx.clearRect(0, 0, cw, ch); ctx.drawImage(r.canvas, 0, 0)
    }).catch((e) => console.error('Surface: a texture failed to load', e))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return (
    <div style={{ position: 'relative', width: props.width, height: props.height, ...props.style }}>
      <canvas ref={ref} style={{ position: 'absolute', left: -pad, top: -pad, width: W, height: H, pointerEvents: 'none' }} />
      {props.children != null && <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: props.radius ?? 16, overflow: 'hidden' }}>{props.children}</div>}
    </div>
  )
}
