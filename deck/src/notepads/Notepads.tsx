import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { DialRoot, useDialKit } from 'dialkit'
import { NotesPad, MOSS_DEFAULT, type PlanPage, type ScratchPage, type Peek, type PadSurface, type Who, type AnyPage } from '@design/ui/product/NotesPad'
import type { Project } from '@design/ui/product/Notepad'
import { BlickyLive, PickleLive } from '@design/cast/Live'
import { Cursor } from '@design/stage/Cursor'
import { gsap, useGSAP } from '@design/engine/gsap'

/** The two final notepads, live (?notepads), copied from pickje's Storybook (design/src/stories/NotesPad.stories.tsx in the
    pickje repo, "Final: Pickle's notepad" and "Final: Blicky's scratchpad"). His words: "these two will be the final two
    examples". Pickle's notepad is the standard; Blicky's is the scratchpad. The data is the product's staged projects
    (synthetic, every word by "test"); in the product it's fed live. Use this page to screenshot the pads for slides. */
/** A plain course page with a problem set open on question 3 (a sample screen, built here). */
type Course = { course: string; set: string; due: string; side: string[]; current: number; qs: string[]; answer: string }
const CHEM_1A: Course = { course: 'Chem 1A', set: 'Problem set 4: molecular shape', due: 'Due Friday, 11:59 PM', side: ['Week 5', 'VSEPR, the slides', 'Problem set 4', 'Lab 3: models', 'Quiz 2'], current: 2,
  qs: ['Draw the Lewis structure of NH₃.', 'How many electron groups does the O in H₂O have?', 'Explain why H₂O is bent while CO₂ is linear.', 'Which is polar, H₂O or CO₂? Explain.'], answer: 'Water is bent because' }
/** The staged O-chem worksheet, its questions from app/recall/staged.ts (A and B done, question 3 next). */
const CHEM_3B: Course = { course: 'Chem 3B', set: 'Worksheet 7: unknowns from IR and NMR', due: 'Due Monday, 9:00 AM', side: ['Week 7', 'IR and NMR, the slides', 'Worksheet 7', 'Lab 5', 'Exam 2 review'], current: 2,
  qs: ['Molecule A, C₅H₁₀O: name it from its IR and NMR.', 'Molecule B, C₄H₈O₂, with a broad IR band around 3000: name it.', 'Draw the Fischer esterification mechanism for butanoic acid with ethanol.'], answer: '' }
