import type { ComponentType, ReactNode } from 'react'
import { Banner, Bars, Card, Flow, Key, Logo, Meter, Stat, Tray } from '@design/ui/kit'
import { Pickle, Say } from '@design/cast/Cast'
import { Cursor } from '@design/stage/Cursor'
import { Surface } from '@design/material/Surface'
import { Chrome, Code, D, M, Opener, Page, Redline, Rule, span } from './frame'
import { ColourOpener, Cover } from './slides-a'

const K = D.scale

/** A small card in the product: title is the state, a line in the second voice, the meter and the time at the foot. */
export function StateCard({ title, line, value, accent = 'var(--text-muted)', lifted = false, catchAt, time, w = 300, h = 210 }: { title: string; line?: ReactNode; value: number; accent?: string; lifted?: boolean; catchAt?: number; time: string; w?: number; h?: number }) {
  return (
    <Card width={w} height={h} lifted={lifted} scale={1.25}>
      <div style={{ font: '600 30px/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>{title}</div>
      {line && <div style={{ font: '400 20px/1.35 var(--font-second)', color: 'var(--text-secondary)' }}>{line}</div>}
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Meter value={value} accent={accent} outlined={lifted} catchAt={catchAt} scale={1.1} />
        <span style={{ font: '400 18px var(--font-pixel)' }}>{time}</span>
      </div>
    </Card>
  )
}

/** A real-looking window: the editor with this repo's own tokens file in it (no placeholder text). */
export function Editor({ w, h }: { w: number; h: number }) {
  const lines = ["const SOURCE = {", "  palettes: {", "    silver: { note: 'the one neutral: metal, chrome, concrete' },", "    moss:   { note: 'living moss: life green, not olive' },",
    "  },", "  semantic: {", "    'surface-felt': 'forest-800',", "    'catch': 'amber-400',", "    'stuck': 'ember-600',", "  },", "}"]
  return (
    <div style={{ width: w, height: h, borderRadius: 14, background: 'var(--silver-950)', overflow: 'hidden' }}>
      <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: 'var(--silver-900)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <i key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />)}
        <span style={{ font: '400 14px var(--font-head)', color: 'var(--silver-400)', marginLeft: 12 }}>design/tools/tokens.mjs</span>
      </div>
      <pre style={{ margin: 0, padding: '16px 20px', font: '15px/1.7 var(--font-mono)', color: 'var(--silver-200)' }}>{lines.join('\n')}</pre>
    </div>
  )
}

// ---- 10 · UX patterns ---------------------------------------------------------------------------------------------------
export const UXOpener = () => <Opener num="10" name="UX patterns" seed={7.7} lede="At your cursor. Small, at the bottom right." />

export function UXScreen() {
  return (
    <Page title="It rides your cursor and opens at the bottom right">
      <div style={{ position: 'relative', width: 1280, height: 640, borderRadius: 29, overflow: 'hidden', background: 'linear-gradient(165deg, var(--silver-200), var(--silver-300))' }}>
        <div style={{ position: 'absolute', left: 60, top: 50 }}><Editor w={760} h={480} /></div>
        <div style={{ position: 'absolute', left: 520, top: 230 }}><Cursor size={34} /><div style={{ position: 'absolute', left: 24, top: 26 }}><Pickle pose="listen" height={70} /></div></div>
        <div style={{ position: 'absolute', right: 40, bottom: 40 }}><StateCard title="Heard you" line="make the tokens file shorter" value={4} accent="var(--pickle)" lifted time="12:20" w={380} h={200} /></div>
      </div>
      <div style={{ position: 'absolute', left: 1340, top: 40, display: 'grid', gap: 36, width: span(3) }}>
        <Rule lead="Shake to wake." />
        <Rule lead="Sleep with 4 keys."><span style={{ display: 'inline-flex', gap: 6, marginTop: 10, zoom: 1.3 }}><Key>⌃</Key><Key>⌥</Key><Key>⌘</Key><Key>P</Key></span></Rule>
      </div>
    </Page>
  )
}

export function UXStates() {
  const states = [['Asleep', 0, 'var(--text-muted)', '11:40'], ['Listening', 2, 'var(--state-listening)', '12:20'], ['Heard you', 4, 'var(--pickle)', '12:20'], ['Working', 7, 'var(--text-muted)', '12:21'], ['Checked', 10, 'var(--checked)', '12:24']] as const
  return (
    <Page title="State is said in words">
      <Tray width={1728} height={330} scale={K} layout={{ alignItems: 'center', gap: 24 }}>
        {states.map(([t, v, a, time], i) => <StateCard key={t} title={t} value={v} accent={a} lifted={i === 2} time={time} w={300} h={220} />)}
      </Tray>
    </Page>
  )
}

export function UXCatch() {
  return (
    <Page title="Amber means a catch">
      <div style={{ display: 'flex', gap: 100, alignItems: 'center' }}>
        <Card width={820} height={420} scale={K} lifted>
          <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>Caught one</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 6 }}>
            <div><div style={{ font: '400 18px var(--font-head)', color: 'var(--text-muted)' }}>You said</div><div style={{ font: 'var(--t-second-2)', marginTop: 6 }}>ship Friday</div></div>
            <div><div style={{ font: '400 18px var(--font-head)', color: 'var(--text-muted)' }}>api-auth holds</div><div style={{ font: 'var(--t-second-2)', marginTop: 6 }}>draft Friday</div></div>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Meter value={6} accent="var(--text-muted)" catchAt={5} scale={K} /><span style={{ font: 'var(--t-pixel-3)' }}>12:18</span></div>
        </Card>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}><Pickle pose="listen" height={260} /><Say size={30}>which one?</Say></div>
      </div>
    </Page>
  )
}

