import { useRef } from 'react'
import { useDialKit } from 'dialkit'
import { Card, Tray } from '@design/ui/kit'
import { Pickle, Say } from '@design/cast/Cast'
import { Cursor } from '@design/stage/Cursor'
import { ease, tokens } from '@design/tokens'
import { gsap } from '@design/engine/gsap'
import { M, TOP } from '../../brand/frame'
import { StateCard } from '../../brand/slides-d'
import { Show, useStepTimeline } from '../kit/step'
import { CHAT, HER, NEXT_STEP, TASKS } from './story'

/** Mia's story as one continuous animated scene: one stage, no cuts, a beat per →. Words live in ./story.ts.
    The brand's "nothing animates in / 1 moving thing" rules are relaxed here on purpose (his call, for the story only):
    her night is chaos; once pickje arrives, the deck goes calm again.

    Beats (label sN = how the scene looks after press N):
    0      her empty desktop                       7   she asks about her portfolio
    1–3    a window slides in per press            8   it forgets
    4      everything shakes; Stuck slams in       9   camera pulls back; 62–85% ticks up
    5      camera zooms in; she types to an AI    10   the windows fly into one felt tray, as cards
    6      a wall of an answer streams in         11   chemistry lifts; its 1 next step types out
                                                  12   Pickle hops in: "start here"

    The number: Kofler et al., "Working memory and short-term memory deficits in ADHD", Neuropsychology 34(6), 2020,
    doi:10.1037/neu0000641: "62%−85% of children with ADHD were classified as impaired in working memory". CHILDREN,
    not adults. Found via Iwo Szapar, "AI for ADHD: Why ChatGPT Makes It Worse" (2026), which wrongly says "people". */
export const STORY_STEPS = 13

const TITLES = [
  { from: 0, until: 3, text: `${HER} has 3 things due this week` },
  { from: 4, until: 4, text: 'Everything is urgent, so nothing starts' },
  { from: 5, until: 6, text: `${HER} asks an AI for help` },
  { from: 7, until: 8, text: 'It answers, then forgets' },
  { from: 9, until: 9, text: `It’s not just ${HER}` },
  { from: 10, until: 12, text: `${HER} needs 1 next step, not 5 answers` },
]

// The stage, in its own px (1728 × 700). Windows are 560 × 300.
const SW = 1728, SH = 700
const WIN = [{ x: 120, y: 70 }, { x: 520, y: 170 }, { x: 920, y: 270 }]
const K = tokens.component.deck.scale
const TRAY = { x: 214, y: 80, w: 1300, h: 540 }
const CARD_W = (TRAY.w - 2 * 24 * K - 2 * 16 * K) / 3, CARD_H = 450
const CARD = [0, 1, 2].map((i) => ({ x: TRAY.x + 24 * K + i * (CARD_W + 16 * K), y: TRAY.y + (TRAY.h - CARD_H) / 2 }))

function Window({ file, body }: { file: string; body: string }) {
  return (
    <div style={{ width: 560, height: 300, borderRadius: 14, background: 'var(--surface-plane)', boxShadow: '0 24px 50px -24px oklch(0.2 0.02 230 / .45), 0 0 0 1px var(--line-hair)', overflow: 'hidden' }}>
      <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: 'var(--silver-100)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <i key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
        <span style={{ font: '400 calc(15px * var(--type-scale)) var(--font-head)', color: 'var(--text-muted)', marginLeft: 12 }}>{file}</span>
      </div>
      <pre style={{ margin: 0, padding: '22px 24px', font: '400 calc(22px * var(--type-scale))/1.5 var(--font-head)', color: 'var(--ink)', whiteSpace: 'pre-wrap' }}>{body}</pre>
    </div>
  )
}

