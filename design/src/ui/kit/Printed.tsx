import { useEffect, useRef, useState } from 'react'
import { tokens } from '../../tokens'

/** The print, worn (his words, 2026-10-24: "the print dots… a version that is maybe more messed up… I really like the
    reduced for the texture on it… Maybe a mix between these two"). Geist Pixel Circle is drawn, then re-printed as dots on
    a coarse grid like the 08.3 ladder's "reduced" rung: each dot a little off its spot and a little off its size, a few
    missing. wear 0 is clean, 1 is tired. play prints it a character every 40 ms (s12). */
export function Printed({ text, size = 48, block = 2, wear = 0.45, color = 'var(--ink)', play = false, seed = 1 }: {
  text: string; size?: number; block?: number; wear?: number; color?: string; play?: boolean; seed?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [shown, setShown] = useState(play ? 0 : text.length)
  useEffect(() => {
    if (!play) { setShown(text.length); return }
    setShown(0)
    const id = setInterval(() => setShown((n) => { if (n >= text.length) { clearInterval(id); return n } return n + 1 }), tokens.motion.ms.dot)
    return () => clearInterval(id)
  }, [text, play])

  useEffect(() => {
    let dead = false
    const font = `${size}px 'Geist Pixel Circle'`
    document.fonts.load(font).then(() => {
      const c = ref.current
      if (!c || dead) return
      const dpr = Math.min(2, Math.max(1, Math.round(devicePixelRatio || 1)))
      const probe = document.createElement('canvas').getContext('2d')!
      probe.font = font
      const W = Math.ceil(probe.measureText(text).width + size * 0.3), H = Math.ceil(size * 1.3)
      c.width = W * dpr; c.height = H * dpr; c.style.width = `${W}px`; c.style.height = `${H}px`
      const src = document.createElement('canvas'); src.width = c.width; src.height = c.height
      const s = src.getContext('2d')!; s.scale(dpr, dpr); s.font = font; s.fillStyle = '#000'; s.textBaseline = 'alphabetic'
      s.fillText(text.slice(0, shown), size * 0.1, size * 1.0)
      const img = s.getImageData(0, 0, src.width, src.height).data
      const ctx = c.getContext('2d')!; ctx.clearRect(0, 0, c.width, c.height)
      const probeEl = document.createElement('span'); probeEl.style.color = color; document.body.appendChild(probeEl)
      ctx.fillStyle = getComputedStyle(probeEl).color; probeEl.remove()
      const cell = Math.max(1, block) * dpr * (size / 24)
      const rnd = (x: number, y: number, k: number) => { const v = Math.sin(x * 127.1 + y * 311.7 + k * 74.7 + seed * 19.3) * 43758.5453; return v - Math.floor(v) }
      for (let y = 0; y < c.height; y += cell) for (let x = 0; x < c.width; x += cell) {
        let sum = 0, n = 0
        for (let yy = Math.floor(y); yy < Math.min(c.height, y + cell); yy += 1) for (let xx = Math.floor(x); xx < Math.min(c.width, x + cell); xx += 1) { sum += img[(yy * c.width + xx) * 4 + 3]; n++ }
        const cov = sum / (Math.max(1, n) * 255)
        if (cov < 0.32 - wear * 0.08) continue
        if (rnd(x, y, 1) < wear * 0.09) continue                                   // a missing dot
        const r = cell * 0.5 * (0.72 + 0.38 * rnd(x, y, 2)) * (0.85 + 0.25 * Math.min(1, cov))
        const jx = (rnd(x, y, 3) - 0.5) * cell * 0.45 * wear, jy = (rnd(x, y, 4) - 0.5) * cell * 0.45 * wear
        ctx.globalAlpha = 0.78 + 0.22 * rnd(x, y, 5)
        ctx.beginPath(); ctx.arc(x + cell / 2 + jx, y + cell / 2 + jy, r, 0, Math.PI * 2); ctx.fill()
      }
      ctx.globalAlpha = 1
    })
    return () => { dead = true }
  }, [text, shown, size, block, wear, color, seed])
  return <canvas ref={ref} role="img" aria-label={text} style={{ display: 'block' }} />
}