// ---- 11 · data and diagrams ---------------------------------------------------------------------------------------------
export const DataOpener = () => <Opener num="11" name="Data and diagrams" seed={10.4} felt="sage" lede="Real numbers, each with its source." />

export function DataStatus() {
  return (
    <Page title="14 pieces work on their own">
      <Bars width={1300} scale={1.3} source="docs/STATUS.md, 24 October 01:42" rows={[
        { label: 'Works alone', value: 14, display: '14', note: 'C1, C2, C4–C12, C14, C15, C17' },
        { label: 'Research merged', value: 10, display: '10', note: 'R1–R10' },
        { label: 'Building', value: 3, display: '3', note: 'C3 voice, C18 memory, J1 talk' },
        { label: 'Not started', value: 1, display: '1', note: 'C13 onboarding flow' },
        { label: 'Cut', value: 1, display: '1', note: 'C16 voice bake-off (Cartesia, decided)' },
      ]} />
    </Page>
  )
}

export function DataSpeed() {
  return (
    <Page title="Seeing the screen takes milliseconds">
      <Bars width={1400} scale={1.3} source="docs/SPEC.md M3, M4 and docs/STATUS.md C4, C5; upper bounds of each measured range" rows={[
        { label: 'Boxes on a frame', value: 25, display: '25 ms', note: 'screenpipe elements, 3–25 ms (SPEC M4)' },
        { label: 'The newest frame', value: 42, display: '42 ms', note: 'C4, re-run by the lead 23:21' },
        { label: 'Text search', value: 190, display: '190 ms', note: 'full-text search, 15–190 ms (SPEC M3)' },
        { label: 'Reading a frame', value: 490, display: '490 ms', note: 'OCR on demand, 0.37–0.49 s (SPEC M4)' },
        { label: 'Finding an earlier moment', value: 1600, display: '1.6 s', note: 'C5, 0.2–1.6 s for 5 test phrases' },
      ]} />
    </Page>
  )
}

export function DataFlow() {
  return (
    <Page title="The moment, step by step">
      <div style={{ marginTop: 60 }}>
        <Flow scale={1.05} steps={[
          { label: 'You say it', value: '99.5%', id: 'C2' }, { label: 'Now or earlier?', value: '9 of 9', id: 'C6' },
          { label: 'The right moment', value: '42 ms', id: 'C4' }, { label: 'Where it is', value: '9 of 10', id: 'C7' }, { label: 'Blicky draws', value: '1 pt', id: 'C8' },
        ]} footnote="Measured in docs/STATUS.md: capture C2, the check C6, the frame C4, boxes at IoU ≥ 0.9 C7, Blicky's box within 1 pt C8." />
      </div>
    </Page>
  )
}

