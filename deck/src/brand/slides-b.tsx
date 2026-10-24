import { useDialKit } from 'dialkit'
import { tokens } from '@design/tokens'
import { Surface } from '@design/material/Surface'
import { Card, Meter, Printed, Tray } from '@design/ui/kit'
import { Pickle, Blicky, Say } from '@design/cast/Cast'
import { PICKLE_BODY } from '@design/cast/PickleArt'
import { BLICKY_BODY } from '@design/cast/BlickyArt'
import { D, M, COL, DoDont, Fig, Opener, Page, Redline, Rule, lvl, span } from './frame'
import { PickleOnMoss } from './slides-a'

// ---- 04 · type ----------------------------------------------------------------------------------------------------------
export const TypeOpener = () => <Opener num="04" name="Type" seed={11.2} felt="sage" lede="4 voices: people, the second voice, the cast, the machine." />

const VOICES = [
  ['Pretendard', 'head', 'People. Titles, sentences, buttons.', 'Sees what you mean'],
  ['Fairfax HD', 'second', 'The second voice. Ledes, notes, quiet lines.', 'make the header sticky'],
  ['Geist Pixel Circle', 'dot', 'What Pickle prints and the cast says.', 'hey, i’m pickje'],
  ['Geist Pixel', 'pixel', 'The machine’s words, and every count.', '12:20 · 2 of 4'],
] as const
export function TypeVoices() {
  return (
    <Page title="4 voices, each with its job">
      <div style={{ display: 'grid', gap: 26 }}>
        {VOICES.map(([name, face, job, sample]) => (
          <div key={name} style={{ display: 'grid', gridTemplateColumns: '380px 1fr', alignItems: 'baseline', gap: 40 }}>
            <div><div style={{ font: '600 25px var(--font-head)' }}>{name}</div><div style={{ font: '400 20px/1.4 var(--font-head)', color: 'var(--text-secondary)' }}>{job}</div></div>
            <div style={{ ...lvl(face, 1, face === 'pixel' ? 96 : 61), whiteSpace: 'nowrap' }}>{sample}</div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export function TypeLevels() {
  const lv = tokens.type.levels as Record<string, Record<string, readonly number[]>>
  return (
    <Page title="Each voice has 4 levels">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: D.gutter * 1.5 }}>
        {VOICES.map(([name, face]) => (
          <div key={face} style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
            <div style={{ font: '600 20px var(--font-head)', color: 'var(--text-secondary)' }}>{name}</div>
            {[1, 2, 3, 4].map((n) => {
              const [size, weight] = lv[face][n]
              return (
                <div key={n} style={{ display: 'grid', gap: 4 }}>
                  <div style={{ font: `var(--t-${face}-${n})`, letterSpacing: `var(--t-${face}-${n}-track)`, fontSize: Math.min(size, face === 'pixel' && n === 1 ? 72 : 61), whiteSpace: 'nowrap', overflow: 'hidden' }}>{face === 'pixel' ? '12:20' : 'Pickje'}</div>
                  <div style={{ font: '400 16px var(--font-pixel)', color: 'var(--text-muted)' }}>{`${n} · ${size} · ${weight}`}</div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </Page>
  )
}

export function TypeInUse() {
  return (
    <Page title="Together, each in its place">
      <div style={{ display: 'flex', gap: 90, alignItems: 'center' }}>
        <Card width={700} height={380} scale={D.scale} lifted>
          <div style={{ font: '600 var(--deck-lead)/1.1 var(--font-head)', letterSpacing: '-0.02em' }}>Heard you</div>
          <div style={{ font: 'var(--t-second-3)', color: 'var(--text-secondary)' }}>make the header sticky</div>
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Meter value={7} accent="var(--pickle)" outlined scale={1.6} /><span style={{ font: 'var(--t-pixel-3)' }}>12:20</span>
          </div>
        </Card>
        <div style={{ display: 'grid', gap: 40, justifyItems: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22 }}><Pickle pose="wave" height={230} /><Say size={30}>got it, on the header</Say></div>
          <Printed text="12:20 web-app · kept 8" size={40} wear={0.45} />
        </div>
      </div>
    </Page>
  )
}

// ---- 05 · space and radius ----------------------------------------------------------------------------------------------
export const SpaceOpener = () => <Opener num="05" name="Space and radius" seed={2.6} lede="Corners nest. Padding comes from the tokens." />

export function SpaceChain() {
  const chain = [['band', 36, 8, 'var(--surface-felt-deep)'], ['tray', 28, 10, 'var(--surface-felt)'], ['card', 18, 6, 'var(--silver-50)'], ['control', 12, 4, 'var(--surface-sunken)'], ['chip', 8, 4, 'var(--silver-50)'], ['hair', 4, 2, 'var(--pickle)'], ['pixel', 2, 0, 'var(--ink)']] as const
  const X = 4
  const nest = (i: number, w: number, h: number): React.ReactNode => {
    if (i >= chain.length) return null
    const [, r, gap, bg] = chain[i]
    return <div style={{ width: w, height: h, borderRadius: r * X, background: bg, padding: gap * X, boxSizing: 'border-box' }}>{nest(i + 1, w - gap * X * 2, h - gap * X * 2)}</div>
  }
  return (
    <Page title="Corners nest">
      <div style={{ display: 'flex', gap: 110, alignItems: 'center' }}>
        {nest(0, 680, 500)}
        <div style={{ display: 'grid', gap: 12 }}>
          {chain.map(([n, r]) => (
            <div key={n} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'baseline' }}>
              <span style={{ font: '600 26px var(--font-head)', textTransform: 'capitalize' }}>{n}</span><span style={{ font: '400 28px var(--font-pixel)' }}>{r}</span>
            </div>
          ))}
          <div style={{ font: 'var(--t-second-4)', color: 'var(--text-secondary)', marginTop: 12 }}>inner = outer − gap · slides × 1.6</div>
        </div>
      </div>
    </Page>
  )
}

export function SpacePadding() {
  const rows = (['band', 'tray', 'card', 'control', 'chip', 'segment'] as const).map((k) => [k, tokens.component[k] as unknown as Record<string, unknown>] as const)
  const cell = (v: unknown) => <span style={{ font: '400 28px var(--font-pixel)' }}>{v == null ? '' : String(v)}</span>
  return (
    <Page title="Every element has its numbers">
      <div style={{ display: 'grid', gridTemplateColumns: '240px repeat(4, 180px)', rowGap: 24, alignItems: 'baseline' }}>
        {['', 'Radius', 'Padding', 'Gap', 'Height'].map((h) => <span key={h} style={{ font: '400 19px var(--font-head)', color: 'var(--text-muted)' }}>{h}</span>)}
        {rows.map(([k, r]) => [
          <span key={k} style={{ font: '600 28px var(--font-head)', textTransform: 'capitalize' }}>{k}</span>,
          <span key={k + 'r'}>{cell(tokens.radius[r.radius as keyof typeof tokens.radius])}</span>,
          <span key={k + 'p'}>{cell(r.pad ?? (r.padX != null ? (r.padY != null ? `${r.padY}×${r.padX}` : `0×${r.padX}`) : null))}</span>,
          <span key={k + 'g'}>{cell(r.gap)}</span>,
          <span key={k + 'h'}>{cell(r.height)}</span>,
        ])}
      </div>
    </Page>
  )
}

export function SpaceGrid() {
  return (
    <>
      <div style={{ position: 'absolute', left: M, right: M, top: 0, bottom: 0, display: 'flex', gap: D.gutter, pointerEvents: 'none' }}>
        {Array.from({ length: D.columns }, (_, i) => <div key={i} style={{ flex: 1, background: 'color-mix(in oklch, var(--focus) 8%, transparent)' }} />)}
      </div>
      <Page title="12 columns hold every slide">
        <div style={{ position: 'relative', height: '100%' }}>
          <Redline x1={-M} y1={70} x2={0} y2={70} label={`${D.margin}`} />
          <Redline x1={0} y1={150} x2={COL} y2={150} label={`${Math.round(COL)}`} />
          <Redline x1={COL} y1={230} x2={COL + D.gutter} y2={230} label={`${D.gutter}`} side="below" />
        </div>
      </Page>
    </>
  )
}

// ---- 06 · materials -----------------------------------------------------------------------------------------------------
export const MaterialsOpener = () => <Opener num="06" name="Materials" seed={6.9} lede="Metal, felt and moss. Play with them in the lab." />

export function MaterialMetal() {
  const d = useDialKit('Metal', { contrast: [1.35, 0.6, 2.4, 0.01], dome: [1, 0, 1.5, 0.01], sheen: [0.7, 0, 2, 0.01] })
  return (
    <Page title="Metal takes many forms">
      <div style={{ display: 'flex', gap: 56, alignItems: 'center' }}>
        <Surface material="metal" width={560} height={360} radius={29} spread={24} contrast={d.contrast} sheen={d.sheen} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 40, alignItems: 'center' }}>
          <Surface material="metal" shape="ellipse" width={220} height={220} spread={18} {...d} />
          <Surface material="metal" shape="ring" width={220} height={220} ring={44} spread={18} {...d} />
          <Surface material="metal" shape="rect" radius={60} width={300} height={120} spread={18} {...d} />
          <Surface material="metal" shape="blob" width={240} height={190} seed={2} spread={18} {...d} />
        </div>
        <Surface material="metal" shape="mask" mask={{ text: 'pickje', weight: 900 }} width={420} height={170} spread={16} {...d} />
      </div>
    </Page>
  )
}

export function MaterialFelt() {
  return (
    <Page title="Felt holds things">
      <div style={{ display: 'flex', gap: 44, alignItems: 'flex-end' }}>
        <Fig caption="Forest, the main felt"><Surface material="felt" inset color="surface-felt" width={560} height={420} radius={45} spread={26} /></Fig>
        <Fig caption="Sky"><Surface material="felt" color="surface-felt-sky" width={340} height={420} radius={45} spread={16} shadow={0.6} /></Fig>
        <Fig caption="Sage, almost invisible"><Surface material="felt" inset color="surface-felt-sage" width={340} height={420} radius={45} spread={22} /></Fig>
        <Fig caption="Shapes cut from felt"><div style={{ display: 'grid', gap: 26, justifyItems: 'center' }}>
          <Surface material="felt" color="surface-felt" shape="ellipse" width={150} height={150} spread={10} shadow={0.6} fringe={1.6} />
          <Surface material="felt" color="surface-felt-sky" shape="blob" width={190} height={150} seed={5} spread={10} shadow={0.6} fringe={1.6} />
        </div></Fig>
      </div>
    </Page>
  )
}

export function MaterialMoss() {
  const d = useDialKit('Moss', { bloom: [0.32, 0, 0.8, 0.01], sparse: [0.35, 0, 1, 0.01], seed: [5.5, 0, 20, 0.1] })
  return (
    <Page title="Moss is alive, and wraps any shape">
      <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
        <Surface material="moss" shape="cushion" width={620} height={360} radius={180} spread={12} {...d} />
        <Surface material="moss" shape="ring" width={260} height={260} ring={70} spread={10} {...d} />
        <Surface material="moss" shape="mask" mask={PICKLE_BODY} width={190} height={320} spread={8} {...d} />
        <Surface material="moss" shape="mask" mask={BLICKY_BODY} width={300} height={270} spread={8} {...d} />
      </div>
    </Page>
  )
}

export function MaterialLight() {
  return (
    <Page title="The light is upper left, and there are 4 heights">
      <div style={{ display: 'grid', gap: 30 }}>
        <svg width="220" height="120" style={{ overflow: 'visible' }}>
          <circle cx="30" cy="30" r="22" fill="var(--attention)" stroke="var(--ink)" strokeWidth="4" />
          <path d="M60 52C90 70 120 88 160 110M140 92L162 111L136 116" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-end' }}>
          <Fig caption="Sunk"><Surface material="felt" inset width={320} height={240} radius={45} spread={22} /></Fig>
          <Fig caption="Resting"><Surface material="metal" width={320} height={240} radius={29} spread={14} shadow={0.7} /></Fig>
          <Fig caption="Lifted"><Surface material="metal" width={320} height={240} radius={29} spread={32} shadow={1} /></Fig>
          <Fig caption="Floating"><Surface material="metal" width={320} height={240} radius={29} spread={54} shadow={1.2} /></Fig>
        </div>
      </div>
    </Page>
  )
}

export function MaterialDont() {
  return (
    <Page title="Materials stay in their lane">
      <DoDont size={300} items={[
        { ok: false, note: 'A stripe on a card.', el: <div style={{ position: 'relative' }}><Surface material="metal" width={200} height={130} radius={18} spread={8} shadow={0.6} /><i style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: 'var(--pickle)', borderRadius: '18px 0 0 18px' }} /></div> },
        { ok: false, note: 'Glass, blur or glow.', el: <div style={{ width: 200, height: 130, borderRadius: 18, background: 'oklch(1 0 0 / .35)', backdropFilter: 'blur(8px)', boxShadow: '0 0 40px 6px oklch(0.8 0.2 280 / .6)' }} /> },
        { ok: false, note: 'Moss under words.', el: <div style={{ position: 'relative' }}><Surface material="moss" shape="cushion" width={220} height={120} radius={60} seed={6} spread={4} shadow={0} /><span style={{ position: 'absolute', left: 30, top: 40, font: '700 30px var(--font-head)' }}>Heard you</span></div> },
        { ok: false, note: 'Light from 2 sides.', el: <div style={{ display: 'flex', gap: 20 }}><Surface material="metal" shape="ellipse" width={100} height={100} dome={1} spread={8} light={225} /><Surface material="metal" shape="ellipse" width={100} height={100} dome={1} spread={8} light={45} /></div> },
        { ok: true, note: 'Metal on felt, moss beside it.', el: <div style={{ position: 'relative', width: 230, height: 150 }}><Surface material="metal" width={170} height={110} radius={18} spread={8} shadow={0.6} /><div style={{ position: 'absolute', right: 0, bottom: 0 }}><PickleOnMoss h={70} w={100} seed={2} /></div></div> },
      ]} />
    </Page>
  )
}

export function MaterialLab() {
  return (
    <Page title="The lab is where materials get found" lede="Open it with ?lab. Pick a material, a form, a colour and a light; stack a second; keep what works.">
      <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <Surface material="metal" shape="ring" width={360} height={360} ring={80} dome={1} spread={20} />
          <div style={{ position: 'absolute', left: -20, top: 220 }}><Surface material="moss" shape="cushion" width={260} height={130} radius={65} seed={8} spread={8} bloom={0.34} /></div>
        </div>
        <div style={{ position: 'relative' }}>
          <Surface material="felt" color="surface-felt" width={420} height={300} radius={45} spread={16} shadow={0.6} />
          <div style={{ position: 'absolute', left: 120, top: 60 }}><Surface material="metal" shape="ellipse" width={180} height={180} dome={1} spread={14} /></div>
        </div>
        <div style={{ position: 'relative' }}>
          <Surface material="moss" shape="mask" mask={{ text: 'pickje', weight: 900 }} width={460} height={200} seed={3} spread={8} bloom={0.3} sparse={0.2} />
          <div style={{ position: 'absolute', left: 230, top: -120 }}><Blicky pose="sketch" height={130} /></div>
        </div>
      </div>
    </Page>
  )
}

