import { useEffect, useState } from 'react'
import { tokens } from '@design/tokens'
import { Band, Button, Card, Key, Meter, Printed, Stat, Toggle, Tray } from '@design/ui/kit'
import { Pickle, Blicky, Say, type Pose } from '@design/cast/Cast'
import { PickleFace } from '@design/cast/PickleFace'
import { Cursor } from '@design/stage/Cursor'
import { D, DoDont, Fig, Opener, Page, Redline, Rule, span } from './frame'

const K = D.scale
const useTick = (ms: number) => { const [t, setT] = useState(0); useEffect(() => { const id = setInterval(() => setT((x) => x + 1), ms); return () => clearInterval(id) }, [ms]); return t }

// ---- 07 · the cast ------------------------------------------------------------------------------------------------------
export const CastOpener = () => <Opener num="07" name="The cast" seed={4.8} felt="sky" lede="Pickle keeps the context. Blicky sketches and talks." />

export function CastDrawn() {
  return (
    <Page title="Import the cast, never redraw it">
      <div style={{ display: 'flex', gap: 110, alignItems: 'flex-end', justifyContent: 'center' }}>
        <Pickle height={520} />
        <Blicky height={300} />
        <PickleFace height={520} mode="loop" />
      </div>
    </Page>
  )
}

const PICKLE_DOES: [Pose, string][] = [['wave', 'says hi'], ['listen', 'listens'], ['point', 'shows you'], ['cheer', 'got it'], ['dazed', 'just woke'], ['asleep', 'asleep']]
const BLICKY_DOES: [Pose, string][] = [['wave', 'says hi'], ['sketch', 'sketches'], ['listen', 'listens'], ['cheer', 'got it'], ['dazed', 'just woke'], ['asleep', 'asleep']]
export function CastDoes() {
  const row = (who: 'pickle' | 'blicky', items: [Pose, string][]) => (
    <div style={{ display: 'flex', gap: 54, alignItems: 'flex-end' }}>
      {items.map(([p, w]) => (
        <div key={p} style={{ display: 'grid', justifyItems: 'center', gap: 14 }}>
          {who === 'pickle' ? <Pickle pose={p} height={230} /> : <Blicky pose={p} height={140} />}
          <span style={{ font: 'var(--t-second-4)', color: 'var(--text-secondary)' }}>{w}</span>
        </div>
      ))}
    </div>
  )
  return (
    <Page title="Everything they can do">
      <div style={{ display: 'grid', gap: 56 }}>{row('pickle', PICKLE_DOES)}{row('blicky', BLICKY_DOES)}</div>
    </Page>
  )
}

export function CastLooks() {
  return (
    <Page title="Drawn, sticker or traced">
      <div style={{ display: 'flex', gap: 90, alignItems: 'flex-end' }}>
        <Fig caption="Drawn: in the product"><div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}><Pickle pose="wave" height={340} /><Blicky height={190} /></div></Fig>
        <Fig caption="Sticker: anywhere it’s stuck on"><div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', transform: 'rotate(-5deg)' }}><Pickle pose="wave" look="sticker" height={340} /><Blicky look="sticker" height={190} /></div></Fig>
        <Fig caption="Traced: banners and backgrounds"><div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}><Pickle look="traced" pose="point" height={340} /><Blicky look="traced" pose="sketch" height={190} /></div></Fig>
      </div>
    </Page>
  )
}

export function CastSpeaks() {
  const t = useTick(4200)
  return (
    <Page title="They speak and print in dots">
      <div style={{ display: 'grid', gap: 56 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 30 }}>
          <Pickle pose="wave" height={260} /><Say size={40}>yo! what should i call you?</Say>
        </div>
        <div style={{ display: 'grid', gap: 18 }}>
          <Printed key={t} text="12:20 api-auth · waiting on you" size={64} wear={0.45} play />
          <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
            {[0, 0.45, 0.9].map((w) => <Printed key={w} text="kept 8" size={44} wear={w} block={w > 0.8 ? 3 : 2} />)}
          </div>
        </div>
      </div>
    </Page>
  )
}

// ---- 08 · motion --------------------------------------------------------------------------------------------------------
export const MotionOpener = () => <Opener num="08" name="Motion" seed={9.9} lede="Steps for machines, springs for the living." />

function PressLoop() {
  const t = useTick(1000)
  return <div style={{ zoom: 1.8, transform: t % 2 ? 'translateY(1px) scale(0.985)' : 'none', transition: `transform ${tokens.motion.ms.hitStop}ms var(--ease-out)` }}><Button>Keep it</Button></div>
}
function SwapLoop() {
  const t = useTick(1200)
  const opts = ['lime', 'sky', 'none'] as const
  return <div style={{ zoom: 1.6 }}><Toggle options={opts} value={opts[t % 3]} onChange={() => {}} /></div>
}
export function MotionTimings() {
  const t = useTick(1800)
  const ms = tokens.motion.ms
  const col = (v: number, use: string, el: React.ReactNode) => (
    <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
      <div style={{ height: 110, display: 'grid', alignItems: 'center' }}>{el}</div>
      <div style={{ font: '400 var(--deck-hero)/1 var(--font-pixel)' }}>{v}<span style={{ font: '400 28px var(--font-head)', color: 'var(--text-muted)', marginLeft: 8 }}>ms</span></div>
      <div style={{ font: 'var(--t-head-4)', color: 'var(--text-secondary)' }}>{use}</div>
    </div>
  )
  return (
    <Page title="4 numbers set the rhythm">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: D.gutter * 2 }}>
        {col(ms.dot, 'A dot fills or prints.', <Meter value={t % 2 ? 10 : 0} accent="var(--pickle)" outlined scale={1.6} />)}
        {col(ms.hitStop, 'An impact pauses.', <PressLoop />)}
        {col(ms.drain, 'A dot empties.', <Meter value={t % 2 ? 0 : 10} accent="var(--text-muted)" scale={1.6} />)}
        {col(ms.swap, 'A card swaps.', <SwapLoop />)}
      </div>
    </Page>
  )
}

