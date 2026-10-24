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

// ?lab opens the materials lab; everything else is the book
const lab = new URLSearchParams(location.search).has('lab')
createRoot(document.getElementById('root')!).render(lab ? <MaterialsLab /> : <Deck />)
