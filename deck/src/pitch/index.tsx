import type { Entry } from '../brand'
import { Title } from './slides/Title'
import { MiaStory, STORY_STEPS } from './slides/MiaStory'
import { MeetCast } from './slides/MeetCast'
import { ShakeToWake } from './slides/ShakeToWake'
import { SeesFlow } from './slides/SeesFlow'
import { NorthStar, NORTH_STAR_STEPS } from './slides/NorthStar'
import { HowItWorks, HOW_STEPS } from './slides/HowItWorks'
import { ItWorks, IT_WORKS_STEPS } from './slides/ItWorks'
import { RealWorld } from './slides/RealWorld'
import { NotJustMia, NOT_JUST_STEPS } from './slides/NotJustMia'
import { ToolsForMore, TOOLS_STEPS } from './slides/ToolsForMore'
import { ClipOnboarding } from './slides/ClipOnboarding'
import { ClipScenarios } from './slides/ClipScenarios'
import { ClipLoop } from './slides/ClipLoop'
import { MIA, MIA_TURN } from './slides/mia'
import { Close, CLOSE_STEPS } from './slides/Close'

/** THE FINAL PRESENTATION, in order. Open it with ?deck=pitch. The story is draft 1 of the outline
    (deck/pitch/OUTLINE-draft1.md), opened by a story; each slide's file says where its words come from.
    steps: how many presses the slide builds through (see kit/step.tsx). New slides start from templates/. */
const felt = 'var(--surface-felt)'

export const pitch: Entry[] = [
  // Mia, the case study the pitch opens on (his brief 2026-10-25, ~4:10 AM): her picture, "This is Mia.", who she is,
  // too much, she asks AI until she's ten sessions in. One sentence per press. slides/mia/.
  ...MIA,
  // How many people that is, and what everyone keeps building for them.
  { title: 'It’s not just Mia', chapter: 'The problem', steps: NOT_JUST_STEPS, render: NotJustMia },
  { title: 'There’s always a tool for more', chapter: 'The problem', steps: TOOLS_STEPS, render: ToolsForMore },
  // The turn: one next step, then meet pickje.
  ...MIA_TURN,
  { title: 'pickje sees what you mean.', steps: 2, ground: felt, dark: true, chrome: false, render: Title },
  { title: 'Meet Pickle and Blicky', chapter: 'Meet pickje', steps: 2, render: MeetCast },
  // The demo as clips: onboarding, the scenarios, one turn close up. Each plays on its own and loops.
  { title: 'The first minute', chapter: 'Demo', steps: 1, render: ClipOnboarding },
  { title: 'Any screen', chapter: 'Demo', steps: 1, render: ClipScenarios },
  { title: 'Talk, mark, speak, save', chapter: 'Demo', steps: 1, render: ClipLoop },
  { title: 'How it’s built', chapter: 'How it works', steps: HOW_STEPS, render: HowItWorks },
  { title: 'It works', chapter: 'Proof', steps: IT_WORKS_STEPS, render: ItWorks },
  { title: 'Close', steps: CLOSE_STEPS, ground: felt, dark: true, chrome: false, render: Close },
  // Appendix, for questions. MiaStory (the first, one-scene version of her story) is here too.
  { title: 'Mia’s story, one scene', chapter: 'Appendix', steps: STORY_STEPS, render: MiaStory },
  { title: 'Shake to wake', chapter: 'Appendix', steps: 3, render: ShakeToWake },
  { title: 'It sees what you mean', chapter: 'Appendix', steps: 4, render: SeesFlow },
  { title: 'Your north star', chapter: 'Appendix', steps: NORTH_STAR_STEPS, render: NorthStar },
  { title: 'Built for the real world', chapter: 'Appendix', dark: true, render: RealWorld },
]
