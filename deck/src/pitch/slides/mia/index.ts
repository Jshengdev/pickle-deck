import type { Entry } from '../../../brand'
import { MiaPortrait, ThisIsMia, SheIs, SHE_IS_STEPS, TooMany, TOO_MANY_STEPS, AsksAI, ASKS_AI_STEPS, OneStep, ONE_STEP_STEPS } from './Slides'

/** Mia's story, in order: the case study the pitch opens on. One file of words (words.ts), one of parts (parts.tsx), one
    of slides (Slides.tsx). Each slide is one idea; each press is one sentence. */
export const MIA: Entry[] = [
  { title: 'Mia', chapter: 'Mia', chrome: false, render: MiaPortrait },
  { title: 'This is Mia', chapter: 'Mia', chrome: false, render: ThisIsMia },
  { title: 'Who she is', chapter: 'Mia', steps: SHE_IS_STEPS, render: SheIs },
  { title: 'Too much', chapter: 'Mia', steps: TOO_MANY_STEPS, render: TooMany },
  { title: 'She asks AI', chapter: 'Mia', steps: ASKS_AI_STEPS, render: AsksAI },
]
/** The turn, after the numbers: one next step, then meet pickje. */
export const MIA_TURN: Entry[] = [
  { title: 'One next step', chapter: 'Mia', steps: ONE_STEP_STEPS, render: OneStep },
]
