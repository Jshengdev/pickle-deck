// The local preview of the Mana app: the same app.js, compiled the way Mana does it (React in scope, "; return UserDiv;"),
// fed with mana/out/preview-data.json (from `node mana/build.mjs preview`) and pictures from /mana/img. DialKit: the
// panel tunes the preview frame only (width), since the app itself ships with its values fixed in T.
import React from 'react'
import { createRoot } from 'react-dom/client'
import { DialRoot, useDialKit } from 'dialkit'
import 'dialkit/styles.css'
import code from './app.js?raw'

const UserDiv = new Function('React', code + '; return UserDiv;')(React)

function Frame({ data }) {
  const d = useDialKit('Notebook preview', { width: [1200, 720, 1600, 10] })
  return <div style={{ width: d.width, margin: '0 auto', height: '100%' }}><UserDiv data={data} assetBase="/mana/" /></div>
}
fetch('/mana/out/preview-data.json').then((r) => r.json()).then((data) => {
  createRoot(document.getElementById('root')).render(<><Frame data={data} /><DialRoot /></>)
})
