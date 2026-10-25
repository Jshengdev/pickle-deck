import type { Entry } from '../../../brand'
import { MiaPortrait, ThisIsMia, THIS_IS_STEPS, SheIs, SHE_IS_STEPS, TooMany, TOO_MANY_STEPS, AsksAI, ASKS_AI_STEPS, OneStep, ONE_STEP_STEPS } from './Slides'

/** Mia's story, in order: the case study the pitch opens on. One file of words (words.ts), one of parts (parts.tsx), one
    of slides (Slides.tsx). Each slide is one idea; each press is one sentence. */
export const MIA: Entry[] = [
  { title: 'Mia', chapter: 'Mia', chrome: false, render: MiaPortrait },
  { title: 'This is Mia', chapter: 'Mia', chrome: false, steps: THIS_IS_STEPS, render: ThisIsMia },
  { title: 'Who she is', chapter: 'Mia', steps: SHE_IS_STEPS, render: SheIs },
  { title: 'Too much', chapter: 'Mia', steps: TOO_MANY_STEPS, render: TooMany },
]
/** After "It's not just Mia" (his run-through 2026-10-25 5:20 AM): you ask AI, ten windows, then one next step. */
export const MIA_AI: Entry[] = [
  { title: 'You ask AI', chapter: 'The problem', steps: ASKS_AI_STEPS, render: AsksAI },
  { title: 'One next step', chapter: 'The problem', steps: ONE_STEP_STEPS, render: OneStep },
]
