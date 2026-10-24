import { Pixel, PICKLE } from './pixel'

const SPARK = ['..y..', '..y..', 'yy.yy', '..y..', '..y..']
const PAL = { k: 'var(--ink)', l: 'var(--pickle)', s: 'var(--pickle-stripe)', e: 'var(--ink)', y: 'var(--attention)' }

/** The mark (s05): the pixel Pickle with its spark. Clearspace is two Pickle pixels on every side; never smaller than
    16 px tall (px = 1). On dark grounds the outline stays ink and the body carries it. */
export function Mark({ px = 4 }: { px?: number }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', padding: `0 ${px * 4}px 0 0` }}>
      <Pixel grid={PICKLE} palette={PAL} px={px} />
      <Pixel grid={SPARK} palette={PAL} px={px} style={{ position: 'absolute', right: 0, top: -px }} />
    </div>
  )
}

/** The lockup (s06): the mark and "blicky & pickle" in Geist Pixel, baseline-aligned to the Pickle's feet. */
export function Lockup({ px = 3, tone = 'ink' }: { px?: number; tone?: 'ink' | 'on-dark' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'flex-end', gap: px * 4 }}>
      <Mark px={px} />
      <span style={{ font: `${px * 8}px/1 var(--font-pixel)`, color: tone === 'ink' ? 'var(--ink)' : 'var(--text-on-dark)', paddingBottom: px }}>blicky &amp; pickle</span>
    </div>
  )
}
