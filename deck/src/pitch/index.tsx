import type { Entry } from '../brand'
import { Title } from './slides/Title'
import { MiaStory, STORY_STEPS } from './slides/MiaStory'
import { MeetCast } from './slides/MeetCast'
import { ShakeToWake } from './slides/ShakeToWake'
import { SeesFlow } from './slides/SeesFlow'
import { Demo } from './slides/Demo'
import { NorthStar, NORTH_STAR_STEPS } from './slides/NorthStar'
import { HowItWorks, HOW_STEPS } from './slides/HowItWorks'
import { ItWorks, IT_WORKS_STEPS } from './slides/ItWorks'
import { RealWorld } from './slides/RealWorld'
import { Close, CLOSE_STEPS } from './slides/Close'

/** THE FINAL PRESENTATION, in order. Open it with ?deck=pitch. The story is draft 1 of the outline
    (deck/pitch/OUTLINE-draft1.md), opened by a story; each slide's file says where its words come from.
    steps: how many presses the slide builds through (see kit/step.tsx). New slides start from templates/. */
const felt = 'var(--surface-felt)'

export const pitch: Entry[] = [
  { title: 'pickje sees what you mean.', steps: 2, ground: felt, dark: true, chrome: false, render: Title },
  // The story, one continuous animated scene: her night → she asks an AI → it's not just her → Pickle. Words in slides/story.ts.
  { title: 'Mia’s story', chapter: 'The problem', steps: STORY_STEPS, render: MiaStory },
  // slides/Problem.tsx ("You already looked at it") is out of the order for now; put it back here if he wants it.
  { title: 'Meet Pickle and Blicky', chapter: 'Meet pickje', steps: 2, render: MeetCast },
  { title: 'Shake to wake', chapter: 'Meet pickje', steps: 3, render: ShakeToWake },
  { title: 'It sees what you mean', chapter: 'How it works', steps: 4, render: SeesFlow },
  { title: 'The demo', chapter: 'Demo', steps: 3, render: Demo },
  { title: 'Your north star', chapter: 'Meet pickje', steps: NORTH_STAR_STEPS, render: NorthStar },
  { title: 'How it works', chapter: 'How it works', steps: HOW_STEPS, render: HowItWorks },
  { title: 'It works', chapter: 'Proof', steps: IT_WORKS_STEPS, render: ItWorks },
  { title: 'Built for the real world', dark: true, render: RealWorld },
  { title: 'Close', steps: CLOSE_STEPS, ground: felt, dark: true, chrome: false, render: Close },
]
