import type { Entry } from '../brand'
import { Title } from './slides/Title'
import { NotJustMia, NOT_JUST_STEPS } from './slides/NotJustMia'
import { ToolsForMore, TOOLS_STEPS } from './slides/ToolsForMore'
import { MIA, MIA_AI } from './slides/mia'
import { LiveDemo } from './slides/LiveDemo'
import { WithYou, WITH_YOU_STEPS } from './slides/WithYou'
import { MeetPickle, MEET_PICKLE_STEPS } from './slides/MeetPickle'
import { MeetBlicky, MEET_BLICKY_STEPS } from './slides/MeetBlicky'
import { Onboarding, ONBOARDING_STEPS } from './slides/Onboarding'
import { Scenarios, SCENARIOS_STEPS } from './slides/Scenarios'
import { Verbs, VERBS_STEPS } from './slides/Verbs'
import { Exam, EXAM_STEPS } from './slides/Exam'
import { Annotations, ANNOTATIONS_STEPS } from './slides/Annotations'
import { Stack, STACK_STEPS } from './slides/Stack'
import { Close, CLOSE_STEPS } from './slides/Close'

/** THE FINAL PRESENTATION, in order. Draft 6 (2026-10-25 5:20 AM): his run-through of the whole deck. Slides out of
    the order (the clips, the earlier cast and proof slides, the one-scene Mia story) stay as files for reuse.  Open it with ?deck=pitch. The story is draft 1 of the outline
    (deck/pitch/OUTLINE-draft1.md), opened by a story; each slide's file says where its words come from.
    steps: how many presses the slide builds through (see kit/step.tsx). New slides start from templates/. */
const felt = 'var(--surface-felt)'

export const pitch: Entry[] = [
  // ── The first half (his run-through 2026-10-25 5:20 AM): Mia → not just Mia → you ask AI → a tool for more → pickje ──
  ...MIA,                                                    // her picture, "This is Mia.", her projects, "So nothing starts."
  { title: 'It’s not just Mia', chapter: 'The problem', steps: NOT_JUST_STEPS, render: NotJustMia },
  ...MIA_AI,                                                 // you ask AI → ten windows → "You just need the one next step."
  { title: 'There’s always a tool for more', chapter: 'The problem', steps: TOOLS_STEPS, render: ToolsForMore },
  { title: 'Built to do it with you', chapter: 'pickje', steps: WITH_YOU_STEPS, render: WithYou },
  { title: 'pickje sees what you mean.', steps: 2, ground: felt, dark: true, chrome: false, render: Title },
  { title: 'Meet Pickle', chapter: 'Meet the cast', steps: MEET_PICKLE_STEPS, render: MeetPickle },
  { title: 'Meet Blicky', chapter: 'Meet the cast', steps: MEET_BLICKY_STEPS, render: MeetBlicky },
  // ── The demo: the onboarding a press per beat, then he goes live, then the scenarios ──
  { title: 'Onboarding', chapter: 'Demo', steps: ONBOARDING_STEPS, render: Onboarding },
  { title: 'Live: the onboarding', chapter: 'Demo', render: LiveDemo },
  { title: 'The scenarios', chapter: 'Demo', steps: SCENARIOS_STEPS, render: Scenarios },
  // ── After the live demo: the verbs and sponsors, the before and after, the stack ──
  { title: 'Fifteen verbs', chapter: 'How it works', steps: VERBS_STEPS, render: Verbs },
  { title: 'Before and after', chapter: 'How it works', steps: ANNOTATIONS_STEPS, render: Annotations },
  { title: 'How we built it', chapter: 'How it works', steps: STACK_STEPS, render: Stack },
  { title: 'Close', steps: CLOSE_STEPS, ground: felt, dark: true, chrome: false, render: Close },
  // ── Appendix (his call: "we could have the proof at the… appendix with all the exams and tests") ──
  { title: 'The full exam', chapter: 'Appendix', steps: EXAM_STEPS, render: Exam },
]
