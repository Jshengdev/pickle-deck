import type { CSSProperties, JSX } from 'react'

/** Pixel art from a grid of characters: each character is one pixel, coloured by a role (CSS variable). Drawn fresh for
    pickje from his s08 screenshot: the pixel Pickle, the pixel Blicky, and the status icons. */
export type Palette = Record<string, string>

export function Pixel({ grid, palette, px = 5, style }: { grid: string[]; palette: Palette; px?: number; style?: CSSProperties }) {
  const w = Math.max(...grid.map((r) => r.length)), h = grid.length
  const rects: JSX.Element[] = []
  grid.forEach((row, y) => [...row].forEach((ch, x) => {
    const fill = palette[ch]
    if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} style={{ fill }} />)
  }))
  return (
    <svg width={w * px} height={h * px} viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" style={{ display: 'block', ...style }} aria-hidden>
      {rects}
    </svg>
  )
}

// k ink · l Pickle lime · s Brine stripe · e eye (ink)
export const PICKLE = [
  '....kkkkkk....',
  '...klsllslk...',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '..kllslleelk..',
  '..kllseleelk..',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '.kkllsllsllkk.',
  'k.kllsllsllk.k',
  'k.kllsllsllk.k',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '..kllsllsllk..',
  '...klsllslk...',
  '....kkkkkk....',
  '.....k..k.....',
  '....kk..kk....',
]

// b body · e eye · c cheek
export const BLICKY = [
  '......bbbb......',
  '....bbbbbbbb....',
  '...bbbbbbbbbb...',
  '..bbbbbbeebbbb..',
  '.bbbbbebeebbbbb.',
  'bbbbbbbbbbbbbbbb',
  'bbbbcbbbbbbcbbbb',
  'b.bbbbbbbbbbbb.b',
  '..bbbbbbbbbbbb..',
  '...bbbbbbbbbb...',
  '....bbbbbbbb....',
  '.....b....b.....',
  '....bb....bb....',
]

export const ICONS: Record<'listening' | 'working' | 'checked' | 'kept' | 'lock', string[]> = {
  listening: ['..kkkkk..', '.k.....k.', 'k..kkk..k', 'k.k...k.k', 'k.k.k.k.k', 'k.k...k.k', 'k..kkk..k', '.k.....k.', '..kkkkk..'],
  working: ['kkkkkkkkk', '.k.....k.', '..k...k..', '...kkk...', '....k....', '...k.k...', '..k.k.k..', '.k.kkk.k.', 'kkkkkkkkk'],
  checked: ['.........', '........k', '.......kk', 'k.....kk.', 'kk...kk..', '.kk.kk...', '..kkk....', '...k.....', '.........'],
  kept: ['.kkkkkk..', '.k....kk.', '.k.kk..k.', '.k.....k.', '.k.kkk.k.', '.k.....k.', '.k.kkk.k.', '.k.....k.', '.kkkkkkk.'],
  lock: ['..kkkkk..', '.k.....k.', '.k.....k.', 'kkkkkkkkk', 'kkkk.kkkk', 'kkk...kkk', 'kkkk.kkkk', 'kkkk.kkkk', 'kkkkkkkkk'],
}
