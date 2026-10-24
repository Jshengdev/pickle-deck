import { tokens } from '@design/tokens'
import { Surface } from '@design/material/Surface'
import { Card, Logo, LOGO_KINDS, Meter, Tray, Wordmark } from '@design/ui/kit'
import { Pickle, Blicky } from '@design/cast/Cast'
import { PickleArt } from '@design/cast/PickleArt'
import { D, M, Fig, Opener, Page, Rule, span } from './frame'

import s01 from '../../../docs/spec/design-01-refs/s01_2026-10-24_2-23-19.png'
import s02 from '../../../docs/spec/design-01-refs/s02_2026-10-24_2-23-26.png'
import s03 from '../../../docs/spec/design-01-refs/s03_2026-10-24_2-24-40.png'
import s04 from '../../../docs/spec/design-01-refs/s04_2026-10-24_2-25-03.png'
import s05 from '../../../docs/spec/design-01-refs/s05_2026-10-24_2-25-42.png'
import s06 from '../../../docs/spec/design-01-refs/s06_2026-10-24_2-25-50.png'
import s07 from '../../../docs/spec/design-01-refs/s07_2026-10-24_2-25-58.png'
import s08 from '../../../docs/spec/design-01-refs/s08_2026-10-24_2-26-04.png'
import s09 from '../../../docs/spec/design-01-refs/s09_2026-10-24_2-26-13.png'
import s10 from '../../../docs/spec/design-01-refs/s10_2026-10-24_2-26-32.png'
import s11 from '../../../docs/spec/design-01-refs/s11_2026-10-24_2-26-37.png'
import s12 from '../../../docs/spec/design-01-refs/s12_2026-10-24_2-26-40.png'

export const CHAPTERS = [
  ['01', 'The idea'], ['02', 'The logo'], ['03', 'Colour'], ['04', 'Type'], ['05', 'Space and radius'], ['06', 'Materials'], ['07', 'The cast'],
  ['08', 'Motion'], ['09', 'UI elements'], ['10', 'UX patterns'], ['11', 'Data and diagrams'], ['12', 'Building a deck'], ['13', 'What we never do'],
] as const
const sem = (r: string) => (tokens.semantic as Record<string, { hex: string }>)[r]?.hex ?? ''

/** Pickle standing on a moss cushion: the brand in one object. */
export function PickleOnMoss({ h = 420, w = 620, seed = 4.2, withBlicky = false }: { h?: number; w?: number; seed?: number; withBlicky?: boolean }) {
  return (
    <div style={{ position: 'relative', width: w, height: h + w * 0.2 }}>
      <div style={{ position: 'absolute', left: 0, bottom: 0 }}><Surface material="moss" shape="cushion" width={w} height={w * 0.38} radius={w * 0.19} seed={seed} spread={10} shadow={0.5} bloom={0.34} /></div>
      <div style={{ position: 'absolute', left: w * (withBlicky ? 0.22 : 0.36), bottom: w * 0.24 }}><PickleArt height={h} /></div>
      {withBlicky && <div style={{ position: 'absolute', left: w * 0.55, bottom: w * 0.22 }}><Blicky pose="wave" height={h * 0.52} /></div>}
    </div>
  )
}

// ---- cover and contents -------------------------------------------------------------------------------------------------
export function Cover() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, top: 110 }}><Wordmark size={64} tone="on-dark" /></div>
      <div style={{ position: 'absolute', left: M, bottom: 140, color: 'var(--text-on-dark)' }}>
        <div style={{ font: '700 var(--deck-giant)/0.92 var(--font-head)', letterSpacing: 'var(--tracking-giant)' }}>Brand<br />guidelines</div>
        <p style={{ margin: '30px 0 0', font: 'var(--t-second-2)', color: 'var(--text-on-dark-muted)' }}>Version 2 · 24 October 2026</p>
      </div>
      <div style={{ position: 'absolute', right: 130, bottom: 110 }}><PickleOnMoss withBlicky w={680} h={440} /></div>
    </>
  )
}

export function Contents() {
  return (
    <Page title="Contents">
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(2, ${span(4)}px)`, columnGap: D.gutter * 3, rowGap: 22 }}>
        {CHAPTERS.map(([n, name]) => (
          <div key={n} style={{ display: 'flex', gap: 28, alignItems: 'baseline' }}>
            <span style={{ font: '400 30px var(--font-pixel)', color: 'var(--text-muted)', width: 50 }}>{n}</span>
            <span style={{ font: '600 31px/1.2 var(--font-head)', letterSpacing: '-0.02em' }}>{name}</span>
          </div>
        ))}
      </div>
    </Page>
  )
}

// ---- 01 · the idea ------------------------------------------------------------------------------------------------------
export const IdeaOpener = () => <Opener num="01" name="The idea" seed={3.1} lede="pickje sees what you mean." />

export function IdeaWords() {
  return (
    <Page title="Every page is clean, tactile and alive">
      <div style={{ display: 'flex', gap: D.gutter * 2, alignItems: 'center' }}>
        <Fig w={span(4) - 20} h={360} caption="Clean"><Surface material="metal" width={440} height={260} radius={29} spread={18} /></Fig>
        <Fig w={span(4) - 20} h={360} caption="Tactile"><Surface material="felt" inset width={440} height={260} radius={45} spread={22} /></Fig>
        <Fig w={span(4) - 20} h={360} caption="Alive"><Surface material="moss" shape="cushion" width={420} height={230} radius={115} seed={7.4} spread={8} bloom={0.32} /></Fig>
      </div>
    </Page>
  )
}

export function IdeaFinal() {
  const refs = [s01, s02, s03, s04, s05, s06, s07, s08, s09, s10, s11, s12]
  return (
    <Page title="His 12 picks are the source">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }}>
        {refs.map((src, i) => (
          <div key={i} style={{ height: 230, borderRadius: 14, overflow: 'hidden', background: 'var(--surface-sunken)' }}>
            <img src={src} alt={`his pick ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }} />
          </div>
        ))}
      </div>
    </Page>
  )
}

