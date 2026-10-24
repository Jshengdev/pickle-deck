import type { ReactNode } from 'react'
import { Cursor } from './Cursor'

type Props = {
  backdrop?: string                // a capture of his real desktop (public/screen/*.png); a neutral desktop until then
  cursor?: { x: number; y: number } // where the cursor sits, in px on a 1512 × 982 screen
  pickle?: ReactNode               // what rides at the cursor (Pickle)
  ui?: ReactNode                   // the Blicky UI, docked at the bottom right
  children?: ReactNode             // anything else on the screen (the strip in flight, rings)
  scale?: number
}

export const SCREEN = { w: 1512, h: 982 } as const

/** The stage every scene plays on: his live screen (a capture), his cursor with Pickle beside it, and the UI that opens at
    the bottom right. One template, so every story shows the product where it really lives. */
export function Screen({ backdrop, cursor = { x: 760, y: 520 }, pickle, ui, children, scale = 0.62 }: Props) {
  return (
    <div style={{ width: SCREEN.w * scale, height: SCREEN.h * scale, position: 'relative', overflow: 'hidden', borderRadius: 14, boxShadow: '0 30px 60px -30px rgba(0,0,0,.45), 0 0 0 1px rgba(0,0,0,.12)' }}>
      <div style={{ width: SCREEN.w, height: SCREEN.h, transform: `scale(${scale})`, transformOrigin: '0 0', position: 'absolute', inset: 0,
        background: backdrop ? `#222 url(${backdrop}) center / cover no-repeat` : 'linear-gradient(160deg, #cfd8e4 0%, #b9c6d6 55%, #a9b7c9 100%)' }}>
        {!backdrop && <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 26, background: 'rgba(245,245,245,.72)', backdropFilter: 'blur(12px)', font: '500 13px -apple-system, system-ui', display: 'flex', alignItems: 'center', gap: 18, padding: '0 16px', color: '#1d1d1f' }}><b></b><b>Code</b><span>File</span><span>Edit</span><span>View</span></div>}
        {children}
        {ui && <div data-slot="ui" style={{ position: 'absolute', right: 22, bottom: 22 }}>{ui}</div>}
        <div data-slot="cursor" style={{ position: 'absolute', left: cursor.x, top: cursor.y }}>
          {pickle && <div style={{ position: 'absolute', left: 18, top: 14 }}>{pickle}</div>}
          <Cursor />
        </div>
      </div>
    </div>
  )
}
