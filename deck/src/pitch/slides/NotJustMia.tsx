import { Stat } from '@design/ui/kit'
import { Page, span } from '../../brand/frame'
import { Show } from '../kit/step'

/** 3 · It's not just Mia: the data, the research and the personal line (his brief 2026-10-25: "make sure you have data and
    reserach and personal story applied to it"). 5 steps.
    0  his line (his words 2026-10-25, spelling fixed: "for years we though she just neede better proudcitvt apps")
    1–3  one number per press, each with its source (checked 2026-10-25):
         CDC, MMWR 73(40), Oct 10, 2024 (Staley et al.; NCHS Rapid Surveys System, Oct–Nov 2023): ≈ 15.5 M U.S. adults
           (6.0%) had a current ADHD diagnosis, self-reported. His ask 2026-10-25 ~5 AM: "almost fifteen point five million
           adults in the U.S." (the world figure, Song et al. 2021: 6.76%, ≈ 366 M with symptoms, is the backup)
         Murty, Dadlani & Das, "How Much Time and Energy Do We Waste Toggling Between Applications?", HBR, Aug 2022:
           137 people at 3 Fortune 500 companies, ≈ 1,200 toggles a day, just under 4 h a week reorienting
         Gloria Mark (UC Irvine), Gallup Business Journal interview: 23 min 15 s to resume interrupted work (one study, 36 workers)
    4  the rest of his line (spelling fixed: "the trust is htat softwaer we use was ubilt for nerotuypbrian")
    The title is DRAFT. Not used: "15–20% of people are neurodivergent" (its source couldn't be traced). */
export const NOT_JUST_STEPS = 5
const NUMBERS = [
  { value: '15.5M', caption: 'U.S. adults have ADHD: 6.0%, a current diagnosis. CDC, 2024' },
  { value: '1,200', caption: 'app switches a day, and nearly 4 hours a week spent finding your place again. HBR, 2022 (137 people)' },
  { value: '23 min', caption: 'to get back to work after an interruption. Gloria Mark, UC Irvine (one study, 36 workers)' },
]

export function NotJustMia() {
  return (
    <Page title="It’s not just Mia">
      <div style={{ display: 'grid', gridTemplateColumns: `${span(5)}px 1fr`, gap: 80, alignItems: 'start', height: '100%' }}>
        <div style={{ display: 'grid', gap: 40, paddingTop: 20 }}>
          <Show dimFrom={1}><p style={{ margin: 0, font: '400 46px/1.25 var(--font-second)', color: 'var(--pickle-ink)' }}>“For years we thought she just needed better productivity apps.”</p></Show>
          <Show from={4}><p style={{ margin: 0, font: '400 46px/1.25 var(--font-second)', color: 'var(--ink)' }}>“But the truth is, the software we use was built for neurotypical brains.”</p></Show>
        </div>
        <div style={{ display: 'grid', gap: 44 }}>
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
