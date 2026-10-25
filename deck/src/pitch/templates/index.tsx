import type { Entry } from '../../brand'
import { TitleT } from './TitleT'
import { ProblemT, PROBLEM_STEPS } from './ProblemT'
import { JourneyT, JOURNEY_STEPS } from './JourneyT'
import { NumberT } from './NumberT'
import { TemplateSlide } from '../slides/_Template'

/** The template shelf: open with ?deck=templates. Copy a file into ../slides, change the words at the top, and add it
    to ../index.tsx with the same entry settings as here. */
export const templates: Entry[] = [
  { title: 'Title', steps: 2, ground: 'var(--surface-felt)', dark: true, chrome: false, render: TitleT },
  { title: 'Problem', chapter: 'Template', steps: PROBLEM_STEPS, render: ProblemT },
  { title: 'Journey', chapter: 'Template', steps: JOURNEY_STEPS, render: JourneyT },
  { title: 'Number', chapter: 'Template', steps: 3, render: NumberT },
  { title: 'Blank', chapter: 'Template', steps: 3, render: TemplateSlide },
]
