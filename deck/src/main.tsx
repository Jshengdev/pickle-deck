import { createRoot } from 'react-dom/client'
import 'pretendard/dist/web/static/pretendard.css'
import '@fontsource-variable/geist-mono'
import 'dialkit/styles.css'
import '@design/tokens/generated/tokens.css'
import '@design/tokens/legacy.css'
import '@design/tokens/fonts.css'
import '@design/engine/gsap'
import './deck.css'
import { Deck } from './Deck'
import { MaterialsLab } from './lab/MaterialsLab'
import { Notepads } from './notepads/Notepads'

// ?lab opens the materials lab, ?notepads the two final notepads (live); everything else is the book
const q = new URLSearchParams(location.search)
createRoot(document.getElementById('root')!).render(q.has('lab') ? <MaterialsLab /> : q.has('notepads') ? <Notepads /> : <Deck />)