// ---- 12 · building a deck -----------------------------------------------------------------------------------------------
/** Any slide, rendered small and live. */
export function Mini({ C, s = 0.24, bg = 'var(--surface-ground)', dark = false }: { C: ComponentType; s?: number; bg?: string; dark?: boolean }) {
  return (
    <div style={{ width: 1920 * s, height: 1080 * s, overflow: 'hidden', position: 'relative', borderRadius: 10, flex: 'none' }}>
      <div style={{ width: 1920, height: 1080, transform: `scale(${s})`, transformOrigin: '0 0', position: 'absolute', background: bg, color: dark ? 'var(--text-on-dark)' : 'var(--ink)' }}>
        <C /><Chrome n={1} total={1} dark={dark} />
      </div>
    </div>
  )
}

export const DeckOpener = () => <Opener num="12" name="Building a deck" seed={1.9} lede="Start from a template. Keep the grid. Import the kit." />

export function DeckBanners() {
  return (
    <Page title="Banners vary by seed">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
        {[[2.3, 'forest'], [14.1, 'sky'], [6.6, 'forest'], [21.7, 'sage']].map(([s, f]) => <Banner key={String(s)} seed={Number(s)} width={850} height={300} felt={f as 'forest'} />)}
      </div>
    </Page>
  )
}

export function NumbersExample() {
  return (
    <Page title="It sees the screen in 42 ms">
      <div style={{ display: 'flex', gap: 150, alignItems: 'flex-end', marginTop: 80 }}>
        <Stat value="42ms" caption="The newest frame. STATUS C4." size="var(--deck-giant)" />
        <Stat value="9/9" caption="Now or earlier. C6." size="var(--deck-giant)" />
        <Stat value="10/10" caption="Shakes caught. C1." size="var(--deck-giant)" />
      </div>
    </Page>
  )
}
function ContentExample() {
  return (
    <Page title="Every session keeps the sentence that started it">
      <Tray width={1728} height={420} scale={K} layout={{ alignItems: 'center', gap: 32 }}>
        <StateCard title="Heard you" line="make the header sticky" value={7} accent="var(--pickle)" lifted time="12:20" w={520} h={320} />
        <StateCard title="Working" line="fix the login redirect" value={5} time="12:18" w={520} h={320} />
        <StateCard title="Checked" line="rename the docs folder" value={10} accent="var(--checked)" time="12:02" w={520} h={320} />
      </Tray>
    </Page>
  )
}

export function DeckTemplates() {
  const t = [[Cover, 'Title', 'var(--surface-felt)', true], [ColourOpener, 'Chapter', 'var(--surface-ground)', true], [ContentExample, 'Content', 'var(--surface-ground)', false],
    [NumbersExample, 'Numbers', 'var(--surface-ground)', false], [UXScreen, 'Moment', 'var(--surface-ground)', false]] as const
  return (
    <Page title="Start from 5 templates">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: '26px 40px', justifyContent: 'start' }}>
        {t.map(([C, name, bg, dark]) => <div key={name}><Mini C={C} s={0.235} bg={bg} dark={dark} /><div style={{ marginTop: 10, font: '600 20px var(--font-head)' }}>{name}</div></div>)}
      </div>
    </Page>
  )
}

export function DeckAnatomy() {
  return (
    <Page title="Every slide reads in the same order">
      <div style={{ display: 'flex', gap: 110, alignItems: 'flex-start' }}>
        <div style={{ position: 'relative' }}>
          <Mini C={UXCatch} s={0.5} />
          <Redline x1={-24} y1={85} x2={-24} y2={128} label="1" side="left" />
          <Redline x1={-24} y1={160} x2={-24} y2={432} label="2" side="left" />
        </div>
        <div style={{ display: 'grid', gap: 30, maxWidth: span(3) }}>
          <Rule lead="1 · The title.">A sentence with a verb.</Rule>
          <Rule lead="2 · The hero.">The real thing.</Rule>
          <Rule lead="Then, rarely, a line.">Only if it adds something.</Rule>
        </div>
      </div>
    </Page>
  )
}