export function IdeaKeep() {
  return (
    <Page title="From them we keep 4 things">
      <div style={{ display: 'flex', gap: D.gutter * 2.5, alignItems: 'flex-end' }}>
        <Fig caption="The waving sticker"><Pickle pose="wave" look="sticker" height={330} /></Fig>
        <Fig caption="The traced line"><div style={{ display: 'flex', gap: 20, alignItems: 'flex-end' }}><Pickle look="traced" height={330} /><Blicky look="traced" pose="wave" height={190} /></div></Fig>
        <Fig caption="Silver on dark green"><Surface material="felt" color="surface-felt" width={340} height={330} radius={45} spread={14} shadow={0.6}><div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}><Surface material="metal" shape="ellipse" width={170} height={170} dome={1} spread={14} /></div></Surface></Fig>
        <Fig caption="Moss that's alive"><Surface material="moss" shape="cushion" width={340} height={200} radius={100} seed={3.3} spread={8} bloom={0.34} /></Fig>
      </div>
    </Page>
  )
}

export function IdeaUG() {
  return (
    <Page title="We borrow UG’s restraint" lede="A single object on a single seamless colour, lit like a product.">
      <div style={{ display: 'flex', gap: 90, alignItems: 'center' }}>
        <Tray width={900} height={520} scale={D.scale} layout={{ alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 760, height: 430 }}>
            <div style={{ position: 'absolute', left: 20, top: 70 }}><Card width={420} height={250} scale={D.scale} lifted>
              <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>Heard you</div>
              <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>make the header sticky</div>
              <div style={{ marginTop: 'auto' }}><Meter value={7} accent="var(--pickle)" outlined scale={1.4} /></div>
            </Card></div>
            <div style={{ position: 'absolute', right: 0, bottom: 0 }}><PickleOnMoss h={250} w={330} seed={9.1} /></div>
          </div>
        </Tray>
        <div style={{ display: 'grid', gap: 36, maxWidth: span(3) }}>
          <Rule lead="1 object, 1 backdrop." />
          <Rule lead="1 light, from the upper left." />
          <Rule lead="Quiet type." />
        </div>
      </div>
    </Page>
  )
}

// ---- 02 · the logo ------------------------------------------------------------------------------------------------------
export const LogoOpener = () => <Opener num="02" name="The logo" seed={8.4} felt="sky" lede="6 directions from the drawn cast. 1 to pick." />