function Homework({ c }: { c: Course }) {
  const qs = c.qs
  return (
    <div style={{ width: 1512, height: 982, background: 'var(--surface-page)', display: 'grid', gridTemplateRows: '56px 1fr', font: '400 17px/1.5 var(--font-head)', color: 'var(--ink)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 28px', borderBottom: '1px solid var(--silver-200)' }}>
        <b style={{ font: '700 17px var(--font-head)' }}>{c.course}</b><span style={{ color: 'var(--text-muted)' }}>{c.set}</span>
        <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>{c.due}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
        <div style={{ borderRight: '1px solid var(--silver-200)', padding: '24px 22px', display: 'grid', alignContent: 'start', gap: 10, color: 'var(--text-secondary)' }}>
          {c.side.map((t, i) => <span key={t} style={{ color: i === 0 || i === 2 ? 'var(--ink)' : undefined, fontWeight: i === 0 ? 700 : i === 2 ? 600 : 400 }}>{t}</span>)}
        </div>
        <div style={{ padding: '40px 64px', maxWidth: 760 }}>
          <div style={{ font: '700 36px/1.1 var(--font-head)', letterSpacing: '-0.02em', marginBottom: 28 }}>{c.set.split(':')[0]}</div>
          {qs.map((q, i) => (
            <div key={i} style={{ padding: '16px 18px', borderRadius: 12, marginBottom: 12, background: i === c.current ? 'var(--pollen-50)' : 'transparent', boxShadow: i === c.current ? 'inset 0 0 0 1px var(--pollen-200)' : 'none' }}>
              <b>{i + 1}.</b> {q}
              {i === c.current && <div style={{ marginTop: 12, minHeight: 90, borderRadius: 10, background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--silver-300)', padding: '10px 14px', color: 'var(--text-secondary)' }}>{c.answer}<span style={{ borderLeft: '2px solid var(--ink)', marginLeft: 2 }} /></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** A screen, shrunk to fit the preview: rendered at full size, then scaled to its box. */
function Mini({ children, w = 1512 }: { children: ReactNode; w?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [sc, setSc] = useState(0.17)
  useLayoutEffect(() => { const box = ref.current?.parentElement; if (box) setSc(box.clientWidth / w) }, [w])
  return <div ref={ref} style={{ width: w, transform: `scale(${sc})`, transformOrigin: '0 0', pointerEvents: 'none' }}>{children}</div>
}
/** Stand-ins for the screens the staged lamp and critique sessions were on (staged.ts names them; nothing was ever captured). */
function AppShot({ app, children }: { app: string; children: ReactNode }) {
  return (
    <div style={{ width: 1000, height: 625, background: 'var(--silver-50)', display: 'grid', gridTemplateRows: '64px 1fr', font: '500 26px var(--font-head)', color: 'var(--text-muted)' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 28px', borderBottom: '2px solid var(--silver-200)', background: 'var(--surface-page)' }}>{app}</div>
      <svg viewBox="0 0 1000 560" style={{ display: 'block' }}>{children}</svg>
    </div>
  )
}
const LAMP = (
  <AppShot app="Autodesk Fusion · desk-lamp v4">
    <g fill="none" stroke="var(--silver-500)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="380" cy="470" rx="150" ry="34" /><path d="M380 450L470 250L640 200" /><circle cx="470" cy="250" r="12" />
      <path d="M640 200L700 150L760 300L560 330Z" /><path d="M610 320L740 300" strokeDasharray="10 10" />
    </g>
  </AppShot>
)
const SCREENS = (
  <AppShot app="Figma · Habit app onboarding v3">
    {[0, 1, 2].map((i) => <g key={i} transform={`translate(${130 + i * 270} 40)`} fill="none" stroke="var(--silver-500)" strokeWidth="4">
      <rect width="200" height="420" rx="26" /><rect x="30" y="350" width="140" height="40" rx="20" fill="var(--silver-300)" stroke="none" />
      <path d="M40 220h120M40 250h90" />{i === 0 && <circle cx="100" cy="130" r="48" />}
    </g>)}
  </AppShot>
)
/** The staged projects, word for word from app/recall/staged.ts: the north star, the last stop, the moment it stopped on (the
    words he said and Blicky's reply in that session), the next step, and the earlier stops. */
const STAGED: { name: string; tab: string; title: string; north: string; last: { day: string; text: string }; next: string; earlier: { day: string; text: string }[]; peek: Peek }[] = [
  { name: 'O-chem worksheet', tab: 'o-chem', title: 'O-chem worksheet', north: 'solve every unknown on the worksheet and be able to explain each step on the exam',
    last: { day: 'FRI', text: 'Molecule B: butanoic acid, confirmed by the 12 ppm singlet' }, next: 'question 3: the Fischer esterification mechanism for butanoic acid with ethanol',
    earlier: [{ day: 'THU', text: 'Molecule A solved: 3-pentanone' }, { day: 'WED', text: 'Molecule A: one degree of unsaturation, and the 1715 cm⁻¹ IR peak makes it a ketone' }],
    peek: { shot: <Mini><Homework c={{ ...CHEM_3B, current: 1 }} /></Mini>, where: 'FRI 3:32 PM · chem3b-worksheet-7, question 2',
      said: 'molecule B has the broad thing at 3000 and a peak at 1710, ester or acid', reply: 'the broad band from 2500 to 3300 is an O–H, so it’s the acid, not the ester; the 1710 is its C=O.' } },
  { name: 'Desk lamp', tab: 'desk lamp', title: 'Desk lamp in Fusion 360', north: 'a printable desk lamp: base, two-link arm and shade, exported as STLs that fit the printer bed',
    last: { day: 'FRI', text: 'Shade shelled at 1.5 mm; elbow joint limited to 0–110°' }, next: 'cut a 5 mm wire channel down the upper link, then export the STLs',
    earlier: [{ day: 'THU', text: 'Both arm links modeled, the elbow hole at 6.4 mm' }, { day: 'WED', text: 'Base revolved and filleted' }],
    peek: { shot: <Mini w={1000}>{LAMP}</Mini>, where: 'FRI 11:03 AM · desk-lamp v4 (a stand-in: nothing was captured)',
      said: 'how do i make the shade light, it’s solid right now', reply: 'shell it: revolve the cone, then Shell at 1.5 mm with the bottom face open.' } },
  { name: 'Onboarding critique', tab: 'onboarding', title: 'Onboarding critique', north: 'a short, kind critique with the three changes that matter most, ready for Monday’s design review',
    last: { day: 'FRI', text: 'Critique written for screens 1 to 3' }, next: 'write the one-paragraph summary for Monday’s design review and pick two screenshots to attach',
    earlier: [{ day: 'THU', text: 'Decided on three onboarding screens' }],
    peek: { shot: <Mini w={1000}>{SCREENS}</Mini>, where: 'FRI 6:32 PM · Habit app onboarding v3 (a stand-in: nothing was captured)',
      said: 'the mascot is cute but its on every screen', reply: 'keep it on the welcome screen only; on the goal picker it pulls the eye away from the choices.' } },
]
/** Pickle's pages: one per project. */
const PICKLE: PlanPage[] = STAGED.map((p) => ({ title: p.title, working: `${p.name}…`, north: p.north, last: p.last, next: p.next, earlier: p.earlier, peek: p.peek }))
/** The blue tabs, one per project, each holding its next step for the hover card. */
const PROJECTS: Project[] = STAGED.map((p, i) => ({ name: p.tab, felt: ['surface-felt', 'surface-felt-sky', 'surface-felt-sage'][i], ink: i === 0 ? 'on-dark' : 'ink',
  state: i === 0 ? 'running' : 'idle', north: p.north, next: p.next }))

/** Blicky's scratchpad pages, from the staged worksheet sessions (app/recall/staged.ts, every word by "test"): what it was on,
    what it completed and why, the sources the content came from (the screen, his words, his rule, a note and his reaction to
    it, word for word), the scratch, and what's next. No dates. */
const SCRATCH: ScratchPage[] = [
  { working: 'Molecule B…', title: 'Molecule B is the acid', on: 'question 2: molecule B, C₄H₈O₂, with a broad IR band around 3000',
    done: 'named molecule B: butanoic acid, not the ester', context: 'the broad O–H band from 2500 to 3300 cm⁻¹ rules out the ester, and the 12 ppm singlet is the COOH',
    sources: [
      { kind: 'screen', label: 'worksheet 7, question 2', detail: 'its IR and NMR spectra' },
      { kind: 'words', label: 'what you said', detail: '“molecule B has the broad thing at 3000 and a peak at 1710, ester or acid”' },
      { kind: 'rule', label: 'your rule', detail: 'degrees of unsaturation first, before the NMR' },
      { kind: 'note', label: 'note: resonance in the carboxylate', detail: 'you said: “only the one that matters”' }],
    sketches: [{ kind: 'ir', label: 'broad O–H, sharp C=O' }, { kind: 'acid', label: 'butanoic acid' }],
    next: 'question 3: the Fischer esterification mechanism for butanoic acid with ethanol' },
  { working: 'Molecule A…', title: 'Molecule A is 3-pentanone', on: 'question 1: molecule A, C₅H₁₀O, its NMR',
    done: 'solved molecule A: 3-pentanone', context: 'only two NMR signals because it’s symmetric, an ethyl on each side of the C=O',
    sources: [
      { kind: 'screen', label: 'worksheet 7, question 1', detail: 'the quartet at 2.4 and the triplet at 1.0' },
      { kind: 'words', label: 'what you said', detail: '“the quartet at 2.4 and triplet at 1.0 thats an ethyl right”' },
      { kind: 'note', label: 'note: splitting, the n+1 rule', detail: 'you said: “ok the n+1 thing finally clicked”' }],
    sketches: [{ kind: 'split', label: 'n + 1' }, { kind: 'ketone', label: '3-pentanone' }],
    next: 'question 2: molecule B, C₄H₈O₂, with a broad IR band around 3000' },
]

/** The two finals, one template (his words 2026-10-24: "ok lets move the note pads to final. I want ot start with taking the moss
    green one with the pickje sticker on top. and in fact, when the notepad it open, the picjke on the cursor should move to it…
    Then give it the metal border so it has a metal shine the moss on top and the noraml paper tone thing current", then "take
    the same template but add the blue felt texture to it, and utilzie the scartch pad look… the picjle pad is the standard, and
    then in the blue one, its blickys scratchpad… these two will be the final two examples").
    It opens on the worksheet: the pad rises in, the character leaves the cursor and flies up onto the pad, lands as the sticker,
    then the page is written. Blicky's border turns to clear glass with a running catch while it writes. */
function FinalPad({ who }: { who: Who }) {
  const blicky = who === 'blicky'
  const d = useDialKit(blicky ? 'Blicky’s scratchpad' : 'Pickle’s notepad', {
    page: { type: 'select', options: blicky ? ['molecule B', 'molecule A'] : ['o-chem', 'desk lamp', 'onboarding'], default: blicky ? 'molecule B' : 'o-chem' },
    edge: { type: 'select', options: ['bezel', 'mix', 'glass'], default: 'bezel' }, sheet: { type: 'select', options: ['paper', 'grid', 'satin'], default: blicky ? 'grid' : 'paper' },
    glint: blicky, flight: [0.8, 0.3, 2, 0.05], arc: [170, 0, 400, 5], stagger: [1, 0, 3, 0.05], mossSeed: [MOSS_DEFAULT.seed, 1, 40, 1], mossGrain: [MOSS_DEFAULT.grain, 5, 30, 1],
  })
  const pages: AnyPage[] = blicky ? SCRATCH : PICKLE
  const [run, setRun] = useState(0)
  const [landed, setLanded] = useState(false), [flying, setFlying] = useState(false)
  const [page, setPage] = useState(0)
  useEffect(() => { setPage(blicky ? ['molecule B', 'molecule A'].indexOf(d.page) : PROJECTS.findIndex((p) => p.name === d.page)); setRun((r) => r + 1) }, [d.page])
  const stage = useRef<HTMLDivElement>(null), pad = useRef<HTMLDivElement>(null), flier = useRef<HTMLDivElement>(null)
  const CUR = { x: 560, y: 470 }, W = 390, H = 680, SW = 1512, SH = 982, s = 0.8
  useGSAP(() => {
    setLanded(false); setFlying(false)
    if (!pad.current || !flier.current || !stage.current) return
    gsap.fromTo(pad.current, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.36, ease: 'power3.out' })   // the pad opens
    const from = { x: CUR.x + 16, y: CUR.y + 16 }, at = { x: from.x, y: from.y }, o = { t: 0 }
    let to = from, c = from, grow = 1
    gsap.set(flier.current, { x: from.x, y: from.y, rotation: 0, scale: 1, autoAlpha: 1 })
    gsap.to(o, { t: 1, duration: d.flight, delay: 0.45, ease: 'power2.inOut',
      onStart: () => {                                                         // where the sticker sits, now the pad is in place
        setFlying(true)
        const st = stage.current!.getBoundingClientRect(), el = pad.current!.querySelector('[data-sticker]')!.getBoundingClientRect(), sc = st.width / SW
        to = { x: (el.left - st.left) / sc + 6, y: (el.top - st.top) / sc + 4 }
        c = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - d.arc }
        grow = (el.height / sc) / (blicky ? 70 : 62)
      },
      onUpdate: () => {
        const t = o.t
        at.x = (1 - t) ** 2 * from.x + 2 * (1 - t) * t * c.x + t * t * to.x
        at.y = (1 - t) ** 2 * from.y + 2 * (1 - t) * t * c.y + t * t * to.y
        gsap.set(flier.current, { x: at.x, y: at.y, rotation: -14 * Math.sin(t * Math.PI) + 12 * t, scale: 1 + (grow - 1) * t })
      },
      onComplete: () => { gsap.set(flier.current, { autoAlpha: 0 }); setLanded(true) },
    })
  }, { dependencies: [run] })
  const pick = (name: string) => { const i = PROJECTS.findIndex((p) => p.name === name); if (i >= 0) setPage(i) }
  return (
    <div style={{ padding: 20, background: 'var(--silver-300)', minHeight: '100vh', boxSizing: 'border-box' }}>
      <button onClick={() => setRun((r) => r + 1)} style={{ marginBottom: 12, height: 32, padding: '0 14px', borderRadius: 10, border: 0, cursor: 'pointer',
        background: 'var(--surface-page)', boxShadow: 'inset 0 0 0 1px var(--silver-300)', font: '600 13px var(--font-head)' }}>Open it again</button>
      <div style={{ width: SW * s, height: SH * s, position: 'relative', overflow: 'hidden', borderRadius: 14 }}>
        <div ref={stage} style={{ width: SW, height: SH, transform: `scale(${s})`, transformOrigin: '0 0', position: 'absolute', inset: 0 }}>
          <Homework c={blicky ? { ...CHEM_3B, current: page === 1 ? 0 : 1 } : CHEM_3B} />
          <div ref={pad} key={run} style={{ position: 'absolute', right: 260, bottom: 24 }}>
            <NotesPad who={who} pages={pages} page={page} writing start={landed} surface={d.edge as PadSurface} sheet={d.sheet as 'paper' | 'grid' | 'satin'} glint={d.glint}
              binding={blicky ? 'felt' : 'moss'} moss={blicky ? { ...MOSS_DEFAULT, on: false } : { ...MOSS_DEFAULT, seed: d.mossSeed, grain: d.mossGrain }}
              sticker={landed ? true : 'hidden'} stagger={d.stagger} load={!blicky} grass
              projects={blicky ? undefined : PROJECTS} lead={blicky ? undefined : 'plan'} onPick={blicky ? undefined : pick} width={W} height={H} />
          </div>
          <div style={{ position: 'absolute', left: CUR.x, top: CUR.y }}><Cursor size={26} /></div>
          {/* the character at the cursor, the one that flies to the pad */}
          <div ref={flier} style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '30% 40%' }}>
            {blicky ? <BlickyLive state={flying ? 'dragged' : 'listening'} height={56} /> : <PickleLive state={flying ? 'dragged' : 'listening'} height={56} />}
          </div>
        </div>
      </div>
    </div>
  )
}

/** The page: pick a pad, replay it, tune it with the dials. */
export function Notepads() {
  const [who, setWho] = useState<Who>(new URLSearchParams(location.search).get('notepads') === 'blicky' ? 'blicky' : 'pickle')
  return (
    <>
      <div style={{ position: 'fixed', left: 20, top: 20, zIndex: 10, display: 'flex', gap: 6 }}>
        {(['pickle', 'blicky'] as Who[]).map((w) => (
          <button key={w} onClick={() => setWho(w)} style={{ height: 32, padding: '0 14px', borderRadius: 10, border: 0, cursor: 'pointer', font: '600 13px var(--font-head)',
            background: who === w ? 'var(--ink)' : 'var(--surface-page)', color: who === w ? 'var(--text-on-dark)' : 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--silver-300)' }}>
            {w === 'pickle' ? 'Pickle’s notepad' : 'Blicky’s scratchpad'}</button>
        ))}
      </div>
      <div style={{ paddingTop: 40 }}><FinalPad key={who} who={who} /></div>
      <div className="no-print"><DialRoot position="bottom-right" defaultOpen={false} productionEnabled /></div>
    </>
  )
}
