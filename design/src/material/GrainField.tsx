import { useEffect, useRef } from 'react'
import { VERT, FRAG } from './shader'

export type GrainProps = {
  width: number; height: number
  mode?: 'form' | 'moss'           // form: one colour dispersed; moss: clumped cushions
  shape?: 'rect' | 'ring' | 'blob'
  center?: [number, number]; size?: [number, number]; radius?: number
  spread?: number                   // px: how far particles disperse past the edge (the softness)
  density?: number                  // 0..1
  grain?: number                    // particle size, px
  lch?: [number, number, number]    // OKLCH base colour
  hueShift?: number                 // degrees the hue drifts across the light
  satJitter?: number                // 0..1 per-particle saturation spread
  light?: number                    // degrees; 225 = upper left
  fill?: number                     // 1 solid inside, 0 hollow (glow from the edge)
  clump?: number; dew?: number      // moss only
  seed?: number; alpha?: number; fps?: number; still?: boolean
  style?: React.CSSProperties
}

const SHAPES = { rect: 0, ring: 1, blob: 2 } as const

/** One canvas of the brand's grain. Cheap by design: it renders at most `fps` times a second (12 by default), only while
    on screen, and not at all when `still`. */
export function GrainField(props: GrainProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const latest = useRef(props); latest.current = props
  useEffect(() => {
    const canvas = ref.current!; const gl = canvas.getContext('webgl2', { premultipliedAlpha: true, alpha: true })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s }
    const prog = gl.createProgram()!; gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    let raf = 0, last = -1, visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(canvas)
    const t0 = performance.now()
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw)
      const p = latest.current, fps = p.fps ?? 12
      if (!visible || (p.still && last >= 0) || now - last < 1000 / fps) return
      last = now
      const dpr = Math.min(devicePixelRatio, 2), W = p.width, H = p.height
      if (canvas.width !== W * dpr) { canvas.width = W * dpr; canvas.height = H * dpr }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(u('uRes'), W * dpr, H * dpr); gl.uniform1f(u('uTime'), p.still ? 0 : (now - t0) / 1000)
      gl.uniform1i(u('uMode'), p.mode === 'moss' ? 2 : 0); gl.uniform1i(u('uShape'), SHAPES[p.shape ?? 'rect'])
      const c = p.center ?? [W / 2, H / 2], s = p.size ?? [W * 0.6, H * 0.6]
      gl.uniform2f(u('uCenter'), c[0] * dpr, c[1] * dpr); gl.uniform2f(u('uSize'), s[0] * dpr, s[1] * dpr)
      gl.uniform1f(u('uRadius'), (p.radius ?? 24) * dpr); gl.uniform1f(u('uSpread'), (p.spread ?? 18) * dpr)
      gl.uniform1f(u('uDensity'), p.density ?? 0.85); gl.uniform1f(u('uGrain'), Math.max(1, (p.grain ?? 1.5) * dpr))
      const l = p.lch ?? [0.62, 0.2, 262]; gl.uniform3f(u('uLCH'), l[0], l[1], l[2])
      gl.uniform1f(u('uHueShift'), p.hueShift ?? 8); gl.uniform1f(u('uSatJitter'), p.satJitter ?? 0.5); gl.uniform1f(u('uLight'), p.light ?? 225)
      gl.uniform1f(u('uSeed'), p.seed ?? 3.7); gl.uniform1f(u('uFill'), p.fill ?? 1); gl.uniform1f(u('uClump'), (p.clump ?? 18) * dpr)
      gl.uniform1f(u('uDew'), p.dew ?? 1); gl.uniform1f(u('uAlpha'), p.alpha ?? 1)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); io.disconnect(); gl.getExtension('WEBGL_lose_context')?.loseContext() }
  }, [])
  return <canvas ref={ref} style={{ width: props.width, height: props.height, display: 'block', ...props.style }} />
}