export function LogoDirections() {
  return (
    <Page title="6 directions, 1 to pick">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px 40px' }}>
        {LOGO_KINDS.map((l, i) => (
          <div key={l.kind} style={{ display: 'grid', gap: 12 }}>
            <div style={{ height: 290, borderRadius: 29, background: 'var(--surface-plane)', display: 'grid', placeItems: 'center' }}><Logo kind={l.kind} h={150} /></div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}><span style={{ font: '400 22px var(--font-pixel)', color: 'var(--text-muted)' }}>{i + 1}</span><span style={{ font: '600 22px var(--font-head)' }}>{l.name}</span></div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function LogoOnForest() {
  return (
    <>
      <div style={{ position: 'absolute', inset: 0 }}><Surface material="felt" color="surface-felt" width={1920} height={1080} radius={0} shadow={0} pad={0} sheen={0.8} /></div>
      <div style={{ position: 'absolute', left: M, top: 170, color: 'var(--text-on-dark)' }}><h1 style={{ margin: 0, font: 'var(--t-head-1)', letterSpacing: 'var(--t-head-1-track)' }}>On the main colourway</h1></div>
      <div style={{ position: 'absolute', left: M, right: M, top: 330, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
        {(['moss', 'sticker', 'traced'] as const).map((k) => <div key={k} style={{ height: 560, display: 'grid', placeItems: 'center' }}><Logo kind={k} h={190} tone="on-dark" /></div>)}
      </div>
    </>
  )
}

export function LogoSticker() {
  return (
    <Page title="The sticker goes everywhere" lede="On a card, a slide, a laptop. As drawn, tilted a little.">
      <div style={{ display: 'flex', gap: 120, alignItems: 'center', marginTop: 40 }}>
        <div style={{ position: 'relative' }}>
          <Card width={620} height={360} scale={D.scale}>
            <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>Kept</div>
            <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>rename the docs folder</div>
          </Card>
          <div style={{ position: 'absolute', right: -60, top: -80, transform: 'rotate(10deg)' }}><Pickle pose="wave" look="sticker" height={230} /></div>
        </div>
        <div style={{ transform: 'rotate(-6deg)' }}><Blicky pose="wave" look="sticker" height={200} /></div>
      </div>
    </Page>
  )
}

// ---- 03 · colour --------------------------------------------------------------------------------------------------------
export const ColourOpener = () => <Opener num="03" name="Colour" seed={5.7} lede="Silver and forest lead. Everything else is small." />

function Chip({ fill, name, hex, material }: { fill?: string; name: string; hex: string; material?: { m: 'felt' | 'metal'; color?: string } }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {material ? <Surface material={material.m} color={material.color} width={190} height={120} radius={18} spread={10} shadow={0.5} />
        : <div style={{ width: 190, height: 120, borderRadius: 18, background: fill }} />}
      <div><div style={{ font: '600 20px var(--font-head)' }}>{name}</div><div style={{ font: '400 18px var(--font-pixel)', color: 'var(--text-muted)' }}>{hex}</div></div>
    </div>
  )
}
export function ColourPalette() {
  const group = (title: string, chips: React.ReactNode) => (
    <div><div style={{ font: '600 22px var(--font-head)', color: 'var(--text-secondary)', marginBottom: 16 }}>{title}</div><div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>{chips}</div></div>
  )
  return (
    <Page title="The palette is 4 groups">
      <div style={{ display: 'grid', gap: 30 }}>
        {group('Surfaces and textures', <>
          <Chip name="Silver ground" hex={sem('surface-ground')} fill="var(--surface-ground)" />
          <Chip name="Metal" hex="brushed silver" material={{ m: 'metal' }} />
          <Chip name="Forest felt" hex={sem('surface-felt')} material={{ m: 'felt', color: 'surface-felt' }} />
          <Chip name="Sky felt" hex={sem('surface-felt-sky')} material={{ m: 'felt', color: 'surface-felt-sky' }} />
          <Chip name="Sage felt" hex={sem('surface-felt-sage')} material={{ m: 'felt', color: 'surface-felt-sage' }} />
          <Chip name="Night" hex={sem('surface-night')} fill="var(--surface-night)" />
        </>)}
        <div style={{ display: 'flex', gap: 70 }}>
          {group('Text', <>{(['ink', 'text-secondary', 'text-muted'] as const).map((r) => <Chip key={r} name={r === 'ink' ? 'Ink' : r === 'text-secondary' ? 'Body' : 'Caption'} hex={sem(r)} fill={`var(--${r})`} />)}</>)}
          {group('The cast', <>{(['pickle', 'blicky', 'cheek'] as const).map((r) => <Chip key={r} name={r === 'pickle' ? 'Pickle lime' : r === 'blicky' ? 'Blicky sky' : 'Cheek'} hex={sem(r)} fill={`var(--${r})`} />)}</>)}
        </div>
      </div>
    </Page>
  )
}

export function ColourSignals() {
  const s = (c: string, name: string, job: string) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ height: 150, borderRadius: 29, background: `var(${c})` }} />
      <div style={{ font: '600 25px var(--font-head)' }}>{name}</div><div style={{ font: '400 20px var(--font-head)', color: 'var(--text-secondary)' }}>{job}</div>
    </div>
  )
  return (
    <Page title="Each signal has 1 job">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: D.gutter }}>
        {s('--attention', 'Spark', 'The burst.')}{s('--catch', 'Amber', 'The catch.')}{s('--stuck', 'Stop red', 'Stuck.')}{s('--checked', 'Checked', 'Matched.')}{s('--focus', 'Focus', 'Where you are.')}
      </div>
    </Page>
  )
}

export function ColourBalance() {
  return (
    <Page title="60 silver, 30 forest, 10 for the rest">
      <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
        <div style={{ display: 'flex', width: 200, height: 520, flexDirection: 'column', borderRadius: 29, overflow: 'hidden' }}>
          <div style={{ flex: 60, background: 'linear-gradient(160deg, var(--silver-50), var(--silver-300))' }} />
          <div style={{ flex: 30, background: 'var(--surface-felt)' }} />
          <div style={{ flex: 10, display: 'flex' }}>{['--pickle', '--blicky', '--attention', '--catch'].map((c) => <div key={c} style={{ flex: 1, background: `var(${c})` }} />)}</div>
        </div>
        <Tray width={1180} height={520} scale={D.scale} layout={{ alignItems: 'center', gap: 34 }}>
          {([['Heard you', 7, true], ['Working', 5, false]] as const).map(([t, v, l]) => (
            <Card key={t} width={500} height={330} scale={D.scale} lifted={l}>
              <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>{t}</div>
              <div style={{ marginTop: 'auto' }}><Meter value={v} accent={l ? 'var(--pickle)' : 'var(--text-muted)'} outlined={l} scale={1.6} /></div>
            </Card>
          ))}
        </Tray>
      </div>
    </Page>
  )
}
