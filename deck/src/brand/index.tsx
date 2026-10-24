import type { ComponentType } from 'react'
import * as A from './slides-a'
import * as B from './slides-b'
import * as C from './slides-c'
import * as Dd from './slides-d'

/** The brand book v2, in order. ground: the slide's background; dark: the chrome reads on dark; ink: the chrome is full
    ink (on sky felt); chrome: false on full-bleed covers. Openers are banners: forest chrome is dark, sky and sage ink. */
export type Entry = { title: string; chapter?: string; render: ComponentType; ground?: string; dark?: boolean; ink?: boolean; chrome?: boolean }
const felt = 'var(--surface-felt)'
type Tone = 'dark' | 'ink'
const ch = (chapter: string, items: [string, ComponentType, Tone?][]): Entry[] => items.map(([title, render, tone]) => ({ title, chapter, render, dark: tone === 'dark', ink: tone === 'ink' }))

export const brand: Entry[] = [
  { title: 'Cover', render: A.Cover, ground: felt, dark: true, chrome: false },
  { title: 'Contents', render: A.Contents },
  ...ch('The idea', [['Opener', A.IdeaOpener, 'dark'], ['Clean, tactile, alive', A.IdeaWords], ['His 12 picks', A.IdeaFinal], ['What we keep', A.IdeaKeep], ['UG’s restraint', A.IdeaUG]]),
  ...ch('The logo', [['Opener', A.LogoOpener, 'ink'], ['Directions', A.LogoDirections], ['On forest', A.LogoOnForest, 'dark'], ['The sticker', A.LogoSticker]]),
  ...ch('Colour', [['Opener', A.ColourOpener, 'dark'], ['Palette', A.ColourPalette], ['Signals', A.ColourSignals], ['Balance', A.ColourBalance]]),
  ...ch('Type', [['Opener', B.TypeOpener, 'ink'], ['Voices', B.TypeVoices], ['Levels', B.TypeLevels], ['In use', B.TypeInUse]]),
  ...ch('Space and radius', [['Opener', B.SpaceOpener, 'dark'], ['Radius', B.SpaceChain], ['Padding', B.SpacePadding], ['Grid', B.SpaceGrid]]),
  ...ch('Materials', [['Opener', B.MaterialsOpener, 'dark'], ['Metal', B.MaterialMetal], ['Felt', B.MaterialFelt], ['Moss', B.MaterialMoss], ['Light', B.MaterialLight], ['Lanes', B.MaterialDont], ['The lab', B.MaterialLab]]),
  ...ch('The cast', [['Opener', C.CastOpener, 'ink'], ['Drawn', C.CastDrawn], ['What they do', C.CastDoes], ['Looks', C.CastLooks], ['Speech', C.CastSpeaks]]),
  ...ch('Motion', [['Opener', C.MotionOpener, 'dark'], ['Timings', C.MotionTimings], ['Rules', C.MotionRules]]),
  ...ch('UI elements', [['Opener', C.ElementsOpener, 'dark'], ['Card', C.ElementsCard], ['Tray and band', C.ElementsTray], ['Controls', C.ElementsControls]]),
  ...ch('UX patterns', [['Opener', Dd.UXOpener, 'dark'], ['The screen', Dd.UXScreen], ['States', Dd.UXStates], ['The catch', Dd.UXCatch]]),
  ...ch('Data and diagrams', [['Opener', Dd.DataOpener, 'ink'], ['Pieces', Dd.DataStatus], ['Speed', Dd.DataSpeed], ['The flow', Dd.DataFlow]]),
  ...ch('Building a deck', [['Opener', Dd.DeckOpener, 'dark'], ['Banners', Dd.DeckBanners], ['Templates', Dd.DeckTemplates], ['Anatomy', Dd.DeckAnatomy], ['Code', Dd.DeckCode]]),
  ...ch('What we never do', [['1 to 10', Dd.Never1], ['11 to 21', Dd.Never2]]),
  { title: 'Back', render: Dd.Back, ground: felt, dark: true, chrome: false },
]
