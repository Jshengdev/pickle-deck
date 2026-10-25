import { motion } from 'motion/react'
import { useDialKit } from 'dialkit'
import { M, TOP } from '../../brand/frame'
import { useStep } from '../kit/step'
import before from '../assets/annotations/before.png'
import after from '../assets/annotations/after.png'

/** 17 · Before and after. His words (2026-10-25, 4:38 AM, voice): "Show the before and after of annotations." 3 steps:
    0  the page alone (before.png)
    1  the same page with Blicky's marks, wiped in left to right (after.png)
    2  callouts naming 4 kinds of mark, each pointed at one on the image (checked by looking at after.png): a ring (on the
       intermediate's O−), a curved arrow (OH → the carbonyl carbon), the worked panel (IHD = 5), a label ("Nucleophile").
    Source of both images: the app's marks gallery, pickje `app/shell/tools/gallery.mjs` (its header: "every mark Blicky can
    draw … drawn by the real app over a made-up screen …, snapshotted from the app's own windows (never the screen) and laid
    over the same made-up screen at the same place"). Both 2880 × 1640. The kinds of mark match docs/PRODUCT.md:20-21
    ("rings, curved arrows, labels, a worked panel, a molecule drawn live from SMILES"). Title and sentences are DRAFT. */

const LINES = [
  'A page, before Blicky.',
  'The same page after Blicky: every mark drawn by the real app.',
  'It rings, points, works the number and names the part, right on the page.',
]
export const ANNOTATIONS_STEPS = LINES.length

// The image is shown W wide, cropped top and bottom to the drawn part (the bottom of the PNG is empty).
// Mark positions below are in the PNG's own pixels (2880 × 1640), read off after.png.
const IMG_W = 2880, IMG_H = 1640
const CROP_TOP = 25, CROP_BOTTOM = 1385 // PNG px

type Callout = { label: string; mark: [number, number]; chip: [number, number]; side: 'right' | 'below' | 'left' }
const CALLOUTS: Callout[] = [
  { label: 'Ring', mark: [2492, 802], chip: [2590, 660], side: 'right' },             // the ring on the intermediate's O−
  { label: 'Curved arrow', mark: [842, 668], chip: [905, 450], side: 'right' },       // OH's lone pair → the carbonyl carbon
  { label: 'Worked panel', mark: [223, 513], chip: [223, 600], side: 'below' },       // IHD = (2C + 2 − H) / 2 = 5
  { label: 'Label', mark: [585, 1116], chip: [585, 1215], side: 'below' },            // "Nucleophile", from under it
]

/** One sentence per press, stacked in place. */
function Said({ lines }: { lines: string[] }) {
  const step = useStep()
  return (
    <div style={{ display: 'grid' }}>
      {lines.map((l, i) => (
        <motion.p key={l} initial={false} animate={{ opacity: step === i ? 1 : 0, y: step === i ? 0 : step > i ? -10 : 10 }}
          transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.1 }}
          style={{ gridArea: '1 / 1', margin: 0, font: 'var(--t-second-2)', color: 'var(--text-secondary)' }}>{l}</motion.p>
      ))}
    </div>
  )
}

export function Annotations() {
  const step = useStep()
  const d = useDialKit('Before and after', { width: [1400, 1100, 1600, 10], wipe: [1.1, 0.3, 2.5, 0.05] })
  const W = d.width, k = W / IMG_W
  const H = (CROP_BOTTOM - CROP_TOP) * k
  const at = ([x, y]: [number, number]) => [x * k, (y - CROP_TOP) * k] as const
  const img = (src: string) => (
    <img src={src} alt="" draggable={false} style={{ position: 'absolute', left: 0, top: -CROP_TOP * k, width: W, height: IMG_H * k, display: 'block' }} />
  )
  const shown = step >= 1, named = step >= 2
  const ease = [0.65, 0, 0.35, 1] as const

  return (
    <div style={{ position: 'absolute', left: M, right: M, top: TOP, bottom: 96, display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>Before and after Blicky</h1>
      <div style={{ marginTop: 18 }}><Said lines={LINES} /></div>

      <div style={{ marginTop: 30, display: 'flex', alignItems: 'flex-end', gap: 40 }}>
        <div style={{ position: 'relative', width: W, height: H, borderRadius: 18, overflow: 'hidden', background: 'var(--pure-white, #fff)', boxShadow: 'inset 0 0 0 1px var(--line-hair)', flex: 'none' }}>
          {img(before)}
          {/* after: wiped in from the left */}
          <motion.div initial={false} animate={{ clipPath: shown ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' }}
            transition={{ duration: d.wipe, ease }} style={{ position: 'absolute', inset: 0 }}>
            {img(after)}
          </motion.div>
          {/* the wipe's edge: a hair that crosses once, then goes */}
          <motion.div initial={false} animate={{ left: shown ? W : 0, opacity: shown ? [1, 1, 0] : [1, 1, 0] }}
            transition={{ duration: d.wipe, ease, opacity: { duration: d.wipe, times: [0, 0.85, 1] } }}
            style={{ position: 'absolute', top: 0, bottom: 0, width: 3, marginLeft: -1.5, background: 'var(--ink)', opacity: 0 }} />

          {/* 2 · the kinds of mark, named */}
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {CALLOUTS.map((c, i) => {
              const [mx, my] = at(c.mark), [cx, cy] = at(c.chip)
              return (
                <g key={c.label}>
                  <motion.path d={`M${cx} ${cy}L${mx} ${my}`} fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinecap="round"
                    initial={false} animate={{ pathLength: named ? 1 : 0, opacity: named ? 1 : 0 }}
                    transition={{ duration: 0.45, ease, delay: named ? 0.15 * i : 0 }} />
                  <motion.circle cx={mx} cy={my} r={6} fill="var(--ink)" initial={false} animate={{ scale: named ? 1 : 0 }}
                    transition={{ type: 'spring', visualDuration: 0.35, bounce: 0.3, delay: named ? 0.15 * i + 0.35 : 0 }}
                    style={{ transformOrigin: `${mx}px ${my}px` }} />
                </g>
              )
            })}
          </svg>
          {CALLOUTS.map((c, i) => {
            const [cx, cy] = at(c.chip)
            const place = c.side === 'right' ? 'translate(0, -50%)' : c.side === 'left' ? 'translate(-100%, -50%)' : 'translate(-50%, 0)'
            return (
              <div key={c.label} style={{ position: 'absolute', left: cx, top: cy, transform: place }}>
                <motion.div initial={false} animate={{ opacity: named ? 1 : 0, scale: named ? 1 : 0.9 }}
                  transition={{ type: 'spring', visualDuration: 0.4, bounce: 0.15, delay: named ? 0.15 * i + 0.1 : 0 }}
                  style={{ padding: '7px 16px', borderRadius: 8, background: 'var(--ink)', color: 'var(--text-on-dark)', font: '600 26px/1.2 var(--font-head)', whiteSpace: 'nowrap' }}>
                  {c.label}
                </motion.div>
              </div>
            )
          })}
        </div>
        <p style={{ margin: 0, font: 'var(--t-head-4)', color: 'var(--text-muted)' }}>
          From the app’s marks gallery: the real app’s marks, laid over a made-up page at the same place.
        </p>
      </div>
    </div>
  )
}
