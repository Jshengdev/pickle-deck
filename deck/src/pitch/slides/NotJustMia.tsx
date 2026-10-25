import { Stat } from '@design/ui/kit'
import { Page, span } from '../../brand/frame'
import { Show } from '../kit/step'
import { MiaFigure } from './mia/parts'

/** 5 · It's not just Mia: she has ADHD, the research on switching, and what it means. 5 steps.
    His run-through 2026-10-25 5:20 AM, verbatim: "instead of going straight to the obvious solution, let's pull out the
    slide for it's not just Mia, and then go into how she has ADHD, and then go into research about the context switching,
    and basically say how like. Today's AI tools were, maybe find a more clear statement for what this could mean. But
    basically trying to figure out how context switching is extremely or more detrimental to somebody who lacks the ability
    to focus and so they have ambition, they want to do things. They're unable to do so, so have that be there, but keep the
    stats in there."
    0  "Mia has ADHD." (his words)
    1–3  one number per press, each with its source (checked 2026-10-25):
         CDC, MMWR 73(40), Oct 10, 2024 (Staley et al.; NCHS Rapid Surveys System, Oct–Nov 2023): ≈ 15.5 M U.S. adults
           (6.0%) had a current ADHD diagnosis, self-reported.
         Murty, Dadlani & Das, "How Much Time and Energy Do We Waste Toggling Between Applications?", HBR, Aug 2022:
           137 people at 3 Fortune 500 companies, ≈ 1,200 toggles a day, just under 4 h a week reorienting
         Gloria Mark (UC Irvine), Gallup Business Journal interview: 23 min 15 s to resume interrupted work (one study, 36 workers)
    4  the clear statement of his point (DRAFT wording; it's his reading of the numbers, not a cited finding)
    Out since his run-through: the AI-tools line, and his "For years we thought she just needed better productivity apps…
    built for neurotypical brains" lines (still in the Devpost inspiration). Not used: "15–20% of people are
    neurodivergent" (its source couldn't be traced). */
export const NOT_JUST_STEPS = 5
const NUMBERS = [
  { value: '15.5M', caption: 'U.S. adults have ADHD too: 6.0%, a current diagnosis. CDC, 2024' },
  { value: '1,200', caption: 'app switches a day, and nearly 4 hours a week spent finding your place again. HBR, 2022 (137 people)' },
  { value: '23 min', caption: 'to get back to work after an interruption. Gloria Mark, UC Irvine (one study, 36 workers)' },
]
const SAYS = ['Every switch costs more when focus is already hard.', 'The ambition is there. The start isn’t.']   // DRAFT, his point

export function NotJustMia() {
  return (
    <Page title="It’s not just Mia">
      <div style={{ display: 'grid', gridTemplateColumns: `${span(5)}px 1fr`, gap: 80, alignItems: 'start', height: '100%' }}>
        <div style={{ display: 'grid', gap: 44, paddingTop: 10 }}>
          <Show dimFrom={1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <MiaFigure height={170} />
              <p style={{ margin: 0, font: '700 var(--deck-hero)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>Mia has ADHD.</p>
            </div>
          </Show>
          <Show from={4}>
            <div style={{ display: 'grid', gap: 18 }}>
              {SAYS.map((l) => <p key={l} style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)', color: 'var(--ink)' }}>{l}</p>)}
            </div>
          </Show>
        </div>
        <div style={{ display: 'grid', gap: 44, paddingTop: 10 }}>
          {NUMBERS.map((n, i) => (
            <Show key={n.value} from={i + 1} dimFrom={4}>
              <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', alignItems: 'center', gap: 28 }}>
                <Stat value={n.value} caption="" size="var(--deck-hero)" />
                <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>{n.caption}</div>
              </div>
            </Show>
          ))}
        </div>
      </div>
    </Page>
  )
}