export function MotionRules() {
  return (
    <Page title="Motion moves only to say something">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: D.gutter * 2 }}>
        <Rule lead="Steps for the machine.">Meters, print, counts.</Rule>
        <Rule lead="Springs for the living.">Eyes, follow, a wave.</Rule>
        <Rule lead="Nothing animates in.">1 moving thing a slide.</Rule>
      </div>
    </Page>
  )
}

// ---- 09 · UI elements ---------------------------------------------------------------------------------------------------
export const ElementsOpener = () => <Opener num="09" name="UI elements" seed={13.3} lede="The kit. Build with it; don’t restyle it." />

export function ElementsCard() {
  const W = 680, H = 400, P = Math.round(24 * K), R = Math.round(18 * K)
  return (
    <Page title="A card says a single thing">
      <div style={{ display: 'flex', gap: 130, alignItems: 'flex-start' }}>
        <div style={{ position: 'relative', marginTop: 30, marginLeft: 40 }}>
          <Card width={W} height={H} scale={K} lifted>
            <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: 'var(--tracking-title)' }}>Heard you</div>
            <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>make the header sticky</div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Meter value={7} accent="var(--pickle)" outlined scale={K} /><span style={{ font: 'var(--t-pixel-3)' }}>12:20</span></div>
          </Card>
          <Redline x1={0} y1={-22} x2={W} y2={-22} label={`${W}`} />
          <Redline x1={-26} y1={0} x2={-26} y2={P} label={`${P}`} side="left" />
          <Redline x1={W + 26} y1={0} x2={W + 26} y2={H} label={`${H}`} />
          <Redline x1={0} y1={H + 26} x2={R} y2={H + 26} label={`${R}`} side="below" />
        </div>
        <div style={{ display: 'grid', gap: 34, maxWidth: span(4), marginTop: 30 }}>
          <Rule lead="The title is the state." />
          <Rule lead="His words, exactly." />
          <Rule lead="The machine in the foot." />
        </div>
      </div>
    </Page>
  )
}

export function ElementsTray() {
  const cards = [['Listening', 3, true, '12:22'], ['Working', 6, false, '12:18'], ['Asleep', 2, false, '11:40']] as const
  return (
    <Page title="Trays hold, bands open">
      <div style={{ display: 'grid', gap: 44 }}>
        <Tray width={1500} height={320} scale={K} layout={{ alignItems: 'center' }}>
          {cards.map(([t, v, l, time]) => (
            <Card key={t} width={440} height={240} scale={K} lifted={l}>
              <div style={{ font: '600 var(--deck-body)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>{t}</div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Meter value={v} accent={l ? 'var(--pickle)' : 'var(--text-muted)'} outlined={l} scale={1.3} /><span style={{ font: 'var(--t-pixel-4)' }}>{time}</span></div>
            </Card>
          ))}
        </Tray>
        <Band width={1500} height={220} scale={K} color="surface-felt-deep" title="Marker · Logo" subs={['concept', 'construction', 'clearspace', 'minimum size']} />
      </div>
    </Page>
  )
}

export function ElementsControls() {
  const [tint, setTint] = useState<'lime' | 'sky' | 'none'>('lime')
  return (
    <Page title="Small things are flat colour">
      <div style={{ display: 'grid', gap: 70 }}>
        <div style={{ display: 'flex', gap: 22, alignItems: 'center', zoom: K }}>
          <Button>Keep it</Button><Button variant="secondary">Show me</Button><Button variant="quiet">Not now</Button>
          <span style={{ width: 24 }} /><Toggle options={['lime', 'sky', 'none'] as const} value={tint} onChange={setTint} />
          <span style={{ width: 24 }} /><span style={{ display: 'flex', gap: 6 }}><Key>⌃</Key><Key>⌥</Key><Key>⌘</Key><Key>P</Key></span>
        </div>
        <div style={{ display: 'flex', gap: 130, alignItems: 'flex-end' }}>
          <Stat value="8" caption="kept today" size="var(--deck-hero)" />
          <Stat value="2/4" caption="sessions waiting" size="var(--deck-hero)" />
        </div>
        <DoDont size={250} items={[
          { ok: false, note: 'A badge that says nothing.', el: <span style={{ font: '500 18px var(--font-head)', padding: '6px 12px', borderRadius: 99, background: 'var(--silver-50)', display: 'inline-flex', gap: 8, alignItems: 'center' }}><i style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--checked)' }} />Active</span> },
          { ok: false, note: 'A monospace label.', el: <span style={{ font: '500 17px var(--font-mono)', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>SESSION_ID</span> },
          { ok: true, note: 'The state as the title.', el: <span style={{ font: '600 28px var(--font-head)' }}>Working</span> },
        ]} />
      </div>
    </Page>
  )
}

export { Cursor }