export function MiaStory() {
  const root = useRef<HTMLDivElement>(null)
  const msgs = useRef<(HTMLSpanElement | null)[]>([])
  const next = useRef<HTMLSpanElement>(null)
  const lo = useRef<HTMLSpanElement>(null), hi = useRef<HTMLSpanElement>(null)
  const d = useDialKit('Mia story', {
    zoom: [1.12, 1, 1.4, 0.01], shake: [14, 0, 40, 1], shakeTime: [1.1, 0.3, 3, 0.05],
    herSpeed: [38, 10, 120, 1], aiSpeed: [160, 40, 400, 5], fly: [0.75, 0.2, 2, 0.05], dim: [0.3, 0, 1, 0.01],
  })

  useStepTimeline(root, (tl) => {
    // Text that types itself: chars per second. Its start state (empty) is set once, at time 0.
    const typing = (el: () => HTMLElement | null, text: string, cps: number) => {
      const o = { n: 0 }
      const draw = () => { const e = el(); if (e) e.textContent = text.slice(0, Math.round(o.n)) }
      tl.set(o, { n: 0, onUpdate: draw }, 0)
      return () => gsap.to(o, { n: text.length, duration: text.length / cps, ease: 'none', onUpdate: draw })
    }
    const typeMsg = CHAT.map((m, i) => typing(() => msgs.current[i], m.text, m.who === 'her' ? d.herSpeed : d.aiSpeed))
    const typeNext = typing(() => next.current, NEXT_STEP, d.herSpeed)
    const n = { v: 0 }
    const count = () => {
      if (lo.current) lo.current.textContent = String(Math.round(n.v * 62))
      if (hi.current) hi.current.textContent = String(Math.round(n.v * 85))
    }

    // How the scene starts: one set per element.
    tl.set('.win', { opacity: 0, x: 0, y: 60, scale: 1, rotation: 0 }, 0)
      .set('.stuck', { opacity: 0, scale: 0.8 }, 0)
      .set('.chat', { opacity: 0, y: 40 }, 0)
      .set('.msg', { opacity: 0 }, 0)
      .set('.stat', { opacity: 0 }, 0)
      .set(n, { v: 0, onUpdate: count }, 0)
      .set('.tray', { opacity: 0 }, 0)
      .set('.card', { opacity: 0, y: 0, scale: 1 }, 0)
      .set('.next', { opacity: 0 }, 0)
      .set('.pickle', { opacity: 0, y: -90 }, 0)
      .set('.cam', { scale: 1 }, 0)
      .set('.cursor', { x: 860, y: 560, opacity: 1 }, 0)

    // 1–3 · her windows pile up; the cursor chases each one
    WIN.forEach((w, i) => {
      tl.to(`.win-${i}`, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.6)' })
        .to('.cursor', { x: w.x + 300, y: w.y + 170, duration: 0.5, ease: ease.inOut }, '<')
        .addLabel(`s${i + 1}`)
    })
    // 4 · overwhelm
    tl.to('.win', { x: d.shake, rotation: d.shake / 20, duration: d.shakeTime, ease: 'unsure', stagger: 0.05 })
      .to('.stuck', { opacity: 1, scale: 1, duration: 0.42, ease: 'press' }, '-=0.35')
      .addLabel('s4')
    // 5 · camera in; she types
    tl.to('.win, .stuck', { opacity: 0.2, duration: 0.4 })
      .to('.cam', { scale: d.zoom, duration: 0.8, ease: ease.inOut }, '<')
      .to('.chat', { opacity: 1, y: 0, duration: 0.5, ease: ease.out }, '<0.2')
      .to('.msg-0', { opacity: 1, duration: 0.1 }).add(typeMsg[0]())
      .addLabel('s5')
    // 6–8 · the chat plays out
    for (let i = 1; i < CHAT.length; i++) tl.to(`.msg-${i}`, { opacity: 1, duration: 0.1 }).add(typeMsg[i]()).addLabel(`s${i + 5}`)
    // 9 · pull back: it's not just her
    tl.to('.chat, .win, .stuck, .cursor', { opacity: 0, duration: 0.5 })
      .to('.cam', { scale: 1, duration: 0.8, ease: ease.inOut }, '<')
      .to('.stat', { opacity: 1, duration: 0.15, ease: ease.step })
      .to(n, { v: 1, duration: 1, ease: 'steps(20)', onUpdate: count }, '<')
      .addLabel('s9')
    // 10 · her 3 things fly into one felt tray and become cards
    tl.to('.stat, .stuck', { opacity: 0, duration: 0.3 })
      .to('.chat', { opacity: 0, y: -30, duration: 0.4 }, '<')
      .to('.tray', { opacity: 1, duration: 0.4 }, '<')
    WIN.forEach((w, i) => {
      tl.to(`.win-${i}`, { opacity: 1, x: CARD[i].x - w.x, y: CARD[i].y - w.y, scale: CARD_W / 560, rotation: 0, duration: d.fly, ease: 'route' }, i === 0 ? '>' : '<0.08')
    })
    tl.to('.win', { opacity: 0, duration: 0.25 }).to('.card', { opacity: 1, duration: 0.25 }, '<').addLabel('s10')
    // 11 · one card lifts; its 1 next step types out
    tl.to('.card-1, .card-2', { opacity: d.dim, duration: 0.4 })
      .to('.card-0', { y: -14, scale: 1.04, duration: 0.45, ease: 'land' }, '<')
      .to('.next', { opacity: 1, duration: 0.1 }).add(typeNext())
      .addLabel('s11')
    // 12 · Pickle hops in
    tl.to('.pickle', { opacity: 1, y: 0, duration: 0.6, ease: 'land' }).addLabel('s12')
  }, [d.zoom, d.shake, d.shakeTime, d.herSpeed, d.aiSpeed, d.fly, d.dim])

  return (
    <div ref={root} style={{ position: 'absolute', inset: 0 }}>
      {TITLES.map((t) => (
        <Show key={t.text} from={t.from} until={t.until} style={{ position: 'absolute', left: M, top: TOP }}>
          <h1 style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)', whiteSpace: 'nowrap' }}>{t.text}</h1>
        </Show>
      ))}

      <div style={{ position: 'absolute', left: M, top: TOP + 116, width: SW, height: SH, borderRadius: 29, overflow: 'hidden', background: 'linear-gradient(165deg, var(--silver-200), var(--silver-300))' }}>
        <div className="cam" style={{ position: 'absolute', inset: 0, transformOrigin: '50% 35%' }}>
          <div className="tray" style={{ position: 'absolute', left: TRAY.x, top: TRAY.y }}><Tray width={TRAY.w} height={TRAY.h} scale={K} /></div>
          {TASKS.map((t, i) => (
            <div key={t.id} className={`win win-${i}`} style={{ position: 'absolute', left: WIN[i].x, top: WIN[i].y, transformOrigin: '0 0' }}><Window file={t.file} body={t.body} /></div>
          ))}
          <div className="stuck" style={{ position: 'absolute', left: 1300, top: 460 }}>
            <StateCard title="Stuck" line="can’t start any of them" value={2} accent="var(--stuck)" lifted time="11:48" w={380} h={210} />
          </div>

          <div className="chat" style={{ position: 'absolute', left: 434, top: 30, width: 860, height: 590, borderRadius: 22, background: 'var(--surface-plane)', boxShadow: '0 30px 60px -30px oklch(0.2 0.02 230 / .5), 0 0 0 1px var(--line-hair)', padding: '26px 34px', boxSizing: 'border-box', display: 'grid', alignContent: 'start', gap: 16 }}>
            {CHAT.map((m, i) => (
              <div key={i} className={`msg msg-${i}`} style={{ display: 'flex', justifyContent: m.who === 'her' ? 'flex-end' : 'flex-start' }}>
                <span ref={(el) => { msgs.current[i] = el }} style={{
                  maxWidth: m.who === 'her' ? 560 : 760, padding: m.who === 'her' ? '14px 20px' : 0, borderRadius: 20,
                  background: m.who === 'her' ? 'var(--surface-sunken)' : 'transparent',
                  font: `400 calc(${m.who === 'her' ? 24 : 21}px * var(--type-scale))/1.5 var(--font-head)`, color: m.who === 'her' ? 'var(--ink)' : 'var(--text-secondary)',
                }} />
              </div>
            ))}
          </div>

          <div className="stat" style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center', justifyItems: 'center', gap: 14, textAlign: 'center' }}>
            <div style={{ font: '400 300px/0.9 var(--font-pixel)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              <span ref={lo}>62</span>–<span ref={hi}>85</span><span style={{ fontSize: '0.45em' }}>%</span>
            </div>
            <div style={{ font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>of children with ADHD are impaired in working memory</div>
            <div style={{ font: 'var(--t-head-4)', color: 'var(--text-muted)' }}>Kofler et al., Neuropsychology, 2020</div>
          </div>

          {TASKS.map((t, i) => (
            <div key={t.id} className={`card card-${i}`} style={{ position: 'absolute', left: CARD[i].x, top: CARD[i].y }}>
              <Card width={CARD_W} height={CARD_H} scale={K} lifted={i === 0}>
                <div style={{ font: 'var(--t-pixel-4)', color: 'var(--text-muted)' }}>{t.due}</div>
                <div style={{ font: 'var(--t-head-2)' }}>{t.name}</div>
                {i === 0 && (
                  <div className="next" style={{ marginTop: 'auto' }}>
                    <div style={{ font: 'var(--t-head-4)', color: 'var(--text-muted)' }}>Next</div>
                    <span ref={next} style={{ display: 'block', font: 'var(--t-second-3)', marginTop: 6, minHeight: '3.9em' }} />
                  </div>
                )}
              </Card>
            </div>
          ))}
          <div className="pickle" style={{ position: 'absolute', left: 1545, top: 300, display: 'grid', justifyItems: 'start', gap: 18 }}>
            <Say size={28}>start here</Say>
            <Pickle pose="point" height={230} />
          </div>

          <div className="cursor" style={{ position: 'absolute', left: 0, top: 0 }}><Cursor size={34} /></div>
        </div>
      </div>
    </div>
  )
}
