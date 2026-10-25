import { Card } from '@design/ui/kit'
import { tokens } from '@design/tokens'
import { Page, span } from '../../brand/frame'
import { Show, useStep } from '../kit/step'

/** 4 · There's always a tool for more (his brief 2026-10-25: "the last story slide is about how theres always tools for
    morea nd the idea of ai is to do more, but what we need is somethgin more collaboritve huamn focuesd and doesnt mess
    with where your context goes"). 5 steps.
    0    the title, an empty desk
    1    the tools pile up, one more each (apps, tabs, reminders)
    2    and now AI that does more for you
    3    his line, the end of his inspiration (his words 2026-10-25, spelling fixed: "for hte ruest iso us our great
         ambitions are help behind the tools that only complicate it more"); the pile shakes and dims
    4    the pile clears; what we built instead: the 3 cards (DRAFT, from his brief)
    Every pile label and card line is DRAFT. */
export const TOOLS_STEPS = 5
const K = tokens.component.deck.scale
const PILE = [
  { t: '+1 to-do app', at: 1, x: 40, y: 270, r: -6 }, { t: '+1 calendar', at: 1, x: 300, y: 300, r: 4 }, { t: '+14 tabs', at: 1, x: 560, y: 262, r: -3 },
  { t: '+1 notes app', at: 1, x: 150, y: 190, r: 7 }, { t: '+1 reminder', at: 1, x: 430, y: 198, r: -8 },
  { t: '+1 AI chat window', at: 2, x: 250, y: 110, r: 3 }, { t: '+1 agent that does it for you', at: 2, x: 520, y: 120, r: -5 }, { t: '+1 more AI', at: 2, x: 90, y: 40, r: -4 },
]
const CARDS = [
  { name: 'Collaborative', line: 'It works beside you, on the screen you’re already on.' },
  { name: 'Human-focused', line: 'Your words, and one next step at a time.' },
  { name: 'Your context stays put', line: 'It reads what’s already there. Nothing to copy, paste or explain again.' },
]
const W = (1728 - 2 * 24) / 3 - 16

export function ToolsForMore() {
  const step = useStep()
  return (
    <Page title="There’s always a tool for more">
      <div style={{ position: 'relative', height: '100%' }}>
        {/* the pile */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: 900, height: 380, opacity: step >= 4 ? 0 : 1, transition: 'opacity 280ms' }}>
          {PILE.map((p) => (
            <Show key={p.t} from={p.at} dimFrom={3} style={{ position: 'absolute', left: p.x, top: p.y }}>
              <div className={step === 3 ? 'pile-shake' : undefined} style={{ transform: `rotate(${p.r}deg)`, padding: '14px 22px', borderRadius: 14, background: 'var(--surface-page)',
                boxShadow: 'inset 0 0 0 2px var(--silver-300), 0 3px 0 oklch(0.3 0.01 230 / .14)', font: '600 30px var(--font-head)', whiteSpace: 'nowrap' }}>{p.t}</div>
            </Show>
          ))}
        </div>
        <Show from={3} until={3} style={{ position: 'absolute', left: span(7), top: 40, width: span(5) }}>
          <p style={{ margin: 0, font: '400 42px/1.28 var(--font-second)', color: 'var(--ink)' }}>“And for the rest of us, our great ambitions are held back by tools that only complicate it more.”</p>
        </Show>
        {/* what we built instead */}
        <Show from={4} style={{ position: 'absolute', left: 0, top: 0, right: 0 }}>
          <p style={{ margin: '0 0 36px', font: 'var(--t-head-2)', color: 'var(--text-secondary)' }}>So we didn’t build more. We built a friend at your cursor.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {CARDS.map((c) => (
              <Card key={c.name} width={W} height={300} scale={K} lifted>
                <div style={{ font: 'var(--t-head-2)' }}>{c.name}</div>
                <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>{c.line}</div>
              </Card>
            ))}
          </div>
        </Show>
        <style>{'@keyframes pileShake { 0%,100% { translate: 0 0 } 25% { translate: -4px 1px } 75% { translate: 4px -1px } } .pile-shake { animation: pileShake 180ms steps(2) 3 }'}</style>
      </div>
    </Page>
  )
}
