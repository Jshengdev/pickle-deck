import type { ComponentType } from 'react'
import type { Entry } from '../brand'
import { OUTLINE } from './outline'
import { Wire } from './Wire'

/** THE FINAL PRESENTATION lives here. Right now it is draft 1 of the outline (deck/pitch/OUTLINE-draft1.md) as plain
    wireframes. Replace each entry with a real slide built from the brand book's templates (deck/src/brand), e.g.
    { title: 'The moment', chapter: 'Demo', render: MyMomentSlide }. Open it with ?deck=pitch. */
export const pitch: Entry[] = OUTLINE.map((s, i) => ({ title: s.title, render: (() => <Wire n={i + 1} {...s} />) as ComponentType, chrome: false }))