export function DeckCode() {
  return (
    <Page title="Import the system, don’t restyle it">
      <div style={{ display: 'flex', gap: 70, alignItems: 'flex-start' }}>
        <Code style={{ width: span(7) }}>{`import { Surface } from '@design/material/Surface'
import { Banner, Card, Tray, Bars } from '@design/ui/kit'
import { Pickle, Say } from '@design/cast/Cast'
import { Page } from './frame'

export function MySlide() {
  return (
    <Page title="Felt holds things">
      <Tray width={1728} height={420} scale={1.6}>
        <Card width={520} height={320} scale={1.6} lifted>…</Card>
      </Tray>
    </Page>
  )
}`}</Code>
        <div style={{ display: 'grid', gap: 34, maxWidth: span(4) }}>
          <Rule lead="npm run dev">The book at 127.0.0.1:5320.</Rule>
          <Rule lead="?lab">The materials lab.</Rule>
          <Rule lead="npm run pdf">1 page a slide.</Rule>
        </div>
      </div>
    </Page>
  )
}

// ---- 13 · what we never do ----------------------------------------------------------------------------------------------
export const NEVER: [string, string][] = [
  ['Coloured stripes on cards.', 'Colour lives in the cast and the meter.'],
  ['Borders around every block.', 'Grounds, felt and metal separate things.'],
  ['Coloured italic for accent.', 'Weight and size make emphasis.'],
  ['A label above every heading.', 'The title stands alone.'],
  ['Badges and dots that mean nothing.', 'State is a word in the title.'],
  ['Monospace labels and inputs.', 'Mono is code; pixel is the machine.'],
  ['Numbers written as words.', 'Numerals, in Geist Pixel.'],
  ['Long titles full of nouns.', 'A short sentence with a verb.'],
  ['Emoji as icons.', 'The drawn cast and hand-drawn marks.'],
  ['Placeholders for logos and images.', 'Real drawings, real screens.'],
  ['Overstuffed screens.', '1 hero a slide.'],
  ['Visual metaphors explained with labels.', 'Change the picture instead.'],
  ['Demos made of text.', 'Show it, live.'],
  ['Glass cards.', 'Brushed metal and felt.'],
  ['The same radius and shadow on everything.', 'The radius chain; 4 heights.'],
  ['Light grey text on white.', 'Body 8.7:1, captions 5.9:1.'],
  ['Motion with nothing to say.', 'Steps, springs, or nothing.'],
  ['Heavy appear animations.', 'Nothing animates in.'],
  ['Purple gradients.', 'Brushed metal is the only gradient.'],
  ['Glow, neon and grid lines on dark.', 'Forest felt and night, calm.'],
  ['Proof nobody can check.', 'Every number names its source.'],
]
function NeverPage({ from, to }: { from: number; to: number }) {
  return (
    <Page title={from === 0 ? '21 things we never do' : 'The other 11'}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px 90px', maxWidth: span(12) }}>
        {NEVER.slice(from, to).map(([sign, instead], i) => (
          <div key={sign} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 10 }}>
            <span style={{ font: '400 28px/1.2 var(--font-pixel)', color: 'var(--text-muted)' }}>{from + i + 1}</span>
            <div><div style={{ font: '600 24px/1.3 var(--font-head)', letterSpacing: '-0.01em' }}>{sign}</div><div style={{ font: 'var(--t-second-4)', color: 'var(--text-secondary)', marginTop: 4 }}>{instead}</div></div>
          </div>
        ))}
      </div>
    </Page>
  )
}
export const Never1 = () => <NeverPage from={0} to={10} />
export const Never2 = () => <NeverPage from={10} to={21} />

export function Back() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, bottom: 150, color: 'var(--text-on-dark)' }}>
        <div style={{ font: '700 var(--deck-hero)/1 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>pickje sees what you mean.</div>
        <p style={{ margin: '30px 0 0', font: 'var(--t-second-3)', color: 'var(--text-on-dark-muted)', lineHeight: 1.7 }}>
          design/BRAND.md<br />design/tools/tokens.mjs<br />design/src/ui/kit
        </p>
      </div>
      <div style={{ position: 'absolute', right: 160, top: 160 }}><Logo kind="moss" h={300} tone="on-dark" /></div>
    </>
  )
}
